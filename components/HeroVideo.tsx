"use client";

import { useEffect, useRef } from "react";

/**
 * Background video is not the LCP element. Keep it out of the initial download
 * and start it after the page load so product images and text paint first.
 */
export function HeroVideo() {
  const ref = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = ref.current;
    if (!video) return;
    let idle = 0;
    const start = () => {
      if (video.getAttribute("src")) return;
      video.src = "/hero-bg.mp4";
      video.load();
      video.play().catch(() => undefined);
    };
    const schedule = () => {
      idle = window.requestIdleCallback(start, { timeout: 2000 });
    };
    if (document.readyState === "complete") schedule();
    else window.addEventListener("load", schedule, { once: true });
    return () => {
      window.removeEventListener("load", schedule);
      if (idle) window.cancelIdleCallback(idle);
    };
  }, []);

  return <video ref={ref} className="hero-bg" muted loop playsInline preload="none" aria-hidden="true" tabIndex={-1} />;
}
