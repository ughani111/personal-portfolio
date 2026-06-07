import { Section } from "@/components/ui/Section";
import { Tag } from "@/components/ui/Tag";

export function TechMarqueeSection({ items }: { items: string[] }) {
  const track = items.length > 0 ? items : ["Enterprise IT", "Networking", "Frontend"];

  return (
    <Section className="!py-8">
      <div className="rounded-full border border-[var(--color-border)] bg-[var(--color-foreground)] py-3 text-[var(--color-background)]">
        <div className="marquee-shell">
          <div aria-hidden="true" className="marquee-track">
            {[...track, ...track].map((item, index) => (
              <div className="flex items-center gap-4" key={`${item}-${index}`}>
                <span className="text-[0.75rem] uppercase tracking-[0.26em]">{item}</span>
                <span className="h-1.5 w-1.5 rounded-full bg-[var(--color-background)]/70" />
              </div>
            ))}
          </div>
          <div className="sr-only">
            <ul>
              {track.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>
      <div className="mt-5 flex flex-wrap gap-3 md:hidden">
        {track.slice(0, 8).map((item) => (
          <Tag key={item}>{item}</Tag>
        ))}
      </div>
    </Section>
  );
}
