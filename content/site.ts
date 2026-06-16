export const site = {
  name: "Costa & Asociados",
  tagline: "Administración profesional de consorcios",
  legalName: "Costa & Asociados",
  description:
    "Estudio contable especializado en administración profesional de consorcios residenciales y corporativos en CABA. Gestión transparente y control financiero riguroso.",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://costaasociados.com.ar",
  locale: "es_AR",
  language: "es-AR",

  founded: 2009,
  yearsExperience: "15",

  address: {
    street: "Perú 359, Piso 8° Of. 804",
    city: "Ciudad Autónoma de Buenos Aires",
    region: "CABA",
    country: "AR",
    postalCode: "C1067",
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
    label: "Lunes a viernes, 9 a 18 hs",
    structured: "Mo-Fr 09:00-18:00",
  },

  // Coordenadas de Perú 359, CABA
  geo: {
    lat: -34.6098,
    lng: -58.3724,
  },

  registries: [
    { label: "Matrícula RPA Nº 8192", short: "RPA 8192", full: "Registro Público de Administradores GCBA" },
    { label: "CAPHAI Nº 2903", short: "CAPHAI 2903", full: "Cámara Argentina de Propiedad Horizontal y Actividades Inmobiliarias" },
  ],
} as const;

export const navLinks = [
  { href: "/", label: "Inicio" },
  { href: "/servicios", label: "Servicios" },
  { href: "/nosotros", label: "Nosotros" },
  { href: "/contacto", label: "Contacto" },
] as const;
