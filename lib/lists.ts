import { specTags } from "./attributes";
import { BRANDS } from "./brands";
import { CATEGORIES, getCategory, type Category } from "./categories";
import type { Deal } from "./deals";
import { slugify } from "./slug";

/** Every list promises this many products; lists with fewer are noindex. */
export const LIST_SIZE = 10;
/** Lists with fewer products than this are not rendered at all. */
export const LIST_MIN = 3;

export type ListKind = "price" | "attribute" | "discounts" | "cheapest" | "brand" | "spec";

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
  /** Generated lists are dropped from the index when they near-duplicate another list. */
  generated?: boolean;
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

// Spec tags are derived from titles on demand, so they work on cached data too.
const specCache = new Map<string, string[]>();
function specs(d: Deal) {
  let tags = specCache.get(d.title);
  if (!tags) specCache.set(d.title, (tags = specTags(d.title)));
  return tags;
}
const hasSpec = (tag: string) => (d: Deal) => specs(d).includes(tag);

const CPUS: [string, string][] = [
  ["core-i5", "Intel Core i5"],
  ["core-i7", "Intel Core i7"],
  ["core-i9", "Intel Core i9"],
  ["core-ultra-7", "Intel Core Ultra 7"],
  ["core-ultra-9", "Intel Core Ultra 9"],
  ["ryzen-5", "AMD Ryzen 5"],
  ["ryzen-7", "AMD Ryzen 7"],
  ["ryzen-9", "AMD Ryzen 9"],
  ["x3d", "AMD Ryzen X3D"],
];

/** Shorter category names for "Best [Brand] ..." titles. */
const BRAND_PLURAL: Record<string, string> = {
  controllers: "Controllers",
  streaming: "Streaming Gear",
};
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
  const seen = new Set<string>();
  let generated = false;
  const add = (def: Omit<ListDef, "slug" | "generated">) => {
    const slug = slugify(`${LIST_SIZE} ${def.label}`, 90);
    // First definition wins if two generators produce the same title.
    if (seen.has(slug)) return;
    seen.add(slug);
    lists.push({ ...def, slug, generated });
  };

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

  // Everything below is generated in bulk and checked for near-duplicates.
  generated = true;

  // Gaming PCs and laptops by spec.
  for (const cat of ["gaming-pcs", "laptops"]) {
    const category = getCategory(cat)!;
    const caps = cat === "gaming-pcs" ? [1000, 1500, 2000] : [1000, 1500];
    for (const gb of [16, 32, 64]) {
      add({ label: `Best ${category.plural} With ${gb}GB RAM`, category, kind: "spec", qualifier: `with ${gb}GB of RAM`, filter: hasSpec(`ram:${gb}`) });
      for (const cap of caps) {
        add({
          label: `Best ${category.plural} With ${gb}GB RAM Under $${cap}`,
          category,
          kind: "price",
          qualifier: `with ${gb}GB of RAM, under $${cap}`,
          filter: (d) => hasSpec(`ram:${gb}`)(d) && d.price < cap,
        });
      }
    }
    for (const size of ["1tb", "2tb", "4tb"]) {
      const name = size.toUpperCase();
      add({ label: `Best ${category.plural} With ${name} SSD`, category, kind: "spec", qualifier: `with a ${name} SSD`, filter: hasSpec(`ssd:${size}`) });
    }
    for (const [tag, name] of CPUS) {
      const cpuLabel = tag === "x3d" ? `${name} CPUs` : name;
      add({
        label: `Best ${category.plural} With ${cpuLabel}`,
        category,
        kind: "spec",
        qualifier: `with an ${name} processor`,
        filter: hasSpec(`cpu:${tag}`),
      });
    }
    for (const gpu of GPUS) {
      for (const cap of caps) {
        add({
          label: `Best ${gpuName(gpu)} ${category.plural} Under $${cap}`,
          category,
          kind: "price",
          qualifier: `with an ${gpuName(gpu)}, under $${cap}`,
          filter: (d) => d.attrs.includes(`gpu:${gpu}`) && d.price < cap,
        });
      }
    }
  }
  const laptops = getCategory("laptops")!;
  for (const inch of [14, 15, 16, 17, 18]) {
    add({ label: `Best ${inch}-Inch Gaming Laptops`, category: laptops, kind: "spec", qualifier: `with a ${inch}-inch screen`, filter: hasSpec(`screen:${inch}`) });
  }
  add({ label: "Best Gaming Laptops With 240Hz+ Screens", category: laptops, kind: "spec", qualifier: "with a 240Hz or faster screen", filter: has("high-refresh") });

  // Brand x category.
  for (const brand of BRANDS) {
    for (const category of CATEGORIES) {
      const plural = BRAND_PLURAL[category.slug] ?? category.plural;
      // "Skytech Gaming" + "Gaming PCs" reads as "Skytech Gaming PCs".
      const name = plural.startsWith("Gaming ") ? brand.name.replace(/ Gaming$/, "") : brand.name;
      add({
        label: `Best ${name} ${plural}`,
        category,
        kind: "brand",
        qualifier: `from ${brand.name}`,
        filter: (d) => d.brandSlug === brand.slug,
      });
    }
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

/** Lists sharing this many of their 10 products are treated as duplicates. */
const DUPLICATE_OVERLAP = 7;

/** Human-readable specs for a PC or laptop, e.g. ["32GB RAM", "1TB SSD", "Intel Core i7"]. */
export function specSummary(d: Deal): string[] {
  return specs(d).flatMap((t) => {
    const [k, v] = t.split(":");
    if (k === "ram") return [`${v}GB RAM`];
    if (k === "ssd") return [`${v.toUpperCase()} SSD`];
    if (k === "cpu") return [CPUS.find(([c]) => c === v)?.[1] ?? v];
    if (k === "screen") return [`${v}-inch screen`];
    return [];
  });
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
    /** Slug of the list this one defers to: a fixed twin, or an earlier list with nearly the same products. */
    canonical: def.canonical as string | undefined,
    indexable: items.length >= LIST_SIZE && !def.canonical,
    renderable: items.length >= LIST_MIN,
  };
}

