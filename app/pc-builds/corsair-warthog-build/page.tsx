import Link from "next/link";
import { Faq } from "@/components/Faq";
import { CheckIcon, ClockIcon, ExternalIcon } from "@/components/Icons";
import { HotTag } from "@/components/HotDeal";
import { JsonLd } from "@/components/JsonLd";
import { PageHeader } from "@/components/PageHeader";
import { cartFormBase, productLink, searchLink } from "@/lib/amazon/creators-api";
import { formatChecked } from "@/lib/format";
import { money } from "@/lib/pc-builds";
import { loadBuilds } from "@/lib/pc-builds-data";
import { recommendedPsu } from "@/lib/pc-parts";
import { CORSAIR_WARTHOG_BUILD as BUILD, type ShowcasePart } from "@/lib/showcase-builds";
import { readShowcasePrices } from "@/lib/showcase-prices";
import { itemListLd, pageMetadata } from "@/lib/seo";
import { absoluteUrl } from "@/lib/site";

export const metadata = pageMetadata({
  title: BUILD.title,
  absoluteTitle: true,
  description: BUILD.description,
  path: `/pc-builds/${BUILD.slug}`,
  image: { url: BUILD.photos[1].jpg, width: BUILD.photos[1].width, height: BUILD.photos[1].height, alt: BUILD.photos[1].alt },
});

const FAQS = [
  {
    q: "Does an RTX 5080 Founders Edition fit in the Corsair Warthog?",
    a: "Yes, with plenty of room. The RTX 5080 Founders Edition is a two-slot card about 304mm long, and Corsair lists GPU clearance of around 400mm or more in the Warthog depending on the front fan setup.",
  },
  {
    q: "Can you use an SFX power supply in an ATX case like the Warthog?",
    a: "Yes. The Corsair SF1000 includes an SFX-to-ATX bracket, so it mounts in a standard ATX power supply bay. It also leaves extra room for cable management at the bottom of the case.",
  },
  {
    q: "Is 1000W enough for a Ryzen 9 9950X3D and RTX 5080?",
    a: `Yes. The processor is rated at 170W and the RTX 5080 at 360W, so the whole system peaks at roughly ${BUILD.watts}W. A 1000W unit leaves generous headroom and keeps the fan quiet under load.`,
  },
  {
    q: "Is a 360mm AIO enough for the Ryzen 9 9950X3D?",
    a: "Yes. The TRYX HOLO 360 is rated for 280W of heat, well above the 9950X3D's 170W rating. Swapping in Noctua NF-A12x25 G2 fans keeps it quiet at the same cooling performance.",
  },
  {
    q: "Why use three separate NVMe drives?",
    a: "Splitting storage across drives keeps the operating system, game library, and projects separate, and each WD_BLACK SN850X runs at full PCIe Gen4 speed in its own M.2 slot. A fourth small drive holds a separate Linux install for dual booting.",
  },
];

function partLink(p: ShowcasePart, priced?: { url: string }) {
  if (priced) return priced.url;
  if (p.asin) return productLink(p.asin);
  if (p.url) return p.url;
  return searchLink(p.search ?? p.name);
}

