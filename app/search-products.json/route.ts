import { getCategory } from "@/lib/categories";
import { getAllDeals } from "@/lib/deals";
import type { LiveProduct } from "@/lib/live-search";

// Compact product index for the header's instant search. Built once per deploy.
export const dynamic = "force-static";

export async function GET() {
  const { deals } = await getAllDeals();
  const items: LiveProduct[] = deals
    .filter((d) => d.inStock)
    .map((d) => ({
      t: d.name,
      p: d.path,
      i: d.image?.url ?? null,
      b: d.brandName,
      c: getCategory(d.categorySlug)?.name ?? "",
      v: d.price,
      d: d.priceDisplay,
      o: d.savingsPercent,
      l: d.listPriceDisplay,
    }));
  return Response.json(items);
}
