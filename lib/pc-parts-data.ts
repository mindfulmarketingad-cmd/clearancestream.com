import "server-only";
import { readFileSync } from "node:fs";
import { join } from "node:path";
import { searchItems, type ApiItem } from "./amazon/creators-api";
import { PART_TYPES, highlights, matchesPartType, parseSpecs, type Part, type PartType, type PartTypeId } from "./pc-parts";
import { shortTitle } from "./slug";

/**
 * Parts catalog for the PC Builder. Fetched once per build by
 * scripts/snapshot-deals.ts into data/parts-snapshot.json, then read by the
 * static /pc-builder/parts.json route.
 */

export const PARTS_FILE = "data/parts-snapshot.json";
export type PartsSnapshot = { generatedAt: string; parts: Record<PartTypeId, Part[]> };

const PAGES_PER_SEARCH = 3;
/** Parts kept per type, most-reviewed first. */
const KEEP = 120;
const RETAILER_TERMS = /\b(amazon|prime|alexa|kindle)\b/i;

const money = (n: number, currency = "USD") => new Intl.NumberFormat("en-US", { style: "currency", currency }).format(n);

function cleanTitle(title: string) {
  return title.replace(/\s*[-–—|,(]?\s*amazon exclusive\)?/gi, "").replace(/\s{2,}/g, " ").trim();
}

function normalizePart(item: ApiItem, type: PartType): Part | null {
  const raw = item.itemInfo?.title?.displayValue?.trim();
  const title = raw ? cleanTitle(raw) : "";
  if (!title || !item.detailPageURL || !matchesPartType(type, title)) return null;
  const listings = item.offersV2?.listings ?? [];
  const listing = listings.find((l) => l.isBuyBoxWinner) ?? listings[0];
  const amount = listing?.price?.money?.amount;
  if (!listing || typeof amount !== "number" || amount <= 0) return null;
  if (/out_?of_?stock|unavailable/i.test(listing.availability?.type ?? "")) return null;
  if (listing.condition?.value && !/^new$/i.test(listing.condition.value)) return null;

  const currency = listing.price?.money?.currency ?? "USD";
  const basis = listing.price?.savingBasis?.money?.amount;
  const listPrice = typeof basis === "number" && basis > amount ? basis : null;
  const pct = listPrice ? Math.round(((listPrice - amount) / listPrice) * 100) : null;
  // Same rule as deals: only a genuine reference price gets a strikethrough.
  const real = Boolean(listPrice && pct && pct >= 1 && pct <= 80);
  const features = (item.itemInfo?.features?.displayValues ?? []).filter((f) => !RETAILER_TERMS.test(f));
  const specs = parseSpecs(type.id, title, features);
  return {
    asin: item.asin,
    type: type.id,
    name: shortTitle(title),
    brand: item.itemInfo?.byLineInfo?.brand?.displayValue ?? null,
    image: item.images?.primary?.large ?? null,
    price: amount,
    priceDisplay: money(amount, currency),
    listPriceDisplay: real && listPrice ? money(listPrice, currency) : null,
    savingsPercent: real ? pct : null,
    rating: item.customerReviews?.starRating?.value ?? null,
    reviewCount: item.customerReviews?.count ?? null,
    buyUrl: item.detailPageURL,
    specs,
    highlights: highlights(type.id, specs),
  };
}

const popularity = (p: Part) => (p.rating ?? 0) * Math.log10((p.reviewCount ?? 0) + 10);

/** Fetch every part type from the product API (no caching). */
export async function fetchParts(log = console.info): Promise<PartsSnapshot> {
  const parts = {} as Record<PartTypeId, Part[]>;
  for (const type of PART_TYPES) {
    const byAsin = new Map<string, Part>();
    for (const { keywords, searchIndex } of type.searches) {
      for (let page = 1; page <= PAGES_PER_SEARCH; page++) {
        try {
          const items = await searchItems({ keywords, searchIndex: searchIndex ?? "Computers", itemPage: page, itemCount: 10 });
          for (const item of items) {
            const part = normalizePart(item, type);
            if (part && !byAsin.has(part.asin)) byAsin.set(part.asin, part);
          }
          if (items.length < 10) break;
        } catch (err) {
          const message = (err as Error).message;
          if (/ failed: (401|403)\b/.test(message)) throw err;
          log(`[parts] ${type.id} "${keywords}" page ${page}: ${message}`);
          break;
        }
      }
    }
    parts[type.id] = [...byAsin.values()].sort((a, b) => popularity(b) - popularity(a)).slice(0, KEEP);
    log(`[parts] ${type.id}: ${parts[type.id].length}`);
  }
  return { generatedAt: new Date().toISOString(), parts };
}

let cached: PartsSnapshot | null | undefined;

/** The deploy-time parts snapshot, or null when it was not generated (no API credentials). */
export function readParts(): PartsSnapshot | null {
  if (cached !== undefined) return cached;
  try {
    cached = JSON.parse(readFileSync(join(process.cwd(), PARTS_FILE), "utf8")) as PartsSnapshot;
  } catch {
    cached = null;
  }
  return cached;
}
