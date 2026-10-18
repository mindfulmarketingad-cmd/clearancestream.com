import Link from "next/link";
import type { Deal } from "@/lib/deals";
import type { Insight } from "@/lib/list-insights";
import { ArrowRight, CheckIcon, ExternalIcon } from "./Icons";

/** Fields a ranked pick needs; small enough to send to the browser for filtering. */
export type PickDeal = Pick<
  Deal,
  | "asin"
  | "name"
  | "path"
  | "buyUrl"
  | "image"
  | "brandName"
  | "categorySlug"
  | "attrs"
  | "price"
  | "priceDisplay"
  | "listPriceDisplay"
  | "savingsPercent"
  | "savings"
  | "rating"
  | "reviewCount"
>;

export const toPickDeal = (d: Deal): PickDeal => ({
  asin: d.asin,
  name: d.name,
  path: d.path,
  buyUrl: d.buyUrl,
  image: d.image,
  brandName: d.brandName,
  categorySlug: d.categorySlug,
  attrs: d.attrs,
  price: d.price,
  priceDisplay: d.priceDisplay,
  listPriceDisplay: d.listPriceDisplay,
  savingsPercent: d.savingsPercent,
  savings: d.savings,
  rating: d.rating,
  reviewCount: d.reviewCount,
});

/** Comparison table for a ranked set of picks. */
export function PickCompare({ items }: { items: { deal: PickDeal; info: Insight }[] }) {
  const rated = items.some(({ deal }) => deal.rating);
  return (
    <div className="table-scroll">
      <table className="spec-table list-glance list-compare">
        <caption className="sr-only">Ranked products compared</caption>
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Product</th>
            <th scope="col">Price</th>
            {rated ? <th scope="col">Rating</th> : null}
            <th scope="col">Key specs</th>
            <th scope="col">Best for</th>
          </tr>
        </thead>
        <tbody>
          {items.map(({ deal: d, info }, i) => (
            <tr key={d.asin}>
              <td>{i + 1}</td>
              <td>
                <a href={`#item-${i + 1}`}>{d.name}</a>
              </td>
              <td>
                <span className={d.savingsPercent ? "price-deal" : undefined}>{d.priceDisplay}</span>
                {d.savingsPercent ? <span className="pill-off">{d.savingsPercent}% OFF</span> : null}
              </td>
              {rated ? <td>{d.rating ? `${d.rating.toFixed(1)} / 5` : "Not rated"}</td> : null}
              <td className="cmp-specs">
                {info.specs
                  .slice(0, 2)
                  .map(([k, v]) => (v === "Yes" ? k : v))
                  .join(", ") || "See listing"}
              </td>
              <td>{info.bestFor}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

/** One ranked pick with its buyer's-guide detail (used by list and brand pages). */
export function PickItem({ deal: d, info, rank, eager = false }: { deal: PickDeal; info: Insight; rank: number; eager?: boolean }) {
  return (
    <li id={`item-${rank}`} className="list-item">
      <div className="list-rank" aria-hidden="true">
        {rank}
      </div>
      <Link href={d.path} className="list-media" tabIndex={-1} aria-hidden="true">
        {d.image ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={d.image.url} alt="" width={d.image.width} height={d.image.height} loading={eager ? "eager" : "lazy"} referrerPolicy="no-referrer" />
        ) : null}
        {d.savingsPercent ? <span className="badge badge-discount">{d.savingsPercent}% OFF</span> : null}
      </Link>
      <div className="list-body">
        <span className="deal-brand">{d.brandName}</span>
        <h2 className="list-title">
          <span className="sr-only">{rank}. </span>
          <Link href={d.path}>{d.name}</Link>
        </h2>
        <div className="deal-price">
          <span className={d.savingsPercent ? "price price-deal" : "price"}>{d.priceDisplay}</span>
          {d.listPriceDisplay ? <s className="price">{d.listPriceDisplay}</s> : null}
        </div>
        <p className="list-bestfor">
          <b>Best for:</b> {info.bestFor}
        </p>
        {info.specs.length > 0 ? (
          <>
            <h3 className="list-sub">Key specs</h3>
            <dl className="list-specs">
              {info.specs.map(([k, v]) => (
                <div key={k}>
                  <dt>{k}</dt>
                  <dd>{v}</dd>
                </div>
              ))}
            </dl>
          </>
        ) : null}
        {info.features.length > 0 ? (
          <>
            <h3 className="list-sub">Standout features</h3>
            <ul className="list-plain">
              {info.features.map((f) => (
                <li key={f}>{f}</li>
              ))}
            </ul>
          </>
        ) : null}
        <h3 className="list-sub">Price point</h3>
        <p className="list-price-point">{info.pricePoint}</p>
        <div className="list-proscons">
          {info.pros.length > 0 ? (
            <div>
              <h3 className="list-sub">Reasons to buy</h3>
              <ul className="feature-list">
                {info.pros.map((r) => (
                  <li key={r}>
                    <CheckIcon />
                    <span>{r}</span>
                  </li>
                ))}
              </ul>
            </div>
          ) : null}
          {info.cons.length > 0 ? (
            <div>
              <h3 className="list-sub">Reasons to avoid</h3>
              <ul className="feature-list list-cons">
                {info.cons.map((r) => (
                  <li key={r}>
                    <span className="con-mark" aria-hidden="true">
                      &times;
                    </span>
                    <span>{r}</span>
                  </li>
                ))}
              </ul>
            </div>
          ) : null}
        </div>
        <div className="list-actions">
          <Link href={d.path} className="btn btn-primary btn-sm">
            View Deal <ArrowRight />
          </Link>
          <a href={d.buyUrl} className="btn btn-secondary btn-sm" target="_blank" rel="sponsored nofollow noopener">
            Check price <ExternalIcon />
          </a>
        </div>
      </div>
    </li>
  );
}
