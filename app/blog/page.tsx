import { redirect } from "next/navigation";

// Placeholder de arquitectura — la carpeta blog queda lista para sumar contenido
// SEO más adelante sin refactor. Por ahora redirige a home.
export default function BlogPage(): never {
  redirect("/");
}
