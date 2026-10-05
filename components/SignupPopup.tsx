"use client";

import { usePathname } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";
import { EmailSignup, SUBSCRIBED_KEY } from "./EmailSignup";

const DISMISSED_KEY = "cs-signup-dismissed";
const SNOOZE_MS = 14 * 24 * 60 * 60 * 1000;
const DELAY_MS = 25_000;
// Pages where an interruption would get in the way.
const SKIP = ["/contact", "/privacy", "/terms", "/disclaimer"];

function read(key: string) {
  try {
    return localStorage.getItem(key);
  } catch {
    return null;
  }
}

/**
 * Deal-alert sign-up. Opens once per visit after 25 seconds, halfway down the
 * page, or on exit intent (desktop). Dismissing snoozes it for 14 days and
 * subscribing hides it for good. On small screens it is a bottom sheet rather
 * than a full-screen overlay, so it never blocks the page content.
 */
export function SignupPopup() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const shown = useRef(false);
  const dialogRef = useRef<HTMLDivElement>(null);

  const eligible = useCallback(() => {
    // Coupon pages have their own sign-up gate.
    if (shown.current || SKIP.includes(pathname) || pathname.startsWith("/coupons")) return false;
    if (read(SUBSCRIBED_KEY)) return false;
    const dismissed = Number(read(DISMISSED_KEY) ?? 0);
    return !dismissed || Date.now() - dismissed > SNOOZE_MS;
  }, [pathname]);

  const show = useCallback(() => {
    if (!eligible()) return;
    shown.current = true;
    setOpen(true);
  }, [eligible]);

  useEffect(() => {
    if (!eligible()) return;
    const timer = window.setTimeout(show, DELAY_MS);
    const onScroll = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      if (max > 0 && window.scrollY / max > 0.5) show();
    };
    const onLeave = (e: MouseEvent) => {
      if (e.clientY <= 0 && window.innerWidth > 720) show();
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    document.addEventListener("mouseleave", onLeave);
    return () => {
      window.clearTimeout(timer);
      window.removeEventListener("scroll", onScroll);
      document.removeEventListener("mouseleave", onLeave);
    };
  }, [eligible, show]);

  const close = useCallback(() => {
    setOpen(false);
    try {
      localStorage.setItem(DISMISSED_KEY, String(Date.now()));
    } catch {}
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && close();
    document.addEventListener("keydown", onKey);
    dialogRef.current?.querySelector<HTMLInputElement>("input[type=email]")?.focus();
    return () => document.removeEventListener("keydown", onKey);
  }, [open, close]);

  if (!open) return null;

  return (
    <div className="signup-overlay" onClick={(e) => e.target === e.currentTarget && close()}>
      <div ref={dialogRef} className="signup-dialog" role="dialog" aria-modal="true" aria-labelledby="signup-title">
        <button type="button" className="signup-close" onClick={close} aria-label="Close">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
            <path d="M6 6l12 12M18 6 6 18" />
          </svg>
        </button>
        <span className="eyebrow">
          <span className="live-dot" aria-hidden="true" />
          Deal alerts
        </span>
        <h2 id="signup-title">Never miss a gaming deal</h2>
        <p>
          Get the biggest discounts on gaming PCs, laptops, mice, keyboards, headsets, and controllers in your inbox.
        </p>
        <EmailSignup id="popup" onSubscribed={() => window.setTimeout(() => setOpen(false), 2500)} />
      </div>
    </div>
  );
}
