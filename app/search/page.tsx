import Link from "next/link";
import { SearchIcon } from "@/components/Icons";
import { PageHeader } from "@/components/PageHeader";
import { SearchBox } from "@/components/SearchBox";
import { POSTS } from "@/lib/blog";
import { BRANDS } from "@/lib/brands";
import { POPULAR_SEARCHES } from "@/lib/search";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Search Gaming PC Deals",
  description:
    "Search every gaming PC deal, brand, and guide on ClearanceStream. Find discounted prebuilt desktops by GPU, model, brand, or budget.",
  path: "/search",
});

export default function SearchPage() {
  return (
    <>
      <PageHeader
        crumbs={[{ name: "Search", path: "/search" }]}
        title="Search gaming PC deals"
        lede="Search live deals, brands, and guides by GPU, model name, brand, or budget."
      >
        <SearchBox />
      </PageHeader>
      <section className="section-tight">
        <div className="container">
          <h2 style={{ fontSize: 20, marginBottom: 16 }}>Popular searches</h2>
          <ul className="chip-list">
            {POPULAR_SEARCHES.map((s) => (
              <li key={s.slug}>
                <Link href={s.path} className="chip">
                  <SearchIcon />
                  {s.label}
                </Link>
              </li>
            ))}
          </ul>

          <div className="card-grid card-grid-2 mt-lg">
            <div className="aside-box">
              <h2>Browse by brand</h2>
              <ul>
                {BRANDS.map((b) => (
                  <li key={b.slug}>
                    <Link href={`/brands/${b.slug}`}>{b.name} gaming PC deals</Link>
                  </li>
                ))}
                <li>
                  <Link href="/deals">All gaming PC deals</Link>
                </li>
              </ul>
            </div>
            <div className="aside-box">
              <h2>Buying guides</h2>
              <ul>
                {POSTS.map((p) => (
                  <li key={p.slug}>
                    <Link href={`/blog/${p.slug}`}>{p.title}</Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
