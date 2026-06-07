import { Code2, Network, ShieldCheck, Wrench } from "lucide-react";

import { Reveal } from "@/components/motion/Reveal";
import { Stagger } from "@/components/motion/Stagger";
import { Card } from "@/components/ui/Card";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import type { Expertise } from "@/types/portfolio";

const iconMap = {
  frontend: Code2,
  modernization: Wrench,
  networking: Network,
  operations: ShieldCheck
} as const;

export function ExpertiseSection({ expertise }: { expertise: Expertise[] }) {
  return (
    <Section>
      <SectionHeading
        description="Four areas that frame the work clearly: workplace operations, infrastructure troubleshooting, frontend implementation, and modernization support."
        eyebrow="Expertise"
        number="02"
        title="Capability areas that connect operations and engineering"
      />
      <Stagger className="grid gap-4 lg:grid-cols-2">
        {expertise.map((item, index) => {
          const Icon = iconMap[item.icon];
          const inverse = index % 2 === 0;

          return (
            <Reveal key={item.id}>
              <Card
                className={
                  inverse
                    ? "group min-h-[18rem] border-[var(--color-border-strong)] bg-[var(--color-foreground)] text-[var(--color-background)] transition duration-300 hover:-translate-y-1"
                    : "group min-h-[18rem] bg-[var(--color-background)] transition duration-300 hover:-translate-y-1 hover:border-[var(--color-border-strong)]"
                }
              >
                <div className="flex h-full flex-col justify-between gap-8">
                  <div className="flex items-start justify-between gap-4">
                    <span className="text-[0.72rem] font-semibold uppercase tracking-[0.24em] opacity-70">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <Icon className="h-6 w-6 transition duration-300 group-hover:translate-x-1 group-hover:-translate-y-1" />
                  </div>
                  <div>
                    <h3 className="font-display text-[clamp(1.7rem,4vw,3rem)] uppercase leading-[0.92] tracking-[-0.05em]">
                      {item.label}
                    </h3>
                    <p className="mt-4 max-w-xl text-base leading-7 opacity-80">
                      {item.description}
                    </p>
                  </div>
                </div>
              </Card>
            </Reveal>
          );
        })}
      </Stagger>
    </Section>
  );
}
