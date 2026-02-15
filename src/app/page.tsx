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
            <section className="relative bg-gradient-to-b from-nonprofit-blue-light via-white to-white py-20 lg:py-32 overflow-hidden">
                {/* Subtle background pattern */}
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(11,53,102,0.04),transparent_50%)]" />

                <Container className="relative z-10">
                    <div className="max-w-5xl">
                        <h1 className="text-5xl font-bold tracking-tight sm:text-7xl mb-6 text-nonprofit-blue">
                            {tagline}
                        </h1>
                        <p className="font-bengali text-3xl sm:text-5xl text-nonprofit-blue/80 mb-8 font-medium">
                            {bengaliTagline}
                        </p>
                        <p className="mt-8 text-xl leading-8 text-gray-600 max-w-2xl">
                            {pageMeta.description}
                        </p>
                        <div className="mt-10 flex flex-col sm:flex-row gap-4">
                            <Link href="/donate">
                                <Button size="lg" className="w-full sm:w-auto text-base px-8">
                                    Support Our Work
                                </Button>
                            </Link>
                            <Link href="/programs">
                                <Button variant="outline" size="lg" className="w-full sm:w-auto text-base border-nonprofit-blue text-nonprofit-blue hover:bg-nonprofit-blue hover:text-white">
                                    View Our Programs
                                </Button>
                            </Link>
                        </div>
                    </div>
                </Container>
            </section>

            {/* Our Current Scope */}
            <Section className="bg-white py-16 border-b border-gray-100">
                <Container>
                    <div className="text-center mb-10">
                        <h2 className="text-2xl font-semibold text-nonprofit-blue mb-2">Our Current Scope</h2>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
                        <div className="text-center p-6">
                            <div className="text-4xl font-bold text-nonprofit-blue mb-2">5+</div>
                            <div className="text-gray-600">Communities Engaged</div>
                        </div>
                        <div className="text-center p-6">
                            <div className="text-4xl font-bold text-nonprofit-blue mb-2">4</div>
                            <div className="text-gray-600">Core Programs</div>
                        </div>
                        <div className="text-center p-6">
                            <div className="text-4xl font-bold text-nonprofit-blue mb-2">15+</div>
                            <div className="text-gray-600">Volunteers Supporting Field Activities</div>
                        </div>
                    </div>
                </Container>
            </Section>

            {/* Our Approach Section */}
            <Section className="bg-light-blue py-16">
                <Container>
                    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 md:p-12 text-center max-w-4xl mx-auto">
                        <h2 className="text-3xl font-bold text-nonprofit-blue sm:text-4xl mb-6">
                            {pageMeta.approach?.title || "Our Approach to Sustainable Impact"}
                        </h2>
                        <p className="text-xl text-gray-600 leading-relaxed max-w-3xl mx-auto">
                            {pageMeta.approach?.text}
                        </p>
                    </div>
                </Container>
            </Section>

            {/* Core Program Areas */}
            <Section className="bg-white">
                <Container>
                    <div className="text-center max-w-2xl mx-auto mb-16">
                        <h2 className="text-3xl font-bold tracking-tight text-nonprofit-blue sm:text-4xl">Core Program Areas</h2>
                        <p className="mt-4 text-lg text-gray-600">
                            Focused initiatives designed to create lasting and measurable community impact.
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

            {/* Transparency & Governance Section */}
            <Section className="bg-nonprofit-blue-light text-gray-800">
                <Container>
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                        <div>
                            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl mb-6 text-nonprofit-blue">
                                {pageMeta.transparency?.title}
                            </h2>
                            <div className="w-20 h-1.5 bg-warm-accent mb-8 rounded-full"></div>
                            <dl className="grid grid-cols-1 gap-6">
                                {pageMeta.transparency?.items.map((item: string, index: number) => (
                                    <div key={index} className="flex items-start gap-4">
                                        <div className="bg-nonprofit-blue/10 p-2 rounded-full mt-1">
                                            <CheckCircle2 className="h-5 w-5 text-nonprofit-blue" />
                                        </div>
                                        <dt className="text-lg font-medium text-gray-700">{item}</dt>
                                    </div>
                                ))}
                            </dl>
                        </div>
                        <div className="hidden lg:block relative">
                            {/* Abstract visual representation of transparency */}
                            <div className="aspect-square bg-white rounded-2xl border border-gray-200 shadow-sm p-8 flex items-center justify-center">
                                <div className="text-center">
                                    <p className="text-6xl font-bold text-nonprofit-blue/20 mb-4">
                                        <CheckCircle2 size={64} />
                                    </p>
                                    <p className="text-xl text-gray-600">Integrity & Accountability</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </Container>
            </Section>


            {/* Programs & Initiatives */}
            <Section className="bg-white">
                <Container>
                    <div className="text-center max-w-2xl mx-auto mb-12">
                        <h2 className="text-3xl font-bold tracking-tight text-nonprofit-blue sm:text-4xl mb-6">{pageMeta.updatesTitle}</h2>
                        <p className="text-lg text-gray-600">
                            Our structured approach to community impact.
                        </p>
                    </div>
                    <div className="max-w-3xl mx-auto">
                        <div className="bg-gradient-to-br from-nonprofit-blue-light to-white p-8 rounded-xl border border-gray-200 shadow-sm">
                            <div className="flex items-start gap-4">
                                <div className="bg-nonprofit-blue text-white rounded-lg px-4 py-2 text-sm font-semibold">
                                    2026
                                </div>
                                <div>
                                    <h3 className="text-xl font-bold text-nonprofit-blue mb-2">Structured Community Initiative</h3>
                                    <p className="text-gray-600">
                                        Detailed program documentation and impact reporting will be published following each major initiative launch.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </Container>
            </Section>

            {/* CTA Banner */}
            <Section className="bg-warm-accent/10 py-16">
                <Container>
                    <div className="flex flex-col md:flex-row items-center justify-between gap-8 bg-white p-8 md:p-12 rounded-2xl shadow-sm border border-warm-accent/20">
                        <div>
                            <h2 className="text-3xl font-bold text-nonprofit-blue">{pageMeta.ctaTitle}</h2>
                            <p className="mt-2 text-lg text-gray-600">Your support enables sustainable community development.</p>
                        </div>
                        <Link href="/donate">
                            <Button size="lg" className="w-full md:w-auto">Support Our Work</Button>
                        </Link>
                    </div>
                </Container>
            </Section>
        </div>
    );
}
