import { Reveal } from "@/components/motion/Reveal";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { getApprovedTestimonials } from "@/lib/content";
import type { Testimonial } from "@/types/portfolio";

export function TestimonialsSection({
  testimonials
}: {
  testimonials: Testimonial[];
}) {
  const approvedTestimonials = getApprovedTestimonials(testimonials);

  if (approvedTestimonials.length === 0) {
    return null;
  }

  return (
    <Section>
      <SectionHeading
        eyebrow="Testimonials"
        number="09"
        title="What trusted collaborators have said"
      />
      <div className="grid gap-4 lg:grid-cols-2">
        {approvedTestimonials.map((testimonial) => (
          <Reveal key={`${testimonial.name}-${testimonial.quote}`}>
            <blockquote className="rounded-[var(--radius-lg)] border border-[var(--color-border)] bg-[var(--color-background)] p-6">
              <p className="font-display text-3xl leading-tight tracking-[-0.04em]">
                &ldquo;{testimonial.quote}&rdquo;
              </p>
              <footer className="mt-5 text-sm text-[var(--color-muted-strong)]">
                {testimonial.name}
                {testimonial.role ? `, ${testimonial.role}` : ""}
                {testimonial.company ? `, ${testimonial.company}` : ""}
              </footer>
            </blockquote>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
