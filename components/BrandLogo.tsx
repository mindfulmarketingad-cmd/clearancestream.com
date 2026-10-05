import { existsSync } from "node:fs";
import { join } from "node:path";
import type { Brand } from "@/lib/brands";

const EXTENSIONS = ["svg", "png", "webp"];

/**
 * Brand tile for coupon pages. Uses an official logo when one has been added at
 * public/brands/<slug>.<svg|png|webp>; otherwise shows the brand name as a
 * plain text badge (never an imitation of the brand's logo).
 */
export function BrandLogo({ brand, size = 72 }: { brand: Brand; size?: number }) {
  const ext = EXTENSIONS.find((e) => existsSync(join(process.cwd(), "public", "brands", `${brand.slug}.${e}`)));
  if (ext) {
    return (
      <span className="brand-logo" style={{ width: size, height: size }}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={`/brands/${brand.slug}.${ext}`} alt={`${brand.name} logo`} width={size} height={size} />
      </span>
    );
  }
  const word = brand.name.split(" ")[0].toUpperCase();
  // Scale the text so long names still fit inside the tile.
  const fontSize = Math.round(Math.min(size * 0.26, (size * 1.2) / word.length));
  return (
    <span className="brand-logo brand-logo-text" style={{ width: size, height: size, fontSize }} aria-label={brand.name} role="img">
      {word}
    </span>
  );
}
