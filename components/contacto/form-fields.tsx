import type {
  InputHTMLAttributes,
  Ref,
  SelectHTMLAttributes,
  TextareaHTMLAttributes,
  ReactNode,
} from "react";
import { cn } from "@/lib/utils";
import {
  roleLabels,
  roles,
  unitRangeLabels,
  unitRanges,
} from "@/lib/validations/contact";

type FieldProps = {
  label: string;
  name: string;
  /** id del control si difiere de `name` (dos formularios en la misma página). */
  id?: string;
  required?: boolean;
  error?: string;
  hint?: string;
  /** Para etiquetas secundarias (p. ej. las opciones dentro de un fieldset). */
  labelClassName?: string;
  className?: string;
  children: ReactNode;
};

export function Field({
  label,
  name,
  id = name,
  required,
  error,
  hint,
  labelClassName,
  className,
  children,
}: FieldProps) {
  const hintId = hint ? `${id}-hint` : undefined;
  const errorId = error ? `${id}-error` : undefined;
  return (
    <div className={cn("flex flex-col gap-2", className)}>
      <label
        htmlFor={id}
        className={cn("text-[13px] font-medium tracking-[0.005em] text-navy-900", labelClassName)}
      >
        {label}
        {required ? (
          <span aria-hidden="true" className="ml-1 text-terra-700">
            *
          </span>
        ) : null}
      </label>
      {children}
      {hint && !error ? (
        <p id={hintId} className="text-[12.5px] text-ink-500">
          {hint}
        </p>
      ) : null}
      {error ? (
        <p id={errorId} role="alert" className="text-[12.5px] text-terra-700">
          {error}
        </p>
      ) : null}
    </div>
  );
}

const baseControl =
  "h-11 w-full rounded-md border border-cream-300 bg-cream-50 px-3.5 text-[15px] text-ink-900 placeholder:text-ink-300 transition-colors duration-150 focus:border-navy-900 focus:outline-none focus:ring-2 focus:ring-navy-900/15 disabled:opacity-60 disabled:bg-cream-100";

export function TextInput({
  className,
  invalid,
  ...props
}: InputHTMLAttributes<HTMLInputElement> & {
  invalid?: boolean;
  ref?: Ref<HTMLInputElement>;
}) {
  return (
    <input
      className={cn(
        baseControl,
        invalid && "border-terra-700 focus:border-terra-700 focus:ring-terra-700/20",
        className,
      )}
      aria-invalid={invalid ? true : undefined}
      {...props}
    />
  );
}

export function NumberInput(
  props: InputHTMLAttributes<HTMLInputElement> & { invalid?: boolean },
) {
  return <TextInput type="number" inputMode="numeric" min={1} {...props} />;
}

export function Select({
  className,
  invalid,
  children,
  ...props
}: SelectHTMLAttributes<HTMLSelectElement> & { invalid?: boolean }) {
  return (
    <div className="relative">
      <select
        className={cn(
          baseControl,
          "appearance-none pr-10",
          invalid && "border-terra-700 focus:border-terra-700 focus:ring-terra-700/20",
          className,
        )}
        aria-invalid={invalid ? true : undefined}
        {...props}
      >
        {children}
      </select>
      <svg
        aria-hidden="true"
        viewBox="0 0 20 20"
        className="pointer-events-none absolute right-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-ink-500"
      >
        <path
          d="M6 8l4 4 4-4"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </div>
  );
}

export function Textarea({
  className,
  invalid,
  ...props
}: TextareaHTMLAttributes<HTMLTextAreaElement> & { invalid?: boolean }) {
  return (
    <textarea
      className={cn(
        "min-h-[120px] w-full rounded-md border border-cream-300 bg-cream-50 px-3.5 py-3 text-[15px] text-ink-900 placeholder:text-ink-300 transition-colors duration-150 focus:border-navy-900 focus:outline-none focus:ring-2 focus:ring-navy-900/15 disabled:opacity-60 disabled:bg-cream-100",
        invalid && "border-terra-700 focus:border-terra-700 focus:ring-terra-700/20",
        className,
      )}
      aria-invalid={invalid ? true : undefined}
      {...props}
    />
  );
}

export function Honeypot({ id = "company_website" }: { id?: string }) {
  return (
    <div
      aria-hidden="true"
      className="absolute left-[-9999px] top-[-9999px] h-px w-px opacity-0"
    >
      <label htmlFor={id}>No completar este campo</label>
      <input
        type="text"
        id={id}
        name="company_website"
        autoComplete="off"
        tabIndex={-1}
      />
    </div>
  );
}

const subgridField = "sm:row-span-3 sm:grid sm:grid-rows-subgrid sm:content-start";

type QualificationFieldsProps = {
  errors: Partial<Record<string, string>>;
  values: Record<string, string>;
  /** Prefijo de ids cuando hay más de un formulario en la página. */
  idPrefix?: string;
  className?: string;
};

/**
 * Unidades del edificio y quién consulta: obligatorios en todos los formularios.
 * Dos selects en una fila desde `sm`. Cada campo es un subgrid de 3 filas (etiqueta,
 * control, error): si una etiqueta ocupa dos líneas, los dos selects siguen alineados.
 */
export function QualificationFields({
  errors,
  values,
  idPrefix = "",
  className,
}: QualificationFieldsProps) {
  const unitsId = `${idPrefix}units`;
  const roleId = `${idPrefix}role`;
  return (
    <div
      className={cn("grid grid-cols-1 gap-5 sm:grid-cols-2 sm:gap-x-4 sm:gap-y-2", className)}
    >
      <Field
        label="Cantidad de unidades del edificio"
        name="units"
        id={unitsId}
        required
        error={errors.units}
        className={subgridField}
      >
        <Select
          id={unitsId}
          name="units"
          required
          defaultValue={values.units ?? ""}
          invalid={Boolean(errors.units)}
          aria-describedby={errors.units ? `${unitsId}-error` : undefined}
        >
          <option value="" disabled>
            Seleccionar…
          </option>
          {unitRanges.map((value) => (
            <option key={value} value={value}>
              {unitRangeLabels[value]}
            </option>
          ))}
        </Select>
      </Field>
      <Field
        label="Ustedes son"
        name="role"
        id={roleId}
        required
        error={errors.role}
        className={subgridField}
      >
        <Select
          id={roleId}
          name="role"
          required
          defaultValue={values.role ?? ""}
          invalid={Boolean(errors.role)}
          aria-describedby={errors.role ? `${roleId}-error` : undefined}
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
  );
}
