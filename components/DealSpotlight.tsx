import Link from "next/link";
import type { Deal } from "@/lib/deals";
import { formatChecked } from "@/lib/format";
import { ArrowRight, CheckIcon, ClockIcon, ExternalIcon } from "./Icons";

/** Large feature card used for the homepage Deal of the Day and Deal of the Week. */
export function DealSpotlight({ deal, label, note }: { deal: Deal; label: string; note: string }) {
  return (
    <article className="spotlight">
      <div className="spotlight-head">
        <span className="spotlight-label">{label}</span>
        <span className="spotlight-note">{note}</span>
      </div>
      <div className="spotlight-body">
        <Link href={deal.path} className="spotlight-media" tabIndex={-1} aria-hidden="true">
          {deal.image ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={deal.image.url} alt="" width={deal.image.width} height={deal.image.height} loading="lazy" referrerPolicy="no-referrer" />
          ) : null}
          {deal.savingsPercent ? <span className="badge badge-discount">{deal.savingsPercent}% OFF</span> : null}
        </Link>
        <div className="spotlight-info">
          <span className="deal-brand">{deal.brandName}</span>
          <h3 className="spotlight-title">
            <Link href={deal.path}>{deal.name}</Link>
          </h3>
          <div className="deal-price">
            <span className="price price-deal">{deal.priceDisplay}</span>
            {deal.listPriceDisplay ? <s className="price">{deal.listPriceDisplay}</s> : null}
          </div>
          {deal.savingsDisplay ? (
            <span className="deal-save">
              Save {deal.savingsDisplay} ({deal.savingsPercent}%)
            </span>
          ) : null}
          {deal.rating && deal.reviewCount ? (
            <p className="spotlight-rating">
              Rated {deal.rating.toFixed(1)} out of 5 from {deal.reviewCount.toLocaleString("en-US")} reviews
            </p>
          ) : null}
          {deal.features.length > 0 ? (
            <ul className="feature-list spotlight-features">
              {deal.features.slice(0, 2).map((f) => (
                <li key={f}>
                  <CheckIcon />
                  <span>{f.length > 110 ? `${f.slice(0, 107)}...` : f}</span>
                </li>
              ))}
            </ul>
          ) : null}
          <div className="spotlight-actions">
            <Link href={deal.path} className="btn btn-primary btn-sm">
              View Deal <ArrowRight />
            </Link>
            <a href={deal.buyUrl} className="btn btn-secondary btn-sm" target="_blank" rel="sponsored nofollow noopener">
              Check price <ExternalIcon />
            </a>
          </div>
          <span className="deal-time">
            <ClockIcon />
            Price checked <time dateTime={deal.fetchedAt}>{formatChecked(deal.fetchedAt)}</time>
          </span>
        </div>
      </div>
    </article>
  );
}
