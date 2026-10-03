import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { DealsUnavailable } from "@/components/DealsUnavailable";
import { Faq } from "@/components/Faq";
import { ArrowRight, CheckIcon, ClockIcon, ExternalIcon, TagIcon } from "@/components/Icons";
import { JsonLd } from "@/components/JsonLd";
import { getAllDeals, type Deal } from "@/lib/deals";
import { formatChecked, lowerName } from "@/lib/format";
import { LIST_SIZE, getListDef, liveLists, resolveList, type ResolvedList } from "@/lib/lists";
import { itemListLd, pageMetadata } from "@/lib/seo";

export const revalidate = 86400;
// Lists render on first request and then cache for a day, like product pages.
export const dynamicParams = true;

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return [];
}

const money = (n: number) => new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 }).format(n);

async function load(params: Props["params"]) {
  const def = getListDef((await params).slug);
  if (!def) notFound();
  const { deals, fetchedAt } = await getAllDeals();
  return { list: resolveList(def, deals), deals, fetchedAt };
}

function summary(list: ResolvedList) {
  const { items, def } = list;
  if (items.length === 0) return null;
  const prices = items.map((d) => d.price);
  const discounted = items.filter((d) => d.savingsPercent);
  const brands = [...new Set(items.map((d) => d.brandName))];
  return {
    min: Math.min(...prices),
    max: Math.max(...prices),
    discounted: discounted.length,
    topDiscount: Math.max(0, ...discounted.map((d) => d.savingsPercent ?? 0)),
    brands,
    plural: lowerName(def.category.plural),
  };
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { list } = await load(params);
  const s = summary(list);
  return pageMetadata({
    title: list.title,
    description: s
      ? `The ${list.items.length} best ${s.plural} ${list.def.qualifier}, ranked by current discount and customer ratings. Live prices from ${money(s.min)} to ${money(s.max)}${s.topDiscount ? `, with discounts up to ${s.topDiscount}%` : ""}. Updated daily.`
      : `The best ${lowerName(list.def.category.plural)} ${list.def.qualifier}, ranked by current discount and customer ratings. Updated daily.`,
    path: `/lists/${list.def.canonical ?? list.def.slug}`,
    // A "10 best" list is only indexed when it actually has 10 products, and a
    // list with a canonical twin defers to it.
    noindex: list.items.length < LIST_SIZE,
  });
}

function reasons(d: Deal, list: ResolvedList): string[] {
  const out: string[] = [];
  if (d.savingsPercent && d.savingsDisplay) out.push(`${d.savingsPercent}% below its ${d.listPriceLabel?.toLowerCase() ?? "reference price"} (save ${d.savingsDisplay})`);
  if (d.rating && d.reviewCount) out.push(`Rated ${d.rating.toFixed(1)} out of 5 from ${d.reviewCount.toLocaleString("en-US")} reviews`);
  if (list.def.kind === "price") out.push(`Priced ${list.def.qualifier.replace("wireless, ", "")} at ${d.priceDisplay}`);
  if (d.attrs.includes("wireless")) out.push("Wireless");
  const gpu = d.attrs.find((a) => a.startsWith("gpu:"));
  if (gpu) out.push(`${gpu.slice(4).toUpperCase().replace(/-/g, " ").replace(" TI", " Ti").replace(" SUPER", " Super")} graphics`);
  if (d.dealBadge) out.push(d.dealBadge);
  return out.slice(0, 4);
}

