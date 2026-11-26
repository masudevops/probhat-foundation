"use client";

import { useState } from "react";
import { useForm, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowRight, CheckCircle2, Clock, Copy, ExternalLink, Lock, Sparkles } from "lucide-react";
import { Button, Container } from "@/components/ui/common";
import { cardClass } from "@/components/ui/brand";
import { Input, fieldClass } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Field, FormError, FormSuccess, Honeypot, submitForm, type SubmitError } from "@/components/forms/Field";
import { pledgeSchema, type PledgeInput } from "@/lib/schemas";
import type { DonateContent as DonateMeta } from "@/lib/content-types";
import { cn } from "@/lib/utils";

const usd = new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 });

/** Segmented radio control (fund type, frequency). */
function Segmented<T extends string>({ name, legend, options, value, register }: {
    name: "fund" | "frequency";
    legend: string;
    options: { value: T; label: string }[];
    value: T;
    register: ReturnType<typeof useForm<PledgeInput>>["register"];
}) {
    return (
        <fieldset>
            <legend className="text-sm font-semibold text-brand-forest">{legend}</legend>
            <div className="mt-2 grid grid-cols-2 gap-1 rounded-full bg-brand-ivory p-1">
                {options.map((option) => (
                    <label
                        key={option.value}
                        className={cn(
                            "cursor-pointer rounded-full px-4 py-2.5 text-center text-sm font-semibold transition has-[:focus-visible]:ring-2 has-[:focus-visible]:ring-brand-amber",
                            value === option.value ? "bg-brand-forest text-brand-ivory shadow" : "text-brand-sage hover:text-brand-forest"
                        )}
                    >
                        <input type="radio" value={option.value} className="sr-only" {...register(name)} />
                        {option.label}
                    </label>
                ))}
            </div>
        </fieldset>
    );
}

function PaymentMethod({ name, detail, url }: { name: string; detail?: string; url?: string }) {
    const [copied, setCopied] = useState(false);
    const copy = async () => {
        if (!detail) return;
        await navigator.clipboard.writeText(detail);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <li className="rounded-2xl border border-brand-sand bg-white p-4">
            <div className="flex items-center justify-between gap-3">
                <p className="font-semibold text-brand-forest">{name}</p>
                {!detail && (
                    <span className="inline-flex items-center gap-1 rounded-full bg-brand-amber/15 px-2.5 py-1 text-xs font-semibold text-brand-pine">
                        <Clock className="h-3 w-3" aria-hidden="true" /> Coming soon
                    </span>
                )}
            </div>
            {detail && (
                <div className="mt-2 flex items-center justify-between gap-2">
                    {url ? (
                        <a href={url} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 break-all font-mono text-sm text-brand-pine underline decoration-brand-amber underline-offset-4">
                            {detail} <ExternalLink className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
                        </a>
                    ) : (
                        <p className="break-all font-mono text-sm text-brand-sage">{detail}</p>
                    )}
                    <Button variant="ghost" size="icon" onClick={copy} className="h-9 w-9 shrink-0">
                        {copied ? <CheckCircle2 className="h-4 w-4 text-brand-pine" /> : <Copy className="h-4 w-4" />}
                        <span className="sr-only">{copied ? "Copied" : `Copy ${name} details`}</span>
                    </Button>
                </div>
            )}
        </li>
    );
}

interface DonateContentProps {
    meta: DonateMeta;
    defaultFund: "general" | "zakat";
    defaultDesignation?: string;
}

