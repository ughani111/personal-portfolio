export interface VisibilityFlags {
  confidential?: boolean;
  consentGiven?: boolean;
  draft?: boolean;
  enabled?: boolean;
  featured?: boolean;
  published?: boolean;
}

export interface NavigationItem {
  href: string;
  id: string;
  label: string;
}

export interface ImageSlot {
  alt: string;
  fallbackSrc: string;
  preferredSrc: string;
  priority?: boolean;
  sizes: string;
  width: number;
  height: number;
}

export interface Profile {
  name: string;
  primaryTitle: string;
  secondaryTitle: string;
  positioningStatement: string;
  heroEyebrow: string;
  heroIntro: string;
  heroDescription: string;
  descriptorRotator: string[];
  location: string;
  availability: string;
  aboutParagraphs: string[];
  imageSlots: {
    about: ImageSlot;
    contact: ImageSlot;
    hero: ImageSlot;
  };
  resumePath: string;
  publicEmailPlaceholder: string;
}

export interface Expertise extends VisibilityFlags {
  description: string;
  icon: "operations" | "frontend" | "modernization" | "networking";
  id: string;
  label: string;
}

export interface Experience extends VisibilityFlags {
  companyDisplay: string;
  current?: boolean;
  location: string;
  period: {
    end?: string;
    label: string;
    start: string;
  };
  responsibilities: string[];
  title: string;
}

export interface ProjectImage {
  alt: string;
  src: string;
  width: number;
  height: number;
}

export interface Project extends VisibilityFlags {
  approach: string;
  category: string;
  challenge: string;
  externalUrl?: string;
  imageAlt: string;
  images: ProjectImage[];
  location: string;
  longDescription: string;
  outcome: string;
  period: string;
  repositoryUrl?: string;
  responsibilities: string[];
  role: string;
  shortDescription: string;
  slug: string;
  technologies: string[];
  title: string;
}

export interface SkillGroup extends VisibilityFlags {
  description: string;
  id: string;
  label: string;
  skills: string[];
  tone?: "default" | "inverse";
}

export interface Education extends VisibilityFlags {
  degree: string;
  focus: string;
  institution: string;
  period: string;
}

export interface Certification extends VisibilityFlags {
  issuer: string;
  label: string;
  note?: string;
  year?: string;
}

export interface Language {
  label: string;
  proficiency: string;
}

export interface Achievement {
  description: string;
  id: string;
  label: string;
}

export interface Place extends VisibilityFlags {
  city?: string;
  country: string;
  label: string;
  mapX: number;
  mapY: number;
  note: string;
  sequence: number;
}

export interface Testimonial extends VisibilityFlags {
  company?: string;
  image?: ProjectImage;
  name: string;
  profileUrl?: string;
  quote: string;
  relationship?: string;
  role?: string;
}

export interface CommunityMember extends VisibilityFlags {
  image?: ProjectImage;
  name: string;
  note: string;
  profileUrl?: string;
  relationship: string;
}

export interface SocialLink extends VisibilityFlags {
  id:
    | "behance"
    | "blog"
    | "dribbble"
    | "email"
    | "github"
    | "instagram"
    | "stackoverflow"
    | "x"
    | "youtube";
  label: string;
  url: string;
}
