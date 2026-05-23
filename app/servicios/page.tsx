import type { Metadata } from "next";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/ui/reveal";
import { ServiceCategories } from "@/components/servicios/service-category";
import { TransparencyBlock } from "@/components/servicios/transparency-block";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Servicios de administración integral",
  description:
    "Liquidación de expensas, control financiero, gestión de personal y proveedores, asambleas, mantenimiento y guardia 24/7. Servicios completos de administración de consorcios.",
  path: "/servicios",
});

export default function ServiciosPage() {
  return (
    <>
      <Section spacing="tight" className="pt-24 sm:pt-28">
        <Container>
          <div className="max-w-[60ch]">
            <p className="text-xs font-medium uppercase tracking-[0.18em] text-terra-700">
              Servicios
            </p>
            <h1 className="mt-3 font-display text-[2.5rem] leading-[1.04] tracking-[-0.025em] text-balance text-navy-900 sm:text-[3.5rem]">
              Servicios de administración integral
            </h1>
            <p className="mt-6 max-w-[58ch] text-[17px] leading-relaxed text-ink-700">
              Cuatro áreas que cubren la operación completa del consorcio. Desde la
              liquidación mensual hasta la guardia para emergencias.
            </p>
          </div>
        </Container>
      </Section>

      <ServiceCategories />

      <TransparencyBlock />

      <Section tone="navy" spacing="default" className="relative overflow-hidden">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -left-32 -bottom-32 h-80 w-80 rounded-full bg-terra-700/20 blur-3xl"
        />
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
