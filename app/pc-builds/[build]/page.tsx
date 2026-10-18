import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Faq } from "@/components/Faq";
import { CheckIcon, ClockIcon, ExternalIcon } from "@/components/Icons";
import { JsonLd } from "@/components/JsonLd";
import { PageHeader } from "@/components/PageHeader";
import { cartFormBase } from "@/lib/amazon/creators-api";
import { formatChecked } from "@/lib/format";
import {
  BUILD_DEFS,
  BUILD_ORDER,
  cpuIncludesCooler,
  getBuildDef,
  money,
  partLabel,
  type GeneratedBuild,
} from "@/lib/pc-builds";
import { loadBuilds } from "@/lib/pc-builds-data";
import type { Part } from "@/lib/pc-parts";
import { itemListLd, pageMetadata } from "@/lib/seo";

export const dynamicParams = false;

type Props = { params: Promise<{ build: string }> };

export function generateStaticParams() {
  return BUILD_DEFS.map((d) => ({ build: d.slug }));
}

function find(slug: string) {
  const { builds, generatedAt } = loadBuilds();
  return {
    g: builds.find((b) => b.def.slug === slug) ?? null,
    builds,
    generatedAt,
  };
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const slug = (await params).build;
  const def = getBuildDef(slug);
  if (!def) return {};
  const { g } = find(slug);
  return pageMetadata({
    title: g?.title ?? def.title.replace(" [{price}]", ""),
    absoluteTitle: true,
    description: `${def.summary} Full part list with prices, compatibility check, estimated wattage, and one-click buying.`,
    path: `/pc-builds/${slug}`,
    noindex: !g,
  });
}

const cores = (p: Part) => (p.specs.cores ? `${p.specs.cores}-core ` : "");
const gb = (n?: number) => (!n ? "" : n >= 1000 ? `${n / 1000}TB` : `${n}GB`);
const listNum = (p: Part) => {
  const n = p.listPriceDisplay
    ? Number(p.listPriceDisplay.replace(/[^0-9.]/g, ""))
    : NaN;
  return Number.isFinite(n) && n > p.price ? n : null;
};

