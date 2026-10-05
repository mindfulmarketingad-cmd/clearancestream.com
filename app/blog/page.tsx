import Link from "next/link";
import { ArrowRight } from "@/components/Icons";
import { JsonLd } from "@/components/JsonLd";
import { PageHeader } from "@/components/PageHeader";
import { POSTS, authorPath, postAuthor } from "@/lib/blog";
import { formatDate } from "@/lib/format";
import { FEATURED_SIZE, blogImagePath } from "@/lib/featured-image";
import { itemListLd, pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Gaming PC Deal Guides & Buying Advice",
  description:
    "Guides to buying gaming PCs on sale: how to judge a discount, when prices drop, which specs matter, and how Corsair and Alienware prebuilts compare.",
  path: "/blog",
});

export default function BlogPage() {
  return (
    <>
      <PageHeader
        crumbs={[{ name: "Blog", path: "/blog" }]}
        title="Gaming PC deal guides"
        lede="In-depth guides that help you judge a gaming PC deal on what is inside the case, not just the percentage on the price tag."
      />
      <section className="section-tight">
        <div className="container card-grid card-grid-2">
          {POSTS.map((p) => (
            <article key={p.slug} className="card">
              <Link href={`/blog/${p.slug}`} tabIndex={-1} aria-hidden="true" className="card-image">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={blogImagePath(p.slug)} alt="" width={FEATURED_SIZE.width} height={FEATURED_SIZE.height} loading="lazy" />
              </Link>
              <p style={{ fontSize: 13, marginBottom: 12 }}>
                <Link href={authorPath(postAuthor(p))} className="text-link">{postAuthor(p).name}</Link>
                <span className="muted"> &middot; </span>
                <time dateTime={p.updated}>Updated {formatDate(p.updated)}</time>
              </p>
              <h2 style={{ fontSize: 22, marginBottom: 10 }}>
                <Link href={`/blog/${p.slug}`}>{p.title}</Link>
              </h2>
              <p>{p.excerpt}</p>
              <Link href={`/blog/${p.slug}`} className="text-link" aria-label={`Read: ${p.title}`}>
                Read the guide <ArrowRight />
              </Link>
            </article>
          ))}
        </div>
        <div className="container mt-md">
          <p className="muted">
            Ready to shop? See <Link href="/deals" className="text-link">all live gaming PC deals</Link> or browse{" "}
            <Link href="/brands" className="text-link">deals by brand</Link>.
          </p>
        </div>
      </section>
      <JsonLd data={itemListLd("Gaming PC guides", POSTS.map((p) => ({ name: p.title, path: `/blog/${p.slug}` })))} />
    </>
  );
}
