import Link from "next/link";
import { LegalPage } from "@/components/LegalPage";
import { pageMetadata } from "@/lib/seo";
import { SITE } from "@/lib/site";

export const metadata = pageMetadata({
  title: "Affiliate Disclaimer",
  description:
    "How ClearanceStream earns money through the Amazon Associates program, how prices are sourced and displayed, and the limits of the information on this site.",
  path: "/disclaimer",
});

export default function DisclaimerPage() {
  return (
    <LegalPage
      title="Disclaimer"
      path="/disclaimer"
      lede="How ClearanceStream earns money, where our prices come from, and the limits of the information we publish."
    >
      <h2 className="mt-0">Affiliate disclosure</h2>
      <p>
        <strong>As an Amazon Associate, {SITE.name} earns from qualifying purchases.</strong> {SITE.name} is a
        participant in the Amazon Services LLC Associates Program, an affiliate advertising program designed to provide
        a means for sites to earn advertising fees by advertising and linking to Amazon.com.
      </p>
      <p>
        When you click a link to Amazon on this site and make a purchase, we may receive a commission. This comes at no
        additional cost to you: the price you pay on Amazon is the same whether or not you use our link. Links to Amazon
        on this site are affiliate links, and they are marked as sponsored for search engines.
      </p>
      <p>
        Commissions do not influence which deals we show or how we rank them. Deals are ordered by the size of their
        current discount, calculated from Amazon&apos;s own price data.
      </p>

      <h2>Price and availability</h2>
      <p>
        Product prices and availability are accurate as of the date and time indicated and are subject to change. Any
        price and availability information displayed on Amazon at the time of purchase will apply to the purchase of
        the product.
      </p>
      <p>
        Prices on {SITE.name} are retrieved from Amazon through Amazon&apos;s official product API and refreshed about
        once a day. Each deal shows the time its price was last checked. Amazon may change a price, end a promotion,
        or sell out of an item at any time, including between our checks. Always confirm the final price and details on
        Amazon before you buy.
      </p>
      <p>
        Discount percentages and savings are calculated against the reference price Amazon provides, which may be a
        list price, a typical price, or a recent price. We display the type of reference where Amazon supplies it. A
        reference price is not a guarantee of any item&apos;s value or past selling price.
      </p>

      <h2>Product information</h2>
      <p>
        Product titles, images, specifications, and features are supplied by Amazon and the manufacturer. We do not
        independently verify every specification. If a detail matters to your purchase, check it on the Amazon product
        page and with the manufacturer.
      </p>

      <h2>Not professional advice</h2>
      <p>
        Our guides and commentary reflect our opinion and general research. They are provided for information only and
        are not financial or professional advice. Your purchase decisions are your own.
      </p>

      <h2>Trademarks</h2>
      <p>
        Amazon and the Amazon logo are trademarks of Amazon.com, Inc. or its affiliates. Corsair, Alienware, and all
        other product and company names are trademarks of their respective owners. Their use on this site is for
        identification only and does not imply endorsement by, or affiliation with, those companies.
      </p>

      <h2>Questions</h2>
      <p>
        If you have questions about this disclaimer, please <Link href="/contact">contact us</Link>. See also our{" "}
        <Link href="/terms">terms of use</Link> and <Link href="/privacy">privacy policy</Link>.
      </p>
    </LegalPage>
  );
}
