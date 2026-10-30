import type { Metadata } from "next";
import { site } from "@/content/site";

export type OgImage = {
  url: string;
  width: number;
  height: number;
  alt: string;
};

type PageMeta = {
  title: string;
  description: string;
  path: string;
  /** Imagen social propia (ej. la cover de un post). Sin ella va la genérica de app/opengraph-image.tsx. */
  image?: OgImage;
};

/** Largo máximo del <title> antes de que Google lo corte en el SERP. */
const MAX_TITLE = 60;
const TITLE_SUFFIX = ` | ${site.name}`;

/**
 * OG genérica (app/opengraph-image.tsx, 1200x630). Hay que declararla a mano: cuando una
 * página define su propio `openGraph`, Next deja de heredar la imagen del file convention
 * y el og:image desaparece (auditoría 2026-10-30: 31 de 32 páginas sin og:image).
 */
export const defaultOgImage: OgImage = {
  url: "/opengraph-image",
  width: 1200,
  height: 630,
  alt: `${site.name} · ${site.tagline}`,
};

/**
 * Cover de Unsplash recortada a 1200x630 en JPG (la URL de la cover viene a 1600 de ancho,
 * con `auto=format`, que según el Accept puede devolver AVIF y algunos scrapers no lo leen).
 */
export function unsplashOgImage(cover: string, alt: string): OgImage | undefined {
  let url: URL;
  try {
    url = new URL(cover);
  } catch {
    return undefined;
  }
  if (url.hostname !== "images.unsplash.com") return undefined;
  url.searchParams.delete("auto");
  url.searchParams.set("fm", "jpg");
  url.searchParams.set("fit", "crop");
  url.searchParams.set("w", "1200");
  url.searchParams.set("h", "630");
  url.searchParams.set("q", "80");
  return { url: url.toString(), width: 1200, height: 630, alt };
}

/**
 * Título final. En home ya viene formateado (con keyword y marca). En el resto se suma
 * " | Costa & Asociados" solo si entra en 60 caracteres: si no, el SERP lo corta y la marca
 * se pierde igual. La marca queda en og:site_name y en el schema.
 */
export function pageTitle(title: string, path: string): string {
  if (path === "/") return title;
  const withSuffix = `${title}${TITLE_SUFFIX}`;
  return withSuffix.length <= MAX_TITLE ? withSuffix : title;
}

export function buildMetadata({ title, description, path, image }: PageMeta): Metadata {
  const url = `${site.url}${path}`;
  const fullTitle = pageTitle(title, path);
  const ogImage = image ?? defaultOgImage;

  return {
    title: fullTitle,
    description,
    metadataBase: new URL(site.url),
    alternates: {
      canonical: url,
    },
    openGraph: {
      title: fullTitle,
      description,
      url,
      siteName: site.name,
      locale: site.locale,
      type: "website",
      images: [ogImage],
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description,
      images: [{ url: ogImage.url, alt: ogImage.alt }],
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },
    // icons: auto-resueltos por app/icon.tsx y app/apple-icon.tsx
  };
}
