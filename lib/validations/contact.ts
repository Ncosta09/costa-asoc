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

export const contactSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, "Ingresá tu nombre completo")
    .max(120, "Demasiado largo"),
  email: z
    .string()
    .trim()
    .toLowerCase()
    .email("Email inválido")
    .max(160, "Demasiado largo"),
  phone: z
    .string()
    .trim()
    .min(6, "Ingresá un teléfono válido")
    .max(40, "Demasiado largo"),
  role: z.enum(roles, { errorMap: () => ({ message: "Seleccioná tu rol" }) }),
  buildingType: z.enum(buildingTypes, {
    errorMap: () => ({ message: "Seleccioná el tipo de edificio" }),
  }),
  units: z.coerce
    .number({ invalid_type_error: "Ingresá un número" })
    .int("Debe ser un número entero")
    .min(1, "Debe ser al menos 1")
    .max(2000, "Verificá el dato"),
  neighborhood: z
    .string()
    .trim()
    .min(2, "Ingresá la ubicación")
    .max(120, "Demasiado largo"),
  message: z
    .string()
    .trim()
    .max(2000, "Máximo 2000 caracteres")
    .optional()
    .default(""),
  // Honeypot — debe quedar vacío
  company_website: z.string().max(0).optional().default(""),
});

export type ContactInput = z.infer<typeof contactSchema>;
