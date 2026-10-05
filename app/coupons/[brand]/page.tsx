import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { AllBrandLinks } from "@/components/BrandLinks";
import { BrandLogo } from "@/components/BrandLogo";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { CouponList } from "@/components/CouponList";
import { DealsUnavailable } from "@/components/DealsUnavailable";
import { Faq } from "@/components/Faq";
import { ArrowRight, ClockIcon, TagIcon } from "@/components/Icons";
import { JsonLd } from "@/components/JsonLd";
import { BRANDS, getBrand } from "@/lib/brands";
import { brandCouponDeals, couponMonth, toCoupon } from "@/lib/coupons";
import { getAllDeals } from "@/lib/deals";
import { formatChecked } from "@/lib/format";
import { itemListLd, pageMetadata } from "@/lib/seo";

export const revalidate = 604800;
export const dynamicParams = false;

type Props = { params: Promise<{ brand: string }> };

export function generateStaticParams() {
  return BRANDS.map((b) => ({ brand: b.slug }));
}

async function load(params: Props["params"]) {
  const brand = getBrand((await params).brand);
  if (!brand) notFound();
  const { deals, fetchedAt } = await getAllDeals();
  return { brand, coupons: brandCouponDeals(deals, brand.slug), fetchedAt };
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { brand, coupons } = await load(params);
  const best = coupons[0]?.savingsPercent;
  return pageMetadata({
    title: `${brand.name} Coupons & Deals (${couponMonth()})`,
    description: coupons.length
      ? `${coupons.length} verified ${brand.name} deals, up to ${best}% off ${brand.sells}. No code needed: the discount is already applied at the retailer. Updated weekly.`
      : `Verified ${brand.name} coupons and deals on ${brand.sells}, checked weekly by ClearanceStream.`,
    path: `/coupons/${brand.slug}`,
    noindex: coupons.length === 0,
  });
}

export default async function BrandCouponsPage({ params }: Props) {
  const { brand, coupons, fetchedAt } = await load(params);
  const best = coupons[0]?.savingsPercent ?? 0;

  const faqs = [
    {
      q: `Do I need a ${brand.name} coupon code?`,
      a: `No. Each ${brand.name} coupon on this page is a deal link. The discount is already applied on the retailer's product page, so there is nothing to enter at checkout.`,
    },
    {
      q: "Why do I need to sign up?",
      a: "Signing up is free and unlocks every deal link on ClearanceStream. We also email you the best new discounts, and you can unsubscribe at any time.",
    },
    {
      q: `How often are ${brand.name} coupons updated?`,
      a: `Every week. We check the price of every ${brand.name} product we track and only list products with a genuine discount against a real reference price. Prices can change after they are checked, so confirm the total at checkout.`,
    },
  ];

  return (
    <>
      <div className="container" style={{ paddingTop: 20 }}>
        <Breadcrumbs
          items={[
            { name: "Coupons", path: "/coupons" },
            { name: brand.name, path: `/coupons/${brand.slug}` },
          ]}
        />
        <header className="coupon-hero">
          <BrandLogo brand={brand} size={88} />
          <div>
            <h1>
              {brand.name} Coupons <span>&amp; Deals</span>
            </h1>
            <p className="lede">
              {coupons.length > 0
                ? `${coupons.length} verified ${brand.name} ${coupons.length === 1 ? "deal" : "deals"}, up to ${best}% off. Unlock a deal and the discount is already applied, with no code to enter.`
                : `Verified ${brand.name} deals appear here as soon as our weekly price check finds them.`}
            </p>
            <div className="page-meta">
              <span>
                <TagIcon /> {coupons.length} active {coupons.length === 1 ? "deal" : "deals"}
              </span>
              {fetchedAt ? (
                <span>
                  <ClockIcon /> Last checked <time dateTime={fetchedAt}>{formatChecked(fetchedAt)}</time>
                </span>
              ) : null}
            </div>
          </div>
        </header>
      </div>

      <section className="section-tight">
        <div className="container">
          <div style={{ maxWidth: 900 }}>
          {coupons.length > 0 ? (
            <>
              <CouponList coupons={coupons.map(toCoupon)} brandName={brand.name} logo={<BrandLogo brand={brand} size={64} />} />
              <JsonLd data={itemListLd(`${brand.name} coupons`, coupons.map((d) => ({ name: d.name, path: d.path })))} />
            </>
          ) : (
            <DealsUnavailable scope={brand.name} />
          )}

          <p className="mt-md muted" style={{ fontSize: 15 }}>
            See every {brand.name} product, discounted or not, on our{" "}
            <Link href={`/brands/${brand.slug}`} className="text-link">
              {brand.name} discounts page <ArrowRight />
            </Link>
          </p>

          <div className="prose mt-lg">
            <h2>Frequently asked questions</h2>
          </div>
          <div style={{ marginTop: 16 }}>
            <Faq items={faqs} />
          </div>

          <AllBrandLinks current={brand.slug} title="Coupons from other brands" hrefFor={(slug) => `/coupons/${slug}`} label="coupons" />
          </div>
        </div>
      </section>
    </>
  );
}
