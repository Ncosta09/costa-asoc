"use client";

import { usePathname } from "next/navigation";
import type { ReactNode } from "react";

/**
 * Rutas de campaña que no llevan la navegación ni el footer del sitio: una landing
 * de Ads tiene que tener cero fugas (doc 08, "Landing dedicada /propuesta").
 */
export const CAMPAIGN_ROUTES = ["/propuesta"] as const;

export function isCampaignRoute(pathname: string | null) {
  return CAMPAIGN_ROUTES.some((r) => pathname === r || pathname?.startsWith(`${r}/`));
}

/** Envuelve contenido de servidor y no lo renderiza en las rutas de campaña. */
export function HideOnCampaignRoutes({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  if (isCampaignRoute(pathname)) return null;
  return <>{children}</>;
}
