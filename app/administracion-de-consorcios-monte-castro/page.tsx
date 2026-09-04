import type { Metadata } from "next";
import Image from "next/image";
import {
  BadgeCheck,
  Building2,
  ClipboardCheck,
  Home,
  MapPin,
  MessageCircle,
  ShieldCheck,
  Store,
  Trophy,
} from "lucide-react";
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
  title: "Administración de Consorcios en Monte Castro",
  description:
    "Estudio contable matriculado (RPA 8192) con oficina en Villa Devoto, a diez cuadras de Monte Castro. Administramos PH de pocas unidades, edificios con local a la calle y consorcios con encargado: expensas claras, cuenta a nombre del consorcio y rendición documentada.",
  path: "/administracion-de-consorcios-monte-castro",
});

// FAQ propia de la landing: ángulo PH autoadministrado + local en planta baja.
// Distinta de la de Devoto (cercanía) y de la de Villa del Parque (obra nueva).
const monteCastroFaq: FaqItem[] = [
  {
    question: "¿Administran PH y edificios chicos en Monte Castro?",
    answer:
      "Sí, y es el consorcio más común del barrio. Monte Castro es mayormente un barrio de casas, y buena parte de sus consorcios son PH de dos a ocho unidades, sin encargado ni ascensor. Lo que necesitan no es una estructura grande sino tres cosas básicas que casi nunca tienen: un reglamento con porcentuales claros, una cuenta bancaria a nombre del consorcio y una liquidación mensual que cualquiera pueda leer.",
  },
  {
    question: "Nuestro PH lo administra un vecino sin cobrar. ¿Está bien así?",
    answer:
      "Es legal, pero tiene requisitos que casi nadie cumple. El artículo 2º de la Ley 941 de la Ciudad establece que la administración de consorcios no puede ejercerse a título oneroso ni gratuito sin la previa inscripción en el Registro Público de Administradores, y el artículo 3º define al administrador voluntario como el propietario que reside en el edificio y cumple la función sin retribución. Ese vecino tiene que inscribirse, con los requisitos reducidos que fija el artículo 4º, y responde por las mismas obligaciones que cualquier administrador: liquidar las expensas, rendir cuentas, mantener asegurado el edificio y llevar los libros.",
  },
  {
    question: "¿Cómo se reparten las expensas cuando hay un local en la planta baja?",
    answer:
      "Según lo que diga el reglamento de propiedad horizontal, no según la costumbre. El artículo 2056 del Código Civil y Comercial obliga al reglamento a fijar la parte indivisa de cada unidad y la proporción en el pago de las expensas, que pueden no coincidir. Y el artículo 2049 autoriza al reglamento a eximir parcialmente de expensas a las unidades que no tienen acceso a determinados servicios o sectores del edificio, como un local a la calle que no usa el ascensor ni el palier. Lo primero que hacemos en un edificio mixto es cotejar la liquidación con esos porcentuales.",
  },
  {
    question: "¿Qué zonas cubren desde la oficina?",
    answer:
      "Toda la Comuna 10 (Monte Castro, Floresta, Vélez Sársfield, Villa Luro, Versalles y Villa Real), la Comuna 11 donde está nuestra oficina (Villa Devoto, Villa del Parque, Villa Santa Rita y Villa General Mitre) y el resto de la Ciudad. La oficina está en Campana, en Villa Devoto, a unas diez cuadras del límite de Monte Castro sobre Baigorria.",
  },
  {
    question: "¿Cuánto cuesta administrar un consorcio en Monte Castro?",
    answer:
      "En la Ciudad no existe un arancel oficial: el artículo 14 de la Ley 941 establece que el honorario del administrador lo acuerdan las partes en la asamblea. En un PH de pocas unidades el honorario tiene que ser proporcional al trabajo real, y en un edificio con encargado y local a la calle depende de la nómina, las instalaciones y el alcance pactado. Vemos la liquidación actual y armamos la propuesta sin cargo.",
  },
  {
    question: "Queremos cambiar de administrador. ¿Cómo empezamos?",
    answer:
      "Con una asamblea. El artículo 2066 del Código Civil y Comercial dispone que el administrador es nombrado y removido por la asamblea, sin expresión de causa y sin reformar el reglamento. Una vez decidido el cambio, el administrador saliente tiene quince días hábiles para entregar los libros, la documentación y los fondos. Los acompañamos en la convocatoria, en el acta y en el traspaso.",
  },
];

