import type { Metadata } from "next";
import Image from "next/image";
import {
  BadgeCheck,
  Building,
  Building2,
  Calculator,
  Castle,
  Church,
  Columns3,
  Landmark,
  MapPin,
  ScrollText,
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
  title: "Administración de Consorcios en Recoleta",
  description:
    "Edificios con historia en Recoleta: contadores con RPA 8192 para consorcios con fachada ornamentada, protección patrimonial y obras que piden visado.",
  path: "/administracion-de-consorcios-recoleta",
});

const linkClass =
  "font-medium text-terra-700 underline decoration-terra-700/30 underline-offset-4 transition-colors hover:decoration-terra-700";

const CCYC_URL =
  "https://servicios.infoleg.gob.ar/infolegInternet/anexos/235000-239999/235975/texact.htm";
const CODIGO_URBANISTICO_URL =
  "https://static.buenosaires.gob.ar/sites/default/files/2026-05/cu_cuerpo_principal.pdf";
const CE_PROYECTO_URL =
  "https://www.cedom.gob.ar/legislacion/normas/codigos/edifica/index4.html";
const CE_CONSERVACION_URL =
  "https://www.cedom.gob.ar/legislacion/normas/codigos/edifica/index6.html";
const LEY_3106_URL = "https://boletinoficial.buenosaires.gob.ar/normativaba/norma/130314";

// FAQ propia de la landing: ángulo protección patrimonial y fachadas antiguas.
// Sin honorarios, cambio de administrador, auditoría ni amenities (ya están en las otras siete).
const recoletaFaq: FaqItem[] = [
  {
    question: "¿Cómo sabemos si nuestro edificio está catalogado?",
    answer:
      "El Código Urbanístico manda que el organismo competente lleve un Registro de Bienes Catalogados, que sus constancias sean públicas y que la incorporación de un inmueble conste en la ficha parcelaria. Ese es el dato que hay que pedir antes de proyectar una obra. Ojo con la catalogación preventiva: el Poder Ejecutivo puede incluir un edificio en el catálogo preventivo y, mientras dure, se le debe denegar cualquier pedido de demolición total.",
  },
  {
    question: "Si un propietario vende o alquila su unidad, ¿la protección deja de aplicarse?",
    answer:
      "No. El artículo 9.1 del Código Urbanístico dice que las obligaciones de protección siguen vigentes aunque los bienes sean vendidos, alquilados o sometidos a cualquier otra disposición de sus propietarios. Quien compra una unidad en un edificio protegido compra también esas reglas.",
  },
  {
    question: "¿Se le pueden agregar pisos a un edificio catalogado?",
    answer:
      "Depende del nivel. Sumar volumen es una obra de grado de intervención 4, y el Código Urbanístico solo admite ese grado en los edificios con protección cautelar. Aun así, el nuevo volumen tiene que integrarse con el edificio protegido y su propuesta pasa por el organismo competente. Dentro del consorcio, una obra que gravita o modifica la estructura de manera sustancial requiere unanimidad, según el artículo 2052 del Código Civil y Comercial.",
  },
  {
    question: "¿La certificación de fachada es distinta en un edificio protegido?",
    answer:
      "La periodicidad no cambia: el artículo 5.1.2 del Código de la Edificación la fija por antigüedad, y un edificio de más de 70 años certifica cada 4. Lo que cambia es la reparación que pida el informe. En un inmueble catalogado, toda intervención tiene que ser evaluada y visada por el organismo competente en materia de patrimonio, según el artículo 3.2 del mismo Código.",
  },
  {
    question: "¿Quién paga la restauración del frente?",
    answer:
      "El consorcio. Los muros exteriores son cosas necesariamente comunes (artículo 2041 del Código Civil y Comercial), y su reparación para mantener la seguridad y el decoro del inmueble es expensa común ordinaria (artículo 2048). Si la asamblea decide financiar una obra grande por fuera del presupuesto, esa cuota es expensa extraordinaria. Cada propietario paga en la proporción de su parte indivisa.",
  },
  {
    question: "¿Pueden administrar un edificio en Recoleta?",
    answer:
      "Sí. La oficina del estudio está en Villa Devoto y administramos consorcios en toda la Ciudad. Las asambleas se hacen en el edificio, y los presupuestos, informes técnicos y visados de cada obra quedan a disposición del consejo.",
  },
];

