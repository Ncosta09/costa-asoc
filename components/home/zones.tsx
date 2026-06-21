import { MapPin } from "lucide-react";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { Reveal } from "@/components/ui/reveal";
import { coverageZones } from "@/content/zones";

export function Zones() {
  return (
    <Section tone="default" spacing="default">
      <Container>
        <Reveal>
          <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:items-center lg:gap-16">
            <div className="lg:col-span-5">
              <p className="text-xs font-medium uppercase tracking-[0.18em] text-terra-700">
                Cobertura
              </p>
              <h2 className="mt-3 font-display text-[2rem] leading-[1.05] tracking-[-0.02em] text-balance text-navy-900 sm:text-[2.5rem]">
                Administramos consorcios en toda la Ciudad de Buenos Aires
              </h2>
              <p className="mt-5 max-w-[46ch] text-[16px] leading-relaxed text-ink-700">
                Con foco en edificios residenciales y torres corporativas de Recoleta,
                Belgrano y Puerto Madero. Si tu consorcio está en CABA, podemos
                administrarlo.
              </p>
            </div>

            <div className="lg:col-span-7">
              <ul className="flex flex-wrap gap-2.5">
                {coverageZones.map((zone) => (
                  <li key={zone}>
                    <span className="inline-flex items-center gap-1.5 rounded-full bg-cream-100 px-3.5 py-1.5 text-[14px] font-medium text-navy-900 ring-1 ring-cream-300">
                      <MapPin strokeWidth={1.75} className="h-3.5 w-3.5 text-terra-700" />
                      {zone}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </Reveal>
      </Container>
    </Section>
  );
}
