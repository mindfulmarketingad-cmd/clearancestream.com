import type { Metadata } from "next";
import Link from "next/link";
import { notFound, permanentRedirect } from "next/navigation";
import { DealGrid } from "@/components/DealCard";
import { ArrowRight, CheckIcon, ClockIcon, ExternalIcon, ShieldIcon } from "@/components/Icons";
import { JsonLd } from "@/components/JsonLd";
import { PageHeader } from "@/components/PageHeader";
import { getBrand } from "@/lib/brands";
import { getCategory } from "@/lib/categories";
import { liveLists } from "@/lib/lists";
import { getAllDeals, getDeal, relatedDeals, type Deal } from "@/lib/deals";
import { formatChecked, lowerName } from "@/lib/format";
import { pageMetadata } from "@/lib/seo";
import { absoluteUrl } from "@/lib/site";
import { asinFromSlug } from "@/lib/slug";

// Every product page is prebuilt at deploy time; unknown products 404.
export const dynamicParams = false;

type Props = { params: Promise<{ brand: string; product: string }> };

export async function generateStaticParams() {
  const { deals } = await getAllDeals();
  return deals.map((d) => ({ brand: d.brandSlug, product: d.slug }));
}

async function resolve({ params }: Props): Promise<Deal> {
  const { brand, product } = await params;
  const asin = asinFromSlug(product);
  if (!asin || !getBrand(brand)) notFound();
  const deal = await getDeal(asin);
  if (!deal) notFound();
  // Canonicalise if the title (and therefore slug) or brand segment changed.
  if (deal.brandSlug !== brand || deal.slug !== product) permanentRedirect(deal.path);
  return deal;
}

export async function generateMetadata(props: Props): Promise<Metadata> {
  const deal = await resolve(props);
  const saving = deal.savingsPercent ? ` (${deal.savingsPercent}% off)` : "";
  return pageMetadata({
    title: `${deal.name} Discount: ${deal.priceDisplay}${saving}`,
    description: `${deal.name} is ${deal.priceDisplay}${
      deal.savingsDisplay ? `, ${deal.savingsDisplay} below the ${deal.listPriceLabel?.toLowerCase() ?? "reference price"}` : ""
    }. Live ${deal.brandName} ${deal.isGamingPc ? "gaming PC " : ""}deal tracked weekly by ClearanceStream.`,
    path: deal.path,
    image: deal.image ? { url: deal.image.url, width: deal.image.width, height: deal.image.height, alt: deal.name } : null,
  });
}

function productLd(deal: Deal) {
  const validUntil = new Date(new Date(deal.fetchedAt).getTime() + 24 * 3600 * 1000).toISOString().slice(0, 10);
  return {
    "@context": "https://schema.org",
    "@type": "Product",
    name: deal.title,
    sku: deal.asin,
    brand: { "@type": "Brand", name: deal.brandName },
    image: deal.gallery.map((g) => g.url),
    description: deal.features[0] ?? deal.title,
    url: absoluteUrl(deal.path),
    offers: {
      "@type": "Offer",
      url: absoluteUrl(deal.path),
      price: deal.price.toFixed(2),
      priceCurrency: deal.currency,
      priceValidUntil: validUntil,
      availability: deal.inStock ? "https://schema.org/InStock" : "https://schema.org/OutOfStock",
      itemCondition: /used|refurb|renewed/i.test(deal.condition ?? "")
        ? "https://schema.org/RefurbishedCondition"
        : "https://schema.org/NewCondition",
    },
    ...(deal.rating && deal.reviewCount
      ? { aggregateRating: { "@type": "AggregateRating", ratingValue: deal.rating, reviewCount: deal.reviewCount } }
      : {}),
  };
}

