import { Reveal } from "@/components/motion/Reveal";
import { Stagger } from "@/components/motion/Stagger";
import { Card } from "@/components/ui/Card";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Tag } from "@/components/ui/Tag";
import type { SkillGroup } from "@/types/portfolio";

export function SkillsSection({ skillGroups }: { skillGroups: SkillGroup[] }) {
  return (
    <Section id="skills">
      <SectionHeading
        description="Skills are grouped by operating context rather than inflated percentage bars. The final group is intentionally framed as current development, not claimed mastery."
        eyebrow="Skills"
        number="05"
        title="Evidence-based capability map"
      />
      <Stagger className="grid gap-4 lg:grid-cols-2">
        {skillGroups.map((group) => {
          const inverse = group.tone === "inverse";

          return (
            <Reveal key={group.id}>
              <Card
                className={
                  inverse
                    ? "h-full border-[var(--color-border-strong)] bg-[var(--color-foreground)] text-[var(--color-background)]"
                    : "h-full bg-[var(--color-background)]"
                }
              >
                <p
                  className={`text-[0.72rem] font-semibold uppercase tracking-[0.24em] ${
                    inverse ? "text-white/70" : "text-[var(--color-muted)]"
                  }`}
                >
                  {group.label}
                </p>
                <p
                  className={`mt-3 max-w-xl text-sm leading-7 ${
                    inverse ? "text-white/82" : "text-[var(--color-muted-strong)]"
                  }`}
                >
                  {group.description}
                </p>
                <div className="mt-5 flex flex-wrap gap-2">
                  {group.skills.map((skill) => (
                    <Tag inverse={inverse} key={skill}>
                      {skill}
                    </Tag>
                  ))}
                </div>
              </Card>
            </Reveal>
          );
        })}
      </Stagger>
    </Section>
  );
}
