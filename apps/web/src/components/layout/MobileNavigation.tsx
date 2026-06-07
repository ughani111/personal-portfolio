"use client";

import Link from "next/link";
import { X } from "lucide-react";
import { useEffect, useRef, type RefObject } from "react";
import { AnimatePresence, m } from "motion/react";

import { Button } from "@/components/ui/Button";
import type { NavigationItem } from "@/types/portfolio";

export function MobileNavigation({
  items,
  onClose,
  open,
  triggerRef
}: {
  items: NavigationItem[];
  onClose: () => void;
  open: boolean;
  triggerRef: RefObject<HTMLButtonElement>;
}) {
  const firstLinkRef = useRef<HTMLAnchorElement>(null);

  useEffect(() => {
    if (!open) {
      return;
    }

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    window.addEventListener("keydown", onKeyDown);
    firstLinkRef.current?.focus();

    return () => {
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [onClose, open]);

  useEffect(() => {
    if (!open) {
      triggerRef.current?.focus();
    }
  }, [open, triggerRef]);

  return (
    <AnimatePresence>
      {open ? (
        <m.div
          animate={{ opacity: 1 }}
          className="fixed inset-0 z-[115] bg-black/30 backdrop-blur-sm md:hidden"
          exit={{ opacity: 0 }}
          initial={{ opacity: 0 }}
        >
          <m.aside
            animate={{ x: 0 }}
            className="ml-auto flex h-full w-[min(24rem,92vw)] flex-col border-l border-[var(--color-border-strong)] bg-[var(--color-background)] px-5 py-5"
            exit={{ x: "100%" }}
            initial={{ x: "100%" }}
            role="dialog"
            aria-modal="true"
            aria-label="Mobile navigation"
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="mb-8 flex items-center justify-between">
              <span className="font-display text-lg uppercase tracking-[0.18em]">
                Menu
              </span>
              <button
                aria-label="Close navigation menu"
                className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-[var(--color-border)]"
                onClick={onClose}
                type="button"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            <nav aria-label="Mobile navigation">
              <ul className="space-y-3">
                {items.map((item, index) => (
                  <li key={item.id}>
                    <Link
                      className="block rounded-2xl border border-[var(--color-border)] px-4 py-4 text-lg font-medium text-[var(--color-foreground)] transition hover:border-[var(--color-foreground)]"
                      href={item.href}
                      onClick={onClose}
                      ref={index === 0 ? firstLinkRef : undefined}
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
            <div className="mt-auto pt-8">
              <Button href="/#contact">Start a conversation</Button>
            </div>
          </m.aside>
        </m.div>
      ) : null}
    </AnimatePresence>
  );
}
