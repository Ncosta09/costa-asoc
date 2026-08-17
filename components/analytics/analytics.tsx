"use client";

import Script from "next/script";
import { useEffect, useState } from "react";
import {
  CONSENT_CHANGED_EVENT,
  GA_ID,
  getConsent,
  trackEvent,
} from "@/lib/analytics";

/**
 * Carga GA4 solo si hay ID configurado Y el visitante aceptó el banner.
 * Además registra un listener delegado para medir los clicks de contacto
 * (WhatsApp y teléfono) sin tocar cada componente que los renderiza.
 * Los listeners son inofensivos sin gtag: trackEvent es un no-op.
 */
export function Analytics() {
  const [consent, setConsentState] = useState<string | null>(null);

  useEffect(() => {
    setConsentState(getConsent());
    const onChange = () => setConsentState(getConsent());
    window.addEventListener(CONSENT_CHANGED_EVENT, onChange);
    return () => window.removeEventListener(CONSENT_CHANGED_EVENT, onChange);
  }, []);

  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      const anchor = target?.closest?.("a");
      if (!anchor) return;
      const href = anchor.getAttribute("href") ?? "";
      if (href.includes("wa.me")) {
        trackEvent("whatsapp_click", { link_url: href });
      } else if (href.startsWith("tel:")) {
        trackEvent("phone_click", { link_url: href });
      }
    };
    document.addEventListener("click", onClick, { capture: true });
    return () => document.removeEventListener("click", onClick, { capture: true });
  }, []);

  if (!GA_ID || consent !== "granted") return null;

  return (
    <>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
        strategy="afterInteractive"
      />
      <Script id="ga4-init" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          window.gtag = gtag;
          gtag('js', new Date());
          gtag('config', '${GA_ID}');
        `}
      </Script>
    </>
  );
}
