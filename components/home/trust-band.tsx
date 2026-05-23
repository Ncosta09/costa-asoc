import { Container } from "@/components/ui/container";
import { Reveal } from "@/components/ui/reveal";
import { trustBand } from "@/content/trust";

export function TrustBand() {
  return (
    <section className="border-y border-cream-200 bg-cream-100/70 py-10 sm:py-12">
      <Container>
        <Reveal>
          <dl className="grid grid-cols-2 gap-x-6 gap-y-8 md:grid-cols-4">
            {trustBand.map((item) => (
              <div key={item.label} className="flex flex-col gap-1">
                <dt className="font-display text-[1.75rem] leading-none tracking-tight text-navy-900 sm:text-[2rem]">
                  {item.metric}
                </dt>
                <dd className="text-[13.5px] leading-snug text-ink-700">
                  {item.label}
                </dd>
              </div>
            ))}
          </dl>
        </Reveal>
      </Container>
    </section>
  );
}
