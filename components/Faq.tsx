import { faqLd } from "@/lib/seo";
import { PlusIcon } from "./Icons";
import { JsonLd } from "./JsonLd";

export function Faq({ items, withSchema = true }: { items: { q: string; a: string }[]; withSchema?: boolean }) {
  return (
    <div className="faq">
      {items.map((f) => (
        <details key={f.q}>
          <summary>
            {f.q}
            <PlusIcon />
          </summary>
          <p>{f.a}</p>
        </details>
      ))}
      {withSchema ? <JsonLd data={faqLd(items)} /> : null}
    </div>
  );
}