export type ResolvedList = ReturnType<typeof resolveList>;

let resolved: { key: string; lists: ResolvedList[] } | null = null;

/**
 * Resolve every list against the current catalog. A generated list whose
 * products mostly overlap another indexed list points its canonical there and
 * stays out of the index, so near-identical pages never compete. Hand-defined
 * lists are always kept.
 */
export function resolveAll(deals: Deal[]): ResolvedList[] {
  const key = `${deals.length}:${deals[0]?.fetchedAt ?? ""}:${deals.at(-1)?.asin ?? ""}`;
  if (resolved?.key === key) return resolved.lists;
  const lists = LISTS.map((def) => resolveList(def, deals));
  const accepted: { slug: string; asins: Set<string> }[] = [];
  for (const list of lists) {
    if (!list.indexable) continue;
    const asins = new Set(list.items.map((d) => d.asin));
    const twin = !list.def.generated ? undefined : accepted.find((a) => {
      let shared = 0;
      for (const asin of asins) if (a.asins.has(asin)) shared++;
      return shared >= DUPLICATE_OVERLAP;
    });
    if (twin) {
      list.canonical = twin.slug;
      list.indexable = false;
    } else accepted.push({ slug: list.def.slug, asins });
  }
  resolved = { key, lists };
  return lists;
}

/** All lists that currently have enough products to render. */
export function liveLists(deals: Deal[]) {
  return resolveAll(deals).filter((l) => l.renderable);
}

/**
 * Indexable lists that feature a brand: that brand's own lists first, then
 * lists where it has the most products.
 */
export function listsForBrand(lists: ResolvedList[], brandSlug: string, category?: string) {
  return lists
    .filter((l) => l.indexable && (!category || l.def.category.slug === category))
    .map((l) => ({ l, n: l.items.filter((d) => d.brandSlug === brandSlug).length }))
    .filter((x) => x.n > 0)
    .sort((a, b) => Number(b.l.def.kind === "brand") - Number(a.l.def.kind === "brand") || b.n - a.n)
    .map((x) => x.l);
}
