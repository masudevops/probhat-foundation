import { PageHero } from "@/components/ui/brand";
import { DonateContent } from "@/components/pages/DonateContent";
import { getPageContent } from "@/lib/mdx";
import type { DonateContent as DonateMeta } from "@/lib/content-types";

export const metadata = {
    title: "Donate",
    description: "Support Probhat Foundation's mission with Zakat, Sadaqah or Sadaqah Jariyah. Your contribution makes a difference.",
};

export default async function DonatePage({ searchParams }: { searchParams: Promise<{ fund?: string; designation?: string }> }) {
    const { meta } = await getPageContent<DonateMeta>("donate");
    const { fund, designation } = await searchParams;

    return (
        <div className="flex flex-col bg-brand-cream">
            <PageHero eyebrow="Donate" title={meta.title} description={meta.description} className="pb-32 sm:pb-36 lg:pb-40" />
            <DonateContent meta={meta} defaultFund={fund === "zakat" ? "zakat" : "general"} defaultDesignation={designation} />
        </div>
    );
}
