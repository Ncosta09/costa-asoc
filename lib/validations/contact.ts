import { z } from "zod";

export const roles = [
  "consejo",
  "propietario",
  "inmobiliaria",
  "otro",
] as const;

export const buildingTypes = [
  "residencial",
  "corporativo",
  "mixto",
] as const;

// Desde qué página llegó la consulta. Va en el asunto del mail para saber si el
// lead vino de la landing de Ads (/propuesta) o del orgánico.
export const formSources = ["contacto", "propuesta", "servicios"] as const;
export type FormSource = (typeof formSources)[number];

export const roleLabels: Record<(typeof roles)[number], string> = {
  consejo: "Miembro del consejo de administración",
  propietario: "Propietario",
  inmobiliaria: "Inmobiliaria",
  otro: "Otro",
};

export const buildingTypeLabels: Record<(typeof buildingTypes)[number], string> = {
  residencial: "Residencial",
  corporativo: "Corporativo",
  mixto: "Mixto",
};

// FormData manda "" en los campos que no se completaron. Para los opcionales,
// vacío (o solo espacios) es "no lo dijeron", no un valor inválido.
const blankToUndefined = (v: unknown) =>
  typeof v === "string" && v.trim() === "" ? undefined : v;

/**
 * Obligatorios: nombre, barrio y al menos un medio de contacto (teléfono o email).
 * Rol, tipo de edificio, unidades y mensaje son opcionales: se preguntan después.
 * Antes eran 7 obligatorios y era el principal freno de la conversión (auditoría 2026-09-18).
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
    neighborhood: z
      .string({ required_error: "Indiquen el barrio" })
      .trim()
      .min(2, "Indiquen el barrio")
      .max(120, "Demasiado largo")
      .regex(/^[^\r\n]*$/, "Revisen el dato"),
    role: z.preprocess(
      blankToUndefined,
      z.enum(roles, { errorMap: () => ({ message: "Elijan una opción de la lista" }) }).optional(),
    ),
    buildingType: z.preprocess(
      blankToUndefined,
      z
        .enum(buildingTypes, { errorMap: () => ({ message: "Elijan una opción de la lista" }) })
        .optional(),
    ),
    units: z.preprocess(
      blankToUndefined,
      z.coerce
        .number({ invalid_type_error: "Ingresen un número" })
        .int("Tiene que ser un número entero")
        .min(1, "Tiene que ser al menos 1")
        .max(2000, "Revisen el dato")
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

/**
 * Valida y además exige teléfono o email. Se hace afuera del schema a propósito:
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
  if (phone === undefined && email === undefined) {
    errors[CONTACT_METHOD_ERROR] = contactMethodMessage;
  }

  if (parsed.success && Object.keys(errors).length === 0) {
    return { success: true, data: parsed.data };
  }
  return { success: false, errors };
}
