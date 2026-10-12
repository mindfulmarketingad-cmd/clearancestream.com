import Link from "next/link";
import { SWITCH_TYPES } from "@/lib/switches";

/** Chip links to every keyboard switch-type page, for hubs and related sections. */
export function SwitchLinks({ title = "Shop keyboards by switch type", current }: { title?: string; current?: string }) {
  return (
    <nav aria-label="Keyboards by switch type" className="link-directory">
      <h2 className="sub-head" style={{ marginBottom: 16 }}>
        {title}
      </h2>
      <ul className="chip-list">
        <li>
          <Link href="/switches" className="chip">
            All switch types
          </Link>
        </li>
        {SWITCH_TYPES.filter((s) => s.slug !== current).map((s) => (
          <li key={s.slug}>
            <Link href={`/switches/${s.slug}`} className="chip">
              {s.heading.replace(/^Best /, "")}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
