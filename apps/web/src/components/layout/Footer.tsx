import Link from "next/link";

import { SocialLinksList } from "@/components/ui/SocialLinksList";
import { getCurrentYear } from "@/lib/utils";
import type { Profile, SocialLink as SocialLinkType } from "@/types/portfolio";

export function Footer({
  email,
  profile,
  socialLinks
}: {
  email: string;
  profile: Profile;
  socialLinks: SocialLinkType[];
}) {
  return (
    <footer className="border-t border-[var(--color-border)]">
      <div className="mx-auto grid max-w-[90rem] gap-8 px-4 py-10 sm:px-6 lg:grid-cols-[1.2fr_0.8fr] lg:px-10">
        <div className="space-y-5">
          <p className="font-display text-[clamp(1.3rem,3vw,2.2rem)] uppercase leading-none tracking-[-0.05em]">
            {profile.name}
          </p>
          <p className="max-w-2xl text-sm leading-7 text-[var(--color-muted-strong)]">
            {profile.positioningStatement}
          </p>
          <SocialLinksList links={socialLinks} subtle />
        </div>
        <div className="grid gap-3 text-sm text-[var(--color-muted-strong)] lg:justify-self-end">
          <a className="hover:text-[var(--color-foreground)]" href={`mailto:${email}`}>
            {email}
          </a>
          <Link className="hover:text-[var(--color-foreground)]" href="/privacy">
            Privacy
          </Link>
          <Link className="hover:text-[var(--color-foreground)]" href="/impressum">
            Impressum
          </Link>
          <a className="hover:text-[var(--color-foreground)]" href="/#home">
            Back to top
          </a>
          <p>Built with Next.js and TypeScript.</p>
          <p>&copy; {getCurrentYear()} Usman Ghani</p>
        </div>
      </div>
    </footer>
  );
}
