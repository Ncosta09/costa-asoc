import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { Reveal } from "@/components/ui/reveal";
import { breadcrumbSchema } from "@/lib/schema";
import { site } from "@/content/site";
import { getAllPosts, formatDate, POSTS_PER_PAGE, blogPagePath } from "@/lib/blog";
import { cn } from "@/lib/utils";

/** Índice del blog paginado: la página 1 vive en /blog y el resto en /blog/pagina/N. */
export function BlogIndex({ page }: { page: number }) {
  const posts = getAllPosts();
  const totalPages = Math.max(1, Math.ceil(posts.length / POSTS_PER_PAGE));
  const pagePosts = posts.slice((page - 1) * POSTS_PER_PAGE, page * POSTS_PER_PAGE);

  const crumbs = [
    { name: "Inicio", url: site.url },
    { name: "Blog", url: `${site.url}/blog` },
    ...(page > 1 ? [{ name: `Página ${page}`, url: `${site.url}${blogPagePath(page)}` }] : []),
  ];

  return (
    <Section spacing="tight" className="pt-24 sm:pt-28">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema(crumbs)) }}
      />
      <Container>
        {/* Cabecera sin Reveal: es el H1 above-the-fold y pinta directo. */}
        <div className="mb-14 max-w-[60ch]">
          <p className="text-xs font-medium uppercase tracking-[0.18em] text-terra-700">
            Blog
          </p>
          <h1 className="mt-3 font-display text-[2.5rem] leading-[1.04] tracking-[-0.025em] text-balance text-navy-900 sm:text-[3.5rem]">
            Notas sobre administración de consorcios
            {page > 1 ? <span className="sr-only">, página {page}</span> : null}
          </h1>
          <p className="mt-6 max-w-[58ch] text-[17px] leading-relaxed text-ink-700">
            Recursos prácticos sobre propiedad horizontal, normativa y gestión
            financiera de edificios. Escritos desde la mirada de un estudio contable.
          </p>
        </div>

        {pagePosts.length === 0 ? (
          <p className="text-[16px] text-ink-700">Pronto publicaremos las primeras notas.</p>
        ) : (
          <ul className="grid grid-cols-1 gap-5 sm:gap-6 md:grid-cols-2 lg:grid-cols-3">
            {pagePosts.map((post, i) => (
              // `li` afuera y `Reveal` adentro: un `div` como hijo directo de `ul` rompe la lista para lectores de pantalla.
              <li key={post.slug} className="h-full">
                <Reveal delay={(i % 3) * 0.06} className="h-full">
                  <Link
                    href={`/blog/${post.slug}`}
                    className="group flex h-full flex-col overflow-hidden rounded-2xl border border-cream-200 bg-cream-100/60 shadow-[var(--shadow-card)] transition-[box-shadow,border-color,background-color] duration-[600ms] ease-[cubic-bezier(0.22,0.61,0.36,1)] [@media(hover:hover)]:hover:border-navy-200/70 [@media(hover:hover)]:hover:bg-cream-50 [@media(hover:hover)]:hover:shadow-[var(--shadow-elevated)]"
                  >
                    {post.cover ? (
                      <div className="relative aspect-[16/9] overflow-hidden bg-cream-200">
                        <Image
                          src={post.cover}
                          alt={post.coverAlt ?? ""}
                          fill
                          sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                          // Solo la primera cover está en el primer viewport; el resto queda lazy.
                          priority={i === 0}
                          className="object-cover transition-transform duration-[600ms] ease-[cubic-bezier(0.22,0.61,0.36,1)] group-hover:scale-[1.03]"
                        />
                      </div>
                    ) : null}
                    <div className="flex flex-1 flex-col p-7 sm:p-8">
                      <time
                        dateTime={post.date}
                        className="text-xs font-medium uppercase tracking-[0.14em] text-ink-700"
                      >
                        {formatDate(post.date)}
                      </time>
                      <h2 className="mt-4 font-display text-[1.3rem] leading-tight tracking-tight text-navy-900">
                        {post.title}
                      </h2>
                      <p className="mt-3 flex-1 text-[14.5px] leading-relaxed text-ink-700">
                        {post.description}
                      </p>
                      <span className="mt-6 inline-flex items-center gap-2 text-[14px] font-medium text-navy-900">
                        Leer nota
                        <ArrowRight aria-hidden="true"
                          strokeWidth={1.75}
                          className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5"
                        />
                      </span>
                    </div>
                  </Link>
                </Reveal>
              </li>
            ))}
          </ul>
        )}

        <BlogPagination page={page} totalPages={totalPages} />
      </Container>
    </Section>
  );
}

function BlogPagination({ page, totalPages }: { page: number; totalPages: number }) {
  if (totalPages <= 1) return null;
  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);
  const edge =
    "inline-flex h-11 items-center gap-2 rounded-md px-3 text-[14px] font-medium text-navy-900 transition-colors duration-200 hover:bg-navy-100/60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-navy-900 focus-visible:ring-offset-2 focus-visible:ring-offset-cream-50";

  return (
    <nav aria-label="Paginación del blog" className="mt-14 flex items-center justify-between gap-4 border-t border-cream-200 pt-8">
      <div className="sm:min-w-[9rem]">
        {page > 1 ? (
          <Link href={blogPagePath(page - 1)} rel="prev" aria-label="Notas más recientes" className={edge}>
            <ArrowLeft aria-hidden="true" strokeWidth={1.75} className="h-4 w-4" />
            <span className="hidden sm:inline">Más recientes</span>
          </Link>
        ) : null}
      </div>

      <ol className="flex items-center gap-1">
        {pages.map((n) => (
          <li key={n}>
            <Link
              href={blogPagePath(n)}
              aria-current={n === page ? "page" : undefined}
              aria-label={`Página ${n}`}
              className={cn(
                "inline-flex h-11 min-w-11 items-center justify-center rounded-md px-2 text-[14px] font-medium tabular-nums transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-navy-900 focus-visible:ring-offset-2 focus-visible:ring-offset-cream-50",
                n === page ? "bg-navy-900 text-cream-50" : "text-navy-900 hover:bg-navy-100/60",
              )}
            >
              {n}
            </Link>
          </li>
        ))}
      </ol>

      <div className="flex sm:min-w-[9rem] justify-end">
        {page < totalPages ? (
          <Link href={blogPagePath(page + 1)} rel="next" aria-label="Notas anteriores" className={edge}>
            <span className="hidden sm:inline">Anteriores</span>
            <ArrowRight aria-hidden="true" strokeWidth={1.75} className="h-4 w-4" />
          </Link>
        ) : null}
      </div>
    </nav>
  );
}
