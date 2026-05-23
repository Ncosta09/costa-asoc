import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/ui/reveal";

export function CtaBlock() {
  return (
    <Section tone="navy" spacing="default" className="relative overflow-hidden">
      {/* Decorative dot in corner */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full bg-terra-700/20 blur-3xl"
      />
      <Container>
        <Reveal>
          <div className="relative grid grid-cols-1 gap-10 lg:grid-cols-12 lg:items-center">
            <div className="lg:col-span-8">
              <h2 className="font-display text-[2rem] leading-[1.05] tracking-[-0.02em] text-balance text-cream-50 sm:text-[2.75rem]">
                ¿Evaluando un cambio de administración?
              </h2>
              <p className="mt-5 max-w-[58ch] text-[16.5px] leading-relaxed text-cream-100/85">
                Coordinamos una reunión sin compromiso para conocer las necesidades del
                consorcio y presentar una propuesta a medida. Ofrecemos período de
                evaluación sin penalidades.
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
  );
}
