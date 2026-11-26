import * as React from "react";
import { AlertCircle, CheckCircle2 } from "lucide-react";
import { siteConfig } from "@/lib/site";
import { cn } from "@/lib/utils";

export function Field({
    id,
    label,
    error,
    required,
    hint,
    className,
    children,
}: {
    id: string;
    label: string;
    error?: string;
    required?: boolean;
    hint?: string;
    className?: string;
    children: React.ReactNode;
}) {
    return (
        <div className={cn("space-y-2", className)}>
            <label htmlFor={id} className="block text-sm font-semibold text-brand-forest">
                {label}
                {required ? <span className="text-brand-gold"> *</span> : <span className="font-normal text-brand-sage"> (optional)</span>}
            </label>
            {children}
            {hint && !error && <p className="text-xs text-brand-sage">{hint}</p>}
            {error && (
                <p id={`${id}-error`} role="alert" className="flex items-center gap-1.5 text-sm text-red-700">
                    <AlertCircle className="h-4 w-4" aria-hidden="true" />
                    {error}
                </p>
            )}
        </div>
    );
}

/** Off-screen field that only bots fill in; must stay empty. */
export function Honeypot(props: React.InputHTMLAttributes<HTMLInputElement>) {
    return (
        <div aria-hidden="true" className="absolute -left-[9999px] h-px w-px overflow-hidden">
            <label htmlFor="company">Company</label>
            <input id="company" type="text" tabIndex={-1} autoComplete="off" {...props} />
        </div>
    );
}

export type SubmitError = "not_configured" | "send_failed" | "invalid" | null;

/** Posts JSON to a form API route and maps the response to an error code. */
export async function submitForm(url: string, data: unknown): Promise<SubmitError> {
    try {
        const res = await fetch(url, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(data) });
        if (res.ok) return null;
        const body = await res.json().catch(() => ({}));
        if (body.error === "not_configured") return "not_configured";
        if (res.status === 400) return "invalid";
        return "send_failed";
    } catch {
        return "send_failed";
    }
}

export function FormError({ error }: { error: SubmitError }) {
    if (!error) return null;
    const facebook = siteConfig.socials.facebook;
    const message =
        error === "not_configured"
            ? "Our online form isn't connected yet."
            : error === "invalid"
                ? "Some details look incorrect. Please check the form and try again."
                : "Something went wrong sending your message. Please try again in a moment.";

    return (
        <div role="alert" className="flex gap-3 rounded-2xl border border-red-200 bg-red-50 p-4 text-sm text-red-800">
            <AlertCircle className="mt-0.5 h-5 w-5 shrink-0" aria-hidden="true" />
            <p>
                {message}{" "}
                {error !== "invalid" && facebook && (
                    <>
                        You can also reach us on{" "}
                        <a href={facebook} target="_blank" rel="noopener noreferrer" className="font-semibold underline">
                            Facebook
                        </a>
                        .
                    </>
                )}
            </p>
        </div>
    );
}

export function FormSuccess({ title, children, action }: { title: string; children: React.ReactNode; action?: React.ReactNode }) {
    return (
        <div role="status" className="flex flex-col items-center rounded-3xl border border-brand-pine/20 bg-brand-pine/5 p-8 text-center">
            <CheckCircle2 className="h-12 w-12 text-brand-pine" aria-hidden="true" />
            <h3 className="mt-4 font-display text-2xl font-semibold text-brand-forest">{title}</h3>
            <div className="mt-2 max-w-md text-brand-sage">{children}</div>
            {action && <div className="mt-6">{action}</div>}
        </div>
    );
}
