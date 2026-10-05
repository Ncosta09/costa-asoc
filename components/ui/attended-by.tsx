import Image from "next/image";
import { site } from "@/content/site";
import { cn } from "@/lib/utils";

/**
 * "Los atiende Gabriel A. Costa": pone cara y matrícula al lado del pedido.
 * Hasta ahora el nombre del titular estaba en el schema pero nunca en pantalla
 * en las páginas que venden (auditoría de /servicios, 2026-09-18).
 */

const rpa = site.registries.find((r) => r.short.startsWith("RPA"))?.short ?? "";

type AttendedByProps = {
  tone?: "light" | "dark";
  className?: string;
};

export function AttendedBy({ tone = "light", className }: AttendedByProps) {
  const dark = tone === "dark";
  return (
    <div className={cn("flex items-center gap-3.5", className)}>
      <span
        className={cn(
          "relative h-14 w-14 shrink-0 overflow-hidden rounded-full ring-1",
          dark ? "bg-navy-800 ring-cream-50/25" : "bg-cream-100 ring-cream-300",
        )}
      >
        <Image
          // Recorte cuadrado de /nosotros/gabriel-costa.jpg (cara y hombros), hecho
          // con sips: la foto entera en 56px dejaba la cara del tamaño de un botón.
          src="/nosotros/gabriel-costa-avatar.jpg"
          // El nombre ya está al lado en texto: la foto es decorativa.
          alt=""
          fill
          sizes="56px"
          className="object-cover"
        />
      </span>
      <p className={cn("text-[14.5px] leading-snug", dark ? "text-cream-100/85" : "text-ink-700")}>
        Los atiende{" "}
        <span className={cn("font-medium", dark ? "text-cream-50" : "text-navy-900")}>
          {site.principal.name}
        </span>
        <br />
        {site.principal.credential}, {rpa}
      </p>
    </div>
  );
}
