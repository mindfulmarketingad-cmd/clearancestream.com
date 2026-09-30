import Link from "next/link";
import { SearchBox } from "@/components/SearchBox";

export const metadata = { title: "Page not found", robots: { index: false, follow: true } };

export default function NotFound() {
  return (
    <section className="section">
      <div className="container" style={{ maxWidth: 720 }}>
        <p className="eyebrow">404</p>
        <h1 style={{ fontSize: 40, marginTop: 16 }}>This page is not available</h1>
        <p className="muted" style={{ marginTop: 12, fontSize: 17 }}>
          The page may have moved, or the deal may have ended. Deals come and go as Amazon prices change, so try a
          search or browse the current list.
        </p>
        <SearchBox />
        <div className="hero-actions">
          <Link href="/deals" className="btn btn-primary">All gaming PC deals</Link>
          <Link href="/" className="btn btn-secondary">Back to home</Link>
        </div>
      </div>
    </section>
  );
}
