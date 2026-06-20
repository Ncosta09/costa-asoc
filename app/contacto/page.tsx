import type { Metadata } from "next";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { Reveal } from "@/components/ui/reveal";
import { ContactForm } from "@/components/contacto/contact-form";
import { OfficeInfo } from "@/components/contacto/office-info";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Contacto",
  description:
    "Coordinemos una primera reunión sin compromiso. Formulario de contacto y datos del estudio en Campana 4710, CABA.",
  path: "/contacto",
});

export default function ContactoPage() {
  return (
    <Section spacing="tight" className="pt-24 sm:pt-28">
      <Container>
        <Reveal>
          <div className="mb-14 max-w-[60ch]">
            <p className="text-xs font-medium uppercase tracking-[0.18em] text-terra-700">
              Contacto
            </p>
            <h1 className="mt-3 font-display text-[2.5rem] leading-[1.04] tracking-[-0.025em] text-balance text-navy-900 sm:text-[3.5rem]">
              Hablemos del consorcio
            </h1>
            <p className="mt-6 max-w-[58ch] text-[17px] leading-relaxed text-ink-700">
              Completá el formulario o escribinos directamente. Coordinamos una reunión
              sin cargo para conocer las necesidades del edificio y armar una propuesta a
              medida.
            </p>
          </div>
        </Reveal>

        <div className="grid grid-cols-1 gap-14 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-7">
            <Reveal>
              <ContactForm />
            </Reveal>
          </div>
          <div className="lg:col-span-5">
            <Reveal delay={0.08}>
              <OfficeInfo />
            </Reveal>
          </div>
        </div>
      </Container>
    </Section>
  );
}
