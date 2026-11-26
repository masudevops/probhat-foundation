import { z } from "zod";

// Shared by the client forms (react-hook-form) and the API routes, so validation can't drift.

/** Hidden "company" field: real visitors never fill it in, simple spam bots do. */
const honeypot = z.string().max(200).optional();

export const contactSchema = z.object({
    name: z.string().trim().min(2, { error: "Please enter your name" }).max(100),
    email: z.email({ error: "Please enter a valid email address" }).max(200),
    subject: z.string().trim().max(100).optional(),
    message: z.string().trim().min(10, { error: "Please write at least 10 characters" }).max(5000),
    company: honeypot,
});

export type ContactInput = z.infer<typeof contactSchema>;

export const pledgeSchema = z.object({
    name: z.string().trim().min(2, { error: "Please enter your name" }).max(100),
    email: z.email({ error: "Please enter a valid email address" }).max(200),
    fund: z.enum(["general", "zakat"]),
    frequency: z.enum(["one-time", "monthly"]),
    amount: z.number({ error: "Please choose or enter an amount" }).positive({ error: "Amount must be more than $0" }).max(1_000_000),
    designation: z.string().trim().max(60),
    message: z.string().trim().max(2000).optional(),
    company: honeypot,
});

export type PledgeInput = z.infer<typeof pledgeSchema>;
