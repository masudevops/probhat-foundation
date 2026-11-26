"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Heart, Menu, X } from "lucide-react";
import { Container } from "@/components/ui/common";
import { Logo } from "@/components/layout/Logo";
import { cn } from "@/lib/utils";

const navigation = [
  { name: "Home", href: "/" },
  { name: "About", href: "/about" },
  { name: "Programs", href: "/programs" },
  { name: "Scholar Pipeline", href: "/pipeline" },
  { name: "Updates", href: "/updates" },
  { name: "Get Involved", href: "/get-involved" },
  { name: "Contact", href: "/contact" },
];

function isActive(pathname: string, href: string) {
  return href === "/" ? pathname === "/" : pathname === href || pathname.startsWith(`${href}/`);
}

export function Header() {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    if (!mobileMenuOpen) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setMobileMenuOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [mobileMenuOpen]);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-white/10 bg-brand-forest/95 text-brand-ivory backdrop-blur-lg">
      <Container className="flex h-20 items-center justify-between gap-4">
        <Logo />

        <nav aria-label="Main" className="hidden items-center gap-1 xl:flex">
          {navigation.map((item) => {
            const active = isActive(pathname, item.href);
            return (
              <Link
                key={item.name}
                href={item.href}
                aria-current={active ? "page" : undefined}
                className={cn(
                  "rounded-full px-3.5 py-2 text-sm font-medium transition-colors",
                  active ? "bg-white/10 text-brand-amber" : "text-brand-ivory/90 hover:text-brand-amber"
                )}
              >
                {item.name}
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-2">
          <Link
            href="/donate"
            className="hidden items-center gap-2 rounded-full bg-brand-amber px-5 py-3 text-sm font-semibold text-brand-forest transition hover:bg-brand-gold sm:inline-flex"
          >
            <Heart className="h-4 w-4" aria-hidden="true" />
            Donate
          </Link>
          <button
            type="button"
            className="inline-flex h-11 w-11 items-center justify-center rounded-full text-brand-ivory hover:bg-white/10 xl:hidden"
            onClick={() => setMobileMenuOpen((open) => !open)}
            aria-expanded={mobileMenuOpen}
            aria-controls="mobile-menu"
            aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
          >
            {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </Container>

      <div
        id="mobile-menu"
        className={cn(
          "fixed inset-x-0 top-20 z-40 max-h-[calc(100dvh-5rem)] overflow-y-auto border-b border-white/10 bg-brand-forest shadow-2xl transition duration-300 ease-out xl:hidden",
          mobileMenuOpen ? "translate-y-0 opacity-100" : "pointer-events-none invisible -translate-y-4 opacity-0"
        )}
      >
        <Container className="py-6">
          <nav aria-label="Mobile" className="space-y-1">
            {navigation.map((item) => {
              const active = isActive(pathname, item.href);
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  onClick={() => setMobileMenuOpen(false)}
                  aria-current={active ? "page" : undefined}
                  className={cn(
                    "block rounded-xl px-4 py-3 text-base font-semibold",
                    active ? "bg-white/10 text-brand-amber" : "text-brand-ivory hover:bg-white/5"
                  )}
                >
                  {item.name}
                </Link>
              );
            })}
          </nav>
          <Link
            href="/donate"
            onClick={() => setMobileMenuOpen(false)}
            className="mt-5 inline-flex h-12 w-full items-center justify-center gap-2 rounded-full bg-brand-amber text-sm font-semibold text-brand-forest hover:bg-brand-gold"
          >
            <Heart className="h-4 w-4" aria-hidden="true" />
            Donate
          </Link>
        </Container>
      </div>
    </header>
  );
}
