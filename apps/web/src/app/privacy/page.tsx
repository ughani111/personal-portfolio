import type { Metadata } from "next";

import { Section } from "@/components/ui/Section";
import { createPageMetadata } from "@/lib/seo";

export const metadata: Metadata = createPageMetadata({
  description:
    "Placeholder privacy page for the Usman Ghani portfolio. Review and replace this content before launch.",
  title: "Privacy"
});

export default function PrivacyPage() {
  return (
    <Section className="min-h-[70vh]">
      <div className="mx-auto max-w-3xl">
        <p className="text-[0.72rem] font-semibold uppercase tracking-[0.24em] text-[var(--color-muted)]">
          Privacy
        </p>
        <h1 className="mt-4 font-display text-[clamp(2.8rem,7vw,5rem)] uppercase leading-[0.94] tracking-[-0.05em]">
          Review before launch
        </h1>
        <div className="mt-8 grid gap-5 text-base leading-8 text-[var(--color-muted-strong)]">
          <p>
            This placeholder privacy page exists so the portfolio can ship with working routes
            and internal links, but it is not legal advice and it is not complete.
          </p>
          <p>
            Replace this page with a version reviewed for the final deployment country,
            analytics setup, contact-form provider, and hosting environment.
          </p>
          <p>
            Before launch, document the real contact address, data processors, retention
            policy, and any analytics or external form providers that are enabled.
          </p>
        </div>
      </div>
    </Section>
  );
}
