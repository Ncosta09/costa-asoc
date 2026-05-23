import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { Reveal } from "@/components/ui/reveal";
import { featuredServices } from "@/content/services";

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
              Ver todos los servicios
              <ArrowRight
                strokeWidth={1.75}
                className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5"
              />
            </Link>
          </div>
        </Reveal>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 border-t border-cream-200">
          {featuredServices.map((service, i) => {
            const Icon = service.icon;
            return (
              <Reveal key={service.title} delay={(i % 3) * 0.06}>
                <article
                  className="group flex h-full flex-col border-b border-cream-200 px-1 py-8 sm:px-6 sm:py-10 lg:px-8
                    sm:[&:nth-child(odd)]:border-r sm:[&:nth-child(odd)]:border-cream-200
                    lg:border-r lg:border-cream-200 lg:[&:nth-child(3n)]:border-r-0
                    sm:[&:nth-child(odd)]:lg:[&:nth-child(3n)]:border-r-0"
                >
                  <span className="inline-flex h-10 w-10 items-center justify-center rounded-md bg-navy-100 text-navy-900 transition-colors duration-300 group-hover:bg-terra-100 group-hover:text-terra-700">
                    <Icon strokeWidth={1.5} className="h-5 w-5" />
                  </span>
                  <h3 className="mt-5 font-display text-[1.25rem] leading-tight tracking-tight text-navy-900">
                    {service.title}
                  </h3>
                  <p className="mt-2 text-[14.5px] leading-relaxed text-ink-700">
                    {service.description}
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