// Los tres niveles de protección edilicia del art. 9.1.3.2.2 del Código Urbanístico
// y los grados de intervención que admite cada uno.
const niveles = [
  {
    icon: Castle,
    nombre: "Integral",
    protege: "La totalidad del edificio, con todas sus características arquitectónicas y sus formas de ocupar el espacio.",
    paraQuien: "Edificios de interés especial que, por su valor histórico o arquitectónico, se volvieron hitos urbanos.",
    grados: "Grado 1 y obras no preferentes del grado 2.",
  },
  {
    icon: Columns3,
    nombre: "Estructural",
    protege: "El exterior, la tipología y los elementos básicos que definen cómo se articula y ocupa el espacio. Admite cambios que no alteren el volumen.",
    paraQuien: "Edificios singulares o tipológicos que caracterizan su entorno o son testimonio de la memoria de la comunidad.",
    grados: "Grados 1 y 2, y obras no preferentes del grado 3.",
  },
  {
    icon: Building,
    nombre: "Cautelar",
    protege: "La imagen característica del área, previniendo actuaciones que contradigan el tejido y la morfología.",
    paraQuien: "Edificios que son la referencia formal y cultural del área y le dan sentido al conjunto.",
    grados: "Grados 1, 2, 3 y 4.",
  },
];

// Cada caso visto desde las dos normas que se cruzan: la del consorcio y la del patrimonio.
const casos = [
  {
    caso: "Reparar cornisas, revoques y balcones del frente",
    consorcio:
      "Son muros exteriores comunes. Conservarlos es expensa ordinaria y tarea del administrador, que debe atender la conservación de las partes comunes y la seguridad de la estructura.",
    consorcioNorma: "CCyC, arts. 2041, 2048 y 2067",
    ciudad:
      "La consolidación y el mantenimiento entran en el grado 1, que admiten los tres niveles. Igual, toda intervención en un inmueble protegido debe ser evaluada y visada por el organismo competente.",
    ciudadNorma: "Código Urbanístico, 9.1.3.2.2.1; Código de la Edificación, 3.2",
  },
  {
    caso: "Un propietario quiere cambiar las ventanas que dan a la calle",
    consorcio:
      "Las puertas y ventanas son cosas propias de la unidad, pero se abren sobre el frente, que es muro exterior y parte común.",
    consorcioNorma: "CCyC, arts. 2043 y 2041, inc. i)",
    ciudad:
      "Con protección especial, cualquier intervención edilicia requiere autorización. Y en un edificio que tenía plantas unificadas y después se subdividió, las carpinterías, toldos y carteles deben seguir un criterio unitario.",
    ciudadNorma: "Código Urbanístico, 9.1.3.2 y grado 2",
  },
  {
    caso: "Poner un toldo, un cartel o luces nuevas en la fachada",
    consorcio:
      "Se apoyan sobre un muro exterior, que es parte común. Conviene que el consorcio lo trate según su reglamento antes de pedir la autorización.",
    consorcioNorma: "CCyC, art. 2041, inc. i)",
    ciudad:
      "La instalación o el cambio de iluminación, los anuncios y los toldos en un predio con protección especial requieren autorización del organismo competente.",
    ciudadNorma: "Código Urbanístico, 9.1.3.2",
  },
  {
    caso: "Sumar un piso o un volumen sobre la terraza",
    consorcio:
      "Si la obra gravita o modifica la estructura de manera sustancial, hace falta el acuerdo unánime de los propietarios, aunque no se eleven pisos ni se excave.",
    consorcioNorma: "CCyC, art. 2052",
    ciudad:
      "Es grado 4: solo lo admite la protección cautelar, con un volumen que se integre de modo armónico al edificio protegido y la autorización del organismo competente.",
    ciudadNorma: "Código Urbanístico, grados de intervención",
  },
  {
    caso: "Alguien hizo una obra sin permiso",
    consorcio:
      "El administrador tiene que denunciar ante el Gobierno de la Ciudad las obras ejecutadas en el edificio sin permiso o sin aviso de obra.",
    consorcioNorma: "Ley 941, art. 9º",
    ciudad:
      "Regularizar una obra en contravención en un edificio catalogado o en un Área de Protección Histórica requiere la intervención del organismo competente, que fija el alcance de la regularización.",
    ciudadNorma: "Código de la Edificación, 2.1.14",
  },
];

