import { existsSync } from "node:fs";
import path from "node:path";

function publicPathToFile(src: string) {
  return path.join(process.cwd(), "public", src.replace(/^\//, ""));
}

export function publicAssetExists(src: string) {
  return existsSync(publicPathToFile(src));
}

export function resolveImageSource(preferredSrc: string, fallbackSrc: string) {
  return publicAssetExists(preferredSrc) ? preferredSrc : fallbackSrc;
}

export function getResumeHref(resumePath: string) {
  return publicAssetExists(resumePath) ? resumePath : null;
}
