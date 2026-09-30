"use server";

import { headers } from "next/headers";

export type ContactState = { status: "idle" | "ok" | "error"; message: string };

const EMAIL_RE = /^[^\s@<>()[\]\\,;:"]{1,64}@[a-z0-9.-]{1,253}\.[a-z]{2,24}$/i;
const TOPICS = new Set(["general", "listing", "brand", "partnership", "privacy"]);

// Best-effort per-instance rate limit. Pair with a platform WAF rule for
// stronger protection (see SECURITY.md).
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

const clean = (v: FormDataEntryValue | null, max: number) =>
  typeof v === "string" ? v.replace(/[\u0000-\u0008\u000B\u000C\u000E-\u001F\u007F]/g, "").trim().slice(0, max) : "";

export async function sendContact(_prev: ContactState, form: FormData): Promise<ContactState> {
  // Honeypot: real visitors never see or fill this field.
  if (clean(form.get("company"), 200)) return { status: "ok", message: "Thanks, your message has been sent." };

  // Time trap: submissions faster than 3s after render are almost always bots.
  const started = Number(clean(form.get("t"), 20));
  if (!started || Date.now() - started < 3000) {
    return { status: "error", message: "Please take a moment to complete the form, then try again." };
  }

  const name = clean(form.get("name"), 100);
  const email = clean(form.get("email"), 254);
  const topic = clean(form.get("topic"), 20);
  const message = clean(form.get("message"), 5000);

  if (!name || !EMAIL_RE.test(email) || !TOPICS.has(topic) || message.length < 10) {
    return { status: "error", message: "Please enter your name, a valid email address, and a message of at least 10 characters." };
  }

  const h = await headers();
  const ip = h.get("x-forwarded-for")?.split(",")[0]?.trim() || h.get("x-real-ip") || "unknown";
  if (rateLimited(ip)) {
    return { status: "error", message: "Too many messages from your connection. Please try again later." };
  }

  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.CONTACT_TO_EMAIL;
  if (!apiKey || !to) {
    console.error("[contact] RESEND_API_KEY or CONTACT_TO_EMAIL not configured");
    return { status: "error", message: "Messaging is temporarily unavailable. Please try again later." };
  }

  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json" },
    body: JSON.stringify({
      from: process.env.CONTACT_FROM_EMAIL || "ClearanceStream <contact@clearancestream.com>",
      to: [to],
      reply_to: email,
      subject: `[ClearanceStream] ${topic}: ${name.replace(/[\r\n]+/g, " ")}`,
      // Plain text only, so user input can never be rendered as HTML in the inbox.
      text: `Name: ${name}\nEmail: ${email}\nTopic: ${topic}\n\n${message}`,
    }),
    signal: AbortSignal.timeout(10_000),
  }).catch(() => null);

  if (!res?.ok) {
    console.error("[contact] send failed", res?.status);
    return { status: "error", message: "Your message could not be sent. Please try again in a few minutes." };
  }
  return { status: "ok", message: "Thanks, your message has been sent. We usually reply within two business days." };
}
