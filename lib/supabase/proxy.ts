import { createServerClient } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";
import { supabaseEnv } from "./env";

export type SessionClaims = { sub?: string; email?: string } | null;

/**
 * Refresh the Supabase session when a member is signed in, and report verified
 * claims. Anonymous public traffic skips the Auth call so those pages stay cached.
 */
export async function refreshSession(request: NextRequest) {
  const env = supabaseEnv();
  let response = NextResponse.next({ request });
  if (!env) return { response, claims: null as SessionClaims };

  const supabase = createServerClient(env.url, env.key, {
    cookies: {
      getAll() {
        return request.cookies.getAll();
      },
      setAll(cookiesToSet, headers) {
        cookiesToSet.forEach(({ name, value }) => request.cookies.set(name, value));
        response = NextResponse.next({ request });
        cookiesToSet.forEach(({ name, value, options }) => response.cookies.set(name, value, options));
        for (const [key, value] of Object.entries(headers)) response.headers.set(key, value);
      },
    },
  });

  try {
    const { data } = await supabase.auth.getClaims();
    return { response, claims: (data?.claims as SessionClaims) ?? null };
  } catch {
    return { response, claims: null };
  }
}

/** Copy refreshed auth cookies and cache headers onto a redirect or rewrite. */
export function carrySession(from: NextResponse, to: NextResponse) {
  from.cookies.getAll().forEach((cookie) => {
    to.cookies.set(cookie);
  });
  for (const header of ["cache-control", "expires", "pragma"]) {
    const value = from.headers.get(header);
    if (value) to.headers.set(header, value);
  }
  return to;
}
