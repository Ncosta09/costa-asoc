# Decisiones de diseño y arquitectura — Costa & Asociados

Documento corto con el "porqué" de las decisiones clave. Mantener vivo a medida que el proyecto evoluciona.

---

## Calibración de la skill `design-taste-frontend`

La skill viene con defaults agresivos (VARIANCE 8, MOTION 6) pensados para SaaS/portfolios modernos. Para un estudio contable con tono institucional y target B2B (consejos de administración) se bajó:

- **DESIGN_VARIANCE: 5** — Hero asimétrico (12 col grid, texto col 1-7, asset col 8-12). Resto del sitio en grids predecibles. Sobrio, sin layouts ruidosos.
- **MOTION_INTENSITY: 3** — Solo fade + translate-y en entrada (con `whileInView`, `once: true`). Hover en CTAs. **Nada de perpetual loops, magnetic buttons, scroll hijack, ni el "Motion-Engine Bento Paradigm"** — esos patrones son para sitios SaaS y leerían como ruido aquí.
- **VISUAL_DENSITY: 3** — Espaciado generoso. Padding vertical mínimo `py-20 sm:py-28 lg:py-32` en cada sección.
- **Cards anti-overuse:** se aplicó el espíritu de la regla. Los "3 columnas de propuesta de valor" no son cards con borde y shadow, son columnas separadas por `divide-x` con iconos grandes. Las grillas de servicios usan un único `bg-cream-200` con `gap-px` para que parezcan separados por hairlines, sin acumular shadows.

## Tipografía

- **Heading: Fraunces** (serif humanista, variable font, axes SOFT + opsz). Transmite seriedad y tradición sin caer en didone clásico. Match natural con el logo.
- **Body: Geist** (sans humanista de Vercel). Override explícito al ban de Inter de la skill — Geist es más limpio, neutro, y emparenta bien con Fraunces.
- Servidas con `next/font/google` que las self-hostea en build → cero requests a Google Fonts en runtime, `display: swap`, subsets `latin` + `latin-ext` para acentos rioplatenses.

## Color

