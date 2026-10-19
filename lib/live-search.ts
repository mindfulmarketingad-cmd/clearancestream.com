/** Compact product record served at /search-products.json for instant search. */
export type LiveProduct = {
  /** Display name */ t: string;
  /** Path */ p: string;
  /** Image URL */ i: string | null;
  /** Brand */ b: string;
  /** Category */ c: string;
  /** Price */ v: number;
  /** Price display */ d: string;
  /** Discount percent */ o: number | null;
  /** Reference price display */ l: string | null;
};

const norm = (s: string) => s.toLowerCase();

/** Lowercased query terms, keeping partial words so results update on every keystroke. */
export function liveTerms(query: string) {
  return norm(query)
    .replace(/[^a-z0-9.+ -]+/g, " ")
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 6);
}

/**
 * Products whose name, brand, or category contains every term, best matches
 * first: matches at the start of a word, then matches in the name, then the
 * biggest discount.
 */
export function liveSearch(products: LiveProduct[], query: string) {
  const terms = liveTerms(query);
  if (terms.length === 0) return [];
  const scored: { p: LiveProduct; score: number }[] = [];
  for (const p of products) {
    const name = norm(p.t);
    const hay = `${name} ${norm(p.b)} ${norm(p.c)}`;
    if (!terms.every((t) => hay.includes(t))) continue;
    let score = 0;
    for (const t of terms) {
      const i = name.indexOf(t);
      if (i >= 0) score += i === 0 || !/[a-z0-9]/.test(name[i - 1]) ? 3 : 1;
    }
    scored.push({ p, score: score * 1000 + (p.o ?? 0) });
  }
  return scored.sort((a, b) => b.score - a.score).map((s) => s.p);
}

/** Split text into plain and matched parts for highlighting. */
export function highlightParts(text: string, terms: string[]): { s: string; hit: boolean }[] {
  if (terms.length === 0) return [{ s: text, hit: false }];
  const lower = norm(text);
  const marks = new Array<boolean>(text.length).fill(false);
  for (const t of terms) {
    let from = 0;
    for (;;) {
      const i = lower.indexOf(t, from);
      if (i < 0) break;
      for (let k = i; k < i + t.length; k++) marks[k] = true;
      from = i + t.length;
    }
  }
  const out: { s: string; hit: boolean }[] = [];
  for (let k = 0; k < text.length; k++) {
    const last = out[out.length - 1];
    if (last && last.hit === marks[k]) last.s += text[k];
    else out.push({ s: text[k], hit: marks[k] });
  }
  return out;
}
