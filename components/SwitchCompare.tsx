import Link from "next/link";
import { SWITCH_TYPES } from "@/lib/switches";

/** Side-by-side comparison of every switch type, with live keyboard counts. */
export function SwitchCompare({ counts, current }: { counts: Record<string, number>; current?: string }) {
  return (
    <div className="table-scroll">
      <table className="spec-table list-glance switch-compare">
        <caption className="sr-only">Keyboard switch types compared</caption>
        <thead>
          <tr>
            <th scope="col">Switch type</th>
            <th scope="col">Feel</th>
            <th scope="col">Sound</th>
            <th scope="col">Best for</th>
            <th scope="col">Keyboards tracked</th>
          </tr>
        </thead>
        <tbody>
          {SWITCH_TYPES.map((s) => (
            <tr key={s.slug} aria-current={s.slug === current ? "page" : undefined}>
              <td>{s.slug === current ? <b>{s.short}</b> : <Link href={`/switches/${s.slug}`}>{s.short}</Link>}</td>
              <td>{s.compare.feel}</td>
              <td>{s.compare.sound}</td>
              <td>{s.compare.bestFor}</td>
              <td>{counts[s.slug] ?? 0}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
