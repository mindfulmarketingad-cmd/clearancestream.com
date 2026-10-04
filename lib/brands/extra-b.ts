import type { Brand } from "../brands";

// Local copies of the filter gates from lib/brands.ts (duplicated here to avoid
// a circular import: lib/brands.ts imports this file's EXTRA_BRANDS_B).
const PERIPHERALS =
  /\b(keyboard|mouse|mice|headset|headphones?|monitor|webcam|microphone|mouse ?pad|controller|chair|desk|cable|fans?|fan kit|case|chassis|power supply|psu|ram kit|memory kit|cooler|stream deck|capture card|replacement|sticker|skin)\b/i;
const NO_DESKTOPS = /\b(gaming (pc|desktop|computer)|desktop)\b/i;

export const EXTRA_BRANDS_B: Brand[] = [
  // ------------------------------------------------------- Monitors
  {
    slug: "aoc",
    name: "AOC",
    group: "displays",
    apiBrand: "AOC",
    searches: [
      { keywords: "AOC gaming monitor", searchIndex: "Computers" },
      { keywords: "AOC 27 inch 165Hz monitor", searchIndex: "Computers" },
      { keywords: "AOC curved gaming monitor", searchIndex: "Computers" },
      { keywords: "AOC Q27G4 monitor", searchIndex: "Computers" },
    ],
    require: /\bmonitor\b/i,
    include: NO_DESKTOPS,
    exclude: PERIPHERALS,
    sells: "gaming monitors, from budget 1080p panels to 4K high-refresh displays",
    intro:
      "AOC is one of the best-selling monitor brands on Amazon, known for packing high refresh rates and adaptive sync into very aggressive prices. Its G-series gaming monitors are among the most discounted displays online, making AOC a staple of budget and mid-range gaming setups.",
    overview: [
      "AOC is the monitor brand of TPV Technology, one of the largest display manufacturers in the world. That scale lets AOC sell high-refresh 1080p and 1440p panels at prices few competitors can match, and its monitors are fixtures of Amazon's best-seller lists.",
      "AOC discounts are frequent and often deep, especially on outgoing generations when a new G-series revision launches. Because the lineup is so wide, comparing panel type, refresh rate, and resolution across nearby models is the fastest way to spot the real bargains.",
    ],
    lines: [
      { name: "G2 and G4 gaming monitors", summary: "AOC's core high-refresh gaming line, from 24-inch 1080p to 27-inch 1440p models." },
      { name: "Curved monitors", summary: "Affordable curved VA panels in 27- to 34-inch sizes." },
      { name: "4K and ultrawide", summary: "Higher-resolution models for creators and immersive gaming." },
    ],
    buyingTips: [
      "Check the panel type. AOC's VA panels have strong contrast; its IPS models have better viewing angles and motion clarity.",
      "Compare the G2 and G4 generations of the same model. The older one is often much cheaper with only small differences.",
      "Confirm the stand adjustments; budget AOC models sometimes have limited height adjustment.",
    ],
    faqs: [
      { q: "Are AOC monitors good for gaming?", a: "Yes, especially at the price. AOC's gaming monitors offer high refresh rates and adaptive sync that compete with more expensive brands." },
      { q: "What is the difference between AOC G2 and G4 monitors?", a: "G4 models are newer revisions with updated panels or higher refresh rates. Outgoing G2 models are often the better deal." },
    ],
  },
  {
    slug: "viewsonic",
    name: "ViewSonic",
    group: "displays",
    apiBrand: "ViewSonic",
    searches: [
      { keywords: "ViewSonic gaming monitor", searchIndex: "Computers" },
      { keywords: "ViewSonic XG2405 monitor", searchIndex: "Computers" },
      { keywords: "ViewSonic 27 inch 144Hz monitor", searchIndex: "Computers" },
    ],
    require: /\bmonitor\b/i,
    include: NO_DESKTOPS,
    exclude: PERIPHERALS,
    sells: "gaming monitors, including XG esports and Elite premium displays",
    intro:
      "ViewSonic's XG gaming monitors and Elite displays are regulars in Amazon's monitor deals, offering fast IPS panels and high refresh rates at competitive prices. The brand has been making displays since the 1980s and discounts its gaming lines often.",
    overview: [
      "ViewSonic is a California display company whose XG series targets competitive gamers with fast response times and high refresh rates, while the Elite line adds premium features such as higher brightness and better colour. The VX series covers the value end of the range.",
      "ViewSonic monitors see regular promotions, and older XG models are frequently cleared when new versions arrive. Its long product cycles mean a discounted previous-generation model is usually still a strong performer.",
    ],
    lines: [
      { name: "XG series", summary: "Esports-focused gaming monitors with fast IPS panels and high refresh rates." },
      { name: "Elite", summary: "Premium gaming displays with better colour and HDR performance." },
      { name: "VX series", summary: "Value gaming and office monitors, often the cheapest way into high refresh rates." },
    ],
    buyingTips: [
      "XG models are the safest gaming picks; VX models vary more in panel quality.",
      "Check the response time spec on the exact model, not just the series name.",
      "Older XG monitors are frequently discounted and still perform well for competitive play.",
    ],
    faqs: [
      { q: "Is ViewSonic good for gaming monitors?", a: "Yes. The XG series is well regarded for competitive gaming, with fast panels and low input lag." },
      { q: "What is the difference between ViewSonic XG and Elite?", a: "XG is the mainstream gaming line; Elite is the premium tier with better colour, brightness, and HDR." },
    ],
  },
  {
    slug: "benq-zowie",
    name: "BenQ ZOWIE",
    group: "displays",
    apiBrand: "BenQ",
    aliases: ["benq", "zowie", "benq zowie"],
    searches: [
      { keywords: "ZOWIE gaming monitor", searchIndex: "Computers" },
      { keywords: "BenQ ZOWIE XL2546K", searchIndex: "Computers" },
      { keywords: "ZOWIE 240Hz monitor", searchIndex: "Computers" },
      { keywords: "BenQ MOBIUZ monitor", searchIndex: "Computers" },
    ],
    require: /\b(zowie|mobiuz|monitor)\b/i,
    include: NO_DESKTOPS,
    exclude: PERIPHERALS,
    sells: "ZOWIE esports monitors and MOBIUZ gaming displays",
    intro:
      "ZOWIE is BenQ's esports brand, and its XL monitors are the standard displays at professional Counter-Strike and Valorant tournaments. MOBIUZ covers the more casual side with better colour and HDR, and both lines are discounted regularly.",
    overview: [
      "ZOWIE monitors are built for competitive FPS players, with TN panels tuned for motion clarity, Black eQualizer for visibility in dark scenes, and DyAc blur reduction on premium models. They are the monitors most often seen on tournament stages.",
      "ZOWIE monitors rarely change cosmetically between generations, so outgoing XL models are frequently discounted with little practical difference. MOBIUZ models compete more directly on image quality and see broader promotions.",
    ],
    lines: [
      { name: "ZOWIE XL series", summary: "The esports standard: 240Hz and 360Hz TN monitors tuned for competitive FPS." },
      { name: "ZOWIE XL-K", summary: "The current XL generation with DyAc+ motion clarity technology." },
      { name: "MOBIUZ", summary: "BenQ's gaming monitors with IPS panels, HDRi, and built-in speakers." },
    ],
    buyingTips: [
      "ZOWIE TN panels prioritise motion clarity over colour; choose MOBIUZ if image quality matters more.",
      "DyAc models cost significantly more. Decide whether blur reduction is worth it for your games.",
      "Check which XL generation you are buying; model numbers are similar across years.",
    ],
    faqs: [
      { q: "Are ZOWIE monitors good for competitive gaming?", a: "Yes. They are the most common monitors in professional FPS tournaments, tuned for clarity and low input lag." },
      { q: "What is DyAc?", a: "BenQ ZOWIE's blur-reduction technology, which sharpens fast motion on supported XL monitors." },
    ],
  },
  {
    slug: "dell-monitors",
    name: "Dell Monitors",
    group: "displays",
    apiBrand: "Dell",
    aliases: ["dell"],
    searches: [
      { keywords: "Dell gaming monitor", searchIndex: "Computers" },
      { keywords: "Dell 27 inch 165Hz monitor", searchIndex: "Computers" },
      { keywords: "Dell G2724D monitor", searchIndex: "Computers" },
    ],
    require: /\b(monitor|display)\b/i,
    include: NO_DESKTOPS,
    exclude: PERIPHERALS,
    sells: "Dell gaming and office monitors, including the G-series",
    intro:
      "Dell-branded gaming monitors sit below Alienware in Dell's lineup but offer strong value, with G-series models packing 144Hz-plus panels at mid-range prices. Dell runs frequent monitor promotions, and its gaming models are often among the cheapest high-refresh options from a major brand.",
    overview: [
      "Dell's G-series monitors are its mainstream gaming line, with fast IPS panels and adaptive sync, while the S-series covers everyday use with some gaming-friendly specs. Dell's monitors are known for good stands, USB hubs, and solid warranty support.",
      "Dell discounts monitors aggressively around sales events, and previous-generation G-series models are often cleared at large discounts. Alienware monitors are Dell's premium tier and have their own page here.",
    ],
    lines: [
      { name: "G-series", summary: "Dell's mainstream gaming monitors with high refresh rates and adaptive sync." },
      { name: "S-series", summary: "Everyday monitors, some with gaming-friendly refresh rates." },
      { name: "Alienware", summary: "Dell's premium gaming monitors, covered on the Alienware page." },
    ],
    buyingTips: [
      "G-series monitors are the gaming picks; S-series models vary in refresh rate.",
      "Dell's warranty and advance replacement add real value over lesser-known brands.",
      "Compare the G-series against discounted Alienware models; the price gap is sometimes small.",
    ],
    faqs: [
      { q: "Are Dell monitors good for gaming?", a: "The G-series models are solid mid-range gaming monitors with high refresh rates. For premium features, see Alienware." },
      { q: "Does this page include Alienware monitors?", a: "No. Alienware monitors have their own page here." },
    ],
  },
  {
    slug: "gigabyte-monitors",
    name: "Gigabyte Monitors",
    group: "displays",
    apiBrand: "Gigabyte",
    aliases: ["gigabyte", "aorus"],
    searches: [
      { keywords: "Gigabyte gaming monitor", searchIndex: "Computers" },
      { keywords: "Gigabyte M27Q monitor", searchIndex: "Computers" },
      { keywords: "AORUS gaming monitor", searchIndex: "Computers" },
      { keywords: "Gigabyte M28U 4K monitor", searchIndex: "Computers" },
    ],
    require: /\b(aorus|monitor)\b/i,
    include: NO_DESKTOPS,
    exclude: PERIPHERALS,
    sells: "Gigabyte and AORUS gaming monitors, including 4K and KVM models",
    intro:
      "Gigabyte's M-series monitors, such as the popular M27Q and M28U, are known for strong specs per dollar, including built-in KVM switches that appeal to gamers who also work from the same desk. The AORUS line sits above as the premium tier, and both are discounted regularly.",
    overview: [
      "Gigabyte entered gaming monitors with the AORUS line and expanded into the value-focused M and G series. The M27Q became a bestseller by combining a fast 1440p panel with a KVM switch at a mid-range price, and the M28U did the same for 4K 144Hz.",
      "Gigabyte monitors are discounted often, and the M-series in particular sees large price drops when new models launch. AORUS models target higher budgets with better HDR and build quality.",
    ],
    lines: [
      { name: "M series", summary: "The value sweet spot: fast 1440p and 4K monitors with KVM switches." },
      { name: "G series", summary: "Budget high-refresh gaming monitors." },
      { name: "AORUS", summary: "Gigabyte's premium gaming monitors with better HDR and features." },
    ],
    buyingTips: [
      "The built-in KVM is a real perk if you share the monitor between a gaming PC and a work laptop.",
      "Check the exact panel revision; Gigabyte reuses model names with different panels.",
      "AORUS models cost more for better HDR; M-series models are usually the better deal.",
    ],
    faqs: [
      { q: "Are Gigabyte monitors good for gaming?", a: "Yes. The M-series monitors are among the best-value high-refresh displays, and AORUS models compete at the premium end." },
      { q: "What is the KVM feature on Gigabyte monitors?", a: "It lets you control two computers with one keyboard and mouse through the monitor, useful for a shared gaming and work setup." },
    ],
  },
  {
    slug: "sceptre",
    name: "Sceptre",
    group: "displays",
    apiBrand: "Sceptre",
    searches: [
      { keywords: "Sceptre gaming monitor", searchIndex: "Computers" },
      { keywords: "Sceptre 27 inch curved monitor", searchIndex: "Computers" },
      { keywords: "Sceptre 34 inch ultrawide monitor", searchIndex: "Computers" },
    ],
    require: /\bmonitor\b/i,
    include: NO_DESKTOPS,
    exclude: PERIPHERALS,
    sells: "budget gaming monitors, including curved and ultrawide models",
    intro:
      "Sceptre is an Amazon bestseller staple, selling some of the cheapest high-refresh and ultrawide gaming monitors available. Its curved 27- and 34-inch models are discounted almost constantly, making Sceptre the go-to for maximum screen size per dollar.",
    overview: [
      "Sceptre focuses on value above all else, offering curved ultrawide and high-refresh monitors at prices well below the big brands. Its listings dominate Amazon's monitor best-seller charts in the budget categories.",
      "Because Sceptre prices start low and promotions are near-constant, the listed discount matters less than the final price. Compare the final price against similarly specced budget rivals before buying.",
    ],
    lines: [
      { name: "Curved gaming monitors", summary: "Affordable curved 27- to 32-inch monitors with high refresh rates." },
      { name: "Ultrawide", summary: "Budget 34-inch ultrawides for immersive gaming and multitasking." },
      { name: "1080p and 1440p flat", summary: "Entry-level high-refresh monitors for tight budgets." },
    ],
    buyingTips: [
      "Judge Sceptre by the final price, not the claimed discount; the base price moves often.",
      "Check the panel specs carefully; budget models can have narrower colour gamuts.",
      "Confirm the refresh rate is reachable over the included cable; some models need DisplayPort for full speed.",
    ],
    faqs: [
      { q: "Are Sceptre monitors good?", a: "For the price, yes. They are among the cheapest ways to get a high-refresh or ultrawide screen, though colour and build quality trail premium brands." },
      { q: "Why are Sceptre monitors always on sale?", a: "Sceptre prices aggressively and runs near-constant promotions; focus on the final price rather than the discount percentage." },
    ],
  },
  // ------------------------------------------- Keyboards and mice
  {
    slug: "ducky",
    name: "Ducky",
    group: "peripherals",
    apiBrand: "Ducky",
    aliases: ["ducky", "ducky channel"],
    searches: [
      { keywords: "Ducky One 3 keyboard", searchIndex: "Computers" },
      { keywords: "Ducky mechanical keyboard", searchIndex: "Computers" },
      { keywords: "Ducky One 2 Mini keyboard", searchIndex: "Computers" },
    ],
    include: NO_DESKTOPS,
    exclude: PERIPHERALS,
    sells: "premium mechanical keyboards, including the One 3 and One 2 lines",
    intro:
      "Ducky is a Taiwanese keyboard maker beloved by enthusiasts for excellent build quality, thick PBT keycaps, and genuine Cherry MX switches. Its One 3 and One 2 keyboards are discounted periodically on Amazon, where older colourways and layouts see the biggest drops.",
    overview: [
      "Ducky built its reputation on no-compromise mechanical keyboards with superb stock keycaps and clean designs. The One 3 series added hot-swap sockets and improved acoustics, while the One 2 Mini remains a classic compact board.",
      "Ducky keyboards sell through resellers on Amazon, so prices vary between sellers and discounts appear in bursts. Previous-generation models and less common layouts are usually the cheapest way into a Ducky board.",
    ],
    lines: [
      { name: "One 3", summary: "Ducky's flagship line with hot-swap sockets, PBT keycaps, and multiple sizes." },
      { name: "One 2", summary: "The previous generation, including the popular One 2 Mini 60% board." },
      { name: "Mecha and Shine", summary: "Aluminium-case and RGB-heavy models for enthusiasts." },
    ],
    buyingTips: [
      "Check the switch type; Ducky boards come with various Cherry MX options that feel very different.",
      "Compare sellers on Amazon; Ducky prices vary more than most brands because of reseller listings.",
      "Hot-swap models (One 3) let you change switches without soldering, which adds long-term value.",
    ],
    faqs: [
      { q: "Are Ducky keyboards good for gaming?", a: "Yes. They are well-built mechanical keyboards with low latency in wired mode, popular with both gamers and typists." },
      { q: "Do Ducky keyboards have hot-swap switches?", a: "The One 3 series does. Older One 2 models are generally soldered." },
    ],
  },
  {
    slug: "akko",
    name: "Akko",
    group: "peripherals",
    apiBrand: "Akko",
    searches: [
      { keywords: "Akko keyboard", searchIndex: "Computers" },
      { keywords: "Akko 3068B keyboard", searchIndex: "Computers" },
      { keywords: "Akko 5075B mechanical keyboard", searchIndex: "Computers" },
      { keywords: "Akko wireless keyboard", searchIndex: "Computers" },
    ],
    include: NO_DESKTOPS,
    exclude: PERIPHERALS,
    sells: "mechanical keyboards, mice, and keycap sets",
    intro:
      "Akko makes colourful, well-built mechanical keyboards that punch above their price, with its own switches, PBT keycaps, and multi-mode wireless on most models. Akko runs an official Amazon store and discounts its keyboards regularly, especially during sale events.",
    overview: [
      "Akko grew from a keycap and switch maker into a full keyboard brand, known for themed designs and good out-of-the-box typing feel. Models like the 3068B, 3084B, and 5075B offer Bluetooth, 2.4GHz, and wired connections with hot-swap sockets.",
      "Akko keyboards are discounted often on Amazon, and older colourways are cleared at the biggest discounts. The brand also sells matching mice and full keycap sets.",
    ],
    lines: [
      { name: "3068B and 3084B", summary: "Compact wireless mechanical keyboards in many colour themes." },
      { name: "5075B and 5087B", summary: "Larger layouts with gasket mounts and multi-mode wireless." },
      { name: "Mice and keycaps", summary: "Matching wireless mice and Akko's popular keycap sets." },
    ],
    buyingTips: [
      "Check which Akko switch is installed; linear, tactile, and silent options feel very different.",
      "Older colourways are often discounted heavily with no functional difference.",
      "Confirm hot-swap support if you plan to change switches later.",
    ],
    faqs: [
      { q: "Are Akko keyboards good?", a: "Yes. They are widely recommended as some of the best-value mechanical keyboards, with good keycaps and switches out of the box." },
      { q: "Do Akko keyboards work wirelessly?", a: "Most recent models support Bluetooth, 2.4GHz wireless, and wired USB-C." },
    ],
  },
  {
    slug: "epomaker",
    name: "Epomaker",
    group: "peripherals",
    apiBrand: "Epomaker",
    searches: [
      { keywords: "Epomaker keyboard", searchIndex: "Computers" },
      { keywords: "Epomaker TH80 keyboard", searchIndex: "Computers" },
      { keywords: "Epomaker RT100 mechanical keyboard", searchIndex: "Computers" },
    ],
    include: NO_DESKTOPS,
    exclude: PERIPHERALS,
    sells: "mechanical keyboards with gasket mounts, knobs, and displays",
    intro:
      "Epomaker makes feature-packed budget mechanical keyboards with gasket mounts, volume knobs, and small displays at prices that undercut most rivals. Its TH80, RT100, and TH66 models are Amazon bestsellers that see frequent discounts and coupon deals.",
    overview: [
      "Epomaker targets the enthusiast-on-a-budget segment, packing gasket-mounted designs, south-facing RGB, and tri-mode wireless into keyboards that often cost under $100. The RT100 adds a mini display and knob, while the TH80 is a compact favourite.",
      "Epomaker discounts are frequent, with coupons and lightning deals stacking on already low prices. The brand also owns Ajazz, which has its own page here.",
    ],
    lines: [
      { name: "TH80 and TH66", summary: "Compact 75% and 65% keyboards with gasket mounts and tri-mode wireless." },
      { name: "RT100", summary: "A 97-key board with a mini display, knob, and 5000mAh battery." },
      { name: "Keycaps and switches", summary: "Epomaker's keycap sets and switches for customising boards." },
    ],
    buyingTips: [
      "Look for coupon checkboxes on Amazon; Epomaker listings often stack a coupon on the sale price.",
      "Gasket-mounted models offer the best typing feel for the money.",
      "Check the switch option; Epomaker boards ship with various linear and tactile switches.",
    ],
    faqs: [
      { q: "Is Epomaker a good keyboard brand?", a: "Yes for the price. Epomaker boards offer enthusiast features like gasket mounts at budget prices." },
      { q: "Is Epomaker related to Ajazz?", a: "Yes. Ajazz operates under Epomaker, and both brands share similar designs and distribution." },
    ],
  },
  {
    slug: "royal-kludge",
    name: "Royal Kludge",
    group: "peripherals",
    apiBrand: "Royal Kludge",
    aliases: ["royal kludge", "rk royal kludge", "rk"],
    searches: [
      { keywords: "Royal Kludge keyboard", searchIndex: "Computers" },
      { keywords: "RK61 mechanical keyboard", searchIndex: "Computers" },
      { keywords: "Royal Kludge RK84 keyboard", searchIndex: "Computers" },
      { keywords: "RK Royal Kludge wireless keyboard", searchIndex: "Computers" },
    ],
    include: NO_DESKTOPS,
    exclude: PERIPHERALS,
    sells: "budget wireless mechanical keyboards, including the RK61 and RK84",
    intro:
      "Royal Kludge (RK) makes some of the cheapest hot-swap wireless mechanical keyboards worth buying, led by the RK61 60% and RK84 75% boards. Its Amazon store discounts them relentlessly, making RK the default recommendation for a first mechanical keyboard on a tight budget.",
    overview: [
      "Royal Kludge built its name on the RK61, a wireless 60% keyboard that brought hot-swap sockets and tri-mode connectivity down to entry-level prices. The RK84 and RK87 expanded the range into larger layouts with similar value.",
      "RK keyboards are discounted almost constantly on Amazon, often with coupons on top. Build quality is basic compared with premium brands, but the price-to-feature ratio is hard to beat.",
    ],
    lines: [
      { name: "RK61", summary: "The classic budget 60% wireless mechanical keyboard with hot-swap sockets." },
      { name: "RK84 and RK87", summary: "Larger 75% and tenkeyless layouts with tri-mode wireless." },
      { name: "Full-size and gaming", summary: "RK100 and RGB-focused models for full layouts." },
    ],
    buyingTips: [
      "Hot-swap is standard on most RK boards, so you can upgrade switches cheaply later.",
      "Check whether the listing includes the 2.4GHz dongle; some variants are Bluetooth-only.",
      "Stabilisers can be rattly on budget RK boards; it is an easy fix but worth knowing.",
    ],
    faqs: [
      { q: "Are Royal Kludge keyboards good for gaming?", a: "For casual gaming, yes. They are better suited to typing and general use than competitive play, but 2.4GHz models keep latency low." },
      { q: "What is the difference between the RK61 and RK84?", a: "The RK61 is a 60% board with no function row or arrows; the RK84 is a 75% board with both." },
    ],
  },
  {
    slug: "roccat",
    name: "ROCCAT",
    group: "peripherals",
    apiBrand: "ROCCAT",
    searches: [
      { keywords: "ROCCAT Vulcan keyboard", searchIndex: "Computers" },
      { keywords: "ROCCAT Kone mouse", searchIndex: "Computers" },
      { keywords: "ROCCAT gaming", searchIndex: "VideoGames" },
    ],
    include: NO_DESKTOPS,
    exclude: PERIPHERALS,
    sells: "Vulcan keyboards, Kone and Burst mice, and Elo headsets",
    intro:
      "ROCCAT is known for the Vulcan keyboards with low-profile Titan optical switches and the ergonomic Kone mice. Turtle Beach has been folding the ROCCAT brand into its own lineup, which means remaining ROCCAT stock is often cleared at steep discounts.",
    overview: [
      "ROCCAT was a German gaming peripheral brand acquired by Turtle Beach in 2019, known for distinctive design and its Titan optical switches. The Vulcan II keyboards, Kone II mice, and Burst II lightweight mice are its best-known products.",
      "With new products increasingly launching under the Turtle Beach name, ROCCAT-branded stock on Amazon is frequently discounted to clear. That makes this page one of the better hunting grounds for premium-feeling peripherals at mid-range prices.",
    ],
    lines: [
      { name: "Vulcan keyboards", summary: "Low-profile mechanical keyboards with Titan optical switches and AIMO lighting." },
      { name: "Kone and Burst mice", summary: "Ergonomic Kone and lightweight Burst gaming mice, wired and wireless." },
      { name: "Elo headsets", summary: "ROCCAT's gaming headset line, also being cleared at discounts." },
    ],
    buyingTips: [
      "Clearance pricing is the main attraction; compare against current Turtle Beach equivalents.",
      "Titan optical switches feel different from standard mechanical switches; check reviews first.",
      "Software support continues through Turtle Beach's Swarm software.",
    ],
    faqs: [
      { q: "Is ROCCAT still a brand?", a: "Turtle Beach is folding ROCCAT into its own brand, so new ROCCAT-branded products are winding down while remaining stock is discounted." },
      { q: "Are ROCCAT Vulcan keyboards good?", a: "Yes. The low-profile Titan optical switches are fast and distinctive, and clearance prices make them strong value." },
    ],
  },
  {
    slug: "mad-catz",
    name: "Mad Catz",
    group: "peripherals",
    apiBrand: "Mad Catz",
    aliases: ["mad catz", "madcatz"],
    searches: [
      { keywords: "Mad Catz R.A.T. mouse", searchIndex: "Computers" },
      { keywords: "Mad Catz gaming mouse", searchIndex: "VideoGames" },
      { keywords: "Mad Catz R.A.T. 8+", searchIndex: "Computers" },
    ],
    include: NO_DESKTOPS,
    exclude: PERIPHERALS,
    sells: "R.A.T. gaming mice, S.T.R.I.K.E. keyboards, and FREQ headsets",
    intro:
      "Mad Catz is famous for the R.A.T. mice with their adjustable, transformer-like designs, tunable weights, and swappable parts. The current lineup, including the R.A.T. 8+ and wireless R.A.T. DWS, is sold widely on Amazon with regular discounts.",
    overview: [
      "Mad Catz returned to the market after its 2017 bankruptcy with the R.A.T. line intact, keeping the adjustable palm rests, pinkie grips, and weight systems that made the originals cult favourites. The range now covers mice, S.T.R.I.K.E. keyboards, FREQ headsets, and flight sticks.",
      "Mad Catz gear is discounted regularly on Amazon, and the premium R.A.T. models see the biggest drops. The modular design means a discounted R.A.T. can be tuned to fit hands that standard mice do not suit.",
    ],
    lines: [
      { name: "R.A.T. mice", summary: "Adjustable gaming mice with tunable weights and swappable grips, from the R.A.T. 1+ to the R.A.T. 8+." },
      { name: "R.A.T. DWS", summary: "The wireless version of the flagship R.A.T. design." },
      { name: "S.T.R.I.K.E. and FREQ", summary: "Mad Catz keyboards and headsets." },
    ],
    buyingTips: [
      "The R.A.T. design suits larger hands and palm grips best; check the size before buying.",
      "Compare the sensor across R.A.T. models; higher numbers use better PixArt sensors.",
      "F.L.U.X. software handles macros and profiles for the whole range.",
    ],
    faqs: [
      { q: "Are Mad Catz R.A.T. mice good?", a: "Yes, particularly if you want an adjustable mouse. The modular grips and weight tuning are unmatched at the price." },
      { q: "Is Mad Catz still in business?", a: "Yes. The brand was revived after 2017 and continues to sell the R.A.T. line and other peripherals." },
    ],
  },
  {
    slug: "ajazz",
    name: "Ajazz",
    group: "peripherals",
    apiBrand: "Ajazz",
    searches: [
      { keywords: "Ajazz AK820 Pro keyboard", searchIndex: "Computers" },
      { keywords: "Ajazz keyboard", searchIndex: "Computers" },
      { keywords: "Ajazz mechanical keyboard", searchIndex: "Computers" },
    ],
    include: NO_DESKTOPS,
    exclude: PERIPHERALS,
    sells: "budget gasket mechanical keyboards, including the AK820 Pro",
    intro:
      "Ajazz is best known for the AK820 Pro, a 75% gasket keyboard with a TFT screen and volume knob that became an Amazon bestseller. Operating under Epomaker, Ajazz sells feature-heavy boards at budget prices with frequent discounts.",
    overview: [
      "Ajazz keyboards pack enthusiast features such as gasket mounts, south-facing RGB, tri-mode wireless, and small displays into sub-$70 boards. The AK820 Pro and AK980 are the most popular models on Amazon.",
      "Ajazz listings are discounted often, with coupons commonly stacked on sale prices. As with Epomaker, the value proposition is features per dollar rather than premium materials.",
    ],
    lines: [
      { name: "AK820 Pro", summary: "The bestseller: 75% gasket board with TFT screen, knob, and tri-mode wireless." },
      { name: "AK980", summary: "A 98% layout for numpad users who want a compact board." },
      { name: "Switches and keycaps", summary: "Ajazz switches and themed keycap sets." },
    ],
    buyingTips: [
      "The AK820 Pro is the safest pick; it has the most reviews and the deepest discounts.",
      "Check for coupon checkboxes; Ajazz listings frequently stack coupons on sale prices.",
      "Confirm the switch type; Ajazz boards ship with several linear and tactile options.",
    ],
    faqs: [
      { q: "Is Ajazz a good keyboard brand?", a: "For budget boards, yes. The AK820 Pro is one of the best-reviewed keyboards under $70." },
      { q: "What is the difference between Ajazz and Epomaker?", a: "Ajazz operates under Epomaker with a focus on the budget end; the brands share designs and distribution." },
    ],
  },
  // -------------------------------------------------- Audio
  {
    slug: "epos",
    name: "EPOS",
    group: "peripherals",
    apiBrand: "EPOS",
    aliases: ["epos", "epos audio", "epos sennheiser"],
    searches: [
      { keywords: "EPOS gaming headset", searchIndex: "VideoGames" },
      { keywords: "EPOS H3 headset", searchIndex: "VideoGames" },
      { keywords: "EPOS GSP 370", searchIndex: "VideoGames" },
      { keywords: "EPOS H3PRO Hybrid", searchIndex: "VideoGames" },
    ],
    require: /\b(gsp|h3|h6 ?pro)\b/i,
    include: NO_DESKTOPS,
    exclude: PERIPHERALS,
    sells: "EPOS gaming headsets, including the H3, H6PRO, and GSP lines",
    intro:
      "EPOS made some of the best-sounding gaming headsets available, carrying on Sennheiser's audio heritage in the H3, H6PRO, and GSP lines. EPOS has exited the gaming market, so remaining stock is being cleared at steep discounts, which is excellent news for deal hunters.",
    overview: [
      "EPOS was the gaming audio brand born from Sennheiser's gaming division, known for the wired H3 and H6PRO and the wireless GSP 370, GSP 670, and H3PRO Hybrid. Its headsets were consistently praised for sound quality and microphone clarity.",
      "With EPOS leaving gaming, Amazon sellers are clearing remaining inventory, and discounts of 40% or more are common. Stock is finite, so popular models sell out rather than being restocked.",
    ],
    lines: [
      { name: "H3 and H6PRO", summary: "Wired audiophile-leaning gaming headsets, closed and open-back." },
      { name: "H3PRO Hybrid", summary: "The flagship wireless headset with ANC and low-latency dongle." },
      { name: "GSP series", summary: "The classic Sennheiser-designed gaming headsets, including the wireless GSP 370." },
    ],
    buyingTips: [
      "These are clearance deals; if a model shows as unavailable it is unlikely to return.",
      "The H3 is the value pick, frequently discounted to budget-headset prices.",
      "Check whether the listing is new or renewed; renewed EPOS headsets can be even cheaper.",
    ],
    faqs: [
      { q: "Is EPOS the same as Sennheiser?", a: "EPOS was spun out of Sennheiser's communications and gaming divisions. Its gaming headsets carry Sennheiser's audio engineering." },
      { q: "Why are EPOS headsets so cheap now?", a: "EPOS exited the gaming market, so retailers are clearing remaining stock at large discounts." },
    ],
  },
  {
    slug: "beyerdynamic",
    name: "Beyerdynamic",
    group: "peripherals",
    apiBrand: "beyerdynamic",
    searches: [
      { keywords: "Beyerdynamic MMX 300 headset", searchIndex: "VideoGames" },
      { keywords: "Beyerdynamic gaming headset", searchIndex: "VideoGames" },
      { keywords: "Beyerdynamic TYGR 300 R", searchIndex: "VideoGames" },
    ],
    require: /\b(mmx|tygr)\b/i,
    include: NO_DESKTOPS,
    exclude: PERIPHERALS,
    sells: "MMX and TYGR gaming headsets from the German studio audio maker",
    intro:
      "Beyerdynamic is a German studio audio company whose MMX gaming headsets bring genuine audiophile drivers to gaming. The MMX 100, MMX 200 wireless, and MMX 300 are premium headsets that see meaningful discounts during sale events.",
    overview: [
      "Beyerdynamic has made professional headphones in Heilbronn, Germany for a century, and its gaming headsets use the same driver expertise. The MMX line pairs studio-grade sound with a broadcast-quality microphone, while the TYGR 300 R is an open-back option for competitive play.",
      "Beyerdynamic discounts are less frequent than mainstream gaming brands, but sale events bring solid drops on the MMX models. The headsets are built to last, with replaceable parts available.",
    ],
    lines: [
      { name: "MMX 300", summary: "The flagship wired gaming headset with studio drivers." },
      { name: "MMX 200 and MMX 100", summary: "Wireless and wired options at lower prices." },
      { name: "TYGR 300 R", summary: "Open-back headphones tuned for competitive gaming soundstage." },
    ],
    buyingTips: [
      "The MMX 300 is often discounted as a bundle with a sound card; compare both.",
      "Open-back TYGR models leak sound; they suit quiet rooms, not shared spaces.",
      "Replacement ear pads and cables are available, which extends the headset's life.",
    ],
    faqs: [
      { q: "Are Beyerdynamic gaming headsets worth it?", a: "For sound quality, yes. They use studio-grade drivers that outperform most gaming headsets, with prices to match." },
      { q: "What is the difference between the MMX 100, 200, and 300?", a: "The MMX 100 is wired and affordable, the MMX 200 adds wireless, and the MMX 300 is the premium wired flagship." },
    ],
  },
  {
    slug: "audio-technica",
    name: "Audio-Technica",
    group: "peripherals",
    apiBrand: "Audio-Technica",
    aliases: ["audio-technica", "audio technica"],
    searches: [
      { keywords: "Audio-Technica gaming headset", searchIndex: "VideoGames" },
      { keywords: "Audio-Technica ATH-G1WL", searchIndex: "VideoGames" },
      { keywords: "Audio-Technica ATH-GDL3", searchIndex: "VideoGames" },
    ],
    require: /\bath-g/i,
    include: NO_DESKTOPS,
    exclude: PERIPHERALS,
    sells: "ATH-G gaming headsets with studio-derived drivers",
    intro:
      "Audio-Technica's ATH-G gaming headsets bring the company's respected headphone engineering to gaming, with large drivers and detachable boom microphones. The wireless ATH-G1WL and wired ATH-GDL3 are discounted regularly on Amazon.",
    overview: [
      "Audio-Technica is best known for studio headphones and the famous M50x, and its gaming headsets share that driver DNA. The ATH-G series focuses on sound quality first, with comfortable fits for long sessions.",
      "Audio-Technica gaming headsets are discounted often, and the wireless G1WL sees the biggest drops during sale events. They are a strong pick for gamers who also listen to music seriously.",
    ],
    lines: [
      { name: "ATH-G1WL", summary: "The wireless flagship with 2.4GHz low-latency connection." },
      { name: "ATH-GDL3 and ATH-GL3", summary: "Wired open- and closed-back gaming headsets." },
      { name: "ATH-G1", summary: "The wired closed-back model, often the cheapest entry point." },
    ],
    buyingTips: [
      "The detachable microphone is a plus; you can use these as regular headphones.",
      "Open-back GDL3 leaks sound but has a wider soundstage for competitive games.",
      "Compare the G1WL against the wired models; wireless convenience costs extra.",
    ],
    faqs: [
      { q: "Are Audio-Technica gaming headsets good?", a: "Yes. They prioritise sound quality with large, well-tuned drivers and comfortable designs." },
      { q: "Do Audio-Technica gaming headsets work on console?", a: "Yes. The wired models work with any 3.5mm controller connection, and the G1WL works with PC, PlayStation, and Switch." },
    ],
  },
  {
    slug: "jbl-quantum",
    name: "JBL Quantum",
    group: "peripherals",
    apiBrand: "JBL",
    aliases: ["jbl", "jbl quantum"],
    searches: [
      { keywords: "JBL Quantum headset", searchIndex: "VideoGames" },
      { keywords: "JBL Quantum 800", searchIndex: "VideoGames" },
      { keywords: "JBL Quantum 400 gaming headset", searchIndex: "VideoGames" },
    ],
    require: /\bquantum\b/i,
    include: NO_DESKTOPS,
    exclude: PERIPHERALS,
    sells: "JBL Quantum gaming headsets, from the Quantum 100 to the Quantum ONE",
    intro:
      "JBL Quantum is JBL's gaming headset line, spanning the budget Quantum 100 to the flagship Quantum ONE with head tracking. Quantum headsets are discounted heavily and often on Amazon, making them strong value picks at sale prices.",
    overview: [
      "JBL brought its speaker and headphone expertise to gaming with the Quantum range, adding features like QuantumSPHERE 360 spatial audio and QuantumSOUND signature tuning. The lineup covers wired, wireless, and console-specific models.",
      "Quantum headsets see some of the deepest discounts among major headset brands, with mid-range models frequently dropping to budget prices. The range is wide, so matching the model to your platform matters.",
    ],
    lines: [
      { name: "Quantum 100 to 400", summary: "Affordable wired gaming headsets with QuantumSOUND tuning." },
      { name: "Quantum 600 to 910", summary: "Wireless models with 2.4GHz connections and longer battery life." },
      { name: "Quantum ONE", summary: "The flagship with head tracking and ANC." },
    ],
    buyingTips: [
      "Mid-range Quantum models are the deal sweet spot; flagships drop less often.",
      "Check platform compatibility; some Quantum models are tuned for specific consoles.",
      "QuantumSPHERE 360 works on PC; console spatial audio depends on the platform.",
    ],
    faqs: [
      { q: "Are JBL Quantum headsets good?", a: "Yes, particularly on sale. They offer strong sound and comfort, with the mid-range wireless models being the best value." },
      { q: "What is QuantumSPHERE 360?", a: "JBL's spatial audio technology, available on PC, with head tracking on the flagship Quantum ONE." },
    ],
  },
  {
    slug: "astro",
    name: "Astro",
    group: "peripherals",
    apiBrand: "Astro",
    aliases: ["astro", "astro gaming"],
    searches: [
      { keywords: "Astro A50 headset", searchIndex: "VideoGames" },
      { keywords: "Astro A40 TR", searchIndex: "VideoGames" },
      { keywords: "Astro gaming headset", searchIndex: "VideoGames" },
      { keywords: "Astro A20 wireless headset", searchIndex: "VideoGames" },
    ],
    include: NO_DESKTOPS,
    exclude: PERIPHERALS,
    sells: "Astro gaming headsets, including the A50 X, A40 TR, and A20",
    intro:
      "Astro makes premium gaming headsets led by the A50 X with HDMI switching and the tournament-standard A40 TR with MixAmp. Now part of Logitech, Astro headsets are discounted regularly, with outgoing generations seeing the biggest cuts.",
    overview: [
      "Astro built its name on the A40 TR and MixAmp combo used in esports, then expanded into wireless with the A50 series. The latest A50 X adds HDMI 2.1 switching for console and PC setups, while the A30 targets mobile and cross-platform play.",
      "Astro discounts are frequent, and previous-generation A50 models are often cleared at large discounts when a new version launches. As a Logitech brand, Astro shares distribution with Logitech G on Amazon.",
    ],
    lines: [
      { name: "A50 X", summary: "The wireless flagship with HDMI 2.1 switching for multi-platform setups." },
      { name: "A40 TR and MixAmp", summary: "The tournament-standard wired combo with external audio control." },
      { name: "A20 and A30", summary: "Affordable wireless options for console and mobile." },
    ],
    buyingTips: [
      "The A50 X's HDMI switching is its killer feature; skip it if you only use one platform.",
      "Previous-generation A50 models are often heavily discounted and still excellent.",
      "Check the base station compatibility; Astro headsets are platform-specific.",
    ],
    faqs: [
      { q: "Is Astro owned by Logitech?", a: "Yes. Logitech acquired Astro Gaming in 2017." },
      { q: "Are Astro headsets worth it?", a: "On sale, yes. The A40 TR remains a benchmark for competitive audio, and discounted A50 models are strong wireless picks." },
    ],
  },
  // -------------------------------------------- Chairs and desks
  {
    slug: "secretlab",
    name: "Secretlab",
    group: "peripherals",
    apiBrand: "Secretlab",
    searches: [
      { keywords: "Secretlab TITAN Evo", searchIndex: "VideoGames" },
      { keywords: "Secretlab gaming chair", searchIndex: "VideoGames" },
      { keywords: "Secretlab Omega chair", searchIndex: "VideoGames" },
      { keywords: "Secretlab MAGNUS desk", searchIndex: "VideoGames" },
    ],
    include: NO_DESKTOPS,
    exclude: PERIPHERALS,
    sells: "TITAN Evo gaming chairs and MAGNUS metal desks",
    intro:
      "Secretlab makes the TITAN Evo, widely considered the benchmark premium gaming chair, plus the MAGNUS metal desk line. Secretlab runs an official Amazon store, and its chairs see rare but significant discounts during Prime Day and holiday sales.",
    overview: [
      "Secretlab was founded in 2014 in Singapore and grew into the best-known premium gaming chair brand, with the TITAN Evo offering cold-cure foam, magnetic pillows, and multiple upholstery options in three sizes. The MAGNUS desks added cable management and magnetic accessories.",
      "Secretlab rarely discounts, which makes its sale events worth watching; Prime Day has brought $100-plus drops on TITAN Evo models. Special editions and outgoing colourways are the most likely to be marked down.",
    ],
    lines: [
      { name: "TITAN Evo", summary: "The flagship gaming chair in small, regular, and XL sizes with multiple upholsteries." },
      { name: "TITAN Evo Lite", summary: "A streamlined version of the TITAN Evo at a lower price." },
      { name: "MAGNUS desks", summary: "Metal gaming desks with magnetic cable management and accessories." },
    ],
    buyingTips: [
      "Choose the size by Secretlab's height and weight guide; sizing matters more than with cheaper chairs.",
      "Prime Day and Black Friday bring the only significant discounts; buy then if you can wait.",
      "Compare Amazon prices against Secretlab direct; the official store sometimes undercuts.",
    ],
    faqs: [
      { q: "Are Secretlab chairs worth it?", a: "They are among the best-built gaming chairs with strong warranties. On sale, the value proposition is much stronger." },
      { q: "When does Secretlab go on sale?", a: "Mainly during Amazon Prime Day and holiday sales, with occasional special-edition clearances." },
    ],
  },
  {
    slug: "dxracer",
    name: "DXRacer",
    group: "peripherals",
    apiBrand: "DXRacer",
    aliases: ["dxracer", "dx racer"],
    searches: [
      { keywords: "DXRacer gaming chair", searchIndex: "VideoGames" },
      { keywords: "DXRacer Drifting chair", searchIndex: "VideoGames" },
      { keywords: "DXRacer chair", searchIndex: "VideoGames" },
    ],
    include: NO_DESKTOPS,
    exclude: PERIPHERALS,
    sells: "DXRacer gaming and office chairs, including Drifting and Master series",
    intro:
      "DXRacer invented the racing-style gaming chair in 2006 and remains one of the biggest names in the category. Its Drifting, Craft, and Master series chairs are sold widely on Amazon with regular discounts.",
    overview: [
      "DXRacer started as a racing seat manufacturer before creating the gaming chair category, and its chairs are known for firm, supportive padding and wide size ranges. The Master series adds more ergonomic adjustments, while Drifting remains the classic pick.",
      "DXRacer chairs are discounted often on Amazon, with older series and less popular colours seeing the biggest drops. The brand also makes office-oriented chairs that suit work-from-home setups.",
    ],
    lines: [
      { name: "Drifting series", summary: "The classic DXRacer racing chair in multiple sizes." },
      { name: "Master series", summary: "Larger, more ergonomic chairs with upgraded materials." },
      { name: "Craft series", summary: "Designer-patterned chairs with the same core construction." },
    ],
    buyingTips: [
      "DXRacer padding runs firm; it suits long sessions but feels different from plush chairs.",
      "Check the size chart; DXRacer offers more size variants than most brands.",
      "Less popular colours are often discounted more than black.",
    ],
    faqs: [
      { q: "Is DXRacer a good gaming chair brand?", a: "Yes. As the originator of the racing chair, DXRacer offers proven designs and wide size ranges." },
      { q: "How does DXRacer compare to Secretlab?", a: "DXRacer chairs are generally firmer and cheaper, especially on sale, while Secretlab leads on finish and accessories." },
    ],
  },
  {
    slug: "andaseat",
    name: "AndaSeat",
    group: "peripherals",
    apiBrand: "AndaSeat",
    aliases: ["andaseat", "anda seat"],
    searches: [
      { keywords: "AndaSeat Kaiser 3", searchIndex: "VideoGames" },
      { keywords: "AndaSeat gaming chair", searchIndex: "VideoGames" },
      { keywords: "AndaSeat chair", searchIndex: "VideoGames" },
    ],
    include: NO_DESKTOPS,
    exclude: PERIPHERALS,
    sells: "AndaSeat gaming chairs, including the Kaiser and Phantom lines",
    intro:
      "AndaSeat makes premium-feeling gaming chairs with its DuraXtra leatherette and spacious designs, led by the Kaiser 3 and Kaiser 4. Its Amazon store discounts chairs regularly, often undercutting Secretlab at similar quality.",
    overview: [
      "AndaSeat positions itself as a premium alternative to the biggest chair brands, with wide seats, magnetic pillows, and sturdy frames. The Kaiser series is the flagship, while the Phantom 3 targets a slightly lower price.",
      "AndaSeat promotions are frequent, and the brand is aggressive with coupons and sale-event pricing. Special editions tied to games and esports teams are also discounted when they rotate out.",
    ],
    lines: [
      { name: "Kaiser 3 and 4", summary: "The flagship chairs with DuraXtra leatherette and magnetic accessories." },
      { name: "Phantom 3", summary: "A slightly more affordable take on the Kaiser formula." },
      { name: "Jungle and office", summary: "Smaller and office-styled chairs for compact setups." },
    ],
    buyingTips: [
      "Kaiser chairs run large; check the dimensions if you are on the smaller side.",
      "DuraXtra leatherette is the selling point; compare it against fabric options for breathability.",
      "Watch for coupons; AndaSeat listings often stack a coupon on the sale price.",
    ],
    faqs: [
      { q: "Is AndaSeat as good as Secretlab?", a: "Many reviewers rate the Kaiser series comparably, often at a lower sale price." },
      { q: "What is DuraXtra leatherette?", a: "AndaSeat's premium synthetic leather, marketed as more durable and stain-resistant than standard PU leather." },
    ],
  },
  {
    slug: "gtracing",
    name: "GTRacing",
    group: "peripherals",
    apiBrand: "GTRacing",
    aliases: ["gtracing", "gt racing"],
    searches: [
      { keywords: "GTRacing gaming chair", searchIndex: "VideoGames" },
      { keywords: "GTRacing GT099 chair", searchIndex: "VideoGames" },
      { keywords: "GTRacing chair", searchIndex: "VideoGames" },
    ],
    include: NO_DESKTOPS,
    exclude: PERIPHERALS,
    sells: "budget GTRacing gaming chairs, including the GT099 and Ace series",
    intro:
      "GTRacing is one of Amazon's best-selling budget gaming chair brands, with models like the GT099 regularly among the top-ranked chairs. Prices are low to begin with, and frequent discounts and coupons push them lower still.",
    overview: [
      "GTRacing focuses on affordable racing-style chairs with Bluetooth speakers built into some models, a feature few competitors offer at the price. The GT099, GT909, and Ace series cover the core range.",
      "Because GTRacing chairs are already cheap, even modest discounts make them the lowest-priced options from a known brand. Coupons are common on Amazon listings.",
    ],
    lines: [
      { name: "GT099", summary: "The bestselling budget chair, some versions with Bluetooth speakers." },
      { name: "Ace series", summary: "Larger chairs for bigger users at budget prices." },
      { name: "Footrest models", summary: "Chairs with pull-out footrests for reclining." },
    ],
    buyingTips: [
      "Expect budget build quality; the value is in the price, not the materials.",
      "Check the weight limit; budget chairs vary more than premium ones.",
      "Bluetooth speaker models are a fun extra but add little to comfort.",
    ],
    faqs: [
      { q: "Are GTRacing chairs good?", a: "For the price, yes. They are among the cheapest decent gaming chairs, though materials and longevity trail premium brands." },
      { q: "Do GTRacing chairs have speakers?", a: "Some models include Bluetooth speakers in the headrest." },
    ],
  },
  {
    slug: "eureka-ergonomic",
    name: "Eureka Ergonomic",
    group: "peripherals",
    apiBrand: "Eureka Ergonomic",
    aliases: ["eureka ergonomic", "eureka"],
    searches: [
      { keywords: "Eureka Ergonomic gaming desk", searchIndex: "VideoGames" },
      { keywords: "Eureka Ergonomic chair", searchIndex: "VideoGames" },
      { keywords: "Eureka Ergonomic GX", searchIndex: "VideoGames" },
    ],
    include: NO_DESKTOPS,
    exclude: PERIPHERALS,
    sells: "Eureka Ergonomic gaming desks and chairs",
    intro:
      "Eureka Ergonomic makes gaming desks and chairs with an emphasis on ergonomics, including height-adjustable desks and the GX chair series. Its Amazon store runs frequent promotions on both desks and chairs.",
    overview: [
      "Eureka Ergonomic covers the full battlestation: electric standing desks, L-shaped gaming desks with RGB and accessories, and gaming chairs. The brand targets buyers who want desk and chair from one maker.",
      "Eureka Ergonomic discounts are regular, with desks seeing the biggest drops during sale events. Bundles of desk plus chair sometimes offer extra savings.",
    ],
    lines: [
      { name: "Gaming desks", summary: "Electric standing desks and L-shaped gaming desks with RGB lighting." },
      { name: "GX chairs", summary: "Gaming chairs with ergonomic adjustments." },
      { name: "Desk accessories", summary: "Monitor arms, cable management, and desk mats." },
    ],
    buyingTips: [
      "Measure your space; L-shaped desks are large and returns are costly.",
      "Check the desk's weight capacity if you run multiple monitors on arms.",
      "Compare the desk-plus-chair bundles against buying separately.",
    ],
    faqs: [
      { q: "Are Eureka Ergonomic desks good?", a: "They are well-reviewed for the price, with solid frames and useful gaming features like RGB and cable trays." },
      { q: "Does Eureka Ergonomic make standing desks?", a: "Yes. Its electric height-adjustable desks are among its most popular products." },
    ],
  },
  {
    slug: "flexispot",
    name: "FlexiSpot",
    group: "peripherals",
    apiBrand: "FlexiSpot",
    aliases: ["flexispot", "flexi spot"],
    searches: [
      { keywords: "FlexiSpot standing desk", searchIndex: "VideoGames" },
      { keywords: "FlexiSpot E7 desk", searchIndex: "Computers" },
      { keywords: "FlexiSpot gaming desk", searchIndex: "VideoGames" },
    ],
    include: NO_DESKTOPS,
    exclude: PERIPHERALS,
    sells: "FlexiSpot standing desks and ergonomic chairs",
    intro:
      "FlexiSpot is one of the biggest standing desk brands on Amazon, with the E7 and E8 electric desks dominating the category. Its gaming desks and ergonomic chairs are discounted heavily during sale events.",
    overview: [
      "FlexiSpot built its name on affordable electric standing desks with stable lifting columns and good weight capacities. The E7 is the mainstream pick, the E8 adds a curved design, and the brand has expanded into gaming desks and office chairs.",
      "FlexiSpot runs some of the deepest desk discounts on Amazon, with hundreds of dollars off during Prime Day and Black Friday. Desktop sizes and frame colours affect pricing, so compare configurations.",
    ],
    lines: [
      { name: "E7 and E8", summary: "The core electric standing desks in various sizes and colours." },
      { name: "Gaming desks", summary: "Standing and fixed gaming desks with RGB and cable management." },
      { name: "Chairs", summary: "Ergonomic office chairs to pair with the desks." },
    ],
    buyingTips: [
      "Buy the frame and desktop together; bundles are usually cheaper than separate parts.",
      "Check the lifting capacity if you mount multiple monitors.",
      "Sale events bring the biggest drops; FlexiSpot discounts are deep but brief.",
    ],
    faqs: [
      { q: "Are FlexiSpot standing desks good?", a: "Yes. They are among the best-reviewed affordable standing desks, with stable frames and reliable motors." },
      { q: "What is the difference between the FlexiSpot E7 and E8?", a: "The E8 has a more premium curved design and upgraded features; the E7 is the better-value mainstream pick." },
    ],
  },
  // ------------------------------------------------ Streaming gear
  {
    slug: "avermedia",
    name: "AVerMedia",
    group: "displays",
    apiBrand: "AVerMedia",
    aliases: ["avermedia", "aver"],
    searches: [
      { keywords: "AVerMedia capture card", searchIndex: "Computers" },
      { keywords: "AVerMedia Live Gamer", searchIndex: "Computers" },
      { keywords: "AVerMedia webcam", searchIndex: "Computers" },
      { keywords: "AVerMedia microphone", searchIndex: "Computers" },
    ],
    include: NO_DESKTOPS,
    exclude: PERIPHERALS,
    sells: "capture cards, webcams, and microphones for streamers",
    intro:
      "AVerMedia is Elgato's biggest rival in streaming gear, making Live Gamer capture cards, Live Streamer webcams, and microphones. Its products are widely available on Amazon and discounted often, frequently undercutting Elgato equivalents.",
    overview: [
      "AVerMedia is a Taiwanese company specialising in video capture, with the Live Gamer 4K, Live Gamer Ultra, and Live Gamer Portable lines covering internal and external capture. The Live Streamer CAM webcams and AM310 microphone round out a full streaming setup.",
      "AVerMedia discounts are frequent, and its capture cards often sell for less than equivalent Elgato models. Previous-generation capture cards are cleared at the biggest discounts when new models launch.",
    ],
    lines: [
      { name: "Live Gamer capture cards", summary: "Internal and external 4K and 1080p capture cards for console and PC streaming." },
      { name: "Live Streamer CAM", summary: "Webcams tuned for streamers, including 4K models." },
      { name: "Microphones", summary: "USB microphones such as the AM310 for streaming and podcasting." },
    ],
    buyingTips: [
      "Match the capture card to your needs; 4K high-refresh capture costs much more than 1080p.",
      "Check passthrough support so you can play without added lag while recording.",
      "Compare against Elgato equivalents; AVerMedia often wins on price for similar specs.",
    ],
    faqs: [
      { q: "Is AVerMedia as good as Elgato?", a: "For capture cards, yes. AVerMedia's Live Gamer cards match Elgato on specs and often cost less." },
      { q: "Do I need a capture card to stream?", a: "Only for consoles or a second PC. Streaming from your gaming PC does not require one." },
    ],
  },
  {
    slug: "rode",
    name: "Rode",
    group: "displays",
    apiBrand: "Rode",
    aliases: ["rode", "røde"],
    searches: [
      { keywords: "Rode NT-USB microphone", searchIndex: "Computers" },
      { keywords: "Rode PodMic", searchIndex: "Computers" },
      { keywords: "Rode Wireless GO microphone", searchIndex: "Computers" },
      { keywords: "Rode microphone", searchIndex: "Computers" },
    ],
    include: NO_DESKTOPS,
    exclude: PERIPHERALS,
    sells: "Rode microphones for streaming, podcasting, and content creation",
    intro:
      "Rode is the Australian microphone company behind the NT-USB, PodMic, and Wireless GO series used by streamers and podcasters everywhere. Rode gear is sold widely on Amazon with regular discounts, especially on bundles.",
    overview: [
      "Rode started in Sydney making studio microphones and became a creator-economy staple with the VideoMic, NT-USB, and PodMic. The Wireless GO series made wireless audio simple for streamers and video creators.",
      "Rode discounts are steady rather than dramatic, with bundles (microphone plus arm or interface) offering the best savings. Previous-generation Wireless GO models are cleared when new versions launch.",
    ],
    lines: [
      { name: "NT-USB and NT1", summary: "Studio-style USB and XLR condenser microphones for streaming and recording." },
      { name: "PodMic", summary: "The broadcast-style dynamic microphone popular with podcasters." },
      { name: "Wireless GO and ME", summary: "Compact wireless microphone systems for creators." },
    ],
    buyingTips: [
      "The PodMic needs a good interface or booster; factor that into the cost.",
      "USB models like the NT-USB are simpler for beginners than XLR setups.",
      "Compare bundles; Rode's creator kits often beat buying items separately.",
    ],
    faqs: [
      { q: "Is the Rode NT-USB good for streaming?", a: "Yes. It is one of the most popular streaming microphones, with simple USB plug-and-play." },
      { q: "What is the difference between the PodMic and NT-USB?", a: "The PodMic is a dynamic XLR mic needing an interface; the NT-USB is a condenser USB mic that plugs straight in." },
    ],
  },
  {
    slug: "shure",
    name: "Shure",
    group: "displays",
    apiBrand: "Shure",
    searches: [
      { keywords: "Shure MV7 microphone", searchIndex: "Computers" },
      { keywords: "Shure SM7B", searchIndex: "Computers" },
      { keywords: "Shure microphone", searchIndex: "Computers" },
      { keywords: "Shure MV6 microphone", searchIndex: "Computers" },
    ],
    require: /\b(mic|microphone|mv7|mv6|sm7|sm58)\b/i,
    include: NO_DESKTOPS,
    exclude: PERIPHERALS,
    sells: "Shure microphones for streaming and podcasting, including the MV7 and SM7B",
    intro:
      "Shure makes the SM7B, the broadcast microphone heard on countless streams and podcasts, and the MV7 series that brings it to USB. Shure microphones are premium-priced but discounted regularly on Amazon.",
    overview: [
      "Shure is an American audio company whose SM58 and SM7B are studio and stage standards. The MV7 and MV7+ adapted the SM7B's sound for USB and creators, becoming default recommendations for serious streamers.",
      "Shure discounts are moderate but real, with the MV7 seeing the most frequent drops. The SM7B rarely drops far, so any genuine discount is worth catching.",
    ],
    lines: [
      { name: "MV7 and MV7+", summary: "USB/XLR dynamic microphones tuned for podcasting and streaming." },
      { name: "SM7B", summary: "The legendary broadcast dynamic microphone, XLR only." },
      { name: "SM58 and MV6", summary: "The classic vocal mic and Shure's compact USB gaming mic." },
    ],
    buyingTips: [
      "The SM7B needs a strong preamp or booster; budget for a Cloudlifter or equivalent interface.",
      "The MV7+ is the simpler pick for most streamers with USB and onboard DSP.",
      "Shure discounts are modest; compare against Rode equivalents at sale prices.",
    ],
    faqs: [
      { q: "Is the Shure SM7B good for streaming?", a: "Yes, it is the most famous streaming microphone, but it needs an audio interface and usually a booster." },
      { q: "What is the difference between the MV7 and SM7B?", a: "The MV7 adds USB connectivity and digital processing; the SM7B is XLR-only and needs more supporting gear." },
    ],
  },
  {
    slug: "blue",
    name: "Blue Microphones",
    group: "displays",
    apiBrand: "Blue",
    aliases: ["blue", "blue microphones", "yeti"],
    searches: [
      { keywords: "Blue Yeti microphone", searchIndex: "Computers" },
      { keywords: "Blue Yeti X microphone", searchIndex: "Computers" },
      { keywords: "Blue Snowball microphone", searchIndex: "Computers" },
    ],
    include: NO_DESKTOPS,
    exclude: PERIPHERALS,
    sells: "Blue USB microphones, including the Yeti and Snowball",
    intro:
      "Blue's Yeti is the microphone that launched a million streams, and it remains one of Amazon's best-selling USB mics. Now part of Logitech, Blue microphones are discounted constantly, with the Yeti regularly dropping to half its list price.",
    overview: [
      "Blue Microphones made USB recording mainstream with the Snowball and Yeti, bringing studio-style condenser sound to plug-and-play USB. Logitech acquired Blue in 2018 and continues the Yeti, Yeti X, and Snowball lines.",
      "Blue discounts are among the most aggressive in streaming gear; the Yeti is frequently on sale and older colours are cleared cheapest. It is the default budget recommendation for new streamers.",
    ],
    lines: [
      { name: "Yeti", summary: "The classic multi-pattern USB condenser microphone." },
      { name: "Yeti X", summary: "The upgraded Yeti with LED metering and Blue VO!CE effects." },
      { name: "Snowball", summary: "The budget USB mic that started it all." },
    ],
    buyingTips: [
      "The Yeti picks up room noise; it suits quiet rooms or treated spaces.",
      "Older Yeti colours are often discounted more than black.",
      "Compare the Yeti X against the standard Yeti on sale; the gap is sometimes small.",
    ],
    faqs: [
      { q: "Is the Blue Yeti good for streaming?", a: "Yes. It is the most popular starter streaming microphone, with good sound for the sale price." },
      { q: "Is Blue owned by Logitech?", a: "Yes. Logitech acquired Blue Microphones in 2018." },
    ],
  },
  {
    slug: "behringer",
    name: "Behringer",
    group: "displays",
    apiBrand: "Behringer",
    searches: [
      { keywords: "Behringer Xenyx mixer", searchIndex: "Computers" },
      { keywords: "Behringer UMC22 interface", searchIndex: "Computers" },
      { keywords: "Behringer microphone", searchIndex: "Computers" },
      { keywords: "Behringer audio interface", searchIndex: "Computers" },
    ],
    require: /\b(xenyx|umc|um2|xm|microphone|mixer|interface)\b/i,
    include: NO_DESKTOPS,
    exclude: PERIPHERALS,
    sells: "Behringer mixers, audio interfaces, and microphones for streamers",
    intro:
      "Behringer makes the cheapest usable audio gear in existence, from Xenyx mixers to UMC interfaces and the XM8500 microphone. Its enormous Amazon catalog is discounted constantly, making it the budget backbone of countless streaming setups.",
    overview: [
      "Behringer is a German-founded pro audio company known for bringing mixers, interfaces, and microphones down to entry-level prices. The Xenyx Q802USB mixer and UMC22 interface are staples of budget streaming and podcasting rigs.",
      "Behringer prices start low and drop further during sales, so the final price matters more than the discount percentage. Quality control can vary, but the value is unmatched for beginners.",
    ],
    lines: [
      { name: "Xenyx mixers", summary: "Affordable USB mixers for combining mics, game audio, and music." },
      { name: "UMC interfaces", summary: "Budget USB audio interfaces for XLR microphones." },
      { name: "Microphones", summary: "Entry-level mics including the XM8500 dynamic and C-1 condenser." },
    ],
    buyingTips: [
      "The Xenyx Q802USB is the classic starter mixer for streamers on a budget.",
      "Pair the XM8500 with a UMC22 for a complete XLR setup under $100 on sale.",
      "Check recent reviews; Behringer quality varies more between batches than premium brands.",
    ],
    faqs: [
      { q: "Is Behringer good for streaming?", a: "For beginners on a budget, yes. Xenyx mixers and UMC interfaces are proven starter gear at very low prices." },
      { q: "What is the difference between a mixer and an interface?", a: "A mixer like the Xenyx blends multiple sources with physical knobs; an interface like the UMC22 focuses on clean recording into your PC." },
    ],
  },
  // ------------------------------------------------------ VR
  {
    slug: "meta-quest",
    name: "Meta Quest",
    group: "controllers",
    apiBrand: "Meta",
    aliases: ["meta", "meta quest", "oculus"],
    searches: [
      { keywords: "Meta Quest 3", searchIndex: "VideoGames" },
      { keywords: "Meta Quest 3S", searchIndex: "VideoGames" },
      { keywords: "Meta Quest headset", searchIndex: "VideoGames" },
      { keywords: "Oculus Quest accessories", searchIndex: "VideoGames" },
    ],
    require: /\b(quest|oculus)\b/i,
    include: NO_DESKTOPS,
    exclude: PERIPHERALS,
    sells: "Meta Quest VR headsets and accessories",
    intro:
      "Meta Quest is the dominant standalone VR platform, with the Quest 3 and Quest 3S bringing mixed reality to mainstream prices. Quest headsets are discounted during every major sale event, and accessories see constant deals.",
    overview: [
      "Meta's Quest line made VR wireless and affordable, with the Quest 3 adding colour passthrough mixed reality and the Quest 3S cutting the entry price further. The headsets double as PC VR displays via Link or Air Link.",
      "Quest hardware discounts cluster around Prime Day, Black Friday, and holiday sales, often bundled with gift cards or games. Accessories like Elite straps, Link cables, and facial interfaces are discounted year-round.",
    ],
    lines: [
      { name: "Quest 3", summary: "The current flagship standalone headset with mixed reality." },
      { name: "Quest 3S", summary: "The budget Quest with the same chip as the Quest 3." },
      { name: "Accessories", summary: "Elite straps, Link cables, carrying cases, and facial interfaces." },
    ],
    buyingTips: [
      "Storage size matters less than you think; most Quest games are small.",
      "The Elite strap with battery is the single best comfort upgrade.",
      "Holiday bundles with gift cards are often better value than straight discounts.",
    ],
    faqs: [
      { q: "Can the Meta Quest 3 play PC VR games?", a: "Yes, via a Link cable or wirelessly with Air Link, using a gaming PC." },
      { q: "What is the difference between Quest 3 and Quest 3S?", a: "The 3S uses the same chip with older Quest 2 optics and lower resolution, at a much lower price." },
    ],
  },
  {
    slug: "htc-vive",
    name: "HTC Vive",
    group: "controllers",
    apiBrand: "HTC",
    aliases: ["htc", "htc vive", "vive"],
    searches: [
      { keywords: "HTC Vive XR Elite", searchIndex: "VideoGames" },
      { keywords: "HTC Vive Pro 2", searchIndex: "VideoGames" },
      { keywords: "HTC Vive headset", searchIndex: "VideoGames" },
    ],
    require: /\bvive\b/i,
    include: NO_DESKTOPS,
    exclude: PERIPHERALS,
    sells: "HTC Vive VR headsets, including the XR Elite and Vive Pro 2",
    intro:
      "HTC Vive covers the premium and PC VR end of the market, with the Vive XR Elite as a compact standalone and the Vive Pro 2 for high-resolution PC VR. Vive headsets are discounted periodically, with older models seeing the biggest drops.",
    overview: [
      "Vive was one of the two original PC VR platforms alongside Oculus, and HTC has since focused on premium and enterprise VR. The XR Elite is a small standalone headset, while the Vive Pro 2 remains a high-resolution PC VR option.",
      "Vive discounts are less frequent than Meta's, but previous-generation headsets and bundles are cleared at significant markdowns. Trackers and accessories for full-body tracking are also discounted.",
    ],
    lines: [
      { name: "Vive XR Elite", summary: "A compact standalone and PC VR headset with a small form factor." },
      { name: "Vive Pro 2", summary: "High-resolution PC VR for sim racing and flight sims." },
      { name: "Trackers and accessories", summary: "Vive Trackers for full-body tracking and base stations." },
    ],
    buyingTips: [
      "The Vive Pro 2 needs a powerful GPU to drive its high resolution.",
      "Check what is in the box; some Vive headsets sell headset-only without controllers or base stations.",
      "Older Vive models are the deal picks, but confirm software support.",
    ],
    faqs: [
      { q: "Is HTC Vive still supported?", a: "Yes. HTC continues to sell and support the Vive XR Elite, Pro 2, and Focus lines." },
      { q: "Do Vive headsets work with SteamVR?", a: "Yes. Vive headsets are natively compatible with SteamVR." },
    ],
  },
  // ------------------------------------------------- Sim racing
  {
    slug: "moza-racing",
    name: "MOZA Racing",
    group: "controllers",
    apiBrand: "MOZA",
    aliases: ["moza", "moza racing"],
    searches: [
      { keywords: "MOZA R5 bundle", searchIndex: "VideoGames" },
      { keywords: "MOZA Racing wheel", searchIndex: "VideoGames" },
      { keywords: "MOZA direct drive wheelbase", searchIndex: "VideoGames" },
      { keywords: "MOZA R9 racing", searchIndex: "VideoGames" },
    ],
    include: NO_DESKTOPS,
    exclude: PERIPHERALS,
    sells: "MOZA direct-drive wheelbases, steering wheels, pedals, and shifters",
    intro:
      "MOZA Racing makes direct-drive sim racing gear from the entry-level R3 and R5 bundles up to the R21 wheelbase, with an official Amazon store. MOZA bundles are discounted regularly, making direct drive cheaper than ever.",
    overview: [
      "MOZA entered sim racing with compact direct-drive wheelbases and quickly built a full ecosystem of steering wheels, load-cell pedals, shifters, and handbrakes. The R5 bundle is the most popular entry point, while the R9 and R12 target serious racers.",
      "MOZA's official Amazon store runs regular promotions, and bundle deals offer the biggest savings over buying parts separately. The ecosystem uses a standard quick release, so upgrades stay compatible.",
    ],
    lines: [
      { name: "R5 and R3 bundles", summary: "Complete starter bundles with wheelbase, wheel, pedals, and desk clamp." },
      { name: "R9, R12, and R21", summary: "Higher-torque direct-drive wheelbases for dedicated rigs." },
      { name: "Wheels, pedals, and shifters", summary: "ES, GS, and KS wheels, SR-P pedals, HGP shifter, and HBP handbrake." },
    ],
    buyingTips: [
      "The R5 bundle is the value king; buy the bundle rather than parts separately.",
      "MOZA is PC-focused; check console compatibility before buying for PlayStation or Xbox.",
      "You will want a solid mount; a wheel stand or cockpit matters as much as the wheelbase.",
    ],
    faqs: [
      { q: "Is MOZA good for sim racing?", a: "Yes. MOZA's direct-drive bundles are among the best-value ways into serious sim racing hardware." },
      { q: "Do MOZA wheels work on console?", a: "Most MOZA gear is PC-only; check the specific product for Xbox or PlayStation support." },
    ],
  },
  {
    slug: "next-level-racing",
    name: "Next Level Racing",
    group: "controllers",
    apiBrand: "Next Level Racing",
    aliases: ["next level racing"],
    searches: [
      { keywords: "Next Level Racing F-GT", searchIndex: "VideoGames" },
      { keywords: "Next Level Racing cockpit", searchIndex: "VideoGames" },
      { keywords: "Next Level Racing GT Lite", searchIndex: "VideoGames" },
      { keywords: "Next Level Racing wheel stand", searchIndex: "VideoGames" },
    ],
    include: NO_DESKTOPS,
    exclude: PERIPHERALS,
    sells: "Next Level Racing cockpits, wheel stands, and monitor stands",
    intro:
      "Next Level Racing makes sim racing cockpits from the foldable GT Lite to the rigid F-GT Elite, plus wheel stands and monitor mounts. Its Amazon listings are discounted regularly, with the popular mid-range cockpits seeing the best deals.",
    overview: [
      "Next Level Racing is an Australian company and one of the largest cockpit makers, covering everything from the portable GT Lite to aluminium-profile Elite rigs. Its cockpits support wheels from Logitech, Thrustmaster, Fanatec, and MOZA.",
      "Cockpit discounts are most common on the mid-range F-GT and GTTrack models during sale events. Wheel stands are the budget entry point and are discounted often.",
    ],
    lines: [
      { name: "F-GT and GTTrack", summary: "Mid-range cockpits supporting formula and GT driving positions." },
      { name: "GT Lite and F-GT Lite", summary: "Foldable cockpits for small spaces." },
      { name: "Elite series", summary: "Aluminium-profile rigs for direct-drive wheels." },
    ],
    buyingTips: [
      "Match the cockpit to your wheelbase; direct-drive wheels need rigid rigs like the Elite series.",
      "Foldable models trade rigidity for storage; fine for belt wheels, less so for high-torque direct drive.",
      "Check wheel and pedal compatibility for your specific hardware before buying.",
    ],
    faqs: [
      { q: "Are Next Level Racing cockpits good?", a: "Yes. They are among the most popular cockpits, with options from portable to professional." },
      { q: "Will my wheel fit a Next Level Racing cockpit?", a: "Most likely. They support the major wheel brands; check the product's compatibility list." },
    ],
  },
  {
    slug: "gt-omega",
    name: "GT Omega",
    group: "controllers",
    apiBrand: "GT Omega",
    aliases: ["gt omega", "gtomega"],
    searches: [
      { keywords: "GT Omega racing cockpit", searchIndex: "VideoGames" },
      { keywords: "GT Omega ART cockpit", searchIndex: "VideoGames" },
      { keywords: "GT Omega sim racing chair", searchIndex: "VideoGames" },
    ],
    include: NO_DESKTOPS,
    exclude: PERIPHERALS,
    sells: "GT Omega racing cockpits and sim racing seats",
    intro:
      "GT Omega makes affordable sim racing cockpits, led by the ART and Prime series, sold through its Amazon store. Its cockpits are discounted regularly and are popular pairings with Logitech, Thrustmaster, and MOZA wheels.",
    overview: [
      "GT Omega is a UK-based sim racing brand focused on value, with the ART cockpit as its long-running bestseller and the Prime series adding aluminium-profile rigidity. It also sells racing-style seats and wheel stands.",
      "GT Omega promotions are frequent on Amazon, and cockpit-plus-seat bundles offer the best savings. The brand is a common upgrade step from a desk setup to a dedicated rig.",
    ],
    lines: [
      { name: "ART cockpit", summary: "The classic affordable cockpit for belt and entry direct-drive wheels." },
      { name: "Prime series", summary: "Aluminium-profile cockpits for higher-torque wheelbases." },
      { name: "Seats and stands", summary: "RS racing seats and wheel stands for desk setups." },
    ],
    buyingTips: [
      "The ART suits wheels up to mid-range direct drive; go Prime for high-torque bases.",
      "Bundle the cockpit with a seat for the best price.",
      "Check the shifter and handbrake mount options if you plan to expand.",
    ],
    faqs: [
      { q: "Is GT Omega good for sim racing?", a: "Yes for the price. The ART is one of the most popular entry-level cockpits." },
      { q: "What is the difference between the ART and Prime?", a: "The ART is a tubular steel cockpit; the Prime uses aluminium profile for greater rigidity with strong direct-drive wheels." },
    ],
  },
  {
    slug: "playseat",
    name: "Playseat",
    group: "controllers",
    apiBrand: "Playseat",
    searches: [
      { keywords: "Playseat Challenge", searchIndex: "VideoGames" },
      { keywords: "Playseat Evolution", searchIndex: "VideoGames" },
      { keywords: "Playseat racing cockpit", searchIndex: "VideoGames" },
      { keywords: "Playseat Trophy", searchIndex: "VideoGames" },
    ],
    include: NO_DESKTOPS,
    exclude: PERIPHERALS,
    sells: "Playseat racing cockpits, including the Challenge, Evolution, and Trophy",
    intro:
      "Playseat makes the Challenge, the best-selling foldable racing cockpit, plus the Evolution and Trophy for more permanent setups. Playseat cockpits sell strongly on Amazon with regular discounts, especially the Challenge.",
    overview: [
      "Playseat is a Dutch company and one of the oldest sim racing cockpit brands, known for the foldable Challenge that stores in seconds. The Evolution adds a more rigid frame, and the Trophy targets direct-drive users.",
      "The Playseat Challenge is discounted often and is the default recommendation for a first cockpit. Higher-end models see fewer but still meaningful promotions.",
    ],
    lines: [
      { name: "Challenge", summary: "The foldable bestseller for small spaces and first rigs." },
      { name: "Evolution", summary: "A sturdier cockpit with a real racing seat feel." },
      { name: "Trophy", summary: "The premium cockpit for direct-drive wheelbases." },
    ],
    buyingTips: [
      "The Challenge is ideal if you need to fold the rig away; otherwise consider the Evolution.",
      "Check wheel compatibility; Playseat supports all major wheel brands.",
      "Taller drivers should check the fit; the Challenge suits average heights best.",
    ],
    faqs: [
      { q: "Is the Playseat Challenge good?", a: "Yes. It is the most popular entry-level cockpit thanks to its foldable design and low price." },
      { q: "Can the Playseat Challenge handle direct drive?", a: "Light direct-drive wheels work, but high-torque bases are better on the Trophy or a rigid rig." },
    ],
  },
];
