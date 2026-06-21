import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { Reveal } from "@/components/ui/reveal";
import { featuredServices } from "@/content/services";
import { ServiceCard } from "@/components/home/service-card";

export function ServicesPreview() {
  return (
    <Section tone="default" spacing="default">
      <Container>
        <Reveal>
          <div className="mb-14 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
            <div className="max-w-[52ch]">
              <p className="text-xs font-medium uppercase tracking-[0.18em] text-terra-700">
                Servicios
              </p>
              <h2 className="mt-3 font-display text-3xl leading-[1.1] tracking-tight text-balance text-navy-900 sm:text-[2.5rem]">
                Administración integral, sin tercerizar lo importante
              </h2>
            </div>
            <Link
              href="/servicios"
              className="group inline-flex items-center gap-2 text-[15px] font-medium text-navy-900 transition-colors hover:text-terra-700"
            >
              Ver todos los servicios de administración
              <ArrowRight
                strokeWidth={1.75}
                className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5"
              />
            </Link>
          </div>
        </Reveal>

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 sm:gap-6 lg:grid-cols-3">
          {featuredServices.map((service, i) => {
            const Icon = service.icon;
            return (
              <Reveal key={service.title} delay={(i % 3) * 0.06} className="h-full">
                <ServiceCard
                  icon={<Icon strokeWidth={1.5} className="h-[22px] w-[22px]" />}
                  title={service.title}
                  description={service.description}
                />
              </Reveal>
            );
          })}
        </div>
      </Container>
    </Section>
  );
}
