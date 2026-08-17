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
 */
const STATIC_LASTMOD: Record<string, string> = {
  "/": "2026-08-03",
  "/servicios": "2026-08-03",
  "/nosotros": "2026-07-10",
  // (bumpear al editar el contenido de la página, no en cada deploy)
  "/blog": "2026-08-17",
  "/contacto": "2026-07-10",
};

export default function sitemap(): MetadataRoute.Sitemap {
  const staticEntries = Object.entries(STATIC_LASTMOD).map(([path, date]) => ({
    url: `${site.url}${path}`,
    lastModified: new Date(date),
    changeFrequency: "monthly" as const,
    priority: path === "/" ? 1 : 0.8,
  }));

  const postEntries = getAllPosts().map((post) => ({
    url: `${site.url}/blog/${post.slug}`,
    // Última modificación real, no la fecha de publicación (ver `updated` en lib/blog.ts).
    lastModified: new Date(lastModified(post)),
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }));

  return [...staticEntries, ...postEntries];
}
