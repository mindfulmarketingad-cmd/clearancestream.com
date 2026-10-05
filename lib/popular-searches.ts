import { searchSlug } from "./slug";

/**
 * Curated queries that get indexable, prebuilt landing pages at /search/[slug].
 * Any other query is answered client-side on /search?q=... from the static
 * search index. Kept free of server-only imports so the proxy can use it.
 */
export const POPULAR_SEARCHES = [
  "RTX 5090 gaming PC",
  "RTX 5080 gaming PC",
  "RTX 5070 Ti gaming PC",
  "RTX 5070 gaming PC",
  "RTX 5060 gaming PC",
  "Radeon gaming PC",
  "Corsair Vengeance",
  "Alienware Aurora",
  "Alienware Area-51",
  "Gaming PC under 1000",
  "Gaming PC under 1500",
  "Gaming PC under 2000",
  "Gaming laptop",
  "Wireless gaming mouse",
  "Mechanical keyboard",
  "Wireless gaming headset",
  "SCUF controller",
  "Xbox controller",
  "DualSense controller",
  "Racing wheel",
  "Razer mouse",
  "Logitech G mouse",
].map((label) => ({ label, slug: searchSlug(label), path: `/search/${searchSlug(label)}` }));

export function popularSearch(slug: string) {
  return POPULAR_SEARCHES.find((s) => s.slug === slug);
}
