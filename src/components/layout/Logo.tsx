import Link from "next/link";
import { Sun } from "lucide-react";
import { siteConfig } from "@/lib/site";
import { cn } from "@/lib/utils";

export function Logo({ className, showBengali = true }: { className?: string; showBengali?: boolean }) {
    return (
        <Link href="/" className={cn("group -m-1.5 inline-flex items-center gap-3 p-1.5", className)}>
            <span className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-brand-gold bg-brand-pine text-brand-amber transition-transform group-hover:rotate-12">
                <Sun className="h-5 w-5" aria-hidden="true" />
            </span>
            <span className="flex flex-col leading-tight">
                <span className="font-display text-lg font-semibold">{siteConfig.name}</span>
                {showBengali && <span className="font-bengali text-xs text-brand-ivory/75">{siteConfig.nameBengali}</span>}
            </span>
        </Link>
    );
}
