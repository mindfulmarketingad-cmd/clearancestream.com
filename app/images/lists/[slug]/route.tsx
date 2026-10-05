import { featuredImage } from "@/lib/featured-image";
import { LIST_SIZE, getListDef } from "@/lib/lists";

// Rendered on first request, then cached.
export const dynamic = "force-static";
export const revalidate = 604800;

export function generateStaticParams() {
  return [];
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
