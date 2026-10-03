import Link from "next/link";
import { RefreshIcon } from "./Icons";

/** Shown when the live price feed returns nothing. No placeholder listings are ever rendered. */
export function DealsUnavailable({ scope = "gaming PC", headingLevel = 2 }: { scope?: string; headingLevel?: 2 | 3 }) {
  const Heading = headingLevel === 2 ? "h2" : "h3";
  return (
    <div className="empty">
      <div className="icon-tile">
        <RefreshIcon />
      </div>
      <Heading>No live {scope} deals right now</Heading>
      <p>
        We only list live, verified prices, and none are available at the moment. Listings refresh every
        day, so check back soon.
      </p>
      <div className="hero-actions">
        <Link href="/blog/gaming-pc-deals-guide" className="btn btn-secondary btn-sm">
          Read the deal-hunting guide
        </Link>
        <Link href="/brands" className="btn btn-secondary btn-sm">
          Browse brands
        </Link>
      </div>
    </div>
  );
}
