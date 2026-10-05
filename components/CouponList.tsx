"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { EmailSignup, SUBSCRIBED_KEY } from "./EmailSignup";
import { CheckIcon, ClockIcon, ExternalIcon } from "./Icons";

export type Coupon = {
  asin: string;
  name: string;
  path: string;
  buyUrl: string;
  percent: number;
  priceDisplay: string;
  listPriceDisplay: string | null;
  savingsDisplay: string | null;
  category: string;
  checked: string;
  checkedLabel: string;
};

function isSubscribed() {
  try {
    return localStorage.getItem(SUBSCRIBED_KEY) === "1";
  } catch {
    return false;
  }
}

/**
 * Coupon-style deal cards. "Show Deal" asks for a free sign-up the first time;
 * after that every card reveals its deal link immediately. The discount is
 * already applied on the retailer's page, so there is no code to copy.
 */
export function CouponList({ coupons, brandName, logo }: { coupons: Coupon[]; brandName: string; logo: React.ReactNode }) {
  const [subscribed, setSubscribed] = useState(false);
  const [revealed, setRevealed] = useState<Set<string>>(new Set());
  const [pending, setPending] = useState<string | null>(null);
  const dialogRef = useRef<HTMLDivElement>(null);

  useEffect(() => setSubscribed(isSubscribed()), []);

  const reveal = useCallback((asin: string) => setRevealed((r) => new Set(r).add(asin)), []);

  function show(asin: string) {
    if (subscribed || isSubscribed()) {
      setSubscribed(true);
      reveal(asin);
    } else {
      setPending(asin);
    }
  }

  const onSubscribed = useCallback(() => {
    setSubscribed(true);
    setPending((asin) => {
      if (asin) reveal(asin);
      return asin;
    });
  }, [reveal]);

  useEffect(() => {
    if (!pending) return;
    dialogRef.current?.querySelector<HTMLInputElement>("input[type=email]")?.focus();
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setPending(null);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [pending]);

  const pendingCoupon = coupons.find((c) => c.asin === pending);

  return (
    <>
      <ol className="coupon-list">
        {coupons.map((c, i) => {
          const open = revealed.has(c.asin);
          return (
            <li key={c.asin} className={`coupon${i === 0 ? " coupon-top" : ""}`}>
              {i === 0 ? <span className="coupon-flag">Top pick</span> : null}
              <div className="coupon-main">
                {logo}
                <div className="coupon-info">
                  <p className="coupon-off">{c.percent}% off</p>
                  <div className="coupon-tags">
                    <span className="coupon-tag coupon-tag-dark">DEAL</span>
                    <span className="coupon-tag coupon-tag-ok">
                      <CheckIcon /> Price verified
                    </span>
                    <span className="coupon-tag">No code needed</span>
                  </div>
                </div>
                <button type="button" className="btn coupon-btn" onClick={() => show(c.asin)} aria-expanded={open}>
                  {open ? "Deal unlocked" : "Show Deal"}
                </button>
              </div>
              <p className="coupon-desc">
                {c.percent}% off the {brandName} {c.name.replace(new RegExp(`^${brandName}\\s+`, "i"), "")}
              </p>
              <div className="coupon-meta">
                <span>
                  <ClockIcon /> Price checked <time dateTime={c.checked}>{c.checkedLabel}</time>
                </span>
                <span>
                  Now <b className="price-deal">{c.priceDisplay}</b>
                  {c.listPriceDisplay ? (
                    <>
                      {" "}
                      <s>{c.listPriceDisplay}</s>
                    </>
                  ) : null}
                </span>
                {c.savingsDisplay ? <span>You save {c.savingsDisplay}</span> : null}
                <span>{c.category}</span>
              </div>
              {open ? (
                <div className="coupon-reveal" role="status">
                  <p>
                    <b>Your deal link is unlocked.</b> The {c.percent}% discount is already applied on the retailer&apos;s
                    page, so there is no code to enter. Prices can change, so confirm the total at checkout.
                  </p>
                  <a href={c.buyUrl} className="btn btn-primary btn-sm" target="_blank" rel="sponsored nofollow noopener">
                    Open deal <ExternalIcon />
                  </a>
                </div>
              ) : null}
            </li>
          );
        })}
      </ol>

      {pendingCoupon ? (
        <div className="coupon-overlay" onClick={(e) => e.target === e.currentTarget && setPending(null)}>
          <div ref={dialogRef} className="coupon-dialog" role="dialog" aria-modal="true" aria-labelledby="coupon-gate-title">
            <button type="button" className="coupon-close" aria-label="Close" onClick={() => setPending(null)}>
              &times;
            </button>
            <h2 id="coupon-gate-title">Unlock this deal</h2>
            <p>
              Sign up free to unlock <b>{pendingCoupon.percent}% off</b> and every other deal on ClearanceStream. We will
              also send you the best new discounts.
            </p>
            <EmailSignup id="coupon-gate" onSubscribed={onSubscribed} />
            {subscribed ? (
              <button type="button" className="btn btn-primary btn-block mt-md" onClick={() => setPending(null)}>
                Show my deal
              </button>
            ) : null}
          </div>
        </div>
      ) : null}
    </>
  );
}
