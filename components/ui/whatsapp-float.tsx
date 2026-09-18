"use client";

import { useEffect, useState } from "react";
import { MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { site } from "@/content/site";
import { CONSENT_CHANGED_EVENT, GA_ID, getConsent } from "@/lib/analytics";
import { cn } from "@/lib/utils";

/**
 * CTA persistente de WhatsApp, anclado abajo a la derecha.
 *
 * NO es un widget de chat que salta al entrar (eso está prohibido por el brief).
 * Aparece recién cuando el CTA del hero se fue de pantalla, que es justo donde
 * arranca la zona sin ningún pedido: medido el 2026-09-18 en `/servicios`, son
 * 7,6 pantallas seguidas a 390x844 sin una sola acción de conversión.
 *
 * Dos condiciones, las dos necesarias:
 *
 *  1. **El banner de cookies ya se resolvió.** El banner ocupa exactamente este
 *     rincón (barra de 135px al borde inferior en mobile, tarjeta a 24px del
 *     borde en desktop), así que aparecer antes sería quedar tapado. Es el mismo
 *     choque que dejó inclickeable al WhatsApp del hero de `/servicios`.
 *     Si no hay `GA_ID` el banner nunca se muestra, así que no hay nada que esperar.
 *  2. **El visitante pasó el primer viewport.** Al volver arriba se esconde:
 *     ahí el CTA del hero ya está a la vista y el flotante sobra.
 *
 * El click lo mide solo el listener delegado de `components/analytics/analytics.tsx`,
 * que engancha cualquier `href` con `wa.me` y emite `whatsapp_click`. No hay que
 * cablear nada acá.
 */

const MENSAJE = "Hola, escribo por la administración de nuestro consorcio.";

function bannerResuelto() {
  return !GA_ID || getConsent() !== null;
}

export function WhatsAppFloat() {
  const [sinBanner, setSinBanner] = useState(false);
  const [pasoElHero, setPasoElHero] = useState(false);

  useEffect(() => {
    setSinBanner(bannerResuelto());
    const onConsent = () => setSinBanner(bannerResuelto());
    window.addEventListener(CONSENT_CHANGED_EVENT, onConsent);
    return () => window.removeEventListener(CONSENT_CHANGED_EVENT, onConsent);
  }, []);

  useEffect(() => {
    let frame = 0;
    const medir = () => {
      frame = 0;
      setPasoElHero(window.scrollY > window.innerHeight * 0.8);
    };
    const onScroll = () => {
      if (frame) return;
      frame = requestAnimationFrame(medir);
    };
    medir();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (frame) cancelAnimationFrame(frame);
    };
  }, []);

  const visible = sinBanner && pasoElHero;

  return (
    <div
      className={cn(
        "fixed right-4 z-40 sm:right-6",
        "bottom-[calc(1rem+env(safe-area-inset-bottom))] sm:bottom-6",
        "transition-[opacity,transform] duration-300 ease-[var(--ease-out-soft)] motion-reduce:transition-none",
        visible
          ? "translate-y-0 opacity-100"
          : "pointer-events-none translate-y-2 opacity-0",
      )}
      // Mientras está oculto no debe ser alcanzable por teclado ni por lectores.
      inert={!visible}
    >
      <Button
        href={`${site.contact.whatsappHref}?text=${encodeURIComponent(MENSAJE)}`}
        variant="navy"
        size="default"
        // El ring del botón asume superficie cream. Acá flota sobre cualquier
        // fondo, así que el offset se apaga y el ring se dibuja en cream.
        className="shadow-elevated ring-1 ring-cream-50/25 focus-visible:ring-cream-50 focus-visible:ring-offset-0"
      >
        <MessageCircle aria-hidden="true" strokeWidth={1.75} className="h-4 w-4" />
        Escribir por WhatsApp
      </Button>
    </div>
  );
}
