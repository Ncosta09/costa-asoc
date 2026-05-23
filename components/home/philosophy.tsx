import { Check } from "lucide-react";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { Reveal } from "@/components/ui/reveal";
import { principles } from "@/content/philosophy";

export function Philosophy() {
  return (
    <Section tone="default" spacing="default">
      <Container>
        <div className="grid grid-cols-1 gap-14 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-5">
            <Reveal>
              <p className="text-xs font-medium uppercase tracking-[0.18em] text-terra-700">
                Filosofía
              </p>
              <h2 className="mt-3 font-display text-[2rem] leading-[1.05] tracking-[-0.02em] text-balance text-navy-900 sm:text-[2.75rem]">
                Más que liquidar expensas. Administrar con criterio.
              </h2>
              <p className="mt-6 max-w-[48ch] text-[16px] leading-relaxed text-ink-700">
                Cada edificio tiene su propia dinámica, su consejo, su histórico contable.
                Trabajamos con la disciplina de un estudio profesional y el detalle de
                quien entiende que detrás de cada expensa hay un grupo de familias o una
                operación corporativa que depende del orden.
              </p>
            </Reveal>
          </div>

          <div className="lg:col-span-7 lg:pl-8">
            <Reveal delay={0.08}>
              <ul className="divide-y divide-cream-200 border-t border-cream-200">
                {principles.map((p) => (
                  <li key={p.title} className="grid grid-cols-[auto,1fr] gap-x-5 py-5 sm:gap-x-8 sm:py-6">
                    <span className="mt-1 inline-flex h-7 w-7 items-center justify-center rounded-full bg-terra-100 text-terra-700">
                      <Check strokeWidth={2} className="h-3.5 w-3.5" />
                    </span>
                    <div>
                      <h3 className="font-display text-[1.15rem] tracking-tight text-navy-900">
                        {p.title}
                      </h3>
                      <p className="mt-1 text-[15px] leading-relaxed text-ink-700">
                        {p.body}
                      </p>
                    </div>
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>
        </div>
      </Container>
    </Section>
  );
}
