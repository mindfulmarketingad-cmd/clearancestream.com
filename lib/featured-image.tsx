import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";

/**
 * Branded featured images (1200x630) for blog posts and list pages, rendered
 * with next/og. Used on the page itself and as the Open Graph / Twitter image.
 */

export const FEATURED_SIZE = { width: 1200, height: 630 };

const BLUE = "#1f4fd6";
const BLUE_INK = "#173a9e";

/** Simple line icons per category, drawn in a 64x64 box. */
const ICONS: Record<string, string[]> = {
  "gaming-pcs": ["M18 6h28v52H18z", "M24 14h16", "M24 20h16", "M32 44a5 5 0 1 0 0.01 0"],
  laptops: ["M12 14h40v28H12z", "M4 48h56l-4 6H8z"],
  keyboards: ["M4 18h56v28H4z", "M12 26h4", "M20 26h4", "M28 26h4", "M36 26h4", "M44 26h8", "M12 34h4", "M20 34h24", "M48 34h4"],
  mice: ["M20 22a12 12 0 0 1 24 0v18a12 12 0 0 1-24 0z", "M32 10v14", "M20 26h24"],
  headsets: ["M12 38v-6a20 20 0 0 1 40 0v6", "M8 36h10v18H8z", "M46 36h10v18H46z"],
  monitors: ["M6 10h52v34H6z", "M26 44l-2 10", "M38 44l2 10", "M20 54h24"],
  controllers: ["M16 20h32a12 12 0 0 1 12 12l2 14a6 6 0 0 1-11 4l-5-8H18l-5 8a6 6 0 0 1-11-4l2-14a12 12 0 0 1 12-12z", "M18 28v10", "M13 33h10", "M44 30h0.01", "M50 36h0.01"],
  streaming: ["M26 6h12v26a6 6 0 0 1-12 0z", "M18 26a14 14 0 0 0 28 0", "M32 40v12", "M24 56h16"],
  components: ["M14 14h36v36H14z", "M22 22h20v20H22z", "M22 6v8", "M32 6v8", "M42 6v8", "M22 50v8", "M32 50v8", "M42 50v8"],
  accessories: ["M8 22h48v20H8z", "M16 32h32"],
  deals: ["M34 6H58v24L32 56 8 32z", "M46 18a3 3 0 1 0 0.01 0"],
};

function Icon({ category }: { category: string }) {
  const paths = ICONS[category] ?? ICONS.deals;
  return (
    <svg width="300" height="300" viewBox="0 0 64 64" fill="none" stroke="white" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
      {paths.map((d) => (
        <path key={d} d={d} />
      ))}
    </svg>
  );
}

const FONT_DIR = "node_modules/geist/dist/fonts/geist-sans";
let fonts: Promise<{ name: string; data: Buffer; weight: 400 | 600 | 700; style: "normal" }[]> | null = null;

/** Geist, matching the site's typeface. */
function loadFonts() {
  fonts ??= Promise.all(
    ([
      ["Geist-Regular.ttf", 400],
      ["Geist-SemiBold.ttf", 600],
      ["Geist-Bold.ttf", 700],
    ] as const).map(async ([file, weight]) => ({
      name: "Geist",
      data: await readFile(join(process.cwd(), FONT_DIR, file)),
      weight,
      style: "normal" as const,
    })),
  );
  return fonts;
}

export async function featuredImage({
  eyebrow,
  title,
  footer,
  category,
}: {
  eyebrow: string;
  title: string;
  footer: string;
  category: string;
}) {
  const size = title.length > 70 ? 54 : title.length > 48 ? 62 : 70;
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          position: "relative",
          background: `linear-gradient(135deg, ${BLUE_INK} 0%, ${BLUE} 55%, #3b6cf0 100%)`,
          color: "white",
          fontFamily: "Geist",
        }}
      >
        {/* Dot grid texture */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            display: "flex",
            backgroundImage: "radial-gradient(circle at 1px 1px, rgba(255,255,255,0.16) 1.5px, transparent 0)",
            backgroundSize: "28px 28px",
          }}
        />
        {/* Category icon, large and faint on the right */}
        <div style={{ position: "absolute", right: 70, top: 165, display: "flex", opacity: 0.9 }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: 360,
              height: 360,
              borderRadius: 48,
              background: "rgba(255,255,255,0.08)",
              border: "2px solid rgba(255,255,255,0.18)",
            }}
          >
            <Icon category={category} />
          </div>
        </div>
        <div style={{ display: "flex", flexDirection: "column", justifyContent: "space-between", padding: "64px 72px", width: 780 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                width: 52,
                height: 52,
                borderRadius: 12,
                background: "white",
              }}
            >
              <svg width="52" height="52" viewBox="0 0 32 32" fill="none" stroke={BLUE} strokeWidth="2.8" strokeLinecap="round" strokeLinejoin="round">
                <path d="M7 11 L13.5 17.5 L17.5 13.5 L24.5 20.5" />
                <path d="M24.5 14 V20.5 H18" />
              </svg>
            </div>
            <div style={{ display: "flex", fontSize: 32, fontWeight: 700, letterSpacing: -0.5 }}>ClearanceStream</div>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 22 }}>
            <div
              style={{
                display: "flex",
                alignSelf: "flex-start",
                padding: "8px 18px",
                borderRadius: 999,
                background: "rgba(255,255,255,0.16)",
                fontSize: 24,
                fontWeight: 600,
                letterSpacing: 1,
                textTransform: "uppercase",
              }}
            >
              {eyebrow}
            </div>
            <div style={{ display: "flex", fontSize: size, fontWeight: 700, lineHeight: 1.08, letterSpacing: -1.5 }}>{title}</div>
          </div>
          <div style={{ display: "flex", fontSize: 26, color: "rgba(255,255,255,0.82)" }}>{footer}</div>
        </div>
      </div>
    ),
    { ...FEATURED_SIZE, fonts: await loadFonts() },
  );
}

/** Category icon for each blog post. */
export const POST_CATEGORY: Record<string, string> = {
  "gaming-pc-deals-guide": "deals",
  "prebuilt-gaming-pc-buying-guide": "gaming-pcs",
  "best-time-to-buy-a-gaming-pc": "deals",
  "how-much-should-i-spend-on-a-gaming-pc": "gaming-pcs",
  "gaming-laptop-vs-gaming-pc": "laptops",
  "what-graphics-card-do-i-need": "components",
  "how-much-ram-for-gaming": "components",
  "oled-vs-ips-gaming-monitor": "monitors",
  "mechanical-keyboard-switches-explained": "keyboards",
  "wireless-vs-wired-gaming-mouse": "mice",
  "are-pro-controllers-worth-it": "controllers",
  "refurbished-gaming-pc-worth-it": "gaming-pcs",
};

export const blogImagePath = (slug: string) => `/images/blog/${slug}`;
export const listImagePath = (slug: string) => `/images/lists/${slug}`;
