import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { DealGrid } from "@/components/DealCard";
import { DealsUnavailable } from "@/components/DealsUnavailable";
import { Faq } from "@/components/Faq";
import { ArrowRight, ClockIcon, RefreshIcon } from "@/components/Icons";
import { JsonLd } from "@/components/JsonLd";
import { PageHeader } from "@/components/PageHeader";
import { POSTS } from "@/lib/blog";
import { BRANDS, getBrand } from "@/lib/brands";
import { getBrandDeals } from "@/lib/deals";
import { formatChecked } from "@/lib/format";
import { POPULAR_SEARCHES } from "@/lib/search";
import { itemListLd, pageMetadata } from "@/lib/seo";

export const revalidate = 3600;
export const dynamicParams = false;

type Props = { params: Promise<{ brand: string }> };

export function generateStaticParams() {
  return BRANDS.map((b) => ({ brand: b.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const brand = getBrand((await params).brand);
  if (!brand) return {};
  return pageMetadata({ title: brand.metaTitle, description: brand.metaDescription, path: `/brands/${brand.slug}` });
}

export default async function BrandPage({ params }: Props) {
  const brand = getBrand((await params).brand);
  if (!brand) notFound();
  const { deals, fetchedAt } = await getBrandDeals(brand.slug);
  const others = BRANDS.filter((b) => b.slug !== brand.slug);
  const searches = POPULAR_SEARCHES.filter((s) => s.label.toLowerCase().includes(brand.name.toLowerCase()));

  return (
    <>
      <PageHeader
        crumbs={[
          { name: "Brands", path: "/brands" },
          { name: brand.name, path: `/brands/${brand.slug}` },
        ]}
        title={`${brand.name} gaming PC deals`}
        lede={brand.intro}
      >
        <div className="page-meta">
          <span>
            <RefreshIcon /> Live Amazon prices, refreshed hourly
          </span>
          {fetchedAt ? (
            <span>
              <ClockIcon /> Last checked <time dateTime={fetchedAt}>{formatChecked(fetchedAt)}</time>
            </span>
          ) : null}
        </div>
      </PageHeader>

      <section className="section-tight">
        <div className="container">
          <div className="section-head">
            <div>
              <h2>Current {brand.name} gaming PC deals</h2>
              <p>
                {deals.length > 0
                  ? `${deals.length} ${brand.name} gaming desktops tracked, sorted by biggest discount.`
                  : `Live ${brand.name} listings appear here as soon as Amazon reports them.`}
              </p>
            </div>
          </div>
          {deals.length > 0 ? (
            <>
              <DealGrid deals={deals} priorityCount={4} />
              <JsonLd data={itemListLd(`${brand.name} gaming PC deals`, deals.map((d) => ({ name: d.name, path: d.path })))} />
            </>
          ) : (
            <DealsUnavailable scope={brand.name} />
          )}
        </div>
      </section>

      <section className="section-tight">
        <div className="container with-aside">
          <div className="prose">
            <h2 className="mt-0">About {brand.name} gaming PCs</h2>
            {brand.overview.map((p) => (
              <p key={p.slice(0, 32)}>{p}</p>
            ))}

            <h2>{brand.name} product lines</h2>
            {brand.lines.map((l) => (
              <div key={l.name}>
                <h3>{l.name}</h3>
                <p>{l.summary}</p>
              </div>
            ))}

            <h2>How to buy a {brand.name} gaming PC on sale</h2>
            <ul>
              {brand.buyingTips.map((t) => (
                <li key={t.slice(0, 32)}>{t}</li>
              ))}
            </ul>
            <p>
              For a deeper walkthrough, read our <Link href="/blog/gaming-pc-deals-guide">gaming PC deals guide</Link>{" "}
              and the <Link href="/blog/prebuilt-gaming-pc-buying-guide">prebuilt buying guide</Link>.
            </p>

            <h2>{brand.name} gaming PC FAQ</h2>
          </div>
          <aside className="aside" aria-label="Related">
            <div className="aside-box">
              <h2>Other brands</h2>
              <ul>
                {others.map((b) => (
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
              <h2>Guides</h2>
              <ul>
                {POSTS.map((p) => (
                  <li key={p.slug}>
                    <Link href={`/blog/${p.slug}`}>{p.title}</Link>
                  </li>
                ))}
              </ul>
            </div>
            {searches.length > 0 ? (
              <div className="aside-box">
                <h2>Popular searches</h2>
                <ul>
                  {searches.map((s) => (
                    <li key={s.slug}>
                      <Link href={s.path}>{s.label} deals</Link>
                    </li>
                  ))}
                </ul>
              </div>
            ) : null}
          </aside>
        </div>
        <div className="container" style={{ marginTop: 8 }}>
          <div style={{ maxWidth: 720 }}>
            <Faq items={brand.faqs} />
            <p className="mt-md">
              <Link href="/brands" className="text-link">
                Back to all brands <ArrowRight />
              </Link>
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
