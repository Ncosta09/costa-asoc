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
const csp = [
  "default-src 'self'",
  "base-uri 'self'",
  "object-src 'none'",
  "frame-ancestors 'self'",
  "form-action 'self'",
  `script-src 'self' 'unsafe-inline'${isDev ? " 'unsafe-eval'" : ""}`,
  "style-src 'self' 'unsafe-inline'",
  "img-src 'self' data: blob: https://images.unsplash.com",
  "font-src 'self' data:",
  "connect-src 'self'",
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
