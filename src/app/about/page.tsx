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

                    {/* Sidebar / Team Preview */}
                    <div className="space-y-8">
                        <div className="bg-light-gray p-6 rounded-lg border border-gray-100">
                            <h3 className="text-xl font-bold text-navy-deep mb-4">Our Leadership</h3>
                            <div className="space-y-4">
                                <div className="flex items-center gap-4">
                                    <div className="w-12 h-12 bg-gray-300 rounded-full flex-shrink-0" />
                                    <div>
                                        <p className="font-semibold text-navy-deep">Founder Name</p>
                                        <p className="text-sm text-gray-500">Founder & Chairman</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-4">
                                    <div className="w-12 h-12 bg-gray-300 rounded-full flex-shrink-0" />
                                    <div>
                                        <p className="font-semibold text-navy-deep">Coordinator Name</p>
                                        <p className="text-sm text-gray-500">Chief Coordinator</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="bg-navy-deep text-white p-6 rounded-lg">
                            <h3 className="text-xl font-bold mb-4">Why We Serve</h3>
                            <blockquote className="italic text-gray-300">
                                "Service to others is the rent you pay for your room here on earth."
                            </blockquote>
                        </div>
                    </div>
                </div>
            </Container>
        </div>
    );
}
