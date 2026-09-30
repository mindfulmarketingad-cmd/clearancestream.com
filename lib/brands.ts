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
  metaTitle: string;
  metaDescription: string;
  intro: string;
  overview: string[];
  lines: { name: string; summary: string }[];
  buyingTips: string[];
  faqs: { q: string; a: string }[];
};

const PERIPHERALS =
  /\b(keyboard|mouse|mice|headset|headphones?|monitor|webcam|microphone|mouse ?pad|controller|chair|desk|cable|fan kit|case only|power supply|psu|ram kit|memory kit|cooler|stream deck|capture card|replacement|sticker|skin)\b/i;

export const BRANDS: Brand[] = [
  {
    slug: "corsair",
    name: "Corsair",
    apiBrand: "Corsair",
    searches: [
      { keywords: "Corsair gaming PC", searchIndex: "Computers" },
      { keywords: "Corsair", searchIndex: "Computers" },
      { keywords: "Corsair", searchIndex: "Electronics" },
      { keywords: "Corsair", searchIndex: "VideoGames" },
    ],
    include: /\b(gaming (pc|desktop|computer)|desktop|tower)\b/i,
    exclude: PERIPHERALS,
    metaTitle: "Corsair Hidden Deals & Clearances: 20-50% Off",
    metaDescription:
      "Every Corsair product on Amazon marked down 20 to 50 percent: gaming PCs, keyboards, mice, headsets, memory, cooling, and power supplies. Live prices, refreshed hourly.",
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
        a: "The biggest drops tend to cluster around new hardware launches, when outgoing configurations are cleared, and around major retail events such as Prime Day and Black Friday. Prices can also drop without notice, which is why we refresh listings every hour.",
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
      { keywords: "Alienware", searchIndex: "VideoGames" },
    ],
    include: /\b(desktop|gaming (pc|computer)|aurora|area[- ]?51|tower)\b/i,
    exclude: new RegExp(`${PERIPHERALS.source}|\\b(laptop|notebook|m1[5-8]|x1[4-7])\\b`, "i"),
    metaTitle: "Alienware Hidden Deals & Clearances: 20-50% Off",
    metaDescription:
      "Every Alienware product on Amazon marked down 20 to 50 percent: gaming desktops, laptops, monitors, and peripherals. Live prices, refreshed hourly.",
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
        a: "Frequently. Dell and Amazon both run promotions on Alienware desktops throughout the year, with deeper cuts around new generation launches and major shopping events. Prices on this page refresh every hour.",
      },
      {
        q: "Can you upgrade an Alienware Aurora?",
        a: "GPU, memory, and storage upgrades are generally possible. Some generations use proprietary motherboards, cases, or power supplies, which can limit bigger upgrades, so check the model details before planning a major rebuild.",
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
  return BRANDS.find((b) => v.includes(b.apiBrand.toLowerCase()));
}
