import { siteConfig } from "@/lib/site";

// Sends plain-text notification emails through Resend's HTTP API (no SDK dependency).
//
// Env vars (set in Vercel → Project → Settings → Environment Variables):
//   RESEND_API_KEY      required in production
//   CONTACT_TO_EMAIL    inbox that receives messages (default: email in content/site.json)
//   CONTACT_FROM_EMAIL  verified sender, e.g. "Probhat Foundation <noreply@probhatfoundation.org>"
//
// Without RESEND_API_KEY: in development the email is logged to the console;
// in production the send fails with "not_configured" so visitors see a clear error.

export type SendResult = { ok: true } | { ok: false; reason: "not_configured" | "failed" };

export async function sendEmail({ subject, text, replyTo }: { subject: string; text: string; replyTo?: string }): Promise<SendResult> {
    const apiKey = process.env.RESEND_API_KEY;
    const to = process.env.CONTACT_TO_EMAIL || siteConfig.email;
    const from = process.env.CONTACT_FROM_EMAIL || "Probhat Foundation <onboarding@resend.dev>";
    const safeSubject = subject.replace(/[\r\n]+/g, " ").slice(0, 200);

    if (!apiKey) {
        if (process.env.NODE_ENV !== "production") {
            console.info(`[email:dev] Not sent (RESEND_API_KEY not set)\nTo: ${to}\nSubject: ${safeSubject}\n\n${text}`);
            return { ok: true };
        }
        console.error("[email] RESEND_API_KEY is not set; cannot send form submission");
        return { ok: false, reason: "not_configured" };
    }

    try {
        const res = await fetch("https://api.resend.com/emails", {
            method: "POST",
            headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json" },
            body: JSON.stringify({ from, to: [to], subject: safeSubject, text, reply_to: replyTo }),
        });
        if (!res.ok) {
            console.error(`[email] Resend responded ${res.status}: ${await res.text().catch(() => "")}`);
            return { ok: false, reason: "failed" };
        }
        return { ok: true };
    } catch (error) {
        console.error("[email] Resend request failed", error);
        return { ok: false, reason: "failed" };
    }
}

/** Formats label/value pairs as an aligned plain-text block. */
export function formatFields(fields: Record<string, string | number | undefined>) {
    return Object.entries(fields)
        .filter(([, value]) => value !== undefined && value !== "")
        .map(([label, value]) => `${label}: ${value}`)
        .join("\n");
}
