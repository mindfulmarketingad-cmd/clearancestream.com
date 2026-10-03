import "server-only";
import { unstable_cache } from "next/cache";
import { BRANDS, brandFromAmazon, type Brand } from "./brands";
import { getConfig, getItems, searchItems, type ApiItem } from "./amazon/creators-api";
import { productSlug, shortTitle } from "./slug";
import { SITE } from "./site";

export type Deal = {
  asin: string;
  title: string;
  name: string;
  slug: string;
  path: string;
  brandSlug: string;
  brandName: string;
  /** True for desktop gaming PCs; false for peripherals, laptops, components, etc. */
  isGamingPc: boolean;
  /** Amazon's product group, e.g. "Personal Computer". */
  category: string | null;
  amazonUrl: string;
  image: { url: string; width: number; height: number } | null;
  gallery: { url: string; width: number; height: number }[];
  price: number;
  priceDisplay: string;
  currency: string;
  listPrice: number | null;
  listPriceDisplay: string | null;
  listPriceLabel: string | null;
  savings: number | null;
  savingsDisplay: string | null;
  savingsPercent: number | null;
  availability: string | null;
  inStock: boolean;
  condition: string | null;
  merchant: string | null;
  dealBadge: string | null;
  rating: number | null;
  reviewCount: number | null;
  features: string[];
  fetchedAt: string;
};

export type DealsResult = { deals: Deal[]; configured: boolean; ok: boolean; fetchedAt: string | null };

const money = (amount: number, currency = "USD") =>
  new Intl.NumberFormat("en-US", { style: "currency", currency }).format(amount);

// Prebuilt titles often list bundled parts ("liquid cooler", "RGB fans"), so an
// explicit "gaming PC/desktop" wins over the peripheral exclusions, except for cases.
const EXPLICIT_PC = /\bgaming (pc|desktop|computer)\b/i;
const CASE = /\b(case|chassis)\b/i;

function isGamingPcTitle(title: string, brand: Brand) {
  if (CASE.test(title)) return false;
  return EXPLICIT_PC.test(title) || (brand.include.test(title) && !brand.exclude.test(title));
}

function normalize(item: ApiItem, brand: Brand, fetchedAt: string): Deal | null {
  const title = item.itemInfo?.title?.displayValue?.trim();
  if (!title || !item.detailPageURL) return null;
  // Guard against third-party items that merely mention the brand ("compatible with ...").
  const byline = item.itemInfo?.byLineInfo?.brand?.displayValue;
  const ownBrand = byline ? brandFromAmazon(byline) === brand : title.toLowerCase().startsWith(brand.name.toLowerCase());
  if (!ownBrand) return null;

  const listings = item.offersV2?.listings ?? [];
  const listing = listings.find((l) => l.isBuyBoxWinner) ?? listings[0];
  const priceMoney = listing?.price?.money;
  if (!listing || typeof priceMoney?.amount !== "number" || priceMoney.amount <= 0) return null;

  const currency = priceMoney.currency ?? "USD";
  const basis = listing.price?.savingBasis?.money?.amount;
  const listPrice = typeof basis === "number" && basis > priceMoney.amount ? basis : null;
  const savings =
    listing.price?.savings?.money?.amount ?? (listPrice ? Math.round((listPrice - priceMoney.amount) * 100) / 100 : null);
  const savingsPercent =
    listing.price?.savings?.percentage ?? (listPrice ? Math.round(((listPrice - priceMoney.amount) / listPrice) * 100) : null);

  // Only genuine markdowns inside the configured band are listed.
  if (!listPrice || !savingsPercent || savingsPercent < SITE.minDiscount || savingsPercent > SITE.maxDiscount) return null;

  const availabilityType = listing.availability?.type ?? "";
  const images = [item.images?.primary?.large, ...(item.images?.variants ?? []).map((v) => v.large)].filter(
    (i): i is { url: string; width: number; height: number } => Boolean(i?.url),
  );
  const slug = productSlug(title, item.asin);

  return {
    asin: item.asin,
    title,
    name: shortTitle(title),
    slug,
    path: `/deals/${brand.slug}/${slug}`,
    brandSlug: brand.slug,
    brandName: brand.name,
    isGamingPc: isGamingPcTitle(title, brand),
    category: item.itemInfo?.classifications?.productGroup?.displayValue ?? null,
    amazonUrl: item.detailPageURL,
    image: images[0] ?? null,
    gallery: images.slice(0, 6),
    price: priceMoney.amount,
    priceDisplay: money(priceMoney.amount, currency),
    currency,
    listPrice,
    listPriceDisplay: listPrice ? money(listPrice, currency) : null,
    listPriceLabel: listPrice ? listing.price?.savingBasis?.savingBasisTypeLabel ?? "List price" : null,
    savings: savings && savings > 0 ? savings : null,
    savingsDisplay: savings && savings > 0 ? money(savings, currency) : null,
    savingsPercent: savingsPercent && savingsPercent > 0 ? Math.round(savingsPercent) : null,
    availability: listing.availability?.message ?? null,
    inStock: !/out_?of_?stock|unavailable/i.test(availabilityType),
    condition: listing.condition?.value ?? null,
    merchant: listing.merchantInfo?.name ?? null,
    dealBadge: listing.dealDetails?.badge ?? (listing.dealDetails ? "Limited time deal" : null),
    rating: item.customerReviews?.starRating?.value ?? null,
    reviewCount: item.customerReviews?.count ?? null,
    features: (item.itemInfo?.features?.displayValues ?? []).slice(0, 8),
    fetchedAt,
  };
}

