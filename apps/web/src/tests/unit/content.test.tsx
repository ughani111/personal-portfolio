import { describe, expect, it } from "vitest";
import React from "react";
import { renderToStaticMarkup } from "react-dom/server";

import { CommunitySection } from "@/components/sections/CommunitySection";
import { TestimonialsSection } from "@/components/sections/TestimonialsSection";
import { SocialLinksList } from "@/components/ui/SocialLinksList";
import { communityMembers } from "@/content/community";
import { educationEntries } from "@/content/education";
import { experienceTimeline } from "@/content/experience";
import { profile } from "@/content/profile";
import { projects } from "@/content/projects";
import { skillGroups } from "@/content/skills";
import { socialLinks } from "@/content/social-links";
import { testimonials } from "@/content/testimonials";
import {
  getApprovedCommunityMembers,
  getEnabledSocialLinks,
  getVisibleProjects
} from "@/lib/content";
import { contactFormSchema } from "@/lib/contact";
import { buildPersonStructuredData } from "@/lib/structured-data";

describe("content filters", () => {
  it("excludes draft and confidential projects", () => {
    const visibleProjectTitles = getVisibleProjects(projects).map((project) => project.title);

    expect(visibleProjectTitles).not.toContain("Confidential Placeholder");
  });

  it("does not render disabled social links", () => {
    expect(getEnabledSocialLinks(socialLinks)).toHaveLength(0);
    expect(renderToStaticMarkup(<SocialLinksList links={socialLinks} />)).toBe("");
  });

  it("hides the testimonials section when no approved testimonials exist", () => {
    expect(testimonials).toHaveLength(0);
    expect(renderToStaticMarkup(<TestimonialsSection testimonials={testimonials} />)).toBe(
      ""
    );
  });

  it("requires consent for community members", () => {
    expect(getApprovedCommunityMembers(communityMembers)).toHaveLength(0);
    expect(renderToStaticMarkup(<CommunitySection members={communityMembers} />)).toBe("");
  });
});

describe("contact validation", () => {
  it("rejects invalid input and accepts valid input", () => {
    expect(
      contactFormSchema.safeParse({
        company: "",
        email: "not-an-email",
        message: "short",
        name: ""
      }).success
    ).toBe(false);

    expect(
      contactFormSchema.safeParse({
        company: "Example GmbH",
        consent: true,
        email: "hello@example.com",
        honeypot: "",
        inquiryType: "General inquiry",
        message:
          "Hello Usman, I would like to discuss a professional opportunity in Germany.",
        name: "Alex"
      }).success
    ).toBe(true);
  });
});

describe("structured data", () => {
  it("contains required known fields", () => {
    const schema = buildPersonStructuredData(profile, educationEntries, skillGroups, socialLinks);

    expect(schema["@type"]).toBe("Person");
    expect(schema.name).toBe("Usman Ghani");
    expect(schema.addressCountry).toBe("Germany");
    expect(schema.jobTitle).toBe(profile.primaryTitle);
    expect(schema.alumniOf[0]?.name).toBe(educationEntries[0]?.institution);
    expect(schema.knowsAbout.length).toBeGreaterThan(0);
  });

  it("keeps the visible experience timeline intact for statistics derivation", () => {
    expect(experienceTimeline).toHaveLength(5);
  });
});
