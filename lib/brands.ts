export type Brand = {
  slug: string;
  name: string;
  /** Value sent to the Creators API `brand` filter. */
  apiBrand: string;
  /** Searches run against Amazon for this brand's full catalog. Results are merged. */
  searches: { keywords: string; searchIndex: string }[];
  /** A title matching `include` and not `exclude` is classed as a gaming PC. */
  include: RegExp;
  exclude: RegExp;
  /** Optional: titles must match this to be listed (e.g. gaming lines only). */
  require?: RegExp;
  /** Lowercase names Amazon may use in the byline brand field. */
  aliases?: string[];
  metaTitle: string;
  metaDescription: string;
  intro: string;
  overview: string[];
  lines: { name: string; summary: string }[];
  buyingTips: string[];
  faqs: { q: string; a: string }[];
};

const PERIPHERALS =
  /\b(keyboard|mouse|mice|headset|headphones?|monitor|webcam|microphone|mouse ?pad|controller|chair|desk|cable|fans?|fan kit|case|chassis|power supply|psu|ram kit|memory kit|cooler|stream deck|capture card|replacement|sticker|skin)\b/i;

export const BRANDS: Brand[] = [
  {
    slug: "corsair",
    name: "Corsair",
    apiBrand: "Corsair",
    searches: [
      { keywords: "Corsair gaming PC", searchIndex: "Computers" },
      { keywords: "Corsair", searchIndex: "Computers" },
      { keywords: "Corsair", searchIndex: "VideoGames" },
    ],
    include: /\b(gaming (pc|desktop|computer)|desktop|tower)\b/i,
    exclude: PERIPHERALS,
    metaTitle: "Corsair Hidden Deals & Clearances: 20-50% Off",
    metaDescription:
      "Every Corsair product on Amazon marked down 20 to 50 percent: gaming PCs, keyboards, mice, headsets, memory, cooling, and power supplies. Live prices, refreshed daily.",
    intro:
      "Corsair built its name on memory, cases, cooling, and power supplies, and its prebuilt gaming PCs are assembled almost entirely from those in-house parts. That makes Corsair systems easy to upgrade and service, and it means discounts on them are worth watching closely.",
    overview: [
      "Corsair was founded in 1994 in California and grew from a memory maker into one of the largest PC gaming component brands in the world. Its prebuilt desktops use the same cases, AIO liquid coolers, fans, RAM, and power supplies that it sells separately to DIY builders, so the parts inside are standard ATX and mATX components rather than proprietary boards or power supplies.",
      "That standardisation matters when you buy on sale. A discounted Corsair system can be upgraded later with any off-the-shelf GPU, SSD, or memory kit, which extends its useful life well beyond the warranty period. It also makes it straightforward to compare a Corsair deal against the cost of building the same machine yourself.",
      "Corsair prebuilts tend to see their deepest cuts when a new GPU or CPU generation launches and retailers clear the outgoing configuration, and during major retail sale events. The tracker above shows every Corsair product currently discounted 20 to 50 percent on Amazon, from complete gaming PCs to peripherals and components.",
    ],
    lines: [
      {
        name: "Corsair Vengeance",
        summary:
          "Corsair's main gaming desktop line. Mid-tower systems built around Corsair cases and cooling, offered in a wide range of CPU and GPU configurations from mainstream 1440p builds to high-end 4K machines.",
      },
      {
        name: "Corsair ONE",
        summary:
          "Compact, small-form-factor systems with custom liquid cooling for both CPU and GPU. They trade some upgradability for a much smaller footprint and quiet operation.",
      },
      {
        name: "Peripherals and components",
        summary:
          "Keyboards, mice, headsets, memory, AIO coolers, fans, cases, and power supplies. These are the same parts Corsair uses inside its own prebuilt PCs, and they are discounted often.",
      },
      {
        name: "Origin PC",
        summary:
          "Corsair's custom-built boutique brand. Origin systems are configured to order and sold primarily direct, so they appear on Amazon less often than Vengeance models.",
      },
    ],
    buyingTips: [
      "Compare the discounted price against the current price of the GPU on its own. On most gaming PCs the graphics card is 35 to 50 percent of the total value, so a deal is only as good as the GPU inside it.",
      "Check the exact model suffix. Corsair reuses the Vengeance name across several generations, and an older configuration at a large percentage discount can still cost more than a current one.",
      "Look at the power supply rating and case airflow in the listing. Corsair systems usually ship with headroom for a GPU upgrade, which adds long-term value to a sale price.",
      "Treat very large percentage discounts with care. Some list prices are set high at launch; our deal pages show the savings against Amazon's reference price so you can judge the real saving.",
    ],
    faqs: [
      {
        q: "Are Corsair prebuilt gaming PCs worth buying on sale?",
        a: "Usually, yes. Because Corsair uses standard components from its own retail range, a discounted Corsair PC tends to be easy to upgrade and repair. The key is to confirm the GPU and CPU generation before comparing prices.",
      },
      {
        q: "When do Corsair gaming PCs go on sale?",
        a: "The biggest drops tend to cluster around new hardware launches, when outgoing configurations are cleared, and around major retail events such as Prime Day and Black Friday. Prices can also drop without notice, which is why we refresh listings every day.",
      },
      {
        q: "Can I upgrade a Corsair prebuilt later?",
        a: "In most Corsair desktops, yes. They use standard motherboards, ATX power supplies, and regular memory and storage slots, so common upgrades like a new GPU, more RAM, or extra SSD storage work the same way as in a DIY build.",
      },
    ],
  },
  {
    slug: "alienware",
    name: "Alienware",
    apiBrand: "Alienware",
    searches: [
      { keywords: "Alienware gaming desktop", searchIndex: "Computers" },
      { keywords: "Alienware", searchIndex: "Computers" },
      { keywords: "Alienware", searchIndex: "Electronics" },
    ],
    include: /\b(desktop|gaming (pc|computer)|aurora|area[- ]?51|tower)\b/i,
    exclude: new RegExp(`${PERIPHERALS.source}|\\b(laptop|notebook|m1[5-8]|x1[4-7])\\b`, "i"),
    metaTitle: "Alienware Hidden Deals & Clearances: 20-50% Off",
    metaDescription:
      "Every Alienware product on Amazon marked down 20 to 50 percent: gaming desktops, laptops, monitors, and peripherals. Live prices, refreshed daily.",
    intro:
      "Alienware is Dell's premium gaming brand, known for distinctive industrial design and strong factory support. Its desktops rarely sell at full price for long, so tracking live prices is the most reliable way to catch a genuine discount.",
    overview: [
      "Alienware started in 1996 as an independent boutique builder and was acquired by Dell in 2006. Today it is Dell's dedicated gaming line, and its desktops benefit from Dell's supply chain, on-site and mail-in support options, and frequent promotional pricing.",
      "Alienware desktops use more custom parts than a typical DIY-style prebuilt, including proprietary chassis designs and, on some generations, custom motherboards and power supply form factors. That is worth weighing when you compare a deal: the headline hardware may be excellent, but future upgrades beyond GPU, memory, and storage can be more limited.",
      "Because Dell runs its own promotions alongside Amazon, Alienware prices can swing noticeably from week to week. The listings above show every Alienware product currently discounted 20 to 50 percent on Amazon, with the saving calculated against Amazon's reference price.",
    ],
    lines: [
      {
        name: "Alienware Aurora",
        summary:
          "The core Alienware gaming desktop. Aurora systems cover the widest spread of configurations, from mainstream builds to flagship GPU options, and are the Alienware models most often discounted on Amazon.",
      },
      {
        name: "Alienware Area-51",
        summary:
          "Alienware's flagship desktop line, aimed at buyers who want top-tier components and maximum cooling headroom. Discounts are less frequent but can be substantial in dollar terms.",
      },
      {
        name: "Laptops, monitors, and peripherals",
        summary:
          "Alienware gaming laptops, high-refresh gaming monitors, keyboards, mice, and headsets. These appear on Amazon regularly and often share promotions with Alienware desktops.",
      },
    ],
    buyingTips: [
      "Confirm the generation (for example the R-number on Aurora models). Older generations are often cleared at large discounts but may use previous-generation CPUs or GPUs.",
      "Check the power supply wattage in the listing if you plan to upgrade the GPU later. Some Alienware configurations ship with a lower-wattage unit than the chassis supports.",
      "Look at the storage and memory configuration, not just the GPU. Entry configurations sometimes pair a strong graphics card with a small SSD or single-channel memory.",
      "Factor in support. Alienware systems include Dell warranty coverage, which has real value compared with a cheaper system from a brand with limited service options.",
    ],
    faqs: [
      {
        q: "Are Alienware desktops a good deal on sale?",
        a: "A discounted Alienware desktop can be good value, especially when you factor in Dell's warranty and support. Compare the full configuration, including the CPU, GPU, memory, storage, and power supply, against similar systems before buying.",
      },
      {
        q: "How often do Alienware gaming PCs go on sale?",
        a: "Frequently. Dell and Amazon both run promotions on Alienware desktops throughout the year, with deeper cuts around new generation launches and major shopping events. Prices on this page refresh every day.",
      },
      {
        q: "Can you upgrade an Alienware Aurora?",
        a: "GPU, memory, and storage upgrades are generally possible. Some generations use proprietary motherboards, cases, or power supplies, which can limit bigger upgrades, so check the model details before planning a major rebuild.",
      },
    ],
  },
  {
    slug: "logitech",
    name: "Logitech G",
    apiBrand: "Logitech",
    aliases: ["logitech"],
    searches: [
      { keywords: "Logitech G gaming", searchIndex: "VideoGames" },
      { keywords: "Logitech G gaming", searchIndex: "Computers" },
    ],
    // Logitech also sells office gear; only list its gaming lines.
    require: /\b(logitech g|gaming|lightspeed|astro|g pro|pro x|racing wheel)\b/i,
    include: /\b(gaming (pc|desktop|computer)|desktop)\b/i,
    exclude: PERIPHERALS,
    metaTitle: "Logitech G Deals & Clearances: 20-50% Off Gaming Gear",
    metaDescription:
      "Every Logitech G gaming product on Amazon marked down 20 to 50 percent: mice, keyboards, headsets, racing wheels, and streaming gear. Live prices, refreshed daily.",
    intro:
      "Logitech G is Logitech's gaming division, best known for lightweight wireless mice, low-latency LIGHTSPEED wireless, and the racing wheels that many sim racers start with. Its gear goes on sale often, which makes tracking real discounts worthwhile.",
    overview: [
      "Logitech was founded in 1981 in Switzerland and became one of the world's largest makers of computer peripherals. Its gaming brand, Logitech G, covers mice, keyboards, headsets, racing wheels, and streaming equipment, and the company has expanded the line through acquisitions such as ASTRO Gaming headsets and Blue microphones.",
      "Logitech G's flagship mice and keyboards are widely used in competitive esports, and its wireless technology is a large part of why wireless gaming peripherals are now mainstream. Because Logitech refreshes models regularly, the previous generation is often discounted heavily while still being very capable.",
      "The listings above include only Logitech's gaming products, not its office range, and only items currently 20 to 50 percent below Amazon's reference price.",
    ],
    lines: [
      { name: "PRO and PRO X series", summary: "Logitech G's esports line: lightweight wireless mice, compact keyboards, and headsets designed with professional players." },
      { name: "G series mice and keyboards", summary: "Mainstream gaming peripherals such as the G502 mouse family and G-series mechanical keyboards, often with LIGHTSPEED wireless." },
      { name: "Racing wheels", summary: "Force-feedback wheels and pedal sets for PC, PlayStation, and Xbox, from entry-level gear-driven wheels to direct-drive bases." },
      { name: "ASTRO and Blue", summary: "Headsets from ASTRO Gaming and streaming microphones from Blue, both now part of Logitech G." },
    ],
    buyingTips: [
      "Check the model generation. Logitech often keeps older versions on sale alongside newer ones with nearly identical names.",
      "For wireless mice and keyboards, LIGHTSPEED models use a low-latency 2.4GHz receiver suited to competitive play.",
      "Racing wheels are platform-specific. Confirm PC, PlayStation, or Xbox support before buying.",
    ],
    faqs: [
      {
        q: "Are Logitech G products worth buying on sale?",
        a: "Yes. Logitech G peripherals are widely used and well supported, and discounts on previous-generation models often make high-end mice and keyboards very good value.",
      },
      {
        q: "Does this page include Logitech office products?",
        a: "No. We list only Logitech's gaming products, including Logitech G, ASTRO, and racing wheels, so the deals stay relevant to PC gamers.",
      },
      {
        q: "How often do Logitech G deals change?",
        a: "Frequently. Logitech gaming gear is discounted throughout the year, with larger drops around major sale events. We check prices every day.",
      },
    ],
  },
  {
    slug: "razer",
    name: "Razer",
    apiBrand: "Razer",
    searches: [
      { keywords: "Razer", searchIndex: "VideoGames" },
      { keywords: "Razer", searchIndex: "Computers" },
    ],
    include: /\b(gaming (pc|desktop|computer)|desktop)\b/i,
    exclude: PERIPHERALS,
    metaTitle: "Razer Deals & Clearances: 20-50% Off Mice, Keyboards & More",
    metaDescription:
      "Every Razer product on Amazon marked down 20 to 50 percent: gaming mice, keyboards, headsets, Blade laptops, and accessories. Live prices, refreshed daily.",
    intro:
      "Razer builds gaming gear with a strong focus on design and performance, from the DeathAdder and Viper mice to BlackWidow keyboards and Blade laptops. Razer products are discounted regularly, and the deepest cuts often land on outgoing models.",
    overview: [
      "Razer was founded in 2005 and grew into one of the most recognisable gaming brands in the world, with its \"For Gamers. By Gamers.\" slogan and green triple-headed snake logo. It designs mice, keyboards, headsets, laptops, controllers, and streaming equipment, all tied together by its Synapse software and Chroma RGB lighting.",
      "Razer refreshes its popular product lines often, so the previous version of a mouse or keyboard is frequently discounted while remaining competitive. That makes Razer one of the best brands to track for genuine markdowns.",
      "The tracker above shows every Razer product currently 20 to 50 percent below Amazon's reference price.",
    ],
    lines: [
      { name: "Mice", summary: "DeathAdder, Viper, and Basilisk families, from ergonomic shapes to ultra-light esports designs." },
      { name: "Keyboards", summary: "BlackWidow and Huntsman keyboards with Razer's mechanical and optical switches." },
      { name: "Headsets", summary: "Kraken and BlackShark headsets for PC and console, wired and wireless." },
      { name: "Blade laptops", summary: "Premium thin-and-light gaming laptops with high-refresh displays." },
    ],
    buyingTips: [
      "Razer reuses product names across versions (V2, V3, Pro, Ultimate). Check the exact version before comparing prices.",
      "Optical switches in Huntsman keyboards are faster and more durable; mechanical switches in BlackWidow models offer more feel options.",
      "For Blade laptops, compare the GPU and its power limit, not just the model year.",
    ],
    faqs: [
      {
        q: "When do Razer products go on sale?",
        a: "Razer discounts are common throughout the year, with larger cuts when new versions launch and during major retail events. We check Amazon prices every day.",
      },
      {
        q: "Are older Razer models still worth buying?",
        a: "Often yes. A previous-generation Razer mouse or keyboard at 30 to 40 percent off can be better value than a new model at full price.",
      },
      {
        q: "Do I need Razer Synapse?",
        a: "Synapse is needed to customise lighting, macros, and settings on most Razer devices, but many products store settings on board and work without it.",
      },
    ],
  },
  {
    slug: "steelseries",
    name: "SteelSeries",
    apiBrand: "SteelSeries",
    searches: [
      { keywords: "SteelSeries", searchIndex: "VideoGames" },
      { keywords: "SteelSeries", searchIndex: "Computers" },
    ],
    include: /\b(gaming (pc|desktop|computer)|desktop)\b/i,
    exclude: PERIPHERALS,
    metaTitle: "SteelSeries Deals & Clearances: 20-50% Off Gaming Gear",
    metaDescription:
      "Every SteelSeries product on Amazon marked down 20 to 50 percent: Arctis headsets, Apex keyboards, Aerox and Rival mice, and mouse pads. Live prices, refreshed daily.",
    intro:
      "SteelSeries is a Danish gaming peripheral maker known for its Arctis headsets, Apex keyboards with adjustable switches, and QcK mouse pads. Its products show up on sale often, especially around new Arctis and Apex releases.",
    overview: [
      "SteelSeries was founded in Denmark in 2001 and has been part of competitive gaming since the early days of esports. It makes headsets, keyboards, mice, and mouse pads, all managed through its SteelSeries GG software.",
      "The Arctis headset line is one of the most popular in gaming, and the Apex Pro keyboards popularised adjustable actuation switches. When SteelSeries launches a new generation, the outgoing models are frequently discounted.",
      "The listings above show every SteelSeries product currently 20 to 50 percent below Amazon's reference price.",
    ],
    lines: [
      { name: "Arctis headsets", summary: "Wired and wireless headsets for PC and console, including the Arctis Nova range." },
      { name: "Apex keyboards", summary: "Mechanical and adjustable-switch keyboards, from compact layouts to full-size boards." },
      { name: "Mice", summary: "Aerox, Rival, and Prime mice, from ultra-light designs to ergonomic shapes." },
      { name: "QcK mouse pads", summary: "Cloth and hard mouse pads in sizes up to full-desk mats." },
    ],
    buyingTips: [
      "Arctis headsets come in platform-specific versions (for example PlayStation or Xbox). Check compatibility before buying.",
      "Adjustable-switch Apex Pro keyboards let you change actuation depth per key, which is worth paying more for if you play fast-paced games.",
      "Mouse pad discounts are frequent and a cheap upgrade alongside a new mouse.",
    ],
    faqs: [
      {
        q: "Are SteelSeries headsets good value on sale?",
        a: "Yes. Arctis headsets are comfortable and well reviewed, and older generations often drop significantly when a new model launches.",
      },
      {
        q: "What software do SteelSeries products use?",
        a: "SteelSeries GG manages lighting, audio settings, and device configuration for most current SteelSeries products.",
      },
      {
        q: "How often are SteelSeries prices updated here?",
        a: "Every day. We list only items currently discounted 20 to 50 percent, so the page changes as deals start and end.",
      },
    ],
  },
  {
    slug: "origin-pc",
    name: "Origin PC",
    apiBrand: "ORIGIN PC",
    aliases: ["origin pc"],
    searches: [{ keywords: "ORIGIN PC gaming desktop", searchIndex: "Computers" }],
    include: /\b(gaming (pc|desktop|computer)|desktop|tower)\b/i,
    exclude: PERIPHERALS,
    metaTitle: "Origin PC Gaming PC Deals & Clearances",
    metaDescription:
      "Origin PC gaming desktops on Amazon marked down 20 to 50 percent. Track discounts on custom-built Origin PC systems with live prices, refreshed daily.",
    intro:
      "Origin PC builds custom, hand-assembled gaming desktops with a strong focus on build quality and support. Its systems sell mostly direct, so discounted Origin PCs on Amazon are rare and worth catching when they appear.",
    overview: [
      "Origin PC was founded in 2009 in Miami by former Alienware staff, and was acquired by Corsair in 2019. It continues to build custom gaming desktops and workstations, assembled and tested in the United States, with an emphasis on clean cable management, custom cooling, and lifetime support.",
      "Because Origin PC systems are configured to order and sold mostly through Origin's own site, Amazon listings are limited and discounts are infrequent. When one does appear in the 20 to 50 percent range, it is typically a fixed configuration being cleared.",
      "This page shows every Origin PC gaming desktop currently discounted 20 to 50 percent on Amazon. It may be empty for long periods; for more prebuilt options, see the Corsair and Alienware deal pages.",
    ],
    lines: [
      { name: "Neuron", summary: "Origin PC's mid-tower gaming desktop, offered in a wide range of CPU and GPU configurations." },
      { name: "Genesis", summary: "Full-tower systems with room for top-end GPUs and custom liquid cooling." },
      { name: "Chronos", summary: "Compact small-form-factor gaming PCs for smaller desks and living rooms." },
    ],
    buyingTips: [
      "Compare the discounted Origin PC against a Corsair Vengeance system with similar parts, since both share Corsair components.",
      "Check exactly which configuration is listed. Amazon listings are fixed builds, not the configure-to-order options on Origin's site.",
      "Factor in Origin's build quality and support, which add value beyond the parts list.",
    ],
    faqs: [
      {
        q: "Is Origin PC owned by Corsair?",
        a: "Yes. Corsair acquired Origin PC in 2019. Origin continues to sell its own custom-built systems, many of which use Corsair components.",
      },
      {
        q: "Why are there so few Origin PC deals?",
        a: "Most Origin PC systems are built to order and sold directly, so few fixed configurations are listed on Amazon, and fewer still are discounted 20 percent or more.",
      },
      {
        q: "Are Origin PC gaming PCs upgradeable?",
        a: "Generally yes. Origin uses standard components and cases, so common upgrades like GPU, memory, and storage work as in a DIY build.",
      },
    ],
  },
];

export function getBrand(slug: string): Brand | undefined {
  return BRANDS.find((b) => b.slug === slug);
}

/** Map an Amazon brand string back to one of our tracked brands. */
export function brandFromAmazon(value: string | undefined | null): Brand | undefined {
  if (!value) return undefined;
  const v = value.toLowerCase();
  return BRANDS.find((b) => [b.apiBrand.toLowerCase(), ...(b.aliases ?? [])].some((n) => v.includes(n)));
}
