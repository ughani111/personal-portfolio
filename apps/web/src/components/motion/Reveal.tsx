"use client";

import { m } from "motion/react";
import type { ReactNode } from "react";

import { fadeUp } from "@/components/motion/animation-presets";
import { cn } from "@/lib/utils";

export function Reveal({
  children,
  className,
  once = true
}: {
  children: ReactNode;
  className?: string;
  once?: boolean;
}) {
  return (
    <m.div
      className={cn(className)}
      initial="hidden"
      viewport={{ amount: 0.25, once }}
      variants={fadeUp}
      whileInView="visible"
    >
      {children}
    </m.div>
  );
}
