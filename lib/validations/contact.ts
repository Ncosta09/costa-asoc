import { z } from "zod";

/**
 * Calificación del lead: obligatoria en todas las variantes del formulario.
 * Las claves son cortas y sin PII porque viajan tal cual como parámetros `units` y
 * `role` del evento `lead_srv` (GA4). Las etiquetas son las que ve el visitante y
 * las que llegan en el mail.
 */
export const unitRanges = ["hasta_10", "11_30", "31_60", "mas_60", "no_se"] as const;
export type UnitRange = (typeof unitRanges)[number];
export const unitRangeLabels: Record<UnitRange, string> = {
  hasta_10: "Hasta 10",
  "11_30": "11 a 30",
  "31_60": "31 a 60",
  mas_60: "Más de 60",
  no_se: "No sé",
};

/** "31 a 60 unidades" / "Unidades: no sabe", para el asunto y el mail. */
export function describeUnits(units: UnitRange): string {
  return units === "no_se" ? "Unidades: no sabe" : `${unitRangeLabels[units]} unidades`;
}

export const roles = ["consejo", "propietario", "inquilino", "admin_otro"] as const;
export type Role = (typeof roles)[number];
export const roleLabels: Record<Role, string> = {
  consejo: "Consejo de administración",
  propietario: "Propietario/a",
  inquilino: "Inquilino/a",
  admin_otro: "Administrador/a u otro",
};

export const buildingTypes = [
  "residencial",
  "corporativo",
  "mixto",
] as const;

export const buildingTypeLabels: Record<(typeof buildingTypes)[number], string> = {
  residencial: "Residencial",
  corporativo: "Corporativo",
  mixto: "Mixto",
};

/** "Mejor horario" del pedido de llamada (opcional). */
export const callTimes = ["manana", "tarde"] as const;
export const callTimeLabels: Record<(typeof callTimes)[number], string> = {
  manana: "Mañana",
  tarde: "Tarde",
};

// Desde qué página llegó la consulta. Va en el asunto del mail y como `form_source`
// de `lead_srv` para saber si el lead vino de la landing de Ads (/propuesta) o del
// orgánico. `propuesta-llamada` es el "Prefiero que me llamen" de /propuesta.
export const formSources = ["contacto", "propuesta", "servicios", "propuesta-llamada"] as const;
export type FormSource = (typeof formSources)[number];
export const CALLBACK_SOURCE = "propuesta-llamada" satisfies FormSource;

// FormData manda "" en los campos que no se completaron. Para los opcionales,
// vacío (o solo espacios) es "no lo dijeron", no un valor inválido.
const blankToUndefined = (v: unknown) =>
  typeof v === "string" && v.trim() === "" ? undefined : v;

const pick = "Elijan una opción de la lista";

/**
 * Obligatorios: nombre, unidades, rol y, según el formulario:
 * - consulta (contacto/propuesta/servicios): barrio y teléfono o email;
 * - pedido de llamada: teléfono (barrio y email no se piden).
 * Esas reglas cruzadas viven en `validateContact`, no acá.
 * Tipo de edificio y mensaje son opcionales. Antes eran 7 obligatorios y era el
 * principal freno de la conversión (auditoría 2026-09-18): unidades y rol volvieron
 * como selects de un toque porque son lo primero que se quiere saber del lead.
 */
export const contactSchema = z
  .object({
    name: z
      .string({ required_error: "Ingresen su nombre" })
      .trim()
      .min(2, "Ingresen su nombre")
      .max(120, "Demasiado largo")
      .regex(/^[^\r\n]*$/, "Revisen el dato"),
    email: z.preprocess(
      blankToUndefined,
      z
        .string()
        .trim()
        .toLowerCase()
        .email("El email no parece válido")
        .max(160, "Demasiado largo")
        .optional(),
    ),
    phone: z.preprocess(
      blankToUndefined,
      z
        .string()
        .trim()
        .min(6, "El teléfono no parece completo")
        .max(40, "Demasiado largo")
        .optional(),
    ),
    neighborhood: z.preprocess(
      blankToUndefined,
      z
        .string()
        .trim()
        .min(2, "Indiquen el barrio")
        .max(120, "Demasiado largo")
        .regex(/^[^\r\n]*$/, "Revisen el dato")
        .optional(),
    ),
    units: z.preprocess(
      blankToUndefined,
      z.enum(unitRanges, {
        errorMap: (issue, ctx) =>
          issue.code === "invalid_type" && ctx.data === undefined
            ? { message: "Indiquen cuántas unidades tiene el edificio" }
            : { message: pick },
      }),
    ),
    role: z.preprocess(
      blankToUndefined,
      z.enum(roles, {
        errorMap: (issue, ctx) =>
          issue.code === "invalid_type" && ctx.data === undefined
            ? { message: "Indiquen quiénes son" }
            : { message: pick },
      }),
    ),
    callTime: z.preprocess(
      blankToUndefined,
      z.enum(callTimes, { errorMap: () => ({ message: pick }) }).optional(),
    ),
    buildingType: z.preprocess(
      blankToUndefined,
      z
        .enum(buildingTypes, { errorMap: () => ({ message: pick }) })
        .optional(),
    ),
    message: z.preprocess(
      blankToUndefined,
      z.string().trim().max(2000, "Máximo 2000 caracteres").optional(),
    ),
    source: z.preprocess(
      blankToUndefined,
      z.enum(formSources).optional().default("contacto"),
    ),
    // Honeypot: debe quedar vacío
    company_website: z.string().max(0).optional().default(""),
  });

export type ContactInput = z.infer<typeof contactSchema>;

/** Clave del error de "falta un medio de contacto" (no es un campo: es el par teléfono/email). */
export const CONTACT_METHOD_ERROR = "contact";
export const contactMethodMessage =
  "Dejen un teléfono o un email para poder responderles.";
const callbackPhoneMessage = "Dejen un teléfono para poder llamarlos.";

/**
 * Valida y además aplica las reglas que dependen del formulario (barrio y teléfono
 * o email en la consulta; teléfono en el pedido de llamada). Se hace afuera del schema a propósito:
 * en zod 3 un `superRefine` sobre el objeto no corre si otro campo ya falló, y el
 * visitante vería el error del contacto recién en el segundo intento.
 */
export function validateContact(raw: Record<string, unknown>):
  | { success: true; data: ContactInput }
  | { success: false; errors: Record<string, string> } {
  const parsed = contactSchema.safeParse(raw);
  const errors: Record<string, string> = {};

  if (!parsed.success) {
    for (const issue of parsed.error.issues) {
      const field = issue.path[0];
      if (typeof field === "string" && !errors[field]) errors[field] = issue.message;
    }
  }

  const phone = blankToUndefined(raw.phone);
  const email = blankToUndefined(raw.email);
  if (raw.source === CALLBACK_SOURCE) {
    // Pedido de llamada: sin teléfono no hay pedido.
    if (phone === undefined) errors.phone = callbackPhoneMessage;
  } else {
    if (blankToUndefined(raw.neighborhood) === undefined && !errors.neighborhood) {
      errors.neighborhood = "Indiquen el barrio";
    }
    if (phone === undefined && email === undefined) {
      errors[CONTACT_METHOD_ERROR] = contactMethodMessage;
    }
  }

  if (parsed.success && Object.keys(errors).length === 0) {
    return { success: true, data: parsed.data };
  }
  return { success: false, errors };
}
