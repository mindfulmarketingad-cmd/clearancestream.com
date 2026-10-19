import Script from "next/script";

export const GA_ID = "G-4PSY6VXM5V";
/** Google Ads tag, configured on the same gtag.js loader as Analytics. */
export const ADS_ID = "AW-18266125976";

/** Google Analytics 4 and Google Ads (gtag.js), loaded after the page becomes interactive. */
export function GoogleAnalytics() {
  return (
    <>
      <Script src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`} strategy="afterInteractive" />
      <Script id="ga4" strategy="afterInteractive">
        {`window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());
gtag('config', '${GA_ID}');
gtag('config', '${ADS_ID}');`}
      </Script>
    </>
  );
}
