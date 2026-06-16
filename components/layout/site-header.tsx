"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import { Logo } from "@/components/ui/logo";
import { MobileDrawer } from "@/components/layout/mobile-drawer";
import { navLinks } from "@/content/site";
import { cn } from "@/lib/utils";

export function SiteHeader() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={cn(
        "sticky top-0 z-40 w-full transition-[background-color,backdrop-filter,border-color,box-shadow] duration-300 ease-[var(--ease-out-soft)]",
        scrolled
          ? "border-b border-cream-200/80 bg-cream-50/80 backdrop-blur-md supports-[backdrop-filter]:bg-cream-50/70"
          : "border-b border-transparent bg-transparent",
      )}
    >
      <Container className="grid h-[64px] grid-cols-[1fr_auto_1fr] items-center gap-6 sm:h-[72px]">
        <Link
          href="/"
          aria-label="Costa & Asociados — Inicio"
          className="-m-1 inline-flex items-center justify-self-start rounded-sm p-1"
        >
          <Logo priority />
        </Link>

        <nav aria-label="Principal" className="hidden justify-self-center lg:block">
          <ul className="flex items-center gap-1">
            {navLinks.map((link) => {
              const active =
                link.href === "/" ? pathname === "/" : pathname.startsWith(link.href);
              return (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    aria-current={active ? "page" : undefined}
                    className={cn(
                      "relative inline-flex items-center px-3.5 py-2 text-[16px] font-medium tracking-[-0.005em] transition-colors duration-200",
                      active
                        ? "text-navy-900"
                        : "text-ink-700 hover:text-navy-900",
                    )}
                  >
                    {link.label}
                    {active ? (
                      <span
                        aria-hidden="true"
                        className="absolute inset-x-3.5 bottom-1 h-[2px] rounded-full bg-terra-700"
                      />
                    ) : null}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        <div className="col-start-3 flex items-center gap-2 justify-self-end">
          <Button
            href="/contacto"
            variant="primary"
            size="default"
            className="hidden lg:inline-flex"
          >
            Solicitar propuesta
          </Button>
          <Button
            href="/contacto"
            variant="primary"
            size="sm"
            className="lg:hidden"
          >
            Solicitar propuesta
          </Button>
          <MobileDrawer />
        </div>
      </Container>
    </header>
  );
}
