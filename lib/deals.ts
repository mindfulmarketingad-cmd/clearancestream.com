import "server-only";
import { unstable_cache } from "next/cache";
import { BRANDS, brandFromByline, getBrand, type Brand } from "./brands";
import { extractAttributes } from "./attributes";
import { categorize } from "./categories";
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
  /** Our category slug (see lib/categories.ts), e.g. "mice". */
  categorySlug: string;
  /** Parsed attribute tags, e.g. "wireless", "ps5", "gpu:rtx-5070-ti" (see lib/attributes.ts). */
  attrs: string[];
  buyUrl: string;
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

const LAPTOP = /\b(laptop|notebook|handheld)\b/i;

function isGamingPcTitle(title: string, brand: Brand) {
  if (CASE.test(title) || LAPTOP.test(title)) return false;
  return EXPLICIT_PC.test(title) || (brand.include.test(title) && !brand.exclude.test(title));
}

// Retailer-specific phrases are stripped from product text before display.
const RETAILER_TERMS = /\b(amazon|prime|alexa|kindle|fire tv)\b/i;

function cleanTitle(title: string) {
  return title
    .replace(/\s*[-–—|,(]?\s*amazon exclusive\)?/gi, "")
    .replace(/\s{2,}/g, " ")
    .trim();
}

function normalize(item: ApiItem, brand: Brand, fetchedAt: string): Deal | null {
  const rawTitle = item.itemInfo?.title?.displayValue?.trim();
  const title = rawTitle ? cleanTitle(rawTitle) : undefined;
  if (!title || !item.detailPageURL) return null;
  // Guard against third-party items that merely mention the brand ("compatible with ...").
  const byline = item.itemInfo?.byLineInfo?.brand?.displayValue;
  const ownBrand = byline ? brandFromByline(byline) === brand : title.toLowerCase().startsWith(brand.name.toLowerCase());
  if (!ownBrand) return null;
  if (brand.require && !brand.require.test(title)) return null;

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

  // A strikethrough is only shown for a real reference price. Implausible
  // savings (over 80%) almost always mean a bad reference, so they are dropped.
  const realDiscount = Boolean(listPrice && savingsPercent && savingsPercent >= 1 && savingsPercent <= 80);

  const availabilityType = listing.availability?.type ?? "";
  const images = [item.images?.primary?.large, ...(item.images?.variants ?? []).map((v) => v.large)].filter(
    (i): i is { url: string; width: number; height: number } => Boolean(i?.url),
  );
  const slug = productSlug(title, item.asin);
  const isGamingPc = isGamingPcTitle(title, brand);
  const features = (item.itemInfo?.features?.displayValues ?? []).filter((f) => !RETAILER_TERMS.test(f)).slice(0, 6);

  return {
    asin: item.asin,
    title,
    name: shortTitle(title),
    slug,
    path: `/deals/${brand.slug}/${slug}`,
    brandSlug: brand.slug,
    brandName: brand.name,
    isGamingPc,
    category: item.itemInfo?.classifications?.productGroup?.displayValue ?? null,
    categorySlug: categorize(title, isGamingPc),
    buyUrl: item.detailPageURL,
    image: images[0] ?? null,
    gallery: images.slice(0, 4),
    price: priceMoney.amount,
    priceDisplay: money(priceMoney.amount, currency),
    currency,
    listPrice: realDiscount ? listPrice : null,
    listPriceDisplay: realDiscount && listPrice ? money(listPrice, currency) : null,
    listPriceLabel: realDiscount ? listing.price?.savingBasis?.savingBasisTypeLabel ?? "List price" : null,
    savings: realDiscount && savings && savings > 0 ? savings : null,
    savingsDisplay: realDiscount && savings && savings > 0 ? money(savings, currency) : null,
    savingsPercent: realDiscount && savingsPercent ? Math.round(savingsPercent) : null,
    availability: listing.availability?.message ?? null,
    inStock: !/out_?of_?stock|unavailable/i.test(availabilityType),
    condition: listing.condition?.value ?? null,
    merchant: listing.merchantInfo?.name ?? null,
    dealBadge: listing.dealDetails
      ? listing.dealDetails.badge && !RETAILER_TERMS.test(listing.dealDetails.badge)
        ? listing.dealDetails.badge
        : "Limited time deal"
      : null,
    rating: item.customerReviews?.starRating?.value ?? null,
    reviewCount: item.customerReviews?.count ?? null,
    features,
    attrs: extractAttributes(title, features),
    fetchedAt,
  };
}

