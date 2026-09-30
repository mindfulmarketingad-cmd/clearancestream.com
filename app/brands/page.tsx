import Link from "next/link";
import { ArrowRight } from "@/components/Icons";
import { JsonLd } from "@/components/JsonLd";
import { PageHeader } from "@/components/PageHeader";
import { BRANDS } from "@/lib/brands";
import { getAllDeals } from "@/lib/deals";
import { itemListLd, pageMetadata } from "@/lib/seo";

export const revalidate = 3600;

export const metadata = pageMetadata({
  title: "Gaming PC Brands: Deals by Manufacturer",
  description:
    "Browse live gaming PC deals by brand. Track Corsair and Alienware prebuilt desktop discounts and clearances on Amazon, with buying advice for each manufacturer.",
  path: "/brands",
});

export default async function BrandsPage() {
  const { deals } = await getAllDeals();

  return (
    <>
      <PageHeader
        crumbs={[{ name: "Brands", path: "/brands" }]}
        title="Gaming PC deals by brand"
        lede="Each brand page tracks every live gaming desktop deal from that manufacturer on Amazon, along with the product lines, buying tips, and upgrade considerations that matter when you buy on sale."
      />
      <section className="section-tight">
        <div className="container card-grid card-grid-2">
          {BRANDS.map((b) => {
            const brandDeals = deals.filter((d) => d.brandSlug === b.slug);
            const top = brandDeals.reduce((m, d) => Math.max(m, d.savingsPercent ?? 0), 0);
            return (
              <Link key={b.slug} href={`/brands/${b.slug}`} className="card">
                <h2 style={{ fontSize: 22, marginBottom: 10 }}>{b.name}</h2>
                <p>{b.intro}</p>
                <p style={{ marginTop: 16, fontSize: 14 }}>
                  <strong style={{ color: "var(--ink)" }}>Product lines:</strong> {b.lines.map((l) => l.name).join(", ")}
                </p>
                {brandDeals.length > 0 ? (
                  <p style={{ marginTop: 6, fontSize: 14 }}>
                    <strong style={{ color: "var(--ink)" }}>{brandDeals.length}</strong> live deals
                    {top > 0 ? (
                      <>
                        , up to <strong style={{ color: "var(--ink)" }}>{top}% off</strong>
                      </>
                    ) : null}
                  </p>
                ) : null}
                <span className="text-link">
                  {b.name} gaming PC deals <ArrowRight />
                </span>
              </Link>
            );
          })}
        </div>
      </section>
      <section className="section-tight">
        <div className="container" style={{ maxWidth: 880 }}>
          <div className="prose">
            <h2 className="mt-0">Choosing a gaming PC brand</h2>
            <p>
              Brand matters less than configuration, but it does shape how easy a system is to upgrade, what support
              you get, and how often it goes on sale. Brands that build with standard retail components tend to be
              easier to upgrade later, while brands with custom chassis and boards often trade upgradability for design
              and support.
            </p>
            <p>
              Our <Link href="/blog/prebuilt-gaming-pc-buying-guide">prebuilt gaming PC buying guide</Link> compares
              these trade-offs in detail, and <Link href="/deals">all gaming PC deals</Link> lists every brand in one
              place.
            </p>
          </div>
        </div>
      </section>
      <JsonLd data={itemListLd("Gaming PC brands", BRANDS.map((b) => ({ name: `${b.name} gaming PC deals`, path: `/brands/${b.slug}` })))} />
    </>
  );
}
