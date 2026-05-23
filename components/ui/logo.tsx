import Image from "next/image";
import { cn } from "@/lib/utils";

import horizontalSrc from "@/public/logos/costa-horizontal.png";
import stackedSrc from "@/public/logos/costa-stacked.png";

type LogoProps = {
  variant?: "horizontal" | "stacked";
  className?: string;
  ariaLabel?: string;
  priority?: boolean;
};

export function Logo({
  variant = "horizontal",
  className,
  ariaLabel = "Costa & Asociados",
  priority = false,
}: LogoProps) {
  if (variant === "stacked") {
    return (
      <Image
        src={stackedSrc}
        alt={ariaLabel}
        priority={priority}
        sizes="280px"
        placeholder="empty"
        className={cn("h-auto w-[220px] select-none", className)}
      />
    );
  }

  return (
    <Image
      src={horizontalSrc}
      alt={ariaLabel}
      priority={priority}
      sizes="300px"
      placeholder="empty"
      className={cn("h-6 w-auto select-none sm:h-7", className)}
    />
  );
}
