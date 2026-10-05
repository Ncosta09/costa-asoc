import type { Metadata } from "next";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { Reveal } from "@/components/ui/reveal";
import { AttendedBy } from "@/components/ui/attended-by";
import { ContactForm } from "@/components/contacto/contact-form";
import { ContactMap } from "@/components/contacto/contact-map";
import { DirectContact } from "@/components/contacto/direct-contact";
import { OfficeInfo } from "@/components/contacto/office-info";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Contacto",
  description:
    "Coordinemos una primera reunión sin compromiso. WhatsApp, teléfono, formulario y datos del estudio en Campana 4710, CABA.",
  path: "/contacto",
});

export default function ContactoPage() {
  return (
    <>
      <Section spacing="tight" className="pt-24 sm:pt-28">
        <Container>
          {/* Sin Reveal en el bloque de arriba: H1 y botones de contacto pintan directo. */}
          <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:items-end lg:gap-16">
            <div className="lg:col-span-7">
              <p className="text-xs font-medium uppercase tracking-[0.18em] text-terra-700">
                Contacto
              </p>
              <h1 className="mt-3 font-display text-[2.5rem] leading-[1.04] tracking-[-0.025em] text-balance text-navy-900 sm:text-[3.5rem]">
                Hablemos del consorcio
              </h1>
              <p className="mt-6 max-w-[58ch] text-[17px] leading-relaxed text-ink-700">
                Escríbannos por WhatsApp, llámennos o completen el formulario.
                Coordinamos una reunión sin cargo para conocer el edificio y armar una
                propuesta a medida.
              </p>
            </div>
            <div className="flex flex-col gap-6 lg:col-span-5">
              <DirectContact />
              <AttendedBy />
            </div>
          </div>

          <div className="mt-14 grid grid-cols-1 gap-14 border-t border-cream-200 pt-12 lg:grid-cols-12 lg:gap-16">
            <div className="lg:col-span-7">
              <h2 className="mb-6 font-display text-[1.6rem] leading-tight tracking-tight text-navy-900">
                O déjennos sus datos
              </h2>
              <ContactForm variant="full" source="contacto" />
            </div>
            <div className="lg:col-span-5">
              <Reveal delay={0.08}>
                <OfficeInfo />
              </Reveal>
            </div>
          </div>
        </Container>
      </Section>

      <Section spacing="tight" tone="muted">
        <Container>
          <Reveal>
            <h2 className="mb-6 font-display text-[1.6rem] leading-tight tracking-tight text-navy-900">
              Cómo llegar a la oficina
            </h2>
            <ContactMap />
          </Reveal>
        </Container>
      </Section>
    </>
  );
}
