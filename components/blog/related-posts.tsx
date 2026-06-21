import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { Reveal } from "@/components/ui/reveal";
import { getAllPosts, formatDate } from "@/lib/blog";

type RelatedPostsProps = {
  limit?: number;
  eyebrow?: string;
  title?: string;
  tone?: "default" | "muted";
};

export function RelatedPosts({
  limit = 2,
  eyebrow = "Recursos",
  title = "Notas para el consejo de administración",
  tone = "default",
}: RelatedPostsProps) {
  const posts = getAllPosts().slice(0, limit);
  if (posts.length === 0) return null;

  return (
    <Section tone={tone} spacing="default">
      <Container>
        <Reveal>
          <div className="mb-10 max-w-[52ch]">
            <p className="text-xs font-medium uppercase tracking-[0.18em] text-terra-700">
              {eyebrow}
            </p>
            <h2 className="mt-3 font-display text-3xl leading-[1.1] tracking-tight text-balance text-navy-900 sm:text-[2.5rem]">
              {title}
            </h2>
          </div>
        </Reveal>

        <ul className="grid grid-cols-1 gap-5 sm:gap-6 md:grid-cols-2">
          {posts.map((post, i) => (
            <Reveal key={post.slug} delay={i * 0.06} className="h-full">
              <li className="h-full">
                <Link
                  href={`/blog/${post.slug}`}
                  className="group flex h-full flex-col rounded-2xl border border-cream-200 bg-cream-100/60 p-7 shadow-[var(--shadow-card)] transition-[box-shadow,border-color,background-color] duration-[600ms] ease-[cubic-bezier(0.22,0.61,0.36,1)] [@media(hover:hover)]:hover:border-navy-200/70 [@media(hover:hover)]:hover:bg-cream-50 [@media(hover:hover)]:hover:shadow-[var(--shadow-elevated)] sm:p-8"
                >
                  <time
                    dateTime={post.date}
                    className="text-xs font-medium uppercase tracking-[0.14em] text-ink-500"
                  >
                    {formatDate(post.date)}
                  </time>
                  <h3 className="mt-4 font-display text-[1.25rem] leading-tight tracking-tight text-navy-900">
                    {post.title}
                  </h3>
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
                </Link>
              </li>
            </Reveal>
          ))}
        </ul>
      </Container>
    </Section>
  );
}
