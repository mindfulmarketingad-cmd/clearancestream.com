import Link from "next/link";
import { FilterIcon, RadarIcon, ShieldIcon } from "@/components/Icons";
import { JsonLd } from "@/components/JsonLd";
import { PageHeader } from "@/components/PageHeader";
import { AUTHORS, authorPath } from "@/lib/blog";
import { BRANDS } from "@/lib/brands";
import { ORGANIZATION_ID, pageMetadata } from "@/lib/seo";
import { SITE, absoluteUrl } from "@/lib/site";

export const metadata = pageMetadata({
  title: "About ClearanceStream: How We Find Gaming PC Deals",
  description:
    "ClearanceStream tracks live prices on gaming PCs and gear to surface hidden discounts and promos. Learn how we find deals, where prices come from, and how we make money.",
  path: "/about",
});

export default function AboutPage() {
  return (
    <>
      <PageHeader
        crumbs={[{ name: "About", path: "/about" }]}
        title="About ClearanceStream"
        lede="ClearanceStream exists for one reason: to help gaming PC enthusiasts find genuine discounts on the systems they want, without wading through inflated list prices and sale banners."
      />
      <section className="section-tight">
        <div className="container with-aside">
          <div className="prose">
            <h2 className="mt-0">Why we built it</h2>
            <p>
              Gaming PC prices move constantly. A single model can be listed in a dozen configurations, and the best
              discount is often on one of them, with no banner or announcement. Retail sale pages, meanwhile, lean on
              percentages calculated against list prices that few buyers ever paid.
            </p>
            <p>
              We wanted a simpler way to see which gaming desktops are actually cheaper right now, by how much, and
              compared with what. ClearanceStream is that tool.
            </p>

            <h2>How we find deals</h2>
            <p>
              Every day, ClearanceStream requests current listings for the brands we track through an official
              retail product feed. We filter out unrelated products, read the current price and reference price for
              each listing, and rank the results by the size of the discount.
            </p>
            <p>
              We never invent, estimate, or edit prices. If the feed does not return a price for a product, we do not
              show it. Every deal displays the exact time its price was checked, and prices can change after that time, so
              always confirm the final price at checkout.
            </p>

            <h2>What we cover</h2>
            <p>
              We track {BRANDS.length} of the biggest gaming brands across gaming PCs and laptops, mice, keyboards and
              headsets, and controllers and racing gear. See them all on our <Link href="/brands">brands page</Link>. Alongside live deals, we publish{" "}
              <Link href="/blog">buying guides</Link> that explain how to judge a gaming PC discount on the value of
              the components inside, not just the percentage on the tag.
            </p>

            <h2>Who writes our guides</h2>
            <ul>
              {AUTHORS.map((a) => (
                <li key={a.slug}>
                  <Link href={authorPath(a)}>{a.name}</Link>, {a.role}. {a.bio[0].split(". ")[0]}.
                </li>
              ))}
            </ul>

            <h2>How we make money</h2>
            <p>
              ClearanceStream is free to use. We may earn a commission from qualifying purchases made through links on
              this site. That commission does not change the price you pay, and it has no influence on which deals
              appear or how they are ranked: listings are ordered by discount. Read our full <Link href="/disclaimer">affiliate disclaimer</Link>.
            </p>

            <h2>Get in touch</h2>
            <p>
              Spotted a problem with a listing, want us to track a brand, or have feedback on the site? We would like to
              hear from you. <Link href="/contact">Contact us</Link>.
            </p>
          </div>
          <aside className="aside">
            <div className="aside-box">
              <h2>Our principles</h2>
              <ul style={{ gap: 16 }}>
                <li style={{ display: "flex", gap: 10 }}>
                  <ShieldIcon style={{ width: 18, height: 18, color: "var(--blue)", flexShrink: 0, marginTop: 3 }} />
                  <span>Real, live prices only</span>
                </li>
                <li style={{ display: "flex", gap: 10 }}>
                  <RadarIcon style={{ width: 18, height: 18, color: "var(--blue)", flexShrink: 0, marginTop: 3 }} />
                  <span>Checked every day, timestamped on every deal</span>
                </li>
                <li style={{ display: "flex", gap: 10 }}>
                  <FilterIcon style={{ width: 18, height: 18, color: "var(--blue)", flexShrink: 0, marginTop: 3 }} />
                  <span>Ranked by discount, never by commission</span>
                </li>
              </ul>
            </div>
          </aside>
        </div>
      </section>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "AboutPage",
          url: absoluteUrl("/about"),
          name: `About ${SITE.name}`,
          about: { "@id": ORGANIZATION_ID },
        }}
      />
    </>
  );
}
