import Link from "next/link";
import { DealPicks } from "@/components/DealPicks";
import { DealsUnavailable } from "@/components/DealsUnavailable";
import { Faq } from "@/components/Faq";
import { ArrowRight, CalendarIcon, ClockIcon, TagIcon } from "@/components/Icons";
import { JsonLd } from "@/components/JsonLd";
import { PageHeader } from "@/components/PageHeader";
import { toPickDeal } from "@/components/PickItem";
import { RankedPicks } from "@/components/RankedPicks";
import { TodayDate } from "@/components/TodayDate";
import { BRANDS } from "@/lib/brands";
import { CATEGORIES } from "@/lib/categories";
import { getAllDeals } from "@/lib/deals";
import { formatChecked } from "@/lib/format";
import { listInsights } from "@/lib/list-insights";
import { defaultRank } from "@/lib/lists";
import { pickPool } from "@/lib/picks";
import { itemListLd, pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Today’s Tech Deals",
  absoluteTitle: true,
  description:
    "Today’s tech deals in one list: every real discount we track on gaming PCs, laptops, monitors, keyboards, mice, headsets, controllers, and PC parts. Filter by category, brand, price, and discount.",
  path: "/deals/today",
});

export default async function TodaysDealsPage() {
  const { deals, fetchedAt } = await getAllDeals();
  // Every in-stock product with a genuine discount, best deals first.
  const pool = deals.filter((d) => d.inStock && (d.savingsPercent ?? 0) > 0).sort(defaultRank);
  const insights = listInsights(pool);
  const picks = pool.map((d, i) => ({ deal: toPickDeal(d), info: insights.get(d.asin)!, rank: i + 1 }));
  const categories = CATEGORIES.filter((c) => pool.some((d) => d.categorySlug === c.slug)).map((c) => ({ slug: c.slug, name: c.plural }));
  const brands = [...new Set(pool.map((d) => d.brandName))].sort((a, b) => a.localeCompare(b));
  const biggest = pool.reduce((m, d) => Math.max(m, d.savingsPercent ?? 0), 0);
  const spotlight = pickPool(deals);
  const checked = fetchedAt ?? new Date().toISOString();

  const faqs = [
    {
      q: "What counts as one of today’s tech deals?",
      a: "Any in-stock product we track with a genuine discount: the retailer reports a reference price above the current price. Products at their regular price are left off this page.",
    },
    {
      q: "How are today’s deals ranked?",
      a: "By default, deals are ranked by the size of the real discount together with owner ratings and review counts, so a deep discount on a well-reviewed product ranks first. You can re-sort by biggest discount, lowest price, or highest rating.",
    },
    {
      q: "How do I find the best deal in one category?",
      a: "Use the category filter, then sort by biggest discount or highest rating. You can also filter by brand, set a price limit, and choose a minimum discount.",
    },
    {
      q: "When were these prices checked?",
      a: `These prices were last checked ${formatChecked(checked)}. Prices and discounts can change at any time, so confirm the final price at checkout.`,
    },
    {
      q: "Are these discounts real?",
      a: "Yes. A discount only appears when the retailer reports a genuine reference price for that product. We never add our own markups or invented list prices.",
    },
  ];

  return (
    <>
      <PageHeader
        crumbs={[
          { name: "All Deals", path: "/deals" },
          { name: "Today’s Tech Deals", path: "/deals/today" },
        ]}
        title="Today’s Tech Deals"
        lede={`Every real discount we track right now: gaming PCs, laptops, monitors, peripherals, and PC parts from ${brands.length} brands, ranked and filterable in one list.`}
      >
        <div className="page-meta">
          <span>
            <CalendarIcon /> <TodayDate builtAt={new Date().toISOString()} />
          </span>
          <span>
            <TagIcon /> {pool.length} {pool.length === 1 ? "deal" : "deals"} today
            {biggest ? `, up to ${biggest}% off` : ""}
          </span>
          <span>
            <ClockIcon /> Prices checked <time dateTime={checked}>{formatChecked(checked)}</time>
          </span>
        </div>
      </PageHeader>

      {spotlight.length > 0 ? (
        <section className="section-tight">
          <div className="container">
            <h2 style={{ fontSize: 24, marginBottom: 16 }}>Deal of the Day &amp; Deal of the Week</h2>
            <DealPicks pool={spotlight} builtAt={new Date().toISOString()} />
          </div>
        </section>
      ) : null}

      <section className="section-tight" id="deals">
        <div className="container" style={{ maxWidth: 960 }}>
          {picks.length > 0 ? (
            <>
              <h2 style={{ fontSize: 26, marginBottom: 8 }}>All of today’s tech deals</h2>
              <p className="muted" style={{ marginBottom: 16 }}>
                Every discounted product, ranked by real savings and owner ratings, with key specs, price point, and
                reasons to buy or avoid each one. Filter by category, brand, price, or discount.
              </p>
              <RankedPicks picks={picks} categories={categories} brands={brands} label="tech deal" show={20} more={20} discountFilter />
              <JsonLd data={itemListLd("Today’s Tech Deals", pool.map((d) => ({ name: d.name, path: d.path })))} />
            </>
          ) : (
            <DealsUnavailable />
          )}
        </div>
      </section>

      <section className="section-tight">
        <div className="container" style={{ maxWidth: 960 }}>
          <nav aria-label="More deals" className="link-directory">
            <h2 className="sub-head" style={{ marginBottom: 16 }}>
              Today’s deals by category
            </h2>
            <ul className="chip-list">
              {categories.map((c) => (
                <li key={c.slug}>
                  <Link href={`/categories/${c.slug}`} className="chip">
                    {CATEGORIES.find((x) => x.slug === c.slug)?.hubTitle}
                  </Link>
                </li>
              ))}
            </ul>
            <h2 className="sub-head" style={{ margin: "24px 0 16px" }}>
              Today’s deals by brand
            </h2>
            <ul className="chip-list">
              {BRANDS.filter((b) => pool.some((d) => d.brandSlug === b.slug)).map((b) => (
                <li key={b.slug}>
                  <Link href={`/brands/${b.slug}`} className="chip">
                    {b.name}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
          <p className="callout-link" style={{ marginTop: 24 }}>
            Looking for codes? <Link href="/coupons" className="text-link">Browse tech coupons <ArrowRight /></Link> or{" "}
            <Link href="/lists" className="text-link">see our top 10 lists <ArrowRight /></Link>
          </p>
        </div>
      </section>

      <section className="section-tight" id="faq">
        <div className="container" style={{ maxWidth: 960 }}>
          <h2 style={{ fontSize: 24, marginBottom: 16 }}>Today’s tech deals FAQ</h2>
          <Faq items={faqs} />
        </div>
      </section>
    </>
  );
}
