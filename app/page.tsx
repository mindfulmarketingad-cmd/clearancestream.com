import Link from "next/link";
import { DealCard, DealGrid } from "@/components/DealCard";
import { DealsUnavailable } from "@/components/DealsUnavailable";
import { Faq } from "@/components/Faq";
import {
  ArrowRight,
  CheckIcon,
  FilterIcon,
  RadarIcon,
  SearchIcon,
  TagIcon,
} from "@/components/Icons";
import { EmailSignup } from "@/components/EmailSignup";
import { JsonLd } from "@/components/JsonLd";
import { ValueBar } from "@/components/ValueBar";
import { POSTS } from "@/lib/blog";
import { FEATURED_SIZE, blogImagePath } from "@/lib/featured-image";
import { ScanCta } from "@/components/ScanCta";
import { BRAND_GROUPS, BRANDS, brandsInGroup, getBrand } from "@/lib/brands";
import { BrandDirectory } from "@/components/BrandDirectory";
import { gamingPcsFirst, getAllDeals } from "@/lib/deals";
import { pickPool } from "@/lib/picks";
import { DealPicks } from "@/components/DealPicks";
import { formatChecked } from "@/lib/format";
import { POPULAR_SEARCHES } from "@/lib/search";
import { itemListLd, pageMetadata } from "@/lib/seo";
import { SITE } from "@/lib/site";


const FEATURED = ["corsair", "razer", "logitech", "alienware", "asus-rog", "scuf", "steelseries", "msi"];

export const metadata = pageMetadata({
  title: "Gaming PC Hidden Deals & Clearances | ClearanceStream.com",
  absoluteTitle: true,
  description:
    "We help gaming PC enthusiasts track hidden deals, price drops, and clearances on their favorite brands. Live discounts on gaming PCs, mice, keyboards, headsets, and controllers from the biggest gaming brands.",
  path: "/",
});

const HOME_FAQ = [
  {
    q: "What is a hidden gaming PC deal?",
    a: "A hidden deal is a discount that is not promoted on a retailer's homepage or in a sale banner. It is often a single configuration marked down to clear stock, or a quiet price cut when a new hardware generation launches. ClearanceStream finds these by checking live prices every week.",
  },
  {
    q: "Where do ClearanceStream prices come from?",
    a: "Every price comes from an official retail product feed. We show the current price, the reference price, the saving, and the time the price was checked. Prices can change after that time, so always confirm the final price at checkout.",
  },
  {
    q: "Does it cost anything to use ClearanceStream?",
    a: "No. The site is free to use and you never need an account. We may earn a commission when you buy through our links, at no extra cost to you.",
  },
  {
    q: "Which gaming PC brands do you track?",
    a: `We track ${BRANDS.length} of the biggest gaming brands, including ${FEATURED.slice(0, 6).map((s) => getBrand(s)!.name).join(", ")}, and SCUF Gaming, across gaming PCs, laptops, mice, keyboards, headsets, and controllers.`,
  },
];

export default async function HomePage() {
  const { deals, fetchedAt } = await getAllDeals();
  const ordered = gamingPcsFirst(deals);
  const featured = ordered.slice(0, 3);
  const trending = ordered.slice(0, 8);
  const biggest = deals.reduce((m, d) => Math.max(m, d.savingsPercent ?? 0), 0);
  const withSavings = deals.filter((d) => d.savingsPercent).length;
  const pool = pickPool(deals);

  return (
    <>
      <section className="hero">
        <video className="hero-bg" autoPlay muted loop playsInline preload="auto" aria-hidden="true" tabIndex={-1}>
          <source src="/hero-bg.mp4" type="video/mp4" />
        </video>
        <div className="hero-tint" aria-hidden="true" />
        <div className="container hero-grid">
          <div>
            <span className="eyebrow">
              <span className="live-dot" aria-hidden="true" />
              Live prices, refreshed weekly
            </span>
            <h1>
              Hidden Deals &amp; Clearances <span>From Your Favorite Tech Brands</span>
            </h1>
            <p className="hero-lede">
              We help gaming PC enthusiasts track deals and clearances on their favorite brands, so you catch the price
              drop before it is gone.
            </p>
            <ScanCta
              groups={BRAND_GROUPS.map((g) => ({
                name: g.name,
                brands: brandsInGroup(g.id).map((b) => ({ slug: b.slug, name: b.name })),
              }))}
            />
            <p className="hero-links">
              Or <Link href="/deals">browse all deals</Link> &middot; <Link href="/brands">shop by brand</Link>
            </p>
            <ul className="hero-facts">
              <li>
                <CheckIcon /> Free to use
              </li>
              <li>
                <CheckIcon /> No account required
              </li>
              <li>
                <CheckIcon /> Verified live prices
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
                    <b>Scan prices every week</b>
                    Live prices on gaming PCs and gear from every brand we track.
                  </span>
                </li>
                <li>
                  <span className="step-num">2</span>
                  <span>
                    <b>Compare against reference prices</b>
                    Only real price drops below the reference price make the list.
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
          <span>Discounts and promos from</span>
          {FEATURED.map((slug) => getBrand(slug)!).map((b) => (
            <Link key={b.slug} href={`/brands/${b.slug}`}>
              {b.name}
            </Link>
          ))}
          <Link href="/brands" className="text-link" style={{ fontSize: 14, fontWeight: 500 }}>
            All brands <ArrowRight />
          </Link>
        </div>
      </div>

      {pool.length > 0 ? (
        <section className="section-tight spotlight-section" aria-labelledby="picks-title">
          <div className="container">
            <div className="section-head">
              <div>
                <h2 id="picks-title">Deal of the Day &amp; Deal of the Week</h2>
                <p>Our top picks right now: real discounts on well-reviewed products, chosen from every brand we track.</p>
              </div>
            </div>
            <DealPicks pool={pool} builtAt={new Date().toISOString()} />
          </div>
        </section>
      ) : null}

      <section className="section">
        <div className="container">
          <div className="section-head">
            <div>
              <h2>Trending gaming PC deals</h2>
              <p>The biggest live discounts on gaming PCs and gear right now, gaming desktops first.</p>
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
              <dt>{deals.length > 0 ? "Gaming PCs tracked now" : "Live price feed"}</dt>
            </div>
            <div>
              <dd className="mono">{BRANDS.length}</dd>
              <dt>Brands covered</dt>
            </div>
            <div>
              <dd>Weekly</dd>
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
              <p>A simple process built around one rule: every price you see is live and verified.</p>
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
                Every week we check live prices on gaming PCs and gear from the brands we track, including
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
                Accessories and non-gaming systems are removed, and each listing is compared against its
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
                Deals are ranked by discount with the time each price was checked. Click through and buy from the retailer, at
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
              <h2>Discounts and promos by brand</h2>
              <p>Gaming PCs, laptops, peripherals, and controllers from the biggest brands in gaming.</p>
            </div>
            <Link href="/brands" className="text-link">
              All brands <ArrowRight />
            </Link>
          </div>
          <BrandDirectory deals={deals} />
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
            {POSTS.slice(0, 4).map((p) => (
              <Link key={p.slug} href={`/blog/${p.slug}`} className="card">
                <span className="card-image">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={blogImagePath(p.slug)} alt="" width={FEATURED_SIZE.width} height={FEATURED_SIZE.height} loading="lazy" />
                </span>
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
          <div className="signup-band">
            <div>
              <h2>Get gaming deal alerts</h2>
              <p>The biggest discounts on gaming PCs and gear, sent to your inbox. Free, and unsubscribe anytime.</p>
            </div>
            <EmailSignup id="home" />
          </div>
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
