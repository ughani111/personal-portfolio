import type { SkillGroup } from "@/types/portfolio";

export const skillGroups = [
  {
    description:
      "Day-to-day workplace administration, support flows, and endpoint operations.",
    id: "enterprise-it",
    label: "Enterprise IT & Workplace",
    published: true,
    skills: [
      "Windows",
      "macOS",
      "Linux",
      "Active Directory",
      "Microsoft 365",
      "Microsoft Intune",
      "Endpoint management",
      "SCCM",
      "User onboarding and offboarding",
      "Hardware lifecycle",
      "Remote support",
      "IT documentation",
      "ServiceNow",
      "Jira",
      "Incident management",
      "Request fulfilment"
    ]
  },
  {
    description:
      "Connectivity and security-adjacent troubleshooting across enterprise environments.",
    id: "networking-security",
    label: "Networking & Security",
    published: true,
    skills: [
      "TCP/IP",
      "DNS",
      "DHCP",
      "LAN/WAN",
      "VLAN fundamentals",
      "VPN",
      "Wi-Fi troubleshooting",
      "Cisco technologies",
      "Palo Alto technologies",
      "Zscaler ZIA/ZPA",
      "CrowdStrike",
      "Network diagnostics",
      "Wireshark",
      "Basic PowerShell automation"
    ]
  },
  {
    description:
      "Frontend implementation across frameworks, accessibility, and interface quality.",
    id: "frontend-web",
    label: "Frontend & Web Engineering",
    published: true,
    skills: [
      "HTML",
      "CSS",
      "JavaScript",
      "TypeScript",
      "React",
      "Vue",
      "Angular",
      "Responsive design",
      "Accessibility",
      "REST APIs",
      "Jest",
      "Cypress"
    ]
  },
  {
    description:
      "Platform and delivery fundamentals used around web and application work.",
    id: "backend-platforms",
    label: "Backend, Platforms & Delivery",
    published: true,
    skills: [
      "Node.js",
      "PHP",
      "Laravel",
      "WordPress",
      "Java",
      "Magnolia CMS",
      "AWS fundamentals",
      "Docker",
      "CI/CD",
      "Git"
    ]
  },
  {
    description:
      "Clearly marked growth areas rather than claimed mastery.",
    id: "current-focus",
    label: "Currently Developing",
    published: true,
    skills: [
      "Advanced networking",
      "Cloud engineering",
      "Cybersecurity",
      "Infrastructure automation",
      "DevOps/SRE practices",
      "AI infrastructure",
      "Local LLM deployment and operations"
    ],
    tone: "inverse"
  }
] satisfies SkillGroup[];
