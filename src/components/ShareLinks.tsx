"use client";

import { useState } from "react";
import { Check, Facebook, Link2, MessageCircle } from "lucide-react";

const linkClass =
    "inline-flex h-11 items-center gap-2 rounded-full border border-brand-sand bg-white px-4 text-sm font-semibold text-brand-forest transition hover:border-brand-amber hover:bg-brand-amber/10";

/** Plain share links (no third-party scripts) plus copy-link. */
export function ShareLinks({ url, title }: { url: string; title: string }) {
    const [copied, setCopied] = useState(false);
    const encodedUrl = encodeURIComponent(url);
    const encodedText = encodeURIComponent(`${title} ${url}`);

    const copy = async () => {
        await navigator.clipboard.writeText(url);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <div className="flex flex-wrap gap-3">
            <a href={`https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`} target="_blank" rel="noopener noreferrer" className={linkClass}>
                <Facebook className="h-4 w-4" aria-hidden="true" /> Facebook
            </a>
            <a href={`https://wa.me/?text=${encodedText}`} target="_blank" rel="noopener noreferrer" className={linkClass}>
                <MessageCircle className="h-4 w-4" aria-hidden="true" /> WhatsApp
            </a>
            <button type="button" onClick={copy} className={linkClass}>
                {copied ? <Check className="h-4 w-4 text-brand-pine" aria-hidden="true" /> : <Link2 className="h-4 w-4" aria-hidden="true" />}
                {copied ? "Link copied" : "Copy link"}
            </button>
        </div>
    );
}
