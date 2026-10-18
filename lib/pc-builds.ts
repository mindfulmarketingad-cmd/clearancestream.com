import { checkBuild, coolerFits, estimatedWatts, PART_TYPES, recommendedPsu, type Build, type Check, type Part, type PartTypeId } from "./pc-parts";

/**
 * Curated PC builds generated from the current parts snapshot. Each definition
 * states the rules for choosing parts; the parts themselves (and so the price)
 * change with every data refresh.
 */
export type BuildDef = {
  slug: string;
  /** Title tag and H1; "{price}" is replaced with the build total. */
  title: string;
  /** Short name used in links and cards. */
  name: string;
  summary: string;
  audience: string;
  cpu: (p: Part) => boolean;
  /** Pick from the matching CPUs, cheapest first. */
  cpuPick: "cheapest" | "cheapest-total";
  minMemoryGb: number;
  gpu: ((p: Part) => boolean) | null;
  storage: { minGb: number; nvme: boolean };
  /** Add an aftermarket cooler even if the CPU may include one. */
  cooler: boolean;
  psuEfficiency: RegExp | null;
  /** The sister build linked from this one. */
  related: string[];
};

const isAmd = (p: Part) => /^AM[45]$/.test(p.specs.socket ?? "");
const isIntel = (p: Part) => /^LGA/.test(p.specs.socket ?? "");
const radeon = (p: Part) => /\b(radeon|rx\s?\d{4})\b/i.test(`${p.name} ${p.specs.gpuModel ?? ""}`);
const geforce = (p: Part) => /\b(geforce|rtx|gtx)\b/i.test(`${p.name} ${p.specs.gpuModel ?? ""}`);
const vram = (p: Part) => parseInt(p.specs.vram ?? "0", 10);

export const BUILD_DEFS: BuildDef[] = [
  {
    slug: "amd-gaming-build",
    title: "AMD Gaming Build [{price}]",
    name: "AMD Gaming Build",
    summary: "An all-AMD gaming PC on the AM5 platform: a modern Ryzen CPU, a 16GB Radeon video card, DDR5 memory, and a fast NVMe SSD.",
    audience: "high settings at 1080p and 1440p in today's most popular games, with an upgrade path for future Ryzen CPUs",
    cpu: (p) => p.specs.socket === "AM5" && (p.specs.cores ?? 0) >= 6,
    cpuPick: "cheapest",
    minMemoryGb: 32,
    gpu: (p) => radeon(p) && vram(p) >= 16,
    storage: { minGb: 1000, nvme: true },
    cooler: true,
    psuEfficiency: /gold|platinum|titanium/i,
    related: ["intel-gaming-build", "home-office-build"],
  },
  {
    slug: "intel-gaming-build",
    title: "Intel Gaming PC Build [{price}]",
    name: "Intel Gaming PC Build",
    summary: "An Intel gaming PC built around a current Core processor and a GeForce RTX video card, with DDR5 memory and a fast NVMe SSD.",
    audience: "high settings at 1080p and 1440p in today's most popular games, with strong multi-core performance for streaming and creative work",
    cpu: (p) => isIntel(p) && (p.specs.cores ?? 0) >= 14,
    cpuPick: "cheapest",
    minMemoryGb: 32,
    gpu: (p) => geforce(p) && vram(p) >= 16,
    storage: { minGb: 1000, nvme: true },
    cooler: true,
    psuEfficiency: /gold|platinum|titanium/i,
    related: ["amd-gaming-build", "home-office-build"],
  },
  {
    slug: "home-office-build",
    title: "Budget Home Office PC Build [{price}]",
    name: "Budget Home Office PC Build",
    summary: "A low-cost desktop for work and school: a processor with built-in graphics, 16GB of memory, and a solid state drive, with no separate video card.",
    audience: "office apps, web browsing, video calls, streaming video, and light photo editing",
    cpu: (p) => p.specs.igpu === true && (p.specs.cores ?? 6) >= 6,
    cpuPick: "cheapest-total",
    minMemoryGb: 16,
    gpu: null,
    storage: { minGb: 500, nvme: false },
    cooler: false,
    psuEfficiency: /80\s?plus|bronze|gold/i,
    related: ["amd-gaming-build", "intel-gaming-build"],
  },
];

export const getBuildDef = (slug: string) => BUILD_DEFS.find((b) => b.slug === slug);

/** Order parts are listed in, matching the PC Builder. */
export const BUILD_ORDER: PartTypeId[] = ["cpu", "cooler", "motherboard", "memory", "storage", "gpu", "case", "psu"];

export type GeneratedBuild = {
  def: BuildDef;
  build: Build;
  total: number;
  /** Sum of reference prices for discounted parts, when any part is discounted. */
  savings: number;
  watts: number;
  recommendedPsu: number;
  checks: Check[];
  title: string;
};

const byPrice = (a: Part, b: Part) => a.price - b.price;
const cheapest = (parts: Part[], f: (p: Part) => boolean) => parts.filter(f).sort(byPrice)[0];

