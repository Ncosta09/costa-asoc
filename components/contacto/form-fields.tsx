import type {
  InputHTMLAttributes,
  SelectHTMLAttributes,
  TextareaHTMLAttributes,
  ReactNode,
} from "react";
import { cn } from "@/lib/utils";

type FieldProps = {
  label: string;
  name: string;
  required?: boolean;
  error?: string;
  hint?: string;
  children: ReactNode;
};

export function Field({ label, name, required, error, hint, children }: FieldProps) {
  const hintId = hint ? `${name}-hint` : undefined;
  const errorId = error ? `${name}-error` : undefined;
  return (
    <div className="flex flex-col gap-2">
      <label
        htmlFor={name}
        className="text-[13px] font-medium tracking-[0.005em] text-navy-900"
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
}: InputHTMLAttributes<HTMLInputElement> & { invalid?: boolean }) {
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

export function Honeypot() {
  return (
    <div
      aria-hidden="true"
      className="absolute left-[-9999px] top-[-9999px] h-px w-px opacity-0"
    >
      <label htmlFor="company_website">No completar este campo</label>
      <input
        type="text"
        id="company_website"
        name="company_website"
        autoComplete="off"
        tabIndex={-1}
      />
    </div>
  );
}
