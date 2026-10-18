"use client";

import Link from "next/link";
import { useEffect, useMemo, useRef, useState } from "react";
import { ExternalIcon, SearchIcon } from "./Icons";

export type TableRow = {
  asin: string;
  name: string;
  path: string;
  buyUrl: string;
  image: string | null;
  brand: string;
  price: number;
  priceDisplay: string;
  listPriceDisplay: string | null;
  savingsPercent: number | null;
  rating: number | null;
  reviewCount: number | null;
  specs: Record<string, string>;
};

export type Facet = { key: string; values: { value: string; count: number }[] };

type SortKey = "name" | "price" | "discount" | "rating" | `spec:${string}`;

const PAGE_SIZE = 50;
const SHOW_VALUES = 6;

function FilterGroup({
  title,
  values,
  selected,
  onToggle,
}: {
  title: string;
  values: { value: string; count: number }[];
  selected: Set<string>;
  onToggle: (v: string) => void;
}) {
  const [open, setOpen] = useState(false);
  const shown = open ? values : values.slice(0, SHOW_VALUES);
  return (
    <fieldset className="ct-group">
      <legend>{title}</legend>
      {shown.map(({ value, count }) => (
        <label key={value} className="ct-check">
          <input type="checkbox" checked={selected.has(value)} onChange={() => onToggle(value)} />
          <span>{value}</span>
          <span className="ct-count">{count}</span>
        </label>
      ))}
      {values.length > SHOW_VALUES ? (
        <button type="button" className="ct-more" onClick={() => setOpen((o) => !o)}>
          {open ? "Show less" : `Show ${values.length - SHOW_VALUES} more`}
        </button>
      ) : null}
    </fieldset>
  );
}

/**
 * Part-picker style product table for a category: filter sidebar, sortable
 * spec columns, and pages of 50. Everything runs in the browser.
 */
