import { NextResponse } from "next/server";
import { z } from "zod";
import type { SendResult } from "@/lib/email";

/** Parses a JSON body against a schema; returns the data or a 400 response. */
export async function parseBody<T extends z.ZodType>(request: Request, schema: T): Promise<{ data: z.infer<T> } | { response: NextResponse }> {
    let body: unknown;
    try {
        body = await request.json();
    } catch {
        return { response: NextResponse.json({ error: "Invalid request" }, { status: 400 }) };
    }

    const result = schema.safeParse(body);
    if (!result.success) {
        return {
            response: NextResponse.json({ error: "Please check the highlighted fields", issues: z.flattenError(result.error).fieldErrors }, { status: 400 }),
        };
    }
    return { data: result.data };
}

/** Maps an email send result to the API response the forms expect. */
export function sendResultResponse(result: SendResult) {
    if (result.ok) return NextResponse.json({ success: true });
    return NextResponse.json(
        { error: result.reason === "not_configured" ? "not_configured" : "send_failed" },
        { status: result.reason === "not_configured" ? 503 : 502 }
    );
}
