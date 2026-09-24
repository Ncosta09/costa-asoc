import type { Metadata } from "next";
import Image from "next/image";
import {
  BadgeCheck,
  CalendarClock,
  HardHat,
  MapPin,
  MessageCircle,
  Store,
  TrainFront,
  Trees,
  Users,
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
  title: "Administración de Consorcios en Villa Pueyrredón",
  description:
    "Consorcios en Villa Pueyrredón: estudio contable RPA 8192 sobre Campana, el límite del barrio. Certificación de fachadas y balcones presupuestada a tiempo.",
  path: "/administracion-de-consorcios-villa-pueyrredon",
});

const linkClass =
  "font-medium text-terra-700 underline decoration-terra-700/30 underline-offset-4 transition-colors hover:decoration-terra-700";

const CODIGO_EDIFICACION_URL =
  "https://www.cedom.gob.ar/legislacion/normas/codigos/edifica/index6.html";

// FAQ propia de la landing: ángulo edificio con décadas + certificación de fachadas.
// Distinta de Devoto (cercanía), Villa del Parque (obra nueva) y Monte Castro (PH autoadministrado).
const villaPueyrredonFaq: FaqItem[] = [
  {
    question: "¿Nuestro edificio tiene que certificar la fachada?",
    answer:
      "Si es un edificio de departamentos o un PH con balcones a la calle y tiene quince años o más, es muy probable que sí. Las eximiciones del artículo 5.1.2 del Código de la Edificación alcanzan a construcciones bajas o retiradas de la Línea Oficial, y siempre que no tengan salientes sobre la acera. Con la antigüedad del edificio calculamos cada cuánto le toca.",
  },
  {
    question: "¿La Ley 257 de fachadas sigue vigente?",
    answer:
      "No con ese número. Fue abrogada por el artículo 119 de la Ley 6438 de 2021, y la obligación de conservar las fachadas y acreditar la certificación técnica pasó al artículo 5.1.2 del Código de la Edificación, que es el texto que hoy hay que cumplir.",
  },
  {
    question: "Se desprendió revoque de un balcón. ¿Lo paga el dueño de esa unidad o el consorcio?",
    answer:
      "La estructura del balcón y los muros exteriores son del consorcio. El artículo 2041 del Código Civil y Comercial enumera entre las cosas necesariamente comunes las estructuras indispensables para mantener la seguridad, «incluso las de balcones», y los muros exteriores. Por eso su reparación se reparte entre todos según los porcentuales del reglamento. Lo que conviene revisar en cada caso es qué dice el reglamento del edificio sobre los elementos propios de cada unidad.",
  },
  {
    question: "¿Podemos usar el fondo de reserva para pagar la obra de fachada?",
    answer:
      "Se puede, pero no lo decide el administrador solo: para disponer del fondo de reserva ante gastos imprevistos y mayores que los ordinarios necesita autorización previa del consejo de propietarios, según el artículo 2067 del Código Civil y Comercial. Si el fondo no alcanza, la financiación de la obra pasa a la asamblea como expensa extraordinaria.",
  },
  {
    question: "¿Cómo definen el honorario para un edificio de Villa Pueyrredón?",
    answer:
      "Mirando el edificio, no una tabla. En la Ciudad no hay arancel oficial: el artículo 14 de la Ley 941 deja el honorario en manos de la asamblea, que lo acuerda con el administrador y lo deja en acta. Pesan las unidades, el encargado, las instalaciones y el estado de la fachada. Revisamos la liquidación que pagan hoy y les pasamos un número cerrado, sin cargo.",
  },
  {
    question: "Si cambiamos de administración, ¿qué pasa con los papeles de la fachada?",
    answer:
      "Se reclaman junto con todo lo demás. La asamblea puede remover al administrador sin expresar causa, según el artículo 2066 del Código Civil y Comercial, y el saliente tiene quince días hábiles para entregar libros, documentación y fondos. En ese traspaso pedimos además la última certificación de fachada y los informes técnicos anteriores: sin ellos no se sabe cuándo vence la próxima.",
  },
];

