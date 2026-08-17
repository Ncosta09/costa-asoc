import type { Metadata } from "next";
import Image from "next/image";
import { BadgeCheck, Building2, Clock3, MapPin, MessageCircle, Trees, Users } from "lucide-react";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/ui/reveal";
import { RelatedPosts } from "@/components/blog/related-posts";
import { FaqSection } from "@/components/ui/faq-section";
import { buildMetadata } from "@/lib/seo";
import { breadcrumbSchema } from "@/lib/schema";
import { site } from "@/content/site";
import type { FaqItem } from "@/content/faq";

export const metadata: Metadata = buildMetadata({
  title: "Administración de Consorcios en Villa Devoto",
  description:
    "Estudio contable matriculado (RPA 8192) con oficina en Villa Devoto. Administración de consorcios del barrio y alrededores: expensas claras, cuentas a nombre del consorcio y un administrador que está cerca del edificio.",
  path: "/administracion-de-consorcios-villa-devoto",
});

// FAQ propia de la landing (ángulo local, distinta de la de /servicios).
const devotoFaq: FaqItem[] = [
  {
    question: "¿Administran edificios chicos o PH en Villa Devoto?",
    answer:
      "Sí. Gran parte de los edificios del barrio tiene pocas unidades, y son justamente los que peor atendidos quedan por administraciones masivas: terminan siendo un número de cartera. Nuestro esquema de trabajo se dimensiona según el edificio, con la misma transparencia contable para un PH de 6 unidades que para una torre.",
  },
  {
    question: "¿Atienden barrios cercanos a Villa Devoto?",
    answer:
      "Sí. Además de Villa Devoto trabajamos en los barrios vecinos (Villa del Parque, Monte Castro, Villa Pueyrredón y Villa Real) y en el resto de CABA. La oficina en Devoto nos permite llegar rápido a cualquier edificio de la zona noroeste de la Ciudad.",
  },
  {
    question: "¿Qué cambia que el administrador esté en el barrio?",
    answer:
      "Tres cosas concretas: la supervisión es presencial y no por foto de WhatsApp, ante una emergencia edilicia la respuesta no depende de cruzar la Ciudad, y las reuniones con el consejo o la asamblea se coordinan sin fricción. La administración a distancia funciona hasta que el edificio tiene un problema.",
  },
  {
    question: "¿Cómo hacemos el cambio desde nuestra administración actual?",
    answer:
      "El cambio lo decide la asamblea con la mayoría que corresponda y no interrumpe la operación del edificio: recibimos la documentación, hacemos un diagnóstico inicial y arrancamos en paralelo. El paso a paso completo está explicado en nuestra guía sobre cómo cambiar de administrador de consorcio.",
  },
  {
    question: "¿Cuánto cuesta la administración de un consorcio en Villa Devoto?",
    answer:
      "No hay arancel oficial: el honorario lo acuerda la asamblea con el administrador, según la cantidad de unidades, el personal y los servicios pactados. Armamos cada propuesta a medida después de conocer el edificio, sin costo ni compromiso, y con el alcance detallado por escrito.",
  },
];

const localReasons = [
  {
    icon: MapPin,
    title: "Oficina en el barrio",
    text: `Trabajamos desde ${site.address.street.split(",")[0]}, en Villa Devoto. El administrador de tu edificio no está del otro lado de la Ciudad: está a minutos.`,
  },
  {
    icon: Clock3,
    title: "Respuesta rápida",
    text: "Ante una urgencia edilicia (una pérdida, un ascensor parado, un siniestro), la cercanía deja de ser un detalle comercial y pasa a ser tiempo de respuesta real.",
  },
  {
    icon: Building2,
    title: "Supervisión presencial",
    text: "Las obras y el mantenimiento se controlan en el edificio, no por foto. Un administrador de la zona puede pasar, mirar y reclamar al proveedor en el día.",
  },
  {
    icon: Users,
    title: "Asambleas y consejo, cara a cara",
    text: "Reuniones presenciales con el consejo de propietarios sin coordinar semanas: la relación con el edificio se construye estando, no contestando mails.",
  },
];

