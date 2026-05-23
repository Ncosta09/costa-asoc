import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { Reveal } from "@/components/ui/reveal";
import { principles } from "@/content/philosophy";

export function PhilosophyList() {
  return (
    <Section tone="muted" spacing="default">
      <Container>
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-4">
            <Reveal>
              <p className="text-xs font-medium uppercase tracking-[0.18em] text-terra-700">
                Filosofía
              </p>
              <h2 className="mt-3 font-display text-[2rem] leading-[1.05] tracking-[-0.02em] text-balance text-navy-900 sm:text-[2.5rem]">
                Principios que sostenemos
              </h2>
              <p className="mt-5 max-w-[36ch] text-[15.5px] leading-relaxed text-ink-700">
                Cinco pilares operativos que organizan nuestro trabajo con cada
                consorcio.
              </p>
            </Reveal>
          </div>

          <div className="lg:col-span-8">
            <Reveal delay={0.08}>
              <ol className="divide-y divide-cream-300 border-y border-cream-300">
                {principles.map((p, i) => (
                  <li
                    key={p.title}
                    className="grid grid-cols-[auto,1fr] gap-x-6 py-6 sm:gap-x-10 sm:py-8"
                  >
                    <span className="font-display text-[13px] tracking-[0.18em] text-terra-700">
                      0{i + 1}
                    </span>
                    <div>
                      <h3 className="font-display text-[1.25rem] leading-tight tracking-tight text-navy-900">
                        {p.title}
                      </h3>
                      <p className="mt-2 text-[15px] leading-relaxed text-ink-700">
                        {p.body}
                      </p>
                    </div>
                  </li>
                ))}
              </ol>
            </Reveal>
          </div>
        </div>
      </Container>
    </Section>
  );
}
