import { featuredImage } from "@/lib/featured-image";
import { LISTS, LIST_SIZE, getListDef } from "@/lib/lists";

// Built once per deploy, like the list pages.
export const dynamic = "force-static";

export const dynamicParams = false;

export function generateStaticParams() {
  return LISTS.map((l) => ({ slug: l.slug }));
}

export async function GET(_req: Request, { params }: { params: Promise<{ slug: string }> }) {
  const def = getListDef((await params).slug);
  if (!def) return new Response("Not found", { status: 404 });
  return featuredImage({
    eyebrow: `${new Date().getFullYear()} updated list`,
    title: `${LIST_SIZE} ${def.label}`,
    footer: "Ranked by real discounts  ·  Prices checked weekly",
    category: def.category.slug,
  });
}
