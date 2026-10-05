import Link from "next/link";
import { PageHeader } from "@/components/PageHeader";
import { AUTHORS, POSTS, authorPath } from "@/lib/blog";
import { BRANDS } from "@/lib/brands";
import { CATEGORIES } from "@/lib/categories";
import { liveLists } from "@/lib/lists";
import { getAllDeals } from "@/lib/deals";
import { POPULAR_SEARCHES } from "@/lib/search";
import { pageMetadata } from "@/lib/seo";


export const metadata = pageMetadata({
  title: "Sitemap",
  description: "Every page on ClearanceStream: gaming PC deals, brands, buying guides, popular searches, and site information.",
  path: "/sitemap",
});

export default async function SitemapPage() {
  const { deals } = await getAllDeals();

  return (
    <>
      <PageHeader
        crumbs={[{ name: "Sitemap", path: "/sitemap" }]}
        title="Sitemap"
        lede="Every section and page on ClearanceStream in one place."
      />
      <section className="section-tight">
        <div className="container sitemap-cols">
          <div>
            <h2>Main pages</h2>
            <ul>
              <li><Link href="/">Home</Link></li>
              <li><Link href="/deals">All gaming PC deals</Link></li>
              <li><Link href="/brands">Brands</Link></li>
              <li><Link href="/blog">Blog</Link></li>
              <li><Link href="/search">Search</Link></li>
            </ul>
          </div>
          <div>
            <h2>Brands</h2>
            <ul>
              {BRANDS.map((b) => (
                <li key={b.slug}><Link href={`/brands/${b.slug}`}>{b.name} deals</Link></li>
              ))}
            </ul>
          </div>
          <div>
            <h2>Guides</h2>
            <ul>
              {POSTS.map((p) => (
                <li key={p.slug}><Link href={`/blog/${p.slug}`}>{p.title}</Link></li>
              ))}
            </ul>
          </div>
          <div>
            <h2>Categories</h2>
            <ul>
              <li><Link href="/categories">All categories</Link></li>
              {CATEGORIES.map((c) => (
                <li key={c.slug}><Link href={`/categories/${c.slug}`}>{c.hubTitle}</Link></li>
              ))}
            </ul>
          </div>
          <div>
            <h2>Top 10 lists</h2>
            <ul>
              <li><Link href="/lists">All lists</Link></li>
              {liveLists(deals).filter((l) => l.indexable).map((l) => (
                <li key={l.def.slug}><Link href={`/lists/${l.def.slug}`}>{l.shortTitle}</Link></li>
              ))}
            </ul>
          </div>
          <div>
            <h2>Coupons</h2>
            <ul>
              <li><Link href="/coupons">All coupons</Link></li>
              {BRANDS.map((b) => (
                <li key={b.slug}><Link href={`/coupons/${b.slug}`}>{b.name} coupons</Link></li>
              ))}
            </ul>
          </div>
          <div>
            <h2>Authors</h2>
            <ul>
              {AUTHORS.map((a) => (
                <li key={a.slug}><Link href={authorPath(a)}>{a.name}</Link></li>
              ))}
            </ul>
          </div>
          <div>
            <h2>Popular searches</h2>
            <ul>
              {POPULAR_SEARCHES.map((s) => (
                <li key={s.slug}><Link href={s.path}>{s.label}</Link></li>
              ))}
            </ul>
          </div>
          <div>
            <h2>Company</h2>
            <ul>
              <li><Link href="/about">About</Link></li>
              <li><Link href="/contact">Contact</Link></li>
              <li><Link href="/disclaimer">Disclaimer</Link></li>
              <li><Link href="/privacy">Privacy policy</Link></li>
              <li><Link href="/terms">Terms of use</Link></li>
              <li><a href="/sitemap.xml">XML sitemap</a></li>
            </ul>
          </div>
        </div>

        {BRANDS.map((b) => {
          const brandDeals = deals.filter((d) => d.brandSlug === b.slug);
          if (brandDeals.length === 0) return null;
          const cats = CATEGORIES.filter((c) => brandDeals.some((d) => d.categorySlug === c.slug));
          return (
            <div key={b.slug} className="container mt-lg sitemap-cols" style={{ display: "block" }}>
              <h2>{b.name} deals</h2>
              <p style={{ marginBottom: 12, fontSize: 15 }}>
                {cats.map((c, i) => (
                  <span key={c.slug}>
                    {i > 0 ? " · " : ""}
                    <Link href={`/brands/${b.slug}/${c.slug}`}>{c.name}</Link>
                  </span>
                ))}
              </p>
              <ul>
                {brandDeals.map((d) => (
                  <li key={d.asin}><Link href={d.path}>{d.name}</Link></li>
                ))}
              </ul>
            </div>
          );
        })}
      </section>
    </>
  );
}
