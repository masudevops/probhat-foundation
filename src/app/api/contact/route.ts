import { NextResponse } from 'next/server';
import { z } from 'zod';

const contactSchema = z.object({
    name: z.string().min(2),
    email: z.string().email(),
    subject: z.string().optional(),
    message: z.string().min(10)
});

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const data = contactSchema.parse(body);

        // Simulate email sending
        console.log('Sending email to admin:', data);
        await new Promise(resolve => setTimeout(resolve, 500));

        return NextResponse.json({ success: true });
    } catch (error) {
        return NextResponse.json(
            { error: 'Failed to send message' },
            { status: 500 }
        );
    }
}
