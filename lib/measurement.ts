import { randomUUID } from "node:crypto";
import type { Attribution } from "@/lib/attribution-types";
import { describeSource } from "@/lib/attribution-server";

/**
 * Conteo server-side de leads y clicks vía GA4 Measurement Protocol.
 * Sin cookies ni identificadores persistentes: client_id aleatorio por evento,
 * sin IP, sin nombre/email/teléfono. Los nombres de evento son distintos a los
 * de gtag (generate_lead, etc.) para no duplicar conversiones.
 *
 * Nunca tira: si GA4 falla o tarda, se loguea y sigue.
 */

export type ServerEventName = "lead_srv" | "whatsapp_srv" | "phone_srv";

const MEASUREMENT_ID = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID || "G-8YPBZQNXBR";
const ENDPOINT = "https://www.google-analytics.com/mp/collect";
const TIMEOUT_MS = 2000;
// Límite de GA4 para valores de parámetros de evento.
const GA_PARAM_MAX = 100;

let warnedMissingSecret = false;

function buildParams(
  attribution: Attribution,
  extra: { page?: string; form_source?: string },
): Record<string, string | number> {
  const params: Record<string, string | number> = {
    source_label: describeSource(attribution),
    src: attribution.utm_source ?? "(none)",
    med: attribution.utm_medium ?? "(none)",
    cmp: attribution.utm_campaign ?? "(none)",
    landing: attribution.landing ?? "(not set)",
    // Sin esto GA4 no muestra el evento en algunos informes de engagement.
    engagement_time_msec: 1,
  };
  if (extra.page) params.page = extra.page;
  if (extra.form_source) params.form_source = extra.form_source;
  for (const [k, v] of Object.entries(params)) {
    if (typeof v === "string") params[k] = v.slice(0, GA_PARAM_MAX);
  }
  // Un gclid truncado no sirve para nada: va solo si entra entero. Se manda como
  // `click_id` porque `gclid` es un nombre reservado en GA4 (no admite dimensión).
  if (attribution.gclid && attribution.gclid.length <= GA_PARAM_MAX) {
    params.click_id = attribution.gclid;
  }
  return params;
}

export function buildPayload(
  name: ServerEventName,
  attribution: Attribution,
  extra: { page?: string; form_source?: string } = {},
) {
  return {
    client_id: randomUUID(),
    non_personalized_ads: true,
    // No hubo consentimiento de cookies: se declara denegado para usos publicitarios.
    consent: { ad_user_data: "DENIED", ad_personalization: "DENIED" },
    events: [{ name, params: buildParams(attribution, extra) }],
  };
}

/**
 * Manda el evento y espera la respuesta (máx. ~2 s). Hay que hacerle `await`:
 * en Vercel un fetch fire-and-forget muere cuando termina la función.
 */
export async function sendServerEvent(
  name: ServerEventName,
  attribution: Attribution,
  extra: { page?: string; form_source?: string } = {},
  { debug = false }: { debug?: boolean } = {},
): Promise<void> {
  const secret = process.env.GA4_MP_API_SECRET;
  // Solo producción: un preview con el secret cargado sumaría leads de prueba a la propiedad real.
  if (process.env.VERCEL_ENV && process.env.VERCEL_ENV !== "production") return;
  if (!secret) {
    if (!warnedMissingSecret) {
      warnedMissingSecret = true;
      console.warn("[measurement] GA4_MP_API_SECRET no está configurada: eventos server-side desactivados");
    }
    return;
  }

  const base = debug ? "https://www.google-analytics.com/debug/mp/collect" : ENDPOINT;
  const url = `${base}?measurement_id=${encodeURIComponent(MEASUREMENT_ID)}&api_secret=${encodeURIComponent(secret)}`;

  try {
    const res = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(buildPayload(name, attribution, extra)),
      signal: AbortSignal.timeout(TIMEOUT_MS),
      cache: "no-store",
    });
    if (debug) {
      console.info("[measurement] debug", res.status, await res.text());
    } else if (!res.ok) {
      console.error("[measurement] GA4 respondió", res.status);
    }
  } catch (err) {
    // Timeout incluido: no prueba que el hit no haya llegado. No se reintenta
    // (MP no tiene idempotencia y un reintento podría duplicar el conteo).
    console.error("[measurement] envío fallido", err instanceof Error ? err.name : "unknown");
  }
}
