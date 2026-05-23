import { type HTMLAttributes } from "react";
import { cn } from "@/lib/utils";

type SectionProps = HTMLAttributes<HTMLElement> & {
  spacing?: "default" | "tight" | "loose";
  tone?: "default" | "muted" | "ink" | "navy";
};

const spacings = {
  tight: "py-14 sm:py-20",
  default: "py-20 sm:py-28 lg:py-32",
  loose: "py-28 sm:py-36 lg:py-44",
} as const;

const tones = {
  default: "bg-cream-50 text-ink-900",
  muted: "bg-cream-100 text-ink-900",
  ink: "bg-ink-900 text-cream-50",
  navy: "bg-navy-900 text-cream-50",
} as const;

export function Section({
  className,
  spacing = "default",
  tone = "default",
  ...props
}: SectionProps) {
  return (
    <section
      className={cn("relative scroll-mt-header", spacings[spacing], tones[tone], className)}
      {...props}
    />
  );
}
