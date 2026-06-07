import { DotGrid } from "@/components/decorative/DotGrid";
import { Reveal } from "@/components/motion/Reveal";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ResponsiveImage } from "@/components/ui/ResponsiveImage";
import { Tag } from "@/components/ui/Tag";
import type { Profile } from "@/types/portfolio";

export function AboutSection({ profile }: { profile: Profile }) {
  return (
    <Section id="about">
      <SectionHeading
        description="A background shaped by enterprise workplace support, field operations, and frontend development across Germany, Malaysia, and Pakistan."
        eyebrow="About"
        number="01"
        title="Bridge work between people, systems, and products"
      />
      <div className="grid gap-8 lg:grid-cols-[0.88fr_1.12fr] lg:items-start">
        <Reveal className="relative">
          <div aria-hidden="true" className="absolute -left-4 -top-4 text-[var(--color-muted)]">
            <DotGrid className="h-20 w-20" />
          </div>
          <ResponsiveImage
            alt={profile.imageSlots.about.alt}
            className="aspect-[0.86] rounded-[2rem] border border-[var(--color-border)] bg-[var(--color-surface)]"
            height={profile.imageSlots.about.height}
            sizes={profile.imageSlots.about.sizes}
            src={profile.imageSlots.about.preferredSrc}
            width={profile.imageSlots.about.width}
          />
        </Reveal>
        <div className="grid gap-6">
          {profile.aboutParagraphs.map((paragraph) => (
            <Reveal key={paragraph}>
              <p className="text-base leading-8 text-[var(--color-muted-strong)] md:text-lg">
                {paragraph}
              </p>
            </Reveal>
          ))}
          <Reveal className="grid gap-4 sm:grid-cols-2">
            <article className="rounded-[var(--radius-lg)] border border-[var(--color-border)] bg-[var(--color-surface)] p-5">
              <p className="mb-2 text-[0.72rem] font-semibold uppercase tracking-[0.24em] text-[var(--color-muted)]">
                Operating lens
              </p>
              <h3 className="font-display text-2xl uppercase leading-none tracking-[-0.05em]">
                Reliable systems, usable interfaces
              </h3>
            </article>
            <article className="rounded-[var(--radius-lg)] border border-[var(--color-border-strong)] bg-[var(--color-foreground)] p-5 text-[var(--color-background)]">
              <p className="mb-2 text-[0.72rem] font-semibold uppercase tracking-[0.24em] text-[var(--color-background)]/70">
                International path
              </p>
              <div className="flex flex-wrap gap-2">
                <Tag inverse>Pakistan</Tag>
                <Tag inverse>Malaysia</Tag>
                <Tag inverse>Germany</Tag>
              </div>
            </article>
          </Reveal>
        </div>
      </div>
    </Section>
  );
}
