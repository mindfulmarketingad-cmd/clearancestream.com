/** Member-only deals and promotions. Product, brand, and guide URLs stay public. */
export function isMemberPath(pathname: string) {
  return pathname === "/deals" || pathname === "/deals/today" || pathname === "/account" || pathname === "/coupons" || pathname.startsWith("/coupons/");
}

/** Only same-site paths. Blocks protocol-relative, backslash, and auth-page loops. */
export function safeNext(value: string | null | undefined, fallback = "/deals") {
  if (!value || !value.startsWith("/") || value.startsWith("//") || value.includes("\\") || value.includes("\n") || value.includes("\r")) {
    return fallback;
  }
  const path = value.split("?")[0];
  if (path === "/login" || path === "/signup" || path.startsWith("/auth")) return fallback;
  return value;
}
