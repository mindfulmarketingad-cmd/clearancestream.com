import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { DealBrowser } from "@/components/DealBrowser";
import { DealsUnavailable } from "@/components/DealsUnavailable";
import { Faq } from "@/components/Faq";
import { ArrowRight, ClockIcon, RefreshIcon, TagIcon } from "@/components/Icons";
import { JsonLd } from "@/components/JsonLd";
import { ValueBar } from "@/components/ValueBar";
import { POSTS } from "@/lib/blog";
import { BRANDS, getBrand } from "@/lib/brands";
import { getBrandDeals } from "@/lib/deals";
import { formatChecked } from "@/lib/format";
import { POPULAR_SEARCHES } from "@/lib/search";
import { itemListLd, pageMetadata } from "@/lib/seo";
import { SITE } from "@/lib/site";

export const revalidate = 3600;
export const dynamicParams = false;

type Props = { params: Promise<{ brand: string }> };

export function generateStaticParams() {
  return BRANDS.map((b) => ({ brand: b.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const brand = getBrand((await params).brand);
  if (!brand) return {};
  return pageMetadata({ title: brand.metaTitle, description: brand.metaDescription, path: `/brands/${brand.slug}` });
}

export default async function BrandPage({ params }: Props) {
  const brand = getBrand((await params).brand);
  if (!brand) notFound();
  const { deals, fetchedAt } = await getBrandDeals(brand.slug);
  const others = BRANDS.filter((b) => b.slug !== brand.slug);
  const searches = POPULAR_SEARCHES.filter((s) => s.label.toLowerCase().includes(brand.name.toLowerCase()));
  const band = `${SITE.minDiscount} to ${SITE.maxDiscount}%`;

  const faqs = [
    {
      q: `How often are ${brand.name} deals updated?`,
      a: `Every hour. ClearanceStream checks Amazon for every ${brand.name} product marked down ${band} and shows the time each price was checked. Prices can change between checks, so confirm the final price on Amazon.`,
    },
    {
      q: `Why do you only show ${brand.name} deals between ${SITE.minDiscount}% and ${SITE.maxDiscount}% off?`,
      a: `Below ${SITE.minDiscount}% the saving is usually routine price movement. Above ${SITE.maxDiscount}%, the reference price is often inflated or the listing is unusual. The ${band} band is where genuine markdowns and clearances concentrate.`,
    },
    ...brand.faqs,
  ];

  return (
    <>
      <div className="container" style={{ paddingTop: 20 }}>
        <Breadcrumbs
          items={[
            { name: "Brands", path: "/brands" },
            { name: brand.name, path: `/brands/${brand.slug}` },
          ]}
        />
        <header className="brand-hero">
          <span className="eyebrow">
            <span className="live-dot" aria-hidden="true" />
            Amazon &middot; Hidden markdowns
          </span>
          <h1>
            {brand.name} Hidden Deals <span>&amp; Clearances</span>
          </h1>
          <p className="lede">
            Every {brand.name} product on Amazon marked down {band}, from gaming PCs to peripherals. Live prices,
            refreshed hourly.
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
                <RefreshIcon /> Refreshed hourly
              </span>
            )}
          </div>
        </header>
      </div>

      <section className="section-tight">
        <div className="container">
          <h2 className="sr-only">All {brand.name} deals</h2>
          {deals.length > 0 ? (
            <>
              <DealBrowser deals={deals} label={brand.name} />
              <JsonLd data={itemListLd(`${brand.name} deals`, deals.map((d) => ({ name: d.name, path: d.path })))} />
            </>
          ) : (
            <DealsUnavailable scope={brand.name} />
          )}
        </div>
      </section>

      <section className="section-tight">
        <div className="container">
          <ValueBar />
        </div>
      </section>

      <section className="section-tight">
        <div className="container with-aside">
          <div>
            <div className="prose">
              <h2 className="mt-0">About {brand.name} clearance deals</h2>
              <p>{brand.intro}</p>
              {brand.overview.map((p) => (
                <p key={p.slice(0, 32)}>{p}</p>
              ))}
              <p>
                Use the search box, category filter, and sort options above to narrow the list. Every deal is at least{" "}
                {SITE.minDiscount}% below Amazon&apos;s reference price, and new {brand.name} markdowns appear as soon as
                our hourly check finds them.
              </p>

              <h2>What we track from {brand.name}</h2>
            </div>
            <div className="where-grid">
              {brand.lines.map((l) => (
                <div key={l.name}>
                  <h3>{l.name}</h3>
                  <p>{l.summary}</p>
                </div>
              ))}
            </div>

            <div className="prose">
              <h2>How to buy {brand.name} on sale</h2>
              <ul>
                {brand.buyingTips.map((t) => (
                  <li key={t.slice(0, 32)}>{t}</li>
                ))}
              </ul>
              <p>
                For a deeper walkthrough, read our <Link href="/blog/gaming-pc-deals-guide">gaming PC deals guide</Link>{" "}
                and the <Link href="/blog/prebuilt-gaming-pc-buying-guide">prebuilt buying guide</Link>.
              </p>
              <h2>Frequently asked questions</h2>
            </div>
            <div style={{ marginTop: 16 }}>
              <Faq items={faqs} />
            </div>

            <h2 className="sub-head" style={{ marginBottom: 16 }}>
              Browse clearance at other brands
            </h2>
            <ul className="chip-list">
              {others.map((b) => (
                <li key={b.slug}>
                  <Link href={`/brands/${b.slug}`} className="chip">
                    {b.name} clearance deals
                  </Link>
                </li>
              ))}
            </ul>
            <p className="mt-md muted" style={{ fontSize: 15 }}>
              Or browse{" "}
              <Link href="/deals" className="text-link">
                all hidden deals <ArrowRight />
              </Link>
            </p>
          </div>

          <aside className="aside" aria-label="Related">
            <div className="aside-box">
              <h2>Guides</h2>
              <ul>
                {POSTS.map((p) => (
                  <li key={p.slug}>
                    <Link href={`/blog/${p.slug}`}>{p.title}</Link>
                  </li>
                ))}
              </ul>
            </div>
            {searches.length > 0 ? (
              <div className="aside-box">
                <h2>Popular searches</h2>
                <ul>
                  {searches.map((s) => (
                    <li key={s.slug}>
                      <Link href={s.path}>{s.label} deals</Link>
                    </li>
                  ))}
                </ul>
              </div>
            ) : null}
            <div className="aside-box">
              <h2>All brands</h2>
              <ul>
                {BRANDS.map((b) => (
                  <li key={b.slug}>
                    <Link href={`/brands/${b.slug}`}>{b.name}</Link>
                  </li>
                ))}
              </ul>
            </div>
          </aside>
        </div>
      </section>
    </>
  );
}
