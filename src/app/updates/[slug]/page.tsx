import fs from "fs";
import path from "path";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, CalendarDays, Heart, User } from "lucide-react";
import { Button, Container, Section } from "@/components/ui/common";
import { DawnMotif } from "@/components/ui/brand";
import { ShareLinks } from "@/components/ShareLinks";
import { getAllPosts, getPostBySlug, publicFileExists } from "@/lib/mdx";
import { siteUrl } from "@/lib/site";
import { formatDate } from "@/lib/utils";

type Params = { params: Promise<{ slug: string }> };

function updateExists(slug: string) {
    return /^[a-z0-9-]+$/i.test(slug) && fs.existsSync(path.join(process.cwd(), "content", "updates", `${slug}.mdx`));
}

export async function generateStaticParams() {
    return (await getAllPosts("updates")).map((u) => ({ slug: u.slug }));
}

export async function generateMetadata({ params }: Params) {
    const { slug } = await params;
    if (!updateExists(slug)) return { title: "Update Not Found" };
    const { meta } = await getPostBySlug(slug, "updates");
    return { title: meta.title, description: meta.summary, openGraph: { title: meta.title, description: meta.summary, type: "article" } };
}

export default async function UpdatePage({ params }: Params) {
    const { slug } = await params;
    if (!updateExists(slug)) notFound();
    const { meta, content } = await getPostBySlug(slug, "updates");
    const cover = publicFileExists(meta.coverImage) ? meta.coverImage : undefined;

    return (
        <div className="flex flex-col">
            <section className="relative overflow-hidden bg-brand-forest text-brand-ivory">
                <DawnMotif className="-bottom-2 right-[-120px] w-[520px] opacity-80 sm:right-0" />
                <Container className="relative py-16 sm:py-20">
                    <div className="mx-auto max-w-3xl">
                        <Link href="/updates" className="inline-flex items-center gap-2 text-sm font-semibold text-brand-amber hover:text-brand-ivory">
                            <ArrowLeft className="h-4 w-4" aria-hidden="true" /> All updates
                        </Link>
                        <div className="mt-6 flex flex-wrap items-center gap-x-5 gap-y-2 text-sm text-brand-ivory/75">
                            {meta.date && (
                                <span className="inline-flex items-center gap-1.5">
                                    <CalendarDays className="h-4 w-4 text-brand-amber" aria-hidden="true" />
                                    <time dateTime={meta.date}>{formatDate(meta.date)}</time>
                                </span>
                            )}
                            {meta.author && (
                                <span className="inline-flex items-center gap-1.5">
                                    <User className="h-4 w-4 text-brand-amber" aria-hidden="true" />
                                    {meta.author}
                                </span>
                            )}
                            {meta.tags?.map((tag) => (
                                <span key={tag} className="rounded-full border border-white/15 px-2.5 py-0.5 text-xs capitalize">
                                    {tag.replace(/-/g, " ")}
                                </span>
                            ))}
                        </div>
                        <h1 className="mt-5 font-display text-4xl font-semibold leading-tight tracking-tight sm:text-5xl">{meta.title}</h1>
                        {meta.summary && <p className="mt-5 border-l-4 border-brand-amber pl-4 text-xl leading-8 text-brand-ivory/85">{meta.summary}</p>}
                    </div>
                </Container>
            </section>

            <Section className="pt-12 md:pt-16">
                <Container>
                    <div className="mx-auto max-w-3xl">
                        {cover && (
                            <div className="relative mb-10 aspect-[16/9] overflow-hidden rounded-3xl">
                                <Image src={cover} alt="" fill sizes="(min-width: 768px) 768px, 100vw" className="object-cover" priority />
                            </div>
                        )}
                        <article className="prose prose-lg max-w-none">{content}</article>

                        <div className="mt-14 grid gap-8 border-t border-brand-sand pt-8 sm:grid-cols-2 sm:items-center">
                            <div>
                                <h2 className="font-display text-lg font-semibold text-brand-forest">Share this update</h2>
                                <div className="mt-4">
                                    <ShareLinks url={`${siteUrl}/updates/${slug}`} title={meta.title} />
                                </div>
                            </div>
                            <div className="rounded-3xl bg-brand-forest p-6 text-brand-ivory">
                                <p className="font-display text-lg font-semibold">Help us do more of this work.</p>
                                <Button asChild className="mt-4">
                                    <Link href="/donate">
                                        <Heart className="h-4 w-4" aria-hidden="true" /> Support our work
                                    </Link>
                                </Button>
                            </div>
                        </div>
                    </div>
                </Container>
            </Section>
        </div>
    );
}
