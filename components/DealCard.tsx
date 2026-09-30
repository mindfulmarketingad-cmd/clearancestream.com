import Link from "next/link";
import type { Deal } from "@/lib/deals";
import { formatChecked } from "@/lib/format";
import { ClockIcon, ShieldIcon } from "./Icons";

export function DealCard({ deal, priority = false, headingLevel = 3 }: { deal: Deal; priority?: boolean; headingLevel?: 2 | 3 }) {
  const Heading = headingLevel === 2 ? "h2" : "h3";
  return (
    <article className="deal-card">
      <div className="deal-media">
        {deal.image ? (
          // Amazon's image terms require serving images from Amazon's own URLs.
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={deal.image.url}
            alt={deal.name}
            width={deal.image.width}
            height={deal.image.height}
            loading={priority ? "eager" : "lazy"}
            decoding="async"
            referrerPolicy="no-referrer"
          />
        ) : null}
        {deal.savingsPercent ? <span className="badge badge-discount">{deal.savingsPercent}% off</span> : null}
        {deal.dealBadge ? <span className="badge badge-soft">{deal.dealBadge}</span> : null}
      </div>
      <div className="deal-body">
        <span className="deal-brand">{deal.brandName}</span>
        <Heading className="deal-title">
          <Link href={deal.path}>{deal.name}</Link>
        </Heading>
        <div className="deal-price">
          <span className="price">{deal.priceDisplay}</span>
          {deal.listPriceDisplay ? <s className="price">{deal.listPriceDisplay}</s> : null}
        </div>
        {deal.savingsDisplay ? <span className="deal-save">Save {deal.savingsDisplay}</span> : null}
        <div className="deal-meta">
          <span>
            <ClockIcon />
            <time dateTime={deal.fetchedAt}>{formatChecked(deal.fetchedAt)}</time>
          </span>
          <span>
            <ShieldIcon />
            Amazon
          </span>
        </div>
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
