// Área de cobertura (no cartera de clientes). Las 3 destacadas vienen del brief
// (zonas premium objetivo). El resto son barrios de CABA como área de servicio.
// TODO Gabriel: confirmar / ajustar el listado de zonas que efectivamente cubren.
export const featuredZones = ["Recoleta", "Belgrano", "Puerto Madero"] as const;

export const coverageZones = [
  "Recoleta",
  "Belgrano",
  "Puerto Madero",
  "Palermo",
  "Núñez",
  "Caballito",
  "Microcentro",
  "Barrio Norte",
  "Villa Devoto",
  "Colegiales",
] as const;

// Landings por barrio ya publicadas: el chip del barrio se vuelve link.
// Al publicar una landing nueva, agregar acá su ruta (y nada más: el componente la levanta).
export const zoneHrefs: Partial<Record<(typeof coverageZones)[number], string>> = {
  "Villa Devoto": "/administracion-de-consorcios-villa-devoto",
};
