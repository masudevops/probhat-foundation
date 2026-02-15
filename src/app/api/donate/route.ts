import { NextResponse } from 'next/server';
import { z } from 'zod';

// Schema validation for donation intent
const donationSchema = z.object({
    name: z.string().min(2),
    email: z.string().email(),
    amount: z.string().or(z.number()),
    program: z.string().optional(),
    message: z.string().optional(),
});

export async function POST(request: Request) {
    try {
        const body = await request.json();

        // Validate request body
        const data = donationSchema.parse(body);

        // In a real application, you would:
        // 1. Save to database
        // 2. Send email notification to admin
        // 3. Send confirmation email to donor

        console.log('Donation Intent Received:', data);

        // Simulate email sending delay
        await new Promise(resolve => setTimeout(resolve, 500));

        return NextResponse.json({
            success: true,
            message: "Thank you for your donation intent. We will contact you shortly."
        });

    } catch (error) {
        console.error('Donation error:', error);
        return NextResponse.json(
            { error: 'Invalid request details' },
            { status: 400 }
        );
    }
}
