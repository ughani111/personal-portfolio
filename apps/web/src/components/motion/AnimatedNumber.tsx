"use client";

import { animate, useInView, useReducedMotion } from "motion/react";
import { useEffect, useRef } from "react";

export function AnimatedNumber({
  suffix = "",
  value
}: {
  suffix?: string;
  value: number;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const wrapperRef = useRef<HTMLSpanElement>(null);
  const prefersReducedMotion = useReducedMotion();
  const isInView = useInView(wrapperRef, { amount: 0.75, once: true });

  useEffect(() => {
    if (!ref.current || !isInView) {
      return;
    }

    if (prefersReducedMotion) {
      ref.current.textContent = `${value}${suffix}`;
      return;
    }

    const controls = animate(0, value, {
      duration: 1.1,
      ease: [0.22, 1, 0.36, 1],
      onUpdate: (latest) => {
        if (ref.current) {
          ref.current.textContent = `${Math.round(latest)}${suffix}`;
        }
      }
    });

    return () => controls.stop();
  }, [isInView, prefersReducedMotion, suffix, value]);

  return (
    <span ref={wrapperRef}>
      <span ref={ref}>{`${value}${suffix}`}</span>
    </span>
  );
}
