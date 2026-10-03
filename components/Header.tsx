import Link from "next/link";
import { BRAND_GROUPS, brandsInGroup } from "@/lib/brands";
import { MAIN_NAV } from "@/lib/site";
import { MenuIcon, SearchIcon } from "./Icons";
import { Logo } from "./Logo";
import { NavLink } from "./NavLink";

function SearchForm({ id }: { id: string }) {
  return (
    <form className="header-search" action="/search" method="get" role="search">
      <label htmlFor={id} className="sr-only">
        Search gaming PC deals
      </label>
      <SearchIcon />
      <input id={id} name="q" type="search" placeholder="Search deals, GPUs, models" maxLength={80} autoComplete="off" />
    </form>
  );
}

export function Header() {
  return (
    <header className="site-header">
      <div className="container header-inner">
        <Logo />
        <SearchForm id="header-q" />
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
                  </li>
                ))}
              </ul>
            </nav>
            <SearchForm id="mobile-q" />
          </div>
        </details>
      </div>
    </header>
  );
}