// Cercanía concreta: la oficina está sobre Campana, el límite del barrio.
const cercania = [
  {
    icon: HardHat,
    title: "El problema se ve en el edificio, no por foto",
    text: "Una filtración en el contrafrente o una baranda floja se miran en el lugar. Desde Campana podemos estar en el edificio el mismo día, antes de pedir el primer presupuesto.",
  },
  {
    icon: Users,
    title: "El consejo revisa los números en persona",
    text: "Los comprobantes del mes se revisan en la oficina o se los llevamos al edificio. Las asambleas se preparan con la liquidación impresa, para discutir con los números a la vista.",
  },
  {
    icon: CalendarClock,
    title: "Las obras se controlan mientras se hacen",
    text: "Cuando un frentista trabaja en la fachada, conviene ver el avance antes de aprobar cada pago. A pocas cuadras, ese control es rutina y no excepción.",
  },
];

// Periodicidad de la certificación técnica según antigüedad (Código de la Edificación, art. 5.1.2).
const periodicidad = [
  { antiguedad: "Desde 15 a 25 años", frecuencia: "Cada 15 años" },
  { antiguedad: "Más de 25 a 35 años", frecuencia: "Cada 12 años" },
  { antiguedad: "Más de 35 a 45 años", frecuencia: "Cada 10 años" },
  { antiguedad: "Más de 45 a 55 años", frecuencia: "Cada 9 años" },
  { antiguedad: "Más de 55 a 70 años", frecuencia: "Cada 5 años" },
  { antiguedad: "Más de 70 años", frecuencia: "Cada 4 años" },
];

const barrioFacts = [
  {
    icon: MapPin,
    title: "Comuna 12, del otro lado de Campana",
    text: "Los límites oficiales de Villa Pueyrredón son Salvador María del Carril, la Avenida de los Constituyentes, la Avenida General Paz, las vías del Mitre (ramal Suárez) y Campana. Comparte la Comuna 12 con Coghlan, Saavedra y Villa Urquiza; cruzando la General Paz está el partido de San Martín.",
  },
  {
    icon: TrainFront,
    title: "De Kilómetro 14 a estación Pueyrredón",
    text: "Las tierras de Manuel Santiago Altuve dependían de San Martín hasta febrero de 1888, cuando se incorporaron a la Ciudad con el plano de los ingenieros Blott y Silveyra. En 1907 la estación Kilómetro 14 del Ferrocarril Central Argentino pasó a llamarse Pueyrredón, por el brigadier Juan Martín de Pueyrredón; en los años veinte el nombre ya era del barrio. Lo poblaron inmigrantes italianos, alemanes y españoles.",
  },
  {
    icon: Store,
    title: "Mosconi, Artigas y los edificios con balcón",
    text: "La Avenida Mosconi es la arteria comercial principal y Artigas funciona como centro comercial; Nazca y Albarellos completan el recorrido. Sobre las avenidas aparecen los edificios de departamentos con balcones a la calle; en las calles internas mandan las casas bajas y los PH.",
  },
  {
    icon: Trees,
    title: "Plazas, clubes y el 20 de agosto",
    text: "La Plaza Leandro N. Alem es la histórica del barrio; la Martín Rodríguez, la otra referencia. Suman el Club Cultural y Deportivo 17 de Agosto y la Asociación Vecinal Pueyrredón, en un barrio de poco más de tres kilómetros cuadrados y alrededor de cuarenta mil habitantes que celebra su día el 20 de agosto.",
  },
];

