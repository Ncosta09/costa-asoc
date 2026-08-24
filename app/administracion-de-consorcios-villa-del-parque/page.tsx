import type { Metadata } from "next";
import Image from "next/image";
import {
  BadgeCheck,
  Building2,
  CalendarClock,
  ClipboardCheck,
  Home,
  MapPin,
  MessageCircle,
  Store,
  TrainFront,
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
  title: "Administración de Consorcios en Villa del Parque",
  description:
    "Estudio contable matriculado (RPA 8192) con oficina en la Comuna 11, a minutos de Villa del Parque. Administramos consorcios nuevos y edificios de PH del barrio: expensas claras, cuentas a nombre del consorcio y asambleas bien llevadas.",
  path: "/administracion-de-consorcios-villa-del-parque",
});

// FAQ propia de la landing: ángulo obra nueva + PH, distinta de la de Devoto y de /servicios.
const parqueFaq: FaqItem[] = [
  {
    question: "¿Administran edificios nuevos en Villa del Parque?",
    answer:
      "Sí, y es una de las situaciones donde más se nota tener un contador atrás. Un edificio recién terminado arranca sin historia contable: hay que abrir la cuenta a nombre del consorcio, armar el primer presupuesto sin meses anteriores de referencia, definir el fondo de reserva y ordenar el traspaso de la documentación de la desarrolladora. Si eso se hace mal, el edificio arrastra el problema por años.",
  },
  {
    question: "Nuestro edificio es nuevo y el administrador lo puso la desarrolladora. ¿Podemos cambiarlo?",
    answer:
      "Sí, y la Ley 941 de la Ciudad le pone fecha. Su artículo 13 establece que el administrador designado en el reglamento de propiedad horizontal cesa en oportunidad de la primera asamblea si no es ratificado por ella, y que esa primera asamblea debe realizarse dentro de los noventa días de cumplidos los dos años del otorgamiento del reglamento, o del momento en que se encuentren ocupadas el cincuenta por ciento de las unidades funcionales, lo que ocurra primero. Ese es el momento en que los propietarios eligen de verdad.",
  },
  {
    question: "¿Trabajan con PH y edificios antiguos del barrio?",
    answer:
      "Sí. Buena parte de Villa del Parque son casas y chalets de mediados del siglo pasado, muchos subdivididos en PH, y edificios bajos de pocas unidades. Son consorcios chicos con necesidades muy concretas: mantenimiento planificado en lugar de reactivo, y una liquidación que se entienda sin ser contador. No los tratamos como cartera de relleno.",
  },
  {
    question: "¿Qué barrios cubren desde la oficina?",
    answer:
      "Trabajamos en toda la Comuna 11 (Villa del Parque, Villa Devoto, Villa Santa Rita y Villa General Mitre) y en los barrios vecinos como Monte Castro, Villa Pueyrredón y Villa Real, además del resto de CABA. La oficina está en Campana, del otro lado de la Avenida Francisco Beiró: son minutos hasta cualquier edificio del barrio.",
  },
  {
    question: "El edificio tiene encargado. ¿Ustedes liquidan los sueldos?",
    answer:
      "Sí, y es la razón contable más fuerte para elegir un estudio matriculado. La liquidación del personal del edificio es la tarea de mayor riesgo económico de un consorcio: un error en cargas sociales, en la aplicación del convenio o en una licencia se paga con multas e intereses que salen de las expensas de todos.",
  },
  {
    question: "¿Cuánto cuesta administrar un consorcio en Villa del Parque?",
    answer:
      "No hay arancel oficial. El artículo 14 de la Ley 941 dispone que el honorario lo acuerdan el administrador y la asamblea de propietarios, sin ninguna cámara que lo regule. Depende del edificio: cantidad de unidades, personal en relación de dependencia, instalaciones y alcance pactado. Armamos la propuesta después de ver la liquidación y la nómina, sin cargo.",
  },
];

