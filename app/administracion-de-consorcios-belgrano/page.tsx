import type { Metadata } from "next";
import Image from "next/image";
import {
  BadgeCheck,
  Building2,
  Calculator,
  Check,
  House,
  Landmark,
  MapPin,
  MessageCircle,
  ShieldCheck,
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
import { barrioServiceSchema, breadcrumbSchema } from "@/lib/schema";
import { site } from "@/content/site";
import type { FaqItem } from "@/content/faq";

export const metadata: Metadata = buildMetadata({
  title: "Administración de Consorcios en Belgrano",
  description:
    "Consorcios en Belgrano, de las torres de Cabildo a los PH de Belgrano R: contadores con RPA 8192 y liquidaciones listas para auditoría y control de gestión.",
  path: "/administracion-de-consorcios-belgrano",
});

const linkClass =
  "font-medium text-terra-700 underline decoration-terra-700/30 underline-offset-4 transition-colors hover:decoration-terra-700";

const LEY_941_URL =
  "https://www.cedom.gob.ar/legislacion/normas/leyes/RepoLeyes/ley941.html";
const CCYC_URL =
  "https://servicios.infoleg.gob.ar/infolegInternet/anexos/235000-239999/235975/texact.htm";

// FAQ propia de la landing: ángulo auditoría, control del consejo y torres con servicios.
// Sin preguntas de honorarios ni de cambio de administrador (ya están en las otras cuatro).
const belgranoFaq: FaqItem[] = [
  {
    question: "¿La asamblea puede ordenar una auditoría de la administración?",
    answer:
      "Sí. El artículo 9º de la Ley 941 prevé que, cuando la asamblea ordinaria o extraordinaria lo disponga, la gestión del administrador sea auditada contablemente y acompañada de un informe de control de gestión. La misma asamblea puede pedir, además, una auditoría legal a cargo de un abogado. Conviene que el tema figure en el orden del día de la convocatoria.",
  },
  {
    question: "¿Quién puede firmar la auditoría contable del consorcio?",
    answer:
      "Un profesional de Ciencias Económicas con matrícula habilitante en la Ciudad y firma legalizada, según el mismo artículo 9º; la norma también permite que la hagan, en forma gratuita, las asociaciones de consumidores inscriptas en la Ciudad, con los mismos requisitos profesionales. La asamblea decide quién audita. Nuestro criterio es que ese profesional sea independiente de quien administra: nosotros no nos auditamos a nosotros mismos, entregamos toda la documentación que el auditor pida.",
  },
  {
    question: "¿Qué tiene que decir la expensa sobre el seguro del edificio?",
    answer:
      "La compañía, el número de póliza y los vencimientos: el artículo 10 de la Ley 941 lo pone entre los datos obligatorios de la liquidación mensual. Si el renglón del seguro aparece como un importe sin más datos, falta información. La cobertura integral de consorcio que exige el artículo 2067 incluye incendio, responsabilidad civil y demás riesgos de práctica.",
  },
  {
    question: "El consorcio tiene un juicio en trámite. ¿Nos tienen que informar?",
    answer:
      "Todos los meses. La liquidación debe detallar los juicios en los que el consorcio sea parte, con juzgado, número de expediente, carátula, objeto, estado y capital reclamado. Así cualquier propietario puede seguir el caso sin tener que preguntarlo en asamblea.",
  },
  {
    question: "¿En qué plazo se rinden las cuentas del ejercicio?",
    answer:
      "Dentro de los sesenta días del cierre del ejercicio financiero que fija el reglamento de propiedad horizontal, con rendición documentada, según el inciso e) del artículo 2067 del Código Civil y Comercial. Aparte de eso, el artículo 12 de la Ley 941 obliga al administrador a presentar cada año ante el Registro Público de Administradores un informe con carácter de declaración jurada.",
  },
  {
    question: "¿El consejo de propietarios puede revisar los gastos por su cuenta?",
    answer:
      "Puede y le corresponde: el artículo 2064 le asigna controlar los aspectos económicos y financieros del consorcio. Lo que no puede es reemplazar al administrador en sus obligaciones. La Ley 941, por su parte, obliga a garantizar el libre acceso de los consorcistas a la documentación, así que facturas, contratos y extractos tienen que estar a disposición cuando el consejo los pida.",
  },
];

// Tres perfiles edilicios: formato de filas con dos datos, distinto de las tarjetas de Monte Castro.
const perfiles = [
  {
    icon: House,
    zona: "Belgrano R",
    edificio:
      "La zona residencial del barrio: calles arboladas, casas y PH de categoría. Muchos consorcios son chicos, de pocas unidades.",
    gasto:
      "El peso está en el mantenimiento de construcciones con años: techos, jardines, medianeras. Cada reparación se discute entre pocos dueños, así que el presupuesto tiene que venir claro y comparado.",
  },
  {
    icon: Building2,
    zona: "Belgrano C",
    edificio:
      "Torres y edificios en altura sobre la Avenida Cabildo, Juramento y las calles que rodean las Barrancas. Varios ascensores, cocheras, amenities, personal propio y una lista larga de contratistas.",
    gasto:
      "La expensa es alta porque el edificio presta muchos servicios. El consejo no discute si hay que pagarlos: quiere ver, contrato por contrato, qué se paga y por qué.",
  },
  {
    icon: Landmark,
    zona: "Bajo Belgrano",
    edificio:
      "La parte baja del barrio, con el Barrio Chino y el Barrio River. Conviven edificios de departamentos, comercios en planta baja y zonas de casas bajas.",
    gasto:
      "Cuando hay locales, la liquidación tiene que respetar la parte indivisa de cada unidad y separar con precisión lo ordinario de lo que la asamblea resolvió como extraordinario.",
  },
];

// Lo que el artículo 10 de la Ley 941 obliga a mostrar en la liquidación mensual.
const checklistArt10 = [
  {
    titulo: "Proveedores, servicios y contratistas",
    detalle: "CUIT, matrícula, trabajo realizado, importe y, si corresponde, cuotas.",
  },
  {
    titulo: "Seguros",
    detalle: "Compañía, número de póliza y vencimientos de cada cobertura.",
  },
  {
    titulo: "Juicios",
    detalle: "Juzgado, expediente, carátula, objeto, estado y capital reclamado.",
  },
  {
    titulo: "Ingresos y egresos del mes anterior",
    detalle: "Con el activo o pasivo total del consorcio al cierre.",
  },
  {
    titulo: "Nómina del personal",
    detalle: "El personal que trabaja para el consorcio, dentro de la misma liquidación.",
  },
  {
    titulo: "Ordinarias y extraordinarias",
    detalle: "Los importes de cada una «en forma separada y diferenciada».",
  },
  {
    titulo: "Datos del administrador",
    detalle: "CUIT y número de inscripción en el Registro, más el recibo de sus honorarios.",
  },
  {
    titulo: "Datos del consorcio",
    detalle: "CUIT del consorcio y clave SUTERH.",
  },
];

// La torre con servicios: tres frentes donde se va la expensa y la norma que los ordena.
const frentesTorre = [
  {
    icon: ShieldCheck,
    norma: "Art. 2067, inc. h)",
    titulo: "Seguros que cubran lo que la torre tiene",
    texto:
      "El Código pide un seguro integral de consorcio con incendio, responsabilidad civil y demás riesgos de práctica, y permite sumar los que la asamblea decida. La Ley 941 agrega la cobertura del personal dependiente y de terceros. En un edificio con ascensores, cocheras y amenities, revisamos cada año sumas aseguradas y vencimientos, y el consejo ve la póliza en la liquidación.",
  },
  {
    icon: Calculator,
    norma: "Art. 2041 y Ley 941, art. 10",
    titulo: "Contratistas con nombre, CUIT y trabajo",
    texto:
      "Los ascensores, los locales de servicios centrales y los artefactos de beneficio común son partes comunes, y su mantenimiento es expensa de todos. Por eso cada abono o reparación sale con el contratista identificado, su matrícula cuando la actividad la exige y el detalle de lo que hizo. Los presupuestos grandes llegan al consejo con alternativas.",
  },
  {
    icon: Landmark,
    norma: "Arts. 2046, 2064 y 2067, inc. d)",
    titulo: "Un fondo de reserva que no se toca solo",
    texto:
      "Cada propietario contribuye a integrar el fondo de reserva. Para usarlo ante un gasto imprevisto y mayor que los ordinarios, el administrador necesita autorización previa del consejo. En una torre, donde un motor de ascensor o una bomba pueden fallar sin aviso, ese fondo es lo que puede evitar salir a pedir una extraordinaria de urgencia.",
  },
];

const barrioFacts = [
  {
    icon: MapPin,
    title: "Comuna 13, del río a las vías",
    text: "Los límites oficiales de Belgrano incluyen la Avenida Figueroa Alcorta, Olleros, las vías del Mitre (ramal Tigre), Zabala, la Avenida Cabildo, la Avenida Forest, la Avenida Monroe, Congreso, la Avenida Del Libertador y el Río de la Plata. Belgrano ocupa 6,8 kilómetros cuadrados según el Gobierno de la Ciudad, tiene más de cien mil habitantes y comparte la Comuna 13 con Núñez y Colegiales.",
  },
  {
    icon: Landmark,
    title: "De pueblo a capital provisoria",
    text: "Fue parte del Pago de los Montes Grandes, y el Camino Real, hoy Avenida Cabildo, era la salida hacia el norte. El 6 de diciembre de 1857 un decreto aprobó el nombre del pueblo en homenaje al creador de la bandera. En 1880 fue sede provisoria del gobierno nacional: las cámaras sesionaron en la municipalidad, hoy Museo Histórico Sarmiento. En 1887 pasó a ser barrio de la Capital.",
  },
  {
    icon: Trees,
    title: "Barrancas, La Redonda y el Larreta",
    text: "Las Barrancas de Belgrano son el parque que conserva la barranca natural del terreno. Cerca están la Iglesia de la Inmaculada Concepción, La Redonda, inaugurada en 1878, y el Museo de Arte Español Enrique Larreta. Las casonas señoriales conviven con edificios modernos. El barrio celebra su día el 23 de noviembre, por la fundación del pueblo en 1855.",
  },
  {
    icon: TrainFront,
    title: "Subte D, dos estaciones del Mitre",
    text: "La línea D para en José Hernández, Juramento y Congreso de Tucumán, y el Mitre tiene las estaciones Belgrano C y Belgrano R. Cabildo concentra el comercio; Juramento, Monroe, Congreso, Libertador y Figueroa Alcorta ordenan el resto del barrio.",
  },
];

export default function BelgranoPage() {
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
                  name: "Administración de consorcios en Belgrano",
                  url: `${site.url}/administracion-de-consorcios-belgrano`,
                },
              ]),
              barrioServiceSchema("Belgrano", "/administracion-de-consorcios-belgrano"),
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
                Belgrano · Comuna 13 · CABA
              </p>
              <h1 className="mt-3 font-display text-[2.5rem] leading-[1.04] tracking-[-0.025em] text-balance text-navy-900 sm:text-[3.5rem]">
                Administración de consorcios en Belgrano
              </h1>
              <p className="mt-6 max-w-[60ch] text-[18px] leading-relaxed text-ink-800">
                En Belgrano hay torres con personal, varios ascensores y cocheras, y
                consejos de propietarios que leen la expensa con lupa. Somos un estudio
                de contadores públicos inscripto en el Registro de la Ciudad, y armamos
                cada liquidación para que cualquier auditor pueda seguirla de punta a
                punta.
              </p>
              <p className="mt-5 max-w-[60ch] text-[16px] leading-relaxed text-ink-700">
                La Ley 941 permite que la asamblea pida una auditoría contable y un
                informe de control de gestión sobre el trabajo del administrador. Nos
                parece bien que exista. Una administradora de consorcios que trabaja
                con comprobantes ordenados no tiene motivo para temerle.
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
                  src="/zonas/barrancas-de-belgrano.jpg"
                  alt="Torres de departamentos asomando entre los árboles de las Barrancas de Belgrano"
                  width={1600}
                  height={1200}
                  priority
                  className="h-[320px] w-full object-cover sm:h-[400px] lg:h-[520px]"
                  sizes="(min-width: 1024px) 40vw, 100vw"
                />
              </div>
              <figcaption className="mt-2 text-[13px] text-ink-700/70">
                Torres sobre las Barrancas de Belgrano. Foto:{" "}
                <a href="https://commons.wikimedia.org/wiki/File:Barrancas_de_Belgrano_-_CABA.JPG" target="_blank" rel="noopener noreferrer" className="underline decoration-ink-700/30 underline-offset-2 hover:decoration-ink-700">Patricia Curcio</a>,{" "}
                <a href="https://creativecommons.org/licenses/by-sa/3.0/deed.es" target="_blank" rel="noopener noreferrer" className="underline decoration-ink-700/30 underline-offset-2 hover:decoration-ink-700">CC BY-SA 3.0</a>.
              </figcaption>
            </figure>
          </div>
        </Container>
      </Section>

      {/* DOS BELGRANOS, LA MISMA PREGUNTA */}
      <Section tone="muted" spacing="default">
        <Container>
          <Reveal>
            <div className="max-w-[62ch]">
              <p className="text-xs font-medium uppercase tracking-[0.18em] text-terra-700">
                Un barrio, varios edificios
              </p>
              <h2 className="mt-3 font-display text-[2rem] leading-[1.05] tracking-[-0.02em] text-balance text-navy-900 sm:text-[2.5rem]">
                Dos Belgranos, la misma pregunta: en qué se gasta
              </h2>
              <p className="mt-5 text-[16.5px] leading-relaxed text-ink-700">
                Del PH con jardín de Belgrano R a la torre frente a
                Cabildo cambia casi todo: la cantidad de unidades, los servicios, el
                tamaño de la expensa. Lo que no cambia es lo que preguntan los
                propietarios cuando llega la liquidación.
              </p>
            </div>
          </Reveal>
          <Reveal delay={0.08}>
            <dl className="mt-12 divide-y divide-cream-300 border-y border-cream-300">
              {perfiles.map((p) => (
                <div key={p.zona} className="grid grid-cols-1 gap-6 py-9 lg:grid-cols-12 lg:gap-10">
                  <dt className="flex items-center gap-3 lg:col-span-3 lg:items-start">
                    <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-cream-50 ring-1 ring-cream-300">
                      <p.icon aria-hidden="true" strokeWidth={1.75} className="h-5 w-5 text-terra-700" />
                    </span>
                    <span className="font-display text-[1.45rem] leading-snug text-navy-900 lg:mt-1.5">
                      {p.zona}
                    </span>
                  </dt>
                  <dd className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:col-span-9 lg:gap-10">
                    <div>
                      <p className="text-xs font-medium uppercase tracking-[0.18em] text-ink-700/80">
                        El edificio
                      </p>
                      <p className="mt-2 text-[15.5px] leading-relaxed text-ink-700">{p.edificio}</p>
                    </div>
                    <div>
                      <p className="text-xs font-medium uppercase tracking-[0.18em] text-ink-700/80">
                        Adónde va la expensa
                      </p>
                      <p className="mt-2 text-[15.5px] leading-relaxed text-ink-800">{p.gasto}</p>
                    </div>
                  </dd>
                </div>
              ))}
            </dl>
          </Reveal>
        </Container>
      </Section>

      {/* AUDITORÍA Y CONTROL DE GESTIÓN */}
      <Section tone="default" spacing="default">
        <Container>
          <Reveal>
            <div className="max-w-[62ch]">
              <p className="text-xs font-medium uppercase tracking-[0.18em] text-terra-700">
                Auditoría y control de gestión
              </p>
              <h2 className="mt-3 font-display text-[2rem] leading-[1.05] tracking-[-0.02em] text-balance text-navy-900 sm:text-[2.5rem]">
                Lo que la asamblea puede exigirle a quien administra
              </h2>
              <p className="mt-5 text-[16.5px] leading-relaxed text-ink-700">
                No siempre se tiene presente, pero la{" "}
                <a href={LEY_941_URL} target="_blank" rel="noopener noreferrer" className={linkClass}>
                  Ley 941 de la Ciudad
                </a>{" "}
                les da una herramienta concreta para revisar a su administración. El
                artículo 9º obliga al administrador a someterse a ella cuando la
                asamblea lo decide.
              </p>
            </div>
          </Reveal>

          <Reveal delay={0.06}>
            <figure className="mt-12 max-w-[68ch] border-l-2 border-terra-700 pl-6 sm:pl-8">
              <blockquote className="font-display text-[1.35rem] leading-[1.45] tracking-[-0.01em] text-navy-900 sm:text-[1.6rem]">
                <p>
                  «La gestión del Administrador de Consorcios de Propiedad Horizontal
                  debe, siempre que la Asamblea Ordinaria o Extraordinaria lo disponga,
                  ser auditada contablemente y acompañada de un informe de control de
                  gestión realizado por Profesionales de Ciencias Económicas.»
                </p>
              </blockquote>
              <figcaption className="mt-4 text-[14px] leading-relaxed text-ink-700">
                Ley 941, artículo 9º. La misma norma permite sumar una auditoría legal
                a cargo de un profesional del derecho, y exige que los profesionales
                tengan «matrícula habilitante en la Ciudad Autónoma de Buenos Aires y
                su firma estar legalizada».
              </figcaption>
            </figure>
          </Reveal>

          <Reveal delay={0.1}>
            <div className="mt-14 grid grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-16">
              <div className="lg:col-span-4">
                <h3 className="font-display text-[1.5rem] leading-snug text-navy-900">
                  Por qué importa que administre un contador
                </h3>
                <p className="mt-4 text-[15.5px] leading-relaxed text-ink-700">
                  La auditoría la dispone la asamblea, y quien la firma tiene que ser un
                  profesional matriculado, independiente de quien administra. Lo que sí
                  depende de nosotros es que el trabajo llegue auditable. Llevamos los libros en legal forma, archivamos las
                  liquidaciones en orden cronológico y los fondos están en una cuenta
                  bancaria a nombre del consorcio.
                </p>
                <p className="mt-4 text-[15.5px] leading-relaxed text-ink-700">
                  El piso de esa revisión lo fija el artículo 10: lo que toda
                  liquidación mensual tiene que mostrar. Más detalle en la guía sobre{" "}
                  <a href="/blog/ley-941-obligaciones-administrador-consorcios" className={linkClass}>
                    las obligaciones del administrador según la Ley 941
                  </a>
                  .
                </p>
              </div>

              <div className="lg:col-span-8">
                <div className="rounded-2xl bg-cream-100 p-7 ring-1 ring-cream-300 sm:p-9">
                  <p className="text-xs font-medium uppercase tracking-[0.18em] text-terra-700">
                    Qué tiene que traer cada liquidación (Ley 941, art. 10)
                  </p>
                  <ul className="mt-6 grid grid-cols-1 gap-x-8 gap-y-5 sm:grid-cols-2">
                    {checklistArt10.map((item) => (
                      <li key={item.titulo} className="grid grid-cols-[auto_1fr] gap-3">
                        <span className="mt-0.5 flex h-6 w-6 items-center justify-center rounded-md bg-cream-50 ring-1 ring-cream-300">
                          <Check aria-hidden="true" strokeWidth={2} className="h-3.5 w-3.5 text-terra-700" />
                        </span>
                        <div>
                          <p className="font-medium leading-snug text-navy-900">{item.titulo}</p>
                          <p className="mt-1 text-[14.5px] leading-relaxed text-ink-700">
                            {item.detalle}
                          </p>
                        </div>
                      </li>
                    ))}
                  </ul>
                  <p className="mt-7 border-t border-cream-300 pt-5 text-[14px] leading-relaxed text-ink-700">
                    Si en su expensa falta alguno de estos datos, vale la pena
                    preguntarlo en la próxima asamblea. Las funciones del consejo en esa
                    revisión están en la nota sobre{" "}
                    <a href="/blog/funciones-del-consejo-de-propietarios" className={linkClass}>
                      el consejo de propietarios
                    </a>
                    .
                  </p>
                </div>
              </div>
            </div>
          </Reveal>
        </Container>
      </Section>

      {/* LA TORRE CON SERVICIOS */}
      <Section tone="muted" spacing="default">
        <Container>
          <Reveal>
            <div className="grid grid-cols-1 gap-6 lg:grid-cols-12 lg:gap-16">
              <div className="lg:col-span-5">
                <p className="text-xs font-medium uppercase tracking-[0.18em] text-terra-700">
                  La torre con servicios
                </p>
                <h2 className="mt-3 font-display text-[2rem] leading-[1.05] tracking-[-0.02em] text-balance text-navy-900 sm:text-[2.5rem]">
                  Seguros, contratistas y fondo de reserva
                </h2>
              </div>
              <p className="text-[16.5px] leading-relaxed text-ink-700 lg:col-span-7 lg:pt-8">
                En un edificio grande la expensa se reparte según la parte indivisa de
                cada unidad, como fija el artículo 2046 del{" "}
                <a href={CCYC_URL} target="_blank" rel="noopener noreferrer" className={linkClass}>
                  Código Civil y Comercial
                </a>
                . Son pocos rubros los que explican casi todo el monto, y en esos tres
                concentramos el control.
              </p>
            </div>
          </Reveal>
          <Reveal delay={0.08}>
            <div className="mt-12 grid grid-cols-1 gap-6 lg:grid-cols-3">
              {frentesTorre.map((f) => (
                <article key={f.titulo} className="flex flex-col rounded-2xl bg-cream-50 p-7 ring-1 ring-cream-300">
                  <div className="flex items-center justify-between gap-3">
                    <span className="flex h-11 w-11 items-center justify-center rounded-full bg-cream-100 ring-1 ring-cream-300">
                      <f.icon aria-hidden="true" strokeWidth={1.75} className="h-5 w-5 text-terra-700" />
                    </span>
                    <span className="rounded-full px-3 py-1 text-[12px] font-medium text-terra-700 ring-1 ring-cream-300">
                      {f.norma}
                    </span>
                  </div>
                  <h3 className="mt-5 font-display text-[1.25rem] leading-snug text-navy-900">
                    {f.titulo}
                  </h3>
                  <p className="mt-3 text-[15.5px] leading-relaxed text-ink-700">{f.texto}</p>
                </article>
              ))}
            </div>
          </Reveal>
          <Reveal delay={0.12}>
            <p className="mt-10 max-w-[70ch] text-[15.5px] leading-relaxed text-ink-700">
              Las ordinarias cubren la administración y la reparación de partes comunes;
              las extraordinarias son las que la asamblea dispone por resolución. En la
              liquidación van por separado, y la diferencia está explicada en la nota
              sobre{" "}
              <a href="/blog/expensas-ordinarias-y-extraordinarias-diferencias" className={linkClass}>
                expensas ordinarias y extraordinarias
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
                  Del Camino Real a la Avenida Cabildo
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
                    title="Belgrano en Google Maps"
                    src="https://www.google.com/maps?q=Belgrano,+Ciudad+Aut%C3%B3noma+de+Buenos+Aires&z=14&hl=es&output=embed"
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    className="h-full w-full border-0"
                  />
                </div>
                <p className="mt-2 text-[13px] text-ink-700/70">
                  Belgrano, en la Comuna 13, entre el Río de la Plata y las vías del
                  Mitre.
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
                  Una administración pensada para ser revisada
                </h2>
                <p className="mt-5 max-w-[56ch] text-[16px] leading-relaxed text-ink-700">
                  Todos los meses emitimos la liquidación con cada gasto identificado y
                  su respaldo, pagamos a proveedores y contratistas desde la cuenta del
                  edificio y liquidamos los sueldos del personal. Convocamos las
                  asambleas con lugar, día, temario y horario de comienzo y
                  finalización, como pide la ley, y las hacemos en el edificio.
                </p>
                <p className="mt-4 max-w-[56ch] text-[16px] leading-relaxed text-ink-700">
                  El consejo tiene acceso a facturas, contratos y extractos cuando lo
                  pida, y el certificado de deudas y créditos sale en los tres días
                  hábiles que marca el Código. El honorario se acuerda con la asamblea,
                  sin cámara que lo fije; explicamos cómo en la nota sobre{" "}
                  <a href="/blog/honorarios-del-administrador-de-consorcio" className={linkClass}>
                    honorarios del administrador
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
                <div className="w-full rounded-2xl bg-cream-50 p-7 ring-1 ring-cream-300">
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
        eyebrow="Antes de pedir la auditoría"
        title="Guías para leer la liquidación y controlar la gestión"
        tags={["transparencia", "consejo de propietarios", "expensas", "normativa"]}
        tone="default"
      />

      <FaqSection
        items={belgranoFaq}
        title="Preguntas frecuentes sobre administración en Belgrano"
        tone="muted"
      />

      {/* CTA FINAL */}
      <Section tone="navy" spacing="default">
        <Container>
          <Reveal>
            <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:items-end">
              <div className="lg:col-span-8">
                <h2 className="font-display text-[2rem] leading-[1.05] tracking-[-0.02em] text-balance text-cream-50 sm:text-[2.5rem]">
                  ¿El consejo quiere entender cada renglón de la torre?
                </h2>
                <p className="mt-4 max-w-[58ch] text-[16.5px] leading-relaxed text-cream-100/85">
                  Envíennos una liquidación reciente. La leemos contra lo que pide el
                  artículo 10, les señalamos qué datos faltan y les proponemos cómo
                  administraríamos su edificio, sin costo.
                </p>
              </div>
              <div className="lg:col-span-4 lg:flex lg:justify-end">
                <Button href="/contacto" variant="primary" size="lg">
                  Enviar la liquidación
                </Button>
              </div>
            </div>
          </Reveal>
        </Container>
      </Section>
    </>
  );
}
