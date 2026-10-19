import { BRAND_GUIDE_ICON, POSTS, getPost, postAuthor } from "@/lib/blog";
import { BRANDS, type Brand } from "@/lib/brands";
import { POST_CATEGORY, featuredImage } from "@/lib/featured-image";

export const dynamic = "force-static";

const brandIcon = (slug: string) => {
  const b: Brand | undefined = BRANDS.find((x) => slug === `how-to-find-discounts-for-${x.slug}-products`);
  return b ? BRAND_GUIDE_ICON[b.group] : undefined;
};

export function generateStaticParams() {
  return POSTS.map((p) => ({ slug: p.slug }));
}

export async function GET(_req: Request, { params }: { params: Promise<{ slug: string }> }) {
  const post = getPost((await params).slug);
  if (!post) return new Response("Not found", { status: 404 });
  const author = postAuthor(post);
  return featuredImage({
    eyebrow: "Buying guide",
    title: post.title,
    footer: `By ${author.name}  ·  ${post.readingMinutes} min read`,
    category: POST_CATEGORY[post.slug] ?? brandIcon(post.slug) ?? "deals",
  });
}
