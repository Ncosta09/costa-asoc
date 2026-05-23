import { Container } from "@/components/ui/container";
import { Reveal } from "@/components/ui/reveal";
import { serviceCategories } from "@/content/services";

const accents = ["01", "02", "03", "04"];

export function ServiceCategories() {
  return (
    <Container>
      <div className="flex flex-col gap-20 sm:gap-28">
        {serviceCategories.map((category, idx) => (
          <Reveal key={category.slug}>
            <article
              id={category.slug}
              className="scroll-mt-header grid grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-14"
            >
              <header className="lg:col-span-4">
                <div className="flex items-center gap-3">
                  <span className="font-display text-[13px] tracking-[0.18em] text-terra-700">
                    {accents[idx]}
                  </span>
                  <span aria-hidden="true" className="h-px w-10 bg-terra-700/60" />
                </div>
                <h2 className="mt-5 font-display text-[1.75rem] leading-[1.1] tracking-tight text-navy-900 sm:text-[2.25rem]">
                  {category.title}
                </h2>
                <p className="mt-4 max-w-[42ch] text-[15.5px] leading-relaxed text-ink-700">
                  {category.intro}
                </p>
              </header>

              <ul className="lg:col-span-8">
                <div className="grid grid-cols-1 gap-px overflow-hidden rounded-lg border border-cream-200 bg-cream-200 md:grid-cols-2">
                  {category.services.map((service) => {
                    const Icon = service.icon;
                    return (
                      <li
                        key={service.title}
                        className="flex flex-col gap-3 bg-cream-50 p-6 sm:p-7"
                      >
                        <span className="inline-flex h-9 w-9 items-center justify-center rounded-md bg-navy-100 text-navy-900">
                          <Icon strokeWidth={1.5} className="h-4.5 w-4.5" />
                        </span>
                        <h3 className="font-display text-[1.1rem] leading-tight tracking-tight text-navy-900">
                          {service.title}
                        </h3>
                        <p className="text-[14.5px] leading-relaxed text-ink-700">
                          {service.description}
                        </p>
                      </li>
                    );
                  })}
                </div>
              </ul>
            </article>
          </Reveal>
        ))}
      </div>
    </Container>
  );
}
