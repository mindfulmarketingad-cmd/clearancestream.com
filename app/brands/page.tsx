import Link from "next/link";
import { BrandLogo } from "@/components/BrandLogo";
import { ArrowRight } from "@/components/Icons";
import { JsonLd } from "@/components/JsonLd";
import { PageHeader } from "@/components/PageHeader";
import { BRANDS, brandTitle } from "@/lib/brands";
import { getAllDeals } from "@/lib/deals";
import { itemListLd, pageMetadata } from "@/lib/seo";


export const metadata = pageMetadata({
  title: "Gaming Clearances Discounts and Promotions By Brand",
  absoluteTitle: true,
  description:
    "Browse discounts and promos from the biggest gaming brands: gaming PCs, laptops, mice, keyboards, headsets, and controllers, with buying advice for each.",
  path: "/brands",
});

export default async function BrandsPage() {
  const { deals } = await getAllDeals();
  const rows = BRANDS.map((brand) => {
    const own = deals.filter((d) => d.brandSlug === brand.slug);
    const sale = own.filter((d) => (d.savingsPercent ?? 0) > 0);
    return { brand, count: own.length, onSale: sale.length, best: Math.max(0, ...sale.map((d) => d.savingsPercent ?? 0)) };
  }).sort((a, b) => b.count - a.count || a.brand.name.localeCompare(b.brand.name));

  return (
    <>
      <PageHeader
        crumbs={[{ name: "Brands", path: "/brands" }]}
        title="Gaming Clearances Discounts and Promotions By Brand"
        lede="Each brand page tracks every product we follow from that manufacturer, split into categories, with the product lines and buying tips that matter when you buy on sale."
      />
      <section className="section-tight">
        <div className="container">
          <div className="table-scroll">
            <table className="brand-table">
              <caption className="sr-only">Gaming brands we track</caption>
              <thead>
                <tr>
                  <th scope="col">Logo</th>
                  <th scope="col">Brand</th>
                  <th scope="col">Deals</th>
                  <th scope="col">
                    <span className="sr-only">Link</span>
                  </th>
                </tr>
              </thead>
              <tbody>
                {rows.map(({ brand, count, onSale, best }) => (
                  <tr key={brand.slug}>
                    <td className="brand-table-logo">
                      <Link href={`/brands/${brand.slug}`} tabIndex={-1} aria-hidden="true">
                        <BrandLogo brand={brand} size={56} />
                      </Link>
                    </td>
                    <th scope="row">
                      <Link href={`/brands/${brand.slug}`}>{brand.name}</Link>
                    </th>
                    <td className="brand-table-count">
                      {count} {count === 1 ? "product" : "products"}
                      {onSale ? (
                        <span>
                          {onSale} on sale{best ? `, up to ${best}% off` : ""}
                        </span>
                      ) : null}
                    </td>
                    <td className="brand-table-cta">
                      <Link href={`/brands/${brand.slug}`} className="btn btn-primary btn-sm">
                        View now <ArrowRight />
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
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
      <JsonLd data={itemListLd("Gaming brands", BRANDS.map((b) => ({ name: brandTitle(b), path: `/brands/${b.slug}` })))} />
    </>
  );
}
