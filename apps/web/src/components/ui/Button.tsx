import Link from "next/link";
import type { ButtonHTMLAttributes, ReactNode } from "react";

import { cn } from "@/lib/utils";

type SharedProps = {
  children: ReactNode;
  className?: string;
  icon?: ReactNode;
  variant?: "ghost" | "primary" | "secondary" | "text";
};

type ButtonProps =
  | (SharedProps & {
      href: string;
      target?: string;
    })
  | (SharedProps & ButtonHTMLAttributes<HTMLButtonElement>);

const variantClasses = {
  ghost:
    "border-transparent bg-transparent text-[var(--color-foreground)] hover:border-[var(--color-border)] hover:bg-[var(--color-surface)]",
  primary:
    "border-[var(--color-foreground)] bg-[var(--color-foreground)] text-[var(--color-background)] hover:-translate-y-0.5 hover:shadow-[var(--shadow-soft)]",
  secondary:
    "border-[var(--color-border-strong)] bg-[var(--color-background)] text-[var(--color-foreground)] hover:-translate-y-0.5 hover:bg-[var(--color-surface)]",
  text: "border-transparent bg-transparent px-0 text-[var(--color-foreground)] underline decoration-[0.09em] underline-offset-4 hover:decoration-[0.16em]"
} as const;

const baseClasses =
  "inline-flex min-h-11 items-center justify-center gap-2 rounded-full border px-5 py-3 text-sm font-semibold tracking-[0.03em] transition duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-foreground)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--color-background)] disabled:pointer-events-none disabled:opacity-45";

export function Button(props: ButtonProps) {
  const variant = props.variant || "primary";
  const classes = cn(baseClasses, variantClasses[variant], props.className);

  if ("href" in props) {
    return (
      <Link
        className={classes}
        href={props.href}
        target={props.target}
        rel={props.target === "_blank" ? "noreferrer" : undefined}
      >
        <span>{props.children}</span>
        {props.icon ? <span aria-hidden="true">{props.icon}</span> : null}
      </Link>
    );
  }

  const { children, icon, variant: _variant, ...buttonProps } = props;

  return (
    <button className={classes} {...buttonProps}>
      <span>{children}</span>
      {icon ? <span aria-hidden="true">{icon}</span> : null}
    </button>
  );
}
