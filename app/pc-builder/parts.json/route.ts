import { readParts } from "@/lib/pc-parts-data";

// Built once per deploy from the parts snapshot; loaded by the PC Builder in the browser.
export const dynamic = "force-static";

export async function GET() {
  const snap = readParts();
  return Response.json(snap ?? { generatedAt: null, parts: {} });
}
