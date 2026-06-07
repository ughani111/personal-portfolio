import type { ReactNode } from "react";

import { cn } from "@/lib/utils";

export function Badge({
  children,
  className
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full border border-[var(--color-border)] bg-[var(--color-background)] px-3 py-1 text-[0.68rem] font-semibold uppercase tracking-[0.22em] text-[var(--color-muted)]",
        className
      )}
    >
      {children}
    </span>
  );
}
