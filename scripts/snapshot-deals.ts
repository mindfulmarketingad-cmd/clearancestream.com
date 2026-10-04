/**
 * Fetches every brand's catalog once and writes data/deals-snapshot.json, which
 * ships with the deployment (see SNAPSHOT_FILE in lib/deals.ts). Runs before
 * `next build`. Without API credentials it writes nothing and exits cleanly.
 *
 * Incremental: brands whose snapshot entry has a `fetchedAt` newer than 7 days
 * are skipped and their existing data is merged into the output. Only missing
 * or stale brands are refetched, so rebuilds cost API calls only for stale
 * brands. Run with: tsx --conditions=react-server scripts/snapshot-deals.ts
 */
import { existsSync, mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname } from "node:path";
import { getConfig } from "../lib/amazon/creators-api";
import { BRANDS } from "../lib/brands";
import { SNAPSHOT_FILE, fetchBrandLive } from "../lib/deals";

type BrandEntry = Awaited<ReturnType<typeof fetchBrandLive>>;

// A brand's snapshot data is reused without refetching for 7 days.
const FRESH_WINDOW_MS = 7 * 24 * 60 * 60 * 1000;

function readExistingSnapshot(): { generatedAt?: string; brands?: Record<string, BrandEntry> } {
  try {
    if (!existsSync(SNAPSHOT_FILE)) return {};
    const parsed = JSON.parse(readFileSync(SNAPSHOT_FILE, "utf8"));
    if (parsed && typeof parsed === "object" && parsed.brands && typeof parsed.brands === "object") {
      return parsed;
    }
    return {};
  } catch (err) {
    console.warn("[snapshot] existing snapshot unreadable; refetching all brands:", (err as Error).message);
    return {};
  }
}

function isFresh(entry: BrandEntry | undefined): boolean {
  if (!entry || typeof entry.fetchedAt !== "string") return false;
  const fetchedAt = Date.parse(entry.fetchedAt);
  if (Number.isNaN(fetchedAt)) return false;
  return Date.now() - fetchedAt < FRESH_WINDOW_MS;
}

async function main() {
  if (!getConfig()) {
    console.warn("[snapshot] Product API not configured; skipping snapshot.");
    return;
  }
  const started = Date.now();
  const previous = readExistingSnapshot();
  const brands: Record<string, BrandEntry> = {};
  let kept = 0;
  for (const brand of BRANDS) {
    const cached = previous.brands?.[brand.slug];
    if (isFresh(cached)) {
      // Fresh: keep the existing snapshot data without an API call.
      brands[brand.slug] = cached as BrandEntry;
      kept += 1;
      continue;
    }
    try {
      const result = await fetchBrandLive(brand.slug);
      // Stamp the per-brand entry so the next run knows it is fresh.
      result.fetchedAt = new Date().toISOString();
      brands[brand.slug] = result;
      console.info(`[snapshot] ${brand.slug}: ${result.deals.length} deals`);
    } catch (err) {
      const message = (err as Error).message;
      console.error(`[snapshot] ${brand.slug} failed; it will be fetched at runtime:`, message);
      // An account-level rejection applies to every brand.
      if (/ failed: (401|403)\b/.test(message)) break;
    }
  }
  const count = Object.values(brands).reduce((n, b) => n + b.deals.length, 0);
  mkdirSync(dirname(SNAPSHOT_FILE), { recursive: true });
  writeFileSync(SNAPSHOT_FILE, JSON.stringify({ generatedAt: new Date().toISOString(), brands }));
  console.info(
    `[snapshot] Kept ${kept} fresh brands from the previous snapshot; wrote ${count} deals from ${
      Object.keys(brands).length
    } brands in ${Math.round((Date.now() - started) / 1000)}s`,
  );
}

main().catch((err) => {
  // Never fail the build over the snapshot; pages fall back to live fetching.
  console.error("[snapshot] failed:", err);
});
