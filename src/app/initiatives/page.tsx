import { CalendarDays, FileText } from "lucide-react";
import { Container, Section } from "@/components/ui/common";
import { PageHero, SectionHeading, cardClass } from "@/components/ui/brand";
import { getPageContent } from "@/lib/mdx";
import type { InitiativesContent } from "@/lib/content-types";

export async function generateMetadata() {
    const { meta } = await getPageContent<InitiativesContent>("initiatives");
    return { title: meta.title, description: meta.description };
}

export default async function InitiativesPage() {
    const { meta } = await getPageContent<InitiativesContent>("initiatives");
    const { hero, timeline, documentation } = meta;

    return (
        <div className="flex flex-col">
            <PageHero eyebrow={hero.eyebrow} title={hero.title} description={hero.description} />

            <Section>
                <Container>
                    <div className="mx-auto max-w-3xl">
                        <SectionHeading title={timeline.title} description={timeline.description} align="center" />
                        <ol className="relative mt-14 space-y-8 border-l-2 border-brand-amber/30 pl-8">
                            {timeline.items.map((item) => (
                                <li key={item.title} className="relative">
                                    <span aria-hidden="true" className="absolute -left-[2.55rem] top-8 h-4 w-4 rounded-full bg-brand-amber ring-4 ring-brand-cream" />
                                    <div className={cardClass}>
                                        <div className="flex flex-wrap items-center gap-3">
                                            <span className="inline-flex items-center gap-2 rounded-full bg-brand-forest px-3 py-1 text-sm font-semibold text-brand-amber">
                                                <CalendarDays className="h-4 w-4" aria-hidden="true" />
                                                {item.year}
                                            </span>
                                            <span className="rounded-full bg-brand-amber/15 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-brand-pine">{item.status}</span>
                                        </div>
                                        <h3 className="mt-4 font-display text-2xl font-semibold text-brand-forest">{item.title}</h3>
                                        <p className="mt-3 leading-7 text-brand-sage">{item.description}</p>
                                        {item.note && (
                                            <p className="mt-5 flex items-center gap-2 text-sm text-brand-sage">
                                                <FileText className="h-4 w-4 text-brand-gold" aria-hidden="true" />
                                                {item.note}
                                            </p>
                                        )}
                                    </div>
                                </li>
                            ))}
                            <li className="relative">
                                <span aria-hidden="true" className="absolute -left-[2.55rem] top-8 h-4 w-4 rounded-full border-2 border-brand-amber/50 bg-brand-cream" />
                                <div className="rounded-3xl border border-dashed border-brand-sand bg-brand-ivory/60 p-7">
                                    <h3 className="font-display text-xl font-semibold text-brand-forest">{timeline.future.title}</h3>
                                    <p className="mt-2 text-brand-sage">{timeline.future.description}</p>
                                </div>
                            </li>
                        </ol>
                    </div>
                </Container>
            </Section>

            <Section tone="white">
                <Container>
                    <SectionHeading title={documentation.title} description={documentation.description} align="center" />
                    <div className="mx-auto mt-12 grid max-w-4xl gap-6 sm:grid-cols-2">
                        {documentation.items.map((item) => (
                            <div key={item.title} className={cardClass}>
                                <h3 className="font-display text-lg font-semibold text-brand-forest">{item.title}</h3>
                                <p className="mt-2 text-brand-sage">{item.description}</p>
                            </div>
                        ))}
                    </div>
                </Container>
            </Section>
        </div>
    );
}
