// Utilidades de analytics (GA4) con consentimiento explícito.
//
// Diseño: el sitio no carga NADA de Google salvo que (a) exista
// NEXT_PUBLIC_GA_MEASUREMENT_ID y (b) el visitante haya aceptado el banner.
// Sin consentimiento no se hace ningún request a terceros (consent "básico",
// más estricto que el consent mode "avanzado" de pings sin cookies).

export const GA_ID = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;

export type ConsentValue = "granted" | "denied";

const CONSENT_KEY = "ga-consent";
export const CONSENT_CHANGED_EVENT = "ga-consent-changed";

export function getConsent(): ConsentValue | null {
  if (typeof window === "undefined") return null;
  const v = window.localStorage.getItem(CONSENT_KEY);
  return v === "granted" || v === "denied" ? v : null;
}

export function setConsent(value: ConsentValue) {
  window.localStorage.setItem(CONSENT_KEY, value);
  window.dispatchEvent(new Event(CONSENT_CHANGED_EVENT));
}

type EventParams = Record<string, string | number | boolean>;

/** No-op si gtag no está cargado (sin ID configurado o sin consentimiento). */
export function trackEvent(name: string, params?: EventParams) {
  if (typeof window === "undefined") return;
  const w = window as unknown as { gtag?: (...args: unknown[]) => void };
  w.gtag?.("event", name, params);
}
