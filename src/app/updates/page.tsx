import { Container, Section } from "@/components/ui/common";
import { PageHero } from "@/components/ui/brand";
import { UpdateCard } from "@/components/cards/UpdateCard";
import { getAllPosts, publicFileExists } from "@/lib/mdx";

export const metadata = {
    title: "Latest Updates",
    description: "Stay informed about Probhat Foundation's latest activities and impact stories.",
};

export default async function UpdatesPage() {
    const updates = await getAllPosts("updates");

    return (
        <div className="flex flex-col">
            <PageHero eyebrow="From the Field" title="Latest Updates" description="Stories of hope, resilience, and change from the field." />

            <Section>
                <Container>
                    {updates.length === 0 ? (
                        <p className="text-center text-lg text-brand-sage">New updates will be published here soon.</p>
                    ) : (
                        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                            {updates.map((update) => (
                                <UpdateCard
                                    key={update.slug}
                                    title={update.title}
                                    summary={update.summary}
                                    date={update.date}
                                    slug={update.slug}
                                    image={publicFileExists(update.coverImage) ? update.coverImage : undefined}
                                    tags={update.tags}
                                />
                            ))}
                        </div>
                    )}
                </Container>
            </Section>
        </div>
    );
}
