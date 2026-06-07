import type { ReactNode } from "react";

import { cn } from "@/lib/utils";

export function Tag({
  children,
  className,
  inverse = false
}: {
  children: ReactNode;
  className?: string;
  inverse?: boolean;
}) {
  return (
    <span
      className={cn(
        "inline-flex rounded-full border px-3 py-1 text-[0.72rem] font-medium uppercase tracking-[0.16em]",
        inverse
          ? "border-white/20 bg-white/10 text-white"
          : "border-[var(--color-border)] bg-[var(--color-surface)] text-[var(--color-muted-strong)]",
        className
      )}
    >
      {children}
    </span>
  );
}
