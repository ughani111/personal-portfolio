"use client";

import { m, useScroll, useSpring } from "motion/react";

export function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    damping: 24,
    stiffness: 180
  });

  return (
    <m.div
      aria-hidden="true"
      className="fixed left-0 top-0 z-[130] h-[2px] w-full origin-left bg-[var(--color-foreground)]"
      style={{ scaleX }}
    />
  );
}
