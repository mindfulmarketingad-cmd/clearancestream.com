import Link from "next/link";
import { LegalPage } from "@/components/LegalPage";
import { pageMetadata } from "@/lib/seo";
import { SITE } from "@/lib/site";

export const metadata = pageMetadata({
  title: "Terms of Use",
  description: "The terms that govern your use of ClearanceStream, including acceptable use, pricing information, and liability.",
  path: "/terms",
});

export default function TermsPage() {
  return (
    <LegalPage
      title="Terms of Use"
      path="/terms"
      lede={`These terms govern your use of ${SITE.domain}. By using the site, you agree to them.`}
    >
      <h2 className="mt-0">1. About the site</h2>
      <p>
        {SITE.name} publishes information about gaming PC prices and deals available on Amazon, along with buying
        guides. We do not sell products. All purchases are made on Amazon and are governed by Amazon&apos;s terms.
      </p>

      <h2>2. Pricing information</h2>
      <p>
        Prices and availability are retrieved from Amazon and are accurate as of the time shown. They may change at any
        time. We do not guarantee that any price, discount, or product shown will be available when you visit Amazon.
        See our <Link href="/disclaimer">disclaimer</Link> for details.
      </p>

      <h2>3. Acceptable use</h2>
      <p>You agree not to:</p>
      <ul>
        <li>attempt to gain unauthorised access to the site, its servers, or any connected systems;</li>
        <li>interfere with or disrupt the site, including through denial-of-service attacks, excessive automated
          requests, or the introduction of malicious code;</li>
        <li>scrape, copy, or republish the site&apos;s content or data in bulk, or use automated means to access the
          site other than through search engine crawlers that respect our robots.txt file;</li>
        <li>use the contact form to send spam, unlawful content, or content that infringes others&apos; rights;</li>
        <li>use the site in any way that breaks applicable law.</li>
      </ul>
      <p>We may block access from any person, network, or automated agent that breaches these terms.</p>

      <h2>4. Intellectual property</h2>
      <p>
        The {SITE.name} name, logo, design, guides, and original text are owned by {SITE.name} and protected by
        copyright and trademark law. You may share links to our pages and quote brief excerpts with attribution.
        Product names, images, and descriptions belong to their respective owners and are displayed under
        Amazon&apos;s program terms.
      </p>

      <h2>5. Third-party sites</h2>
      <p>
        The site links to Amazon and other third-party websites. We are not responsible for their content, products,
        policies, or practices. Your use of those sites is at your own risk and subject to their terms.
      </p>

      <h2>6. Disclaimer of warranties</h2>
      <p>
        The site and its content are provided &quot;as is&quot; and &quot;as available&quot;, without warranties of any
        kind, whether express or implied, including warranties of accuracy, completeness, fitness for a particular
        purpose, or non-infringement. We do not warrant that the site will be uninterrupted or error-free.
      </p>

      <h2>7. Limitation of liability</h2>
      <p>
        To the fullest extent permitted by law, {SITE.name} will not be liable for any indirect, incidental, special,
        consequential, or punitive damages, or for any loss arising from your use of the site, reliance on its content,
        or purchases made on third-party sites.
      </p>

      <h2>8. Changes</h2>
      <p>
        We may update these terms from time to time. The date at the top of the page shows when they were last changed.
        Continued use of the site after a change means you accept the updated terms.
      </p>

      <h2>9. Contact</h2>
      <p>
        Questions about these terms can be sent through our <Link href="/contact">contact page</Link>.
      </p>
    </LegalPage>
  );
}
