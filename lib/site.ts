export const SITE = {
  name: "ClearanceStream",
  domain: "ClearanceStream.com",
  url: "https://clearancestream.com",
  tagline: "Gaming PC Hidden Deals & Clearances",
  description:
    "ClearanceStream helps gaming PC enthusiasts track hidden deals, price drops, and clearances on prebuilt gaming PCs from Corsair, Alienware, and more.",
  locale: "en_US",
  // Refresh cadence for live Amazon data, in seconds.
  revalidate: 3600,
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
