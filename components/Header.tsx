import Link from "next/link";
import { BRAND_GROUPS, brandsInGroup } from "@/lib/brands";
import { MAIN_NAV } from "@/lib/site";
import { MenuIcon } from "./Icons";
import { LiveSearch } from "./LiveSearch";
import { Logo } from "./Logo";
import { NavLink } from "./NavLink";

const DEALS_MENU = [
  { href: "/deals/today", label: "Today’s Tech Deals" },
  { href: "/deals", label: "All deals" },
  { href: "/coupons", label: "Coupon codes" },
];

export function Header() {
  return (
    <header className="site-header">
      <div className="container header-inner">
        <Logo />
        <LiveSearch id="header-q" />
        <nav className="main-nav" aria-label="Main">
          <ul>
            {MAIN_NAV.map((item) =>
              item.href === "/brands" ? (
                <li key={item.href} className="has-menu">
                  <NavLink href={item.href}>{item.label}</NavLink>
                  <div className="submenu mega">
                    {BRAND_GROUPS.map((g) => (
                      <div key={g.id} className="mega-col">
                        <span className="mega-title">{g.name}</span>
                        <ul>
                          {brandsInGroup(g.id).map((b) => (
                            <li key={b.slug}>
                              <Link href={`/brands/${b.slug}`}>{b.name}</Link>
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                    <div className="mega-all">
                      <Link href="/brands">All brands</Link>
                    </div>
                  </div>
                </li>
              ) : item.href === "/deals" ? (
                <li key={item.href} className="has-menu">
                  <NavLink href={item.href}>{item.label}</NavLink>
                  <ul className="submenu">
                    {DEALS_MENU.map((d) => (
                      <li key={d.href}>
                        <Link href={d.href}>{d.label}</Link>
                      </li>
                    ))}
                  </ul>
                </li>
              ) : (
                <li key={item.href}>
                  <NavLink href={item.href}>{item.label}</NavLink>
                </li>
              ),
            )}
          </ul>
        </nav>
        <details className="mobile-menu">
          <summary aria-label="Open menu">
            <MenuIcon />
          </summary>
          <div className="mobile-panel">
            <nav aria-label="Mobile">
              <ul>
                {MAIN_NAV.map((item) => (
                  <li key={item.href}>
                    <Link href={item.href}>{item.label}</Link>
                    {item.href === "/deals" ? (
                      <ul className="sub">
                        <li>
                          <Link href="/deals/today">Today’s Tech Deals</Link>
                        </li>
                      </ul>
                    ) : null}
                  </li>
                ))}
              </ul>
            </nav>
            <LiveSearch id="mobile-q" />
          </div>
        </details>
      </div>
    </header>
  );
}
