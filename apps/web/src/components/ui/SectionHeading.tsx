import type { ReactNode } from "react";

import { cn } from "@/lib/utils";

type SectionHeadingProps = {
  align?: "left" | "split";
  description?: string;
  eyebrow: string;
  number: string;
  title: ReactNode;
};

export function SectionHeading({
  align = "split",
  description,
  eyebrow,
  number,
  title
}: SectionHeadingProps) {
  return (
    <div
      className={cn(
        "mb-10 grid gap-5 border-t border-[var(--color-border)] pt-5 lg:mb-14",
        align === "split" ? "lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)]" : ""
      )}
    >
      <div className="space-y-3">
        <div className="flex items-center gap-3 text-[0.7rem] font-semibold uppercase tracking-[0.28em] text-[var(--color-muted)]">
          <span>{number}</span>
          <span>{eyebrow}</span>
        </div>
        <h2 className="font-display text-[clamp(2rem,5vw,4.5rem)] uppercase leading-[0.95] tracking-[-0.05em] text-[var(--color-foreground)]">
          {title}
        </h2>
      </div>
      {description ? (
        <p className="max-w-2xl text-base leading-7 text-[var(--color-muted-strong)]">
          {description}
        </p>
      ) : null}
    </div>
  );
}
