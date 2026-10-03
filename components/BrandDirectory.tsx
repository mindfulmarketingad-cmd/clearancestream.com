import Link from "next/link";
import { BRAND_GROUPS, brandsInGroup } from "@/lib/brands";
import type { Deal } from "@/lib/deals";
import { ArrowRight } from "./Icons";

const counter = (deals: Deal[]) => {
  const counts = new Map<string, number>();
  for (const d of deals) counts.set(d.brandSlug, (counts.get(d.brandSlug) ?? 0) + 1);
  return counts;
};

/** All brands, grouped by what they make. `cards` adds a description per brand. */
export function BrandDirectory({
  deals = [],
  variant = "chips",
  headingLevel = 3,
}: {
  deals?: Deal[];
  variant?: "chips" | "cards";
  headingLevel?: 2 | 3;
}) {
  const counts = counter(deals);
  const Heading = headingLevel === 2 ? "h2" : "h3";

  return (
    <div className="brand-directory">
      {BRAND_GROUPS.map((group) => (
        <section key={group.id} aria-label={group.name}>
          <Heading className="group-heading">{group.name}</Heading>
          {variant === "cards" ? (
            <div className="card-grid">
              {brandsInGroup(group.id).map((b) => (
                <Link key={b.slug} href={`/brands/${b.slug}`} className="card brand-card">
                  <h3>{b.name}</h3>
                  <p className="clamp-3">{b.intro}</p>
                  <span className="text-link">
                    {counts.get(b.slug) ? `${counts.get(b.slug)} live ${counts.get(b.slug) === 1 ? "discount" : "discounts"}` : `${b.name} discounts and promos`}{" "}
                    <ArrowRight />
                  </span>
                </Link>
              ))}
            </div>
          ) : (
            <ul className="chip-list">
              {brandsInGroup(group.id).map((b) => (
                <li key={b.slug}>
                  <Link href={`/brands/${b.slug}`} className="chip">
                    {b.name}
                    {counts.get(b.slug) ? <span className="chip-count">{counts.get(b.slug)}</span> : null}
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </section>
      ))}
    </div>
  );
}
