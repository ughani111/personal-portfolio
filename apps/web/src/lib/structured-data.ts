import { getEnabledSocialLinks } from "@/lib/content";
import { absoluteUrl } from "@/lib/utils";
import type {
  Education,
  Profile,
  SkillGroup,
  SocialLink
} from "@/types/portfolio";

export function buildPersonStructuredData(
  profile: Profile,
  education: Education[],
  skills: SkillGroup[],
  socialLinks: SocialLink[]
) {
  return {
    "@context": "https://schema.org",
    "@id": absoluteUrl("/#person"),
    "@type": "Person",
    addressCountry: profile.location,
    alumniOf: education.map((entry) => ({
      "@type": "CollegeOrUniversity",
      name: entry.institution
    })),
    image: absoluteUrl(profile.imageSlots.hero.preferredSrc),
    jobTitle: profile.primaryTitle,
    knowsAbout: skills.flatMap((group) => group.skills.slice(0, 6)),
    name: profile.name,
    sameAs: getEnabledSocialLinks(socialLinks)
      .map((link) => link.url)
      .filter((url) => url.startsWith("http")),
    url: absoluteUrl("/")
  };
}

export function buildProfilePageStructuredData(profile: Profile) {
  return {
    "@context": "https://schema.org",
    "@type": "ProfilePage",
    dateCreated: "2026-06-06",
    dateModified: new Date().toISOString().slice(0, 10),
    description: profile.positioningStatement,
    mainEntity: {
      "@id": absoluteUrl("/#person")
    },
    name: `${profile.name} Portfolio`,
    url: absoluteUrl("/")
  };
}

export function buildWebsiteStructuredData(profile: Profile) {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    author: {
      "@type": "Person",
      name: profile.name
    },
    description: profile.positioningStatement,
    name: `${profile.name} Portfolio`,
    url: absoluteUrl("/")
  };
}