function rank(a: Deal, b: Deal) {
  return (
    (b.savingsPercent ?? 0) - (a.savingsPercent ?? 0) ||
    (b.rating ?? 0) * Math.log10((b.reviewCount ?? 0) + 1) - (a.rating ?? 0) * Math.log10((a.reviewCount ?? 0) + 1) ||
    a.price - b.price
  );
}

// The live API returns 10 results per request even when more are asked for,
// so catalog size comes from paging: 5 pages per search, ~285 calls for a cold
// refresh of every brand (about 6 minutes at one request per second). Brands
// are cached separately and refresh in the background as their cache expires.
const PAGES_PER_SEARCH = 5;
const ITEMS_PER_PAGE = 50;

type BrandFetch = { deals: Deal[]; fetchedAt: string };

// Extra category searches widen each brand's catalog beyond its core searches.
const LAPTOP_BRANDS = new Set(["alienware", "hp-omen", "lenovo-legion", "asus-rog", "msi", "acer-predator", "razer"]);

function searchesFor(brand: Brand) {
  const name = brand.name.replace(/ (Gaming|G)$/, "");
  const extra: { keywords: string; searchIndex: string }[] = [];
  if (LAPTOP_BRANDS.has(brand.slug)) extra.push({ keywords: `${name} gaming laptop`, searchIndex: "Computers" });
  if (brand.group === "peripherals") {
    for (const kind of ["gaming mouse", "gaming keyboard", "gaming headset"]) {
      extra.push({ keywords: `${name} ${kind}`, searchIndex: "Computers" });
    }
  }
  return [...brand.searches, ...extra];
}

const fetchBrandDeals = unstable_cache(
  async (slug: string): Promise<BrandFetch> => {
    const brand = getBrand(slug);
    if (!brand) return { deals: [], fetchedAt: new Date().toISOString() };
    const fetchedAt = new Date().toISOString();
    const byAsin = new Map<string, Deal>();
    let failures = 0;
    let attempts = 0;

    for (const { keywords, searchIndex } of searchesFor(brand)) {
      for (let itemPage = 1; itemPage <= PAGES_PER_SEARCH; itemPage++) {
        attempts++;
        try {
          const items = await searchItems({ keywords, searchIndex, brand: brand.apiBrand, itemPage, itemCount: ITEMS_PER_PAGE });
          for (const item of items) {
            const deal = normalize(item, brand, fetchedAt);
            if (deal && !byAsin.has(deal.asin)) byAsin.set(deal.asin, deal);
          }
          if (items.length < 10) break;
        } catch (err) {
          const message = (err as Error).message;
          // Auth/eligibility rejections apply to every request; stop instead of repeating them.
          if (/ failed: (401|403)\b/.test(message)) throw new Error(`${ACCOUNT_REJECTED}: ${message}`);
          failures++;
          console.error(`[deals] ${brand.slug} "${keywords}" (${searchIndex}) page ${itemPage}:`, message);
          break;
        }
      }
    }

    // Throwing keeps a total failure out of the cache so a later request retries.
    if (failures === attempts) throw new Error(`All searches failed for ${slug}`);
    return { deals: [...byAsin.values()].sort(rank), fetchedAt };
  },
  ["brand-deals-v3"],
  { revalidate: SITE.revalidate, tags: ["deals"] },
);

const ACCOUNT_REJECTED = "Product API rejected the account";
let warnedUnconfigured = false;
const loggedFetches = new Set<string>();
// Failures are not written to the shared cache, so remember them in-process
// briefly; otherwise every page render would retry the failing API calls.
const FAILURE_BACKOFF_MS = 10 * 60 * 1000;
let failedUntil = 0;
const brandFailedUntil = new Map<string, number>();
// Stored on globalThis because Next bundles pages and route handlers as
// separate module copies within one process.
const shared = globalThis as typeof globalThis & {
  __csMemo?: Map<string, { at: number; result: BrandFetch }>;
  __csInflight?: Map<string, Promise<BrandFetch>>;
};
const inflight = (shared.__csInflight ??= new Map<string, Promise<BrandFetch>>());

