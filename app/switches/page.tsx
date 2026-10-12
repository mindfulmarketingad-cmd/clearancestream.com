import Link from "next/link";
import { DealGrid } from "@/components/DealCard";
import { Faq } from "@/components/Faq";
import { ArrowRight } from "@/components/Icons";
import { JsonLd } from "@/components/JsonLd";
import { PageHeader } from "@/components/PageHeader";
import { SwitchCompare } from "@/components/SwitchCompare";
import { getAllDeals } from "@/lib/deals";
import { itemListLd, pageMetadata } from "@/lib/seo";
import { SWITCH_TYPES, keyboardsWithSwitch, switchTypesFor } from "@/lib/switches";

const GUIDE = "/blog/mechanical-keyboard-switches-explained";

export const metadata = pageMetadata({
  title: "Best Mechanical Keyboard by Switch Type",
  description:
    "Find the best mechanical keyboard for you by switch type: linear, tactile, clicky, optical, Hall effect, rapid trigger, low-profile, and membrane, with live deals on each.",
  path: "/switches",
});

const money = (n: number) => n.toLocaleString("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 });

export default async function SwitchesHub() {
  const { deals } = await getAllDeals();
  const byType = SWITCH_TYPES.map((s) => ({ s, keyboards: keyboardsWithSwitch(deals, s.slug) }));
  const counts = Object.fromEntries(byType.map(({ s, keyboards }) => [s.slug, keyboards.length]));
  const top = deals.filter((d) => d.inStock && switchTypesFor(d).length > 0).slice(0, 8);

  const faqs = [
    {
      q: "What is the best mechanical keyboard switch for gaming?",
      a: "Linear switches are the most popular for gaming because every press is smooth and consistent. Competitive FPS players increasingly choose Hall effect keyboards with rapid trigger for faster resets. If you also type a lot, tactile switches are a good all-rounder.",
    },
    {
      q: "Which switch type is the quietest?",
      a: "Membrane keyboards are usually the quietest, followed by linear switches on a well-dampened board. Clicky switches are the loudest and are easily picked up by microphones.",
    },
    {
      q: "Do Hall effect and rapid trigger mean the same thing?",
      a: "No. Hall effect describes magnetic switches that measure how far a key is pressed. Rapid trigger is a feature those analog keyboards often support, where a key resets as soon as you start to lift it.",
    },
  ];

  return (
    <>
      <PageHeader
        crumbs={[
          { name: "Categories", path: "/categories" },
          { name: "Gaming Keyboards", path: "/categories/keyboards" },
          { name: "Switches", path: "/switches" },
        ]}
        title="Best mechanical keyboards by switch type"
        lede="The switch decides how a keyboard feels, sounds, and performs. Pick the switch type that suits how you play, then compare live deals on keyboards that use it."
      />
      <section className="section-tight">
        <div className="container">
          <ul className="switch-grid">
            {byType.map(({ s, keyboards }) => {
              const prices = keyboards.map((d) => d.price);
              return (
                <li key={s.slug}>
                  <Link href={`/switches/${s.slug}`} className="switch-card">
                    <h3>{s.heading.replace(/^Best /, "")}</h3>
                    <p>{s.summary}</p>
                    <p>
                      <b>Best for:</b> {s.compare.bestFor}
                    </p>
                    <span className="switch-meta">
                      {keyboards.length > 0 ? `${keyboards.length} keyboards from ${money(Math.min(...prices))}` : "No keyboards listed right now"}{" "}
                      <ArrowRight />
                    </span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      </section>

      <section className="section-tight">
        <div className="container" style={{ maxWidth: 960 }}>
          <div className="prose">
            <h2 className="mt-0">Switch types compared</h2>
            <p>
              A quick way to narrow your choice: match the feel and sound to how and where you play. For the full picture,
              read our <Link href={GUIDE}>guide to mechanical keyboard switches</Link>.
            </p>
          </div>
          <SwitchCompare counts={counts} />
        </div>
      </section>

      {top.length > 0 ? (
        <section className="section-tight">
          <div className="container">
            <div className="section-head">
              <div>
                <h2>Top mechanical keyboard deals right now</h2>
                <p>The biggest real discounts on keyboards with a stated switch type.</p>
              </div>
              <Link href="/categories/keyboards" className="text-link">
                All keyboard deals <ArrowRight />
              </Link>
            </div>
            <DealGrid deals={top} />
          </div>
        </section>
      ) : null}

      <section className="section-tight">
        <div className="container" style={{ maxWidth: 880 }}>
          <div className="prose">
            <h2 className="mt-0">Frequently asked questions</h2>
          </div>
          <div style={{ marginTop: 16 }}>
            <Faq items={faqs} />
          </div>
        </div>
      </section>
      <JsonLd data={itemListLd("Keyboard switch types", SWITCH_TYPES.map((s) => ({ name: s.heading, path: `/switches/${s.slug}` })))} />
    </>
  );
}
