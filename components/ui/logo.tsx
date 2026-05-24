import Image from "next/image";
import { cn } from "@/lib/utils";

import horizontalSrc from "@/public/logos/costa-horizontal.png";
import stackedSrc from "@/public/logos/costa-stacked.png";

type LogoProps = {
  variant?: "horizontal" | "stacked" | "responsive";
  className?: string;
  ariaLabel?: string;
  priority?: boolean;
};

export function Logo({
  variant = "responsive",
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

  if (variant === "horizontal") {
    return (
      <Image
        src={horizontalSrc}
        alt={ariaLabel}
        priority={priority}
        sizes="300px"
        placeholder="empty"
        className={cn("h-9 w-auto select-none", className)}
      />
    );
  }

  return (
    <>
      <Image
        src={stackedSrc}
        alt={ariaLabel}
        priority={priority}
        sizes="120px"
        placeholder="empty"
        className={cn("h-10 w-auto select-none lg:hidden", className)}
      />
      <Image
        src={horizontalSrc}
        alt={ariaLabel}
        priority={priority}
        sizes="300px"
        placeholder="empty"
        className={cn("hidden h-9 w-auto select-none lg:block", className)}
      />
    </>
  );
}
