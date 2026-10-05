export const SITE = {
  name: "ClearanceStream",
  domain: "ClearanceStream.com",
  url: "https://www.clearancestream.com",
  tagline: "Gaming PC Hidden Deals & Clearances",
  description:
    "ClearanceStream helps gaming PC enthusiasts track hidden discounts, price drops, and promos on gaming PCs, laptops, mice, keyboards, headsets, and controllers from the biggest brands in gaming.",
  locale: "en_US",
  // Refresh cadence for product data, in seconds: once a week (owner's choice).
  // Every price is shown with the time it was checked.
  revalidate: 604800,
  social: {
    instagram: "https://www.instagram.com/clearancestream",
    twitter: "https://x.com/clearancestream",
    facebook: "https://www.facebook.com/clearancestream",
  },
} as const;

export const MAIN_NAV = [
  { href: "/", label: "Home" },
  { href: "/blog", label: "Blog" },
  { href: "/deals", label: "All Deals" },
  { href: "/brands", label: "Brands" },
  { href: "/categories", label: "Categories" },
  { href: "/lists", label: "Lists" },
  { href: "/coupons", label: "Coupons" },
  { href: "/about", label: "About" },
  { href: "/search", label: "Search" },
] as const;

export const FOOTER_NAV = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
  { href: "/disclaimer", label: "Disclaimer" },
  { href: "/privacy", label: "Privacy" },
  { href: "/terms", label: "Terms" },
  { href: "/sitemap", label: "Sitemap" },
] as const;

export const AFFILIATE_DISCLOSURE =
  "As an Amazon Associate, ClearanceStream earns from qualifying purchases. This does not change the price you pay.";

export function absoluteUrl(path = "/") {
  return path === "/" ? `${SITE.url}/` : `${SITE.url}${path}`;
}
