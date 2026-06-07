import type { Expertise } from "@/types/portfolio";

export const expertiseAreas = [
  {
    description:
      "Reliable workplace support, endpoint administration, incident handling, and coordination across local and global technology teams.",
    featured: true,
    icon: "operations",
    id: "enterprise-it-operations",
    label: "Enterprise IT Operations",
    published: true
  },
  {
    description:
      "Practical troubleshooting across identity, connectivity, VPN, DNS, DHCP, endpoints, and enterprise network environments.",
    featured: true,
    icon: "networking",
    id: "infrastructure-networking",
    label: "Infrastructure & Networking",
    published: true
  },
  {
    description:
      "Responsive, accessible, reusable user interfaces built with modern JavaScript and component-based architecture.",
    featured: true,
    icon: "frontend",
    id: "frontend-engineering",
    label: "Frontend Engineering",
    published: true
  },
  {
    description:
      "Supporting migrations, endpoint modernization, security tooling, documentation, and process improvement.",
    featured: true,
    icon: "modernization",
    id: "technical-modernization",
    label: "Technical Modernization",
    published: true
  }
] satisfies Expertise[];
