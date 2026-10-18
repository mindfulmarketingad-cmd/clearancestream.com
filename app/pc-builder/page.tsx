import Link from "next/link";
import { ArrowRight } from "@/components/Icons";
import { Faq } from "@/components/Faq";
import { JsonLd } from "@/components/JsonLd";
import { PageHeader } from "@/components/PageHeader";
import { PcBuilder } from "@/components/PcBuilder";
import { cartFormBase } from "@/lib/amazon/creators-api";
import { formatChecked } from "@/lib/format";
import { readParts } from "@/lib/pc-parts-data";
import { PART_TYPES } from "@/lib/pc-parts";
import { absoluteUrl } from "@/lib/site";
import { BUILD_DEFS, money } from "@/lib/pc-builds";
import { loadBuilds } from "@/lib/pc-builds-data";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "PC Part Picker – Compare PC Components & Deals | ClearanceStream",
  absoluteTitle: true,
  description:
    "Build a gaming PC part by part: choose a CPU, cooler, motherboard, memory, storage, video card, case, power supply, operating system, and monitor, with compatibility checks, estimated wattage, and live prices.",
  path: "/pc-builder",
});

const FAQS = [
  {
    q: "How does the compatibility check work?",
    a: "Each part's specs are read from its product listing: CPU and motherboard sockets, motherboard chipset and memory type, memory generation, motherboard and case form factors, cooler socket support, and power supply wattage. The builder flags mismatches and anything it could not confirm, so you know what to double-check.",
  },
  {
    q: "How is the estimated wattage calculated?",
    a: "It adds an estimate of peak power for the CPU and video card to a baseline for the motherboard, memory, storage, and fans. The recommended power supply adds about 40% headroom, rounded up, which keeps the supply efficient and quiet and leaves room for upgrades.",
  },
  {
    q: "Can I save or share my build?",
    a: "Yes. Your build is saved in your browser automatically, and the address bar always holds a shareable link to it. Use Copy share link to send it to someone.",
  },
  {
    q: "Do I need a CPU cooler and a video card?",
    a: "Some CPUs include a cooler in the box, so a separate cooler is optional. A video card is optional only if your CPU has integrated graphics; the builder warns you when it does not.",
  },
  {
    q: "What parts do I need to build a gaming PC?",
    a: "A CPU, motherboard, memory, storage, power supply, and case. Most gaming builds also need a video card, and you may want a CPU cooler, an operating system, and a monitor. The builder marks which parts are optional.",
  },
  {
    q: "What size power supply do I need?",
    a: "Add up the estimated draw of your CPU and video card plus the rest of the system, then add about 40% headroom. The builder does this for you and shows a recommended power supply size as soon as you add a CPU or video card.",
  },
  {
    q: "Will my motherboard fit my case?",
    a: "Cases list the motherboard sizes they support. A full or mid tower ATX case fits ATX, Micro-ATX, and Mini-ITX boards; a Micro-ATX case fits Micro-ATX and Mini-ITX; a Mini-ITX case fits Mini-ITX only. The builder checks this when both listings state their size.",
  },
  {
    q: "Does my CPU come with a cooler?",
    a: "Some CPUs include a basic cooler in the box, usually mentioned in the listing title. High-end and unlocked CPUs usually do not, and a better cooler keeps any CPU quieter and cooler under load.",
  },
  {
    q: "Is it cheaper to build a PC or buy a prebuilt?",
    a: "It depends on current prices. Discounted prebuilts can cost the same as the parts alone, while building gives you full control over every part. Price your parts here, then compare them with prebuilt gaming PC deals.",
  },
  {
    q: "Do I need to buy Windows?",
    a: "Windows needs a license to activate. You can add one in the Operating System row, or use another operating system if your games support it.",
  },
  {
    q: "How is this different from PCPartPicker?",
    a: "PCPartPicker is a long-running, comprehensive part database with detailed specs, price history, and community builds across many retailers. The ClearanceStream PC Builder focuses on current deals and real discounts, with simple compatibility checks and one-click buying for the whole build.",
  },
  {
    q: "How often are prices updated?",
    a: "Prices are checked every week. They can change after that, so confirm the final price at checkout.",
  },
];

const RELATED: [string, string][] = [
  ["/categories/components", "PC component deals"],
  ["/categories/gaming-pcs", "Prebuilt gaming PC deals"],
  ["/categories/monitors", "Gaming monitor deals"],
  ["/categories/keyboards", "Gaming keyboard deals"],
  ["/categories/mice", "Gaming mouse deals"],
  ["/categories/headsets", "Gaming headset deals"],
  ["/brands/corsair", "Corsair discounts"],
  ["/brands/nzxt", "NZXT discounts"],
  ["/brands/cooler-master", "Cooler Master discounts"],
  ["/brands/msi", "MSI discounts"],
  ["/brands/asus-rog", "ASUS ROG discounts"],
  ["/lists/10-best-gaming-pcs-under-1500", "10 Best Gaming PCs Under $1500"],
  ["/lists/10-best-gaming-monitors-under-300", "10 Best Gaming Monitors Under $300"],
  ["/coupons", "Tech coupons"],
];

const GUIDES: [string, string][] = [
  ["/blog/what-graphics-card-do-i-need", "What graphics card do I need?"],
  ["/blog/how-much-ram-for-gaming", "How much RAM for gaming?"],
  ["/blog/how-much-should-i-spend-on-a-gaming-pc", "How much to spend on a gaming PC"],
  ["/blog/prebuilt-gaming-pc-buying-guide", "Prebuilt gaming PC buying guide"],
  ["/blog/gaming-laptop-vs-gaming-pc", "Gaming laptop vs gaming PC"],
  ["/blog/oled-vs-ips-gaming-monitor", "OLED vs IPS gaming monitors"],
];

