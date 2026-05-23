"use client";

import { useActionState } from "react";
import { useFormStatus } from "react-dom";
import { CheckCircle2, Loader2 } from "lucide-react";
import { submitContact, contactInitialState } from "@/app/contacto/actions";
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
} from "@/lib/validations/contact";
import { Button } from "@/components/ui/button";

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button
      type="submit"
      variant="primary"
      size="lg"
      disabled={pending}
      className="w-full sm:w-auto"
    >
      {pending ? (
        <>
          <Loader2 strokeWidth={1.75} className="h-4 w-4 animate-spin" />
          Enviando…
        </>
      ) : (
        "Enviar consulta"
      )}
    </Button>
  );
}

export function ContactForm() {
  const [state, formAction] = useActionState(submitContact, contactInitialState);

  if (state.status === "success") {
    return (
      <div className="rounded-xl border border-cream-300 bg-cream-50 p-8 sm:p-10">
        <div className="flex flex-col items-start gap-5">
          <span className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-terra-100 text-terra-700">
            <CheckCircle2 strokeWidth={1.5} className="h-6 w-6" />
          </span>
          <div>
            <h2 className="font-display text-[1.75rem] leading-tight tracking-tight text-navy-900">
              Consulta recibida
            </h2>
            <p className="mt-3 max-w-[44ch] text-[16px] leading-relaxed text-ink-700">
              Te respondemos en menos de 24 hs hábiles. Si es urgente, podés
              escribirnos también por WhatsApp desde la columna de la derecha.
            </p>
          </div>
        </div>
      </div>
    );
  }

  const errors = state.errors ?? {};

  return (
    <form action={formAction} noValidate className="flex flex-col gap-5">
      <Honeypot />

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        <Field label="Nombre y apellido" name="name" required error={errors.name}>
          <TextInput
            id="name"
            name="name"
            autoComplete="name"
            placeholder="Tu nombre"
            invalid={Boolean(errors.name)}
            required
          />
        </Field>
        <Field label="Email" name="email" required error={errors.email}>
          <TextInput
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            placeholder="vos@ejemplo.com"
            invalid={Boolean(errors.email)}
            required
          />
        </Field>
      </div>

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        <Field label="Teléfono" name="phone" required error={errors.phone}>
          <TextInput
            id="phone"
            name="phone"
            type="tel"
            autoComplete="tel"
            placeholder="+54 11"
            invalid={Boolean(errors.phone)}
            required
          />
        </Field>
        <Field label="Rol" name="role" required error={errors.role}>
          <Select
            id="role"
            name="role"
            defaultValue=""
            invalid={Boolean(errors.role)}
            required
          >
            <option value="" disabled>
              Seleccionar…
            </option>
            {roles.map((value) => (
              <option key={value} value={value}>
                {roleLabels[value]}
              </option>
            ))}
          </Select>
        </Field>
      </div>

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        <Field
          label="Tipo de edificio"
          name="buildingType"
          required
          error={errors.buildingType}
        >
          <Select
            id="buildingType"
            name="buildingType"
            defaultValue=""
            invalid={Boolean(errors.buildingType)}
            required
          >
            <option value="" disabled>
              Seleccionar…
            </option>
            {buildingTypes.map((value) => (
              <option key={value} value={value}>
                {buildingTypeLabels[value]}
              </option>
            ))}
          </Select>
        </Field>
        <Field
          label="Cantidad de unidades"
          name="units"
          required
          error={errors.units}
          hint="Aproximado"
        >
          <NumberInput
            id="units"
            name="units"
            placeholder="48"
            invalid={Boolean(errors.units)}
            required
          />
        </Field>
      </div>

      <Field
        label="Ubicación del edificio"
        name="neighborhood"
        required
        error={errors.neighborhood}
        hint="Barrio o zona de CABA"
      >
        <TextInput
          id="neighborhood"
          name="neighborhood"
          placeholder="Recoleta, Microcentro, Palermo…"
          invalid={Boolean(errors.neighborhood)}
          required
        />
      </Field>

      <Field
        label="Mensaje o consulta"
        name="message"
        error={errors.message}
        hint="Opcional"
      >
        <Textarea
          id="message"
          name="message"
          placeholder="Contanos brevemente qué necesita el consorcio."
          invalid={Boolean(errors.message)}
        />
      </Field>

      {state.status === "error" && state.message ? (
        <p
          role="alert"
          className="rounded-md border border-terra-700/30 bg-terra-100/50 px-4 py-3 text-[14px] text-terra-900"
        >
          {state.message}
        </p>
      ) : null}

      <div className="flex flex-col-reverse gap-3 pt-2 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-[12.5px] text-ink-500">
          Te respondemos en menos de 24 hs hábiles.
        </p>
        <SubmitButton />
      </div>
    </form>
  );
}
