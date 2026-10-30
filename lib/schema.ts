import { site } from "@/content/site";

// @id estables de las entidades del sitio. Todas las páginas emiten el nodo de la
// organización (con su founder) y el WebSite desde el layout, así que el resto de los
// nodos los referencian por @id en vez de repetir la entidad.
export const ORG_ID = `${site.url}/#organization`;
export const PERSON_ID = `${site.url}/#gabriel-costa`;
export const WEBSITE_ID = `${site.url}/#website`;

function principalPerson() {
  return {
    "@type": "Person",
    "@id": PERSON_ID,
    name: site.principal.name,
    jobTitle: site.principal.role,
    url: `${site.url}/nosotros`,
    image: `${site.url}/nosotros/gabriel-costa.jpg`,
    worksFor: { "@id": ORG_ID },
    hasCredential: {
      "@type": "EducationalOccupationalCredential",
      credentialCategory: "Matrícula profesional",
      name: site.principal.credential,
    },
    // LinkedIn personal del titular → sameAs del Person (solo si está cargado).
    ...(site.principal.linkedin ? { sameAs: [site.principal.linkedin] } : {}),
  };
}

type ArticleInput = {
  slug: string;
  title: string;
  description: string;
  date: string;
  updated?: string;
  author: string;
  cover?: string;
};

export function blogPostingSchema(post: ArticleInput) {
  const url = `${site.url}/blog/${post.slug}`;
  return {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "@id": `${url}#article`,
    headline: post.title,
    description: post.description,
    ...(post.cover ? { image: post.cover } : {}),
    datePublished: post.date,
    // Fecha real de última edición: Google la usa como señal de frescura.
    dateModified: post.updated ?? post.date,
    inLanguage: site.language,
    // Autor: referencia al Person del titular (definido completo en el layout). Si una
    // nota la firmara otra persona, va como Person suelto, sin el @id de Gabriel.
    author:
      post.author === site.principal.name
        ? { "@type": "Person", "@id": PERSON_ID, name: post.author, url: `${site.url}/nosotros` }
        : { "@type": "Person", name: post.author },
    publisher: { "@id": ORG_ID },
    isPartOf: {
      "@type": "Blog",
      "@id": `${site.url}/blog#blog`,
      url: `${site.url}/blog`,
      name: `Blog de ${site.name}`,
    },
    mainEntityOfPage: { "@type": "WebPage", "@id": url },
  };
}

export function breadcrumbSchema(items: { name: string; url: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: item.url,
    })),
  };
}

// Service por landing de barrio: le dice a Google y a los buscadores con IA que el servicio
// se presta en ese barrio. El provider apunta por @id al ProfessionalService del layout,
// que está en todas las páginas, así que no se duplica la entidad.
export function barrioServiceSchema(
  barrio: string,
  path: string,
  description?: string | null,
) {
  const url = `${site.url}${path}`;
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    "@id": `${url}#service`,
    name: `Administración de consorcios en ${barrio}`,
    serviceType: "Administración de consorcios",
    ...(description ? { description } : {}),
    url,
    provider: { "@id": ORG_ID },
    areaServed: {
      "@type": "Place",
      name: barrio,
      containedInPlace: { "@type": "City", name: "Ciudad Autónoma de Buenos Aires" },
    },
  };
}

export function faqSchema(items: { question: string; answer: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: { "@type": "Answer", text: item.answer },
    })),
  };
}

export function professionalServiceSchema() {
  // Teléfono en formato E.164 (deriva del `tel:` href para no duplicar el dato).
  const telephoneE164 = site.contact.phoneHref.replace("tel:", "");
  // sameAs: solo perfiles con URL cargada (evita strings vacíos en el schema).
  const sameAs = Object.values(site.social).filter(Boolean);

  return {
    "@context": "https://schema.org",
    "@type": ["ProfessionalService", "AccountingService"],
    "@id": ORG_ID,
    name: site.name,
    description: site.description,
    url: site.url,
    telephone: telephoneE164,
    email: site.contact.email,
    foundingDate: String(site.founded),
    priceRange: site.priceRange,
    // `image` apunta a la OG generada por app/opengraph-image.tsx (200 OK), no a un PNG inexistente.
    image: `${site.url}/opengraph-image`,
    logo: `${site.url}/logos/costa-horizontal.png`,
    ...(sameAs.length ? { sameAs } : {}),
    founder: principalPerson(),
    // Ficha de Google Business Profile (también entra en sameAs).
    ...(site.social.googleBusiness ? { hasMap: site.social.googleBusiness } : {}),
    hasCredential: site.registries.map((r) => ({
      "@type": "EducationalOccupationalCredential",
      credentialCategory: "Matrícula / membresía profesional",
      name: r.full,
      identifier: r.short,
    })),
    address: {
      "@type": "PostalAddress",
      streetAddress: site.address.street,
      addressLocality: site.address.city,
      addressRegion: site.address.region,
      addressCountry: site.address.country,
      postalCode: site.address.postalCode,
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: site.geo.lat,
      longitude: site.geo.lng,
    },
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
        opens: "08:00",
        closes: "18:00",
      },
    ],
    areaServed: {
      "@type": "City",
      name: "Ciudad Autónoma de Buenos Aires",
    },
    knowsAbout: [
      "Administración de consorcios",
      "Propiedad horizontal",
      "Contabilidad de edificios",
      "Liquidación de expensas",
      "Asambleas de propietarios",
    ],
  };
}

export function websiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": WEBSITE_ID,
    url: site.url,
    name: site.name,
    inLanguage: site.language,
    publisher: { "@id": ORG_ID },
  };
}

/** Página con tipo propio (ContactPage, AboutPage, CollectionPage) colgada del WebSite. */
export function webPageSchema(input: {
  type: "ContactPage" | "AboutPage" | "CollectionPage";
  path: string;
  name: string;
  description: string;
  about?: string;
}) {
  const url = `${site.url}${input.path}`;
  return {
    "@context": "https://schema.org",
    "@type": input.type,
    "@id": `${url}#webpage`,
    url,
    name: input.name,
    description: input.description,
    inLanguage: site.language,
    isPartOf: { "@id": WEBSITE_ID },
    about: { "@id": input.about ?? ORG_ID },
  };
}

/** /blog: el Blog como entidad, con sus notas referenciadas por @id (el de cada BlogPosting). */
export function blogSchema(
  posts: { slug: string; title: string; date: string; updated?: string }[],
  description: string,
) {
  return {
    "@context": "https://schema.org",
    "@type": "Blog",
    "@id": `${site.url}/blog#blog`,
    url: `${site.url}/blog`,
    name: `Blog de ${site.name}`,
    description,
    inLanguage: site.language,
    isPartOf: { "@id": WEBSITE_ID },
    publisher: { "@id": ORG_ID },
    author: { "@id": PERSON_ID },
    blogPost: posts.map((p) => ({
      "@type": "BlogPosting",
      "@id": `${site.url}/blog/${p.slug}`,
      url: `${site.url}/blog/${p.slug}`,
      headline: p.title,
      datePublished: p.date,
      dateModified: p.updated ?? p.date,
    })),
  };
}
