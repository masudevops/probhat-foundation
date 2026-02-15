import { Container, Section, Button } from "@/components/ui/common";
import { getPostBySlug } from "@/lib/mdx";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
    try {
        const { slug } = await params;
        const { meta } = await getPostBySlug(slug, "updates");
        return {
            title: meta.title,
            description: meta.summary,
        };
    } catch (error) {
        return {
            title: "Update Not Found",
        };
    }
}

export default async function UpdatePage({ params }: { params: Promise<{ slug: string }> }) {
    try {
        const { slug } = await params;
        const { meta, content } = await getPostBySlug(slug, "updates");

        return (
            <div className="flex flex-col min-h-screen">
                <div className="bg-navy-deep py-20">
                    <Container>
                        <div className="max-w-3xl mx-auto">
                            <Link href="/updates" className="text-sunrise-orange hover:text-white mb-6 inline-flex items-center font-medium gap-2">
                                <ArrowLeft size={16} /> Back to Updates
                            </Link>
                            <div className="flex items-center gap-4 mb-4">
                                {meta.date && (
                                    <span className="text-sm text-gray-400">
                                        {new Date(meta.date).toLocaleDateString(undefined, { year: 'numeric', month: 'long', day: 'numeric' })}
                                    </span>
                                )}
                                {meta.tags && (
                                    <span className="text-xs font-medium text-navy-deep bg-white/10 text-white px-2 py-1 rounded-full">
                                        {meta.tags[0]}
                                    </span>
                                )}
                            </div>
                            <h1 className="text-3xl font-bold tracking-tight text-white sm:text-5xl mb-6">{meta.title}</h1>
                            <p className="text-xl text-gray-300 border-l-4 border-sunrise-orange pl-4">
                                {meta.summary}
                            </p>
                        </div>
                    </Container>
                </div>

                <Section>
                    <Container>
                        <div className="max-w-3xl mx-auto">
                            <article className="prose prose-lg prose-headings:text-navy-deep prose-p:text-gray-600 prose-a:text-sunrise-orange max-w-none">
                                {content}
                            </article>
                            <div className="mt-12 pt-8 border-t border-gray-200">
                                <h3 className="text-xl font-bold text-navy-deep mb-4">Share this update</h3>
                                <div className="flex gap-4">
                                    {/* Placeholder for share buttons */}
                                    <Button variant="outline" size="sm">Share on Facebook</Button>
                                    <Button variant="outline" size="sm">Share on Twitter</Button>
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
