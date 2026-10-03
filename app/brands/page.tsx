import Link from "next/link";
import { ArrowRight } from "@/components/Icons";
import { JsonLd } from "@/components/JsonLd";
import { PageHeader } from "@/components/PageHeader";
import { BRANDS } from "@/lib/brands";
import { getAllDeals } from "@/lib/deals";
import { itemListLd, pageMetadata } from "@/lib/seo";

export const revalidate = 86400;

export const metadata = pageMetadata({
  title: "Gaming PC Brands: Deals by Manufacturer",
  description:
    "Browse live gaming deals by brand: Corsair, Alienware, Origin PC, Razer, Logitech G, and SteelSeries discounts on Amazon, with buying advice for each.",
  path: "/brands",
});

export default async function BrandsPage() {
  const { deals } = await getAllDeals();

  return (
    <>
      <PageHeader
        crumbs={[{ name: "Brands", path: "/brands" }]}
        title="Gaming deals by brand"
        lede="Each brand page tracks every product from that manufacturer discounted 20 to 50% on Amazon, split into categories, with the product lines and buying tips that matter when you buy on sale."
      />
      <section className="section-tight">
        <div className="container card-grid">
          {BRANDS.map((b) => {
            const brandDeals = deals.filter((d) => d.brandSlug === b.slug);
            const top = brandDeals.reduce((m, d) => Math.max(m, d.savingsPercent ?? 0), 0);
            return (
              <Link key={b.slug} href={`/brands/${b.slug}`} className="card">
                <h2 style={{ fontSize: 22, marginBottom: 10 }}>{b.name}</h2>
                <p className="clamp-3">{b.intro}</p>
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
                  {b.name} deals <ArrowRight />
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
      <JsonLd data={itemListLd("Gaming brands", BRANDS.map((b) => ({ name: `${b.name} deals`, path: `/brands/${b.slug}` })))} />
    </>
  );
}
