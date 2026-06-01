"use client";

import { useEffect, useRef, useState } from "react";
import { principles } from "@/content/philosophy";
import { cn } from "@/lib/utils";

export function PrinciplesList() {
  const [active, setActive] = useState(0);
  const itemRefs = useRef<Array<HTMLLIElement | null>>([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            const idx = Number((entry.target as HTMLElement).dataset.idx);
            setActive(idx);
          }
        }
      },
      // Only the item crossing the central band of the viewport counts as active
      { rootMargin: "-48% 0px -48% 0px", threshold: 0 },
    );

    itemRefs.current.forEach((el) => el && observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <ul className="flex flex-col gap-2">
      {principles.map((p, i) => {
        const isActive = i === active;
        return (
          <li
            key={p.title}
            data-idx={i}
            ref={(el) => {
              itemRefs.current[i] = el;
            }}
            className={cn(
              "group rounded-2xl border px-6 py-6 sm:px-8 sm:py-7",
              "transition-[transform,box-shadow,background-color,border-color,opacity] duration-[550ms] ease-[cubic-bezier(0.22,0.61,0.36,1)]",
              "motion-reduce:transform-none",
              isActive
                ? "border-cream-200 bg-cream-50 opacity-100 shadow-[var(--shadow-elevated)] lg:scale-[1.02]"
                : "border-transparent bg-transparent opacity-55 shadow-none lg:scale-100",
            )}
          >
            <div className="grid grid-cols-[auto_1fr] items-baseline gap-x-5 sm:gap-x-7">
              <span
                className={cn(
                  "font-display text-[1.6rem] tabular-nums leading-none tracking-tight transition-colors duration-[550ms]",
                  isActive ? "text-terra-700" : "text-ink-300",
                )}
              >
                {String(i + 1).padStart(2, "0")}
              </span>
              <div>
                <h3 className="font-display text-[1.3rem] leading-tight tracking-tight text-navy-900">
                  {p.title}
                </h3>
                <p className="mt-1.5 text-[15px] leading-relaxed text-ink-700">
                  {p.body}
                </p>
              </div>
            </div>
          </li>
        );
      })}
    </ul>
  );
}
