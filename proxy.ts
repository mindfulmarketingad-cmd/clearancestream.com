import { NextResponse, type NextRequest } from "next/server";
import { searchSlug } from "./lib/slug";

/**
 * URL canonicalisation, applied before any page renders:
 *  (The host itself is canonicalised by Vercel's domain settings:
 *  clearancestream.com redirects to www.clearancestream.com.)
 *  - /Brands/Corsair -> /brands/corsair (single lowercase URL per page)
 *  - /search?q=RTX 5080 -> /search/rtx-5080 (search form submissions)
 */
export function proxy(request: NextRequest) {
  const url = request.nextUrl;

  if (url.pathname === "/search" && url.searchParams.has("q")) {
    const slug = searchSlug(url.searchParams.get("q") ?? "");
    const target = url.clone();
    target.pathname = slug ? `/search/${slug}` : "/search";
    target.search = "";
    // 303 so a form GET lands on the canonical results URL without being cached as permanent.
    return NextResponse.redirect(target, 303);
  }

  const searchMatch = url.pathname.match(/^\/search\/([^/]+)$/);
  if (searchMatch) {
    let decoded = searchMatch[1];
    try {
      decoded = decodeURIComponent(decoded);
    } catch {}
    const slug = searchSlug(decoded.replace(/[-+]/g, " "));
    if (slug && slug !== searchMatch[1]) {
      const target = url.clone();
      target.pathname = `/search/${slug}`;
      return NextResponse.redirect(target, 301);
    }
  }

  const lower = url.pathname.toLowerCase();
  if (lower !== url.pathname) {
    const target = url.clone();
    target.pathname = lower;
    return NextResponse.redirect(target, 301);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!_next/|favicon.ico|icon.svg|apple-icon.png|.*\\.(?:png|svg|jpg|webp|ico|xml|txt|webmanifest)$).*)"],
};
