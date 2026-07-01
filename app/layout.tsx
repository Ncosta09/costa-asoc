import type { Metadata, Viewport } from "next";
import { Fraunces, Geist } from "next/font/google";
import { SiteHeader } from "@/components/layout/site-header";
import { SiteFooter } from "@/components/layout/site-footer";
import { SkipToContent } from "@/components/layout/skip-to-content";
import { buildMetadata } from "@/lib/seo";
import { professionalServiceSchema } from "@/lib/schema";
import { site } from "@/content/site";
import "./globals.css";

const fraunces = Fraunces({
  subsets: ["latin", "latin-ext"],
  display: "swap",
  variable: "--font-fraunces",
  axes: ["SOFT", "opsz"],
});

const geist = Geist({
  subsets: ["latin", "latin-ext"],
  display: "swap",
  variable: "--font-geist",
});

export const metadata: Metadata = {
  ...buildMetadata({
    title: "Administración de consorcios en Buenos Aires | Costa & Asoc.",
    description:
      "Estudio contable matriculado que administra consorcios en CABA desde 2009. Cuentas a nombre del consorcio y rendición transparente. Pedí tu propuesta sin cargo.",
    path: "/",
  }),
  // Verificación de propiedad. Se activan cargando las env vars en Vercel
  // (no requieren tocar código). Google: código del método "Etiqueta HTML".
  verification: {
    google: process.env.GOOGLE_SITE_VERIFICATION,
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
        <script
          type="application/ld+json"
          // JSON-LD must be raw, not escaped — only emitted once at root
          dangerouslySetInnerHTML={{ __html: JSON.stringify(professionalServiceSchema()) }}
        />
      </body>
    </html>
  );
}
