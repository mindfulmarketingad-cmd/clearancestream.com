/**
 * PC Builder part types, spec parsing, and compatibility rules.
 *
 * Specs are parsed from each product's own listing (title and feature bullets)
 * at build time. When a listing does not state a spec, it is left unknown and
 * the builder says it could not confirm compatibility rather than guessing.
 * This module has no server-only imports so the browser can run the checks.
 */

export type PartTypeId = "cpu" | "cooler" | "motherboard" | "memory" | "storage" | "gpu" | "case" | "psu" | "os" | "monitor";

export type PartSpecs = {
  socket?: string;
  chipset?: string;
  memoryType?: "DDR4" | "DDR5";
  formFactor?: "E-ATX" | "ATX" | "Micro-ATX" | "Mini-ITX";
  /** Motherboard form factors a case fits. */
  fits?: string[];
  /** Sockets a cooler lists support for. */
  sockets?: string[];
  cores?: number;
  igpu?: boolean;
  /** Estimated peak power draw in watts (CPU and video card). */
  watts?: number;
  /** Power supply output in watts. */
  capacity?: number;
  efficiency?: string;
  capacityGb?: number;
  speed?: string;
  interface?: string;
  coolerType?: "Air" | "Liquid";
  radiator?: string;
  gpuModel?: string;
  vram?: string;
  size?: string;
  resolution?: string;
  refresh?: string;
  panel?: string;
  edition?: string;
  modular?: string;
  /** Case can hang on a wall (open-frame wall-mount designs). */
  wallMount?: boolean;
};

export type Part = {
  asin: string;
  type: PartTypeId;
  name: string;
  brand: string | null;
  image: { url: string; width: number; height: number } | null;
  price: number;
  priceDisplay: string;
  listPriceDisplay: string | null;
  savingsPercent: number | null;
  rating: number | null;
  reviewCount: number | null;
  buyUrl: string;
  specs: PartSpecs;
  /** Short spec summary shown in lists, e.g. ["AM5", "8 cores"]. */
  highlights: string[];
};

export type PartType = {
  id: PartTypeId;
  label: string;
  /** "Choose a CPU" style article. */
  article: "a" | "an" | "";
  required: boolean;
  searches: { keywords: string; searchIndex?: string }[];
  include: RegExp;
  exclude: RegExp;
};

const NOT_COMPLETE_PC = /\b(gaming (pc|desktop|computer)|desktop (pc|computer)|laptop|notebook|mini pc|all[- ]in[- ]one|chromebook|tablet)\b/i;

