import * as React from "react";
import type { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { Container } from "@/components/ui/common";

type Tone = "light" | "dark";

/** Small uppercase label above headings. `dark` = for use on forest backgrounds. */
export function Eyebrow({ children, tone = "light", className }: { children: React.ReactNode; tone?: Tone; className?: string }) {
    return (
        <span
            className={cn(
                "inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.22em]",
                tone === "light" ? "bg-brand-amber/15 text-brand-pine" : "border border-brand-amber/30 bg-white/5 text-brand-amber",
                className
            )}
        >
            {children}
        </span>
    );
}

export function SectionHeading({
    eyebrow,
    title,
    description,
    align = "left",
    tone = "light",
    className,
}: {
    eyebrow?: string;
    title: React.ReactNode;
    description?: React.ReactNode;
    align?: "left" | "center";
    tone?: Tone;
    className?: string;
}) {
    return (
        <div className={cn("max-w-3xl", align === "center" && "mx-auto text-center", className)}>
            {eyebrow && <Eyebrow tone={tone}>{eyebrow}</Eyebrow>}
            <h2
                className={cn(
                    "font-display text-3xl font-semibold tracking-tight sm:text-4xl",
                    eyebrow && "mt-5",
                    tone === "light" ? "text-brand-forest" : "text-brand-ivory"
                )}
            >
                {title}
            </h2>
            {description && (
                <p className={cn("mt-4 text-lg leading-8", tone === "light" ? "text-brand-sage" : "text-brand-ivory/80")}>{description}</p>
            )}
        </div>
    );
}

/** Rising-sun motif ("Probhat" = dawn) used behind dark heroes. Purely decorative. */
export function DawnMotif({ className }: { className?: string }) {
    return (
        <svg
            aria-hidden="true"
            viewBox="0 0 600 300"
            className={cn("pointer-events-none absolute text-brand-amber", className)}
            fill="none"
        >
            <circle cx="300" cy="300" r="70" fill="currentColor" fillOpacity="0.16" />
            {[120, 175, 230, 285].map((r, i) => (
                <circle key={r} cx="300" cy="300" r={r} stroke="currentColor" strokeOpacity={0.22 - i * 0.045} strokeWidth="1.5" />
            ))}
        </svg>
    );
}

export function PageHero({
    eyebrow,
    title,
    description,
    align = "left",
    children,
    className,
}: {
    eyebrow?: string;
    title: React.ReactNode;
    description?: React.ReactNode;
    align?: "left" | "center";
    children?: React.ReactNode;
    /** Extra classes for the inner container, e.g. more bottom padding when content overlaps the hero. */
    className?: string;
}) {
    return (
        <section className="relative overflow-hidden bg-brand-forest text-brand-ivory">
            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_85%_110%,rgba(232,168,48,0.18),transparent_55%)]" />
            <DawnMotif className="-bottom-2 right-[-120px] w-[560px] sm:right-0" />
            <Container className={cn("relative py-20 sm:py-24 lg:py-28", align === "center" && "text-center", className)}>
                <div className={cn("max-w-3xl", align === "center" && "mx-auto")}>
                    {eyebrow && <Eyebrow tone="dark">{eyebrow}</Eyebrow>}
                    <h1 className={cn("font-display text-4xl font-semibold leading-[1.1] tracking-tight sm:text-5xl lg:text-6xl", eyebrow && "mt-6")}>
                        {title}
                    </h1>
                    {description && <p className="mt-6 text-lg leading-8 text-brand-ivory/85 sm:text-xl">{description}</p>}
                    {children}
                </div>
            </Container>
        </section>
    );
}

export function IconTile({ icon: Icon, tone = "light", className }: { icon: LucideIcon; tone?: Tone; className?: string }) {
    return (
        <span
            className={cn(
                "inline-flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl",
                tone === "light" ? "bg-brand-pine text-brand-amber" : "bg-brand-amber/15 text-brand-amber ring-1 ring-brand-amber/30",
                className
            )}
        >
            <Icon className="h-6 w-6" aria-hidden="true" />
        </span>
    );
}

/** Standard light card surface. */
export const cardClass = "rounded-3xl border border-brand-sand bg-white p-7 shadow-[0_1px_2px_rgba(14,35,24,0.04),0_8px_24px_-12px_rgba(14,35,24,0.12)]";

/** Card surface for dark (forest) sections. */
export const darkCardClass = "rounded-3xl border border-white/10 bg-white/[0.04] p-7";
