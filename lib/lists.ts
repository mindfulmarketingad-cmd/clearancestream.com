import { CATEGORIES, getCategory, type Category } from "./categories";
import type { Deal } from "./deals";
import { slugify } from "./slug";

/** Every list promises this many products; lists with fewer are noindex. */
export const LIST_SIZE = 10;
/** Lists with fewer products than this are not rendered at all. */
export const LIST_MIN = 3;

export type ListKind = "price" | "attribute" | "discounts" | "cheapest";

export type ListDef = {
  slug: string;
  /** Title without the leading count or year, e.g. "Best Gaming Laptops Under $1000". */
  label: string;
  category: Category;
  kind: ListKind;
  /** Short phrase used in intros, e.g. "under $1000". */
  qualifier: string;
  filter: (d: Deal) => boolean;
  sort?: (a: Deal, b: Deal) => number;
  /** Slug of an equivalent list this one should canonicalise to (identical product set). */
  canonical?: string;
};

const PRICE_CAPS: Record<string, number[]> = {
  "gaming-pcs": [800, 1000, 1200, 1500, 2000, 3000],
  laptops: [800, 1000, 1200, 1500, 2000],
  monitors: [200, 300, 500, 800],
  mice: [30, 50, 75, 100],
  keyboards: [50, 75, 100, 150, 1000, 1500, 2000],
  headsets: [50, 75, 100, 150, 200],
  controllers: [40, 60, 100, 200],
  streaming: [50, 100, 200],
  components: [50, 100, 150],
  accessories: [25, 50],
};

const GPUS = [
  "rtx-5090",
  "rtx-5080",
  "rtx-5070-ti",
  "rtx-5070",
  "rtx-5060-ti",
  "rtx-5060",
  "rtx-4090",
  "rtx-4080-super",
  "rtx-4070-ti-super",
  "rtx-4070-super",
  "rtx-4070",
  "rtx-4060-ti",
  "rtx-4060",
  "rtx-3050",
  "rx-9070-xt",
  "rx-9070",
  "rx-7800-xt",
  "rx-7600",
];

export function gpuName(slug: string) {
  return slug
    .split("-")
    .map((p) => (/^(rtx|rx|xt|xtx|gre)$/.test(p) ? p.toUpperCase() : p === "ti" ? "Ti" : p === "super" ? "Super" : p))
    .join(" ");
}

const has = (tag: string) => (d: Deal) => d.attrs.includes(tag);
const byPrice = (a: Deal, b: Deal) => a.price - b.price;
const bySavings = (a: Deal, b: Deal) => (b.savingsPercent ?? 0) - (a.savingsPercent ?? 0) || a.price - b.price;

/** Attribute lists: [category, tag, label prefix or full label, qualifier]. */
const ATTRIBUTE_LISTS: [string, string, string, string][] = [
  ["mice", "wireless", "Wireless Gaming Mice", "wireless"],
  ["mice", "wired", "Wired Gaming Mice", "wired"],
  ["mice", "lightweight", "Lightweight Gaming Mice", "lightweight"],
  ["mice", "ergonomic", "Ergonomic Gaming Mice", "ergonomic"],
  ["keyboards", "wireless", "Wireless Gaming Keyboards", "wireless"],
  ["keyboards", "mechanical", "Mechanical Gaming Keyboards", "mechanical"],
  ["keyboards", "compact", "Compact Gaming Keyboards", "compact (TKL, 75%, 65%, 60%)"],
  ["keyboards", "hot-swap", "Hot-Swappable Gaming Keyboards", "hot-swappable"],
  ["headsets", "wireless", "Wireless Gaming Headsets", "wireless"],
  ["headsets", "wired", "Wired Gaming Headsets", "wired"],
  ["headsets", "ps5", "PS5 Gaming Headsets", "PS5-compatible"],
  ["headsets", "xbox", "Xbox Gaming Headsets", "Xbox-compatible"],
  ["headsets", "switch", "Nintendo Switch Gaming Headsets", "Switch-compatible"],
  ["headsets", "noise-cancelling", "Noise-Cancelling Gaming Headsets", "noise-cancelling"],
  ["controllers", "wireless", "Wireless Controllers", "wireless"],
  ["controllers", "xbox", "Xbox Controllers", "Xbox"],
  ["controllers", "ps5", "PS5 Controllers", "PS5"],
  ["controllers", "switch", "Nintendo Switch Controllers", "Nintendo Switch"],
  ["monitors", "oled", "OLED Gaming Monitors", "OLED"],
  ["monitors", "4k", "4K Gaming Monitors", "4K"],
  ["monitors", "1440p", "1440p Gaming Monitors", "1440p"],
  ["monitors", "high-refresh", "240Hz+ Gaming Monitors", "240Hz and faster"],
  ["monitors", "curved", "Curved Gaming Monitors", "curved"],
  ["laptops", "oled", "Gaming Laptops With OLED Screens", "OLED"],
];

