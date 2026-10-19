/** Discounts above this percentage are flagged as a HOT DEAL across the site. */
export const HOT_DEAL_PERCENT = 40;

export const isHotDeal = (percent: number | null | undefined) => (percent ?? 0) > HOT_DEAL_PERCENT;

function Flame() {
  return (
    <svg viewBox="0 0 24 24" width="12" height="12" fill="currentColor" aria-hidden="true">
      <path d="M12 2c.6 3.2-1.3 5-2.8 6.6C7.7 10.2 6 12 6 15a6 6 0 0 0 12 0c0-2.4-1-4.3-2.3-5.8.1 1.6-.5 2.9-1.7 3.5.4-2.8-.6-6.6-2-10.7Z" />
    </svg>
  );
}

/** "55% OFF" badge for product images; over 40% it becomes "HOT DEAL · 55% OFF". */
export function DiscountBadge({ percent }: { percent: number | null | undefined }) {
  if (!percent) return null;
  return isHotDeal(percent) ? (
    <span className="badge badge-discount badge-hot">
      <Flame /> HOT DEAL · {percent}% OFF
    </span>
  ) : (
    <span className="badge badge-discount">{percent}% OFF</span>
  );
}

/** Small inline "HOT DEAL" tag for tables and price rows. */
export function HotTag({ percent }: { percent: number | null | undefined }) {
  return isHotDeal(percent) ? (
    <span className="hot-tag">
      <Flame /> HOT DEAL
    </span>
  ) : null;
}
