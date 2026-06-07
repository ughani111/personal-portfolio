import { getEnabledSocialLinks } from "@/lib/content";
import type { SocialLink as SocialLinkType } from "@/types/portfolio";

import { SocialLink } from "./SocialLink";

export function SocialLinksList({
  links,
  subtle = false
}: {
  links: SocialLinkType[];
  subtle?: boolean;
}) {
  const visibleLinks = getEnabledSocialLinks(links);

  if (visibleLinks.length === 0) {
    return null;
  }

  return (
    <div className="flex flex-wrap gap-3">
      {visibleLinks.map((link) => (
        <SocialLink href={link.url} key={link.id} label={link.label} subtle={subtle} />
      ))}
    </div>
  );
}
