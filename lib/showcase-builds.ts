/**
 * Real, hand-built PCs with their exact part lists. Parts with an ASIN are
 * priced from the product API at build time; others link to the maker's page
 * or a product search.
 */
export type ShowcasePart = {
  /** Component label, e.g. "CPU", "Case Fans". */
  type: string;
  name: string;
  qty: number;
  asin?: string;
  /** Maker page when the part is not sold through our retail partner. */
  url?: string;
  /** Product search when no exact listing was found. */
  search?: string;
  specs: string[];
  /** Planned upgrade rather than an installed part. */
  planned?: boolean;
};

export type ShowcaseBuild = {
  slug: string;
  title: string;
  name: string;
  description: string;
  photos: { src: string; jpg: string; alt: string; width: number; height: number }[];
  parts: ShowcasePart[];
  /** Estimated peak draw in watts: CPU + GPU + baseline. */
  watts: number;
};

export const CORSAIR_WARTHOG_BUILD: ShowcaseBuild = {
  slug: "corsair-warthog-build",
  title: "Corsair Warthog PC Build: Ryzen 9 9950X3D + RTX 5080",
  name: "Corsair Warthog Build",
  description:
    "A real Corsair Warthog mid-tower build with an AMD Ryzen 9 9950X3D, RTX 5080 Founders Edition, ROG Crosshair X870E, 64GB DDR5-6000 CL30, 6.5TB of NVMe storage, a TRYX HOLO 360 AIO, and Noctua NF-A12x25 G2 fans. Full part list with current prices.",
  photos: [
    { src: "/pc-builds/corsair-warthog/front.webp", jpg: "/pc-builds/corsair-warthog/front.jpg", alt: "Corsair Warthog case, front view, on a walnut desk", width: 1200, height: 1600 },
    { src: "/pc-builds/corsair-warthog/inside.webp", jpg: "/pc-builds/corsair-warthog/inside.jpg", alt: "Inside the Corsair Warthog build: TRYX HOLO AIO, ROG Crosshair motherboard, RTX 5080 Founders Edition, and Noctua fans", width: 1200, height: 1600 },
  ],
  watts: 75 + 170 + 360,
  parts: [
    { type: "CPU", name: "AMD Ryzen 9 9950X3D", qty: 1, asin: "B0DVZSG8D5", specs: ["16 cores, 32 threads", "Up to 5.7 GHz boost", "2nd gen 3D V-Cache", "AM5, 170W"] },
    {
      type: "CPU Cooler",
      name: "TRYX HOLO 360mm AIO Liquid Cooler",
      qty: 1,
      asin: "B0HCP5XTLJ",
      specs: ["Asetek Gen 7 V2 pump", "Holographic 640 x 480 display", "Rated for 280W", "Stock fans swapped for Noctua"],
    },
    {
      type: "Motherboard",
      name: "ASUS ROG Crosshair 2006 X870E (20th Anniversary)",
      qty: 1,
      asin: "B09BNVGWFJ",
      specs: ["AM5, X870E, ATX", "20+2+2 power stages", "2-inch OLED display", "5x M.2, PCIe 5.0, 2x USB4, Wi-Fi 7"],
    },
    {
      type: "Memory",
      name: "TEAMGROUP T-Create Expert DDR5 64GB (2 x 32GB) 6000MHz CL30",
      qty: 1,
      search: "TEAMGROUP T-Create Expert DDR5 64GB 2x32GB 6000 CL30",
      specs: ["DDR5-6000, CL30", "2 x 32GB", "AMD EXPO and Intel XMP"],
    },
    {
      type: "Storage",
      name: "WD_BLACK SN850X 2TB NVMe SSD",
      qty: 3,
      asin: "B0B7CMZ3QH",
      specs: ["PCIe Gen4 x4, M.2 2280", "Up to 7,300 MB/s read", "6TB total"],
    },
    {
      type: "Storage",
      name: "TEAMGROUP 512GB NVMe SSD (Linux drive)",
      qty: 1,
      search: "TEAMGROUP 512GB NVMe M.2 SSD",
      specs: ["M.2 NVMe", "Dedicated Linux install"],
    },
    {
      type: "Video Card",
      name: "NVIDIA GeForce RTX 5080 Founders Edition",
      qty: 1,
      url: "https://www.nvidia.com/en-us/geforce/graphics-cards/50-series/rtx-5080/",
      specs: ["16GB GDDR7", "10,752 CUDA cores", "360W, 2-slot, 304mm"],
    },
    {
      type: "Case",
      name: "Corsair WARTHOG RS Airflow Mid-Tower Case (Black)",
      qty: 1,
      url: "https://www.corsair.com/us/en/p/pc-cases/cc-9011351-ww/warthog-rs-airflow-mid-tower-pc-case-black-cc-9011351-ww",
      specs: ["Steel mid-tower", "Includes 2x RS200 and 1x RS120 fans", "Up to 13x 120mm fans, dual 360mm radiators"],
    },
    {
      type: "Power Supply",
      name: "Corsair SF1000 (2024) 1000W SFX",
      qty: 1,
      asin: "B0D45RN3KZ",
      specs: ["1000W, 80 PLUS Platinum", "Fully modular SFX", "SFX-to-ATX bracket included"],
    },
    {
      type: "Case Fans",
      name: "Noctua NF-A12x25 G2 PWM 120mm",
      qty: 7,
      asin: "B0FC636JBS",
      specs: ["3 on the radiator, 4 in the case", "Up to 1,800 rpm, 22.5 dB(A)"],
    },
    {
      type: "Case Fans",
      name: "Noctua NF-A20 PWM 200mm",
      qty: 2,
      asin: "B071SLFBNY",
      specs: ["Planned swap for the stock front 200mm fans", "800 rpm, 18.1 dB(A)"],
      planned: true,
    },
  ],
};

export const SHOWCASE_BUILDS = [CORSAIR_WARTHOG_BUILD];
