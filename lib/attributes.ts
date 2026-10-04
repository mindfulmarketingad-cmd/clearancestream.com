/**
 * Product attributes parsed from titles and feature bullets. Each attribute is
 * a short tag ("wireless", "ps5", "gpu:rtx-5070-ti") used by list pages.
 */

type Rule = { tag: string; test: RegExp; not?: RegExp };

const RULES: Rule[] = [
  { tag: "wireless", test: /\b(wireless|lightspeed|hyperspeed|bluetooth|2\.4\s?ghz)\b/i },
  { tag: "wired", test: /\bwired\b/i, not: /\bwireless\b/i },
  { tag: "ps5", test: /\b(ps5|playstation\s?5|dualsense)\b/i },
  { tag: "xbox", test: /\bxbox\b/i },
  { tag: "switch", test: /\b(nintendo switch|switch 2|switch oled)\b/i },
  { tag: "mechanical", test: /\b(mechanical|optical switch(es)?|hot[- ]?swap(pable)?)\b/i },
  { tag: "compact", test: /\b(tkl|tenkeyless|60%|65%|75%|compact|mini)\b/i },
  { tag: "hot-swap", test: /\bhot[- ]?swap(pable)?\b/i },
  { tag: "lightweight", test: /\b(lightweight|ultra[- ]?light|ultralight)\b/i },
  { tag: "ergonomic", test: /\bergonomic\b/i },
  { tag: "oled", test: /\b(qd-?oled|w?oled)\b/i },
  { tag: "4k", test: /\b(4k|uhd|3840\s?x\s?2160)\b/i },
  { tag: "1440p", test: /\b(1440p|qhd|wqhd|2560\s?x\s?1440)\b/i },
  { tag: "high-refresh", test: /\b(2[4-9]\d|[3-5]\d\d)\s?hz\b/i },
  { tag: "curved", test: /\bcurved\b/i },
  { tag: "noise-cancelling", test: /\b(noise[- ]?cancell?ing|anc)\b/i },
  { tag: "rgb", test: /\brgb\b/i },
];

const GPU =
  /\b(?:geforce\s+)?(rtx)\s?(\d{4})\s?(ti super|ti|super)?\b|\b(?:radeon\s+)?(rx)\s?(\d{4})\s?(xtx|xt|gre)?\b/i;

export function gpuSlug(text: string): string | null {
  const m = text.match(GPU);
  if (!m) return null;
  const [family, num, suffix] = m[1] ? [m[1], m[2], m[3]] : [m[4], m[5], m[6]];
  return [family, num, suffix].filter(Boolean).join("-").toLowerCase().replace(/\s+/g, "-");
}

export function extractAttributes(title: string, features: string[]): string[] {
  const text = `${title} ${features.join(" ")}`;
  const tags = RULES.filter((r) => r.test.test(title) || r.test.test(text))
    .filter((r) => !(r.not && r.not.test(title)))
    .map((r) => r.tag);
  // "PC" platform only when the title says it explicitly (most products mention PC somewhere).
  if (/\b(pc|windows)\b/i.test(title)) tags.push("pc");
  const gpu = gpuSlug(title);
  if (gpu) tags.push(`gpu:${gpu}`);
  return [...new Set(tags)];
}

/**
 * Spec tags for gaming PCs and laptops, read from the product title only
 * (feature bullets often describe maximums like "supports up to 64GB").
 * Tags: ram:32, ssd:1tb, cpu:core-i7, cpu:ryzen-7, cpu:core-ultra-9, cpu:x3d, screen:16.
 */
export function specTags(title: string): string[] {
  const tags: string[] = [];
  // System memory, never graphics memory ("12GB GDDR6" does not match DDR).
  const ram = title.match(/\b(8|16|32|64|128)\s?GB\s*(?:of\s+)?(?:LP)?(?:DDR[45]X?|RAM|memory)\b/i);
  if (ram) tags.push(`ram:${ram[1]}`);
  const ssd = title.match(/\b(512\s?GB|1\s?TB|2\s?TB|4\s?TB)\s*(?:PCIe|NVMe|M\.2|SSD|Gen\s?[45]|storage)/i);
  if (ssd) tags.push(`ssd:${ssd[1].replace(/\s/g, "").toLowerCase()}`);
  const ultra = title.match(/\bcore\s+ultra\s+([579])\b/i);
  const core = title.match(/\b(?:core\s*)?i([579])[- ]?\d{4,5}[a-z]*\b/i);
  const ryzen = title.match(/\bryzen\s+([579])\b/i);
  if (ultra) tags.push(`cpu:core-ultra-${ultra[1]}`);
  else if (core) tags.push(`cpu:core-i${core[1]}`);
  if (ryzen) tags.push(`cpu:ryzen-${ryzen[1]}`);
  if (/\b\d{4}x3d\b/i.test(title)) tags.push("cpu:x3d");
  const screen = title.match(/\b(1[3-8])(?:\.\d)?\s?(?:"|”|''|-?\s?inch|in\b)/i);
  if (screen) tags.push(`screen:${screen[1]}`);
  return tags;
}
