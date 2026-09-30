import Link from "next/link";
import { JsonLd } from "@/components/JsonLd";
import { PageHeader } from "@/components/PageHeader";
import { ORGANIZATION_ID, pageMetadata } from "@/lib/seo";
import { absoluteUrl } from "@/lib/site";
import { ContactForm } from "./ContactForm";

export const metadata = pageMetadata({
  title: "Contact ClearanceStream",
  description:
    "Contact the ClearanceStream team to report a listing issue, suggest a gaming PC brand to track, or ask a question about the site.",
  path: "/contact",
});

export default function ContactPage() {
  return (
    <>
      <PageHeader
        crumbs={[{ name: "Contact", path: "/contact" }]}
        title="Contact us"
        lede="Report a listing issue, suggest a brand for us to track, or send us a question. We read every message."
      />
      <section className="section-tight">
        <div className="container with-aside">
          <ContactForm />
          <aside className="aside">
            <div className="aside-box">
              <h2>Before you write</h2>
              <ul>
                <li>
                  Questions about an order, shipping, or returns go to Amazon, since purchases are completed there.
                </li>
                <li>
                  Prices can change after the time shown on a deal. See our <Link href="/disclaimer">disclaimer</Link>.
                </li>
                <li>
                  For data requests, choose &quot;Privacy request&quot; and see our <Link href="/privacy">privacy policy</Link>.
                </li>
              </ul>
            </div>
          </aside>
        </div>
      </section>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "ContactPage",
          url: absoluteUrl("/contact"),
          about: { "@id": ORGANIZATION_ID },
        }}
      />
    </>
  );
}
