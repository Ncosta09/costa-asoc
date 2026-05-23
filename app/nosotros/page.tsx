import type { Metadata } from "next";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/ui/reveal";
import { IntroBlock } from "@/components/nosotros/intro-block";
import { PhilosophyList } from "@/components/nosotros/philosophy-list";
import { AccountingEdge } from "@/components/nosotros/accounting-edge";
import { HowWeWork } from "@/components/nosotros/how-we-work";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Nosotros",
  description:
    "Estudio contable con foco en administración de consorcios desde 2009. Matrículas RPA 8192 y CAPHAI 2903. Conocé nuestra filosofía y cómo trabajamos.",
  path: "/nosotros",
});

export default function NosotrosPage() {
  return (
    <>
      <IntroBlock />
      <PhilosophyList />
      <AccountingEdge />
      <HowWeWork />

      <Section tone="navy" spacing="default" className="relative overflow-hidden">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full bg-terra-700/20 blur-3xl"
        />
        <Container>
          <Reveal>
            <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:items-center">
              <div className="lg:col-span-8">
                <h2 className="font-display text-[2rem] leading-[1.05] tracking-[-0.02em] text-balance text-cream-50 sm:text-[2.5rem]">
                  Conozcamos el edificio en una primera reunión
                </h2>
                <p className="mt-5 max-w-[58ch] text-[16.5px] leading-relaxed text-cream-100/85">
                  Sin compromiso. Llevamos un diagnóstico inicial al consejo y
                  presentamos una propuesta a medida.
                </p>
              </div>
              <div className="lg:col-span-4 lg:flex lg:justify-end">
                <Button href="/contacto" variant="primary" size="lg">
                  Coordinar reunión
                </Button>
              </div>
            </div>
          </Reveal>
        </Container>
      </Section>
    </>
  );
}
