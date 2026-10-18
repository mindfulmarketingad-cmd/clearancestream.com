import Link from "next/link";
import { CategoryTable } from "@/components/CategoryTable";
import { dealTable } from "@/lib/deal-table";
import { DealsUnavailable } from "@/components/DealsUnavailable";
import { ArrowRight, ClockIcon } from "@/components/Icons";
import { JsonLd } from "@/components/JsonLd";
import { PageHeader } from "@/components/PageHeader";
import { BRANDS } from "@/lib/brands";
import { getAllDeals } from "@/lib/deals";
import { defaultRank } from "@/lib/lists";
import { formatChecked } from "@/lib/format";
import { POPULAR_SEARCHES } from "@/lib/search";
import { itemListLd, pageMetadata } from "@/lib/seo";


export const metadata = pageMetadata({
  title: "All Gaming PC Deals: Live Prices on Gaming PCs & Gear",
  description:
    "Every gaming PC and gaming gear deal we track: gaming PCs, laptops, mice, keyboards, headsets, and controllers from the biggest gaming brands, with live prices refreshed weekly.",
  path: "/deals",
});

export default async function DealsPage() {
  const { deals, fetchedAt } = await getAllDeals();
  // Every product, best real discounts and reviews first.
  const table = dealTable([...deals].sort(defaultRank), { maxColumns: 3 });

  return (
    <>
      <PageHeader
        crumbs={[{ name: "All Deals", path: "/deals" }]}
        title="All gaming PC deals"
        lede="Every product we track across every brand, from complete gaming PCs to mice and controllers. Filter by category, brand, price, and discount, and sort any column."
      >
        <div className="page-meta">
          <Link href="/deals/today" className="text-link">
            Today’s tech deals <ArrowRight />
          </Link>
          {fetchedAt ? (
            <span>
              <ClockIcon /> Last checked <time dateTime={fetchedAt}>{formatChecked(fetchedAt)}</time>
            </span>
          ) : null}
        </div>
      </PageHeader>

      <section className="section-tight">
        <div className="container">
          {deals.length > 0 ? (
            <>
              <h2 className="sr-only">Every deal we track</h2>
              <CategoryTable rows={table.rows} columns={table.columns} facets={table.facets} noun="deal" />
              <div className="toolbar" style={{ marginTop: 32 }}>
                <span>Shop by brand</span>
                <ul className="chip-list" aria-label="Brands">
                  {BRANDS.map((b) => (
                    <li key={b.slug}>
                      <Link href={`/brands/${b.slug}`} className="chip">
                        {b.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
              <JsonLd data={itemListLd("Gaming PC deals", deals.slice(0, 100).map((d) => ({ name: d.name, path: d.path })))} />
            </>
          ) : (
            <DealsUnavailable />
          )}
        </div>
      </section>

      <section className="section-tight">
        <div className="container card-grid card-grid-2">
          <div className="card">
            <h2 style={{ fontSize: 20, marginBottom: 8 }}>How to read these deals</h2>
            <p>
              Each listing shows the current price and the reference price used to calculate the
              saving. A reference can be a list price or a recent typical price, so large percentages are worth a
              second look. Our guide explains how to judge a discount on what is inside the case.
            </p>
            <Link href="/blog/gaming-pc-deals-guide" className="text-link">
              How to find real gaming PC deals <ArrowRight />
            </Link>
          </div>
          <div className="card">
            <h2 style={{ fontSize: 20, marginBottom: 8 }}>Search by GPU or budget</h2>
            <ul className="chip-list" style={{ marginTop: 12 }}>
              {POPULAR_SEARCHES.slice(0, 8).map((s) => (
                <li key={s.slug}>
                  <Link href={s.path} className="chip">
                    {s.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>
    </>
  );
}
