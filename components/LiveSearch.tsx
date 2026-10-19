"use client";

import { useRouter } from "next/navigation";
import { useEffect, useId, useMemo, useRef, useState } from "react";
import { highlightParts, liveSearch, liveTerms, type LiveProduct } from "@/lib/live-search";
import { SearchIcon } from "./Icons";

const SHOW = 50;
let indexPromise: Promise<LiveProduct[]> | null = null;

/** The product index is fetched once per visit, the first time anyone focuses search. */
function loadIndex() {
  indexPromise ??= fetch("/search-products.json")
    .then((r) => (r.ok ? (r.json() as Promise<LiveProduct[]>) : Promise.reject(new Error(String(r.status)))))
    .catch((err) => {
      indexPromise = null;
      throw err;
    });
  return indexPromise;
}

/** Smaller product thumbnails: image URLs carry a size token like ._SL500_. */
const thumb = (url: string) => url.replace(/\._[A-Z]{2}\d+_\./, "._SL120_.");

function Highlight({ text, terms }: { text: string; terms: string[] }) {
  return (
    <>
      {highlightParts(text, terms).map((part, i) =>
        part.hit ? (
          <mark key={`${i}-${part.s}`} className="ls-hl">
            {part.s}
          </mark>
        ) : (
          <span key={i}>{part.s}</span>
        ),
      )}
    </>
  );
}

/**
 * Header search with instant product results. Typing shows every matching
 * product in a part-picker style list, with the typed characters highlighted.
 * Enter on a highlighted row opens it; otherwise the form goes to /search.
 */
export function LiveSearch({ id, placeholder = "Search deals, GPUs, models" }: { id: string; placeholder?: string }) {
  const router = useRouter();
  const listId = useId();
  const wrapRef = useRef<HTMLFormElement>(null);
  const [q, setQ] = useState("");
  const [open, setOpen] = useState(false);
  const [index, setIndex] = useState<LiveProduct[] | null>(null);
  const [failed, setFailed] = useState(false);
  const [active, setActive] = useState(-1);

  const terms = useMemo(() => liveTerms(q), [q]);
  const matches = useMemo(() => (index && q.trim() ? liveSearch(index, q) : []), [index, q]);
  const shown = matches.slice(0, SHOW);

  const warm = () => {
    if (index) return;
    loadIndex()
      .then((d) => setIndex(d))
      .catch(() => setFailed(true));
  };

  // Close when clicking outside.
  useEffect(() => {
    const onDown = (e: MouseEvent) => {
      if (wrapRef.current && !wrapRef.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", onDown);
    return () => document.removeEventListener("mousedown", onDown);
  }, []);

  // Keep the active row in view while arrowing through results.
  useEffect(() => {
    if (active < 0) return;
    document.getElementById(`${listId}-${active}`)?.scrollIntoView({ block: "nearest" });
  }, [active, listId]);

  const go = (path: string) => {
    setOpen(false);
    router.push(path);
  };

  const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Escape") {
      setOpen(false);
      return;
    }
    if (!open || shown.length === 0) return;
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setActive((a) => Math.min(shown.length - 1, a + 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActive((a) => Math.max(-1, a - 1));
    } else if (e.key === "Enter" && active >= 0) {
      e.preventDefault();
      go(shown[active].p);
    }
  };

  const showPanel = open && q.trim().length > 0;

  return (
    <form
      ref={wrapRef}
      className={`header-search live-search${showPanel ? " is-open" : ""}`}
      action="/search"
      method="get"
      role="search"
      onSubmit={() => setOpen(false)}
    >
      <label htmlFor={id} className="sr-only">
        Search products
      </label>
      <SearchIcon />
      <input
        id={id}
        name="q"
        type="search"
        placeholder={placeholder}
        maxLength={80}
        autoComplete="off"
        role="combobox"
        aria-expanded={showPanel}
        aria-controls={listId}
        aria-autocomplete="list"
        aria-activedescendant={active >= 0 ? `${listId}-${active}` : undefined}
        value={q}
        onFocus={() => {
          warm();
          setOpen(true);
        }}
        onChange={(e) => {
          warm();
          setQ(e.target.value);
          setOpen(true);
          setActive(-1);
        }}
        onKeyDown={onKeyDown}
      />

      {showPanel ? (
        <div className="ls-panel">
          <div className="ls-head" aria-live="polite">
            {failed ? (
              "Search is unavailable right now."
            ) : !index ? (
              "Searching..."
            ) : matches.length === 0 ? (
              <>No products match &ldquo;{q.trim()}&rdquo;</>
            ) : (
              <>
                <b>{matches.length.toLocaleString("en-US")}</b> {matches.length === 1 ? "product" : "products"} match &ldquo;{q.trim()}&rdquo;
              </>
            )}
          </div>
          {shown.length > 0 ? (
            <ul className="ls-list" id={listId} role="listbox" aria-label="Matching products">
              {shown.map((p, i) => (
                <li
                  key={p.p}
                  id={`${listId}-${i}`}
                  role="option"
                  aria-selected={i === active}
                  className={i === active ? "is-active" : undefined}
                  onMouseEnter={() => setActive(i)}
                  onMouseDown={(e) => {
                    // Navigate before the input loses focus and closes the panel.
                    e.preventDefault();
                    go(p.p);
                  }}
                >
                  {p.i ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img src={thumb(p.i)} alt="" width={44} height={44} loading="lazy" referrerPolicy="no-referrer" />
                  ) : (
                    <span className="ls-noimg" aria-hidden="true" />
                  )}
                  <span className="ls-name">
                    <span className="ls-title">
                      <Highlight text={p.t} terms={terms} />
                    </span>
                    <span className="ls-meta">
                      <Highlight text={p.b} terms={terms} /> · {p.c}
                    </span>
                  </span>
                  <span className="ls-stock">
                    <span className="pcb-dot" aria-hidden="true" /> In stock
                  </span>
                  <span className="ls-price">
                    <b className={p.o ? "price-deal" : undefined}>{p.d}</b>
                    {p.o ? (
                      <span className={p.o > 40 ? "ls-off is-hot" : "ls-off"}>{p.o > 40 ? `HOT ${p.o}% off` : `${p.o}% off`}</span>
                    ) : null}
                  </span>
                </li>
              ))}
            </ul>
          ) : null}
          {matches.length > 0 ? (
            <button type="submit" className="ls-all">
              {matches.length > SHOW ? `See all ${matches.length.toLocaleString("en-US")} results` : "See full results"} for &ldquo;{q.trim()}&rdquo;
            </button>
          ) : null}
        </div>
      ) : null}
    </form>
  );
}
