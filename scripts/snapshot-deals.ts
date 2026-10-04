/**
 * Fetches every brand's catalog once and writes data/deals-snapshot.json, which
 * ships with the deployment (see SNAPSHOT_FILE in lib/deals.ts). Runs before
 * `next build`. Without API credentials it writes nothing and exits cleanly.
 *
 * Run with: tsx --conditions=react-server scripts/snapshot-deals.ts
 */
import { mkdirSync, writeFileSync } from "node:fs";
import { dirname } from "node:path";
import { getConfig } from "../lib/amazon/creators-api";
import { BRANDS } from "../lib/brands";
import { SNAPSHOT_FILE, fetchBrandLive } from "../lib/deals";

async function main() {
  if (!getConfig()) {
    console.warn("[snapshot] Product API not configured; skipping snapshot.");
    return;
  }
  const started = Date.now();
  const brands: Record<string, Awaited<ReturnType<typeof fetchBrandLive>>> = {};
  for (const brand of BRANDS) {
    try {
      const result = await fetchBrandLive(brand.slug);
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
  console.info(`[snapshot] Wrote ${count} deals from ${Object.keys(brands).length} brands in ${Math.round((Date.now() - started) / 1000)}s`);
}

main().catch((err) => {
  // Never fail the build over the snapshot; pages fall back to live fetching.
  console.error("[snapshot] failed:", err);
});
