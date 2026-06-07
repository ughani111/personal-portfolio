"use client";

import { m, useReducedMotion } from "motion/react";

import type { Place } from "@/types/portfolio";

function routeFromPlaces(places: Place[]) {
  return places
    .map((place, index) => `${index === 0 ? "M" : "L"} ${place.mapX} ${place.mapY}`)
    .join(" ");
}

export function WorldJourneyIllustration({ places }: { places: Place[] }) {
  const prefersReducedMotion = useReducedMotion();
  const route = routeFromPlaces(places);

  return (
    <svg
      aria-hidden="true"
      className="h-auto w-full"
      viewBox="0 0 100 70"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M6 18C12 14 22 12 30 15C34 13 41 12 47 15C54 13 61 16 67 20C73 17 81 18 91 22V40C84 44 76 46 68 46C60 49 47 50 35 46C28 49 18 48 9 43L6 18Z"
        fill="currentColor"
        opacity="0.06"
      />
      <path
        d="M10 21C15 17 24 14 31 17M41 18C49 16 57 19 63 24M70 24C75 21 82 22 88 26M13 35C19 39 28 40 34 38M42 39C49 42 59 42 67 39M73 37C79 39 84 39 89 36"
        stroke="currentColor"
        strokeLinecap="round"
        strokeOpacity="0.16"
        strokeWidth="0.6"
      />
      <m.path
        animate={prefersReducedMotion ? {} : { pathLength: 1 }}
        d={route}
        fill="none"
        initial={prefersReducedMotion ? false : { pathLength: 0 }}
        stroke="url(#journey-gradient)"
        strokeDasharray="1 2.8"
        strokeLinecap="round"
        strokeWidth="1.4"
        transition={{ duration: 1.6, ease: [0.22, 1, 0.36, 1] }}
      />
      {places.map((place, index) => (
        <m.g
          animate={prefersReducedMotion ? {} : { opacity: 1, scale: 1 }}
          initial={prefersReducedMotion ? false : { opacity: 0, scale: 0.7 }}
          key={place.label}
          transition={{ delay: index * 0.14, duration: 0.35 }}
          transform={`translate(${place.mapX} ${place.mapY})`}
        >
          <circle fill="url(#journey-gradient)" r="2.4" />
          <circle fill="white" opacity="0.9" r="0.8" />
        </m.g>
      ))}
      <defs>
        <linearGradient id="journey-gradient" x1="10" x2="90" y1="12" y2="54">
          <stop offset="0%" stopColor="#0ea5e9" />
          <stop offset="55%" stopColor="#f97316" />
          <stop offset="100%" stopColor="#ec4899" />
        </linearGradient>
      </defs>
    </svg>
  );
}
