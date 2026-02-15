"use client";

import { useState } from "react";
import { Container, Section, Button } from "@/components/ui/common";
import { DonationTier } from "@/components/cards/DonationTier";
import { ArrowRight, Lock, CheckCircle2, Copy } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";

interface DonateContentProps {
    meta: any;
    programs: any[];
}

export function DonateContent({ meta, programs }: DonateContentProps) {
    const [fundType, setFundType] = useState<"general" | "zakat">("general");

    return (
        <div className="flex flex-col min-h-screen">
            {/* Hero */}
            <div className="bg-navy-deep py-20 lg:py-32 relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-navy-deep to-sunrise-orange/10" />
                <Container className="relative z-10">
                    <div className="max-w-3xl">
                        <h1 className="text-4xl font-bold tracking-tight text-white sm:text-6xl mb-6">
                            {meta.title}
                        </h1>
                        <p className="text-xl text-gray-300 mb-8">
                            {meta.description}
                        </p>
                    </div>
                </Container>
            </div>

            <Container className="py-12 lg:py-16 -mt-20 relative z-20">
                <div className="bg-white rounded-xl shadow-xl border border-gray-100 p-6 md:p-10">
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                        {/* Donation Form Column */}
                        <div className="lg:col-span-2 space-y-8">

                            {/* Fund Selector */}
                            <div>
                                <h2 className="text-2xl font-bold text-navy-deep mb-4">Select Fund Type</h2>
                                <div className="flex p-1 bg-gray-100 rounded-lg mb-6">
                                    <button
                                        onClick={() => setFundType("general")}
                                        className={cn(
                                            "flex-1 py-3 px-4 rounded-md text-sm font-medium transition-all duration-200",
                                            fundType === "general"
                                                ? "bg-white text-navy-deep shadow-sm ring-1 ring-black/5"
                                                : "text-gray-500 hover:text-gray-900"
                                        )}
                                    >
                                        {meta.funds?.general?.title || "General Fund"}
                                    </button>
                                    <button
                                        onClick={() => setFundType("zakat")}
                                        className={cn(
                                            "flex-1 py-3 px-4 rounded-md text-sm font-medium transition-all duration-200",
                                            fundType === "zakat"
                                                ? "bg-white text-navy-deep shadow-sm ring-1 ring-black/5"
                                                : "text-gray-500 hover:text-gray-900"
                                        )}
                                    >
                                        {meta.funds?.zakat?.title || "Zakat Fund"}
                                    </button>
                                </div>

                                <div className={cn(
                                    "p-4 rounded-lg border mb-8 transition-colors",
                                    fundType === "general" ? "bg-sunrise-orange/5 border-sunrise-orange/20" : "bg-emerald-50 border-emerald-100"
                                )}>
                                    <p className="text-navy-deep">
                                        {fundType === "general"
                                            ? meta.funds?.general?.description
                                            : meta.funds?.zakat?.description}
                                    </p>
                                </div>

                                <h2 className="text-2xl font-bold text-navy-deep mb-4">Choose Your Impact</h2>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    {meta.donationTiers?.map((tier: any) => (
                                        <DonationTier
                                            key={tier.amount}
                                            amount={tier.amount}
                                            description={tier.description}
                                        />
                                    ))}
                                    <div className="flex items-center justify-center p-6 border-2 border-dashed border-gray-200 rounded-lg hover:border-sunrise-orange transition-colors cursor-pointer">
                                        <span className="text-lg font-medium text-gray-600">Custom Amount</span>
                                    </div>
                                </div>
                            </div>

                            <div className="border-t border-gray-100 pt-8">
                                <h2 className="text-2xl font-bold text-navy-deep mb-6">Donation Intent</h2>
                                <form className="space-y-4">
                                    <input type="hidden" name="fundType" value={fundType} />
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                        <div className="space-y-2">
                                            <label htmlFor="name" className="text-sm font-medium">Name</label>
                                            <Input id="name" placeholder="Full Name" />
                                        </div>
                                        <div className="space-y-2">
                                            <label htmlFor="email" className="text-sm font-medium">Email</label>
                                            <Input id="email" type="email" placeholder="email@example.com" />
                                        </div>
                                    </div>
                                    <div className="space-y-2">
                                        <label htmlFor="program" className="text-sm font-medium">Program Preference (Optional)</label>
                                        <select className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50">
                                            <option value="">General Fund (Where Most Needed)</option>
                                            {programs.map((p: any) => (
                                                <option key={p.slug} value={p.slug}>{p.title}</option>
                                            ))}
                                        </select>
                                    </div>
                                    <div className="space-y-2">
                                        <label htmlFor="message" className="text-sm font-medium">Message (Optional)</label>
                                        <Textarea id="message" placeholder="Leave a message..." />
                                    </div>

                                    <div className="bg-gray-50 p-4 rounded text-sm text-gray-600 italic border border-gray-100">
                                        {meta.transparencyNote}
                                    </div>

                                    <Button size="lg" className="w-full sm:w-auto">
                                        Confirm Donation Intent <ArrowRight className="ml-2 h-4 w-4" />
                                    </Button>
                                    <p className="text-xs text-gray-500 mt-2">
                                        * This form notifies us of your intent. Payment details are provided below.
                                    </p>
                                </form>
                            </div>
                        </div>

                        {/* Info Column */}
                        <div className="space-y-8">
                            {/* Transparency Promise */}
                            <div className="bg-light-gray p-6 rounded-lg">
                                <div className="flex items-center gap-2 mb-4 text-navy-deep">
                                    <Lock className="h-5 w-5" />
                                    <h3 className="font-bold text-lg">{meta.transparencyPromise?.title}</h3>
                                </div>
                                <ul className="space-y-3">
                                    {meta.transparencyPromise?.items.map((item: string, idx: number) => (
                                        <li key={idx} className="flex items-start gap-2 text-sm text-gray-600">
                                            <CheckCircle2 className="h-4 w-4 text-sunrise-orange mt-0.5 flex-shrink-0" />
                                            <span>{item}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            {/* Operational Notice */}
                            {meta.operationalNotice && (
                                <div className="bg-amber-50 border border-amber-200 p-6 rounded-lg">
                                    <h3 className="font-bold text-lg text-amber-900 mb-2">{meta.operationalNotice.title}</h3>
                                    <p className="text-sm text-amber-800 leading-relaxed">
                                        {meta.operationalNotice.text}
                                    </p>
                                </div>
                            )}

                            {/* Payment Methods */}
                            <div>
                                <h3 className="font-bold text-lg text-navy-deep mb-4">Payment Methods</h3>
                                <div className="space-y-4">
                                    {meta.paymentMethods?.map((method: any, idx: number) => (
                                        <div key={idx} className="p-4 border border-gray-200 rounded-lg">
                                            <p className="font-medium text-navy-deep">{method.name}</p>
                                            <div className="flex items-center justify-between mt-1 gap-2">
                                                <p className="text-sm font-mono text-gray-600 bg-gray-50 px-2 py-1 rounded break-all">
                                                    {method.detail}
                                                </p>
                                                <Button variant="ghost" size="sm" className="h-8 w-8 p-0" onClick={() => navigator.clipboard.writeText(method.detail)}>
                                                    <Copy className="h-4 w-4 text-gray-400" />
                                                    <span className="sr-only">Copy {method.name} details</span>
                                                </Button>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </Container>
        </div>
    );
}
