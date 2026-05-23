import { MapPin, Phone, Mail, Clock, AlertCircle } from "lucide-react";
import { ContactMap } from "@/components/contacto/contact-map";
import { site } from "@/content/site";

function WhatsAppIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      aria-hidden="true"
      fill="currentColor"
      className={className}
    >
      <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 2.1.66 4.05 1.79 5.66L2 22l4.59-1.86a9.83 9.83 0 0 0 5.45 1.62h.01c5.46 0 9.91-4.45 9.91-9.91A9.84 9.84 0 0 0 19.09 4.81 9.83 9.83 0 0 0 12.04 2Zm0 18.04h-.01a8.13 8.13 0 0 1-4.14-1.13l-.3-.18-2.72 1.1.92-2.65-.2-.31a8.16 8.16 0 0 1-1.25-4.36c0-4.51 3.67-8.18 8.19-8.18a8.13 8.13 0 0 1 5.79 2.4 8.13 8.13 0 0 1 2.4 5.79c0 4.52-3.67 8.52-8.18 8.52Zm4.72-6.13c-.26-.13-1.53-.75-1.76-.84-.24-.09-.41-.13-.58.13-.17.26-.66.84-.81 1.01-.15.17-.3.19-.55.06-.26-.13-1.09-.4-2.07-1.28a7.76 7.76 0 0 1-1.43-1.78c-.15-.26-.02-.4.11-.53.12-.12.26-.3.39-.45.13-.15.17-.26.26-.43.09-.17.04-.32-.02-.45-.06-.13-.58-1.4-.79-1.92-.21-.51-.42-.44-.58-.45h-.5c-.17 0-.45.06-.69.32-.24.26-.91.89-.91 2.16 0 1.27.93 2.5 1.06 2.67.13.17 1.83 2.8 4.43 3.92.62.27 1.1.43 1.48.55.62.2 1.18.17 1.63.1.5-.07 1.53-.62 1.75-1.22.21-.6.21-1.12.15-1.22-.06-.1-.24-.17-.5-.3Z" />
    </svg>
  );
}

export function OfficeInfo() {
  return (
    <div className="flex flex-col gap-8">
      <ContactMap />

      <ul className="flex flex-col divide-y divide-cream-200 border-y border-cream-200">
        <li className="grid grid-cols-[auto,1fr] items-start gap-4 py-5">
          <span className="mt-1 inline-flex h-9 w-9 items-center justify-center rounded-md bg-navy-100 text-navy-900">
            <MapPin strokeWidth={1.5} className="h-4.5 w-4.5" />
          </span>
          <div>
            <p className="font-display text-[1.05rem] tracking-tight text-navy-900">
              {site.address.street}
            </p>
            <p className="mt-1 text-[14px] text-ink-700">{site.address.city}</p>
          </div>
        </li>

        <li className="grid grid-cols-[auto,1fr] items-start gap-4 py-5">
          <span className="mt-1 inline-flex h-9 w-9 items-center justify-center rounded-md bg-navy-100 text-navy-900">
            <Clock strokeWidth={1.5} className="h-4.5 w-4.5" />
          </span>
          <div>
            <p className="font-display text-[1.05rem] tracking-tight text-navy-900">
              Horario de atención
            </p>
            <p className="mt-1 text-[14px] text-ink-700">{site.hours.label}</p>
          </div>
        </li>

        <li className="grid grid-cols-[auto,1fr] items-start gap-4 py-5">
          <span className="mt-1 inline-flex h-9 w-9 items-center justify-center rounded-md bg-navy-100 text-navy-900">
            <Phone strokeWidth={1.5} className="h-4.5 w-4.5" />
          </span>
          <div>
            <p className="font-display text-[1.05rem] tracking-tight text-navy-900">
              Teléfono
            </p>
            <a
              href={site.contact.phoneHref}
              className="mt-1 inline-block text-[14px] text-ink-700 transition-colors hover:text-navy-900"
            >
              {site.contact.phone}
            </a>
          </div>
        </li>

        <li className="grid grid-cols-[auto,1fr] items-start gap-4 py-5">
          <span className="mt-1 inline-flex h-9 w-9 items-center justify-center rounded-md bg-navy-100 text-navy-900">
            <Mail strokeWidth={1.5} className="h-4.5 w-4.5" />
          </span>
          <div>
            <p className="font-display text-[1.05rem] tracking-tight text-navy-900">
              Email
            </p>
            <a
              href={site.contact.emailHref}
              className="mt-1 inline-block text-[14px] text-ink-700 transition-colors hover:text-navy-900"
            >
              {site.contact.email}
            </a>
          </div>
        </li>
      </ul>

      <a
        href={site.contact.whatsappHref}
        target="_blank"
        rel="noopener noreferrer"
        className="group inline-flex items-center justify-center gap-3 rounded-md bg-[#25D366] px-5 py-3.5 text-[15px] font-medium text-white shadow-[0_8px_24px_-12px_rgba(37,211,102,0.55)] transition-[background-color,transform] duration-200 hover:bg-[#1FB955] active:translate-y-px"
      >
        <WhatsAppIcon className="h-5 w-5" />
        <span>Escribinos por WhatsApp</span>
      </a>

      <div className="grid grid-cols-[auto,1fr] items-start gap-3 rounded-lg border border-terra-700/20 bg-terra-100/40 p-4">
        <AlertCircle strokeWidth={1.5} className="mt-0.5 h-5 w-5 text-terra-700" />
        <p className="text-[13.5px] leading-relaxed text-ink-800">
          <span className="font-medium text-terra-900">Guardia 24/7.</span> Fuera del
          horario de oficina atendemos emergencias edilicias por la línea directa de
          guardia indicada en el contrato de administración.
        </p>
      </div>
    </div>
  );
}
