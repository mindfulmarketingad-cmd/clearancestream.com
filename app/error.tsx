"use client";

import Link from "next/link";

export default function Error({ reset }: { error: Error; reset: () => void }) {
  return (
    <section className="section">
      <div className="container" style={{ maxWidth: 720 }}>
        <h1 style={{ fontSize: 36 }}>Something went wrong</h1>
        <p className="muted" style={{ marginTop: 12 }}>
          We could not load this page. Please try again in a moment.
        </p>
        <div className="hero-actions">
          <button type="button" className="btn btn-primary" onClick={reset}>Try again</button>
          <Link href="/" className="btn btn-secondary">Back to home</Link>
        </div>
      </div>
    </section>
  );
}
