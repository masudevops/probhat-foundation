import { Container, Section } from "@/components/ui/common";
import { getPageContent } from "@/lib/mdx";
import { Calendar, FileText } from "lucide-react";

export const metadata = {
    title: "Programs & Initiatives",
    description: "Structured community impact initiatives and program documentation",
};

export default async function InitiativesPage() {
    const { meta } = await getPageContent("initiatives");

    return (
        <div className="flex flex-col min-h-screen">
            {/* Hero */}
            <div className="bg-gradient-to-b from-nonprofit-blue to-nonprofit-blue/90 py-20 lg:py-32 relative overflow-hidden">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_50%,rgba(248,166,94,0.1),transparent_50%)]" />
                <Container className="relative z-10">
                    <div className="max-w-3xl">
                        <h1 className="text-4xl font-bold tracking-tight text-white sm:text-6xl mb-6">
                            {meta.title}
                        </h1>
                        <p className="text-xl text-gray-200 mb-8">
                            {meta.description}
                        </p>
                    </div>
                </Container>
            </div>

            {/* Initiatives Timeline */}
            <Section className="bg-white">
                <Container>
                    <div className="max-w-4xl mx-auto">
                        <div className="mb-12 text-center">
                            <h2 className="text-3xl font-bold text-nonprofit-blue mb-4">Initiative Timeline</h2>
                            <p className="text-lg text-gray-600">
                                Documented programs and community impact initiatives
                            </p>
                        </div>

                        {/* 2026 Initiative Placeholder */}
                        <div className="relative pl-8 pb-12 border-l-2 border-nonprofit-blue/20">
                            <div className="absolute left-0 top-0 -translate-x-1/2 w-4 h-4 rounded-full bg-nonprofit-blue border-4 border-white shadow"></div>

                            <div className="bg-gradient-to-br from-nonprofit-blue-light to-white p-8 rounded-xl border border-gray-200 shadow-sm">
                                <div className="flex items-center gap-3 mb-4">
                                    <div className="bg-nonprofit-blue text-white rounded-lg px-4 py-2 text-sm font-semibold flex items-center gap-2">
                                        <Calendar className="h-4 w-4" />
                                        2026
                                    </div>
                                    <span className="text-sm text-gray-500">Planned</span>
                                </div>

                                <h3 className="text-2xl font-bold text-nonprofit-blue mb-3">First Initiative</h3>
                                <p className="text-gray-600 mb-6">
                                    Program details, impact metrics, and documentation will be published as our first structured initiative launches. This initiative will focus on sustainable community development in Dhaka Division.
                                </p>

                                <div className="flex items-center gap-2 text-sm text-gray-500">
                                    <FileText className="h-4 w-4" />
                                    <span>Impact report to be published upon launch</span>
                                </div>
                            </div>
                        </div>

                        {/* Future Initiatives Placeholder */}
                        <div className="relative pl-8">
                            <div className="absolute left-0 top-0 -translate-x-1/2 w-4 h-4 rounded-full bg-gray-300 border-4 border-white shadow"></div>

                            <div className="bg-gray-50 p-8 rounded-xl border border-gray-200">
                                <h3 className="text-xl font-semibold text-gray-700 mb-2">Future Initiatives</h3>
                                <p className="text-gray-600">
                                    Additional programs and initiatives will be documented here as they are developed and launched.
                                </p>
                            </div>
                        </div>
                    </div>
                </Container>
            </Section>

            {/* Impact Documentation */}
            <Section className="bg-light-blue">
                <Container>
                    <div className="max-w-3xl mx-auto text-center">
                        <h2 className="text-2xl font-bold text-nonprofit-blue mb-4">Impact Documentation</h2>
                        <p className="text-lg text-gray-600 mb-8">
                            Probhat Foundation maintains structured documentation of all programs and initiatives. Impact reports include:
                        </p>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-left">
                            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                                <h3 className="font-semibold text-nonprofit-blue mb-2">Program Metrics</h3>
                                <p className="text-sm text-gray-600">Quantitative outcomes and reach data</p>
                            </div>
                            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                                <h3 className="font-semibold text-nonprofit-blue mb-2">Financial Allocation</h3>
                                <p className="text-sm text-gray-600">Transparent fund distribution records</p>
                            </div>
                            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                                <h3 className="font-semibold text-nonprofit-blue mb-2">Community Feedback</h3>
                                <p className="text-sm text-gray-600">Beneficiary testimonials and input</p>
                            </div>
                            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                                <h3 className="font-semibold text-nonprofit-blue mb-2">Lessons Learned</h3>
                                <p className="text-sm text-gray-600">Continuous improvement insights</p>
                            </div>
                        </div>
                    </div>
                </Container>
            </Section>
        </div>
    );
}
