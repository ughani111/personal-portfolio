import { ArrowUpRight } from "lucide-react";

import { Parallax } from "@/components/motion/Parallax";
import { Reveal } from "@/components/motion/Reveal";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { ResponsiveImage } from "@/components/ui/ResponsiveImage";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Tag } from "@/components/ui/Tag";
import { getVisibleProjects } from "@/lib/content";
import type { Project } from "@/types/portfolio";

export function ProjectsSection({ projects }: { projects: Project[] }) {
  const visibleProjects = getVisibleProjects(projects);

  return (
    <Section id="work">
      <SectionHeading
        description="These case studies stay intentionally high level where required, showing scope, technology, and working style without exposing private infrastructure or confidential client details."
        eyebrow="Selected Work"
        number="04"
        title="Case studies built for public clarity, not overstatement"
      />
      <div className="grid gap-8">
        {visibleProjects.map((project, index) => {
          const isReversed = index % 2 === 1;
          const image = project.images[0];

          return (
            <article
              className="grid gap-6 border-t border-[var(--color-border)] pt-8 lg:grid-cols-12 lg:items-center"
              key={project.slug}
            >
              <Reveal
                className={`lg:col-span-6 ${isReversed ? "lg:order-2" : ""}`}
              >
                <Parallax>
                  {image ? (
                    <ResponsiveImage
                      alt={image.alt}
                      className="aspect-[1.16] rounded-[2rem] border border-[var(--color-border)] bg-[var(--color-surface)]"
                      height={image.height}
                      sizes="(min-width: 1024px) 44vw, 100vw"
                      src={image.src}
                      width={image.width}
                    />
                  ) : null}
                </Parallax>
              </Reveal>
              <Reveal className={`lg:col-span-6 ${isReversed ? "lg:order-1" : ""}`}>
                <div className="space-y-5">
                  <div className="flex flex-wrap items-center gap-3">
                    <Badge>{project.category}</Badge>
                    {project.featured ? <Tag>Featured</Tag> : null}
                  </div>
                  <div>
                    <h3 className="font-display text-[clamp(2rem,4vw,3.6rem)] uppercase leading-[0.94] tracking-[-0.05em]">
                      {project.title}
                    </h3>
                    <p className="mt-4 max-w-xl text-base leading-8 text-[var(--color-muted-strong)]">
                      {project.shortDescription}
                    </p>
                  </div>
                  <div className="grid gap-4 text-sm leading-7 text-[var(--color-muted-strong)] md:grid-cols-3">
                    <div>
                      <p className="mb-1 text-[0.72rem] font-semibold uppercase tracking-[0.24em] text-[var(--color-muted)]">
                        Challenge
                      </p>
                      <p>{project.challenge}</p>
                    </div>
                    <div>
                      <p className="mb-1 text-[0.72rem] font-semibold uppercase tracking-[0.24em] text-[var(--color-muted)]">
                        Approach
                      </p>
                      <p>{project.approach}</p>
                    </div>
                    <div>
                      <p className="mb-1 text-[0.72rem] font-semibold uppercase tracking-[0.24em] text-[var(--color-muted)]">
                        Outcome
                      </p>
                      <p>{project.outcome}</p>
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {project.technologies.map((technology) => (
                      <Tag key={technology}>{technology}</Tag>
                    ))}
                  </div>
                  <ul className="grid gap-3 md:grid-cols-2">
                    {project.responsibilities.map((responsibility) => (
                      <li
                        className="border-t border-[var(--color-border)] pt-3 text-sm leading-6 text-[var(--color-muted-strong)]"
                        key={responsibility}
                      >
                        {responsibility}
                      </li>
                    ))}
                  </ul>
                  {project.externalUrl ? (
                    <Button
                      href={project.externalUrl}
                      icon={<ArrowUpRight className="h-4 w-4" />}
                      variant="text"
                    >
                      View details
                    </Button>
                  ) : null}
                </div>
              </Reveal>
            </article>
          );
        })}
      </div>
    </Section>
  );
}
