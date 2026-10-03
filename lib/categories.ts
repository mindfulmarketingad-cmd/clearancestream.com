export type Category = {
  slug: string;
  name: string;
  /** Lowercase noun used in sentences, e.g. "gaming mouse deals". */
  noun: string;
  /** Title test, checked in order; the first matching category wins. */
  match?: RegExp;
  tips: string[];
};

/**
 * Product categories, in classification order. Gaming PCs are assigned from
 * the brand's own gaming-PC rule; everything else by title. Accessories is the
 * fallback, so its `match` is empty.
 */
export const CATEGORIES: Category[] = [
  {
    slug: "gaming-pcs",
    name: "Gaming PCs",
    noun: "gaming PC",
    tips: [
      "Price the graphics card on its own first. It is usually a third to a half of the system's value, and a deal is only as good as the GPU inside it.",
      "Check the CPU generation and memory configuration. 32GB in two sticks (dual-channel) is the comfortable standard.",
      "Look for at least a 1TB NVMe SSD and a power supply with headroom for a future GPU upgrade.",
    ],
  },
  {
    slug: "laptops",
    name: "Gaming Laptops",
    noun: "gaming laptop",
    match: /\b(laptop|notebook)\b/i,
    tips: [
      "Check the GPU's power limit (TGP), not just its name. The same laptop GPU can perform very differently depending on how much power it is allowed.",
      "Match the display to the GPU: a high-refresh 1440p panel needs a stronger GPU than a 1080p one.",
      "Look at memory and storage upgradability. Soldered RAM cannot be expanded later.",
    ],
  },
  {
    slug: "keyboards",
    name: "Keyboards",
    noun: "gaming keyboard",
    match: /\bkeyboards?\b/i,
    tips: [
      "Decide on switch type first: linear for gaming speed, tactile for typing feel, or adjustable/analog switches if you want both.",
      "Pick a layout you will actually use. Tenkeyless and 75% boards free up desk space for mouse movement.",
      "Wireless models are now competitive on latency; check battery life with lighting on, not off.",
    ],
  },
  {
    slug: "mice",
    name: "Mice",
    noun: "gaming mouse",
    match: /\b(mouse|mice)\b(?!\s?pad)/i,
    tips: [
      "Shape and weight matter more than headline DPI. Every current flagship sensor is accurate enough for competitive play.",
      "Lighter mice (under about 70g) suit fast flick aiming; heavier, ergonomic shapes suit long sessions and MMO play.",
      "For wireless, check the receiver type and battery life. Low-latency 2.4GHz is the standard for gaming.",
    ],
  },
  {
    slug: "headsets",
    name: "Headsets",
    noun: "gaming headset",
    match: /\b(headsets?|headphones?|earbuds?|earphones?)\b/i,
    tips: [
      "Check platform support. Some wireless headsets work on PC and PlayStation but need a different version for Xbox.",
      "Comfort over long sessions depends on weight, clamp force, and ear cushion material.",
      "A detachable or flip-to-mute microphone and clear sidetone make a big difference in team chat.",
    ],
  },
  {
    slug: "monitors",
    name: "Monitors",
    noun: "gaming monitor",
    match: /\bmonitors?\b/i,
    tips: [
      "Match resolution and refresh rate to your GPU. A 240Hz 1440p panel needs a strong graphics card to use fully.",
      "OLED offers the best contrast and response time; fast IPS panels are a strong, burn-in-free alternative.",
      "Check the ports: DisplayPort or HDMI 2.1 is needed for high refresh rates at higher resolutions.",
    ],
  },
  {
    slug: "controllers",
    name: "Controllers & Racing Wheels",
    noun: "controller and racing wheel",
    match: /\b(controllers?|gamepads?|joysticks?|racing wheels?|wheel and pedals?|pedals|shifter|flight)\b/i,
    tips: [
      "Confirm platform compatibility (PC, Xbox, PlayStation) before buying. Wheels in particular are often platform-specific.",
      "For racing wheels, direct-drive and belt-drive bases give stronger, smoother force feedback than gear-driven ones.",
      "Hall-effect sticks and triggers resist drift better than traditional potentiometers.",
    ],
  },
  {
    slug: "streaming",
    name: "Streaming Gear",
    noun: "streaming gear",
    match: /\b(microphones?|mic|webcams?|stream|streaming|capture card|camera|key light|audio interface)\b/i,
    tips: [
      "For microphones, dynamic mics reject room noise better; condenser mics capture more detail in quiet rooms.",
      "A webcam's sensor and lighting matter more than its resolution. Good lighting improves any camera.",
      "Check software support for the platforms and streaming apps you use.",
    ],
  },
  {
    slug: "components",
    name: "PC Components",
    noun: "PC component",
    match:
      /\b(power supply|psu|fans?|cooler|cooling|aio|liquid|case|chassis|memory|ram|ddr[45]|ssd|nvme|motherboard|graphics card|thermal|radiator|pump)\b/i,
    tips: [
      "Check compatibility first: case clearance for coolers and GPUs, socket support for coolers, and memory type for your motherboard.",
      "For power supplies, an 80 Plus Gold or better rating and ATX 3.x support are good baselines for modern GPUs.",
      "Buying fans and coolers from the same ecosystem keeps lighting and fan control in one app.",
    ],
  },
  {
    slug: "accessories",
    name: "Accessories",
    noun: "gaming accessory",
    tips: [
      "Mouse pads affect glide and control as much as the mouse does: cloth for control, hard or hybrid surfaces for speed.",
      "Check what is included and what is sold separately, such as cables, receivers, or replacement parts.",
      "Accessories from the same brand as your peripherals usually share one control app.",
    ],
  },
];

export function getCategory(slug: string): Category | undefined {
  return CATEGORIES.find((c) => c.slug === slug);
}

export function categorize(title: string, isGamingPc: boolean): string {
  if (isGamingPc) return "gaming-pcs";
  return CATEGORIES.find((c) => c.match?.test(title))?.slug ?? "accessories";
}