export const PART_TYPES: PartType[] = [
  {
    id: "cpu",
    label: "CPU",
    article: "a",
    required: true,
    searches: [{ keywords: "AMD Ryzen desktop processor" }, { keywords: "Intel Core desktop processor" }, { keywords: "Intel Core Ultra desktop processor" }],
    include: /\b(ryzen\s+[3579]|core\s+i[3579]|core\s+ultra\s+[3579])\b/i,
    // "with Wraith Cooler" is fine; a CPU cooler product is not a CPU.
    exclude: /\b(cpu cooler|air cooler|liquid cooler|aio|motherboard|combo|bundle|bracket|thermal paste|laptop|desktop computer|gaming pc|mini pc|renewed|refurbished|ssd|omnidesk|optiplex|all-in-one|windows 1[01]|(?:desktop|business|slim|micro)\s+(?:tower|desktop|pc)|tower\s+desktop|\d+\s?gb\s+(?:ram|ddr[45]|memory))\b/i,
  },
  {
    id: "cooler",
    label: "CPU Cooler",
    article: "a",
    required: false,
    searches: [{ keywords: "CPU air cooler" }, { keywords: "AIO liquid CPU cooler 360mm" }, { keywords: "AIO liquid CPU cooler 240mm" }],
    include: /\b(cpu (air )?cooler|aio|liquid cooler|liquid cooling|tower cooler|cpu cooling)\b/i,
    exclude: /\b(laptop|thermal paste|case fans? only|gpu|graphics card|phone|mount kit only|replacement fan)\b/i,
  },
  {
    id: "motherboard",
    label: "Motherboard",
    article: "a",
    required: true,
    searches: [{ keywords: "AM5 motherboard" }, { keywords: "AM4 motherboard" }, { keywords: "LGA 1700 motherboard" }, { keywords: "LGA 1851 motherboard" }],
    include: /\bmotherboard\b|\b(x870e?|b850|b840|x670e?|b650e?|a620|x570|b550|a520|b450|z890|b860|h810|z790|b760|h610|z690|b660)m?\b/i,
    exclude: /\b(combo|bundle|cpu (and|&) motherboard|laptop|standoffs?|screws?|io shield)\b/i,
  },
  {
    id: "memory",
    label: "Memory",
    article: "",
    required: true,
    searches: [{ keywords: "DDR5 desktop memory 32GB" }, { keywords: "DDR4 desktop memory 16GB" }],
    include: /\bddr[45]\b/i,
    exclude: /\b(so-?dimm|laptop|notebook|server|ecc|registered)\b/i,
  },
  {
    id: "storage",
    label: "Storage",
    article: "",
    required: true,
    searches: [{ keywords: "NVMe M.2 internal SSD" }, { keywords: "SATA internal SSD 2.5" }, { keywords: "internal hard drive 3.5 7200rpm" }],
    include: /\b(ssd|nvme|solid state|hard (disk )?drive|hdd)\b/i,
    exclude: /\b(external|portable|usb|enclosure|adapter|docking|case for|heatsink only|card reader)\b/i,
  },
  {
    id: "gpu",
    label: "Video Card",
    article: "a",
    required: false,
    searches: [{ keywords: "NVIDIA GeForce RTX graphics card" }, { keywords: "AMD Radeon RX graphics card" }],
    include: /\b(rtx\s?\d{4}|gtx\s?\d{4}|radeon|rx\s?\d{4}|arc\s?[ab]\d{3})\b/i,
    exclude: /\b(riser|bracket|cable|support|holder|water ?block|backplate|cooler only|fan replacement|external gpu|egpu)\b/i,
  },
  {
    id: "case",
    label: "Case",
    article: "a",
    required: true,
    searches: [
      { keywords: "ATX mid tower PC case" },
      { keywords: "micro ATX PC case" },
      { keywords: "mini ITX PC case" },
      { keywords: "wall mount PC case open frame" },
      { keywords: "Thermaltake Core P3 wall mount case" },
    ],
    include: /\b(case|chassis|tower)\b/i,
    exclude: /\b(phone|carrying|travel|bag|sleeve|keyboard|headset|controller|airpods|hard case|storage case|case fans?\b(?! included)|fan kit|dust filter|stand)\b/i,
  },
  {
    id: "psu",
    label: "Power Supply",
    article: "a",
    required: true,
    searches: [{ keywords: "ATX power supply 850W 80 Plus Gold" }, { keywords: "ATX power supply 1000W" }, { keywords: "ATX power supply 650W" }],
    include: /\b(power supply|psu)\b/i,
    exclude: /\b(laptop|ups|battery|adapter|charger|external|cable kit|extension|tester)\b/i,
  },
  {
    id: "os",
    label: "Operating System",
    article: "an",
    required: false,
    searches: [{ keywords: "Windows 11 Home", searchIndex: "Software" }, { keywords: "Windows 11 Pro", searchIndex: "Software" }],
    include: /\bwindows 1[01]\b/i,
    exclude: /\b(laptop|desktop|keyboard|computer|tablet|book|guide|for dummies|mouse)\b/i,
  },
  {
    id: "monitor",
    label: "Monitor",
    article: "a",
    required: false,
    searches: [{ keywords: "1440p gaming monitor 27 inch" }, { keywords: "1080p gaming monitor 165Hz" }, { keywords: "4K gaming monitor" }, { keywords: "OLED gaming monitor" }],
    include: /\bmonitor\b/i,
    exclude: /\b(arm|mount|stand|riser|cable|portable|light bar|privacy|screen protector|cleaner|baby)\b/i,
  },
];

