import type { Metadata } from "next";
import Image from "next/image";
import {
  ArrowUpDown,
  BadgeCheck,
  Building2,
  Calculator,
  CalendarClock,
  Dumbbell,
  FireExtinguisher,
  Flame,
  Landmark,
  MapPin,
  MessageCircle,
  ShieldCheck,
  Sun,
  Trees,
  Users,
  WashingMachine,
  Waves,
} from "lucide-react";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/ui/reveal";
import { RelatedPosts } from "@/components/blog/related-posts";
import { FaqSection } from "@/components/ui/faq-section";
import { buildMetadata } from "@/lib/seo";
import { barrioServiceSchema, breadcrumbSchema } from "@/lib/schema";
import { site } from "@/content/site";
import type { FaqItem } from "@/content/faq";

export const metadata: Metadata = buildMetadata({
  title: "Administración de Consorcios en Palermo",
  description:
    "Torres con pileta, SUM y gimnasio en Palermo: contadores con RPA 8192 que ordenan amenities, ascensores, matafuegos y fachada con sus vencimientos a la vista.",
  path: "/administracion-de-consorcios-palermo",
});

const linkClass =
  "font-medium text-terra-700 underline decoration-terra-700/30 underline-offset-4 transition-colors hover:decoration-terra-700";

const CCYC_URL =
  "https://servicios.infoleg.gob.ar/infolegInternet/anexos/235000-239999/235975/texact.htm";
const CODIGO_EDIFICACION_URL =
  "https://www.cedom.gob.ar/legislacion/normas/codigos/edifica/index6.html";

// FAQ propia de la landing: ángulo amenities y obligaciones de la torre.
// Sin preguntas de honorarios, cambio de administrador ni auditoría (ya están en las otras seis).
const palermoFaq: FaqItem[] = [
  {
    question: "¿Tengo que pagar la pileta o el gimnasio si no los uso?",
    answer:
      "En principio sí. El artículo 2049 del Código Civil y Comercial dice que ningún propietario se libera de las expensas por renunciar al uso y goce de los bienes o servicios comunes. La excepción la tiene que prever el reglamento de propiedad horizontal, que puede eximir parcialmente a las unidades que no tienen acceso a determinados servicios o sectores del edificio.",
  },
  {
    question: "¿Quién fija los horarios y las reglas del SUM, la pileta o el gimnasio?",
    answer:
      "El punto de partida es el reglamento de propiedad horizontal: el artículo 2056 del Código Civil y Comercial exige que regule el uso y goce de las cosas y partes comunes y su destino. Muchos edificios suman un reglamento interno o decisiones de asamblea para el día a día. Si una regla está escrita en el reglamento de propiedad horizontal, cambiarla es modificarlo, y el artículo 2057 exige para eso dos tercios de la totalidad de los propietarios.",
  },
  {
    question: "¿Se puede agregar un amenity nuevo, por ejemplo un gimnasio en la terraza?",
    answer:
      "En general es una mejora u obra nueva sobre una parte común. Si no cambia el destino que el reglamento le da a esa parte ni afecta la estructura, el artículo 2051 pide el consentimiento de la mayoría de los propietarios y un informe técnico previo de un profesional autorizado. Si cambia el destino fijado en el reglamento, hay que modificarlo con dos tercios (artículo 2057). Si la obra gravita o modifica la estructura del edificio de manera sustancial, el artículo 2052 exige unanimidad, y también la exige si beneficia a un solo propietario.",
  },
  {
    question: "¿Qué papeles tiene que tener al día el ascensor de la torre?",
    answer:
      "Cada ascensor tiene que estar declarado en el Registro de Conservación de Elevadores de la Ciudad, con una empresa conservadora con permiso vigente, informes al menos mensuales en el libro digital y la oblea con código QR, que vence el 31 de diciembre y se renueva hasta el 31 de marzo. Además, el reglamento técnico exige una póliza de responsabilidad civil específica por el uso del elevador.",
  },
  {
    question: "¿Cada cuánto se recargan los matafuegos del edificio?",
    answer:
      "La recarga o el mantenimiento tienen una vigencia de un año, según el artículo 5.1.7.2 del Código de la Edificación. Lo tiene que hacer una empresa inscripta en el registro de fabricantes, reparadores y recargadores de extintores de la Agencia Gubernamental de Control, y junto con la recarga se hace una revisión completa del estado de cada matafuego.",
  },
  {
    question: "¿Administran edificios en todo Palermo?",
    answer:
      "Sí. La oficina está en Villa Devoto y administramos en toda la Ciudad, de Palermo Chico a Palermo Hollywood. Las asambleas se hacen en el edificio y la documentación del consorcio está a disposición del consejo cuando la pida.",
  },
];

