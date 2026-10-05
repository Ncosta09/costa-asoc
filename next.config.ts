import type { NextConfig } from "next";

const isDev = process.env.NODE_ENV === "development";

// Content-Security-Policy.
// Notas de por qué cada fuente:
// - script-src 'unsafe-inline': Next.js App Router inyecta scripts inline de hidratación/RSC
//   (endurecer con nonces requiere middleware; queda como mejora futura).
//   'unsafe-eval' SOLO en dev — Next lo necesita para HMR/source maps; en prod NO se emite.
// - style-src 'unsafe-inline': el mapa (components/contacto/leaflet-map.tsx) inyecta un <style>
//   en runtime, y Next/Tailwind emiten estilos inline.
// - img-src: imágenes propias/optimizadas ('self'), placeholders (data:/blob:) y
//   covers de blog (images.unsplash.com).
// - frame-src: el embed de Google Maps en /contacto (www.google.com).
// - Dominios de GA4: solo entran al CSP si NEXT_PUBLIC_GA_MEASUREMENT_ID está
//   configurada (build-time). Sin la env var, el CSP sigue igual de cerrado.
//   Desde la vinculación con Google Ads (28-09) gtag manda los hits a
//   analytics.google.com, www.google.com/g/collect y stats.g.doubleclick.net, y
//   el pixel de audiencias a www.google.com.ar. Sin esos dominios GA4 recibió
//   cero sesiones del 30-09 al 05-10 (lista oficial de Google para GA4 + Signals).
// - Dominios de Clarity: mismo criterio, con NEXT_PUBLIC_CLARITY_ID.
const gaEnabled = Boolean(process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID);
const clarityEnabled = gaEnabled && Boolean(process.env.NEXT_PUBLIC_CLARITY_ID);
const googleHosts =
  " https://*.google-analytics.com https://*.analytics.google.com https://*.googletagmanager.com" +
  " https://*.g.doubleclick.net https://*.google.com https://*.google.com.ar";
const clarityHosts = " https://*.clarity.ms https://c.bing.com";
const gaScript =
  (gaEnabled ? " https://*.googletagmanager.com" : "") +
  (clarityEnabled ? " https://*.clarity.ms" : "");
const gaConnect = (gaEnabled ? googleHosts : "") + (clarityEnabled ? clarityHosts : "");
const gaImg = gaConnect;
const csp = [
  "default-src 'self'",
  "base-uri 'self'",
  "object-src 'none'",
  "frame-ancestors 'self'",
  "form-action 'self'",
  `script-src 'self' 'unsafe-inline'${isDev ? " 'unsafe-eval'" : ""}${gaScript}`,
  "style-src 'self' 'unsafe-inline'",
  `img-src 'self' data: blob: https://images.unsplash.com${gaImg}`,
  "font-src 'self' data:",
  `connect-src 'self'${gaConnect}`,
  "frame-src https://www.google.com",
  "upgrade-insecure-requests",
].join("; ");

const config: NextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  images: {
    formats: ["image/avif", "image/webp"],
    remotePatterns: [
      { protocol: "https", hostname: "images.unsplash.com" },
    ],
  },
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          { key: "Content-Security-Policy", value: csp },
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          { key: "X-Frame-Options", value: "SAMEORIGIN" },
        ],
      },
    ];
  },
};

export default config;
