import { AboutSection } from "@/components/sections/AboutSection";
import { AchievementsSection } from "@/components/sections/AchievementsSection";
import { CommunitySection } from "@/components/sections/CommunitySection";
import { ContactSection } from "@/components/sections/ContactSection";
import { EducationSection } from "@/components/sections/EducationSection";
import { ExperienceSection } from "@/components/sections/ExperienceSection";
import { ExpertiseSection } from "@/components/sections/ExpertiseSection";
import { HeroSection } from "@/components/sections/HeroSection";
import { JourneySection } from "@/components/sections/JourneySection";
import { ProjectsSection } from "@/components/sections/ProjectsSection";
import { SkillsSection } from "@/components/sections/SkillsSection";
import { TechMarqueeSection } from "@/components/sections/TechMarqueeSection";
import { TestimonialsSection } from "@/components/sections/TestimonialsSection";
import { communityMembers } from "@/content/community";
import { educationEntries, languages } from "@/content/education";
import { experienceTimeline } from "@/content/experience";
import { expertiseAreas } from "@/content/expertise";
import { journeyPlaces, travelledPlaces } from "@/content/places";
import { profile } from "@/content/profile";
import { projects } from "@/content/projects";
import { skillGroups } from "@/content/skills";
import { socialLinks } from "@/content/social-links";
import { testimonials } from "@/content/testimonials";
import { getResumeHref, resolveImageSource } from "@/lib/assets";
import {
  buildPersonStructuredData,
  buildProfilePageStructuredData,
  buildWebsiteStructuredData
} from "@/lib/structured-data";

function safeJsonLd(value: unknown) {
  return JSON.stringify(value).replace(/</g, "\\u003c");
}

export default function HomePage() {
  const resolvedProfile = {
    ...profile,
    imageSlots: {
      about: {
        ...profile.imageSlots.about,
        preferredSrc: resolveImageSource(
          profile.imageSlots.about.preferredSrc,
          profile.imageSlots.about.fallbackSrc
        )
      },
      contact: {
        ...profile.imageSlots.contact,
        preferredSrc: resolveImageSource(
          profile.imageSlots.contact.preferredSrc,
          profile.imageSlots.contact.fallbackSrc
        )
      },
      hero: {
        ...profile.imageSlots.hero,
        preferredSrc: resolveImageSource(
          profile.imageSlots.hero.preferredSrc,
          profile.imageSlots.hero.fallbackSrc
        )
      }
    }
  };

  const resumeHref = getResumeHref(profile.resumePath);
  const marqueeItems = Array.from(
    new Set(
      skillGroups
        .flatMap((group) => group.skills.slice(0, group.id === "current-focus" ? 4 : 5))
        .slice(0, 18)
    )
  );

  const personSchema = buildPersonStructuredData(
    resolvedProfile,
    educationEntries,
    skillGroups,
    socialLinks
  );
  const profilePageSchema = buildProfilePageStructuredData(resolvedProfile);
  const websiteSchema = buildWebsiteStructuredData(resolvedProfile);

  return (
    <>
      <script
        dangerouslySetInnerHTML={{ __html: safeJsonLd(personSchema) }}
        id="person-structured-data"
        type="application/ld+json"
      />
      <script
        dangerouslySetInnerHTML={{ __html: safeJsonLd(profilePageSchema) }}
        id="profile-page-structured-data"
        type="application/ld+json"
      />
      <script
        dangerouslySetInnerHTML={{ __html: safeJsonLd(websiteSchema) }}
        id="website-structured-data"
        type="application/ld+json"
      />
      <main id="main-content">
        <HeroSection
          profile={resolvedProfile}
          resumeHref={resumeHref}
          socialLinks={socialLinks}
        />
        <TechMarqueeSection items={marqueeItems} />
        <AboutSection profile={resolvedProfile} />
        <ExpertiseSection expertise={expertiseAreas} />
        <ExperienceSection experience={experienceTimeline} />
        <ProjectsSection projects={projects} />
        <SkillsSection skillGroups={skillGroups} />
        <JourneySection
          experience={experienceTimeline}
          places={journeyPlaces}
          travelledPlaces={travelledPlaces}
        />
        <EducationSection education={educationEntries} languages={languages} />
        <AchievementsSection experience={experienceTimeline} places={journeyPlaces} />
        <TestimonialsSection testimonials={testimonials} />
        <CommunitySection members={communityMembers} />
        <ContactSection profile={resolvedProfile} />
      </main>
    </>
  );
}
