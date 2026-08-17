import Image from "next/image";
import { BadgeCheck, MessageCircle } from "lucide-react";
import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import { HeroVideo } from "@/components/home/hero-video";
import { site } from "@/content/site";

export function Hero() {
  return (
    <section className="relative isolate flex min-h-[calc(100svh-64px)] items-center overflow-hidden py-16 sm:min-h-[calc(100svh-72px)] sm:py-20">
      {/* Fondo: poster (LCP) + video que aparece encima + scrim para el contraste del texto */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10">
        <Image
          src="/home/hero-poster.jpg"
          alt=""
          fill
          priority
          className="object-cover"
          sizes="100vw"
        />
        <HeroVideo />
        {/* Overlay: capa negra pareja (legibilidad global) + refuerzo hacia la izquierda (zona del título) */}
        <div className="absolute inset-0 bg-black/50" />
        <div className="absolute inset-0 bg-gradient-to-r from-ink-900/60 via-ink-900/30 to-transparent" />
        <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-ink-900/50 to-transparent" />
      </div>

      <Container className="w-full">
        <div className="max-w-3xl">
          <div>
            <h1 className="font-display text-[2.5rem] leading-[1.04] tracking-[-0.025em] text-balance text-cream-50 sm:text-[3.25rem] lg:text-[4rem]">
              Administración profesional de consorcios en Buenos&nbsp;Aires
            </h1>

            <p className="mt-6 max-w-[58ch] text-pretty text-[17px] leading-relaxed text-cream-100/90 sm:text-[18px]">
              Gestión transparente, control financiero riguroso y respuesta inmediata. Más
              de {site.yearsExperience} años acompañando a edificios residenciales y
              corporativos de la Ciudad.
            </p>

            <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:items-center">
              <Button href="/contacto" variant="primary" size="lg">
                Solicitar propuesta sin cargo
              </Button>
              <Button
                href={site.contact.whatsappHref}
                variant="secondary"
                size="lg"
                className="border-cream-50/50 text-cream-50 hover:bg-cream-50 hover:text-navy-900"
              >
                <MessageCircle strokeWidth={1.75} className="h-4 w-4" />
                Escribir por WhatsApp
              </Button>
              <Button
                href="/servicios"
                variant="ghost"
                size="lg"
                className="text-cream-100 hover:bg-cream-50/10"
              >
                Conocer servicios
              </Button>
            </div>

            <ul className="mt-10 flex flex-nowrap items-center gap-2 sm:gap-2.5">
              {site.registries.map((r) => (
                <li key={r.label}>
                  <span className="inline-flex items-center gap-1.5 whitespace-nowrap rounded-full bg-navy-900/30 px-3 py-1.5 text-[12px] font-medium text-cream-50 ring-1 ring-cream-50/25 sm:px-3.5 sm:text-[13px]">
                    <BadgeCheck strokeWidth={1.75} className="hidden h-3.5 w-3.5 text-terra-400 sm:inline-block" />
                    {r.short}
                  </span>
                </li>
              ))}
              <li>
                <span className="inline-flex items-center whitespace-nowrap rounded-full bg-navy-900/30 px-3 py-1.5 text-[12px] font-medium text-cream-50 ring-1 ring-cream-50/25 sm:px-3.5 sm:text-[13px]">
                  Desde {site.founded}
                </span>
              </li>
            </ul>
          </div>
        </div>
      </Container>
    </section>
  );
}
