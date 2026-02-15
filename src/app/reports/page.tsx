import { Container, Section } from "@/components/ui/common";
import { getPostBySlug } from "@/lib/mdx";

// Placeholder for future implementation of listing reports
// import { getAllPosts } from "@/lib/mdx"; 

export const metadata = {
    title: "Impact Reports | Probhat Foundation",
    description: "Documented impact reports and community initiatives.",
};

export default function ReportsPage() {
    return (
        <div className="flex flex-col min-h-screen">
            <div className="bg-navy-deep py-20">
                <Container>
                    <div className="max-w-3xl">
                        <h1 className="text-4xl font-bold tracking-tight text-white sm:text-5xl mb-6">Impact Reports</h1>
                        <p className="text-xl text-gray-300">
                            Transparent documentation of our community work.
                        </p>
                    </div>
                </Container>
            </div>

            <Section>
                <Container>
                    <div className="max-w-3xl">
                        <div className="bg-light-gray p-8 rounded-xl border border-gray-200">
                            <p className="text-lg text-gray-600">
                                Impact reports and documented initiatives will be published here as programs are completed.
                            </p>
                        </div>
                    </div>
                </Container>
            </Section>
        </div>
    );
}
