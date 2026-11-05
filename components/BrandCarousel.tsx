import { existsSync } from "node:fs";
import { join } from "node:path";
import Link from "next/link";
import { BRANDS, type Brand } from "@/lib/brands";
import { BrandLogo } from "./BrandLogo";

const hasLogo = (b: Brand) => ["svg", "png", "webp"].some((e) => existsSync(join(process.cwd(), "public", "brands", `${b.slug}.${e}`)));

/** One horizontally scrollable row of brand logos. Each brand appears once. */
export function BrandCarousel({ brands = BRANDS }: { brands?: Brand[] }) {
  const items = [...brands].sort((a, b) => Number(hasLogo(b)) - Number(hasLogo(a)));
  return (
    <div className="brand-carousel">
      <ul className="brand-track">
        {items.map((b) => (
          <li key={b.slug}>
            <Link href={`/brands/${b.slug}`} className="brand-tile">
              <BrandLogo brand={b} size={56} />
              <span>{b.name}</span>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
