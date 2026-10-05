import Link from "next/link";
import { BRAND_GROUPS, brandsInGroup } from "@/lib/brands";

/** Every brand page, grouped, so all brand pages link to each other. */
export function AllBrandLinks({
  current,
  title = "Browse every brand",
  hrefFor = (slug: string) => `/brands/${slug}`,
  label = "discounts",
}: {
  current?: string;
  title?: string;
  hrefFor?: (slug: string) => string;
  label?: string;
}) {
  return (
    <nav aria-label="All brands" className="link-directory">
      <h2 className="sub-head" style={{ marginBottom: 16 }}>
        {title}
      </h2>
      {BRAND_GROUPS.map((g) => {
        const brands = brandsInGroup(g.id).filter((b) => b.slug !== current);
        if (brands.length === 0) return null;
        return (
          <div key={g.id} className="link-group">
            <h3>{g.name}</h3>
            <ul className="chip-list">
              {brands.map((b) => (
                <li key={b.slug}>
                  <Link href={hrefFor(b.slug)} className="chip">
                    {b.name} {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        );
      })}
    </nav>
  );
}
