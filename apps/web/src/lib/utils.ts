export function cn(...values: Array<string | false | null | undefined>) {
  return values.filter(Boolean).join(" ");
}

export function isValidUrl(value: string) {
  try {
    const url = new URL(value);
    return ["http:", "https:", "mailto:"].includes(url.protocol);
  } catch {
    return false;
  }
}

export function absoluteUrl(pathname = "/") {
  const base = process.env.NEXT_PUBLIC_SITE_URL || "https://example.com";
  return new URL(pathname, base).toString();
}

export function formatNumberLabel(value: number, suffix = "+") {
  return `${value}${suffix}`;
}

export function getCurrentYear() {
  return new Date().getFullYear();
}
