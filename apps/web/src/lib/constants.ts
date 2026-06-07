export const sectionIds = {
  about: "about",
  contact: "contact",
  experience: "experience",
  home: "home",
  journey: "journey",
  skills: "skills",
  work: "work"
} as const;

export const siteTitle =
  "Usman Ghani | IT Administrator, Field Support Engineer & Frontend Developer";

export const defaultMetaDescription =
  "Portfolio of Usman Ghani, a Germany-based IT administrator, field support engineer, and frontend developer with international experience across enterprise IT, infrastructure, networking, and modern web development.";

export const motionTokens = {
  distance: {
    large: 42,
    medium: 28,
    small: 16
  },
  duration: {
    fast: 0.28,
    normal: 0.52,
    slow: 0.86
  },
  easing: {
    emphasized: [0.16, 1, 0.3, 1] as const,
    standard: [0.22, 1, 0.36, 1] as const
  },
  stagger: {
    normal: 0.1,
    tight: 0.06
  }
} as const;
