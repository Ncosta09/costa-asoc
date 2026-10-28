"use client";

import { useActionState, useEffect, useId, useRef, useState } from "react";
import { useFormStatus } from "react-dom";
import { CheckCircle2, ChevronDown, Loader2, PhoneIncoming } from "lucide-react";
import { submitContact, type ContactFormState } from "@/app/contacto/actions";
import {
  Field,
  Honeypot,
  QualificationFields,
  TextInput,
} from "@/components/contacto/form-fields";
import { Button } from "@/components/ui/button";
import { trackEvent } from "@/lib/analytics";
import { getAttribution } from "@/lib/attribution";
import { CALLBACK_SOURCE, callTimeLabels, callTimes } from "@/lib/validations/contact";
import { site } from "@/content/site";
import { cn } from "@/lib/utils";

/**
 * "Prefiero que me llamen": tercera vía de contacto de /propuesta.
 *
 * Despliega en el lugar (sin modal) un form corto: nombre, teléfono, unidades,
 * quién consulta y un horario opcional. Usa la misma server action que el
 * formulario principal con `source = propuesta-llamada`, así que cuenta como
 * `lead_srv` y el mail sale con asunto "Pedido de llamada".
 *
 * Sin JS (o antes de hidratar) el disparador es un link al formulario principal,
 * que también pide teléfono: la vía degrada al pedido normal.
 */

const IDP = "cb-";

type CallbackRequestProps = {
  /** Ancla del formulario principal, para cuando no hay JS. */
  fallbackHref: string;
  /** Clases base compartidas con los botones de WhatsApp y Llamar. */
  baseClassName: string;
};

function SubmitButton() {
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
        "Pedir la llamada"
      )}
    </Button>
  );
}

