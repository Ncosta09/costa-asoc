import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo";
import { BlogIndex } from "@/components/blog/blog-index";

export const metadata: Metadata = buildMetadata({
  title: "Blog",
  description:
    "Notas sobre administración de consorcios, propiedad horizontal y gestión de expensas en CABA. Recursos prácticos para consejos de administración y propietarios.",
  path: "/blog",
});

export default function BlogPage() {
  return <BlogIndex page={1} />;
}
