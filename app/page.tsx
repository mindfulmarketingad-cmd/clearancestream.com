import Link from "next/link";
import { DealCard, DealGrid } from "@/components/DealCard";
import { DealsUnavailable } from "@/components/DealsUnavailable";
import { Faq } from "@/components/Faq";
import {
  ArrowRight,
  BookIcon,
  CheckIcon,
  FilterIcon,
  RadarIcon,
  SearchIcon,
  TagIcon,
} from "@/components/Icons";
import { JsonLd } from "@/components/JsonLd";
import { ValueBar } from "@/components/ValueBar";
import { POSTS } from "@/lib/blog";
import { BRANDS } from "@/lib/brands";
import { gamingPcsFirst, getAllDeals } from "@/lib/deals";
import { formatChecked } from "@/lib/format";
import { POPULAR_SEARCHES } from "@/lib/search";
import { itemListLd, pageMetadata } from "@/lib/seo";
import { SITE } from "@/lib/site";

export const revalidate = 86400;

export const metadata = pageMetadata({
  title: "Gaming PC Hidden Deals & Clearances | ClearanceStream.com",
  absoluteTitle: true,
  description:
    "We help gaming PC enthusiasts track hidden deals, price drops, and clearances on their favorite brands. Live Amazon prices on Corsair, Alienware, Razer, Logitech G, SteelSeries, and Origin PC.",
  path: "/",
});

const HOME_FAQ = [
  {
    q: "What is a hidden gaming PC deal?",
    a: "A hidden deal is a discount that is not promoted on a retailer's homepage or in a sale banner. It is often a single configuration marked down to clear stock, or a quiet price cut when a new hardware generation launches. ClearanceStream finds these by checking live Amazon prices every day.",
  },
  {
    q: "Where do ClearanceStream prices come from?",
    a: "Every price comes directly from Amazon through Amazon's official product API. We show the current price, Amazon's reference price, the saving, and the time the price was checked. Prices can change after that time, so always confirm the final price on Amazon.",
  },
  {
    q: "Does it cost anything to use ClearanceStream?",
    a: "No. The site is free to use and you never need an account. We earn a commission from Amazon when you buy through our links, at no extra cost to you.",
  },
  {
    q: "Which gaming PC brands do you track?",
    a: `We currently track ${BRANDS.map((b) => b.name).join(" and ")} gaming desktops, with more brands being added.`,
  },
];

