"use client";

import { m, useReducedMotion } from "motion/react";
import type { MouseEvent, ReactNode } from "react";
import { useMemo, useState } from "react";

export function MagneticButton({ children }: { children: ReactNode }) {
  const prefersReducedMotion = useReducedMotion();
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const canUsePointer = useMemo(
    () =>
      typeof window !== "undefined" &&
      window.matchMedia("(pointer: fine)").matches &&
      !prefersReducedMotion,
    [prefersReducedMotion]
  );

  return (
    <m.div
      animate={{ x: offset.x, y: offset.y }}
      onMouseLeave={() => setOffset({ x: 0, y: 0 })}
      onMouseMove={(event: MouseEvent<HTMLDivElement>) => {
        if (!canUsePointer) {
          return;
        }

        const rect = event.currentTarget.getBoundingClientRect();
        const x = (event.clientX - rect.left - rect.width / 2) * 0.08;
        const y = (event.clientY - rect.top - rect.height / 2) * 0.08;
        setOffset({ x, y });
      }}
      transition={{ damping: 22, stiffness: 220, type: "spring" }}
    >
      {children}
    </m.div>
  );
}
