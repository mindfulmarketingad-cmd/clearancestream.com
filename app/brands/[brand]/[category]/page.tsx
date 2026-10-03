import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { CategoryLinks } from "@/components/CategoryLinks";
import { DealBrowser } from "@/components/DealBrowser";
import { DealsUnavailable } from "@/components/DealsUnavailable";
import { Faq } from "@/components/Faq";
import { ArrowRight, ClockIcon, RefreshIcon, TagIcon } from "@/components/Icons";
import { JsonLd } from "@/components/JsonLd";
import { ValueBar } from "@/components/ValueBar";
import { BRANDS, getBrand } from "@/lib/brands";
import { getCategory } from "@/lib/categories";
import { getAllDeals } from "@/lib/deals";
import { formatChecked, lowerName } from "@/lib/format";
import { itemListLd, pageMetadata } from "@/lib/seo";
import { SITE } from "@/lib/site";

export const revalidate = 86400;
// Rendered on first request rather than at build time: most brand/category
// combinations are empty at any moment, and this keeps builds to one API fetch.
export const dynamicParams = true;

type Props = { params: Promise<{ brand: string; category: string }> };

export function generateStaticParams() {
  return [];
}

async function load(params: Props["params"]) {
  const { brand: brandSlug, category: categorySlug } = await params;
  const brand = getBrand(brandSlug);
  const category = getCategory(categorySlug);
  if (!brand || !category) notFound();
  const { deals: all, fetchedAt } = await getAllDeals();
  const brandDeals = all.filter((d) => d.brandSlug === brand.slug);
  const deals = brandDeals.filter((d) => d.categorySlug === category.slug);
  // Same category from other brands, for cross-linking.
  const otherBrands = BRANDS.filter(
    (b) => b.slug !== brand.slug && all.some((d) => d.brandSlug === b.slug && d.categorySlug === category.slug),
  );
  return { brand, category, deals, brandDeals, otherBrands, fetchedAt };
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { brand, category, deals } = await load(params);
  return pageMetadata({
    title: `${brand.name} ${category.name} Discounts and Promos`,
    description: `${deals.length > 0 ? `${deals.length} ` : ""}${brand.name} ${category.noun} discounts and promos with live prices, refreshed daily by ClearanceStream.`,
    path: `/brands/${brand.slug}/${category.slug}`,
    // Empty category pages stay out of the index until they have deals.
    noindex: deals.length === 0,
  });
}

export default async function BrandCategoryPage({ params }: Props) {
  const { brand, category, deals, brandDeals, otherBrands, fetchedAt } = await load(params);
  const path = `/brands/${brand.slug}/${category.slug}`;

  const faqs = [
    {
      q: `Are these ${brand.name} ${category.noun} discounts real?`,
      a: `Discounts are only shown when there is a genuine reference price, which may be a list price or a recent typical price. We show which one on each product page so you can judge the saving.`,
    },
    {
      q: `How often do ${brand.name} ${lowerName(category.name)} prices change?`,
      a: `Prices can change at any time. We check every day and show the time each price was checked, so always confirm the final price at checkout.`,
    },
  ];

  return (
    <>
      <div className="container" style={{ paddingTop: 20 }}>
        <Breadcrumbs
          items={[
            { name: "Brands", path: "/brands" },
            { name: brand.name, path: `/brands/${brand.slug}` },
            { name: category.name, path },
          ]}
        />
        <header className="brand-hero">
          <span className="eyebrow">
            <span className="live-dot" aria-hidden="true" />
            {brand.name} &middot; {category.name}
          </span>
          <h1>
            {brand.name} {category.name} <span>Deals</span>
          </h1>
          <p className="lede">
            Live prices on every {brand.name} {category.noun} we track, with current discounts first. Refreshed daily.
          </p>
          <div className="page-meta">
            <span>
              <TagIcon /> {deals.length} {deals.length === 1 ? "deal" : "deals"} live right now
            </span>
            {fetchedAt ? (
              <span>
                <ClockIcon /> Last checked <time dateTime={fetchedAt}>{formatChecked(fetchedAt)}</time>
              </span>
            ) : (
              <span>
                <RefreshIcon /> Refreshed daily
              </span>
            )}
          </div>
        </header>
      </div>

      <section className="section-tight">
        <div className="container">
          <h2 className="sr-only">
            {brand.name} {category.name} deals
          </h2>
          <CategoryLinks brand={brand} deals={brandDeals} current={category.slug} />
          {deals.length > 0 ? (
            <>
              <DealBrowser deals={deals.slice(0, 150)} label={`${brand.name} ${category.noun}`} showCategoryFilter={false} />
              <JsonLd
                data={itemListLd(
                  `${brand.name} ${category.name} deals`,
                  deals.map((d) => ({ name: d.name, path: d.path })),
                )}
              />
            </>
          ) : (
            <DealsUnavailable scope={`${brand.name} ${category.noun}`} />
          )}
        </div>
      </section>

      <section className="section-tight">
        <div className="container">
          <ValueBar />
        </div>
      </section>

      <section className="section-tight">
        <div className="container" style={{ maxWidth: 880 }}>
          <div className="prose">
            <h2 className="mt-0">
              How to buy {brand.name} {lowerName(category.name)} on sale
            </h2>
            <ul>
              {category.tips.map((t) => (
                <li key={t.slice(0, 32)}>{t}</li>
              ))}
            </ul>
            <p>
              See every <Link href={`/brands/${brand.slug}`}>{brand.name} deal</Link>, or read our{" "}
              <Link href="/blog/gaming-pc-deals-guide">guide to judging gaming deals</Link>.
            </p>
            <h2>Frequently asked questions</h2>
          </div>
          <div style={{ marginTop: 16 }}>
            <Faq items={faqs} />
          </div>

          {otherBrands.length > 0 ? (
            <>
              <h2 className="sub-head" style={{ marginBottom: 16 }}>
                {category.name} deals from other brands
              </h2>
              <ul className="chip-list">
                {otherBrands.map((b) => (
                  <li key={b.slug}>
                    <Link href={`/brands/${b.slug}/${category.slug}`} className="chip">
                      {b.name} {lowerName(category.name)}
                    </Link>
                  </li>
                ))}
              </ul>
            </>
          ) : null}

          <p className="mt-md muted" style={{ fontSize: 15 }}>
            <Link href={`/brands/${brand.slug}`} className="text-link">
              All {brand.name} deals <ArrowRight />
            </Link>
          </p>
        </div>
      </section>
    </>
  );
}
