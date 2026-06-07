import type { ReactNode } from "react";

import { cn } from "@/lib/utils";

type SectionProps = {
  children: ReactNode;
  className?: string;
  id?: string;
};

export function Section({ children, className, id }: SectionProps) {
  return (
    <section className={cn("section-shell", className)} id={id}>
      <div className="mx-auto max-w-[90rem] px-4 sm:px-6 lg:px-10">{children}</div>
    </section>
  );
}
