import { specTags } from "./attributes";
import type { Deal } from "./deals";

/**
 * Buyer's-guide detail for each product on a list: key specs, standout
 * features, price point, reasons to buy, reasons to avoid, and who it suits.
 * Everything is derived from the product's own listing data (title, feature
 * bullets, price, reference price, rating, reviews) and from how it compares
 * with the other products on the same list. Nothing is invented: a spec that
 * the listing does not state is simply not shown.
 */

export type Insight = {
  specs: [string, string][];
  features: string[];
  pricePoint: string;
  pros: string[];
  cons: string[];
  bestFor: string;
};

type ListStats = {
  minPrice: number;
  maxPrice: number;
  medianPrice: number;
  medianReviews: number;
  avgRating: number;
  cheapest: string;
  biggestDiscount: string | null;
  bestRated: string | null;
};

const CPU_NAMES: Record<string, string> = {
  "core-i5": "Intel Core i5",
  "core-i7": "Intel Core i7",
  "core-i9": "Intel Core i9",
  "core-ultra-5": "Intel Core Ultra 5",
  "core-ultra-7": "Intel Core Ultra 7",
  "core-ultra-9": "Intel Core Ultra 9",
  "ryzen-5": "AMD Ryzen 5",
  "ryzen-7": "AMD Ryzen 7",
  "ryzen-9": "AMD Ryzen 9",
};

const median = (xs: number[]) => {
  if (xs.length === 0) return 0;
  const s = [...xs].sort((a, b) => a - b);
  const m = Math.floor(s.length / 2);
  return s.length % 2 ? s[m] : (s[m - 1] + s[m]) / 2;
};

const money = (n: number) =>
  new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", maximumFractionDigits: n < 100 ? 2 : 0 }).format(n);

export function listStats(items: Deal[]): ListStats {
  const prices = items.map((d) => d.price);
  const rated = items.filter((d) => d.rating && (d.reviewCount ?? 0) >= 50);
  const discounted = items.filter((d) => (d.savingsPercent ?? 0) > 0);
  const bestRated = [...rated].sort(
    (a, b) => (b.rating ?? 0) - (a.rating ?? 0) || (b.reviewCount ?? 0) - (a.reviewCount ?? 0),
  )[0];
  return {
    minPrice: Math.min(...prices),
    maxPrice: Math.max(...prices),
    medianPrice: median(prices),
    medianReviews: median(items.map((d) => d.reviewCount ?? 0)),
    avgRating: rated.length ? rated.reduce((n, d) => n + (d.rating ?? 0), 0) / rated.length : 0,
    cheapest: [...items].sort((a, b) => a.price - b.price)[0]?.asin ?? "",
    biggestDiscount: discounted.sort((a, b) => (b.savingsPercent ?? 0) - (a.savingsPercent ?? 0))[0]?.asin ?? null,
    bestRated: bestRated?.asin ?? null,
  };
}

function gpuLabel(d: Deal) {
  const gpu = d.attrs.find((a) => a.startsWith("gpu:"));
  if (!gpu) return null;
  return gpu
    .slice(4)
    .split("-")
    .map((p) => (/^(rtx|rx|gtx|xt|xtx|gre)$/.test(p) ? p.toUpperCase() : p === "ti" ? "Ti" : p === "super" ? "Super" : p))
    .join(" ");
}

function match(text: string, re: RegExp) {
  return text.match(re)?.[1] ?? null;
}

