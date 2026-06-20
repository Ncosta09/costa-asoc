import { site } from "@/content/site";

type ArticleInput = {
  slug: string;
  title: string;
  description: string;
  date: string;
  author: string;
};

export function blogPostingSchema(post: ArticleInput) {
  const url = `${site.url}/blog/${post.slug}`;
  return {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "@id": url,
    headline: post.title,
    description: post.description,
    datePublished: post.date,
    dateModified: post.date,
    inLanguage: site.language,
    author: { "@type": "Organization", name: post.author },
    publisher: {
      "@type": "Organization",
      name: site.name,
      logo: { "@type": "ImageObject", url: `${site.url}/logos/costa-horizontal.png` },
    },
    mainEntityOfPage: { "@type": "WebPage", "@id": url },
  };
}

export function localBusinessSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "AccountingService",
    "@id": `${site.url}#organization`,
    name: site.name,
    description: site.description,
    url: site.url,
    telephone: site.contact.phone,
    email: site.contact.email,
    foundingDate: String(site.founded),
    image: `${site.url}/og-default.png`,
    logo: `${site.url}/logos/costa-horizontal.png`,
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
        opens: "09:00",
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
