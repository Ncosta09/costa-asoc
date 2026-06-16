import { Hero } from "@/components/home/hero";
import { ValueProps } from "@/components/home/value-props";
import { ServicesPreview } from "@/components/home/services-preview";
import { Philosophy } from "@/components/home/philosophy";
import { TrustBand } from "@/components/home/trust-band";
import { Testimonials } from "@/components/home/testimonials";
import { CtaBlock } from "@/components/home/cta-block";

export default function HomePage() {
  return (
    <>
      <Hero />
      <ValueProps />
      <ServicesPreview />
      <Philosophy />
      <TrustBand />
      <Testimonials />
      <CtaBlock />
    </>
  );
}
