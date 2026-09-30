import { gamingPcDealsGuide } from "./gaming-pc-deals-guide";
import { prebuiltBuyingGuide } from "./prebuilt-gaming-pc-buying-guide";
import { getAuthor, type Author } from "./authors";
import type { Post } from "./types";

export type { Author, Post };
export { AUTHORS, authorPath, getAuthor } from "./authors";

export const POSTS: Post[] = [gamingPcDealsGuide, prebuiltBuyingGuide];


export function getPost(slug: string): Post | undefined {
  return POSTS.find((p) => p.slug === slug);
}

export function postAuthor(post: Post): Author {
  const author = getAuthor(post.author);
  if (!author) throw new Error(`Unknown author ${post.author} on post ${post.slug}`);
  return author;
}

export function postsBy(authorSlug: string): Post[] {
  return POSTS.filter((p) => p.author === authorSlug);
}
