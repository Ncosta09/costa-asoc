"use client";

import { useEffect, useRef } from "react";
import type { ReactNode } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

type RevealProps = {
  children: ReactNode;
  /** Extra delay, mapped to a small start offset so staggered items don't move in lockstep. */
  delay?: number;
  y?: number;
  className?: string;
};

export function Reveal({ children, delay = 0, y = 24, className }: RevealProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) {
      gsap.set(el, { opacity: 1, y: 0 });
      return;
    }

    // Items that come "later" in a stagger start a touch lower in the viewport,
    // so the cascade reads naturally as you scroll.
    const startPct = 90 - Math.min(delay, 0.3) * 30;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        el,
        { opacity: 0, y },
        {
          opacity: 1,
          y: 0,
          ease: "power2.out",
          scrollTrigger: {
            trigger: el,
            start: `top ${startPct}%`,
            end: "top 62%",
            scrub: 1, // ties progress to scroll with ~1s of organic catch-up
          },
        },
      );
    }, ref);

    return () => ctx.revert();
  }, [y, delay]);

  return (
    <div ref={ref} className={className} style={{ opacity: 0 }}>
      {children}
    </div>
  );
}