export default function VillaPueyrredonPage() {
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
                  name: "Administración de consorcios en Villa Pueyrredón",
                  url: `${site.url}/administracion-de-consorcios-villa-pueyrredon`,
                },
              ]),
              barrioServiceSchema("Villa Pueyrredón", "/administracion-de-consorcios-villa-pueyrredon"),
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
                Villa Pueyrredón · Comuna 12 · CABA
              </p>
              <h1 className="mt-3 font-display text-[2.5rem] leading-[1.04] tracking-[-0.025em] text-balance text-navy-900 sm:text-[3.5rem]">
                Administración de consorcios en Villa Pueyrredón
              </h1>
              <p className="mt-6 max-w-[60ch] text-[18px] leading-relaxed text-ink-800">
                Somos un estudio contable matriculado con oficina en{" "}
                {site.address.street.split(",")[0]}, la calle que separa Villa Devoto
                de Villa Pueyrredón. Para el barrio somos la administración de la
                vereda de enfrente: expensas explicadas renglón por renglón y fondos en
                una cuenta del consorcio.
              </p>
              <p className="mt-5 max-w-[60ch] text-[16px] leading-relaxed text-ink-700">
                Muchos edificios del barrio ya pasaron los cuarenta o cincuenta años,
                y en la Ciudad esa antigüedad trae una obligación que pocos consorcios
                tienen agendada: la certificación técnica de fachadas y balcones.
                Nuestro trabajo es que llegue presupuestada, no como una expensa
                extraordinaria de un mes para el otro.
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
                    <MapPin aria-hidden="true" strokeWidth={1.75} className="h-3.5 w-3.5 text-terra-700" />
                    Sobre Campana, el límite del barrio
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
                  src="/zonas/avenida-albarellos-villa-pueyrredon.jpg"
                  alt="Avenida Albarellos en Villa Pueyrredón, arbolada, con casas bajas, PH y un edificio de departamentos de media altura"
                  width={1600}
                  height={1200}
                  priority
                  className="h-[320px] w-full object-cover sm:h-[400px] lg:h-[520px]"
                  sizes="(min-width: 1024px) 40vw, 100vw"
                />
              </div>
              <figcaption className="mt-2 text-[13px] text-ink-700/70">
                Avenida Albarellos, en Villa Pueyrredón. Foto:{" "}
                <a href="https://commons.wikimedia.org/wiki/File:Avenida_Albarellos_(8585026274).jpg" target="_blank" rel="noopener noreferrer" className="underline decoration-ink-700/30 underline-offset-2 hover:decoration-ink-700">Cornelius Kibelka</a>,{" "}
                <a href="https://creativecommons.org/licenses/by-sa/2.0/deed.es" target="_blank" rel="noopener noreferrer" className="underline decoration-ink-700/30 underline-offset-2 hover:decoration-ink-700">CC BY-SA 2.0</a>.
              </figcaption>
            </figure>
          </div>
        </Container>
      </Section>

      {/* LA VEREDA DE ENFRENTE */}
      <Section tone="muted" spacing="default">
        <Container>
          <Reveal>
            <div className="max-w-[62ch]">
              <p className="text-xs font-medium uppercase tracking-[0.18em] text-terra-700">
                La vereda de enfrente
              </p>
              <h2 className="mt-3 font-display text-[2rem] leading-[1.05] tracking-[-0.02em] text-balance text-navy-900 sm:text-[2.5rem]">
                Campana de un lado, su edificio del otro
              </h2>
              <p className="mt-5 text-[16.5px] leading-relaxed text-ink-700">
                Villa Pueyrredón termina en Campana y del otro lado empieza Villa
                Devoto. En esa misma calle, en el sexto piso del 4710, está la oficina.
                Ahí se arma, mes a mes, la liquidación de cada consorcio que
                administramos.
              </p>
            </div>
          </Reveal>
          <Reveal delay={0.08}>
            <div className="mt-12 grid grid-cols-1 gap-x-10 gap-y-10 lg:grid-cols-3">
              {cercania.map((item) => (
                <div key={item.title} className="flex flex-col">
                  <span className="flex h-11 w-11 items-center justify-center rounded-full bg-cream-100 ring-1 ring-cream-300">
                    <item.icon aria-hidden="true" strokeWidth={1.75} className="h-5 w-5 text-terra-700" />
                  </span>
                  <h3 className="mt-5 font-display text-[1.25rem] leading-snug text-navy-900">
                    {item.title}
                  </h3>
                  <p className="mt-3 text-[15.5px] leading-relaxed text-ink-700">
                    {item.text}
                  </p>
                </div>
              ))}
            </div>
          </Reveal>
        </Container>
      </Section>

      {/* FACHADAS Y BALCONES */}
      <Section tone="default" spacing="default">
        <Container>
          <Reveal>
            <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-16">
              <div className="lg:col-span-7">
                <p className="text-xs font-medium uppercase tracking-[0.18em] text-terra-700">
                  Fachadas y balcones
                </p>
                <h2 className="mt-3 font-display text-[2rem] leading-[1.05] tracking-[-0.02em] text-balance text-navy-900 sm:text-[2.5rem]">
                  El edificio que ya cumplió cuarenta años tiene una certificación en
                  el calendario
                </h2>
                <p className="mt-6 max-w-[62ch] text-[16.5px] leading-relaxed text-ink-700">
                  Casi todos siguen hablando de la «ley de fachadas». La Ley 257 de
                  1999, modificada por la Ley 6116 en 2019, fue abrogada por el
                  artículo 119 de la Ley 6438 de 2021, y hoy la obligación está en el
                  artículo 5.1.2 del{" "}
                  <a
                    href={CODIGO_EDIFICACION_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={linkClass}
                  >
                    Código de la Edificación de la Ciudad
                  </a>
                  , bajo el título «Conservación de Fachadas».
                </p>
                <p className="mt-4 max-w-[62ch] text-[16.5px] leading-relaxed text-ink-700">
                  Para el Código, fachada no es solo el frente: es todo lo lindante con
                  la Línea Oficial, incluidos el frente, el contrafrente y los laterales
                  lindantes al espacio público. El propietario tiene que conservarla en
                  perfecto estado en lo relativo a uso, seguridad, higiene y estética.
                  La lista no es taxativa, pero abarca balcones, terrazas y azoteas;
                  barandas y balaustres; cornisas, ménsulas y ornamentos en voladizo;
                  marquesinas y toldos; antepechos; carteles y maceteros; revoques y
                  revestimientos; cerramientos y vidrios; conductos e instalaciones, y
                  soportes de antenas.
                </p>
                <p className="mt-4 max-w-[62ch] text-[16.5px] leading-relaxed text-ink-700">
                  Sobre esos elementos, los propietarios deben acreditar{" "}
                  <strong className="font-medium text-navy-900">
                    una única e improrrogable certificación técnica
                  </strong>
                  , que además verifica fijaciones, niveles, escuadra y estado de
                  cargas. La firma un profesional con alcances de título y matrícula
                  (el trámite oficial del Gobierno de la Ciudad menciona a matriculados
                  del CPAU, el CPIC o el CPII), que hace un informe del estado de la
                  fachada y certifica que el edificio está sin riesgo para la seguridad.
                </p>
                <p className="mt-4 max-w-[62ch] text-[16.5px] leading-relaxed text-ink-700">
                  El trámite se inicia en el portal de la{" "}
                  <a
                    href="https://instalaciones.agcontrol.gob.ar/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className={linkClass}
                  >
                    Agencia Gubernamental de Control
                  </a>
                  : el propietario o el administrador designa al profesional y el
                  certificado sale con código QR. El trámite es gratuito; el honorario
                  del profesional y las obras que surjan del informe, no. Además, estas
                  obligaciones no excluyen las penalidades por faltas contra la
                  seguridad, el bienestar y la estética urbana. Lo desarrollamos en la guía sobre{" "}
                  <a href="/blog/ley-257-caba-fachadas-y-balcones" className={linkClass}>
                    conservación de fachadas y balcones en CABA
                  </a>
                  .
                </p>
              </div>

              <div className="space-y-6 lg:col-span-5">
                <div className="w-full rounded-2xl bg-cream-100 p-7 ring-1 ring-cream-300">
                  <div className="overflow-x-auto">
                    <table className="w-full border-collapse text-left text-[15px]">
                      <caption className="mb-4 text-left text-xs font-medium uppercase tracking-[0.18em] text-terra-700">
                        Cada cuánto se certifica, según la antigüedad
                      </caption>
                      <thead className="border-b border-cream-300">
                        <tr>
                          <th scope="col" className="py-2.5 pr-3 font-display text-[14px] font-semibold tracking-tight text-navy-900">
                            Antigüedad del edificio
                          </th>
                          <th scope="col" className="py-2.5 pl-3 font-display text-[14px] font-semibold tracking-tight text-navy-900">
                            Certificación
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {periodicidad.map((row) => (
                          <tr key={row.antiguedad}>
                            <th scope="row" className="border-b border-cream-200 py-2.5 pr-3 align-top font-normal leading-relaxed text-ink-800">
                              {row.antiguedad}
                            </th>
                            <td className="border-b border-cream-200 py-2.5 pl-3 align-top font-medium leading-relaxed text-navy-900">
                              {row.frecuencia}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                  <p className="mt-4 text-[13px] leading-relaxed text-ink-700/80">
                    Fuente: artículo 5.1.2 del Código de la Edificación de la Ciudad.
                  </p>
                </div>

                <div className="w-full rounded-2xl border border-cream-300 p-7">
                  <p className="text-xs font-medium uppercase tracking-[0.18em] text-terra-700">
                    Quién queda afuera
                  </p>
                  <p className="mt-3 text-[15.5px] leading-relaxed text-ink-800">
                    Están eximidos los inmuebles de planta baja que no superan 4,00 m de
                    altura en su fachada al frente, y los destinados sólo a vivienda de
                    más de 4,00 m y hasta 9,00 m retirados como mínimo 3,00 m de la
                    Línea Oficial; en los dos casos, salvo que tengan salientes sobre la
                    acera.
                  </p>
                  <p className="mt-3 text-[15.5px] leading-relaxed text-ink-800">
                    En Villa Pueyrredón se traduce así: la casa baja queda afuera; el PH
                    con balcón a la calle y el edificio de departamentos, adentro.
                  </p>
                </div>
              </div>
            </div>
          </Reveal>
        </Container>
      </Section>

      {/* DE LA CERTIFICACIÓN A LA EXPENSA */}
      <Section tone="muted" spacing="default">
        <Container>
          <Reveal>
            <div className="max-w-[62ch]">
              <p className="text-xs font-medium uppercase tracking-[0.18em] text-terra-700">
                De la certificación a la expensa
              </p>
              <h2 className="mt-3 font-display text-[2rem] leading-[1.05] tracking-[-0.02em] text-balance text-navy-900 sm:text-[2.5rem]">
                Quién hace qué cuando la fachada necesita atención
              </h2>
              <p className="mt-5 text-[16.5px] leading-relaxed text-ink-700">
                El Código Civil y Comercial y la Ley 941 reparten los papeles con
                bastante claridad. Ordenarlos antes del informe evita la discusión más cara: la
                que empieza cuando la obra ya es urgente.
              </p>
            </div>
          </Reveal>
          <Reveal delay={0.08}>
            <ol className="mt-12 grid grid-cols-1 gap-x-10 gap-y-10 md:grid-cols-2">
              <li className="grid grid-cols-[auto_1fr] gap-4">
                <span aria-hidden="true" className="flex h-10 w-10 items-center justify-center rounded-full bg-cream-50 font-display text-[1.05rem] text-terra-700 ring-1 ring-cream-300">
                  1
                </span>
                <div>
                  <h3 className="font-display text-[1.2rem] leading-snug text-navy-900">
                    La fachada es de todos
                  </h3>
                  <p className="mt-2 text-[15.5px] leading-relaxed text-ink-700">
                    El artículo 2041 del Código incluye entre las cosas necesariamente
                    comunes «los cimientos, columnas, vigas portantes, muros maestros y
                    demás estructuras, incluso las de balcones, indispensables para
                    mantener la seguridad» y «los muros exteriores». Su conservación
                    se paga entre todos. Más sobre partes comunes, en la guía de{" "}
                    <a href="/blog/propiedad-horizontal-que-es-como-funciona" className={linkClass}>
                      propiedad horizontal
                    </a>
                    .
                  </p>
                </div>
              </li>
              <li className="grid grid-cols-[auto_1fr] gap-4">
                <span aria-hidden="true" className="flex h-10 w-10 items-center justify-center rounded-full bg-cream-50 font-display text-[1.05rem] text-terra-700 ring-1 ring-cream-300">
                  2
                </span>
                <div>
                  <h3 className="font-display text-[1.2rem] leading-snug text-navy-900">
                    La gestión es del administrador
                  </h3>
                  <p className="mt-2 text-[15.5px] leading-relaxed text-ink-700">
                    El artículo 2067 le pide al administrador dar «cumplimiento a todas
                    las normas de seguridad y verificaciones impuestas por las
                    reglamentaciones locales», y el artículo 9º de la{" "}
                    <a
                      href="https://www.cedom.gob.ar/legislacion/normas/leyes/RepoLeyes/ley941.html"
                      target="_blank"
                      rel="noopener noreferrer"
                      className={linkClass}
                    >
                      Ley 941
                    </a>{" "}
                    lo obliga a realizar las diligencias para cumplir la normativa
                    vigente resguardando el mantenimiento edilicio. No es tarea del
                    consejo ni de cada vecino.
                  </p>
                </div>
              </li>
              <li className="grid grid-cols-[auto_1fr] gap-4">
                <span aria-hidden="true" className="flex h-10 w-10 items-center justify-center rounded-full bg-cream-50 font-display text-[1.05rem] text-terra-700 ring-1 ring-cream-300">
                  3
                </span>
                <div>
                  <h3 className="font-display text-[1.2rem] leading-snug text-navy-900">
                    El informe entra en el presupuesto
                  </h3>
                  <p className="mt-2 text-[15.5px] leading-relaxed text-ink-700">
                    El artículo 2048 considera ordinarias las expensas de reparación de
                    partes comunes necesarias para mantener la seguridad, la comodidad y
                    el decoro. El informe técnico es un gasto de conservación previsible:
                    lo cargamos en el presupuesto anual. Más en la nota sobre{" "}
                    <a href="/blog/expensas-ordinarias-y-extraordinarias-diferencias" className={linkClass}>
                      expensas ordinarias y extraordinarias
                    </a>
                    .
                  </p>
                </div>
              </li>
              <li className="grid grid-cols-[auto_1fr] gap-4">
                <span aria-hidden="true" className="flex h-10 w-10 items-center justify-center rounded-full bg-cream-50 font-display text-[1.05rem] text-terra-700 ring-1 ring-cream-300">
                  4
                </span>
                <div>
                  <h3 className="font-display text-[1.2rem] leading-snug text-navy-900">
                    La obra grande se decide en conjunto
                  </h3>
                  <p className="mt-2 text-[15.5px] leading-relaxed text-ink-700">
                    Si el informe marca reparaciones importantes y hay que financiarlas
                    por fuera del presupuesto, la asamblea resuelve la expensa
                    extraordinaria. Para tocar el fondo de reserva, el administrador
                    necesita autorización previa del consejo de propietarios, que
                    controla los aspectos económicos del consorcio. Más en la guía sobre{" "}
                    <a href="/blog/funciones-del-consejo-de-propietarios" className={linkClass}>
                      las funciones del consejo de propietarios
                    </a>
                    .
                  </p>
                </div>
              </li>
            </ol>
          </Reveal>
        </Container>
      </Section>

      {/* EL BARRIO + MAPA */}
      <Section tone="default" spacing="default">
        <Container>
          <Reveal>
            <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-16">
              <div className="lg:col-span-6">
                <p className="text-xs font-medium uppercase tracking-[0.18em] text-terra-700">
                  El barrio
                </p>
                <h2 className="mt-3 font-display text-[2rem] leading-[1.05] tracking-[-0.02em] text-balance text-navy-900 sm:text-[2.5rem]">
                  Entre la General Paz y las vías del Mitre
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
                    title="Villa Pueyrredón en Google Maps"
                    src="https://www.google.com/maps?q=Villa+Pueyrred%C3%B3n,+Ciudad+Aut%C3%B3noma+de+Buenos+Aires&z=14&hl=es&output=embed"
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    className="h-full w-full border-0"
                  />
                </div>
                <p className="mt-2 text-[13px] text-ink-700/70">
                  Villa Pueyrredón y la Comuna 12. La oficina queda sobre Campana, en el
                  borde del barrio que da a Villa Devoto.
                </p>
              </div>
            </div>
          </Reveal>
        </Container>
      </Section>

      {/* EL SERVICIO + OFICINA */}
      <Section tone="muted" spacing="default">
        <Container>
          <Reveal>
            <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-16">
              <div className="lg:col-span-7">
                <p className="text-xs font-medium uppercase tracking-[0.18em] text-terra-700">
                  El servicio
                </p>
                <h2 className="mt-3 font-display text-[2rem] leading-[1.05] tracking-[-0.02em] text-balance text-navy-900 sm:text-[2.5rem]">
                  Un contador a cargo de los números del edificio
                </h2>
                <p className="mt-5 max-w-[56ch] text-[16px] leading-relaxed text-ink-700">
                  Cada mes liquidamos las expensas con el detalle de cada gasto y su
                  comprobante, pagamos a los proveedores desde la cuenta del consorcio
                  y, al cierre del ejercicio, rendimos cuentas por escrito. Liquidamos
                  sueldos bajo convenio y llevamos la agenda de mantenimientos.
                </p>
                <p className="mt-4 max-w-[56ch] text-[16px] leading-relaxed text-ink-700">
                  A los edificios con varias décadas les sumamos un calendario de
                  fachada: averiguamos cuándo se certificó por última vez, cuándo
                  corresponde la próxima según la antigüedad y cuánto conviene separar
                  cada mes para que el informe y las reparaciones no caigan de golpe.
                  El alcance de cada plan está en{" "}
                  <a href="/servicios" className={linkClass}>
                    nuestros servicios de administración
                  </a>
                  , y para conversar el caso de su edificio pueden{" "}
                  <a href="/contacto" className={linkClass}>
                    escribirnos desde contacto
                  </a>
                  .
                </p>
              </div>
              <div className="lg:col-span-5 lg:flex lg:items-center">
                <div className="w-full rounded-2xl bg-cream-50 p-7 ring-1 ring-cream-300">
                  <p className="text-xs font-medium uppercase tracking-[0.18em] text-terra-700">
                    La oficina
                  </p>
                  <p className="mt-3 font-display text-[1.3rem] leading-snug text-navy-900">
                    {site.address.street}
                  </p>
                  <p className="mt-1 text-[15px] text-ink-700">
                    Villa Devoto, sobre el límite con Villa Pueyrredón · {site.address.city}
                  </p>
                  <p className="mt-4 text-[15px] leading-relaxed text-ink-700">
                    {site.hours.label} · {site.contact.phone}
                  </p>
                  <div className="mt-6">
                    <Button href="/contacto" variant="secondary" size="default">
                      Cómo llegar y contacto
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </Reveal>
        </Container>
      </Section>

      <RelatedPosts
        eyebrow="Para leer antes de la asamblea"
        title="Guías sobre partes comunes, expensas y obligaciones del consorcio"
        tags={["obligaciones CABA", "normativa", "propiedad horizontal", "expensas"]}
        tone="default"
      />

      <FaqSection
        items={villaPueyrredonFaq}
        title="Preguntas frecuentes sobre administración en Villa Pueyrredón"
        tone="muted"
      />

      {/* CTA FINAL */}
      <Section tone="navy" spacing="default">
        <Container>
          <Reveal>
            <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:items-end">
              <div className="lg:col-span-8">
                <h2 className="font-display text-[2rem] leading-[1.05] tracking-[-0.02em] text-balance text-cream-50 sm:text-[2.5rem]">
                  ¿Su edificio está del otro lado de Campana?
                </h2>
                <p className="mt-4 max-w-[58ch] text-[16.5px] leading-relaxed text-cream-100/85">
                  Mándennos la última liquidación de expensas y, si la tienen, la fecha
                  de la última certificación de fachada. Les decimos qué vence y cuándo,
                  y les acercamos una propuesta de administración sin cargo.
                </p>
              </div>
              <div className="lg:col-span-4 lg:flex lg:justify-end">
                <Button href="/contacto" variant="primary" size="lg">
                  Pedir propuesta
                </Button>
              </div>
            </div>
          </Reveal>
        </Container>
      </Section>
    </>
  );
}
