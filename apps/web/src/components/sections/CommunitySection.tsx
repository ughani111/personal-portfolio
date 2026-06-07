import { Reveal } from "@/components/motion/Reveal";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { getApprovedCommunityMembers } from "@/lib/content";
import type { CommunityMember } from "@/types/portfolio";

export function CommunitySection({
  members
}: {
  members: CommunityMember[];
}) {
  const approvedMembers = getApprovedCommunityMembers(members);

  if (approvedMembers.length === 0) {
    return null;
  }

  return (
    <Section>
      <SectionHeading
        eyebrow="People & Community"
        number="10"
        title="People and communities that shaped the path"
      />
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {approvedMembers.map((member) => (
          <Reveal key={member.name}>
            <article className="rounded-[var(--radius-lg)] border border-[var(--color-border)] bg-[var(--color-surface)] p-5">
              <h3 className="font-display text-2xl uppercase leading-none tracking-[-0.05em]">
                {member.name}
              </h3>
              <p className="mt-3 text-sm uppercase tracking-[0.22em] text-[var(--color-muted)]">
                {member.relationship}
              </p>
              <p className="mt-4 text-sm leading-7 text-[var(--color-muted-strong)]">
                {member.note}
              </p>
            </article>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
