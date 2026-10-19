import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { buildMetadata } from "@/lib/seo";
import { BlogIndex } from "@/components/blog/blog-index";
import { blogPageCount, blogPagePath } from "@/lib/blog";

type Params = { n: string };

// La página 1 es /blog: acá solo de la 2 en adelante. Cualquier otro valor da 404.
export const dynamicParams = false;

export function generateStaticParams(): Params[] {
  return Array.from({ length: Math.max(0, blogPageCount() - 1) }, (_, i) => ({ n: String(i + 2) }));
}

function parsePage(n: string): number | null {
  if (!/^[0-9]+$/.test(n)) return null;
  const page = Number(n);
  return page >= 2 && page <= blogPageCount() ? page : null;
}

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const page = parsePage((await params).n);
  if (!page) return {};
  return buildMetadata({
    title: `Blog, página ${page}`,
    description: `Notas anteriores sobre administración de consorcios, propiedad horizontal y expensas en CABA (página ${page}).`,
    path: blogPagePath(page),
  });
}

export default async function BlogPaginatedPage({ params }: { params: Promise<Params> }) {
  const page = parsePage((await params).n);
  if (!page) notFound();
  return <BlogIndex page={page} />;
}
