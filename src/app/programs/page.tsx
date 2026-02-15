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
        </div>
    );
}
