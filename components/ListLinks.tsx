import Link from "next/link";
import { CATEGORIES } from "@/lib/categories";
import type { ResolvedList } from "@/lib/lists";

/** Chip links to a set of lists. */
export function ListChips({ lists }: { lists: ResolvedList[] }) {
  return (
    <ul className="chip-list">
      {lists.map((l) => (
        <li key={l.def.slug}>
          <Link href={`/lists/${l.def.slug}`} className="chip">
            {l.shortTitle}
          </Link>
        </li>
      ))}
    </ul>
  );
}

/**
 * Every indexable list, grouped by category, so all list pages link to each
 * other. Groups other than the current category start collapsed.
 */
export function ListDirectory({ lists, current, openCategory }: { lists: ResolvedList[]; current?: string; openCategory?: string }) {
  const indexable = lists.filter((l) => l.indexable && l.def.slug !== current);
  return (
    <nav aria-label="All lists" className="link-directory">
      <h2 className="sub-head" style={{ marginBottom: 16 }}>
        Browse every list
      </h2>
      {CATEGORIES.map((c) => {
        const group = indexable.filter((l) => l.def.category.slug === c.slug);
        if (group.length === 0) return null;
        return (
          <details key={c.slug} className="link-group" open={c.slug === openCategory}>
            <summary>
              {c.plural} <span className="muted">({group.length})</span>
            </summary>
            <ListChips lists={group} />
          </details>
        );
      })}
    </nav>
  );
}
