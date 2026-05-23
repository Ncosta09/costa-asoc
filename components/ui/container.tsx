import { type HTMLAttributes } from "react";
import { cn } from "@/lib/utils";

type ContainerProps = HTMLAttributes<HTMLDivElement> & {
  size?: "default" | "narrow" | "wide";
};

const sizes = {
  narrow: "max-w-[64rem]",
  default: "max-w-[80rem]",
  wide: "max-w-[88rem]",
} as const;

export function Container({ className, size = "default", ...props }: ContainerProps) {
  return (
    <div
      className={cn("mx-auto w-full px-5 sm:px-6 lg:px-10", sizes[size], className)}
      {...props}
    />
  );
}
