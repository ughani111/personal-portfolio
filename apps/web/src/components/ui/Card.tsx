import type { ComponentPropsWithoutRef, ElementType, ReactNode } from "react";

import { cn } from "@/lib/utils";

type CardProps<T extends ElementType> = {
  as?: T;
  children: ReactNode;
  className?: string;
} & Omit<ComponentPropsWithoutRef<T>, "as" | "children" | "className">;

export function Card<T extends ElementType = "article">({
  as,
  children,
  className,
  ...props
}: CardProps<T>) {
  const Component = as || "article";

  return (
    <Component
      className={cn(
        "rounded-[var(--radius-lg)] border border-[var(--color-border)] bg-[var(--color-background)] p-5 shadow-[var(--shadow-card)]",
        className
      )}
      {...props}
    >
      {children}
    </Component>
  );
}
