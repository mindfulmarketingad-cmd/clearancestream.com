import type { MetadataRoute } from "next";
import { LEGAL_UPDATED } from "@/components/LegalPage";
import { AUTHORS, POSTS, authorPath } from "@/lib/blog";
import { BRANDS } from "@/lib/brands";
import { CATEGORIES } from "@/lib/categories";
import { liveLists } from "@/lib/lists";
import { getAllDeals } from "@/lib/deals";
import { POPULAR_SEARCHES, runSearch } from "@/lib/search";
import { absoluteUrl } from "@/lib/site";

export const revalidate = 86400;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const { deals, fetchedAt } = await getAllDeals();
  const dealsUpdated = fetchedAt ?? new Date().toISOString();
  const latestPost = POSTS.map((p) => p.updated).sort().at(-1)!;

  const entry = (path: string, lastModified: string, changeFrequency: MetadataRoute.Sitemap[number]["changeFrequency"], priority: number) => ({
    url: absoluteUrl(path),
    lastModified,
    changeFrequency,
    priority,
  });

  return [
    entry("/", dealsUpdated, "daily", 1),
    entry("/deals", dealsUpdated, "daily", 0.9),
    entry("/brands", dealsUpdated, "daily", 0.8),
    entry("/categories", dealsUpdated, "daily", 0.8),
    ...CATEGORIES.filter((c) => deals.some((d) => d.categorySlug === c.slug)).map((c) =>
      entry(`/categories/${c.slug}`, dealsUpdated, "daily", 0.8),
    ),
    entry("/lists", dealsUpdated, "daily", 0.8),
    // Only "top 10" lists that actually have 10 products are indexable.
    ...liveLists(deals)
      .filter((l) => l.indexable)
      .map((l) => entry(`/lists/${l.def.slug}`, dealsUpdated, "daily", 0.7)),
    ...BRANDS.map((b) => entry(`/brands/${b.slug}`, dealsUpdated, "daily", 0.8)),
    // Only brand/category pages that currently have deals (empty ones are noindex).
    ...BRANDS.flatMap((b) =>
      CATEGORIES.filter((c) => deals.some((d) => d.brandSlug === b.slug && d.categorySlug === c.slug)).map((c) =>
        entry(`/brands/${b.slug}/${c.slug}`, dealsUpdated, "daily", 0.7),
      ),
    ),
    entry("/blog", latestPost, "weekly", 0.7),
    ...POSTS.map((p) => entry(`/blog/${p.slug}`, p.updated, "monthly", 0.7)),
    ...AUTHORS.map((a) => entry(authorPath(a), latestPost, "monthly", 0.4)),
    ...deals.map((d) => entry(d.path, d.fetchedAt, "daily", 0.6)),
    entry("/search", LEGAL_UPDATED, "monthly", 0.4),
    // Only curated searches that currently return deals are indexable.
    ...POPULAR_SEARCHES.filter((s) => runSearch(s.label, deals).deals.length > 0).map((s) =>
      entry(s.path, dealsUpdated, "daily", 0.5),
    ),
    entry("/about", LEGAL_UPDATED, "yearly", 0.4),
    entry("/contact", LEGAL_UPDATED, "yearly", 0.3),
    entry("/sitemap", dealsUpdated, "daily", 0.3),
    entry("/disclaimer", LEGAL_UPDATED, "yearly", 0.2),
    entry("/privacy", LEGAL_UPDATED, "yearly", 0.2),
    entry("/terms", LEGAL_UPDATED, "yearly", 0.2),
  ];
}