// Los dos parques edilicios del barrio. Cada perfil de edificio pide cosas distintas.
const buildingProfiles = [
  {
    icon: Home,
    title: "PH y casas subdivididas",
    text: "El tejido histórico del barrio: chalets y petit-hôtels con jardín al frente, en buena medida de entre 1930 y 1960, muchos convertidos en PH. Consorcios de pocas unidades, sin encargado, donde la mitad de los conflictos nacen de que nunca se armó un presupuesto y se pide plata cuando algo se rompe.",
    need: "Presupuesto anual real y fondo de reserva, para dejar de financiar el edificio a golpes de expensa extraordinaria.",
  },
  {
    icon: Building2,
    title: "Obra nueva de los últimos años",
    text: "Un relevamiento del mercado inmobiliario de 2024 contaba más de cincuenta proyectos en ejecución en el barrio. La tipología que se repite es el edificio de hasta siete pisos con retiros, en lotes de medidas estándar, sobre calles como Nazca, Terrada, Helguera, Campana y Cuenca.",
    need: "Constitución ordenada del consorcio, traspaso documentado desde la desarrolladora y primera asamblea en regla.",
  },
  {
    icon: TrainFront,
    title: "Edificios medios junto a la estación",
    text: "En el entorno de la estación Villa del Parque del ferrocarril San Martín el barrio cambia de escala: ahí aparecen los edificios más altos, de diez a quince pisos. Son los consorcios con encargado en relación de dependencia, ascensores, tanques y sala de máquinas.",
    need: "Liquidación de sueldos, control de habilitaciones y calendario de mantenimiento obligatorio.",
  },
];

const barrioFacts = [
  {
    icon: MapPin,
    title: "Comuna 11, del otro lado de Beiró",
    text: "Villa del Parque queda delimitado por la Avenida Francisco Beiró, la Avenida San Martín, Arregui, Gavilán, la Avenida Álvarez Jonte, Miranda y Joaquín V. González. Integra la Comuna 11 junto a Villa Devoto, Villa Santa Rita y Villa General Mitre. Nuestra oficina está en esa misma comuna: no administramos el barrio desde el centro.",
  },
  {
    icon: Store,
    title: "Cuenca, la calle que ordena el barrio",
    text: "El eje comercial corre por Cuenca entre Beiró y Álvarez Jonte, con los locales, bares y confiterías que le dan identidad a la zona. Los edificios sobre ese corredor combinan planta baja comercial y unidades de vivienda, una mezcla que tiene consecuencias concretas en el reglamento y en el reparto de expensas.",
  },
  {
    icon: TrainFront,
    title: "La estación como centro de gravedad",
    text: "La estación Villa del Parque del ferrocarril San Martín es la que explica por qué el barrio tiene, al mismo tiempo, calles de casas bajas y las torres más altas a pocas cuadras. Dos escalas de consorcio conviviendo en el mismo barrio, a veces en la misma cuadra.",
  },
  {
    icon: Building2,
    title: "Un barrio que se está construyendo de nuevo",
    text: "El desarrollo de los últimos años reemplazó casonas por edificios de escala media. Eso significa decenas de consorcios que se constituyeron hace poco, o que están por hacerlo, y que todavía no eligieron a su administrador en una asamblea propia.",
  },
];