function configured() {
  if (getConfig()) return true;
  if (!warnedUnconfigured) {
    warnedUnconfigured = true;
    const missing = ["AMAZON_CREDENTIAL_ID", "AMAZON_CREDENTIAL_SECRET"].filter((k) => !process.env[k]?.trim());
    console.warn(`[deals] Product API not configured; missing env: ${missing.join(", ")}. No deals will be shown.`);
  }
  return false;
}

// The data cache is not always consulted between renders in the same process
// (notably during a build), so recent results are also kept in memory briefly.
const MEMO_MS = 15 * 60 * 1000;
const memo = (shared.__csMemo ??= new Map());

async function loadBrand(brand: Brand): Promise<BrandFetch | null> {
  const now = Date.now();
  const hit = memo.get(brand.slug);
  if (hit && now - hit.at < MEMO_MS) return hit.result;
  if (now < failedUntil || now < (brandFailedUntil.get(brand.slug) ?? 0)) return null;
  let pending = inflight.get(brand.slug);
  if (!pending) {
    pending = fetchBrandDeals(brand.slug).finally(() => inflight.delete(brand.slug));
    inflight.set(brand.slug, pending);
  }
  try {
    const result = await pending;
    memo.set(brand.slug, { at: Date.now(), result });
    const key = `${brand.slug}@${result.fetchedAt}`;
    if (!loggedFetches.has(key)) {
      loggedFetches.add(key);
      console.info(`[deals] ${brand.slug}: ${result.deals.length} deals (fetched ${result.fetchedAt})`);
    }
    return result;
  } catch (err) {
    const message = (err as Error).message;
    if (message.startsWith(ACCOUNT_REJECTED)) failedUntil = Date.now() + FAILURE_BACKOFF_MS;
    else brandFailedUntil.set(brand.slug, Date.now() + FAILURE_BACKOFF_MS);
    console.error(`[deals] ${brand.slug} unavailable, retrying in 10 minutes:`, message);
    return null;
  }
}

function combine(results: (BrandFetch | null)[]): DealsResult {
  const ok = results.filter((r): r is BrandFetch => r !== null);
  const deals = ok.flatMap((r) => r.deals).sort(rank);
  const fetchedAt = ok.map((r) => r.fetchedAt).sort().at(-1) ?? null;
  return { deals, configured: true, ok: ok.length > 0, fetchedAt };
}

export async function getAllDeals(): Promise<DealsResult> {
  if (!configured()) return { deals: [], configured: false, ok: false, fetchedAt: null };
  // Sequential on purpose: the API allows one request per second.
  const results: (BrandFetch | null)[] = [];
  for (const brand of BRANDS) results.push(await loadBrand(brand));
  return combine(results);
}

/** Gaming PCs first, then everything else, each group ordered by discount. */
export function gamingPcsFirst(deals: Deal[]): Deal[] {
  return [...deals.filter((d) => d.isGamingPc), ...deals.filter((d) => !d.isGamingPc)];
}

export async function getBrandDeals(slug: string): Promise<DealsResult> {
  const brand = getBrand(slug);
  if (!brand || !configured()) return { deals: [], configured: false, ok: false, fetchedAt: null };
  return combine([await loadBrand(brand)]);
}

const fetchItem = unstable_cache(
  async (asin: string): Promise<Deal | null> => {
    const [item] = await getItems([asin]);
    if (!item) return null;
    const brand = brandFromByline(item.itemInfo?.byLineInfo?.brand?.displayValue ?? item.itemInfo?.title?.displayValue);
    return brand ? normalize(item, brand, new Date().toISOString()) : null;
  },
  ["deal-by-asin-v6"],
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
  const score = (d: Deal) => (d.brandSlug === deal.brandSlug ? 2 : 0) + (d.categorySlug === deal.categorySlug ? 1 : 0);
  return others
    .map((d, i) => ({ d, i }))
    .sort((a, b) => score(b.d) - score(a.d) || a.i - b.i)
    .slice(0, limit)
    .map(({ d }) => d);
}
