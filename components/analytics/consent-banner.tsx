"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { GA_ID, getConsent, setConsent } from "@/lib/analytics";

/**
 * Banner de consentimiento para GA4. Solo aparece si hay un ID de GA
 * configurado y el visitante todavía no eligió. Sin dark patterns:
 * aceptar y rechazar tienen el mismo peso, y rechazar no vuelve a preguntar.
 */
export function ConsentBanner() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (GA_ID && getConsent() === null) setVisible(true);
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
      className="fixed inset-x-4 bottom-4 z-50 mx-auto max-w-lg rounded-xl border border-cream-300 bg-cream-50 p-5 shadow-xl sm:inset-x-auto sm:right-6 sm:mx-0"
    >
      <p className="text-[14px] leading-relaxed text-ink-800">
        Usamos Google Analytics para entender cómo se usa el sitio y mejorar el
        servicio. Solo se activa si aceptás; si rechazás, no se carga nada y no
        volvemos a preguntar.
      </p>
      <div className="mt-4 flex items-center gap-3">
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
