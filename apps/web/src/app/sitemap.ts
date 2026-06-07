import type { MetadataRoute } from "next";

import { getSiteUrl } from "@/lib/seo";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = getSiteUrl();

  return ["", "/privacy", "/impressum"].map((pathname) => ({
    changeFrequency: pathname === "" ? "weekly" : "yearly",
    lastModified: new Date(),
    priority: pathname === "" ? 1 : 0.4,
    url: `${baseUrl}${pathname || "/"}`
  }));
}
