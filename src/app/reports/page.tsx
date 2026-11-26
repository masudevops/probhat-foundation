import { FileText, MapPin } from "lucide-react";
import { Container, Section } from "@/components/ui/common";
import { PageHero, cardClass } from "@/components/ui/brand";
import { getAllPosts } from "@/lib/mdx";
import { formatDate } from "@/lib/utils";

export const metadata = {
    title: "Impact Reports",
    description: "Documented impact reports and community initiatives.",
};

export default async function ReportsPage() {
    // Reports with `status: "Draft"` in their frontmatter are not listed.
    const reports = await getAllPosts("reports");

    return (
        <div className="flex flex-col">
            <PageHero eyebrow="Transparency" title="Impact Reports" description="Transparent documentation of our community work." />

            <Section>
                <Container>
                    <div className="mx-auto max-w-3xl">
                        {reports.length === 0 ? (
                            <div className={`${cardClass} flex flex-col items-center p-10 text-center`}>
                                <FileText className="h-10 w-10 text-brand-gold" aria-hidden="true" />
                                <p className="mt-4 text-lg text-brand-sage">
                                    Impact reports and documented initiatives will be published here as programs are completed.
                                </p>
                            </div>
                        ) : (
                            <ul className="space-y-4">
                                {reports.map((report) => (
                                    <li key={report.slug} className={cardClass}>
                                        <h2 className="font-display text-2xl font-semibold text-brand-forest">{report.title}</h2>
                                        <div className="mt-2 flex flex-wrap gap-4 text-sm text-brand-sage">
                                            {report.date && <time dateTime={report.date}>{formatDate(report.date)}</time>}
                                            {report.location && (
                                                <span className="inline-flex items-center gap-1">
                                                    <MapPin className="h-4 w-4 text-brand-gold" aria-hidden="true" />
                                                    {report.location}
                                                </span>
                                            )}
                                        </div>
                                        {report.description && <p className="mt-3 text-brand-sage">{report.description}</p>}
                                    </li>
                                ))}
                            </ul>
                        )}
                    </div>
                </Container>
            </Section>
        </div>
    );
}
