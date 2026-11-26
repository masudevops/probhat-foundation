import { NextResponse } from "next/server";
import { contactSchema } from "@/lib/schemas";
import { formatFields, sendEmail } from "@/lib/email";
import { parseBody, sendResultResponse } from "@/lib/api";

export async function POST(request: Request) {
    const parsed = await parseBody(request, contactSchema);
    if ("response" in parsed) return parsed.response;
    const data = parsed.data;

    // Honeypot filled in: pretend success so bots don't retry.
    if (data.company) return NextResponse.json({ success: true });

    const result = await sendEmail({
        subject: `[Website] ${data.subject || "General Enquiry"} from ${data.name}`,
        replyTo: data.email,
        text: `${formatFields({ Name: data.name, Email: data.email, Subject: data.subject })}\n\n${data.message}\n\n— Sent from the contact form on the Probhat Foundation website`,
    });

    return sendResultResponse(result);
}
