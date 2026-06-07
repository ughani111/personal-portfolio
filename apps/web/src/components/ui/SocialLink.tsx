import { ArrowUpRight } from "lucide-react";

import { cn } from "@/lib/utils";

export function SocialLink({
  href,
  label,
  subtle = false
}: {
  href: string;
  label: string;
  subtle?: boolean;
}) {
  return (
    <a
      className={cn(
        "inline-flex min-h-11 items-center gap-2 rounded-full border px-4 py-2 text-sm font-medium transition duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-foreground)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--color-background)]",
        subtle
          ? "border-[var(--color-border)] bg-transparent text-[var(--color-muted-strong)] hover:border-[var(--color-foreground)] hover:text-[var(--color-foreground)]"
          : "border-[var(--color-border-strong)] bg-[var(--color-foreground)] text-[var(--color-background)] hover:-translate-y-0.5"
      )}
      href={href}
      rel={href.startsWith("http") ? "noreferrer" : undefined}
      target={href.startsWith("http") ? "_blank" : undefined}
    >
      <span>{label}</span>
      <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
    </a>
  );
}