/** Plain-language write-up of each part choice, built from the parts' own specs. */
function description(g: GeneratedBuild, others: GeneratedBuild[]) {
  const {
    cpu,
    cooler,
    motherboard: mb,
    memory,
    storage,
    gpu,
    case: pcCase,
    psu,
  } = g.build;
  const sections: { title: string; body: React.ReactNode[] }[] = [];

  sections.push({
    title: "Introduction",
    body: [
      `${g.def.summary} It is built for ${g.def.audience}.`,
      `Every part was picked from current listings for the best combination of price and compatibility, and the whole list comes to ${money(g.total)}${g.savings > 1 ? `, ${money(g.savings)} below the parts' reference prices` : ""}. Prices were checked when this page was last updated and can change, so the total updates with every refresh.`,
    ],
  });

  if (cpu) {
    const body: React.ReactNode[] = [
      `The ${cpu.name} is a ${cores(cpu)}processor on the ${cpu.specs.socket} socket${cpu.specs.igpu ? " with integrated graphics" : ""}. ${
        g.def.gpu
          ? "For gaming, a fast six-core-or-better CPU paired with a capable video card delivers high frame rates without overspending on cores most games do not use."
          : "Its built-in graphics drive one or more monitors without a separate video card, which keeps the cost, power draw, and noise down."
      }`,
    ];
    if (cooler)
      body.push(
        `For cooling we added the ${cooler.name}, ${cooler.specs.coolerType === "Air" ? "an air" : cooler.specs.coolerType === "Liquid" ? "a liquid" : "a tower"} cooler that lists support for ${cooler.specs.sockets?.join(", ") ?? "this socket"}. ${
          cpuIncludesCooler(cpu)
            ? "It runs quieter than the cooler in the box."
            : "This CPU does not include a cooler in the box, so one is required."
        }`,
      );
    else if (cpuIncludesCooler(cpu))
      body.push(
        "This CPU includes a cooler in the box, which is plenty for office and everyday work, so no separate cooler is needed.",
      );
    sections.push({ title: cooler ? "CPU and Cooler" : "CPU", body });
  }

  if (mb)
    sections.push({
      title: "Motherboard",
      body: [
        `The ${mb.name} is a ${mb.specs.formFactor ?? ""} board${mb.specs.chipset ? ` with the ${mb.specs.chipset} chipset` : ""} that matches the CPU's ${mb.specs.socket} socket and takes ${mb.specs.memoryType} memory. It is the lowest-cost compatible board in our current listings, which leaves more of the budget for the parts that affect ${g.def.gpu ? "frame rates" : "everyday speed"}.`,
      ],
    });

  if (memory)
    sections.push({
      title: "Memory",
      body: [
        <>
          {gb(memory.specs.capacityGb)} of {memory.specs.memoryType}
          {memory.specs.speed ? ` at ${memory.specs.speed}` : ""} ({memory.name}
          ).{" "}
          {(memory.specs.capacityGb ?? 0) >= 32
            ? "32GB is the comfortable amount for modern games with a browser, voice chat, and streaming software running in the background."
            : "16GB handles office apps, dozens of browser tabs, and video calls comfortably."}{" "}
          See our guide to{" "}
          <Link href="/blog/how-much-ram-for-gaming">
            how much RAM you need
          </Link>
          .
        </>,
      ],
    });

  if (storage)
    sections.push({
      title: "Storage",
      body: [
        `The ${storage.name} is a ${gb(storage.specs.capacityGb)} ${storage.specs.interface ?? "SSD"}. A solid state drive makes the PC boot, open apps, and ${g.def.gpu ? "load games" : "open files"} far faster than a hard drive. ${
          g.def.gpu
            ? "Games keep growing, so 1TB is the practical minimum for a gaming PC."
            : "512GB or more holds Windows, your apps, and years of documents."
        }`,
      ],
    });

  if (gpu)
    sections.push({
      title: "Video Card",
      body: [
        `The ${gpu.name}${gpu.specs.vram ? ` with ${gpu.specs.vram} of video memory` : ""} is the heart of this gaming build. ${
          gpu.specs.vram && parseInt(gpu.specs.vram, 10) >= 16
            ? "16GB of video memory leaves headroom for high-resolution textures in new releases."
            : "12GB of video memory handles high settings at 1080p and 1440p."
        }`,
        <>
          Compare it with other options in our{" "}
          <Link href="/blog/what-graphics-card-do-i-need">
            guide to choosing a graphics card
          </Link>
          .
        </>,
      ],
    });
  else
    sections.push({
      title: "Graphics",
      body: [
        "This build has no separate video card. The processor's integrated graphics handle office work, web video, and multiple monitors. If you want to game later, add a video card and check the power supply rating first.",
      ],
    });

  if (pcCase)
    sections.push({
      title: "Case",
      body: [
        `The ${pcCase.name} fits ${pcCase.specs.fits?.join(", ") ?? "the motherboard"} boards, so it holds this ${mb?.specs.formFactor ?? ""} motherboard with room to spare.`,
      ],
    });

  if (psu)
    sections.push({
      title: "Power Supply",
      body: [
        `We estimate this build draws about ${g.watts}W at full load, so we recommend at least ${g.recommendedPsu}W. The ${psu.name} provides ${psu.specs.capacity}W${psu.specs.efficiency ? ` and is ${psu.specs.efficiency} rated` : ""}, which leaves headroom for upgrades and keeps the fan quiet.`,
      ],
    });

  if (others.length > 0)
    sections.push({
      title: "Other versions",
      body: [
        <>
          Looking for something different? See our{" "}
          {others.map((o, i) => (
            <span key={o.def.slug}>
              {i > 0 ? (i === others.length - 1 ? " or " : ", ") : ""}
              <Link href={`/pc-builds/${o.def.slug}`}>{o.def.name}</Link> (
              {money(o.total)})
            </span>
          ))}
          , or browse <Link href="/pc-builds">every PC build</Link>.
        </>,
      ],
    });

  sections.push({
    title: "Customizing",
    body: [
      <>
        Ready to make this build your own? Open it in the{" "}
        <Link href={customizeUrl(g)}>PC Builder</Link> to swap any part. The
        builder checks compatibility and wattage as you go.
      </>,
    ],
  });
  return sections;
}

function customizeUrl(g: GeneratedBuild) {
  const q = BUILD_ORDER.filter((t) => g.build[t])
    .map((t) => `${t}=${g.build[t]!.asin}`)
    .join("&");
  return `/pc-builder?${q}`;
}

