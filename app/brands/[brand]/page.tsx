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
import { getPost, type Post } from "@/lib/blog";
import { BRANDS, brandDescription, brandTitle, getBrand } from "@/lib/brands";
import { getAllDeals, getBrandDeals } from "@/lib/deals";
import { listsForBrand, liveLists } from "@/lib/lists";
import { AllBrandLinks } from "@/components/BrandLinks";
import { ListChips } from "@/components/ListLinks";
import { formatChecked } from "@/lib/format";
import { POPULAR_SEARCHES } from "@/lib/search";
import { itemListLd, pageMetadata } from "@/lib/seo";

export const revalidate = 604800;
export const dynamicParams = false;

type Props = { params: Promise<{ brand: string }> };

/** Guides most relevant to each brand group. */
const GROUP_GUIDES: Record<string, string[]> = {
  pcs: ["gaming-pc-deals-guide", "prebuilt-gaming-pc-buying-guide", "best-time-to-buy-a-gaming-pc", "gaming-laptop-vs-gaming-pc", "what-graphics-card-do-i-need"],
  peripherals: ["wireless-vs-wired-gaming-mouse", "mechanical-keyboard-switches-explained", "gaming-pc-deals-guide"],
  displays: ["oled-vs-ips-gaming-monitor", "what-graphics-card-do-i-need", "gaming-pc-deals-guide"],
  controllers: ["are-pro-controllers-worth-it", "gaming-pc-deals-guide"],
};

export function generateStaticParams() {
  return BRANDS.map((b) => ({ brand: b.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const brand = getBrand((await params).brand);
  if (!brand) return {};
  return pageMetadata({ title: brandTitle(brand), description: brandDescription(brand), path: `/brands/${brand.slug}` });
}

export default async function BrandPage({ params }: Props) {
  const brand = getBrand((await params).brand);
  if (!brand) notFound();
  const { deals, fetchedAt } = await getBrandDeals(brand.slug);
  const { deals: all } = await getAllDeals();
  const brandLists = listsForBrand(liveLists(all), brand.slug).slice(0, 18);
  const guides = (GROUP_GUIDES[brand.group] ?? []).map(getPost).filter((p): p is Post => !!p);
  const searches = POPULAR_SEARCHES.filter((s) => s.label.toLowerCase().includes(brand.name.toLowerCase()));

  const faqs = [
    {
      q: `How often are ${brand.name} deals updated?`,
      a: `Every week. ClearanceStream checks live prices on every ${brand.name} product we track and shows the time each price was checked. Prices can change between checks, so confirm the final price at checkout.`,
    },
    {
      q: `Are ${brand.name} discounts on ClearanceStream real?`,
      a: `Yes. A strikethrough price and discount only appear when the retailer reports a genuine reference price for that ${brand.name} product. Items at their regular price are listed without one.`,
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
            {brand.name} &middot; Discounts &amp; promos
          </span>
          <h1>
            {brand.name} <span>Discounts and Promos</span>
          </h1>
          <p className="lede">
            Live prices on every {brand.name} product we track, with current discounts first. Refreshed weekly.
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
                <RefreshIcon /> Refreshed weekly
              </span>
            )}
          </div>
        </header>
      </div>

      <section className="section-tight" id="deals">
        <div className="container">
          <h2 className="sr-only">All {brand.name} deals</h2>
          {deals.length > 0 ? (
            <>
              <CategoryLinks brand={brand} deals={deals} />
              <DealBrowser deals={deals.slice(0, 96)} label={brand.name} showCategoryFilter={false} />
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
              <h2 className="mt-0">About {brand.name} discounts and promos</h2>
              <p>{brand.intro}</p>
              {brand.overview.map((p) => (
                <p key={p.slice(0, 32)}>{p}</p>
              ))}
              <p>
                Use the search box, category filter, and sort options above to narrow the list. Discounts are always measured against a genuine
                reference price, and new {brand.name} markdowns appear as soon as
                our weekly check finds them.
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

            <p className="callout-link">
              Looking for {brand.name} coupons?{" "}
              <Link href={`/coupons/${brand.slug}`} className="text-link">
                See {brand.name} coupons and deals <ArrowRight />
              </Link>
            </p>

            {brandLists.length > 0 ? (
              <>
                <h2 className="sub-head" style={{ marginBottom: 16 }}>
                  Top lists featuring {brand.name}
                </h2>
                <ListChips lists={brandLists} />
                <p className="mt-md muted" style={{ fontSize: 15 }}>
                  Or browse{" "}
                  <Link href="/lists" className="text-link">
                    all lists <ArrowRight />
                  </Link>
                </p>
              </>
            ) : null}

            <AllBrandLinks current={brand.slug} title="Discounts from other brands" />
          </div>

          <aside className="aside" aria-label="Related">
            <div className="aside-box">
              <h2>Guides</h2>
              <ul>
                {guides.map((p) => (
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
              <h2>Browse</h2>
              <ul>
                <li>
                  <Link href="/brands">All brands</Link>
                </li>
                <li>
                  <Link href="/deals">All discounts</Link>
                </li>
              </ul>
            </div>
          </aside>
        </div>
      </section>
    </>
  );
}