function rank(a: Deal, b: Deal) {
  return (b.savingsPercent ?? 0) - (a.savingsPercent ?? 0) || (b.savings ?? 0) - (a.savings ?? 0) || a.price - b.price;
}

// Pages of 10 results per search. Keeps a full refresh near 24 calls, about
// 30 seconds at Amazon's starting limit of one request per second.
const MAX_PAGES = 3;

const fetchAllDeals = unstable_cache(
  async (): Promise<{ deals: Deal[]; fetchedAt: string }> => {
    const fetchedAt = new Date().toISOString();
    const byAsin = new Map<string, Deal>();
    let failures = 0;
    let attempts = 0;

    for (const brand of BRANDS) {
      for (const { keywords, searchIndex } of brand.searches) {
        for (let itemPage = 1; itemPage <= MAX_PAGES; itemPage++) {
          attempts++;
          try {
            const items = await searchItems({
              keywords,
              searchIndex,
              brand: brand.apiBrand,
              itemPage,
              minSavingPercent: SITE.minDiscount,
            });
            for (const item of items) {
              const deal = normalize(item, brand, fetchedAt);
              if (deal && !byAsin.has(deal.asin)) byAsin.set(deal.asin, deal);
            }
            if (items.length < 10) break;
          } catch (err) {
            const message = (err as Error).message;
            // Auth/eligibility rejections apply to every request; stop instead of repeating them.
            if (/ failed: (401|403)\b/.test(message)) throw new Error(`Amazon rejected the account: ${message}`);
            failures++;
            console.error(`[deals] ${brand.slug} "${keywords}" (${searchIndex}) page ${itemPage}:`, message);
            break;
          }
        }
      }
    }

    // Throwing keeps a total outage out of the cache so the next request retries.
    if (failures === attempts) throw new Error("All Creators API searches failed");
    return { deals: [...byAsin.values()].sort(rank), fetchedAt };
  },
  ["all-deals-v4"],
  { revalidate: SITE.revalidate, tags: ["deals"] },
);

let warnedUnconfigured = false;
let lastLoggedFetch: string | null = null;
// Failures are not written to the shared cache, so remember them in-process
// briefly: otherwise every page render would re-run the full set of API calls.
const FAILURE_BACKOFF_MS = 10 * 60 * 1000;
let failedUntil = 0;
let inflight: Promise<{ deals: Deal[]; fetchedAt: string }> | null = null;

export async function getAllDeals(): Promise<DealsResult> {
  if (!getConfig()) {
    if (!warnedUnconfigured) {
      warnedUnconfigured = true;
      const missing = ["AMAZON_CREDENTIAL_ID", "AMAZON_CREDENTIAL_SECRET"].filter((k) => !process.env[k]?.trim());
      console.warn(`[deals] Amazon Creators API not configured; missing env: ${missing.join(", ")}. No deals will be shown.`);
    }
    return { deals: [], configured: false, ok: false, fetchedAt: null };
  }
  if (Date.now() < failedUntil) return { deals: [], configured: true, ok: false, fetchedAt: null };
  try {
    inflight ??= fetchAllDeals().finally(() => {
      inflight = null;
    });
    const { deals, fetchedAt } = await inflight;
    if (fetchedAt !== lastLoggedFetch) {
      lastLoggedFetch = fetchedAt;
      console.info(`[deals] ${deals.length} deals loaded from Amazon (fetched ${fetchedAt})`);
    }
    return { deals, configured: true, ok: true, fetchedAt };
  } catch (err) {
    failedUntil = Date.now() + FAILURE_BACKOFF_MS;
    console.error("[deals] unavailable, retrying in 10 minutes:", (err as Error).message);
    return { deals: [], configured: true, ok: false, fetchedAt: null };
  }
}

/** Gaming PCs first, then everything else, each group ordered by discount. */
export function gamingPcsFirst(deals: Deal[]): Deal[] {
  return [...deals.filter((d) => d.isGamingPc), ...deals.filter((d) => !d.isGamingPc)];
}

export async function getBrandDeals(slug: string): Promise<DealsResult> {
  const result = await getAllDeals();
  return { ...result, deals: result.deals.filter((d) => d.brandSlug === slug) };
}

const fetchItem = unstable_cache(
  async (asin: string): Promise<Deal | null> => {
    const [item] = await getItems([asin]);
    if (!item) return null;
    const brand = brandFromAmazon(item.itemInfo?.byLineInfo?.brand?.displayValue ?? item.itemInfo?.title?.displayValue);
    return brand ? normalize(item, brand, new Date().toISOString()) : null;
  },
  ["deal-by-asin-v3"],
  { revalidate: SITE.revalidate, tags: ["deals"] },
);

export async function getDeal(asin: string): Promise<Deal | null> {
  const { deals } = await getAllDeals();
  const listed = deals.find((d) => d.asin === asin);
  if (listed) return listed;
  if (!getConfig() || Date.now() < failedUntil) return null;
  try {
    return await fetchItem(asin);
  } catch (err) {
    console.error(`[deals] getItems ${asin}:`, (err as Error).message);
    return null;
  }
}

export function relatedDeals(deal: Deal, all: Deal[], limit = 4): Deal[] {
  const others = all.filter((d) => d.asin !== deal.asin);
  const sameBrand = others.filter((d) => d.brandSlug === deal.brandSlug);
  const rest = others.filter((d) => d.brandSlug !== deal.brandSlug);
  return [...sameBrand, ...rest].slice(0, limit);
}
