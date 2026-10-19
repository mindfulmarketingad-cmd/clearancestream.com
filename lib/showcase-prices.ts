import "server-only";
import { readFileSync } from "node:fs";
import { join } from "node:path";
import { getConfig, getItems, productLink } from "./amazon/creators-api";
import { SHOWCASE_BUILDS } from "./showcase-builds";

/** Written by scripts/snapshot-deals.ts at deploy time; pages only read it. */
export const SHOWCASE_FILE = "data/showcase-snapshot.json";

export type PartPrice = {
  price: number;
  priceDisplay: string;
  listPriceDisplay: string | null;
  savingsPercent: number | null;
  image: { url: string; width: number; height: number } | null;
  url: string;
  inStock: boolean;
};

const usd = (n: number) => n.toLocaleString("en-US", { style: "currency", currency: "USD" });
/**
 * Fetch current price, image, and link for every showcase part by ASIN, for any
 * brand. Called only by the deploy-time snapshot script.
 */
export async function fetchShowcasePrices(): Promise<Record<string, PartPrice>> {
  const out: Record<string, PartPrice> = {};
  if (!getConfig()) return out;
  const ids = [...new Set(SHOWCASE_BUILDS.flatMap((b) => b.parts.map((p) => p.asin).filter((a): a is string => !!a)))];
  {
    for (let i = 0; i < ids.length; i += 10) {
      try {
        for (const item of await getItems(ids.slice(i, i + 10))) {
          const listings = item.offersV2?.listings ?? [];
          const listing = listings.find((l) => l.isBuyBoxWinner) ?? listings[0];
          const amount = listing?.price?.money?.amount;
          if (typeof amount !== "number" || amount <= 0) continue;
          const basis = listing?.price?.savingBasis?.money?.amount;
          const pct = typeof basis === "number" && basis > amount ? Math.round(((basis - amount) / basis) * 100) : null;
          // Same rule as the rest of the site: only genuine reference prices, never over 80% off.
          const real = pct !== null && pct >= 1 && pct <= 80;
          out[item.asin] = {
            price: amount,
            priceDisplay: usd(amount),
            listPriceDisplay: real ? usd(basis as number) : null,
            savingsPercent: real ? pct : null,
            image: item.images?.primary?.large ?? null,
            url: item.detailPageURL ?? productLink(item.asin),
            inStock: !/out_?of_?stock|unavailable/i.test(listing?.availability?.type ?? ""),
          };
        }
      } catch (err) {
        console.error("[showcase] getItems failed:", (err as Error).message);
      }
    }
  }
  return out;
}

let cached: { generatedAt: string; prices: Record<string, PartPrice> } | null | undefined;

/** Showcase prices from the deploy snapshot (empty when it is missing). */
export function readShowcasePrices(): { generatedAt: string | null; prices: Map<string, PartPrice> } {
  if (cached === undefined) {
    try {
      cached = JSON.parse(readFileSync(join(process.cwd(), SHOWCASE_FILE), "utf8"));
    } catch {
      cached = null;
    }
  }
  return { generatedAt: cached?.generatedAt ?? null, prices: new Map(Object.entries(cached?.prices ?? {})) };
}
