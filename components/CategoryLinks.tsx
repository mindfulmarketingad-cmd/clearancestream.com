import Link from "next/link";
import type { Brand } from "@/lib/brands";
import { CATEGORIES } from "@/lib/categories";
import type { Deal } from "@/lib/deals";

/** Links to a brand's category pages that currently have deals, with counts. */
export function CategoryLinks({ brand, deals, current }: { brand: Brand; deals: Deal[]; current?: string }) {
  const counts = new Map<string, number>();
  for (const d of deals) counts.set(d.categorySlug, (counts.get(d.categorySlug) ?? 0) + 1);
  const cats = CATEGORIES.filter((c) => counts.has(c.slug));
  if (cats.length === 0) return null;

  return (
    <nav aria-label={`${brand.name} categories`} className="category-links">
      <ul className="chip-list">
        <li>
          <Link href={`/brands/${brand.slug}`} className="chip" aria-current={current ? undefined : "page"}>
            All {brand.name}
            <span className="chip-count">{deals.length}</span>
          </Link>
        </li>
        {cats.map((c) => (
          <li key={c.slug}>
            <Link
              href={`/brands/${brand.slug}/${c.slug}`}
              className="chip"
              aria-current={current === c.slug ? "page" : undefined}
            >
              {c.name}
              <span className="chip-count">{counts.get(c.slug)}</span>
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
