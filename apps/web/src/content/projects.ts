import type { Project } from "@/types/portfolio";

export const projects = [
  {
    approach:
      "Built support around repeatable incident flows, clear escalation notes, user communication, and close coordination with infrastructure stakeholders.",
    category: "Enterprise IT",
    challenge:
      "Enterprise workplace support requires fast triage while protecting confidential infrastructure details and keeping users productive.",
    confidential: false,
    externalUrl: "",
    featured: true,
    imageAlt:
      "Abstract editorial artwork representing enterprise workplace support and field operations.",
    images: [
      {
        alt: "Abstract illustration for enterprise field support and workplace operations.",
        height: 960,
        src: "/images/projects/enterprise-field-support.svg",
        width: 1280
      }
    ],
    location: "Germany",
    longDescription:
      "A high-level case study focused on enterprise workplace operations: supporting users, endpoints, access, workplace applications, peripherals, and site-level technology workflows within an international environment.",
    outcome:
      "Established a portfolio-ready case study that communicates scope, reliability, and cross-team collaboration without exposing internal infrastructure.",
    period: "2025 - Present",
    published: true,
    repositoryUrl: "",
    responsibilities: [
      "Incident triage and request fulfilment",
      "Endpoint setup and lifecycle support",
      "User access coordination",
      "Network troubleshooting",
      "Vendor and global-team coordination",
      "Documentation and escalation"
    ],
    role: "IT Administrator / Field Support Engineer",
    shortDescription:
      "Supporting users, endpoints, access, and site technology operations in an international enterprise environment.",
    slug: "enterprise-field-support-workplace-operations",
    technologies: [
      "Windows",
      "Active Directory",
      "Microsoft Intune",
      "Microsoft 365",
      "ServiceNow",
      "Network diagnostics"
    ],
    title: "Enterprise Field Support & Workplace Operations"
  },
  {
    approach:
      "Used component-based frontend patterns, API and CMS integrations, responsive CSS, and release support within agency delivery cycles.",
    category: "Frontend Engineering",
    challenge:
      "Agency work requires reusable frontend implementation that can adapt to varied visual systems, browser constraints, and delivery timelines.",
    confidential: false,
    externalUrl: "",
    featured: true,
    imageAlt:
      "Abstract editorial artwork representing agency frontend development and component systems.",
    images: [
      {
        alt: "Abstract illustration for digital agency frontend development.",
        height: 960,
        src: "/images/projects/digital-agency-frontend.svg",
        width: 1280
      }
    ],
    location: "Germany",
    longDescription:
      "A case-study view of agency and digital-product frontend work: building responsive interfaces, improving maintainability, and collaborating across design, CMS, and development requirements.",
    outcome:
      "Frames frontend work around maintainability, usability, and delivery quality rather than unverifiable marketing claims.",
    period: "2019 - 2023",
    published: true,
    repositoryUrl: "",
    responsibilities: [
      "Responsive UI development",
      "Reusable component implementation",
      "API and CMS integration",
      "Testing and bug fixing",
      "Browser compatibility support"
    ],
    role: "Frontend Developer",
    shortDescription:
      "Building responsive, component-based frontend experiences for agency and digital-product environments.",
    slug: "digital-agency-frontend-development",
    technologies: [
      "JavaScript",
      "TypeScript",
      "React",
      "Vue",
      "CMS integrations",
      "Responsive CSS"
    ],
    title: "Digital Agency Frontend Development"
  },
  {
    approach:
      "Presented the work as a modernization narrative focused on endpoint readiness, security tooling support, documentation, and rollout coordination.",
    category: "Infrastructure Modernization",
    challenge:
      "Modernization work often spans devices, security, onboarding, and change communication, but public portfolios still need to stay safely high level.",
    confidential: false,
    externalUrl: "",
    featured: true,
    imageAlt:
      "Abstract editorial artwork representing endpoint modernization and security tooling.",
    images: [
      {
        alt: "Abstract illustration for endpoint and infrastructure modernization.",
        height: 960,
        src: "/images/projects/endpoint-modernization.svg",
        width: 1280
      }
    ],
    location: "Germany",
    longDescription:
      "A portfolio-safe summary of modernization activities involving endpoint management, security tooling, rollout checks, device preparation, and user readiness.",
    outcome:
      "Communicates modernization capability without exposing private systems, internal documentation, or confidential rollout details.",
    period: "2025 - Present",
    published: true,
    repositoryUrl: "",
    responsibilities: [
      "Endpoint readiness checks",
      "Security tooling support",
      "Rollout preparation",
      "Documentation hygiene",
      "User readiness coordination"
    ],
    role: "Infrastructure Support Contributor",
    shortDescription:
      "Supporting modernization activities involving endpoint management, security tooling, device preparation, and rollout checks.",
    slug: "endpoint-infrastructure-modernization",
    technologies: [
      "Endpoint management",
      "Security tooling",
      "Documentation",
      "Change coordination",
      "Device rollout"
    ],
    title: "Endpoint & Infrastructure Modernization"
  },
  {
    approach:
      "Structured as an editable sandbox for ongoing learning, experimentation, note taking, and documented iteration across infrastructure and AI tooling.",
    category: "Personal Lab",
    challenge:
      "A learning environment needs enough structure to demonstrate direction without overstating production-level expertise.",
    confidential: false,
    externalUrl: "",
    featured: false,
    imageAlt:
      "Abstract editorial artwork representing a personal lab for networking, automation, cloud, and local AI tooling.",
    images: [
      {
        alt: "Abstract illustration for a personal technology lab.",
        height: 960,
        src: "/images/projects/personal-tech-lab.svg",
        width: 1280
      }
    ],
    location: "Germany",
    longDescription:
      "A personal lab for learning networking, cloud, automation, containers, and local AI or LLM technologies in a controlled environment.",
    outcome:
      "Shows an active development path toward advanced networking, cloud engineering, cybersecurity, infrastructure automation, and AI infrastructure.",
    period: "Ongoing",
    published: true,
    repositoryUrl: "",
    responsibilities: [
      "Environment setup",
      "Documentation and note capture",
      "Container experiments",
      "Automation practice",
      "Local AI tooling exploration"
    ],
    role: "Independent Study",
    shortDescription:
      "A personal lab for learning networking, cloud, automation, containers, and local AI or LLM technologies.",
    slug: "personal-technology-lab",
    technologies: [
      "Docker",
      "Networking",
      "Cloud fundamentals",
      "Automation",
      "Local LLM operations"
    ],
    title: "Personal Technology Lab"
  },
  {
    approach: "Internal-only placeholder for future private case studies.",
    category: "Confidential",
    challenge: "This entry exists only to validate filtering behavior.",
    confidential: true,
    externalUrl: "",
    featured: false,
    imageAlt: "",
    images: [],
    location: "Private",
    longDescription: "Hidden.",
    outcome: "Hidden.",
    period: "Draft",
    published: false,
    repositoryUrl: "",
    responsibilities: [],
    role: "Hidden",
    shortDescription: "Hidden",
    slug: "confidential-placeholder",
    technologies: [],
    title: "Confidential Placeholder"
  }
] satisfies Project[];
