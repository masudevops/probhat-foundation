import Link from "next/link";
import { ArrowRight, Check } from "lucide-react";
import { Button, Container, Section } from "@/components/ui/common";
import { IconTile, PageHero, SectionHeading, cardClass } from "@/components/ui/brand";
import { ProgramCard } from "@/components/cards/ProgramCard";
import { getAllPosts, getPageContent } from "@/lib/mdx";
import { getIcon } from "@/lib/icons";
import type { ProgramsContent } from "@/lib/content-types";
import { cn } from "@/lib/utils";

export async function generateMetadata() {
  const { meta } = await getPageContent<ProgramsContent>("programs");
  return { title: meta.title, description: meta.description };
}

export default async function ProgramsPage() {
  const { meta } = await getPageContent<ProgramsContent>("programs");
  const programs = await getAllPosts("programs");
  const { hero, pillars, pipeline, selfSufficiency } = meta;

  return (
    <div className="flex flex-col">
      <PageHero eyebrow={hero.eyebrow} title={hero.title} description={hero.description}>
        <nav aria-label="Pillars" className="mt-10 flex flex-wrap gap-3">
          {pillars.map((pillar) => {
            const Icon = getIcon(pillar.icon);
            return (
              <a
                key={pillar.id}
                href={`#${pillar.id}`}
                className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-2 text-sm font-medium text-brand-ivory transition hover:border-brand-amber hover:text-brand-amber"
              >
                <Icon className="h-4 w-4 text-brand-amber" aria-hidden="true" />
                {pillar.title}
              </a>
            );
          })}
        </nav>
      </PageHero>

      {pillars.map((pillar, index) => {
        const related = programs.filter((p) => p.pillar === pillar.id);
        return (
          <Section key={pillar.id} id={pillar.id} tone={index % 2 === 0 ? "cream" : "white"} className="scroll-mt-20">
            <Container>
              <div className="flex flex-col gap-6 sm:flex-row sm:items-start">
                <IconTile icon={getIcon(pillar.icon)} className="h-14 w-14" />
                <div className="max-w-3xl">
                  <p className="text-sm font-semibold uppercase tracking-[0.2em] text-brand-gold">Pillar {index + 1}</p>
                  <h2 className="mt-2 font-display text-3xl font-semibold text-brand-forest sm:text-4xl">{pillar.title}</h2>
                  <p className="mt-4 text-lg leading-8 text-brand-sage">{pillar.description}</p>
                </div>
              </div>

              {(pillar.featured || pillar.items) && (
                <div className="mt-12 grid gap-6 lg:grid-cols-2">
                  {pillar.featured && (
                    <article className="flex flex-col justify-between rounded-3xl bg-brand-forest p-8 text-brand-ivory shadow-xl sm:p-10">
                      <div>
                        <span className="text-xs font-semibold uppercase tracking-[0.22em] text-brand-amber">Featured</span>
                        <h3 className="mt-4 font-display text-3xl font-semibold">{pillar.featured.title}</h3>
                        <p className="mt-4 text-lg leading-8 text-brand-ivory/85">{pillar.featured.description}</p>
                      </div>
                      {pillar.featured.cta && (
                        <Button asChild size="lg" className="mt-8 self-start">
                          <Link href={pillar.featured.cta.href}>{pillar.featured.cta.label}</Link>
                        </Button>
                      )}
                    </article>
                  )}
                  {pillar.items && (
                    <div className="grid gap-4 sm:grid-cols-2">
                      {pillar.items.map((item) => (
                        <article key={item.title} className={cn(cardClass, "p-6")}>
                          <h3 className="font-semibold text-brand-forest">{item.title}</h3>
                          <p className="mt-2 text-sm leading-6 text-brand-sage">{item.description}</p>
                        </article>
                      ))}
                    </div>
                  )}
                </div>
              )}

              {pillar.focusAreas && (
                <ul className="mt-10 flex flex-wrap gap-3">
                  {pillar.focusAreas.map((area) => (
                    <li key={area} className="inline-flex items-center gap-2 rounded-full border border-brand-sand bg-white px-4 py-2 text-sm font-medium text-brand-forest">
                      <Check className="h-4 w-4 text-brand-gold" aria-hidden="true" />
                      {area}
                    </li>
                  ))}
                </ul>
              )}

              {related.length > 0 && (
                <div className="mt-12">
                  <h3 className="text-sm font-semibold uppercase tracking-[0.2em] text-brand-sage">Programmes in this pillar</h3>
                  <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                    {related.map((program) => (
                      <ProgramCard key={program.slug} slug={program.slug} title={program.title} description={program.summary} iconName={program.icon} />
                    ))}
                  </div>
                </div>
              )}
            </Container>
          </Section>
        );
      })}

      {/* Scholar pipeline summary */}
      <Section tone="forest">
        <Container>
          <SectionHeading eyebrow={pipeline.eyebrow} title={pipeline.title} tone="dark" />
          <ol className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
            {pipeline.steps.map((step, i) => (
              <li
                key={step.title}
                className={cn(
                  "relative rounded-3xl border p-6",
                  i === pipeline.steps.length - 1 ? "border-brand-amber bg-brand-amber text-brand-forest" : "border-white/10 bg-white/[0.04]"
                )}
              >
                <span className={cn("font-display text-3xl font-semibold", i === pipeline.steps.length - 1 ? "text-brand-forest/70" : "text-brand-amber")}>
                  0{i + 1}
                </span>
                <h3 className="mt-3 font-display text-xl font-semibold">{step.title}</h3>
                <p className={cn("mt-2 text-sm leading-6", i === pipeline.steps.length - 1 ? "text-brand-forest/80" : "text-brand-ivory/75")}>{step.description}</p>
              </li>
            ))}
          </ol>
          <Link href={pipeline.cta.href} className="mt-10 inline-flex items-center gap-1.5 font-semibold text-brand-amber hover:text-brand-ivory">
            {pipeline.cta.label} <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </Link>
        </Container>
      </Section>

      {/* Self-sufficiency */}
      <Section>
        <Container>
          <SectionHeading title={selfSufficiency.title} description={selfSufficiency.description} />
          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {selfSufficiency.items.map((item) => (
              <article key={item.title} className={cardClass}>
                <IconTile icon={getIcon(item.icon)} />
                <h3 className="mt-5 font-display text-xl font-semibold text-brand-forest">{item.title}</h3>
                <p className="mt-3 leading-7 text-brand-sage">{item.description}</p>
              </article>
            ))}
          </div>
        </Container>
      </Section>
    </div>
  );
}
