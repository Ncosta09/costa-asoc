import type { Metadata } from "next";
import { BadgeCheck, ShieldCheck } from "lucide-react";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/ui/reveal";
import { AttendedBy } from "@/components/ui/attended-by";
import { ContactForm } from "@/components/contacto/contact-form";
import { DirectContact } from "@/components/contacto/direct-contact";
import { ServicesDetail } from "@/components/servicios/services-detail";
import { TransparencyBlock } from "@/components/servicios/transparency-block";
import { RelatedPosts } from "@/components/blog/related-posts";
import { FaqSection } from "@/components/ui/faq-section";
import { buildMetadata } from "@/lib/seo";
import { breadcrumbSchema } from "@/lib/schema";
import { servicesFaq } from "@/content/faq";
import { site } from "@/content/site";

export const metadata: Metadata = buildMetadata({
  title: "Administradora de consorcios en CABA: servicios",
  description:
    "Administradora de consorcios con mirada contable: expensas, control financiero, personal, obras, asambleas y guardia para emergencias. RPA 8192, cuentas del consorcio.",
  path: "/servicios",
});

export default function ServiciosPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            breadcrumbSchema([
              { name: "Inicio", url: site.url },
              { name: "Servicios", url: `${site.url}/servicios` },
            ]),
          ),
        }}
      />

      {/* HERO: message match con las keywords de la campaña ("administrador de
          consorcios caba", "cambiar administrador"). El <title> NO cambia: la regla de
          canibalización home vs /servicios (auditoría 2026-07-10) es sobre el title, y
          el de acá ya dice "Administradora de consorcios en CABA: servicios". */}
      <Section spacing="tight" className="pt-20 sm:pt-28 lg:pt-20">
        <Container>
          <div className="grid grid-cols-1 gap-x-16 gap-y-12 lg:grid-cols-12">
            <div className="lg:col-span-7">
              <p className="text-xs font-medium uppercase tracking-[0.18em] text-terra-700">
                Servicios
              </p>
              <h1 className="mt-3 font-display text-[2.15rem] leading-[1.05] tracking-[-0.025em] text-balance text-navy-900 sm:text-[3.25rem]">
                Administración de consorcios en CABA a cargo de Contadores Públicos
              </h1>
              <p className="mt-5 max-w-[60ch] text-[17px] leading-relaxed text-ink-800 sm:mt-6 sm:text-[18px]">
                Somos un estudio contable, no una administración más: cuentas bancarias
                a nombre del consorcio, rendición transparente y un consejo de
                administración que sabe en qué se gasta cada peso. Residenciales y
                torres corporativas, desde {site.founded}.
              </p>

              {/* Un solo botón en mobile, a propósito (medido el 2026-09-18 a 390x844):
                  el banner de cookies arranca en y=709 y con tres botones WhatsApp y
                  "Cómo trabajamos" quedaban inclickeables. En mobile el botón baja al
                  formulario de esta misma página (sin ir a /contacto); en desktop el
                  formulario ya está a la derecha, así que el lugar lo toman WhatsApp y
                  teléfono. La línea del período de evaluación va pegada al botón: es
                  la respuesta al miedo principal del que quiere cambiar. */}
              <div className="mt-7 sm:mt-8">
                <Button
                  href="#pedir-propuesta"
                  variant="primary"
                  size="lg"
                  className="w-full sm:w-auto lg:hidden"
                >
                  Solicitar propuesta sin cargo
                </Button>
                <DirectContact className="hidden max-w-[30rem] lg:block" showDetails={false} />
                <p className="mt-3 flex items-center gap-2 text-[14px] text-ink-700">
                  <ShieldCheck
                    aria-hidden="true"
                    strokeWidth={1.75}
                    className="h-4 w-4 shrink-0 text-terra-700"
                  />
                  Período de evaluación sin penalidades.
                </p>
              </div>

              <AttendedBy className="mt-8" />

              <ul className="mt-8 flex flex-wrap items-center gap-2.5">
                {site.registries.map((r) => (
                  <li key={r.label}>
                    <span className="inline-flex items-center gap-1.5 rounded-full bg-cream-100 px-3.5 py-1.5 text-[13px] font-medium text-navy-900 ring-1 ring-cream-300">
                      <BadgeCheck aria-hidden="true" strokeWidth={1.75} className="h-3.5 w-3.5 text-terra-700" />
                      {r.short}
                    </span>
                  </li>
                ))}
                <li>
                  <span className="inline-flex items-center rounded-full bg-cream-100 px-3.5 py-1.5 text-[13px] font-medium text-navy-900 ring-1 ring-cream-300">
                    Cuentas a nombre del consorcio
                  </span>
                </li>
              </ul>
            </div>

            {/* Columna derecha (vacía hasta ahora en desktop): el pedido en la página.
                En mobile cae debajo del hero y es el destino del botón de arriba. */}
            <div id="pedir-propuesta" className="scroll-mt-header lg:col-span-5">
              <div className="rounded-xl border border-cream-300 bg-cream-50 p-5 shadow-card sm:p-8">
                <h2 className="font-display text-[1.4rem] leading-tight tracking-tight text-navy-900 sm:text-[1.6rem]">
                  Pidan una propuesta sin cargo
                </h2>
                <p className="mt-2 text-[14px] leading-snug text-ink-700">
                  Tres datos alcanzan. El resto lo vemos en la primera reunión.
                </p>
                <ContactForm variant="compact" source="servicios" className="mt-5" />
              </div>
              <DirectContact className="mt-6 lg:hidden" />
            </div>
          </div>
        </Container>
      </Section>

      <ServicesDetail />

      <TransparencyBlock />

      <RelatedPosts
        eyebrow="Recursos"
        title="Guías para el consejo de administración"
        tone="default"
      />

      <FaqSection
        items={servicesFaq}
        title="Preguntas frecuentes sobre la administración de su consorcio"
        tone="muted"
      />

      <Section tone="navy" spacing="default">
        <Container>
          <Reveal>
            <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:items-end">
              <div className="lg:col-span-8">
                <h2 className="font-display text-[2rem] leading-[1.05] tracking-[-0.02em] text-balance text-cream-50 sm:text-[2.5rem]">
                  Hablemos del edificio
                </h2>
                <p className="mt-4 max-w-[58ch] text-[16.5px] leading-relaxed text-cream-100/85">
                  Cada propuesta se arma a medida, según la complejidad operativa y las
                  prioridades que defina el consejo.
                </p>
                <AttendedBy tone="dark" className="mt-8" />
              </div>
              <div className="flex flex-col gap-4 lg:col-span-4">
                <Button href="#pedir-propuesta" variant="primary" size="lg" className="w-full">
                  Solicitar propuesta
                </Button>
                <DirectContact tone="dark" />
              </div>
            </div>
          </Reveal>
        </Container>
      </Section>
    </>
  );
}
