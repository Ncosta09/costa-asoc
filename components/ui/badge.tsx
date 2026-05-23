import type { HTMLAttributes } from "react";
import { cn } from "@/lib/utils";

type BadgeProps = HTMLAttributes<HTMLSpanElement> & {
  tone?: "navy" | "terra" | "neutral" | "outline";
};

const tones = {
  navy: "bg-navy-100 text-navy-900",
  terra: "bg-terra-100 text-terra-900",
  neutral: "bg-cream-200 text-ink-800",
  outline: "border border-cream-300 text-ink-700 bg-transparent",
} as const;

export function Badge({ className, tone = "outline", ...props }: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-medium tracking-[0.01em]",
        tones[tone],
        className,
      )}
      {...props}
    />
  );
}