export default async function BuildPage({ params }: Props) {
  const slug = (await params).build;
  const def = getBuildDef(slug);
  if (!def) notFound();
  const { g, builds, generatedAt } = find(slug);

  if (!g)
    return (
      <>
        <PageHeader
          crumbs={[
            { name: "PC Builds", path: "/pc-builds" },
            { name: def.name, path: `/pc-builds/${slug}` },
          ]}
          title={def.name}
          lede={def.summary}
        />
        <section className="section-tight">
          <div className="container">
            <p>
              Not enough compatible parts are in stock to complete this build
              right now. Check back after the next price refresh, or put one
              together in the <Link href="/pc-builder">PC Builder</Link>.
            </p>
          </div>
        </section>
      </>
    );

  const parts = BUILD_ORDER.filter((t) => g.build[t]).map((t) => ({
    type: t,
    part: g.build[t]!,
  }));
  const cart = `${cartFormBase()}${parts.map(({ part }, i) => `&ASIN.${i + 1}=${part.asin}&Quantity.${i + 1}=1`).join("")}`;
  const others = def.related
    .map((s) => builds.find((b) => b.def.slug === s))
    .filter((b): b is GeneratedBuild => !!b);
  const hero = g.build.gpu ?? g.build.cpu!;
  const notes = g.checks.filter((c) => c.level !== "error");

  const faqs = [
    {
      q: `How much does the ${def.name} cost?`,
      a: `${money(g.total)} for all ${parts.length} parts at current prices${g.savings > 1 ? `, which is ${money(g.savings)} below their combined reference prices` : ""}. Prices change, so the total is updated with every refresh.`,
    },
    {
      q: "Are all the parts compatible?",
      a: `Yes. The part list passes our compatibility check: the CPU and motherboard share the ${g.build.cpu?.specs.socket} socket, the memory is ${g.build.memory?.specs.memoryType} to match the board, the case fits a ${g.build.motherboard?.specs.formFactor} motherboard, and the ${g.build.psu?.specs.capacity}W power supply covers the estimated ${g.watts}W draw with headroom.`,
    },
    {
      q: "Does this build include Windows?",
      a: "No. The part list covers the hardware. Add a Windows license in the PC Builder's Operating System row if you need one.",
    },
    {
      q: "Can I change parts?",
      a: "Yes. Open the build in the PC Builder to swap any part. Compatible-only filtering is on by default, so every option it shows fits the rest of the build.",
    },
    {
      q: "How do I buy every part at once?",
      a: "Use Buy all parts. It adds the whole list to your cart in one step, where you can review each item before checking out.",
    },
  ];

  return (
    <>
      <PageHeader
        crumbs={[
          { name: "PC Builds", path: "/pc-builds" },
          { name: def.name, path: `/pc-builds/${slug}` },
        ]}
        title={g.title}
      />

      <section className="section-tight">
        <div className="container pcbd-top">
          <aside className="pcbd-card">
            <div className="pcbd-hero">
              {hero.image ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={hero.image.url}
                  alt={hero.name}
                  referrerPolicy="no-referrer"
                />
              ) : null}
            </div>
            <ul className="pcbd-thumbs" aria-label="Parts in this build">
              {parts.map(({ type, part }) => (
                <li key={type}>
                  <a href={`#part-${type}`} title={part.name}>
                    {part.image ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img
                        src={part.image.url}
                        alt={partLabel(type)}
                        loading="lazy"
                        referrerPolicy="no-referrer"
                      />
                    ) : (
                      <span>{partLabel(type)}</span>
                    )}
                  </a>
                </li>
              ))}
            </ul>
            <div className="pcbd-total">
              <span>Total</span>
              <b>{money(g.total)}</b>
            </div>
            <a
              href={cart}
              className="btn btn-primary pcbd-btn"
              target="_blank"
              rel="sponsored nofollow noopener"
            >
              Buy all parts <ExternalIcon />
            </a>
            <Link href={customizeUrl(g)} className="btn btn-secondary pcbd-btn">
              Customize in PC Builder
            </Link>
            {generatedAt ? (
              <p className="muted pcbd-checked">
                <ClockIcon /> Prices checked{" "}
                <time dateTime={generatedAt}>{formatChecked(generatedAt)}</time>
              </p>
            ) : null}
          </aside>

          <div className="prose pcbd-desc">
            <h2>Description</h2>
            {description(g, others).map((s) => (
              <div key={s.title}>
                <h3>{s.title}</h3>
                {s.body.map((b, i) => (
                  <p key={i}>{b}</p>
                ))}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section-tight" id="part-list">
        <div className="container">
          <h2 style={{ fontSize: 24, marginBottom: 16 }}>Part List</h2>
          <div className="pcbd-bar">
            <span className="pcbd-ok">
              <CheckIcon /> Compatibility:{" "}
              {notes.length ? "see notes below" : "no issues found"}
            </span>
            <span className="pcbd-watts">Estimated wattage: {g.watts}W</span>
          </div>
          <div className="table-scroll">
            <table className="pcbd-table">
              <thead>
                <tr>
                  <th scope="col">Component</th>
                  <th scope="col">Selection</th>
                  <th scope="col">Base</th>
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
              <tbody>
                {parts.map(({ type, part }) => {
                  const base = listNum(part);
                  return (
                    <tr key={type} id={`part-${type}`}>
                      <th scope="row" className="pcbd-type">
                        {partLabel(type)}
                      </th>
                      <td className="pcbd-selcell">
                        <div className="pcbd-sel">
                          {part.image ? (
                            // eslint-disable-next-line @next/next/no-img-element
                            <img
                              src={part.image.url}
                              alt=""
                              width={52}
                              height={52}
                              loading="lazy"
                              referrerPolicy="no-referrer"
                            />
                          ) : (
                            <span className="pcbd-noimg" aria-hidden="true" />
                          )}
                          <div>
                            <a
                              href={part.buyUrl}
                              target="_blank"
                              rel="sponsored nofollow noopener"
                              className="pcbd-name"
                            >
                              {part.name}
                            </a>
                            {part.highlights.length ? (
                              <ul>
                                {part.highlights.map((h) => (
                                  <li key={h}>{h}</li>
                                ))}
                              </ul>
                            ) : null}
                          </div>
                        </div>
                      </td>
                      <td data-label="Base">
                        {base ? money(base) : money(part.price)}
                      </td>
                      <td data-label="Promo">
                        {base ? (
                          <span className="pcbd-promo">
                            -{money(base - part.price)}
                          </span>
                        ) : (
                          <span className="ct-none">—</span>
                        )}
                      </td>
                      <td data-label="Availability">In stock</td>
                      <td className="num pcbd-price">{part.priceDisplay}</td>
                      <td className="pcbd-buy">
                        <a
                          href={part.buyUrl}
                          className="btn btn-primary btn-sm"
                          target="_blank"
                          rel="sponsored nofollow noopener"
                        >
                          Buy
                        </a>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
              <tfoot>
                <tr>
                  <td colSpan={5} className="num">
                    {g.savings > 1 ? (
                      <span className="pcbd-promo">
                        Promo savings: -{money(g.savings)}
                      </span>
                    ) : null}
                  </td>
                  <td className="num pcbd-price">
                    <span className="sr-only">Total </span>
                    {money(g.total)}
                  </td>
                  <td className="pcbd-buy">
                    <a
                      href={cart}
                      className="btn btn-primary btn-sm"
                      target="_blank"
                      rel="sponsored nofollow noopener"
                    >
                      Buy all
                    </a>
                  </td>
                </tr>
              </tfoot>
            </table>
          </div>
          <p className="muted" style={{ fontSize: 13, marginTop: 12 }}>
            Prices include promotional discounts where available. Shipping and
            tax are shown at checkout. We may earn a commission when you buy
            through these links, at no extra cost to you.
          </p>

          <h3 className="sub-head" style={{ marginTop: 28 }}>
            Compatibility notes
          </h3>
          <ul className="pcbd-notes">
            {notes.length ? (
              notes.map((c) => <li key={c.message}>{c.message}</li>)
            ) : (
              <li>
                The CPU, motherboard, memory, case, cooler, and power supply
                passed every compatibility check.
              </li>
            )}
            <li>
              Some physical constraints, like video card length and cooler
              height, are not checked. Confirm them in each listing.
            </li>
          </ul>
        </div>
      </section>

      <section className="section-tight">
        <div className="container" style={{ maxWidth: 960 }}>
          <nav aria-label="Related" className="link-directory">
            <h2 className="sub-head" style={{ marginBottom: 16 }}>
              More PC builds
            </h2>
            <ul className="chip-list">
              {builds
                .filter((b) => b.def.slug !== slug)
                .map((b) => (
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
                <Link href="/pc-builder" className="chip">
                  PC Part Picker
                </Link>
              </li>
              <li>
                <Link href="/categories/components" className="chip">
                  PC component deals
                </Link>
              </li>
              <li>
                <Link href="/categories/gaming-pcs" className="chip">
                  Prebuilt gaming PC deals
                </Link>
              </li>
            </ul>
            <h2 className="sub-head" style={{ margin: "24px 0 16px" }}>
              Guides
            </h2>
            <ul className="chip-list">
              <li>
                <Link
                  href="/blog/what-graphics-card-do-i-need"
                  className="chip"
                >
                  What graphics card do I need?
                </Link>
              </li>
              <li>
                <Link href="/blog/how-much-ram-for-gaming" className="chip">
                  How much RAM for gaming?
                </Link>
              </li>
              <li>
                <Link
                  href="/blog/how-much-should-i-spend-on-a-gaming-pc"
                  className="chip"
                >
                  How much to spend on a gaming PC
                </Link>
              </li>
              <li>
                <Link href="/blog/gaming-laptop-vs-gaming-pc" className="chip">
                  Gaming laptop vs gaming PC
                </Link>
              </li>
            </ul>
          </nav>

          <h2 style={{ fontSize: 24, margin: "40px 0 16px" }} id="faq">
            {def.name} FAQ
          </h2>
          <Faq items={faqs} />
        </div>
      </section>

      <JsonLd
        data={itemListLd(
          g.title,
          parts.map(({ part }) => ({
            name: part.name,
            path: `/pc-builds/${slug}#part-${part.type}`,
          })),
        )}
      />
    </>
  );
}
