import { LineChart, ShieldCheck, ClipboardList } from "lucide-react";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { Reveal } from "@/components/ui/reveal";

const points = [
  {
    icon: LineChart,
    title: "Control presupuestario activo",
    body:
      "El presupuesto anual no es un papel para la asamblea. Es la herramienta con la que comparamos cada mes el avance real, identificamos desvíos y proponemos ajustes con tiempo.",
  },
  {
    icon: ClipboardList,
    title: "Planificación financiera",
    body:
      "Proyección de fondos para gastos extraordinarios, renovaciones programadas y reservas técnicas. El consorcio sabe qué viene antes de que el gasto llegue.",
  },
  {
    icon: ShieldCheck,
    title: "Protección patrimonial",
    body:
      "Trabajamos con rigor contable y documental que protege al consorcio frente a contingencias laborales, fiscales y de responsabilidad civil.",
  },
];

export function AccountingEdge() {
  return (
    <Section spacing="default">
      <Container>
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-5">
            <Reveal>
              <p className="text-xs font-medium uppercase tracking-[0.18em] text-terra-700">
                Diferencial contable
              </p>
              <h2 className="mt-3 font-display text-[2rem] leading-[1.05] tracking-[-0.02em] text-balance text-navy-900 sm:text-[2.5rem]">
                ¿Por qué tener Contadores Públicos al frente cambia las reglas?
              </h2>
              <p className="mt-5 max-w-[44ch] text-[15.5px] leading-relaxed text-ink-700">
                La administración de un consorcio combina operación, gestión humana y
                contabilidad. Ese último componente, cuando lo lleva un profesional
                matriculado, transforma cómo se toman las decisiones.
              </p>
            </Reveal>
          </div>

          <div className="lg:col-span-7">
            <ul className="flex flex-col gap-px overflow-hidden rounded-lg border border-cream-200 bg-cream-200">
              {points.map((point, i) => {
                const Icon = point.icon;
                return (
                  <Reveal key={point.title} delay={i * 0.05}>
                    <li className="grid grid-cols-[auto,1fr] gap-6 bg-cream-50 p-7 sm:p-9">
                      <span className="inline-flex h-10 w-10 items-center justify-center rounded-md bg-navy-900 text-cream-50">
                        <Icon strokeWidth={1.5} className="h-5 w-5" />
                      </span>
                      <div>
                        <h3 className="font-display text-[1.25rem] leading-tight tracking-tight text-navy-900">
                          {point.title}
                        </h3>
                        <p className="mt-2 text-[15px] leading-relaxed text-ink-700">
                          {point.body}
                        </p>
                      </div>
                    </li>
                  </Reveal>
                );
              })}
            </ul>
          </div>
        </div>
      </Container>
    </Section>
  );
}
