import { Facebook, Instagram, Linkedin, Mail, MapPin, Phone, type LucideIcon } from "lucide-react";
import { Container, Section } from "@/components/ui/common";
import { PageHero, SectionHeading, cardClass } from "@/components/ui/brand";
import { ContactForm } from "@/components/forms/ContactForm";
import { getPageContent } from "@/lib/mdx";
import { siteConfig, socialLinks } from "@/lib/site";
import type { ContactContent } from "@/lib/content-types";
import { cn } from "@/lib/utils";

const socialIcons: Record<string, LucideIcon> = { Facebook, Instagram, LinkedIn: Linkedin };

export async function generateMetadata() {
  const { meta } = await getPageContent<ContactContent>("contact");
  return { title: meta.title, description: meta.description };
}

export default async function ContactPage({ searchParams }: { searchParams: Promise<{ subject?: string }> }) {
  const { meta } = await getPageContent<ContactContent>("contact");
  const { subject } = await searchParams;
  const { hero, details, form } = meta;
  const defaultSubject = form.subjects.find((s) => s.toLowerCase() === subject?.toLowerCase());

  return (
    <div className="flex flex-col">
      <PageHero eyebrow={hero.eyebrow} title={hero.title} description={hero.description} />

      <Section>
        <Container>
          <div className="grid gap-10 lg:grid-cols-[1.3fr_0.7fr] lg:items-start">
            <div className={cn(cardClass, "p-6 sm:p-10")}>
              <h2 className="font-display text-2xl font-semibold text-brand-forest">{form.title}</h2>
              <div className="mt-6">
                <ContactForm subjects={form.subjects} defaultSubject={defaultSubject} />
              </div>
            </div>

            <aside className="rounded-3xl bg-brand-forest p-8 text-brand-ivory">
              <SectionHeading eyebrow={details.eyebrow} title={details.title} tone="dark" className="[&_h2]:text-2xl" />
              <ul className="mt-8 space-y-6">
                {siteConfig.email && (
                  <li className="flex gap-4">
                    <Mail className="mt-1 h-5 w-5 shrink-0 text-brand-amber" aria-hidden="true" />
                    <div>
                      <p className="text-sm font-semibold uppercase tracking-wider text-brand-ivory/60">Email</p>
                      <a href={`mailto:${siteConfig.email}`} className="break-all text-lg hover:text-brand-amber">{siteConfig.email}</a>
                    </div>
                  </li>
                )}
                {siteConfig.phone && (
                  <li className="flex gap-4">
                    <Phone className="mt-1 h-5 w-5 shrink-0 text-brand-amber" aria-hidden="true" />
                    <div>
                      <p className="text-sm font-semibold uppercase tracking-wider text-brand-ivory/60">Phone</p>
                      <a href={`tel:${siteConfig.phone.replace(/[^+\d]/g, "")}`} className="text-lg hover:text-brand-amber">{siteConfig.phone}</a>
                    </div>
                  </li>
                )}
                <li className="flex gap-4">
                  <MapPin className="mt-1 h-5 w-5 shrink-0 text-brand-amber" aria-hidden="true" />
                  <div>
                    <p className="text-sm font-semibold uppercase tracking-wider text-brand-ivory/60">Location</p>
                    <p className="text-lg">{siteConfig.location}</p>
                  </div>
                </li>
              </ul>
              {socialLinks.length > 0 && (
                <div className="mt-8 border-t border-white/10 pt-6">
                  <p className="text-sm font-semibold uppercase tracking-wider text-brand-ivory/60">Follow our work</p>
                  <div className="mt-4 flex flex-wrap gap-3">
                    {socialLinks.map((item) => {
                      const Icon = socialIcons[item.name];
                      return (
                        <a
                          key={item.name}
                          href={item.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-2 rounded-full border border-brand-ivory/20 px-4 py-2.5 text-sm font-semibold transition hover:border-brand-amber hover:bg-brand-amber hover:text-brand-forest"
                        >
                          <Icon className="h-4 w-4" aria-hidden="true" />
                          {item.name}
                          <span className="sr-only">(opens in a new tab)</span>
                        </a>
                      );
                    })}
                  </div>
                </div>
              )}
            </aside>
          </div>
        </Container>
      </Section>
    </div>
  );
}
