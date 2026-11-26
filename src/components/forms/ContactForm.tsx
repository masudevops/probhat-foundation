"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Send } from "lucide-react";
import { Button } from "@/components/ui/common";
import { Input, fieldClass } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Field, FormError, FormSuccess, Honeypot, submitForm, type SubmitError } from "@/components/forms/Field";
import { contactSchema, type ContactInput } from "@/lib/schemas";
import { cn } from "@/lib/utils";

export function ContactForm({ subjects, defaultSubject }: { subjects: string[]; defaultSubject?: string }) {
    const [error, setError] = useState<SubmitError>(null);
    const [sent, setSent] = useState(false);

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors, isSubmitting },
    } = useForm<ContactInput>({
        resolver: zodResolver(contactSchema),
        defaultValues: { subject: defaultSubject ?? subjects[0] },
    });

    const onSubmit = async (data: ContactInput) => {
        setError(null);
        const result = await submitForm("/api/contact", data);
        if (result) {
            setError(result);
            return;
        }
        setSent(true);
        reset({ subject: subjects[0] });
    };

    if (sent) {
        return (
            <FormSuccess
                title="Message sent"
                action={
                    <Button variant="outline" onClick={() => setSent(false)}>
                        Send another message
                    </Button>
                }
            >
                <p>JazakAllahu khairan for reaching out. Our team will reply by email as soon as possible.</p>
            </FormSuccess>
        );
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)} noValidate className="relative space-y-5">
            <div className="grid gap-5 sm:grid-cols-2">
                <Field id="name" label="Name" required error={errors.name?.message}>
                    <Input id="name" autoComplete="name" aria-invalid={!!errors.name} aria-describedby={errors.name ? "name-error" : undefined} {...register("name")} />
                </Field>
                <Field id="email" label="Email" required error={errors.email?.message}>
                    <Input id="email" type="email" autoComplete="email" aria-invalid={!!errors.email} aria-describedby={errors.email ? "email-error" : undefined} {...register("email")} />
                </Field>
            </div>
            <Field id="subject" label="Subject" required>
                <select id="subject" className={cn(fieldClass, "h-12 py-0")} {...register("subject")}>
                    {subjects.map((subject) => (
                        <option key={subject}>{subject}</option>
                    ))}
                </select>
            </Field>
            <Field id="message" label="Message" required error={errors.message?.message}>
                <Textarea id="message" rows={6} aria-invalid={!!errors.message} aria-describedby={errors.message ? "message-error" : undefined} {...register("message")} />
            </Field>

            <FormError error={error} />

            <Honeypot {...register("company")} />
            <Button type="submit" size="lg" disabled={isSubmitting} className="w-full sm:w-auto">
                {isSubmitting ? "Sending…" : "Send Message"}
                {!isSubmitting && <Send className="h-4 w-4" aria-hidden="true" />}
            </Button>
        </form>
    );
}
