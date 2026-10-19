import type { Attribution, ClickEvent } from "@/lib/attribution-types";

/**
 * Parseo defensivo de la atribución que manda el cliente. Todo lo que llega es
 * dato no confiable: whitelist de claves, strings recortados, sin caracteres de
 * control. Del referrer se guarda solo el host y de landing/page solo el path
 * (las query strings pueden traer emails, tokens o el propio gclid).
 */

const MAX_LEN = 200;
const GCLID_RE = /^[A-Za-z0-9_-]{1,200}$/;
const HOST_RE = /^[a-z0-9.-]{1,253}$/;
const MATCH_TYPES = new Set(["e", "p", "b"]);
// Caracteres de control (C0, DEL, C1) y separadores de línea Unicode.
const CONTROL_RE = /[\u0000-\u001f\u007f-\u009f\u2028\u2029]/g;

function cleanString(v: unknown): string | undefined {
  if (typeof v !== "string") return undefined;
  const s = v.replace(CONTROL_RE, " ").replace(/\s+/g, " ").trim().slice(0, MAX_LEN);
  return s.length > 0 ? s : undefined;
}

/** Devuelve solo el pathname ("/servicios"), sin query ni hash. */
export function sanitizePath(v: unknown): string | undefined {
  const s = cleanString(v);
  if (!s) return undefined;
  try {
    const url = new URL(s, "https://local.invalid");
    const path = url.pathname.slice(0, MAX_LEN);
    return path.startsWith("/") ? path : undefined;
  } catch {
    return undefined;
  }
}

function sanitizeHost(v: unknown): string | undefined {
  const s = cleanString(v);
  if (!s) return undefined;
  let host: string;
  try {
    host = new URL(s).hostname;
  } catch {
    host = s;
  }
  host = host.toLowerCase();
  return HOST_RE.test(host) ? host : undefined;
}

export function sanitizeAttribution(input: unknown): Attribution {
  if (!input || typeof input !== "object" || Array.isArray(input)) return {};
  const o = input as Record<string, unknown>;
  const out: Attribution = {};

  const gclid = cleanString(o.gclid);
  if (gclid && GCLID_RE.test(gclid)) out.gclid = gclid;

  const src = cleanString(o.utm_source);
  if (src) out.utm_source = src.toLowerCase();
  const med = cleanString(o.utm_medium);
  if (med) out.utm_medium = med.toLowerCase();
  const cmp = cleanString(o.utm_campaign);
  if (cmp) out.utm_campaign = cmp;
  const kw = cleanString(o.kw);
  if (kw) out.kw = kw.toLowerCase();
  const mt = cleanString(o.mt)?.toLowerCase();
  if (mt && MATCH_TYPES.has(mt)) out.mt = mt;

  const referrer = sanitizeHost(o.referrer);
  if (referrer) out.referrer = referrer;
  const landing = sanitizePath(o.landing);
  if (landing) out.landing = landing;

  return out;
}

/** Hidden `attribution` del form: puede faltar, venir vacío o corrupto. Nunca tira. */
export function parseAttributionField(raw: unknown): Attribution {
  if (typeof raw !== "string" || raw.length === 0 || raw.length > 4000) return {};
  try {
    return sanitizeAttribution(JSON.parse(raw));
  } catch {
    return {};
  }
}

/** Valida el body de POST /api/evento. `null` = inválido (→ 400). */
export function parseClickEvent(input: unknown): ClickEvent | null {
  if (!input || typeof input !== "object" || Array.isArray(input)) return null;
  const o = input as Record<string, unknown>;
  if (o.type !== "whatsapp" && o.type !== "phone") return null;
  const page = sanitizePath(o.page);
  if (!page) return null;
  // attribution puede faltar o venir mal: no invalida el click, se cuenta como "Directo".
  return { type: o.type, page, attribution: sanitizeAttribution(o.attribution) };
}

const SEARCH_ENGINES: Array<[RegExp, string]> = [
  [/(^|\.)google\.[a-z.]+$/, "google"],
  [/(^|\.)bing\.com$/, "bing"],
  [/(^|\.)yahoo\.[a-z.]+$/, "yahoo"],
  [/(^|\.)duckduckgo\.com$/, "duckduckgo"],
  [/(^|\.)ecosia\.org$/, "ecosia"],
  [/(^|\.)yandex\.[a-z.]+$/, "yandex"],
  [/(^|\.)search\.brave\.com$/, "brave"],
];

const SOCIAL: Array<[RegExp, string]> = [
  [/(^|\.)facebook\.com$/, "facebook"],
  [/(^|\.)instagram\.com$/, "instagram"],
  [/(^|\.)linkedin\.com$/, "linkedin"],
  [/(^|\.)(t\.co|x\.com|twitter\.com)$/, "x"],
  [/(^|\.)whatsapp\.com$/, "whatsapp"],
];

const PAID_MEDIUMS = new Set(["cpc", "ppc", "paid", "paidsearch", "paid_search", "sem", "ads"]);
const OWN_HOST_RE = /(^|\.)costa-asoc\.com\.ar$/;

/** Etiqueta legible del origen, para el mail y como param de GA4. */
export function describeSource(a: Attribution): string {
  const med = a.utm_medium;
  const src = a.utm_source;

  if (a.gclid) return "Google Ads";
  if (med && PAID_MEDIUMS.has(med)) {
    return !src || src === "google" ? "Google Ads" : `Pago (${src})`;
  }
  if (src) return med ? `Campaña (${src} / ${med})` : `Campaña (${src})`;

  const ref = a.referrer;
  if (ref && !OWN_HOST_RE.test(ref)) {
    for (const [re, name] of SEARCH_ENGINES) if (re.test(ref)) return `Orgánico (${name})`;
    for (const [re, name] of SOCIAL) if (re.test(ref)) return `Redes (${name})`;
    return `Referencia (${ref.replace(/^www\./, "")})`;
  }
  return "Directo";
}