export const getPartType = (id: string) => PART_TYPES.find((t) => t.id === id);

/** Whether a listing belongs to a part type (used when fetching). */
export function matchesPartType(type: PartType, title: string) {
  if (!type.include.test(title) || type.exclude.test(title)) return false;
  // Components only: a complete computer that mentions a part is not that part.
  if (type.id !== "monitor" && type.id !== "os" && NOT_COMPLETE_PC.test(title)) return false;
  return true;
}

// ---------------------------------------------------------------- specs

const pick = (text: string, re: RegExp) => text.match(re)?.[1];

// Chipset names, optionally followed by "M" (Micro-ATX variants such as B760M).
const CHIPSET_SOCKET: [RegExp, string][] = [
  [/\b(x870e?|b850|b840|x670e?|b650e?|a620)m?\b/i, "AM5"],
  [/\b(x570|b550|a520|b450|x470|a320)m?\b/i, "AM4"],
  [/\b(z890|b860|h810)m?\b/i, "LGA1851"],
  [/\b(z790|b760|h770|h610|z690|b660|h670)m?\b/i, "LGA1700"],
  [/\b(z590|b560|h510|z490|b460|h410)m?\b/i, "LGA1200"],
];

function socketFromText(text: string): string | undefined {
  if (/\bam5\b/i.test(text)) return "AM5";
  if (/\bam4\b/i.test(text)) return "AM4";
  if (/\blga\s?-?1851\b/i.test(text)) return "LGA1851";
  if (/\blga\s?-?1700\b/i.test(text)) return "LGA1700";
  if (/\blga\s?-?1200\b/i.test(text)) return "LGA1200";
  return undefined;
}

function cpuSocket(title: string): string | undefined {
  const explicit = socketFromText(title);
  if (explicit) return explicit;
  const ryzen = title.match(/\bryzen\s+[3579]\s+(\d)\d{3}/i);
  if (ryzen) return Number(ryzen[1]) >= 7 ? "AM5" : "AM4";
  if (/\bcore\s+ultra\s+[3579]\b/i.test(title) && /\b2\d{2}(k|kf|f|t)?\b/i.test(title)) return "LGA1851";
  const intel = title.match(/\bi[3579][- ]?(\d{2})\d{3}/i);
  if (intel) return Number(intel[1]) >= 12 ? "LGA1700" : Number(intel[1]) >= 10 ? "LGA1200" : undefined;
  return undefined;
}

function cpuSpecs(title: string): PartSpecs {
  const socket = cpuSocket(title);
  const cores = Number(pick(title, /\b(\d{1,2})[- ]core/i) ?? 0) || undefined;
  const model = title.match(/\b(?:ryzen\s+[3579]\s+(\d{4}\w*)|i[3579][- ]?(\d{4,5}\w*))/i) ?? (/\bcore\s+ultra\b/i.test(title) ? title.match(/\b()()(2\d{2}\w*)\b/) : null);
  const suffix = (model?.[1] ?? model?.[2] ?? model?.[3] ?? "").toUpperCase();
  const isAmd = /ryzen/i.test(title);
  // Integrated graphics: Intel parts without an F suffix; AMD G parts and Ryzen 7000+ (except F parts).
  const igpu = isAmd ? /G$|GE$/.test(suffix.replace(/X3D$/, "")) || (socket === "AM5" && !/F$/.test(suffix)) : suffix ? !/F$|KF$/.test(suffix) : undefined;
  // Estimated peak package power, used only for power supply sizing.
  const watts = isAmd
    ? /X3D/.test(suffix)
      ? 140
      : /X$/.test(suffix)
        ? /ryzen\s+9/i.test(title)
          ? 230
          : 142
        : 88
    : /K/.test(suffix)
      ? /i9|ultra\s+9/i.test(title)
        ? 253
        : 181
      : 120;
  return { socket, cores, igpu, watts };
}

