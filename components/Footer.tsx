import Link from "next/link";
import { AFFILIATE_DISCLOSURE, FOOTER_NAV, SITE } from "@/lib/site";
import { FacebookIcon, InstagramIcon, XIcon } from "./Icons";
import { Logo } from "./Logo";

const SOCIAL = [
  { href: SITE.social.instagram, label: "Instagram", Icon: InstagramIcon },
  { href: SITE.social.twitter, label: "X (Twitter)", Icon: XIcon },
  { href: SITE.social.facebook, label: "Facebook", Icon: FacebookIcon },
];

export function Footer() {
  return (
    <footer className="site-footer">
      <div className="container">
        <div className="footer-top">
          <Logo />
          <nav className="footer-nav" aria-label="Footer">
            <ul>
              {FOOTER_NAV.map((item) => (
                <li key={item.href}>
                  <Link href={item.href}>{item.label}</Link>
                </li>
              ))}
            </ul>
          </nav>
          <ul className="social" aria-label="Social media">
            {SOCIAL.map(({ href, label, Icon }) => (
              <li key={label}>
                <a href={href} target="_blank" rel="noopener noreferrer me" aria-label={`${SITE.name} on ${label}`}>
                  <Icon />
                </a>
              </li>
            ))}
          </ul>
        </div>
        <div className="footer-bottom">
          <p>
            {AFFILIATE_DISCLOSURE} Prices and availability are accurate as of the time shown and are subject to change.
          </p>
          <p>&copy; {new Date().getFullYear()} {SITE.domain}</p>
        </div>
      </div>
    </footer>
  );
}
