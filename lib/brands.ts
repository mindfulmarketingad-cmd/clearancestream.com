export type BrandGroup = "pcs" | "peripherals" | "displays" | "controllers";

export const BRAND_GROUPS: { id: BrandGroup; name: string }[] = [
  { id: "pcs", name: "Gaming PCs & Laptops" },
  { id: "peripherals", name: "Mice, Keyboards & Headsets" },
  { id: "displays", name: "Monitors & Streaming" },
  { id: "controllers", name: "Controllers & Racing" },
];

export type Brand = {
  slug: string;
  name: string;
  group: BrandGroup;
  /** Value sent to the product API `brand` filter. */
  apiBrand: string;
  /** Lowercase brand names the feed may use in its byline (defaults to apiBrand). */
  aliases?: string[];
  /** Product searches for this brand. Results are merged. */
  searches: { keywords: string; searchIndex: string }[];
  /** Optional: titles must match this to be listed (e.g. a company's gaming lines only). */
  require?: RegExp;
  /** A title matching `include` and not `exclude` is classed as a gaming PC. */
  include: RegExp;
  exclude: RegExp;
  /** What the brand sells, used in meta descriptions: "gaming PCs, keyboards, and mice". */
  sells: string;
  intro: string;
  overview: string[];
  lines: { name: string; summary: string }[];
  buyingTips: string[];
  faqs: { q: string; a: string }[];
};

const PERIPHERALS =
  /\b(keyboard|mouse|mice|headset|headphones?|monitor|webcam|microphone|mouse ?pad|controller|chair|desk|cable|fans?|fan kit|case|chassis|power supply|psu|ram kit|memory kit|cooler|stream deck|capture card|replacement|sticker|skin)\b/i;
const DESKTOP = /\b(gaming (pc|desktop|computer)|desktop|tower)\b/i;
const NO_DESKTOPS = /\b(gaming (pc|desktop|computer)|desktop)\b/i;

