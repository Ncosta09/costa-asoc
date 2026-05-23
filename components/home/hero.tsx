import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { HeroMark } from "@/components/home/hero-mark";
import { site } from "@/content/site";

export function Hero() {
  return (
    <section className="relative overflow-hidden pt-12 pb-20 sm:pt-20 sm:pb-28 lg:pt-28 lg:pb-36">
      {/* Soft cream gradient backdrop */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_top_left,_var(--color-cream-100)_0%,_var(--color-cream-50)_55%)]"
      />

      <Container>
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-12 lg:gap-12">
          <div className="lg:col-span-7">
            <div className="mb-7 inline-flex">
              <Badge tone="outline" className="border-navy-200/80 text-navy-700">
                <span className="h-1.5 w-1.5 rounded-full bg-terra-700" aria-hidden="true" />
                Administración profesional · CABA
              </Badge>
            </div>

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

            <ul className="mt-10 flex flex-wrap items-center gap-x-7 gap-y-3 text-[13px] text-ink-500">
              {site.registries.map((r) => (
                <li
                  key={r.label}
                  className="inline-flex items-center gap-2 before:inline-block before:h-1 before:w-1 before:rounded-full before:bg-cream-300"
                >
                  <span className="font-medium text-ink-700">{r.label}</span>
                </li>
              ))}
              <li className="inline-flex items-center gap-2 before:inline-block before:h-1 before:w-1 before:rounded-full before:bg-cream-300">
                <span className="font-medium text-ink-700">
                  Desde {site.founded}
                </span>
              </li>
            </ul>
          </div>

          <div className="relative lg:col-span-5">
            <HeroMark />
          </div>
        </div>
      </Container>
    </section>
  );
}
