import { getAllDeals } from "@/lib/deals";
import { buildIndex } from "@/lib/search";

// Built once per deploy; used by client-side search on /search?q=...
export const dynamic = "force-static";

export async function GET() {
  const { deals } = await getAllDeals();
  return Response.json(buildIndex(deals));
}
