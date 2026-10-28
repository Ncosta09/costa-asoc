import type { Metadata } from "next";
import Image from "next/image";
import {
  BadgeCheck,
  Building2,
  Calculator,
  FolderOpen,
  HardHat,
  Hourglass,
  KeyRound,
  MapPin,
  TrainFront,
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
import { WhatsAppIcon } from "@/components/ui/whatsapp-icon";

export const metadata: Metadata = buildMetadata({
  title: "Administración de Consorcios en Villa Urquiza",
  description:
    "Edificios nuevos en Villa Urquiza: contadores con RPA 8192 que ordenan la documentación de obra y cuidan los plazos para reclamar fallas a la desarrolladora.",
  path: "/administracion-de-consorcios-villa-urquiza",
});

const linkClass =
  "font-medium text-terra-700 underline decoration-terra-700/30 underline-offset-4 transition-colors hover:decoration-terra-700";
const sourceLinkClass =
  "underline decoration-ink-700/30 underline-offset-2 hover:decoration-ink-700";

const CCYC_URL =
  "https://servicios.infoleg.gob.ar/infolegInternet/anexos/235000-239999/235975/texact.htm";
const LEY_941_URL = "https://www.cedom.gob.ar/legislacion/normas/leyes/RepoLeyes/ley941.html";
const FICHA_BARRIO_URL = "https://buenosaires.gob.ar/laciudad/barrios/villa-urquiza";
const INFOBAE_2008_URL =
  "https://www.infobae.com/2008/05/28/382666-el-barrio-villa-urquiza-un-boom-inmobiliario/";
const CRONISTA_2022_URL =
  "https://www.cronista.com/negocios/por-que-en-el-barrio-que-fue-furor-en-la-ultima-decada-ya-no-se-construyen-nuevos-edificios";

// FAQ propia: edificios a estrenar y defectos de construcción frente a la desarrolladora.
// Sin primera asamblea (Villa del Parque), amenities (Palermo), fachadas, nómina ni auditoría.
const villaUrquizaFaq: FaqItem[] = [
  {
    question: "¿Durante cuánto tiempo responde la desarrolladora por las fallas del edificio?",
    answer:
      "Depende de la falla. Si el daño compromete la solidez de la obra o la hace impropia para su destino, el artículo 1275 del Código Civil y Comercial exige que se produzca dentro de los diez años de aceptada la obra, y el artículo 1274 extiende esa responsabilidad a quien vende una obra que construyó o hizo construir, si esa es su profesión habitual. Para los demás defectos ocultos de un inmueble, la garantía caduca a los tres años desde que se lo recibió (artículo 1055).",
  },
  {
    question: "Apareció una filtración en la terraza común. ¿Qué hacemos primero?",
    answer:
      "Dejar constancia y avisar a tiempo. La terraza es una parte necesariamente común (artículo 2041), así que el tema es del consorcio y no de un propietario solo. El artículo 1054 pide denunciar expresamente el defecto oculto dentro de los sesenta días de haberse manifestado; si aparece de a poco, el plazo corre desde que se lo pudo advertir. Después, la asamblea decide cómo seguir, con un informe técnico y el consejo de un abogado.",
  },
  {
    question: "El boleto dice que la desarrolladora no responde por defectos. ¿Eso vale?",
    answer:
      "No para los daños graves. El artículo 1276 del Código Civil y Comercial dice que toda cláusula que dispensa o limita la responsabilidad por los daños que comprometen la solidez de una obra destinada a larga duración, o que la hacen impropia para su destino, se tiene por no escrita. Para otros defectos, lo que diga cada contrato lo tiene que revisar un abogado.",
  },
  {
    question: "La desarrolladora todavía tiene departamentos sin vender. ¿Paga expensas?",
    answer:
      "Mientras sea dueña de esas unidades, es propietaria como cualquier otro, y el artículo 2046 obliga a todo propietario a pagar las expensas ordinarias y extraordinarias en la proporción de su parte indivisa. Lo primero que miramos es el reglamento, para ver si tiene alguna cláusula sobre esas unidades, y después que la liquidación las incluya con su porcentual.",
  },
  {
    question: "¿Qué papeles de la obra tiene que guardar el consorcio?",
    answer:
      "El artículo 2067 obliga al administrador a conservar todos los antecedentes documentales de la constitución del consorcio, y la Ley 941 le exige conservar la documentación y garantizar el libre acceso de los propietarios. En un edificio nuevo eso incluye el reglamento, los planos, las garantías y manuales de las instalaciones y la fecha en que se recibió cada parte común, que es el dato del que dependen los plazos.",
  },
  {
    question: "¿Toman edificios en Villa Urquiza?",
    answer:
      "Sí. El estudio está sobre la calle Campana, en Villa Devoto, en el límite con la Comuna 12, que es la de Villa Urquiza. Las asambleas se hacen en el edificio y la documentación del consorcio queda a disposición del consejo.",
  },
];

// Los plazos que corren desde que el edificio se entrega o desde que aparece la falla.
const plazos = [
  {
    plazo: "60",
    unidad: "días",
    titulo: "Para denunciar un defecto oculto",
    texto:
      "Desde que el defecto se manifiesta, o desde que se lo pudo advertir si aparece de a poco. Si no se denuncia, la garantía por ese defecto se extingue, salvo que el vendedor lo conociera o debiera conocerlo.",
    norma: "CCyC, art. 1054",
  },
  {
    plazo: "1",
    unidad: "año",
    titulo: "Para reclamar por ruina",
    texto:
      "El reclamo contra el constructor por ruina total o parcial, por vicio de construcción, del suelo o de los materiales, prescribe al año. Se cuenta desde que se produjo la ruina.",
    norma: "CCyC, art. 2564, inc. c)",
  },
  {
    plazo: "3",
    unidad: "años",
    titulo: "Garantía por defectos ocultos",
    texto:
      "Para un inmueble, la responsabilidad por defectos ocultos caduca a los tres años desde que se lo recibió. Es la garantía general, aparte del régimen de los daños graves.",
    norma: "CCyC, art. 1055, inc. a)",
  },
  {
    plazo: "10",
    unidad: "años",
    titulo: "Solidez y destino del edificio",
    texto:
      "Los daños que comprometen la solidez de la obra o la vuelven impropia para su destino tienen que producirse dentro de los diez años de aceptada la obra para que respondan el constructor y quien la vendió.",
    norma: "CCyC, arts. 1273 a 1275",
  },
];

// Qué tiene que estar en el archivo del consorcio desde el primer día.
const archivo = [
  {
    titulo: "Reglamento de propiedad horizontal",
    texto: "Con la fecha de otorgamiento y los porcentuales de cada unidad, que son la base de cada liquidación.",
  },
  {
    titulo: "Fecha de recepción de cada parte común",
    texto: "Terraza, ascensores, bombas, cocheras. Es la fecha desde la que se cuentan los plazos de la garantía.",
  },
  {
    titulo: "Planos y documentación técnica",
    texto: "Lo que necesita cualquier profesional que tenga que evaluar una falla o proyectar una reparación.",
  },
  {
    titulo: "Garantías y manuales de los equipos",
    texto: "Con el proveedor que instaló cada uno, para saber a quién se llama antes de pagar un service.",
  },
  {
    titulo: "Registro de los reclamos hechos",
    texto: "Qué se denunció, cuándo, por qué medio y qué contestó la desarrolladora. Sin eso, el plazo de sesenta días no se puede probar.",
  },
];

const barrioFacts = [
  {
    icon: MapPin,
    title: "Comuna 12, entre Constituyentes y las vías del Mitre",
    text: "Villa Urquiza comparte la Comuna 12 con Coghlan, Saavedra y Villa Pueyrredón. La ficha del Gobierno de la Ciudad le asigna 5,4 kilómetros cuadrados y 85.587 habitantes según el censo de 2001, con límites como la Avenida De los Constituyentes, Monroe, Congreso, los ramales del Ferrocarril Mitre y la General Paz.",
  },
  {
    icon: TrainFront,
    title: "De Villa Catalinas a Urquiza",
    text: "La empresa Muelle de las Catalinas compró tierras en la zona para rellenar un bajo del centro y después las loteó: el 2 de octubre de 1887 nació Villa Catalinas, fecha que el barrio conserva como aniversario. En 1889 se inauguró la estación Las Catalinas, y en 1901, a pedido de los vecinos, la villa tomó el nombre de Justo José de Urquiza por el centenario de su nacimiento.",
  },
  {
    icon: HardHat,
    title: "El barrio de las grúas",
    text: "En mayo de 2008, Reporte Inmobiliario contaba 130 edificios construidos en cuatro años en las manzanas entre Triunvirato, Congreso, Álvarez Thomas y Roosevelt, con la llegada de la línea B como motor. Una nota de 2022 con datos de la misma consultora ubica el auge fuerte de la zona entre 2006 y 2013.",
  },
];

export default function VillaUrquizaPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify([
            breadcrumbSchema([
              { name: "Inicio", url: site.url },
              {
                name: "Administración de consorcios en Villa Urquiza",
                url: `${site.url}/administracion-de-consorcios-villa-urquiza`,
              },
            ]),
            barrioServiceSchema("Villa Urquiza", "/administracion-de-consorcios-villa-urquiza"),
          ]),
        }}
      />

      {/* HERO */}
      <Section spacing="tight" className="pt-24 sm:pt-28">
        <Container>
          <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-12 lg:gap-16">
            <div className="max-w-[64ch] lg:col-span-7">
              <p className="text-xs font-medium uppercase tracking-[0.18em] text-terra-700">
                Villa Urquiza · Comuna 12 · CABA
              </p>
              <h1 className="mt-3 font-display text-[2.5rem] leading-[1.04] tracking-[-0.025em] text-balance text-navy-900 sm:text-[3.5rem]">
                Administración de consorcios en Villa Urquiza
              </h1>
              <p className="mt-6 max-w-[58ch] text-[18px] leading-relaxed text-ink-800">
                Villa Urquiza llenó sus avenidas de edificios nuevos, y la garantía de
                una obra nueva tiene fecha de vencimiento. Somos
                contadores públicos inscriptos en el Registro de la Ciudad y llevamos
                el archivo y los plazos del consorcio desde el primer día.
              </p>

              <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
                <Button href="/contacto" variant="primary" size="lg">
                  Pedir una propuesta sin cargo
                </Button>
                <Button href={`${site.contact.whatsappHref}?text=${encodeURIComponent("Hola, escribo por la administración de nuestro consorcio en Villa Urquiza.")}`} variant="secondary" size="lg">
                  <WhatsAppIcon className="h-4 w-4" />
                  Escribir por WhatsApp
                </Button>
              </div>

              <ul className="mt-8 flex flex-wrap items-center gap-2.5">
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
            </div>

            <figure className="lg:col-span-5">
              <div className="overflow-hidden rounded-lg border border-cream-300">
                <Image
                  src="/zonas/avenida-congreso-y-donado-villa-urquiza.jpg"
                  alt="Edificio de departamentos de siete pisos con balcones corridos y terraza con plantas, en la esquina de Avenida Congreso y Donado"
                  width={1600}
                  height={1200}
                  priority
                  className="h-[320px] w-full object-cover sm:h-[400px] lg:h-[520px]"
                  sizes="(min-width: 1024px) 40vw, 100vw"
                />
              </div>
              <figcaption className="mt-2 text-[13px] text-ink-700/80">
                Avenida Congreso y Donado, edificio construido entre 2016 y 2019 (recorte). Foto:{" "}
                <a href="https://commons.wikimedia.org/wiki/File:Av_congreso_y_donado_edificio.jpg" target="_blank" rel="noopener noreferrer" className={sourceLinkClass}>Fernando Martello</a>,{" "}
                <a href="https://creativecommons.org/licenses/by-sa/4.0/deed.es" target="_blank" rel="noopener noreferrer" className={`whitespace-nowrap ${sourceLinkClass}`}>CC BY-SA 4.0</a>.
              </figcaption>
            </figure>
          </div>
        </Container>
      </Section>

      {/* EL RELOJ DE LA OBRA */}
      <Section tone="muted" spacing="default">
        <Container>
          <Reveal>
            <div className="grid grid-cols-1 gap-6 lg:grid-cols-12 lg:gap-16">
              <div className="lg:col-span-5">
                <p className="text-xs font-medium uppercase tracking-[0.18em] text-terra-700">
                  <Hourglass
                    aria-hidden="true"
                    strokeWidth={1.75}
                    className="mr-1.5 inline h-3.5 w-3.5 -translate-y-px text-terra-700"
                  />
                  Edificios a estrenar
                </p>
                <h2 className="mt-3 font-display text-[2rem] leading-[1.05] tracking-[-0.02em] text-balance text-navy-900 sm:text-[2.5rem]">
                  Cuatro plazos que empiezan a correr con la entrega
                </h2>
              </div>
              <div className="lg:col-span-7 lg:pt-8">
                <p className="text-[16.5px] leading-relaxed text-ink-700">
                  Quien vende departamentos que construyó o hizo construir, como
                  actividad habitual, responde junto con el constructor por los daños
                  graves de la obra. Lo dice el artículo 1274 del{" "}
                  <a href={CCYC_URL} target="_blank" rel="noopener noreferrer" className={linkClass}>
                    Código Civil y Comercial
                  </a>
                  . Pero cada reclamo tiene su plazo, y varios se pierden por no avisar a
                  tiempo, no por falta de razón.
                </p>
                <p className="mt-4 text-[16.5px] leading-relaxed text-ink-700">
                  Para un edificio terminado en los años del auge, los diez años del
                  artículo 1275 ya corrieron. Para uno terminado en la última década,
                  todavía corren.
                </p>
              </div>
            </div>
          </Reveal>

          <Reveal delay={0.06}>
            <ol className="relative mt-12 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {plazos.map((p) => (
                <li
                  key={p.titulo}
                  className="flex flex-col rounded-2xl bg-cream-50 p-6 ring-1 ring-cream-300"
                >
                  <p className="flex items-baseline gap-2 text-navy-900">
                    <span className="font-display text-[3rem] leading-none tabular-nums tracking-[-0.03em]">
                      {p.plazo}
                    </span>
                    <span className="text-[15px] font-medium text-terra-700">{p.unidad}</span>
                  </p>
                  <h3 className="mt-4 border-t border-cream-300 pt-4 font-display text-[1.2rem] leading-snug text-navy-900">
                    {p.titulo}
                  </h3>
                  <p className="mt-2 text-[15px] leading-relaxed text-ink-700">{p.texto}</p>
                  <p className="mt-auto pt-4 text-[12.5px] font-medium text-terra-700">{p.norma}</p>
                </li>
              ))}
            </ol>
          </Reveal>

          <Reveal delay={0.1}>
            <p className="mt-10 max-w-[72ch] text-[15.5px] leading-relaxed text-ink-700">
              Dos reglas más juegan a favor del comprador. Una cláusula del contrato que
              dispense o limite la responsabilidad por esos daños graves se tiene por no
              escrita (artículo 1276). Y cuando el vendedor actúa profesionalmente en la
              actividad, no le toca al comprador probar que el defecto ya existía al
              comprar (artículo 1053).
            </p>
          </Reveal>
        </Container>
      </Section>

      {/* QUÉ HACE LA ADMINISTRACIÓN CUANDO APARECE UNA FALLA */}
      <Section tone="default" spacing="default">
        <Container>
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-16">
            <Reveal className="lg:col-span-6">
              <p className="text-xs font-medium uppercase tracking-[0.18em] text-terra-700">
                Cuando aparece una falla
              </p>
              <h2 className="mt-3 font-display text-[2rem] leading-[1.05] tracking-[-0.02em] text-balance text-navy-900 sm:text-[2.5rem]">
                Si la falla está en una parte común, el reclamo es del consorcio
              </h2>
              <p className="mt-5 text-[16.5px] leading-relaxed text-ink-700">
                Una mancha de humedad bajo la terraza, una bomba que se quema a los pocos
                meses, una cochera que se inunda. La terraza, las cañerías hasta cada
                unidad, los ascensores y los locales de servicios centrales son cosas
                necesariamente comunes según el artículo 2041, así que el problema no es
                del vecino del último piso sino de todos.
              </p>
              <p className="mt-4 text-[16.5px] leading-relaxed text-ink-700">
                El consorcio es una persona jurídica (artículo 2044) y el administrador es
                su representante legal (artículo 2065), con la obligación de atender la
                conservación de las partes comunes y la seguridad de la estructura
                (artículo 2067, inciso c). No somos abogados: el reclamo formal lo lleva
                un profesional del derecho. Nuestra parte es que llegue a tiempo y con
                pruebas.
              </p>
            </Reveal>

            <Reveal delay={0.08} className="lg:col-span-6 lg:pt-10">
              <div className="rounded-2xl bg-cream-100 p-7 ring-1 ring-cream-300 sm:p-8">
                <h3 className="font-display text-[1.3rem] leading-snug text-navy-900">
                  Lo que hacemos en las primeras semanas
                </h3>
                <ol className="mt-6 space-y-5">
                  {[
                    {
                      t: "Constatar",
                      d: "Fotos fechadas, descripción del daño y, si hace falta, un informe técnico de un profesional matriculado.",
                    },
                    {
                      t: "Denunciar por escrito",
                      d: "Una denuncia expresa a la desarrolladora dentro de los sesenta días, por un medio que deje constancia, y copia al archivo del consorcio.",
                    },
                    {
                      t: "Informar a los propietarios",
                      d: "Qué se reclamó y en qué estado está. Y si el consorcio recibe un reclamo administrativo o judicial, hay que notificarlo a todos en no más de cuarenta y ocho horas hábiles (artículo 2067, inciso k).",
                    },
                    {
                      t: "Llevarlo a la asamblea",
                      d: "Con el informe, los presupuestos de reparación y la opinión del abogado, para que decidan con los números a la vista.",
                    },
                  ].map((step, i) => (
                    <li key={step.t} className="grid grid-cols-[auto_1fr] gap-4">
                      <span
                        aria-hidden="true"
                        className="flex h-8 w-8 items-center justify-center rounded-full bg-cream-50 text-[13px] font-medium tabular-nums text-terra-700 ring-1 ring-cream-300"
                      >
                        {i + 1}
                      </span>
                      <div>
                        <p className="text-[15px] font-medium text-navy-900">{step.t}</p>
                        <p className="mt-1 text-[15px] leading-relaxed text-ink-700">{step.d}</p>
                      </div>
                    </li>
                  ))}
                </ol>
              </div>
            </Reveal>
          </div>

          <Reveal delay={0.12}>
            <p className="mt-12 max-w-[72ch] text-[15.5px] leading-relaxed text-ink-700">
              Mientras tanto, si la reparación no puede esperar, se paga con fondos del
              consorcio y el reclamo sigue su curso. Para eso conviene que el edificio arme
              cuanto antes su{" "}
              <a href="/blog/fondo-de-reserva-del-consorcio" className={linkClass}>
                fondo de reserva
              </a>
              , y que se entienda qué gasto es ordinario y cuál vota la asamblea, como
              explicamos en la nota sobre{" "}
              <a href="/blog/expensas-ordinarias-y-extraordinarias-diferencias" className={linkClass}>
                expensas ordinarias y extraordinarias
              </a>
              .
            </p>
          </Reveal>
        </Container>
      </Section>

      {/* EL ARCHIVO DEL EDIFICIO NUEVO */}
      <Section tone="muted" spacing="default">
        <Container>
          <Reveal>
            <div className="max-w-[62ch]">
              <p className="text-xs font-medium uppercase tracking-[0.18em] text-terra-700">
                <FolderOpen
                  aria-hidden="true"
                  strokeWidth={1.75}
                  className="mr-1.5 inline h-3.5 w-3.5 -translate-y-px text-terra-700"
                />
                El archivo del consorcio
              </p>
              <h2 className="mt-3 font-display text-[2rem] leading-[1.05] tracking-[-0.02em] text-balance text-navy-900 sm:text-[2.5rem]">
                Sin la fecha de entrega, ningún plazo se puede contar
              </h2>
              <p className="mt-5 text-[16.5px] leading-relaxed text-ink-700">
                El artículo 2067, inciso i, obliga al administrador a conservar todos los
                antecedentes documentales de la constitución del consorcio, y el
                artículo 9º de la{" "}
                <a href={LEY_941_URL} target="_blank" rel="noopener noreferrer" className={linkClass}>
                  Ley 941
                </a>{" "}
                le pide además garantizar el libre acceso de los propietarios a esa
                documentación. En un edificio a estrenar, esto es lo primero que armamos.
              </p>
            </div>
          </Reveal>

          <Reveal delay={0.06}>
            <ul className="mt-12 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
              {archivo.map((a) => (
                <li key={a.titulo} className="rounded-2xl bg-cream-50 p-6 ring-1 ring-cream-300">
                  <h3 className="font-display text-[1.15rem] leading-snug text-navy-900">{a.titulo}</h3>
                  <p className="mt-2 text-[15px] leading-relaxed text-ink-700">{a.texto}</p>
                </li>
              ))}
              <li className="flex flex-col justify-between rounded-2xl bg-navy-900 p-6">
                <div className="flex items-center gap-2.5">
                  <KeyRound aria-hidden="true" strokeWidth={1.75} className="h-4 w-4 text-cream-100" />
                  <h3 className="font-display text-[1.15rem] leading-snug text-cream-50">
                    Las unidades sin vender
                  </h3>
                </div>
                <p className="mt-3 text-[15px] leading-relaxed text-cream-100/85">
                  Mientras la desarrolladora sea dueña de unidades, es propietaria y le
                  corresponde pagar sus expensas en la proporción de su parte indivisa
                  (artículo 2046, inciso c). Revisamos que la liquidación las incluya.
                </p>
              </li>
            </ul>
          </Reveal>

          <Reveal delay={0.1}>
            <p className="mt-10 max-w-[72ch] text-[15.5px] leading-relaxed text-ink-700">
              Si el edificio todavía no hizo su primera asamblea, el administrador que
              figura en el reglamento cesa en ella si no lo ratifican (artículo 2066).
              Cuándo tiene que hacerse esa asamblea lo contamos en la página de{" "}
              <a href="/administracion-de-consorcios-villa-del-parque" className={linkClass}>
                Villa del Parque
              </a>
              , y cómo se hace el traspaso, en la guía para{" "}
              <a href="/blog/como-cambiar-de-administrador-de-consorcio" className={linkClass}>
                cambiar de administrador
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
                <p className="text-xs font-medium uppercase tracking-[0.18em] text-terra-700">
                  El barrio
                </p>
                <h2 className="mt-3 font-display text-[2rem] leading-[1.05] tracking-[-0.02em] text-balance text-navy-900 sm:text-[2.5rem]">
                  De un loteo de 1887 a las torres de Triunvirato
                </h2>
                <div className="mt-8 space-y-7">
                  {barrioFacts.map((fact) => (
                    <div key={fact.title} className="grid grid-cols-[auto_1fr] gap-4">
                      <span className="flex h-10 w-10 items-center justify-center rounded-full bg-cream-100 ring-1 ring-cream-300">
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
                <p className="mt-7 text-[13px] text-ink-700/80">
                  Fuentes:{" "}
                  <a href={FICHA_BARRIO_URL} target="_blank" rel="noopener noreferrer" className={sourceLinkClass}>
                    ficha del barrio
                  </a>{" "}
                  del Gobierno de la Ciudad, y notas de{" "}
                  <a href={INFOBAE_2008_URL} target="_blank" rel="noopener noreferrer" className={sourceLinkClass}>
                    Infobae (2008)
                  </a>{" "}
                  y{" "}
                  <a href={CRONISTA_2022_URL} target="_blank" rel="noopener noreferrer" className={sourceLinkClass}>
                    El Cronista (2022)
                  </a>{" "}
                  con datos de Reporte Inmobiliario.
                </p>
              </div>
              <div className="lg:col-span-6 lg:flex lg:flex-col lg:justify-center">
                <div className="relative isolate z-0 h-[320px] w-full overflow-hidden rounded-lg border border-cream-300 bg-cream-100 sm:h-[420px]">
                  <iframe
                    title="Villa Urquiza en Google Maps"
                    src="https://www.google.com/maps?q=Villa+Urquiza,+Ciudad+Aut%C3%B3noma+de+Buenos+Aires&z=14&hl=es&output=embed"
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    className="h-full w-full border-0"
                  />
                </div>
                <p className="mt-2 text-[13px] text-ink-700/80">
                  Villa Urquiza, en la Comuna 12, al norte de la Avenida Triunvirato.
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
                  Cómo trabajamos
                </p>
                <h2 className="mt-3 font-display text-[2rem] leading-[1.05] tracking-[-0.02em] text-balance text-navy-900 sm:text-[2.5rem]">
                  Un consorcio nuevo, ordenado desde la primera liquidación
                </h2>
                <p className="mt-5 max-w-[56ch] text-[16px] leading-relaxed text-ink-700">
                  En un edificio recién entregado casi todo está por hacerse: la cuenta
                  bancaria a nombre del consorcio, los libros, los seguros, el primer
                  presupuesto. Lo hacemos con el mismo criterio contable con el que
                  después rendimos cuentas, para que el consejo pueda seguir cada peso
                  desde el comienzo.
                </p>
                <p className="mt-4 max-w-[56ch] text-[16px] leading-relaxed text-ink-700">
                  Las obligaciones que la Ciudad le pone al administrador están resumidas
                  en la nota sobre la{" "}
                  <a href="/blog/ley-941-obligaciones-administrador-consorcios" className={linkClass}>
                    Ley 941
                  </a>
                  , y el alcance de cada plan, en{" "}
                  <a href="/servicios" className={linkClass}>
                    servicios
                  </a>
                  .
                </p>
              </div>
              <div className="lg:col-span-5 lg:flex lg:items-center">
                <div className="w-full rounded-2xl bg-cream-50 p-7 ring-1 ring-cream-300">
                  <div className="flex items-center gap-2.5">
                    <Building2 aria-hidden="true" strokeWidth={1.75} className="h-4 w-4 text-terra-700" />
                    <p className="text-xs font-medium uppercase tracking-[0.18em] text-terra-700">
                      Dónde estamos
                    </p>
                  </div>
                  <p className="mt-3 font-display text-[1.3rem] leading-snug text-navy-900">
                    {site.address.street}
                  </p>
                  <p className="mt-1 text-[15px] text-ink-700">
                    Villa Devoto · {site.address.city}
                  </p>
                  <p className="mt-4 text-[15px] leading-relaxed text-ink-700">
                    Campana es el límite entre Villa Devoto y la Comuna 12. Desde ahí
                    vamos a las asambleas de cada edificio de Villa Urquiza.
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
        eyebrow="Para un consorcio recién formado"
        title="Guías sobre reglamento, asambleas y fondos del edificio"
        tags={["reglamento", "fondo de reserva", "asamblea"]}
        tone="default"
      />

      <FaqSection
        items={villaUrquizaFaq}
        title="Preguntas frecuentes sobre administración en Villa Urquiza"
        tone="muted"
      />

      {/* CTA FINAL */}
      <Section tone="navy" spacing="default">
        <Container>
          <Reveal>
            <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:items-end">
              <div className="lg:col-span-8">
                <h2 className="font-display text-[2rem] leading-[1.05] tracking-[-0.02em] text-balance text-cream-50 sm:text-[2.5rem]">
                  ¿Su edificio tiene menos de diez años?
                </h2>
                <p className="mt-4 max-w-[58ch] text-[16.5px] leading-relaxed text-cream-100/85">
                  Cuéntennos la dirección y cuándo se entregó. Les decimos qué
                  documentación debería tener el consorcio, qué plazos siguen abiertos y
                  cómo lo administraríamos, sin costo.
                </p>
              </div>
              <div className="lg:col-span-4 lg:flex lg:justify-end">
                <Button href="/contacto" variant="primary" size="lg">
                  Contarnos el caso
                </Button>
              </div>
            </div>
          </Reveal>
        </Container>
      </Section>
    </>
  );
}
