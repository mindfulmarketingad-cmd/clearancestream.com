export function formatChecked(iso: string) {
  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "2-digit",
    timeZone: "UTC",
    timeZoneName: "short",
  }).format(new Date(iso));
}

export function formatDate(iso: string) {
  return new Intl.DateTimeFormat("en-US", { month: "long", day: "numeric", year: "numeric", timeZone: "UTC" }).format(
    new Date(iso),
  );
}

/** Lowercase a product name for mid-sentence use, keeping acronyms intact ("gaming PCs", "PS5"). */
export function lowerName(s: string) {
  return s
    .toLowerCase()
    .replace(/\bpc(s?)\b/g, "PC$1")
    .replace(/\bps5\b/g, "PS5")
    .replace(/\bxbox\b/g, "Xbox")
    .replace(/\boled\b/g, "OLED")
    .replace(/\brtx\b/g, "RTX")
    .replace(/\bnintendo switch\b/g, "Nintendo Switch");
}
