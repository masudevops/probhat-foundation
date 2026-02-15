import { getPageContent, getAllPosts } from "@/lib/mdx";
import { DonateContent } from "@/components/pages/DonateContent";

export const metadata = {
    title: "Donate",
    description: "Support Probhat Foundation's mission. Your contribution makes a difference.",
};

export default async function DonatePage() {
    const { meta } = await getPageContent("donate");
    const programs = await getAllPosts("programs");

    return <DonateContent meta={meta} programs={programs} />;
}