function build(): ListDef[] {
  const lists: ListDef[] = [];
  const add = (def: Omit<ListDef, "slug">) => lists.push({ ...def, slug: slugify(`${LIST_SIZE} ${def.label}`, 90) });

  for (const category of CATEGORIES) {
    for (const cap of PRICE_CAPS[category.slug] ?? []) {
      add({
        label: `Best ${category.plural} Under $${cap}`,
        category,
        kind: "price",
        qualifier: `under $${cap}`,
        filter: (d) => d.price < cap,
      });
    }
    add({
      label: `Biggest ${titleCase(category.noun)} Discounts Right Now`,
      category,
      kind: "discounts",
      qualifier: "with the biggest current discounts",
      filter: (d) => (d.savingsPercent ?? 0) >= 10,
      sort: bySavings,
    });
    add({
      label: `Cheapest ${category.plural} Right Now`,
      category,
      kind: "cheapest",
      qualifier: "at the lowest current prices",
      filter: () => true,
      sort: byPrice,
    });
  }

  for (const [cat, tag, label, qualifier] of ATTRIBUTE_LISTS) {
    const category = getCategory(cat)!;
    add({ label: `Best ${label}`, category, kind: "attribute", qualifier, filter: has(tag) });
  }

  // Wireless peripherals by price.
  for (const [cat, caps, plural] of [
    ["mice", [50, 100], "Wireless Gaming Mice"],
    ["keyboards", [100, 150], "Wireless Gaming Keyboards"],
    ["headsets", [100, 150], "Wireless Gaming Headsets"],
  ] as const) {
    for (const cap of caps) {
      add({
        label: `Best ${plural} Under $${cap}`,
        category: getCategory(cat)!,
        kind: "price",
        qualifier: `wireless, under $${cap}`,
        filter: (d) => d.attrs.includes("wireless") && d.price < cap,
      });
    }
  }

  // Gaming PCs and laptops by GPU.
  for (const gpu of GPUS) {
    for (const cat of ["gaming-pcs", "laptops"]) {
      const category = getCategory(cat)!;
      add({
        label: `Best ${category.plural} With ${gpuName(gpu)}`,
        category,
        kind: "attribute",
        qualifier: `with an ${gpuName(gpu)} graphics card`,
        filter: has(`gpu:${gpu}`),
      });
    }
  }

  // Controllers by platform and price.
  const controllers0 = getCategory("controllers")!;
  for (const [tag, name] of [["pc", "PC"], ["ps5", "PS5"], ["xbox", "Xbox"]] as const) {
    for (const cap of [300, 500]) {
      add({
        label: `Best ${name} Gaming Controllers Under $${cap}`,
        category: controllers0,
        kind: "price",
        qualifier: `for ${name}, under $${cap}`,
        filter: (d) => d.attrs.includes(tag) && d.price < cap,
      });
    }
  }

  // Prebuilt gaming PCs. Under $2000 has the same products as "Best Gaming PCs
  // Under $2000", so it canonicalises there instead of competing with it.
  const pcs = getCategory("gaming-pcs")!;
  for (const cap of [2000, 5000]) {
    add({
      label: `Best Prebuilt Gaming PCs Under $${cap}`,
      category: pcs,
      kind: "price",
      qualifier: `under $${cap}`,
      filter: (d) => d.price < cap,
      canonical: cap === 2000 ? slugify(`${LIST_SIZE} Best Gaming PCs Under $2000`, 90) : undefined,
    });
  }

  // Racing and flight gear.
  const controllers = getCategory("controllers")!;
  add({
    label: "Best Racing Wheels",
    category: controllers,
    kind: "attribute",
    qualifier: "racing wheels and pedal sets",
    filter: (d) => /\b(racing wheel|wheel and pedals?|steering wheel)\b/i.test(d.title),
  });
  add({
    label: "Best Flight Sticks and HOTAS Setups",
    category: controllers,
    kind: "attribute",
    qualifier: "flight sticks and HOTAS setups",
    filter: (d) => /\b(hotas|flight stick|joystick|yoke|throttle)\b/i.test(d.title),
  });

  return lists;
}

function titleCase(s: string) {
  return s.replace(/\b[a-z]/g, (c) => c.toUpperCase()).replace(/\bPc\b/, "PC");
}

export const LISTS: ListDef[] = build();

export function getListDef(slug: string) {
  return LISTS.find((l) => l.slug === slug);
}

/** Default ranking: real discounts first, then rating weighted by review count. */
function defaultRank(a: Deal, b: Deal) {
  const score = (d: Deal) => (d.savingsPercent ?? 0) * 2 + (d.rating ?? 0) * Math.log10((d.reviewCount ?? 0) + 10);
  return score(b) - score(a) || a.price - b.price;
}

export function resolveList(def: ListDef, deals: Deal[]) {
  const matches = deals
    .filter((d) => d.categorySlug === def.category.slug && d.inStock && def.filter(d))
    .sort(def.sort ?? defaultRank)
    .slice(0, LIST_SIZE);
  // Too few products to make a meaningful list: render an empty state instead.
  const items = matches.length >= LIST_MIN ? matches : [];
  const count = items.length > 0 ? `${items.length} ` : "";
  return {
    def,
    items,
    // e.g. "10 Best Gaming PCs Under $1500 - 2026 Updated List"
    title: `${count}${def.label} - ${new Date().getFullYear()} Updated List`,
    shortTitle: `${count}${def.label}`,
    indexable: items.length >= LIST_SIZE && !def.canonical,
    renderable: items.length >= LIST_MIN,
  };
}

export type ResolvedList = ReturnType<typeof resolveList>;

/** All lists that currently have enough products to render. */
export function liveLists(deals: Deal[]) {
  return LISTS.map((def) => resolveList(def, deals)).filter((l) => l.renderable);
}
