"use server";

import { headers } from "next/headers";
import { validateContact } from "@/lib/validations/contact";
import { rateLimit } from "@/lib/rate-limit";
import { getResend } from "@/lib/email/resend";
import { ContactEmail } from "@/lib/email/templates/contact";

export type ContactFormState = {
  status: "idle" | "success" | "error";
  message?: string;
  errors?: Partial<Record<string, string>>;
  /** Lo que se mandó, para que el form no aparezca vacío después de un error. */
  values?: Record<string, string>;
};

async function getClientIp() {
  const h = await headers();
  const fwd = h.get("x-forwarded-for");
  if (fwd) return fwd.split(",")[0]!.trim();
  return h.get("x-real-ip") ?? "unknown";
}

// React 19 resetea el <form> después de cada action, también cuando vuelve con
// error: sin esto, un error de validación borraba todo lo escrito.
function echo(raw: Record<string, FormDataEntryValue>): Record<string, string> {
  const out: Record<string, string> = {};
  for (const [k, v] of Object.entries(raw)) {
    if (typeof v === "string" && k !== "company_website" && !k.startsWith("$")) {
      out[k] = v.slice(0, 2000);
    }
  }
  return out;
}

export async function submitContact(
  _prev: ContactFormState,
  formData: FormData,
): Promise<ContactFormState> {
  // Honeypot — si tiene contenido, simulamos éxito sin enviar
  const honeypot = formData.get("company_website");
  if (typeof honeypot === "string" && honeypot.length > 0) {
    return { status: "success" };
  }

  const raw = Object.fromEntries(formData.entries());
  const parsed = validateContact(raw);

  if (!parsed.success) {
    return {
      status: "error",
      message: "Revisen los campos marcados.",
      errors: parsed.errors,
      values: echo(raw),
    };
  }

  // El límite cuenta solo envíos válidos (los que llegan a Resend): antes contaba
  // también los errores de validación y bloqueaba a quien se equivocaba tres veces.
  const ip = await getClientIp();
  const limit = rateLimit(`contact:${ip}`, { max: 3, windowMs: 5 * 60_000 });
  if (!limit.allowed) {
    return {
      status: "error",
      message:
        "Llegamos al límite de envíos desde esta conexión. Esperen unos minutos e intenten de nuevo, o escríbannos por WhatsApp.",
      values: echo(raw),
    };
  }

  const data = parsed.data;
  const to = process.env.CONTACT_EMAIL_TO;
  const from = process.env.CONTACT_EMAIL_FROM;

  if (!to || !from) {
    return {
      status: "error",
      message:
        "El servicio de envío todavía no está configurado. Pueden escribirnos directamente por mail o WhatsApp.",
      values: echo(raw),
    };
  }

  try {
    const resend = getResend();
    const { error } = await resend.emails.send({
      from,
      to: [to],
      // Sin email no hay a quién responder por mail: se contesta por teléfono.
      ...(data.email ? { replyTo: data.email } : {}),
      subject: `Consulta web: ${data.name} (${data.neighborhood})${
        data.source === "contacto" ? "" : ` · desde /${data.source}`
      }`,
      react: ContactEmail({ data }),
    });

    if (error) {
      console.error("[contact] Resend error", error);
      return {
        status: "error",
        message:
          "No pudimos enviar la consulta en este momento. Prueben de nuevo en unos minutos o escríbannos por WhatsApp.",
        values: echo(raw),
      };
    }

    return { status: "success" };
  } catch (err) {
    console.error("[contact] unexpected", err);
    return {
      status: "error",
      message:
        "No pudimos enviar la consulta en este momento. Prueben de nuevo en unos minutos o escríbannos por WhatsApp.",
      values: echo(raw),
    };
  }
}
