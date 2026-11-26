import Link from "next/link";
import { Button, Container, Section } from "@/components/ui/common";
import { Eyebrow, PageHero } from "@/components/ui/brand";
import { getPageContent } from "@/lib/mdx";
import type { PipelineContent } from "@/lib/content-types";
import { cn } from "@/lib/utils";

export async function generateMetadata() {
  const { meta } = await getPageContent<PipelineContent>("pipeline");
  return { title: meta.title, description: meta.description };
}

export default async function PipelinePage() {
  const { meta } = await getPageContent<PipelineContent>("pipeline");
  const { hero, stages, pathway, why } = meta;

  return (
    <div className="flex flex-col">
      <PageHero eyebrow={hero.eyebrow} title={hero.title} description={hero.description} />

      {/* Five stages */}
      <Section>
        <Container>
          <ol className="relative grid gap-6 lg:grid-cols-5 lg:gap-4">
            {/* connector line (desktop) */}
            <div aria-hidden="true" className="absolute left-[10%] right-[10%] top-7 hidden h-0.5 bg-gradient-to-r from-brand-pine via-brand-gold to-brand-amber lg:block" />
            {stages.map((stage, i) => {
              const last = i === stages.length - 1;
              return (
                <li key={stage.title} className="relative flex gap-5 lg:flex-col lg:items-center lg:gap-0 lg:text-center">
                  <span
                    className={cn(
                      "relative z-10 inline-flex h-14 w-14 shrink-0 items-center justify-center rounded-full font-display text-lg font-semibold ring-8 ring-brand-cream",
                      last ? "bg-brand-amber text-brand-forest" : "bg-brand-forest text-brand-amber"
                    )}
                  >
                    0{i + 1}
                  </span>
                  <div
                    className={cn(
                      "flex-1 rounded-3xl border p-6 lg:mt-6 lg:w-full",
                      last ? "border-brand-amber bg-brand-amber/10" : "border-brand-sand bg-white"
                    )}
                  >
                    <p className="text-xs font-semibold uppercase tracking-[0.18em] text-brand-gold">{stage.detail}</p>
                    <h2 className="mt-2 font-display text-2xl font-semibold text-brand-forest">{stage.title}</h2>
                    <p className="mt-3 text-sm leading-6 text-brand-sage">{stage.description}</p>
                  </div>
                </li>
              );
            })}
          </ol>
        </Container>
      </Section>

      {/* Detailed pathway */}
      <Section tone="forest">
        <Container>
          <div className="grid gap-12 lg:grid-cols-[1fr_1.6fr]">
            <div className="lg:sticky lg:top-28 lg:self-start">
              <h2 className="font-display text-3xl font-semibold text-brand-amber sm:text-4xl">{pathway.title}</h2>
            </div>
            <ol className="relative space-y-4 border-l border-brand-amber/30 pl-8">
              {pathway.steps.map((step, i) => (
                <li key={step.title} className="relative rounded-2xl border border-white/10 bg-white/[0.04] p-6">
                  <span aria-hidden="true" className="absolute -left-[2.4rem] top-7 h-3 w-3 rounded-full bg-brand-amber ring-4 ring-brand-forest" />
                  <p className="text-xs font-semibold uppercase tracking-[0.18em] text-brand-amber/80">Step {i + 1}</p>
                  <h3 className="mt-1 font-display text-xl font-semibold text-brand-ivory">{step.title}</h3>
                  <p className="mt-2 text-brand-ivory/75">{step.description}</p>
                </li>
              ))}
            </ol>
          </div>
        </Container>
      </Section>

      {/* Why */}
      <Section>
        <Container>
          <div className="mx-auto max-w-3xl text-center">
            <Eyebrow>{why.eyebrow}</Eyebrow>
            <h2 className="mt-5 font-display text-3xl font-semibold text-brand-forest sm:text-4xl">{why.title}</h2>
            <p className="mt-5 text-lg leading-8 text-brand-sage">{why.description}</p>
            <Button asChild size="lg" className="mt-10">
              <Link href={why.cta.href}>{why.cta.label}</Link>
            </Button>
          </div>
        </Container>
      </Section>
    </div>
  );
}
