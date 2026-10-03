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
