"use client";

import { motion, useReducedMotion } from "motion/react";
import type { ReactNode } from "react";

type ServiceCardProps = {
  icon: ReactNode;
  title: string;
  description: string;
};

export function ServiceCard({ icon, title, description }: ServiceCardProps) {
  const reduce = useReducedMotion();

  return (
    <motion.article
      whileHover={reduce ? undefined : { y: -8 }}
      transition={{ type: "spring", stiffness: 170, damping: 20, mass: 1 }}
      className="group relative flex h-full flex-col rounded-2xl border border-cream-200 bg-cream-100/60 p-7 shadow-[var(--shadow-card)] transition-[box-shadow,border-color,background-color] duration-[600ms] ease-[cubic-bezier(0.22,0.61,0.36,1)] [@media(hover:hover)]:hover:border-navy-200/70 [@media(hover:hover)]:hover:bg-cream-50 [@media(hover:hover)]:hover:shadow-[var(--shadow-elevated)] sm:p-8"
    >
      <span className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-navy-100 text-navy-900 transition-colors duration-[600ms] ease-[cubic-bezier(0.22,0.61,0.36,1)] group-hover:bg-terra-100 group-hover:text-terra-700">
        {icon}
      </span>
      <h3 className="mt-6 font-display text-[1.3rem] leading-tight tracking-tight text-navy-900">
        {title}
      </h3>
      <p className="mt-2.5 text-[14.5px] leading-relaxed text-ink-700">
        {description}
      </p>
    </motion.article>
  );
}