export const BRANDS: Brand[] = [
  // ---------------------------------------------------------------- PCs
  {
    slug: "alienware",
    name: "Alienware",
    group: "pcs",
    apiBrand: "Alienware",
    searches: [
      { keywords: "Alienware gaming desktop", searchIndex: "Computers" },
      { keywords: "Alienware", searchIndex: "Computers" },
      { keywords: "Alienware", searchIndex: "Electronics" },
    ],
    include: /\b(desktop|gaming (pc|computer)|aurora|area[- ]?51|tower)\b/i,
    exclude: PERIPHERALS,
    sells: "gaming desktops, laptops, and monitors",
    intro:
      "Alienware is Dell's premium gaming brand, known for distinctive industrial design and strong factory support. Its desktops, laptops, and monitors rarely sell at full price for long, so tracking live prices is the most reliable way to catch a genuine discount.",
    overview: [
      "Alienware started in 1996 as an independent boutique builder and was acquired by Dell in 2006. Today it is Dell's dedicated gaming line, backed by Dell's supply chain and support network, and it runs frequent promotions across desktops, laptops, and monitors.",
      "Alienware desktops use more custom parts than a typical prebuilt, including proprietary chassis designs and, on some generations, custom motherboards and power supplies. The headline hardware can be excellent, but future upgrades beyond GPU, memory, and storage may be more limited, which is worth weighing against the discount.",
    ],
    lines: [
      { name: "Aurora desktops", summary: "The core Alienware gaming desktop, in the widest range of configurations and the line most often discounted." },
      { name: "Area-51", summary: "Alienware's flagship desktops for buyers who want top-tier components and maximum cooling headroom." },
      { name: "Laptops", summary: "High-performance gaming laptops in 16- and 18-inch sizes." },
      { name: "Monitors", summary: "High-refresh gaming monitors, including QD-OLED models that are frequently on promotion." },
    ],
    buyingTips: [
      "Confirm the generation (for example the R-number on Aurora models). Older generations are often cleared at large discounts but may use previous-generation CPUs or GPUs.",
      "Check the power supply wattage if you plan to upgrade the GPU later.",
      "Factor in Dell warranty coverage, which has real value compared with cheaper systems with limited support.",
    ],
    faqs: [
      {
        q: "Are Alienware discounts worth it?",
        a: "Often. Alienware hardware and support are strong, and promotions are frequent. Compare the full configuration, including CPU, GPU, memory, storage, and power supply, against similar systems before buying.",
      },
      {
        q: "Can you upgrade an Alienware Aurora?",
        a: "GPU, memory, and storage upgrades are generally possible. Some generations use proprietary parts that limit bigger upgrades, so check the model details first.",
      },
    ],
  },
  {
    slug: "corsair",
    name: "Corsair",
    group: "pcs",
    apiBrand: "Corsair",
    searches: [
      { keywords: "Corsair gaming PC", searchIndex: "Computers" },
      { keywords: "Corsair", searchIndex: "Computers" },
      { keywords: "Corsair", searchIndex: "VideoGames" },
    ],
    include: DESKTOP,
    exclude: PERIPHERALS,
    sells: "gaming PCs, keyboards, mice, headsets, and PC components",
    intro:
      "Corsair built its name on memory, cases, cooling, and power supplies, and its gaming PCs and peripherals use that same in-house hardware. Corsair runs promotions across its whole range, from Vengeance gaming PCs to keyboards, mice, and headsets.",
    overview: [
      "Corsair was founded in 1994 in California and grew from a memory maker into one of the largest PC gaming brands in the world. Its prebuilt desktops use the same cases, AIO liquid coolers, fans, memory, and power supplies it sells to DIY builders, so the parts inside are standard components that are easy to upgrade.",
      "Corsair's peripherals and components are discounted often, especially when a new generation launches. Corsair also owns SCUF Gaming and Origin PC, both of which have their own pages here.",
    ],
    lines: [
      { name: "Vengeance gaming PCs", summary: "Corsair's main gaming desktop line, built around Corsair cases and cooling in a wide range of configurations." },
      { name: "Keyboards and mice", summary: "K-series keyboards and gaming mice such as the Scimitar, Dark Core, and M65 families." },
      { name: "Headsets", summary: "HS-series and Virtuoso headsets for PC and console, wired and wireless." },
      { name: "Components", summary: "Memory, AIO coolers, fans, cases, and power supplies, all managed in iCUE." },
    ],
    buyingTips: [
      "For gaming PCs, price the GPU on its own first. A deal is only as good as the graphics card inside it.",
      "Corsair reuses product names across generations. Check the exact model suffix before comparing prices.",
      "Buying fans, coolers, and peripherals from one ecosystem keeps lighting and control in a single app.",
    ],
    faqs: [
      {
        q: "Are Corsair prebuilt gaming PCs worth buying on sale?",
        a: "Usually, yes. Corsair uses standard components from its own retail range, so a discounted Corsair PC tends to be easy to upgrade and repair.",
      },
      {
        q: "When does Corsair run promotions?",
        a: "Throughout the year, with the biggest drops around new hardware launches and major retail events such as Black Friday.",
      },
    ],
  },
  {
    slug: "origin-pc",
    name: "Origin PC",
    group: "pcs",
    apiBrand: "ORIGIN PC",
    aliases: ["origin pc"],
    searches: [{ keywords: "ORIGIN PC gaming desktop", searchIndex: "Computers" }],
    include: DESKTOP,
    exclude: PERIPHERALS,
    sells: "custom-built gaming desktops",
    intro:
      "Origin PC builds custom, hand-assembled gaming desktops with a strong focus on build quality and support. Most systems sell direct, so discounted Origin PCs are rare and worth catching when they appear.",
    overview: [
      "Origin PC was founded in 2009 in Miami by former Alienware staff and was acquired by Corsair in 2019. It builds custom gaming desktops assembled and tested in the United States, with an emphasis on clean cable management, custom cooling, and long-term support.",
      "Because Origin systems are mostly configured to order, fixed configurations on promotion are uncommon. This page may be empty for long stretches; for more prebuilt options, see Corsair, CyberPowerPC, and iBUYPOWER.",
    ],
    lines: [
      { name: "Neuron", summary: "Origin PC's mid-tower gaming desktop, offered in a wide range of configurations." },
      { name: "Genesis", summary: "Full-tower systems with room for top-end GPUs and custom liquid cooling." },
      { name: "Chronos", summary: "Compact small-form-factor gaming PCs." },
    ],
    buyingTips: [
      "Compare a discounted Origin PC against a Corsair Vengeance system with similar parts, since both share Corsair components.",
      "Promoted listings are fixed builds, not configure-to-order options. Check exactly which configuration you are buying.",
      "Factor in Origin's build quality and support, which add value beyond the parts list.",
    ],
    faqs: [
      { q: "Is Origin PC owned by Corsair?", a: "Yes. Corsair acquired Origin PC in 2019, and many Origin systems use Corsair components." },
      { q: "Why are Origin PC deals rare?", a: "Most Origin PCs are built to order and sold directly, so few fixed configurations are available at a discount." },
    ],
  },
  {
    slug: "cyberpowerpc",
    name: "CyberPowerPC",
    group: "pcs",
    apiBrand: "CyberpowerPC",
    aliases: ["cyberpowerpc", "cyberpower pc"],
    searches: [{ keywords: "CyberpowerPC gaming PC", searchIndex: "Computers" }],
    include: DESKTOP,
    exclude: PERIPHERALS,
    sells: "prebuilt gaming PCs",
    intro:
      "CyberPowerPC is one of the largest prebuilt gaming PC makers in the United States, known for aggressive pricing and frequent promotions on its Gamer Xtreme, Gamer Supreme, and Gamer Master desktops.",
    overview: [
      "CyberPowerPC is a California-based system builder that has been assembling gaming PCs since the late 1990s. Its systems use standard off-the-shelf components, which keeps them easy to upgrade and makes it simple to compare a deal against the cost of building the same machine yourself.",
      "Because CyberPowerPC offers so many configurations, discounts often land on specific builds rather than whole lines. Checking the exact CPU, GPU, memory, and storage is the key to spotting the best value.",
    ],
    lines: [
      { name: "Gamer Xtreme", summary: "Mainstream gaming desktops, usually Intel-based, in a wide range of GPU options." },
      { name: "Gamer Supreme", summary: "Higher-end systems with stronger GPUs and liquid cooling options." },
      { name: "Gamer Master", summary: "AMD-based gaming desktops across budget and mid-range tiers." },
    ],
    buyingTips: [
      "Check the power supply brand and wattage. Budget configurations sometimes ship with a basic unit.",
      "Look for 16GB or more of dual-channel memory and at least a 1TB NVMe SSD.",
      "Compare the price with the GPU's standalone price. A strong deal costs little more than the parts.",
    ],
    faqs: [
      { q: "Are CyberPowerPC gaming PCs good value?", a: "Often, especially on promotion. They use standard parts, so you can verify the value by pricing the main components yourself." },
      { q: "Can CyberPowerPC systems be upgraded?", a: "Yes. They use standard motherboards, power supplies, and cases, so common upgrades work as in a DIY build." },
    ],
  },
  {
    slug: "ibuypower",
    name: "iBUYPOWER",
    group: "pcs",
    apiBrand: "iBUYPOWER",
    aliases: ["ibuypower"],
    searches: [{ keywords: "iBUYPOWER gaming PC", searchIndex: "Computers" }],
    include: DESKTOP,
    exclude: PERIPHERALS,
    sells: "prebuilt gaming PCs",
    intro:
      "iBUYPOWER is a long-running US gaming PC builder known for RGB-heavy designs and competitive pricing. Its prebuilt desktops are discounted regularly, especially when new GPU generations arrive.",
    overview: [
      "iBUYPOWER has been building custom and prebuilt gaming PCs in California since the late 1990s. Its systems use standard components in its own case designs, from compact builds to showpiece towers with full glass panels.",
      "Like other large builders, iBUYPOWER discounts specific configurations to clear stock. The best iBUYPOWER deals pair a current-generation GPU with balanced memory, storage, and power supply choices.",
    ],
    lines: [
      { name: "Prebuilt gaming desktops", summary: "Ready-to-ship systems across budget, mid-range, and high-end tiers." },
      { name: "Custom-look cases", summary: "iBUYPOWER's own case designs with tempered glass and RGB lighting." },
    ],
    buyingTips: [
      "Check the exact GPU model and memory amount. Similar-looking builds can differ significantly in performance.",
      "Confirm memory is dual-channel and storage is NVMe.",
      "Look at case airflow. Glass-front showpiece cases can run warmer than mesh-front designs.",
    ],
    faqs: [
      { q: "Is iBUYPOWER a good gaming PC brand?", a: "iBUYPOWER systems use standard parts and are widely available. As with any builder, judge each deal by its components and price." },
      { q: "When are iBUYPOWER discounts biggest?", a: "Around new GPU launches and major sale events, when outgoing configurations are cleared." },
    ],
  },
  {
    slug: "skytech",
    name: "Skytech Gaming",
    group: "pcs",
    apiBrand: "Skytech Gaming",
    aliases: ["skytech", "skytech gaming"],
    searches: [{ keywords: "Skytech gaming PC", searchIndex: "Computers" }],
    include: DESKTOP,
    exclude: PERIPHERALS,
    sells: "prebuilt gaming PCs",
    intro:
      "Skytech Gaming builds prebuilt gaming PCs that are consistently among the most popular online, with lines such as Archangel, Shadow, and Chronos covering budget to high-end builds.",
    overview: [
      "Skytech Gaming focuses on ready-to-ship gaming desktops built from standard components. Its systems are popular with first-time PC buyers because they arrive ready to play and are easy to upgrade later.",
      "Skytech promotions are frequent, and older configurations are often marked down when a new GPU generation launches. Comparing GPU, CPU, and memory across similar listings is the fastest way to find the strongest value.",
    ],
    lines: [
      { name: "Archangel", summary: "Mid-range gaming desktops with mesh-front cases and solid airflow." },
      { name: "Shadow and Chronos", summary: "Mainstream to high-end builds across a range of GPU options." },
    ],
    buyingTips: [
      "Compare similar Skytech listings carefully. Small differences in GPU or memory can change the value significantly.",
      "Check the included power supply rating if you plan to upgrade the GPU.",
      "Look for at least a 1TB SSD; smaller drives fill quickly with modern games.",
    ],
    faqs: [
      { q: "Are Skytech gaming PCs reliable?", a: "They use standard off-the-shelf components, so reliability and repairability are similar to a well-built DIY PC." },
      { q: "Can I upgrade a Skytech PC?", a: "Yes. Standard motherboards, cases, and power supplies make GPU, memory, and storage upgrades straightforward." },
    ],
  },
  {
    slug: "hp-omen",
    name: "HP OMEN",
    group: "pcs",
    apiBrand: "HP",
    aliases: ["hp", "omen"],
    searches: [{ keywords: "HP OMEN gaming", searchIndex: "Computers" }],
    // HP sells far more than gaming hardware; only list OMEN and Victus.
    require: /\b(omen|victus)\b/i,
    include: DESKTOP,
    exclude: new RegExp(`${PERIPHERALS.source}|\\b(laptop|notebook)\\b`, "i"),
    sells: "OMEN and Victus gaming laptops, desktops, and monitors",
    intro:
      "OMEN is HP's gaming brand, covering gaming desktops, laptops, and monitors, with the more affordable Victus line below it. HP runs frequent promotions on both.",
    overview: [
      "HP launched its OMEN gaming brand to compete directly with the major gaming PC makers, offering desktops in several tower sizes and gaming laptops from mainstream to high-end. The Victus line brings gaming hardware to lower price points.",
      "Because HP sells through many channels, OMEN and Victus prices move often. Previous-generation OMEN laptops in particular are frequently discounted when new models launch.",
    ],
    lines: [
      { name: "OMEN desktops", summary: "Gaming towers in several sizes, with configurations from mid-range to flagship GPUs." },
      { name: "OMEN laptops", summary: "Performance gaming laptops with high-refresh displays." },
      { name: "Victus", summary: "HP's budget-friendly gaming laptops and desktops." },
    ],
    buyingTips: [
      "Victus models trade some build quality and cooling for price. Compare carefully against discounted OMEN models.",
      "For laptops, check the GPU's power limit, not just its name.",
      "Check memory and storage upgradability before buying a laptop.",
    ],
    faqs: [
      { q: "What is the difference between OMEN and Victus?", a: "OMEN is HP's premium gaming line; Victus is its more affordable gaming range with simpler designs and cooling." },
      { q: "Does this page include regular HP laptops?", a: "No. We list only HP's gaming hardware under the OMEN and Victus names." },
    ],
  },
  {
    slug: "lenovo-legion",
    name: "Lenovo Legion",
    group: "pcs",
    apiBrand: "Lenovo",
    aliases: ["lenovo", "legion"],
    searches: [{ keywords: "Lenovo Legion gaming", searchIndex: "Computers" }],
    require: /\b(legion|loq)\b/i,
    include: DESKTOP,
    exclude: new RegExp(`${PERIPHERALS.source}|\\b(laptop|notebook)\\b`, "i"),
    sells: "Legion and LOQ gaming laptops, desktops, and handhelds",
    intro:
      "Legion is Lenovo's gaming brand, best known for well-cooled gaming laptops with strong keyboards, plus Legion Tower desktops and the Legion Go handheld. The LOQ line offers similar hardware at lower prices.",
    overview: [
      "Lenovo launched Legion as its dedicated gaming brand and has built a strong reputation for laptops that balance performance, cooling, and build quality. Legion Pro models target maximum performance, while LOQ brings gaming hardware to budget-conscious buyers.",
      "Legion laptops see regular promotions, and outgoing generations are often discounted heavily when new models launch, making them some of the best-value gaming laptops to track.",
    ],
    lines: [
      { name: "Legion laptops", summary: "Legion 5, 7, and Pro gaming laptops with high-refresh displays and strong cooling." },
      { name: "LOQ", summary: "Lenovo's budget gaming laptops and desktops." },
      { name: "Legion Tower and Go", summary: "Gaming desktops and the Legion Go handheld PC." },
    ],
    buyingTips: [
      "Compare GPU power limits across Legion and LOQ models; higher limits deliver more performance from the same GPU.",
      "Check whether memory is upgradeable; some thin models use soldered RAM.",
      "Previous-generation Legion Pro models can outperform new mid-range laptops at a similar sale price.",
    ],
    faqs: [
      { q: "What is the difference between Legion and LOQ?", a: "Legion is Lenovo's main gaming line with premium builds and cooling; LOQ offers similar components in simpler, cheaper designs." },
      { q: "Does this page include regular Lenovo laptops?", a: "No. We list only Lenovo's gaming hardware under the Legion and LOQ names." },
    ],
  },
  {
    slug: "asus-rog",
    name: "ASUS ROG",
    group: "pcs",
    apiBrand: "ASUS",
    aliases: ["asus", "rog", "republic of gamers"],
    searches: [
      { keywords: "ASUS ROG gaming", searchIndex: "Computers" },
      { keywords: "ASUS ROG", searchIndex: "VideoGames" },
    ],
    require: /\b(rog|tuf gaming|republic of gamers)\b/i,
    include: DESKTOP,
    exclude: new RegExp(`${PERIPHERALS.source}|\\b(laptop|notebook)\\b`, "i"),
    sells: "ROG and TUF gaming laptops, handhelds, mice, keyboards, and monitors",
    intro:
      "ROG (Republic of Gamers) is ASUS's gaming brand, spanning gaming laptops, the ROG Ally handheld, motherboards, monitors, and peripherals. The TUF Gaming line offers durable, more affordable alternatives.",
    overview: [
      "ASUS launched Republic of Gamers in 2006 and it has grown into one of the broadest gaming brands available, from Strix and Zephyrus laptops to ROG mice, keyboards, headsets, and high-refresh monitors.",
      "ROG products are refreshed often, so previous-generation laptops and peripherals regularly drop in price. The TUF Gaming range is worth comparing when you want similar performance for less.",
    ],
    lines: [
      { name: "Laptops", summary: "Strix, Zephyrus, and Flow gaming laptops, plus TUF Gaming models." },
      { name: "ROG Ally", summary: "ASUS's handheld gaming PC." },
      { name: "Peripherals", summary: "ROG mice, keyboards, and headsets." },
      { name: "Monitors", summary: "ROG Swift and Strix gaming monitors, including OLED models." },
    ],
    buyingTips: [
      "Compare Strix and TUF models with the same GPU; TUF often matches performance for less.",
      "For monitors, match resolution and refresh rate to your GPU.",
      "Check the exact laptop model year; ASUS reuses names across generations.",
    ],
    faqs: [
      { q: "What is the difference between ROG and TUF Gaming?", a: "ROG is ASUS's premium gaming line; TUF Gaming focuses on durability and value with simpler designs." },
      { q: "Does this page include regular ASUS products?", a: "No. We list only ASUS gaming products under the ROG and TUF Gaming names." },
    ],
  },
  {
    slug: "msi",
    name: "MSI",
    group: "pcs",
    apiBrand: "MSI",
    searches: [{ keywords: "MSI gaming", searchIndex: "Computers" }],
    include: DESKTOP,
    exclude: new RegExp(`${PERIPHERALS.source}|\\b(laptop|notebook)\\b`, "i"),
    sells: "gaming laptops, desktops, monitors, and components",
    intro:
      "MSI is a major Taiwanese hardware maker known for gaming laptops, motherboards, graphics cards, and monitors. Its wide range means there are almost always MSI promotions to track.",
    overview: [
      "Founded in 1986, MSI makes motherboards and graphics cards for PC builders alongside complete gaming laptops, desktops, and monitors. Its laptop range runs from budget models to flagship machines.",
      "MSI refreshes its laptops and monitors frequently, so outgoing models are regularly discounted. Its components also see steady promotions, especially around new GPU and CPU launches.",
    ],
    lines: [
      { name: "Gaming laptops", summary: "From budget Cyborg and Katana models to flagship Raider and Titan machines." },
      { name: "Monitors", summary: "MAG and MPG gaming monitors, including QD-OLED panels." },
      { name: "Components", summary: "Motherboards and graphics cards for PC builders." },
    ],
    buyingTips: [
      "MSI laptops in the same price band can have very different GPU power limits; compare them.",
      "For graphics cards, compare the discounted MSI model against other brands' versions of the same GPU.",
      "OLED monitors are frequently promoted; check the warranty terms on burn-in.",
    ],
    faqs: [
      { q: "Are MSI gaming laptops good value on sale?", a: "Often. MSI discounts previous-generation laptops regularly, and they can outperform newer budget models at a similar price." },
      { q: "Does MSI make prebuilt gaming PCs?", a: "Yes. MSI sells gaming desktops alongside laptops, monitors, and components." },
    ],
  },
  {
    slug: "acer-predator",
    name: "Acer Predator",
    group: "pcs",
    apiBrand: "Acer",
    aliases: ["acer", "predator"],
    searches: [{ keywords: "Acer Predator gaming", searchIndex: "Computers" }],
    require: /\b(predator|nitro)\b/i,
    include: DESKTOP,
    exclude: new RegExp(`${PERIPHERALS.source}|\\b(laptop|notebook)\\b`, "i"),
    sells: "Predator and Nitro gaming laptops, desktops, and monitors",
    intro:
      "Predator is Acer's gaming brand, covering Helios gaming laptops, Orion desktops, and high-refresh monitors, with the Nitro line offering strong value at lower prices.",
    overview: [
      "Acer's Predator brand targets enthusiast gamers with high-performance laptops and desktops, while Nitro brings gaming hardware to entry and mid-range budgets. Both lines are refreshed frequently.",
      "Nitro laptops in particular are among the most frequently discounted gaming laptops, making them a common pick for budget gaming builds on sale.",
    ],
    lines: [
      { name: "Predator Helios", summary: "Performance gaming laptops with high-refresh displays." },
      { name: "Predator Orion", summary: "Gaming desktops with tool-less upgrade access." },
      { name: "Nitro", summary: "Acer's value gaming laptops, desktops, and monitors." },
    ],
    buyingTips: [
      "Nitro models trade build quality and cooling for price; compare against discounted Helios models.",
      "Check display refresh rate and brightness on laptops; budget panels vary widely.",
      "Look for upgradeable memory and a spare SSD slot.",
    ],
    faqs: [
      { q: "What is the difference between Predator and Nitro?", a: "Predator is Acer's premium gaming line; Nitro is its value-focused gaming range." },
      { q: "Does this page include regular Acer laptops?", a: "No. We list only Acer's gaming products under the Predator and Nitro names." },
    ],
  },
  {
    slug: "nzxt",
    name: "NZXT",
    group: "pcs",
    apiBrand: "NZXT",
    searches: [{ keywords: "NZXT", searchIndex: "Computers" }],
    include: DESKTOP,
    exclude: PERIPHERALS,
    sells: "gaming PCs, cases, coolers, and peripherals",
    intro:
      "NZXT is known for clean, minimalist PC cases and Kraken liquid coolers, and it also builds prebuilt Player gaming PCs. Its components and cases see frequent promotions.",
    overview: [
      "NZXT was founded in 2004 and became one of the most recognisable PC case and cooling brands. Its H-series cases and Kraken AIO coolers are popular with DIY builders, and its Player PCs bring the same design to prebuilt systems.",
      "NZXT products are managed through its CAM software, and the company has expanded into peripherals including keyboards, mice, and audio.",
    ],
    lines: [
      { name: "Player PCs", summary: "Prebuilt gaming desktops in NZXT's own cases." },
      { name: "Cases", summary: "H-series cases with clean lines and good cable management." },
      { name: "Kraken coolers", summary: "AIO liquid coolers, several with LCD pump displays." },
    ],
    buyingTips: [
      "Check cooler and case compatibility before buying components separately.",
      "Prebuilt Player PCs use standard parts; price the GPU to judge the deal.",
      "LCD Kraken models cost more; non-LCD versions cool just as well.",
    ],
    faqs: [
      { q: "Does NZXT make prebuilt gaming PCs?", a: "Yes. NZXT sells Player prebuilt PCs alongside cases, coolers, and peripherals." },
      { q: "Are NZXT cases good for airflow?", a: "Current NZXT cases with mesh or flow front panels offer good airflow; solid-front models prioritise looks and noise." },
    ],
  },

  // -------------------------------------------------------- Peripherals
  {
    slug: "logitech",
    name: "Logitech G",
    group: "peripherals",
    apiBrand: "Logitech",
    aliases: ["logitech", "logitech g"],
    searches: [
      { keywords: "Logitech G gaming", searchIndex: "VideoGames" },
      { keywords: "Logitech G gaming", searchIndex: "Computers" },
    ],
    // Logitech also sells office gear; only list its gaming lines.
    require: /\b(logitech g|gaming|lightspeed|astro|g pro|pro x|racing wheel)\b/i,
    include: NO_DESKTOPS,
    exclude: PERIPHERALS,
    sells: "gaming mice, keyboards, headsets, and racing wheels",
    intro:
      "Logitech G is Logitech's gaming division, best known for lightweight wireless mice, LIGHTSPEED wireless, and the racing wheels many sim racers start with. Its gear is promoted often.",
    overview: [
      "Logitech was founded in 1981 in Switzerland and became one of the world's largest makers of computer peripherals. Its gaming brand covers mice, keyboards, headsets, racing wheels, and streaming gear, expanded through acquisitions such as ASTRO Gaming and Blue microphones.",
      "Logitech refreshes models regularly, so the previous generation is often discounted heavily while still being very capable. This page lists only Logitech's gaming products, not its office range.",
    ],
    lines: [
      { name: "PRO series", summary: "Esports mice, keyboards, and headsets designed with professional players." },
      { name: "G series", summary: "Mainstream gaming peripherals such as the G502 mouse family." },
      { name: "Racing wheels", summary: "Force-feedback wheels and pedals for PC, PlayStation, and Xbox." },
      { name: "ASTRO and Blue", summary: "Headsets and streaming microphones now part of Logitech G." },
    ],
    buyingTips: [
      "Logitech keeps older versions on sale alongside newer ones with similar names; check the generation.",
      "LIGHTSPEED models use a low-latency wireless receiver suited to competitive play.",
      "Racing wheels are platform-specific; confirm PC, PlayStation, or Xbox support.",
    ],
    faqs: [
      { q: "Does this page include Logitech office products?", a: "No. We list only Logitech's gaming products, including Logitech G, ASTRO, and racing wheels." },
      { q: "Are older Logitech G mice worth buying?", a: "Often. Previous-generation flagship mice at a discount can be better value than newer mid-range models." },
    ],
  },
  {
    slug: "razer",
    name: "Razer",
    group: "peripherals",
    apiBrand: "Razer",
    searches: [
      { keywords: "Razer", searchIndex: "VideoGames" },
      { keywords: "Razer", searchIndex: "Computers" },
    ],
    include: NO_DESKTOPS,
    exclude: PERIPHERALS,
    sells: "gaming mice, keyboards, headsets, controllers, and Blade laptops",
    intro:
      "Razer builds gaming gear with a strong focus on design and performance, from DeathAdder and Viper mice to BlackWidow keyboards and Blade laptops. The deepest promotions often land on outgoing models.",
    overview: [
      "Razer was founded in 2005 and grew into one of the most recognisable gaming brands in the world. It designs mice, keyboards, headsets, laptops, controllers, and streaming equipment, tied together by Synapse software and Chroma RGB lighting.",
      "Razer refreshes its popular lines often, so the previous version of a mouse or keyboard is frequently discounted while remaining competitive.",
    ],
    lines: [
      { name: "Mice", summary: "DeathAdder, Viper, and Basilisk families, from ergonomic to ultra-light designs." },
      { name: "Keyboards", summary: "BlackWidow and Huntsman keyboards with mechanical and optical switches." },
      { name: "Headsets", summary: "Kraken and BlackShark headsets for PC and console." },
      { name: "Blade laptops", summary: "Premium thin-and-light gaming laptops." },
    ],
    buyingTips: [
      "Razer reuses names across versions (V2, V3, Pro). Check the exact version before comparing prices.",
      "Optical switches are faster and more durable; mechanical switches offer more feel options.",
      "For Blade laptops, compare the GPU and its power limit, not just the model year.",
    ],
    faqs: [
      { q: "Are older Razer models still worth buying?", a: "Often. A previous-generation Razer mouse or keyboard at 30 to 40 percent off can beat a new model at full price." },
      { q: "Do I need Razer Synapse?", a: "Synapse customises lighting and settings, but many Razer devices store settings on board and work without it." },
    ],
  },
  {
    slug: "steelseries",
    name: "SteelSeries",
    group: "peripherals",
    apiBrand: "SteelSeries",
    searches: [
      { keywords: "SteelSeries", searchIndex: "VideoGames" },
      { keywords: "SteelSeries", searchIndex: "Computers" },
    ],
    include: NO_DESKTOPS,
    exclude: PERIPHERALS,
    sells: "Arctis headsets, Apex keyboards, mice, and mouse pads",
    intro:
      "SteelSeries is a Danish gaming peripheral maker known for Arctis headsets, Apex keyboards with adjustable switches, and QcK mouse pads.",
    overview: [
      "SteelSeries was founded in Denmark in 2001 and has been part of competitive gaming since the early days of esports. Its products are managed through SteelSeries GG software.",
      "When SteelSeries launches a new Arctis or Apex generation, the outgoing models are frequently discounted, which makes it one of the best brands to track for markdowns.",
    ],
    lines: [
      { name: "Arctis headsets", summary: "Wired and wireless headsets for PC and console, including Arctis Nova." },
      { name: "Apex keyboards", summary: "Mechanical and adjustable-switch keyboards." },
      { name: "Mice and QcK pads", summary: "Aerox, Rival, and Prime mice plus cloth and hard mouse pads." },
    ],
    buyingTips: [
      "Arctis headsets come in platform-specific versions; check compatibility.",
      "Adjustable-switch Apex Pro keyboards are worth the premium for fast-paced games.",
      "Mouse pad promotions are frequent and a cheap upgrade alongside a new mouse.",
    ],
    faqs: [
      { q: "Are SteelSeries headsets good value on sale?", a: "Yes. Arctis headsets are comfortable and well reviewed, and older generations drop significantly when new models launch." },
      { q: "What software do SteelSeries products use?", a: "SteelSeries GG manages lighting, audio, and device settings." },
    ],
  },
  {
    slug: "hyperx",
    name: "HyperX",
    group: "peripherals",
    apiBrand: "HyperX",
    searches: [
      { keywords: "HyperX", searchIndex: "VideoGames" },
      { keywords: "HyperX", searchIndex: "Computers" },
    ],
    include: NO_DESKTOPS,
    exclude: PERIPHERALS,
    sells: "Cloud headsets, keyboards, mice, and microphones",
    intro:
      "HyperX is best known for its Cloud gaming headsets, among the most popular ever made, plus Alloy keyboards, Pulsefire mice, and QuadCast microphones. Its gear is promoted frequently.",
    overview: [
      "HyperX began as Kingston's gaming division and was acquired by HP in 2021. Its Cloud headsets built a reputation for comfort and value, and the range now covers keyboards, mice, microphones, and console accessories.",
      "HyperX products are discounted often, and long-running models like the Cloud II and Cloud III regularly appear at strong prices.",
    ],
    lines: [
      { name: "Cloud headsets", summary: "Comfortable wired and wireless headsets for PC and console." },
      { name: "Alloy keyboards", summary: "Mechanical gaming keyboards in full-size and compact layouts." },
      { name: "Pulsefire mice", summary: "Lightweight gaming mice, wired and wireless." },
      { name: "QuadCast and SoloCast", summary: "USB microphones popular with streamers." },
    ],
    buyingTips: [
      "Cloud headsets come in several versions; check whether a model is wired, wireless, or console-specific.",
      "QuadCast microphones are frequently discounted and are a strong first streaming mic.",
      "Compare Pulsefire weights and shapes; they vary more than the names suggest.",
    ],
    faqs: [
      { q: "Is HyperX owned by HP?", a: "Yes. HP acquired HyperX from Kingston in 2021." },
      { q: "Are HyperX Cloud headsets worth buying on sale?", a: "Yes. They are comfortable and durable, and frequent promotions make them strong value." },
    ],
  },
  {
    slug: "turtle-beach",
    name: "Turtle Beach",
    group: "peripherals",
    apiBrand: "Turtle Beach",
    searches: [{ keywords: "Turtle Beach", searchIndex: "VideoGames" }],
    include: NO_DESKTOPS,
    exclude: PERIPHERALS,
    sells: "gaming headsets, controllers, and PC peripherals",
    intro:
      "Turtle Beach is one of the biggest names in console and PC gaming headsets, with its Stealth and Recon lines, and it now also makes controllers and PC peripherals.",
    overview: [
      "Turtle Beach became a household name in console gaming audio, and has expanded through acquisitions including ROCCAT PC peripherals and PDP controllers.",
      "Turtle Beach headsets are among the most frequently discounted gaming headsets, especially around holiday sale events and new model launches.",
    ],
    lines: [
      { name: "Stealth headsets", summary: "Wireless headsets for Xbox, PlayStation, and PC." },
      { name: "Recon headsets", summary: "Affordable wired headsets for every platform." },
      { name: "Controllers", summary: "Wired and wireless controllers for Xbox and PC." },
    ],
    buyingTips: [
      "Check the platform version; many Stealth headsets come in separate Xbox and PlayStation editions.",
      "Recon wired headsets are a strong budget pick when discounted.",
      "For controllers, check for Hall-effect sticks, which resist drift.",
    ],
    faqs: [
      { q: "Do Turtle Beach headsets work on PC?", a: "Most do, but some wireless models are console-specific. Check compatibility on the listing." },
      { q: "When are Turtle Beach discounts biggest?", a: "Around major holiday sales and when new headset generations launch." },
    ],
  },
  {
    slug: "glorious",
    name: "Glorious",
    group: "peripherals",
    apiBrand: "Glorious",
    aliases: ["glorious", "glorious pc gaming race"],
    searches: [{ keywords: "Glorious gaming", searchIndex: "Computers" }],
    include: NO_DESKTOPS,
    exclude: PERIPHERALS,
    sells: "lightweight mice, modular keyboards, and mouse pads",
    intro:
      "Glorious is an enthusiast peripheral brand known for lightweight Model O and Model D mice, modular hot-swap GMMK keyboards, and large mouse pads.",
    overview: [
      "Glorious grew from the PC enthusiast community and helped popularise ultra-light gaming mice and hot-swappable mechanical keyboards that let you change switches without soldering.",
      "Glorious products are discounted regularly, and keyboard kits and switch packs make it easy to customise a build on a budget.",
    ],
    lines: [
      { name: "Model O and Model D", summary: "Lightweight gaming mice in ambidextrous and ergonomic shapes." },
      { name: "GMMK keyboards", summary: "Modular, hot-swappable mechanical keyboards." },
      { name: "Mouse pads", summary: "Cloth pads in sizes up to full-desk mats." },
    ],
    buyingTips: [
      "Hot-swap keyboards let you change switches later; a discounted board plus your own switches can beat a prebuilt option.",
      "Check whether a keyboard is prebuilt or a barebones kit without switches and keycaps.",
      "Wireless versions of Glorious mice cost more; compare the wired version if latency and weight matter most.",
    ],
    faqs: [
      { q: "What does hot-swappable mean?", a: "Switches can be removed and replaced without soldering, so you can change the keyboard's feel at any time." },
      { q: "Are Glorious mice good for competitive play?", a: "Yes. They are light, use accurate sensors, and are popular with competitive players." },
    ],
  },

  // -------------------------------------------------------- Controllers
  {
    slug: "scuf",
    name: "SCUF Gaming",
    group: "controllers",
    apiBrand: "SCUF",
    aliases: ["scuf", "scuf gaming"],
    searches: [{ keywords: "SCUF controller", searchIndex: "VideoGames" }],
    include: NO_DESKTOPS,
    exclude: PERIPHERALS,
    sells: "performance controllers for PC, Xbox, and PlayStation",
    intro:
      "SCUF Gaming makes performance controllers with remappable rear paddles, adjustable triggers, and interchangeable thumbsticks, used by competitive players across PC and console.",
    overview: [
      "SCUF was founded in 2011 and pioneered the rear-paddle controller design now common across pro controllers. It was acquired by Corsair in 2019 and makes controllers for Xbox, PlayStation, and PC.",
      "SCUF controllers sit at the premium end of the market, so promotions make a real difference. Outgoing models and limited designs are the most frequently discounted.",
    ],
    lines: [
      { name: "Instinct Pro", summary: "SCUF's Xbox and PC controller with rear paddles and trigger stops." },
      { name: "Reflex", summary: "PlayStation 5 controllers built on the DualSense platform." },
      { name: "Envision", summary: "PC-focused controllers with extra remappable buttons." },
    ],
    buyingTips: [
      "Check platform compatibility; SCUF makes separate controllers for Xbox and PlayStation.",
      "Compare paddle count and trigger options between models; they differ more than the price suggests.",
      "Look for Hall-effect or replaceable thumbsticks if stick drift is a concern.",
    ],
    faqs: [
      { q: "Is SCUF owned by Corsair?", a: "Yes. Corsair acquired SCUF Gaming in 2019." },
      { q: "Are SCUF controllers worth it?", a: "For competitive players, rear paddles and adjustable triggers are a real advantage, and discounts narrow the price gap with standard controllers." },
    ],
  },
  {
    slug: "xbox",
    name: "Xbox",
    group: "controllers",
    apiBrand: "Xbox",
    aliases: ["xbox", "microsoft"],
    searches: [{ keywords: "Xbox controller", searchIndex: "VideoGames" }],
    // Only controllers, headsets, and accessories, not consoles or games.
    require: /\b(controller|headset|charging|play and charge|adapter|elite|rechargeable battery)\b/i,
    include: NO_DESKTOPS,
    exclude: PERIPHERALS,
    sells: "controllers, headsets, and accessories for Xbox and PC",
    intro:
      "Microsoft's Xbox Wireless Controller is the standard PC controller, and the Elite Series 2 is one of the most popular pro controllers. Special editions and colours are discounted regularly.",
    overview: [
      "Xbox controllers work natively with Windows PCs as well as Xbox consoles, which makes them the default choice for many PC gamers. Microsoft also makes the Elite Series 2 pro controller and official Xbox headsets.",
      "Limited-edition colours and the Elite controller see the biggest promotions, typically around major sale events.",
    ],
    lines: [
      { name: "Xbox Wireless Controller", summary: "The standard controller for Xbox and Windows PCs, in many colours." },
      { name: "Elite Series 2", summary: "Microsoft's pro controller with paddles and adjustable tension sticks." },
      { name: "Headsets and accessories", summary: "Official headsets, charging kits, and adapters." },
    ],
    buyingTips: [
      "Every current Xbox Wireless Controller works on PC via USB-C, Bluetooth, or the Xbox Wireless Adapter.",
      "The Elite Series 2 Core is a cheaper version without the accessory kit; compare both.",
      "Special-edition colours are often discounted more than the standard black and white models.",
    ],
    faqs: [
      { q: "Do Xbox controllers work on PC?", a: "Yes. They are supported natively in Windows and in most PC games." },
      { q: "Does this page include Xbox consoles or games?", a: "No. We list only Xbox controllers, headsets, and accessories." },
    ],
  },
  {
    slug: "playstation",
    name: "PlayStation",
    group: "controllers",
    apiBrand: "PlayStation",
    aliases: ["playstation", "sony"],
    searches: [{ keywords: "PlayStation DualSense controller", searchIndex: "VideoGames" }],
    require: /\b(dualsense|controller|headset|pulse|charging)\b/i,
    include: NO_DESKTOPS,
    exclude: PERIPHERALS,
    sells: "DualSense controllers, Pulse headsets, and accessories",
    intro:
      "Sony's DualSense controller, with haptic feedback and adaptive triggers, works on PlayStation 5 and PC. The DualSense Edge pro controller and Pulse headsets round out the range.",
    overview: [
      "The DualSense controller introduced detailed haptics and adaptive triggers, and works on PC over USB or Bluetooth with growing game support. The DualSense Edge adds back buttons, trigger stops, and replaceable stick modules.",
      "DualSense colour variants and limited editions are discounted often, especially around holiday and summer sale events.",
    ],
    lines: [
      { name: "DualSense", summary: "The standard PS5 controller, in many colours and limited editions." },
      { name: "DualSense Edge", summary: "Sony's pro controller with back buttons and replaceable stick modules." },
      { name: "Pulse headsets", summary: "Official PlayStation wireless headsets and earbuds." },
    ],
    buyingTips: [
      "DualSense works on PC; haptics and adaptive triggers need a wired connection in many games.",
      "The DualSense Edge's replaceable stick modules address stick drift long-term.",
      "Colour variants are often discounted more than the standard white controller.",
    ],
    faqs: [
      { q: "Does the DualSense work on PC?", a: "Yes, over USB or Bluetooth. Haptics and adaptive triggers work in supported PC games, usually over a wired connection." },
      { q: "Does this page include PlayStation consoles or games?", a: "No. We list only PlayStation controllers, headsets, and accessories." },
    ],
  },
  {
    slug: "powera",
    name: "PowerA",
    group: "controllers",
    apiBrand: "PowerA",
    searches: [{ keywords: "PowerA controller", searchIndex: "VideoGames" }],
    include: NO_DESKTOPS,
    exclude: PERIPHERALS,
    sells: "licensed controllers and accessories for Xbox, Switch, and PC",
    intro:
      "PowerA makes officially licensed controllers and accessories for Xbox, Nintendo Switch, and PC, from budget wired controllers to Fusion Pro models with paddles.",
    overview: [
      "PowerA is known for affordable, officially licensed controllers, including Enhanced Wired Controllers for Xbox and PC and a wide range of Switch controllers. Its Fusion Pro line adds pro features like rear paddles.",
      "PowerA controllers are already priced below first-party controllers, and promotions make them some of the cheapest ways to add a second controller.",
    ],
    lines: [
      { name: "Enhanced Wired Controller", summary: "Affordable wired controllers for Xbox and PC with mappable buttons." },
      { name: "Fusion Pro", summary: "Pro controllers with rear paddles and trigger locks." },
      { name: "Switch controllers", summary: "Licensed wired and wireless controllers for Nintendo Switch." },
    ],
    buyingTips: [
      "Check whether a controller is wired or wireless; many PowerA models are wired-only.",
      "Licensed Xbox controllers work on PC as standard XInput devices.",
      "Fusion Pro models offer paddles for less than first-party pro controllers.",
    ],
    faqs: [
      { q: "Do PowerA controllers work on PC?", a: "Their Xbox-licensed controllers work on Windows PCs. Check the listing for each model's compatibility." },
      { q: "Are PowerA controllers officially licensed?", a: "Yes. PowerA makes officially licensed controllers for Xbox and Nintendo Switch." },
    ],
  },
  {
    slug: "8bitdo",
    name: "8BitDo",
    group: "controllers",
    apiBrand: "8Bitdo",
    aliases: ["8bitdo"],
    searches: [{ keywords: "8BitDo controller", searchIndex: "VideoGames" }],
    include: NO_DESKTOPS,
    exclude: PERIPHERALS,
    sells: "controllers, arcade sticks, and retro-style keyboards",
    intro:
      "8BitDo makes well-built, affordable controllers with retro styling, including the Ultimate and Pro 2 controllers, arcade sticks, and retro mechanical keyboards.",
    overview: [
      "8BitDo started with retro-inspired controllers and has become a favourite for PC, Switch, and Android gaming thanks to strong build quality at modest prices. Many current models use Hall-effect sticks that resist drift.",
      "8BitDo products are frequently discounted, and its controllers often outperform first-party options at a fraction of the price.",
    ],
    lines: [
      { name: "Ultimate controllers", summary: "Wireless controllers with charging docks and Hall-effect sticks." },
      { name: "Pro 2", summary: "A versatile controller with back buttons and a retro-inspired layout." },
      { name: "Arcade sticks and keyboards", summary: "Fight sticks and retro-styled mechanical keyboards." },
    ],
    buyingTips: [
      "Check platform support; some 8BitDo models target Switch or Xbox, others PC and Android.",
      "Look for Hall-effect sticks if drift has been a problem with past controllers.",
      "Charging-dock bundles are often discounted together with the controller.",
    ],
    faqs: [
      { q: "Do 8BitDo controllers work on PC?", a: "Most do, over USB, Bluetooth, or an included 2.4GHz receiver. Check each model's listing for supported platforms." },
      { q: "What are Hall-effect sticks?", a: "Thumbsticks that use magnets instead of physical contact sensors, which greatly reduces stick drift over time." },
    ],
  },
  {
    slug: "thrustmaster",
    name: "Thrustmaster",
    group: "controllers",
    apiBrand: "Thrustmaster",
    searches: [{ keywords: "Thrustmaster", searchIndex: "VideoGames" }],
    include: NO_DESKTOPS,
    exclude: PERIPHERALS,
    sells: "racing wheels, flight sticks, and HOTAS setups",
    intro:
      "Thrustmaster makes racing wheels and flight simulation controllers, from entry-level wheels to direct-drive bases and HOTAS flight setups.",
    overview: [
      "Thrustmaster is a French company and a long-standing name in sim racing and flight simulation. Its wheels support PC and console, and its flight sticks and throttles are popular with flight sim players.",
      "Sim gear is expensive, so promotions on Thrustmaster wheels and HOTAS bundles can save a significant amount. Bundles with pedals or shifters often carry the biggest discounts.",
    ],
    lines: [
      { name: "Racing wheels", summary: "Belt-driven and direct-drive wheels for PC, PlayStation, and Xbox." },
      { name: "Flight sticks and HOTAS", summary: "Joysticks, throttles, and full hands-on-throttle-and-stick setups." },
      { name: "Pedals and shifters", summary: "Add-ons that expand racing setups." },
    ],
    buyingTips: [
      "Check platform compatibility; racing wheels are usually PlayStation-or-Xbox plus PC.",
      "Belt-driven and direct-drive wheels give smoother force feedback than gear-driven ones.",
      "Compare bundles with pedals included against buying the wheel alone.",
    ],
    faqs: [
      { q: "Do Thrustmaster wheels work on PC?", a: "Yes. Most Thrustmaster wheels support PC alongside either PlayStation or Xbox." },
      { q: "What is a HOTAS?", a: "Hands On Throttle And Stick: a flight setup with a separate joystick and throttle, used in flight and space sims." },
    ],
  },
  // ---------------------------------------------------- More peripherals
  {
    slug: "redragon",
    name: "Redragon",
    group: "peripherals",
    apiBrand: "Redragon",
    searches: [{ keywords: "Redragon gaming", searchIndex: "Computers" }],
    include: NO_DESKTOPS,
    exclude: PERIPHERALS,
    sells: "budget mechanical keyboards, gaming mice, and headsets",
    intro:
      "Redragon makes budget gaming peripherals, best known for affordable mechanical keyboards, RGB gaming mice, and headsets that undercut the big-name brands.",
    overview: [
      "Redragon built its following by bringing mechanical keyboards and high-DPI mice down to entry-level prices. Its range now covers keyboards, mice, headsets, microphones, and mouse pads.",
      "Because Redragon prices start low, even modest discounts can make a complete keyboard, mouse, and headset setup very affordable. Bundles are common and worth comparing against buying items separately.",
    ],
    lines: [
      { name: "Mechanical keyboards", summary: "Full-size, TKL, and 60% boards, many with hot-swap sockets." },
      { name: "Gaming mice", summary: "Wired and wireless mice with adjustable DPI and RGB lighting." },
      { name: "Headsets and mics", summary: "Affordable gaming headsets and USB streaming microphones." },
    ],
    buyingTips: [
      "Check the switch type listed; Redragon uses its own switches, which vary in feel between models.",
      "Hot-swap models let you upgrade switches later, which stretches a budget keyboard further.",
      "Compare bundles against individual prices; the bundle is not always cheaper.",
    ],
    faqs: [
      { q: "Are Redragon keyboards good?", a: "For the price, yes. They are a popular way to get a mechanical keyboard on a tight budget." },
      { q: "Do Redragon keyboards have hot-swap switches?", a: "Many recent models do. Check the product details for hot-swap support before buying." },
    ],
  },
  {
    slug: "keychron",
    name: "Keychron",
    group: "peripherals",
    apiBrand: "Keychron",
    searches: [{ keywords: "Keychron keyboard", searchIndex: "Computers" }],
    include: NO_DESKTOPS,
    exclude: PERIPHERALS,
    sells: "wireless mechanical keyboards and mice",
    intro:
      "Keychron makes wireless mechanical keyboards for gaming, work, and Mac users, with hot-swap switches, QMK and VIA support, and compact layouts.",
    overview: [
      "Keychron became popular for compact wireless mechanical keyboards that work equally well on Mac and Windows. Its range runs from affordable K-series boards to aluminium Q- and V-series custom keyboards.",
      "Keychron keyboards are discounted regularly, especially outgoing versions when a new revision launches. Gaming-focused models add high polling rates for lower latency.",
    ],
    lines: [
      { name: "K series", summary: "Wireless mechanical keyboards in many layouts, from full-size to 60%." },
      { name: "Q and V series", summary: "Customisable keyboards with QMK and VIA support, in aluminium or plastic cases." },
      { name: "Mice", summary: "Lightweight wireless mice designed to pair with Keychron keyboards." },
    ],
    buyingTips: [
      "Check the polling rate if you play competitively; gaming-focused models run at 1000Hz or higher.",
      "QMK and VIA support makes remapping keys easy without extra software.",
      "Older revisions are often cleared at bigger discounts with only minor differences.",
    ],
    faqs: [
      { q: "Are Keychron keyboards good for gaming?", a: "Yes, especially models with high polling rates and wired mode. Use wired or 2.4GHz mode for the lowest latency." },
      { q: "Do Keychron keyboards work with Windows?", a: "Yes. They switch between Mac and Windows layouts." },
    ],
  },
  {
    slug: "cooler-master",
    name: "Cooler Master",
    group: "peripherals",
    apiBrand: "Cooler Master",
    aliases: ["cooler master", "coolermaster"],
    searches: [
      { keywords: "Cooler Master gaming", searchIndex: "Computers" },
      { keywords: "Cooler Master cooler", searchIndex: "Computers" },
    ],
    include: NO_DESKTOPS,
    exclude: PERIPHERALS,
    sells: "PC cases, CPU coolers, power supplies, and peripherals",
    intro:
      "Cooler Master makes PC cases, CPU air and liquid coolers, power supplies, and gaming peripherals, and is one of the longest-running names in PC building.",
    overview: [
      "Founded in 1992, Cooler Master started with cooling and grew into cases, power supplies, keyboards, mice, headsets, and monitors. Its MasterBox and HAF cases and Hyper 212 coolers are long-standing builder favourites.",
      "Cooler Master components are discounted frequently, which makes them a good place to save when building or upgrading a gaming PC.",
    ],
    lines: [
      { name: "Cases", summary: "Airflow-focused MasterBox, HAF, and mesh cases from compact to full tower." },
      { name: "Cooling", summary: "Hyper air coolers and MasterLiquid all-in-one liquid coolers." },
      { name: "Power supplies", summary: "MWE and V series PSUs in a wide range of wattages." },
      { name: "Peripherals", summary: "Gaming keyboards, mice, and headsets." },
    ],
    buyingTips: [
      "Check CPU socket compatibility for coolers, including mounting kits for newer platforms.",
      "Confirm case GPU clearance and radiator support before buying.",
      "For power supplies, buy enough wattage for future GPU upgrades and check the efficiency rating.",
    ],
    faqs: [
      { q: "Is Cooler Master a good brand for PC parts?", a: "Yes. It is a long-established component maker, and its cases and coolers are widely used." },
      { q: "Does the Hyper 212 fit modern CPUs?", a: "Current versions support recent Intel and AMD sockets. Check the listing for socket support." },
    ],
  },

  // ------------------------------------------------ Monitors & Streaming
  {
    slug: "samsung-odyssey",
    name: "Samsung Odyssey",
    group: "displays",
    apiBrand: "Samsung",
    aliases: ["samsung", "samsung electronics"],
    searches: [{ keywords: "Samsung Odyssey gaming monitor", searchIndex: "Computers" }],
    require: /\b(odyssey|gaming monitor)\b/i,
    include: NO_DESKTOPS,
    exclude: PERIPHERALS,
    sells: "gaming monitors, including curved and OLED models",
    intro:
      "Samsung Odyssey is Samsung's gaming monitor line, covering fast 1440p and 4K panels, ultrawide and super-ultrawide curved screens, and QD-OLED displays.",
    overview: [
      "Odyssey monitors range from affordable high-refresh G-series panels to the Odyssey Neo mini-LED and Odyssey OLED models. Samsung is known for aggressive curves and very wide formats such as 49-inch super-ultrawides.",
      "Samsung discounts Odyssey monitors often, particularly older generations when new models arrive, so the same panel can drop significantly in price.",
    ],
    lines: [
      { name: "Odyssey OLED", summary: "QD-OLED gaming monitors with near-instant response times." },
      { name: "Odyssey Neo", summary: "Mini-LED monitors with high brightness for HDR." },
      { name: "Odyssey G series", summary: "High-refresh 1440p and 4K monitors, flat and curved." },
    ],
    buyingTips: [
      "Match resolution to your GPU: 1440p suits most mid-range cards, 4K needs a high-end one.",
      "Check your desk depth and GPU support before buying a super-ultrawide.",
      "OLED monitors offer the best motion clarity; consider burn-in protection features if you play static games.",
    ],
    faqs: [
      { q: "Which Samsung Odyssey monitor is best for gaming?", a: "It depends on budget and GPU. G-series 1440p models are the best value, while Odyssey OLED models offer the best image quality." },
      { q: "Are curved monitors better for gaming?", a: "On wide and ultrawide screens a curve keeps the edges in view and is more immersive. On smaller screens it matters less." },
    ],
  },
  {
    slug: "lg-ultragear",
    name: "LG UltraGear",
    group: "displays",
    apiBrand: "LG",
    aliases: ["lg", "lg electronics"],
    searches: [{ keywords: "LG UltraGear gaming monitor", searchIndex: "Computers" }],
    require: /\b(ultragear|gaming monitor)\b/i,
    include: NO_DESKTOPS,
    exclude: PERIPHERALS,
    sells: "gaming monitors, including OLED and high-refresh models",
    intro:
      "LG UltraGear is LG's gaming monitor line, with fast IPS panels, OLED displays, and dual-mode monitors that switch between high resolution and very high refresh rates.",
    overview: [
      "LG makes many of the panels used across the monitor industry, and its UltraGear line puts them to work in gaming monitors from 24 to 45 inches, including WOLED models.",
      "UltraGear monitors see regular discounts, and previous-generation OLED models in particular can drop to much better prices.",
    ],
    lines: [
      { name: "UltraGear OLED", summary: "WOLED gaming monitors with fast response times and high refresh rates." },
      { name: "UltraGear IPS", summary: "Fast IPS gaming monitors at 1080p, 1440p, and 4K." },
      { name: "Ultrawide", summary: "Curved ultrawide gaming monitors for immersive play." },
    ],
    buyingTips: [
      "Check the refresh rate your GPU can actually reach at the monitor's resolution.",
      "Dual-mode models trade resolution for refresh rate at the press of a button, useful for both competitive and story games.",
      "Look for a DisplayPort or HDMI 2.1 input to reach the full refresh rate.",
    ],
    faqs: [
      { q: "Is LG UltraGear good for gaming?", a: "Yes. UltraGear monitors are widely recommended, especially the fast IPS and OLED models." },
      { q: "What is a dual-mode monitor?", a: "A monitor that can switch between a high resolution at a normal refresh rate and a lower resolution at a much higher refresh rate." },
    ],
  },
  {
    slug: "elgato",
    name: "Elgato",
    group: "displays",
    apiBrand: "Elgato",
    searches: [{ keywords: "Elgato", searchIndex: "Computers" }],
    include: NO_DESKTOPS,
    exclude: PERIPHERALS,
    sells: "capture cards, Stream Decks, webcams, mics, and lights",
    intro:
      "Elgato makes streaming and content creation gear, including capture cards, Stream Deck controllers, webcams, microphones, and key lights.",
    overview: [
      "Elgato is part of Corsair and is one of the most common names on streaming desks. Its Stream Deck controllers, HD60 and 4K capture cards, and Facecam webcams are used by streamers at every level.",
      "Elgato gear is discounted regularly, and bundles or previous-generation capture cards can offer large savings for new streamers.",
    ],
    lines: [
      { name: "Stream Deck", summary: "Programmable LCD-key controllers for streaming and productivity." },
      { name: "Capture cards", summary: "External and internal cards for recording and streaming console or PC gameplay." },
      { name: "Cameras and audio", summary: "Facecam webcams and Wave microphones." },
      { name: "Lighting", summary: "Key Light and Ring Light panels for on-camera lighting." },
    ],
    buyingTips: [
      "Match the capture card to your console's output; 4K and high-refresh capture need newer models.",
      "Choose a Stream Deck size by how many actions you want on one page; folders extend smaller models.",
      "Check whether a capture card supports passthrough so you can play without lag while recording.",
    ],
    faqs: [
      { q: "Is Elgato owned by Corsair?", a: "Yes. Corsair acquired Elgato's gaming division in 2018." },
      { q: "Do I need a capture card to stream?", a: "Only for consoles or a second PC. Streaming from the same PC you play on does not require one." },
    ],
  },
];

