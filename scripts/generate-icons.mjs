// Generates the logo, favicon set, and default Open Graph image from SVG
// sources. Run with `npm run icons` after changing the brand mark.
import { mkdirSync, writeFileSync, copyFileSync, existsSync } from "node:fs";
import { homedir } from "node:os";
import { join } from "node:path";
import sharp from "sharp";

const BLUE = "#1f4fd6";
const INK = "#0b1220";

// Price-drop mark: a descending trend line ending in an arrowhead.
const markPaths = (stroke) => `
  <path d="M7 11 L13.5 17.5 L17.5 13.5 L24.5 20.5" fill="none" stroke="${stroke}" stroke-width="2.8" stroke-linecap="round" stroke-linejoin="round"/>
  <path d="M24.5 14 V20.5 H18" fill="none" stroke="${stroke}" stroke-width="2.8" stroke-linecap="round" stroke-linejoin="round"/>`;

export const markSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32">
  <rect width="32" height="32" rx="8" fill="${BLUE}"/>${markPaths("#fff")}
</svg>`;

// Full-bleed variant for touch icons, where the OS applies its own mask.
const squareMarkSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32">
  <rect width="32" height="32" fill="${BLUE}"/>${markPaths("#fff")}
</svg>`;

// Make Geist available to librsvg for text rendering.
const fontDir = join(homedir(), ".fonts");
mkdirSync(fontDir, { recursive: true });
for (const f of ["Geist-SemiBold.ttf", "Geist-Medium.ttf", "Geist-Regular.ttf"]) {
  const src = join("node_modules/geist/dist/fonts/geist-sans", f);
  if (existsSync(src)) copyFileSync(src, join(fontDir, f));
}

const wordmarkSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 32" width="200" height="32">
  <g>${markSvg.replace(/<\/?svg[^>]*>/g, "")}</g>
  <text x="42" y="22.5" font-family="Geist" font-weight="600" font-size="19" letter-spacing="-0.4" fill="${INK}">Clearance<tspan fill="${BLUE}">Stream</tspan></text>
</svg>`;

const ogSvg = `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630">
  <rect width="1200" height="630" fill="#ffffff"/>
  <rect x="0" y="0" width="1200" height="8" fill="${BLUE}"/>
  <g transform="translate(96 120) scale(3)">${markSvg.replace(/<\/?svg[^>]*>/g, "")}</g>
  <text x="96" y="330" font-family="Geist" font-weight="600" font-size="76" letter-spacing="-2.5" fill="${INK}">Gaming PC Hidden Deals</text>
  <text x="96" y="420" font-family="Geist" font-weight="600" font-size="76" letter-spacing="-2.5" fill="${BLUE}">&amp; Clearances</text>
  <text x="96" y="520" font-family="Geist" font-weight="400" font-size="30" fill="#5b6576">Live Amazon deals on Corsair, Alienware, Razer, Logitech G, and more.</text>
  <text x="1104" y="580" text-anchor="end" font-family="Geist" font-weight="600" font-size="28" fill="${INK}">ClearanceStream<tspan fill="${BLUE}">.com</tspan></text>
</svg>`;

const png = (svg, size) => sharp(Buffer.from(svg), { density: 1200 }).resize(size, size).png().toBuffer();

// ICO container with embedded PNG images (supported by all current browsers).
function ico(images) {
  const header = Buffer.alloc(6 + images.length * 16);
  header.writeUInt16LE(0, 0);
  header.writeUInt16LE(1, 2);
  header.writeUInt16LE(images.length, 4);
  let offset = header.length;
  images.forEach(({ size, data }, i) => {
    const e = 6 + i * 16;
    header.writeUInt8(size >= 256 ? 0 : size, e);
    header.writeUInt8(size >= 256 ? 0 : size, e + 1);
    header.writeUInt16LE(1, e + 4);
    header.writeUInt16LE(32, e + 6);
    header.writeUInt32LE(data.length, e + 8);
    header.writeUInt32LE(offset, e + 12);
    offset += data.length;
  });
  return Buffer.concat([header, ...images.map((i) => i.data)]);
}

mkdirSync("public", { recursive: true });
writeFileSync("app/icon.svg", markSvg);
writeFileSync("public/logo.svg", wordmarkSvg);
writeFileSync("app/apple-icon.png", await png(squareMarkSvg, 180));
writeFileSync("public/icon-192.png", await png(squareMarkSvg, 192));
writeFileSync("public/icon-512.png", await png(squareMarkSvg, 512));
writeFileSync("public/logo.png", await png(markSvg, 512));
writeFileSync(
  "app/favicon.ico",
  ico(await Promise.all([16, 32, 48].map(async (size) => ({ size, data: await png(markSvg, size) })))),
);
writeFileSync("public/og.png", await sharp(Buffer.from(ogSvg), { density: 144 }).resize(1200, 630).png().toBuffer());
await sharp(Buffer.from(wordmarkSvg), { density: 600 }).png().toFile("public/logo-wordmark.png");
console.log("Icons generated.");
