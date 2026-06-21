import { Check } from "lucide-react";
import { Container } from "@/components/ui/container";
import { Reveal } from "@/components/ui/reveal";
import { coreServices } from "@/content/services";

const accents = ["01", "02", "03", "04", "05", "06"];

export function ServicesDetail() {
  return (
    <Container>
      <div className="flex flex-col gap-16 pb-20 sm:gap-20 sm:pb-28 lg:pb-32">
        {coreServices.map((service, idx) => {
          const Icon = service.icon;
          return (
            <Reveal key={service.slug}>
              <article
                id={service.slug}
                className="scroll-mt-header grid grid-cols-1 gap-8 lg:grid-cols-12 lg:gap-14"
              >
                <header className="lg:col-span-5">
                  <div className="flex items-center gap-3">
                    <span className="font-display text-[13px] tracking-[0.18em] text-terra-700">
                      {accents[idx]}
                    </span>
                    <span aria-hidden="true" className="h-px w-10 bg-terra-700/60" />
                  </div>
                  <span className="mt-5 inline-flex h-11 w-11 items-center justify-center rounded-xl bg-navy-100 text-navy-900">
                    <Icon strokeWidth={1.5} className="h-[22px] w-[22px]" />
                  </span>
                  <h2 className="mt-5 font-display text-[1.6rem] leading-[1.1] tracking-tight text-balance text-navy-900 sm:text-[2rem]">
                    {service.title}
                  </h2>
                  <p className="mt-4 max-w-[44ch] text-[15.5px] leading-relaxed text-ink-700">
                    {service.benefit}
                  </p>
                </header>

                <div className="lg:col-span-7">
                  <ul className="grid grid-cols-1 gap-px overflow-hidden rounded-lg border border-cream-200 bg-cream-200 sm:grid-cols-2">
                    {service.includes.map((item) => (
                      <li
                        key={item}
                        className="flex items-start gap-3 bg-cream-50 p-6 sm:p-7"
                      >
                        <Check
                          strokeWidth={2}
                          className="mt-0.5 h-4.5 w-4.5 flex-none text-terra-700"
                        />
                        <span className="text-[14.5px] leading-relaxed text-ink-700">
                          {item}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              </article>
            </Reveal>
          );
        })}
      </div>
    </Container>
  );
}
