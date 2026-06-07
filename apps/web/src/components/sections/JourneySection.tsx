import { WorldJourneyIllustration } from "@/components/decorative/WorldJourneyIllustration";
import { Reveal } from "@/components/motion/Reveal";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { getVisibleExperience } from "@/lib/content";
import type { Experience, Place } from "@/types/portfolio";

export function JourneySection({
  experience,
  places,
  travelledPlaces
}: {
  experience: Experience[];
  places: Place[];
  travelledPlaces: Place[];
}) {
  const visiblePlaces = places.filter((place) => place.published !== false);
  const visibleExperience = getVisibleExperience(experience);

  return (
    <Section id="journey">
      <SectionHeading
        description="A verified journey across Pakistan, Malaysia, and Germany, shown with a stylized map and a readable text alternative."
        eyebrow="Journey"
        number="06"
        title="International work shaped by real places and roles"
      />
      <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-start">
        <Reveal className="rounded-[2rem] border border-[var(--color-border)] bg-[var(--color-surface)] p-6">
          <WorldJourneyIllustration places={visiblePlaces} />
          <p className="mt-5 text-sm leading-7 text-[var(--color-muted-strong)]">
            Verified lived or worked locations only. Travel-specific entries remain hidden
            until they are explicitly supplied.
          </p>
        </Reveal>
        <div className="grid gap-4">
          {visiblePlaces.map((place) => {
            const matchingRole = visibleExperience.find((role) =>
              role.location.includes(place.country)
            );

            return (
              <Reveal key={place.label}>
                <article className="rounded-[var(--radius-lg)] border border-[var(--color-border)] bg-[var(--color-background)] p-5">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <p className="text-[0.72rem] font-semibold uppercase tracking-[0.24em] text-[var(--color-muted)]">
                        Stop {String(place.sequence).padStart(2, "0")}
                      </p>
                      <h3 className="mt-2 font-display text-2xl uppercase leading-none tracking-[-0.05em]">
                        {place.label}
                      </h3>
                    </div>
                    <span className="rounded-full border border-[var(--color-border)] px-3 py-1 text-[0.72rem] font-semibold uppercase tracking-[0.24em] text-[var(--color-muted)]">
                      {place.country}
                    </span>
                  </div>
                  <p className="mt-4 text-sm leading-7 text-[var(--color-muted-strong)]">
                    {place.note}
                  </p>
                  {matchingRole ? (
                    <p className="mt-4 border-t border-[var(--color-border)] pt-4 text-sm text-[var(--color-muted)]">
                      Related role: {matchingRole.title}
                    </p>
                  ) : null}
                </article>
              </Reveal>
            );
          })}
          {travelledPlaces.length === 0 ? null : (
            <Reveal>
              <article className="rounded-[var(--radius-lg)] border border-dashed border-[var(--color-border)] p-5">
                <p className="text-sm text-[var(--color-muted-strong)]">
                  Additional travel entries are available when verified locations are added to
                  the content file.
                </p>
              </article>
            </Reveal>
          )}
        </div>
      </div>
    </Section>
  );
}
