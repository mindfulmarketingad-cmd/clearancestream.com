import type { Metadata } from "next";
import Link from "next/link";
import { notFound, permanentRedirect } from "next/navigation";
import { DealGrid } from "@/components/DealCard";
import { DealsUnavailable } from "@/components/DealsUnavailable";
import { SearchIcon } from "@/components/Icons";
import { JsonLd } from "@/components/JsonLd";
import { PageHeader } from "@/components/PageHeader";
import { SearchBox } from "@/components/SearchBox";
import { getAllDeals } from "@/lib/deals";
import { POPULAR_SEARCHES, popularSearch, runSearch } from "@/lib/search";
import { itemListLd, pageMetadata } from "@/lib/seo";
import { searchSlug } from "@/lib/slug";

export const revalidate = 86400;
export const dynamicParams = true;

type Props = { params: Promise<{ query: string }> };

export function generateStaticParams() {
  return POPULAR_SEARCHES.map((s) => ({ query: s.slug }));
}

async function resolve(params: Props["params"]) {
  const raw = (await params).query;
  let decoded: string;
  try {
    decoded = decodeURIComponent(raw);
  } catch {
    notFound();
  }
  const slug = searchSlug(decoded.replace(/[-+]/g, " "));
  if (!slug) notFound();
  if (slug !== raw) permanentRedirect(`/search/${slug}`);
  const popular = popularSearch(slug);
  const label = popular?.label ?? slug.replace(/-/g, " ");
  const { deals } = await getAllDeals();
  const results = runSearch(label, deals);
  return { slug, label, popular, results };
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug, label, popular, results } = await resolve(params);
  const count = results.deals.length;
  return pageMetadata({
    title: `${label} Deals`,
    description: count
      ? `${count} live ${label} deals, ranked by discount and refreshed daily on ClearanceStream.`
      : `Search results for ${label} on ClearanceStream: gaming PC deals, brands, and buying guides.`,
    path: `/search/${slug}`,
    // Only curated searches with live results are indexable; everything else
    // stays crawlable for link discovery but out of the index.
    noindex: !popular || count === 0,
  });
}

export default async function SearchResultsPage({ params }: Props) {
  const { slug, label, results } = await resolve(params);
  const total = results.deals.length + results.other.length;

  return (
    <>
      <PageHeader
        crumbs={[
          { name: "Search", path: "/search" },
          { name: label, path: `/search/${slug}` },
        ]}
        title={
          <>
            {label.charAt(0).toUpperCase() + label.slice(1)} <span style={{ color: "var(--blue)" }}>deals</span>
          </>
        }
        lede={
          total === 0
            ? "No matches yet. Try a GPU model, brand, or budget such as under 1500."
            : [
                results.deals.length ? `${results.deals.length} matching ${results.deals.length === 1 ? "deal" : "deals"}` : "",
                results.other.length ? `${results.other.length} related ${results.other.length === 1 ? "page" : "pages"}` : "",
              ]
                .filter(Boolean)
                .join(" and ") + ", ranked by relevance and discount."
        }
      >
        <SearchBox defaultValue={label} />
      </PageHeader>

      <section className="section-tight">
        <div className="container">
          {results.deals.length > 0 ? (
            <>
              <h2 style={{ fontSize: 22, marginBottom: 20 }}>Matching gaming PC deals</h2>
              <DealGrid deals={results.deals} priorityCount={4} />
              <JsonLd data={itemListLd(`${label} deals`, results.deals.map((d) => ({ name: d.name, path: d.path })))} />
            </>
          ) : (
            <DealsUnavailable scope={`"${label}"`} />
          )}

          {results.other.length > 0 ? (
            <div className="mt-lg" style={{ maxWidth: 760 }}>
              <h2 style={{ fontSize: 22, marginBottom: 12 }}>Pages and guides</h2>
              <ul className="result-list">
                {results.other.map((d) => (
                  <li key={d.path}>
                    <Link href={d.path}>
                      <small>{d.type === "guide" ? "Guide" : d.type === "brand" ? "Brand" : "Page"}</small>
                      <b>{d.title}</b>
                      <span>{d.description}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ) : null}

          <h2 className="mt-lg" style={{ fontSize: 18, marginBottom: 16 }}>
            Popular searches
          </h2>
          <ul className="chip-list">
            {POPULAR_SEARCHES.filter((s) => s.slug !== slug).map((s) => (
              <li key={s.slug}>
                <Link href={s.path} className="chip">
                  <SearchIcon />
                  {s.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </>
  );
}
