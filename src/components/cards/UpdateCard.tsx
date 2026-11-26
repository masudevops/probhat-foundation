import Link from "next/link";
import Image from "next/image";
import { ArrowRight, CalendarDays } from "lucide-react";
import { DawnMotif } from "@/components/ui/brand";
import { formatDate } from "@/lib/utils";

interface UpdateCardProps {
    title: string;
    summary?: string;
    date?: string;
    slug: string;
    /** Only pass an image that exists in /public; otherwise a branded cover is shown. */
    image?: string;
    tags?: string[];
}

function tagLabel(tag: string) {
    return tag.replace(/-/g, " ");
}

export function UpdateCard({ title, summary, date, slug, image, tags }: UpdateCardProps) {
    return (
        <article className="group relative flex h-full flex-col overflow-hidden rounded-3xl border border-brand-sand bg-white shadow-[0_8px_24px_-12px_rgba(14,35,24,0.15)] transition hover:-translate-y-0.5 hover:shadow-[0_16px_40px_-16px_rgba(14,35,24,0.3)]">
            <div className="relative aspect-[16/9] overflow-hidden bg-brand-forest">
                {image ? (
                    <Image src={image} alt="" fill sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw" className="object-cover transition duration-500 group-hover:scale-105" />
                ) : (
                    <>
                        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_120%,rgba(232,168,48,0.35),transparent_60%)]" />
                        <DawnMotif className="bottom-0 left-1/2 w-[130%] -translate-x-1/2" />
                    </>
                )}
                {tags?.[0] && (
                    <span className="absolute left-4 top-4 rounded-full bg-brand-forest/80 px-3 py-1 text-xs font-semibold capitalize text-brand-amber backdrop-blur">
                        {tagLabel(tags[0])}
                    </span>
                )}
            </div>
            <div className="flex flex-1 flex-col p-6">
                {date && (
                    <p className="flex items-center gap-2 text-sm text-brand-sage">
                        <CalendarDays className="h-4 w-4 text-brand-gold" aria-hidden="true" />
                        <time dateTime={date}>{formatDate(date)}</time>
                    </p>
                )}
                <h3 className="mt-3 font-display text-xl font-semibold leading-snug text-brand-forest">
                    <Link href={`/updates/${slug}`} className="after:absolute after:inset-0 focus-visible:outline-none">
                        {title}
                    </Link>
                </h3>
                {summary && <p className="mt-3 line-clamp-3 text-brand-sage">{summary}</p>}
                <span className="mt-auto inline-flex items-center gap-1.5 pt-5 text-sm font-semibold text-brand-pine group-hover:text-brand-gold">
                    Read the update <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" aria-hidden="true" />
                </span>
            </div>
        </article>
    );
}