export default async function ProductPage(props: Props) {
  const deal = await resolve(props);
  const brand = getBrand(deal.brandSlug)!;
  const category = getCategory(deal.categorySlug);
  const { deals } = await getAllDeals();
  const related = relatedDeals(deal, deals);
  const featuredIn = liveLists(deals).filter((l) => l.indexable && l.items.some((d) => d.asin === deal.asin));

  const rows: [string, string][] = [
    ["Brand", deal.brandName],
    ["Current price", deal.priceDisplay],
    ...(deal.listPriceDisplay ? ([[deal.listPriceLabel ?? "Reference price", deal.listPriceDisplay]] as [string, string][]) : []),
    ...(deal.savingsDisplay ? ([["You save", `${deal.savingsDisplay} (${deal.savingsPercent}%)`]] as [string, string][]) : []),
    ...(deal.availability ? ([["Availability", deal.availability]] as [string, string][]) : []),
    ...(deal.condition ? ([["Condition", deal.condition]] as [string, string][]) : []),
    ["ASIN", deal.asin],
  ];

  return (
    <>
      <PageHeader
        crumbs={[
          { name: "Brands", path: "/brands" },
          { name: brand.name, path: `/brands/${brand.slug}` },
          ...(category ? [{ name: category.name, path: `/brands/${brand.slug}/${category.slug}` }] : []),
          { name: deal.name, path: deal.path },
        ]}
      />
      <section className="section-tight">
        <div className="container product">
          <div className="product-gallery">
            {deal.image ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={deal.image.url}
                alt={deal.name}
                width={deal.image.width}
                height={deal.image.height}
                fetchPriority="high"
                referrerPolicy="no-referrer"
              />
            ) : null}
          </div>

          <div>
            <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
              <Link href={`/brands/${brand.slug}`} className="badge badge-soft">
                {brand.name}
              </Link>
              {category ? (
                <Link href={`/brands/${brand.slug}/${category.slug}`} className="badge badge-neutral">
                  {category.name}
                </Link>
              ) : null}
              {deal.savingsPercent ? <span className="badge badge-discount">{deal.savingsPercent}% off</span> : null}
              {deal.dealBadge ? <span className="badge badge-neutral">{deal.dealBadge}</span> : null}
            </div>
            <h1>{deal.name} Discount</h1>

            <div className="buy-box">
              <div className="price-row">
                <span className={deal.savingsPercent ? "price price-deal" : "price"}>{deal.priceDisplay}</span>
                {deal.listPriceDisplay ? (
                  <s className="price" aria-label={`${deal.listPriceLabel}: ${deal.listPriceDisplay}`}>
                    {deal.listPriceDisplay}
                  </s>
                ) : null}
                {deal.savingsPercent ? <span className="pill-off">{deal.savingsPercent}% OFF</span> : null}
              </div>
              {deal.savingsDisplay ? (
                <p className="deal-save" style={{ marginTop: 6, fontSize: 15 }}>
                  You save {deal.savingsDisplay} ({deal.savingsPercent}%) vs. {deal.listPriceLabel?.toLowerCase()}
                </p>
              ) : null}
              <a
                href={deal.buyUrl}
                className="btn btn-primary btn-block"
                style={{ marginTop: 20, height: 50, fontSize: 16 }}
                target="_blank"
                rel="sponsored nofollow noopener"
              >
                Check price <ExternalIcon />
              </a>
              <p className="fine">
                <ClockIcon style={{ width: 12, height: 12, display: "inline", verticalAlign: "-1px" }} /> Price checked{" "}
                <time dateTime={deal.fetchedAt}>{formatChecked(deal.fetchedAt)}</time>. Product prices and availability
                are accurate as of the date/time indicated and are subject to change. Any price and availability
                information displayed on the retailer&apos;s site at the time of purchase will apply to the purchase of this product.
              </p>
            </div>

            <table className="spec-table">
              <caption className="sr-only">Deal details</caption>
              <tbody>
                {rows.map(([k, v]) => (
                  <tr key={k}>
                    <th scope="row">{k}</th>
                    <td>{v}</td>
                  </tr>
                ))}
              </tbody>
            </table>

            {deal.features.length > 0 ? (
              <>
                <h2 className="sub-head">Key features</h2>
                <ul className="feature-list">
                  {deal.features.map((f) => (
                    <li key={f}>
                      <CheckIcon />
                      <span>{f}</span>
                    </li>
                  ))}
                </ul>
              </>
            ) : null}

            <h2 className="sub-head">Is this a good deal?</h2>
            <div className="prose" style={{ fontSize: 15.5, marginTop: 12 }}>
              <p>
                This {brand.name} {deal.isGamingPc ? "system" : "product"} is currently {deal.savingsPercent}% below its{" "}
                {deal.listPriceLabel?.toLowerCase()}.{" "}
                {deal.isGamingPc
                  ? "Before buying, price the graphics card on its own and compare it with the full system price. When a prebuilt costs close to its parts total, you are effectively getting assembly, Windows, and the warranty for free."
                  : "Check whether the reference is a list price or a recent typical price, and compare against similar models before buying. Discounts tied to a limited-time deal can end without notice."}
              </p>
              <p>
                Read our <Link href="/blog/gaming-pc-deals-guide">guide to judging gaming PC deals</Link> or compare
                every {category ? (
                  <Link href={`/brands/${brand.slug}/${category.slug}`}>
                    {brand.name} {lowerName(category.name)} deal
                  </Link>
                ) : (
                  <Link href={`/brands/${brand.slug}`}>{brand.name} deal</Link>
                )} before you decide.
              </p>
            </div>

            <p className="muted" style={{ fontSize: 13, marginTop: 24, display: "flex", gap: 6 }}>
              <ShieldIcon style={{ width: 14, height: 14, flexShrink: 0, marginTop: 3 }} />
              We may earn a commission when you buy through links on this page, at no extra cost to you.
            </p>
          </div>
        </div>
      </section>

      {featuredIn.length > 0 ? (
        <section className="section-tight">
          <div className="container">
            <h2 style={{ fontSize: 22, marginBottom: 16 }}>Featured in these lists</h2>
            <ul className="chip-list">
              {featuredIn.map((l) => {
                const rank = l.items.findIndex((d) => d.asin === deal.asin) + 1;
                return (
                  <li key={l.def.slug}>
                    <Link href={`/lists/${l.def.slug}`} className="chip">
                      #{rank} in {l.shortTitle}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>
        </section>
      ) : null}

      {related.length > 0 ? (
        <section className="section-tight">
          <div className="container">
            <div className="section-head">
              <h2>More {brand.name} discounts</h2>
              <Link href={`/brands/${brand.slug}`} className="text-link">
                All {brand.name} deals <ArrowRight />
              </Link>
            </div>
            <DealGrid deals={related} />
          </div>
        </section>
      ) : null}

      <JsonLd data={productLd(deal)} />
    </>
  );
}
