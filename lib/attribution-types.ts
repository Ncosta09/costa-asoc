/**
 * Contrato compartido cliente/servidor para la atribución de leads y clicks.
 * Lo consume `lib/attribution.ts` (cliente) y `lib/attribution-server.ts` (servidor).
 * Cambiarlo requiere coordinar ambos lados.
 */
export type Attribution = {
  gclid?: string;
  utm_source?: string;
  utm_medium?: string;
  utm_campaign?: string;
  /** Keyword de Ads ({keyword} del sufijo de URL final). */
  kw?: string;
  /** Concordancia de Ads ({matchtype}): e, p o b. */
  mt?: string;
  referrer?: string;
  landing?: string;
};

export type ClickEvent = {
  type: "whatsapp" | "phone";
  page: string;
  attribution: Attribution;
};
