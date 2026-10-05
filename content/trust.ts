import { site } from "@/content/site";

// La antigüedad sale de `site.founded` (igual que "Desde 2009" y los años del hero):
// antes decía "15+" fijo y contradecía al resto del sitio.
export const trustBand = [
  { metric: site.yearsExperience, label: `Años de trayectoria (desde ${site.founded})` },
  { metric: "RPA 8192", label: "Matrícula GCBA" },
  { metric: "CAPHAI 2903", label: "Cámara Argentina" },
  { metric: "100%", label: "Cuentas a nombre del consorcio" },
] as const;
