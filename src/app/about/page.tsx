import Link from "next/link";
import { ChevronRight, Sun } from "lucide-react";
import { Button, Container, Section } from "@/components/ui/common";
import { DawnMotif, Eyebrow, IconTile, PageHero, SectionHeading, cardClass, darkCardClass } from "@/components/ui/brand";
import { getPageContent } from "@/lib/mdx";
import { getIcon } from "@/lib/icons";
import type { AboutContent } from "@/lib/content-types";
import { cn } from "@/lib/utils";

export async function generateMetadata() {
  const { meta } = await getPageContent<AboutContent>("about");
  return { title: meta.title, description: meta.description };
}

export default async function AboutPage() {
  const { meta } = await getPageContent<AboutContent>("about");
  const { hero, story, pillars, vision, team, values } = meta;

  return (
    <div className="flex flex-col">
      <PageHero eyebrow={hero.eyebrow} title={hero.title} description={hero.description} />

      {/* Story */}
      <Section>
        <Container>
          <div className="grid items-center gap-12 lg:grid-cols-[1.5fr_1fr]">
            <div>
              <SectionHeading title={story.title} />
              <div className="mt-6 space-y-5 text-lg leading-8 text-brand-sage">
                {story.paragraphs.map((p) => (
                  <p key={p}>{p}</p>
                ))}
              </div>
            </div>
            <div className="relative isolate flex aspect-square items-center justify-center overflow-hidden rounded-[2.5rem] bg-brand-forest">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_70%,rgba(232,168,48,0.3),transparent_60%)]" />
              <DawnMotif className="bottom-[22%] left-1/2 w-[140%] -translate-x-1/2" />
              <div className="absolute inset-x-0 bottom-0 h-[22%] bg-brand-pine" />
              <div className="relative -mt-[12%] flex flex-col items-center gap-3 text-center">
                <Sun className="h-12 w-12 text-brand-amber" aria-hidden="true" />
                <p lang="bn" className="font-bengali text-3xl font-semibold text-brand-ivory">প্রভাত</p>
                <p className="text-sm uppercase tracking-[0.3em] text-brand-amber">Dawn</p>
              </div>
            </div>
          </div>
        </Container>
      </Section>

      {/* Pillars */}
      <Section tone="white">
        <Container>
          <Eyebrow>{pillars.eyebrow}</Eyebrow>
          <div className="mt-10 grid gap-6 lg:grid-cols-3">
            {pillars.items.map((pillar) => (
              <article key={pillar.title} className={cardClass}>
                <IconTile icon={getIcon(pillar.icon)} />
                <h3 className="mt-6 font-display text-2xl font-semibold text-brand-forest">{pillar.title}</h3>
                <p className="mt-4 leading-7 text-brand-sage">{pillar.description}</p>
              </article>
            ))}
          </div>
          <div className="mt-10 text-center">
            <Button asChild variant="outline" size="lg">
              <Link href={pillars.cta.href}>{pillars.cta.label}</Link>
            </Button>
          </div>
        </Container>
      </Section>

      {/* Vision */}
      <Section tone="forest" className="relative overflow-hidden">
        <DawnMotif className="-bottom-6 left-1/2 w-[900px] -translate-x-1/2 opacity-50" />
        <Container className="relative">
          <h2 className="mx-auto max-w-4xl text-center font-display text-3xl font-semibold leading-tight text-brand-amber sm:text-4xl">{vision.title}</h2>
          <ol className="mx-auto mt-12 grid max-w-4xl gap-4 sm:grid-cols-3">
            {vision.steps.map((step) => {
              const Icon = getIcon(step.icon);
              return (
                <li key={step.label} className={cn(darkCardClass, "flex flex-col items-center gap-4 text-center")}>
                  <Icon className="h-8 w-8 text-brand-amber" aria-hidden="true" />
                  <span className="font-display text-lg font-semibold">{step.label}</span>
                </li>
              );
            })}
          </ol>
        </Container>
      </Section>

      {/* Values */}
      <Section>
        <Container>
          <Eyebrow>{values.eyebrow}</Eyebrow>
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {values.items.map((value, i) => (
              <div key={value.title} className={cardClass}>
                <span className="font-display text-sm font-semibold text-brand-gold">0{i + 1}</span>
                <h3 className="mt-3 font-display text-xl font-semibold text-brand-forest">{value.title}</h3>
                <p className="mt-3 leading-7 text-brand-sage">{value.description}</p>
              </div>
            ))}
          </div>
        </Container>
      </Section>

      {/* Team */}
      <Section className="pt-0 md:pt-0 lg:pt-0">
        <Container>
          <div className="rounded-3xl border border-brand-sand bg-brand-ivory p-8 sm:p-12">
            <div className="grid gap-8 lg:grid-cols-[1fr_auto] lg:items-center">
              <div>
                <h2 className="font-display text-3xl font-semibold text-brand-forest">{team.title}</h2>
                <div className="mt-4 max-w-3xl space-y-4 text-brand-sage">
                  {team.paragraphs.map((p) => (
                    <p key={p}>{p}</p>
                  ))}
                </div>
              </div>
              <Button asChild variant="secondary" size="lg">
                <Link href="/contact?subject=General%20Enquiry">
                  Request governance documents <ChevronRight className="h-4 w-4" aria-hidden="true" />
                </Link>
              </Button>
            </div>
          </div>
        </Container>
      </Section>
    </div>
  );
}
