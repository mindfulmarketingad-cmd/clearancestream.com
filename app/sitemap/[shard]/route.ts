import { notFound } from "next/navigation";
import { getAllDeals } from "@/lib/deals";
import { pageEntries, productEntries, productShardCount, toUrlsetXml } from "@/lib/sitemap";

// Same 7-day cadence the monolithic sitemap used. Each shard is cached
// independently, so one new product only invalidates its own shard.
export const revalidate = 604800;

export async function generateStaticParams() {
  const { deals } = await getAllDeals();
  return [
    { shard: "pages.xml" },
    ...Array.from({ length: productShardCount(deals.length) }, (_, i) => ({
      shard: `products-${i}.xml`,
    })),
  ];
}

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ shard: string }> },
) {
  const { shard } = await params;
  const { deals, fetchedAt } = await getAllDeals();

  if (shard === "pages.xml") {
    return xmlResponse(toUrlsetXml(pageEntries(deals, fetchedAt)));
  }

  const match = /^products-(\d+)\.xml$/.exec(shard);
  if (match && Number(match[1]) < productShardCount(deals.length)) {
    return xmlResponse(toUrlsetXml(productEntries(deals, Number(match[1]))));
  }

  notFound();
}

function xmlResponse(xml: string): Response {
  return new Response(xml, {
    headers: { "Content-Type": "application/xml; charset=utf-8" },
  });
}
