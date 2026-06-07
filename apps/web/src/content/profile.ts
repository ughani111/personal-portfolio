import type { Profile } from "@/types/portfolio";

export const profile = {
  aboutParagraphs: [
    "Usman Ghani is a technology professional based in Germany with experience across Germany, Malaysia, and Pakistan. His work spans enterprise IT support, field support, desktop engineering, endpoint lifecycle management, identity and access support, networking troubleshooting, Microsoft workplace technologies, and IT service management.",
    "He has also worked in frontend development, responsive web applications, CMS implementation, and digital agency delivery. That mix gives him a practical understanding of both user-facing digital products and the infrastructure required to keep organizations working."
  ],
  availability:
    "Open to selected professional opportunities, collaborations, and technical conversations.",
  descriptorRotator: [
    "IT Administrator",
    "Field Support Engineer",
    "Frontend Developer",
    "Building toward Cloud & Network Engineering"
  ],
  heroDescription:
    "I build dependable digital workplaces and modern web experiences—combining enterprise support, infrastructure thinking, and frontend engineering.",
  heroEyebrow: "IT operations x modern web engineering",
  heroIntro: "Hello, I'm",
  imageSlots: {
    about: {
      alt: "Editorial profile placeholder for the about section until a real portrait is added.",
      fallbackSrc: "/images/profile/usman-about-placeholder.svg",
      preferredSrc: "/images/profile/usman-about.webp",
      sizes: "(min-width: 1024px) 32vw, 88vw",
      width: 960,
      height: 1180
    },
    contact: {
      alt: "Profile placeholder for the contact section until a real portrait is added.",
      fallbackSrc: "/images/profile/usman-contact-placeholder.svg",
      preferredSrc: "/images/profile/usman-contact.webp",
      sizes: "(min-width: 1024px) 28vw, 88vw",
      width: 920,
      height: 1080
    },
    hero: {
      alt: "Hero portrait placeholder for Usman Ghani until a production photo is supplied.",
      fallbackSrc: "/images/profile/usman-hero-placeholder.svg",
      preferredSrc: "/images/profile/usman-hero.webp",
      priority: true,
      sizes: "(min-width: 1280px) 38vw, (min-width: 768px) 48vw, 88vw",
      width: 1120,
      height: 1380
    }
  },
  location: "Germany",
  name: "Usman Ghani",
  positioningStatement:
    "I build dependable digital workplaces and modern web experiences—connecting enterprise IT operations, infrastructure, user support, networking, and frontend engineering.",
  primaryTitle: "IT Administrator & Field Support Engineer",
  publicEmailPlaceholder: "hello@your-domain.com",
  resumePath: "/documents/usman-ghani-cv.pdf",
  secondaryTitle: "Frontend Developer"
} satisfies Profile;
