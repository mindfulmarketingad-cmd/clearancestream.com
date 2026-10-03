import Link from "next/link";
import { LegalPage } from "@/components/LegalPage";
import { pageMetadata } from "@/lib/seo";
import { SITE } from "@/lib/site";

export const metadata = pageMetadata({
  title: "Privacy Policy",
  description:
    "How ClearanceStream collects, uses, and protects information, including contact form data, server logs, and affiliate links.",
  path: "/privacy",
});

export default function PrivacyPage() {
  return (
    <LegalPage
      title="Privacy Policy"
      path="/privacy"
      lede={`${SITE.name} is designed to collect as little information about you as possible. This policy explains what we do collect and why.`}
    >
      <h2 className="mt-0">Summary</h2>
      <ul>
        <li>You can use {SITE.name} without creating an account.</li>
        <li>We do not sell or rent your personal information.</li>
        <li>We do not set advertising or tracking cookies of our own.</li>
        <li>If you contact us, we use your details only to reply.</li>
      </ul>

      <h2>Information we collect</h2>
      <h3>Information you give us</h3>
      <p>
        When you use our <Link href="/contact">contact form</Link>, we collect your name, email address, the topic you
        choose, and your message. We use this information only to respond to you and to keep a record of the
        conversation.
      </p>
      <h3>Information collected automatically</h3>
      <p>
        Like most websites, our hosting provider automatically records technical information when you visit, such as
        your IP address, browser type, the pages you request, and the date and time of the request. These server logs
        are used to operate the site, protect it against abuse and attacks, and diagnose problems. They are retained
        for a limited period.
      </p>
      <h3>Search queries</h3>
      <p>
        Searches on {SITE.name} are processed to show you results. Search terms appear in the page URL and may be
        recorded in server logs as described above. Please do not enter personal information into the search box.
      </p>

      <h3>Deal alert emails</h3>
      <p>
        If you sign up for deal alerts, we collect your email address and use it only to send you deal and discount
        emails from {SITE.name}. Every email includes an unsubscribe link, and you can also ask us to delete your
        address through our <Link href="/contact">contact form</Link>. Our email provider stores your address on our
        behalf. We remember in your browser whether you have signed up or closed the sign-up window, so we do not keep
        asking you.
      </p>

      <h2>Cookies</h2>
      <p>
        {SITE.name} does not set its own advertising or analytics cookies. If we add analytics in the future, we will
        update this policy and, where required, ask for your consent.
      </p>

      <h2>Retailer and third-party links</h2>
      <p>
        {SITE.name} links to third-party retailers. When you click one of these links, you leave our site, and the
        retailer may use cookies and similar technologies to attribute your purchase to our affiliate account and for
        its own purposes. The retailer handles that data under its own privacy notice. We receive commission reports
        but no personal information that identifies you.
      </p>
      <p>
        Product images on our pages are loaded directly from the retailer&apos;s servers, which means the retailer
        receives standard request information (such as your IP address) when those images load. Our links to social media
        profiles are subject to those platforms&apos; own policies.
      </p>

      <h2>Service providers</h2>
      <p>
        We use trusted providers to host the site and deliver contact form emails. They process data only on our
        behalf and only as needed to provide their services.
      </p>

      <h2>How we protect information</h2>
      <p>
        The site is served exclusively over HTTPS with modern security headers. We do not store payment details, since
        all purchases are completed on the retailer&apos;s site. Access to contact messages is restricted to the {SITE.name} team.
      </p>

      <h2>Your rights</h2>
      <p>
        Depending on where you live, including under laws such as the California Consumer Privacy Act and the EU and UK
        General Data Protection Regulation, you may have the right to access, correct, or delete personal information we
        hold about you, and to object to or restrict certain processing. To make a request, use our{" "}
        <Link href="/contact">contact form</Link> and choose &quot;Privacy request&quot;. We will respond within the
        time required by applicable law.
      </p>

      <h2>Children</h2>
      <p>
        {SITE.name} is not directed at children under 13, and we do not knowingly collect personal information from
        children.
      </p>

      <h2>Changes to this policy</h2>
      <p>
        We may update this policy from time to time. The date at the top of the page shows when it was last changed.
      </p>
    </LegalPage>
  );
}
