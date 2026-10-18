import Link from "next/link";
import { ArrowRight, ClockIcon } from "@/components/Icons";
import { JsonLd } from "@/components/JsonLd";
import { PageHeader } from "@/components/PageHeader";
import { formatChecked } from "@/lib/format";
import { BUILD_ORDER, money, partLabel } from "@/lib/pc-builds";
import { loadBuilds } from "@/lib/pc-builds-data";
import { itemListLd, pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "PC Builds: Complete Part Lists for Gaming and Home Office PCs",
  absoluteTitle: true,
  description:
    "Complete, compatibility-checked PC builds with current prices: AMD and Intel gaming builds and a budget home office PC. Buy every part in one click or customize the build.",
  path: "/pc-builds",
});

export default function PcBuildsHub() {
  const { builds, generatedAt } = loadBuilds();

  return (
    <>
      <PageHeader
        crumbs={[{ name: "PC Builds", path: "/pc-builds" }]}
        title="PC Builds"
        lede="Complete part lists we put together from current deals. Every build is checked for compatibility and power, priced part by part, and ready to buy in one click or customize in the PC Builder."
      >
        {generatedAt ? (
          <div className="page-meta">
            <span>
              <ClockIcon /> Prices checked <time dateTime={generatedAt}>{formatChecked(generatedAt)}</time>
            </span>
          </div>
        ) : null}
      </PageHeader>

      <section className="section-tight">
        <div className="container">
          {builds.length > 0 ? (
            <ul className="pcb-hub">
              {builds.map((g) => {
                const parts = BUILD_ORDER.filter((t) => g.build[t]).map((t) => ({ type: t, part: g.build[t]! }));
                const hero = g.build.gpu ?? g.build.cpu!;
                return (
                  <li key={g.def.slug} className="pcb-hub-card">
                    <Link href={`/pc-builds/${g.def.slug}`} className="pcb-hub-media" tabIndex={-1} aria-hidden="true">
                      {hero.image ? (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img src={hero.image.url} alt="" loading="lazy" referrerPolicy="no-referrer" />
                      ) : null}
                    </Link>
                    <div className="pcb-hub-body">
                      <h2>
                        <Link href={`/pc-builds/${g.def.slug}`}>{g.def.name}</Link>
                      </h2>
                      <p className="pcb-hub-price">{money(g.total)}</p>
                      <p className="muted">{g.def.summary}</p>
                      <dl className="pcb-hub-specs">
                        {parts
                          .filter(({ type }) => ["cpu", "gpu", "memory", "storage"].includes(type))
                          .map(({ type, part }) => (
                            <div key={type}>
                              <dt>{partLabel(type)}</dt>
                              <dd>{part.name}</dd>
                            </div>
                          ))}
                        {!g.build.gpu ? (
                          <div>
                            <dt>Graphics</dt>
                            <dd>Integrated</dd>
                          </div>
                        ) : null}
                      </dl>
                      <Link href={`/pc-builds/${g.def.slug}`} className="btn btn-primary btn-sm">
                        View build <ArrowRight />
                      </Link>
                    </div>
                  </li>
                );
              })}
            </ul>
          ) : (
            <p>Builds are being updated. Check back after the next price refresh, or build your own in the PC Builder.</p>
          )}

          <div className="card" style={{ marginTop: 32 }}>
            <h2 style={{ fontSize: 20, marginBottom: 8 }}>Want to pick every part yourself?</h2>
            <p>
              Our PC Builder lets you choose a CPU, cooler, motherboard, memory, storage, video card, case, power supply, operating system,
              and monitor, with live compatibility checks and estimated wattage.
            </p>
            <Link href="/pc-builder" className="text-link">
              Open the PC Part Picker <ArrowRight />
            </Link>
          </div>
        </div>
      </section>

      {builds.length > 0 ? <JsonLd data={itemListLd("PC Builds", builds.map((g) => ({ name: g.title, path: `/pc-builds/${g.def.slug}` })))} /> : null}
    </>
  );
}
