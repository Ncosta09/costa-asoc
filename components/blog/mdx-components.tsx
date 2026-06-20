import Link from "next/link";
import type { MDXComponents } from "mdx/types";
import type { ComponentPropsWithoutRef, ReactNode } from "react";

function Anchor({ href = "", children, ...rest }: ComponentPropsWithoutRef<"a">) {
  const isInternal = href.startsWith("/") || href.startsWith("#");
  const className =
    "font-medium text-terra-700 underline decoration-terra-700/30 underline-offset-2 transition-colors hover:decoration-terra-700";
  if (isInternal) {
    return (
      <Link href={href} className={className}>
        {children as ReactNode}
      </Link>
    );
  }
  return (
    <a href={href} target="_blank" rel="noopener noreferrer" className={className} {...rest}>
      {children as ReactNode}
    </a>
  );
}

export const mdxComponents: MDXComponents = {
  h2: (p) => (
    <h2
      className="mt-14 mb-4 scroll-mt-header font-display text-[1.6rem] leading-tight tracking-tight text-balance text-navy-900 sm:text-[2rem]"
      {...p}
    />
  ),
  h3: (p) => (
    <h3
      className="mt-10 mb-3 font-display text-[1.25rem] leading-tight tracking-tight text-navy-900 sm:text-[1.4rem]"
      {...p}
    />
  ),
  p: (p) => <p className="my-5 text-[17px] leading-relaxed text-ink-700" {...p} />,
  ul: (p) => <ul className="my-5 list-disc pl-5 marker:text-terra-700" {...p} />,
  ol: (p) => <ol className="my-5 list-decimal pl-5 marker:text-terra-700" {...p} />,
  li: (p) => <li className="mt-2.5 pl-1.5 text-[16.5px] leading-relaxed text-ink-700" {...p} />,
  a: Anchor,
  strong: (p) => <strong className="font-semibold text-ink-900" {...p} />,
  blockquote: (p) => (
    <blockquote
      className="my-7 border-l-2 border-terra-700/40 pl-5 text-[17px] italic leading-relaxed text-ink-800"
      {...p}
    />
  ),
  hr: () => <hr className="my-10 border-cream-300" />,
};
