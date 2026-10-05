import type { Metadata } from "next";
import { BadgeCheck, ShieldCheck } from "lucide-react";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/ui/reveal";
import { AttendedBy } from "@/components/ui/attended-by";
import { FaqSection } from "@/components/ui/faq-section";
import { ContactForm } from "@/components/contacto/contact-form";
import { DirectContact } from "@/components/contacto/direct-contact";
import { HowWeWork } from "@/components/nosotros/how-we-work";
import { buildMetadata } from "@/lib/seo";
import { propuestaFaq } from "@/content/faq";
import { site } from "@/content/site";

/**
 * Landing de Google Ads (doc 08, "Landing dedicada /propuesta").
 *
 * - `noindex` por meta tag y NO bloqueada en robots.txt: si se bloquea, Googlebot no
 *   puede leer el noindex. Tampoco va al sitemap ni se linkea desde el nav o el footer.
 * - Sin nav ni footer del sitio (ver `components/layout/hide-on-routes.tsx`).
 * - El pedido arriba: en desktop el formulario ocupa la columna derecha del hero; en
 *   mobile va apenas debajo del H1 y de WhatsApp/teléfono, que convierten más.
 */

const base = buildMetadata({
  title: "Administración de consorcios en CABA",
  description:
    "Administración de consorcios en CABA con Contadores Públicos al frente. Cuentas a nombre del consorcio y período de evaluación sin penalidades.",
  path: "/propuesta",
});

export const metadata: Metadata = {
  ...base,
  robots: {
    index: false,
    follow: true,
    googleBot: { index: false, follow: true },
  },
};

const FORM_ID = "pedir-propuesta";

export default function PropuestaPage() {
  return (
    <>
      <Section spacing="tight" className="pt-6 pb-16 sm:pt-14 lg:pt-16 lg:pb-24">
        <Container>
          {/* Orden del DOM = orden en mobile: titular, contacto directo, formulario,
              credenciales. En desktop el formulario sube a la columna derecha. */}
          <div className="grid grid-cols-1 gap-x-16 gap-y-7 lg:grid-cols-12 lg:gap-y-8">
            <div className="lg:col-span-7 lg:row-start-1 lg:pt-6">
              <p className="hidden text-xs font-medium uppercase tracking-[0.18em] text-terra-700 sm:block">
                Estudio contable · Desde {site.founded}
              </p>
              <h1 className="font-display text-[2.05rem] leading-[1.06] tracking-[-0.025em] text-balance text-navy-900 sm:mt-3 sm:text-[3rem] lg:text-[3.5rem]">
                Administración de consorcios en CABA, con Contadores Públicos al frente
              </h1>
              <p className="mt-4 max-w-[54ch] text-pretty text-[16.5px] leading-relaxed text-ink-800 sm:mt-6 sm:text-[18px]">
                Cuentas a nombre del consorcio, rendición clara y un período de
                evaluación sin penalidades si deciden cambiar de administrador.
              </p>
            </div>

            <div className="lg:col-span-7 lg:row-start-2 lg:max-w-[30rem]">
              <DirectContact />
            </div>

            <div
              id={FORM_ID}
              className="scroll-mt-header lg:col-span-5 lg:col-start-8 lg:row-span-3 lg:row-start-1"
            >
              <div className="rounded-xl border border-cream-300 bg-cream-50 p-5 shadow-card sm:p-8">
                <h2 className="font-display text-[1.4rem] leading-tight tracking-tight text-navy-900 sm:text-[1.6rem]">
                  Pidan una propuesta sin cargo
                </h2>
                <p className="mt-2 flex items-start gap-2 text-[14px] leading-snug text-ink-700">
                  <ShieldCheck
                    aria-hidden="true"
                    strokeWidth={1.75}
                    className="mt-px h-4 w-4 shrink-0 text-terra-700"
                  />
                  Período de evaluación sin penalidades.
                </p>
                <ContactForm variant="compact" source="propuesta" className="mt-5" />
              </div>
            </div>

            <div className="flex flex-col gap-6 lg:col-span-7 lg:row-start-3">
              <ul className="flex flex-wrap items-center gap-2.5">
                {site.registries.map((r) => (
                  <li key={r.label}>
                    <span className="inline-flex items-center gap-1.5 rounded-full bg-cream-100 px-3.5 py-1.5 text-[13px] font-medium text-navy-900 ring-1 ring-cream-300">
                      <BadgeCheck aria-hidden="true" strokeWidth={1.75} className="h-3.5 w-3.5 text-terra-700" />
                      {r.label}
                    </span>
                  </li>
                ))}
              </ul>
              <AttendedBy />
            </div>
          </div>
        </Container>
      </Section>

      <HowWeWork />

      <FaqSection
        items={propuestaFaq}
        title="Lo que suelen preguntar antes de cambiar"
        tone="default"
      />

      <Section tone="navy" spacing="default">
        <Container>
          <Reveal>
            <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:items-center">
              <div className="lg:col-span-7">
                <h2 className="font-display text-[2rem] leading-[1.05] tracking-[-0.02em] text-balance text-cream-50 sm:text-[2.5rem]">
                  Hablemos del edificio
                </h2>
                <p className="mt-4 max-w-[54ch] text-[16.5px] leading-relaxed text-cream-100/85">
                  Una primera reunión sin compromiso para conocer el consorcio y armar
                  una propuesta a medida. {site.hours.responseNote}
                </p>
                <AttendedBy tone="dark" className="mt-8" />
              </div>
              <div className="flex flex-col gap-4 lg:col-span-5">
                <DirectContact tone="dark" />
                <Button
                  href={`#${FORM_ID}`}
                  variant="primary"
                  size="lg"
                  className="w-full"
                >
                  Completar el formulario
                </Button>
              </div>
            </div>
          </Reveal>
        </Container>
      </Section>

      {/* Footer propio: datos de la oficina, sin links de navegación. */}
      <footer className="border-t border-cream-200 bg-cream-100 text-ink-700">
        <Container className="flex flex-col gap-3 py-10 text-[13.5px] leading-relaxed sm:flex-row sm:items-center sm:justify-between">
          <p>
            <span className="font-medium text-navy-900">{site.name}</span> ·{" "}
            {site.address.street}, {site.address.region} · {site.hours.label}
          </p>
          <p>
            {site.registries.map((r) => r.short).join(" · ")} · ©{" "}
            {new Date().getFullYear()}
          </p>
        </Container>
      </footer>
    </>
  );
}
