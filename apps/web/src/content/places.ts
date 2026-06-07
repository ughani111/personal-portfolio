import type { Place } from "@/types/portfolio";

export const journeyPlaces = [
  {
    country: "Pakistan",
    label: "Islamabad, Pakistan",
    mapX: 58,
    mapY: 43,
    note: "Early professional grounding in desktop support and local network operations.",
    published: true,
    sequence: 1
  },
  {
    city: "Kuala Lumpur",
    country: "Malaysia",
    label: "Kuala Lumpur, Malaysia",
    mapX: 70,
    mapY: 58,
    note: "Expanded into enterprise desktop support across workplace applications, VPN, and user communication.",
    published: true,
    sequence: 2
  },
  {
    city: "Berlin",
    country: "Germany",
    label: "Berlin, Germany",
    mapX: 53,
    mapY: 25,
    note: "Shifted back into frontend development in a digital-product environment.",
    published: true,
    sequence: 3
  },
  {
    city: "Hannover",
    country: "Germany",
    label: "Hannover, Germany",
    mapX: 51,
    mapY: 24,
    note: "Built agency frontend delivery experience across reusable components and CMS integrations.",
    published: true,
    sequence: 4
  },
  {
    country: "Germany",
    label: "Germany / NRW",
    mapX: 49,
    mapY: 24,
    note: "Current base, bridging enterprise IT operations with ongoing infrastructure growth.",
    published: true,
    sequence: 5
  }
] satisfies Place[];

export const travelledPlaces = [] satisfies Place[];