export function CategoryTable({ rows, columns, facets, noun }: { rows: TableRow[]; columns: string[]; facets: Facet[]; noun: string }) {
  const brands = useMemo(() => {
    const counts = new Map<string, number>();
    for (const r of rows) counts.set(r.brand, (counts.get(r.brand) ?? 0) + 1);
    return [...counts].map(([value, count]) => ({ value, count })).sort((a, b) => b.count - a.count || a.value.localeCompare(b.value));
  }, [rows]);
  const maxPrice = Math.ceil(Math.max(0, ...rows.map((r) => r.price)));
  const rated = rows.some((r) => r.rating);

  const [q, setQ] = useState("");
  const [brandSel, setBrandSel] = useState<Set<string>>(new Set());
  const [specSel, setSpecSel] = useState<Record<string, Set<string>>>({});
  const [minPrice, setMinPrice] = useState(0);
  const [capPrice, setCapPrice] = useState(maxPrice);
  const [onSale, setOnSale] = useState(false);
  const [minOff, setMinOff] = useState(0);
  const [sort, setSort] = useState<{ key: SortKey; dir: 1 | -1 } | null>(null);
  const [page, setPage] = useState(0);
  const filtersRef = useRef<HTMLDetailsElement>(null);
  // Filters start collapsed on narrow screens so the table is visible first.
  useEffect(() => {
    if (filtersRef.current && window.matchMedia("(max-width: 900px)").matches) filtersRef.current.open = false;
  }, []);

  const reset = () => {
    setQ("");
    setBrandSel(new Set());
    setSpecSel({});
    setMinPrice(0);
    setCapPrice(maxPrice);
    setOnSale(false);
    setMinOff(0);
    setSort(null);
    setPage(0);
  };
  const toggle = (set: Set<string>, v: string) => {
    const next = new Set(set);
    if (next.has(v)) next.delete(v);
    else next.add(v);
    return next;
  };

  const filtered = useMemo(() => {
    const words = q.toLowerCase().split(/\s+/).filter(Boolean);
    const out = rows.filter(
      (r) =>
        (!brandSel.size || brandSel.has(r.brand)) &&
        r.price >= minPrice &&
        r.price <= capPrice &&
        (!onSale || (r.savingsPercent ?? 0) > 0) &&
        (!minOff || (r.savingsPercent ?? 0) >= minOff) &&
        Object.entries(specSel).every(([k, vals]) => !vals.size || vals.has(r.specs[k])) &&
        words.every((w) => r.name.toLowerCase().includes(w) || r.brand.toLowerCase().includes(w)),
    );
    if (!sort) return out;
    const val = (r: TableRow): string | number => {
      if (sort.key === "name") return r.name.toLowerCase();
      if (sort.key === "price") return r.price;
      if (sort.key === "discount") return r.savingsPercent ?? 0;
      if (sort.key === "rating") return r.rating ?? 0;
      const v = r.specs[sort.key.slice(5)] ?? "";
      const n = parseFloat(v.replace(/,/g, ""));
      return Number.isNaN(n) ? v.toLowerCase() : n;
    };
    return [...out].sort((a, b) => {
      const x = val(a);
      const y = val(b);
      // Products missing the sorted spec always go last.
      if (x === "" && y !== "") return 1;
      if (y === "" && x !== "") return -1;
      return (x < y ? -1 : x > y ? 1 : 0) * sort.dir;
    });
  }, [rows, q, brandSel, specSel, minPrice, capPrice, onSale, minOff, sort]);

  const pages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const current = Math.min(page, pages - 1);
  const visible = filtered.slice(current * PAGE_SIZE, (current + 1) * PAGE_SIZE);
  const active =
    q || brandSel.size || Object.values(specSel).some((s) => s.size) || minPrice > 0 || capPrice < maxPrice || onSale || minOff || sort;

  const sortBy = (key: SortKey) => {
    setSort((s) => (s?.key === key ? { key, dir: s.dir === 1 ? -1 : 1 } : { key, dir: key === "discount" || key === "rating" ? -1 : 1 }));
    setPage(0);
  };
  const Th = ({ k, children, className }: { k: SortKey; children: string; className?: string }) => (
    <th scope="col" className={className} aria-sort={sort?.key === k ? (sort.dir === 1 ? "ascending" : "descending") : "none"}>
      <button type="button" onClick={() => sortBy(k)}>
        {children}
        <span aria-hidden="true">{sort?.key === k ? (sort.dir === 1 ? " ▲" : " ▼") : ""}</span>
      </button>
    </th>
  );
  const goTo = (p: number) => {
    setPage(p);
    document.getElementById("deals")?.scrollIntoView({ block: "start" });
  };

  const filters = (
    <>
      <fieldset className="ct-group">
        <legend>Price</legend>
        <div className="ct-price">
          <label>
            <span className="sr-only">Minimum price</span>$
            <input
              type="number"
              min={0}
              max={maxPrice}
              value={minPrice}
              onChange={(e) => {
                setMinPrice(Math.max(0, Number(e.target.value) || 0));
                setPage(0);
              }}
            />
          </label>
          <span>to</span>
          <label>
            <span className="sr-only">Maximum price</span>$
            <input
              type="number"
              min={0}
              max={maxPrice}
              value={capPrice}
              onChange={(e) => {
                setCapPrice(Number(e.target.value) || maxPrice);
                setPage(0);
              }}
            />
          </label>
        </div>
        <input
          type="range"
          aria-label="Maximum price"
          min={0}
          max={maxPrice}
          step={Math.max(1, Math.round(maxPrice / 100))}
          value={capPrice}
          onChange={(e) => {
            setCapPrice(Number(e.target.value));
            setPage(0);
          }}
        />
      </fieldset>
      <fieldset className="ct-group">
        <legend>Deals</legend>
        <label className="ct-check">
          <input
            type="checkbox"
            checked={onSale}
            onChange={(e) => {
              setOnSale(e.target.checked);
              setPage(0);
            }}
          />
          <span>On sale only</span>
        </label>
        <select
          aria-label="Minimum discount"
          value={minOff}
          onChange={(e) => {
            setMinOff(Number(e.target.value));
            setPage(0);
          }}
        >
          <option value={0}>Any discount</option>
          {[10, 20, 30, 50].map((n) => (
            <option key={n} value={n}>
              {n}% off or more
            </option>
          ))}
        </select>
      </fieldset>
      {brands.length > 1 ? (
        <FilterGroup
          title="Manufacturer"
          values={brands}
          selected={brandSel}
          onToggle={(v) => {
            setBrandSel((s) => toggle(s, v));
            setPage(0);
          }}
        />
      ) : null}
      {facets.map((f) => (
        <FilterGroup
          key={f.key}
          title={f.key}
          values={f.values}
          selected={specSel[f.key] ?? new Set()}
          onToggle={(v) => {
            setSpecSel((s) => ({ ...s, [f.key]: toggle(s[f.key] ?? new Set(), v) }));
            setPage(0);
          }}
        />
      ))}
    </>
  );

  return (
    <div className="ct-layout">
      <aside className="ct-sidebar" aria-label={`Filter ${noun}s`}>
        <details className="ct-filters" open ref={filtersRef}>
          <summary>Filters</summary>
          {filters}
        </details>
      </aside>

      <div className="ct-main">
        <div className="ct-top">
          <p className="ct-total" aria-live="polite">
            <b>{filtered.length.toLocaleString("en-US")}</b> {filtered.length === 1 ? "product" : "products"}
            {active ? (
              <button type="button" className="text-link ct-reset" onClick={reset}>
                Clear filters
              </button>
            ) : null}
          </p>
          <select
            className="ct-sort"
            aria-label="Sort"
            value={sort ? `${sort.key}|${sort.dir}` : ""}
            onChange={(e) => {
              const [key, dir] = e.target.value.split("|");
              setSort(key ? { key: key as SortKey, dir: Number(dir) as 1 | -1 } : null);
              setPage(0);
            }}
          >
            <option value="">Best match</option>
            <option value="price|1">Price: low to high</option>
            <option value="price|-1">Price: high to low</option>
            <option value="discount|-1">Biggest discount</option>
            {rated ? <option value="rating|-1">Highest rated</option> : null}
            <option value="name|1">Name A–Z</option>
          </select>
          <label className="ct-search">
            <SearchIcon />
            <span className="sr-only">Search {noun}s</span>
            <input
              type="search"
              placeholder={`Search ${noun}s`}
              value={q}
              onChange={(e) => {
                setQ(e.target.value);
                setPage(0);
              }}
            />
          </label>
        </div>

        {visible.length === 0 ? (
          <p className="muted" style={{ padding: "24px 0" }}>
            No {noun}s match these filters.{" "}
            <button type="button" className="text-link" onClick={reset}>
              Clear filters
            </button>
          </p>
        ) : (
          <div className="ct-scroll">
            <table className="ct-table">
              <caption className="sr-only">{noun} prices and specs</caption>
              <thead>
                <tr>
                  <Th k="name" className="ct-name-h">
                    Name
                  </Th>
                  {columns.map((c) => (
                    <Th key={c} k={`spec:${c}`}>
                      {c}
                    </Th>
                  ))}
                  {rated ? <Th k="rating">Rating</Th> : null}
                  <Th k="discount">Discount</Th>
                  <Th k="price" className="ct-price-h">
                    Price
                  </Th>
                  <th scope="col">
                    <span className="sr-only">Buy</span>
                  </th>
                </tr>
              </thead>
              <tbody>
                {visible.map((r) => (
                  <tr key={r.asin}>
                    <td className="ct-name">
                      <Link href={r.path}>
                        {r.image ? (
                          // eslint-disable-next-line @next/next/no-img-element
                          <img src={r.image} alt="" width={40} height={40} loading="lazy" referrerPolicy="no-referrer" />
                        ) : (
                          <span className="ct-noimg" aria-hidden="true" />
                        )}
                        <span>{r.name}</span>
                      </Link>
                    </td>
                    {columns.map((c) => (
                      <td key={c} data-label={c}>
                        {r.specs[c] ?? <span className="ct-none">—</span>}
                      </td>
                    ))}
                    {rated ? (
                      <td data-label="Rating">
                        {r.rating ? (
                          <>
                            {r.rating.toFixed(1)}
                            {r.reviewCount ? <span className="ct-count"> ({r.reviewCount.toLocaleString("en-US")})</span> : null}
                          </>
                        ) : (
                          <span className="ct-none">—</span>
                        )}
                      </td>
                    ) : null}
                    <td data-label="Discount">
                      {r.savingsPercent ? <span className="ct-off">{r.savingsPercent}% off</span> : <span className="ct-none">—</span>}
                    </td>
                    <td className="ct-pricecell" data-label="Price">
                      <span className={r.savingsPercent ? "price-deal" : undefined}>{r.priceDisplay}</span>
                      {r.listPriceDisplay ? <s>{r.listPriceDisplay}</s> : null}
                    </td>
                    <td className="ct-buy">
                      <a href={r.buyUrl} className="btn btn-primary btn-sm" target="_blank" rel="sponsored nofollow noopener">
                        Buy <ExternalIcon />
                      </a>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {pages > 1 ? (
          <nav className="ct-pages" aria-label="Pages">
            <button type="button" disabled={current === 0} onClick={() => goTo(current - 1)}>
              Prev
            </button>
            {Array.from({ length: pages }, (_, i) => i)
              .filter((i) => i === 0 || i === pages - 1 || Math.abs(i - current) <= 2)
              .map((i, idx, arr) => (
                <span key={i}>
                  {idx > 0 && i - arr[idx - 1] > 1 ? <span className="ct-gap">…</span> : null}
                  <button type="button" aria-current={i === current ? "page" : undefined} onClick={() => goTo(i)}>
                    {i + 1}
                  </button>
                </span>
              ))}
            <button type="button" disabled={current === pages - 1} onClick={() => goTo(current + 1)}>
              Next
            </button>
          </nav>
        ) : null}
      </div>
    </div>
  );
}
