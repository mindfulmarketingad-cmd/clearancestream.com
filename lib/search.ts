import "server-only";
import { BRANDS, brandDescription, brandTitle } from "./brands";
import { CATEGORIES, getCategory } from "./categories";
import { liveLists } from "./lists";
import { POSTS } from "./blog";
import type { Deal } from "./deals";
import { rankDocs, type CardDeal, type SearchDoc } from "./search-core";
export { POPULAR_SEARCHES, popularSearch } from "./popular-searches";



const STATIC_PAGES: Omit<SearchDoc, "haystack">[] = [
  { type: "page", title: "All Gaming PC Deals", description: "Every live gaming PC deal we track, ranked by discount.", path: "/deals" },
  { type: "page", title: "Gaming PC Brands", description: "Browse gaming PC deals by manufacturer.", path: "/brands" },
  { type: "page", title: "Gaming PC Deal Guides", description: "Guides to buying gaming PCs and finding real discounts.", path: "/blog" },
  { type: "page", title: "Today’s Tech Deals", description: "Every real discount on tech and gaming gear today, ranked and filterable.", path: "/deals/today" },
  { type: "page", title: "PC Builds", description: "Complete, compatibility-checked PC builds: AMD and Intel gaming builds and a budget home office PC.", path: "/pc-builds" },
  { type: "page", title: "AMD Gaming Build", description: "Complete AMD gaming PC part list with prices.", path: "/pc-builds/amd-gaming-build" },
  { type: "page", title: "Intel Gaming PC Build", description: "Complete Intel gaming PC part list with prices.", path: "/pc-builds/intel-gaming-build" },
  { type: "page", title: "Budget Home Office PC Build", description: "Low-cost home office desktop part list with prices.", path: "/pc-builds/home-office-build" },
  { type: "page", title: "PC Part Picker", description: "Build a gaming PC with compatibility checks, estimated wattage, and live prices.", path: "/pc-builder" },
  { type: "page", title: "About ClearanceStream", description: "How we find and verify gaming PC deals.", path: "/about" },
  { type: "page", title: "Contact", description: "Get in touch with the ClearanceStream team.", path: "/contact" },
  { type: "page", title: "Affiliate Disclaimer", description: "How ClearanceStream earns money and how prices are shown.", path: "/disclaimer" },
  { type: "page", title: "Privacy Policy", description: "How ClearanceStream handles your data.", path: "/privacy" },
  { type: "page", title: "Terms of Use", description: "The terms that govern use of ClearanceStream.", path: "/terms" },
];


function cardDeal(d: Deal): CardDeal {
  const { asin, name, path, image, price, priceDisplay, listPriceDisplay, savingsDisplay, savingsPercent, dealBadge, brandName, fetchedAt } = d;
  return { asin, name, path, image, price, priceDisplay, listPriceDisplay, savingsDisplay, savingsPercent, dealBadge, brandName, fetchedAt };
}

/** Every searchable document. Served as /search-index.json for client-side search. */
export function buildIndex(deals: Deal[]): SearchDoc[] {
  const docs: SearchDoc[] = [];
  for (const deal of deals) {
    docs.push({
      type: "deal",
      title: deal.name,
      description: `${deal.priceDisplay}${deal.savingsPercent ? `, ${deal.savingsPercent}% off` : ""}`,
      path: deal.path,
      // Title, brand, and category only: feature bullets would multiply the size
      // of the static search index for little gain in match quality.
      haystack: `${deal.title} ${deal.brandName} ${getCategory(deal.categorySlug)?.name ?? ""}${deal.isGamingPc ? " gaming pc desktop" : ""}`.toLowerCase(),
      deal: cardDeal(deal),
    });
  }
  for (const b of BRANDS) {
    docs.push({
      type: "brand",
      title: brandTitle(b),
      description: brandDescription(b),
      path: `/brands/${b.slug}`,
      haystack: `${b.name} ${b.lines.map((l) => l.name).join(" ")} ${b.sells}`.toLowerCase(),
    });
  }
  for (const b of BRANDS) {
    for (const c of CATEGORIES) {
      const count = deals.filter((d) => d.brandSlug === b.slug && d.categorySlug === c.slug).length;
      if (count === 0) continue;
      docs.push({
        type: "brand",
        title: `${b.name} ${c.name} deals`,
        description: `${count} ${b.name} ${c.noun} ${count === 1 ? "deal" : "deals"} right now.`,
        path: `/brands/${b.slug}/${c.slug}`,
        haystack: `${b.name} ${c.name} ${c.noun} ${c.slug.replace("-", " ")}`.toLowerCase(),
      });
    }
  }
  for (const c of CATEGORIES) {
    docs.push({
      type: "page",
      title: c.hubTitle,
      description: c.blurb,
      path: `/categories/${c.slug}`,
      haystack: `${c.hubTitle} ${c.plural} ${c.noun} ${c.blurb}`.toLowerCase(),
    });
  }
  for (const l of liveLists(deals).filter((x) => x.indexable)) {
    docs.push({
      type: "guide",
      title: l.title,
      description: `Ranked list, updated weekly.`,
      path: `/lists/${l.def.slug}`,
      haystack: `${l.title} ${l.def.category.noun} ${l.def.qualifier}`.toLowerCase(),
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
  return rankDocs(query, buildIndex(deals));
}
