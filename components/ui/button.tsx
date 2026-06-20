import Link from "next/link";
import {
  forwardRef,
  type AnchorHTMLAttributes,
  type ButtonHTMLAttributes,
  type ReactNode,
} from "react";
import { cn } from "@/lib/utils";

type Variant = "primary" | "secondary" | "ghost" | "navy";
type Size = "default" | "lg" | "sm";

const variants: Record<Variant, string> = {
  primary:
    "bg-terra-700 text-cream-50 hover:bg-terra-800 active:translate-y-px",
  secondary:
    "border border-navy-900 text-navy-900 hover:bg-navy-900 hover:text-cream-50 active:translate-y-px",
  ghost:
    "text-navy-900 hover:bg-navy-100/60 active:translate-y-px",
  navy:
    "bg-navy-900 text-cream-50 hover:bg-navy-800 active:translate-y-px",
};

const sizes: Record<Size, string> = {
  sm: "h-9 px-4 text-sm",
  default: "h-11 px-6 text-[15px]",
  lg: "h-12 px-7 text-base",
};

const base =
  "inline-flex items-center justify-center gap-2 rounded-md font-medium tracking-[-0.005em] transition-[background-color,color,transform,box-shadow] duration-200 ease-[var(--ease-out-soft)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-cream-50 focus-visible:ring-navy-900 disabled:opacity-60 disabled:pointer-events-none whitespace-nowrap";

type CommonProps = {
  variant?: Variant;
  size?: Size;
  children: ReactNode;
  className?: string;
};

type ButtonAsButton = CommonProps &
  Omit<ButtonHTMLAttributes<HTMLButtonElement>, keyof CommonProps> & {
    href?: undefined;
  };

type ButtonAsLink = CommonProps &
  Omit<AnchorHTMLAttributes<HTMLAnchorElement>, keyof CommonProps> & {
    href: string;
    external?: boolean;
  };

export type ButtonProps = ButtonAsButton | ButtonAsLink;

export const Button = forwardRef<HTMLButtonElement | HTMLAnchorElement, ButtonProps>(
  function Button(props, ref) {
    const { variant = "primary", size = "default", className, children, ...rest } = props;
    const classes = cn(base, variants[variant], sizes[size], className);

    if ("href" in rest && rest.href !== undefined) {
      const { href, external, ...anchorProps } = rest;
      const isExternal = external ?? /^https?:\/\//.test(href);
      if (isExternal) {
        return (
          <a
            ref={ref as React.Ref<HTMLAnchorElement>}
            href={href}
            className={classes}
            target="_blank"
            rel="noopener noreferrer"
            {...anchorProps}
          >
            {children}
          </a>
        );
      }
      return (
        <Link
          ref={ref as React.Ref<HTMLAnchorElement>}
          href={href}
          className={classes}
          {...anchorProps}
        >
          {children}
        </Link>
      );
    }

    return (
      <button ref={ref as React.Ref<HTMLButtonElement>} className={classes} {...(rest as ButtonHTMLAttributes<HTMLButtonElement>)}>
        {children}
      </button>
    );
  },
);
