"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { PrinciplesList } from "@/components/home/principles-list";

gsap.registerPlugin(ScrollTrigger);

export function Philosophy() {
  const gridRef = useRef<HTMLDivElement>(null);
  const leftRef = useRef<HTMLDivElement>(null);
  const rightRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const targets = [leftRef.current, rightRef.current].filter(Boolean);
    if (!gridRef.current || targets.length === 0) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) {
      gsap.set(targets, { opacity: 1, y: 0 });
      return;
    }

    const ctx = gsap.context(() => {
      // Single trigger on the grid → both columns reveal in perfect sync.
      gsap.fromTo(
        targets,
        { opacity: 0, y: 24 },
        {
          opacity: 1,
          y: 0,
          ease: "power2.out",
          scrollTrigger: {
            trigger: gridRef.current,
            start: "top 82%",
            end: "top 55%",
            scrub: 1,
          },
        },
      );
    }, gridRef);

    return () => ctx.revert();
  }, []);

  return (
    <Section tone="default" spacing="default">
      <Container>
        <div
          ref={gridRef}
          className="grid grid-cols-1 gap-14 lg:grid-cols-12 lg:gap-16"
        >
          <div className="lg:col-span-5 lg:sticky lg:top-24 lg:self-start">
            <div ref={leftRef} style={{ opacity: 0 }}>
              <p className="text-xs font-medium uppercase tracking-[0.18em] text-terra-700">
                Filosofía
              </p>
              <h2 className="mt-3 font-display text-[2rem] leading-[1.05] tracking-[-0.02em] text-balance text-navy-900 sm:text-[2.75rem]">
                Más que liquidar expensas. Administrar con criterio.
              </h2>
              <p className="mt-6 max-w-[48ch] text-[16px] leading-relaxed text-ink-700">
                Cada edificio tiene su propia dinámica, su consejo, su histórico contable.
                Trabajamos con la disciplina de un estudio profesional y el detalle de
                quien entiende que detrás de cada expensa hay un grupo de familias o una
                operación corporativa que depende del orden.
              </p>
            </div>
          </div>

          <div className="lg:col-span-7 lg:pl-8">
            <div ref={rightRef} style={{ opacity: 0 }}>
              <PrinciplesList />
            </div>
          </div>
        </div>
      </Container>
    </Section>
  );
}