export default function WarthogBuildPage() {
  const { prices, generatedAt } = readShowcasePrices();
  const installed = BUILD.parts.filter((p) => !p.planned);
  const planned = BUILD.parts.filter((p) => p.planned);
  const pricedTotal = installed.reduce((n, p) => n + (p.asin && prices.get(p.asin) ? prices.get(p.asin)!.price * p.qty : 0), 0);
  const unpriced = installed.filter((p) => !(p.asin && prices.get(p.asin)));
  const cartParts = installed.filter((p) => p.asin && prices.get(p.asin));
  const cart = `${cartFormBase()}${cartParts.map((p, i) => `&ASIN.${i + 1}=${p.asin}&Quantity.${i + 1}=${p.qty}`).join("")}`;
  const checked = generatedAt;
  const { builds } = loadBuilds();

  const row = (p: ShowcasePart, key: string) => {
    const priced = p.asin ? prices.get(p.asin) : undefined;
    const href = partLink(p, priced);
    const external = !priced && p.url ? "View" : "Buy";
    return (
      <tr key={key}>
        <th scope="row" className="pcbd-type">
          {p.type}
        </th>
        <td className="pcbd-selcell">
          <div className="pcbd-sel">
            {priced?.image ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={priced.image.url} alt="" width={52} height={52} loading="lazy" referrerPolicy="no-referrer" />
            ) : (
              <span className="pcbd-noimg" aria-hidden="true" />
            )}
            <div>
              <a href={href} target="_blank" rel={p.url ? "noopener" : "sponsored nofollow noopener"} className="pcbd-name">
                {p.name}
              </a>
              <ul>
                {p.specs.map((s) => (
                  <li key={s}>{s}</li>
                ))}
              </ul>
            </div>
          </div>
        </td>
        <td data-label="Qty">{p.qty}</td>
        <td data-label="Promo">
          {priced?.savingsPercent ? (
            <>
              <span className="pcbd-promo">{priced.savingsPercent}% off</span>
              <HotTag percent={priced.savingsPercent} />
            </>
          ) : (
            <span className="ct-none">—</span>
          )}
        </td>
        <td data-label="Availability">{priced ? (priced.inStock ? "In stock" : "Check listing") : p.url ? "At maker" : "Search"}</td>
        <td className="num pcbd-price">
          {priced ? (
            <>
              {money(priced.price * p.qty)}
              {p.qty > 1 ? <span className="pcbd-each">{priced.priceDisplay} each</span> : null}
            </>
          ) : (
            <span className="ct-none">—</span>
          )}
        </td>
        <td className="pcbd-buy">
          <a href={href} className="btn btn-primary btn-sm" target="_blank" rel={p.url ? "noopener" : "sponsored nofollow noopener"}>
            {external} <ExternalIcon />
          </a>
        </td>
      </tr>
    );
  };

  return (
    <>
      <PageHeader
        crumbs={[
          { name: "PC Builds", path: "/pc-builds" },
          { name: BUILD.name, path: `/pc-builds/${BUILD.slug}` },
        ]}
        title={BUILD.title}
      />

      <section className="section-tight">
        <div className="container pcbd-top">
          <aside className="pcbd-card">
            <div className="pcbd-photos">
              {BUILD.photos.map((ph, i) => (
                <a key={ph.src} href={ph.jpg} target="_blank" rel="noopener">
                  <picture>
                    <source srcSet={ph.src} type="image/webp" />
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={ph.jpg} alt={ph.alt} width={ph.width} height={ph.height} loading={i === 0 ? "eager" : "lazy"} />
                  </picture>
                </a>
              ))}
            </div>
            {pricedTotal > 0 ? (
              <div className="pcbd-total">
                <span>Listed parts</span>
                <b>{money(pricedTotal)}</b>
              </div>
            ) : null}
            {cartParts.length > 0 ? (
              <a href={cart} className="btn btn-primary pcbd-btn" target="_blank" rel="sponsored nofollow noopener">
                Buy listed parts <ExternalIcon />
              </a>
            ) : null}
            <Link href="/pc-builder" className="btn btn-secondary pcbd-btn">
              Price your own in PC Builder
            </Link>
            {checked ? (
              <p className="muted pcbd-checked">
                <ClockIcon /> Prices checked <time dateTime={checked}>{formatChecked(checked)}</time>
              </p>
            ) : null}
          </aside>

          <div className="prose pcbd-desc">
            <h2>Description</h2>

            <h3>Introduction</h3>
            <p>
              After five to six years of running Intel NUC small form factor systems, this build is the jump to a full mid-tower. The
              previous machine was a NUC 13 Extreme running a Core i9-14900K, an RTX 5080, and 96GB of DDR5, which is about as far as a
              compact enthusiast box can be pushed. The new home is Corsair&apos;s WARTHOG, with an AMD Ryzen 9 9950X3D at the center.
            </p>
            <p>
              Moving from a small form factor case to a mid-tower trades desk space for cooling headroom, quieter fans at the same
              temperatures, room for more storage, and far easier upgrades. Everything below is the exact part list, with current prices
              where we can check them.
            </p>

            <h3>The case: Corsair WARTHOG RS</h3>
            <p>
              The WARTHOG is a steel mid-tower with a rugged, military-inspired frame, top carry handles, and protective guards around the
              front I/O. The RS version ships with two RS200 200mm intake fans in the front and an RS120 exhaust. It supports up to thirteen
              120mm fans and dual 360mm radiators, reverse-connector motherboards, and includes a GPU anti-sag arm and Corsair&apos;s
              RapidRoute 2.0 cable tray. In this build the front RS200 fans stay for now, with a planned swap to Noctua NF-A20 200mm fans.
            </p>

            <h3>CPU and cooling</h3>
            <p>
              The <b>AMD Ryzen 9 9950X3D</b> brings 16 cores and 32 threads with AMD&apos;s second-generation 3D V-Cache, boosting up to 5.7
              GHz. It is the rare chip that is both a top gaming processor and a serious workstation CPU, which suits a machine used for
              everything.
            </p>
            <p>
              Cooling is a <b>TRYX HOLO 360mm AIO</b> with an Asetek Gen 7 V2 pump and a holographic display on the pump head, rated for
              280W, well above the 9950X3D&apos;s 170W. The stock FOBR RGB fans were swapped for three <b>Noctua NF-A12x25 G2</b> fans for
              quieter, more consistent airflow, and four more NF-A12x25 G2s handle the rest of the case.
            </p>

            <h3>Motherboard</h3>
            <p>
              The <b>ASUS ROG Crosshair 2006 X870E</b> is the 20th anniversary edition of ROG&apos;s flagship AM5 board, with 20+2+2 power
              stages, a 2-inch OLED display, five M.2 slots, PCIe 5.0, two USB4 ports, and Wi-Fi 7. The five M.2 slots are what make the
              four-drive storage setup possible without add-in cards.
            </p>

            <h3>Memory</h3>
            <p>
              <b>64GB of TEAMGROUP T-Create Expert DDR5-6000 CL30</b> in a 2 x 32GB kit. DDR5-6000 with CL30 timings is the well-known sweet
              spot for Ryzen 7000 and 9000 processors, and two 32GB sticks keep the memory in dual channel with headroom for heavy
              multitasking and creative work. See our guide to{" "}
              <Link href="/blog/how-much-ram-for-gaming">how much RAM you need</Link>.
            </p>

            <h3>Storage</h3>
            <p>
              Three <b>WD_BLACK SN850X 2TB</b> PCIe Gen4 NVMe drives give 6TB of fast storage with reads up to 7,300 MB/s, and a separate{" "}
              <b>TEAMGROUP 512GB NVMe</b> drive holds a Linux install, so the system dual boots without the two operating systems sharing a
              drive.
            </p>

            <h3>Video card</h3>
            <p>
              The <b>NVIDIA GeForce RTX 5080 Founders Edition</b> carries over its role from the NUC: 16GB of GDDR7, 10,752 CUDA cores,
              and a compact two-slot, 304mm design that is easy to fit in the WARTHOG. Founders Edition cards are sold through NVIDIA, so
              that row links to NVIDIA&apos;s product page. Compare partner cards on our{" "}
              <Link href="/categories/video-cards">video card deals</Link> page.
            </p>

            <h3>Power supply</h3>
            <p>
              A <b>Corsair SF1000</b> 1000W, 80 PLUS Platinum, fully modular SFX unit powers everything. It is small for an ATX case, but the
              included SFX-to-ATX bracket mounts it in the standard bay and frees up space for cables. With the CPU and GPU together the
              system peaks around {BUILD.watts}W, so 1000W is comfortably above the {recommendedPsu(BUILD.watts)}W we would recommend.
            </p>

            <h3>Planned upgrades</h3>
            <p>
              The two stock 200mm Corsair fans in the front are next on the list, to be replaced with <b>Noctua NF-A20 PWM</b> 200mm fans to
              match the rest of the Noctua setup.
            </p>
          </div>
        </div>
      </section>

      <section className="section-tight" id="part-list">
        <div className="container">
          <h2 style={{ fontSize: 24, marginBottom: 16 }}>Part List</h2>
          <div className="pcbd-bar">
            <span className="pcbd-ok">
              <CheckIcon /> Compatibility: AM5 CPU and board, DDR5 memory, ATX case
            </span>
            <span className="pcbd-watts">Estimated wattage: {BUILD.watts}W</span>
          </div>
          <div className="table-scroll">
            <table className="pcbd-table">
              <thead>
                <tr>
                  <th scope="col">Component</th>
                  <th scope="col">Selection</th>
                  <th scope="col">Qty</th>
                  <th scope="col">Promo</th>
                  <th scope="col">Availability</th>
                  <th scope="col" className="num">
                    Price
                  </th>
                  <th scope="col">
                    <span className="sr-only">Buy</span>
                  </th>
                </tr>
              </thead>
              <tbody>{installed.map((p, i) => row(p, `i${i}`))}</tbody>
              {pricedTotal > 0 ? (
                <tfoot>
                  <tr>
                    <td colSpan={5} className="num">
                      Total for parts with a current price
                    </td>
                    <td className="num pcbd-price">{money(pricedTotal)}</td>
                    <td className="pcbd-buy">
                      <a href={cart} className="btn btn-primary btn-sm" target="_blank" rel="sponsored nofollow noopener">
                        Buy all
                      </a>
                    </td>
                  </tr>
                </tfoot>
              ) : null}
            </table>
          </div>
          {unpriced.length > 0 ? (
            <p className="muted" style={{ fontSize: 13, marginTop: 12 }}>
              Not included in the total: {unpriced.map((p) => p.name).join(", ")}. These link to the maker&apos;s page or a product search.
            </p>
          ) : null}

          {planned.length > 0 ? (
            <>
              <h3 className="sub-head" style={{ marginTop: 28 }}>
                Planned upgrades
              </h3>
              <div className="table-scroll">
                <table className="pcbd-table">
                  <tbody>{planned.map((p, i) => row(p, `p${i}`))}</tbody>
                </table>
              </div>
            </>
          ) : null}

          <p className="muted" style={{ fontSize: 13, marginTop: 12 }}>
            Prices include promotional discounts where available and can change after they were checked. We may earn a commission when you
            buy through these links, at no extra cost to you.
          </p>
        </div>
      </section>

      <section className="section-tight">
        <div className="container" style={{ maxWidth: 960 }}>
          <nav aria-label="Related" className="link-directory">
            <h2 className="sub-head" style={{ marginBottom: 16 }}>
              More PC builds
            </h2>
            <ul className="chip-list">
              {builds.map((b) => (
                <li key={b.def.slug}>
                  <Link href={`/pc-builds/${b.def.slug}`} className="chip">
                    {b.def.name} ({money(b.total)})
                  </Link>
                </li>
              ))}
              <li>
                <Link href="/pc-builds" className="chip">
                  All PC builds
                </Link>
              </li>
              <li>
                <Link href="/brands/corsair" className="chip">
                  Corsair discounts
                </Link>
              </li>
              <li>
                <Link href="/brands/asus-rog" className="chip">
                  ASUS ROG discounts
                </Link>
              </li>
              <li>
                <Link href="/brands/teamgroup" className="chip">
                  TEAMGROUP discounts
                </Link>
              </li>
              <li>
                <Link href="/categories/motherboards" className="chip">
                  Motherboard deals
                </Link>
              </li>
              <li>
                <Link href="/categories/memory" className="chip">
                  Memory deals
                </Link>
              </li>
              <li>
                <Link href="/blog/how-to-find-pc-build-deals" className="chip">
                  How to find PC build deals
                </Link>
              </li>
            </ul>
          </nav>

          <h2 style={{ fontSize: 24, margin: "40px 0 16px" }} id="faq">
            Corsair Warthog build FAQ
          </h2>
          <Faq items={FAQS} />
        </div>
      </section>

      <JsonLd
        data={{
          ...itemListLd(BUILD.title, installed.map((p) => ({ name: p.name, path: `/pc-builds/${BUILD.slug}#part-list` }))),
          image: BUILD.photos.map((p) => absoluteUrl(p.jpg)),
        }}
      />
    </>
  );
}
