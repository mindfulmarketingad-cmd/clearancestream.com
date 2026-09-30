export function slugify(input: string, maxLength = 80): string {
  const slug = input
    .normalize("NFKD")
    .replace(/[̀-ͯ]/g, "")
    .toLowerCase()
    .replace(/&/g, " and ")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
  if (slug.length <= maxLength) return slug;
  return slug.slice(0, maxLength).replace(/-[^-]*$/, "");
}

const ASIN_RE = /^[A-Z0-9]{10}$/;

export function isAsin(value: string): boolean {
  return ASIN_RE.test(value);
}

/** Product slugs end in the lowercase ASIN so they stay resolvable if Amazon edits a title. */
export function productSlug(title: string, asin: string): string {
  return `${slugify(shortTitle(title), 70)}-${asin.toLowerCase()}`;
}

export function asinFromSlug(slug: string): string | null {
  const candidate = slug.slice(-10).toUpperCase();
  return isAsin(candidate) && (slug.length === 10 || slug[slug.length - 11] === "-") ? candidate : null;
}

/** Amazon titles are keyword-stuffed; keep the part before the first spec separator. */
export function shortTitle(title: string): string {
  const cut = title.split(/\s[-|,]\s|,\s(?=[A-Z0-9])/)[0] ?? title;
  const trimmed = cut.length >= 20 ? cut : title;
  return trimmed.length > 110 ? `${trimmed.slice(0, 107).replace(/\s+\S*$/, "")}...` : trimmed;
}

/** Normalise a free-text search query into its canonical URL segment. */
export function searchSlug(query: string): string {
  return slugify(query.slice(0, 80), 60);
}
