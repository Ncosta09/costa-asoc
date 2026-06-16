import Image from "next/image";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { Reveal } from "@/components/ui/reveal";
import { site } from "@/content/site";

export function IntroBlock() {
  return (
    <Section spacing="tight" className="pt-24 sm:pt-28">
      <Container>
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-7">
            <Reveal>
              <p className="text-xs font-medium uppercase tracking-[0.18em] text-terra-700">
                Nosotros
              </p>
              <h1 className="mt-3 font-display text-[2.5rem] leading-[1.04] tracking-[-0.025em] text-balance text-navy-900 sm:text-[3.5rem]">
                Quiénes somos
              </h1>
              <p className="mt-6 max-w-[58ch] text-[17px] leading-relaxed text-ink-700">
                Costa &amp; Asociados es un estudio contable con foco específico en la
                administración profesional de consorcios. Trabajamos desde {site.founded}
                {" "}con edificios residenciales y corporativos de Buenos Aires, aportando la
                disciplina del análisis contable a una actividad que gana mucho cuando la
                lidera un profesional con formación contable.
              </p>
              <p className="mt-5 max-w-[58ch] text-[16px] leading-relaxed text-ink-700">
                Más de {site.yearsExperience} años acompañando a consejos de administración
                con reportes claros, planificación financiera realista y una atención que
                no requiere insistir.
              </p>
            </Reveal>
          </div>

          <div className="lg:col-span-5">
            <Reveal delay={0.08}>
              {/* TODO: reemplazar por foto real de Gabriel o de la oficina (stock provisorio) */}
              <figure className="relative aspect-[4/5] overflow-hidden rounded-lg border border-cream-200 bg-cream-100">
                <Image
                  src="https://images.unsplash.com/photo-1556761175-5973dc0f32e7?auto=format&fit=crop&w=1100&q=80"
                  alt="Equipo del estudio contable trabajando en la oficina"
                  fill
                  sizes="(min-width: 1024px) 40vw, 100vw"
                  className="object-cover"
                />
              </figure>
            </Reveal>
          </div>
        </div>

        <Reveal delay={0.12}>
          <ul className="mt-14 grid grid-cols-1 gap-px overflow-hidden rounded-lg border border-cream-200 bg-cream-200 sm:grid-cols-3">
            <li className="bg-cream-50 p-7">
              <p className="font-display text-[1.75rem] leading-none tracking-tight text-navy-900">
                Desde {site.founded}
              </p>
              <p className="mt-2 text-[14px] text-ink-700">Trayectoria del estudio</p>
            </li>
            {site.registries.map((r) => (
              <li key={r.label} className="bg-cream-50 p-7">
                <p className="font-display text-[1.75rem] leading-none tracking-tight text-navy-900">
                  {r.short}
                </p>
                <p className="mt-2 text-[14px] text-ink-700">{r.full}</p>
              </li>
            ))}
          </ul>
        </Reveal>
      </Container>
    </Section>
  );
}
