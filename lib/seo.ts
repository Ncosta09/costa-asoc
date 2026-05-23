import type { Metadata } from "next";
import { site } from "@/content/site";

type PageMeta = {
  title: string;
  description: string;
  path: string;
};

export function buildMetadata({ title, description, path }: PageMeta): Metadata {
  const url = `${site.url}${path}`;
  const fullTitle = path === "/" ? `${site.name} — ${site.tagline}` : `${title} — ${site.name}`;

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
      // images: auto-generadas por app/opengraph-image.tsx
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description,
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
