import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight } from "@/components/Icons";
import { JsonLd } from "@/components/JsonLd";
import { PageHeader } from "@/components/PageHeader";
import { AUTHORS, authorPath, getAuthor, postsBy } from "@/lib/blog";
import { formatDate, lowerName } from "@/lib/format";
import { ORGANIZATION_ID, pageMetadata } from "@/lib/seo";
import { absoluteUrl } from "@/lib/site";

export const dynamicParams = false;

type Props = { params: Promise<{ author: string }> };

export function generateStaticParams() {
  return AUTHORS.map((a) => ({ author: a.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const author = getAuthor((await params).author);
  if (!author) return {};
  return pageMetadata({
    title: `${author.name}, ${author.role}`,
    description: `${author.name} is ${author.role} at ClearanceStream, writing about ${lowerName(author.focus.join(", "))}. Read ${author.name}'s gaming PC guides.`,
    path: authorPath(author),
  });
}

export default async function AuthorPage({ params }: Props) {
  const author = getAuthor((await params).author);
  if (!author) notFound();
  const posts = postsBy(author.slug);

  return (
    <>
      <PageHeader
        crumbs={[
          { name: "Blog", path: "/blog" },
          { name: author.name, path: authorPath(author) },
        ]}
        title={author.name}
        lede={`${author.role} at ClearanceStream`}
      />
      <section className="section-tight">
        <div className="container with-aside">
          <div>
            <div className="prose">
              {author.bio.map((p) => (
                <p key={p.slice(0, 24)}>{p}</p>
              ))}
            </div>
            <h2 className="sub-head" style={{ marginBottom: 20 }}>
              Guides by {author.name}
            </h2>
            <div className="card-grid card-grid-2">
              {posts.map((p) => (
                <Link key={p.slug} href={`/blog/${p.slug}`} className="card">
                  <p style={{ fontSize: 13, marginBottom: 10 }}>Updated {formatDate(p.updated)}</p>
                  <h3>{p.title}</h3>
                  <p>{p.excerpt}</p>
                  <span className="text-link">
                    Read the guide <ArrowRight />
                  </span>
                </Link>
              ))}
            </div>
          </div>
          <aside className="aside">
            <div className="aside-box">
              <h2>Covers</h2>
              <ul>
                {author.focus.map((f) => (
                  <li key={f}>{f}</li>
                ))}
              </ul>
            </div>
            <div className="aside-box">
              <h2>Other authors</h2>
              <ul>
                {AUTHORS.filter((a) => a.slug !== author.slug).map((a) => (
                  <li key={a.slug}>
                    <Link href={authorPath(a)}>{a.name}</Link>
                  </li>
                ))}
              </ul>
            </div>
          </aside>
        </div>
      </section>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "ProfilePage",
          url: absoluteUrl(authorPath(author)),
          mainEntity: {
            "@type": "Person",
            name: author.name,
            jobTitle: author.role,
            url: absoluteUrl(authorPath(author)),
            knowsAbout: author.focus,
            worksFor: { "@id": ORGANIZATION_ID },
          },
        }}
      />
    </>
  );
}
