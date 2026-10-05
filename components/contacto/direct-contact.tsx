import { Phone } from "lucide-react";
import { WhatsAppIcon } from "@/components/ui/whatsapp-icon";
import { site } from "@/content/site";
import { cn } from "@/lib/utils";

/**
 * WhatsApp y teléfono, con el mismo peso visual entre sí y frente al formulario.
 * GA4 a 90 días: en este rubro escriben o llaman antes que completar un form.
 *
 * Los clicks los mide el listener delegado de `components/analytics/analytics.tsx`
 * (`wa.me` → whatsapp_click, `tel:` → phone_click). No hay que cablear nada acá:
 * alcanza con que los href sigan siendo `wa.me/...` y `tel:...`.
 */

const MENSAJE = "Hola, escribo por la administración de nuestro consorcio.";

const base =
  "inline-flex h-12 w-full items-center justify-center gap-2.5 rounded-md px-4 text-[15px] font-medium tracking-[-0.005em] transition-[background-color,color,transform] duration-200 ease-[var(--ease-out-soft)] active:translate-y-px focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--surface,var(--color-cream-50))] focus-visible:ring-[var(--ring,var(--color-navy-900))]";

const tones = {
  light: "bg-navy-900 text-cream-50 hover:bg-navy-800",
  dark: "bg-cream-50 text-navy-900 hover:bg-cream-100",
} as const;

type DirectContactProps = {
  tone?: keyof typeof tones;
  /** Muestra debajo el número y el horario de atención. */
  showDetails?: boolean;
  className?: string;
};

export function DirectContact({
  tone = "light",
  showDetails = true,
  className,
}: DirectContactProps) {
  return (
    <div className={className}>
      <div className="grid grid-cols-2 gap-3">
        <a
          href={`${site.contact.whatsappHref}?text=${encodeURIComponent(MENSAJE)}`}
          target="_blank"
          rel="noopener noreferrer"
          className={cn(base, tones[tone])}
        >
          <WhatsAppIcon className="h-[18px] w-[18px]" />
          WhatsApp
        </a>
        <a href={site.contact.phoneHref} className={cn(base, tones[tone])}>
          <Phone aria-hidden="true" strokeWidth={1.75} className="h-4 w-4" />
          Llamar
        </a>
      </div>
      {showDetails ? (
        <p
          className={cn(
            "mt-2.5 text-[13px] leading-snug",
            tone === "dark" ? "text-cream-100/75" : "text-ink-500",
          )}
        >
          {site.contact.phone} · {site.hours.label}
        </p>
      ) : null}
    </div>
  );
}
