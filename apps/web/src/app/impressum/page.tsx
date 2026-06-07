import type { Metadata } from "next";

import { Section } from "@/components/ui/Section";
import { createPageMetadata } from "@/lib/seo";

export const metadata: Metadata = createPageMetadata({
  description:
    "Placeholder impressum page for the Usman Ghani portfolio. Review and replace this content before launch.",
  title: "Impressum"
});

export default function ImpressumPage() {
  return (
    <Section className="min-h-[70vh]">
      <div className="mx-auto max-w-3xl">
        <p className="text-[0.72rem] font-semibold uppercase tracking-[0.24em] text-[var(--color-muted)]">
          Impressum
        </p>
        <h1 className="mt-4 font-display text-[clamp(2.8rem,7vw,5rem)] uppercase leading-[0.94] tracking-[-0.05em]">
          Legal details need final review
        </h1>
        <div className="mt-8 grid gap-5 text-base leading-8 text-[var(--color-muted-strong)]">
          <p>
            This route is intentionally present because Germany-based personal websites may
            require a legally compliant impressum, but the exact content should be reviewed
            before publication.
          </p>
          <p>
            Do not publish private residential details, personal phone numbers, or anything
            beyond the information that is legally required and intentionally made public.
          </p>
          <p>
            Replace this placeholder with the final legally reviewed text before going live.
          </p>
        </div>
      </div>
    </Section>
  );
}
