import type { Deal } from "./deals";

/** Fields a deal card needs; kept small so the static search index stays light. */
export type CardDeal = Pick<
  Deal,
  "asin" | "name" | "path" | "image" | "price" | "priceDisplay" | "listPriceDisplay" | "savingsDisplay" | "savingsPercent" | "dealBadge" | "brandName" | "fetchedAt"
>;

export type SearchDoc = {
  type: "deal" | "brand" | "guide" | "page";
  title: string;
  description: string;
  path: string;
  haystack: string;
  deal?: CardDeal;
};

const STOPWORDS = new Set(["a", "an", "the", "and", "or", "for", "of", "on", "in", "with", "deal", "deals", "sale", "best", "cheap", "buy"]);

export function tokens(query: string) {
  return query
    .toLowerCase()
    .replace(/[^a-z0-9 ]+/g, " ")
    .split(/\s+/)
    .filter((t) => t && !STOPWORDS.has(t));
}

/** Rank documents for a query. Shared by prebuilt search pages and client-side search. */
export function rankDocs(query: string, docs: SearchDoc[]) {
  let terms = tokens(query);
  // "under 1500" style price caps become a filter rather than a text match.
  let maxPrice: number | null = null;
  const underIdx = terms.findIndex((t) => t === "under" || t === "below");
  if (underIdx >= 0 && /^\d{3,5}$/.test(terms[underIdx + 1] ?? "")) {
    maxPrice = Number(terms[underIdx + 1]);
    terms = terms.filter((_, i) => i !== underIdx && i !== underIdx + 1);
  }

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
