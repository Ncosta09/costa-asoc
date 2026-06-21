import type { Metadata } from "next";
import { BadgeCheck } from "lucide-react";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/ui/reveal";
import { ServicesDetail } from "@/components/servicios/services-detail";
import { TransparencyBlock } from "@/components/servicios/transparency-block";
import { RelatedPosts } from "@/components/blog/related-posts";
import { FaqSection } from "@/components/ui/faq-section";
import { buildMetadata } from "@/lib/seo";
import { breadcrumbSchema } from "@/lib/schema";
import { servicesFaq } from "@/content/faq";
import { site } from "@/content/site";

export const metadata: Metadata = buildMetadata({
  title: "Administración de consorcios en Buenos Aires",
  description:
    "Liquidación de expensas, control financiero, personal, obras, asambleas y guardia 24/7. Estudio contable matriculado (RPA 8192) con cuentas a nombre del consorcio.",
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

      {/* HERO SEO */}
      <Section spacing="tight" className="pt-24 sm:pt-28">
        <Container>
          <div className="max-w-[64ch]">
            <p className="text-xs font-medium uppercase tracking-[0.18em] text-terra-700">
              Servicios
            </p>
            <h1 className="mt-3 font-display text-[2.5rem] leading-[1.04] tracking-[-0.025em] text-balance text-navy-900 sm:text-[3.5rem]">
              Administración de consorcios en Buenos Aires
            </h1>
            <p className="mt-6 max-w-[60ch] text-[18px] leading-relaxed text-ink-800">
              Estudio contable matriculado con Contadores Públicos al frente de cada
              edificio, cuentas bancarias a nombre de tu consorcio y rendición
              transparente. Administramos consorcios en CABA desde {site.founded}.
            </p>
            <p className="mt-5 max-w-[60ch] text-[16px] leading-relaxed text-ink-700">
              Administramos consorcios residenciales y torres corporativas con un
              diferencial concreto: somos un estudio contable, no una administración
              más. Eso significa control financiero real y un consejo de administración
              que siempre sabe en qué se gasta cada peso.
            </p>

            <ul className="mt-9 flex flex-wrap items-center gap-2.5">
              {site.registries.map((r) => (
                <li key={r.label}>
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-cream-100 px-3.5 py-1.5 text-[13px] font-medium text-navy-900 ring-1 ring-cream-300">
                    <BadgeCheck strokeWidth={1.75} className="h-3.5 w-3.5 text-terra-700" />
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

            <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:items-center">
              <Button href="/contacto" variant="primary" size="lg">
                Solicitar propuesta sin cargo
              </Button>
              <Button href="/nosotros" variant="secondary" size="lg">
                Cómo trabajamos
              </Button>
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
        title="Preguntas frecuentes sobre la administración de tu consorcio"
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
              </div>
              <div className="lg:col-span-4 lg:flex lg:justify-end">
                <Button href="/contacto" variant="primary" size="lg">
                  Solicitar propuesta
                </Button>
              </div>
            </div>
          </Reveal>
        </Container>
      </Section>
    </>
  );
}
