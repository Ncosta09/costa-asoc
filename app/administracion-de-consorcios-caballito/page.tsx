import type { Metadata } from "next";
import Image from "next/image";
import {
  BadgeCheck,
  Building2,
  Check,
  Landmark,
  MapPin,
  MessageCircle,
  Store,
  TrainFront,
  Trees,
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
  title: "Administración de Consorcios en Caballito",
  description:
    "Edificios con encargado en Caballito: estudio contable RPA 8192 que liquida la nómina bajo convenio y la muestra completa en una liquidación de expensas clara.",
  path: "/administracion-de-consorcios-caballito",
});

const linkClass =
  "font-medium text-terra-700 underline decoration-terra-700/30 underline-offset-4 transition-colors hover:decoration-terra-700";

const LEY_941_URL =
  "https://www.cedom.gob.ar/legislacion/normas/leyes/RepoLeyes/ley941.html";
const CCYC_URL =
  "https://servicios.infoleg.gob.ar/infolegInternet/anexos/235000-239999/235975/texact.htm";

// FAQ propia de la landing: ángulo edificio grande con encargado y nómina en la liquidación.
// Distinta de Devoto (cercanía), Villa del Parque (obra nueva), Monte Castro (PH autoadministrado)
// y Villa Pueyrredón (fachadas).
const caballitoFaq: FaqItem[] = [
  {
    question: "¿La liquidación de expensas tiene que mostrar el sueldo del encargado?",
    answer:
      "Sí. El artículo 10 de la Ley 941 obliga a incluir la nómina del personal con la categoría del edificio, el CUIL de cada trabajador, el sueldo básico, las horas extras detalladas, los descuentos y los aportes. No es una cortesía del administrador: es parte del contenido mínimo de cada liquidación que reciben los propietarios.",
  },
  {
    question: "¿Quién decide si se toma o se despide a un encargado?",
    answer:
      "La ejecución es del administrador, pero no la decisión aislada. El inciso f) del artículo 2067 del Código Civil y Comercial le encomienda nombrar y despedir al personal del consorcio «con acuerdo de la asamblea convocada al efecto». Por eso, antes de cualquier cambio en el personal, el tema tiene que pasar por una asamblea con ese punto en el temario.",
  },
  {
    question: "La vivienda del encargado, ¿es de algún propietario?",
    answer:
      "No. El artículo 2041 del Código Civil y Comercial la enumera entre las cosas necesariamente comunes, junto con los ascensores y los locales de los servicios centrales. Su mantenimiento entra en las expensas de todos. Si el edificio se plantea darle otro destino, es una cuestión que hay que mirar con el reglamento en la mano y, en su caso, con un abogado.",
  },
  {
    question: "Si cambiamos de administración, ¿cómo sabemos que los aportes del personal están pagos?",
    answer:
      "Se exige como parte de la entrega. El artículo 9º de la Ley 941 obliga al administrador saliente a poner a disposición, en quince días hábiles, los libros y la documentación, «incluyendo la acreditación del pago de los aportes y contribuciones del encargado y/o dependiente», y le prohíbe retenerlos. En cada traspaso que recibimos revisamos esos comprobantes antes de la primera liquidación nuestra.",
  },
  {
    question: "¿El consejo de propietarios puede pedir los recibos de sueldo y los comprobantes de cargas?",
    answer:
      "Puede y conviene que lo haga. El artículo 2064 del Código Civil y Comercial le asigna al consejo el control de los aspectos económicos y financieros del consorcio, y el artículo 9º de la Ley 941 obliga al administrador a garantizar el libre acceso de los consorcistas a la documentación. El consejo controla; la gestión sigue siendo del administrador.",
  },
  {
    question: "¿El honorario se calcula por cantidad de unidades?",
    answer:
      "No hay una fórmula oficial. Según el artículo 14 de la Ley 941, los honorarios se acuerdan entre el administrador y la asamblea, «sin ninguna otra entidad o cámara que los regule». En un edificio grande lo que más pesa es el trabajo real: cuántas personas hay en la nómina, qué instalaciones tiene y qué alcance se pacta. Lo proponemos por escrito y lo decide la asamblea.",
  },
];

