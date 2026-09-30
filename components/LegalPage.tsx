import type { ReactNode } from "react";
import { formatDate } from "@/lib/format";
import { PageHeader } from "./PageHeader";

export const LEGAL_UPDATED = "2026-09-30";

export function LegalPage({ title, path, lede, children }: { title: string; path: string; lede: string; children: ReactNode }) {
  return (
    <>
      <PageHeader crumbs={[{ name: title, path }]} title={title} lede={lede}>
        <div className="page-meta">
          <span>
            Last updated <time dateTime={LEGAL_UPDATED}>{formatDate(LEGAL_UPDATED)}</time>
          </span>
        </div>
      </PageHeader>
      <section className="section-tight">
        <div className="container">
          <div className="prose">{children}</div>
        </div>
      </section>
    </>
  );
}
