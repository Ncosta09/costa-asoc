import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { MDXRemote } from "next-mdx-remote/rsc";
import remarkGfm from "remark-gfm";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { Button } from "@/components/ui/button";
import { mdxComponents } from "@/components/blog/mdx-components";
import { getAllPosts, getPostBySlug, formatDate } from "@/lib/blog";
import { buildMetadata } from "@/lib/seo";
import { blogPostingSchema } from "@/lib/schema";

type Params = { slug: string };

export function generateStaticParams(): Params[] {
  return getAllPosts().map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) return {};

  const base = buildMetadata({
    title: post.title,
    description: post.description,
    path: `/blog/${post.slug}`,
  });

  return {
    ...base,
    openGraph: {
      ...base.openGraph,
      type: "article",
      publishedTime: post.date,
      authors: [post.author],
    },
  };
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<Params>;
}) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) notFound();

  return (
    <Section spacing="tight" className="pt-24 sm:pt-28">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(blogPostingSchema(post)),
        }}
      />
      <Container>
        <article className="mx-auto max-w-[44rem]">
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-[14px] font-medium text-ink-500 transition-colors hover:text-navy-900"
          >
            <ArrowLeft strokeWidth={1.75} className="h-4 w-4" />
            Volver al blog
          </Link>

          <header className="mt-8 border-b border-cream-200 pb-8">
            {post.tags[0] ? (
              <p className="text-xs font-medium uppercase tracking-[0.18em] text-terra-700">
                {post.tags[0]}
              </p>
            ) : null}
            <h1 className="mt-3 font-display text-[2.1rem] leading-[1.08] tracking-[-0.02em] text-balance text-navy-900 sm:text-[2.9rem]">
              {post.title}
            </h1>
            <div className="mt-5 flex items-center gap-3 text-[14px] text-ink-500">
              <time dateTime={post.date}>{formatDate(post.date)}</time>
              <span aria-hidden="true" className="h-1 w-1 rounded-full bg-cream-300" />
              <span>{post.author}</span>
            </div>
          </header>

          <div className="mt-8">
            <MDXRemote
              source={post.content}
              components={mdxComponents}
              options={{ mdxOptions: { remarkPlugins: [remarkGfm] } }}
            />
          </div>

          <footer className="mt-14 rounded-2xl border border-cream-200 bg-cream-100/60 p-8 sm:p-10">
            <h2 className="font-display text-[1.4rem] leading-tight tracking-tight text-navy-900">
              ¿Querés que revisemos tu consorcio?
            </h2>
            <p className="mt-3 max-w-[52ch] text-[15.5px] leading-relaxed text-ink-700">
              Coordinamos una primera reunión sin compromiso para conocer las necesidades
              del edificio y armar una propuesta a medida.
            </p>
            <div className="mt-6">
              <Button href="/contacto" variant="primary" size="lg">
                Solicitar propuesta sin cargo
              </Button>
            </div>
          </footer>
        </article>
      </Container>
    </Section>
  );
}