// Ornamentos que el art. 5.1.2 del Código de la Edificación nombra textualmente.
const ornamentos = [
  "Ménsulas",
  "Cartelas",
  "Modillones",
  "Cornisas",
  "Cariátides",
  "Atlantes",
  "Pináculos",
  "Crestería",
  "Balaustres",
  "Pretiles",
];

const barrioFacts = [
  {
    icon: MapPin,
    title: "La Comuna 2 es un solo barrio",
    text: "Recoleta es el único barrio de la Comuna 2. Entre sus límites oficiales están la calle Uruguay, Montevideo, la Avenida Costanera, Jerónimo Salguero, Tagle, Las Heras, la Avenida Coronel Díaz, Mario Bravo y la Avenida Córdoba. La ficha del Gobierno de la Ciudad le asigna 5,9 kilómetros cuadrados y 165.494 habitantes según el censo de 2001.",
  },
  {
    icon: Church,
    title: "De la chacra Los Ombúes al Cementerio del Norte",
    text: "El nombre viene del Convento de Recoletos Descalzos, levantado en la chacra Los Ombúes, que en el reparto de tierras de Juan de Garay de 1583 recibió Rodrigo Ortiz de Zarate, vecino fundador y primer alcalde. El 8 de julio de 1822 el gobierno de Martín Rodríguez destinó parte del huerto de los frailes al Cementerio del Norte, que para todos siguió siendo el de la Recoleta.",
  },
  {
    icon: Landmark,
    title: "La Petit París y su área protegida",
    text: "Tras la epidemia de fiebre amarilla de 1871, las familias del sur se mudaron al norte y levantaron mansiones de estilo francés que le dieron al barrio el apodo de Petit París. En 2009 la Ley 3106 creó el distrito APH 14 Ámbito Recoleta. El barrio celebra su aniversario el 12 de octubre.",
  },
];

