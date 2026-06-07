import { sectionIds } from "@/lib/constants";
import type { NavigationItem } from "@/types/portfolio";

export const navigationItems = [
  { href: `/#${sectionIds.home}`, id: sectionIds.home, label: "Home" },
  { href: `/#${sectionIds.about}`, id: sectionIds.about, label: "About" },
  {
    href: `/#${sectionIds.experience}`,
    id: sectionIds.experience,
    label: "Experience"
  },
  { href: `/#${sectionIds.work}`, id: sectionIds.work, label: "Work" },
  { href: `/#${sectionIds.skills}`, id: sectionIds.skills, label: "Skills" },
  {
    href: `/#${sectionIds.journey}`,
    id: sectionIds.journey,
    label: "Journey"
  },
  {
    href: `/#${sectionIds.contact}`,
    id: sectionIds.contact,
    label: "Contact"
  }
] satisfies NavigationItem[];
