import { Reveal } from "@/components/motion/Reveal";
import { Card } from "@/components/ui/Card";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import type { Education, Language } from "@/types/portfolio";

export function EducationSection({
  education,
  languages
}: {
  education: Education[];
  languages: Language[];
}) {
  return (
    <Section>
      <SectionHeading
        description="Formal study is shown plainly, followed by languages in descriptive terms rather than animated proficiency meters."
        eyebrow="Education & Languages"
        number="07"
        title="Foundation in computer science, communication across cultures"
      />
      <div className="grid gap-4 lg:grid-cols-[0.9fr_1.1fr]">
        <Reveal>
          <Card className="h-full border-[var(--color-border-strong)] bg-[var(--color-foreground)] text-[var(--color-background)]">
            {education.map((entry) => (
              <div key={`${entry.institution}-${entry.degree}`}>
                <p className="text-[0.72rem] font-semibold uppercase tracking-[0.24em] text-white/70">
                  Education
                </p>
                <h3 className="mt-4 font-display text-[clamp(2rem,4vw,3.2rem)] uppercase leading-[0.94] tracking-[-0.05em]">
                  {entry.degree}
                </h3>
                <p className="mt-3 text-base leading-7 text-white/82">{entry.institution}</p>
                <p className="mt-2 text-sm uppercase tracking-[0.22em] text-white/68">
                  {entry.focus}
                </p>
                <p className="mt-8 border-t border-white/16 pt-4 text-sm text-white/72">
                  {entry.period}
                </p>
              </div>
            ))}
          </Card>
        </Reveal>
        <Reveal>
          <Card className="h-full">
            <p className="text-[0.72rem] font-semibold uppercase tracking-[0.24em] text-[var(--color-muted)]">
              Languages
            </p>
            <div className="mt-5 grid gap-4">
              {languages.map((language) => (
                <div
                  className="flex flex-col gap-1 border-t border-[var(--color-border)] pt-4 sm:flex-row sm:items-center sm:justify-between"
                  key={language.label}
                >
                  <span className="font-medium text-[var(--color-foreground)]">
                    {language.label}
                  </span>
                  <span className="text-sm text-[var(--color-muted-strong)]">
                    {language.proficiency}
                  </span>
                </div>
              ))}
            </div>
          </Card>
        </Reveal>
      </div>
    </Section>
  );
}
