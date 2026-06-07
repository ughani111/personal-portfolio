"use client";

import { m } from "motion/react";
import type { ReactNode } from "react";

import { staggerContainer } from "@/components/motion/animation-presets";
import { cn } from "@/lib/utils";

export function Stagger({
  children,
  className
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <m.div
      className={cn(className)}
      initial="hidden"
      viewport={{ amount: 0.18, once: true }}
      variants={staggerContainer}
      whileInView="visible"
    >
      {children}
    </m.div>
  );
}