// Las cinco partes comunes no indispensables que enumera el art. 2042 del CCyC.
const amenities = [
  { icon: Waves, nombre: "Piscina" },
  { icon: Sun, nombre: "Solárium" },
  { icon: Dumbbell, nombre: "Gimnasio" },
  { icon: WashingMachine, nombre: "Lavadero" },
  { icon: Users, nombre: "Salón de usos múltiples" },
];

// Tabla de casos con veredicto: qué hace falta para cada decisión sobre amenities.
const decisiones = [
  {
    situacion: "Un propietario deja de pagar la parte del gimnasio porque no lo usa",
    veredicto: "No puede: nadie se libera de las expensas por renunciar al uso de un servicio común.",
    norma: "Art. 2049",
  },
  {
    situacion: "Una unidad no tiene acceso a la pileta y quiere quedar eximida",
    veredicto: "Solo si el reglamento lo prevé: puede eximir parcialmente a quien no accede al servicio.",
    norma: "Art. 2049",
  },
  {
    situacion: "Cambiar el horario del SUM que fija el reglamento",
    veredicto: "Es modificar el reglamento: dos tercios de la totalidad de los propietarios.",
    norma: "Arts. 2056 y 2057",
  },
  {
    situacion: "Convertir parte de la terraza común en solárium, sin tocar estructura ni el destino del reglamento",
    veredicto: "Mejora sobre parte común: mayoría de propietarios e informe técnico previo.",
    norma: "Art. 2051",
  },
  {
    situacion: "Construir una pileta que modifica sustancialmente la estructura",
    veredicto: "Hace falta unanimidad, aunque no se eleven pisos ni se excave.",
    norma: "Art. 2052",
  },
  {
    situacion: "Una obra en parte común que solo beneficia a un propietario",
    veredicto: "Unanimidad, y la paga el beneficiario, que además carga con modificar e inscribir el reglamento si hace falta.",
    norma: "Arts. 2052 y 2053",
  },
];

// Calendario de la torre: qué pide la norma para cada equipo y cuándo vence.
const calendario = [
  {
    icon: ArrowUpDown,
    equipo: "Ascensores",
    obligacion:
      "Declarados en el registro de la Ciudad, con empresa conservadora con permiso vigente e informes al menos mensuales en el libro digital.",
    cuando: "Oblea con QR: vence el 31 de diciembre, se renueva hasta el 31 de marzo.",
    norma: "Código de la Edificación, art. 5.1.5, y reglamento técnico RT-050105",
    href: "/blog/mantenimiento-obligatorio-de-ascensores-en-caba",
    linkLabel: "Qué exige la Ciudad para el ascensor",
  },
  {
    icon: FireExtinguisher,
    equipo: "Matafuegos",
    obligacion:
      "Recarga y mantenimiento por una empresa inscripta en el registro de la Agencia Gubernamental de Control, con una revisión completa de cada equipo.",
    cuando: "La recarga tiene vigencia de un año.",
    norma: "Código de la Edificación, art. 5.1.7.2",
  },
  {
    icon: ShieldCheck,
    equipo: "Instalaciones fijas contra incendio",
    obligacion:
      "Inscriptas en el registro que corresponda y mantenidas por personas inscriptas en el registro de fabricantes, reparadores e instaladores.",
    cuando: "Con las verificaciones y certificaciones que fijan los reglamentos técnicos.",
    norma: "Código de la Edificación, arts. 5.1.7 y 5.1.7.1",
  },
  {
    icon: Flame,
    equipo: "Artefactos térmicos",
    obligacion:
      "El edificio que los tiene debe inscribirse en el registro correspondiente para su certificación, conservación y mantenimiento.",
    cuando: "Según los reglamentos técnicos.",
    norma: "Código de la Edificación, art. 5.1.6",
  },
  {
    icon: Building2,
    equipo: "Fachada",
    obligacion:
      "Una certificación técnica firmada por un profesional matriculado sobre balcones, cornisas, revestimientos y todo lo que da al espacio público.",
    cuando: "Periódica, según la antigüedad del edificio: desde cada 15 años hasta cada 4.",
    norma: "Código de la Edificación, art. 5.1.2",
    href: "/blog/ley-257-caba-fachadas-y-balcones",
    linkLabel: "La tabla completa de fachadas",
  },
];

