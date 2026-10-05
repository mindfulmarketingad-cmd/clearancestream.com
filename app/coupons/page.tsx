import type { Metadata } from "next";
import Link from "next/link";
import { BrandLogo } from "@/components/BrandLogo";
import { JsonLd } from "@/components/JsonLd";
import { PageHeader } from "@/components/PageHeader";
import { ArrowRight } from "@/components/Icons";
import { BRAND_GROUPS } from "@/lib/brands";
import { couponMonth, couponSummaries } from "@/lib/coupons";
import { getAllDeals } from "@/lib/deals";
import { itemListLd, pageMetadata } from "@/lib/seo";


export function generateMetadata(): Metadata {
  return pageMetadata({
    title: `Tech Coupons & Deals (${couponMonth()})`,
    description:
      "Coupons and verified deals from the biggest gaming and tech brands: gaming PCs, laptops, mice, keyboards, headsets, monitors, and controllers. No codes to copy; the discount is already applied.",
    path: "/coupons",
  });
}

export default async function CouponsHub() {
  const { deals } = await getAllDeals();
  const summaries = couponSummaries(deals);
  const total = summaries.reduce((n, s) => n + s.count, 0);

  return (
    <>
      <PageHeader
        crumbs={[{ name: "Coupons", path: "/coupons" }]}
        title="Tech coupons and deals"
        lede={`${total > 0 ? `${total.toLocaleString("en-US")} verified deals` : "Verified deals"} from the biggest gaming and tech brands. Pick a brand, unlock a deal, and the discount is already applied at the retailer. No codes to copy.`}
      />
      <section className="section-tight">
        <div className="container">
          {BRAND_GROUPS.map((g) => {
            const group = summaries.filter((s) => s.brand.group === g.id);
            if (group.length === 0) return null;
            return (
              <div key={g.id} className="coupon-hub-group">
                <h2 className="sub-head">{g.name}</h2>
                <ul className="coupon-hub-grid">
                  {group.map(({ brand, count, best }) => (
                    <li key={brand.slug}>
                      <Link href={`/coupons/${brand.slug}`} className="coupon-hub-card">
                        <BrandLogo brand={brand} size={64} />
                        <span className="coupon-hub-text">
                          <b>{brand.name} coupons</b>
                          <span>{count > 0 ? `${count} ${count === 1 ? "deal" : "deals"} · up to ${best}% off` : "No active deals right now"}</span>
                        </span>
                        <ArrowRight />
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
          <div className="prose mt-lg" style={{ maxWidth: 760 }}>
            <h2>How ClearanceStream coupons work</h2>
            <p>
              Each coupon is a verified deal on a specific product. When you unlock it, you get a link to the
              retailer&apos;s product page where the discount is already applied, so there is no code to enter at
              checkout. We check every price weekly and only list products that are genuinely discounted against a real
              reference price.
            </p>
            <p>
              Prefer to browse? See <Link href="/deals">all deals</Link>, shop by <Link href="/brands">brand</Link>, or
              read our <Link href="/blog/gaming-pc-deals-guide">guide to spotting real discounts</Link>.
            </p>
          </div>
        </div>
      </section>
      <JsonLd data={itemListLd("Tech coupons by brand", summaries.map((s) => ({ name: `${s.brand.name} coupons`, path: `/coupons/${s.brand.slug}` })))} />
    </>
  );
}
