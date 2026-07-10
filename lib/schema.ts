import { site } from "@/content/site";

type ArticleInput = {
  slug: string;
  title: string;
  description: string;
  date: string;
  author: string;
  cover?: string;
};

export function blogPostingSchema(post: ArticleInput) {
  const url = `${site.url}/blog/${post.slug}`;
  return {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "@id": url,
    headline: post.title,
    description: post.description,
    ...(post.cover ? { image: post.cover } : {}),
    datePublished: post.date,
    dateModified: post.date,
    inLanguage: site.language,
    // Autor como Person con credencial → señal E-E-A-T más fuerte que Organization
    // para contenido regulatorio. El nombre viene del frontmatter del post.
    author: {
      "@type": "Person",
      name: post.author,
      jobTitle: site.principal.role,
      hasCredential: {
        "@type": "EducationalOccupationalCredential",
        credentialCategory: "Matrícula profesional",
        name: site.principal.credential,
      },
      worksFor: { "@type": "Organization", name: site.name },
    },
    publisher: {
      "@type": "Organization",
      name: site.name,
      logo: { "@type": "ImageObject", url: `${site.url}/logos/costa-horizontal.png` },
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
    "@id": `${site.url}#organization`,
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
    founder: {
      "@type": "Person",
      name: site.principal.name,
      jobTitle: site.principal.role,
      hasCredential: {
        "@type": "EducationalOccupationalCredential",
        credentialCategory: "Matrícula profesional",
        name: site.principal.credential,
      },
      // LinkedIn personal del titular → sameAs del Person (solo si está cargado).
      ...(site.principal.linkedin ? { sameAs: [site.principal.linkedin] } : {}),
    },
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