export function CallbackRequest({ fallbackHref, baseClassName }: CallbackRequestProps) {
  const panelId = useId();
  const [hydrated, setHydrated] = useState(false);
  const [open, setOpen] = useState(false);
  const [attribution, setAttribution] = useState("");
  const [state, formAction] = useActionState<ContactFormState, FormData>(submitContact, {
    status: "idle",
  });
  const nameRef = useRef<HTMLInputElement>(null);
  const successRef = useRef<HTMLHeadingElement>(null);
  // Solo se enfoca al abrir con el botón, no al montar.
  const focusOnOpen = useRef(false);

  useEffect(() => {
    setHydrated(true);
    setAttribution(JSON.stringify(getAttribution()));
  }, []);

  useEffect(() => {
    if (open && focusOnOpen.current) {
      focusOnOpen.current = false;
      nameRef.current?.focus();
    }
  }, [open]);

  useEffect(() => {
    if (state.status === "success") {
      trackEvent("generate_lead", { form_source: CALLBACK_SOURCE });
      successRef.current?.focus();
    }
  }, [state.status]);

  const triggerClass = cn(
    baseClassName,
    "border border-navy-900/30 bg-transparent text-navy-900 hover:bg-cream-100",
  );
  const label = (
    <>
      <PhoneIncoming aria-hidden="true" strokeWidth={1.75} className="h-4 w-4" />
      Prefiero que me llamen
    </>
  );

  const errors = state.errors ?? {};
  const values = state.values ?? {};

  return (
    <div className="mt-3">
      {hydrated ? (
        <button
          type="button"
          aria-expanded={open}
          aria-controls={panelId}
          onClick={() => {
            if (!open) focusOnOpen.current = true;
            setOpen(!open);
          }}
          className={triggerClass}
        >
          {label}
          <ChevronDown
            aria-hidden="true"
            strokeWidth={1.75}
            className={cn(
              "h-4 w-4 text-ink-500 transition-transform duration-200 motion-reduce:transition-none",
              open && "rotate-180",
            )}
          />
        </button>
      ) : (
        <a href={fallbackHref} className={triggerClass}>
          {label}
        </a>
      )}

      <div
        id={panelId}
        hidden={!open}
        className="mt-3 rounded-xl border border-cream-300 bg-cream-50 p-5 sm:p-6"
      >
        {state.status === "success" ? (
          <div className="flex items-start gap-4">
            <span className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-terra-100 text-terra-700">
              <CheckCircle2 aria-hidden="true" strokeWidth={1.5} className="h-5 w-5" />
            </span>
            <div>
              <h3
                ref={successRef}
                tabIndex={-1}
                className="font-display text-[1.3rem] leading-tight tracking-tight text-navy-900 focus:outline-none"
              >
                Pedido recibido
              </h3>
              <p className="mt-2 text-[15px] leading-relaxed text-ink-700">
                Los llamamos al número que dejaron. {site.hours.responseNote} Si
                prefieren no esperar, también pueden escribirnos por WhatsApp.
              </p>
            </div>
          </div>
        ) : (
          <form
            id={`contact-form-${CALLBACK_SOURCE}`}
            action={formAction}
            noValidate
            className="relative flex flex-col gap-5"
          >
            <Honeypot id={`${IDP}company_website`} />
            <input type="hidden" name="source" value={CALLBACK_SOURCE} />
            <input type="hidden" name="attribution" value={attribution} />

            <p className="text-[14px] leading-snug text-ink-700">
              Déjennos un teléfono y los llamamos en horario de atención (
              {site.hours.label.toLowerCase()}).
            </p>

            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 sm:gap-x-4">
              <Field label="Nombre" name="name" id={`${IDP}name`} required error={errors.name}>
                <TextInput
                  ref={nameRef}
                  id={`${IDP}name`}
                  name="name"
                  autoComplete="name"
                  placeholder="Nombre y apellido"
                  defaultValue={values.name ?? ""}
                  invalid={Boolean(errors.name)}
                  aria-describedby={errors.name ? `${IDP}name-error` : undefined}
                  required
                />
              </Field>
              <Field
                label="Teléfono"
                name="phone"
                id={`${IDP}phone`}
                required
                error={errors.phone}
              >
                <TextInput
                  id={`${IDP}phone`}
                  name="phone"
                  type="tel"
                  inputMode="tel"
                  autoComplete="tel"
                  placeholder="11 2345-6789"
                  defaultValue={values.phone ?? ""}
                  invalid={Boolean(errors.phone)}
                  aria-describedby={errors.phone ? `${IDP}phone-error` : undefined}
                  required
                />
              </Field>
            </div>

            <QualificationFields errors={errors} values={values} idPrefix={IDP} />

            <fieldset>
              <legend className="mb-2 text-[13px] font-medium tracking-[0.005em] text-navy-900">
                Mejor horario{" "}
                <span className="font-normal text-ink-700/80">(opcional)</span>
              </legend>
              <div className="flex flex-wrap gap-2">
                {callTimes.map((value) => (
                  <label
                    key={value}
                    className="inline-flex h-10 cursor-pointer items-center gap-2 rounded-full border border-cream-300 bg-cream-50 px-4 text-[14px] text-ink-900 transition-colors duration-150 hover:border-navy-900/40 has-[:checked]:border-navy-900 has-[:checked]:bg-navy-900 has-[:checked]:text-cream-50 has-[:focus-visible]:ring-2 has-[:focus-visible]:ring-navy-900/30 has-[:focus-visible]:ring-offset-2"
                  >
                    <input
                      type="radio"
                      name="callTime"
                      value={value}
                      defaultChecked={values.callTime === value}
                      className="sr-only"
                    />
                    {callTimeLabels[value]}
                  </label>
                ))}
              </div>
            </fieldset>

            {state.status === "error" && state.message ? (
              <p
                role="alert"
                className="rounded-md border border-terra-700/30 bg-terra-100/50 px-4 py-3 text-[14px] text-terra-900"
              >
                {state.message}
              </p>
            ) : null}

            <div className="pt-1">
              <SubmitButton />
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
