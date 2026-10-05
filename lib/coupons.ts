import { BRANDS, type Brand } from "./brands";
import { getCategory } from "./categories";
import type { Deal } from "./deals";
import { formatChecked } from "./format";

/** A brand's "coupons": every in-stock product with a genuine discount, biggest first. */
export function brandCouponDeals(deals: Deal[], brandSlug: string) {
  return deals
    .filter((d) => d.brandSlug === brandSlug && d.inStock && (d.savingsPercent ?? 0) > 0)
    .sort((a, b) => (b.savingsPercent ?? 0) - (a.savingsPercent ?? 0) || (b.savings ?? 0) - (a.savings ?? 0));
}

export function toCoupon(d: Deal) {
  return {
    asin: d.asin,
    name: d.name,
    path: d.path,
    buyUrl: d.buyUrl,
    percent: d.savingsPercent ?? 0,
    priceDisplay: d.priceDisplay,
    listPriceDisplay: d.listPriceDisplay,
    savingsDisplay: d.savingsDisplay,
    category: getCategory(d.categorySlug)?.name ?? "Deal",
    checked: d.fetchedAt,
    checkedLabel: formatChecked(d.fetchedAt),
  };
}

export type BrandCouponSummary = { brand: Brand; count: number; best: number };

export function couponSummaries(deals: Deal[]): BrandCouponSummary[] {
  return BRANDS.map((brand) => {
    const list = brandCouponDeals(deals, brand.slug);
    return { brand, count: list.length, best: list[0]?.savingsPercent ?? 0 };
  });
}

export const couponMonth = () => new Intl.DateTimeFormat("en-US", { month: "long", year: "numeric", timeZone: "UTC" }).format(new Date());
