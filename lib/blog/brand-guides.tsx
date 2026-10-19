import Link from "next/link";
import { BRANDS, BRAND_GROUPS, type Brand } from "../brands";
import { CATEGORIES } from "../categories";
import { brandCouponDeals } from "../coupons";
import { getAllDeals } from "../deals";
import { formatChecked, lowerName } from "../format";
import { defaultRank, listsForBrand, liveLists } from "../lists";
import type { Post } from "./types";

/**
 * "How To Find Discounts For [Brand] Products" guides, one per brand. The
 * written advice comes from each brand's own profile; the numbers, deals,
 * categories, and lists are read from the current catalog at build time.
 */

export const brandGuideSlug = (b: Brand) => `how-to-find-discounts-for-${b.slug}-products`;

/** Featured-image icon for each brand group. */
export const BRAND_GUIDE_ICON: Record<string, string> = {
  pcs: "gaming-pcs",
  peripherals: "keyboards",
  displays: "monitors",
  controllers: "controllers",
  parts: "video-cards",
};

const TOC = (b: Brand) => [
  { id: "where-to-look", label: `Where to see every ${b.name} deal` },
  { id: "right-now", label: `${b.name} discounts right now` },
  { id: "by-category", label: `${b.name} deals by category` },
  { id: "product-lines", label: `${b.name} product lines to watch` },
  { id: "coupons", label: `${b.name} coupons and promo codes` },
  { id: "is-it-real", label: `How to tell if a ${b.name} discount is real` },
  { id: "timing", label: `When ${b.name} prices drop` },
  { id: "tips", label: `Buying tips for ${b.name}` },
  { id: "similar-brands", label: "Compare similar brands" },
  { id: "bottom-line", label: "The bottom line" },
];

/** Related site tools and guides for each brand group. */
const GROUP_LINKS: Record<string, { href: string; label: string }[]> = {
  pcs: [
    { href: "/blog/prebuilt-gaming-pc-buying-guide", label: "prebuilt gaming PC buying guide" },
    { href: "/blog/gaming-pc-deals-guide", label: "guide to judging gaming PC deals" },
    { href: "/pc-builds", label: "complete PC builds" },
  ],
  peripherals: [
    { href: "/blog/wireless-vs-wired-gaming-mouse", label: "wireless vs wired gaming mouse guide" },
    { href: "/blog/mechanical-keyboard-switches-explained", label: "mechanical keyboard switch guide" },
    { href: "/deals/today", label: "today's tech deals" },
  ],
  displays: [
    { href: "/blog/oled-vs-ips-gaming-monitor", label: "OLED vs IPS gaming monitor guide" },
    { href: "/pc-builds/streaming-pc-build", label: "streaming PC build" },
    { href: "/deals/today", label: "today's tech deals" },
  ],
  controllers: [
    { href: "/blog/are-pro-controllers-worth-it", label: "guide to pro controllers" },
    { href: "/deals/today", label: "today's tech deals" },
  ],
  parts: [
    { href: "/pc-builder", label: "PC Part Picker" },
    { href: "/pc-builds", label: "complete PC builds" },
    { href: "/blog/how-to-find-pc-build-deals", label: "guide to finding PC build deals" },
  ],
};

