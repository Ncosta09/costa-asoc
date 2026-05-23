# Costa & Asociados — Sitio web institucional

Sitio web del estudio contable **Costa & Asociados**, especializado en administración profesional de consorcios residenciales y corporativos en CABA.

## Stack

- **Next.js 15** (App Router) + **React 19** + **TypeScript** (strict)
- **Tailwind CSS 4** con tokens via `@theme`
- **Tipografías locales** servidas con `next/font/google`: Fraunces (heading) + Geist (body)
- **Animaciones** sutiles con [Motion](https://motion.dev) (ex-Framer Motion)
- **Iconos** lucide-react
- **Formulario:** Server Action + Zod + Resend + honeypot + rate limit in-memory
- **Mapa:** Leaflet + OpenStreetMap (sin tracking de terceros)
- **Deploy:** Vercel

## Estructura

```
app/                  Páginas (App Router) + sitemap, robots, OG, icons
components/
  ui/                 Primitivas: Container, Section, Button, Badge, Reveal, Logo
  layout/             Header, Footer, MobileDrawer, SkipToContent
  home/               Bloques de la home
  servicios/          Bloques de /servicios
  nosotros/           Bloques de /nosotros
  contacto/           Form, OfficeInfo, Map
content/              Fuente única de copy y datos (site, services, philosophy, trust)
lib/                  seo, schema (JSON-LD), email, validations, rate-limit, utils
docs/                 design-decisions.md
public/               assets estáticos
```

## Setup local

```bash
# 1. Instalar dependencias
npm install

# 2. Copiar variables de entorno y completar
cp .env.example .env.local

# 3. Levantar el dev server
npm run dev
```

El sitio queda en `http://localhost:3000`.

## Variables de entorno

| Variable | Descripción |
|----------|-------------|
| `NEXT_PUBLIC_SITE_URL` | URL pública del sitio (sin barra final). Usada para metadata, canonicals y sitemap. |
| `RESEND_API_KEY` | API key de [Resend](https://resend.com) para envío del formulario. |
| `CONTACT_EMAIL_TO` | Email que recibe las consultas (ej. `contacto@costaasociados.com.ar`). |
| `CONTACT_EMAIL_FROM` | Email "from" verificado en Resend. Formato: `Nombre <email@dominio>`. |

## Scripts

```bash
npm run dev         # Desarrollo (http://localhost:3000)
npm run build       # Build de producción
npm run start       # Servir el build
npm run typecheck   # Verificación de tipos con tsc
```

## Deploy en Vercel

1. Importar el repo en Vercel.
2. Configurar las 4 variables de entorno de arriba en **Project Settings → Environment Variables**.
3. Verificar el dominio remitente en **Resend → Domains** antes del primer envío real del form.
4. Apuntar el dominio (DNS) al proyecto.

Vercel detecta Next.js automáticamente y usa los build commands por defecto.

## Datos pendientes

El sitio tiene placeholders en `content/site.ts` que hay que completar antes de publicar:

- Teléfono del estudio (`[TELÉFONO]`)
- Email principal (`[EMAIL]`)
- Número de WhatsApp (`[WHATSAPP]`, y actualizar `whatsappHref` con el número real)
- Foto de Gabriel / la oficina para `/nosotros` (hoy hay placeholder en `components/nosotros/intro-block.tsx`)
- Dominio definitivo (`NEXT_PUBLIC_SITE_URL`)

## Notas

- El `/blog` está armado como carpeta y redirige a `/`. Listo para sumar contenido SEO sin refactor.
- Las decisiones de diseño y arquitectura están documentadas en [`docs/design-decisions.md`](./docs/design-decisions.md).
- El logo se renderiza como SVG inline en `components/ui/logo.tsx`. La disposición de los 5 puntos puede ajustarse ahí mismo si la versión visual no matchea exactamente al PNG original.
