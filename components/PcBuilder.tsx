"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import {
  PART_TYPES,
  checkBuild,
  estimatedWatts,
  isCompatible,
  recommendedPsu,
  type Build,
  type Check,
  type Part,
  type PartType,
  type PartTypeId,
} from "@/lib/pc-parts";
import { CheckIcon, ExternalIcon, SearchIcon } from "./Icons";
import { HotTag } from "./HotDeal";

type Catalog = { generatedAt: string | null; parts: Partial<Record<PartTypeId, Part[]>> };
type Selection = Partial<Record<PartTypeId, string>>;

const STORAGE_KEY = "cs-pc-build";
const PAGE = 40;

const money = (n: number) => n.toLocaleString("en-US", { style: "currency", currency: "USD" });

function readSaved(): Selection {
  try {
    const params = new URLSearchParams(window.location.search);
    const fromUrl: Selection = {};
    for (const t of PART_TYPES) {
      const v = params.get(t.id);
      if (v && /^[A-Z0-9]{10}$/i.test(v)) fromUrl[t.id] = v.toUpperCase();
    }
    if (Object.keys(fromUrl).length) return fromUrl;
    return JSON.parse(localStorage.getItem(STORAGE_KEY) ?? "{}") as Selection;
  } catch {
    return {};
  }
}

const SORTS = {
  // Catalog order is already most-reviewed first.
  popular: { label: "Most popular", fn: () => 0 },
  priceAsc: { label: "Price: low to high", fn: (a: Part, b: Part) => a.price - b.price },
  priceDesc: { label: "Price: high to low", fn: (a: Part, b: Part) => b.price - a.price },
  discount: { label: "Biggest discount", fn: (a: Part, b: Part) => (b.savingsPercent ?? 0) - (a.savingsPercent ?? 0) },
  rating: { label: "Highest rated", fn: (a: Part, b: Part) => (b.rating ?? 0) - (a.rating ?? 0) || (b.reviewCount ?? 0) - (a.reviewCount ?? 0) },
} as const;
type SortKey = keyof typeof SORTS;

const PRICE_CAPS = [50, 100, 150, 200, 300, 500, 750, 1000, 1500, 2000];

