export const site = {
  name: "Costa & Asociados",
  tagline: "Administración profesional de consorcios",
  legalName: "Costa & Asociados",
  description:
    "Estudio contable especializado en administración profesional de consorcios residenciales y corporativos en CABA. Gestión transparente y control financiero riguroso.",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.costa-asoc.com.ar",
  locale: "es_AR",
  language: "es-AR",

  founded: 2009,
  yearsExperience: "15",

  // Rango de precios orientativo para el schema LocalBusiness (no se muestra en la UI).
  priceRange: "$$",

  // Titular del estudio — usado para el nodo Person (founder/author) en el schema.
  principal: {
    name: "Gabriel A. Costa",
    role: "Contador Público · Titular del estudio",
    credential: "Contador Público",
    // LinkedIn personal de Gabriel → va al sameAs del Person (no al de la organización).
    linkedin: "https://www.linkedin.com/in/gabriel-costa-9839771b8/",
  },

  // Perfiles y ficha externa de la ORGANIZACIÓN. Se inyectan en `sameAs` del schema y (si hay) en el footer.
  // TODO(nico): pegar la URL de la ficha de Google Business Profile cuando esté verificada.
  // (Instagram: no hay. LinkedIn de empresa: no hay — el personal de Gabriel va en principal.linkedin.)
  social: {
    googleBusiness: "", // ej. "https://maps.app.goo.gl/xxxxxxxx" (ficha de Google Business Profile)
  },

  address: {
    street: "Campana 4710, Piso 6° \"B\"",
    city: "Ciudad Autónoma de Buenos Aires",
    region: "CABA",
    country: "AR",
    postalCode: "C1419FQD",
  },

  contact: {
    phone: "11 6381-5053",
    phoneHref: "tel:+5491163815053",
    email: "gcosta@costa-asoc.com.ar",
    emailHref: "mailto:gcosta@costa-asoc.com.ar",
    whatsapp: "11 6381-5053",
    whatsappHref: "https://wa.me/5491163815053",
  },

  hours: {
    label: "Lunes a viernes, 8 a 18 hs",
    structured: "Mo-Fr 08:00-18:00",
  },

  // Coordenadas de Campana 4710, CABA (Villa Devoto)
  geo: {
    lat: -34.5893617,
    lng: -58.5077353,
  },

  registries: [
    // `url`: link a la ficha/padrón público del organismo para verificar la matrícula.
    // TODO(nico): completar con las URLs reales de verificación. Vacío = se muestra como texto, sin link.
    { label: "Matrícula RPA Nº 8192", short: "RPA 8192", full: "Registro Público de Administradores GCBA", url: "https://buenosaires.gob.ar/gcaba_historico/registro-publico-de-administradores-de-consorcios/buscador-de-administradores" },
    { label: "CAPHAI Nº 2903", short: "CAPHAI 2903", full: "Cámara Argentina de Propiedad Horizontal y Actividades Inmobiliarias", url: "https://caphai.com.ar/" },
  ],
} as const;

export const navLinks = [
  { href: "/", label: "Inicio" },
  { href: "/servicios", label: "Servicios" },
  { href: "/nosotros", label: "Nosotros" },
  { href: "/blog", label: "Blog" },
  { href: "/contacto", label: "Contacto" },
] as const;
