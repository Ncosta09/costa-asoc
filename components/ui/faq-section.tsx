import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { Reveal } from "@/components/ui/reveal";
import { Faq } from "@/components/ui/faq";
import { faqSchema } from "@/lib/schema";
import type { FaqItem } from "@/content/faq";

type FaqSectionProps = {
  items: readonly FaqItem[];
  eyebrow?: string;
  title: string;
  tone?: "default" | "muted";
};

export function FaqSection({
  items,
  eyebrow = "Preguntas frecuentes",
  title,
  tone = "muted",
}: FaqSectionProps) {
  return (
    <Section tone={tone} spacing="default">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema([...items])) }}
      />
      <Container>
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-4">
            <Reveal>
              <p className="text-xs font-medium uppercase tracking-[0.18em] text-terra-700">
                {eyebrow}
              </p>
              <h2 className="mt-3 font-display text-[2rem] leading-[1.05] tracking-[-0.02em] text-balance text-navy-900 sm:text-[2.5rem]">
                {title}
              </h2>
            </Reveal>
          </div>
          <div className="lg:col-span-8">
            <Reveal delay={0.08}>
              <Faq items={items} />
            </Reveal>
          </div>
        </div>
      </Container>
    </Section>
  );
}
