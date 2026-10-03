import Link from "next/link";
import { BrandDirectory } from "@/components/BrandDirectory";
import { JsonLd } from "@/components/JsonLd";
import { PageHeader } from "@/components/PageHeader";
import { BRANDS, brandTitle } from "@/lib/brands";
import { getAllDeals } from "@/lib/deals";
import { itemListLd, pageMetadata } from "@/lib/seo";

export const revalidate = 86400;

export const metadata = pageMetadata({
  title: "Gaming PC Brands: Deals by Manufacturer",
  description:
    "Browse discounts and promos from the biggest gaming brands: gaming PCs, laptops, mice, keyboards, headsets, and controllers, with buying advice for each.",
  path: "/brands",
});

export default async function BrandsPage() {
  const { deals } = await getAllDeals();

  return (
    <>
      <PageHeader
        crumbs={[{ name: "Brands", path: "/brands" }]}
        title="Discounts and promos by brand"
        lede="Each brand page tracks every product we follow from that manufacturer, split into categories, with the product lines and buying tips that matter when you buy on sale."
      />
      <section className="section-tight">
        <div className="container">
          <BrandDirectory deals={deals} variant="cards" headingLevel={2} />
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
