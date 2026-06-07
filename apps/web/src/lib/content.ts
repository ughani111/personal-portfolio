import type {
  CommunityMember,
  Experience,
  Project,
  SocialLink,
  Testimonial
} from "@/types/portfolio";

type Publishable = {
  confidential?: boolean;
  draft?: boolean;
  published?: boolean;
};

type ConsentAware = {
  consentGiven?: boolean;
};

export function isVisibleEntry<T extends Publishable>(entry: T) {
  return entry.published !== false && !entry.draft && !entry.confidential;
}

export function getVisibleProjects(projects: Project[]) {
  return projects.filter(isVisibleEntry);
}

export function getVisibleExperience(experience: Experience[]) {
  return experience.filter(isVisibleEntry);
}

export function getApprovedTestimonials(testimonials: Testimonial[]) {
  return testimonials.filter(
    (testimonial) => isVisibleEntry(testimonial) && testimonial.consentGiven
  );
}

export function getApprovedCommunityMembers(members: CommunityMember[]) {
  return members.filter(
    (member) => isVisibleEntry(member) && member.consentGiven
  );
}

export function getEnabledSocialLinks(socialLinks: SocialLink[]) {
  return socialLinks.filter(
    (link) => link.enabled && link.url.trim().length > 0
  );
}

export function hasApprovedEntries<T extends ConsentAware & Publishable>(
  entries: T[]
) {
  return entries.some((entry) =>
    "consentGiven" in entry
      ? Boolean(entry.consentGiven) && isVisibleEntry(entry)
      : isVisibleEntry(entry)
  );
}

export function getYearsOfProfessionalExperience(experience: Experience[]) {
  const visibleExperience = getVisibleExperience(experience);

  if (visibleExperience.length === 0) {
    return 0;
  }

  const earliestStart = visibleExperience
    .map((role) => new Date(`${role.period.start}-01T00:00:00Z`).getTime())
    .sort((left, right) => left - right)[0];

  if (typeof earliestStart === "undefined") {
    return 0;
  }

  const diffInYears =
    (Date.now() - earliestStart) / (1000 * 60 * 60 * 24 * 365.25);

  return Math.max(1, Math.floor(diffInYears));
}