// Lo que suma un edificio grande: partes comunes que el Código enumera (art. 2041).
const escala = [
  {
    dato: "Encargado y suplentes",
    text: "Personal en relación de dependencia, muchas veces con vivienda en el edificio. El artículo 2041 del Código Civil y Comercial cuenta esa vivienda entre las cosas necesariamente comunes.",
  },
  {
    dato: "Ascensores",
    text: "El mismo artículo incluye «los ascensores, montacargas y escaleras mecánicas». En una torre de varios pisos son el servicio que más se usa y el que no puede parar.",
  },
  {
    dato: "Servicios centrales",
    text: "Bombas, tanques y, donde las hay, instalaciones centrales de agua o calefacción: «los locales e instalaciones de los servicios centrales» también son de todos, y su mantenimiento se reparte según el reglamento.",
  },
];

// Lo que el artículo 10 de la Ley 941 exige mostrar sobre el personal.
const nomina = [
  { dato: "Clave SUTERH del consorcio", sirve: "Figura junto al CUIT entre los datos del consorcio que la liquidación tiene que informar." },
  { dato: "Categoría del edificio", sirve: "Encuadra al consorcio dentro del convenio colectivo del personal de edificios." },
  { dato: "CUIL de cada trabajador", sirve: "Permite saber quién cobra y cruzarlo con los aportes depositados." },
  { dato: "Sueldo básico", sirve: "Es la base sobre la que se calcula el resto de la nómina." },
  { dato: "Horas extras detalladas", sirve: "Deja ver cuántas se pagaron y no solo un monto global." },
  { dato: "Descuentos", sirve: "Muestra lo que se retuvo al trabajador en el mes." },
  { dato: "Aportes", sirve: "Son lo que después tiene que aparecer depositado." },
];

const quienDecide = [
  {
    tema: "Tomar o despedir personal",
    regla: "El administrador, con acuerdo de la asamblea convocada al efecto (Código Civil y Comercial, art. 2067, inc. f).",
  },
  {
    tema: "Obligaciones laborales, previsionales y tributarias",
    regla: "Las cumple el administrador en nombre del consorcio (art. 2067, inc. g).",
  },
  {
    tema: "Seguro del personal",
    regla: "El administrador tiene que asegurar al personal dependiente del consorcio (Ley 941, art. 9º).",
  },
  {
    tema: "Vivienda del encargado",
    regla: "Es cosa necesariamente común; no pertenece a ninguna unidad (art. 2041, inc. g).",
  },
];

const revisionMensual = [
  "Que la nómina traiga los datos del artículo 10 completos, trabajador por trabajador.",
  "Que las horas extras del mes tengan una explicación: un franco cubierto, una mudanza, una emergencia.",
  "Que el seguro del personal figure con compañía, número de póliza y vencimiento.",
  "Que los pagos a proveedores indiquen CUIT, matrícula, trabajo realizado, importe y cuotas.",
  "Que las expensas ordinarias y las extraordinarias aparezcan en forma separada y diferenciada.",
  "Que el dinero esté en una cuenta bancaria a nombre del consorcio y no del administrador.",
];

const barrioFacts = [
  {
    icon: MapPin,
    title: "Un barrio que es una comuna entera",
    text: "Caballito es el único barrio de la Comuna 6. Lo encierran Río de Janeiro, la Avenida Rivadavia, la Avenida La Plata, la Avenida Directorio, Curapaligüe, la Avenida Donato Álvarez, la Avenida Juan B. Justo, la Avenida San Martín, la Avenida Gaona y la Avenida Ángel Gallardo. Dentro de ese perímetro está el centro geográfico de la Ciudad.",
  },
  {
    icon: Store,
    title: "La pulpería de la veleta",
    text: "En 1821 Nicolás Vila abrió una pulpería en la esquina de las actuales Rivadavia y Emilio Mitre, conocida por su veleta con forma de caballito. Cuando el ferrocarril cruzó la zona, desde 1857, la estación tomó ese nombre. Hoy hay una réplica de la veleta en Plaza Primera Junta, y el barrio celebra su día el 15 de febrero.",
  },
  {
    icon: TrainFront,
    title: "De las quintas al subte",
    text: "Sobre Rivadavia hubo quintas; de la de Ambrosio Plácido Lezica nació en 1928 el Parque Rivadavia. El tranvía primero y el subterráneo después, que llegó a Primera Junta en 1914, empujaron el crecimiento. Hoy lo cruzan la línea Sarmiento, cinco estaciones del subte A y dos del E.",
  },
  {
    icon: Trees,
    title: "Parques, clubes y el Barrio Inglés",
    text: "Primera Junta, Parque Rivadavia, Parque Centenario, Cid Campeador y el Barrio Inglés, con casas de fines del siglo XIX y principios del XX, son sus zonas reconocibles. Acoyte, Díaz Vélez, Pedro Goyena y José María Moreno completan los ejes. Ferro Carril Oeste, fundado en 1904, el Hospital Durand y la Facultad de Filosofía y Letras son parte del paisaje.",
  },
];

