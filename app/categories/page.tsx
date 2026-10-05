import Link from "next/link";
import { ArrowRight } from "@/components/Icons";
import { JsonLd } from "@/components/JsonLd";
import { PageHeader } from "@/components/PageHeader";
import { BRANDS } from "@/lib/brands";
import { CATEGORIES } from "@/lib/categories";
import { getAllDeals } from "@/lib/deals";
import { lowerName } from "@/lib/format";
import { itemListLd, pageMetadata } from "@/lib/seo";


export const metadata = pageMetadata({
  title: "Gaming Deals by Category",
  description:
    "Browse gaming deals by category: gaming PCs, laptops, mice, keyboards, headsets, monitors, controllers, and more, across every brand we track.",
  path: "/categories",
});

export default async function CategoriesHub() {
  const { deals } = await getAllDeals();

  return (
    <>
      <PageHeader
        crumbs={[{ name: "Categories", path: "/categories" }]}
        title="Gaming deals by category"
        lede="Every product we track, organised by what it is. Each category page compares prices and discounts across all brands."
      />
      <section className="section-tight">
        <div className="container card-grid">
          {CATEGORIES.map((c) => {
            const inCat = deals.filter((d) => d.categorySlug === c.slug);
            const discounted = inCat.filter((d) => d.savingsPercent).length;
            const brands = BRANDS.filter((b) => inCat.some((d) => d.brandSlug === b.slug));
            return (
              <Link key={c.slug} href={`/categories/${c.slug}`} className="card brand-card">
                <h2 style={{ fontSize: 20, marginBottom: 8 }}>{c.hubTitle}</h2>
                <p>{c.blurb}</p>
                {inCat.length > 0 ? (
                  <p style={{ marginTop: 12, fontSize: 14 }}>
                    <strong style={{ color: "var(--ink)" }}>{inCat.length}</strong> products from{" "}
                    <strong style={{ color: "var(--ink)" }}>{brands.length}</strong> brands
                    {discounted ? `, ${discounted} discounted` : ""}
                  </p>
                ) : null}
                <span className="text-link">
                  Browse {lowerName(c.plural)} <ArrowRight />
                </span>
              </Link>
            );
          })}
        </div>
      </section>
      <JsonLd data={itemListLd("Gaming deal categories", CATEGORIES.map((c) => ({ name: c.hubTitle, path: `/categories/${c.slug}` })))} />
    </>
  );
}
