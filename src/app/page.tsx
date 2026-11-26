import Link from "next/link";
import { ArrowRight, Check, ChevronRight, Minus, Quote, ShieldCheck } from "lucide-react";
import { Button, Container, Section } from "@/components/ui/common";
import { DawnMotif, Eyebrow, IconTile, SectionHeading, cardClass } from "@/components/ui/brand";
import { UpdateCard } from "@/components/cards/UpdateCard";
import { getAllPosts, getPageContent, publicFileExists } from "@/lib/mdx";
import { getIcon } from "@/lib/icons";
import type { HomeContent } from "@/lib/content-types";
import { cn } from "@/lib/utils";

export default async function HomePage() {
  const { meta } = await getPageContent<HomeContent>("home");
  const updates = (await getAllPosts("updates")).slice(0, 3);
  const { hero, difference, pillars, sadaqah, vision, trust } = meta;

  return (
    <div className="flex flex-col">
      {/* Hero */}
      <section className="relative overflow-hidden bg-brand-forest text-brand-ivory">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_80%_115%,rgba(232,168,48,0.22),transparent_55%)]" />
        <DawnMotif className="-bottom-4 right-[-220px] w-[760px] lg:right-[-60px]" />
        <Container className="relative py-20 sm:py-28 lg:py-32">
          <div className="max-w-3xl">
            <Eyebrow tone="dark">{hero.eyebrow}</Eyebrow>
            <h1 className="mt-7 font-display text-5xl font-semibold leading-[1.05] tracking-tight sm:text-6xl lg:text-7xl">{hero.title}</h1>
            <p className="mt-6 font-display text-2xl leading-snug text-brand-amber sm:text-3xl">{hero.subtitle}</p>
            <p className="mt-7 max-w-2xl text-lg leading-8 text-brand-ivory/85">{hero.description}</p>
            <div className="mt-10 flex flex-col gap-3 sm:flex-row">
              <Button asChild size="lg">
                <Link href={hero.primaryCta.href}>
                  {hero.primaryCta.label} <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </Link>
              </Button>
              <Button asChild size="lg" variant="outlineLight">
                <Link href={hero.secondaryCta.href}>{hero.secondaryCta.label}</Link>
              </Button>
            </div>
            <ul className="mt-12 flex flex-wrap gap-3">
              {hero.highlights.map((item) => (
                <li key={item} className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-brand-ivory/90">
                  <span className="h-1.5 w-1.5 rounded-full bg-brand-amber" aria-hidden="true" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </Container>
      </section>

      {/* Charity vs system */}
      <Section>
        <Container>
          <SectionHeading eyebrow={difference.eyebrow} title={difference.closing} />
          <div className="mt-12 grid gap-6 lg:grid-cols-2">
            <div className="rounded-3xl border border-brand-sand bg-brand-ivory p-8">
              <h3 className="font-display text-2xl font-semibold text-brand-sage">{difference.charity.title}</h3>
              <ul className="mt-6 space-y-3 text-brand-sage">
                {difference.charity.items.map((item) => (
                  <li key={item} className="flex items-center gap-3">
                    <Minus className="h-4 w-4 shrink-0 text-brand-sage/60" aria-hidden="true" />
                    {item}
                  </li>
                ))}
              </ul>
              <p className="mt-6 text-sm italic text-brand-sage">{difference.charity.note}</p>
            </div>
            <div className="relative overflow-hidden rounded-3xl bg-brand-forest p-8 text-brand-ivory shadow-xl">
              <DawnMotif className="-bottom-10 -right-24 w-[380px] opacity-70" />
              <h3 className="relative font-display text-2xl font-semibold text-brand-amber">{difference.system.title}</h3>
              <ul className="relative mt-6 space-y-3">
                {difference.system.items.map((item) => (
                  <li key={item} className="flex items-center gap-3">
                    <Check className="h-4 w-4 shrink-0 text-brand-amber" aria-hidden="true" />
                    {item}
                  </li>
                ))}
              </ul>
              <p className="relative mt-6 text-sm italic text-brand-amber">{difference.system.note}</p>
            </div>
          </div>
        </Container>
      </Section>

      {/* Pillars */}
      <Section tone="white">
        <Container>
          <SectionHeading eyebrow={pillars.eyebrow} title={pillars.title} align="center" />
          <div className="mt-14 grid gap-6 lg:grid-cols-3">
            {pillars.items.map((pillar) => (
              <article key={pillar.title} className={cn(cardClass, "group relative flex flex-col")}>
                <IconTile icon={getIcon(pillar.icon)} />
                <h3 className="mt-6 font-display text-2xl font-semibold text-brand-forest">{pillar.title}</h3>
                <p className="mt-4 leading-7 text-brand-sage">{pillar.description}</p>
                {pillar.href && (
                  <Link href={pillar.href} className="mt-auto inline-flex items-center gap-1.5 pt-6 text-sm font-semibold text-brand-pine after:absolute after:inset-0 group-hover:text-brand-gold">
                    Learn more <ChevronRight className="h-4 w-4 transition-transform group-hover:translate-x-1" aria-hidden="true" />
                    <span className="sr-only">about {pillar.title}</span>
                  </Link>
                )}
              </article>
            ))}
          </div>
        </Container>
      </Section>

      {/* Sadaqah Jariyah */}
      <Section tone="forest" className="relative overflow-hidden">
        <DawnMotif className="-bottom-6 left-1/2 w-[900px] -translate-x-1/2 opacity-60" />
        <Container className="relative">
          <div className="mx-auto max-w-4xl text-center">
            <Quote className="mx-auto h-10 w-10 text-brand-amber" aria-hidden="true" />
            <blockquote className="mt-6 font-display text-2xl leading-snug sm:text-3xl lg:text-4xl">{sadaqah.quote}</blockquote>
            <p className="mt-5 text-sm uppercase tracking-[0.22em] text-brand-ivory/70">— {sadaqah.attribution}</p>
            <ul className="mx-auto mt-12 grid max-w-3xl gap-3 text-left sm:grid-cols-2">
              {sadaqah.lines.map((line, i) => (
                <li
                  key={line}
                  className={cn(
                    "rounded-2xl border border-brand-amber/25 bg-white/[0.04] px-5 py-4 font-semibold text-brand-amber",
                    i === sadaqah.lines.length - 1 && "sm:col-span-2 border-brand-amber/60 bg-brand-amber/10 text-center"
                  )}
                >
                  {line}
                </li>
              ))}
            </ul>
            <Button asChild size="lg" className="mt-10">
              <Link href={sadaqah.cta.href}>{sadaqah.cta.label}</Link>
            </Button>
          </div>
        </Container>
      </Section>

      {/* Latest updates */}
      {updates.length > 0 && (
        <Section>
          <Container>
            <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
              <SectionHeading eyebrow={meta.updates.eyebrow} title={meta.updates.title} />
              <Link href={meta.updates.cta.href} className="inline-flex items-center gap-1.5 text-sm font-semibold text-brand-pine hover:text-brand-gold">
                {meta.updates.cta.label} <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Link>
            </div>
            <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {updates.map((update) => (
                <UpdateCard
                  key={update.slug}
                  slug={update.slug}
                  title={update.title}
                  summary={update.summary}
                  date={update.date}
                  tags={update.tags}
                  image={publicFileExists(update.coverImage) ? update.coverImage : undefined}
                />
              ))}
            </div>
          </Container>
        </Section>
      )}

      {/* Vision */}
      <Section tone="white">
        <Container>
          <SectionHeading title={vision.title} description={vision.description} align="center" />
          <ol className="mx-auto mt-14 flex max-w-4xl flex-col items-stretch gap-4 sm:flex-row sm:items-center">
            {vision.steps.map((step, i) => {
              const Icon = getIcon(step.icon);
              return (
                <li key={step.label} className="flex flex-1 flex-col items-center gap-4 sm:flex-row">
                  <div className={cn(cardClass, "flex w-full flex-col items-center gap-4 text-center")}>
                    <span className="inline-flex h-16 w-16 items-center justify-center rounded-full bg-brand-amber/15 text-brand-pine">
                      <Icon className="h-8 w-8" aria-hidden="true" />
                    </span>
                    <p className="font-display text-lg font-semibold text-brand-forest">{step.label}</p>
                  </div>
                  {i < vision.steps.length - 1 && (
                    <ChevronRight className="h-6 w-6 shrink-0 rotate-90 text-brand-amber sm:rotate-0" aria-hidden="true" />
                  )}
                </li>
              );
            })}
          </ol>
          <div className="mt-12 text-center">
            <Button asChild variant="outline" size="lg">
              <Link href={vision.cta.href}>{vision.cta.label}</Link>
            </Button>
          </div>
        </Container>
      </Section>

      {/* Trust */}
      <Section tone="forest" className="py-14 md:py-16 lg:py-16">
        <Container>
          <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {trust.items.map((item) => (
              <li key={item} className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/[0.04] px-5 py-4">
                <ShieldCheck className="h-5 w-5 shrink-0 text-brand-amber" aria-hidden="true" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
          <p className="mt-10 text-center font-display text-2xl text-brand-ivory">{trust.closing}</p>
        </Container>
      </Section>
    </div>
  );
}
