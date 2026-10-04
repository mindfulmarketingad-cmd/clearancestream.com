import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { DealBrowser } from "@/components/DealBrowser";
import { DealsUnavailable } from "@/components/DealsUnavailable";
import { Faq } from "@/components/Faq";
import { ArrowRight, ClockIcon, TagIcon } from "@/components/Icons";
import { JsonLd } from "@/components/JsonLd";
import { ValueBar } from "@/components/ValueBar";
import { BRANDS } from "@/lib/brands";
import { CATEGORIES, getCategory } from "@/lib/categories";
import { getAllDeals } from "@/lib/deals";
import { formatChecked, lowerName } from "@/lib/format";
import { liveLists } from "@/lib/lists";
import { itemListLd, pageMetadata } from "@/lib/seo";

export const revalidate = 604800;
export const dynamicParams = false;

// Hub pages show the top of the category; every product is still reachable
// through the brand category pages and lists.
const SHOWN = 96;

type Props = { params: Promise<{ category: string }> };

export function generateStaticParams() {
  return CATEGORIES.map((c) => ({ category: c.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const category = getCategory((await params).category);
  if (!category) return {};
  return pageMetadata({
    title: `${category.hubTitle}: Discounts and Promos`,
    description: `${category.blurb} Compare live prices and real discounts across every brand, updated weekly.`,
    path: `/categories/${category.slug}`,
  });
}

export default async function CategoryPage({ params }: Props) {
  const category = getCategory((await params).category);
  if (!category) notFound();
  const { deals: all, fetchedAt } = await getAllDeals();
  const deals = all.filter((d) => d.categorySlug === category.slug);
  const discounted = deals.filter((d) => d.savingsPercent).length;
  const brandCounts = BRANDS.map((b) => ({ b, n: deals.filter((d) => d.brandSlug === b.slug).length })).filter((x) => x.n > 0);
  const lists = liveLists(all).filter((l) => l.def.category.slug === category.slug && l.indexable);
  const prices = deals.map((d) => d.price);

  const faqs = [
    {
      q: `How many ${lowerName(category.plural)} do you track?`,
      a: `${deals.length} right now, from ${brandCounts.length} brands${discounted ? `, with ${discounted} currently discounted` : ""}. The count changes weekly as products are added, sell out, or change price.`,
    },
    {
      q: `Are the discounts on ${lowerName(category.plural)} real?`,
      a: "Yes. A discount and strikethrough price only appear when the retailer reports a genuine reference price. Products at their regular price are shown without one.",
    },
  ];

  return (
    <>
      <div className="container" style={{ paddingTop: 20 }}>
        <Breadcrumbs
          items={[
            { name: "Categories", path: "/categories" },
            { name: category.plural, path: `/categories/${category.slug}` },
          ]}
        />
        <header className="brand-hero">
          <span className="eyebrow">
            <span className="live-dot" aria-hidden="true" />
            Category &middot; All brands
          </span>
          <h1>
            {category.hubTitle.replace(/ Deals$/, "")} <span>Deals</span>
          </h1>
          <p className="lede">
            {category.blurb}
            {prices.length > 0
              ? ` Prices currently range from ${Math.min(...prices).toLocaleString("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 })} to ${Math.max(...prices).toLocaleString("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 })}.`
              : ""}
          </p>
          <div className="page-meta">
            <span>
              <TagIcon /> {deals.length} products, {discounted} discounted
            </span>
            {fetchedAt ? (
              <span>
                <ClockIcon /> Last checked <time dateTime={fetchedAt}>{formatChecked(fetchedAt)}</time>
              </span>
            ) : null}
          </div>
        </header>
      </div>

      <section className="section-tight">
        <div className="container">
          {brandCounts.length > 0 ? (
            <nav aria-label={`${category.plural} by brand`} className="category-links">
              <ul className="chip-list">
                {brandCounts.map(({ b, n }) => (
                  <li key={b.slug}>
                    <Link href={`/brands/${b.slug}/${category.slug}`} className="chip">
                      {b.name}
                      <span className="chip-count">{n}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          ) : null}
          <h2 className="sr-only">{category.plural}</h2>
          {deals.length > 0 ? (
            <>
              <DealBrowser deals={deals.slice(0, SHOWN)} label={category.noun} showCategoryFilter={false} />
              {deals.length > SHOWN ? (
                <p className="muted mt-md" style={{ fontSize: 14 }}>
                  Showing the top {SHOWN} of {deals.length}. Pick a brand above to see every {category.noun} from that
                  brand.
                </p>
              ) : null}
              <JsonLd data={itemListLd(category.hubTitle, deals.slice(0, SHOWN).map((d) => ({ name: d.name, path: d.path })))} />
            </>
          ) : (
            <DealsUnavailable scope={category.noun} />
          )}
        </div>
      </section>

      {lists.length > 0 ? (
        <section className="section-tight">
          <div className="container">
            <h2 style={{ fontSize: 22, marginBottom: 16 }}>Top 10 {lowerName(category.plural)} lists</h2>
            <ul className="chip-list">
              {lists.map((l) => (
                <li key={l.def.slug}>
                  <Link href={`/lists/${l.def.slug}`} className="chip">
                    {l.shortTitle}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </section>
      ) : null}

      <section className="section-tight">
        <div className="container">
          <ValueBar />
        </div>
      </section>

      <section className="section-tight">
        <div className="container" style={{ maxWidth: 880 }}>
          <div className="prose">
            <h2 className="mt-0">How to buy {lowerName(category.plural)} on sale</h2>
            <ul>
              {category.tips.map((t) => (
                <li key={t.slice(0, 30)}>{t}</li>
              ))}
            </ul>
            <h2>Frequently asked questions</h2>
          </div>
          <div style={{ marginTop: 16 }}>
            <Faq items={faqs} />
          </div>
          <p className="mt-md muted" style={{ fontSize: 15 }}>
            <Link href="/categories" className="text-link">
              All categories <ArrowRight />
            </Link>
          </p>
        </div>
      </section>
    </>
  );
}
