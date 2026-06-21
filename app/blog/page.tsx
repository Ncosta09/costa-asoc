import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { Reveal } from "@/components/ui/reveal";
import { buildMetadata } from "@/lib/seo";
import { getAllPosts, formatDate } from "@/lib/blog";

export const metadata: Metadata = buildMetadata({
  title: "Blog",
  description:
    "Notas sobre administración de consorcios, propiedad horizontal y gestión de expensas en CABA. Recursos prácticos para consejos de administración y propietarios.",
  path: "/blog",
});

export default function BlogPage() {
  const posts = getAllPosts();

  return (
    <Section spacing="tight" className="pt-24 sm:pt-28">
      <Container>
        <Reveal>
          <div className="mb-14 max-w-[60ch]">
            <p className="text-xs font-medium uppercase tracking-[0.18em] text-terra-700">
              Blog
            </p>
            <h1 className="mt-3 font-display text-[2.5rem] leading-[1.04] tracking-[-0.025em] text-balance text-navy-900 sm:text-[3.5rem]">
              Notas sobre administración de consorcios
            </h1>
            <p className="mt-6 max-w-[58ch] text-[17px] leading-relaxed text-ink-700">
              Recursos prácticos sobre propiedad horizontal, normativa y gestión
              financiera de edificios. Escritos desde la mirada de un estudio contable.
            </p>
          </div>
        </Reveal>

        {posts.length === 0 ? (
          <p className="text-[16px] text-ink-500">Pronto publicaremos las primeras notas.</p>
        ) : (
          <ul className="grid grid-cols-1 gap-5 sm:gap-6 md:grid-cols-2 lg:grid-cols-3">
            {posts.map((post, i) => (
              <Reveal key={post.slug} delay={(i % 3) * 0.06} className="h-full">
                <li className="h-full">
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
                          className="object-cover transition-transform duration-[600ms] ease-[cubic-bezier(0.22,0.61,0.36,1)] group-hover:scale-[1.03]"
                        />
                      </div>
                    ) : null}
                    <div className="flex flex-1 flex-col p-7 sm:p-8">
                      <time
                        dateTime={post.date}
                        className="text-xs font-medium uppercase tracking-[0.14em] text-ink-500"
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
                        <ArrowRight
                          strokeWidth={1.75}
                          className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5"
                        />
                      </span>
                    </div>
                  </Link>
                </li>
              </Reveal>
            ))}
          </ul>
        )}
      </Container>
    </Section>
  );
}
