export function SkipLink() {
  return (
    <a
      className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[120] focus:rounded-full focus:bg-[var(--color-foreground)] focus:px-4 focus:py-3 focus:text-sm focus:font-semibold focus:text-[var(--color-background)]"
      href="#main-content"
    >
      Skip to content
    </a>
  );
}
