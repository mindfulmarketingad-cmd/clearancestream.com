"use server";

import { headers } from "next/headers";

export type SubscribeState = { status: "idle" | "ok" | "error"; message: string };

const EMAIL_RE = /^[^\s@<>()[\]\\,;:"]{1,64}@[a-z0-9.-]{1,253}\.[a-z]{2,24}$/i;

// Best-effort per-instance rate limit; pair with a platform firewall rule.
const WINDOW_MS = 60 * 60 * 1000;
const MAX_PER_WINDOW = 5;
const hits = new Map<string, number[]>();

function rateLimited(key: string) {
  const now = Date.now();
  const recent = (hits.get(key) ?? []).filter((t) => now - t < WINDOW_MS);
  recent.push(now);
  hits.set(key, recent);
  if (hits.size > 5000) hits.clear();
  return recent.length > MAX_PER_WINDOW;
}

export async function subscribe(_prev: SubscribeState, form: FormData): Promise<SubscribeState> {
  const email = String(form.get("email") ?? "").trim().toLowerCase().slice(0, 254);

  // Honeypot and time trap: bots fill hidden fields and submit instantly.
  if (String(form.get("website") ?? "")) return { status: "ok", message: "You're on the list." };
  const started = Number(form.get("t") ?? 0);
  if (!started || Date.now() - started < 1500) {
    return { status: "error", message: "Please try again in a moment." };
  }
  if (!EMAIL_RE.test(email)) return { status: "error", message: "Please enter a valid email address." };

  const h = await headers();
  const ip = h.get("x-forwarded-for")?.split(",")[0]?.trim() || h.get("x-real-ip") || "unknown";
  if (rateLimited(ip)) return { status: "error", message: "Too many attempts. Please try again later." };

  const apiKey = process.env.RESEND_API_KEY;
  const audience = process.env.RESEND_AUDIENCE_ID;
  if (!apiKey || !audience) {
    console.error("[subscribe] RESEND_API_KEY or RESEND_AUDIENCE_ID not configured");
    return { status: "error", message: "Sign-up is temporarily unavailable. Please try again later." };
  }

  const res = await fetch(`https://api.resend.com/audiences/${encodeURIComponent(audience)}/contacts`, {
    method: "POST",
    headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json" },
    body: JSON.stringify({ email, unsubscribed: false }),
    signal: AbortSignal.timeout(10_000),
  }).catch(() => null);

  // An existing contact is still a success from the visitor's point of view.
  if (!res || (!res.ok && res.status !== 409 && res.status !== 422)) {
    console.error("[subscribe] failed", res?.status);
    return { status: "error", message: "Something went wrong. Please try again." };
  }
  return { status: "ok", message: "You're on the list. Watch your inbox for the best gaming deals." };
}
