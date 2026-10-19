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
  /** The sister builds linked from this one. */
  related: string[];
  /** Extra write-up sections shown after the part-by-part description. */
  guide?: { title: string; body: string[] }[];
  /** Extra FAQs for this build. */
  faqs?: { q: string; a: string }[];
  /** Extra related links: [href, label]. */
  links?: [string, string][];
  /** Budget build: choose the strongest video card and processor whose full build fits under this total. */
  budget?: number;
  /** Only cases matching this (e.g. wall-mountable). */
  caseFilter?: (p: Part) => boolean;
  /** Preferred cooler type; falls back to air when none fits. */
  coolerType?: "Air" | "Liquid";
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
    related: ["intel-gaming-build", "entry-level-pc-build", "home-office-build"],
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
    related: ["amd-gaming-build", "entry-level-pc-build", "home-office-build"],
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
    related: ["entry-level-pc-build", "amd-gaming-build", "intel-gaming-build"],
  },
  {
    slug: "entry-level-pc-build",
    title: "Entry Level PC Build For Beginners",
    name: "Entry Level PC Build",
    summary:
      "An entry level PC build for beginners: a gaming PC that keeps the cost down without cutting corners: a six-core processor, a current 8GB video card, 16GB of memory, a 1TB NVMe SSD, and a quality power supply, all on a proven, easy-to-build platform.",
    audience: "1080p gaming in popular titles like Fortnite, Valorant, Minecraft, Rocket League, and Apex Legends, plus school, streaming video, and everyday use",
    cpu: (p) => /^(AM4|AM5|LGA1700|LGA1851)$/.test(p.specs.socket ?? "") && (p.specs.cores ?? 0) >= 6,
    cpuPick: "cheapest-total",
    minMemoryGb: 16,
    gpu: (p) => vram(p) >= 8,
    storage: { minGb: 1000, nvme: true },
    cooler: false,
    psuEfficiency: /bronze|gold|platinum/i,
    related: ["amd-gaming-build", "intel-gaming-build", "home-office-build"],
    guide: [
      {
        title: "Why this is a good first build",
        body: [
          "Every part here was chosen to be forgiving for a first-time builder. The motherboard and processor share a mature, well-documented socket, the case has room for full-size parts and easy cable routing, and the power supply is rated well above what the system draws, so there is no guesswork about power.",
          "It also leaves an upgrade path. The two most common upgrades, more memory and a faster video card, drop straight in later without replacing anything else.",
        ],
      },
      {
        title: "What you need besides the parts",
        body: [
          "A #2 Phillips screwdriver is the only tool most builds need. A clear table, good light, and a small bowl for screws make the job easier. You will also need a monitor, keyboard, and mouse, a USB flash drive of 8GB or more to install Windows, and an internet connection for drivers.",
        ],
      },
      {
        title: "Build order for beginners",
        body: [
          "1. Install the CPU, memory, and M.2 SSD on the motherboard while it sits on its box. 2. Mount the motherboard in the case and connect the front-panel cables. 3. Install the power supply and run the 24-pin and CPU power cables. 4. Install the video card in the top full-length slot and connect its power cable if it has one. 5. Plug the monitor into the video card, not the motherboard, then power on and enter the BIOS to confirm the CPU, memory, and SSD are detected.",
          "Take your time with the CPU and front-panel connectors: those are the two steps first-time builders most often get wrong. Your motherboard manual shows exactly where each cable goes.",
        ],
      },
      {
        title: "How long does it take?",
        body: [
          "Plan on two to four hours for a first build, including cable management, then about an hour to install Windows and drivers. Experienced builders finish in under an hour, so it gets much faster the second time.",
        ],
      },
    ],
    faqs: [
      {
        q: "Is building a PC hard for a beginner?",
        a: "No. Modern parts only fit one way, and every connector is keyed. If you can follow a step-by-step guide and use a screwdriver, you can build this PC. The most important steps are seating the CPU and memory correctly and connecting the front-panel cables.",
      },
      {
        q: "Can this PC play games at 1080p?",
        a: "Yes. The video card and six-core processor handle popular games like Fortnite, Valorant, Minecraft, and Rocket League at 1080p, and most newer games at 1080p with medium to high settings.",
      },
      {
        q: "What should I upgrade first?",
        a: "The video card has the biggest effect on gaming performance, so it is the best first upgrade. The power supply in this build leaves room for a more powerful card later.",
      },
    ],
  },
  {
    slug: "streaming-pc-build",
    title: "Streaming PC Build For Beginners",
    name: "Streaming PC Build",
    summary:
      "A streaming PC build for beginners that games and streams from one machine: a many-core processor for OBS and background apps, a GeForce RTX video card with NVIDIA's NVENC hardware encoder, 32GB of DDR5 memory, and a fast NVMe SSD for recordings.",
    audience: "playing and streaming to Twitch, YouTube, or Kick at the same time at 1080p, recording gameplay, and editing clips",
    cpu: (p) => /^(AM5|LGA1700|LGA1851)$/.test(p.specs.socket ?? "") && (p.specs.cores ?? 0) >= 8,
    cpuPick: "cheapest",
    minMemoryGb: 32,
    gpu: (p) => geforce(p) && vram(p) >= 16,
    storage: { minGb: 1000, nvme: true },
    cooler: true,
    psuEfficiency: /gold|platinum|titanium/i,
    related: ["amd-gaming-build", "intel-gaming-build", "entry-level-pc-build"],
    links: [
      ["/categories/streaming", "Streaming gear deals"],
      ["/brands/elgato", "Elgato deals"],
      ["/categories/monitors", "Gaming monitor deals"],
    ],
    guide: [
      {
        title: "Why this build streams well",
        body: [
          "Streaming adds a second heavy job on top of the game: encoding video in real time. This build hands that job to the video card's dedicated NVENC encoder, which streams at high quality with almost no hit to frame rates, and the many-core processor keeps OBS, chat, alerts, and your browser running smoothly alongside the game.",
          "32GB of memory matters more for streamers than for gamers. A game, OBS, a browser with stream dashboards, and voice chat can easily pass 16GB together.",
        ],
      },
      {
        title: "Recommended OBS settings to start with",
        body: [
          "In OBS, set the encoder to NVIDIA NVENC, the output resolution to 1080p at 60 frames per second, and rate control to CBR. Twitch recommends a bitrate of about 6,000 Kbps for 1080p60; YouTube accepts higher. Run the OBS auto-configuration wizard first, then fine-tune from there.",
        ],
      },
      {
        title: "Gear to add for a complete setup",
        body: [
          "The PC is the core, but viewers notice audio first. A USB microphone, a 1080p webcam, and a key light make the biggest difference for a new stream. A stream controller is a nice extra for switching scenes. A capture card is only needed if you also stream from a console.",
        ],
      },
    ],
    faqs: [
      {
        q: "Do I need two PCs to stream?",
        a: "No. With a hardware encoder like NVENC on the video card, one PC can play and stream at the same time with little performance loss. Two-PC setups are mainly for professional streamers who want the highest possible encode quality.",
      },
      {
        q: "How much RAM do I need for streaming?",
        a: "32GB. A game, OBS, a browser, and chat apps running together can use more than 16GB, which causes stutter on stream.",
      },
      {
        q: "What internet speed do I need to stream?",
        a: "Your upload speed matters most. Streaming 1080p at 60 frames per second uses about 6 Mbps, so aim for at least 10 Mbps of steady upload. Use a wired Ethernet connection when you can.",
      },
    ],
  },
  {
    slug: "linus-tech-pc-build",
    title: "Linus Tech PC Build",
    name: "Linus Tech PC Build",
    summary:
      "Our Linus Tech PC build: a high-end, value-focused enthusiast gaming PC in the spirit of the builds popular on tech YouTube channels like Linus Tech Tips. It pairs an X3D gaming processor with a high-end video card, 32GB of DDR5, and 2TB of fast storage.",
    audience: "high refresh rate gaming at 1440p, demanding new releases with high settings, and streaming or content creation on the side",
    cpu: (p) => p.specs.socket === "AM5" && /x3d/i.test(p.name),
    cpuPick: "cheapest",
    minMemoryGb: 32,
    gpu: (p) => /\b(9070 XT|5070 Ti|5080|5090)\b/i.test(`${p.name} ${p.specs.gpuModel ?? ""}`),
    storage: { minGb: 2000, nvme: true },
    cooler: true,
    psuEfficiency: /gold|platinum|titanium/i,
    related: ["amd-gaming-build", "streaming-pc-build", "intel-gaming-build"],
    guide: [
      {
        title: "About this build",
        body: [
          "People searching for a Linus Tech PC build usually want what popular tech channels like Linus Tech Tips champion: a balanced, high-performance gaming PC where the money goes into the parts that matter most, without wasting it on ones that do not. This is our take on that idea, built from current deals. It is not a build from Linus Tech Tips or Linus Media Group, and ClearanceStream is not affiliated with them.",
        ],
      },
      {
        title: "Why an X3D processor",
        body: [
          "AMD's X3D processors add a large stack of extra cache that many games use heavily, which is why they consistently top gaming benchmarks from independent reviewers. Eight fast cores are plenty for gaming, and the AM5 socket leaves room to upgrade to future Ryzen processors without changing the motherboard.",
        ],
      },
      {
        title: "Where the money goes",
        body: [
          "Most of the budget goes to the processor and video card, the two parts that decide frame rates. The motherboard, case, and power supply are chosen to be reliable and compatible without paying for features that do not make games faster, and 2TB of NVMe storage leaves room for a large game library.",
        ],
      },
    ],
    faqs: [
      {
        q: "Is this an official Linus Tech Tips build?",
        a: "No. It is our own build inspired by the balanced, value-focused enthusiast builds popular on tech YouTube channels like Linus Tech Tips. ClearanceStream is not affiliated with Linus Tech Tips or Linus Media Group.",
      },
      {
        q: "Is this build good for 1440p gaming?",
        a: "Yes. The high-end video card and X3D processor are aimed at high refresh rate 1440p gaming, and they handle many games at 4K with adjusted settings.",
      },
    ],
  },
  {
    slug: "best-pc-build-for-gaming-under-1200",
    title: "Best PC Build for Gaming Under $1200",
    name: "Best Gaming PC Build Under $1200",
    summary:
      "The strongest gaming PC we can put together for under $1,200 from current deals: as much video card as the budget allows, a six-core-or-better processor to match, a fast NVMe SSD, and a quality power supply.",
    audience: "high settings at 1080p and smooth 1440p gaming in current releases, with room to upgrade later",
    cpu: (p) => /^(AM4|AM5|LGA1700|LGA1851)$/.test(p.specs.socket ?? "") && (p.specs.cores ?? 0) >= 6,
    cpuPick: "cheapest",
    minMemoryGb: 16,
    gpu: (p) => vram(p) >= 8,
    storage: { minGb: 1000, nvme: true },
    cooler: false,
    psuEfficiency: /bronze|gold|platinum/i,
    budget: 1200,
    related: ["best-pc-build-for-gaming-under-1500", "entry-level-pc-build", "amd-gaming-build"],
    guide: [
      {
        title: "How we picked the parts",
        body: [
          "For a gaming PC under $1,200, the video card does most of the work, so we start with the strongest card that still lets the whole build come in under budget. The processor is chosen next, capped at about three quarters of the video card's price so it never eats into graphics performance. Memory, storage, the case, and the power supply are the lowest-cost compatible parts that do the job well.",
          "Because the build is recalculated from current listings every time we refresh prices, the exact parts and total change when deals change. The build always stays under $1,200 and always passes our compatibility check.",
        ],
      },
      {
        title: "What to expect at this budget",
        body: [
          "Expect high settings at 1080p in nearly every current game and smooth 1440p in most, especially with upscaling like DLSS or FSR turned on. Esports titles run at very high frame rates, which pairs well with a 144Hz or faster monitor.",
        ],
      },
      {
        title: "Where to upgrade first",
        body: [
          "The video card has the biggest effect on gaming performance, so it is the best first upgrade. Moving to 32GB of memory is the next step if you stream or keep many apps open while you play.",
        ],
      },
    ],
    faqs: [
      { q: "Can you build a good gaming PC for $1,200?", a: "Yes. $1,200 buys a gaming PC that runs current games at high settings at 1080p and handles 1440p well, as long as most of the budget goes to the video card." },
      { q: "Is it cheaper to build or buy a gaming PC under $1,200?", a: "Often it is close. Compare this build's total with prebuilt gaming PC deals that have the same video card; a discounted prebuilt can win when it includes Windows and assembly." },
    ],
  },
  {
    slug: "best-pc-build-for-gaming-under-1500",
    title: "Best PC Build for Gaming Under $1500",
    name: "Best Gaming PC Build Under $1500",
    summary:
      "The strongest gaming PC we can build for under $1,500 from current deals: as much video card as the budget allows, a modern processor to match, a fast NVMe SSD, and a quality power supply.",
    audience: "high settings at 1440p and high refresh rate 1080p gaming in current releases",
    cpu: (p) => /^(AM4|AM5|LGA1700|LGA1851)$/.test(p.specs.socket ?? "") && (p.specs.cores ?? 0) >= 6,
    cpuPick: "cheapest",
    minMemoryGb: 16,
    gpu: (p) => vram(p) >= 8,
    storage: { minGb: 1000, nvme: true },
    cooler: false,
    psuEfficiency: /gold|platinum|titanium/i,
    budget: 1500,
    related: ["best-pc-build-for-gaming-under-1200", "best-pc-build-for-gaming-under-3000", "amd-gaming-build"],
    guide: [
      {
        title: "How we picked the parts",
        body: [
          "We start with the strongest video card that fits a complete build under $1,500, then pick the best processor that keeps the build balanced, capped at about three quarters of the video card's price. The rest are the lowest-cost compatible parts that meet our standards: at least 16GB of memory, a fast NVMe SSD, and an 80 Plus Gold or better power supply sized with headroom. Memory prices are high right now, so the build puts that money into the video card instead, which matters far more for frame rates.",
          "The build is recalculated from current listings each time we refresh prices, so it always reflects the best value available, stays under $1,500, and passes our compatibility check.",
        ],
      },
      {
        title: "What to expect at this budget",
        body: [
          "$1,500 is the sweet spot for 1440p gaming. Expect high settings at 1440p in current releases and very high frame rates at 1080p, plus enough headroom for streaming or recording on the side.",
        ],
      },
      {
        title: "Where to upgrade first",
        body: [
          "Add storage as your game library grows; a second NVMe SSD is the easiest upgrade. For more frames, the video card is the next step, and the power supply in this build is sized with room for it.",
        ],
      },
    ],
    faqs: [
      { q: "Is $1,500 enough for a 1440p gaming PC?", a: "Yes. $1,500 is the sweet spot for 1440p gaming, with enough for a strong video card and a modern processor." },
      { q: "Is 16GB of RAM enough for this build?", a: "For gaming, yes. 16GB runs current games well, and with memory prices high the money does more in the video card. Add a second kit for 32GB later if you stream or multitask heavily." },
      { q: "Should I spend more on the CPU or GPU?", a: "The GPU, for gaming. This build caps the processor at about three quarters of the video card's price so most of the budget goes to graphics performance." },
    ],
  },
  {
    slug: "best-pc-build-for-gaming-under-3000",
    title: "Best PC Build for Gaming Under $3000",
    name: "Best Gaming PC Build Under $3000",
    summary:
      "The strongest gaming PC we can build for under $3,000 from current deals: a flagship-class video card, a top gaming processor, 32GB of DDR5, 2TB of fast storage, and a premium power supply.",
    audience: "4K gaming and high refresh rate 1440p at high settings, plus streaming, editing, and heavy multitasking",
    cpu: (p) => /^(AM5|LGA1851|LGA1700)$/.test(p.specs.socket ?? "") && (p.specs.cores ?? 0) >= 8,
    cpuPick: "cheapest",
    minMemoryGb: 32,
    gpu: (p) => vram(p) >= 12,
    storage: { minGb: 2000, nvme: true },
    cooler: true,
    coolerType: "Liquid",
    psuEfficiency: /gold|platinum|titanium/i,
    budget: 3000,
    related: ["best-pc-build-for-gaming-under-1500", "linus-tech-pc-build", "streaming-pc-build"],
    guide: [
      {
        title: "How we picked the parts",
        body: [
          "At $3,000 we start with the strongest video card that fits a complete build, then pick the fastest eight-core-or-better processor that keeps the build balanced. Memory is 32GB of DDR5, storage is a 2TB NVMe SSD, cooling is a 240mm or larger liquid cooler where one fits, and the power supply is 80 Plus Gold or better with generous headroom.",
          "The build is recalculated from current listings every time we refresh prices, so the parts change with the best deals while the total stays under $3,000 and the build passes our compatibility check.",
        ],
      },
      {
        title: "What to expect at this budget",
        body: [
          "Expect 4K gaming at high settings in most current games, especially with upscaling, and very high frame rates at 1440p for high refresh rate monitors. The processor and memory also handle streaming, video editing, and heavy multitasking alongside games.",
        ],
      },
      {
        title: "Is it worth spending this much?",
        body: [
          "If you game at 4K or on a 240Hz 1440p monitor, yes. For 1080p or 60Hz screens, our $1,500 build gets you most of the experience for half the price.",
        ],
      },
    ],
    faqs: [
      { q: "Can a $3,000 PC run games at 4K?", a: "Yes. At this budget most of the money goes to a high-end video card that runs current games at 4K with high settings, especially with DLSS or FSR upscaling." },
      { q: "Why a liquid cooler?", a: "High-end processors run hot under sustained load, and a 240mm or larger liquid cooler keeps them cool and quiet. When none fits the build, we fall back to a strong air cooler." },
    ],
  },
  {
    slug: "wall-mounted-pc-build",
    title: "Wall Mounted PC Build [{price}]",
    name: "Wall Mounted PC Build",
    summary:
      "A showpiece gaming PC that hangs on the wall: a wall-mountable open-frame case, a liquid cooler for a clean look, a modern processor, a 16GB video card, 32GB of DDR5, and a fast NVMe SSD.",
    audience: "a display-worthy setup that frees desk space while playing current games at high settings at 1440p",
    cpu: (p) => p.specs.socket === "AM5" && (p.specs.cores ?? 0) >= 6,
    cpuPick: "cheapest",
    minMemoryGb: 32,
    gpu: (p) => vram(p) >= 16,
    storage: { minGb: 1000, nvme: true },
    cooler: true,
    coolerType: "Liquid",
    psuEfficiency: /gold|platinum|titanium/i,
    caseFilter: (p) => p.specs.wallMount === true,
    related: ["amd-gaming-build", "best-pc-build-for-gaming-under-1500", "corsair-warthog-build"],
    guide: [
      {
        title: "Planning a wall-mounted PC",
        body: [
          "A wall-mounted PC turns your build into a piece of wall art and frees up the desk, but it needs more planning than a tower. Mount the case into wall studs or with anchors rated well above the weight of the finished build, and plan where the power, display, and USB cables will run down the wall before you hang it.",
          "Measure cable lengths before you buy. A wall-mounted PC usually sits farther from the monitor and outlet than a desk tower, so longer display and power cables or a cable cover keep things tidy.",
        ],
      },
      {
        title: "Why a liquid cooler and a vertical video card",
        body: [
          "Open-frame wall cases show every part, so a liquid cooler keeps the processor area clean and lets the radiator sit where it can breathe. Most wall-mount cases mount the video card vertically using a PCIe riser cable. Check the case listing to see whether a riser is included; if not, buy a PCIe 4.0 riser of the length the case specifies.",
        ],
      },
      {
        title: "Dust, noise, and temperatures",
        body: [
          "Open-frame cases run cool because nothing traps hot air, but they collect more dust and let more fan noise out. Plan to dust the build every few weeks with compressed air, and set gentle fan curves so the build stays quiet at idle.",
        ],
      },
      {
        title: "Building it",
        body: [
          "Assemble and test the PC with the case lying flat on a table, then hang it once everything works. Connect and route every cable while the case is still on the table, since reaching behind a mounted case is awkward.",
        ],
      },
    ],
    faqs: [
      { q: "Is it safe to mount a PC on the wall?", a: "Yes, when the case is designed for wall mounting and is fixed into studs or anchors rated well above the build's weight. Keep it away from heat sources and out of reach of pets and young children." },
      { q: "Do wall-mounted PCs overheat?", a: "No. Open-frame wall cases usually run cooler than closed towers because hot air escapes freely, though they collect more dust." },
      { q: "Do I need a riser cable for a wall-mounted PC?", a: "Usually. Most wall-mount cases mount the video card vertically, which requires a PCIe riser cable. Some cases include one; check the case listing." },
    ],
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

/**
 * Approximate relative gaming performance of GPU chips (higher is faster), used
 * only to rank budget-build candidates. Unknown chips fall back to their price.
 */
const GPU_TIERS: [RegExp, number][] = [
  [/rtx\s?5090/i, 100], [/rtx\s?4090/i, 92], [/rtx\s?5080/i, 82], [/rtx\s?4080/i, 76], [/rx\s?7900\s?xtx/i, 74],
  [/rtx\s?5070\s?ti/i, 72], [/rx\s?9070\s?xt/i, 70], [/rtx\s?4070\s?ti/i, 64], [/rx\s?7900\s?(xt|gre)/i, 63],
  [/rx\s?9070\b/i, 62], [/rtx\s?5070\b/i, 60], [/rtx\s?4070/i, 54], [/rx\s?7800\s?xt/i, 55], [/rx\s?7700\s?xt/i, 48],
  [/rtx\s?5060\s?ti/i, 46], [/rx\s?9060\s?xt/i, 45], [/rtx\s?4060\s?ti/i, 40], [/rtx\s?5060\b/i, 39], [/arc\s?b580/i, 36],
  [/rtx\s?4060\b/i, 34], [/rx\s?7600/i, 32], [/rtx\s?3060/i, 27], [/arc\s?b570/i, 30], [/rtx\s?3050/i, 16],
];
function gpuTier(p: Part) {
  const name = `${p.specs.gpuModel ?? ""} ${p.name}`;
  return GPU_TIERS.find(([re]) => re.test(name))?.[1] ?? p.price / 25;
}

/** Choose parts for a build definition, or null when the snapshot cannot complete it. */
export function generateBuild(def: BuildDef, parts: Record<PartTypeId, Part[]>): GeneratedBuild | null {
  if (!def.budget) return assemble(def, parts);
  // Budget builds: spend first on the video card, then the processor, keeping
  // the processor at no more than 75% of the card's price for a gaming balance.
  const gpus = (parts.gpu ?? []).filter((p) => (def.gpu ? def.gpu(p) : true)).sort((a, b) => b.price - a.price);
  const cpus = (parts.cpu ?? []).filter((p) => p.specs.socket && def.cpu(p)).sort((a, b) => b.price - a.price);
  // Rank cards by chip performance, not price: two RX 9070 XT cards perform alike, so the cheaper build wins.
  let best: { g: GeneratedBuild; score: number } | null = null;
  for (const gpu of gpus) {
    for (const cpu of cpus) {
      if (cpu.price > gpu.price * 0.75) continue;
      const g = assemble(def, parts, { cpu, gpu });
      if (!g || g.total > def.budget) continue;
      const score = gpuTier(gpu) * 10000 + cpu.price;
      if (!best || score > best.score || (score === best.score && g.total < best.g.total)) best = { g, score };
    }
  }
  return best?.g ?? null;
}

function assemble(def: BuildDef, parts: Record<PartTypeId, Part[]>, forced: { cpu?: Part; gpu?: Part } = {}): GeneratedBuild | null {
  const cpus = forced.cpu ? [forced.cpu] : (parts.cpu ?? []).filter((p) => p.specs.socket && def.cpu(p)).sort(byPrice);

  // Cheapest motherboard + memory pair for a CPU.
  const platformFor = (cpu: Part) => {
    let best: { mb: Part; memory: Part; cost: number } | null = null;
    for (const mb of parts.motherboard ?? []) {
      if (mb.specs.socket !== cpu.specs.socket || !mb.specs.memoryType || !mb.specs.formFactor) continue;
      const ok = (m: Part) => m.specs.memoryType === mb.specs.memoryType && (m.specs.capacityGb ?? 0) >= def.minMemoryGb;
      const single = cheapest(parts.memory ?? [], ok);
      // Prefer a two-stick kit (dual channel) when it costs little more than a single stick.
      const kit = cheapest(parts.memory ?? [], (m) => ok(m) && /\b2\s?x\s?\d{1,2}\s?gb\b|\bkit\b/i.test(m.name));
      const memory = kit && single && kit.price <= single.price * 1.2 ? kit : single;
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

  if (forced.gpu) build.gpu = forced.gpu;
  else if (def.gpu) {
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
    const fits = (p: Part, type: "Air" | "Liquid") => p.specs.coolerType === type && !!p.specs.sockets && coolerFits(p.specs.sockets, cpu.specs.socket!);
    build.cooler =
      (def.coolerType === "Liquid" ? cheapest(parts.cooler ?? [], (p) => fits(p, "Liquid") && /\b(240|280|360)/.test(p.specs.radiator ?? p.name)) : undefined) ??
      cheapest(parts.cooler ?? [], (p) => fits(p, "Air"));
  }

  const formFactor = platform.mb.specs.formFactor!;
  build.case = cheapest(
    parts.case ?? [],
    (p) => !!p.specs.fits?.includes(formFactor) && (def.gpu ? p.specs.formFactor !== "Mini-ITX" : true) && (def.caseFilter ? def.caseFilter(p) : true),
  );
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
