import "server-only";
import { BRANDS } from "./brands";
import { POSTS } from "./blog";
import type { Deal } from "./deals";
import { searchSlug } from "./slug";

export type SearchDoc = {
  type: "deal" | "brand" | "guide" | "page";
  title: string;
  description: string;
  path: string;
  haystack: string;
  deal?: Deal;
};

/**
 * Curated queries that get indexable landing pages at /search/[slug].
 * Every other query renders for users but is marked noindex to avoid thin,
 * infinitely many search pages in Google's index.
 */
export const POPULAR_SEARCHES = [
  "RTX 5090 gaming PC",
  "RTX 5080 gaming PC",
  "RTX 5070 Ti gaming PC",
  "RTX 5070 gaming PC",
  "RTX 5060 gaming PC",
  "Radeon gaming PC",
  "Corsair Vengeance",
  "Alienware Aurora",
  "Alienware Area-51",
  "Gaming PC under 1000",
  "Gaming PC under 1500",
  "Gaming PC under 2000",
].map((label) => ({ label, slug: searchSlug(label), path: `/search/${searchSlug(label)}` }));

export function popularSearch(slug: string) {
  return POPULAR_SEARCHES.find((s) => s.slug === slug);
}

const STATIC_PAGES: Omit<SearchDoc, "haystack">[] = [
  { type: "page", title: "All Gaming PC Deals", description: "Every live gaming PC deal we track, ranked by discount.", path: "/deals" },
  { type: "page", title: "Gaming PC Brands", description: "Browse gaming PC deals by manufacturer.", path: "/brands" },
  { type: "page", title: "Gaming PC Deal Guides", description: "Guides to buying gaming PCs and finding real discounts.", path: "/blog" },
  { type: "page", title: "About ClearanceStream", description: "How we find and verify gaming PC deals.", path: "/about" },
  { type: "page", title: "Contact", description: "Get in touch with the ClearanceStream team.", path: "/contact" },
  { type: "page", title: "Affiliate Disclaimer", description: "How ClearanceStream earns money and how prices are shown.", path: "/disclaimer" },
  { type: "page", title: "Privacy Policy", description: "How ClearanceStream handles your data.", path: "/privacy" },
  { type: "page", title: "Terms of Use", description: "The terms that govern use of ClearanceStream.", path: "/terms" },
];

const STOPWORDS = new Set(["a", "an", "the", "and", "or", "for", "of", "on", "in", "with", "deal", "deals", "sale", "best", "cheap", "buy"]);

function tokens(query: string) {
  return query
    .toLowerCase()
    .replace(/[^a-z0-9 ]+/g, " ")
    .split(/\s+/)
    .filter((t) => t && !STOPWORDS.has(t));
}

function buildIndex(deals: Deal[]): SearchDoc[] {
  const docs: SearchDoc[] = [];
  for (const deal of deals) {
    docs.push({
      type: "deal",
      title: deal.name,
      description: `${deal.priceDisplay}${deal.savingsPercent ? `, ${deal.savingsPercent}% off` : ""}`,
      path: deal.path,
      haystack: `${deal.title} ${deal.brandName} ${deal.category ?? ""} ${deal.features.join(" ")}${
        deal.isGamingPc ? " gaming pc desktop" : ""
      }`.toLowerCase(),
      deal,
    });
  }
  for (const b of BRANDS) {
    docs.push({
      type: "brand",
      title: `${b.name} gaming PC deals`,
      description: b.metaDescription,
      path: `/brands/${b.slug}`,
      haystack: `${b.name} ${b.lines.map((l) => l.name).join(" ")} gaming pc desktop ${b.intro}`.toLowerCase(),
    });
  }
  for (const p of POSTS) {
    docs.push({
      type: "guide",
      title: p.title,
      description: p.description,
      path: `/blog/${p.slug}`,
      haystack: `${p.title} ${p.description} ${p.keywords.join(" ")} ${p.toc.map((t) => t.label).join(" ")}`.toLowerCase(),
    });
  }
  for (const page of STATIC_PAGES) {
    docs.push({ ...page, haystack: `${page.title} ${page.description}`.toLowerCase() });
  }
  return docs;
}

export function runSearch(query: string, deals: Deal[]) {
  let terms = tokens(query);
  // "under 1500" style price caps become a filter rather than a text match.
  let maxPrice: number | null = null;
  const underIdx = terms.findIndex((t) => t === "under" || t === "below");
  if (underIdx >= 0 && /^\d{3,5}$/.test(terms[underIdx + 1] ?? "")) {
    maxPrice = Number(terms[underIdx + 1]);
    terms = terms.filter((_, i) => i !== underIdx && i !== underIdx + 1);
  }

  const docs = buildIndex(deals);
  const scored = docs
    .filter((d) => maxPrice === null || (d.type === "deal" && d.deal!.price <= maxPrice))
    .map((doc) => {
      const matched = terms.filter((t) => new RegExp(`\\b${t}\\b`).test(doc.haystack));
      const titleHits = terms.filter((t) => doc.title.toLowerCase().includes(t)).length;
      return { doc, matched: matched.length, score: matched.length * 2 + titleHits };
    })
    // Deals must match every term; pages and guides may match partially.
    .filter((r) =>
      terms.length === 0 ? maxPrice !== null : r.doc.type === "deal" ? r.matched === terms.length : r.matched > 0,
    )
    // Documents matching every term rank above partial matches.
    .sort(
      (a, b) =>
        Number(b.matched === terms.length) - Number(a.matched === terms.length) ||
        b.score - a.score ||
        (b.doc.deal?.savingsPercent ?? 0) - (a.doc.deal?.savingsPercent ?? 0),
    )
    .map((r) => r.doc);

  return {
    deals: scored.filter((d) => d.type === "deal").map((d) => d.deal!),
    other: scored.filter((d) => d.type !== "deal"),
  };
}
