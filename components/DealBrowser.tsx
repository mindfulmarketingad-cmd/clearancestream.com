"use client";

import { useEffect, useMemo, useState } from "react";
import { CATEGORIES } from "@/lib/categories";
import type { Deal } from "@/lib/deals";
import { DealCard } from "./DealCard";
import { SearchIcon } from "./Icons";

const PAGE = 24;

const SORTS = {
  discount: { label: "Biggest discount", fn: (a: Deal, b: Deal) => (b.savingsPercent ?? 0) - (a.savingsPercent ?? 0) },
  savings: { label: "Biggest savings ($)", fn: (a: Deal, b: Deal) => (b.savings ?? 0) - (a.savings ?? 0) },
  priceAsc: { label: "Price: low to high", fn: (a: Deal, b: Deal) => a.price - b.price },
  priceDesc: { label: "Price: high to low", fn: (a: Deal, b: Deal) => b.price - a.price },
} as const;
type SortKey = keyof typeof SORTS;


/**
 * Client-side search, sort, category filter, and "load more" for a deal list.
 * Every card is rendered into the HTML (extra ones use the `hidden` attribute)
 * so crawlers see all product links without running JavaScript.
 */
export function DealBrowser({
  deals,
  label,
  showCategoryFilter = true,
}: {
  deals: Deal[];
  label: string;
  showCategoryFilter?: boolean;
}) {
  const [query, setQuery] = useState("");
  const [sort, setSort] = useState<SortKey>("discount");
  const [category, setCategory] = useState("");
  const [visible, setVisible] = useState(PAGE);

  // Links such as the homepage Scan button can preselect a sort with ?sort=savings.
  useEffect(() => {
    const requested = new URLSearchParams(window.location.search).get("sort");
    if (requested && requested in SORTS) setSort(requested as SortKey);
  }, []);

  const categories = useMemo(() => {
    const present = new Set(deals.map((d) => d.categorySlug));
    return CATEGORIES.filter((c) => present.has(c.slug));
  }, [deals]);

  const results = useMemo(() => {
    const terms = query.toLowerCase().split(/\s+/).filter(Boolean);
    return deals
      .filter((d) => !category || d.categorySlug === category)
      .filter((d) => terms.every((t) => d.title.toLowerCase().includes(t)))
      .sort(SORTS[sort].fn);
  }, [deals, query, sort, category]);

  const shown = Math.min(visible, results.length);

  return (
    <>
      <div className="browser-toolbar" role="search">
        <div className="browser-search">
          <SearchIcon />
          <label htmlFor="browser-q" className="sr-only">
            Search {label} deals
          </label>
          <input
            id="browser-q"
            type="search"
            placeholder={`Search ${label} deals...`}
            value={query}
            maxLength={80}
            onChange={(e) => {
              setQuery(e.target.value);
              setVisible(PAGE);
            }}
          />
        </div>
        {showCategoryFilter && categories.length > 1 ? (
          <select
            aria-label="Filter by category"
            value={category}
            onChange={(e) => {
              setCategory(e.target.value);
              setVisible(PAGE);
            }}
          >
            <option value="">All categories</option>
            {categories.map((c) => (
              <option key={c.slug} value={c.slug}>
                {c.name}
              </option>
            ))}
          </select>
        ) : null}
        <select aria-label="Sort deals" value={sort} onChange={(e) => setSort(e.target.value as SortKey)}>
          {Object.entries(SORTS).map(([k, v]) => (
            <option key={k} value={k}>
              {v.label}
            </option>
          ))}
        </select>
      </div>

      <p className="browser-count" aria-live="polite">
        Showing {shown} of {results.length} {results.length === 1 ? "deal" : "deals"}
      </p>

      {results.length > 0 ? (
        <div className="deal-grid">
          {results.map((deal, i) => (
            <DealCard key={deal.asin} deal={deal} priority={i < 4} hidden={i >= visible} />
          ))}
        </div>
      ) : (
        <div className="empty">
          <h3>No deals match your search</h3>
          <p>Try a different term or clear the filters.</p>
        </div>
      )}

      {results.length > visible ? (
        <div className="center mt-md">
          <button type="button" className="btn btn-secondary" onClick={() => setVisible((v) => v + PAGE)}>
            Load more
          </button>
        </div>
      ) : null}
    </>
  );
}
