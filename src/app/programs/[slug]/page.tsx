import { Container, Section, Button } from "@/components/ui/common";
import { getPostBySlug } from "@/lib/mdx";
import Link from "next/link";
import { notFound } from "next/navigation";

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
    try {
        const { slug } = await params;
        const { meta } = await getPostBySlug(slug, "programs");
        return {
            title: meta.title,
            description: meta.summary,
        };
    } catch (error) {
        return {
            title: "Program Not Found",
        };
    }
}

export default async function ProgramPage({ params }: { params: Promise<{ slug: string }> }) {
    try {
        const { slug } = await params;
        const { meta, content } = await getPostBySlug(slug, "programs");

        return (
            <div className="flex flex-col min-h-screen">
                <div className="bg-navy-deep py-20">
                    <Container>
                        <div className="max-w-3xl">
                            <Link href="/programs" className="text-sunrise-orange hover:text-white mb-4 inline-block font-medium">
                                &larr; Back to Programs
                            </Link>
                            <h1 className="text-4xl font-bold tracking-tight text-white sm:text-5xl mb-6">{meta.title}</h1>
                            <p className="text-xl text-gray-300">
                                {meta.summary}
                            </p>
                        </div>
                    </Container>
                </div>

                <Section>
                    <Container>
                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                            <div className="lg:col-span-2">
                                <article className="prose prose-lg prose-headings:text-navy-deep prose-p:text-gray-600 prose-a:text-sunrise-orange max-w-none">
                                    {content}
                                </article>
                            </div>
                            <div>
                                <div className="bg-light-gray p-8 rounded-xl border border-gray-200 sticky top-24">
                                    <h3 className="text-2xl font-bold text-navy-deep mb-4">Support This Program</h3>
                                    <p className="text-gray-600 mb-6">
                                        Your donation directly impacts the success of this initiative. Help us make a difference today.
                                    </p>
                                    <Link href="/donate" className="w-full">
                                        <Button size="lg" className="w-full">
                                            Donate Now
                                        </Button>
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </Container>
                </Section>
            </div>
        );
    } catch (error) {
        notFound();
    }
}
