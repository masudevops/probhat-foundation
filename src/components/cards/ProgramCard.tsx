import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { IconTile } from "@/components/ui/brand";
import { getIcon } from "@/lib/icons";

interface ProgramCardProps {
    title: string;
    description?: string;
    slug: string;
    iconName?: string;
}

export function ProgramCard({ title, description, slug, iconName }: ProgramCardProps) {
    return (
        <article className="group relative flex h-full flex-col rounded-3xl border border-brand-sand bg-brand-cream p-6 transition hover:border-brand-amber/60 hover:bg-white">
            <IconTile icon={getIcon(iconName)} className="h-11 w-11" />
            <h4 className="mt-4 font-display text-lg font-semibold text-brand-forest">
                <Link href={`/programs/${slug}`} className="after:absolute after:inset-0 focus-visible:outline-none">
                    {title}
                </Link>
            </h4>
            {description && <p className="mt-2 line-clamp-3 text-sm leading-6 text-brand-sage">{description}</p>}
            <span className="mt-auto inline-flex items-center gap-1.5 pt-4 text-sm font-semibold text-brand-pine group-hover:text-brand-gold">
                Learn more <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" aria-hidden="true" />
            </span>
        </article>
    );
}
