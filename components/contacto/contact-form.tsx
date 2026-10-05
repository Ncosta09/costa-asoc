"use client";

import { useActionState, useEffect, useRef } from "react";
import { useFormStatus } from "react-dom";
import { trackEvent } from "@/lib/analytics";
import { CheckCircle2, ChevronDown, Loader2 } from "lucide-react";
import { submitContact, type ContactFormState } from "@/app/contacto/actions";
import {
  Field,
  Honeypot,
  NumberInput,
  Select,
  TextInput,
  Textarea,
} from "@/components/contacto/form-fields";
import {
  roles,
  buildingTypes,
  roleLabels,
  buildingTypeLabels,
  CONTACT_METHOD_ERROR,
  type FormSource,
} from "@/lib/validations/contact";
import { Button } from "@/components/ui/button";
import { site } from "@/content/site";
import { cn } from "@/lib/utils";

/**
 * Un solo formulario para /contacto, /servicios y /propuesta.
 *
 * Obligatorios: nombre, un medio de contacto (teléfono o email) y barrio. Los datos
 * del edificio son opcionales: en la variante `compact` (landings) van plegados en
 * un <details> para que el pedido entre arriba del fold; en `full` (/contacto) se ven.
 *
 * Medición: `generate_lead` se emite acá al volver OK. `form_start` lo emite solo la
 * medición mejorada de GA4 (interacciones de formulario) sobre cualquier <form>, así
 * que el formulario tiene que seguir siendo un <form> real con su `id`.
 */

type ContactFormProps = {
  variant?: "full" | "compact";
  source?: FormSource;
  className?: string;
};

function SubmitButton({ label }: { label: string }) {
  const { pending } = useFormStatus();
  return (
    <Button
      type="submit"
      variant="primary"
      size="lg"
      disabled={pending}
      aria-disabled={pending}
      className="w-full sm:w-auto"
    >
      {pending ? (
        <>
          <Loader2 aria-hidden="true" strokeWidth={1.75} className="h-4 w-4 animate-spin" />
          Enviando…
        </>
      ) : (
        label
      )}
    </Button>
  );
}

/** id del hint o del error, para `aria-describedby` del control. */
function describedBy(name: string, error?: string, hasHint = false) {
  if (error) return `${name}-error`;
  return hasHint ? `${name}-hint` : undefined;
}

const OPTIONAL_FIELDS = ["role", "buildingType", "units", "message"] as const;

