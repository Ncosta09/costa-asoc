// Atribución first-touch por sesión, sin cookies.
//
// Se guarda en sessionStorage (muere al cerrar la pestaña, no viaja en requests,
// no es una cookie) y no se manda a terceros: solo viaja a nuestro propio
// servidor dentro de un lead o de un click de contacto. Por eso corre siempre,
// con o sin consentimiento del banner de GA4.
//
// Solo cliente: todas las funciones son seguras en SSR (devuelven vacío).

import type { Attribution } from "@/lib/attribution-types";

const STORAGE_KEY = "attribution";
const MAX_LEN = 200;
const PARAMS = ["gclid", "utm_source", "utm_medium", "utm_campaign", "kw", "mt"] as const;

function clean(value: string | null | undefined): string | undefined {
  const v = value?.trim();
  return v ? v.slice(0, MAX_LEN) : undefined;
}

function read(): Attribution | null {
  try {
    const raw = window.sessionStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    const parsed: unknown = JSON.parse(raw);
    return parsed && typeof parsed === "object" ? (parsed as Attribution) : null;
  } catch {
    return null;
  }
}

function write(value: Attribution) {
  try {
    window.sessionStorage.setItem(STORAGE_KEY, JSON.stringify(value));
  } catch {
    // Storage bloqueado o lleno: seguimos sin atribución.
  }
}

/** Hostname del referrer solo si viene de otro sitio. */
function externalReferrer(): string | undefined {
  try {
    if (!document.referrer) return undefined;
    const host = new URL(document.referrer).hostname;
    return host && host !== window.location.hostname ? clean(host) : undefined;
  } catch {
    return undefined;
  }
}

function fromUrl(): Partial<Record<(typeof PARAMS)[number], string>> {
  const out: Partial<Record<(typeof PARAMS)[number], string>> = {};
  try {
    const params = new URLSearchParams(window.location.search);
    for (const key of PARAMS) {
      const v = clean(params.get(key));
      if (v) out[key] = v;
    }
  } catch {
    // URL inaccesible: nada que capturar.
  }
  return out;
}

/**
 * Llamar al montar en cada carga. La primera página vista de la sesión fija la
 * atribución; las siguientes no la pisan, salvo que traigan un `gclid` distinto
 * (nuevo click de Ads): ahí se actualizan el gclid, los utm y la keyword de esa URL.
 */
export function captureAttribution() {
  if (typeof window === "undefined") return;
  try {
    const current = fromUrl();
    const stored = read();

    if (!stored) {
      const first: Attribution = {
        ...current,
        referrer: externalReferrer(),
        landing: clean(window.location.pathname),
      };
      write(first);
      return;
    }

    if (current.gclid && current.gclid !== stored.gclid) {
      write({
        ...stored,
        gclid: current.gclid,
        utm_source: current.utm_source,
        utm_medium: current.utm_medium,
        utm_campaign: current.utm_campaign,
        kw: current.kw,
        mt: current.mt,
      });
    }
  } catch {
    // Nunca romper la página por medición.
  }
}

/**
 * Atribución de la sesión, o `{}` si no hay (SSR, storage bloqueado).
 * Captura antes de leer: los efectos de la página (p. ej. el form) corren antes
 * que el de <Analytics /> en el layout, y no dependemos de ese orden.
 */
export function getAttribution(): Attribution {
  if (typeof window === "undefined") return {};
  captureAttribution();
  const stored = read();
  if (!stored) return {};
  // Solo claves conocidas y string: lo que haya en storage no es confiable.
  const out: Attribution = {};
  for (const key of [...PARAMS, "referrer", "landing"] as const) {
    const v = stored[key];
    if (typeof v === "string" && v) out[key] = v.slice(0, MAX_LEN);
  }
  return out;
}
