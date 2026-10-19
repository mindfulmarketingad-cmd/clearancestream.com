import { areProControllersWorthIt } from "./posts/are-pro-controllers-worth-it";
import { bestTimeToBuyAGamingPc } from "./posts/best-time-to-buy-a-gaming-pc";
import { gamingLaptopVsGamingPc } from "./posts/gaming-laptop-vs-gaming-pc";
import { howMuchRamForGaming } from "./posts/how-much-ram-for-gaming";
import { howToFindPcBuildDeals } from "./posts/how-to-find-pc-build-deals";
import { howMuchShouldISpendOnAGamingPc } from "./posts/how-much-should-i-spend-on-a-gaming-pc";
import { mechanicalKeyboardSwitchesExplained } from "./posts/mechanical-keyboard-switches-explained";
import { oledVsIpsGamingMonitor } from "./posts/oled-vs-ips-gaming-monitor";
import { refurbishedGamingPcWorthIt } from "./posts/refurbished-gaming-pc-worth-it";
import { whatGraphicsCardDoINeed } from "./posts/what-graphics-card-do-i-need";
import { wirelessVsWiredGamingMouse } from "./posts/wireless-vs-wired-gaming-mouse";
import { gamingPcDealsGuide } from "./gaming-pc-deals-guide";
import { prebuiltBuyingGuide } from "./prebuilt-gaming-pc-buying-guide";
import { getAuthor, type Author } from "./authors";
import { BRAND_GUIDE_POSTS } from "./brand-guides";
import type { Post } from "./types";

export type { Author, Post };
export { AUTHORS, authorPath, getAuthor } from "./authors";

/** Pillar guides first; they stay pinned in navigation and sidebars. */
export const PILLAR_POSTS: Post[] = [gamingPcDealsGuide, prebuiltBuyingGuide];

export const POSTS: Post[] = [
  ...PILLAR_POSTS,
  howToFindPcBuildDeals,
  bestTimeToBuyAGamingPc,
  howMuchShouldISpendOnAGamingPc,
  gamingLaptopVsGamingPc,
  whatGraphicsCardDoINeed,
  howMuchRamForGaming,
  oledVsIpsGamingMonitor,
  mechanicalKeyboardSwitchesExplained,
  wirelessVsWiredGamingMouse,
  areProControllersWorthIt,
  refurbishedGamingPcWorthIt,
  ...BRAND_GUIDE_POSTS,
];

/** Editorial guides, without the per-brand discount guides. */
export const GUIDE_POSTS: Post[] = POSTS.filter((p) => !BRAND_GUIDE_POSTS.includes(p));
export { BRAND_GUIDE_POSTS, brandGuideSlug, BRAND_GUIDE_ICON } from "./brand-guides";


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
