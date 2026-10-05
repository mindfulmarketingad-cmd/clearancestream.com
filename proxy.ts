import { NextResponse, type NextRequest } from "next/server";
import { popularSearch } from "./lib/popular-searches";
import { searchSlug } from "./lib/slug";

/**
 * URL canonicalisation, applied before any page renders:
 *  (The host itself is canonicalised by Vercel's domain settings:
 *  clearancestream.com redirects to www.clearancestream.com.)
 *  - /Brands/Corsair -> /brands/corsair (single lowercase URL per page)
 *  - /search?q=RTX 5080 -> /search/rtx-5080 when that is a prebuilt popular
 *    search; any other query stays on /search?q=... and is answered client-side
 *  - /search/<anything else> -> /search?q=... (only popular searches are prebuilt)
 */
export function proxy(request: NextRequest) {
  const url = request.nextUrl;

  if (url.pathname === "/search" && url.searchParams.has("q")) {
    const slug = searchSlug(url.searchParams.get("q") ?? "");
    if (!slug || popularSearch(slug)) {
      const target = url.clone();
      target.pathname = slug ? `/search/${slug}` : "/search";
      target.search = "";
      // 303 so a form GET lands on the canonical results URL without being cached as permanent.
      return NextResponse.redirect(target, 303);
    }
    return NextResponse.next();
  }

  const searchMatch = url.pathname.match(/^\/search\/([^/]+)$/);
  if (searchMatch) {
    let decoded = searchMatch[1];
    try {
      decoded = decodeURIComponent(decoded);
    } catch {}
    const slug = searchSlug(decoded.replace(/[-+]/g, " "));
    const target = url.clone();
    if (slug && popularSearch(slug)) {
      if (slug !== searchMatch[1]) {
        target.pathname = `/search/${slug}`;
        return NextResponse.redirect(target, 301);
      }
    } else {
      target.pathname = "/search";
      target.search = slug ? `?q=${encodeURIComponent(slug.replace(/-/g, " "))}` : "";
      return NextResponse.redirect(target, 302);
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
