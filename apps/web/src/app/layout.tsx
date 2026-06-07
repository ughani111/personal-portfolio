import type { Metadata } from "next";
import dynamic from "next/dynamic";
import { Manrope, Space_Grotesk } from "next/font/google";
import type { ReactNode } from "react";

import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { PageShell } from "@/components/layout/PageShell";
import { AnalyticsScript } from "@/components/layout/AnalyticsScript";
import { MotionProvider } from "@/components/motion/MotionProvider";
import { SkipLink } from "@/components/ui/SkipLink";
import { navigationItems } from "@/content/navigation";
import { profile } from "@/content/profile";
import { socialLinks } from "@/content/social-links";
import { defaultMetaDescription, siteTitle } from "@/lib/constants";
import { getPublicContactConfig } from "@/lib/contact";
import { createPageMetadata, metadataBase } from "@/lib/seo";

import "./globals.css";

const ScrollProgress = dynamic(
  () =>
    import("@/components/motion/ScrollProgress").then(
      (module) => module.ScrollProgress
    ),
  {
    ssr: false
  }
);

const bodyFont = Manrope({
  display: "swap",
  subsets: ["latin"],
  variable: "--font-body"
});

const displayFont = Space_Grotesk({
  display: "swap",
  subsets: ["latin"],
  variable: "--font-display"
});

const baseMetadata = createPageMetadata();

export const metadata: Metadata = {
  ...baseMetadata,
  alternates: {
    canonical: "/"
  },
  applicationName: "Usman Ghani Portfolio",
  category: "technology",
  description: defaultMetaDescription,
  icons: {
    apple: "/apple-icon",
    icon: "/icon"
  },
  keywords: [
    "IT Administrator Germany",
    "Field Support Engineer Germany",
    "IT Infrastructure Engineer",
    "Enterprise IT Support",
    "Endpoint Administration",
    "Microsoft Intune",
    "Active Directory",
    "Network Support",
    "Frontend Developer",
    "React Developer",
    "TypeScript Developer",
    "Technical Portfolio"
  ],
  manifest: "/manifest.webmanifest",
  metadataBase,
  openGraph: {
    ...baseMetadata.openGraph,
    description: defaultMetaDescription,
    images: [
      {
        alt: "Usman Ghani portfolio social preview",
        height: 630,
        url: "/opengraph-image",
        width: 1200
      }
    ]
  },
  title: {
    default: siteTitle,
    template: "%s | Usman Ghani"
  },
  twitter: {
    ...baseMetadata.twitter,
    images: ["/twitter-image"]
  }
};

export default function RootLayout({
  children
}: Readonly<{
  children: ReactNode;
}>) {
  const { email } = getPublicContactConfig();

  return (
    <html className={`${bodyFont.variable} ${displayFont.variable}`} lang="en">
      <body>
        <MotionProvider>
          <PageShell>
            <SkipLink />
            <ScrollProgress />
            <Header items={navigationItems} name={profile.name} />
            {children}
            <Footer email={email} profile={profile} socialLinks={socialLinks} />
            <AnalyticsScript />
          </PageShell>
        </MotionProvider>
      </body>
    </html>
  );
}
