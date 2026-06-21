import { BadgeCheck } from "lucide-react";
import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import { site } from "@/content/site";

export function Hero() {
  return (
    <section className="relative flex min-h-[calc(100svh-64px)] items-center overflow-hidden py-16 sm:min-h-[calc(100svh-72px)] sm:py-20">
      {/* Soft cream gradient backdrop */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_top_left,_var(--color-cream-100)_0%,_var(--color-cream-50)_55%)]"
      />

      <Container className="w-full">
        <div className="max-w-3xl">
          <div>
            <h1 className="font-display text-[2.5rem] leading-[1.04] tracking-[-0.025em] text-balance text-navy-900 sm:text-[3.25rem] lg:text-[4rem]">
              Administración profesional de consorcios en Buenos&nbsp;Aires
            </h1>

            <p className="mt-6 max-w-[58ch] text-pretty text-[17px] leading-relaxed text-ink-700 sm:text-[18px]">
              Gestión transparente, control financiero riguroso y respuesta inmediata. Más
              de {site.yearsExperience} años acompañando a edificios residenciales y
              corporativos de la Ciudad.
            </p>

            <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:items-center">
              <Button href="/contacto" variant="primary" size="lg">
                Solicitar propuesta sin cargo
              </Button>
              <Button href="/servicios" variant="secondary" size="lg">
                Conocer servicios
              </Button>
            </div>

            <ul className="mt-10 flex flex-nowrap items-center gap-2 sm:gap-2.5">
              {site.registries.map((r) => (
                <li key={r.label}>
                  <span className="inline-flex items-center gap-1.5 whitespace-nowrap rounded-full bg-cream-100 px-3 py-1.5 text-[12px] font-medium text-navy-900 ring-1 ring-cream-300 sm:px-3.5 sm:text-[13px]">
                    <BadgeCheck strokeWidth={1.75} className="hidden h-3.5 w-3.5 text-terra-700 sm:inline-block" />
                    {r.short}
                  </span>
                </li>
              ))}
              <li>
                <span className="inline-flex items-center whitespace-nowrap rounded-full bg-cream-100 px-3 py-1.5 text-[12px] font-medium text-navy-900 ring-1 ring-cream-300 sm:px-3.5 sm:text-[13px]">
                  Desde {site.founded}
                </span>
              </li>
            </ul>
          </div>
        </div>
      </Container>
    </section>
  );
}
