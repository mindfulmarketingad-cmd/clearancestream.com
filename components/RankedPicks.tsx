"use client";

import { useMemo, useState } from "react";
import type { Insight } from "@/lib/list-insights";
import { PickCompare, PickItem, type PickDeal } from "./PickItem";

type Pick = { deal: PickDeal; info: Insight; rank: number };

const PRICE_CAPS = [50, 100, 200, 500, 1000, 2000];

const SORTS = {
  best: { label: "Best overall", fn: (a: Pick, b: Pick) => a.rank - b.rank },
  discount: { label: "Biggest discount", fn: (a: Pick, b: Pick) => (b.deal.savingsPercent ?? 0) - (a.deal.savingsPercent ?? 0) || a.rank - b.rank },
  priceAsc: { label: "Lowest price", fn: (a: Pick, b: Pick) => a.deal.price - b.deal.price },
  rating: {
    label: "Highest rated",
    fn: (a: Pick, b: Pick) => (b.deal.rating ?? 0) - (a.deal.rating ?? 0) || (b.deal.reviewCount ?? 0) - (a.deal.reviewCount ?? 0),
  },
} as const;
type SortKey = keyof typeof SORTS;

/**
 * Ranked "top picks" listicle with filters. Every pick is rendered with its full
 * buyer's-guide detail; filters narrow and re-rank them in the browser.
 */
export function RankedPicks({
  picks,
  categories = [],
  brands = [],
  label,
  show = 10,
  more = 0,
  discountFilter = false,
}: {
  picks: Pick[];
  categories?: { slug: string; name: string }[];
  /** Brand names to filter by (used on category pages). */
  brands?: string[];
  label: string;
  show?: number;
  /** When set, a "Show more" button reveals this many more picks at a time. */
  more?: number;
  /** Adds a minimum-discount filter. */
  discountFilter?: boolean;
}) {
  const [category, setCategory] = useState("");
  const [brand, setBrand] = useState("");
  const [cap, setCap] = useState(0);
  const [onSale, setOnSale] = useState(false);
  const [wireless, setWireless] = useState(false);
  const [sort, setSort] = useState<SortKey>("best");
  const [minOff, setMinOff] = useState(0);
  const [limit, setLimit] = useState(show);

  const maxPrice = Math.max(...picks.map((p) => p.deal.price));
  const caps = PRICE_CAPS.filter((c) => c < maxPrice);
  const hasWireless = picks.some((p) => p.deal.attrs.includes("wireless"));

  const matching = useMemo(
    () =>
      picks
        .filter((p) => !category || p.deal.categorySlug === category)
        .filter((p) => !brand || p.deal.brandName === brand)
        .filter((p) => !cap || p.deal.price < cap)
        .filter((p) => !onSale || (p.deal.savingsPercent ?? 0) > 0)
        .filter((p) => !minOff || (p.deal.savingsPercent ?? 0) >= minOff)
        .filter((p) => !wireless || p.deal.attrs.includes("wireless"))
        .sort(SORTS[sort].fn),
    [picks, category, brand, cap, onSale, minOff, wireless, sort],
  );
  const results = matching.slice(0, more ? limit : show);

  const filtered = category || brand || cap || onSale || minOff || wireless || sort !== "best";
  const reset = () => {
    setMinOff(0);
    setLimit(show);
    setCategory("");
    setBrand("");
    setCap(0);
    setOnSale(false);
    setWireless(false);
    setSort("best");
  };

  return (
    <>
      <div className="browser-toolbar picks-toolbar" role="group" aria-label={`Filter ${label} picks`}>
        {categories.length > 1 ? (
          <select aria-label="Category" value={category} onChange={(e) => setCategory(e.target.value)}>
            <option value="">All categories</option>
            {categories.map((c) => (
              <option key={c.slug} value={c.slug}>
                {c.name}
              </option>
            ))}
          </select>
        ) : null}
        {brands.length > 1 ? (
          <select aria-label="Brand" value={brand} onChange={(e) => setBrand(e.target.value)}>
            <option value="">All brands</option>
            {brands.map((b) => (
              <option key={b} value={b}>
                {b}
              </option>
            ))}
          </select>
        ) : null}
        {caps.length > 0 ? (
          <select aria-label="Price" value={cap} onChange={(e) => setCap(Number(e.target.value))}>
            <option value={0}>Any price</option>
            {caps.map((c) => (
              <option key={c} value={c}>
                Under ${c.toLocaleString("en-US")}
              </option>
            ))}
          </select>
        ) : null}
        {discountFilter ? (
          <select aria-label="Discount" value={minOff} onChange={(e) => setMinOff(Number(e.target.value))}>
            <option value={0}>Any discount</option>
            {[10, 20, 30, 50].map((n) => (
              <option key={n} value={n}>
                {n}% off or more
              </option>
            ))}
            <option value={41}>Hot deals (over 40% off)</option>
          </select>
        ) : null}
        <select aria-label="Sort" value={sort} onChange={(e) => setSort(e.target.value as SortKey)}>
          {Object.entries(SORTS).map(([key, s]) => (
            <option key={key} value={key}>
              {s.label}
            </option>
          ))}
        </select>
        <label className="picks-check">
          <input type="checkbox" checked={onSale} onChange={(e) => setOnSale(e.target.checked)} /> On sale only
        </label>
        {hasWireless ? (
          <label className="picks-check">
            <input type="checkbox" checked={wireless} onChange={(e) => setWireless(e.target.checked)} /> Wireless
          </label>
        ) : null}
        {filtered ? (
          <button type="button" className="text-link picks-reset" onClick={reset}>
            Reset
          </button>
        ) : null}
      </div>

      {results.length === 0 ? (
        <p className="muted" style={{ marginTop: 16 }}>
          No {label} picks match these filters. Try widening the price or turning off &ldquo;On sale only&rdquo;.
        </p>
      ) : (
        <>
          <p className="muted" style={{ fontSize: 14, margin: "12px 0 16px" }} aria-live="polite">
            Showing {results.length}
            {more && matching.length > results.length ? ` of ${matching.length}` : ""} {results.length === 1 ? "pick" : "picks"}
            {filtered ? " matching your filters" : ""}.
          </p>
          <PickCompare items={results} />
          <ol className="list-items">
            {results.map((p, i) => (
              <PickItem key={p.deal.asin} deal={p.deal} info={p.info} rank={i + 1} eager={i < 2} />
            ))}
          </ol>
          {more && matching.length > results.length ? (
            <div style={{ textAlign: "center", marginTop: 24 }}>
              <button type="button" className="btn btn-secondary" onClick={() => setLimit((n) => n + more)}>
                Show {Math.min(more, matching.length - results.length)} more deals
              </button>
            </div>
          ) : null}
        </>
      )}
    </>
  );
}
