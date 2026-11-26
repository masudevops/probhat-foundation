import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Button, Container, Section } from "@/components/ui/common";
import { DawnMotif, Eyebrow, IconTile, PageHero, cardClass } from "@/components/ui/brand";
import { getPageContent } from "@/lib/mdx";
import { getIcon } from "@/lib/icons";
import type { GetInvolvedContent } from "@/lib/content-types";
import { cn } from "@/lib/utils";

export async function generateMetadata() {
  const { meta } = await getPageContent<GetInvolvedContent>("get-involved");
  return { title: meta.title, description: meta.description };
}

export default async function GetInvolvedPage() {
  const { meta } = await getPageContent<GetInvolvedContent>("get-involved");
  const { hero, foundingDonor, ways, donateCta } = meta;

  return (
    <div className="flex flex-col">
      <PageHero eyebrow={hero.eyebrow} title={hero.title} description={hero.description} />

      {/* Founding donor */}
      <Section>
        <Container>
          <div className="relative overflow-hidden rounded-[2rem] bg-brand-forest p-8 text-brand-ivory shadow-xl sm:p-12">
            <DawnMotif className="-bottom-8 -right-20 w-[520px] opacity-80" />
            <div className="relative max-w-2xl">
              <Eyebrow tone="dark">{foundingDonor.eyebrow}</Eyebrow>
              <h2 className="mt-5 font-display text-3xl font-semibold sm:text-4xl">{foundingDonor.title}</h2>
              <div className="mt-5 space-y-3 text-lg leading-8 text-brand-ivory/85">
                {foundingDonor.paragraphs.map((p) => (
                  <p key={p}>{p}</p>
                ))}
              </div>
              <Button asChild size="lg" className="mt-8">
                <Link href={foundingDonor.cta.href}>{foundingDonor.cta.label}</Link>
              </Button>
            </div>
          </div>
        </Container>
      </Section>

      {/* Ways to help */}
      <Section tone="white">
        <Container>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {ways.map((way, i) => (
              <article key={way.title} className={cn(cardClass, "group relative flex flex-col", i === ways.length - 1 && ways.length % 3 === 2 && "lg:col-span-2")}>
                <IconTile icon={getIcon(way.icon)} />
                <h3 className="mt-5 font-display text-xl font-semibold text-brand-forest">{way.title}</h3>
                <p className="mt-3 leading-7 text-brand-sage">{way.description}</p>
                {way.cta && (
                  <Link
                    href={way.cta.href}
                    className="mt-auto inline-flex items-center gap-1.5 pt-6 text-sm font-semibold text-brand-pine after:absolute after:inset-0 group-hover:text-brand-gold"
                  >
                    {way.cta.label} <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" aria-hidden="true" />
                  </Link>
                )}
              </article>
            ))}
          </div>
        </Container>
      </Section>

      {/* Donate CTA */}
      <Section>
        <Container>
          <div className="rounded-[2rem] border border-brand-amber/40 bg-brand-amber/10 p-8 text-center sm:p-12">
            <h2 className="font-display text-3xl font-semibold text-brand-forest">{donateCta.title}</h2>
            <p className="mt-3 text-lg text-brand-sage">{donateCta.description}</p>
            <Button asChild size="lg" className="mt-8">
              <Link href={donateCta.cta.href}>{donateCta.cta.label}</Link>
            </Button>
          </div>
        </Container>
      </Section>
    </div>
  );
}
