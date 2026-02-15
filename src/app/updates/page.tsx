import { Container, Section } from "@/components/ui/common";
import { UpdateCard } from "@/components/cards/UpdateCard";
import { getAllPosts } from "@/lib/mdx";

export const metadata = {
    title: "Latest Updates",
    description: "Stay informed about Probhat Foundation's latest activities and impact stories.",
};

export default async function UpdatesPage() {
    const updates = await getAllPosts("updates");

    return (
        <div className="flex flex-col min-h-screen">
            <div className="bg-navy-deep py-20 text-center">
                <Container>
                    <h1 className="text-4xl font-bold tracking-tight text-white sm:text-5xl mb-6">Latest Updates</h1>
                    <p className="mt-4 text-xl text-gray-300 max-w-2xl mx-auto">
                        Stories of hope, resilience, and change from the field.
                    </p>
                </Container>
            </div>

            <Section className="bg-light-gray">
                <Container>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {updates.map((update: any) => (
                            <UpdateCard
                                key={update.slug}
                                title={update.title}
                                summary={update.summary}
                                date={update.date}
                                slug={update.slug}
                                image={update.coverImage}
                                tags={update.tags}
                            />
                        ))}
                    </div>
                </Container>
            </Section>
        </div>
    );
}