export default function RecoletaPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify([
            breadcrumbSchema([
              { name: "Inicio", url: site.url },
              {
                name: "Administración de consorcios en Recoleta",
                url: `${site.url}/administracion-de-consorcios-recoleta`,
              },
            ]),
            barrioServiceSchema("Recoleta", "/administracion-de-consorcios-recoleta", metadata.description),
          ]),
        }}
      />

      {/* HERO: un solo párrafo y los chips debajo de los botones, para subir el CTA en mobile */}
      <Section spacing="tight" className="pt-24 sm:pt-28">
        <Container>
          <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-12 lg:gap-16">
            <div className="max-w-[64ch] lg:col-span-7">
              <p className="text-xs font-medium uppercase tracking-[0.18em] text-terra-700">
                Recoleta · Comuna 2 · CABA
              </p>
              <h1 className="mt-3 font-display text-[2.5rem] leading-[1.04] tracking-[-0.025em] text-balance text-navy-900 sm:text-[3.5rem]">
                Administración de consorcios en Recoleta
              </h1>
              <p className="mt-6 max-w-[58ch] text-[18px] leading-relaxed text-ink-800">
                Mansardas, balcones de hierro y frentes con ornamentos: en Recoleta,
                una obra en la fachada puede necesitar más que el voto de la asamblea.
                Somos contadores públicos inscriptos en el Registro de la Ciudad.
              </p>

              <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
                <Button href="/contacto" variant="primary" size="lg">
                  Pedir una propuesta sin cargo
                </Button>
                <Button href={`${site.contact.whatsappHref}?text=${encodeURIComponent("Hola, escribo por la administración de nuestro consorcio en Recoleta.")}`} variant="secondary" size="lg">
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
                  src="/zonas/avenida-alvear-y-callao-recoleta.jpg"
                  alt="Edificio de departamentos con mansarda, balcones de hierro forjado y frente de piedra en la esquina de Avenida Alvear y Callao"
                  width={1600}
                  height={1200}
                  priority
                  className="h-[320px] w-full object-cover sm:h-[400px] lg:h-[520px]"
                  sizes="(min-width: 1024px) 40vw, 100vw"
                />
              </div>
              <figcaption className="mt-2 text-[13px] text-ink-700/80">
                Avenida Alvear y Callao (recorte). Foto:{" "}
                <a href="https://commons.wikimedia.org/wiki/File:Buenos_Aires_-_Avenida_Alvear_-_20090104-o.jpg" target="_blank" rel="noopener noreferrer" className="underline decoration-ink-700/30 underline-offset-2 hover:decoration-ink-700">Barcex</a>,{" "}
                <a href="https://creativecommons.org/licenses/by-sa/3.0/deed.es" target="_blank" rel="noopener noreferrer" className="whitespace-nowrap underline decoration-ink-700/30 underline-offset-2 hover:decoration-ink-700">CC BY-SA 3.0</a>.
              </figcaption>
            </figure>
          </div>
        </Container>
      </Section>

      {/* NIVELES DE PROTECCIÓN */}
      <Section tone="muted" spacing="default">
        <Container>
          <Reveal>
            <div className="grid grid-cols-1 gap-6 lg:grid-cols-12 lg:gap-16">
              <div className="lg:col-span-5">
                <p className="text-xs font-medium uppercase tracking-[0.18em] text-terra-700">
                  Edificios protegidos
                </p>
                <h2 className="mt-3 font-display text-[2rem] leading-[1.05] tracking-[-0.02em] text-balance text-navy-900 sm:text-[2.5rem]">
                  Qué cuida la Ciudad cuando cataloga un edificio
                </h2>
              </div>
              <div className="lg:col-span-7 lg:pt-8">
                <p className="text-[16.5px] leading-relaxed text-ink-700">
                  El{" "}
                  <a href={CODIGO_URBANISTICO_URL} target="_blank" rel="noopener noreferrer" className={linkClass}>
                    Código Urbanístico
                  </a>{" "}
                  llama catalogación al instrumento que protege un edificio por su
                  valor urbanístico, arquitectónico, histórico cultural, singular o
                  ambiental. La catalogación determina la normativa de cada edificio y su
                  nivel de protección, y el nivel decide qué obras se pueden hacer.
                </p>
                <p className="mt-4 text-[16.5px] leading-relaxed text-ink-700">
                  Hay cuatro grados de intervención: el 1 restaura y mantiene, el 2
                  adapta el interior a usos nuevos, el 3 reforma el interior
                  conservando fachadas y cubiertas, y el 4 puede agregar volumen.
                </p>
              </div>
            </div>
          </Reveal>

          <Reveal delay={0.06}>
            <ul className="mt-12 grid grid-cols-1 gap-4 md:grid-cols-3">
              {niveles.map((n) => (
                <li
                  key={n.nombre}
                  className="flex flex-col rounded-2xl bg-cream-50 p-6 ring-1 ring-cream-300 sm:p-7"
                >
                  <div className="flex items-center gap-3">
                    <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-cream-100 ring-1 ring-cream-300">
                      <n.icon aria-hidden="true" strokeWidth={1.75} className="h-5 w-5 text-terra-700" />
                    </span>
                    <h3 className="font-display text-[1.35rem] leading-snug text-navy-900">
                      Protección {n.nombre.toLowerCase()}
                    </h3>
                  </div>
                  <p className="mt-5 text-xs font-medium uppercase tracking-[0.18em] text-ink-700/80">Protege</p>
                  <p className="mt-1.5 text-[15.5px] leading-relaxed text-ink-800">{n.protege}</p>
                  <p className="mt-4 text-[14.5px] leading-relaxed text-ink-700">{n.paraQuien}</p>
                  <div className="mt-auto pt-5">
                    <p className="border-t border-cream-300 pt-4 text-xs font-medium uppercase tracking-[0.18em] text-ink-700/80">
                      Obras admitidas
                    </p>
                    <p className="mt-1.5 text-[14.5px] font-medium leading-snug text-terra-700">{n.grados}</p>
                  </div>
                </li>
              ))}
            </ul>
          </Reveal>

          <Reveal delay={0.1}>
            <p className="mt-10 max-w-[72ch] text-[15.5px] leading-relaxed text-ink-700">
              Además de los edificios catalogados de forma individual, existen las
              Áreas de Protección Histórica, donde los inmuebles sin protección
              especial igual tienen que respetar los indicadores de edificabilidad del
              área. Y una regla
              que conviene tener presente en cada compraventa: según el artículo 9.1
              del Código, las obligaciones de protección siguen vigentes aunque la
              unidad se venda o se alquile.
            </p>
          </Reveal>
        </Container>
      </Section>

      {/* DOS NORMAS PARA CADA DECISIÓN */}
      <Section tone="default" spacing="default">
        <Container>
          <Reveal>
            <div className="max-w-[62ch]">
              <p className="text-xs font-medium uppercase tracking-[0.18em] text-terra-700">
                Dos normas para cada decisión
              </p>
              <h2 className="mt-3 font-display text-[2rem] leading-[1.05] tracking-[-0.02em] text-balance text-navy-900 sm:text-[2.5rem]">
                Lo que resuelve el consorcio y lo que autoriza la Ciudad
              </h2>
              <p className="mt-5 text-[16.5px] leading-relaxed text-ink-700">
                En un edificio protegido, que la asamblea apruebe una obra no alcanza.
                El{" "}
                <a href={CCYC_URL} target="_blank" rel="noopener noreferrer" className={linkClass}>
                  Código Civil y Comercial
                </a>{" "}
                ordena quién decide y quién paga; la normativa patrimonial dice si la
                obra se puede hacer y con qué visado. Estos son los cruces que más se
                repiten.
              </p>
            </div>
          </Reveal>

          <Reveal delay={0.08}>
            <ol className="mt-12 space-y-4">
              {casos.map((c, i) => (
                <li key={c.caso} className="rounded-2xl ring-1 ring-cream-300">
                  <h3 className="flex items-baseline gap-3 rounded-t-2xl bg-cream-100 px-5 py-4 font-display text-[1.2rem] leading-snug text-navy-900 sm:px-7">
                    <span aria-hidden="true" className="font-sans text-[13px] font-medium tabular-nums text-terra-700">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    {c.caso}
                  </h3>
                  <div className="grid grid-cols-1 divide-y divide-cream-300 md:grid-cols-2 md:divide-x md:divide-y-0">
                    <div className="px-5 py-5 sm:px-7">
                      <p className="text-xs font-medium uppercase tracking-[0.18em] text-ink-700/80">
                        En el consorcio
                      </p>
                      <p className="mt-2 text-[15.5px] leading-relaxed text-ink-800">{c.consorcio}</p>
                      <p className="mt-3 text-[12.5px] font-medium text-terra-700">{c.consorcioNorma}</p>
                    </div>
                    <div className="px-5 py-5 sm:px-7">
                      <p className="text-xs font-medium uppercase tracking-[0.18em] text-ink-700/80">
                        Ante la Ciudad
                      </p>
                      <p className="mt-2 text-[15.5px] leading-relaxed text-ink-800">{c.ciudad}</p>
                      <p className="mt-3 text-[12.5px] font-medium text-terra-700">{c.ciudadNorma}</p>
                    </div>
                  </div>
                </li>
              ))}
            </ol>
          </Reveal>

          <Reveal delay={0.12}>
            <p className="mt-10 max-w-[72ch] text-[15.5px] leading-relaxed text-ink-700">
              Para las mejoras sobre partes comunes, el artículo 2051 pide mayoría de
              propietarios e informe técnico previo, y si alguien va a juicio, el juez
              evalúa si la obra afecta el aspecto arquitectónico exterior o interior
              del inmueble. Cómo se cuentan esas mayorías está en la nota sobre{" "}
              <a href="/blog/asamblea-de-consorcio-quorum-y-mayorias" className={linkClass}>
                quórum y mayorías en la asamblea
              </a>
              .
            </p>
          </Reveal>
        </Container>
      </Section>

      {/* LA FACHADA CON ORNAMENTOS */}
      <Section tone="muted" spacing="default">
        <Container>
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-16">
            <Reveal className="lg:col-span-6">
              <p className="text-xs font-medium uppercase tracking-[0.18em] text-terra-700">
                La fachada antigua
              </p>
              <h2 className="mt-3 font-display text-[2rem] leading-[1.05] tracking-[-0.02em] text-balance text-navy-900 sm:text-[2.5rem]">
                Cariátides, cornisas y una certificación cada cuatro años
              </h2>
              <p className="mt-5 text-[16.5px] leading-relaxed text-ink-700">
                El artículo 5.1.2 del{" "}
                <a href={CE_CONSERVACION_URL} target="_blank" rel="noopener noreferrer" className={linkClass}>
                  Código de la Edificación
                </a>{" "}
                obliga a conservar el frente en perfecto estado de uso, seguridad,
                higiene y estética, y enumera sus elementos con un vocabulario que en
                Recoleta se ve en la vereda.
              </p>
              <ul className="mt-6 flex flex-wrap gap-2" aria-label="Ornamentos que nombra el artículo 5.1.2">
                {ornamentos.map((o) => (
                  <li
                    key={o}
                    className="rounded-full bg-cream-50 px-3.5 py-1.5 text-[13.5px] font-medium text-navy-900 ring-1 ring-cream-300"
                  >
                    {o}
                  </li>
                ))}
              </ul>
              <p className="mt-6 text-[16px] leading-relaxed text-ink-700">
                La certificación técnica se acelera con la edad: un edificio de más de
                55 años certifica cada 5, y uno de más de 70, cada 4. La verificación
                incluye las fijaciones, niveles, escuadra y cargas de cada elemento. La
                tabla completa y el trámite están en la guía de{" "}
                <a href="/blog/ley-257-caba-fachadas-y-balcones" className={linkClass}>
                  conservación de fachadas
                </a>
                .
              </p>
            </Reveal>

            <Reveal delay={0.08} className="lg:col-span-6 lg:pt-10">
              <div className="rounded-2xl bg-cream-50 p-7 ring-1 ring-cream-300 sm:p-8">
                <div className="flex items-center gap-3">
                  <ScrollText aria-hidden="true" strokeWidth={1.75} className="h-5 w-5 shrink-0 text-terra-700" />
                  <h3 className="font-display text-[1.3rem] leading-snug text-navy-900">
                    Si el informe pide obra en un edificio catalogado
                  </h3>
                </div>
                <dl className="mt-6 space-y-5">
                  <div>
                    <dt className="text-[15px] font-medium text-navy-900">Consulta previa</dt>
                    <dd className="mt-1 text-[15px] leading-relaxed text-ink-700">
                      En todos los casos hay que consultar antes al organismo competente en
                      materia de patrimonio, y la obra necesita su visado (
                      <a href={CE_PROYECTO_URL} target="_blank" rel="noopener noreferrer" className={linkClass}>
                        Código de la Edificación, 3.2 y 3.2.1
                      </a>
                      ).
                    </dd>
                  </div>
                  <div>
                    <dt className="text-[15px] font-medium text-navy-900">Diagnóstico antes de picar</dt>
                    <dd className="mt-1 text-[15px] leading-relaxed text-ink-700">
                      Antes de intervenir se analizan desajustes y patologías, a cargo de
                      profesionales competentes, con métodos no destructivos y las menores
                      técnicas invasivas posibles.
                    </dd>
                  </div>
                  <div>
                    <dt className="text-[15px] font-medium text-navy-900">Restaurar, no reemplazar</dt>
                    <dd className="mt-1 text-[15px] leading-relaxed text-ink-700">
                      Los elementos significativos se reparan o restauran; si alguna pieza se
                      sustituye, se identifica, se fecha y se marca para distinguirla del
                      original.
                    </dd>
                  </div>
                  <div>
                    <dt className="text-[15px] font-medium text-navy-900">Todo documentado</dt>
                    <dd className="mt-1 text-[15px] leading-relaxed text-ink-700">
                      Se registra el estado inicial, la intervención y el estado final de la
                      obra.
                    </dd>
                  </div>
                </dl>
                <p className="mt-6 text-[13px] leading-relaxed text-ink-700/80">
                  Los tres últimos puntos son criterios generales del Código Urbanístico
                  para intervenir edificios catalogados.
                </p>
              </div>
            </Reveal>
          </div>

          <Reveal delay={0.12}>
            <p className="mt-12 max-w-[72ch] text-[15.5px] leading-relaxed text-ink-700">
              Para la caja del consorcio, eso suma pasos antes de empezar: consulta,
              visado y profesionales con más tareas. Por eso conviene que la fachada tenga su previsión en el{" "}
              <a href="/blog/fondo-de-reserva-del-consorcio" className={linkClass}>
                fondo de reserva
              </a>{" "}
              y que la diferencia entre lo que es mantenimiento y lo que vota la asamblea
              quede clara desde el principio, como explicamos en la nota sobre{" "}
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
                  Del convento de los recoletos a la Petit París
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
                  Fuentes: ficha del barrio del Gobierno de la Ciudad y{" "}
                  <a href={LEY_3106_URL} target="_blank" rel="noopener noreferrer" className="underline decoration-ink-700/30 underline-offset-2 hover:decoration-ink-700">
                    Ley 3106
                  </a>{" "}
                  en el Boletín Oficial porteño.
                </p>
              </div>
              <div className="lg:col-span-6 lg:flex lg:flex-col lg:justify-center">
                <div className="relative isolate z-0 h-[320px] w-full overflow-hidden rounded-lg border border-cream-300 bg-cream-100 sm:h-[420px]">
                  <iframe
                    title="Recoleta en Google Maps"
                    src="https://www.google.com/maps?q=Recoleta,+Ciudad+Aut%C3%B3noma+de+Buenos+Aires&z=14&hl=es&output=embed"
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    className="h-full w-full border-0"
                  />
                </div>
                <p className="mt-2 text-[13px] text-ink-700/80">
                  Recoleta, en la Comuna 2, entre el río y la Avenida Córdoba.
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
                  El expediente del edificio, antes que la obra
                </h2>
                <p className="mt-5 max-w-[56ch] text-[16px] leading-relaxed text-ink-700">
                  Cuando tomamos un consorcio pedimos lo que define qué se puede hacer:
                  el reglamento de propiedad horizontal, la antigüedad del edificio para
                  la fachada, y si tiene catalogación o está dentro de un área protegida.
                  Con eso sabemos qué obras van a necesitar visado y cuánto tiempo hay que
                  prever antes de contratar.
                </p>
                <p className="mt-4 max-w-[56ch] text-[16px] leading-relaxed text-ink-700">
                  Cada presupuesto llega al consejo con el profesional que firma, el
                  alcance del trabajo y si requiere trámite patrimonial. Después, la
                  liquidación muestra cada pago con su respaldo. El rol del consejo en ese
                  control está en la nota sobre{" "}
                  <a href="/blog/funciones-del-consejo-de-propietarios" className={linkClass}>
                    el consejo de propietarios
                  </a>
                  , y el detalle de cada plan, en{" "}
                  <a href="/servicios" className={linkClass}>
                    servicios
                  </a>
                  . Para un consorcio que evalúa el cambio, contamos{" "}
                  <a href="/blog/como-cambiar-de-administrador-de-consorcio" className={linkClass}>
                    los pasos para cambiar de administración
                  </a>{" "}
                  y{" "}
                  <a href="/blog/honorarios-del-administrador-de-consorcio" className={linkClass}>
                    qué honorarios y gastos se cobran aparte
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
                    La oficina está en Villa Devoto y administramos en toda la Ciudad. Las
                    asambleas se hacen en su edificio, en Recoleta.
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
        eyebrow="Para el consejo de un edificio antiguo"
        title="Guías sobre fachadas, obras y partes comunes"
        tags={["fachadas", "obligaciones CABA", "propiedad horizontal"]}
        tone="default"
      />

      <FaqSection
        items={recoletaFaq}
        title="Preguntas frecuentes sobre administración en Recoleta"
        tone="muted"
      />

      {/* CTA FINAL */}
      <Section tone="navy" spacing="default">
        <Container>
          <Reveal>
            <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:items-end">
              <div className="lg:col-span-8">
                <h2 className="font-display text-[2rem] leading-[1.05] tracking-[-0.02em] text-balance text-cream-50 sm:text-[2.5rem]">
                  ¿Tienen una obra de fachada en puerta?
                </h2>
                <p className="mt-4 max-w-[58ch] text-[16.5px] leading-relaxed text-cream-100/85">
                  Envíennos la dirección del edificio y la última liquidación. Les
                  contamos qué habría que revisar antes de contratar y cómo
                  administraríamos el consorcio, sin costo.
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
