import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { DealsUnavailable } from "@/components/DealsUnavailable";
import { Faq } from "@/components/Faq";
import { ArrowRight, ClockIcon, TagIcon } from "@/components/Icons";
import { JsonLd } from "@/components/JsonLd";
import { ValueBar } from "@/components/ValueBar";
import { BRANDS } from "@/lib/brands";
import { CATEGORIES, getCategory } from "@/lib/categories";
import { getAllDeals } from "@/lib/deals";
import { formatChecked, lowerName } from "@/lib/format";
import { defaultRank, liveLists } from "@/lib/lists";
import { listInsights } from "@/lib/list-insights";
import { CategoryTable } from "@/components/CategoryTable";
import { dealTable } from "@/lib/deal-table";
import { RankedPicks } from "@/components/RankedPicks";
import { toPickDeal } from "@/components/PickItem";
import { itemListLd, pageMetadata } from "@/lib/seo";
import { getPost } from "@/lib/blog";

/** Buying guides worth reading before shopping each category. */
const CATEGORY_GUIDES: Record<string, string[]> = {
  "gaming-pcs": [
    "prebuilt-gaming-pc-buying-guide",
    "gaming-pc-deals-guide",
    "how-much-should-i-spend-on-a-gaming-pc",
    "best-time-to-buy-a-gaming-pc",
    "refurbished-gaming-pc-worth-it",
    "how-much-ram-for-gaming",
  ],
  laptops: ["gaming-laptop-vs-gaming-pc", "how-much-ram-for-gaming", "refurbished-gaming-pc-worth-it", "best-time-to-buy-a-gaming-pc"],
  keyboards: ["mechanical-keyboard-switches-explained"],
  mice: ["wireless-vs-wired-gaming-mouse"],
  monitors: ["oled-vs-ips-gaming-monitor", "what-graphics-card-do-i-need"],
  controllers: ["are-pro-controllers-worth-it"],
  components: ["how-to-find-pc-build-deals", "what-graphics-card-do-i-need", "how-much-ram-for-gaming", "how-much-should-i-spend-on-a-gaming-pc"],
  "video-cards": ["how-to-find-pc-build-deals", "what-graphics-card-do-i-need", "how-much-should-i-spend-on-a-gaming-pc", "gaming-pc-deals-guide"],
  memory: ["how-much-ram-for-gaming", "how-to-find-pc-build-deals", "prebuilt-gaming-pc-buying-guide"],
  motherboards: ["how-to-find-pc-build-deals", "what-graphics-card-do-i-need", "how-much-ram-for-gaming", "how-much-should-i-spend-on-a-gaming-pc"],
  webcams: ["gaming-pc-deals-guide"],
  speakers: ["gaming-pc-deals-guide"],
};

export const dynamicParams = false;

type Props = { params: Promise<{ category: string }> };

