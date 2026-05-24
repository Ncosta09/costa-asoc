import { Briefcase, FileSearch, Headphones } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { Reveal } from "@/components/ui/reveal";
import { valueProps } from "@/content/philosophy";

const icons: LucideIcon[] = [Briefcase, FileSearch, Headphones];

export function ValueProps() {
  return (
    <Section tone="muted" spacing="default">
      <Container>
        <Reveal>
          <div className="mb-14 max-w-[52ch]">
            <p className="text-xs font-medium uppercase tracking-[0.18em] text-terra-700">
              Diferencial
            </p>
            <h2 className="mt-3 font-display text-3xl leading-[1.1] tracking-tight text-balance text-navy-900 sm:text-[2.5rem]">
              Tres compromisos que sostenemos en cada consorcio
            </h2>
          </div>
        </Reveal>

        <div className="grid grid-cols-1 gap-12 md:grid-cols-3 md:gap-0 md:divide-x md:divide-cream-300">
          {valueProps.map((prop, i) => {
            const Icon = icons[i]!;
            return (
              <Reveal
                key={prop.title}
                delay={i * 0.06}
                className="md:px-10 md:[&:first-child]:pl-0 md:[&:last-child]:pr-0 lg:px-14 lg:[&:first-child]:pl-0 lg:[&:last-child]:pr-0"
              >
                <article className="flex flex-col">
                  <span className="mb-7 inline-flex h-12 w-12 items-center justify-center rounded-full bg-cream-50 text-terra-700 ring-1 ring-cream-300">
                    <Icon strokeWidth={1.5} className="h-5 w-5" />
                  </span>
                  <h3 className="font-display text-[1.5rem] leading-tight tracking-tight text-navy-900">
                    {prop.title}
                  </h3>
                  <p className="mt-3 text-[15.5px] leading-relaxed text-ink-700">
                    {prop.body}
                  </p>
                </article>
              </Reveal>
            );
          })}
        </div>
      </Container>
    </Section>
  );
}
