import type { Metadata } from "next";
import { z } from "zod";

import { defaultMetaDescription, siteTitle } from "@/lib/constants";

const envSchema = z.object({
  NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION: z.string().optional(),
  NEXT_PUBLIC_SITE_URL: z.url().optional()
});

export const siteEnv = envSchema.parse({
  NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION:
    process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION,
  NEXT_PUBLIC_SITE_URL: process.env.NEXT_PUBLIC_SITE_URL
});

export function getSiteUrl() {
  return siteEnv.NEXT_PUBLIC_SITE_URL || "https://example.com";
}

export const metadataBase = new URL(getSiteUrl());

export function createPageMetadata(
  overrides: Pick<Metadata, "description" | "title"> = {}
): Metadata {
  return {
    authors: [{ name: "Usman Ghani" }],
    creator: "Usman Ghani",
    description: overrides.description || defaultMetaDescription,
    metadataBase,
    openGraph: {
      description: overrides.description || defaultMetaDescription,
      locale: "en_US",
      siteName: "Usman Ghani",
      title:
        typeof overrides.title === "string" ? overrides.title : siteTitle,
      type: "website",
      url: metadataBase
    },
    publisher: "Usman Ghani",
    robots: {
      follow: true,
      index: true
    },
    title: overrides.title || siteTitle,
    twitter: {
      card: "summary_large_image",
      description: overrides.description || defaultMetaDescription,
      title:
        typeof overrides.title === "string" ? overrides.title : siteTitle
    },
    verification: {
      google: siteEnv.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION
    }
  };
}
