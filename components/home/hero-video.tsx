"use client";

import { useEffect, useState } from "react";

/**
 * Video de fondo del hero (aéreo de Buenos Aires, Pexels/Aaron Hairston, licencia libre).
 * El LCP no lo paga: el poster (next/image priority en hero.tsx) pinta primero, y el
 * video recién se monta en el cliente cuando el contexto lo amerita: desktop,
 * sin `prefers-reduced-motion` y sin Save-Data. Aparece con fade cuando puede reproducirse.
 */
export function HeroVideo() {
  const [enabled, setEnabled] = useState(false);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const desktop = window.matchMedia("(min-width: 768px)").matches;
    const saveData =
      (navigator as Navigator & { connection?: { saveData?: boolean } }).connection
        ?.saveData ?? false;
    if (!reduced && !saveData && desktop) setEnabled(true);
  }, []);

  if (!enabled) return null;

  return (
    <video
      className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-700 ease-[var(--ease-out-soft)] ${
        ready ? "opacity-100" : "opacity-0"
      }`}
      src="/home/hero-bg.mp4"
      autoPlay
      muted
      loop
      playsInline
      onCanPlay={() => setReady(true)}
      aria-hidden="true"
      tabIndex={-1}
    />
  );
}
