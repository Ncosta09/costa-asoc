import { site } from "@/content/site";

// Embed de Google Maps (sin API key, vía output=embed) centrado en las coordenadas del estudio.
// Refuerza la asociación de la dirección con Google Maps / la ficha de Google Business Profile,
// algo que un mapa de OpenStreetMap/Leaflet no aporta a efectos de SEO local / entidad.
const embedSrc = `https://www.google.com/maps?q=${site.geo.lat},${site.geo.lng}&z=16&hl=es&output=embed`;

export function ContactMap() {
  return (
    <div className="relative isolate z-0 h-[280px] w-full overflow-hidden rounded-lg border border-cream-300 bg-cream-100 sm:h-[320px]">
      <iframe
        title={`Ubicación de ${site.name} en Google Maps: ${site.address.street}, ${site.address.city}`}
        src={embedSrc}
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        className="h-full w-full border-0"
      />
    </div>
  );
}