export function ContactForm({
  variant = "full",
  source = "contacto",
  className,
}: ContactFormProps) {
  const initialState: ContactFormState = { status: "idle" };
  const [state, formAction] = useActionState(submitContact, initialState);
  const successRef = useRef<HTMLHeadingElement>(null);
  const compact = variant === "compact";

  // Conversión principal para GA4/Ads. No-op si no hay tracking activo.
  useEffect(() => {
    if (state.status === "success") {
      trackEvent("generate_lead", { form_source: source });
      successRef.current?.focus();
    }
  }, [state.status, source]);

  if (state.status === "success") {
    return (
      <div
        className={cn(
          "rounded-xl border border-cream-300 bg-cream-50 p-8 sm:p-10",
          className,
        )}
      >
        <div className="flex flex-col items-start gap-5">
          <span className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-terra-100 text-terra-700">
            <CheckCircle2 aria-hidden="true" strokeWidth={1.5} className="h-6 w-6" />
          </span>
          <div>
            <h2
              ref={successRef}
              tabIndex={-1}
              className="font-display text-[1.75rem] leading-tight tracking-tight text-navy-900 focus:outline-none"
            >
              Consulta recibida
            </h2>
            <p className="mt-3 max-w-[44ch] text-[16px] leading-relaxed text-ink-700">
              Gracias. {site.hours.responseNote} Si es urgente, también pueden
              escribirnos por WhatsApp o llamar al {site.contact.phone}.
            </p>
          </div>
        </div>
      </div>
    );
  }

  const errors = state.errors ?? {};
  const values = state.values ?? {};
  const contactError = errors[CONTACT_METHOD_ERROR];
  const optionalHasError = OPTIONAL_FIELDS.some((f) => errors[f]);
  const optionalHasValue = OPTIONAL_FIELDS.some((f) => values[f]);

  const optionalFields = (
    <div className="flex flex-col gap-5">
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        <Field label="Rol" name="role" error={errors.role}>
          <Select
            id="role"
            name="role"
            defaultValue={values.role ?? ""}
            invalid={Boolean(errors.role)}
            aria-describedby={describedBy("role", errors.role)}
          >
            <option value="">Seleccionar…</option>
            {roles.map((value) => (
              <option key={value} value={value}>
                {roleLabels[value]}
              </option>
            ))}
          </Select>
        </Field>
        <Field label="Tipo de edificio" name="buildingType" error={errors.buildingType}>
          <Select
            id="buildingType"
            name="buildingType"
            defaultValue={values.buildingType ?? ""}
            invalid={Boolean(errors.buildingType)}
            aria-describedby={describedBy("buildingType", errors.buildingType)}
          >
            <option value="">Seleccionar…</option>
            {buildingTypes.map((value) => (
              <option key={value} value={value}>
                {buildingTypeLabels[value]}
              </option>
            ))}
          </Select>
        </Field>
      </div>
      <Field
        label="Cantidad de unidades"
        name="units"
        error={errors.units}
        hint="Aproximado"
      >
        <NumberInput
          id="units"
          name="units"
          placeholder="48"
          defaultValue={values.units ?? ""}
          invalid={Boolean(errors.units)}
          aria-describedby={describedBy("units", errors.units, true)}
          className="sm:max-w-[12rem]"
        />
      </Field>
      <Field label="Mensaje o consulta" name="message" error={errors.message}>
        <Textarea
          id="message"
          name="message"
          placeholder="Qué necesita el consorcio o qué les preocupa de la administración actual."
          defaultValue={values.message ?? ""}
          invalid={Boolean(errors.message)}
          aria-describedby={describedBy("message", errors.message)}
          className={compact ? "min-h-[96px]" : undefined}
        />
      </Field>
    </div>
  );

  return (
    <form
      id={`contact-form-${source}`}
      action={formAction}
      noValidate
      className={cn("relative flex flex-col gap-5", className)}
    >
      <Honeypot />
      <input type="hidden" name="source" value={source} />

      <Field label="Nombre" name="name" required error={errors.name}>
        <TextInput
          id="name"
          name="name"
          autoComplete="name"
          placeholder="Nombre y apellido"
          defaultValue={values.name ?? ""}
          invalid={Boolean(errors.name)}
          aria-describedby={describedBy("name", errors.name)}
          required
        />
      </Field>

      <fieldset
        className="flex flex-col gap-3"
        aria-describedby={contactError ? `${CONTACT_METHOD_ERROR}-error` : "contact-hint"}
      >
        <legend className="mb-2 text-[13px] font-medium tracking-[0.005em] text-navy-900">
          ¿Cómo los contactamos?
          <span aria-hidden="true" className="ml-1 text-terra-700">
            *
          </span>
          <span className="ml-2 font-normal text-ink-500" id="contact-hint">
            Con uno alcanza
          </span>
        </legend>
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
          <Field label="Teléfono" name="phone" error={errors.phone}>
            <TextInput
              id="phone"
              name="phone"
              type="tel"
              inputMode="tel"
              autoComplete="tel"
              placeholder="11 2345-6789"
              defaultValue={values.phone ?? ""}
              invalid={Boolean(errors.phone || contactError)}
              aria-describedby={describedBy("phone", errors.phone)}
            />
          </Field>
          <Field label="Email" name="email" error={errors.email}>
            <TextInput
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              placeholder="nombre@ejemplo.com"
              defaultValue={values.email ?? ""}
              invalid={Boolean(errors.email || contactError)}
              aria-describedby={describedBy("email", errors.email)}
            />
          </Field>
        </div>
        {contactError ? (
          <p
            id={`${CONTACT_METHOD_ERROR}-error`}
            role="alert"
            className="text-[12.5px] text-terra-700"
          >
            {contactError}
          </p>
        ) : null}
      </fieldset>

      <Field
        label="Barrio del edificio"
        name="neighborhood"
        required
        error={errors.neighborhood}
      >
        <TextInput
          id="neighborhood"
          name="neighborhood"
          autoComplete="off"
          placeholder="Villa Devoto, Palermo, Caballito…"
          defaultValue={values.neighborhood ?? ""}
          invalid={Boolean(errors.neighborhood)}
          aria-describedby={describedBy("neighborhood", errors.neighborhood)}
          required
        />
      </Field>

      {compact ? (
        <details
          className="group rounded-md border border-cream-300 bg-cream-50"
          open={optionalHasError || optionalHasValue || undefined}
        >
          <summary className="flex cursor-pointer list-none items-center justify-between gap-3 rounded-md px-3.5 py-3 text-[14px] font-medium text-navy-900 [&::-webkit-details-marker]:hidden">
            Datos del edificio (opcional)
            <ChevronDown
              aria-hidden="true"
              strokeWidth={1.75}
              className="h-4 w-4 text-ink-500 transition-transform duration-200 group-open:rotate-180 motion-reduce:transition-none"
            />
          </summary>
          <div className="border-t border-cream-200 px-3.5 pb-4 pt-4">{optionalFields}</div>
        </details>
      ) : (
        <fieldset className="flex flex-col gap-5 border-t border-cream-200 pt-6">
          <legend className="float-left mb-1 w-full font-display text-[1.15rem] tracking-tight text-navy-900">
            Datos del edificio{" "}
            <span className="font-sans text-[13px] font-normal text-ink-500">(opcional)</span>
          </legend>
          {optionalFields}
        </fieldset>
      )}

      {state.status === "error" && state.message ? (
        <p
          role="alert"
          className="rounded-md border border-terra-700/30 bg-terra-100/50 px-4 py-3 text-[14px] text-terra-900"
        >
          {state.message}
        </p>
      ) : null}

      <div className="flex flex-col-reverse gap-3 pt-1 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-[12.5px] text-ink-500">{site.hours.responseNote}</p>
        <SubmitButton label={compact ? "Pedir propuesta" : "Enviar consulta"} />
      </div>
    </form>
  );
}
