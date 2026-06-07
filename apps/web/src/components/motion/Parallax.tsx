"use client";

import { m, useReducedMotion, useScroll, useTransform } from "motion/react";
import type { ReactNode } from "react";
import { useRef } from "react";

export function Parallax({
  children,
  className,
  distance = 36
}: {
  children: ReactNode;
  className?: string;
  distance?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({
    offset: ["start end", "end start"],
    target: ref
  });
  const y = useTransform(scrollYProgress, [0, 1], [distance * -1, distance]);

  if (prefersReducedMotion) {
    return (
      <div className={className} ref={ref}>
        {children}
      </div>
    );
  }

  return (
    <m.div className={className} ref={ref} style={{ y }}>
      {children}
    </m.div>
  );
}
