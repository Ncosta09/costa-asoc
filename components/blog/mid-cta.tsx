import Link from "next/link";
import { WhatsAppIcon } from "@/components/ui/whatsapp-icon";
import { midCtaCopy, type MidCtaVariant } from "@/content/blog-cta";
import { site } from "@/content/site";

const MENSAJE = "Hola, leí la nota del blog y queremos evaluar un cambio de administrador.";

/**
 * Pedido a mitad de nota, solo en las notas con intención de cambio (ver
 * `content/blog-cta.ts`). Lo inserta `lib/remark-mid-cta.ts` antes de un H2.
 * El click de WhatsApp lo mide el listener delegado (href con `wa.me`).
 */
export function BlogMidCta({ variant }: { variant: MidCtaVariant }) {
  const copy = midCtaCopy[variant];
  return (
    <aside
      aria-label="Cambio de administrador"
      className="relative my-12 rounded-2xl border border-cream-200 bg-cream-100/70 p-6 before:absolute before:inset-y-6 before:left-0 before:w-[3px] before:rounded-full before:bg-terra-700 before:content-[''] sm:p-8 sm:before:inset-y-8"
    >
      <p className="font-display text-[1.3rem] leading-tight tracking-tight text-balance text-navy-900 sm:text-[1.45rem]">
        {copy.title}
      </p>
      <p className="mt-3 max-w-[54ch] text-[15.5px] leading-relaxed text-ink-700">
        {copy.body}
      </p>
      <div className="mt-5 flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-5">
        <a
          href={`${site.contact.whatsappHref}?text=${encodeURIComponent(MENSAJE)}`}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex h-11 items-center justify-center gap-2.5 rounded-md bg-navy-900 px-5 text-[15px] font-medium text-cream-50 transition-colors duration-200 hover:bg-navy-800 active:translate-y-px focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-navy-900 focus-visible:ring-offset-2 focus-visible:ring-offset-cream-100"
        >
          <WhatsAppIcon className="h-[18px] w-[18px]" />
          Escribirnos por WhatsApp
        </a>
        <Link
          href="/contacto"
          className="text-[15px] font-medium text-terra-700 underline decoration-terra-700/30 underline-offset-4 transition-colors hover:decoration-terra-700"
        >
          O pedir una propuesta por el formulario
        </Link>
      </div>
    </aside>
  );
}