function SectionHeading({ eyebrow, title }: { eyebrow: string; title: string }) {
  return (
    <>
      <p className="text-xs font-medium uppercase tracking-[0.18em] text-terra-700">{eyebrow}</p>
      <h2 className="mt-3 font-display text-[2rem] leading-[1.05] tracking-[-0.02em] text-balance text-navy-900 sm:text-[2.5rem]">
        {title}
      </h2>
    </>
  );
}

export default function CaballitoPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            breadcrumbSchema([
              { name: "Inicio", url: site.url },
              {
                name: "Administración de consorcios en Caballito",
                url: `${site.url}/administracion-de-consorcios-caballito`,
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
                Caballito · Comuna 6 · CABA
              </p>
              <h1 className="mt-3 font-display text-[2.5rem] leading-[1.04] tracking-[-0.025em] text-balance text-navy-900 sm:text-[3.5rem]">
                Administración de consorcios en Caballito
              </h1>
              <p className="mt-6 max-w-[60ch] text-[18px] leading-relaxed text-ink-800">
                Los edificios de Caballito suelen tener muchas unidades, encargado,
                ascensores y servicios centrales. En esa escala, lo que más pesa en la
                expensa casi siempre es el personal. Somos un estudio contable
                matriculado y esa parte la liquidamos nosotros, todos los meses.
              </p>
              <p className="mt-5 max-w-[60ch] text-[16px] leading-relaxed text-ink-700">
                Sueldos bajo el convenio colectivo del personal de edificios, cargas
                sociales liquidadas y depositadas y una nómina que aparece completa en la
                liquidación, como pide la Ley 941. Ustedes la leen, la controlan y, si
                algo no cierra, preguntan con el papel adelante.
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
                    <Building2 aria-hidden="true" strokeWidth={1.75} className="h-3.5 w-3.5 text-terra-700" />
                    Liquidación de sueldos bajo convenio
                  </span>
                </li>
              </ul>

              <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:items-center">
                <Button href="/contacto" variant="primary" size="lg">
                  Pedir una propuesta para el edificio
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
                  src="/zonas/avenida-rivadavia-emilio-mitre-caballito.jpg"
                  alt="Avenida Rivadavia con edificios de departamentos en altura en la esquina de Emilio Mitre"
                  width={1600}
                  height={1200}
                  priority
                  className="h-[320px] w-full object-cover sm:h-[400px] lg:h-[520px]"
                  sizes="(min-width: 1024px) 40vw, 100vw"
                />
              </div>
              <figcaption className="mt-2 text-[13px] text-ink-700/70">
                Avenida Rivadavia y Emilio Mitre, la esquina de la pulpería que dio nombre
                al barrio. Foto:{" "}
                <a href="https://commons.wikimedia.org/wiki/File:Avenida_Rivadavia_esquina_Emilio_Mitre.jpg" target="_blank" rel="noopener noreferrer" className="underline decoration-ink-700/30 underline-offset-2 hover:decoration-ink-700">Dario Alpern</a>,{" "}
                <a href="https://creativecommons.org/licenses/by-sa/3.0/deed.es" target="_blank" rel="noopener noreferrer" className="underline decoration-ink-700/30 underline-offset-2 hover:decoration-ink-700">CC BY-SA 3.0</a>.
              </figcaption>
            </figure>
          </div>
        </Container>
      </Section>

      {/* LA ESCALA DE CABALLITO */}
      <Section tone="muted" spacing="default">
        <Container>
          <Reveal>
            <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-16">
              <div className="lg:col-span-6">
                <SectionHeading
                  eyebrow="La escala de Caballito"
                  title="Unos doscientos mil vecinos en menos de siete kilómetros cuadrados"
                />
                <p className="mt-5 max-w-[60ch] text-[16.5px] leading-relaxed text-ink-700">
                  La Avenida Rivadavia y el subte A ordenaron el barrio: donde llegó el
                  transporte, subieron los edificios de departamentos. Por eso el
                  consorcio que más se repite en Caballito no es el PH de pocas familias,
                  sino el edificio de varios pisos donde conviven decenas de unidades y
                  un equipo de personal.
                </p>
              </div>
              <dl className="grid grid-cols-2 gap-x-8 gap-y-8 self-center lg:col-span-6">
                <div className="border-l-2 border-terra-700/40 pl-4">
                  <dt className="text-[13px] font-medium uppercase tracking-[0.14em] text-ink-700">
                    Superficie
                  </dt>
                  <dd className="mt-1 font-display text-[1.75rem] leading-tight text-navy-900">6,8 km²</dd>
                </div>
                <div className="border-l-2 border-terra-700/40 pl-4">
                  <dt className="text-[13px] font-medium uppercase tracking-[0.14em] text-ink-700">
                    Habitantes
                  </dt>
                  <dd className="mt-1 font-display text-[1.75rem] leading-tight text-navy-900">
                    Unos 200.000
                  </dd>
                </div>
                <div className="border-l-2 border-terra-700/40 pl-4">
                  <dt className="text-[13px] font-medium uppercase tracking-[0.14em] text-ink-700">
                    Comuna
                  </dt>
                  <dd className="mt-1 font-display text-[1.75rem] leading-tight text-navy-900">
                    La 6, completa
                  </dd>
                </div>
                <div className="border-l-2 border-terra-700/40 pl-4">
                  <dt className="text-[13px] font-medium uppercase tracking-[0.14em] text-ink-700">
                    Subte
                  </dt>
                  <dd className="mt-1 font-display text-[1.75rem] leading-tight text-navy-900">
                    7 estaciones
                  </dd>
                </div>
              </dl>
            </div>
          </Reveal>

          <Reveal delay={0.08}>
            <div className="mt-14 border-t border-cream-300 pt-10">
              <p className="max-w-[62ch] text-[15.5px] leading-relaxed text-ink-800">
                Lo que agrega la altura, según las partes comunes que enumera el Código
                Civil y Comercial:
              </p>
              <ul className="mt-8 grid grid-cols-1 gap-x-10 gap-y-8 md:grid-cols-3">
                {escala.map((item) => (
                  <li key={item.dato}>
                    <h3 className="font-display text-[1.2rem] leading-snug text-navy-900">
                      {item.dato}
                    </h3>
                    <p className="mt-2 text-[15.5px] leading-relaxed text-ink-700">{item.text}</p>
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        </Container>
      </Section>

      {/* LA NÓMINA, RENGLÓN POR RENGLÓN */}
      <Section tone="default" spacing="default">
        <Container>
          <Reveal>
            <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-16">
              <div className="lg:col-span-7">
                <SectionHeading
                  eyebrow="La nómina, renglón por renglón"
                  title="El sueldo del encargado no puede ser un total sin explicación"
                />
                <p className="mt-6 max-w-[62ch] text-[16.5px] leading-relaxed text-ink-700">
                  En un edificio con personal, el sueldo y sus cargas suelen ser la línea
                  más grande de la expensa. Justamente por eso la{" "}
                  <a href={LEY_941_URL} target="_blank" rel="noopener noreferrer" className={linkClass}>
                    Ley 941
                  </a>{" "}
                  no deja que aparezca como un número suelto: el artículo 10 obliga a que
                  cada liquidación informe los datos del consorcio con su CUIT y su clave
                  SUTERH, y la nómina del personal con categoría, CUIL, sueldo básico,
                  horas extras detalladas, descuentos y aportes.
                </p>
                <p className="mt-4 max-w-[62ch] text-[16.5px] leading-relaxed text-ink-700">
                  El mismo artículo pide el detalle de ingresos y egresos del mes
                  anterior, los pagos a proveedores, los seguros, el recibo del
                  administrador por sus honorarios y los juicios en que el consorcio sea
                  parte. Cómo leer cada bloque lo explicamos en la guía sobre{" "}
                  <a href="/blog/expensas-consorcio-que-son-como-se-liquidan" className={linkClass}>
                    qué son las expensas y cómo se liquidan
                  </a>
                  , y el resto de los deberes del administrador en la nota sobre{" "}
                  <a href="/blog/ley-941-obligaciones-administrador-consorcios" className={linkClass}>
                    la Ley 941 y sus obligaciones
                  </a>
                  .
                </p>

                <div className="mt-10 w-full rounded-2xl bg-cream-100 p-7 ring-1 ring-cream-300">
                  <div className="overflow-x-auto">
                    <table className="w-full border-collapse text-left text-[15px]">
                      <caption className="mb-4 text-left text-xs font-medium uppercase tracking-[0.18em] text-terra-700">
                        Qué tiene que mostrar la liquidación sobre el personal
                      </caption>
                      <thead className="border-b border-cream-300">
                        <tr>
                          <th scope="col" className="py-2.5 pr-3 font-display text-[14px] font-semibold tracking-tight text-navy-900">
                            Dato exigido
                          </th>
                          <th scope="col" className="py-2.5 pl-3 font-display text-[14px] font-semibold tracking-tight text-navy-900">
                            Para qué le sirve al consejo
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {nomina.map((row) => (
                          <tr key={row.dato}>
                            <th scope="row" className="border-b border-cream-200 py-2.5 pr-3 align-top font-medium leading-relaxed text-navy-900">
                              {row.dato}
                            </th>
                            <td className="border-b border-cream-200 py-2.5 pl-3 align-top leading-relaxed text-ink-800">
                              {row.sirve}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                  <p className="mt-4 text-[13px] leading-relaxed text-ink-700/80">
                    Fuente: artículo 10 de la Ley 941 de la Ciudad de Buenos Aires.
                  </p>
                </div>
              </div>

              <aside className="lg:col-span-5">
                <div className="w-full rounded-2xl border border-cream-300 p-7">
                  <p className="text-xs font-medium uppercase tracking-[0.18em] text-terra-700">
                    Quién decide qué
                  </p>
                  <dl className="mt-5 space-y-5">
                    {quienDecide.map((item) => (
                      <div key={item.tema}>
                        <dt className="font-display text-[1.1rem] leading-snug text-navy-900">
                          {item.tema}
                        </dt>
                        <dd className="mt-1.5 text-[15px] leading-relaxed text-ink-700">
                          {item.regla}
                        </dd>
                      </div>
                    ))}
                  </dl>
                  <p className="mt-6 text-[13px] leading-relaxed text-ink-700/80">
                    Textos en el{" "}
                    <a href={CCYC_URL} target="_blank" rel="noopener noreferrer" className={linkClass}>
                      Código Civil y Comercial
                    </a>{" "}
                    y en la{" "}
                    <a href={LEY_941_URL} target="_blank" rel="noopener noreferrer" className={linkClass}>
                      Ley 941
                    </a>
                    .
                  </p>
                </div>
              </aside>
            </div>
          </Reveal>
        </Container>
      </Section>

      {/* LO QUE EL CONSEJO PUEDE REVISAR */}
      <Section tone="muted" spacing="default">
        <Container>
          <Reveal>
            <div className="max-w-[62ch]">
              <SectionHeading
                eyebrow="Control mensual"
                title="Seis cosas que el consejo puede mirar en cada liquidación"
              />
              <p className="mt-5 text-[16.5px] leading-relaxed text-ink-700">
                El artículo 2064 del Código Civil y Comercial le da al consejo de
                propietarios el control de los aspectos económicos y financieros del
                consorcio. No reemplaza al administrador, pero tiene con qué pedir
                explicaciones. Esta es la revisión que nosotros mismos esperamos que
                hagan.
              </p>
            </div>
          </Reveal>
          <Reveal delay={0.08}>
            <ul className="mt-12 grid grid-cols-1 gap-x-10 gap-y-6 md:grid-cols-2">
              {revisionMensual.map((item) => (
                <li key={item} className="grid grid-cols-[auto_1fr] gap-4">
                  <span className="mt-0.5 flex h-8 w-8 items-center justify-center rounded-full bg-cream-50 ring-1 ring-cream-300">
                    <Check aria-hidden="true" strokeWidth={2} className="h-4 w-4 text-terra-700" />
                  </span>
                  <p className="text-[15.5px] leading-relaxed text-ink-800">{item}</p>
                </li>
              ))}
            </ul>
            <p className="mt-10 max-w-[62ch] text-[15.5px] leading-relaxed text-ink-700">
              Si quieren profundizar en qué puede y qué no puede hacer el consejo, lo
              repasamos en la guía sobre{" "}
              <a href="/blog/funciones-del-consejo-de-propietarios" className={linkClass}>
                las funciones del consejo de propietarios
              </a>
              .
            </p>
          </Reveal>
        </Container>
      </Section>

      {/* EL BARRIO + MAPA */}
      <Section tone="default" spacing="default">
        <Container>
          <Reveal>
            <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-16">
              <div className="lg:col-span-6">
                <SectionHeading eyebrow="El barrio" title="En el medio exacto de la Ciudad" />
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
                    title="Caballito en Google Maps"
                    src="https://www.google.com/maps?q=Caballito,+Ciudad+Aut%C3%B3noma+de+Buenos+Aires&z=14&hl=es&output=embed"
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    className="h-full w-full border-0"
                  />
                </div>
                <p className="mt-2 text-[13px] text-ink-700/70">
                  Caballito, único barrio de la Comuna 6, con la Avenida Rivadavia como
                  columna vertebral.
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
                <SectionHeading
                  eyebrow="Cómo trabajamos"
                  title="Una administradora de consorcios con mirada de contador"
                />
                <p className="mt-5 max-w-[56ch] text-[16px] leading-relaxed text-ink-700">
                  Cada mes cerramos la liquidación con su comprobante detrás de cada
                  renglón, liquidamos los sueldos del personal, depositamos las cargas y
                  mantenemos al día los seguros del edificio, del personal y de
                  terceros. Los fondos se mueven en una cuenta bancaria abierta a nombre
                  del consorcio.
                </p>
                <p className="mt-4 max-w-[56ch] text-[16px] leading-relaxed text-ink-700">
                  Al cierre del ejercicio, el artículo 2067 pide rendir cuenta documentada
                  dentro de los sesenta días; la presentamos por escrito, con el detalle
                  de la nómina del año. Las asambleas se convocan con lugar, día,
                  temario y horario de comienzo y de finalización, como exige la Ley 941.
                  El alcance completo está en{" "}
                  <a href="/servicios" className={linkClass}>
                    nuestros servicios
                  </a>
                  ; si hoy tienen otra administración, el paso a paso está en la guía para{" "}
                  <a href="/blog/como-cambiar-de-administrador-de-consorcio" className={linkClass}>
                    cambiar de administrador de consorcio
                  </a>
                  , y para hablar de su edificio pueden{" "}
                  <a href="/contacto" className={linkClass}>
                    dejarnos un mensaje
                  </a>
                  .
                </p>
              </div>
              <div className="lg:col-span-5 lg:flex lg:items-center">
                <div className="w-full rounded-2xl bg-cream-50 p-7 ring-1 ring-cream-300">
                  <p className="flex items-center gap-2 text-xs font-medium uppercase tracking-[0.18em] text-terra-700">
                    <Landmark aria-hidden="true" strokeWidth={1.75} className="h-4 w-4" />
                    Dónde estamos
                  </p>
                  <p className="mt-3 font-display text-[1.3rem] leading-snug text-navy-900">
                    {site.address.street}
                  </p>
                  <p className="mt-1 text-[15px] text-ink-700">
                    Villa Devoto · {site.address.city}
                  </p>
                  <p className="mt-4 text-[15px] leading-relaxed text-ink-700">
                    La oficina está en Villa Devoto y administramos edificios en toda la
                    Ciudad. Las asambleas de Caballito se hacen en el propio edificio, y
                    la documentación del consorcio queda siempre disponible para los
                    propietarios.
                  </p>
                  <p className="mt-4 text-[15px] leading-relaxed text-ink-700">
                    {site.hours.label} · {site.contact.phone}
                  </p>
                  <div className="mt-6">
                    <Button href="/contacto" variant="secondary" size="default">
                      Datos de contacto
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </Reveal>
        </Container>
      </Section>

      <RelatedPosts
        eyebrow="Para el consejo"
        title="Guías para leer la liquidación y conocer los deberes del administrador"
        tags={["expensas", "normativa", "administrador", "transparencia"]}
        tone="default"
      />

      <FaqSection
        items={caballitoFaq}
        title="Preguntas frecuentes de consorcios en Caballito"
        tone="muted"
      />

      {/* CTA FINAL */}
      <Section tone="navy" spacing="default">
        <Container>
          <Reveal>
            <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:items-end">
              <div className="lg:col-span-8">
                <h2 className="font-display text-[2rem] leading-[1.05] tracking-[-0.02em] text-balance text-cream-50 sm:text-[2.5rem]">
                  ¿Su edificio en Caballito tiene encargado?
                </h2>
                <p className="mt-4 max-w-[58ch] text-[16.5px] leading-relaxed text-cream-100/85">
                  Compártannos una expensa reciente, con la hoja del personal si la
                  tienen. La leemos con ustedes, marcamos qué datos faltan según la Ley
                  941 y les proponemos cómo administraríamos el consorcio, sin costo.
                </p>
              </div>
              <div className="lg:col-span-4 lg:flex lg:justify-end">
                <Button href="/contacto" variant="primary" size="lg">
                  Enviar la expensa
                </Button>
              </div>
            </div>
          </Reveal>
        </Container>
      </Section>
    </>
  );
}
