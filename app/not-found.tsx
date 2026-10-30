import type { Metadata } from "next";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { Button } from "@/components/ui/button";
import { site } from "@/content/site";

// Metadata propia: sin esto el 404 heredaba title, description y canonical de la home.
// `null` corta la herencia del layout. `robots: null` saca el "index, follow" de la home y
// deja solo el noindex que Next emite en toda respuesta 404 (declararlo acá lo duplica).
export const metadata: Metadata = {
  title: `Página no encontrada | ${site.name}`,
  description: null,
  alternates: null,
  openGraph: null,
  twitter: null,
  robots: null,
};

export default function NotFound() {
  return (
    <Section spacing="tight" className="pt-24 sm:pt-28">
      <Container>
        <div className="max-w-[60ch]">
          <p className="text-xs font-medium uppercase tracking-[0.18em] text-terra-700">
            Error 404
          </p>
          <h1 className="mt-3 font-display text-[2.5rem] leading-[1.04] tracking-[-0.025em] text-balance text-navy-900 sm:text-[3.5rem]">
            No encontramos esta página
          </h1>
          <p className="mt-6 text-[17px] leading-relaxed text-ink-700">
            Puede que la dirección haya cambiado o que el enlace tenga un error. Desde
            acá pueden volver al inicio, ver nuestros servicios o leer las notas del blog.
          </p>
          <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:items-center">
            <Button href="/" variant="primary" size="lg">
              Volver al inicio
            </Button>
            <Button href="/blog" variant="secondary" size="lg">
              Ir al blog
            </Button>
          </div>
        </div>
      </Container>
    </Section>
  );
}
