import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { Reveal } from "@/components/ui/reveal";
import { testimonials } from "@/content/testimonials";

export function Testimonials() {
  return (
    <Section tone="muted" spacing="default">
      <Container>
        <Reveal>
          <div className="mb-12 max-w-[52ch] sm:mb-14">
            <p className="text-xs font-medium uppercase tracking-[0.18em] text-terra-700">
              Testimonios
            </p>
            <h2 className="mt-3 font-display text-3xl leading-[1.1] tracking-tight text-balance text-navy-900 sm:text-[2.5rem]">
              Lo que dicen los consorcios que administramos
            </h2>
          </div>
        </Reveal>

        <Reveal delay={0.05}>
          <ul className="grid grid-cols-1 gap-4 sm:gap-5 md:grid-cols-3">
            {testimonials.map((t) => (
              <li
                key={t.author + t.role}
                className="flex flex-col rounded-2xl border border-cream-200 bg-cream-50 p-7 sm:p-8"
              >
                <span
                  aria-hidden="true"
                  className="font-display text-[2.5rem] leading-none text-terra-700/40"
                >
                  &ldquo;
                </span>
                <blockquote className="mt-2 flex-1 text-pretty text-[15.5px] leading-relaxed text-ink-800">
                  {t.quote}
                </blockquote>
                <footer className="mt-6 border-t border-cream-200 pt-4">
                  <p className="font-display text-[1.05rem] tracking-tight text-navy-900">
                    {t.author}
                  </p>
                  <p className="mt-0.5 text-[13.5px] text-ink-700">{t.role}</p>
                </footer>
              </li>
            ))}
          </ul>
        </Reveal>
      </Container>
    </Section>
  );
}
