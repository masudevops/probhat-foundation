import Link from "next/link";
import { Facebook, Instagram, Linkedin, Mail, MapPin, Phone, type LucideIcon } from "lucide-react";
import { Container } from "@/components/ui/common";
import { Logo } from "@/components/layout/Logo";
import { siteConfig, socialLinks } from "@/lib/site";

const navigation = {
  organisation: [
    { name: "About", href: "/about" },
    { name: "Programs", href: "/programs" },
    { name: "Scholar Pipeline", href: "/pipeline" },
    { name: "Initiatives", href: "/initiatives" },
    { name: "Updates", href: "/updates" },
    { name: "Impact Reports", href: "/reports" },
  ],
  involvement: [
    { name: "Donate", href: "/donate" },
    { name: "Give Zakat", href: "/donate?fund=zakat" },
    { name: "Get Involved", href: "/get-involved" },
    { name: "Contact", href: "/contact" },
  ],
};

const socialIcons: Record<string, LucideIcon> = { Facebook, Instagram, LinkedIn: Linkedin };

function FooterLinks({ title, links }: { title: string; links: { name: string; href: string }[] }) {
  return (
    <div>
      <h3 className="text-xs font-semibold uppercase tracking-[0.2em] text-brand-amber">{title}</h3>
      <ul className="mt-5 space-y-3 text-sm text-brand-ivory/80">
        {links.map((item) => (
          <li key={item.name}>
            <Link href={item.href} className="transition-colors hover:text-brand-amber">
              {item.name}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export function Footer() {
  return (
    <footer className="bg-brand-forest text-brand-ivory">
      <Container className="py-16">
        <div className="grid gap-12 sm:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr_1.2fr]">
          <div className="space-y-4">
            <Logo showBengali={false} />
            <p className="max-w-xs text-sm text-brand-ivory/80">{siteConfig.tagline}</p>
            <p lang="bn" className="font-bengali text-sm text-brand-ivory/70">{siteConfig.taglineBengali}</p>
          </div>

          <FooterLinks title="Organisation" links={navigation.organisation} />
          <FooterLinks title="Get Involved" links={navigation.involvement} />

          <div>
            <h3 className="text-xs font-semibold uppercase tracking-[0.2em] text-brand-amber">Contact</h3>
            <ul className="mt-5 space-y-3 text-sm text-brand-ivory/80">
              {siteConfig.email && (
                <li className="flex items-center gap-2">
                  <Mail className="h-4 w-4 text-brand-amber" aria-hidden="true" />
                  <a href={`mailto:${siteConfig.email}`} className="hover:text-brand-amber">{siteConfig.email}</a>
                </li>
              )}
              {siteConfig.phone && (
                <li className="flex items-center gap-2">
                  <Phone className="h-4 w-4 text-brand-amber" aria-hidden="true" />
                  <a href={`tel:${siteConfig.phone.replace(/[^+\d]/g, "")}`} className="hover:text-brand-amber">{siteConfig.phone}</a>
                </li>
              )}
              <li className="flex items-center gap-2">
                <MapPin className="h-4 w-4 text-brand-amber" aria-hidden="true" />
                {siteConfig.location}
              </li>
            </ul>
            {socialLinks.length > 0 && (
              <div className="mt-6 flex gap-3">
                {socialLinks.map((item) => {
                  const Icon = socialIcons[item.name];
                  return (
                    <a
                      key={item.name}
                      href={item.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-brand-ivory/20 text-brand-ivory/90 transition hover:border-brand-amber hover:bg-brand-amber hover:text-brand-forest"
                    >
                      <span className="sr-only">{item.name} (opens in a new tab)</span>
                      <Icon className="h-5 w-5" aria-hidden="true" />
                    </a>
                  );
                })}
              </div>
            )}
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-2 border-t border-white/10 pt-6 text-sm text-brand-ivory/65 sm:flex-row sm:justify-between">
          <p>{siteConfig.footerNote}</p>
          <p>© {new Date().getFullYear()} {siteConfig.name}. All rights reserved.</p>
        </div>
      </Container>
    </footer>
  );
}
