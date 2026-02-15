import Link from "next/link";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import { Button, Container, Section } from "@/components/ui/common";
import { ProgramCard } from "@/components/cards/ProgramCard";
import { getPageContent, getAllPosts } from "@/lib/mdx";

export default async function Home() {
    const { meta: pageMeta } = await getPageContent("home");
    const programs = await getAllPosts("programs");
    // Show all programs (expecting 4)
    const featuredPrograms = programs;
    const updates = await getAllPosts("updates");
    const recentUpdates = updates.slice(0, 3);
    // Fallback for missing/optional data
    const tagline = pageMeta.heroTagline || "Hope. Support. Progress.";
    const bengaliTagline = pageMeta.heroBengaliTagline || "সমাজের পাশে, মানুষের জন্য";

    return (
        <div className="flex flex-col min-h-screen">
            {/* Hero Section */}
            <section className="relative bg-navy-deep py-20 lg:py-32 overflow-hidden">
                {/* Background Gradient */}
                <div className="absolute inset-0 bg-gradient-to-br from-navy-deep via-navy-deep to-sunrise-orange/20 opacity-90" />

                <Container className="relative z-10">
                    <div className="max-w-5xl text-white">
                        <h1 className="text-5xl font-bold tracking-tight sm:text-7xl mb-6">
                            {tagline} <br />
                            <span className="font-bengali text-3xl sm:text-5xl text-accent-gold mt-4 block opacity-90">
                                {bengaliTagline}
                            </span>
                        </h1>
                        <p className="mt-8 text-xl leading-8 text-gray-300 max-w-2xl">
                            {pageMeta.description}
                        </p>
                        <div className="mt-10 flex flex-col sm:flex-row gap-4">
                            <Link href="/donate">
                                <Button size="lg" className="w-full sm:w-auto text-base px-8">
                                    Support Our Work
                                </Button>
                            </Link>
                            <Link href="/programs">
                                <Button variant="outline" size="lg" className="w-full sm:w-auto text-base border-white text-white hover:bg-white hover:text-navy-deep bg-transparent">
                                    View Programs
                                </Button>
                            </Link>
                        </div>
                    </div>
                </Container>
            </section>

            {/* Our Journey Begins (Soft Launch Section) */}
            <Section className="bg-light-gray py-16">
                <Container>
                    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 md:p-12 text-center max-w-4xl mx-auto">
                        <span className="inline-block px-4 py-1.5 rounded-full bg-sunrise-orange/10 text-sunrise-orange text-sm font-semibold mb-6">
                            Founding Phase – Building With Integrity
                        </span>
                        <h2 className="text-3xl font-bold text-navy-deep sm:text-4xl mb-6">
                            {pageMeta.softLaunch?.title || "Our Journey Begins"}
                        </h2>
                        <p className="text-xl text-gray-600 leading-relaxed max-w-3xl mx-auto">
                            {pageMeta.softLaunch?.text}
                        </p>
                    </div>
                </Container>
            </Section>

            {/* Focus Areas */}
            <Section className="bg-white">
                <Container>
                    <div className="text-center max-w-2xl mx-auto mb-16">
                        <h2 className="text-3xl font-bold tracking-tight text-navy-deep sm:text-4xl">Our Focus Areas</h2>
                        <p className="mt-4 text-lg text-gray-600">
                            We focus on the fundamental pillars of a thriving community.
                        </p>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {featuredPrograms.map((program: any) => (
                            <ProgramCard
                                key={program.slug}
                                title={program.title}
                                description={program.summary}
                                slug={program.slug}
                                iconName={program.icon}
                            />
                        ))}
                    </div>
                    <div className="mt-12 text-center">
                        <Link href="/programs">
                            <Button variant="outline">View All Programs</Button>
                        </Link>
                    </div>
                </Container>
            </Section>

            {/* Transparency Section */}
            <Section className="bg-navy-deep text-white">
                <Container>
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                        <div>
                            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl mb-6 text-white">
                                {pageMeta.transparency?.title}
                            </h2>
                            <div className="w-20 h-1.5 bg-sunrise-orange mb-8 rounded-full"></div>
                            <dl className="grid grid-cols-1 gap-6">
                                {pageMeta.transparency?.items.map((item: string, index: number) => (
                                    <div key={index} className="flex items-start gap-4">
                                        <div className="bg-white/10 p-2 rounded-full mt-1">
                                            <CheckCircle2 className="h-5 w-5 text-sunrise-orange" />
                                        </div>
                                        <dt className="text-lg font-medium text-gray-200">{item}</dt>
                                    </div>
                                ))}
                            </dl>
                        </div>
                        <div className="hidden lg:block relative">
                            {/* Abstract visual representation of transparency/graph */}
                            <div className="aspect-square bg-white/5 rounded-2xl border border-white/10 p-8 flex items-center justify-center">
                                <div className="text-center">
                                    <p className="text-6xl font-bold text-white/20 mb-4">
                                        <CheckCircle2 size={64} />
                                    </p>
                                    <p className="text-xl text-gray-400">Integrity & Accountability</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </Container>
            </Section>

            {/* Founder's Note */}
            <Section className="bg-white border-b border-gray-100">
                <Container>
                    <div className="max-w-3xl mx-auto text-center">
                        <span className="text-sunrise-orange font-semibold tracking-wider text-sm uppercase mb-4 block">Founder's Note</span>
                        <h2 className="text-2xl md:text-3xl font-bold text-navy-deep mb-8 relative inline-block">
                            Building a Legacy of Service
                        </h2>
                        <blockquote className="text-xl text-gray-600 italic leading-relaxed mb-8">
                            "Probhat Foundation was established with a commitment to structured, ethical, and community-driven service. Our goal is to build a transparent and sustainable platform that uplifts underserved communities with integrity and compassion."
                        </blockquote>
                        <cite className="not-italic font-semibold text-navy-deep block">
                            — Masudur Rahman
                            <span className="block text-sm text-gray-500 font-normal mt-1">Founder, Probhat Foundation</span>
                        </cite>
                    </div>
                </Container>
            </Section>

            {/* Program Updates (Placeholder) */}
            <Section className="bg-light-gray">
                <Container>
                    <div className="text-center max-w-2xl mx-auto">
                        <h2 className="text-3xl font-bold tracking-tight text-navy-deep sm:text-4xl mb-6">Program Updates</h2>
                        <div className="bg-white p-8 rounded-xl border border-gray-200 shadow-sm">
                            <p className="text-lg text-gray-600">
                                Impact reports and program updates will be published here as our initiatives begin.
                            </p>
                        </div>
                    </div>
                </Container>
            </Section>

            {/* CTA Banner */}
            <Section className="bg-sunrise-orange/10 py-16">
                <Container>
                    <div className="flex flex-col md:flex-row items-center justify-between gap-8 bg-white p-8 md:p-12 rounded-2xl shadow-sm border border-sunrise-orange/20">
                        <div>
                            <h2 className="text-3xl font-bold text-navy-deep">{pageMeta.ctaTitle}</h2>
                            <p className="mt-2 text-lg text-gray-600">Your support can rewrite the future for a child in need.</p>
                        </div>
                        <Link href="/donate">
                            <Button size="lg" className="w-full md:w-auto">Donate Today</Button>
                        </Link>
                    </div>
                </Container>
            </Section>
        </div>
    );
}
