"use server";

import { headers } from "next/headers";
import { contactSchema } from "@/lib/validations/contact";
import { rateLimit } from "@/lib/rate-limit";
import { getResend } from "@/lib/email/resend";
import { ContactEmail } from "@/lib/email/templates/contact";

export type ContactFormState = {
  status: "idle" | "success" | "error";
  message?: string;
  errors?: Partial<Record<string, string>>;
};

const initialState: ContactFormState = { status: "idle" };

async function getClientIp() {
  const h = await headers();
  const fwd = h.get("x-forwarded-for");
  if (fwd) return fwd.split(",")[0]!.trim();
  return h.get("x-real-ip") ?? "unknown";
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

  const ip = await getClientIp();
  const limit = rateLimit(`contact:${ip}`, { max: 3, windowMs: 5 * 60_000 });
  if (!limit.allowed) {
    return {
      status: "error",
      message:
        "Llegamos al límite de envíos desde tu conexión. Esperá unos minutos e intentá de nuevo.",
    };
  }

  const raw = Object.fromEntries(formData.entries());
  const parsed = contactSchema.safeParse(raw);

  if (!parsed.success) {
    const errors: Record<string, string> = {};
    for (const issue of parsed.error.issues) {
      const field = issue.path[0];
      if (typeof field === "string" && !errors[field]) {
        errors[field] = issue.message;
      }
    }
    return {
      status: "error",
      message: "Revisá los campos marcados.",
      errors,
    };
  }

  const data = parsed.data;
  const to = process.env.CONTACT_EMAIL_TO;
  const from = process.env.CONTACT_EMAIL_FROM;

  if (!to || !from) {
    return {
      status: "error",
      message:
        "El servicio de envío todavía no está configurado. Probá escribirnos directamente por mail o WhatsApp.",
    };
  }

  try {
    const resend = getResend();
    const { error } = await resend.emails.send({
      from,
      to: [to],
      replyTo: data.email,
      subject: `Consulta web — ${data.name} (${data.neighborhood})`,
      react: ContactEmail({ data }),
    });

    if (error) {
      console.error("[contact] Resend error", error);
      return {
        status: "error",
        message:
          "No pudimos enviar tu consulta en este momento. Probá de nuevo en unos minutos.",
      };
    }

    return { status: "success" };
  } catch (err) {
    console.error("[contact] unexpected", err);
    return {
      status: "error",
      message:
        "No pudimos enviar tu consulta en este momento. Probá de nuevo en unos minutos.",
    };
  }
}

export { initialState as contactInitialState };
