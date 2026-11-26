import { NextResponse } from "next/server";
import { pledgeSchema } from "@/lib/schemas";
import { formatFields, sendEmail } from "@/lib/email";
import { parseBody, sendResultResponse } from "@/lib/api";

const usd = new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 2 });

// Records a donation pledge / intent and notifies the team by email.
// No payment is taken here; the donor is contacted with payment details.
export async function POST(request: Request) {
    const parsed = await parseBody(request, pledgeSchema);
    if ("response" in parsed) return parsed.response;
    const data = parsed.data;

    if (data.company) return NextResponse.json({ success: true });

    const fund = data.fund === "zakat" ? "Zakat" : "General";
    const amount = `${usd.format(data.amount)}${data.frequency === "monthly" ? " / month" : ""}`;

    const result = await sendEmail({
        subject: `[Pledge] ${amount} ${fund} from ${data.name}`,
        replyTo: data.email,
        text: `${formatFields({
            Name: data.name,
            Email: data.email,
            Fund: fund,
            Amount: amount,
            Frequency: data.frequency === "monthly" ? "Monthly" : "One-time",
            Designation: data.designation,
        })}${data.message ? `\n\nMessage:\n${data.message}` : ""}\n\n— Pledge submitted on the Donate page. Reply to this email to send the donor payment details.`,
    });

    return sendResultResponse(result);
}
