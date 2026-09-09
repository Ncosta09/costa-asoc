"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { GA_ID, getConsent, setConsent } from "@/lib/analytics";
import { cn } from "@/lib/utils";

/**
 * Banner de consentimiento para GA4. Solo aparece si hay un ID de GA
 * configurado y el visitante todavía no eligió. Sin dark patterns:
 * aceptar y rechazar tienen el mismo peso, y rechazar no vuelve a preguntar.
 *
 * En mobile es una barra inferior compacta, no una tarjeta: a 390px la
 * tarjeta medía 176px de alto y se comía el CTA de las landings, que es
 * justo donde cae el tráfico pago. En desktop sigue siendo una tarjeta
 * en la esquina inferior derecha.
 */
export function ConsentBanner() {
  const [visible, setVisible] = useState(false);
  const [entered, setEntered] = useState(false);

  useEffect(() => {
    if (!GA_ID || getConsent() !== null) return;
    setVisible(true);
    // Un frame de delay para que la transición de entrada tenga desde dónde salir.
    const raf = requestAnimationFrame(() => setEntered(true));
    return () => cancelAnimationFrame(raf);
  }, []);

  if (!visible) return null;

  const choose = (value: "granted" | "denied") => {
    setConsent(value);
    setVisible(false);
  };

  return (
    <div
      role="dialog"
      aria-label="Aviso de cookies"
      className={cn(
        // Mobile: barra al borde inferior, sin márgenes que sumen alto.
        "fixed inset-x-0 bottom-0 z-50 border-t border-cream-300 bg-cream-50 px-4 pt-3.5 shadow-elevated",
        "pb-[calc(0.875rem+env(safe-area-inset-bottom))]",
        // Desktop: tarjeta en la esquina, como estaba.
        "sm:inset-x-auto sm:bottom-6 sm:right-6 sm:max-w-md sm:rounded-xl sm:border sm:p-5 sm:pb-5",
        "transition-[opacity,transform] duration-300 ease-[var(--ease-out-soft)] motion-reduce:transition-none",
        entered ? "translate-y-0 opacity-100" : "translate-y-2 opacity-0",
      )}
    >
      <p className="text-sm leading-snug text-ink-800 sm:leading-relaxed">
        Usamos Google Analytics para medir cómo se usa el sitio. Solo se activa
        si aceptás: si rechazás, no se carga nada y no volvemos a preguntar.
      </p>
      <div className="mt-3 flex items-center gap-2.5 sm:mt-4 sm:gap-3">
        <Button size="sm" variant="primary" onClick={() => choose("granted")}>
          Aceptar
        </Button>
        <Button size="sm" variant="secondary" onClick={() => choose("denied")}>
          Rechazar
        </Button>
      </div>
    </div>
  );
}
