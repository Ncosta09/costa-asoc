import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { Reveal } from "@/components/ui/reveal";
import { howWeWork } from "@/content/philosophy";

export function HowWeWork() {
  return (
    <Section tone="muted" spacing="default">
      <Container>
        <Reveal>
          <div className="mb-14 max-w-[58ch]">
            <p className="text-xs font-medium uppercase tracking-[0.18em] text-terra-700">
              Cómo trabajamos
            </p>
            <h2 className="mt-3 font-display text-3xl leading-[1.1] tracking-tight text-balance text-navy-900 sm:text-[2.5rem]">
              Cuatro pasos hasta operar el consorcio
            </h2>
          </div>
        </Reveal>

        <Reveal delay={0.08}>
          <ol className="grid grid-cols-1 gap-px overflow-hidden rounded-lg border border-cream-200 bg-cream-200 md:grid-cols-2 lg:grid-cols-4">
            {howWeWork.map((step) => (
              <li key={step.step} className="flex h-full flex-col gap-4 bg-cream-50 p-7 sm:p-8">
                <span className="font-display text-[13px] tracking-[0.18em] text-terra-700">
                  {step.step}
                </span>
                <h3 className="font-display text-[1.25rem] leading-tight tracking-tight text-navy-900">
                  {step.title}
                </h3>
                <p className="text-[14.5px] leading-relaxed text-ink-700">
                  {step.body}
                </p>
              </li>
            ))}
          </ol>
        </Reveal>
      </Container>
    </Section>
  );
}
