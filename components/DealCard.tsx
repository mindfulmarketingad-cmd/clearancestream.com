import Link from "next/link";
import type { Deal } from "@/lib/deals";
import { formatChecked } from "@/lib/format";
import { ArrowRight, ClockIcon, ShieldIcon } from "./Icons";

type Props = { deal: Deal; priority?: boolean; hidden?: boolean };

export function DealCard({ deal, priority = false, hidden = false }: Props) {
  return (
    <article className="deal-card" hidden={hidden}>
      <Link href={deal.path} className="deal-media" tabIndex={-1} aria-hidden="true">
        {deal.image ? (
          // Amazon's image terms require serving images from Amazon's own URLs.
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={deal.image.url}
            alt=""
            width={deal.image.width}
            height={deal.image.height}
            loading={priority ? "eager" : "lazy"}
            decoding="async"
            referrerPolicy="no-referrer"
          />
        ) : null}
        {deal.savingsPercent ? <span className="badge badge-discount">{deal.savingsPercent}% OFF</span> : null}
        {deal.dealBadge ? <span className="badge badge-soft">{deal.dealBadge}</span> : null}
      </Link>
      <div className="deal-body">
        <span className="deal-brand">{deal.brandName}</span>
        <h3 className="deal-title">
          <Link href={deal.path}>{deal.name}</Link>
        </h3>
        <div className="deal-price">
          <span className="price">{deal.priceDisplay}</span>
          {deal.listPriceDisplay ? (
            <s className="price" aria-label={`Was ${deal.listPriceDisplay}`}>
              {deal.listPriceDisplay}
            </s>
          ) : null}
        </div>
        {deal.savingsDisplay ? (
          <span className="deal-save">
            Save {deal.savingsDisplay} ({deal.savingsPercent}%)
          </span>
        ) : null}
        <span className="deal-time">
          <ClockIcon />
          Checked <time dateTime={deal.fetchedAt}>{formatChecked(deal.fetchedAt)}</time>
        </span>
        <Link href={deal.path} className="btn btn-primary btn-block btn-sm deal-cta" aria-label={`View deal: ${deal.name}`}>
          View Deal <ArrowRight />
        </Link>
      </div>
      <div className="deal-foot">
        <ShieldIcon />
        Secure &amp; verified Amazon listing
      </div>
    </article>
  );
}

export function DealGrid({ deals, priorityCount = 0 }: { deals: Deal[]; priorityCount?: number }) {
  return (
    <div className="deal-grid">
      {deals.map((deal, i) => (
        <DealCard key={deal.asin} deal={deal} priority={i < priorityCount} />
      ))}
    </div>
  );
}
