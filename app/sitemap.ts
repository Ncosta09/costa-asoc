import type { MetadataRoute } from "next";
import { site } from "@/content/site";
import { getAllPosts, lastModified } from "@/lib/blog";

/**
 * `lastmod` de las páginas estáticas.
 *
 * A propósito NO usamos `new Date()` (fecha de build): eso le informa a Google que
 * todas las páginas cambiaron en cada deploy, aprende que nuestro `lastmod` no es
 * confiable y lo empieza a ignorar en todo el sitio — incluidos los posts, que sí
 * lo necesitan para que recrawlee. Bumpear a mano al editar el contenido de la página.
 *
 * Sin `changeFrequency` ni `priority`: Google los ignora y solo mira `lastmod`.
 */
const STATIC_LASTMOD: Record<string, string> = {
  "/": "2026-10-28",
  "/servicios": "2026-09-23",
  "/nosotros": "2026-07-10",
  // (bumpear al editar el contenido de la página, no en cada deploy)
  "/blog": "2026-10-28",
  "/contacto": "2026-07-10",
  "/administracion-de-consorcios-villa-devoto": "2026-10-30",
  "/administracion-de-consorcios-villa-del-parque": "2026-10-30",
  "/administracion-de-consorcios-monte-castro": "2026-10-30",
  "/administracion-de-consorcios-villa-pueyrredon": "2026-10-30",
  "/administracion-de-consorcios-caballito": "2026-10-30",
  "/administracion-de-consorcios-belgrano": "2026-10-30",
  "/administracion-de-consorcios-palermo": "2026-10-30",
  "/administracion-de-consorcios-recoleta": "2026-10-30",
  "/administracion-de-consorcios-villa-urquiza": "2026-10-30",
};

export default function sitemap(): MetadataRoute.Sitemap {
  const staticEntries = Object.entries(STATIC_LASTMOD).map(([path, date]) => ({
    url: `${site.url}${path}`,
    lastModified: new Date(date),
  }));

  const postEntries = getAllPosts().map((post) => ({
    url: `${site.url}/blog/${post.slug}`,
    // Última modificación real, no la fecha de publicación (ver `updated` en lib/blog.ts).
    lastModified: new Date(lastModified(post)),
  }));

  return [...staticEntries, ...postEntries];
}
