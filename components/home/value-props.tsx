import Image from "next/image";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { Reveal } from "@/components/ui/reveal";
import { valueProps } from "@/content/philosophy";
import { cn } from "@/lib/utils";

const media = [
  {
    src: "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?auto=format&fit=crop&w=1400&q=80",
    alt: "Contador firmando documentación contable del consorcio",
  },
  {
    src: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?auto=format&fit=crop&w=1100&q=80",
    alt: "Comprobantes, liquidaciones y calculadora sobre un escritorio",
  },
  {
    src: "https://images.unsplash.com/photo-1521791136064-7986c2920216?auto=format&fit=crop&w=1100&q=80",
    alt: "Apretón de manos entre administrador y miembro del consejo",
  },
] as const;

type TileProps = {
  index: number;
  title: string;
  body: string;
  feature?: boolean;
  className?: string;
};

function Tile({ index, title, body, feature = false, className }: TileProps) {
  const img = media[index]!;
  return (
    <article
      className={cn(
        "group relative isolate overflow-hidden rounded-2xl ring-1 ring-navy-900/10",
        className,
      )}
    >
      <Image
        src={img.src}
        alt={img.alt}
        fill
        sizes={feature ? "(min-width: 768px) 50vw, 100vw" : "(min-width: 768px) 25vw, 100vw"}
        className="object-cover transition-transform duration-[900ms] ease-[cubic-bezier(0.33,1,0.68,1)] group-hover:scale-[1.045]"
      />
      {/* Warm ink scrim for legibility (kept neutral so photos stay natural) */}
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-gradient-to-t from-ink-900 via-ink-900/70 to-ink-900/15 transition-opacity duration-500 group-hover:via-ink-900/80"
      />

      <div
        className={cn(
          "absolute inset-0 flex flex-col justify-end",
          feature ? "p-8 sm:p-10" : "p-6 sm:p-7",
        )}
      >
        <span className="mb-3 inline-flex items-center gap-2.5 text-[11px] font-semibold uppercase tracking-[0.22em] text-terra-400">
          <span className="tabular-nums">{String(index + 1).padStart(2, "0")}</span>
          <span className="h-px w-6 bg-terra-400/60" aria-hidden="true" />
        </span>
        <h3
          className={cn(
            "font-display tracking-tight text-cream-50",
            feature ? "text-[2.1rem] leading-[1.08] sm:text-[2.6rem]" : "text-[1.6rem] leading-tight",
          )}
        >
          {title}
        </h3>
        <p
          className={cn(
            "mt-3 max-w-[48ch] text-pretty leading-relaxed text-cream-100/90",
            feature ? "text-[17px]" : "text-[15px]",
          )}
        >
          {body}
        </p>
      </div>
    </article>
  );
}

export function ValueProps() {
  const [first, ...rest] = valueProps;

  return (
    <Section tone="muted" spacing="default">
      <Container>
        <Reveal>
          <div className="mb-12 max-w-[52ch] sm:mb-14">
            <p className="text-xs font-medium uppercase tracking-[0.18em] text-terra-700">
              Diferencial
            </p>
            <h2 className="mt-3 font-display text-3xl leading-[1.1] tracking-tight text-balance text-navy-900 sm:text-[2.5rem]">
              Tres compromisos que sostenemos en cada consorcio
            </h2>
          </div>
        </Reveal>

        <Reveal delay={0.05}>
          <div className="grid gap-4 sm:gap-5 md:grid-cols-2">
            <Tile
              index={0}
              title={first!.title}
              body={first!.body}
              feature
              className="h-[22rem] md:h-[34rem]"
            />
            <div className="grid gap-4 sm:gap-5 md:grid-rows-2">
              {rest.map((prop, i) => (
                <Tile
                  key={prop.title}
                  index={i + 1}
                  title={prop.title}
                  body={prop.body}
                  className="h-[18rem] md:h-auto"
                />
              ))}
            </div>
          </div>
        </Reveal>
      </Container>
    </Section>
  );
}