export default function VillaDelParquePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            breadcrumbSchema([
              { name: "Inicio", url: site.url },
              {
                name: "Administración de consorcios en Villa del Parque",
                url: `${site.url}/administracion-de-consorcios-villa-del-parque`,
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
                Villa del Parque · Comuna 11 · CABA
              </p>
              <h1 className="mt-3 font-display text-[2.5rem] leading-[1.04] tracking-[-0.025em] text-balance text-navy-900 sm:text-[3.5rem]">
                Administración de consorcios en Villa del Parque
              </h1>
              <p className="mt-6 max-w-[60ch] text-[18px] leading-relaxed text-ink-800">
                Somos un estudio contable matriculado con oficina en la misma comuna,
                en {site.address.street.split(",")[0]}, a minutos del barrio.
                Administramos consorcios de Villa del Parque desde la contabilidad:
                expensas claras, cuentas a nombre del consorcio y rendición documentada
                todos los meses.
              </p>
              <p className="mt-5 max-w-[60ch] text-[16px] leading-relaxed text-ink-700">
                Villa del Parque tiene una particularidad que condiciona todo: conviven
                dos parques edilicios muy distintos. Las casas y PH de mediados del
                siglo pasado, y la obra nueva de los últimos años. Un consorcio de seis
                unidades sin encargado y un edificio recién estrenado con amenities no
                necesitan lo mismo, y no se administran igual.
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
                    Oficina en la Comuna 11
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
                  src="/zonas/villa-del-parque-otonio.jpg"
                  alt="Calle arbolada de Villa del Parque en otoño, con la vereda cubierta de hojas y edificios bajos"
                  width={1600}
                  height={1200}
                  priority
                  className="h-[320px] w-full object-cover sm:h-[400px] lg:h-[520px]"
                  sizes="(min-width: 1024px) 40vw, 100vw"
                />
              </div>
              <figcaption className="mt-2 text-[13px] text-ink-700/70">
                Una calle de Villa del Parque en otoño. Foto: JonySniuk, CC BY-SA 4.0.
              </figcaption>
            </figure>
          </div>
        </Container>
      </Section>

      {/* LOS DOS PARQUES EDILICIOS */}
      <Section tone="muted" spacing="default">
        <Container>
          <Reveal>
            <div className="max-w-[62ch]">
              <p className="text-xs font-medium uppercase tracking-[0.18em] text-terra-700">
                El barrio por dentro
              </p>
              <h2 className="mt-3 font-display text-[2rem] leading-[1.05] tracking-[-0.02em] text-balance text-navy-900 sm:text-[2.5rem]">
                Tres tipos de consorcio en el mismo barrio
              </h2>
              <p className="mt-5 text-[16.5px] leading-relaxed text-ink-700">
                No es un detalle de color: cada uno de estos perfiles tiene un problema
                contable distinto, y una administración que los trata igual falla en
                alguno de los tres.
              </p>
            </div>
          </Reveal>
          <Reveal delay={0.08}>
            <div className="mt-12 grid grid-cols-1 gap-x-10 gap-y-10 lg:grid-cols-3">
              {buildingProfiles.map((item) => (
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

      {/* CONSORCIOS NUEVOS: LA PRIMERA ASAMBLEA */}
      <Section tone="default" spacing="default">
        <Container>
          <Reveal>
            <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-16">
              <div className="lg:col-span-7">
                <p className="text-xs font-medium uppercase tracking-[0.18em] text-terra-700">
                  <CalendarClock
                    strokeWidth={1.75}
                    className="mr-1.5 inline h-3.5 w-3.5 -translate-y-px text-terra-700"
                  />
                  Edificios recién estrenados
                </p>
                <h2 className="mt-3 font-display text-[2rem] leading-[1.05] tracking-[-0.02em] text-balance text-navy-900 sm:text-[2.5rem]">
                  Si su edificio es nuevo, la primera asamblea tiene fecha
                </h2>
                <p className="mt-6 max-w-[62ch] text-[16.5px] leading-relaxed text-ink-700">
                  Casi ningún propietario de un edificio nuevo sabe esto, y es la regla
                  más importante de sus primeros años. El administrador que figura en el
                  reglamento de propiedad horizontal no fue elegido por ustedes: lo puso
                  quien redactó el reglamento.
                </p>
                <p className="mt-4 max-w-[62ch] text-[16.5px] leading-relaxed text-ink-700">
                  El artículo 13 de la{" "}
                  <a
                    href="https://www.cedom.gob.ar/legislacion/normas/leyes/RepoLeyes/ley941.html"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-medium text-terra-700 underline decoration-terra-700/30 underline-offset-4 transition-colors hover:decoration-terra-700"
                  >
                    Ley 941
                  </a>{" "}
                  de la Ciudad establece que ese administrador{" "}
                  <strong className="font-medium text-navy-900">
                    cesa en oportunidad de la primera asamblea si no es ratificado por
                    ella
                  </strong>
                  , y fija cuándo tiene que hacerse esa asamblea: dentro de los noventa
                  días de cumplidos los dos años del otorgamiento del reglamento, o del
                  momento en que estén ocupadas el cincuenta por ciento de las unidades
                  funcionales, lo que ocurra primero.
                </p>
                <p className="mt-4 max-w-[62ch] text-[16.5px] leading-relaxed text-ink-700">
                  El mismo artículo agrega que el mandato dura un año, es renovable, y
                  que el administrador puede ser removido antes de su vencimiento por
                  asamblea con la mayoría absoluta del artículo 2060 del Código Civil y
                  Comercial. Cómo se computa esa mayoría, que no se cuenta sobre los
                  presentes sino sobre el total de propietarios, lo explicamos en la
                  guía sobre{" "}
                  <a
                    href="/blog/asamblea-de-consorcio-quorum-y-mayorias"
                    className="font-medium text-terra-700 underline decoration-terra-700/30 underline-offset-4 transition-colors hover:decoration-terra-700"
                  >
                    quórum y mayorías en la asamblea de consorcio
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
                    Lo que revisamos en un edificio nuevo
                  </p>
                  <ul className="mt-5 space-y-3.5 text-[15.5px] leading-relaxed text-ink-800">
                    <li className="grid grid-cols-[auto_1fr] gap-3">
                      <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-terra-700" />
                      Si la cuenta bancaria está a nombre del consorcio y no de un
                      tercero.
                    </li>
                    <li className="grid grid-cols-[auto_1fr] gap-3">
                      <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-terra-700" />
                      Si ya se hizo la primera asamblea, y con qué mayoría se ratificó
                      al administrador.
                    </li>
                    <li className="grid grid-cols-[auto_1fr] gap-3">
                      <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-terra-700" />
                      Qué documentación entregó la desarrolladora y qué falta (planos,
                      habilitaciones, garantías, manuales de instalaciones).
                    </li>
                    <li className="grid grid-cols-[auto_1fr] gap-3">
                      <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-terra-700" />
                      Cómo se armó el primer presupuesto y si hay fondo de reserva
                      constituido.
                    </li>
                    <li className="grid grid-cols-[auto_1fr] gap-3">
                      <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-terra-700" />
                      Si los porcentuales que se están usando para liquidar coinciden
                      con el reglamento.
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
                  El barrio, con nombre de calles
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
                    title="Villa del Parque en Google Maps"
                    src="https://www.google.com/maps?q=Villa+del+Parque,+Ciudad+Aut%C3%B3noma+de+Buenos+Aires&z=14&hl=es&output=embed"
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    className="h-full w-full border-0"
                  />
                </div>
                <p className="mt-2 text-[13px] text-ink-700/70">
                  Villa del Parque y el resto de la Comuna 11: la zona que cubrimos
                  todos los días.
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
                  Si hoy están evaluando un cambio, el procedimiento completo está en
                  nuestra guía sobre{" "}
                  <a
                    href="/blog/como-cambiar-de-administrador-de-consorcio"
                    className="font-medium text-terra-700 underline decoration-terra-700/30 underline-offset-4 transition-colors hover:decoration-terra-700"
                  >
                    cómo cambiar de administrador de consorcio
                  </a>
                  , y el detalle del servicio en{" "}
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
                    Comuna 11, {site.address.city}
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
        tone="muted"
      />

      <FaqSection
        items={parqueFaq}
        title="Preguntas frecuentes sobre administración en Villa del Parque"
        tone="default"
      />

      {/* CTA FINAL */}
      <Section tone="navy" spacing="default">
        <Container>
          <Reveal>
            <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:items-end">
              <div className="lg:col-span-8">
                <h2 className="font-display text-[2rem] leading-[1.05] tracking-[-0.02em] text-balance text-cream-50 sm:text-[2.5rem]">
                  ¿Su edificio está en Villa del Parque?
                </h2>
                <p className="mt-4 max-w-[58ch] text-[16.5px] leading-relaxed text-cream-100/85">
                  Contanos cómo es el edificio: si es obra nueva, un PH de pocas
                  unidades o un edificio con encargado. Revisamos la liquidación actual
                  y armamos la propuesta a medida, sin cargo.
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