/** Key specs stated in the listing, by category. */
export function specsFor(d: Deal): [string, string][] {
  const title = d.title;
  const text = `${d.title} ${d.features.join(" ")}`;
  const out: [string, string][] = [];
  const add = (k: string, v: string | null | undefined) => {
    if (v) out.push([k, v]);
  };
  const tags = specTags(title);
  const tag = (prefix: string) => tags.find((t) => t.startsWith(prefix))?.split(":")[1];
  const connection = d.attrs.includes("wireless") ? (/\bwired\b/i.test(text) ? "Wireless and wired" : "Wireless") : d.attrs.includes("wired") ? "Wired" : null;
  const platforms = [
    d.attrs.includes("pc") ? "PC" : null,
    d.attrs.includes("ps5") ? "PS5" : null,
    d.attrs.includes("xbox") ? "Xbox" : null,
    d.attrs.includes("switch") ? "Switch" : null,
  ].filter(Boolean);

  switch (d.categorySlug) {
    case "gaming-pcs":
    case "laptops": {
      // Prefer the exact model from the title (e.g. "AMD Ryzen 7 9800X3D", "Intel Core i7-14700F").
      const model =
        match(title, /\b((?:AMD\s+)?Ryzen\s+[3579]\s+\d{4}[A-Z0-9]*)\b/i) ??
        match(title, /\b((?:Intel\s+)?Core\s+Ultra\s+[579]\s+\d{3}[A-Z]*)\b/i) ??
        match(title, /\b((?:Intel\s+)?(?:Core\s+)?i[3579]-\d{4,5}[A-Z]*)\b/i);
      const cpuTag = tags.find((t) => t.startsWith("cpu:") && t !== "cpu:x3d")?.slice(4);
      const cpu = model
        ? model.replace(/^(?!AMD|Intel)(Ryzen)/i, "AMD $1").replace(/^(?!AMD|Intel)(Core)/i, "Intel $1").replace(/^(i[3579]-)/i, "Intel Core $1")
        : cpuTag
          ? `${CPU_NAMES[cpuTag] ?? cpuTag}${tags.includes("cpu:x3d") ? " X3D" : ""}`
          : null;
      add("Processor", cpu);
      add("Graphics", gpuLabel(d));
      const ram = tag("ram:");
      add("Memory", ram ? `${ram}GB` : null);
      const ssd = tag("ssd:");
      add("Storage", ssd ? `${ssd.toUpperCase()} SSD` : null);
      if (d.categorySlug === "laptops") {
        const screen = tag("screen:");
        const hz = match(title, /\b(\d{2,3})\s?hz\b/i);
        add("Display", screen ? `${screen}-inch${hz ? `, ${hz}Hz` : ""}` : hz ? `${hz}Hz` : null);
      }
      break;
    }
    case "monitors": {
      add("Screen size", match(title, /\b(\d{2}(?:\.\d)?)\s?(?:"|”|-?\s?inch|in\b)/i)?.concat(" in"));
      add("Resolution", d.attrs.includes("4k") ? "4K UHD" : d.attrs.includes("1440p") ? "1440p QHD" : /\b(1080p|fhd|full hd)\b/i.test(title) ? "1080p FHD" : null);
      add("Refresh rate", match(title, /\b(\d{2,3})\s?hz\b/i)?.concat("Hz"));
      add("Panel", /\bqd-?oled\b/i.test(title) ? "QD-OLED" : /\boled\b/i.test(title) ? "OLED" : /\bips\b/i.test(title) ? "IPS" : /\bva\b/i.test(title) ? "VA" : null);
      add("Shape", d.attrs.includes("curved") ? "Curved" : null);
      break;
    }
    case "mice": {
      add("Connection", connection);
      add("Weight", match(text, /\b(\d{2,3})\s?(?:g|grams)\b/i)?.concat("g"));
      const dpi = match(text, /\b(\d{1,2}[,.]?\d{3}|\d{2}k)\s?dpi\b/i);
      add("Sensor", dpi ? `Up to ${dpi.toUpperCase().replace("K", ",000")} DPI` : null);
      add("Battery", match(text, /\bup to (\d{2,3})\s?(?:hours|hrs)\b/i)?.concat(" hours"));
      add("Shape", d.attrs.includes("ergonomic") ? "Ergonomic" : /\bambidextrous|symmetr/i.test(text) ? "Ambidextrous" : null);
      break;
    }
    case "keyboards": {
      add("Connection", connection);
      add(
        "Layout",
        /\b60%/.test(title) ? "60%" : /\b65%/.test(title) ? "65%" : /\b75%/.test(title) ? "75%" : /\b(tkl|tenkeyless)\b/i.test(title) ? "Tenkeyless" : /\bfull[- ]?size\b/i.test(title) ? "Full-size" : null,
      );
      add(
        "Switches",
        /\bmagnetic|hall[- ]effect\b/i.test(text)
          ? "Magnetic (Hall effect)"
          : /\boptical\b/i.test(text)
            ? "Optical"
            : match(title, /\b(red|brown|blue|yellow|silver|black)\s+(?:linear\s+|tactile\s+|clicky\s+)?switch/i)?.replace(/^\w/, (c) => c.toUpperCase()).concat(" switches") ??
              (d.attrs.includes("mechanical") ? "Mechanical" : /\bmembrane\b/i.test(text) ? "Membrane" : null),
      );
      add("Hot-swappable", d.attrs.includes("hot-swap") ? "Yes" : null);
      break;
    }
    case "headsets": {
      add("Connection", connection);
      add("Platforms", platforms.length ? platforms.join(", ") : null);
      add("Drivers", match(text, /\b(\d{2})\s?mm\b/i)?.concat("mm"));
      add("Noise cancelling", d.attrs.includes("noise-cancelling") ? "Yes" : null);
      add("Battery", match(text, /\bup to (\d{2,3})\s?(?:hours|hrs)\b/i)?.concat(" hours"));
      break;
    }
    case "controllers": {
      add("Platforms", platforms.length ? platforms.join(", ") : null);
      add("Connection", connection);
      add("Sticks", /\b(hall[- ]effect|tmr)\b/i.test(text) ? "Hall effect / magnetic" : null);
      add("Back buttons", /\b(paddles?|back buttons?)\b/i.test(text) ? "Yes" : null);
      break;
    }
    default:
      add("Type", productType(title));
      add("Connection", connection);
  }
  add("Condition", d.condition && !/^new$/i.test(d.condition) ? d.condition : /\brenewed|refurbished\b/i.test(title) ? "Renewed" : null);
  return out.slice(0, 6);
}

const PRODUCT_TYPES: [RegExp, string][] = [
  [/\b(graphics card|geforce|radeon rx|rtx \d{4}|gpu)\b/i, "Graphics card"],
  [/\b(cpu cooler|air cooler|liquid cooler|aio|heatsink)\b/i, "CPU cooler"],
  [/\b(ryzen|core i[3579]|core ultra)\b.*\bprocessor\b|\bdesktop processor\b/i, "Processor"],
  [/\bmotherboard\b/i, "Motherboard"],
  [/\b(ddr[45]|desktop memory|ram kit)\b/i, "Memory"],
  [/\b(ssd|nvme|hard drive|hdd)\b/i, "Storage"],
  [/\b(power supply|psu)\b/i, "Power supply"],
  [/\b(case fans?|fan kit|\d+ ?mm fans?)\b/i, "Case fans"],
  [/\b(tower|pc case|chassis|mid-tower|full-tower)\b/i, "PC case"],
  [/\b(microphone|mic\b)/i, "Microphone"],
  [/\bwebcam\b/i, "Webcam"],
  [/\bcapture card\b/i, "Capture card"],
  [/\b(stream deck|stream controller)\b/i, "Stream controller"],
  [/\b(key light|ring light|light panel|lighting)\b/i, "Lighting"],
  [/\b(mouse ?pad|desk mat)\b/i, "Mouse pad"],
  [/\b(chair)\b/i, "Gaming chair"],
  [/\b(desk)\b/i, "Gaming desk"],
  [/\b(headset stand|headphone stand)\b/i, "Headset stand"],
  [/\b(charging|charger|dock)\b/i, "Charging"],
  [/\b(wrist rest)\b/i, "Wrist rest"],
  [/\b(cable|adapter|hub)\b/i, "Cables & hubs"],
  [/\b(speakers?|soundbar)\b/i, "Speakers"],
];

function productType(title: string): string | null {
  return PRODUCT_TYPES.find(([re]) => re.test(title))?.[1] ?? null;
}

/** Feature bullets worth surfacing, trimmed and de-marketed. */
function featuresFor(d: Deal): string[] {
  return d.features
    .map((f) => f.replace(/\s+/g, " ").trim())
    .filter((f) => f.length > 20)
    .slice(0, 3)
    .map((f) => {
      const [head, ...rest] = f.split(/\s[-–—:]\s|:\s/);
      const text = rest.length && head.length < 60 ? `${head}: ${rest.join(" - ")}` : f;
      return text.length > 180 ? `${text.slice(0, 177).replace(/\s+\S*$/, "")}...` : text;
    });
}

function pricePointFor(d: Deal, s: ListStats): string {
  const range = s.maxPrice - s.minPrice;
  const pos = range > 0 ? (d.price - s.minPrice) / range : 0.5;
  const tier =
    d.asin === s.cheapest ? "the lowest price among these picks" : pos <= 0.25 ? "a budget option among these picks" : pos >= 0.75 ? "a premium option among these picks" : "mid-range among these picks";
  const saving = d.savingsPercent && d.listPriceDisplay ? ` It is ${d.savingsPercent}% below its ${d.listPriceLabel?.toLowerCase() ?? "reference price"} of ${d.listPriceDisplay}.` : "";
  return `${d.priceDisplay}, ${tier} (picks range from ${money(s.minPrice)} to ${money(s.maxPrice)}).${saving}`;
}

function prosFor(d: Deal, s: ListStats, specs: [string, string][]): string[] {
  const pros: string[] = [];
  const spec = (k: string) => specs.find(([key]) => key === k)?.[1];
  if ((d.savingsPercent ?? 0) >= 10 && d.savingsDisplay) pros.push(`Genuinely discounted: ${d.savingsPercent}% off, saving ${d.savingsDisplay}`);
  if (d.rating && d.rating >= 4.5 && (d.reviewCount ?? 0) >= 500)
    pros.push(`Strong owner feedback: ${d.rating.toFixed(1)} out of 5 from ${d.reviewCount!.toLocaleString("en-US")} reviews`);
  else if (d.rating && d.rating >= 4.3 && (d.reviewCount ?? 0) >= 100) pros.push(`Well reviewed at ${d.rating.toFixed(1)} out of 5`);
  if (d.price <= s.medianPrice * 0.8) pros.push("Costs less than most of these picks");
  if (d.attrs.includes("wireless")) pros.push("Wireless, so no cable to manage");
  if (d.attrs.includes("hot-swap")) pros.push("Hot-swappable switches you can change later without soldering");
  if (d.attrs.includes("lightweight")) pros.push("Lightweight build for fast, low-fatigue aiming");
  if (d.attrs.includes("oled")) pros.push("OLED panel with deep blacks and very fast response");
  if (d.attrs.includes("high-refresh")) pros.push("240Hz or faster refresh for very smooth motion");
  if (d.attrs.includes("noise-cancelling")) pros.push("Noise cancelling for loud rooms");
  if (spec("Sticks")) pros.push("Hall effect sticks that resist drift");
  if (spec("Back buttons")) pros.push("Back buttons or paddles for faster inputs");
  const ram = Number(spec("Memory")?.replace("GB", "") ?? 0);
  if (ram >= 32) pros.push(`${ram}GB of memory, plenty for gaming plus multitasking`);
  const gpu = spec("Graphics");
  if (gpu && /\b(5070|5080|5090|4070|4080|4090|9070)\b/.test(gpu)) pros.push(`${gpu} graphics for high-refresh 1440p and beyond`);
  return pros.slice(0, 4);
}

function consFor(d: Deal, s: ListStats, specs: [string, string][]): string[] {
  const cons: string[] = [];
  const spec = (k: string) => specs.find(([key]) => key === k)?.[1];
  if (!d.savingsPercent) cons.push("Not discounted right now, so you pay the regular price");
  if (d.price >= s.medianPrice * 1.3 && d.asin !== s.cheapest) cons.push("Costs more than most of these picks");
  if ((d.reviewCount ?? 0) < 50) cons.push("Few reviews so far, so less of a track record");
  else if (d.rating && s.avgRating && d.rating < s.avgRating - 0.2) cons.push(`Rated a little lower (${d.rating.toFixed(1)}) than most of these picks`);
  if (spec("Condition") || /\b(renewed|refurbished)\b/i.test(d.title)) cons.push("Renewed rather than new: check the warranty and return window");
  if (d.attrs.includes("wired") && !d.attrs.includes("wireless") && ["mice", "keyboards", "headsets", "controllers"].includes(d.categorySlug))
    cons.push("Wired only");
  if (d.attrs.includes("wireless") && ["mice", "keyboards", "headsets", "controllers"].includes(d.categorySlug) && !spec("Battery"))
    cons.push("Needs charging; battery life is not stated in the listing");
  const ram = Number(spec("Memory")?.replace("GB", "") ?? 0);
  if (ram && ram <= 16) cons.push(`${ram}GB of memory; 32GB is better for heavy multitasking and future games`);
  const layout = spec("Layout");
  if (layout && /60%|65%/.test(layout)) cons.push("Compact layout drops dedicated keys some players rely on");
  if (d.dealBadge && /limited/i.test(d.dealBadge)) cons.push("Limited-time deal; the price may not last");
  return cons.slice(0, 3);
}

function bestForFor(d: Deal, s: ListStats, specs: [string, string][], shared: Set<string>): string {
  // Ignore traits every pick shares (e.g. "PS5" on a PS5 list): they do not tell picks apart.
  const has = (a: string) => d.attrs.includes(a) && !shared.has(a);
  if (d.asin === s.biggestDiscount) return "Bargain hunters who want the biggest real discount among these picks";
  if (d.asin === s.bestRated) return "Buyers who want the most proven, best-reviewed pick";
  if (d.asin === s.cheapest) return "Tight budgets";
  const spec = (k: string) => specs.find(([key]) => key === k)?.[1];
  if (spec("Back buttons")) return "Competitive players who want paddles or back buttons";
  if (spec("Sticks")) return "Players who want to avoid stick drift";
  if (has("ps5")) return "PS5 players";
  if (has("xbox")) return "Xbox players";
  if (has("switch")) return "Nintendo Switch players";
  if (has("lightweight")) return "Competitive FPS players";
  if (has("noise-cancelling")) return "Gaming in noisy rooms";
  if (has("oled")) return "Dark-room and HDR gaming";
  if (has("high-refresh")) return "Competitive players chasing high frame rates";
  if (has("hot-swap")) return "Tinkerers who want to customize switches";
  if (has("ergonomic")) return "Long sessions and palm-grip players";
  const gpu = spec("Graphics");
  if (gpu && /\b(5080|5090|4080|4090)\b/.test(gpu)) return "4K and maximum-settings gaming";
  if (gpu && /\b(5070|4070|9070)\b/.test(gpu)) return "High-refresh 1440p gaming";
  if (gpu && /\b(5060|4060|3050|7600)\b/.test(gpu)) return "1080p gaming on a budget";
  if (has("wireless")) return "A clean, cable-free setup";
  if (d.price >= s.medianPrice * 1.3) return "Buyers who want premium features and build quality";
  if (d.price <= s.medianPrice * 0.8) return "Value seekers who want the essentials for less";
  return "Most buyers looking for a dependable all-rounder";
}

export function listInsights(items: Deal[]): Map<string, Insight> {
  const s = listStats(items);
  const shared = new Set(items[0]?.attrs.filter((a) => items.every((d) => d.attrs.includes(a))) ?? []);
  const out = new Map<string, Insight>();
  for (const d of items) {
    const specs = specsFor(d);
    out.set(d.asin, {
      specs,
      features: featuresFor(d),
      pricePoint: pricePointFor(d, s),
      pros: prosFor(d, s, specs),
      cons: consFor(d, s, specs),
      bestFor: bestForFor(d, s, specs, shared),
    });
  }
  return out;
}