const barrioFacts = [
  {
    icon: MapPin,
    title: "Comuna 14, del río a la Avenida Córdoba",
    text: "Entre los límites oficiales de Palermo están el Río de la Plata y el Aeroparque, la Avenida Figueroa Alcorta, las vías del Mitre, la Avenida Cabildo, la Avenida Córdoba, Coronel Díaz, Las Heras y Jerónimo Salguero. Según el Gobierno de la Ciudad ocupa 15,9 kilómetros cuadrados y el censo de 2001 le contó 225.245 habitantes.",
  },
  {
    icon: Landmark,
    title: "De la quinta de Rosas al Tres de Febrero",
    text: "Juan Manuel de Rosas compró estas tierras hacia 1836 y levantó su residencia en la esquina de las actuales avenidas del Libertador y Sarmiento. El 11 de noviembre de 1875 se inauguró el Parque Tres de Febrero, por iniciativa de Sarmiento, y poco después el Jardín Botánico y el Zoológico. La vieja casa se demolió en 1889.",
  },
  {
    icon: Trees,
    title: "Un nombre con dos historias",
    text: "El origen del nombre sigue en discusión: una hipótesis lo vincula con Juan Domínguez Palermo, dueño de las tierras a principios del siglo XVII, y otra con un oratorio de San Benito de Palermo. Los portones de ingreso al parque desaparecieron en 1917, pero el nombre quedó para la Plaza Italia. El barrio celebra su aniversario el 25 de junio.",
  },
];

