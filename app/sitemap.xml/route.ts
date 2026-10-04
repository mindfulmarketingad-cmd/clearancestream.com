import { getAllDeals } from "@/lib/deals";
import { sitemapIndexShards, toSitemapIndexXml } from "@/lib/sitemap";

// Same 7-day cadence the monolithic sitemap used: each shard is cached
// independently, so crawlers get fresh URLs without regenerating everything.
export const revalidate = 604800;

export async function GET() {
  const { deals, fetchedAt } = await getAllDeals();
  const lastmod = fetchedAt ?? new Date().toISOString();
  const xml = toSitemapIndexXml(sitemapIndexShards(deals.length, lastmod));
  return new Response(xml, {
    headers: { "Content-Type": "application/xml; charset=utf-8" },
  });
}
