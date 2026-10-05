// CTA a mitad de nota para las notas con intención de cambio de administrador.
// Vive en código (no en los .mdx) para no tocar el contenido ni el `updated` de
// cada nota: agregar una nota = sumar una línea acá.

export type MidCtaVariant = "cambio" | "control";

export const midCtaBySlug: Record<string, MidCtaVariant> = {
  "como-cambiar-de-administrador-de-consorcio": "cambio",
  "honorarios-del-administrador-de-consorcio": "cambio",
  "funciones-del-consejo-de-propietarios": "cambio",
  "asamblea-de-consorcio-quorum-y-mayorias": "cambio",
  "como-denunciar-a-un-administrador-de-consorcio": "control",
  "como-verificar-la-matricula-rpa-de-tu-administrador": "control",
  "ley-941-obligaciones-administrador-consorcios": "control",
};

export const midCtaCopy: Record<MidCtaVariant, { title: string; body: string }> = {
  cambio: {
    title: "¿Están evaluando cambiar de administrador?",
    body: "Les explicamos cómo es el traspaso, paso a paso, y ofrecemos un período de evaluación sin penalidades.",
  },
  control: {
    title: "¿El administrador actual no les rinde cuentas como debería?",
    body: "Coordinamos una reunión sin cargo para mirar la situación del consorcio. Si deciden cambiar, les explicamos cómo es el traspaso y ofrecemos un período de evaluación sin penalidades.",
  },
};

/** Proporción del texto después de la cual se inserta el CTA (antes del H2 siguiente). */
export const MID_CTA_AT = 0.4;
