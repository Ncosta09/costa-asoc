"use client";

import Script from "next/script";
import { useEffect, useState } from "react";
import {
  CLARITY_ID,
  CONSENT_CHANGED_EVENT,
  GA_ID,
  getConsent,
  trackEvent,
} from "@/lib/analytics";
import { captureAttribution, getAttribution } from "@/lib/attribution";
import type { ClickEvent } from "@/lib/attribution-types";

/**
 * Conteo propio del click (sin cookies, sin terceros): va a nuestro endpoint
 * aunque no haya consentimiento. sendBeacon no bloquea la navegación del link.
 */
function sendClickEvent(type: ClickEvent["type"]) {
  try {
    const event: ClickEvent = {
      type,
      page: window.location.pathname,
      attribution: getAttribution(),
    };
    const body = JSON.stringify(event);
    const url = "/api/evento";
    const blob = new Blob([body], { type: "application/json" });
    if (navigator.sendBeacon?.(url, blob)) return;
    void fetch(url, {
      method: "POST",
      body,
      headers: { "Content-Type": "application/json" },
      keepalive: true,
    }).catch(() => {});
  } catch {
    // La medición nunca rompe el click.
  }
}

/**
 * Carga GA4 (y Clarity, si tiene ID) solo si hay ID de GA configurado Y el
 * visitante aceptó el banner. El banner depende de GA_ID, así que Clarity
 * nunca se carga sin haber preguntado.
 * Además registra un listener delegado para medir los clicks de contacto
 * (WhatsApp y teléfono) sin tocar cada componente que los renderiza.
 * Los listeners son inofensivos sin gtag: trackEvent es un no-op.
 * La atribución (sessionStorage) y el beacon a /api/evento corren siempre,
 * independientes del consentimiento: no usan cookies ni hablan con terceros.
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
    captureAttribution();
  }, []);

  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      const anchor = target?.closest?.("a");
      if (!anchor) return;
      const href = anchor.getAttribute("href") ?? "";
      if (href.includes("wa.me")) {
        trackEvent("whatsapp_click", { link_url: href });
        sendClickEvent("whatsapp");
      } else if (href.startsWith("tel:")) {
        trackEvent("phone_click", { link_url: href });
        sendClickEvent("phone");
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
      {CLARITY_ID && (
        <Script id="clarity-init" strategy="afterInteractive">
          {`
            (function(c,l,a,r,i,t,y){
              c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
              t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
              y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
            })(window, document, "clarity", "script", "${CLARITY_ID}");
            window.clarity('consent');
          `}
        </Script>
      )}
    </>
  );
}