// Los tres consorcios típicos del barrio. Cada uno falla por un motivo distinto.
const consorcioProfiles = [
  {
    icon: Home,
    title: "El PH de pocas unidades",
    text: "Monte Castro es un barrio de casas bajas. El consorcio típico es un lote con dos, tres o cuatro unidades, muchas veces con un reglamento de hace décadas y sin administración formal: los gastos se reparten de palabra y la cuenta la lleva un vecino en su propia caja de ahorro.",
    need: "Reglamento con porcentuales claros, cuenta a nombre del consorcio y una liquidación mensual aunque sean tres unidades.",
  },
  {
    icon: Store,
    title: "Edificio con local en planta baja",
    text: "Sobre Álvarez Jonte, Lope de Vega, Segurola y Sanabria se repite el mismo edificio: comercio abajo, viviendas arriba. El conflicto clásico es qué paga el local, que no usa el ascensor, el palier ni el encargado, y que sin embargo suele recibir un porcentual único de gastos.",
    need: "Reparto conforme al reglamento, con las eximiciones parciales del artículo 2049 del Código aplicadas como corresponde y no por costumbre.",
  },
  {
    icon: Building2,
    title: "Edificio de escala media con encargado",
    text: "Sobre las avenidas y en el entorno del estadio aparecen los edificios de más pisos, con encargado en relación de dependencia, ascensor, tanque y sala de máquinas. Es el consorcio donde un error de liquidación de sueldos o un seguro vencido se paga caro y entre todos.",
    need: "Sueldos liquidados bajo convenio, seguro integral vigente y calendario de habilitaciones y mantenimientos al día.",
  },
];

const barrioFacts = [
  {
    icon: MapPin,
    title: "Comuna 10, pegado a Villa Devoto",
    text: "Monte Castro queda delimitado por Baigorria, Joaquín V. González, Juan Agustín García, la Avenida Lope de Vega, la Avenida Álvarez Jonte e Irigoyen. Integra la Comuna 10 junto con Floresta, Vélez Sársfield, Villa Luro, Versalles y Villa Real. Del otro lado de Baigorria empieza Villa Devoto, donde está nuestra oficina: unas diez cuadras.",
  },
  {
    icon: Store,
    title: "Álvarez Jonte, el centro comercial a cielo abierto",
    text: "La avenida concentra el comercio del barrio y el edificio típico de sus cuadras: local en la planta baja y departamentos arriba. Esa mezcla de destinos no es un detalle urbano, tiene efecto directo en el reglamento, en el reparto de las expensas y en las mayorías de cada asamblea.",
  },
  {
    icon: Home,
    title: "Un barrio de casas, en lo alto de la ciudad",
    text: "Es un barrio mayormente unifamiliar, ubicado en una de las zonas más altas de la Ciudad, con poco menos de treinta y cinco mil habitantes en 2,9 kilómetros cuadrados. El consorcio de Monte Castro no es la torre: es el PH y el edificio bajo, con pocos propietarios que se conocen por el nombre.",
  },
  {
    icon: Trophy,
    title: "All Boys y las instituciones del barrio",
    text: "El Club Atlético All Boys juega en Monte Castro desde 1924, en el Estadio Islas Malvinas de Mercedes 1951, la manzana que limitan Álvarez Jonte, Mercedes, Miranda y Chivilcoy. El barrio tiene además dos hospitales públicos, el Vélez Sarsfield y el de Rehabilitación Manuel Rocca, y la Escuela Técnica Nº 27, donde estudió Jorge Bergoglio.",
  },
];