export default function PalermoPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            [
              breadcrumbSchema([
                { name: "Inicio", url: site.url },
                {
                  name: "Administración de consorcios en Palermo",
                  url: `${site.url}/administracion-de-consorcios-palermo`,
                },
              ]),
              barrioServiceSchema("Palermo", "/administracion-de-consorcios-palermo"),
            ],
          ),
        }}
      />

      {/* HERO */}
      <Section spacing="tight" className="pt-24 sm:pt-28">
        <Container>
          <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-12 lg:gap-16">
            <div className="max-w-[64ch] lg:col-span-7">
              <p className="text-xs font-medium uppercase tracking-[0.18em] text-terra-700">
                Palermo · Comuna 14 · CABA
              </p>
              <h1 className="mt-3 font-display text-[2.5rem] leading-[1.04] tracking-[-0.025em] text-balance text-navy-900 sm:text-[3.5rem]">
                Administración de consorcios en Palermo
              </h1>
              <p className="mt-6 max-w-[60ch] text-[18px] leading-relaxed text-ink-800">
                En Palermo abundan las torres con pileta, SUM y gimnasio, varios
                ascensores y una lista de equipos que vencen en fechas distintas. Somos
                un estudio de contadores públicos inscripto en el Registro de la
                Ciudad, y llevamos cada vencimiento del edificio a la vista del consejo.
              </p>

              <ul className="mt-9 flex flex-wrap items-center gap-2.5">
                {site.registries.map((r) => (
                  <li key={r.label}>
                    <span className="inline-flex items-center gap-1.5 rounded-full bg-cream-100 px-3.5 py-1.5 text-[13px] font-medium text-navy-900 ring-1 ring-cream-300">
                      <BadgeCheck aria-hidden="true" strokeWidth={1.75} className="h-3.5 w-3.5 text-terra-700" />
                      {r.short}
                    </span>
                  </li>
                ))}
                <li>
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-cream-100 px-3.5 py-1.5 text-[13px] font-medium text-navy-900 ring-1 ring-cream-300">
                    <Calculator aria-hidden="true" strokeWidth={1.75} className="h-3.5 w-3.5 text-terra-700" />
                    Contadores Públicos al frente
                  </span>
                </li>
              </ul>

              <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:items-center">
                <Button href="/contacto" variant="primary" size="lg">
                  Pedir una propuesta sin cargo
                </Button>
                <Button href={site.contact.whatsappHref} variant="secondary" size="lg">
                  <MessageCircle aria-hidden="true" strokeWidth={1.75} className="h-4 w-4" />
                  Escribir por WhatsApp
                </Button>
              </div>
            </div>

            <figure className="lg:col-span-5">
              <div className="overflow-hidden rounded-lg border border-cream-300">
                <Image
                  src="/zonas/avenida-del-libertador-palermo.jpg"
                  alt="Torres de departamentos sobre la Avenida del Libertador, frente a los árboles del Parque Tres de Febrero"
                  width={1600}
                  height={1200}
                  priority
                  className="h-[320px] w-full object-cover sm:h-[400px] lg:h-[520px]"
                  sizes="(min-width: 1024px) 40vw, 100vw"
                />
              </div>
              <figcaption className="mt-2 text-[13px] text-ink-700/70">
                Avenida del Libertador frente al Parque Tres de Febrero (recorte). Foto:{" "}
                <a href="https://commons.wikimedia.org/wiki/File:Buenos_Aires_-_Palermo_Nuevo.jpg" target="_blank" rel="noopener noreferrer" className="underline decoration-ink-700/30 underline-offset-2 hover:decoration-ink-700">Jorge Láscar</a>,{" "}
                <a href="https://creativecommons.org/licenses/by/2.0/deed.es" target="_blank" rel="noopener noreferrer" className="underline decoration-ink-700/30 underline-offset-2 hover:decoration-ink-700">CC BY 2.0</a>.
              </figcaption>
            </figure>
          </div>
        </Container>
      </Section>

      {/* AMENITIES: COMUNES, NO INDISPENSABLES */}
      <Section tone="muted" spacing="default">
        <Container>
          <Reveal>
            <div className="grid grid-cols-1 gap-6 lg:grid-cols-12 lg:gap-16">
              <div className="lg:col-span-5">
                <p className="text-xs font-medium uppercase tracking-[0.18em] text-terra-700">
                  Los amenities
                </p>
                <h2 className="mt-3 font-display text-[2rem] leading-[1.05] tracking-[-0.02em] text-balance text-navy-900 sm:text-[2.5rem]">
                  Comunes, pero no indispensables
                </h2>
              </div>
              <div className="lg:col-span-7 lg:pt-8">
                <p className="text-[16.5px] leading-relaxed text-ink-700">
                  El{" "}
                  <a href={CCYC_URL} target="_blank" rel="noopener noreferrer" className={linkClass}>
                    Código Civil y Comercial
                  </a>{" "}
                  tiene un artículo para los amenities. El 2042 los llama «cosas y
                  partes comunes no indispensables» y nombra justamente estos cinco,
                  aclarando que la lista es enunciativa.
                </p>
                <p className="mt-4 text-[16.5px] leading-relaxed text-ink-700">
                  Que no sean indispensables no quiere decir que sean optativos para
                  pagar. Siguen siendo partes comunes, y cómo se usan, quién accede y
                  quién paga lo resuelven el reglamento y las mayorías del Código.
                </p>
              </div>
            </div>
          </Reveal>

          <Reveal delay={0.06}>
            <ul className="mt-12 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
              {amenities.map((a) => (
                <li
                  key={a.nombre}
                  className="flex items-center gap-3 rounded-xl bg-cream-50 px-4 py-4 ring-1 ring-cream-300"
                >
                  <a.icon aria-hidden="true" strokeWidth={1.75} className="h-5 w-5 shrink-0 text-terra-700" />
                  <span className="text-[15px] font-medium leading-snug text-navy-900">{a.nombre}</span>
                </li>
              ))}
            </ul>
          </Reveal>

          <Reveal delay={0.1}>
            <div className="mt-14">
              <h3 className="font-display text-[1.5rem] leading-snug text-navy-900">
                Qué hace falta para cada decisión
              </h3>
              <p className="mt-3 text-[13px] text-ink-700/70 sm:hidden">Deslicen la tabla para ver la norma de cada caso.</p>
              <div className="mt-3 overflow-x-auto rounded-2xl ring-1 ring-cream-300 sm:mt-6">
                <table className="w-full min-w-[640px] border-collapse bg-cream-50 text-left">
                  <thead>
                    <tr className="bg-cream-100 text-xs font-medium uppercase tracking-[0.14em] text-ink-700/80">
                      <th scope="col" className="px-5 py-4">Situación</th>
                      <th scope="col" className="px-5 py-4">Qué dice el Código</th>
                      <th scope="col" className="px-5 py-4">Norma</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-cream-300">
                    {decisiones.map((d) => (
                      <tr key={d.situacion} className="align-top">
                        <th scope="row" className="px-5 py-4 text-[15px] font-medium leading-snug text-navy-900">
                          {d.situacion}
                        </th>
                        <td className="px-5 py-4 text-[15px] leading-relaxed text-ink-700">{d.veredicto}</td>
                        <td className="whitespace-nowrap px-5 py-4 text-[13.5px] font-medium text-terra-700">{d.norma}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <p className="mt-6 max-w-[70ch] text-[15.5px] leading-relaxed text-ink-700">
                Antes de votar cualquiera de estas cosas, lo primero es leer el
                reglamento del edificio: ahí están las reglas de uso y, a veces, las
                eximiciones. Cómo se computan las mayorías lo explicamos en la nota sobre{" "}
                <a href="/blog/asamblea-de-consorcio-quorum-y-mayorias" className={linkClass}>
                  quórum y mayorías en la asamblea
                </a>
                .
              </p>
            </div>
          </Reveal>
        </Container>
      </Section>

      {/* EL CALENDARIO DE LA TORRE */}
      <Section tone="default" spacing="default">
        <Container>
          <Reveal>
            <div className="max-w-[62ch]">
              <p className="text-xs font-medium uppercase tracking-[0.18em] text-terra-700">
                El calendario de la torre
              </p>
              <h2 className="mt-3 font-display text-[2rem] leading-[1.05] tracking-[-0.02em] text-balance text-navy-900 sm:text-[2.5rem]">
                Cinco obligaciones, cinco fechas distintas
              </h2>
              <p className="mt-5 text-[16.5px] leading-relaxed text-ink-700">
                Una torre no tiene un vencimiento: tiene varios, cada uno con su
                registro y su empresa habilitada. El{" "}
                <a href={CODIGO_EDIFICACION_URL} target="_blank" rel="noopener noreferrer" className={linkClass}>
                  Código de la Edificación
                </a>{" "}
                los pone todos en cabeza del propietario, y el Código Civil y Comercial
                le encarga al administrador cumplir «todas las normas de seguridad y
                verificaciones impuestas por las reglamentaciones locales».
              </p>
            </div>
          </Reveal>

          <Reveal delay={0.08}>
            <ol className="mt-12 divide-y divide-cream-300 border-y border-cream-300">
              {calendario.map((c) => (
                <li key={c.equipo} className="grid grid-cols-1 gap-5 py-8 lg:grid-cols-12 lg:gap-10">
                  <div className="flex items-center gap-3 lg:col-span-3 lg:items-start">
                    <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-cream-100 ring-1 ring-cream-300">
                      <c.icon aria-hidden="true" strokeWidth={1.75} className="h-5 w-5 text-terra-700" />
                    </span>
                    <div className="lg:mt-1">
                      <h3 className="font-display text-[1.3rem] leading-snug text-navy-900">{c.equipo}</h3>
                      <p className="mt-1 text-[12.5px] font-medium text-terra-700">{c.norma}</p>
                    </div>
                  </div>
                  <p className="text-[15.5px] leading-relaxed text-ink-700 lg:col-span-5">
                    {c.obligacion}
                    {c.href ? (
                      <>
                        {" "}
                        <a href={c.href} className={linkClass}>
                          {c.linkLabel}
                        </a>
                        .
                      </>
                    ) : null}
                  </p>
                  <p className="flex items-start gap-2.5 text-[15px] leading-relaxed text-ink-800 lg:col-span-4">
                    <CalendarClock aria-hidden="true" strokeWidth={1.75} className="mt-0.5 h-4 w-4 shrink-0 text-terra-700" />
                    {c.cuando}
                  </p>
                </li>
              ))}
            </ol>
          </Reveal>

          <Reveal delay={0.12}>
            <p className="mt-10 max-w-[70ch] text-[15.5px] leading-relaxed text-ink-700">
              A esa lista se suma el seguro integral de consorcio, con incendio y
              responsabilidad civil, que el artículo 2067 del Código Civil y Comercial
              pone a cargo del administrador, y la póliza que el reglamento técnico pide por el
              uso de los ascensores, con una cobertura mínima por cada uno. El
              mantenimiento de todo esto es gasto común del edificio, como el resto
              de las expensas ordinarias del artículo 2048; la diferencia con las cuotas que dispone la asamblea
              está en la nota sobre{" "}
              <a href="/blog/expensas-ordinarias-y-extraordinarias-diferencias" className={linkClass}>
                expensas ordinarias y extraordinarias
              </a>
              .
            </p>
          </Reveal>
        </Container>
      </Section>

      {/* EL BARRIO + MAPA */}
      <Section tone="muted" spacing="default">
        <Container>
          <Reveal>
            <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-16">
              <div className="lg:col-span-6">
                <p className="text-xs font-medium uppercase tracking-[0.18em] text-terra-700">
                  El barrio
                </p>
                <h2 className="mt-3 font-display text-[2rem] leading-[1.05] tracking-[-0.02em] text-balance text-navy-900 sm:text-[2.5rem]">
                  De los Bosques de Palermo a las torres del Libertador
                </h2>
                <div className="mt-8 space-y-7">
                  {barrioFacts.map((fact) => (
                    <div key={fact.title} className="grid grid-cols-[auto_1fr] gap-4">
                      <span className="flex h-10 w-10 items-center justify-center rounded-full bg-cream-50 ring-1 ring-cream-300">
                        <fact.icon aria-hidden="true" strokeWidth={1.75} className="h-4 w-4 text-terra-700" />
                      </span>
                      <div>
                        <h3 className="font-display text-[1.15rem] leading-snug text-navy-900">
                          {fact.title}
                        </h3>
                        <p className="mt-2 text-[15.5px] leading-relaxed text-ink-700">
                          {fact.text}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="lg:col-span-6 lg:flex lg:flex-col lg:justify-center">
                <div className="relative isolate z-0 h-[320px] w-full overflow-hidden rounded-lg border border-cream-300 bg-cream-100 sm:h-[420px]">
                  <iframe
                    title="Palermo en Google Maps"
                    src="https://www.google.com/maps?q=Palermo,+Ciudad+Aut%C3%B3noma+de+Buenos+Aires&z=13&hl=es&output=embed"
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    className="h-full w-full border-0"
                  />
                </div>
                <p className="mt-2 text-[13px] text-ink-700/70">
                  Palermo, en la Comuna 14, entre el Río de la Plata y la Avenida
                  Córdoba.
                </p>
              </div>
            </div>
          </Reveal>
        </Container>
      </Section>

      {/* EL SERVICIO + OFICINA */}
      <Section tone="default" spacing="default">
        <Container>
          <Reveal>
            <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-16">
              <div className="lg:col-span-7">
                <p className="text-xs font-medium uppercase tracking-[0.18em] text-terra-700">
                  Cómo trabajamos
                </p>
                <h2 className="mt-3 font-display text-[2rem] leading-[1.05] tracking-[-0.02em] text-balance text-navy-900 sm:text-[2.5rem]">
                  Cada vencimiento, antes de que venza
                </h2>
                <p className="mt-5 max-w-[56ch] text-[16px] leading-relaxed text-ink-700">
                  Cuando tomamos un edificio armamos su ficha: cada ascensor con su
                  empresa y su oblea, la última recarga de matafuegos, el registro de
                  las instalaciones contra incendio, la antigüedad para la fachada y las
                  pólizas con sus vencimientos. Con eso el presupuesto anual ya sabe qué
                  toca pagar ese año, y el consejo lo ve antes que la factura.
                </p>
                <p className="mt-4 max-w-[56ch] text-[16px] leading-relaxed text-ink-700">
                  Todos los meses emitimos la liquidación con cada contratista
                  identificado y su respaldo, y convocamos las asambleas en el edificio.
                  Las funciones del consejo en ese control están en la nota sobre{" "}
                  <a href="/blog/funciones-del-consejo-de-propietarios" className={linkClass}>
                    el consejo de propietarios
                  </a>
                  . El detalle de cada plan está en{" "}
                  <a href="/servicios" className={linkClass}>
                    servicios
                  </a>
                  , y si quieren contarnos cómo es su torre, pueden{" "}
                  <a href="/contacto" className={linkClass}>
                    escribirnos
                  </a>
                  .
                </p>
              </div>
              <div className="lg:col-span-5 lg:flex lg:items-center">
                <div className="w-full rounded-2xl bg-cream-100 p-7 ring-1 ring-cream-300">
                  <p className="text-xs font-medium uppercase tracking-[0.18em] text-terra-700">
                    Dónde estamos
                  </p>
                  <p className="mt-3 font-display text-[1.3rem] leading-snug text-navy-900">
                    {site.address.street}
                  </p>
                  <p className="mt-1 text-[15px] text-ink-700">
                    Villa Devoto · {site.address.city}
                  </p>
                  <p className="mt-4 text-[15px] leading-relaxed text-ink-700">
                    La oficina está en Villa Devoto y administramos en toda la Ciudad.
                    Las asambleas se hacen en su edificio, y la documentación del
                    consorcio está siempre disponible para el consejo.
                  </p>
                  <p className="mt-4 text-[15px] leading-relaxed text-ink-700">
                    {site.hours.label} · {site.contact.phone}
                  </p>
                  <div className="mt-6">
                    <Button href="/contacto" variant="secondary" size="default">
                      Hablar con el estudio
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </Reveal>
        </Container>
      </Section>

      <RelatedPosts
        eyebrow="Para el consejo de una torre"
        title="Guías sobre obligaciones del edificio y partes comunes"
        tags={["obligaciones CABA", "propiedad horizontal", "expensas"]}
        tone="muted"
      />

      <FaqSection
        items={palermoFaq}
        title="Preguntas frecuentes sobre administración en Palermo"
        tone="default"
      />

      {/* CTA FINAL */}
      <Section tone="navy" spacing="default">
        <Container>
          <Reveal>
            <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:items-end">
              <div className="lg:col-span-8">
                <h2 className="font-display text-[2rem] leading-[1.05] tracking-[-0.02em] text-balance text-cream-50 sm:text-[2.5rem]">
                  ¿Alguien en su torre sabe qué vence este año?
                </h2>
                <p className="mt-4 max-w-[58ch] text-[16.5px] leading-relaxed text-cream-100/85">
                  Cuéntennos cómo es el edificio y envíennos una liquidación reciente.
                  Les decimos qué obligaciones tendría que tener al día y les proponemos
                  cómo lo administraríamos, sin costo.
                </p>
              </div>
              <div className="lg:col-span-4 lg:flex lg:justify-end">
                <Button href="/contacto" variant="primary" size="lg">
                  Pedir la revisión
                </Button>
              </div>
            </div>
          </Reveal>
        </Container>
      </Section>
    </>
  );
}