export function PcBuilder({ cartBase }: { cartBase: string }) {
  const [catalog, setCatalog] = useState<Catalog | null>(null);
  const [failed, setFailed] = useState(false);
  const [selection, setSelection] = useState<Selection>({});
  const [loaded, setLoaded] = useState(false);
  const [picking, setPicking] = useState<PartType | null>(null);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    setSelection(readSaved());
    setLoaded(true);
    fetch("/pc-builder/parts.json")
      .then((r) => (r.ok ? (r.json() as Promise<Catalog>) : Promise.reject()))
      .then(setCatalog)
      .catch(() => setFailed(true));
  }, []);

  // Persist the build locally and keep the address bar shareable.
  useEffect(() => {
    if (!loaded) return;
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(selection));
    } catch {}
    const params = new URLSearchParams();
    for (const t of PART_TYPES) if (selection[t.id]) params.set(t.id, selection[t.id]!);
    const qs = params.toString();
    window.history.replaceState(null, "", qs ? `?${qs}` : window.location.pathname);
  }, [selection, loaded]);

  const byAsin = useMemo(() => {
    const map = new Map<string, Part>();
    for (const list of Object.values(catalog?.parts ?? {})) for (const p of list ?? []) map.set(p.asin, p);
    return map;
  }, [catalog]);

  const build: Build = useMemo(() => {
    const b: Build = {};
    for (const t of PART_TYPES) {
      const p = selection[t.id] ? byAsin.get(selection[t.id]!) : undefined;
      if (p) b[t.id] = p;
    }
    return b;
  }, [selection, byAsin]);

  const checks = useMemo(() => checkBuild(build), [build]);
  const errors = checks.filter((c) => c.level === "error");
  const warnings = checks.filter((c) => c.level === "warning");
  const watts = estimatedWatts(build);
  const chosen = PART_TYPES.filter((t) => build[t.id]);
  const total = chosen.reduce((n, t) => n + build[t.id]!.price, 0);
  const missing = PART_TYPES.filter((t) => t.required && !build[t.id]);
  // Selections from an older catalog that are no longer available.
  const stale = catalog ? PART_TYPES.filter((t) => selection[t.id] && !build[t.id]) : [];

  const choose = (part: Part) => {
    setSelection((s) => ({ ...s, [part.type]: part.asin }));
    setPicking(null);
  };
  const remove = (type: PartTypeId) =>
    setSelection((s) => {
      const next = { ...s };
      delete next[type];
      return next;
    });

  const cartUrl = chosen.length
    ? `${cartBase}${chosen.map((t, i) => `&ASIN.${i + 1}=${build[t.id]!.asin}&Quantity.${i + 1}=1`).join("")}`
    : null;

  async function share() {
    try {
      await navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2000);
    } catch {}
  }

  const issuesFor = (type: PartTypeId) => checks.filter((c) => c.parts.includes(type) && c.level !== "note");

  return (
    <div className="pcb">
      <div className={`pcb-status ${errors.length ? "is-error" : warnings.length ? "is-warn" : "is-ok"}`}>
        <div>
          <b>Compatibility:</b>{" "}
          {chosen.length === 0
            ? "Add parts to check compatibility."
            : errors.length
              ? `${errors.length} ${errors.length === 1 ? "problem" : "problems"} found. See details below.`
              : warnings.length
                ? `No problems found, ${warnings.length} ${warnings.length === 1 ? "thing" : "things"} to double-check.`
                : "No issues found."}
        </div>
        <div className="pcb-watts">
          Estimated wattage: <b>{watts ? `${watts}W` : "—"}</b>
          {watts ? <span> · Recommended PSU: {recommendedPsu(watts)}W+</span> : null}
        </div>
      </div>

      {failed ? (
        <p className="pcb-empty">The parts catalog could not be loaded. Please refresh the page.</p>
      ) : catalog && Object.keys(catalog.parts).length === 0 ? (
        <p className="pcb-empty">Parts are being updated. Please check back shortly.</p>
      ) : null}

      <div className="table-scroll">
        <table className="pcb-table">
          <thead>
            <tr>
              <th scope="col">Component</th>
              <th scope="col">Selection</th>
              <th scope="col">Price</th>
              <th scope="col">
                <span className="sr-only">Actions</span>
              </th>
            </tr>
          </thead>
          <tbody>
            {PART_TYPES.map((t) => {
              const part = build[t.id];
              const issues = issuesFor(t.id);
              const count = catalog?.parts[t.id]?.length ?? 0;
              return (
                <tr key={t.id} className={issues.some((i) => i.level === "error") ? "has-error" : issues.length ? "has-warn" : undefined}>
                  <th scope="row">
                    {t.label}
                    {t.required ? null : <small>Optional</small>}
                  </th>
                  <td>
                    {part ? (
                      <div className="pcb-pick">
                        {part.image ? (
                          // eslint-disable-next-line @next/next/no-img-element
                          <img src={part.image.url} alt="" width={56} height={56} loading="lazy" referrerPolicy="no-referrer" />
                        ) : (
                          <span className="pcb-noimg" />
                        )}
                        <div>
                          <button type="button" className="pcb-name" onClick={() => setPicking(t)}>
                            {part.name}
                          </button>
                          {part.highlights.length ? <span className="pcb-specs">{part.highlights.join(" · ")}</span> : null}
                        </div>
                      </div>
                    ) : (
                      <button type="button" className="btn btn-primary btn-sm" onClick={() => setPicking(t)} disabled={!catalog || count === 0}>
                        + Choose {t.article ? `${t.article} ` : ""}
                        {t.label}
                      </button>
                    )}
                  </td>
                  <td className="pcb-price">
                    {part ? (
                      <>
                        <span className={part.savingsPercent ? "price-deal" : undefined}>{part.priceDisplay}</span>
                        {part.savingsPercent ? <span className="pill-off">{part.savingsPercent}% OFF</span> : null}
                        <HotTag percent={part.savingsPercent} />
                      </>
                    ) : null}
                  </td>
                  <td className="pcb-actions">
                    {part ? (
                      <>
                        <a href={part.buyUrl} className="btn btn-sm pcb-buy" target="_blank" rel="sponsored nofollow noopener">
                          Buy
                        </a>
                        <button type="button" className="pcb-remove" aria-label={`Remove ${t.label}`} onClick={() => remove(t.id)}>
                          &times;
                        </button>
                      </>
                    ) : null}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      <div className="pcb-footer">
        <div className="pcb-total">
          <span>
            {chosen.length} {chosen.length === 1 ? "part" : "parts"}
          </span>
          <span>
            Total: <b>{money(total)}</b>
          </span>
        </div>
        <div className="pcb-buttons">
          {cartUrl ? (
            <a href={cartUrl} className="btn btn-primary" target="_blank" rel="sponsored nofollow noopener">
              Buy all parts <ExternalIcon />
            </a>
          ) : null}
          <button type="button" className="btn btn-secondary" onClick={share} disabled={!chosen.length}>
            {copied ? "Link copied" : "Copy share link"}
          </button>
          <button type="button" className="btn btn-secondary" onClick={() => setSelection({})} disabled={!chosen.length}>
            Start new
          </button>
        </div>
      </div>

      {(checks.length > 0 || missing.length > 0 || stale.length > 0) && chosen.length > 0 ? (
        <div className="pcb-checks" id="compatibility">
          <h2>Compatibility details</h2>
          <ul>
            {checks.map((c) => (
              <CheckRow key={c.message} check={c} />
            ))}
            {stale.map((t) => (
              <li key={`stale-${t.id}`} className="is-warn">
                The saved {t.label.toLowerCase()} is no longer available. Choose a new one.
              </li>
            ))}
            {missing.length ? (
              <li className="is-note">Still needed for a complete build: {missing.map((t) => t.label).join(", ")}.</li>
            ) : null}
          </ul>
          <p className="pcb-fine">
            Checks use the specs stated in each product listing and estimated power draw. Always confirm compatibility on the
            product pages before buying.
          </p>
        </div>
      ) : null}

      {picking && catalog ? (
        <Picker type={picking} parts={catalog.parts[picking.id] ?? []} build={build} selected={selection[picking.id]} onChoose={choose} onClose={() => setPicking(null)} />
      ) : null}
    </div>
  );
}

function CheckRow({ check }: { check: Check }) {
  return <li className={check.level === "error" ? "is-error" : check.level === "warning" ? "is-warn" : "is-note"}>{check.message}</li>;
}

function Picker({
  type,
  parts,
  build,
  selected,
  onChoose,
  onClose,
}: {
  type: PartType;
  parts: Part[];
  build: Build;
  selected?: string;
  onChoose: (p: Part) => void;
  onClose: () => void;
}) {
  const [query, setQuery] = useState("");
  const [brand, setBrand] = useState("");
  const [cap, setCap] = useState(0);
  const [sort, setSort] = useState<SortKey>("popular");
  const [compatOnly, setCompatOnly] = useState(true);
  const [visible, setVisible] = useState(PAGE);
  const dialogRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    dialogRef.current?.querySelector<HTMLInputElement>("input[type=search]")?.focus();
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    const overflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = overflow;
    };
  }, [onClose]);

  const brands = useMemo(() => [...new Set(parts.map((p) => p.brand).filter((b): b is string => !!b))].sort(), [parts]);
  const maxPrice = Math.max(0, ...parts.map((p) => p.price));
  const caps = PRICE_CAPS.filter((c) => c < maxPrice);

  // Compatibility is judged against the rest of the build, without the part being replaced.
  const others = useMemo(() => {
    const b = { ...build };
    delete b[type.id];
    return b;
  }, [build, type.id]);

  const filtered = useMemo(() => {
    const terms = query.toLowerCase().split(/\s+/).filter(Boolean);
    return parts
      .filter((p) => terms.every((t) => `${p.name} ${p.brand ?? ""} ${p.highlights.join(" ")}`.toLowerCase().includes(t)))
      .filter((p) => !brand || p.brand === brand)
      .filter((p) => !cap || p.price < cap);
  }, [parts, query, brand, cap]);

  const compatible = useMemo(() => new Set(filtered.filter((p) => isCompatible(others, p)).map((p) => p.asin)), [filtered, others]);
  const results = useMemo(
    () => (compatOnly ? filtered.filter((p) => compatible.has(p.asin)) : filtered).slice().sort(SORTS[sort].fn),
    [filtered, compatible, compatOnly, sort],
  );
  const hidden = filtered.length - compatible.size;

  const reset = useCallback(() => setVisible(PAGE), []);

  return (
    <div className="pcb-overlay" onClick={(e) => e.target === e.currentTarget && onClose()}>
      <div ref={dialogRef} className="pcb-dialog" role="dialog" aria-modal="true" aria-labelledby="pcb-picker-title">
        <div className="pcb-dialog-head">
          <h2 id="pcb-picker-title">
            Choose {type.article ? `${type.article} ` : ""}
            {type.label}
          </h2>
          <button type="button" className="pcb-close" aria-label="Close" onClick={onClose}>
            &times;
          </button>
        </div>
        <div className="pcb-filters">
          <label className="pcb-search">
            <SearchIcon />
            <span className="sr-only">Search {type.label.toLowerCase()}</span>
            <input
              type="search"
              placeholder={`Search ${type.label.toLowerCase()}...`}
              value={query}
              maxLength={60}
              onChange={(e) => {
                setQuery(e.target.value);
                reset();
              }}
            />
          </label>
          {brands.length > 1 ? (
            <select aria-label="Brand" value={brand} onChange={(e) => (setBrand(e.target.value), reset())}>
              <option value="">All brands</option>
              {brands.map((b) => (
                <option key={b} value={b}>
                  {b}
                </option>
              ))}
            </select>
          ) : null}
          {caps.length ? (
            <select aria-label="Price" value={cap} onChange={(e) => (setCap(Number(e.target.value)), reset())}>
              <option value={0}>Any price</option>
              {caps.map((c) => (
                <option key={c} value={c}>
                  Under ${c.toLocaleString("en-US")}
                </option>
              ))}
            </select>
          ) : null}
          <select aria-label="Sort" value={sort} onChange={(e) => setSort(e.target.value as SortKey)}>
            {Object.entries(SORTS).map(([k, s]) => (
              <option key={k} value={k}>
                {s.label}
              </option>
            ))}
          </select>
          <label className="picks-check">
            <input type="checkbox" checked={compatOnly} onChange={(e) => (setCompatOnly(e.target.checked), reset())} /> Compatible only
          </label>
        </div>
        <p className="pcb-count" aria-live="polite">
          {results.length} {results.length === 1 ? "product" : "products"}
          {compatOnly && hidden > 0 ? (
            <>
              {" "}
              ·{" "}
              <button type="button" className="text-link" onClick={() => setCompatOnly(false)}>
                show {hidden} incompatible with your build
              </button>
            </>
          ) : null}
        </p>
        <ul className="pcb-results">
          {results.slice(0, visible).map((p) => {
            const ok = compatible.has(p.asin);
            return (
              <li key={p.asin} className={ok ? undefined : "is-incompatible"}>
                {p.image ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={p.image.url} alt="" width={64} height={64} loading="lazy" referrerPolicy="no-referrer" />
                ) : (
                  <span className="pcb-noimg" />
                )}
                <div className="pcb-result-info">
                  <b>{p.name}</b>
                  <span className="pcb-specs">
                    {[p.brand, ...p.highlights].filter(Boolean).join(" · ")}
                    {ok ? null : " · Not compatible with your build"}
                  </span>
                  {p.rating ? (
                    <span className="pcb-rating">
                      {"★".repeat(Math.round(p.rating))}
                      <span>
                        {" "}
                        {p.rating.toFixed(1)}
                        {p.reviewCount ? ` (${p.reviewCount.toLocaleString("en-US")})` : ""}
                      </span>
                    </span>
                  ) : null}
                </div>
                <div className="pcb-result-price">
                  <span className={p.savingsPercent ? "price-deal" : undefined}>{p.priceDisplay}</span>
                  {p.listPriceDisplay ? <s>{p.listPriceDisplay}</s> : null}
                </div>
                <button type="button" className="btn btn-primary btn-sm" onClick={() => onChoose(p)}>
                  {selected === p.asin ? (
                    <>
                      <CheckIcon /> Selected
                    </>
                  ) : (
                    "+ Add"
                  )}
                </button>
              </li>
            );
          })}
        </ul>
        {results.length === 0 ? <p className="pcb-empty">No products match these filters.</p> : null}
        {visible < results.length ? (
          <div style={{ textAlign: "center", margin: "16px 0" }}>
            <button type="button" className="btn btn-secondary btn-sm" onClick={() => setVisible((v) => v + PAGE)}>
              Show more
            </button>
          </div>
        ) : null}
      </div>
    </div>
  );
}
