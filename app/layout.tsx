import type { Metadata, Viewport } from "next";
import { GeistSans } from "geist/font/sans";
import { Footer } from "@/components/Footer";
import { GoogleAnalytics } from "@/components/GoogleAnalytics";
import { Header } from "@/components/Header";
import { JsonLd } from "@/components/JsonLd";
import { SignupPopup } from "@/components/SignupPopup";
import { organizationLd } from "@/lib/seo";
import { SITE } from "@/lib/site";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: { default: `${SITE.tagline} | ${SITE.domain}`, template: `%s | ${SITE.domain}` },
  description: SITE.description,
  applicationName: SITE.name,
  referrer: "strict-origin-when-cross-origin",
  formatDetection: { telephone: false, email: false, address: false },
  manifest: "/manifest.webmanifest",
  openGraph: { siteName: SITE.name, locale: SITE.locale, type: "website" },
  twitter: { card: "summary_large_image" },
};

export const viewport: Viewport = {
  themeColor: "#ffffff",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={GeistSans.variable}>
      <body>
        <a href="#main" className="skip-link">
          Skip to content
        </a>
        <Header />
        <main id="main">{children}</main>
        <Footer />
        <SignupPopup />
        <JsonLd data={organizationLd()} />
        <GoogleAnalytics />
      </body>
    </html>
  );
}
