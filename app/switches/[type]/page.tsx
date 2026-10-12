import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { DealBrowser } from "@/components/DealBrowser";
import { DealsUnavailable } from "@/components/DealsUnavailable";
import { Faq } from "@/components/Faq";
import { ArrowRight, CheckIcon, ClockIcon, TagIcon } from "@/components/Icons";
import { JsonLd } from "@/components/JsonLd";
import { SwitchCompare } from "@/components/SwitchCompare";
import { SwitchLinks } from "@/components/SwitchLinks";
import { getAllDeals } from "@/lib/deals";
import { formatChecked } from "@/lib/format";
import { liveLists } from "@/lib/lists";
import { itemListLd, pageMetadata } from "@/lib/seo";
import { SWITCH_TYPES, getSwitchType, keyboardsWithSwitch } from "@/lib/switches";

export const dynamicParams = false;

const SHOWN = 48;
const GUIDE = "/blog/mechanical-keyboard-switches-explained";

type Props = { params: Promise<{ type: string }> };

export function generateStaticParams() {
  return SWITCH_TYPES.map((s) => ({ type: s.slug }));
}

const money = (n: number) => n.toLocaleString("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 });

async function load(params: Props["params"]) {
  const type = getSwitchType((await params).type);
  if (!type) notFound();
  const { deals: all, fetchedAt } = await getAllDeals();
  const keyboards = keyboardsWithSwitch(all, type.slug);
  const counts = Object.fromEntries(SWITCH_TYPES.map((s) => [s.slug, keyboardsWithSwitch(all, s.slug).length]));
  return { type, all, keyboards, counts, fetchedAt };
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { type, keyboards } = await load(params);
  const discounted = keyboards.filter((d) => d.savingsPercent).length;
  return pageMetadata({
    title: `${type.heading}: Deals and Buying Guide`,
    description: `${type.summary} ${keyboards.length ? `Compare ${keyboards.length} keyboards with ${type.slug === "hall-effect" ? type.short : type.short.toLowerCase()} switches${discounted ? `, ${discounted} discounted right now` : ""}, ` : "See "}who they suit, and their pros and cons for gaming.`,
    path: `/switches/${type.slug}`,
    // A switch page with no keyboards to show stays out of the index until it has some.
    noindex: keyboards.length === 0,
  });
}

export default async function SwitchTypePage({ params }: Props) {
  const { type, all, keyboards, counts, fetchedAt } = await load(params);
  // "Hall effect" is a proper noun; other types read naturally in lower case.
  const lower = type.slug === "hall-effect" ? type.short : type.short.toLowerCase();
  const prices = keyboards.map((d) => d.price);
  const discounted = keyboards.filter((d) => d.savingsPercent).length;
  const brands = [...new Set(keyboards.map((d) => d.brandName))];
  const keyboardLists = liveLists(all).filter((l) => l.def.category.slug === "keyboards" && l.indexable).slice(0, 10);

  const faqs = [
    {
      q: `Are ${lower} switches good for gaming?`,
      a: `${type.summary} They suit ${type.bestFor[0].replace(/\.$/, "").replace(/^\w/, (c) => c.toLowerCase())}. The trade-offs: ${type.cons
        .slice(0, 2)
        .map((c) => c.charAt(0).toLowerCase() + c.slice(1))
        .join("; ")}.`,
    },
    {
      q: `How many keyboards with ${lower} switches do you track?`,
      a: keyboards.length
        ? `${keyboards.length} right now from ${brands.length} ${brands.length === 1 ? "brand" : "brands"}${discounted ? `, with ${discounted} currently discounted` : ""}. We only list a keyboard here when its own listing states ${lower} switches, and the count changes weekly as prices and stock change.`
        : `None right now. We only list a keyboard here when its own listing states ${lower} switches; new ones appear after our weekly price check.`,
    },
    {
      q: "Are the discounts on these keyboards real?",
      a: "Yes. A discount and strikethrough price only appear when the retailer reports a genuine reference price. Keyboards at their regular price are shown without one.",
    },
  ];

  return (
    <>
      <div className="container" style={{ paddingTop: 20 }}>
        <Breadcrumbs
          items={[
            { name: "Categories", path: "/categories" },
            { name: "Gaming Keyboards", path: "/categories/keyboards" },
            { name: "Switches", path: "/switches" },
            { name: type.short, path: `/switches/${type.slug}` },
          ]}
        />
        <header className="brand-hero">
          <span className="eyebrow">
            <span className="live-dot" aria-hidden="true" />
            Keyboard switches &middot; Updated weekly
          </span>
          <h1>
            {type.heading.replace(/ Keyboards$/, "")} <span>Keyboards</span>
          </h1>
          <p className="lede">
            {type.summary}
            {prices.length > 0
              ? ` We track ${keyboards.length} keyboards with ${lower} switches from ${brands.slice(0, 4).join(", ")}${brands.length > 4 ? " and more" : ""}, priced from ${money(Math.min(...prices))} to ${money(Math.max(...prices))}.`
              : ""}
          </p>
          <div className="page-meta">
            <span>
              <TagIcon /> {keyboards.length} keyboards, {discounted} discounted
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
        <div className="container" style={{ maxWidth: 880 }}>
          <div className="prose">
            <h2 className="mt-0" id="feel">
              What {lower} switches feel and sound like
            </h2>
            {type.feel.map((p) => (
              <p key={p.slice(0, 32)}>{p}</p>
            ))}
            <h2 id="best-for">Who {lower} switches are best for</h2>
            <ul>
              {type.bestFor.map((b) => (
                <li key={b}>{b}</li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className="section-tight" id="deals">
        <div className="container">
          <h2 style={{ fontSize: 24, marginBottom: 16 }}>Best keyboards with {lower} switches right now</h2>
          {keyboards.length > 0 ? (
            <>
              <DealBrowser deals={keyboards.slice(0, SHOWN)} label={`${lower} switch keyboard`} showCategoryFilter={false} />
              {keyboards.length > SHOWN ? (
                <p className="muted mt-md" style={{ fontSize: 14 }}>
                  Showing the top {SHOWN} of {keyboards.length}, best real discounts first.
                </p>
              ) : null}
              <JsonLd data={itemListLd(type.heading, keyboards.slice(0, SHOWN).map((d) => ({ name: d.name, path: d.path })))} />
            </>
          ) : (
            <DealsUnavailable scope={`${lower} switch keyboard`} />
          )}
        </div>
      </section>

      <section className="section-tight">
        <div className="container" style={{ maxWidth: 880 }}>
          <div className="prose">
            <h2 className="mt-0" id="pros-cons">
              Pros and cons of {lower} switches for gaming
            </h2>
          </div>
          <div className="proscons mt-md">
            <div>
              <h3 className="list-sub">Pros</h3>
              <ul className="feature-list">
                {type.pros.map((p) => (
                  <li key={p}>
                    <CheckIcon />
                    <span>{p}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="list-sub">Cons</h3>
              <ul className="feature-list list-cons">
                {type.cons.map((c) => (
                  <li key={c}>
                    <span className="con-mark" aria-hidden="true">
                      &times;
                    </span>
                    <span>{c}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="prose mt-lg">
            <h2 id="compare">Compare {lower} switches with other switch types</h2>
            <p>
              Switch type is the biggest choice in a mechanical keyboard. Here is how {lower} switches compare with the other
              types we track, with the number of keyboards currently listed for each.
            </p>
          </div>
          <SwitchCompare counts={counts} current={type.slug} />

          <div className="prose mt-lg">
            <h2 id="guide">Related guide: mechanical keyboard switches explained</h2>
            <p>
              For a deeper look at linear, tactile, and clicky switches, hot-swap sockets, and optical and magnetic designs,
              read our <Link href={GUIDE}>guide to mechanical keyboard switches</Link>. To shop by budget instead, see our{" "}
              <Link href="/categories/keyboards">gaming keyboard deals</Link>.
            </p>
          </div>

          {keyboardLists.length > 0 ? (
            <>
              <h2 className="sub-head" style={{ marginBottom: 16 }}>
                Top 10 gaming keyboard lists
              </h2>
              <ul className="chip-list">
                {keyboardLists.map((l) => (
                  <li key={l.def.slug}>
                    <Link href={`/lists/${l.def.slug}`} className="chip">
                      {l.shortTitle}
                    </Link>
                  </li>
                ))}
              </ul>
            </>
          ) : null}

          <div className="prose mt-lg">
            <h2>Frequently asked questions</h2>
          </div>
          <div style={{ marginTop: 16 }}>
            <Faq items={faqs} />
          </div>

          <SwitchLinks title="Other keyboard switch types" current={type.slug} />
          <p className="mt-md muted" style={{ fontSize: 15 }}>
            <Link href="/switches" className="text-link">
              All keyboard switch types <ArrowRight />
            </Link>
          </p>
        </div>
      </section>
    </>
  );
}
