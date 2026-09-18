import type { Metadata, Viewport } from "next";
import { Fraunces, Geist } from "next/font/google";
import { SiteHeader } from "@/components/layout/site-header";
import { SiteFooter } from "@/components/layout/site-footer";
import { SkipToContent } from "@/components/layout/skip-to-content";
import { Analytics } from "@/components/analytics/analytics";
import { ConsentBanner } from "@/components/analytics/consent-banner";
import { WhatsAppFloat } from "@/components/ui/whatsapp-float";
import { buildMetadata } from "@/lib/seo";
import { professionalServiceSchema } from "@/lib/schema";
import { site } from "@/content/site";
import "./globals.css";

// subsets: solo "latin". Medido el 2026-09-18 sobre el HTML servido: cero
// caracteres por encima de U+00FF en todo el sitio (el español rioplatense
// entero, tildes y ñ incluidas, vive en "latin"). `latin-ext` sumaba 119 KB
// de woff2 que next/font precarga igual, porque el preload ignora el unicode-range.
const fraunces = Fraunces({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-fraunces",
  // Solo opsz: SOFT no se setea en ningún lado, así que el eje solo engordaba el archivo.
  axes: ["opsz"],
});

const geist = Geist({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-geist",
});

export const metadata: Metadata = {
  ...buildMetadata({
    title: "Administración de consorcios en Buenos Aires | Costa & Asociados",
    description:
      "Estudio contable matriculado que administra consorcios en CABA desde 2009. Cuentas a nombre del consorcio y rendición transparente. Pedí tu propuesta sin cargo.",
    path: "/",
  }),
  // Verificación de propiedad de buscadores (valores públicos y permanentes).
  verification: {
    google: "GtWvdbpHtztRqo5SwAPyKSFqNr3b_VewXaSnR81z4HI",
    other: process.env.BING_SITE_VERIFICATION
      ? { "msvalidate.01": process.env.BING_SITE_VERIFICATION }
      : {},
  },
};

export const viewport: Viewport = {
  themeColor: "#FAFAF7",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang={site.language} className={`${fraunces.variable} ${geist.variable}`}>
      <body className="min-h-[100dvh] bg-cream-50 text-ink-900 antialiased">
        <SkipToContent />
        <SiteHeader />
        <main id="main-content" className="relative">
          {children}
        </main>
        <SiteFooter />
        {/* GA4 con consentimiento: no carga nada sin NEXT_PUBLIC_GA_MEASUREMENT_ID + aceptación */}
        <Analytics />
        <ConsentBanner />
        <WhatsAppFloat />
        <script
          type="application/ld+json"
          // JSON-LD must be raw, not escaped — only emitted once at root
          dangerouslySetInnerHTML={{ __html: JSON.stringify(professionalServiceSchema()) }}
        />
      </body>
    </html>
  );
}