export default async function ListPage({ params }: Props) {
  const { list, deals, fetchedAt } = await load(params);
  const { def, items } = list;
  const s = summary(list);
  const related = liveLists(deals).filter((l) => l.def.category.slug === def.category.slug && l.def.slug !== def.slug && l.indexable).slice(0, 8);
  const path = `/lists/${def.slug}`;

  const faqs = s
    ? [
        {
          q: `How did you pick these ${s.plural}?`,
          a: `We start with every ${def.category.noun} we track ${def.qualifier}, keep only in-stock items, and rank them by their current discount and customer ratings. Prices are checked daily, so the list changes as prices move.`,
        },
        {
          q: `How much do ${s.plural} ${def.qualifier} cost right now?`,
          a: `The products on this list currently range from ${money(s.min)} to ${money(s.max)}.${s.discounted ? ` ${s.discounted} of them are discounted right now, by up to ${s.topDiscount}%.` : ""} Always confirm the final price at checkout.`,
        },
        {
          q: "How often is this list updated?",
          a: "Every day. Products move up or down as their prices and discounts change, and sold-out products are removed.",
        },
      ]
    : [];

  return (
    <>
      <div className="container" style={{ paddingTop: 20 }}>
        <Breadcrumbs
          items={[
            { name: "Lists", path: "/lists" },
            { name: def.category.plural, path: `/categories/${def.category.slug}` },
            { name: list.shortTitle, path },
          ]}
        />
        <header className="brand-hero">
          <span className="eyebrow">
            <span className="live-dot" aria-hidden="true" />
            {def.category.plural} &middot; Updated daily
          </span>
          <h1>{list.title}</h1>
          {s ? (
            <p className="lede">
              The {items.length} best {s.plural} {def.qualifier} right now, ranked by current discount and customer
              ratings. Prices run from {money(s.min)} to {money(s.max)}
              {s.topDiscount ? `, and ${s.discounted} are discounted by up to ${s.topDiscount}%` : ""}. Brands on this
              list include {s.brands.slice(0, 4).join(", ")}.
            </p>
          ) : null}
          <div className="page-meta">
            <span>
              <TagIcon /> {items.length} products
            </span>
            {fetchedAt ? (
              <span>
                <ClockIcon /> Prices checked <time dateTime={fetchedAt}>{formatChecked(fetchedAt)}</time>
              </span>
            ) : null}
          </div>
        </header>
      </div>

      <section className="section-tight">
        <div className="container" style={{ maxWidth: 960 }}>
          {items.length === 0 ? (
            <DealsUnavailable scope={def.category.noun} />
          ) : (
            <>
              <h2 style={{ fontSize: 20, marginBottom: 12 }}>The list at a glance</h2>
              <table className="spec-table list-glance">
                <caption className="sr-only">Ranked products</caption>
                <thead>
                  <tr>
                    <th scope="col">#</th>
                    <th scope="col">Product</th>
                    <th scope="col">Price</th>
                  </tr>
                </thead>
                <tbody>
                  {items.map((d, i) => (
                    <tr key={d.asin}>
                      <td>{i + 1}</td>
                      <td>
                        <a href={`#item-${i + 1}`}>{d.name}</a>
                      </td>
                      <td>
                        <span className={d.savingsPercent ? "price-deal" : undefined}>{d.priceDisplay}</span>
                        {d.savingsPercent ? <span className="pill-off">{d.savingsPercent}% OFF</span> : null}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>

              <ol className="list-items">
                {items.map((d, i) => (
                  <li key={d.asin} id={`item-${i + 1}`} className="list-item">
                    <div className="list-rank" aria-hidden="true">
                      {i + 1}
                    </div>
                    <Link href={d.path} className="list-media" tabIndex={-1} aria-hidden="true">
                      {d.image ? (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img src={d.image.url} alt="" width={d.image.width} height={d.image.height} loading={i < 2 ? "eager" : "lazy"} referrerPolicy="no-referrer" />
                      ) : null}
                      {d.savingsPercent ? <span className="badge badge-discount">{d.savingsPercent}% OFF</span> : null}
                    </Link>
                    <div className="list-body">
                      <span className="deal-brand">{d.brandName}</span>
                      <h2 className="list-title">
                        <span className="sr-only">{i + 1}. </span>
                        <Link href={d.path}>{d.name}</Link>
                      </h2>
                      <div className="deal-price">
                        <span className={d.savingsPercent ? "price price-deal" : "price"}>{d.priceDisplay}</span>
                        {d.listPriceDisplay ? <s className="price">{d.listPriceDisplay}</s> : null}
                      </div>
                      <h3 className="list-sub">Why it made the list</h3>
                      <ul className="feature-list">
                        {reasons(d, list).map((r) => (
                          <li key={r}>
                            <CheckIcon />
                            <span>{r}</span>
                          </li>
                        ))}
                        {d.features.slice(0, 2).map((f) => (
                          <li key={f}>
                            <CheckIcon />
                            <span>{f.length > 160 ? `${f.slice(0, 157)}...` : f}</span>
                          </li>
                        ))}
                      </ul>
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
                ))}
              </ol>
              <JsonLd data={itemListLd(list.title, items.map((d) => ({ name: d.name, path: d.path })))} />
            </>
          )}
        </div>
      </section>

      <section className="section-tight">
        <div className="container" style={{ maxWidth: 880 }}>
          <div className="prose">
            <h2 className="mt-0">How we pick</h2>
            <p>
              Every product on this list comes from the {lowerName(def.category.plural)} we track across the biggest
              gaming brands. We keep only in-stock items that match the list ({def.qualifier}), then rank them by their
              current discount against a real reference price and by customer ratings. We never invent prices or
              discounts, and a strikethrough price only appears when a genuine reference price exists. Prices are checked
              daily and can change, so confirm the final price at checkout.
            </p>
            <h2>What to look for</h2>
            <ul>
              {def.category.tips.map((t) => (
                <li key={t.slice(0, 30)}>{t}</li>
              ))}
            </ul>
            {faqs.length > 0 ? <h2>Frequently asked questions</h2> : null}
          </div>
          {faqs.length > 0 ? (
            <div style={{ marginTop: 16 }}>
              <Faq items={faqs} />
            </div>
          ) : null}

          {related.length > 0 ? (
            <>
              <h2 className="sub-head" style={{ marginBottom: 16 }}>
                More {lowerName(def.category.plural)} lists
              </h2>
              <ul className="chip-list">
                {related.map((l) => (
                  <li key={l.def.slug}>
                    <Link href={`/lists/${l.def.slug}`} className="chip">
                      {l.shortTitle}
                    </Link>
                  </li>
                ))}
              </ul>
            </>
          ) : null}
          <p className="mt-md muted" style={{ fontSize: 15 }}>
            Browse every{" "}
            <Link href={`/categories/${def.category.slug}`} className="text-link">
              {lowerName(def.category.hubTitle)} <ArrowRight />
            </Link>{" "}
            or <Link href="/lists" className="text-link">all lists</Link>.
          </p>
        </div>
      </section>
    </>
  );
}
