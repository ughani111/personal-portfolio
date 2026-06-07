import { ArrowUpRight } from "lucide-react";

import { Reveal } from "@/components/motion/Reveal";
import { Stagger } from "@/components/motion/Stagger";
import { Badge } from "@/components/ui/Badge";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import type { Experience } from "@/types/portfolio";

export function ExperienceSection({ experience }: { experience: Experience[] }) {
  return (
    <Section id="experience">
      <SectionHeading
        description="A timeline across enterprise IT support, field engineering, and frontend delivery, with the current role carrying the strongest operational emphasis."
        eyebrow="Experience"
        number="03"
        title="Professional roles across enterprise support and frontend delivery"
      />
      <Stagger className="relative pl-5 before:absolute before:left-[0.35rem] before:top-2 before:h-[calc(100%-1rem)] before:w-px before:bg-[var(--color-border)]">
        <div className="grid gap-4">
          {experience.map((role) => (
            <Reveal key={`${role.companyDisplay}-${role.period.label}`}>
              <article
                className={`grid gap-5 rounded-[var(--radius-lg)] border p-5 transition duration-300 lg:grid-cols-[13rem_1fr] ${
                  role.current
                    ? "border-[var(--color-border-strong)] bg-[var(--color-foreground)] text-[var(--color-background)]"
                    : "border-[var(--color-border)] bg-[var(--color-background)]"
                }`}
              >
                <div className="relative">
                  <span
                    aria-hidden="true"
                    className={`absolute -left-[1.53rem] top-3 h-3 w-3 rounded-full border-2 ${
                      role.current
                        ? "border-[var(--color-background)] bg-[var(--color-foreground)]"
                        : "border-[var(--color-background)] bg-[var(--color-foreground)]"
                    }`}
                  />
                  <p className="text-[0.72rem] font-semibold uppercase tracking-[0.24em] opacity-70">
                    {role.period.label}
                  </p>
                  <p className="mt-2 text-sm opacity-80">{role.location}</p>
                  {role.current ? <Badge className="mt-4">Current role</Badge> : null}
                </div>
                <div>
                  <div className="flex flex-wrap items-start justify-between gap-4">
                    <div>
                      <h3 className="font-display text-3xl uppercase leading-none tracking-[-0.04em]">
                        {role.title}
                      </h3>
                      <p className="mt-2 text-sm opacity-80">{role.companyDisplay}</p>
                    </div>
                    <ArrowUpRight className="h-5 w-5 opacity-60" aria-hidden="true" />
                  </div>
                  <ul className="mt-5 grid gap-3 md:grid-cols-2">
                    {role.responsibilities.map((responsibility) => (
                      <li
                        className={`border-t pt-3 text-sm leading-6 ${
                          role.current
                            ? "border-white/14 text-white/82"
                            : "border-[var(--color-border)] text-[var(--color-muted-strong)]"
                        }`}
                        key={responsibility}
                      >
                        {responsibility}
                      </li>
                    ))}
                  </ul>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </Stagger>
    </Section>
  );
}