function brandGuide(brand: Brand, index: number): Post {
  const toc = TOC(brand);
  const others = BRANDS.filter((b) => b.group === brand.group && b.slug !== brand.slug);
  const group = BRAND_GROUPS.find((g) => g.id === brand.group)!;

  async function Body() {
    const { deals: all, fetchedAt } = await getAllDeals();
    const deals = all.filter((d) => d.brandSlug === brand.slug).sort(defaultRank);
    const onSale = deals.filter((d) => d.inStock && (d.savingsPercent ?? 0) > 0);
    const best = onSale.reduce((m, d) => Math.max(m, d.savingsPercent ?? 0), 0);
    const hot = onSale.filter((d) => (d.savingsPercent ?? 0) > 40).length;
    const top = [...onSale].sort((a, b) => (b.savingsPercent ?? 0) - (a.savingsPercent ?? 0)).slice(0, 5);
    const cats = CATEGORIES.map((c) => ({
      c,
      n: deals.filter((d) => d.categorySlug === c.slug).length,
      sale: onSale.filter((d) => d.categorySlug === c.slug).length,
    })).filter((x) => x.n > 0);
    const lists = listsForBrand(liveLists(all), brand.slug).slice(0, 8);
    const coupons = brandCouponDeals(all, brand.slug).length;
    const links = GROUP_LINKS[brand.group] ?? [];

    return (
      <>
        <p>
          {brand.intro} Finding a genuine discount on {brand.name} {brand.sells} takes more than spotting a red price tag: listings
          change price often, reference prices vary in quality, and the same product can appear in several versions. This guide shows
          exactly how to use ClearanceStream to find real {brand.name} discounts, which product lines to watch, and how to tell a good
          deal from a cosmetic one.
        </p>
        {brand.overview.map((p) => (
          <p key={p.slice(0, 40)}>{p}</p>
        ))}

        <h2 id="where-to-look">Where to see every {brand.name} deal</h2>
        <p>
          Our <Link href={`/brands/${brand.slug}`}>{brand.name} discounts page</Link> lists every {brand.name} product we track in one
          sortable table. To get straight to the deals:
        </p>
        <ol>
          <li>
            Tick <b>On sale only</b> to hide products at their regular price.
          </li>
          <li>
            Use the <b>discount filter</b> to show only products 20%, 30%, or 50% off, or only <b>Hot deals</b>, which are more than 40% below
            their reference price.
          </li>
          <li>
            Click the <b>Discount</b> column to sort the biggest markdowns to the top, or <b>Price</b> to sort by cost.
          </li>
          <li>Narrow by category and spec filters, such as connection type, size, or chipset, so every result fits what you need.</li>
        </ol>
        <p>
          Every product links to its own page with the current price, the reference price, and when the price was last checked, plus a
          one-click link to buy.
        </p>

        <h2 id="right-now">{brand.name} discounts right now</h2>
        {deals.length > 0 ? (
          <>
            <p>
              At our last price check{fetchedAt ? ` (${formatChecked(fetchedAt)})` : ""}, we were tracking <b>{deals.length}</b> {brand.name}{" "}
              {deals.length === 1 ? "product" : "products"}, with <b>{onSale.length}</b> on sale
              {best ? (
                <>
                  {" "}
                  and discounts of up to <b>{best}% off</b>
                </>
              ) : null}
              {hot ? `. ${hot} ${hot === 1 ? "is" : "are"} marked HOT DEAL` : ""}. These numbers update whenever we refresh prices.
            </p>
            {top.length > 0 ? (
              <>
                <p>The biggest {brand.name} discounts at that check:</p>
                <ul>
                  {top.map((d) => (
                    <li key={d.asin}>
                      <Link href={d.path}>{d.name}</Link>: {d.priceDisplay}
                      {d.listPriceDisplay ? `, down from ${d.listPriceDisplay}` : ""} ({d.savingsPercent}% off)
                    </li>
                  ))}
                </ul>
              </>
            ) : (
              <p>No {brand.name} products were discounted at our last check. The full list is still useful for comparing current prices.</p>
            )}
          </>
        ) : (
          <p>
            We are adding {brand.name} products now. Until they appear, see <Link href="/deals/today">today&apos;s tech deals</Link> for
            every discount we track.
          </p>
        )}

        <h2 id="by-category">{brand.name} deals by category</h2>
        {cats.length > 0 ? (
          <>
            <p>Each category has its own {brand.name} page with filters for the specs that matter in that category:</p>
            <ul>
              {cats.map(({ c, n, sale }) => (
                <li key={c.slug}>
                  <Link href={`/brands/${brand.slug}/${c.slug}`}>
                    {brand.name} {lowerName(c.plural)}
                  </Link>
                  : {n} tracked{sale ? `, ${sale} on sale` : ""}. Compare with every brand on our{" "}
                  <Link href={`/categories/${c.slug}`}>{lowerName(c.hubTitle)}</Link> page.
                </li>
              ))}
            </ul>
          </>
        ) : (
          <p>
            Browse all <Link href="/categories">deal categories</Link> to compare {brand.name} with other brands.
          </p>
        )}
        {lists.length > 0 ? (
          <>
            <p>{brand.name} products also appear in these ranked top 10 lists, which compare specs and prices side by side:</p>
            <ul>
              {lists.map((l) => (
                <li key={l.def.slug}>
                  <Link href={`/lists/${l.def.slug}`}>{l.title}</Link>
                </li>
              ))}
            </ul>
          </>
        ) : null}

        <h2 id="product-lines">{brand.name} product lines to watch</h2>
        <p>Knowing a brand&apos;s product lines makes it easier to spot when a higher-tier model drops to a lower-tier price.</p>
        <ul>
          {brand.lines.map((l) => (
            <li key={l.name}>
              <b>{l.name}:</b> {l.summary}
            </li>
          ))}
        </ul>

        <h2 id="coupons">{brand.name} coupons and promo codes</h2>
        <p>
          Most {brand.name} discounts do not need a code: the lower price is already applied at the retailer. Our{" "}
          <Link href={`/coupons/${brand.slug}`}>{brand.name} coupons page</Link> collects every current {brand.name} markdown in one place
          {coupons ? `, ${coupons} at our last check` : ""}, sorted by the biggest saving. Be wary of coupon sites that list codes for{" "}
          {brand.name} without saying where they work; an expired or fake code wastes time at checkout.
        </p>

        <h2 id="is-it-real">How to tell if a {brand.name} discount is real</h2>
        <p>Here is how we treat {brand.name} prices, and what to check yourself:</p>
        <ul>
          <li>
            <b>A discount appears only with a genuine reference price.</b> We show a strikethrough and a percentage only when the retailer
            reports a reference price above the current price. We never add our own markups.
          </li>
          <li>
            <b>Implausible discounts are dropped.</b> A reference price implying more than 80% off almost always means a bad listing.
          </li>
          <li>
            <b>Check the version.</b> {brand.name} often sells similar models under close names. Confirm the exact model, color, and
            configuration match what you want before comparing prices.
          </li>
          <li>
            <b>Compare against the category.</b> Sort the {brand.name} table by price, then compare with similar products from other brands
            on the matching category page.
          </li>
        </ul>

        <h2 id="timing">When {brand.name} prices drop</h2>
        <p>
          {brand.name} discounts tend to cluster around the big sale events, especially Black Friday through Cyber Monday and the
          mid-summer sales, and around product launches, when the outgoing model is cleared to make room for the new one. A
          previous-generation {brand.name} product on clearance is often the best value, since the differences between generations are
          usually small.
        </p>
        <p>
          If you are not in a hurry, note the current price on the product page and check back before the next sale event. Our guide to
          the <Link href="/blog/best-time-to-buy-a-gaming-pc">best time to buy</Link> covers the full price calendar.
        </p>

        <h2 id="tips">Buying tips for {brand.name}</h2>
        <ul>
          {brand.buyingTips.map((t) => (
            <li key={t.slice(0, 40)}>{t}</li>
          ))}
        </ul>
        {links.length > 0 ? (
          <p>
            For more help, see our{" "}
            {links.map((l, i) => (
              <span key={l.href}>
                {i > 0 ? (i === links.length - 1 ? ", and " : ", ") : ""}
                <Link href={l.href}>{l.label}</Link>
              </span>
            ))}
            .
          </p>
        ) : null}

        <h2 id="similar-brands">Compare similar brands</h2>
        <p>
          Before buying, compare {brand.name} with other brands in {group.name.toLowerCase()}. A sale on a competitor can beat the{" "}
          {brand.name} price for a similar product:
        </p>
        <ul>
          {others.slice(0, 8).map((o) => (
            <li key={o.slug}>
              <Link href={`/brands/${o.slug}`}>{o.name} discounts</Link> (
              <Link href={`/blog/${brandGuideSlug(o)}`}>how to find {o.name} deals</Link>)
            </li>
          ))}
        </ul>

        <h2 id="bottom-line">The bottom line</h2>
        <p>
          The quickest way to find real {brand.name} discounts is to open our{" "}
          <Link href={`/brands/${brand.slug}`}>{brand.name} discounts page</Link>, turn on <b>On sale only</b>, and sort by discount. Check
          the exact model, compare with similar products from other brands, and buy when a well-reviewed model drops to a price you have
          seen fall before. Prices change, so confirm the final price at checkout.
        </p>
      </>
    );
  }

  return {
    slug: brandGuideSlug(brand),
    title: `How To Find Discounts For ${brand.name} Products`,
    metaTitle: `How To Find Discounts For ${brand.name} Products`,
    description: `How to find real ${brand.name} discounts and deals: where to see every markdown, how to filter for genuine sales, which ${brand.name} lines to watch, and when prices drop.`,
    excerpt: `A step-by-step guide to finding genuine ${brand.name} discounts on ${brand.sells}, with live deal counts and the product lines worth watching.`,
    published: "2026-10-19",
    updated: "2026-10-19",
    author: index % 2 === 0 ? "jaden-williams" : "bryce-dodson",
    keywords: [
      `${brand.name.toLowerCase()} discounts`,
      `${brand.name.toLowerCase()} deals`,
      `${brand.name.toLowerCase()} sale`,
      `${brand.name.toLowerCase()} coupon`,
      `how to find ${brand.name.toLowerCase()} discounts`,
    ],
    readingMinutes: 6,
    toc,
    faqs: [
      ...brand.faqs,
      {
        q: `Where can I find ${brand.name} discounts?`,
        a: `ClearanceStream's ${brand.name} discounts page lists every ${brand.name} product we track with its current price and any genuine discount. Turn on "On sale only" and sort by discount to see the biggest markdowns first.`,
      },
      {
        q: `Do I need a coupon code for ${brand.name} deals?`,
        a: `Usually not. Most ${brand.name} discounts are applied to the price automatically, so there is no code to enter at checkout.`,
      },
      {
        q: `When do ${brand.name} products go on sale?`,
        a: `Discounts are most common around Black Friday through Cyber Monday, the mid-summer sale events, and when a new model replaces the previous one.`,
      },
    ],
    Body,
  };
}

export const BRAND_GUIDE_POSTS: Post[] = BRANDS.map(brandGuide);
