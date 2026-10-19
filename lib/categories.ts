export type Category = {
  slug: string;
  name: string;
  /** Lowercase noun used in sentences, e.g. "gaming mouse deals". */
  noun: string;
  /** Plural used in list titles, e.g. "Gaming Mice". */
  plural: string;
  /** H1 and title for the category hub page. */
  hubTitle: string;
  /** One-line description for the category hub. */
  blurb: string;
  /** Title test, checked in order; the first matching category wins. */
  match?: RegExp;
  tips: string[];
  /** Optional long-form buying guide shown on the category page. */
  intro?: string[];
  guide?: { title: string; body: string[] }[];
  faqs?: { q: string; a: string }[];
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
    plural: "Gaming PCs",
    hubTitle: "Gaming PC Deals",
    blurb: "Prebuilt gaming desktops from the biggest PC builders, from budget 1080p machines to RTX flagship towers.",
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
    plural: "Gaming Laptops",
    hubTitle: "Gaming Laptop Deals",
    blurb: "Gaming laptops from Alienware, ASUS ROG, Lenovo Legion, MSI, HP OMEN, Acer Predator, and Razer.",
    match: /^(?!.*\b(?:so-?dimm|laptop memory|memory kit|cooling pad|laptop stand|laptop bag|backpack|sleeve)\b).*\b(laptop|notebook)\b/i,
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
    plural: "Gaming Keyboards",
    hubTitle: "Gaming Keyboard Deals",
    blurb: "Mechanical, optical, and compact gaming keyboards from every major peripheral brand.",
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
    plural: "Gaming Mice",
    hubTitle: "Gaming Mouse Deals",
    blurb: "Wired and wireless gaming mice, from ultralight esports shapes to ergonomic and MMO designs.",
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
    plural: "Gaming Headsets",
    hubTitle: "Gaming Headset Deals",
    blurb: "Wired and wireless gaming headsets for PC, PlayStation, Xbox, and Switch.",
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
    plural: "Gaming Monitors",
    hubTitle: "Gaming Monitor Deals",
    blurb: "High-refresh gaming monitors, including OLED, 1440p, and 4K panels.",
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
    plural: "Controllers and Racing Wheels",
    hubTitle: "Controller & Racing Wheel Deals",
    blurb: "Gamepads, pro controllers, racing wheels, and flight sticks for PC and console.",
    match: /\b(controllers?|gamepads?|joysticks?|racing wheels?|wheel and pedals?|pedals|shifter|flight)\b/i,
    tips: [
      "Confirm platform compatibility (PC, Xbox, PlayStation) before buying. Wheels in particular are often platform-specific.",
      "For racing wheels, direct-drive and belt-drive bases give stronger, smoother force feedback than gear-driven ones.",
      "Hall-effect sticks and triggers resist drift better than traditional potentiometers.",
    ],
  },
  {
    slug: "webcams",
    name: "Webcams",
    noun: "webcam",
    plural: "Webcams",
    hubTitle: "Webcam Deals",
    blurb: "1080p and 4K webcams for streaming, video calls, and content creation from Logitech, Razer, Elgato, OBSBOT, and more.",
    match: /\b(webcams?|web cam|facecam|streaming camera|kiyo|brio|c92[02]|obsbot)\b/i,
    tips: [
      "Lighting improves a picture more than resolution does. A cheap key light in front of you beats a 4K camera in a dark room.",
      "1080p at 60 frames per second is the sweet spot for streaming and calls; 4K is worth it when you want to crop or zoom in software.",
      "Check the field of view: around 65 to 80 degrees frames a face at a desk, while 90 degrees or wider shows the room.",
      "Look for manual exposure and white balance controls in the companion app; auto settings often flicker under RGB lighting.",
    ],
    intro: [
      "A webcam is the first thing viewers and coworkers notice, and the gap between a laptop camera and a good external webcam is huge. The good news is that you do not need to spend much: the best value webcams are 1080p models that hold steady exposure, focus quickly, and handle indoor lighting well.",
      "We track webcams from the major brands in one place and show only real discounts, so you can compare sensor resolution, frame rate, and price at a glance.",
    ],
    guide: [
      {
        title: "Resolution and frame rate",
        body: [
          "Most streaming platforms and video call apps send 1080p or lower, so a sharp 1080p sensor at 60 frames per second covers nearly everyone. 60fps makes movement look smooth on stream; 30fps is fine for calls.",
          "4K webcams make sense if you crop your camera into a small window on stream, zoom in software, or record content for YouTube. They also tend to have larger sensors, which helps in low light.",
        ],
      },
      {
        title: "Sensor, low light, and HDR",
        body: [
          "Sensor size matters more than megapixels. Larger sensors gather more light, which means less grain and more natural skin tones in a typical room. HDR modes help when you sit in front of a bright window.",
          "If your room is dark, budget for a small light alongside the camera. Even an inexpensive panel aimed at your face transforms image quality.",
        ],
      },
      {
        title: "Autofocus, field of view, and mounting",
        body: [
          "Autofocus keeps you sharp when you lean in to hold up a product. Fixed-focus cameras are fine if you stay at the same distance.",
          "Choose a narrower field of view for a clean, face-forward frame and a wider one for showing a room or multiple people. Most webcams clip onto a monitor; a standard tripod thread lets you mount the camera at eye level, which is more flattering.",
        ],
      },
      {
        title: "Software and compatibility",
        body: [
          "Nearly every current webcam is a standard USB video device, so it works with Windows, macOS, OBS, Zoom, Teams, and Discord without drivers. The companion app is where you lock exposure, white balance, and focus so the picture does not shift mid-stream.",
          "Built-in microphones are adequate for calls, but streamers usually pair the webcam with a dedicated USB microphone.",
        ],
      },
    ],
    faqs: [
      { q: "Is a 1080p webcam good enough for streaming?", a: "Yes. Twitch and most video call apps send 1080p or lower, so a good 1080p webcam at 60 frames per second looks great. Spend the difference on lighting." },
      { q: "Is a 4K webcam worth it?", a: "It is worth it if you crop or zoom your camera, record content for YouTube, or want the larger sensor that 4K models often use. For calls and a standard stream overlay, 1080p is enough." },
      { q: "Why does my webcam look grainy?", a: "Almost always because there is not enough light on your face. Add a light in front of you, turn off auto exposure in the webcam's app, and avoid sitting with a bright window behind you." },
      { q: "Do webcams work with Mac and Linux?", a: "Most do. Current webcams are standard USB video class devices that work without drivers, although some companion apps with extra controls are Windows-only." },
    ],
  },
  {
    slug: "motherboards",
    name: "Motherboards",
    noun: "motherboard",
    plural: "Motherboards",
    hubTitle: "Motherboard Deals",
    blurb: "AMD AM5 and AM4 and Intel LGA1851 and LGA1700 motherboards in ATX, Micro-ATX, and Mini-ITX from ASUS, MSI, Gigabyte, ASRock, and more.",
    match: /^(?!.*\b(?:cpu cooler|aio|liquid cooler|air cooler|pc case|computer case|mid-?tower|full-?tower|chassis|power supply|psu|cables?|standoffs?|screws?|thermal paste|fan hub|case fans?)\b)(?!.*\b(?:processor|desktop memory|memory kit|ram kit)\b).*(?:\bmotherboards?\b|\b[abhxz]\d{3}[a-z]?m?\b.*\b(?:am[45]|lga\s?1\d{3})\b)/i,
    tips: [
      "Match the socket to your processor first: AM5 for Ryzen 7000, 8000, and 9000; AM4 for older Ryzen; LGA1851 for Intel Core Ultra 200S; LGA1700 for Intel 12th to 14th gen.",
      "Check the memory type the board supports. Some LGA1700 boards take DDR4 and others DDR5.",
      "Make sure the form factor fits your case: ATX, Micro-ATX, or Mini-ITX.",
      "A newer processor in an older board may need a BIOS update. Boards with BIOS Flashback can update without a CPU installed.",
    ],
    intro: [
      "The motherboard ties every other part together, so compatibility comes first: socket, chipset, memory type, and size all have to line up with your processor, RAM, and case. After that, it is about features: storage slots, Wi-Fi, USB ports, and how well the board powers high-end processors.",
      "We track boards from the major manufacturers with their socket, chipset, and form factor listed, so you can filter straight to the boards that fit your build and see which ones are actually discounted.",
    ],
    guide: [
      {
        title: "Socket and chipset",
        body: [
          "The socket must match your processor. Within a socket, the chipset sets the feature tier. On AMD AM5, A620 is the budget tier, B650 and B850 are the mainstream choice for most gamers, and X670 and X870 add more connectivity. On Intel, B760 and B860 are mainstream, while Z790 and Z890 support overclocking unlocked K processors.",
          "For most gaming builds, a mainstream B-series board is the best value. Spend more only when you need the extra ports, storage slots, or overclocking.",
        ],
      },
      {
        title: "Form factor and case fit",
        body: [
          "ATX boards have the most slots and ports. Micro-ATX boards are smaller and often cheaper while keeping everything a typical gaming PC needs. Mini-ITX boards are for compact builds and cost more for their size.",
          "Your case lists the board sizes it accepts. A full-size ATX case fits all three.",
        ],
      },
      {
        title: "Features that matter",
        body: [
          "Count the M.2 slots if you plan to add fast SSDs, and check how many run at PCIe 4.0 or 5.0 speeds. Built-in Wi-Fi and Bluetooth save buying an adapter. Look at the rear USB ports, especially USB-C, and front-panel USB-C header support for your case.",
          "If you are pairing the board with a high-end processor, look for solid power delivery (VRM) and heatsinks, which keep performance steady under load.",
        ],
      },
      {
        title: "BIOS updates",
        body: [
          "Boards sitting in stock may ship with an older BIOS than a brand-new processor needs. BIOS Flashback lets you update from a USB drive without a compatible CPU installed, which is worth having when you buy a new processor generation.",
        ],
      },
    ],
    faqs: [
      { q: "Which motherboard do I need for my CPU?", a: "One with the same socket: AM5 for AMD Ryzen 7000, 8000, and 9000; AM4 for Ryzen 5000 and older; LGA1851 for Intel Core Ultra 200S; and LGA1700 for Intel 12th, 13th, and 14th gen." },
      { q: "Is a B650 or B850 motherboard good enough for gaming?", a: "Yes. Mainstream B-series boards support every Ryzen processor on the socket at full gaming performance. Higher-end X-series boards add more ports and storage slots, not more frames." },
      { q: "Do I need Wi-Fi on my motherboard?", a: "Only if you cannot run an Ethernet cable. Built-in Wi-Fi is convenient and usually cheaper than adding an adapter later." },
      { q: "Will my new CPU work in an older motherboard?", a: "If the socket matches, it often will after a BIOS update. Check the board's CPU support list on the manufacturer's website before buying." },
    ],
  },
  {
    slug: "video-cards",
    name: "Video Cards",
    noun: "graphics card",
    plural: "Graphics Cards",
    hubTitle: "Video Card Deals",
    blurb: "NVIDIA GeForce RTX, AMD Radeon, and Intel Arc graphics cards from ASUS, MSI, Gigabyte, ZOTAC, Sapphire, XFX, and more.",
    match: /^(?!.*\b(?:cpu cooler|aio|liquid cooler|air cooler|pc case|computer case|mid-?tower|full-?tower|chassis|power supply|psu|riser|bracket|holder|anti-?sag|support stand|extension cable|cables?)\b).*\b(graphics cards?|video cards?|geforce (?:rtx|gtx|gt)|radeon rx|intel arc|rx\s?\d{3,4}(?:\s?xtx?)?\s+\d{1,2}\s?gb?)\b/i,
    tips: [
      "Pick the GPU chip first (for example RTX 5060 Ti or RX 9060 XT), then compare cards from different brands. Cards with the same chip perform within a few percent of each other.",
      "Check your power supply wattage and connectors before you buy; many newer cards use a 16-pin 12V-2x6 connector.",
      "Measure your case: card length and thickness (in slots) are listed for every model, and large triple-fan cards do not fit every case.",
      "For 1440p and newer games, favor 12GB to 16GB of video memory over a small factory overclock.",
    ],
    intro: [
      "The graphics card decides how well a PC plays games more than any other part, and it is usually the most expensive one. That makes real discounts on graphics cards some of the most valuable deals in PC gaming.",
      "We track GeForce, Radeon, and Arc cards from every major board partner and show the current price next to the reference price, so you can see which cards are genuinely on sale and which simply carry a high list price.",
    ],
    guide: [
      {
        title: "How much video memory do you need?",
        body: [
          "8GB of video memory handles 1080p gaming at medium to high settings. 12GB is the comfortable amount for 1440p, and 16GB leaves headroom for high-resolution textures, 4K, and the next few years of releases.",
          "When two cards cost about the same, the one with more video memory usually ages better.",
        ],
      },
      {
        title: "NVIDIA, AMD, or Intel?",
        body: [
          "NVIDIA GeForce RTX cards lead in ray tracing, DLSS upscaling and frame generation, and the NVENC encoder that streamers rely on. AMD Radeon cards often give more raw performance and more video memory per dollar, and support FSR upscaling. Intel Arc cards are strong budget options for 1080p and 1440p.",
          "If you stream or use creative apps that favor NVIDIA, lean GeForce. If you want the most frames per dollar for gaming, compare Radeon carefully at your budget.",
        ],
      },
      {
        title: "Same chip, different cards",
        body: [
          "ASUS, MSI, Gigabyte, ZOTAC, Sapphire, XFX, PNY, and others all build cards around the same NVIDIA and AMD chips. The differences are cooler size and noise, factory overclock, length, lighting, and warranty. A basic dual-fan model is often within a few percent of a premium triple-fan card for much less.",
          "That is why discounts matter so much here: a sale on a well-cooled model can make it the best buy for that chip.",
        ],
      },
      {
        title: "Power, connectors, and fit",
        body: [
          "Every card lists a recommended power supply size. Use it as a minimum, and confirm your supply has the right connectors: 8-pin PCIe cables or a 16-pin 12V-2x6 cable on many newer cards.",
          "Check the card's length and slot thickness against your case's GPU clearance, and remember that every current card works in any PCIe 4.0 or 5.0 x16 slot.",
        ],
      },
    ],
    faqs: [
      { q: "What graphics card do I need for 1080p gaming?", a: "An 8GB card such as an RTX 5060 or RX 7600 class card plays most games at 1080p with high settings. For high refresh rates or newer releases, step up to a 12GB or 16GB card." },
      { q: "Is it worth paying more for a factory overclocked card?", a: "Usually not much. Factory overclocks add a few percent at most. Pay extra for a quieter cooler or a better fit for your case, not for a small clock increase." },
      { q: "Will a new graphics card work in my older PC?", a: "Usually yes, as long as your power supply has enough wattage and the right connectors and the card fits your case. Modern cards work in older PCIe slots at slightly reduced bandwidth." },
      { q: "When do graphics cards go on sale?", a: "Discounts are common around major shopping events and after new generations launch, when previous-generation cards are cleared out. Check this page for current real discounts." },
    ],
  },
  {
    slug: "memory",
    name: "Memory",
    noun: "RAM kit",
    plural: "RAM Kits",
    hubTitle: "Memory (RAM) Deals",
    blurb: "DDR5 and DDR4 desktop and laptop memory from Corsair, G.SKILL, Kingston FURY, Crucial, TEAMGROUP, and more.",
    match: /^(?!.*\b(?:ssd|nvme|solid state|hard drive|mini pc|desktop computer)\b).*\b(ddr[45]|desktop memory|laptop memory|memory kit|ram kit|so-?dimm|u?dimm)\b/i,
    tips: [
      "Match the memory type to your motherboard: DDR5 and DDR4 are not interchangeable and will not fit each other's slots.",
      "Buy one matched kit (for example 2 x 16GB) instead of mixing separate sticks; mixed kits often will not run at their rated speed.",
      "After installing, enable XMP (Intel) or EXPO (AMD) in the BIOS, or the memory will run at a slower default speed.",
      "32GB is the sweet spot for gaming today; 16GB is the minimum, and 64GB is for heavy editing and multitasking.",
    ],
    intro: [
      "Memory is one of the easiest upgrades to get right and one of the easiest to get wrong. The capacity, generation, speed, and kit configuration all need to match your motherboard and processor, and memory prices swing a lot, which makes timing a purchase around a real discount worthwhile.",
      "We track DDR5 and DDR4 kits from the major memory brands and list their capacity, speed, and current discount side by side.",
    ],
    guide: [
      {
        title: "DDR5 or DDR4?",
        body: [
          "Your motherboard decides. AMD AM5 boards and most current Intel boards take DDR5. AMD AM4 boards and some Intel 12th to 14th gen boards take DDR4. The two are keyed differently and cannot be swapped.",
          "Laptops use the smaller SO-DIMM format, so make sure a kit says SO-DIMM before buying it for a laptop.",
        ],
      },
      {
        title: "How much memory do you need?",
        body: [
          "16GB runs games, but newer titles with a browser, Discord, and launchers open can push past it. 32GB is the comfortable amount for gaming and streaming, and 64GB or more helps with large video projects, virtual machines, and heavy multitasking.",
          "Use two sticks so the memory runs in dual channel, which noticeably improves performance over a single stick of the same capacity.",
        ],
      },
      {
        title: "Speed and latency",
        body: [
          "DDR5-6000 with a CAS latency around 30 is a popular sweet spot for AMD Ryzen 7000 and 9000 processors. Intel platforms often run faster kits well. Beyond that, gains in games are small for the price.",
          "Rated speeds apply only after you enable the XMP or EXPO profile in your BIOS.",
        ],
      },
      {
        title: "Fit and looks",
        body: [
          "Tall heat spreaders and RGB lighting can collide with large air coolers, so check your cooler's memory clearance. Low-profile kits avoid the problem.",
          "RGB kits from the same brand as your fans and peripherals can share one lighting app.",
        ],
      },
    ],
    faqs: [
      { q: "Is 16GB or 32GB of RAM better for gaming?", a: "32GB. 16GB still runs most games, but 32GB leaves room for background apps, streaming software, and newer games that use more memory." },
      { q: "Can I mix different RAM kits?", a: "It is not recommended. Mixed kits may not run at their rated speed or may be unstable. Buy a single kit with the total capacity you want." },
      { q: "What are XMP and EXPO?", a: "They are memory profiles stored on the RAM that set its rated speed and timings. Enable XMP on Intel systems or EXPO on AMD systems in the BIOS after installing new memory." },
      { q: "Can I put DDR5 in a DDR4 motherboard?", a: "No. DDR5 and DDR4 have different notches and electrical requirements. Check which type your motherboard supports before you buy." },
    ],
  },
  {
    slug: "speakers",
    name: "Speakers",
    noun: "speaker",
    plural: "Speakers",
    hubTitle: "Gaming Speaker Deals",
    blurb: "Desktop computer speakers, 2.1 systems with subwoofers, and PC soundbars from Logitech, Razer, Creative, Edifier, and more.",
    match: /\b(speakers?|soundbars?|sound bar|subwoofer|nommo)\b/i,
    tips: [
      "Compare RMS (continuous) power, not peak power; it is the honest measure of how loud a speaker plays cleanly.",
      "A 2.1 system with a subwoofer adds real bass for games and movies; a 2.0 pair is cleaner on a small desk.",
      "USB speakers have a built-in sound card and need only one cable; 3.5mm and optical inputs connect to almost anything.",
      "Place speakers at ear height and angle them toward you; desktop stands make a noticeable difference.",
    ],
    intro: [
      "Good speakers make games, music, and movies more enjoyable when you are not wearing a headset, and the jump from monitor speakers to a real desktop pair is dramatic. Speakers also hold their value for years, so a well-timed discount goes a long way.",
      "We track desktop speakers, 2.1 systems, and PC soundbars from gaming and audio brands, listing connection type and current discount so you can compare quickly.",
    ],
    guide: [
      {
        title: "2.0, 2.1, or soundbar?",
        body: [
          "A 2.0 pair of speakers gives clear stereo on a desk. A 2.1 system adds a subwoofer for deeper bass in explosions and soundtracks. A PC soundbar saves space under a monitor and often adds virtual surround.",
          "For most desks, a good 2.0 pair or a compact 2.1 system is the sweet spot.",
        ],
      },
      {
        title: "Connections",
        body: [
          "USB speakers include their own digital-to-analog converter, often sound cleaner than a motherboard's audio, and connect with one cable. 3.5mm and RCA inputs work with any PC or monitor. Optical input is handy for TVs and some consoles, and Bluetooth lets you play from a phone.",
        ],
      },
      {
        title: "Power and room size",
        body: [
          "RMS power is the continuous output a speaker can deliver cleanly. 10 to 30 watts RMS fills a desk or small bedroom; more helps in a larger room or with a subwoofer. Peak or maximum power figures are much higher and less meaningful.",
        ],
      },
      {
        title: "Speakers or a headset for gaming?",
        body: [
          "For competitive games, a headset gives more precise positional audio and keeps sound off your microphone. Speakers are better for single-player games, movies, music, and long sessions without anything on your head. Many players use both.",
        ],
      },
    ],
    faqs: [
      { q: "Are PC speakers better than monitor speakers?", a: "Yes, by a wide margin. Built-in monitor speakers are small and thin-sounding; even an inexpensive desktop pair adds clarity, volume, and bass." },
      { q: "Do I need a subwoofer?", a: "Not for most desks. A subwoofer adds deep bass for games and movies, but a good 2.0 pair is cleaner and takes less space." },
      { q: "Are USB speakers better than 3.5mm speakers?", a: "Often, because USB speakers have their own sound card that avoids electrical noise from the PC. Quality varies, so compare models rather than connection types alone." },
      { q: "Can I use gaming speakers with a console or TV?", a: "Yes, if they have a matching input. Optical, Bluetooth, or 3.5mm inputs connect to most TVs and consoles." },
    ],
  },
  {
    slug: "streaming",
    name: "Streaming Gear",
    noun: "streaming gear",
    plural: "Streaming Accessories",
    hubTitle: "Streaming Gear Deals",
    blurb: "Microphones, webcams, and capture gear for streamers and content creators.",
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
    plural: "PC Components",
    hubTitle: "PC Component Deals",
    blurb: "Power supplies, CPU coolers, fans, cases, and SSDs for building or upgrading a gaming PC.",
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
    plural: "Gaming Accessories",
    hubTitle: "Gaming Accessory Deals",
    blurb: "Mouse pads, wrist rests, cables, stands, and other gaming accessories.",
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
