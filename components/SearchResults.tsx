"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { rankDocs, type SearchDoc } from "@/lib/search-core";
import { DealGrid } from "./DealCard";

/**
 * Results for free-text searches (/search?q=...), computed in the browser from
 * the static /search-index.json so the page itself stays fully static.
 */
export function SearchResults() {
  const [query, setQuery] = useState<string | null>(null);
  const [results, setResults] = useState<ReturnType<typeof rankDocs> | null>(null);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    const q = new URLSearchParams(window.location.search).get("q")?.trim().slice(0, 80) ?? "";
    if (!q) return;
    setQuery(q);
    const input = document.getElementById("search-q") as HTMLInputElement | null;
    if (input) input.value = q;
    fetch("/search-index.json")
      .then((r) => (r.ok ? (r.json() as Promise<SearchDoc[]>) : Promise.reject()))
      .then((docs) => setResults(rankDocs(q, docs)))
      .catch(() => setFailed(true));
  }, []);

  if (!query) return null;

  return (
    <section className="section-tight" aria-live="polite">
      <div className="container">
        <h2 style={{ fontSize: 22, marginBottom: 8 }}>Results for &ldquo;{query}&rdquo;</h2>
        {failed ? (
          <p className="muted">Search is unavailable right now. Try one of the popular searches below.</p>
        ) : !results ? (
          <p className="muted">Searching...</p>
        ) : results.deals.length + results.other.length === 0 ? (
          <p className="muted">No matches yet. Try a GPU model, brand, or budget such as &ldquo;under 1500&rdquo;.</p>
        ) : (
          <>
            <p className="muted" style={{ marginBottom: 20 }}>
              {results.deals.length} matching {results.deals.length === 1 ? "deal" : "deals"}
              {results.other.length ? ` and ${results.other.length} related ${results.other.length === 1 ? "page" : "pages"}` : ""}.
            </p>
            {results.deals.length > 0 ? <DealGrid deals={results.deals.slice(0, 48)} priorityCount={4} /> : null}
            {results.other.length > 0 ? (
              <div className="mt-lg" style={{ maxWidth: 760 }}>
                <h3 style={{ fontSize: 20, marginBottom: 12 }}>Pages and guides</h3>
                <ul className="result-list">
                  {results.other.slice(0, 20).map((d) => (
                    <li key={d.path}>
                      <Link href={d.path}>
                        <small>{d.type === "guide" ? "Guide" : d.type === "brand" ? "Brand" : "Page"}</small>
                        <b>{d.title}</b>
                        <span>{d.description}</span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ) : null}
          </>
        )}
      </div>
    </section>
  );
}
