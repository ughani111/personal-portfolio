import type { ReactNode } from "react";

import { Button } from "@/components/ui/Button";

export function IconButton({
  children,
  href,
  icon
}: {
  children: string;
  href: string;
  icon: ReactNode;
}) {
  return (
    <Button href={href} icon={icon} variant="secondary">
      {children}
    </Button>
  );
}
