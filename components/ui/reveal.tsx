"use client";

import { useEffect, useLayoutEffect, useRef } from "react";
import type { ReactNode } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

// useLayoutEffect en cliente (oculta pre-paint, sin flash), useEffect en SSR (no-op sin warning).
const useIsomorphicLayoutEffect =
  typeof window !== "undefined" ? useLayoutEffect : useEffect;

type RevealProps = {
  children: ReactNode;
  /** Extra delay, mapped to a small start offset so staggered items don't move in lockstep. */
  delay?: number;
  y?: number;
  className?: string;
};

export function Reveal({ children, delay = 0, y = 24, className }: RevealProps) {
  const ref = useRef<HTMLDivElement>(null);

  useIsomorphicLayoutEffect(() => {
    const el = ref.current;
    if (!el) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    // Progressive enhancement: sin motion (o si el JS no llega hasta acá) el contenido
    // queda visible por defecto — nunca se sirve un opacity:0 inline en el HTML.
    if (reduce) return;

    // Recién ahora, sabiendo que el JS corre y va a animar, ocultamos (pre-paint → sin flash).
    gsap.set(el, { opacity: 0, y });

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

    // Red de seguridad: si el ScrollTrigger no revela el bloque (bundle a medio cargar,
    // render headless/preview sin scroll, screenshot "en frío"), forzamos la aparición
    // de lo que ya debería estar en viewport. El contenido below-the-fold conserva la
    // animación al scrollear; lo visible nunca queda en blanco.
    const safety = window.setTimeout(() => {
      const rect = el.getBoundingClientRect();
      const visibleish = rect.top < window.innerHeight && rect.bottom > 0;
      if (visibleish && Number(gsap.getProperty(el, "opacity")) < 1) {
        gsap.set(el, { opacity: 1, y: 0 });
      }
    }, 1500);

    return () => {
      window.clearTimeout(safety);
      ctx.revert();
    };
  }, [y, delay]);

  // Estado base sin opacity:0 → SSR, no-JS y bots ven el contenido siempre.
  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}
