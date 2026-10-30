import { site } from "@/content/site";
import { zoneHrefs } from "@/content/zones";
import { getAllPosts } from "@/lib/blog";

// llms.txt generado en build desde las notas y las landings publicadas. Antes era un
// archivo estático en public/ y quedó desfasado (listaba 2 de 18 notas): así cada nota
// nueva o cada barrio sumado a `zoneHrefs` entra solo, sin acordarse de editarlo.
export const dynamic = "force-static";

// Una línea por landing de barrio (el ángulo propio de cada una). Si se publica un
// barrio nuevo sin línea acá, igual entra con la descripción genérica.
const barrioSummaries: Record<string, string> = {
  "Villa Devoto": "oficina del estudio en el barrio, edificios chicos y PH, supervisión presencial.",
  "Villa del Parque": "consorcios nuevos y PH de la Comuna 11, primera asamblea y asambleas bien llevadas.",
  "Monte Castro": "PH de pocas unidades, edificios con local a la calle y consorcios con encargado.",
  "Villa Pueyrredón": "edificios con décadas de antigüedad y calendario de certificación de fachadas.",
  Caballito: "edificios con encargado: liquidación de sueldos bajo convenio y nómina visible en las expensas.",
  Belgrano: "torres de Cabildo y PH de Belgrano R, liquidaciones preparadas para auditoría y control del consejo.",
  Palermo: "torres con amenities: ascensores, matafuegos, fachada y pólizas con sus vencimientos.",
  Recoleta: "edificios con historia, fachadas ornamentadas, protección patrimonial y obras con visado.",
  "Villa Urquiza": "edificios nuevos: documentación de obra y plazos para reclamar fallas a la desarrolladora.",
};

export function GET() {
  const u = (path: string) => `${site.url}${path}`;
  const posts = getAllPosts();
  const barrios = Object.entries(zoneHrefs) as [string, string][];

  const lines = [
    `# ${site.name}`,
    "",
    `> Estudio contable matriculado especializado en la administración profesional de consorcios (residenciales y corporativos) en la Ciudad Autónoma de Buenos Aires (CABA), Argentina. En actividad desde ${site.founded}. Matrículas ${site.registries.map((r) => r.short).join(" y ")}. Cuentas bancarias a nombre del consorcio y rendición de expensas documentada. Titular: ${site.principal.name}, ${site.principal.credential}.`,
    "",
    "## Servicios",
    `- [Servicios de administración de consorcios](${u("/servicios")}): liquidación de expensas, control financiero y presupuestario, personal del edificio, obras y mantenimiento, asambleas y guardia para emergencias edilicias.`,
    "",
    "## Administración de consorcios por barrio",
    ...barrios.map(
      ([zone, href]) =>
        `- [Administración de consorcios en ${zone}](${u(href)}): ${barrioSummaries[zone] ?? `administración de consorcios en ${zone}, CABA.`}`,
    ),
    "",
    "## Institucional",
    `- [Nosotros](${u("/nosotros")}): el estudio, su titular, matrículas y forma de trabajo.`,
    `- [Contacto](${u("/contacto")}): WhatsApp, teléfono, formulario y datos del estudio. Atención: ${site.hours.label.toLowerCase()}.`,
    "",
    "## Blog",
    `- [Blog](${u("/blog")}): notas sobre administración de consorcios, propiedad horizontal y expensas en CABA, firmadas por ${site.principal.name}.`,
    ...posts.map((p) => `- [${p.title}](${u(`/blog/${p.slug}`)}): ${p.description}`),
    "",
  ];

  return new Response(lines.join("\n"), {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
}
