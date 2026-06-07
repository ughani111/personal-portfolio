"use client";

import { m } from "motion/react";
import type { ReactNode } from "react";

import { clipReveal } from "@/components/motion/animation-presets";

export function TextReveal({ children }: { children: ReactNode }) {
  return (
    <div className="overflow-hidden">
      <m.div
        initial="hidden"
        viewport={{ amount: 0.7, once: true }}
        variants={clipReveal}
        whileInView="visible"
      >
        {children}
      </m.div>
    </div>
  );
}
