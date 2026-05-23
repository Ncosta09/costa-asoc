import Link from "next/link";
import { Container } from "@/components/ui/container";
import { Logo } from "@/components/ui/logo";
import { site, navLinks } from "@/content/site";

export function SiteFooter() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-cream-200 bg-cream-100 text-ink-800">
      <Container className="py-16">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-12 md:gap-10">
          <div className="md:col-span-5">
            <Logo variant="stacked" />
            <p className="mt-6 max-w-[36ch] text-[15px] leading-relaxed text-ink-700">
              {site.description}
            </p>
          </div>

          <div className="md:col-span-3">
            <h2 className="font-display text-sm uppercase tracking-[0.12em] text-navy-900">
              Navegación
            </h2>
            <ul className="mt-5 flex flex-col gap-2.5 text-[15px]">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-ink-700 transition-colors hover:text-navy-900"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="md:col-span-4">
            <h2 className="font-display text-sm uppercase tracking-[0.12em] text-navy-900">
              Contacto
            </h2>
            <ul className="mt-5 flex flex-col gap-3 text-[15px] text-ink-700">
              <li>
                <span className="block font-medium text-ink-800">{site.address.street}</span>
                <span className="block">{site.address.city}</span>
              </li>
              <li>
                <a
                  href={site.contact.phoneHref}
                  className="transition-colors hover:text-navy-900"
                >
                  {site.contact.phone}
                </a>
              </li>
              <li>
                <a
                  href={site.contact.emailHref}
                  className="transition-colors hover:text-navy-900"
                >
                  {site.contact.email}
                </a>
              </li>
              <li className="text-ink-700">{site.hours.label}</li>
            </ul>

            <h2 className="mt-8 font-display text-sm uppercase tracking-[0.12em] text-navy-900">
              Matrículas
            </h2>
            <ul className="mt-5 flex flex-col gap-2 text-[14px] text-ink-700">
              {site.registries.map((r) => (
                <li key={r.label}>
                  <span className="font-medium text-ink-900">{r.short}</span>
                  <span className="ml-2 text-ink-700">— {r.full}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-14 flex flex-col gap-3 border-t border-cream-200 pt-8 text-[13px] text-ink-700 sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {year} {site.legalName}. Todos los derechos reservados.
          </p>
          <p>Estudio contable matriculado · CABA</p>
        </div>
      </Container>
    </footer>
  );
}
