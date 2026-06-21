import { Hero } from "@/components/home/hero";
import { TrustBand } from "@/components/home/trust-band";
import { ValueProps } from "@/components/home/value-props";
import { ServicesPreview } from "@/components/home/services-preview";
import { Philosophy } from "@/components/home/philosophy";
import { Testimonials } from "@/components/home/testimonials";
import { Zones } from "@/components/home/zones";
import { FaqSection } from "@/components/ui/faq-section";
import { CtaBlock } from "@/components/home/cta-block";
import { homeFaq } from "@/content/faq";

export default function HomePage() {
  return (
    <>
      <Hero />
      <TrustBand />
      <ValueProps />
      <ServicesPreview />
      <Philosophy />
      <Testimonials />
      <Zones />
      <FaqSection
        items={homeFaq}
        title="Preguntas frecuentes sobre administración de consorcios"
        tone="muted"
      />
      <CtaBlock />
    </>
  );
}
