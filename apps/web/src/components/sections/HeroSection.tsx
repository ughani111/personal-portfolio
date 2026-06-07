"use client";

import { ArrowDown, Download, MapPin, MoveRight } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { m, useReducedMotion } from "motion/react";

import { DotGrid } from "@/components/decorative/DotGrid";
import { DoodleArrow } from "@/components/decorative/DoodleArrow";
import { MagneticButton } from "@/components/motion/MagneticButton";
import { Reveal } from "@/components/motion/Reveal";
import { TextReveal } from "@/components/motion/TextReveal";
import { Button } from "@/components/ui/Button";
import { ResponsiveImage } from "@/components/ui/ResponsiveImage";
import { SocialLinksList } from "@/components/ui/SocialLinksList";
import { Tag } from "@/components/ui/Tag";
import type { Profile, SocialLink as SocialLinkType } from "@/types/portfolio";

export function HeroSection({
  profile,
  resumeHref,
  socialLinks
}: {
  profile: Profile;
  resumeHref: string | null;
  socialLinks: SocialLinkType[];
}) {
  const prefersReducedMotion = useReducedMotion();
  const [descriptorIndex, setDescriptorIndex] = useState(0);
  const [glowPosition, setGlowPosition] = useState({ x: 52, y: 42 });
  const descriptorsText = useMemo(
    () => profile.descriptorRotator.join(", "),
    [profile.descriptorRotator]
  );

  useEffect(() => {
    if (prefersReducedMotion || profile.descriptorRotator.length < 2) {
      return;
    }

    const interval = window.setInterval(() => {
      setDescriptorIndex((current) => (current + 1) % profile.descriptorRotator.length);
    }, 2600);

    return () => window.clearInterval(interval);
  }, [prefersReducedMotion, profile.descriptorRotator]);

  const currentDescriptor =
    profile.descriptorRotator[
      Math.min(descriptorIndex, profile.descriptorRotator.length - 1)
    ] || profile.primaryTitle;

  return (
    <section className="section-shell !pt-10 lg:!pt-14" id="home">
      <div className="mx-auto grid max-w-[90rem] gap-10 px-4 sm:px-6 lg:grid-cols-12 lg:items-center lg:px-10">
        <div className="relative z-[2] lg:col-span-7">
          <Reveal>
            <Tag>{profile.heroEyebrow}</Tag>
          </Reveal>
          <div className="mt-6 space-y-5">
            <TextReveal>
              <p className="text-sm uppercase tracking-[0.3em] text-[var(--color-muted)]">
                {profile.heroIntro}
              </p>
            </TextReveal>
            <TextReveal>
              <h1 className="font-display text-[clamp(3.2rem,10vw,8rem)] uppercase leading-[0.92] tracking-[-0.07em] text-[var(--color-foreground)]">
                {profile.name}.
              </h1>
            </TextReveal>
            <Reveal>
              <div className="flex flex-wrap items-center gap-3">
                <span className="text-lg font-medium text-[var(--color-muted-strong)]">
                  {profile.primaryTitle}
                </span>
                <span
                  aria-hidden="true"
                  className="inline-flex min-w-[15rem] rounded-full bg-[var(--color-foreground)] px-4 py-2 text-sm font-medium text-[var(--color-background)]"
                >
                  <m.span
                    animate={{ opacity: 1, y: 0 }}
                    initial={{ opacity: prefersReducedMotion ? 1 : 0, y: prefersReducedMotion ? 0 : 8 }}
                    key={currentDescriptor}
                    transition={{ duration: 0.28 }}
                  >
                    {currentDescriptor}
                  </m.span>
                </span>
                <span className="sr-only">{descriptorsText}</span>
              </div>
            </Reveal>
            <Reveal>
              <p className="max-w-2xl text-base leading-8 text-[var(--color-muted-strong)] md:text-lg">
                {profile.heroDescription}
              </p>
            </Reveal>
          </div>
          <Reveal className="mt-8 flex flex-wrap items-center gap-4">
            <MagneticButton>
              <Button href="/#work" icon={<MoveRight className="h-4 w-4" />} variant="primary">
                Explore my work
              </Button>
            </MagneticButton>
            {resumeHref ? (
              <Button
                href={resumeHref}
                icon={<Download className="h-4 w-4" />}
                variant="secondary"
              >
                Download resume
              </Button>
            ) : (
              <Button disabled icon={<Download className="h-4 w-4" />} variant="secondary">
                Resume coming soon
              </Button>
            )}
            <Button href="/#contact" variant="text">
              Let&apos;s talk
            </Button>
          </Reveal>
          <Reveal className="mt-8 grid gap-4 sm:grid-cols-2">
            <div className="rounded-[var(--radius-lg)] border border-[var(--color-border)] bg-[var(--color-surface)] p-4">
              <p className="mb-2 text-[0.7rem] font-semibold uppercase tracking-[0.24em] text-[var(--color-muted)]">
                Current location
              </p>
              <div className="flex items-center gap-2 text-sm font-medium text-[var(--color-foreground)]">
                <MapPin className="h-4 w-4" aria-hidden="true" />
                <span>{profile.location}</span>
              </div>
            </div>
            <div className="rounded-[var(--radius-lg)] border border-[var(--color-border)] bg-[var(--color-surface)] p-4">
              <p className="mb-2 text-[0.7rem] font-semibold uppercase tracking-[0.24em] text-[var(--color-muted)]">
                Availability
              </p>
              <p className="text-sm leading-6 text-[var(--color-muted-strong)]">
                {profile.availability}
              </p>
            </div>
          </Reveal>
          <Reveal className="mt-8">
            <SocialLinksList links={socialLinks} subtle />
          </Reveal>
          <a
            className="mt-10 inline-flex items-center gap-3 text-sm font-medium text-[var(--color-muted-strong)]"
            href="/#about"
          >
            <span>Scroll into the story</span>
            <span className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-[var(--color-border)]">
              <ArrowDown className="h-4 w-4" aria-hidden="true" />
            </span>
          </a>
        </div>
        <div
          className="relative lg:col-span-5"
          onMouseMove={(event) => {
            if (prefersReducedMotion || !window.matchMedia("(pointer: fine)").matches) {
              return;
            }

            const bounds = event.currentTarget.getBoundingClientRect();
            setGlowPosition({
              x: ((event.clientX - bounds.left) / bounds.width) * 100,
              y: ((event.clientY - bounds.top) / bounds.height) * 100
            });
          }}
        >
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-x-[6%] top-[6%] h-[80%] rounded-full blur-3xl"
            style={{
              background:
                "radial-gradient(circle at var(--glow-x) var(--glow-y), rgba(14,165,233,0.32), rgba(249,115,22,0.22), transparent 68%)",
              ["--glow-x" as string]: `${glowPosition.x}%`,
              ["--glow-y" as string]: `${glowPosition.y}%`
            }}
          />
          <div aria-hidden="true" className="absolute -left-5 top-12 text-[var(--color-muted)]">
            <DotGrid className="h-16 w-16" />
          </div>
          <div aria-hidden="true" className="absolute -right-2 top-8 text-[var(--color-foreground)]">
            <DoodleArrow className="h-16 w-28 rotate-[8deg]" />
          </div>
          <Reveal>
            <div className="relative rounded-[2rem] border border-[var(--color-border)] bg-[var(--color-surface)] p-4 shadow-[var(--shadow-soft)]">
              <div className="absolute left-6 top-6 rounded-full border border-[var(--color-border)] bg-[var(--color-background)] px-4 py-2 text-[0.68rem] font-semibold uppercase tracking-[0.22em] text-[var(--color-muted)]">
                IT + frontend
              </div>
              <div className="absolute bottom-6 right-6 rounded-full bg-[var(--color-foreground)] px-4 py-2 text-[0.68rem] font-semibold uppercase tracking-[0.22em] text-[var(--color-background)]">
                Germany
              </div>
              <ResponsiveImage
                alt={profile.imageSlots.hero.alt}
                className="aspect-[0.82] rounded-[1.6rem] bg-[var(--color-muted-soft)]"
                height={profile.imageSlots.hero.height}
                priority={profile.imageSlots.hero.priority}
                sizes={profile.imageSlots.hero.sizes}
                src={profile.imageSlots.hero.preferredSrc}
                width={profile.imageSlots.hero.width}
              />
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