/** Whether a CPU's listing says a cooler is in the box. */
export function cpuIncludesCooler(cpu: Part) {
  if (/\b(with|includes?)\b.*\bcooler\b/i.test(cpu.name)) return true;
  // Boxed non-K Intel and non-X Ryzen 5 / 7 parts generally ship with a cooler; unlocked parts do not.
  if (isIntel(cpu)) return !/\d{3,5}K/i.test(cpu.name) && !/core ultra/i.test(cpu.name);
  if (isAmd(cpu)) return !/\d{4}X(3D)?\b/i.test(cpu.name) && /ryzen\s+[57]\s/i.test(cpu.name);
  return false;
}

const listPrice = (p: Part) => {
  const n = p.listPriceDisplay ? Number(p.listPriceDisplay.replace(/[^0-9.]/g, "")) : NaN;
  return Number.isFinite(n) && n > p.price ? n : p.price;
};

export const money = (n: number) => n.toLocaleString("en-US", { style: "currency", currency: "USD", minimumFractionDigits: 2 });
const moneyRound = (n: number) => n.toLocaleString("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 });

/** Choose parts for a build definition, or null when the snapshot cannot complete it. */
export function generateBuild(def: BuildDef, parts: Record<PartTypeId, Part[]>): GeneratedBuild | null {
  const cpus = (parts.cpu ?? []).filter((p) => p.specs.socket && def.cpu(p)).sort(byPrice);

  // Cheapest motherboard + memory pair for a CPU.
  const platformFor = (cpu: Part) => {
    let best: { mb: Part; memory: Part; cost: number } | null = null;
    for (const mb of parts.motherboard ?? []) {
      if (mb.specs.socket !== cpu.specs.socket || !mb.specs.memoryType || !mb.specs.formFactor) continue;
      const memory = cheapest(parts.memory ?? [], (m) => m.specs.memoryType === mb.specs.memoryType && (m.specs.capacityGb ?? 0) >= def.minMemoryGb);
      if (!memory) continue;
      const cost = mb.price + memory.price;
      if (!best || cost < best.cost) best = { mb, memory, cost };
    }
    return best;
  };

  let cpu: Part | undefined;
  let platform: ReturnType<typeof platformFor> = null;
  if (def.cpuPick === "cheapest") {
    for (const c of cpus) {
      platform = platformFor(c);
      if (platform) {
        cpu = c;
        break;
      }
    }
  } else {
    let bestCost = Infinity;
    for (const c of cpus) {
      const p = platformFor(c);
      if (p && c.price + p.cost < bestCost) {
        bestCost = c.price + p.cost;
        cpu = c;
        platform = p;
      }
    }
  }
  if (!cpu || !platform) return null;

  const build: Build = { cpu, motherboard: platform.mb, memory: platform.memory };

  if (def.gpu) {
    const gpu = cheapest(parts.gpu ?? [], def.gpu) ?? cheapest(parts.gpu ?? [], (p) => vram(p) >= 12);
    if (!gpu) return null;
    build.gpu = gpu;
  }

  const storageOk = (p: Part, gb: number) => (p.specs.capacityGb ?? 0) >= gb && (def.storage.nvme ? p.specs.interface === "NVMe" : /SSD|NVMe/.test(p.specs.interface ?? ""));
  const one = cheapest(parts.storage ?? [], (p) => storageOk(p, def.storage.minGb));
  // Step up to double the capacity when it costs little more.
  const two = cheapest(parts.storage ?? [], (p) => storageOk(p, def.storage.minGb * 2));
  build.storage = two && one && two.price <= one.price * 1.35 ? two : one;
  if (!build.storage) return null;

  if (def.cooler || !cpuIncludesCooler(cpu)) {
    build.cooler = cheapest(parts.cooler ?? [], (p) => p.specs.coolerType === "Air" && !!p.specs.sockets && coolerFits(p.specs.sockets, cpu.specs.socket!));
  }

  const formFactor = platform.mb.specs.formFactor!;
  build.case = cheapest(parts.case ?? [], (p) => !!p.specs.fits?.includes(formFactor) && (def.gpu ? p.specs.formFactor !== "Mini-ITX" : true));
  if (!build.case) return null;

  const watts = estimatedWatts(build);
  const need = recommendedPsu(watts);
  build.psu =
    (def.psuEfficiency && cheapest(parts.psu ?? [], (p) => (p.specs.capacity ?? 0) >= need && def.psuEfficiency!.test(p.specs.efficiency ?? ""))) ||
    cheapest(parts.psu ?? [], (p) => (p.specs.capacity ?? 0) >= need);
  if (!build.psu) return null;

  const checks = checkBuild(build);
  if (checks.some((c) => c.level === "error")) return null;
  const chosen = BUILD_ORDER.map((t) => build[t]).filter((p): p is Part => !!p);
  const total = chosen.reduce((n, p) => n + p.price, 0);
  const savings = chosen.reduce((n, p) => n + (listPrice(p) - p.price), 0);
  return {
    def,
    build,
    total,
    savings,
    watts,
    recommendedPsu: need,
    checks,
    title: def.title.replace("{price}", moneyRound(total)),
  };
}

export const partLabel = (id: PartTypeId) => PART_TYPES.find((t) => t.id === id)?.label ?? id;
