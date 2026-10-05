import { MapPin, Phone, Mail, Clock, AlertCircle } from "lucide-react";
import { site } from "@/content/site";

export function OfficeInfo() {
  return (
    <div className="flex flex-col gap-8">
      <ul className="flex flex-col divide-y divide-cream-200 border-y border-cream-200">
        <li className="grid grid-cols-[auto_1fr] items-start gap-4 py-5">
          <span className="mt-1 inline-flex h-9 w-9 items-center justify-center rounded-md bg-navy-100 text-navy-900">
            <MapPin aria-hidden="true" strokeWidth={1.5} className="h-4.5 w-4.5" />
          </span>
          <div>
            <p className="font-display text-[1.05rem] tracking-tight text-navy-900">
              {site.address.street}
            </p>
            <p className="mt-1 text-[14px] text-ink-700">{site.address.city}</p>
            <a
              href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
                `${site.name} ${site.address.street} ${site.address.city}`,
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-2 inline-block text-[13.5px] font-medium text-terra-700 underline decoration-terra-700/30 underline-offset-2 transition-colors hover:decoration-terra-700"
            >
              Ver en Google Maps · Cómo llegar
            </a>
          </div>
        </li>

        <li className="grid grid-cols-[auto_1fr] items-start gap-4 py-5">
          <span className="mt-1 inline-flex h-9 w-9 items-center justify-center rounded-md bg-navy-100 text-navy-900">
            <Clock aria-hidden="true" strokeWidth={1.5} className="h-4.5 w-4.5" />
          </span>
          <div>
            <p className="font-display text-[1.05rem] tracking-tight text-navy-900">
              Horario de atención
            </p>
            <p className="mt-1 text-[14px] text-ink-700">{site.hours.label}</p>
          </div>
        </li>

        <li className="grid grid-cols-[auto_1fr] items-start gap-4 py-5">
          <span className="mt-1 inline-flex h-9 w-9 items-center justify-center rounded-md bg-navy-100 text-navy-900">
            <Phone aria-hidden="true" strokeWidth={1.5} className="h-4.5 w-4.5" />
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

        <li className="grid grid-cols-[auto_1fr] items-start gap-4 py-5">
          <span className="mt-1 inline-flex h-9 w-9 items-center justify-center rounded-md bg-navy-100 text-navy-900">
            <Mail aria-hidden="true" strokeWidth={1.5} className="h-4.5 w-4.5" />
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

      <div className="grid grid-cols-[auto_1fr] items-start gap-3 rounded-lg border border-terra-700/20 bg-terra-100/40 p-4">
        <AlertCircle aria-hidden="true" strokeWidth={1.5} className="mt-0.5 h-5 w-5 text-terra-700" />
        <p className="text-[13.5px] leading-relaxed text-ink-800">
          <span className="font-medium text-terra-900">Guardia para emergencias.</span> Fuera del
          horario de oficina atendemos emergencias edilicias por la línea directa de
          guardia indicada en el contrato de administración.
        </p>
      </div>
    </div>
  );
}
