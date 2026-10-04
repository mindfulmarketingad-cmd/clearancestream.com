import Link from "next/link";
import type { ReactNode } from "react";

/**
 * Minimal Markdown renderer for blog posts. Supports the subset the posts use:
 * "## Heading {#id}", "### Heading", paragraphs, "- " and "1. " lists,
 * "| a | b |" tables (first row is the header), "> " callouts,
 * and inline **bold** and [links](/path).
 */

function inline(text: string): ReactNode[] {
  const out: ReactNode[] = [];
  const re = /\*\*(.+?)\*\*|\[(.+?)\]\((.+?)\)/g;
  let last = 0;
  let m: RegExpExecArray | null;
  while ((m = re.exec(text))) {
    if (m.index > last) out.push(text.slice(last, m.index));
    if (m[1] !== undefined) out.push(<strong key={m.index}>{inline(m[1])}</strong>);
    else
      out.push(
        <Link key={m.index} href={m[3]}>
          {m[2]}
        </Link>,
      );
    last = re.lastIndex;
  }
  if (last < text.length) out.push(text.slice(last));
  return out;
}

const cells = (row: string) =>
  row
    .trim()
    .replace(/^\||\|$/g, "")
    .split("|")
    .map((c) => c.trim());

function heading(line: string) {
  const m = line.match(/^(#{2,3})\s+(.+?)(?:\s+\{#([a-z0-9-]+)\})?$/);
  return m ? { level: m[1].length, text: m[2], id: m[3] } : null;
}

export function renderMarkdown(source: string): ReactNode {
  const blocks = source.trim().split(/\n\s*\n/);
  return blocks.map((block, i) => {
    const lines = block.split("\n").map((l) => l.trim());
    const h = heading(lines[0]);
    if (h && lines.length === 1) {
      return h.level === 2 ? (
        <h2 key={i} id={h.id}>
          {inline(h.text)}
        </h2>
      ) : (
        <h3 key={i} id={h.id}>
          {inline(h.text)}
        </h3>
      );
    }
    if (lines.every((l) => l.startsWith("- "))) {
      return (
        <ul key={i}>
          {lines.map((l, j) => (
            <li key={j}>{inline(l.slice(2))}</li>
          ))}
        </ul>
      );
    }
    if (lines.every((l) => /^\d+\.\s/.test(l))) {
      return (
        <ol key={i}>
          {lines.map((l, j) => (
            <li key={j}>{inline(l.replace(/^\d+\.\s/, ""))}</li>
          ))}
        </ol>
      );
    }
    if (lines.every((l) => l.startsWith("|"))) {
      const [head, , ...rows] = lines;
      return (
        <div key={i} className="table-scroll">
          <table className="spec-table">
            <thead>
              <tr>
                {cells(head).map((c, j) => (
                  <th key={j} scope="col">
                    {inline(c)}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {rows.map((r, j) => (
                <tr key={j}>
                  {cells(r).map((c, k) => (
                    <td key={k}>{inline(c)}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );
    }
    if (lines.every((l) => l.startsWith(">"))) {
      return (
        <p key={i} className="callout">
          {inline(lines.map((l) => l.replace(/^>\s?/, "")).join(" "))}
        </p>
      );
    }
    return <p key={i}>{inline(lines.join(" "))}</p>;
  });
}

/** Table of contents from the post's H2 headings, plus the FAQ the page appends. */
export function tocFromMarkdown(source: string) {
  const toc = source
    .split("\n")
    .map((l) => heading(l.trim()))
    .filter((h): h is { level: number; text: string; id: string } => !!h && h.level === 2 && !!h.id)
    .map((h) => ({ id: h.id, label: h.text.replace(/\*\*/g, "") }));
  return [...toc, { id: "faq", label: "FAQ" }];
}

export const wordCount = (source: string) => source.split(/\s+/).filter(Boolean).length;

/** Build the Post fields that derive from the Markdown body. */
export function markdownPost(source: string) {
  return {
    toc: tocFromMarkdown(source),
    readingMinutes: Math.max(1, Math.round(wordCount(source) / 230)),
    Body: function Body() {
      return <>{renderMarkdown(source)}</>;
    },
  };
}