export default function MonteCastroPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            breadcrumbSchema([
              { name: "Inicio", url: site.url },
              {
                name: "Administración de consorcios en Monte Castro",
                url: `${site.url}/administracion-de-consorcios-monte-castro`,
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
                Monte Castro · Comuna 10 · CABA
              </p>
              <h1 className="mt-3 font-display text-[2.5rem] leading-[1.04] tracking-[-0.025em] text-balance text-navy-900 sm:text-[3.5rem]">
                Administración de consorcios en Monte Castro
              </h1>
              <p className="mt-6 max-w-[60ch] text-[18px] leading-relaxed text-ink-800">
                Somos un estudio contable matriculado con oficina en Villa Devoto, en{" "}
                {site.address.street.split(",")[0]}, a unas diez cuadras del barrio.
                Administramos consorcios de Monte Castro desde la contabilidad: expensas
                que se entienden, cuenta bancaria a nombre del consorcio y rendición
                documentada cada mes.
              </p>
              <p className="mt-5 max-w-[60ch] text-[16px] leading-relaxed text-ink-700">
                Monte Castro es un barrio de casas. Su consorcio típico no es una torre
                sino un PH de pocas unidades, muchas veces administrado por un vecino
                que no cobra, y sobre las avenidas, el edificio con local abajo y
                departamentos arriba. Son las dos situaciones donde más se paga no tener
                un contador mirando la liquidación.
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
                    A diez cuadras del barrio
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
                  src="/zonas/avenida-alvarez-jonte-monte-castro.jpg"
                  alt="Avenida Álvarez Jonte en Monte Castro, con árboles, edificios bajos con balcones y locales en planta baja"
                  width={1600}
                  height={1200}
                  priority
                  className="h-[320px] w-full object-cover sm:h-[400px] lg:h-[520px]"
                  sizes="(min-width: 1024px) 40vw, 100vw"
                />
              </div>
              <figcaption className="mt-2 text-[13px] text-ink-700/70">
                Avenida Álvarez Jonte al 4200, en Monte Castro. Foto: Gobonobo, CC BY-SA 3.0.
              </figcaption>
            </figure>
          </div>
        </Container>
      </Section>

      {/* LOS TRES CONSORCIOS DEL BARRIO */}
      <Section tone="muted" spacing="default">
        <Container>
          <Reveal>
            <div className="max-w-[62ch]">
              <p className="text-xs font-medium uppercase tracking-[0.18em] text-terra-700">
                El barrio por dentro
              </p>
              <h2 className="mt-3 font-display text-[2rem] leading-[1.05] tracking-[-0.02em] text-balance text-navy-900 sm:text-[2.5rem]">
                Los tres consorcios típicos de Monte Castro
              </h2>
              <p className="mt-5 text-[16.5px] leading-relaxed text-ink-700">
                Cada uno falla por un motivo distinto. El PH, por falta de estructura; el
                edificio mixto, por un reparto de gastos que nadie cotejó con el
                reglamento; el edificio con encargado, por un error caro en sueldos o
                seguros.
              </p>
            </div>
          </Reveal>
          <Reveal delay={0.08}>
            <div className="mt-12 grid grid-cols-1 gap-x-10 gap-y-10 lg:grid-cols-3">
              {consorcioProfiles.map((item) => (
                <div key={item.title} className="flex flex-col">
                  <span className="flex h-11 w-11 items-center justify-center rounded-full bg-cream-100 ring-1 ring-cream-300">
                    <item.icon strokeWidth={1.75} className="h-5 w-5 text-terra-700" />
                  </span>
                  <h3 className="mt-5 font-display text-[1.25rem] leading-snug text-navy-900">
                    {item.title}
                  </h3>
                  <p className="mt-3 text-[15.5px] leading-relaxed text-ink-700">
                    {item.text}
                  </p>
                  <p className="mt-4 border-t border-cream-300 pt-4 text-[15px] leading-relaxed text-ink-800">
                    <span className="font-medium text-navy-900">Lo que necesita: </span>
                    {item.need}
                  </p>
                </div>
              ))}
            </div>
          </Reveal>
        </Container>
      </Section>

      {/* EL PH AUTOADMINISTRADO Y LA LEY 941 */}
      <Section tone="default" spacing="default">
        <Container>
          <Reveal>
            <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-16">
              <div className="lg:col-span-7">
                <p className="text-xs font-medium uppercase tracking-[0.18em] text-terra-700">
                  <ShieldCheck
                    strokeWidth={1.75}
                    className="mr-1.5 inline h-3.5 w-3.5 -translate-y-px text-terra-700"
                  />
                  PH administrados por un vecino
                </p>
                <h2 className="mt-3 font-display text-[2rem] leading-[1.05] tracking-[-0.02em] text-balance text-navy-900 sm:text-[2.5rem]">
                  Si el edificio lo administra un vecino, la Ley 941 también le habla
                </h2>
                <p className="mt-6 max-w-[62ch] text-[16.5px] leading-relaxed text-ink-700">
                  En los PH del barrio es lo más habitual: un propietario que junta la
                  plata, paga la luz del pasillo y arregla lo que se rompe. Se hace de
                  buena fe y durante años funciona. El problema es que la Ciudad no lo
                  considera un arreglo informal entre vecinos.
                </p>
                <p className="mt-4 max-w-[62ch] text-[16.5px] leading-relaxed text-ink-700">
                  El artículo 2º de la{" "}
                  <a
                    href="https://www.cedom.gob.ar/legislacion/normas/leyes/RepoLeyes/ley941.html"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-medium text-terra-700 underline decoration-terra-700/30 underline-offset-4 transition-colors hover:decoration-terra-700"
                  >
                    Ley 941
                  </a>{" "}
                  dispone que la administración de consorcios{" "}
                  <strong className="font-medium text-navy-900">
                    no puede ejercerse a título oneroso ni gratuito sin la previa
                    inscripción
                  </strong>{" "}
                  en el Registro Público de Administradores. El artículo 3º define al
                  administrador voluntario como el propietario que reside en el edificio
                  y cumple la función sin percibir retribución, y el artículo 4º le fija
                  requisitos de inscripción propios: documento, copia certificada del
                  acta de asamblea que lo designa ad honorem y constancia de su unidad.
                </p>
                <p className="mt-4 max-w-[62ch] text-[16.5px] leading-relaxed text-ink-700">
                  Y las obligaciones son las mismas que las de cualquier administrador.
                  El artículo 2067 del Código Civil y Comercial le exige practicar la
                  cuenta de expensas, rendir cuenta documentada dentro de los sesenta
                  días del cierre del ejercicio, mantener asegurado el inmueble con un
                  seguro integral y llevar en legal forma los libros del consorcio. Qué
                  es exactamente un consorcio y por qué tiene CUIT y cuenta propia lo
                  explicamos en la guía sobre{" "}
                  <a
                    href="/blog/propiedad-horizontal-que-es-como-funciona"
                    className="font-medium text-terra-700 underline decoration-terra-700/30 underline-offset-4 transition-colors hover:decoration-terra-700"
                  >
                    qué es la propiedad horizontal y cómo funciona un consorcio
                  </a>
                  .
                </p>
              </div>

              <div className="lg:col-span-5 lg:flex lg:items-center">
                <div className="w-full rounded-2xl bg-cream-100 p-7 ring-1 ring-cream-300">
                  <p className="text-xs font-medium uppercase tracking-[0.18em] text-terra-700">
                    <ClipboardCheck
                      strokeWidth={1.75}
                      className="mr-1.5 inline h-3.5 w-3.5 -translate-y-px text-terra-700"
                    />
                    Lo que revisamos en un PH autoadministrado
                  </p>
                  <ul className="mt-5 space-y-3.5 text-[15.5px] leading-relaxed text-ink-800">
                    <li className="grid grid-cols-[auto_1fr] gap-3">
                      <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-terra-700" />
                      Si quien administra está inscripto en el Registro Público de
                      Administradores, aunque no cobre.
                    </li>
                    <li className="grid grid-cols-[auto_1fr] gap-3">
                      <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-terra-700" />
                      Si el consorcio tiene CUIT propio y una cuenta bancaria a su
                      nombre, o si la plata pasa por la caja de ahorro de un vecino.
                    </li>
                    <li className="grid grid-cols-[auto_1fr] gap-3">
                      <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-terra-700" />
                      Si hay un seguro integral del edificio vigente, con incendio y
                      responsabilidad civil.
                    </li>
                    <li className="grid grid-cols-[auto_1fr] gap-3">
                      <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-terra-700" />
                      Si existe un libro de actas rubricado y una liquidación mensual, o
                      solo mensajes en un grupo de WhatsApp.
                    </li>
                    <li className="grid grid-cols-[auto_1fr] gap-3">
                      <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-terra-700" />
                      Si el reglamento está inscripto y los porcentuales con que se
                      reparten los gastos son los que dice el título.
                    </li>
                  </ul>
                </div>
              </div>
            </div>
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
                  La zona
                </p>
                <h2 className="mt-3 font-display text-[2rem] leading-[1.05] tracking-[-0.02em] text-balance text-navy-900 sm:text-[2.5rem]">
                  Monte Castro, calle por calle
                </h2>
                <div className="mt-8 space-y-7">
                  {barrioFacts.map((fact) => (
                    <div key={fact.title} className="grid grid-cols-[auto_1fr] gap-4">
                      <span className="flex h-10 w-10 items-center justify-center rounded-full bg-cream-50 ring-1 ring-cream-300">
                        <fact.icon strokeWidth={1.75} className="h-4 w-4 text-terra-700" />
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
                    title="Monte Castro en Google Maps"
                    src="https://www.google.com/maps?q=Monte+Castro,+Ciudad+Aut%C3%B3noma+de+Buenos+Aires&z=14&hl=es&output=embed"
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    className="h-full w-full border-0"
                  />
                </div>
                <p className="mt-2 text-[13px] text-ink-700/70">
                  Monte Castro y la Comuna 10, con Villa Devoto y nuestra oficina del
                  otro lado de Baigorria.
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
                  El servicio
                </p>
                <h2 className="mt-3 font-display text-[2rem] leading-[1.05] tracking-[-0.02em] text-balance text-navy-900 sm:text-[2.5rem]">
                  Administración a medida del edificio, con criterio contable
                </h2>
                <p className="mt-5 max-w-[56ch] text-[16px] leading-relaxed text-ink-700">
                  Un PH de tres unidades y un edificio con encargado no pagan lo mismo
                  ni necesitan lo mismo, pero los dos merecen una liquidación clara,
                  fondos en una cuenta del consorcio y un presupuesto anual que evite
                  las expensas extraordinarias por sorpresa. Sumamos la liquidación de
                  sueldos, el seguimiento de obras y habilitaciones, la preparación de
                  las asambleas y una guardia para emergencias.
                </p>
                <p className="mt-4 max-w-[56ch] text-[16px] leading-relaxed text-ink-700">
                  Si el edificio hoy está en manos de otra administración, el paso a
                  paso está en la guía sobre{" "}
                  <a
                    href="/blog/como-cambiar-de-administrador-de-consorcio"
                    className="font-medium text-terra-700 underline decoration-terra-700/30 underline-offset-4 transition-colors hover:decoration-terra-700"
                  >
                    cómo cambiar de administrador de consorcio
                  </a>
                  . Y lo que incluye cada plan, en{" "}
                  <a
                    href="/servicios"
                    className="font-medium text-terra-700 underline decoration-terra-700/30 underline-offset-4 transition-colors hover:decoration-terra-700"
                  >
                    nuestros servicios de administración
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
                    Villa Devoto, a diez cuadras de Monte Castro · {site.address.city}
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
        title="Guías para propietarios de PH y consejos de administración"
        tone="muted"
      />

      <FaqSection
        items={monteCastroFaq}
        title="Preguntas frecuentes sobre administración en Monte Castro"
        tone="default"
      />

      {/* CTA FINAL */}
      <Section tone="navy" spacing="default">
        <Container>
          <Reveal>
            <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:items-end">
              <div className="lg:col-span-8">
                <h2 className="font-display text-[2rem] leading-[1.05] tracking-[-0.02em] text-balance text-cream-50 sm:text-[2.5rem]">
                  ¿Su edificio está en Monte Castro?
                </h2>
                <p className="mt-4 max-w-[58ch] text-[16.5px] leading-relaxed text-cream-100/85">
                  Cuéntennos si es un PH que administra un vecino, un edificio con local
                  en la planta baja o uno con encargado. Revisamos el reglamento y la
                  liquidación actual y les acercamos una propuesta a medida, sin cargo.
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
