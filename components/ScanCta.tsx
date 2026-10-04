"use client";

import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";

type BrandOption = { slug: string; name: string };
type Group = { name: string; brands: BrandOption[] };

const SCAN_MS = 3000;
const STEPS = ["Scanning the catalog", "Comparing reference prices", "Sorting by biggest savings"];

/**
 * Homepage "Scan" call to action: pick a brand, run a short scan animation,
 * then open that brand's page sorted by biggest savings.
 */
export function ScanCta({ groups }: { groups: Group[] }) {
  const router = useRouter();
  const [slug, setSlug] = useState("");
  const [error, setError] = useState(false);
  const [scanning, setScanning] = useState<BrandOption | null>(null);
  const [step, setStep] = useState(0);
  const selectRef = useRef<HTMLSelectElement>(null);
  const cancelRef = useRef<HTMLButtonElement>(null);
  const timers = useRef<number[]>([]);

  const clearTimers = () => {
    timers.current.forEach((t) => window.clearTimeout(t));
    timers.current = [];
  };

  useEffect(() => clearTimers, []);

  useEffect(() => {
    if (!scanning) return;
    cancelRef.current?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") cancel();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [scanning]);

  function cancel() {
    clearTimers();
    setScanning(null);
    setStep(0);
    selectRef.current?.focus();
  }

  function start(e: React.FormEvent) {
    e.preventDefault();
    const brand = groups.flatMap((g) => g.brands).find((b) => b.slug === slug);
    if (!brand) {
      setError(true);
      selectRef.current?.focus();
      return;
    }
    const href = `/brands/${brand.slug}?sort=savings#deals`;
    router.prefetch(`/brands/${brand.slug}`);
    setScanning(brand);
    setStep(0);
    timers.current = [
      window.setTimeout(() => setStep(1), SCAN_MS / 3),
      window.setTimeout(() => setStep(2), (SCAN_MS * 2) / 3),
      window.setTimeout(() => router.push(href), SCAN_MS),
    ];
  }

  return (
    <>
      <form className="scan-cta" onSubmit={start} noValidate>
        <label htmlFor="scan-brand" className="scan-label">
          Scan a brand for its biggest savings
        </label>
        <div className="scan-row">
          <select
            id="scan-brand"
            ref={selectRef}
            value={slug}
            aria-invalid={error || undefined}
            aria-describedby={error ? "scan-error" : undefined}
            onChange={(e) => {
              setSlug(e.target.value);
              setError(false);
            }}
          >
            <option value="">Choose a brand</option>
            {groups.map((g) => (
              <optgroup key={g.name} label={g.name}>
                {g.brands.map((b) => (
                  <option key={b.slug} value={b.slug}>
                    {b.name}
                  </option>
                ))}
              </optgroup>
            ))}
          </select>
          <button type="submit" className="btn btn-primary scan-btn">
            <RadarIcon />
            Scan
          </button>
        </div>
        {error ? (
          <p id="scan-error" className="scan-error" role="alert">
            Choose a brand to scan.
          </p>
        ) : null}
      </form>

      {scanning ? (
        <div className="scan-overlay" role="dialog" aria-modal="true" aria-labelledby="scan-title">
          <div className="scan-modal">
            <div className="scan-radar" aria-hidden="true">
              <span className="scan-ring" />
              <span className="scan-ring scan-ring-2" />
              <span className="scan-ring scan-ring-3" />
              <span className="scan-sweep" />
              <span className="scan-blip" />
              <span className="scan-blip scan-blip-2" />
              <span className="scan-blip scan-blip-3" />
            </div>
            <p id="scan-title" className="scan-title">
              Scanning <b>{scanning.name}</b>
            </p>
            <ol className="scan-steps" aria-live="polite">
              {STEPS.map((s, i) => (
                <li key={s} className={i < step ? "done" : i === step ? "active" : undefined}>
                  {s}
                </li>
              ))}
            </ol>
            <div className="scan-progress" aria-hidden="true">
              <span style={{ animationDuration: `${SCAN_MS}ms` }} />
            </div>
            <button ref={cancelRef} type="button" className="scan-cancel" onClick={cancel}>
              Cancel
            </button>
          </div>
        </div>
      ) : null}
    </>
  );
}

function RadarIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
      <circle cx="12" cy="12" r="9" />
      <circle cx="12" cy="12" r="4.5" />
      <path d="M12 12 19 5" />
    </svg>
  );
}
