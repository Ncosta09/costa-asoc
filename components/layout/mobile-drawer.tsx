"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { Button } from "@/components/ui/button";
import { Logo } from "@/components/ui/logo";
import { navLinks } from "@/content/site";
import { cn } from "@/lib/utils";

export function MobileDrawer() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const reduce = useReducedMotion();

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return (
    <>
      <button
        type="button"
        aria-label="Abrir menú"
        aria-expanded={open}
        aria-controls="mobile-drawer"
        onClick={() => setOpen(true)}
        className="inline-flex h-10 w-10 items-center justify-center rounded-md text-navy-900 transition-colors hover:bg-navy-100/60 lg:hidden"
      >
        <Menu strokeWidth={1.75} className="h-5 w-5" />
      </button>

      <AnimatePresence>
        {open ? (
          <motion.div
            key="overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: reduce ? 0 : 0.2 }}
            className="fixed inset-0 z-50 bg-ink-900/40 backdrop-blur-[2px] lg:hidden"
            onClick={() => setOpen(false)}
            aria-hidden="true"
          />
        ) : null}

        {open ? (
          <motion.aside
            id="mobile-drawer"
            key="drawer"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{
              duration: reduce ? 0 : 0.32,
              ease: [0.22, 1, 0.36, 1],
            }}
            role="dialog"
            aria-modal="true"
            aria-label="Menú"
            className="fixed inset-y-0 right-0 z-50 flex w-[88%] max-w-sm flex-col bg-cream-50 shadow-[0_24px_80px_-12px_rgba(13,45,92,0.25)] lg:hidden"
          >
            <div className="flex h-[64px] items-center justify-between border-b border-cream-200 px-5">
              <Logo />
              <button
                type="button"
                aria-label="Cerrar menú"
                onClick={() => setOpen(false)}
                className="inline-flex h-10 w-10 items-center justify-center rounded-md text-navy-900 transition-colors hover:bg-navy-100/60"
              >
                <X strokeWidth={1.75} className="h-5 w-5" />
              </button>
            </div>

            <nav aria-label="Menú móvil" className="flex-1 overflow-y-auto px-5 py-8">
              <ul className="flex flex-col gap-1">
                {navLinks.map((link) => {
                  const active =
                    link.href === "/" ? pathname === "/" : pathname.startsWith(link.href);
                  return (
                    <li key={link.href}>
                      <Link
                        href={link.href}
                        aria-current={active ? "page" : undefined}
                        className={cn(
                          "block rounded-md px-4 py-3 text-lg font-medium tracking-tight transition-colors",
                          active
                            ? "bg-navy-100/60 text-navy-900"
                            : "text-ink-800 hover:bg-cream-100",
                        )}
                      >
                        {link.label}
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </nav>

            <div className="border-t border-cream-200 p-5">
              <Button href="/contacto" variant="primary" size="lg" className="w-full">
                Solicitar propuesta
              </Button>
            </div>
          </motion.aside>
        ) : null}
      </AnimatePresence>
    </>
  );
}
