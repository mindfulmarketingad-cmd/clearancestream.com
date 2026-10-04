import type { Brand } from "../brands";

export const EXTRA_BRANDS_A: Brand[] = [
  // ------------------------------------------------------------ PC builders
  {
    slug: "clx",
    name: "CLX",
    group: "pcs",
    apiBrand: "CLX",
    aliases: ["clx"],
    searches: [
      { keywords: "CLX gaming PC", searchIndex: "Computers" },
      { keywords: "CLX Set gaming desktop", searchIndex: "Computers" },
      { keywords: "CLX Horus gaming PC", searchIndex: "Computers" },
    ],
    include: /\b(gaming (pc|desktop|computer)|desktop|tower)\b/i,
    exclude: /\b(keyboard|mouse|mice|headset|headphones?|monitor|webcam|microphone|mouse ?pad|controller|chair|desk|cable|fans?|fan kit|case|chassis|power supply|psu|ram kit|memory kit|cooler|stream deck|capture card|replacement|sticker|skin)\b/i,
    sells: "custom gaming desktops and laptops",
    intro:
      "CLX is the gaming brand of CybertronPC, a US system integrator building PCs in Wichita, Kansas since the late 1990s. Its Set, Horus, and Ra desktops pair current CPUs and GPUs with liquid cooling and are listed on Amazon in fixed configurations that get discounted regularly.",
    overview: [
      "CLX builds its systems to order in the United States and backs them with a one-year parts and lifetime labor warranty. The fixed configurations sold on Amazon, mostly from the Set line, are the ones that see price drops, especially when a new GPU generation makes the previous build less current.",
      "Because CLX uses standard components in mainstream cases, a discounted CLX system is easy to evaluate: price the CPU, GPU, memory, and SSD against the parts market and the deal usually speaks for itself.",
    ],
    lines: [
      { name: "CLX Set", summary: "Mid-tower gaming desktops in the widest range of fixed configurations, and the line most often discounted on Amazon." },
      { name: "CLX Horus", summary: "Higher-end builds with stronger GPUs, larger AIO coolers, and more memory." },
      { name: "CLX Ra", summary: "Flagship systems with top-tier CPUs and GPUs for 4K gaming and heavy workloads." },
    ],
    buyingTips: [
      "Compare the GPU first. CLX's value lives almost entirely in the graphics card inside the build.",
      "Check whether the listing is a previous-generation configuration; CLX clears older builds at the biggest discounts.",
      "Confirm the memory is DDR5 on newer builds and that storage is at least a 1TB NVMe SSD.",
    ],
    faqs: [
      { q: "Is CLX a reliable gaming PC brand?", a: "CLX is the gaming division of CybertronPC, a long-running US system integrator, and its systems carry a one-year parts and lifetime labor warranty." },
      { q: "Are CLX PCs upgradeable?", a: "Yes. CLX uses standard motherboards, power supplies, and cases, so GPU, memory, and storage upgrades work like any DIY build." },
    ],
  },
  {
    slug: "starforge-systems",
    name: "Starforge Systems",
    group: "pcs",
    apiBrand: "Starforge Systems",
    aliases: ["starforge", "starforge systems"],
    searches: [
      { keywords: "Starforge Systems gaming PC", searchIndex: "Computers" },
      { keywords: "Starforge Navigator gaming desktop", searchIndex: "Computers" },
      { keywords: "Starforge Voyager gaming PC", searchIndex: "Computers" },
    ],
    include: /\b(gaming (pc|desktop|computer)|desktop|tower)\b/i,
    exclude: /\b(keyboard|mouse|mice|headset|headphones?|monitor|webcam|microphone|mouse ?pad|controller|chair|desk|cable|fans?|fan kit|case|chassis|power supply|psu|ram kit|memory kit|cooler|stream deck|capture card|replacement|sticker|skin)\b/i,
    sells: "creator-built gaming desktops",
    intro:
      "Starforge Systems is the PC builder launched by the creator group OTK, known for clean builds, careful component choices, and licensed designs. Most Starforge PCs sell direct, so discounted listings are rare and this page may be empty for long stretches.",
    overview: [
      "Starforge was founded in 2022 by One True King (OTK) and the streamer MoistCr1TiKaL, and it built its reputation on transparent parts lists and tidy cable work rather than the cheapest possible price. Its Navigator, Voyager, and Horizon lines cover mainstream to high-end gaming builds.",
      "Because Starforge sells primarily through its own site, Amazon deals are uncommon. When a discounted listing does appear, it is usually an older configuration being cleared, so checking the exact CPU and GPU generation matters more than usual.",
    ],
    lines: [
      { name: "Navigator", summary: "Starforge's mainstream gaming desktops, the line most likely to appear at a discount." },
      { name: "Voyager", summary: "Higher-end builds with stronger GPUs and upgraded cooling." },
      { name: "Horizon", summary: "Creator-focused systems with more cores and memory for streaming and editing." },
      { name: "Licensed PCs", summary: "Special-edition builds with anime and game-inspired designs." },
    ],
    buyingTips: [
      "Starforge premiums buy build quality and support, not just parts; compare against the DIY parts cost honestly.",
      "Check the exact configuration. Discounted units are usually outgoing generations.",
      "Licensed editions cost more for the design; the standard lines are better value per frame.",
    ],
    faqs: [
      { q: "Why are Starforge PC deals rare?", a: "Starforge sells mostly direct through its own site in fixed and configured-to-order builds, so few units reach Amazon at a discount." },
      { q: "Is Starforge Systems related to OTK?", a: "Yes. It was launched by the creator organization One True King with MoistCr1TiKaL." },
    ],
  },
  {
    slug: "meta-pcs",
    name: "Meta PCs",
    group: "pcs",
    apiBrand: "Meta PCs",
    aliases: ["meta pcs", "metapcs", "meta pc"],
    searches: [
      { keywords: "Meta PCs gaming PC", searchIndex: "Computers" },
      { keywords: "Meta PCs gaming desktop", searchIndex: "Computers" },
      { keywords: "Meta PCs RTX gaming desktop", searchIndex: "Computers" },
    ],
    include: /\b(gaming (pc|desktop|computer)|desktop|tower)\b/i,
    exclude: /\b(keyboard|mouse|mice|headset|headphones?|monitor|webcam|microphone|mouse ?pad|controller|chair|desk|cable|fans?|fan kit|case|chassis|power supply|psu|ram kit|memory kit|cooler|stream deck|capture card|replacement|sticker|skin)\b/i,
    sells: "configurable gaming desktops",
    intro:
      "Meta PCs is a US builder of configurable gaming desktops known for lifetime support and unusual options, including one of the first prebuilt SteamOS gaming PCs. Its fixed Amazon configurations see occasional discounts worth catching.",
    overview: [
      "Meta PCs lets buyers configure desktops around current AMD and Intel platforms and includes lifetime hardware and software support, which is unusual at its price points. In 2026 it launched the Steamroller, a prebuilt desktop shipping with SteamOS instead of Windows.",
      "Meta PCs sells through its own site and on Amazon, where fixed builds appear at a discount from time to time. The Amazon listings are the easiest way to catch a price drop without configuring a system yourself.",
    ],
    lines: [
      { name: "Gaming desktops", summary: "Configurable towers across budget, mid-range, and high-end tiers." },
      { name: "Steamroller", summary: "Meta PCs' SteamOS gaming desktop, an alternative to a Windows build." },
      { name: "Workstations", summary: "Higher-core builds aimed at creators as well as gamers." },
    ],
    buyingTips: [
      "Factor in the lifetime support; it has real value compared with budget builders offering one-year warranties.",
      "For the Steamroller, confirm you are comfortable with SteamOS before choosing it over Windows.",
      "Compare the fixed Amazon build against configuring the same parts on the Meta PCs site.",
    ],
    faqs: [
      { q: "What is the Meta PCs Steamroller?", a: "A prebuilt gaming desktop that ships with Valve's SteamOS instead of Windows, aimed at living-room and Steam-first gaming." },
      { q: "Does Meta PCs offer a warranty?", a: "Meta PCs advertises lifetime support for hardware diagnostics and software troubleshooting on its systems." },
    ],
  },
  {
    slug: "cobratype",
    name: "Cobratype",
    group: "pcs",
    apiBrand: "Cobratype",
    aliases: ["cobratype"],
    searches: [
      { keywords: "Cobratype gaming PC", searchIndex: "Computers" },
      { keywords: "Cobratype Elevate gaming desktop", searchIndex: "Computers" },
      { keywords: "Cobratype Viper gaming PC", searchIndex: "Computers" },
    ],
    include: /\b(gaming (pc|desktop|computer)|desktop|tower)\b/i,
    exclude: /\b(keyboard|mouse|mice|headset|headphones?|monitor|webcam|microphone|mouse ?pad|controller|chair|desk|cable|fans?|fan kit|case|chassis|power supply|psu|ram kit|memory kit|cooler|stream deck|capture card|replacement|sticker|skin)\b/i,
    sells: "gaming desktops from budget to high-end",
    intro:
      "Cobratype is a US gaming PC builder that sells primarily through its Amazon store, with lines ranging from budget Canebrake systems to high-end Elevate and Viper builds. Its Amazon-first model means promotions land directly on the listings tracked here.",
    overview: [
      "Cobratype organises its range into tiers from starter systems under $600 to premium and elite builds with flagship GPUs and liquid cooling. Reviews of its higher-end systems have praised clean builds and sensible component choices.",
      "Because Cobratype's main sales channel is Amazon, its prices move with retail promotions rather than direct-site sales. Previous-generation builds are the ones most likely to be discounted.",
    ],
    lines: [
      { name: "Elevate", summary: "Cobratype's premium line with high-end CPUs, GPUs, and refined case choices." },
      { name: "Viper", summary: "Performance builds balancing strong GPUs with sensible prices." },
      { name: "Canebrake", summary: "Entry-level gaming PCs, including APU-based systems for tight budgets." },
      { name: "Anaconda and Titanoboa", summary: "Mid-range builds pairing modern GPUs with value CPUs." },
    ],
    buyingTips: [
      "Check the exact GPU and CPU in the listing title; similarly priced Cobratype builds can differ a lot in gaming performance.",
      "Confirm memory is at least 16GB and storage is an SSD, not a hard drive, on budget models.",
      "Compare the Amazon price against Cobratype's own site, which sometimes runs its own promotions.",
    ],
    faqs: [
      { q: "Is Cobratype a legit gaming PC brand?", a: "Yes. Cobratype is a US system builder whose main sales channel is its Amazon store, with generally positive customer reviews." },
      { q: "Can Cobratype PCs be upgraded?", a: "They use standard components, so memory, storage, and GPU upgrades follow the normal DIY rules." },
    ],
  },
  {
    slug: "stormcraft",
    name: "STORMCRAFT",
    group: "pcs",
    apiBrand: "STORMCRAFT",
    aliases: ["stormcraft", "stormcraft pc"],
    searches: [
      { keywords: "STORMCRAFT gaming PC", searchIndex: "Computers" },
      { keywords: "STORMCRAFT Phantom gaming desktop", searchIndex: "Computers" },
      { keywords: "STORMCRAFT Sirius gaming PC", searchIndex: "Computers" },
    ],
    include: /\b(gaming (pc|desktop|computer)|desktop|tower)\b/i,
    exclude: /\b(keyboard|mouse|mice|headset|headphones?|monitor|webcam|microphone|mouse ?pad|controller|chair|desk|cable|fans?|fan kit|case|chassis|power supply|psu|ram kit|memory kit|cooler|stream deck|capture card|replacement|sticker|skin)\b/i,
    sells: "hand-built gaming desktops",
    intro:
      "STORMCRAFT hand-builds gaming PCs in California and sells them through Amazon, Best Buy, and Newegg, with lines like Sirius, Falcon, and Phantom covering mid-range to flagship builds. Its holiday sales have cut up to $600 off systems.",
    overview: [
      "STORMCRAFT positions itself as a builder-first brand: every system is assembled, stress-tested, and cable-managed in California, and includes lifetime technical support with multi-year parts and labor coverage.",
      "Its Amazon store carries the same Sirius, Falcon, and Phantom lines sold on its own site, so retail sale events apply directly. The best discounts tend to land on complete previous-generation configurations.",
    ],
    lines: [
      { name: "Sirius", summary: "Core gaming desktops aimed at smooth 1080p and 1440p performance." },
      { name: "Falcon", summary: "Step-up builds with stronger GPUs and 360mm AIO cooling." },
      { name: "Phantom", summary: "Flagship systems with top-tier CPUs and GPUs for 4K gaming." },
      { name: "Viper and Skyhawk", summary: "Additional mid-range options across Intel and AMD platforms." },
    ],
    buyingTips: [
      "STORMCRAFT runs its biggest discounts around Black Friday; prices outside sale events are less competitive.",
      "Check the motherboard chipset and PSU wattage if you plan a future GPU upgrade.",
      "Compare the Amazon listing against the STORMCRAFT webstore, which sometimes discounts different configurations.",
    ],
    faqs: [
      { q: "Where are STORMCRAFT PCs built?", a: "In California, where each system is assembled, stress-tested, and cable-managed before shipping." },
      { q: "What warranty does STORMCRAFT include?", a: "Its systems include lifetime technical support with multi-year parts and labor coverage; check the listing for the exact terms." },
    ],
  },
  {
    slug: "stgaubron",
    name: "STGAubron",
    group: "pcs",
    apiBrand: "STGAubron",
    aliases: ["stgaubron"],
    searches: [
      { keywords: "STGAubron gaming PC", searchIndex: "Computers" },
      { keywords: "STGAubron gaming desktop RTX", searchIndex: "Computers" },
      { keywords: "STGAubron RTX 3060 gaming PC", searchIndex: "Computers" },
    ],
    include: /\b(gaming (pc|desktop|computer)|desktop|tower)\b/i,
    exclude: /\b(keyboard|mouse|mice|headset|headphones?|monitor|webcam|microphone|mouse ?pad|controller|chair|desk|cable|fans?|fan kit|case|chassis|power supply|psu|ram kit|memory kit|cooler|stream deck|capture card|replacement|sticker|skin)\b/i,
    sells: "budget gaming desktops",
    intro:
      "STGAubron sells budget gaming desktops on Amazon, often pairing older CPUs with capable graphics cards to hit very low prices. Its listings are discounted frequently, but the exact CPU generation matters more here than with most builders.",
    overview: [
      "STGAubron's formula is simple: take an older but functional CPU, add a solid GPU, 16GB or more of RAM, and an SSD, and sell the result for the price of a console. For esports titles and 1080p gaming on a tight budget, that can be a legitimate deal.",
      "The catch is that some STGAubron builds use CPUs that are several generations old, which limits performance in newer CPU-heavy games and removes any upgrade path on dead platforms. Always check the exact CPU model before buying, not just the 'Core i7' label.",
    ],
    lines: [
      { name: "RTX builds", summary: "Budget desktops pairing older Intel CPUs with RTX 2060 to RTX 3060 graphics cards." },
      { name: "RX builds", summary: "AMD-graphics versions, often with RX 580 or RX 590 cards, at the lowest prices." },
      { name: "High-memory builds", summary: "Configurations with 32GB of RAM aimed at multitasking and streaming on a budget." },
    ],
    buyingTips: [
      "Read the full CPU model. An 'i7' from 2014 performs nothing like a modern i7, and STGAubron uses both.",
      "Check that the listing includes an SSD; some older listings still pair small SSDs with slow hard drives.",
      "Compare against ViprTech and other budget builders with similar GPU pairings before committing.",
    ],
    faqs: [
      { q: "Are STGAubron gaming PCs good value?", a: "They can be for light 1080p gaming on a tight budget, but many builds use older CPUs. Verify the exact CPU and GPU before judging the price." },
      { q: "Can you upgrade a STGAubron PC?", a: "Memory, storage, and GPU upgrades are usually possible, but older platforms have no CPU upgrade path worth taking." },
    ],
  },
  {
    slug: "viprtech",
    name: "ViprTech",
    group: "pcs",
    apiBrand: "ViprTech",
    aliases: ["viprtech"],
    searches: [
      { keywords: "ViprTech gaming PC", searchIndex: "Computers" },
      { keywords: "ViprTech Stryker gaming desktop", searchIndex: "Computers" },
      { keywords: "ViprTech Avalanche gaming PC", searchIndex: "Computers" },
    ],
    include: /\b(gaming (pc|desktop|computer)|desktop|tower)\b/i,
    exclude: /\b(keyboard|mouse|mice|headset|headphones?|monitor|webcam|microphone|mouse ?pad|controller|chair|desk|cable|fans?|fan kit|case|chassis|power supply|psu|ram kit|memory kit|cooler|stream deck|capture card|replacement|sticker|skin)\b/i,
    sells: "budget gaming desktops",
    intro:
      "ViprTech builds budget gaming desktops sold on Amazon, mixing older CPUs with modern graphics cards to keep prices low. Its Stryker, Avalanche, and Mutineer lines are discounted often, but reading the full spec list is essential.",
    overview: [
      "ViprTech targets first-time PC gamers who want a ready-to-play system for the price of a console. Builds typically combine a previous-generation CPU with a current or recent GPU, RGB cases, and Windows 11 Pro.",
      "The value proposition is real for 1080p gaming, but some configurations pair a brand-new GPU with a CPU that is many years old, which creates a bottleneck in demanding games. ViprTech discloses the parts in its listings, so the information to judge a deal is there if you read it.",
    ],
    lines: [
      { name: "Stryker", summary: "ViprTech's main gaming desktop line, spanning older budget builds to RTX 5060 configurations." },
      { name: "Avalanche", summary: "AMD-based budget builds, often Ryzen with RX 580-class graphics." },
      { name: "Mutineer and Prime", summary: "Additional budget configurations across Intel and AMD platforms." },
    ],
    buyingTips: [
      "Check the exact CPU model and its age; a new GPU cannot fix a severely outdated processor.",
      "Look for at least 16GB of RAM and an NVMe SSD rather than a small SATA drive.",
      "Compare the price against building the same used-parts combo yourself; the convenience premium should be modest.",
    ],
    faqs: [
      { q: "Is ViprTech legit?", a: "ViprTech is a real budget PC builder selling on Amazon with a large volume of reviews. Quality varies by configuration, so judge each listing on its parts." },
      { q: "Why are ViprTech PCs so cheap?", a: "They reuse older-generation CPUs and buy components in bulk, then pair them with capable GPUs. The savings are real but come with older platforms." },
    ],
  },
  {
    slug: "computer-upgrade-king",
    name: "Computer Upgrade King",
    group: "pcs",
    apiBrand: "Computer Upgrade King",
    aliases: ["computer upgrade king", "cuk"],
    searches: [
      { keywords: "Computer Upgrade King gaming desktop", searchIndex: "Computers" },
      { keywords: "CUK gaming PC RTX", searchIndex: "Computers" },
      { keywords: "Empowered PC gaming desktop", searchIndex: "Computers" },
    ],
    include: /\b(gaming (pc|desktop|computer)|desktop|tower)\b/i,
    exclude: /\b(keyboard|mouse|mice|headset|headphones?|monitor|webcam|microphone|mouse ?pad|controller|chair|desk|cable|fans?|fan kit|case|chassis|power supply|psu|ram kit|memory kit|cooler|stream deck|capture card|replacement|sticker|skin|laptop|notebook)\b/i,
    sells: "upgraded gaming desktops and laptops",
    intro:
      "Computer Upgrade King (CUK) takes brand-name gaming PCs and laptops and upgrades the memory and storage before resale, backing them with its own three-year warranty. Its Amazon store is the place to catch discounted high-spec configurations.",
    overview: [
      "CUK's model is different from most builders: it buys systems from brands like MSI and HP, opens them, installs more RAM and larger SSDs, stress-tests them, and resells the result. It also sells its own Empowered PC desktop line built in Virginia.",
      "Because CUK configurations go beyond manufacturer specs, a discounted CUK listing can beat the equivalent stock model on both price and specifications. The key detail is exactly what was upgraded versus what is stock.",
    ],
    lines: [
      { name: "Upgraded desktops", summary: "Brand-name gaming desktops with CUK-installed memory and storage upgrades." },
      { name: "Empowered PC", summary: "CUK's own desktop line, including the Stratos and Sentinel series." },
      { name: "Upgraded laptops", summary: "Gaming laptops with boosted RAM and SSDs, sold alongside the desktops." },
    ],
    buyingTips: [
      "Read the listing to separate CUK's upgrades from the base manufacturer's specs.",
      "The three-year CUK warranty is a genuine advantage over buying a used system privately.",
      "Compare the upgraded configuration against the stock model's sale price; the upgrade should cost less than doing it yourself.",
    ],
    faqs: [
      { q: "What does Computer Upgrade King actually do?", a: "It buys brand-name PCs, upgrades the RAM and storage, tests them, and resells them with its own three-year warranty." },
      { q: "What is Empowered PC?", a: "Empowered PC is Computer Upgrade King's own line of gaming desktops, built in Virginia." },
    ],
  },
  {
    slug: "yeyian",
    name: "Yeyian",
    group: "pcs",
    apiBrand: "YEYIAN",
    aliases: ["yeyian"],
    searches: [
      { keywords: "Yeyian gaming PC", searchIndex: "Computers" },
      { keywords: "Yeyian Mirage gaming desktop", searchIndex: "Computers" },
      { keywords: "Yeyian RTX 5070 gaming PC", searchIndex: "Computers" },
    ],
    include: /\b(gaming (pc|desktop|computer)|desktop|tower)\b/i,
    exclude: /\b(keyboard|mouse|mice|headset|headphones?|monitor|webcam|microphone|mouse ?pad|controller|chair|desk|cable|fans?|fan kit|case|chassis|power supply|psu|ram kit|memory kit|cooler|stream deck|capture card|replacement|sticker|skin)\b/i,
    sells: "gaming desktops assembled in the USA",
    intro:
      "Yeyian builds gaming desktops in the USA and sells them through Amazon, Newegg, and Best Buy, with lines like Kunai, Yumi, Mirage, and Odachi spanning budget to RTX 5090 flagships. Its systems are discounted regularly around retail sale events.",
    overview: [
      "Yeyian assembles its PCs in the United States and backs them with a warranty covering three years of labor, two years of parts, and lifetime technical support. Builds use standard components from board partners like ASUS and MSI, which keeps upgrades straightforward.",
      "Yeyian refreshes its range with each GPU generation, so outgoing configurations are cleared at meaningful discounts. The Amazon listings are fixed builds, making it easy to compare an exact configuration against the parts market.",
    ],
    lines: [
      { name: "Mirage", summary: "Yeyian's performance line, currently spanning RTX 5060 to RTX 5090 builds." },
      { name: "Yumi and Kunai", summary: "Mid-range gaming desktops balancing current GPUs with value CPUs." },
      { name: "Odachi", summary: "Higher-end builds with stronger cooling and power delivery." },
      { name: "Phoenix", summary: "Value-oriented desktops for 1080p gaming on a budget." },
    ],
    buyingTips: [
      "Yeyian's best prices land during Amazon sale events; compare the event price against its own site.",
      "Check the GPU's VRAM amount, not just its model number, especially on mid-range builds.",
      "Confirm the power supply wattage leaves headroom if you plan to upgrade the graphics card later.",
    ],
    faqs: [
      { q: "Where are Yeyian PCs built?", a: "Yeyian assembles its gaming desktops in the United States." },
      { q: "What warranty does Yeyian include?", a: "Its Silver Shield warranty covers three years of labor, two years of parts, and one year of shipping, plus lifetime technical support." },
    ],
  },

  // ------------------------------------------------- PC components: GPUs
  {
    slug: "gigabyte",
    name: "Gigabyte",
    group: "peripherals",
    apiBrand: "Gigabyte",
    aliases: ["gigabyte"],
    searches: [
      { keywords: "Gigabyte RTX 4070 Super graphics card", searchIndex: "Computers" },
      { keywords: "Gigabyte RTX 5060 Ti graphics card", searchIndex: "Computers" },
      { keywords: "Gigabyte B650 AORUS Elite motherboard", searchIndex: "Computers" },
      { keywords: "Gigabyte AORUS Gen5 SSD", searchIndex: "Computers" },
    ],
    include: /\b(geforce|radeon|rtx|rx|graphics card|video card|motherboard|aorus|ssd|nvme)\b/i,
    exclude: /\b(monitor|laptop|notebook|keyboard|mouse|headset|t-?shirt|hoodie|poster|sticker|mug|keychain)\b/i,
    sells: "graphics cards, motherboards, and SSDs",
    intro:
      "Gigabyte is one of the largest makers of graphics cards and motherboards in the world, selling GeForce GPUs under its AORUS, Gaming, Eagle, and Aero lines. Its cards and boards are discounted constantly, especially when a new GPU generation arrives.",
    overview: [
      "Founded in Taiwan in 1986, Gigabyte manufactures its own graphics cards, motherboards, and SSDs rather than just rebadging parts. That scale means deep retail availability and frequent promotions across every price tier, from budget Eagle cards to flagship AORUS models.",
      "Gigabyte also makes monitors, laptops, and peripherals, but this page tracks its core PC components: graphics cards, motherboards, and SSDs. Previous-generation cards are where the biggest markdowns land.",
    ],
    lines: [
      { name: "AORUS graphics cards", summary: "Gigabyte's flagship GPUs with the largest coolers and highest factory overclocks." },
      { name: "Gaming and Eagle cards", summary: "Mid-range and budget GeForce cards that see the most frequent discounts." },
      { name: "AORUS motherboards", summary: "Intel and AMD boards from budget to overclocking flagships." },
      { name: "AORUS SSDs", summary: "Gen4 and Gen5 NVMe drives, often discounted in bundles with boards." },
    ],
    buyingTips: [
      "Compare the same GPU across Gigabyte's tiers; Eagle and Gaming OC often match AORUS performance for less.",
      "Check the card's length and your case clearance; AORUS models are among the longest cards made.",
      "For motherboards, match the chipset to your CPU and confirm Wi-Fi is included if you need it.",
    ],
    faqs: [
      { q: "What is the difference between AORUS, Gaming, and Eagle?", a: "They are Gigabyte's GPU tiers: AORUS is the flagship with the biggest coolers, Gaming OC is the mid-range, and Eagle is the budget line." },
      { q: "Are Gigabyte graphics cards good value on sale?", a: "Often. Gigabyte's scale means its mid-range cards are among the most discounted when new generations launch." },
    ],
  },
  {
    slug: "zotac",
    name: "Zotac",
    group: "peripherals",
    apiBrand: "Zotac",
    aliases: ["zotac"],
    searches: [
      { keywords: "Zotac RTX 4070 Super graphics card", searchIndex: "Computers" },
      { keywords: "Zotac RTX 5060 Ti graphics card", searchIndex: "Computers" },
      { keywords: "Zotac GeForce RTX 5070", searchIndex: "Computers" },
      { keywords: "Zotac Magnus mini PC", searchIndex: "Computers" },
    ],
    include: /\b(geforce|rtx|graphics card|video card|magnus|mini pc|amp|twin edge|trinity)\b/i,
    exclude: /\b(monitor|laptop|backpack|t-?shirt|hoodie|poster|sticker|mug|keychain)\b/i,
    sells: "GeForce graphics cards and Magnus mini PCs",
    intro:
      "Zotac is best known for compact GeForce graphics cards, including its Twin Edge and AMP lines, plus the Magnus series of small-form-factor gaming PCs. Its GPUs are among the most frequently discounted NVIDIA cards on Amazon.",
    overview: [
      "Zotac built its name on smaller graphics cards that fit compact cases where triple-fan flagships cannot, and it still leads that niche with dual-fan Twin Edge models. Its larger Trinity and AMP cards compete directly with the big board partners.",
      "Beyond GPUs, Zotac's Magnus mini PCs pack desktop-class graphics into tiny chassis, and they see occasional sharp discounts. This page tracks both the graphics cards and the mini PCs.",
    ],
    lines: [
      { name: "Twin Edge graphics cards", summary: "Compact dual-fan GeForce cards for small cases, and Zotac's most discounted line." },
      { name: "AMP and Trinity cards", summary: "Larger triple-fan models with higher clocks and RGB lighting." },
      { name: "Magnus mini PCs", summary: "Small-form-factor gaming PCs with desktop GPUs inside." },
    ],
    buyingTips: [
      "Twin Edge cards run warmer and louder than triple-fan models; the discount should reflect that trade-off.",
      "Register the card with Zotac to extend the warranty, which adds real value at sale prices.",
      "For Magnus mini PCs, check upgradeability; compact systems limit future GPU and cooling changes.",
    ],
    faqs: [
      { q: "Are Zotac graphics cards reliable?", a: "Zotac is an established NVIDIA board partner. Its cards are widely used, and registering extends the warranty." },
      { q: "What is the difference between Twin Edge and AMP?", a: "Twin Edge cards are compact dual-fan models; AMP cards are larger triple-fan designs with higher factory overclocks." },
    ],
  },
  {
    slug: "pny",
    name: "PNY",
    group: "peripherals",
    apiBrand: "PNY",
    aliases: ["pny"],
    searches: [
      { keywords: "PNY RTX 4070 graphics card", searchIndex: "Computers" },
      { keywords: "PNY RTX 5060 Ti XLR8", searchIndex: "Computers" },
      { keywords: "PNY XLR8 2TB SSD", searchIndex: "Computers" },
      { keywords: "PNY 32GB DDR5 XLR8", searchIndex: "Computers" },
    ],
    include: /\b(geforce|rtx|graphics card|video card|xlr8|ssd|nvme|ddr\d|memory|cs\d{4})\b/i,
    exclude: /\b(usb|flash drive|microsd|sd ?card|card reader|t-?shirt|hoodie|poster|sticker|mug|keychain)\b/i,
    sells: "XLR8 graphics cards, gaming memory, and SSDs",
    intro:
      "PNY makes GeForce graphics cards, XLR8 gaming memory, and SSDs, and is NVIDIA's long-standing partner for professional GPUs. Its gaming cards are often among the cheapest versions of a given GPU when discounted.",
    overview: [
      "PNY has been in the memory and graphics business since the 1980s and is one of NVIDIA's closest board partners, building both GeForce gaming cards and professional workstation GPUs. Its XLR8 gaming brand covers graphics cards, DDR5 memory, and NVMe SSDs.",
      "PNY's gaming cards tend to use simpler cooler designs than flashier rivals, which keeps prices down. When a discount lands, a PNY card is frequently the lowest-priced way to get a particular GPU.",
    ],
    lines: [
      { name: "XLR8 GeForce graphics cards", summary: "PNY's gaming GPUs, often the cheapest discounted version of a given chip." },
      { name: "XLR8 gaming memory", summary: "DDR4 and DDR5 kits, including RGB models." },
      { name: "XLR8 NVMe SSDs", summary: "CS-series Gen4 drives that are frequently bundled or discounted." },
    ],
    buyingTips: [
      "Compare the PNY card's cooler against triple-fan rivals; simpler coolers run warmer under sustained loads.",
      "PNY's SSDs are strong value picks when discounted, but check the exact model's speeds.",
      "For memory, confirm the kit's speed and timings match your motherboard's supported specs.",
    ],
    faqs: [
      { q: "Is PNY a good graphics card brand?", a: "PNY is a long-established NVIDIA partner. Its cards use reference-style designs that are reliable if less flashy than premium rivals." },
      { q: "What does XLR8 mean?", a: "XLR8 (accelerate) is PNY's gaming brand for graphics cards, memory, and SSDs." },
    ],
  },
  {
    slug: "sapphire",
    name: "Sapphire",
    group: "peripherals",
    apiBrand: "Sapphire",
    aliases: ["sapphire", "sapphire technology"],
    searches: [
      { keywords: "Sapphire RX 9070 XT graphics card", searchIndex: "Computers" },
      { keywords: "Sapphire RX 7800 XT Pulse", searchIndex: "Computers" },
      { keywords: "Sapphire Nitro+ RX 9070", searchIndex: "Computers" },
      { keywords: "Sapphire RX 9060 XT", searchIndex: "Computers" },
    ],
    include: /\b(radeon|rx ?\d|nitro|pulse|toxic|graphics card|video card)\b/i,
    exclude: /\b(t-?shirt|hoodie|poster|sticker|mug|keychain|laptop|monitor)\b/i,
    sells: "AMD Radeon graphics cards",
    intro:
      "Sapphire is AMD's premier graphics card partner, building Radeon GPUs exclusively across its Pulse, Nitro+, and Toxic lines. Its cards are discounted regularly, and outgoing generations can drop sharply.",
    overview: [
      "Sapphire has made Radeon cards for decades and is widely regarded as the best AMD board partner, with cooling designs that consistently rank among the quietest. The Pulse line targets value, Nitro+ targets enthusiasts, and Toxic is the liquid-cooled flagship.",
      "Because Sapphire only makes AMD cards, its discounts track AMD's product cycle closely. When a new Radeon generation launches, previous-generation Pulse and Nitro+ cards often become the best value in their class.",
    ],
    lines: [
      { name: "Nitro+", summary: "Sapphire's enthusiast Radeon cards with premium cooling and factory overclocks." },
      { name: "Pulse", summary: "Value-oriented Radeon cards that see the deepest discounts." },
      { name: "Toxic", summary: "Flagship liquid-cooled Radeon cards for maximum performance." },
    ],
    buyingTips: [
      "Pulse cards at a discount often beat a discounted Nitro+ on value; the performance gap is smaller than the price gap.",
      "Check card length and power connector requirements; Nitro+ models are large and power-hungry.",
      "AMD cards pair well with FreeSync monitors, which cost less than G-Sync equivalents.",
    ],
    faqs: [
      { q: "Is Sapphire the best AMD card brand?", a: "Sapphire is AMD's longest-standing and most respected board partner, known for excellent cooling and build quality." },
      { q: "What is the difference between Pulse and Nitro+?", a: "Pulse is Sapphire's value line with simpler coolers; Nitro+ adds premium cooling, higher clocks, and RGB." },
    ],
  },
  {
    slug: "xfx",
    name: "XFX",
    group: "peripherals",
    apiBrand: "XFX",
    aliases: ["xfx"],
    searches: [
      { keywords: "XFX RX 9070 XT graphics card", searchIndex: "Computers" },
      { keywords: "XFX RX 7800 XT Speedster", searchIndex: "Computers" },
      { keywords: "XFX Speedster MERC310", searchIndex: "Computers" },
      { keywords: "XFX Quicksilver RX 9070", searchIndex: "Computers" },
    ],
    include: /\b(radeon|rx ?\d|speedster|merc|quicksilver|qick|swift|graphics card|video card)\b/i,
    exclude: /\b(t-?shirt|hoodie|poster|sticker|mug|keychain|power supply|laptop)\b/i,
    sells: "Speedster Radeon graphics cards",
    intro:
      "XFX builds AMD Radeon graphics cards exclusively under its Speedster brand, with MERC, Quicksilver, and SWFT tiers. Its cards are priced aggressively and discounted often, making them a frequent pick for value AMD builds.",
    overview: [
      "XFX has focused on AMD graphics for years, and its Speedster lineup covers everything from budget SWFT cards to the triple-fan MERC flagships. The designs are clean and gamer-styled without the premium pricing of some rivals.",
      "XFX cards regularly appear among the lowest-priced options for a given Radeon GPU, and discounts stack on top of that. For builders committed to AMD, XFX is one of the first brands to check.",
    ],
    lines: [
      { name: "Speedster MERC", summary: "XFX's flagship Radeon cards with triple-fan coolers and the highest clocks." },
      { name: "Speedster Quicksilver and QICK", summary: "Mid-range cards balancing cooling, noise, and price." },
      { name: "Speedster SWFT", summary: "Budget Radeon cards that are often the cheapest way into a given GPU tier." },
    ],
    buyingTips: [
      "Compare the XFX card against Sapphire's Pulse at the same GPU; the cheaper of the two usually wins.",
      "MERC cards are long; verify case clearance before buying.",
      "Check whether the listing is the standard or overclocked (OC) variant; performance differs slightly.",
    ],
    faqs: [
      { q: "Does XFX make NVIDIA cards?", a: "No. XFX builds AMD Radeon graphics cards exclusively." },
      { q: "What is the difference between MERC, Quicksilver, and SWFT?", a: "They are XFX's Speedster tiers: MERC is the flagship, Quicksilver and QICK are mid-range, and SWFT is the budget line." },
    ],
  },
  {
    slug: "asrock",
    name: "ASRock",
    group: "peripherals",
    apiBrand: "ASRock",
    aliases: ["asrock"],
    searches: [
      { keywords: "ASRock B650M motherboard", searchIndex: "Computers" },
      { keywords: "ASRock Z790 motherboard", searchIndex: "Computers" },
      { keywords: "ASRock Phantom Gaming RX 7800 XT", searchIndex: "Computers" },
      { keywords: "ASRock B850 motherboard WiFi", searchIndex: "Computers" },
    ],
    include: /\b(motherboard|phantom gaming|challenger|radeon|rx ?\d{3,4}|graphics card|video card|b\d{3}|z\d{3}|x\d{3})\b/i,
    exclude: /\b(monitor|deskmini|industrial|t-?shirt|hoodie|poster|sticker|mug|keychain)\b/i,
    sells: "motherboards and Phantom Gaming graphics cards",
    intro:
      "ASRock makes motherboards for Intel and AMD platforms plus Phantom Gaming Radeon graphics cards, usually at lower prices than the biggest board makers. Its boards are discounted frequently, making it a favourite for value builds.",
    overview: [
      "ASRock grew out of ASUS in the early 2000s and carved out a reputation for motherboards that deliver the features that matter at lower prices. Its Steel Legend, Pro, and Taichi boards span budget to enthusiast, and its Phantom Gaming GPUs cover AMD's Radeon range.",
      "ASRock's value positioning means its products start cheaper and get discounted further. For builders watching the total platform cost, a discounted ASRock board often frees budget for a better GPU.",
    ],
    lines: [
      { name: "Motherboards", summary: "Intel and AMD boards from budget Pro models to Taichi flagships." },
      { name: "Phantom Gaming graphics cards", summary: "ASRock's Radeon GPUs with gaming-styled coolers." },
      { name: "Challenger graphics cards", summary: "Budget Radeon cards, often among the cheapest of their GPU tier." },
    ],
    buyingTips: [
      "Match the board's chipset and socket to your exact CPU; similarly priced ASRock boards can be different platforms.",
      "Check VRM quality on budget boards if you plan to run a high-end CPU.",
      "Confirm Wi-Fi is included; the non-Wi-Fi variants are cheaper but easy to confuse.",
    ],
    faqs: [
      { q: "Is ASRock a good motherboard brand?", a: "Yes. ASRock is known for strong value, and its mid-range and high-end boards are well regarded by builders." },
      { q: "Is ASRock related to ASUS?", a: "ASRock was originally spun out of ASUS in 2002 and has operated independently since." },
    ],
  },

  // ------------------------------------------- PC components: CPUs
  {
    slug: "amd",
    name: "AMD",
    group: "peripherals",
    apiBrand: "AMD",
    aliases: ["amd"],
    searches: [
      { keywords: "Ryzen 7 7800X3D", searchIndex: "Computers" },
      { keywords: "Ryzen 7 9800X3D", searchIndex: "Computers" },
      { keywords: "Ryzen 9 9950X", searchIndex: "Computers" },
      { keywords: "Ryzen 5 7600X", searchIndex: "Computers" },
      { keywords: "AMD Radeon RX 9070 XT", searchIndex: "Computers" },
    ],
    require: /\b(ryzen|radeon|threadripper|epyc)\b/i,
    include: /\b(ryzen|radeon|threadripper|epyc|processor|cpu|graphics card)\b/i,
    exclude: /\b(cooler|wraith|laptop|notebook|t-?shirt|hoodie|poster|sticker|mug|keychain)\b/i,
    sells: "Ryzen processors and Radeon graphics cards",
    intro:
      "AMD's Ryzen processors dominate gaming PC builds, and its X3D chips are the fastest gaming CPUs you can buy. Ryzen prices move constantly, with previous generations dropping hard when new chips launch.",
    overview: [
      "AMD's Ryzen lineup spans budget 6-core chips to 16-core flagships, plus the X3D models with stacked cache that lead gaming benchmarks. Radeon RX graphics cards round out AMD's gaming hardware, usually priced below competing NVIDIA cards.",
      "CPU discounts follow a predictable pattern: a new Ryzen generation pushes the previous one down, and X3D chips hold value longer because gamers keep buying them. Tracking live prices is the easiest way to catch the dips.",
    ],
    lines: [
      { name: "Ryzen X3D", summary: "The fastest gaming CPUs, with 3D V-Cache that boosts frame rates." },
      { name: "Ryzen 9 and Ryzen 7", summary: "High-core-count chips for gaming plus streaming, editing, and work." },
      { name: "Ryzen 5", summary: "The mainstream gaming sweet spot, frequently discounted." },
      { name: "Radeon RX graphics", summary: "AMD's own graphics cards, usually cheaper than NVIDIA equivalents." },
    ],
    buyingTips: [
      "For pure gaming, an X3D chip beats a higher-core non-X3D chip; for mixed work, core count matters more.",
      "Check the socket: AM4 chips are cheap but a dead platform, while AM5 costs more but has an upgrade path.",
      "Tray and OEM versions are cheaper but lack AMD's retail warranty; boxed retail chips include it.",
    ],
    faqs: [
      { q: "What does X3D mean?", a: "X3D Ryzen chips stack extra cache on the processor, which significantly boosts gaming frame rates." },
      { q: "Should I buy AM4 or AM5?", a: "AM4 is cheaper with no upgrade path; AM5 costs more now but supports future Ryzen generations." },
    ],
  },
  {
    slug: "intel",
    name: "Intel",
    group: "peripherals",
    apiBrand: "Intel",
    aliases: ["intel"],
    searches: [
      { keywords: "Intel Core i7-14700K", searchIndex: "Computers" },
      { keywords: "Intel Core i5-14600K", searchIndex: "Computers" },
      { keywords: "Intel Core Ultra 7 265K", searchIndex: "Computers" },
      { keywords: "Intel Core i9-14900K", searchIndex: "Computers" },
      { keywords: "Intel Arc B580 graphics card", searchIndex: "Computers" },
    ],
    require: /\b(core|arc|processor)\b/i,
    include: /\b(core (i\d|ultra)|arc|processor|cpu)\b/i,
    exclude: /\b(nuc|laptop|notebook|t-?shirt|hoodie|poster|sticker|mug|keychain|wifi|network adapter)\b/i,
    sells: "Core processors and Arc graphics cards",
    intro:
      "Intel's Core processors power a huge share of gaming PCs, from the mainstream i5 to flagship i9 chips, and its Arc graphics cards target budget builders. Intel CPUs are discounted steadily, with the biggest cuts on outgoing generations.",
    overview: [
      "Intel's current lineup spans Core i3 through i9 on the LGA1700 platform and the newer Core Ultra series on LGA1851, plus Arc B-series graphics cards aimed at 1080p gaming value. The range is wide enough that similarly named chips can differ significantly.",
      "Because Intel refreshes often, previous-generation Core processors regularly drop to very attractive prices. A discounted last-gen i7 frequently outperforms a new i5 at the same price.",
    ],
    lines: [
      { name: "Core i9", summary: "Intel's flagship gaming and productivity chips with the most cores." },
      { name: "Core i7", summary: "High-end gaming CPUs that are often the best discounted value." },
      { name: "Core i5", summary: "The mainstream gaming pick; discounted i5s are hard to beat for the money." },
      { name: "Arc graphics cards", summary: "Intel's budget GPUs, strongest for 1080p gaming with Resizable BAR enabled." },
    ],
    buyingTips: [
      "K chips overclock and KF chips lack integrated graphics; KF is cheaper but needs a discrete GPU.",
      "Check the socket and chipset: LGA1700 and LGA1851 need different motherboards.",
      "Arc GPUs need Resizable BAR enabled in the BIOS for full performance; verify your motherboard supports it.",
    ],
    faqs: [
      { q: "What is the difference between K and KF?", a: "K processors can be overclocked and include integrated graphics; KF processors can be overclocked but have no integrated graphics." },
      { q: "Are Intel Arc GPUs good for gaming?", a: "The Arc B-series offers strong 1080p value when discounted, provided Resizable BAR is enabled." },
    ],
  },

  // ------------------------------------ PC components: memory and storage
  {
    slug: "kingston",
    name: "Kingston",
    group: "peripherals",
    apiBrand: "Kingston",
    aliases: ["kingston", "kingston technology"],
    searches: [
      { keywords: "Kingston Fury 32GB DDR5", searchIndex: "Computers" },
      { keywords: "Kingston KC3000 2TB", searchIndex: "Computers" },
      { keywords: "Kingston Fury Beast DDR5 6000", searchIndex: "Computers" },
      { keywords: "Kingston NV3 1TB SSD", searchIndex: "Computers" },
    ],
    include: /\b(ddr\d|fury|beast|renegade|ram|memory|sodimm|dimm|ssd|nvme|kc\d{4}|nv\d)\b/i,
    exclude: /\b(usb|flash drive|datatraveler|microsd|sd ?card|card reader|t-?shirt|hoodie|poster|sticker|mug|keychain)\b/i,
    sells: "FURY gaming memory and NVMe SSDs",
    intro:
      "Kingston's FURY memory is a staple of gaming builds, and its KC3000 and NV-series SSDs are consistently among the best-value NVMe drives. Both lines are discounted frequently on Amazon.",
    overview: [
      "Kingston is one of the world's largest memory makers, and its FURY line (formerly HyperX memory) covers everything from value DDR5 to high-speed Renegade kits for overclockers. The brand's scale keeps prices competitive even before discounts.",
      "On storage, the KC3000 is a high-end Gen4 drive while the NV2 and NV3 target budget builders. Both SSD lines see regular price cuts, and previous models drop further when a successor launches.",
    ],
    lines: [
      { name: "FURY DDR5", summary: "Beast and Renegade kits from value speeds to overclocking flagships, with and without RGB." },
      { name: "KC3000 SSD", summary: "High-performance Gen4 NVMe drives for gaming and heavy workloads." },
      { name: "NV2 and NV3 SSDs", summary: "Budget NVMe drives that are frequently among the cheapest per terabyte." },
    ],
    buyingTips: [
      "For AMD AM5 builds, look for kits explicitly rated for EXPO; Intel XMP kits usually work too but EXPO is tuned for Ryzen.",
      "Check whether you need a heatsink; low-profile FURY kits fit under big air coolers.",
      "SSDs slow as they fill; buy more capacity than you think you need when the price per terabyte is low.",
    ],
    faqs: [
      { q: "Is Kingston FURY good RAM for gaming?", a: "Yes. FURY is Kingston's gaming memory line and is widely used in gaming builds at every price point." },
      { q: "What is the difference between KC3000 and NV3?", a: "The KC3000 is a high-end Gen4 drive with top speeds and endurance; the NV3 is a budget drive with lower specs and a lower price." },
    ],
  },
  {
    slug: "crucial",
    name: "Crucial",
    group: "peripherals",
    apiBrand: "Crucial",
    aliases: ["crucial"],
    searches: [
      { keywords: "Crucial 32GB DDR5 RAM", searchIndex: "Computers" },
      { keywords: "Crucial P3 Plus 2TB", searchIndex: "Computers" },
      { keywords: "Crucial T705 2TB SSD", searchIndex: "Computers" },
      { keywords: "Crucial DDR5 6000 32GB", searchIndex: "Computers" },
    ],
    include: /\b(ddr\d|ram|memory|sodimm|dimm|ssd|nvme|p\d( plus)?|t\d{3}|mx\d{3}|bx\d{3}|x\d)\b/i,
    exclude: /\b(usb|flash drive|microsd|sd ?card|card reader|t-?shirt|hoodie|poster|sticker|mug|keychain)\b/i,
    sells: "DDR5 memory and NVMe SSDs",
    intro:
      "Crucial is Micron's consumer brand, selling DDR5 memory and NVMe SSDs made with Micron's own chips. Its direct-from-manufacturer pricing is already keen, and retail discounts make it a regular value pick.",
    overview: [
      "Because Crucial is owned by memory manufacturer Micron, it sells first-party memory and SSDs without a middleman markup. Its DDR5 kits are popular for both Intel and AMD builds, and its P-series SSDs are mainstream favourites.",
      "The T-series Gen5 drives target enthusiasts chasing maximum speeds, while the P3 Plus remains the value workhorse. Both memory and SSD prices swing with the memory market, so tracking live prices pays off.",
    ],
    lines: [
      { name: "DDR5 memory kits", summary: "16GB to 64GB kits at mainstream speeds, often the cheapest first-party option." },
      { name: "P-series SSDs", summary: "P3 and P3 Plus Gen4 drives for everyday gaming builds." },
      { name: "T-series SSDs", summary: "Gen5 drives like the T705 for maximum sequential speeds." },
    ],
    buyingTips: [
      "Memory prices move with the DRAM market; buy when prices dip rather than on a fixed schedule.",
      "Gen5 SSDs need a Gen5 M.2 slot and run hot; most gamers are fine with a discounted Gen4 drive.",
      "Check the SSD's endurance rating (TBW) if you write a lot of data, for example with video capture.",
    ],
    faqs: [
      { q: "Is Crucial RAM reliable?", a: "Yes. Crucial is Micron's own brand, and its memory is widely used in both prebuilt and DIY systems." },
      { q: "Do I need a Gen5 SSD for gaming?", a: "No. Games load barely faster on Gen5 than on a good Gen4 drive; buy Gen5 only if the discount makes it close in price." },
    ],
  },
  {
    slug: "g-skill",
    name: "G.Skill",
    group: "peripherals",
    apiBrand: "G.Skill",
    aliases: ["g.skill", "gskill", "g skill"],
    searches: [
      { keywords: "G.Skill Trident Z5 32GB DDR5", searchIndex: "Computers" },
      { keywords: "G.Skill Ripjaws DDR5 32GB", searchIndex: "Computers" },
      { keywords: "G.Skill Trident Z Royal", searchIndex: "Computers" },
      { keywords: "G.Skill DDR4 3600 32GB", searchIndex: "Computers" },
    ],
    include: /\b(ddr\d|trident|ripjaws|royal|ram|memory|sodimm|dimm)\b/i,
    exclude: /\b(t-?shirt|hoodie|poster|sticker|mug|keychain|ssd|usb)\b/i,
    sells: "Trident and Ripjaws gaming memory",
    intro:
      "G.Skill's Trident Z and Ripjaws memory kits are favourites of overclockers and gaming builders, known for tight timings and high speeds. Its kits are discounted regularly, especially outgoing DDR4.",
    overview: [
      "G.Skill built its reputation on high-performance memory with aggressive timings, and its Trident Z5 RGB and Ripjaws S5 kits are among the most recommended DDR5 options for gaming builds. The Trident Z Royal line adds a distinctive crystalline heatspreader design.",
      "Memory is a commodity market, so G.Skill kits swing in price with DRAM costs and retail promotions. Previous-generation kits and slower bins are where the biggest percentage discounts appear.",
    ],
    lines: [
      { name: "Trident Z5", summary: "Flagship DDR5 kits with tight timings, in RGB and Royal designs." },
      { name: "Ripjaws", summary: "Value DDR5 and DDR4 kits that skip the RGB for lower prices." },
      { name: "DDR4 kits", summary: "Outgoing DDR4 for older platforms, often cleared at deep discounts." },
    ],
    buyingTips: [
      "Check your motherboard's QVL list for the exact kit if you want guaranteed rated speeds.",
      "Taller Trident heatspreaders can clash with big air coolers; Ripjaws S5 is the low-clearance pick.",
      "For Ryzen, 6000 MT/s is the sweet spot; faster kits cost more for little gaming gain.",
    ],
    faqs: [
      { q: "Is G.Skill RAM good for Ryzen?", a: "Yes. G.Skill's DDR5 kits are widely used on AM5, and 6000 MT/s kits pair well with Ryzen's memory controller." },
      { q: "What is the difference between Trident Z5 and Ripjaws S5?", a: "Trident Z5 is the premium line with RGB options and tighter bins; Ripjaws S5 is the value line with low-profile heatsinks." },
    ],
  },
  {
    slug: "teamgroup",
    name: "TeamGroup",
    group: "peripherals",
    apiBrand: "TeamGroup",
    aliases: ["teamgroup", "team group", "t-force"],
    searches: [
      { keywords: "TeamGroup T-Force 32GB DDR5", searchIndex: "Computers" },
      { keywords: "TeamGroup MP44L 2TB", searchIndex: "Computers" },
      { keywords: "T-Force Delta RGB 32GB DDR5", searchIndex: "Computers" },
      { keywords: "TeamGroup 1TB NVMe SSD", searchIndex: "Computers" },
    ],
    include: /\b(ddr\d|t-force|t-create|delta|ram|memory|sodimm|dimm|ssd|nvme|mp\d{2,3}|z44|cardea)\b/i,
    exclude: /\b(usb|flash drive|microsd|sd ?card|card reader|t-?shirt|hoodie|poster|sticker|mug|keychain)\b/i,
    sells: "T-Force gaming memory and SSDs",
    intro:
      "TeamGroup's T-Force memory and SSDs are among the most aggressively priced PC components on Amazon, with Delta RGB kits and MP-series NVMe drives undercutting bigger brands. Discounts make them cheaper still.",
    overview: [
      "TeamGroup is a Taiwanese memory maker whose T-Force gaming brand covers DDR5 memory, NVMe SSDs, and cooling accessories. Its strategy is simple: match the specs of bigger brands at lower prices, which makes its products frequent deal highlights.",
      "The Delta RGB memory kits and MP44L SSD are particular value standouts. TeamGroup also runs the T-Create line for creators, with higher-capacity kits and drives.",
    ],
    lines: [
      { name: "T-Force Delta RGB", summary: "RGB DDR5 memory kits that regularly undercut bigger brands on price." },
      { name: "MP-series SSDs", summary: "NVMe drives from budget MP33 to high-end MP44 models." },
      { name: "T-Create", summary: "Creator-focused memory and storage with higher capacities." },
    ],
    buyingTips: [
      "Compare the exact speed and timings, not just capacity; TeamGroup's cheapest kits can be slower-binned.",
      "The MP44L is a proven value SSD pick when discounted; check the capacity you need first.",
      "RGB software control varies by motherboard; confirm compatibility with your board's RGB ecosystem.",
    ],
    faqs: [
      { q: "Is TeamGroup RAM reliable?", a: "TeamGroup is an established memory maker, and its T-Force kits are widely used in budget and mid-range gaming builds." },
      { q: "What is the difference between T-Force and T-Create?", a: "T-Force is the gaming line with RGB designs; T-Create targets creators with higher capacities and subtler styling." },
    ],
  },
  {
    slug: "western-digital",
    name: "WD",
    group: "peripherals",
    apiBrand: "WD",
    aliases: ["wd", "western digital"],
    searches: [
      { keywords: "WD Black SN850X 2TB", searchIndex: "Computers" },
      { keywords: "WD Black 8TB hard drive", searchIndex: "Computers" },
      { keywords: "WD Blue 4TB HDD", searchIndex: "Computers" },
      { keywords: "WD Black SN770 1TB", searchIndex: "Computers" },
    ],
    require: /\b(wd|black|blue|red|purple|sn\d{3}|my passport|elements|game drive)\b/i,
    include: /\b(ssd|nvme|sn\d{3,4}|hard drive|hdd|wd[_ ]black|wd[_ ]blue|elements|my passport|game drive)\b/i,
    exclude: /\b(flash drive|thumb drive|t-?shirt|hoodie|poster|sticker|mug|keychain)\b/i,
    sells: "WD Black and Blue SSDs and hard drives",
    intro:
      "WD's Black SSDs are the default recommendation for gaming storage, and its Blue and Black hard drives cover bulk game libraries. WD storage is discounted constantly, with the biggest cuts on higher capacities.",
    overview: [
      "Western Digital's Black line targets gamers and enthusiasts with drives like the SN850X, one of the fastest Gen4 SSDs available, while Blue covers mainstream builds. Its hard drives remain the cheapest way to store a large game library.",
      "Storage prices move with the NAND and HDD markets, and WD runs frequent promotions on its most popular capacities. Previous-generation Black drives are among the best value SSDs when cleared.",
    ],
    lines: [
      { name: "WD Black SSDs", summary: "SN850X and SN770 NVMe drives for gaming PCs and PS5 storage upgrades." },
      { name: "WD Blue", summary: "Mainstream SSDs and hard drives for everyday builds." },
      { name: "External game drives", summary: "Black P10 and Elements portable drives for console and PC libraries." },
      { name: "High-capacity HDDs", summary: "8TB and larger Black and Red drives for bulk storage." },
    ],
    buyingTips: [
      "The SN850X regularly drops to near budget-drive prices; wait for a sale rather than paying full price.",
      "For PS5 upgrades, confirm the drive meets Sony's speed and heatsink requirements.",
      "Hard drives are for bulk storage only; always put your OS and active games on an SSD.",
    ],
    faqs: [
      { q: "What is the difference between WD Black and WD Blue?", a: "Black is WD's performance line for gaming and enthusiasts; Blue is the mainstream line with lower speeds and prices." },
      { q: "Is the WD Black SN850X good for PS5?", a: "Yes, it is one of the most recommended PS5 SSD upgrades, provided you add a heatsink." },
    ],
  },
  {
    slug: "seagate",
    name: "Seagate",
    group: "peripherals",
    apiBrand: "Seagate",
    aliases: ["seagate"],
    searches: [
      { keywords: "Seagate FireCuda 530 2TB", searchIndex: "Computers" },
      { keywords: "Seagate BarraCuda 4TB hard drive", searchIndex: "Computers" },
      { keywords: "Seagate 8TB external hard drive", searchIndex: "Computers" },
      { keywords: "Seagate FireCuda 540 SSD", searchIndex: "Computers" },
    ],
    include: /\b(ssd|nvme|firecuda|barracuda|ironwolf|hard drive|hdd|expansion|one touch|game drive)\b/i,
    exclude: /\b(t-?shirt|hoodie|poster|sticker|mug|keychain|data recovery|rescue plan)\b/i,
    sells: "FireCuda SSDs and BarraCuda hard drives",
    intro:
      "Seagate's FireCuda SSDs target gamers directly, while BarraCuda hard drives remain the cheapest bulk storage for big game libraries. Its drives are discounted steadily, especially high-capacity externals.",
    overview: [
      "Seagate is one of the two giants of hard drives and has pushed into gaming SSDs with the FireCuda line, including Gen4 and Gen5 NVMe models. BarraCuda drives cover mainstream internal storage at low prices per terabyte.",
      "External Expansion and One Touch drives are frequently the cheapest way to add terabytes for a console or PC library. Internal FireCuda SSDs compete with WD Black and Samsung on speed and see similar promotional cycles.",
    ],
    lines: [
      { name: "FireCuda SSDs", summary: "Gaming NVMe drives including Gen4 530 and Gen5 540 models." },
      { name: "BarraCuda HDDs", summary: "Mainstream internal hard drives for bulk game storage." },
      { name: "External drives", summary: "Expansion, One Touch, and Game Drive externals for PC and console." },
      { name: "IronWolf", summary: "NAS-rated drives that also work well for always-on bulk storage." },
    ],
    buyingTips: [
      "External drives are often cheaper per terabyte than internal ones; shucking is an option for desktop use.",
      "Check whether a FireCuda SSD includes a heatsink; PS5 upgrades need one.",
      "For a gaming PC, prioritise an internal NVMe SSD first and add HDD bulk storage second.",
    ],
    faqs: [
      { q: "What is the difference between FireCuda and BarraCuda?", a: "FireCuda is Seagate's performance gaming line, including fast NVMe SSDs; BarraCuda is the mainstream line focused on value." },
      { q: "Are Seagate external drives good for consoles?", a: "Yes. Expansion and Game Drive externals are popular, cheap ways to extend console storage for last-gen games." },
    ],
  },
  {
    slug: "sabrent",
    name: "Sabrent",
    group: "peripherals",
    apiBrand: "Sabrent",
    aliases: ["sabrent"],
    searches: [
      { keywords: "Sabrent Rocket 4 Plus 2TB", searchIndex: "Computers" },
      { keywords: "Sabrent 4TB NVMe SSD", searchIndex: "Computers" },
      { keywords: "Sabrent Rocket Q4 2TB", searchIndex: "Computers" },
      { keywords: "Sabrent USB-C NVMe enclosure", searchIndex: "Computers" },
    ],
    include: /\b(ssd|nvme|rocket|sata|enclosure|docking|hard drive|ec-)\b/i,
    exclude: /\b(t-?shirt|hoodie|poster|sticker|mug|keychain|cfexpress|sd ?card)\b/i,
    sells: "Rocket NVMe SSDs and enclosures",
    intro:
      "Sabrent's Rocket SSDs built a cult following among enthusiasts for high performance at aggressive prices, and its enclosures and docking stations are workshop staples. Both see regular Amazon discounts.",
    overview: [
      "Sabrent is a US storage brand that earned its reputation with the Rocket NVMe line, offering flagship-class speeds for less than the biggest names. It has since expanded into high-capacity 4TB and 8TB models that few competitors match on price.",
      "Beyond SSDs, Sabrent sells well-regarded NVMe enclosures, drive docks, and adapters that are popular with builders and IT users. Discounts land across the range, with enclosures frequently bundled or marked down.",
    ],
    lines: [
      { name: "Rocket NVMe SSDs", summary: "Rocket 4 Plus, Rocket 5, and Rocket Q drives from 1TB to 8TB." },
      { name: "Enclosures and docks", summary: "USB-C NVMe enclosures and drive docking stations." },
      { name: "High-capacity SSDs", summary: "4TB and 8TB models for builders who want everything on flash." },
    ],
    buyingTips: [
      "Sabrent's high-capacity models are often the cheapest way to get 4TB or 8TB of NVMe storage.",
      "Check the heatsink situation; some Rocket drives run hot without one in tight cases.",
      "Enclosures are a cheap way to reuse an old SSD as fast external storage.",
    ],
    faqs: [
      { q: "Is Sabrent a good SSD brand?", a: "Yes. Sabrent's Rocket drives are well reviewed and popular with enthusiasts for their price-to-performance ratio." },
      { q: "Does Sabrent make good enclosures?", a: "Its USB-C NVMe enclosures are among the most recommended for turning spare SSDs into portable drives." },
    ],
  },
  {
    slug: "patriot",
    name: "Patriot",
    group: "peripherals",
    apiBrand: "Patriot",
    aliases: ["patriot", "patriot memory", "viper gaming"],
    searches: [
      { keywords: "Patriot Viper 32GB DDR5", searchIndex: "Computers" },
      { keywords: "Patriot Viper VP4300 2TB", searchIndex: "Computers" },
      { keywords: "Patriot P400 1TB SSD", searchIndex: "Computers" },
      { keywords: "Viper Elite DDR4 32GB", searchIndex: "Computers" },
    ],
    include: /\b(ddr\d|viper|ram|memory|sodimm|dimm|ssd|nvme|p\d{3,4}|vp\d{4})\b/i,
    exclude: /\b(usb|flash drive|microsd|sd ?card|card reader|t-?shirt|hoodie|poster|sticker|mug|keychain)\b/i,
    sells: "Viper gaming memory and NVMe SSDs",
    intro:
      "Patriot's Viper gaming brand covers DDR5 memory and NVMe SSDs at prices that consistently undercut the biggest names. Its kits and drives are discounted often, making them a staple of budget builds.",
    overview: [
      "Patriot has been making memory since the 1980s, and its Viper line brings gaming-styled DDR5 kits and fast NVMe SSDs to builders watching every dollar. The Viper VP4300 is a well-regarded Gen4 drive that regularly drops to value prices.",
      "Because Patriot competes on price first, its products are frequently the cheapest way to hit a given spec, such as 32GB of DDR5-6000. Discounts stack on top of already low street prices.",
    ],
    lines: [
      { name: "Viper gaming memory", summary: "DDR5 and DDR4 kits, including RGB Venom models." },
      { name: "Viper SSDs", summary: "VP-series NVMe drives like the VP4300 for gaming builds." },
      { name: "P-series SSDs", summary: "Budget NVMe drives for everyday systems." },
    ],
    buyingTips: [
      "Compare the exact speed and timings against TeamGroup and Silicon Power; the cheapest kit wins at equal specs.",
      "Check motherboard QVL lists for Viper kits if you want guaranteed EXPO or XMP speeds.",
      "The VP4300 is a strong pick when discounted; verify the capacity matches your needs first.",
    ],
    faqs: [
      { q: "Is Patriot Viper RAM good?", a: "Yes. Patriot is a long-established memory maker, and Viper kits are popular in budget and mid-range gaming builds." },
      { q: "What is the difference between Viper and P-series SSDs?", a: "Viper SSDs target gamers with higher speeds; P-series drives are budget models for everyday use." },
    ],
  },

  // --------------------------------- PC components: cooling, cases, PSUs
  {
    slug: "noctua",
    name: "Noctua",
    group: "peripherals",
    apiBrand: "Noctua",
    aliases: ["noctua"],
    searches: [
      { keywords: "Noctua NH-D15", searchIndex: "Computers" },
      { keywords: "Noctua NF-A12x25", searchIndex: "Computers" },
      { keywords: "Noctua NH-U12A", searchIndex: "Computers" },
      { keywords: "Noctua NH-D15 G2", searchIndex: "Computers" },
    ],
    include: /\b(nh-[a-z0-9]+|nf-[a-z0-9]+|cooler|heatsink|fan|thermal|nt-h)\b/i,
    exclude: /\b(t-?shirt|hoodie|poster|sticker|mug|keychain|deskpads?|mousepad)\b/i,
    sells: "CPU coolers and PC fans",
    intro:
      "Noctua is the reference brand for quiet, high-performance air cooling, famous for its brown fans and the NH-D15 cooler. Its products rarely go on deep sale, so even modest discounts are worth catching.",
    overview: [
      "The Austrian company Noctua built its reputation on fans and heatsinks that cool better while running quieter than almost anything else. The NH-D15 remains the air cooler every other air cooler is measured against, and the NF-A12x25 is widely considered the best 120mm fan made.",
      "Noctua discounts are smaller and rarer than most brands here, which makes tracking prices worthwhile: a 15 percent drop on an NH-D15 is a genuine event. The chromax.black line offers the same performance without the signature brown colour.",
    ],
    lines: [
      { name: "NH-D15 and NH-U12A", summary: "Flagship dual-tower and single-tower air coolers that rival many liquid coolers." },
      { name: "NF-A12x25 and NF fans", summary: "Premium case and radiator fans known for quiet performance." },
      { name: "chromax.black", summary: "Black versions of Noctua's coolers and fans for stealth builds." },
      { name: "NT-H1 and NT-H2", summary: "Noctua's thermal pastes, frequently bought alongside its coolers." },
    ],
    buyingTips: [
      "Check RAM and case clearance; the NH-D15 is tall and wide and overhangs memory slots.",
      "Noctua provides free mounting kits for new sockets, which protects the investment across upgrades.",
      "chromax.black versions cost slightly more; the brown originals cool identically.",
    ],
    faqs: [
      { q: "Is the Noctua NH-D15 still worth it?", a: "Yes. It matches many 240mm liquid coolers while being quieter and having no pump to fail." },
      { q: "Do Noctua coolers fit new sockets?", a: "Noctua ships free mounting kits for new Intel and AMD sockets to existing owners." },
    ],
  },
  {
    slug: "be-quiet",
    name: "be quiet!",
    group: "peripherals",
    apiBrand: "be quiet!",
    aliases: ["be quiet", "bequiet"],
    searches: [
      { keywords: "be quiet Dark Rock Pro 5", searchIndex: "Computers" },
      { keywords: "be quiet Silent Wings 4", searchIndex: "Computers" },
      { keywords: "be quiet Straight Power 12 850W", searchIndex: "Computers" },
      { keywords: "be quiet Pure Wings 2", searchIndex: "Computers" },
    ],
    include: /\b(dark rock|silent wings|pure wings|light wings|straight power|pure power|dark power|system power|cooler|fan|power supply|psu|case|dark base|pure base)\b/i,
    exclude: /\b(t-?shirt|hoodie|poster|sticker|mug|keychain)\b/i,
    sells: "CPU coolers, silent fans, power supplies, and cases",
    intro:
      "be quiet! is the German specialist in silent PC hardware, from Dark Rock coolers and Silent Wings fans to Straight Power PSUs. Its products are discounted regularly, which matters because silence usually costs extra.",
    overview: [
      "True to its name, be quiet! designs every product around low noise, and its Dark Rock coolers and Silent Wings fans are benchmarks for quiet performance. The company also makes well-regarded power supplies and understated cases.",
      "be quiet! products sit at a small premium over louder rivals, so discounts close the gap and make them the sensible pick for quiet builds. Previous-generation PSUs and coolers see the biggest cuts.",
    ],
    lines: [
      { name: "Dark Rock coolers", summary: "Flagship air coolers tuned for maximum performance at minimum noise." },
      { name: "Silent Wings fans", summary: "Premium quiet case and radiator fans." },
      { name: "Straight Power and Pure Power", summary: "80 Plus Gold and Platinum PSUs in a wide range of wattages." },
      { name: "Dark Base and Pure Base", summary: "Understated cases designed for silent builds." },
    ],
    buyingTips: [
      "Pure Wings fans cost far less than Silent Wings and are still quiet; compare both at sale prices.",
      "For PSUs, buy ATX 3.1 models if you run a current high-end GPU with a 12V-2x6 connector.",
      "Check cooler height against your case; Dark Rock Pro models are among the tallest air coolers.",
    ],
    faqs: [
      { q: "Is be quiet! good for silent builds?", a: "It is one of the best choices. The entire brand is built around low-noise cooling, fans, PSUs, and cases." },
      { q: "What is the difference between Straight Power and Pure Power?", a: "Straight Power is the higher-end PSU line with better efficiency and quieter fans; Pure Power is the value line." },
    ],
  },
  {
    slug: "arctic",
    name: "ARCTIC",
    group: "peripherals",
    apiBrand: "ARCTIC",
    aliases: ["arctic"],
    searches: [
      { keywords: "Arctic Liquid Freezer III 360", searchIndex: "Computers" },
      { keywords: "Arctic P12 PWM PST", searchIndex: "Computers" },
      { keywords: "Arctic MX-6 thermal paste", searchIndex: "Computers" },
      { keywords: "Arctic Freezer 36", searchIndex: "Computers" },
    ],
    include: /\b(liquid freezer|freezer|p\d{2}|f\d{2}|mx-\d|cooler|fan|thermal|aio|liquid cooling)\b/i,
    exclude: /\b(t-?shirt|hoodie|poster|sticker|mug|keychain)\b/i,
    sells: "CPU coolers, case fans, and thermal paste",
    intro:
      "ARCTIC's Liquid Freezer AIOs and P12 fans are famous for beating pricier rivals, and its MX thermal paste is a default recommendation. ARCTIC prices start low and discounts push them lower.",
    overview: [
      "The Swiss company ARCTIC built its following on the Freezer cooler series and the P12 fan, which became the default budget fan for builders worldwide because five-packs cost less than a single premium fan. The Liquid Freezer III brought that value approach to AIO liquid cooling with a thicker radiator.",
      "ARCTIC's pricing strategy means even small discounts create standout deals. The P12 PWM PST five-pack and MX-6 paste are frequent deal highlights for builders upgrading cooling on a budget.",
    ],
    lines: [
      { name: "Liquid Freezer III", summary: "AIO liquid coolers with thick radiators that outperform many pricier rivals." },
      { name: "Freezer 36", summary: "Budget tower air coolers that punch above their price." },
      { name: "P12 and F12 fans", summary: "Value case fans sold in money-saving multi-packs." },
      { name: "MX-6 thermal paste", summary: "High-performance paste that is a default pick for repastes." },
    ],
    buyingTips: [
      "The Liquid Freezer III uses a thicker radiator than most AIOs; confirm your case supports it.",
      "P12 PWM PST fans daisy-chain together, which simplifies cable management in multi-fan builds.",
      "Check socket compatibility on older Freezer models; current versions support recent Intel and AMD platforms.",
    ],
    faqs: [
      { q: "Is the Arctic Liquid Freezer III good?", a: "Yes. It consistently ranks among the best-performing AIOs while costing less than most competitors." },
      { q: "What does PST mean on Arctic fans?", a: "PST stands for PWM Sharing Technology: the fans daisy-chain so several can run from one motherboard header." },
    ],
  },
  {
    slug: "lian-li",
    name: "Lian Li",
    group: "peripherals",
    apiBrand: "Lian Li",
    aliases: ["lian li", "lianli"],
    searches: [
      { keywords: "Lian Li O11 Dynamic", searchIndex: "Computers" },
      { keywords: "Lian Li Lancool 216", searchIndex: "Computers" },
      { keywords: "Lian Li UNI Fan SL120", searchIndex: "Computers" },
      { keywords: "Lian Li O11 Vision", searchIndex: "Computers" },
    ],
    include: /\b(case|tower|chassis|o11|lancool|uni fan|strimer|fan|galahad)\b/i,
    exclude: /\b(t-?shirt|hoodie|poster|sticker|mug|keychain|desk)\b/i,
    sells: "PC cases, UNI fans, and Strimer RGB cables",
    intro:
      "Lian Li's O11 cases defined the modern glass-and-RGB build aesthetic, and its UNI fans and Strimer cables are fixtures of showpiece PCs. Its cases and fans are discounted regularly.",
    overview: [
      "Lian Li started as a premium aluminium case maker and became a design leader with the O11 Dynamic, the dual-chamber case that launched a thousand build photos. The Lancool line brings similar design at lower prices, and UNI fans simplified RGB fan wiring with daisy-chained connections.",
      "Lian Li refreshes its case lineup often, so previous O11 and Lancool versions are cleared at good discounts. UNI fan kits are also promoted frequently, especially in three-packs.",
    ],
    lines: [
      { name: "O11 cases", summary: "Dual-chamber glass cases from the classic Dynamic to the Vision and Evo variants." },
      { name: "Lancool cases", summary: "Airflow-focused mid-towers at more accessible prices." },
      { name: "UNI fans", summary: "Daisy-chainable RGB fans that cut cable clutter." },
      { name: "Strimer cables", summary: "RGB-lit power cables for motherboard and GPU runs." },
    ],
    buyingTips: [
      "O11 cases need plenty of fans to fill their mounts; factor fan costs into the case price.",
      "Check radiator support if you plan liquid cooling; not every O11 variant fits the same sizes.",
      "UNI fan generations differ in connectors; match the controller to your fan version.",
    ],
    faqs: [
      { q: "What is special about Lian Li UNI fans?", a: "They daisy-chain together with a single cable per group, which drastically reduces wiring compared with standard RGB fans." },
      { q: "What is the difference between O11 Dynamic and O11 Vision?", a: "Both are dual-chamber glass cases; the Vision emphasises a seamless glass front and cornerless view." },
    ],
  },
  {
    slug: "fractal-design",
    name: "Fractal Design",
    group: "peripherals",
    apiBrand: "Fractal Design",
    aliases: ["fractal design", "fractal"],
    searches: [
      { keywords: "Fractal Design North", searchIndex: "Computers" },
      { keywords: "Fractal Design Terra", searchIndex: "Computers" },
      { keywords: "Fractal Design Pop Air", searchIndex: "Computers" },
      { keywords: "Fractal Design Meshify 3", searchIndex: "Computers" },
    ],
    include: /\b(case|tower|chassis|north|terra|pop|meshify|define|torrent|ridge|mood|era)\b/i,
    exclude: /\b(t-?shirt|hoodie|poster|sticker|mug|keychain)\b/i,
    sells: "Scandinavian-designed PC cases",
    intro:
      "Fractal Design's Scandinavian cases, from the wood-fronted North to the airflow Meshify line, are favourites of builders who care about design. Its cases see regular discounts, especially outgoing models.",
    overview: [
      "The Swedish company Fractal Design built its name on quiet, minimal cases and then broadened into airflow and showpiece designs. The North, with its oak or walnut front slats, became one of the most distinctive cases on the market, while the Terra brought the aesthetic to small-form-factor builds.",
      "Fractal cases are premium-priced, so promotions matter. Previous generations like the Meshify 2 and Define 7 are cleared at meaningful discounts when successors arrive.",
    ],
    lines: [
      { name: "North", summary: "Mid-tower with a wood-slat front, in mesh and glass variants." },
      { name: "Terra", summary: "Premium small-form-factor case for compact gaming builds." },
      { name: "Pop and Meshify", summary: "Airflow-focused cases at more accessible prices." },
      { name: "Define and Torrent", summary: "Silent and high-airflow full-tower options." },
    ],
    buyingTips: [
      "The North's wood front restricts airflow slightly; the mesh variant cools better than the glass one.",
      "Terra builds need an SFX power supply and careful GPU length checks.",
      "Compare outgoing Meshify and Define generations; the discounts often outweigh the generational changes.",
    ],
    faqs: [
      { q: "Is the Fractal North good for airflow?", a: "The mesh version has good airflow; the tempered glass version trades some cooling for looks." },
      { q: "What size PSU does the Fractal Terra need?", a: "The Terra requires an SFX or SFX-L power supply; standard ATX units do not fit." },
    ],
  },
  {
    slug: "phanteks",
    name: "Phanteks",
    group: "peripherals",
    apiBrand: "Phanteks",
    aliases: ["phanteks"],
    searches: [
      { keywords: "Phanteks XT Pro Ultra", searchIndex: "Computers" },
      { keywords: "Phanteks NV5", searchIndex: "Computers" },
      { keywords: "Phanteks Glacier One 360", searchIndex: "Computers" },
      { keywords: "Phanteks Evolv X", searchIndex: "Computers" },
    ],
    include: /\b(case|tower|chassis|glacier|cooler|aio|fan|evolv|xt |nv\d)\b/i,
    exclude: /\b(t-?shirt|hoodie|poster|sticker|mug|keychain)\b/i,
    sells: "PC cases and Glacier One liquid coolers",
    intro:
      "Phanteks makes enthusiast PC cases like the XT Pro Ultra and NV series plus Glacier One liquid coolers, known for build quality and thoughtful design. Its cases are discounted steadily on Amazon.",
    overview: [
      "Phanteks grew from a cooling company into a full case maker, and its designs are known for details builders appreciate: good cable management, flexible radiator support, and clean aesthetics. The XT and NV lines cover everything from budget airflow to premium glass towers.",
      "Phanteks cases compete directly with Lian Li and Fractal Design, and promotions keep them in the fight. Glacier One AIOs are solid performers that get discounted alongside the cases.",
    ],
    lines: [
      { name: "XT cases", summary: "Airflow mid-towers like the XT Pro Ultra at competitive prices." },
      { name: "NV cases", summary: "Premium glass towers including the NV5 and NV7." },
      { name: "Evolv", summary: "Phanteks' classic enthusiast case line." },
      { name: "Glacier One", summary: "AIO liquid coolers in 240mm to 420mm sizes." },
    ],
    buyingTips: [
      "Check the included fans; some Phanteks cases ship with more fans than rivals at the same price.",
      "Confirm radiator and GPU clearance for your specific build before buying.",
      "Glacier One coolers are strong value when discounted against bigger AIO brands.",
    ],
    faqs: [
      { q: "Is Phanteks a good case brand?", a: "Yes. Phanteks is well regarded for build quality, cable management, and cooling flexibility." },
      { q: "What is the difference between XT and NV cases?", a: "XT cases focus on airflow and value; NV cases are premium glass towers aimed at showpiece builds." },
    ],
  },
  {
    slug: "thermaltake",
    name: "Thermaltake",
    group: "peripherals",
    apiBrand: "Thermaltake",
    aliases: ["thermaltake"],
    searches: [
      { keywords: "Thermaltake Tower 300", searchIndex: "Computers" },
      { keywords: "Thermaltake Toughpower GF3 850W", searchIndex: "Computers" },
      { keywords: "Thermaltake TH360 V2", searchIndex: "Computers" },
      { keywords: "Thermaltake View 270", searchIndex: "Computers" },
    ],
    include: /\b(case|tower|chassis|cooler|aio|fan|power supply|psu|toughpower|smart|view|versa|commander|core)\b/i,
    exclude: /\b(keyboard|mouse|headset|chair|desk|t-?shirt|hoodie|poster|sticker|mug|keychain)\b/i,
    sells: "PC cases, Toughpower PSUs, and liquid coolers",
    intro:
      "Thermaltake covers nearly every part of a build: Tower and View cases, Toughpower power supplies, and TH-series liquid coolers. Its wide range means there is almost always a Thermaltake promotion running.",
    overview: [
      "Founded in Taiwan in 1999, Thermaltake grew from cooling into cases, power supplies, and peripherals, becoming one of the most widely stocked PC brands. The Tower series' vertical designs and the View series' glass panels give its cases a distinctive look.",
      "Thermaltake's breadth is its strength for deal hunters: cases, PSUs, and coolers from one brand are discounted across overlapping cycles. Toughpower GF and GF3 PSUs are particular value highlights when marked down.",
    ],
    lines: [
      { name: "Tower cases", summary: "Vertical-design cases like the Tower 300 for distinctive builds." },
      { name: "View and Versa cases", summary: "Glass-panel and budget mid-towers." },
      { name: "Toughpower PSUs", summary: "GF and GF3 power supplies, including ATX 3.1 models for new GPUs." },
      { name: "TH coolers", summary: "AIO liquid coolers in 240mm to 420mm sizes." },
    ],
    buyingTips: [
      "For new high-end GPUs, choose an ATX 3.1 Toughpower with a native 12V-2x6 cable.",
      "Tower cases have unusual layouts; check component compatibility carefully.",
      "This page tracks cases, PSUs, and cooling; Thermaltake's peripherals and chairs are listed separately.",
    ],
    faqs: [
      { q: "Are Thermaltake PSUs reliable?", a: "The Toughpower GF and GF3 series are well-regarded units with good efficiency and warranties." },
      { q: "What is special about Tower cases?", a: "They use a vertical, chimney-style layout that shows off components through glass panels." },
    ],
  },
  {
    slug: "seasonic",
    name: "Seasonic",
    group: "peripherals",
    apiBrand: "Seasonic",
    aliases: ["seasonic"],
    searches: [
      { keywords: "Seasonic Focus GX-850", searchIndex: "Computers" },
      { keywords: "Seasonic Vertex GX-1000", searchIndex: "Computers" },
      { keywords: "Seasonic Prime TX-1600", searchIndex: "Computers" },
      { keywords: "Seasonic Focus GX-1000", searchIndex: "Computers" },
    ],
    include: /\b(power supply|psu|focus|vertex|prime|gx-|tx-|px-|sgx|s12iii)\b/i,
    exclude: /\b(t-?shirt|hoodie|poster|sticker|mug|keychain|cable|tester)\b/i,
    sells: "Focus, Vertex, and Prime power supplies",
    intro:
      "Seasonic is the power supply specialist that other brands rebrand, known for excellent electrical performance and long warranties. Its PSUs are discounted regularly, and a sale-priced Seasonic is the safest PSU buy in its class.",
    overview: [
      "Seasonic has focused almost exclusively on power supplies for decades, and many competing brands' best units are built by Seasonic. The Focus line covers mainstream builds, Vertex adds ATX 3.1 support, and Prime is the no-compromise flagship.",
      "PSU prices are steadier than GPUs or SSDs, but Seasonic still runs promotions, and previous-generation units drop when ATX 3.1 successors arrive. Long warranties of 10 to 12 years make a discounted Seasonic a long-term investment.",
    ],
    lines: [
      { name: "Focus", summary: "Mainstream Gold and Platinum PSUs, the default recommendation for most builds." },
      { name: "Vertex", summary: "ATX 3.1 and PCIe 5.1 units with native 12V-2x6 cables for new GPUs." },
      { name: "Prime", summary: "Flagship Titanium and Platinum units with the longest warranties." },
    ],
    buyingTips: [
      "Buy more wattage than you need today; a good PSU lasts through several GPU generations.",
      "For RTX 40 and 50 series cards, prefer ATX 3.1 Vertex models with a native 12V-2x6 cable.",
      "Check the warranty length; Seasonic's long coverage is part of what you are paying for.",
    ],
    faqs: [
      { q: "Is Seasonic the best PSU brand?", a: "It is widely considered the reference: Seasonic designs its own platforms and builds units for other brands too." },
      { q: "What wattage PSU do I need?", a: "Most single-GPU gaming builds are fine with 750W to 850W; flagship GPUs and overclocking push that to 1000W." },
    ],
  },
  {
    slug: "super-flower",
    name: "Super Flower",
    group: "peripherals",
    apiBrand: "Super Flower",
    aliases: ["super flower", "superflower"],
    searches: [
      { keywords: "Super Flower Leadex VII 1000W", searchIndex: "Computers" },
      { keywords: "Super Flower Leadex III 850W", searchIndex: "Computers" },
      { keywords: "Super Flower Leadex Platinum 1600W", searchIndex: "Computers" },
      { keywords: "Super Flower Zillion 750W", searchIndex: "Computers" },
    ],
    include: /\b(power supply|psu|leadex|zillion|watt|80\+)\b/i,
    exclude: /\b(t-?shirt|hoodie|poster|sticker|mug|keychain)\b/i,
    sells: "Leadex power supplies",
    intro:
      "Super Flower's Leadex PSUs are legendary among enthusiasts for top-tier electrical performance, and the brand now sells direct on Amazon with regular discounts. A sale-priced Leadex often beats bigger brands on both price and quality.",
    overview: [
      "Super Flower is a Taiwanese PSU manufacturer whose Leadex platform powered some of the most acclaimed power supplies ever sold under other brands' names. It now sells Leadex units under its own name, from the value Leadex III to the flagship Leadex VII and VIII.",
      "Enthusiasts rate Leadex units among the very best, yet Super Flower prices them below equivalent Seasonic and Corsair models. Discounts on Amazon make the value gap even wider.",
    ],
    lines: [
      { name: "Leadex VII and VIII", summary: "Flagship ATX 3.1 units with top efficiency ratings and native 12V-2x6 cables." },
      { name: "Leadex III", summary: "Value Gold-rated units that punch above their price." },
      { name: "Zillion", summary: "Budget Bronze and Gold units for cost-conscious builds." },
    ],
    buyingTips: [
      "Leadex units carry 10-year warranties; register the PSU to activate full coverage.",
      "For new flagship GPUs, choose a Leadex VII or VIII with ATX 3.1 support.",
      "Compare against Seasonic Focus at the same wattage; the Super Flower is often cheaper for equal quality.",
    ],
    faqs: [
      { q: "Is Super Flower a good PSU brand?", a: "Yes. Super Flower manufactures its own acclaimed Leadex platform, which enthusiasts rate among the best." },
      { q: "What is the difference between Leadex III, VII, and VIII?", a: "They are generations and tiers: Leadex III is the value line, while VII and VIII are newer flagships with ATX 3.1 support." },
    ],
  },
  {
    slug: "deepcool",
    name: "DeepCool",
    group: "peripherals",
    apiBrand: "DeepCool",
    aliases: ["deepcool", "deep cool"],
    searches: [
      { keywords: "DeepCool AK400", searchIndex: "Computers" },
      { keywords: "DeepCool LS520", searchIndex: "Computers" },
      { keywords: "DeepCool CH560", searchIndex: "Computers" },
      { keywords: "DeepCool Assassin IV", searchIndex: "Computers" },
    ],
    include: /\b(cooler|aio|fan|case|tower|chassis|assassin|gammaxx|ls\d{3}|lt\d{3}|ak\d{3}|ch\d{3}|morheus|fk120)\b/i,
    exclude: /\b(t-?shirt|hoodie|poster|sticker|mug|keychain)\b/i,
    sells: "CPU coolers, AIOs, and PC cases",
    intro:
      "DeepCool's AK air coolers, LS liquid coolers, and CH cases deliver strong performance at prices that undercut most rivals. Its products are discounted frequently, making it a go-to for value cooling.",
    overview: [
      "DeepCool built its name on coolers that match premium brands for less money, from the budget AK400 tower to the flagship Assassin IV dual-tower. Its LS and LT AIO liquid coolers and CH-series cases extended that value approach across the build.",
      "DeepCool's aggressive pricing means its products are already cheap, and promotions make them cheaper still. The AK400 and LS520 are frequent deal highlights for builders upgrading cooling without overspending.",
    ],
    lines: [
      { name: "AK and Assassin coolers", summary: "Tower air coolers from the budget AK400 to the flagship Assassin IV." },
      { name: "LS and LT AIOs", summary: "Liquid coolers in 240mm to 360mm sizes at value prices." },
      { name: "CH and Morpheus cases", summary: "Airflow mid-towers and compact cases." },
      { name: "FK and FC fans", summary: "Value case fans, often sold in multi-packs." },
    ],
    buyingTips: [
      "The AK400 is the default budget cooler pick; check it fits your socket before paying more.",
      "Assassin IV competes with the Noctua NH-D15 at a lower price when discounted.",
      "Confirm case radiator support for LS and LT AIOs, especially in compact cases.",
    ],
    faqs: [
      { q: "Is DeepCool a good cooler brand?", a: "Yes. DeepCool's AK and Assassin air coolers and LS AIOs are well reviewed and known for strong value." },
      { q: "What is the difference between AK400 and Assassin IV?", a: "The AK400 is a budget single-tower cooler for mainstream CPUs; the Assassin IV is a flagship dual-tower for high-end chips." },
    ],
  },
];
