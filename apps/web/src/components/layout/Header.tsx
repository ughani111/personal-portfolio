"use client";

import Link from "next/link";
import { Menu } from "lucide-react";
import { useEffect, useMemo, useRef, useState } from "react";

import { MobileNavigation } from "@/components/layout/MobileNavigation";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils";
import type { NavigationItem } from "@/types/portfolio";

function useActiveSection(sectionIds: string[]) {
  const [activeSection, setActiveSection] = useState(sectionIds[0] || "");

  useEffect(() => {
    const elements = sectionIds
      .map((id) => document.getElementById(id))
      .filter(Boolean) as HTMLElement[];

    if (elements.length === 0) {
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        const visibleEntry = entries
          .filter((entry) => entry.isIntersecting)
          .sort(
            (left, right) =>
              Math.abs(left.boundingClientRect.top) -
              Math.abs(right.boundingClientRect.top)
          )[0];

        if (visibleEntry?.target.id) {
          setActiveSection(visibleEntry.target.id);
        }
      },
      {
        rootMargin: "-42% 0px -42% 0px",
        threshold: [0.2, 0.5, 0.8]
      }
    );

    elements.forEach((element) => observer.observe(element));

    return () => {
      observer.disconnect();
    };
  }, [sectionIds]);

  return activeSection;
}

export function Header({
  items,
  name
}: {
  items: NavigationItem[];
  name: string;
}) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const sectionIds = useMemo(() => items.map((item) => item.id), [items]);
  const activeSection = useActiveSection(sectionIds);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 18);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <header
        className={cn(
          "sticky top-0 z-[110] border-b transition duration-300",
          scrolled
            ? "border-[var(--color-border)] bg-[color-mix(in_oklab,var(--color-background)_82%,white_18%)] backdrop-blur"
            : "border-transparent bg-transparent"
        )}
      >
        <div className="mx-auto flex max-w-[90rem] items-center justify-between gap-6 px-4 py-4 sm:px-6 lg:px-10">
          <Link
            className="font-display text-sm uppercase tracking-[0.26em] text-[var(--color-foreground)]"
            href="/#home"
          >
            {name}
          </Link>
          <nav aria-label="Primary navigation" className="hidden md:block">
            <ul className="flex items-center gap-2">
              {items.map((item) => {
                const isActive = item.id === activeSection;
                return (
                  <li key={item.id}>
                    <Link
                      aria-current={isActive ? "page" : undefined}
                      className={cn(
                        "inline-flex rounded-full px-4 py-2 text-sm font-medium transition",
                        isActive
                          ? "bg-[var(--color-foreground)] text-[var(--color-background)]"
                          : "text-[var(--color-muted-strong)] hover:text-[var(--color-foreground)]"
                      )}
                      href={item.href}
                    >
                      {item.label}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>
          <div className="hidden md:block">
            <Button href="/#contact" variant="secondary">
              Let&apos;s talk
            </Button>
          </div>
          <button
            aria-controls="mobile-navigation"
            aria-expanded={menuOpen}
            aria-label="Open navigation menu"
            className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-[var(--color-border)] md:hidden"
            onClick={() => setMenuOpen(true)}
            ref={triggerRef}
            type="button"
          >
            <Menu className="h-5 w-5" />
          </button>
        </div>
      </header>
      <MobileNavigation
        items={items}
        onClose={() => setMenuOpen(false)}
        open={menuOpen}
        triggerRef={triggerRef}
      />
    </>
  );
}