function memoryTypeFrom(text: string): "DDR4" | "DDR5" | undefined {
  if (/\bddr5\b/i.test(text)) return "DDR5";
  if (/\bddr4\b/i.test(text)) return "DDR4";
  return undefined;
}

function formFactorFrom(text: string): PartSpecs["formFactor"] {
  if (/\be-?atx\b|\beatx\b/i.test(text)) return "E-ATX";
  if (/\bmini[- ]?itx\b/i.test(text)) return "Mini-ITX";
  if (/\b(micro[- ]?atx|m-?atx)\b/i.test(text)) return "Micro-ATX";
  if (/\batx\b/i.test(text)) return "ATX";
  return undefined;
}

function motherboardSpecs(title: string): PartSpecs {
  const chipsetMatch = CHIPSET_SOCKET.find(([re]) => re.test(title));
  const chipset = chipsetMatch ? title.match(chipsetMatch[0])?.[1].toUpperCase() : undefined;
  const socket = socketFromText(title) ?? chipsetMatch?.[1];
  // AM5 and LGA1851 boards are DDR5 only.
  const memoryType = memoryTypeFrom(title) ?? (socket === "AM5" || socket === "LGA1851" ? "DDR5" : undefined);
  return { socket, chipset, memoryType, formFactor: formFactorFrom(title) };
}

function memorySpecs(title: string): PartSpecs {
  const kit = title.match(/\b(\d{1,3})\s?GB\s*\(\s*(\d)\s?x\s?(\d{1,3})\s?GB\s*\)/i);
  const capacity = Number(kit?.[1] ?? pick(title, /\b(8|16|24|32|48|64|96|128)\s?GB\b/i) ?? 0) || undefined;
  const speed = pick(title, /\bDDR[45][- ]?(\d{4})\b/i) ?? pick(title, /\b(\d{4})\s?(?:MHz|MT\/s)\b/i);
  return { memoryType: memoryTypeFrom(title), capacityGb: capacity, speed: speed ? `${speed} MT/s` : undefined };
}

function storageSpecs(title: string): PartSpecs {
  const tb = pick(title, /\b(\d+(?:\.\d+)?)\s?TB\b/i);
  const gb = pick(title, /\b(\d{3,4})\s?GB\b/i);
  const capacityGb = tb ? Math.round(Number(tb) * 1000) : gb ? Number(gb) : undefined;
  const iface = /\bnvme|m\.2|pcie\b/i.test(title)
    ? `NVMe${pick(title, /\bpcie\s?(?:gen\s?)?([345])\.0|\bgen\s?([345])\b/i) ? ` PCIe ${pick(title, /\bpcie\s?(?:gen\s?)?([345])\.0|\bgen\s?([345])\b/i)}.0` : ""}`
    : /\bssd\b/i.test(title)
      ? "SATA SSD"
      : /\b(hard drive|hdd|rpm)\b/i.test(title)
        ? "Hard drive"
        : undefined;
  return { capacityGb, interface: iface };
}

const GPU_WATTS: [RegExp, number][] = [
  [/5090/, 575], [/5080/, 360], [/5070\s?ti/i, 300], [/5070/, 250], [/5060\s?ti/i, 180], [/5060/, 145], [/5050/, 130],
  [/4090/, 450], [/4080/, 320], [/4070\s?ti/i, 285], [/4070\s?super/i, 220], [/4070/, 200], [/4060\s?ti/i, 165], [/4060/, 115],
  [/3090/, 350], [/3080/, 320], [/3070/, 220], [/3060\s?ti/i, 200], [/3060/, 170], [/3050/, 130],
  [/9070\s?xt/i, 304], [/9070/, 220], [/9060\s?xt/i, 160], [/7900\s?xtx/i, 355], [/7900/, 300], [/7800\s?xt/i, 263], [/7700\s?xt/i, 245], [/7600/, 165], [/6600/, 132],
  [/arc\s?b580/i, 190], [/arc\s?b570/i, 150], [/arc\s?a7\d0/i, 225],
];

