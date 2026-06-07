import type { ReactNode } from "react";

import { cn } from "@/lib/utils";

export function PageShell({
  children,
  className
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={cn("relative overflow-x-clip bg-[var(--color-background)]", className)}>
      <div aria-hidden="true" className="page-noise" />
      <div aria-hidden="true" className="page-glow page-glow-one" />
      <div aria-hidden="true" className="page-glow page-glow-two" />
      {children}
    </div>
  );
}