- Paleta del brief, expandida con shades intermedios (`navy-100`, `navy-200`, `terra-100`, `cream-200`, `cream-300`, etc.) para tener jerarquía sin inventar colores.
- **Navy 900 (#0D2D5C)** — heading, navegación, footer, CTA secundario.
- **Terracota 700 (#8C2518)** — CTAs primarios, acentos en eyebrow text, hover states.
- **Cream 50/100** — fondos. Nunca blanco puro (`#FFFFFF`) y nunca negro puro (`#000000` → reemplazado por `ink-900 #1A1A1A`).
- Ningún fondo entero de terracota o navy saturado. Se usan como banda final de CTA y como acentos sutiles en glow detrás del navy hero.

## Logo

Recreado como **SVG inline** dentro de un componente React (`components/ui/logo.tsx`). El isotipo son 5 esferas con `<radialGradient>` para simular el sombreado 3D del PNG original. Los textos "Costa &" y "Asociados" se renderizan en HTML con `font-display` (Fraunces) para crisp rendering y theming responsivo. Variantes: `horizontal` (header), `stacked` (footer), `mark` (favicon, OG image, hero asset).

**Pendiente:** validar visualmente la disposición de los 5 puntos del isotipo contra el PNG original. Si la posición exacta de las esferas no matchea, ajustar coordenadas en `LogoMark`.

## Arquitectura

- **Next.js 15 App Router** con Server Components por defecto. Solo se marcan como `"use client"` los componentes que necesitan interactividad (Header con scroll, MobileDrawer, Reveal, ContactForm, LeafletMap, ContactMap).
- **Tailwind CSS 4** con tokens via `@theme` directive en `globals.css`. Sin `tailwind.config.ts` (la v4 lo hace innecesario para tokens simples).
- **Single-source content:** `content/site.ts`, `content/services.ts`, `content/philosophy.ts`, `content/trust.ts`. Cambiar copy o datos en un solo lugar.
- **Layout primitives:** `Container` (max-w + px responsive), `Section` (padding vertical + tono de fondo + scroll-mt para anchors). Evita duplicar `max-w-7xl mx-auto px-4 sm:px-6 lg:px-8` en cada página.

## Animación

- `<Reveal />` aislado (Client Component) con `motion/react` (paquete `motion`, ex-Framer Motion).
- `useReducedMotion()` para respetar `prefers-reduced-motion`.
- `whileInView` con `viewport={{ once: true }}` para que las animaciones se disparen una sola vez, sin re-renders al scrollear.
- HeroMark: stagger de 80ms entre puntos del isotipo en mount, una sola vez. No perpetual.

## Formulario de contacto

- **Server Action** (`app/contacto/actions.ts`) con `useActionState` (React 19) + `useFormStatus` para el botón pending state.
- **Validación con Zod** server-side. El form usa `noValidate` para que las validaciones nativas no compitan; los errores vienen del server.
- **Honeypot:** campo `company_website` oculto fuera del viewport (no `display:none`, los bots a veces filtran ese caso). Si llega con contenido → simula éxito sin enviar.
- **Rate limit in-memory:** `Map<ip, {count, resetAt}>` con max 3 envíos por 5 minutos. Si en algún momento escalamos a multi-instancia (Vercel functions auto-scaling), migrar a Upstash Redis.
- **Resend:** envío del email con plantilla React Email (`@react-email/components`). Plantilla en `lib/email/templates/contact.tsx`.

## Mapa de contacto

- **Leaflet + OpenStreetMap** (no Google Maps). Cero tracking, cero cookies de terceros, no requiere API key.
- Carga con `dynamic(() => import("./leaflet-map"), { ssr: false })` para evitar errores de SSR (Leaflet referencia `window`).
- Marker custom hecho con `L.divIcon` y un poco de CSS inyectado (clip-path para el pin con la terracota del logo). Evita los PNG default de Leaflet que se rompen con bundlers.

## SEO

- `lib/seo.ts > buildMetadata({ title, description, path })` — helper único usado por cada `page.tsx`. Genera title formateado, canonical, OG, Twitter card, robots.
- `lib/schema.ts > localBusinessSchema()` — JSON-LD `AccountingService` (subtipo de LocalBusiness) inyectado en el `<body>` del root layout. Incluye dirección, geo, horarios, área servida.
- `app/sitemap.ts` y `app/robots.ts` — generación dinámica con `MetadataRoute` de Next.
- `app/opengraph-image.tsx` — OG dinámica generada en edge runtime con `next/og`. Una sola imagen para todas las páginas; iterar después por página si hace falta.
- `app/icon.tsx` y `app/apple-icon.tsx` — favicons también dinámicos.

## Performance

- Tipografías con `display: swap` + axes específicas en Fraunces para evitar pesos no usados.
- `next/image` listo para usar (no hay imágenes raster por ahora — todo SVG inline).
- Sin grain/noise filters animados (regla de la skill: GPU pintarate).
- Animaciones solo en `transform` y `opacity`.
- `min-h-[100dvh]` en body para evitar el bug de `100vh` en iOS Safari.

## Accesibilidad

- `lang="es-AR"` en `<html>`.
- `<SkipToContent />` al principio del body.
- Focus visible con outline navy de 2px y offset.
- Color contrast: navy-900 sobre cream-50 ≈ 12:1 (AAA). Terra-700 sobre cream-50 ≈ 7.8:1 (AAA). Ink-700 sobre cream-50 ≈ 8.2:1 (AAA en body).
- Toda la navegación del Header está disponible por teclado. Drawer mobile cierra con Escape.
- Form: labels arriba del input, helper text opcional, errores inline con `role="alert"` y `aria-invalid`.

## Pendientes / decisiones a tomar después

- Reemplazar placeholders del brief: `[TELÉFONO]`, `[EMAIL]`, `[WHATSAPP]`, número de WhatsApp en el link `wa.me/`, foto de Gabriel para `/nosotros`.
- Validar visualmente que la disposición del isotipo (5 puntos) matchee el PNG original. Ajustar coordenadas si hace falta.
- Decidir dominio definitivo y actualizar `NEXT_PUBLIC_SITE_URL`.
- Verificar el dominio en Resend antes de hacer el primer envío real.
- Si el form recibe mucho volumen / spam, migrar rate-limit a Upstash Redis y/o agregar Turnstile invisible.
- Eventualmente: redactar contenido para `/blog` y quitar el redirect.
