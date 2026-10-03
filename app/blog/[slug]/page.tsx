import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { DealGrid } from "@/components/DealCard";
import { Faq } from "@/components/Faq";
import { ArrowRight } from "@/components/Icons";
import { JsonLd } from "@/components/JsonLd";
import { PageHeader } from "@/components/PageHeader";
import { POSTS, authorPath, getPost, postAuthor } from "@/lib/blog";
import { BRANDS } from "@/lib/brands";
import { getAllDeals } from "@/lib/deals";
import { formatDate } from "@/lib/format";
import { ORGANIZATION_ID, pageMetadata } from "@/lib/seo";
import { absoluteUrl } from "@/lib/site";

export const revalidate = 86400;
export const dynamicParams = false;

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return POSTS.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const post = getPost((await params).slug);
  if (!post) return {};
  return {
    ...pageMetadata({
      title: post.metaTitle,
      description: post.description,
      path: `/blog/${post.slug}`,
      type: "article",
      publishedTime: post.published,
      modifiedTime: post.updated,
    }),
    keywords: post.keywords,
    authors: [{ name: postAuthor(post).name, url: absoluteUrl(authorPath(postAuthor(post))) }],
  };
}

export default async function PostPage({ params }: Props) {
  const post = getPost((await params).slug);
  if (!post) notFound();
  const { deals } = await getAllDeals();
  const topDeals = deals.slice(0, 4);
  const others = POSTS.filter((p) => p.slug !== post.slug);
  const { Body } = post;
  const author = postAuthor(post);

  const articleLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.description,
    datePublished: post.published,
    dateModified: post.updated,
    mainEntityOfPage: absoluteUrl(`/blog/${post.slug}`),
    image: absoluteUrl("/og.png"),
    keywords: post.keywords.join(", "),
    author: { "@type": "Person", name: author.name, jobTitle: author.role, url: absoluteUrl(authorPath(author)) },
    publisher: { "@id": ORGANIZATION_ID },
  };

  return (
    <>
      <PageHeader
        crumbs={[
          { name: "Blog", path: "/blog" },
          { name: post.title, path: `/blog/${post.slug}` },
        ]}
        title={post.title}
        lede={post.excerpt}
      >
        <div className="page-meta">
          <span>
            By <Link href={authorPath(author)} rel="author" className="text-link">{author.name}</Link>, {author.role}
          </span>
          <span>
            Updated <time dateTime={post.updated}>{formatDate(post.updated)}</time>
          </span>
          <span>{post.readingMinutes} min read</span>
        </div>
      </PageHeader>

      <section className="section-tight">
        <div className="container with-aside">
          <article className="prose">
            <Body />
            <h2 id="faq">Frequently asked questions</h2>
            <Faq items={post.faqs} />
            <div className="card" style={{ marginTop: 48 }}>
              <p style={{ fontSize: 13, textTransform: "uppercase", letterSpacing: "0.06em", fontWeight: 600 }}>About the author</p>
              <h2 style={{ fontSize: 20, margin: "8px 0" }}>
                <Link href={authorPath(author)} rel="author" style={{ textDecoration: "none", color: "var(--ink)" }}>
                  {author.name}
                </Link>
              </h2>
              <p>{author.bio[0]}</p>
              <p style={{ marginTop: 12 }}>
                <Link href={authorPath(author)}>More from {author.name}</Link>
              </p>
            </div>
          </article>

          <aside className="aside" aria-label="Article navigation">
            <nav className="aside-box" aria-label="Table of contents">
              <h2>On this page</h2>
              <ol>
                {post.toc.map((t) => (
                  <li key={t.id}>
                    <a href={`#${t.id}`}>{t.label}</a>
                  </li>
                ))}
              </ol>
            </nav>
            <div className="aside-box">
              <h2>Deals by brand</h2>
              <ul>
                {BRANDS.map((b) => (
                  <li key={b.slug}>
                    <Link href={`/brands/${b.slug}`}>{b.name} deals</Link>
                  </li>
                ))}
                <li>
                  <Link href="/deals">All gaming PC deals</Link>
                </li>
              </ul>
            </div>
          </aside>
        </div>
      </section>

      {topDeals.length > 0 ? (
        <section className="section-tight">
          <div className="container">
            <div className="section-head">
              <h2>Live gaming PC deals</h2>
              <Link href="/deals" className="text-link">
                View all deals <ArrowRight />
              </Link>
            </div>
            <DealGrid deals={topDeals} />
          </div>
        </section>
      ) : null}

      {others.length > 0 ? (
        <section className="section-tight">
          <div className="container">
            <h2 style={{ fontSize: 22, marginBottom: 20 }}>Keep reading</h2>
            <div className="card-grid card-grid-2">
              {others.map((p) => (
                <Link key={p.slug} href={`/blog/${p.slug}`} className="card">
                  <h3>{p.title}</h3>
                  <p>{p.excerpt}</p>
                  <span className="text-link">
                    Read the guide <ArrowRight />
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </section>
      ) : null}

      <JsonLd data={articleLd} />
    </>
  );
}