function gpuSpecs(title: string): PartSpecs {
  const model =
    title.match(/\b(?:geforce\s+)?(rtx\s?\d{4}(?:\s?ti)?(?:\s?super)?)\b/i)?.[1] ??
    title.match(/\b(?:radeon\s+)?(rx\s?\d{4}(?:\s?xtx|\s?xt|\s?gre)?)\b/i)?.[1] ??
    title.match(/\b(arc\s?[ab]\d{3})\b/i)?.[1];
  const gpuModel = model?.replace(/\s+/g, " ").toUpperCase().replace(" TI", " Ti").replace(" SUPER", " Super");
  const watts = model ? GPU_WATTS.find(([re]) => re.test(model))?.[1] : undefined;
  return { gpuModel, vram: pick(title, /\b(\d{1,2})\s?GB\s*(?:GDDR\d\w?)?/i)?.concat("GB"), watts };
}

function caseSpecs(title: string): PartSpecs {
  const ff = /\bmini[- ]?itx\b/i.test(title) && !/\b(atx|micro)/i.test(title.replace(/mini[- ]?itx/gi, ""))
    ? ["Mini-ITX"]
    : /\b(micro[- ]?atx|m-?atx)\b/i.test(title) && !/\b(e-?atx|mid[- ]?tower|full[- ]?tower)\b/i.test(title) && !/\batx\b/i.test(title.replace(/micro[- ]?atx|m-?atx/gi, ""))
      ? ["Micro-ATX", "Mini-ITX"]
      : /\be-?atx\b|\bfull[- ]?tower\b/i.test(title)
        ? ["E-ATX", "ATX", "Micro-ATX", "Mini-ITX"]
        : /\batx\b|\bmid[- ]?tower\b/i.test(title)
          ? ["ATX", "Micro-ATX", "Mini-ITX"]
          : undefined;
  const wallMount = /\bwall[- ]?mount(?:able|ed|ing)?\b|\bcore p[368]\b/i.test(title) || undefined;
  // Wall-mount open-frame cases take full ATX boards even when the title says only "open frame".
  const fits = ff ?? (wallMount ? ["ATX", "Micro-ATX", "Mini-ITX"] : undefined);
  return { fits, formFactor: fits?.[0] as PartSpecs["formFactor"], wallMount };
}

function psuSpecs(title: string): PartSpecs {
  const capacity = Number(pick(title, /\b(\d{3,4})\s?W(?:att)?\b/i) ?? 0) || undefined;
  const efficiency = pick(title, /\b80\s?\+?\s?(?:plus\s+)?(bronze|silver|gold|platinum|titanium)\b/i);
  const modular = /\bfully[- ]modular\b/i.test(title) ? "Fully modular" : /\bsemi[- ]modular\b/i.test(title) ? "Semi-modular" : undefined;
  return { capacity, efficiency: efficiency ? `80 Plus ${efficiency[0].toUpperCase()}${efficiency.slice(1).toLowerCase()}` : undefined, modular };
}

function coolerSpecs(text: string, title: string): PartSpecs {
  const sockets = ["AM5", "AM4", "LGA1851", "LGA1700", "LGA1200"].filter((s) =>
    new RegExp(s.startsWith("LGA") ? `\\blga\\s?-?${s.slice(3)}\\b` : `\\b${s}\\b`, "i").test(text),
  );
  const liquid = /\b(aio|liquid|water)\b/i.test(title);
  return { coolerType: liquid ? "Liquid" : "Air", radiator: liquid ? pick(title, /\b(120|140|240|280|360|420)\s?mm\b/i)?.concat("mm") : undefined, sockets: sockets.length ? sockets : undefined };
}

