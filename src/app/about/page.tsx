import { Container, Section } from "@/components/ui/common";
import { getPageContent } from "@/lib/mdx";
import { Users, Target, Shield, Heart, Handshake, Eye } from "lucide-react";
import Image from "next/image";

const icons = {
    Integrity: Shield,
    Accountability: Target,
    Compassion: Heart,
    Transparency: Eye,
    "Human Dignity": Users,
};

export const metadata = {
    title: "About Us",
    description: "Learn about Probhat Foundation's mission, history, and team.",
};

export default async function AboutPage() {
    const { meta, content } = await getPageContent("about");

    return (
        <div className="flex flex-col min-h-screen">
            {/* Header */}
            <div className="bg-navy-deep py-16 md:py-24">
                <Container>
                    <h1 className="text-4xl font-bold tracking-tight text-white sm:text-5xl mb-4">
                        {meta.title}
                    </h1>
                    <p className="text-lg text-gray-300 max-w-2xl">
                        {meta.description}
                    </p>
                </Container>
            </div>

            <Container className="py-12 md:py-16">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                    {/* Main Content */}
                    <div className="lg:col-span-2 prose prose-lg prose-headings:text-navy-deep prose-p:text-gray-600 prose-a:text-sunrise-orange max-w-none">
                        {content}
                    </div>

                    {/* Sidebar / Institutional Note */}
                    <div className="space-y-8">
                        <div className="bg-navy-deep text-white p-8 rounded-xl shadow-lg border-l-4 border-sunrise-orange">
                            <h3 className="text-xl font-bold mb-4 flex items-center gap-2 text-white">
                                <Shield className="h-5 w-5 text-sunrise-orange" />
                                Institutional Integrity
                            </h3>
                            <p className="text-gray-200 text-sm leading-relaxed mb-6">
                                Probhat Foundation is governed through structured community oversight and transparent coordination mechanisms. We prioritize long-term social impact over individual representation.
                            </p>
                            <h3 className="text-xl font-bold mb-4 flex items-center gap-2 text-white">
                                <Eye className="h-5 w-5 text-sunrise-orange" />
                                Accountability
                            </h3>
                            <p className="text-gray-200 text-sm leading-relaxed">
                                Every program is documented, measured, and reported to ensure that community resources are utilized with maximum efficiency and ethical responsibility.
                            </p>
                        </div>
                    </div>
                </div>
            </Container>
        </div>
    );
}
