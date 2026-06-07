import { AnimatedNumber } from "@/components/motion/AnimatedNumber";
import { Reveal } from "@/components/motion/Reveal";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { getVisibleExperience, getYearsOfProfessionalExperience } from "@/lib/content";
import type { Experience, Place } from "@/types/portfolio";

export function AchievementsSection({
  experience,
  places
}: {
  experience: Experience[];
  places: Place[];
}) {
  const visibleExperience = getVisibleExperience(experience);
  const stats = [
    {
      description: "Years across professional technology roles",
      label: "Years in tech",
      suffix: "+",
      value: getYearsOfProfessionalExperience(visibleExperience)
    },
    {
      description: "Countries with professional or long-term living experience",
      label: "Countries",
      suffix: "",
      value: new Set(places.map((place) => place.country)).size
    },
    {
      description: "Major professional roles represented on the timeline",
      label: "Core roles",
      suffix: "",
      value: visibleExperience.length
    },
    {
      description: "Enterprise IT operations and frontend engineering",
      label: "Disciplines",
      suffix: "",
      value: 2
    }
  ];

  return (
    <Section>
      <SectionHeading
        description="Only defensible figures are counted here, using the structured content that powers the rest of the page."
        eyebrow="Achievements"
        number="08"
        title="Measured scope without vanity metrics"
      />
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {stats.map((stat) => (
          <Reveal key={stat.label}>
            <article className="rounded-[var(--radius-lg)] border border-[var(--color-border)] bg-[var(--color-surface)] p-5">
              <p className="text-[0.72rem] font-semibold uppercase tracking-[0.24em] text-[var(--color-muted)]">
                {stat.label}
              </p>
              <p className="mt-5 font-display text-[clamp(2.8rem,5vw,4.4rem)] leading-none tracking-[-0.06em] text-[var(--color-foreground)]">
                <AnimatedNumber suffix={stat.suffix} value={stat.value} />
              </p>
              <p className="mt-3 text-sm leading-7 text-[var(--color-muted-strong)]">
                {stat.description}
              </p>
            </article>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
