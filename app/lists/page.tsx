import Link from "next/link";
import { JsonLd } from "@/components/JsonLd";
import { PageHeader } from "@/components/PageHeader";
import { CATEGORIES } from "@/lib/categories";
import { getAllDeals } from "@/lib/deals";
import { liveLists } from "@/lib/lists";
import { itemListLd, pageMetadata } from "@/lib/seo";

export const revalidate = 604800;

const year = new Date().getFullYear();

export const metadata = pageMetadata({
  title: `Best Gaming Gear Lists - ${year} Updated`,
  description:
    "Ranked lists of the best gaming PCs, laptops, mice, keyboards, headsets, monitors, and controllers by price, GPU, and features. Live prices, updated weekly.",
  path: "/lists",
});

export default async function ListsHub() {
  const { deals } = await getAllDeals();
  const lists = liveLists(deals).filter((l) => l.indexable);

  return (
    <>
      <PageHeader
        crumbs={[{ name: "Lists", path: "/lists" }]}
        title={`Best gaming gear lists, ${year}`}
        lede="Top 10 lists built from live prices: the best gaming PCs, laptops, and peripherals by budget, GPU, platform, and features. Every list updates weekly."
      />
      <section className="section-tight">
        <div className="container brand-directory">
          {CATEGORIES.map((c) => {
            const inCat = lists.filter((l) => l.def.category.slug === c.slug);
            if (inCat.length === 0) return null;
            return (
              <section key={c.slug} aria-label={c.plural}>
                <h2 className="group-heading">
                  <Link href={`/categories/${c.slug}`}>{c.plural}</Link>
                </h2>
                <ul className="result-list">
                  {inCat.map((l) => (
                    <li key={l.def.slug}>
                      <Link href={`/lists/${l.def.slug}`}>
                        <b>{l.title}</b>
                        <span>
                          From {l.items.reduce((m, d) => Math.min(m, d.price), Infinity).toLocaleString("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 })}
                        </span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </section>
            );
          })}
          {lists.length === 0 ? <p className="muted">Lists appear here as soon as live prices are available.</p> : null}
        </div>
      </section>
      <JsonLd data={itemListLd("Best gaming gear lists", lists.map((l) => ({ name: l.title, path: `/lists/${l.def.slug}` })))} />
    </>
  );
}
