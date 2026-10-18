import "server-only";
import { BUILD_DEFS, generateBuild, type GeneratedBuild } from "./pc-builds";
import { readParts } from "./pc-parts-data";
import { matchesPartType, PART_TYPES, type Part, type PartTypeId } from "./pc-parts";

/** Every curated build that the current parts snapshot can complete. */
export function loadBuilds(): { builds: GeneratedBuild[]; generatedAt: string | null } {
  const snap = readParts();
  if (!snap) return { builds: [], generatedAt: null };
  // Re-apply the part filters so older snapshots never put a non-part in a build.
  const parts = Object.fromEntries(PART_TYPES.map((t) => [t.id, (snap.parts[t.id] ?? []).filter((p) => matchesPartType(t, p.name))])) as Record<PartTypeId, Part[]>;
  const builds = BUILD_DEFS.map((d) => generateBuild(d, parts)).filter((b): b is GeneratedBuild => b !== null);
  return { builds, generatedAt: snap.generatedAt };
}