export function generateStaticParams() {
  return CATEGORIES.map((c) => ({ category: c.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const category = getCategory((await params).category);
  if (!category) return {};
  const { deals } = await getAllDeals();
  return pageMetadata({
    noindex: !deals.some((d) => d.categorySlug === category.slug),
    title: `${category.hubTitle}: Discounts and Promos`,
    description: `${category.blurb} Compare live prices and real discounts across every brand, updated weekly.`,
    path: `/categories/${category.slug}`,
  });
}

export default async function CategoryPage({ params }: Props) {
  const category = getCategory((await params).category);
  if (!category) notFound();
  const guides = (CATEGORY_GUIDES[category.slug] ?? []).map(getPost).filter((p) => p !== undefined);
  const { deals: all, fetchedAt } = await getAllDeals();
  const deals = all.filter((d) => d.categorySlug === category.slug);
  const discounted = deals.filter((d) => d.savingsPercent).length;
  const brandCounts = BRANDS.map((b) => ({ b, n: deals.filter((d) => d.brandSlug === b.slug).length })).filter((x) => x.n > 0);
  const lists = liveLists(all).filter((l) => l.def.category.slug === category.slug && l.indexable);
  const prices = deals.map((d) => d.price);
  // Ranked top picks across every brand in the category.
  const pool = deals.filter((d) => d.inStock).sort(defaultRank).slice(0, 80);
  const insights = listInsights(pool);
  const picks = pool.map((d, i) => ({ deal: toPickDeal(d), info: insights.get(d.asin)!, rank: i + 1 }));
  const pickBrands = [...new Set(pool.map((d) => d.brandName))].sort();
  const { rows, columns, facets } = dealTable([...deals].sort(defaultRank));

  const faqs = [
    ...(category.faqs ?? []),
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
            {category.hubTitle.replace(/ Deals$/, "")} <span>Deals {new Date().getFullYear()} - Clearance List</span>
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

      <section className="section-tight" id="deals">
        <div className="container">
          <nav aria-label="On this page" className="page-toc">
            <a href="#deals">All {lowerName(category.plural)}</a>
            {picks.length > 0 ? <a href="#top-picks">Top picks</a> : null}
            <a href="#guide">Buying guide</a>
            <a href="#faq">FAQ</a>
          </nav>
          <h2 className="sr-only">All {lowerName(category.plural)}</h2>
          {rows.length > 0 ? (
            <>
              <CategoryTable rows={rows} columns={columns} facets={facets} noun={category.noun} />
              {brandCounts.length > 0 ? (
                <nav aria-label={`${category.plural} by brand`} className="category-links" style={{ marginTop: 32 }}>
                  <h3 className="sub-head" style={{ marginBottom: 12 }}>
                    {category.plural} by brand
                  </h3>
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
              <JsonLd data={itemListLd(category.hubTitle, rows.slice(0, 100).map((d) => ({ name: d.name, path: d.path })))} />
            </>
          ) : (
            <DealsUnavailable scope={category.noun} />
          )}
        </div>
      </section>

      {picks.length > 0 ? (
        <section className="section-tight" id="top-picks">
          <div className="container" style={{ maxWidth: 960 }}>
            <h2 style={{ fontSize: 26, marginBottom: 8 }}>The best {lowerName(category.plural)} to buy right now</h2>
            <p className="muted" style={{ marginBottom: 16 }}>
              Our top {Math.min(10, picks.length)} {lowerName(category.plural)} across every brand we track, ranked by real
              discounts and owner ratings, with key specs, price point, and reasons to buy or avoid each one. Filter by
              brand, budget, or sale price.
            </p>
            <RankedPicks picks={picks} brands={pickBrands} label={category.noun} />
          </div>
        </section>
      ) : null}

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

      {["components", "gaming-pcs", "monitors", "video-cards", "memory", "motherboards"].includes(category.slug) ? (
        <section className="section-tight">
          <div className="container">
            <p className="callout-link">
              {category.slug === "gaming-pcs" ? "Would building your own cost less? " : "Planning a new build? "}
              <Link href="/pc-builder" className="text-link">
                Price a full build in the PC Builder <ArrowRight />
              </Link>
            </p>
          </div>
        </section>
      ) : null}

      {guides.length > 0 ? (
        <section className="section-tight">
          <div className="container">
            <h2 style={{ fontSize: 22, marginBottom: 16 }}>{category.name} buying guides</h2>
            <ul className="chip-list">
              {guides.map((g) => (
                <li key={g.slug}>
                  <Link href={`/blog/${g.slug}`} className="chip">
                    {g.title}
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
            {category.intro || category.guide ? (
              <>
                <h2 className="mt-0" id="guide">
                  {category.name} buying guide
                </h2>
                {(category.intro ?? []).map((p) => (
                  <p key={p.slice(0, 40)}>{p}</p>
                ))}
                {(category.guide ?? []).map((g) => (
                  <div key={g.title}>
                    <h3>{g.title}</h3>
                    {g.body.map((p) => (
                      <p key={p.slice(0, 40)}>{p}</p>
                    ))}
                  </div>
                ))}
              </>
            ) : null}
            <h2 className={category.intro || category.guide ? undefined : "mt-0"} id={category.intro || category.guide ? undefined : "guide"}>
              How to buy {lowerName(category.plural)} on sale
            </h2>
            <ul>
              {category.tips.map((t) => (
                <li key={t.slice(0, 30)}>{t}</li>
              ))}
            </ul>
            <h2 id="faq">Frequently asked questions</h2>
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
