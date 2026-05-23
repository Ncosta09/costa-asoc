import { ShieldCheck, FileCheck2, Banknote } from "lucide-react";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { Reveal } from "@/components/ui/reveal";

const items = [
  {
    icon: Banknote,
    title: "Cuentas a nombre del consorcio",
    body:
      "Cada edificio opera con cuenta bancaria propia, a su nombre y CUIT. Nunca se mezclan fondos con otros consorcios ni con el estudio.",
  },
  {
    icon: FileCheck2,
    title: "Trazabilidad completa",
    body:
      "Cada movimiento queda documentado y respaldado. Los reportes mensuales permiten reconstruir la operación al peso.",
  },
  {
    icon: ShieldCheck,
    title: "Auditoría permanente",
    body:
      "El consejo de administración puede solicitar auditoría externa cuando lo considere necesario. La documentación está siempre disponible.",
  },
];

export function TransparencyBlock() {
  return (
    <Section tone="muted" spacing="default">
      <Container>
        <Reveal>
          <div className="mb-14 max-w-[58ch]">
            <p className="text-xs font-medium uppercase tracking-[0.18em] text-terra-700">
              Transparencia y control
            </p>
            <h2 className="mt-3 font-display text-3xl leading-[1.1] tracking-tight text-balance text-navy-900 sm:text-[2.5rem]">
              Las cuentas claras no son una promesa. Son una arquitectura.
            </h2>
          </div>
        </Reveal>

        <div className="grid grid-cols-1 gap-px overflow-hidden rounded-lg border border-cream-200 bg-cream-200 md:grid-cols-3">
          {items.map((item, i) => {
            const Icon = item.icon;
            return (
              <Reveal key={item.title} delay={i * 0.06}>
                <article className="flex h-full flex-col gap-4 bg-cream-50 p-7 sm:p-9">
                  <span className="inline-flex h-10 w-10 items-center justify-center rounded-md bg-terra-100 text-terra-700">
                    <Icon strokeWidth={1.5} className="h-5 w-5" />
                  </span>
                  <h3 className="font-display text-[1.25rem] leading-tight tracking-tight text-navy-900">
                    {item.title}
                  </h3>
                  <p className="text-[15px] leading-relaxed text-ink-700">{item.body}</p>
                </article>
              </Reveal>
            );
          })}
        </div>
      </Container>
    </Section>
  );
}
