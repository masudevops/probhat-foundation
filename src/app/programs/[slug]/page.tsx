import fs from "fs";
import path from "path";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, Heart } from "lucide-react";
import { Button, Container, Section } from "@/components/ui/common";
import { DawnMotif, IconTile } from "@/components/ui/brand";
import { ProgramCard } from "@/components/cards/ProgramCard";
import { getAllPosts, getPageContent, getPostBySlug } from "@/lib/mdx";
import { getIcon } from "@/lib/icons";
import type { ProgramsContent } from "@/lib/content-types";

type Params = { params: Promise<{ slug: string }> };

function programExists(slug: string) {
    return /^[a-z0-9-]+$/i.test(slug) && fs.existsSync(path.join(process.cwd(), "content", "programs", `${slug}.mdx`));
}

export async function generateStaticParams() {
    return (await getAllPosts("programs")).map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Params) {
    const { slug } = await params;
    if (!programExists(slug)) return { title: "Program Not Found" };
    const { meta } = await getPostBySlug(slug, "programs");
    return { title: meta.title, description: meta.summary };
}

export default async function ProgramPage({ params }: Params) {
    const { slug } = await params;
    if (!programExists(slug)) notFound();

    const [{ meta, content }, { meta: programsPage }, allPrograms] = await Promise.all([
        getPostBySlug(slug, "programs"),
        getPageContent<ProgramsContent>("programs"),
        getAllPosts("programs"),
    ]);
    const pillar = programsPage.pillars.find((p) => p.id === meta.pillar);
    const related = allPrograms.filter((p) => p.pillar === meta.pillar && p.slug !== slug);

    return (
        <div className="flex flex-col">
            <section className="relative overflow-hidden bg-brand-forest text-brand-ivory">
                <DawnMotif className="-bottom-2 right-[-120px] w-[520px] opacity-80 sm:right-0" />
                <Container className="relative py-16 sm:py-20">
                    <Link href={pillar ? `/programs#${pillar.id}` : "/programs"} className="inline-flex items-center gap-2 text-sm font-semibold text-brand-amber hover:text-brand-ivory">
                        <ArrowLeft className="h-4 w-4" aria-hidden="true" /> {pillar ? pillar.title : "All programmes"}
                    </Link>
                    <div className="mt-8 flex max-w-3xl flex-col gap-6 sm:flex-row sm:items-start">
                        <IconTile icon={getIcon(meta.icon)} tone="dark" className="h-14 w-14" />
                        <div>
                            <h1 className="font-display text-4xl font-semibold leading-tight tracking-tight sm:text-5xl">{meta.title}</h1>
                            {meta.summary && <p className="mt-5 text-xl leading-8 text-brand-ivory/85">{meta.summary}</p>}
                        </div>
                    </div>
                </Container>
            </section>

            <Section className="pt-12 md:pt-16">
                <Container>
                    <div className="grid gap-12 lg:grid-cols-[1fr_340px]">
                        <article className="prose prose-lg max-w-none">{content}</article>
                        <aside>
                            <div className="rounded-3xl bg-brand-forest p-8 text-brand-ivory lg:sticky lg:top-28">
                                <Heart className="h-8 w-8 text-brand-amber" aria-hidden="true" />
                                <h2 className="mt-4 font-display text-2xl font-semibold">Support this programme</h2>
                                <p className="mt-3 text-brand-ivory/80">Your Zakat and Sadaqah fund this work directly. Every gift is documented and allocated to its designated category.</p>
                                <Button asChild size="lg" className="mt-6 w-full">
                                    <Link href={pillar ? `/donate?designation=${pillar.id}` : "/donate"}>Donate</Link>
                                </Button>
                            </div>
                        </aside>
                    </div>
                </Container>
            </Section>

            {related.length > 0 && (
                <Section tone="white">
                    <Container>
                        <h2 className="font-display text-2xl font-semibold text-brand-forest">More in {pillar?.title ?? "this pillar"}</h2>
                        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                            {related.map((p) => (
                                <ProgramCard key={p.slug} slug={p.slug} title={p.title} description={p.summary} iconName={p.icon} />
                            ))}
                        </div>
                    </Container>
                </Section>
            )}
        </div>
    );
}
