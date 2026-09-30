import Link from "next/link";
import { DealBrowser } from "@/components/DealBrowser";
import { DealsUnavailable } from "@/components/DealsUnavailable";
import { ArrowRight, ClockIcon, RefreshIcon } from "@/components/Icons";
import { JsonLd } from "@/components/JsonLd";
import { PageHeader } from "@/components/PageHeader";
import { BRANDS } from "@/lib/brands";
import { gamingPcsFirst, getAllDeals } from "@/lib/deals";
import { formatChecked } from "@/lib/format";
import { POPULAR_SEARCHES } from "@/lib/search";
import { itemListLd, pageMetadata } from "@/lib/seo";

export const revalidate = 3600;

export const metadata = pageMetadata({
  title: "All Gaming PC Deals: 20-50% Off, Live from Amazon",
  description:
    "Every hidden deal we track on Amazon, 20 to 50% off: Corsair and Alienware gaming PCs, peripherals, and components with live prices, refreshed hourly.",
  path: "/deals",
});

export default async function DealsPage() {
  const { deals, fetchedAt } = await getAllDeals();

  return (
    <>
      <PageHeader
        crumbs={[{ name: "All Deals", path: "/deals" }]}
        title="All gaming PC deals"
        lede="Every product we track on Amazon marked down 20 to 50%, from complete gaming PCs to peripherals. Prices come directly from Amazon and refresh every hour."
      >
        <div className="page-meta">
          <span>
            <RefreshIcon /> Refreshed hourly
          </span>
          {fetchedAt ? (
            <span>
              <ClockIcon /> Last checked <time dateTime={fetchedAt}>{formatChecked(fetchedAt)}</time>
            </span>
          ) : null}
        </div>
      </PageHeader>

      <section className="section-tight">
        <div className="container">
          <div className="toolbar">
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
          {deals.length > 0 ? (
            <>
              <DealBrowser deals={gamingPcsFirst(deals)} label="gaming PC" />
              <JsonLd data={itemListLd("Gaming PC deals", deals.map((d) => ({ name: d.name, path: d.path })))} />
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
              Each listing shows Amazon&apos;s current price and the reference price Amazon uses to calculate the
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