export function getBrand(slug: string): Brand | undefined {
  return BRANDS.find((b) => b.slug === slug);
}

/**
 * Map a byline brand string to one of our brands. Matches whole names only
 * ("hp" matches "HP" or "HP OMEN", never a brand that merely contains "hp").
 */
export function brandFromByline(value: string | undefined | null): Brand | undefined {
  if (!value) return undefined;
  const v = value.trim().toLowerCase();
  return BRANDS.find((b) =>
    [b.apiBrand.toLowerCase(), ...(b.aliases ?? [])].some((n) => v === n || v.startsWith(`${n} `)),
  );
}

export const brandTitle = (b: Brand) => `${b.name} Discounts and Promos`;

export const brandDescription = (b: Brand) =>
  `${b.name} discounts and promos on ${b.sells}. Live prices checked weekly, with buying advice from ClearanceStream.`;

export function brandsInGroup(group: BrandGroup) {
  return BRANDS.filter((b) => b.group === group);
}

// ---------------------------------------------------------------- 70 new brands: 100-brand expansion
// Brand definitions live in ./brands/extra-a.ts and ./brands/extra-b.ts;
// merged here so BRANDS stays the single source of truth.
import { EXTRA_BRANDS_A } from "./brands/extra-a";
import { EXTRA_BRANDS_B } from "./brands/extra-b";

BRANDS.push(...EXTRA_BRANDS_A, ...EXTRA_BRANDS_B);
