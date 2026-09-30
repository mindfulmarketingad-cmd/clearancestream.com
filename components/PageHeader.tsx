import type { ReactNode } from "react";
import type { Crumb } from "@/lib/seo";
import { Breadcrumbs } from "./Breadcrumbs";

export function PageHeader({
  crumbs,
  title,
  lede,
  children,
}: {
  crumbs: Crumb[];
  title?: ReactNode;
  lede?: ReactNode;
  children?: ReactNode;
}) {
  return (
    <header className="page-header">
      <div className="container">
        <Breadcrumbs items={crumbs} />
        {title ? <h1>{title}</h1> : null}
        {lede ? <p className="lede">{lede}</p> : null}
        {children}
      </div>
    </header>
  );
}
