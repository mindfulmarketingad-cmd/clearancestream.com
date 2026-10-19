import { existsSync } from "node:fs";
import { join } from "node:path";
import Link from "next/link";
import { BRANDS, type Brand } from "@/lib/brands";
import { BrandLogo } from "./BrandLogo";

const hasLogo = (b: Brand) => ["svg", "png", "webp"].some((e) => existsSync(join(process.cwd(), "public", "brands", `${b.slug}.${e}`)));

/**
 * Auto-scrolling row of brand logos linking to each brand page. The list is
 * rendered twice so the loop is seamless; the copy is hidden from assistive
 * tech and keyboard focus. Motion stops on hover, on focus, and for visitors
 * who prefer reduced motion (the row then scrolls by hand).
 */
export function BrandCarousel({ brands = BRANDS }: { brands?: Brand[] }) {
  // Brands with official logos lead the row.
  const items = [...brands].sort((a, b) => Number(hasLogo(b)) - Number(hasLogo(a)));
  const row = (copy: boolean) =>
    items.map((b) => (
      <li key={`${copy ? "c-" : ""}${b.slug}`} aria-hidden={copy || undefined}>
        <Link href={`/brands/${b.slug}`} tabIndex={copy ? -1 : undefined} className="brand-tile">
          <BrandLogo brand={b} size={56} />
          <span>{b.name}</span>
        </Link>
      </li>
    ));
  return (
    <div className="brand-carousel">
      <ul className="brand-track" style={{ animationDuration: `${items.length * 2.5}s` }}>
        {row(false)}
        {row(true)}
      </ul>
    </div>
  );
}