export function DonateContent({ meta, defaultFund, defaultDesignation }: DonateContentProps) {
    const tiers = meta.donationTiers;
    const [choice, setChoice] = useState<number | "custom">(tiers[2]?.amount ?? tiers[0]?.amount ?? "custom");
    const [error, setError] = useState<SubmitError>(null);
    const [pledged, setPledged] = useState<PledgeInput | null>(null);

    const {
        register,
        handleSubmit,
        setValue,
        control,
        formState: { errors, isSubmitting },
    } = useForm<PledgeInput>({
        resolver: zodResolver(pledgeSchema),
        defaultValues: {
            fund: defaultFund,
            frequency: "one-time",
            amount: typeof choice === "number" ? choice : undefined,
            designation: meta.designations.find((d) => d.value === defaultDesignation)?.label ?? meta.designations[0]?.label,
        },
    });

    const [fund, frequency, amount] = useWatch({ control, name: ["fund", "frequency", "amount"] });
    const givingOpen = meta.givingOpen;
    const activeMethods = meta.paymentMethods.filter((m) => m.detail);

    const chooseTier = (value: number | "custom") => {
        setChoice(value);
        setValue("amount", value === "custom" ? (undefined as unknown as number) : value, { shouldValidate: value !== "custom" });
    };

    const onSubmit = async (data: PledgeInput) => {
        setError(null);
        const result = await submitForm("/api/donate", data);
        if (result) {
            setError(result);
            return;
        }
        setPledged(data);
        window.scrollTo({ top: 0, behavior: "smooth" });
    };

    const summary = amount && amount > 0 ? `${usd.format(amount)}${frequency === "monthly" ? " / month" : ""}` : null;

    return (
        <Container className="relative z-10 -mt-16 pb-20 sm:-mt-20 lg:pb-28">
            {!givingOpen && (
                <div className="mb-6 flex flex-col gap-4 rounded-3xl border border-brand-amber/50 bg-brand-ivory p-6 shadow-lg sm:flex-row sm:items-start sm:p-8">
                    <span className="inline-flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-brand-amber text-brand-forest">
                        <Sparkles className="h-6 w-6" aria-hidden="true" />
                    </span>
                    <div>
                        <h2 className="font-display text-2xl font-semibold text-brand-forest">{meta.comingSoon.title}</h2>
                        <p className="mt-2 max-w-3xl leading-7 text-brand-sage">{meta.comingSoon.text}</p>
                    </div>
                </div>
            )}

            <div className="grid gap-6 lg:grid-cols-[1.6fr_1fr] lg:items-start">
                {/* Pledge / intent form */}
                <div className={cn(cardClass, "p-6 sm:p-10")}>
                    {pledged ? (
                        <FormSuccess
                            title={givingOpen ? "Thank you for your support" : "Your pledge is recorded"}
                            action={
                                <Button variant="outline" onClick={() => setPledged(null)}>
                                    Make another pledge
                                </Button>
                            }
                        >
                            <p>
                                JazakAllahu khairan, {pledged.name.split(" ")[0]}. We&apos;ve noted your {usd.format(pledged.amount)}
                                {pledged.frequency === "monthly" ? " monthly" : ""} {pledged.fund === "zakat" ? "Zakat" : "General Fund"} pledge.{" "}
                                {givingOpen
                                    ? "We'll email you the payment details shortly."
                                    : "We'll email you as soon as giving opens."}
                            </p>
                        </FormSuccess>
                    ) : (
                        <form onSubmit={handleSubmit(onSubmit)} noValidate className="relative space-y-8">
                            <div>
                                <h2 className="font-display text-2xl font-semibold text-brand-forest">
                                    {givingOpen ? "Make a donation" : "Pledge your support"}
                                </h2>
                                <p className="mt-2 text-brand-sage">
                                    {givingOpen
                                        ? "Tell us about your gift and we'll confirm the payment details by email."
                                        : "No payment is taken today. We'll contact you with payment details when giving opens."}
                                </p>
                            </div>

                            <div className="grid gap-6 sm:grid-cols-2">
                                <Segmented
                                    name="fund"
                                    legend="Fund"
                                    value={fund}
                                    register={register}
                                    options={[
                                        { value: "general", label: meta.funds.general.title },
                                        { value: "zakat", label: meta.funds.zakat.title },
                                    ]}
                                />
                                <Segmented
                                    name="frequency"
                                    legend="Frequency"
                                    value={frequency}
                                    register={register}
                                    options={[
                                        { value: "one-time", label: "One-time" },
                                        { value: "monthly", label: "Monthly" },
                                    ]}
                                />
                            </div>
                            <p className="-mt-4 rounded-2xl bg-brand-cream px-4 py-3 text-sm leading-6 text-brand-sage">
                                {fund === "zakat" ? meta.funds.zakat.description : meta.funds.general.description}
                            </p>

                            <fieldset>
                                <legend className="text-sm font-semibold text-brand-forest">Amount (USD)</legend>
                                <div className="mt-3 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                                    {tiers.map((tier) => (
                                        <label
                                            key={tier.amount}
                                            className={cn(
                                                "relative cursor-pointer rounded-2xl border p-4 transition has-[:focus-visible]:ring-2 has-[:focus-visible]:ring-brand-amber",
                                                choice === tier.amount ? "border-brand-amber bg-brand-amber/10 ring-1 ring-brand-amber" : "border-brand-sand hover:border-brand-amber/60"
                                            )}
                                        >
                                            <input type="radio" name="tier" className="sr-only" checked={choice === tier.amount} onChange={() => chooseTier(tier.amount)} />
                                            <span className="flex items-center justify-between font-display text-2xl font-semibold text-brand-forest">
                                                {usd.format(tier.amount)}
                                                {choice === tier.amount && <CheckCircle2 className="h-5 w-5 text-brand-gold" aria-hidden="true" />}
                                            </span>
                                            <span className="mt-1 block text-sm leading-5 text-brand-sage">{tier.description}</span>
                                        </label>
                                    ))}
                                    <label
                                        className={cn(
                                            "flex cursor-pointer flex-col justify-center rounded-2xl border border-dashed p-4 transition has-[:focus-visible]:ring-2 has-[:focus-visible]:ring-brand-amber",
                                            choice === "custom" ? "border-brand-amber bg-brand-amber/10" : "border-brand-sand hover:border-brand-amber/60"
                                        )}
                                    >
                                        <input type="radio" name="tier" className="sr-only" checked={choice === "custom"} onChange={() => chooseTier("custom")} />
                                        <span className="font-semibold text-brand-forest">Other amount</span>
                                        {choice === "custom" ? (
                                            <span className="mt-2 flex items-center gap-1">
                                                <span className="text-lg font-semibold text-brand-forest">$</span>
                                                <Input
                                                    type="number"
                                                    inputMode="decimal"
                                                    min={1}
                                                    step="any"
                                                    autoFocus
                                                    aria-label="Custom amount in US dollars"
                                                    aria-invalid={!!errors.amount}
                                                    className="h-10 bg-white"
                                                    onChange={(e) => setValue("amount", e.target.value === "" ? (undefined as unknown as number) : Number(e.target.value), { shouldValidate: true })}
                                                />
                                            </span>
                                        ) : (
                                            <span className="mt-1 text-sm text-brand-sage">Enter your own</span>
                                        )}
                                    </label>
                                </div>
                                {errors.amount && (
                                    <p role="alert" className="mt-2 text-sm text-red-700">{errors.amount.message}</p>
                                )}
                            </fieldset>

                            <Field id="designation" label="Direct my gift to" required>
                                <select id="designation" className={cn(fieldClass, "h-12 py-0")} {...register("designation")}>
                                    {meta.designations.map((d) => (
                                        <option key={d.value} value={d.label}>{d.label}</option>
                                    ))}
                                </select>
                            </Field>

                            <div className="grid gap-5 sm:grid-cols-2">
                                <Field id="name" label="Full name" required error={errors.name?.message}>
                                    <Input id="name" autoComplete="name" aria-invalid={!!errors.name} aria-describedby={errors.name ? "name-error" : undefined} {...register("name")} />
                                </Field>
                                <Field id="email" label="Email" required error={errors.email?.message}>
                                    <Input id="email" type="email" autoComplete="email" aria-invalid={!!errors.email} aria-describedby={errors.email ? "email-error" : undefined} {...register("email")} />
                                </Field>
                            </div>
                            <Field id="message" label="Message">
                                <Textarea id="message" rows={3} className="min-h-[96px]" placeholder="e.g. a dedication, or a note for our team" {...register("message")} />
                            </Field>

                            <p className="rounded-2xl border border-brand-sand bg-brand-cream p-4 text-sm italic leading-6 text-brand-sage">{meta.transparencyNote}</p>

                            <FormError error={error} />

                            <Honeypot {...register("company")} />
                            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                                <Button type="submit" size="lg" disabled={isSubmitting} className="w-full sm:w-auto">
                                    {isSubmitting ? "Sending…" : givingOpen ? "Confirm donation" : "Pledge my support"}
                                    {summary && !isSubmitting && <span className="rounded-full bg-brand-forest/10 px-2 py-0.5">{summary}</span>}
                                    {!isSubmitting && <ArrowRight className="h-4 w-4" aria-hidden="true" />}
                                </Button>
                                <p className="text-xs text-brand-sage">
                                    {givingOpen ? "This form notifies our team. Payment details are shown alongside." : "No payment is taken today."}
                                </p>
                            </div>
                        </form>
                    )}
                </div>

                {/* Sidebar */}
                <aside className="space-y-6 lg:sticky lg:top-28">
                    <div className="rounded-3xl bg-brand-forest p-7 text-brand-ivory">
                        <h3 className="font-display text-xl font-semibold">Ways to give</h3>
                        <p className="mt-2 text-sm text-brand-ivory/75">
                            {activeMethods.length > 0
                                ? "Use one of the methods below and mention “Zakat” or “General” in your reference."
                                : "Donation details are coming soon. Pledge today and we'll send them to you directly."}
                        </p>
                        <ul className="mt-5 space-y-3">
                            {meta.paymentMethods.map((method) => (
                                <PaymentMethod key={method.name} {...method} />
                            ))}
                        </ul>
                    </div>

                    <div className="rounded-3xl border border-brand-sand bg-white p-7">
                        <h3 className="flex items-center gap-2 font-display text-xl font-semibold text-brand-forest">
                            <Lock className="h-5 w-5 text-brand-gold" aria-hidden="true" />
                            {meta.transparencyPromise.title}
                        </h3>
                        <ul className="mt-5 space-y-3">
                            {meta.transparencyPromise.items.map((item) => (
                                <li key={item} className="flex items-start gap-2.5 text-sm text-brand-sage">
                                    <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-brand-pine" aria-hidden="true" />
                                    {item}
                                </li>
                            ))}
                        </ul>
                    </div>
                </aside>
            </div>
        </Container>
    );
}