export default async function HomePage() {
  const { deals, fetchedAt } = await getAllDeals();
  const ordered = gamingPcsFirst(deals);
  const featured = ordered.slice(0, 3);
  const trending = ordered.slice(0, 8);
  const biggest = deals.reduce((m, d) => Math.max(m, d.savingsPercent ?? 0), 0);
  const withSavings = deals.filter((d) => d.savingsPercent).length;

  return (
    <>
      <section className="hero">
        <div className="container hero-grid">
          <div>
            <span className="eyebrow">
              <span className="live-dot" aria-hidden="true" />
              Live Amazon prices, refreshed daily
            </span>
            <h1>
              Gaming PC Hidden Deals <span>&amp; Clearances</span>
            </h1>
            <p className="hero-lede">
              We help gaming PC enthusiasts track deals and clearances on their favorite brands, so you catch the price
              drop before it is gone.
            </p>
            <div className="hero-actions">
              <Link href="/deals" className="btn btn-primary">
                <SearchIcon />
                Browse all deals
              </Link>
              <Link href="/brands" className="btn btn-secondary">
                Shop by brand
              </Link>
            </div>
            <ul className="hero-facts">
              <li>
                <CheckIcon /> Free to use
              </li>
              <li>
                <CheckIcon /> No account required
              </li>
              <li>
                <CheckIcon /> Prices direct from Amazon
              </li>
            </ul>
            {deals.length > 0 ? (
              <dl className="hero-stats">
                <div>
                  <dt>Deals live now</dt>
                  <dd className="mono">{withSavings || deals.length}</dd>
                </div>
                {biggest > 0 ? (
                  <div>
                    <dt>Biggest discount</dt>
                    <dd className="mono">{biggest}%</dd>
                  </div>
                ) : null}
                {fetchedAt ? (
                  <div>
                    <dt>Last checked</dt>
                    <dd className="mono" style={{ fontSize: 16, paddingTop: 6 }}>
                      <time dateTime={fetchedAt}>{formatChecked(fetchedAt)}</time>
                    </dd>
                  </div>
                ) : null}
              </dl>
            ) : null}
          </div>

          {featured.length > 0 ? (
            <div className="hero-stack" aria-label="Top deals right now">
              {featured.map((deal, i) => (
                <DealCard key={deal.asin} deal={deal} priority={i === 0} />
              ))}
            </div>
          ) : (
            <div className="hero-panel">
              <h2>How ClearanceStream finds deals</h2>
              <ol>
                <li>
                  <span className="step-num">1</span>
                  <span>
                    <b>Scan Amazon every day</b>
                    Live prices on gaming PCs and gear from every brand we track.
                  </span>
                </li>
                <li>
                  <span className="step-num">2</span>
                  <span>
                    <b>Compare against reference prices</b>
                    Only real price drops below Amazon&apos;s reference price make the list.
                  </span>
                </li>
                <li>
                  <span className="step-num">3</span>
                  <span>
                    <b>Rank by savings</b>
                    The biggest discounts surface first, with the time each price was checked.
                  </span>
                </li>
              </ol>
            </div>
          )}
        </div>
      </section>

      <div className="brand-strip">
        <div className="container">
          <span>We track gaming PC deals from</span>
          {BRANDS.map((b) => (
            <Link key={b.slug} href={`/brands/${b.slug}`}>
              {b.name}
            </Link>
          ))}
          <Link href="/brands" className="text-link" style={{ fontSize: 14, fontWeight: 500 }}>
            All brands <ArrowRight />
          </Link>
        </div>
      </div>

      <section className="section">
        <div className="container">
          <div className="section-head">
            <div>
              <h2>Trending gaming PC deals</h2>
              <p>Gaming PCs and gear marked down 20 to 50% on Amazon right now, gaming desktops first.</p>
            </div>
            {trending.length > 0 ? (
              <Link href="/deals" className="text-link">
                View all deals <ArrowRight />
              </Link>
            ) : null}
          </div>
          {trending.length > 0 ? (
            <>
              <DealGrid deals={trending} />
              <JsonLd data={itemListLd("Trending gaming PC deals", trending.map((d) => ({ name: d.name, path: d.path })))} />
            </>
          ) : (
            <DealsUnavailable />
          )}
        </div>
      </section>

      <section className="stats-band" aria-label="ClearanceStream at a glance">
        <div className="container">
          <dl>
            <div>
              <dd>{deals.length > 0 ? <span className="mono">{deals.length}</span> : "Live"}</dd>
              <dt>{deals.length > 0 ? "Gaming PCs tracked now" : "Amazon price feed"}</dt>
            </div>
            <div>
              <dd className="mono">{BRANDS.length}</dd>
              <dt>Brands covered</dt>
            </div>
            <div>
              <dd>Daily</dd>
              <dt>Price refresh</dt>
            </div>
            <div>
              <dd className="mono">$0</dd>
              <dt>Cost to you</dt>
            </div>
          </dl>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="section-head">
            <div>
              <h2>How ClearanceStream works</h2>
              <p>A simple process built around one rule: every price you see comes straight from Amazon.</p>
            </div>
          </div>
          <div className="card-grid">
            <div className="card">
              <div className="icon-tile">
                <RadarIcon />
              </div>
              <span className="step-label">Step 1</span>
              <h3>We scan</h3>
              <p>
                Every day we check live Amazon prices on gaming desktops from the brands we track, including
                configurations that never appear in a sale banner.
              </p>
            </div>
            <div className="card">
              <div className="icon-tile">
                <FilterIcon />
              </div>
              <span className="step-label">Step 2</span>
              <h3>We filter</h3>
              <p>
                Accessories and non-gaming systems are removed, and each listing is compared against Amazon&apos;s
                reference price to measure the real saving.
              </p>
            </div>
            <div className="card">
              <div className="icon-tile">
                <TagIcon />
              </div>
              <span className="step-label">Step 3</span>
              <h3>You save</h3>
              <p>
                Deals are ranked by discount with the time each price was checked. Click through and buy on Amazon, at
                no extra cost.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="section section-muted">
        <div className="container">
          <div className="section-head">
            <div>
              <h2>Browse deals by brand</h2>
              <p>Gaming PCs and gear from the brands PC gamers buy most, with buying advice for each.</p>
            </div>
            <Link href="/brands" className="text-link">
              All brands <ArrowRight />
            </Link>
          </div>
          <div className="card-grid">
            {BRANDS.map((b) => {
              const count = deals.filter((d) => d.brandSlug === b.slug).length;
              return (
                <Link key={b.slug} href={`/brands/${b.slug}`} className="card">
                  <h3>{b.name} deals</h3>
                  <p className="clamp-3">{b.intro}</p>
                  <span className="text-link">
                    {count > 0 ? `View ${count} live ${b.name} deals` : `View ${b.name} deals`} <ArrowRight />
                  </span>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="section-head">
            <div>
              <h2>Gaming PC buying guides</h2>
              <p>Know what a good price looks like before you buy.</p>
            </div>
            <Link href="/blog" className="text-link">
              All guides <ArrowRight />
            </Link>
          </div>
          <div className="card-grid card-grid-2">
            {POSTS.map((p) => (
              <Link key={p.slug} href={`/blog/${p.slug}`} className="card">
                <div className="icon-tile">
                  <BookIcon />
                </div>
                <h3>{p.title}</h3>
                <p>{p.excerpt}</p>
                <span className="text-link">
                  Read the guide <ArrowRight />
                </span>
              </Link>
            ))}
          </div>

          <h2 className="sub-head" style={{ fontSize: 18, marginTop: 56, marginBottom: 16 }}>
            Popular gaming PC searches
          </h2>
          <ul className="chip-list">
            {POPULAR_SEARCHES.map((s) => (
              <li key={s.slug}>
                <Link href={s.path} className="chip">
                  <SearchIcon />
                  {s.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="section-tight">
        <div className="container">
          <ValueBar />
        </div>
      </section>

      <section className="section">
        <div className="container" style={{ maxWidth: 880 }}>
          <div className="section-head">
            <div>
              <h2>Gaming PC deals: common questions</h2>
            </div>
          </div>
          <Faq items={HOME_FAQ} />
          <p className="muted mt-md" style={{ fontSize: 15 }}>
            New to buying a gaming PC? Start with our{" "}
            <Link href="/blog/gaming-pc-deals-guide" className="text-link">
              guide to finding real gaming PC deals
            </Link>
            . Questions about {SITE.name}? <Link href="/about" className="text-link">Learn how we work</Link>.
          </p>
        </div>
      </section>
    </>
  );
}
