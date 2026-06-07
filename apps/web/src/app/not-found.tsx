import Link from "next/link";

import { Section } from "@/components/ui/Section";

export default function NotFound() {
  return (
    <Section className="min-h-[70vh]">
      <div className="mx-auto max-w-2xl rounded-[2rem] border border-[var(--color-border)] bg-[var(--color-surface)] p-8">
        <p className="text-[0.72rem] font-semibold uppercase tracking-[0.24em] text-[var(--color-muted)]">
          404
        </p>
        <h1 className="mt-4 font-display text-[clamp(2.8rem,7vw,5rem)] uppercase leading-[0.94] tracking-[-0.05em]">
          That page is not here
        </h1>
        <p className="mt-4 text-base leading-8 text-[var(--color-muted-strong)]">
          The route may have moved, or it may not exist yet.
        </p>
        <Link
          className="mt-8 inline-flex rounded-full border border-[var(--color-border-strong)] bg-[var(--color-foreground)] px-5 py-3 text-sm font-semibold text-[var(--color-background)]"
          href="/"
        >
          Return home
        </Link>
      </div>
    </Section>
  );
}