const barrioFacts = [
  {
    title: "El Jardín de la Ciudad",
    text: "Villa Devoto es conocido por sus calles arboladas y su perfil residencial. Ese carácter se cuida: fachadas, veredas y frentes verdes son parte del valor de cada edificio del barrio.",
  },
  {
    title: "Plaza Arenales y el casco histórico",
    text: "El corazón del barrio, rodeado de arquitectura de principios del siglo XX. Muchos edificios de la zona tienen décadas de vida: exigen mantenimiento planificado, no reactivo.",
  },
  {
    title: "Comuna 11, entre la plaza y la General Paz",
    text: "Devoto integra la Comuna 11 junto a Villa del Parque, Villa Santa Rita y Villa General Mitre. Cubrimos toda la zona: la oficina está a minutos de cualquier edificio de estos barrios.",
  },
  {
    title: "Consorcios de escala humana",
    text: "Casas y PHs en el corazón del barrio, y edificios bajos y medianos sobre los ejes de Av. Francisco Beiró, Av. San Martín y la zona comercial de la estación. El consorcio típico de Devoto es chico o mediano: exactamente el que más sufre a las administraciones de cartera masiva.",
  },
];

export default function VillaDevotoPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            breadcrumbSchema([
              { name: "Inicio", url: site.url },
              {
                name: "Administración de consorcios en Villa Devoto",
                url: `${site.url}/administracion-de-consorcios-villa-devoto`,
              },
            ]),
          ),
        }}
      />

      {/* HERO */}
      <Section spacing="tight" className="pt-24 sm:pt-28">
        <Container>
          <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="max-w-[64ch] lg:col-span-7">
            <p className="text-xs font-medium uppercase tracking-[0.18em] text-terra-700">
              Villa Devoto · CABA
            </p>
            <h1 className="mt-3 font-display text-[2.5rem] leading-[1.04] tracking-[-0.025em] text-balance text-navy-900 sm:text-[3.5rem]">
              Administración de consorcios en Villa Devoto
            </h1>
            <p className="mt-6 max-w-[60ch] text-[18px] leading-relaxed text-ink-800">
              Somos un estudio contable matriculado con oficina en el barrio, en{" "}
              {site.address.street.split(",")[0]}. Administramos consorcios de Villa
              Devoto y alrededores desde la contabilidad: expensas claras, cuentas a
              nombre del consorcio y rendición documentada todos los meses.
            </p>
            <p className="mt-5 max-w-[60ch] text-[16px] leading-relaxed text-ink-700">
              Devoto es un barrio de edificios de escala humana: PHs, edificios de pocas
              unidades y consorcios medianos sobre los ejes comerciales. Ese perfil de
              edificio suele quedar relegado en las administraciones de cartera masiva.
              Para nosotros es el edificio tipo, no la excepción.
            </p>

            <ul className="mt-9 flex flex-wrap items-center gap-2.5">
              {site.registries.map((r) => (
                <li key={r.label}>
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-cream-100 px-3.5 py-1.5 text-[13px] font-medium text-navy-900 ring-1 ring-cream-300">
                    <BadgeCheck strokeWidth={1.75} className="h-3.5 w-3.5 text-terra-700" />
                    {r.short}
                  </span>
                </li>
              ))}
              <li>
                <span className="inline-flex items-center gap-1.5 rounded-full bg-cream-100 px-3.5 py-1.5 text-[13px] font-medium text-navy-900 ring-1 ring-cream-300">
                  <MapPin strokeWidth={1.75} className="h-3.5 w-3.5 text-terra-700" />
                  Oficina en Villa Devoto
                </span>
              </li>
            </ul>

            <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:items-center">
              <Button href="/contacto" variant="primary" size="lg">
                Solicitar propuesta sin cargo
              </Button>
              <Button href={site.contact.whatsappHref} variant="secondary" size="lg">
                <MessageCircle strokeWidth={1.75} className="h-4 w-4" />
                Escribir por WhatsApp
              </Button>
            </div>
          </div>

          <figure className="lg:col-span-5">
            <div className="overflow-hidden rounded-lg border border-cream-300">
              <Image
                src="/zonas/plaza-arenales-villa-devoto.jpg"
                alt="Esquina de la Plaza Arenales, en el corazón de Villa Devoto, con sus árboles y veredas"
                width={1600}
                height={1200}
                priority
                className="h-[320px] w-full object-cover sm:h-[400px] lg:h-[520px]"
                sizes="(min-width: 1024px) 40vw, 100vw"
              />
            </div>
            <figcaption className="mt-2 text-[13px] text-ink-700/70">
              Plaza Arenales, el corazón de Villa Devoto.
            </figcaption>
          </figure>
          </div>
        </Container>
      </Section>

      {/* POR QUÉ UN ADMINISTRADOR DEL BARRIO */}
      <Section tone="muted" spacing="default">
        <Container>
          <Reveal>
            <div className="max-w-[58ch]">
              <p className="text-xs font-medium uppercase tracking-[0.18em] text-terra-700">
                Cercanía real
              </p>
              <h2 className="mt-3 font-display text-[2rem] leading-[1.05] tracking-[-0.02em] text-balance text-navy-900 sm:text-[2.5rem]">
                Qué cambia cuando el administrador está en el barrio
              </h2>
            </div>
          </Reveal>
          <Reveal delay={0.08}>
            <div className="mt-12 grid grid-cols-1 gap-x-12 gap-y-10 sm:grid-cols-2">
              {localReasons.map((item) => (
                <div key={item.title} className="grid grid-cols-[auto_1fr] gap-4">
                  <span className="flex h-11 w-11 items-center justify-center rounded-full bg-cream-100 ring-1 ring-cream-300">
                    <item.icon strokeWidth={1.75} className="h-5 w-5 text-terra-700" />
                  </span>
                  <div>
                    <h3 className="font-display text-[1.15rem] leading-snug text-navy-900">
                      {item.title}
                    </h3>
                    <p className="mt-2 text-[15.5px] leading-relaxed text-ink-700">
                      {item.text}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </Reveal>
        </Container>
      </Section>

      {/* EL BARRIO */}
      <Section tone="default" spacing="default">
        <Container>
          <Reveal>
            <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-16">
              <div className="lg:col-span-6">
                <p className="text-xs font-medium uppercase tracking-[0.18em] text-terra-700">
                  <Trees strokeWidth={1.75} className="mr-1.5 inline h-3.5 w-3.5 -translate-y-px text-terra-700" />
                  El barrio
                </p>
                <h2 className="mt-3 font-display text-[2rem] leading-[1.05] tracking-[-0.02em] text-balance text-navy-900 sm:text-[2.5rem]">
                  Un barrio que conocemos caminando
                </h2>
                <div className="mt-8 space-y-7">
                  {barrioFacts.map((fact) => (
                    <div key={fact.title}>
                      <h3 className="font-display text-[1.15rem] leading-snug text-navy-900">
                        {fact.title}
                      </h3>
                      <p className="mt-2 text-[15.5px] leading-relaxed text-ink-700">
                        {fact.text}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
              <div className="lg:col-span-6 lg:flex lg:flex-col lg:justify-center">
                <div className="relative isolate z-0 h-[320px] w-full overflow-hidden rounded-lg border border-cream-300 bg-cream-100 sm:h-[420px]">
                  <iframe
                    title="Villa Devoto en Google Maps"
                    src="https://www.google.com/maps?q=Villa+Devoto,+Ciudad+Aut%C3%B3noma+de+Buenos+Aires&z=14&hl=es&output=embed"
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    className="h-full w-full border-0"
                  />
                </div>
                <p className="mt-2 text-[13px] text-ink-700/70">
                  Villa Devoto y alrededores: la zona que cubrimos todos los días.
                </p>
              </div>
            </div>
          </Reveal>
        </Container>
      </Section>

      {/* QUÉ INCLUYE + OFICINA + MAPA */}
      <Section tone="muted" spacing="default">
        <Container>
          <Reveal>
            <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-16">
              <div className="lg:col-span-7">
                <p className="text-xs font-medium uppercase tracking-[0.18em] text-terra-700">
                  El servicio
                </p>
                <h2 className="mt-3 font-display text-[2rem] leading-[1.05] tracking-[-0.02em] text-balance text-navy-900 sm:text-[2.5rem]">
                  La administración completa, llevada por contadores
                </h2>
                <p className="mt-5 max-w-[56ch] text-[16px] leading-relaxed text-ink-700">
                  Liquidación mensual de expensas, control financiero y presupuestario,
                  sueldos del personal del edificio, coordinación de obras y
                  mantenimiento, asambleas y guardia ante emergencias. Con el
                  diferencial de un estudio contable: cada peso del consorcio queda
                  documentado, en una cuenta a nombre del consorcio.
                </p>
                <p className="mt-4 max-w-[56ch] text-[16px] leading-relaxed text-ink-700">
                  El detalle completo del servicio está en{" "}
                  <a
                    href="/servicios"
                    className="font-medium text-terra-700 underline decoration-terra-700/30 underline-offset-4 transition-colors hover:decoration-terra-700"
                  >
                    qué incluye nuestra administración
                  </a>
                  .
                </p>

              </div>
              <div className="lg:col-span-5 lg:flex lg:items-center">
                <div className="w-full rounded-2xl bg-cream-100 p-7 ring-1 ring-cream-300">
                  <p className="text-xs font-medium uppercase tracking-[0.18em] text-terra-700">
                    La oficina
                  </p>
                  <p className="mt-3 font-display text-[1.3rem] leading-snug text-navy-900">
                    {site.address.street}
                  </p>
                  <p className="mt-1 text-[15px] text-ink-700">
                    Villa Devoto, {site.address.city}
                  </p>
                  <p className="mt-4 text-[15px] leading-relaxed text-ink-700">
                    {site.hours.label} · {site.contact.phone}
                  </p>
                  <div className="mt-6">
                    <Button href="/contacto" variant="secondary" size="default">
                      Ver contacto completo
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </Reveal>
        </Container>
      </Section>

      <RelatedPosts
        eyebrow="Recursos"
        title="Guías útiles para propietarios y consejos"
        tone="default"
      />

      <FaqSection
        items={devotoFaq}
        title="Preguntas frecuentes sobre administración en Villa Devoto"
        tone="muted"
      />

      {/* CTA FINAL */}
      <Section tone="navy" spacing="default">
        <Container>
          <Reveal>
            <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:items-end">
              <div className="lg:col-span-8">
                <h2 className="font-display text-[2rem] leading-[1.05] tracking-[-0.02em] text-balance text-cream-50 sm:text-[2.5rem]">
                  ¿Tu edificio está en Villa Devoto o alrededores?
                </h2>
                <p className="mt-4 max-w-[58ch] text-[16.5px] leading-relaxed text-cream-100/85">
                  Contanos cómo es el edificio y qué los tiene disconformes de la
                  administración actual. La propuesta se arma a medida y sin cargo.
                </p>
              </div>
              <div className="lg:col-span-4 lg:flex lg:justify-end">
                <Button href="/contacto" variant="primary" size="lg">
                  Solicitar propuesta
                </Button>
              </div>
            </div>
          </Reveal>
        </Container>
      </Section>
    </>
  );
}