export default function PcBuilderPage() {
  const snap = readParts();
  const counts = PART_TYPES.map((t) => snap?.parts[t.id]?.length ?? 0);
  const total = counts.reduce((a, b) => a + b, 0);
  const { builds } = loadBuilds();

  const appLd = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: "ClearanceStream PC Part Picker",
    url: absoluteUrl("/pc-builder"),
    applicationCategory: "UtilitiesApplication",
    operatingSystem: "Any",
    offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
    description: "Build a gaming PC with compatibility checks, estimated wattage, and live prices.",
  };

  return (
    <>
      <PageHeader
        crumbs={[{ name: "PC Builder", path: "/pc-builder" }]}
        title="PC Part Picker - ClearanceStream Deals and Promotions"
        lede={`Pick every part for your next gaming PC on one page. We check compatibility as you go, estimate power draw, and total the price${total ? ` across ${total.toLocaleString("en-US")} parts` : ""}${snap?.generatedAt ? `, with prices checked ${formatChecked(snap.generatedAt)}` : ""}.`}
      />
      <section className="section-tight">
        <div className="container">
          <PcBuilder cartBase={cartFormBase()} />
        </div>
      </section>

      {builds.length > 0 ? (
        <section className="section-tight">
          <div className="container">
            <div className="section-head">
              <div>
                <h2>Start from a complete build</h2>
                <p>Compatibility-checked part lists from current deals. Open one to buy it or customize it here.</p>
              </div>
              <Link href="/pc-builds" className="text-link">
                All PC builds <ArrowRight />
              </Link>
            </div>
            <ul className="pcb-start">
              {builds.map((g) => (
                <li key={g.def.slug}>
                  <Link href={`/pc-builds/${g.def.slug}`}>
                    <b>{g.def.name}</b>
                    <span>{money(g.total)}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </section>
      ) : null}

      <section className="section-tight">
        <div className="container" style={{ maxWidth: 880 }}>
          <div className="prose">
            <h2 className="mt-0">How to use the PC builder</h2>
            <ol>
              <li>
                <b>Start with the CPU and motherboard.</b> They decide the socket and memory type everything else must match.
              </li>
              <li>
                <b>Add memory and storage.</b> The builder only shows memory that matches your motherboard when{" "}
                <i>Compatible only</i> is on.
              </li>
              <li>
                <b>Choose a video card,</b> then a power supply. The estimated wattage and recommended power supply update as
                you go.
              </li>
              <li>
                <b>Pick a case</b> that fits your motherboard size, then add a cooler, operating system, and monitor if you
                need them.
              </li>
              <li>
                <b>Buy each part</b> from its row, or use <i>Buy all parts</i> to add the whole build to one cart.
              </li>
            </ol>
            <h2>What the compatibility check covers</h2>
            <ul>
              <li>CPU and motherboard socket (AM5, AM4, LGA1851, LGA1700, LGA1200)</li>
              <li>Motherboard memory type and memory generation (DDR5 or DDR4)</li>
              <li>Motherboard size and case support (E-ATX, ATX, Micro-ATX, Mini-ITX)</li>
              <li>CPU cooler socket support, when the cooler listing states it</li>
              <li>Power supply wattage against the estimated draw, with recommended headroom</li>
              <li>CPUs without integrated graphics that need a video card</li>
            </ul>
            <p>
              Want a second opinion on a finished build? <a href="https://pcpartpicker.com/" target="_blank" rel="noopener noreferrer">PCPartPicker</a>{" "}
              has the largest database of part specs and community builds, and is a useful cross-check before you buy.
            </p>
            <p>
              Not sure where to start? Read our guides to <Link href="/blog/what-graphics-card-do-i-need">choosing a graphics card</Link>{" "}
              and <Link href="/blog/how-much-ram-for-gaming">how much RAM you need</Link>, or compare{" "}
              <Link href="/categories/gaming-pcs">prebuilt gaming PC deals</Link> with the cost of building your own.
            </p>
            <h2>Frequently asked questions</h2>
          </div>
          <div style={{ marginTop: 16 }}>
            <Faq items={FAQS} />
          </div>

          <nav aria-label="Related pages" className="link-directory">
            <h2 className="sub-head" style={{ marginBottom: 16 }}>
              Shop parts and gear
            </h2>
            <ul className="chip-list">
              {RELATED.map(([href, label]) => (
                <li key={href}>
                  <Link href={href} className="chip">
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
            <h2 className="sub-head" style={{ marginBottom: 16 }}>
              Complete PC builds
            </h2>
            <ul className="chip-list">
              <li>
                <Link href="/pc-builds" className="chip">
                  All PC builds
                </Link>
              </li>
              {BUILD_DEFS.map((d) => (
                <li key={d.slug}>
                  <Link href={`/pc-builds/${d.slug}`} className="chip">
                    {d.name}
                  </Link>
                </li>
              ))}
            </ul>
            <h2 className="sub-head" style={{ marginBottom: 16 }}>
              Buying guides for builders
            </h2>
            <ul className="chip-list">
              {GUIDES.map(([href, label]) => (
                <li key={href}>
                  <Link href={href} className="chip">
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </section>
      <JsonLd data={appLd} />
    </>
  );
}
