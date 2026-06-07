import type { MetadataRoute } from "next";

import { getSiteUrl } from "@/lib/seo";

export default function robots(): MetadataRoute.Robots {
  return {
    host: getSiteUrl(),
    rules: {
      allow: "/",
      userAgent: "*"
    },
    sitemap: `${getSiteUrl()}/sitemap.xml`
  };
}
