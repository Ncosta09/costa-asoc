import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo";
import { blogSchema } from "@/lib/schema";
import { getAllPosts } from "@/lib/blog";
import { BlogIndex } from "@/components/blog/blog-index";

const DESCRIPTION =
  "Notas sobre administración de consorcios, propiedad horizontal y gestión de expensas en CABA. Recursos prácticos para consejos de administración y propietarios.";

export const metadata: Metadata = buildMetadata({
  title: "Blog",
  description: DESCRIPTION,
  path: "/blog",
});

export default function BlogPage() {
  return (
    <>
      {/* Blog como entidad, con todas las notas (no solo las de la página 1). */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(blogSchema(getAllPosts(), DESCRIPTION)),
        }}
      />
      <BlogIndex page={1} />
    </>
  );
}
