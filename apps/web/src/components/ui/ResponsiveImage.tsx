import Image from "next/image";

import { cn } from "@/lib/utils";

export function ResponsiveImage({
  alt,
  className,
  priority = false,
  sizes,
  src,
  width,
  height
}: {
  alt: string;
  className?: string;
  priority?: boolean;
  sizes: string;
  src: string;
  width: number;
  height: number;
}) {
  return (
    <div className={cn("image-frame relative overflow-hidden", className)}>
      <Image
        alt={alt}
        className="h-full w-full object-cover"
        height={height}
        priority={priority}
        sizes={sizes}
        src={src}
        width={width}
      />
    </div>
  );
}
