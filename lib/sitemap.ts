import type { MetadataRoute } from "next";
import { LEGAL_UPDATED } from "@/components/LegalPage";
import { AUTHORS, POSTS, authorPath } from "@/lib/blog";
import { BRANDS } from "@/lib/brands";
import { CATEGORIES } from "@/lib/categories";
import { liveLists } from "@/lib/lists";
import type { Deal } from "@/lib/deals";
import { POPULAR_SEARCHES, runSearch } from "@/lib/search";
import { absoluteUrl, SITE } from "@/lib/site";

// Max product URLs per child sitemap. Well under the 50,000-URL / 50MB
// protocol limits; keeps each shard small and fast to (re)generate.
export const PRODUCTS_PER_SITEMAP = 1000;

export type SitemapEntry = MetadataRoute.Sitemap[number];

const entry = (
  path: string,
  lastModified: string,
  changeFrequency: SitemapEntry["changeFrequency"],
  priority: number,
): SitemapEntry => ({ url: absoluteUrl(path), lastModified, changeFrequency, priority });

/**
 * Every non-product URL for the "pages" sitemap, with the same indexability
 * rules the monolithic sitemap used: brand/category pages only when they
 * currently have deals (empty ones are noindex), only indexable "top 10"
 * lists, only curated searches that currently return deals.
 */
export function pageEntries(deals: Deal[], fetchedAt: string | null): SitemapEntry[] {
  const dealsUpdated = fetchedAt ?? new Date().toISOString();
  const latestPost = POSTS.map((p) => p.updated).sort().at(-1)!;

  return [
    entry("/", dealsUpdated, "weekly", 1),
    entry("/deals", dealsUpdated, "weekly", 0.9),
    entry("/brands", dealsUpdated, "weekly", 0.8),
    entry("/categories", dealsUpdated, "weekly", 0.8),
    // Only categories that currently have deals (empty ones are noindex).
    ...CATEGORIES.filter((c) => deals.some((d) => d.categorySlug === c.slug)).map((c) =>
      entry(`/categories/${c.slug}`, dealsUpdated, "weekly", 0.8),
    ),
    entry("/lists", dealsUpdated, "weekly", 0.8),
    // Only "top 10" lists that actually have 10 products are indexable.
    ...liveLists(deals)
      .filter((l) => l.indexable)
      .map((l) => entry(`/lists/${l.def.slug}`, dealsUpdated, "weekly", 0.7)),
    ...BRANDS.map((b) => entry(`/brands/${b.slug}`, dealsUpdated, "weekly", 0.8)),
    // Only brand/category pages that currently have deals (empty ones are noindex).
    ...BRANDS.flatMap((b) =>
      CATEGORIES.filter((c) =>
        deals.some((d) => d.brandSlug === b.slug && d.categorySlug === c.slug),
      ).map((c) => entry(`/brands/${b.slug}/${c.slug}`, dealsUpdated, "weekly", 0.7)),
    ),
    entry("/blog", latestPost, "weekly", 0.7),
    ...POSTS.map((p) => entry(`/blog/${p.slug}`, p.updated, "monthly", 0.7)),
    ...AUTHORS.map((a) => entry(authorPath(a), latestPost, "monthly", 0.4)),
    entry("/search", LEGAL_UPDATED, "monthly", 0.4),
    // Only curated searches that currently return deals are indexable.
    ...POPULAR_SEARCHES.filter((s) => runSearch(s.label, deals).deals.length > 0).map((s) =>
      entry(s.path, dealsUpdated, "weekly", 0.5),
    ),
    entry("/about", LEGAL_UPDATED, "yearly", 0.4),
    entry("/contact", LEGAL_UPDATED, "yearly", 0.3),
    entry("/sitemap", dealsUpdated, "weekly", 0.3),
    entry("/disclaimer", LEGAL_UPDATED, "yearly", 0.2),
    entry("/privacy", LEGAL_UPDATED, "yearly", 0.2),
    entry("/terms", LEGAL_UPDATED, "yearly", 0.2),
  ];
}

/** Number of product shards needed for `dealCount` deals. */
export function productShardCount(dealCount: number): number {
  return Math.ceil(dealCount / PRODUCTS_PER_SITEMAP);
}

/** Product URLs for one shard (0-based). */
export function productEntries(deals: Deal[], shard: number): SitemapEntry[] {
  const start = shard * PRODUCTS_PER_SITEMAP;
  return deals.slice(start, start + PRODUCTS_PER_SITEMAP).map(
    (d): SitemapEntry => ({
      url: absoluteUrl(d.path),
      lastModified: d.fetchedAt,
      changeFrequency: "weekly",
      priority: 0.6,
    }),
  );
}

/** Child sitemaps referenced by the sitemap index, with a lastmod per shard. */
export function sitemapIndexShards(
  dealCount: number,
  lastmod: string,
): { loc: string; lastmod: string }[] {
  return [
    { loc: `${SITE.url}/sitemap/pages.xml`, lastmod },
    ...Array.from({ length: productShardCount(dealCount) }, (_, i) => ({
      loc: `${SITE.url}/sitemap/products-${i}.xml`,
      lastmod,
    })),
  ];
}

const esc = (s: string): string =>
  s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");

const lastmodOf = (v: string | Date): string => (typeof v === "string" ? v : v.toISOString());

/** Serialize entries to a `<urlset>` sitemap document. */
export function toUrlsetXml(entries: SitemapEntry[]): string {
  const urls = entries
    .map((e) => {
      const lastmod =
        e.lastModified != null ? `<lastmod>${esc(lastmodOf(e.lastModified))}</lastmod>` : "";
      const changefreq = e.changeFrequency ? `<changefreq>${e.changeFrequency}</changefreq>` : "";
      const priority = e.priority != null ? `<priority>${e.priority}</priority>` : "";
      return `<url><loc>${esc(e.url)}</loc>${lastmod}${changefreq}${priority}</url>`;
    })
    .join("");
  return `<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${urls}</urlset>`;
}

/** Serialize shard references to a `<sitemapindex>` document. */
export function toSitemapIndexXml(shards: { loc: string; lastmod?: string }[]): string {
  const items = shards
    .map(
      (s) =>
        `<sitemap><loc>${esc(s.loc)}</loc>${s.lastmod ? `<lastmod>${esc(s.lastmod)}</lastmod>` : ""}</sitemap>`,
    )
    .join("");
  return `<?xml version="1.0" encoding="UTF-8"?><sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${items}</sitemapindex>`;
}
