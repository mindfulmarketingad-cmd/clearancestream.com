import type { Facet, TableRow } from "@/components/CategoryTable";
import { getCategory } from "./categories";
import type { Deal } from "./deals";
import { specsFor } from "./list-insights";

/**
 * Rows, spec columns, and filters for the part-picker style product table.
 * When the deals span several categories, Category becomes a column and filter.
 */
export function dealTable(deals: Deal[], opts: { maxColumns?: number } = {}) {
  const mixed = new Set(deals.map((d) => d.categorySlug)).size > 1;
  const rows: TableRow[] = deals.map((d) => ({
    asin: d.asin,
    name: d.name,
    path: d.path,
    buyUrl: d.buyUrl,
    image: d.image?.url ?? null,
    brand: d.brandName,
    price: d.price,
    priceDisplay: d.priceDisplay,
    listPriceDisplay: d.listPriceDisplay,
    savingsPercent: d.savingsPercent,
    rating: d.rating,
    reviewCount: d.reviewCount,
    specs: {
      ...(mixed ? { Category: getCategory(d.categorySlug)?.name ?? "Other" } : {}),
      ...Object.fromEntries(specsFor(d)),
    },
  }));

  // Spec columns: the specs the most products state.
  const counts = new Map<string, number>();
  for (const r of rows) for (const k of Object.keys(r.specs)) counts.set(k, (counts.get(k) ?? 0) + 1);
  const columns = [...counts]
    .filter(([k, n]) => k === "Category" || n >= Math.max(2, rows.length * 0.1))
    .sort((a, b) => (a[0] === "Category" ? -1 : b[0] === "Category" ? 1 : b[1] - a[1]))
    .slice(0, opts.maxColumns ?? 4)
    .map(([k]) => k);

  // Filters: specs with a short list of distinct values.
  const facets: Facet[] = [...new Set([...columns, "Condition"])]
    .map((key) => {
      const c = new Map<string, number>();
      for (const r of rows) if (r.specs[key]) c.set(r.specs[key], (c.get(r.specs[key]) ?? 0) + 1);
      return { key, values: [...c].map(([value, count]) => ({ value, count })).sort((a, b) => b.count - a.count) };
    })
    .filter((f) => f.values.length >= 2 && f.values.length <= 20);

  return { rows, columns, facets };
}