function monitorSpecs(title: string): PartSpecs {
  return {
    size: pick(title, /\b(\d{2}(?:\.\d)?)\s?(?:"|”|''|-?\s?inch|in\b)/i)?.concat('"'),
    resolution: /\b(4k|uhd|3840\s?x\s?2160)\b/i.test(title) ? "4K" : /\b(1440p|qhd|wqhd|2560\s?x\s?1440)\b/i.test(title) ? "1440p" : /\b(1080p|fhd|full hd|1920\s?x\s?1080)\b/i.test(title) ? "1080p" : undefined,
    refresh: pick(title, /\b(\d{2,3})\s?hz\b/i)?.concat("Hz"),
    panel: /\bqd-?oled\b/i.test(title) ? "QD-OLED" : /\boled\b/i.test(title) ? "OLED" : /\bips\b/i.test(title) ? "IPS" : /\bva\b/i.test(title) ? "VA" : undefined,
  };
}

export function parseSpecs(type: PartTypeId, title: string, features: string[]): PartSpecs {
  const text = `${title} ${features.join(" ")}`;
  switch (type) {
    case "cpu":
      return cpuSpecs(title);
    case "cooler":
      return coolerSpecs(text, title);
    case "motherboard":
      return motherboardSpecs(title);
    case "memory":
      return memorySpecs(title);
    case "storage":
      return storageSpecs(title);
    case "gpu":
      return gpuSpecs(title);
    case "case":
      return caseSpecs(title);
    case "psu":
      return psuSpecs(title);
    case "os":
      return { edition: /\bpro\b/i.test(title) ? "Pro" : /\bhome\b/i.test(title) ? "Home" : undefined };
    case "monitor":
      return monitorSpecs(title);
  }
}

export function highlights(type: PartTypeId, s: PartSpecs): string[] {
  const gb = (n?: number) => (n ? (n >= 1000 ? `${n / 1000}TB` : `${n}GB`) : undefined);
  const out: (string | undefined)[] =
    type === "cpu"
      ? [s.socket, s.cores ? `${s.cores} cores` : undefined, s.igpu === false ? "No integrated graphics" : undefined]
      : type === "cooler"
        ? [s.coolerType === "Liquid" ? `Liquid${s.radiator ? ` ${s.radiator}` : ""}` : "Air", s.sockets?.join(", ")]
        : type === "motherboard"
          ? [s.socket, s.chipset, s.formFactor, s.memoryType]
          : type === "memory"
            ? [s.memoryType, gb(s.capacityGb), s.speed]
            : type === "storage"
              ? [gb(s.capacityGb), s.interface]
              : type === "gpu"
                ? [s.gpuModel, s.vram, s.watts ? `~${s.watts}W` : undefined]
                : type === "case"
                  ? [s.fits ? `Fits ${s.fits[0]}` : undefined, s.wallMount ? "Wall-mountable" : undefined]
                  : type === "psu"
                    ? [s.capacity ? `${s.capacity}W` : undefined, s.efficiency, s.modular]
                    : type === "os"
                      ? [s.edition]
                      : [s.size, s.resolution, s.refresh, s.panel];
  return out.filter((x): x is string => Boolean(x));
}

// ---------------------------------------------------------------- compatibility

export type Build = Partial<Record<PartTypeId, Part>>;

export type Check = { level: "error" | "warning" | "note"; message: string; parts: PartTypeId[] };

/** Baseline draw for motherboard, memory, storage, fans, and peripherals. */
const BASE_WATTS = 75;

export function estimatedWatts(build: Build) {
  const cpu = build.cpu?.specs.watts ?? (build.cpu ? 120 : 0);
  const gpu = build.gpu?.specs.watts ?? (build.gpu ? 200 : 0);
  return build.cpu || build.gpu || build.motherboard ? BASE_WATTS + cpu + gpu : 0;
}

/** Power supply size to look for: about 40% headroom, rounded up to 50W. */
export function recommendedPsu(watts: number) {
  return watts ? Math.max(450, Math.ceil((watts * 1.4) / 50) * 50) : 0;
}

/** LGA1851 uses the same cooler mounting as LGA1700, so LGA1700 coolers fit both. */
export function coolerFits(sockets: string[], socket: string) {
  return sockets.includes(socket) || (socket === "LGA1851" && sockets.includes("LGA1700"));
}

export function checkBuild(build: Build): Check[] {
  const checks: Check[] = [];
  const { cpu, cooler, motherboard: mb, memory, gpu, case: pcCase, psu } = build;

  if (cpu && mb) {
    if (cpu.specs.socket && mb.specs.socket) {
      if (cpu.specs.socket !== mb.specs.socket)
        checks.push({ level: "error", message: `The CPU uses socket ${cpu.specs.socket} but the motherboard is ${mb.specs.socket}.`, parts: ["cpu", "motherboard"] });
    } else checks.push({ level: "warning", message: "Could not confirm the CPU and motherboard sockets match. Check both listings.", parts: ["cpu", "motherboard"] });
  }
  if (mb && memory) {
    if (mb.specs.memoryType && memory.specs.memoryType) {
      if (mb.specs.memoryType !== memory.specs.memoryType)
        checks.push({ level: "error", message: `The motherboard takes ${mb.specs.memoryType} memory but the memory is ${memory.specs.memoryType}.`, parts: ["motherboard", "memory"] });
    } else checks.push({ level: "warning", message: "Could not confirm the memory type matches the motherboard (DDR4 or DDR5).", parts: ["motherboard", "memory"] });
  }
  if (cpu && cooler) {
    if (cpu.specs.socket && cooler.specs.sockets) {
      if (!coolerFits(cooler.specs.sockets, cpu.specs.socket))
        checks.push({ level: "error", message: `The cooler lists support for ${cooler.specs.sockets.join(", ")}, not ${cpu.specs.socket}.`, parts: ["cooler", "cpu"] });
    } else checks.push({ level: "note", message: "The cooler listing does not say which sockets it supports. Confirm it fits your CPU socket.", parts: ["cooler"] });
  }
  if (mb && pcCase) {
    if (mb.specs.formFactor && pcCase.specs.fits) {
      if (!pcCase.specs.fits.includes(mb.specs.formFactor))
        checks.push({ level: "error", message: `${/^[AEIOU]/.test(mb.specs.formFactor) ? "An" : "A"} ${mb.specs.formFactor} motherboard will not fit this case (fits ${pcCase.specs.fits.join(", ")}).`, parts: ["motherboard", "case"] });
    } else checks.push({ level: "warning", message: "Could not confirm the motherboard size fits the case.", parts: ["motherboard", "case"] });
  }
  if (cooler?.specs.coolerType === "Liquid" && pcCase && cooler.specs.radiator)
    checks.push({ level: "note", message: `Check the case supports a ${cooler.specs.radiator} radiator.`, parts: ["cooler", "case"] });

  const watts = estimatedWatts(build);
  if (psu && watts) {
    const cap = psu.specs.capacity;
    if (!cap) checks.push({ level: "warning", message: "Could not read the power supply wattage from its listing.", parts: ["psu"] });
    else if (cap < watts) checks.push({ level: "error", message: `The ${cap}W power supply is below the estimated ${watts}W draw.`, parts: ["psu"] });
    else if (cap < recommendedPsu(watts))
      checks.push({ level: "warning", message: `The ${cap}W power supply leaves little headroom. About ${recommendedPsu(watts)}W is recommended for this build.`, parts: ["psu"] });
  }
  if (cpu && !gpu && cpu.specs.igpu === false)
    checks.push({ level: "error", message: "This CPU has no integrated graphics, so the build needs a video card.", parts: ["gpu"] });
  if (gpu && gpu.specs.watts && gpu.specs.watts >= 250)
    checks.push({ level: "note", message: "High-power video card: check the case has room for its length and the power supply has the right connectors.", parts: ["gpu"] });
  return checks;
}

/** Whether a candidate part conflicts with the current build (for the "compatible only" filter). */
export function isCompatible(build: Build, part: Part): boolean {
  const trial = { ...build, [part.type]: part };
  return !checkBuild(trial).some((c) => c.level === "error" && c.parts.includes(part.type));
}
