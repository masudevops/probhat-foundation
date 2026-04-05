import { Container, Section } from "@/components/ui/common";
import { ProgramCard } from "@/components/cards/ProgramCard";
import { getAllPosts } from "@/lib/mdx";

export const metadata = {
    title: "Our Programs",
    description: "Explore the various initiatives Probhat Foundation undertakes to empower rural communities.",
};

export default async function ProgramsPage({
    searchParams,
}: {
    searchParams: { category?: string };
}) {
    const programs = await getAllPosts("programs");

    return (
        <div className="flex flex-col min-h-screen">
            <div className="bg-navy-deep py-20 text-center">
                <Container>
                    <h1 className="text-4xl font-bold tracking-tight text-white sm:text-5xl mb-6">Our Programs</h1>
                    <p className="mt-4 text-xl text-gray-300 max-w-2xl mx-auto">
                        From education to healthcare, we are committed to holistic community development.
                    </p>
                </Container>
            </div>

            <Section className="bg-light-gray">
                <Container>
                    <div className="text-center mb-16">
                        <h2 className="text-3xl font-bold text-nonprofit-blue mb-4">Institutional Pillars</h2>
                        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                            Our work is organized into five defined pillars to ensure measurable and sustainable development across Bangladesh.
                        </p>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {programs.map((program: any) => (
                            <ProgramCard
                                key={program.slug}
                                title={program.title}
                                description={program.summary}
                                slug={program.slug}
                                iconName={program.icon}
                            />
                        ))}
                    </div>
                </Container>
            </Section>

            {/* Program Accountability Section */}
            <Section className="bg-white">
                <Container>
                    <div className="max-w-4xl mx-auto">
                        <div className="bg-navy-deep/5 rounded-2xl p-8 md:p-12 border border-navy-deep/10">
                            <h2 className="text-3xl font-bold text-navy-deep mb-8 text-center">Program Accountability</h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-8">
                                <div>
                                    <h3 className="text-lg font-bold text-navy-deep mb-3">Structured Allocation</h3>
                                    <p className="text-gray-600">Funds are strictly allocated based on defined program categories to ensure resources reach intended initiatives without dilution.</p>
                                </div>
                                <div>
                                    <h3 className="text-lg font-bold text-navy-deep mb-3">Internal Documentation</h3>
                                    <p className="text-gray-600">Every initiative is supported by rigorous internal documentation, from beneficiary selection to final impact reporting.</p>
                                </div>
                                <div>
                                    <h3 className="text-lg font-bold text-navy-deep mb-3">Community Oversight</h3>
                                    <p className="text-gray-600">We implement local oversight mechanisms, ensuring that community stakeholders have a voice in program execution and verification.</p>
                                </div>
                                <div>
                                    <h3 className="text-lg font-bold text-navy-deep mb-3">Transparent Reporting</h3>
                                    <p className="text-gray-600">The foundation maintains transparent records of all field activities and financial distributions, available for institutional review.</p>
                                </div>
                                <div className="md:col-span-2 pt-4 border-t border-navy-deep/10">
                                    <h3 className="text-lg font-bold text-navy-deep mb-3">Zakat Separation</h3>
                                    <p className="text-gray-600 italic">Where applicable, Zakat-designated funds are managed through a separate tracking system and allocated strictly in accordance with Islamic charitable principles to eligible program categories.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </Container>
            </Section>
        </div>
    );
}
