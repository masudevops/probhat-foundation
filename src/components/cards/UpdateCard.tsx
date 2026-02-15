import Link from "next/link";
import Image from "next/image";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/common";
import { formatDate } from "@/lib/utils";

interface UpdateCardProps {
    title: string;
    summary: string;
    date: string;
    slug: string;
    image?: string;
    tags?: string[];
}

export function UpdateCard({ title, summary, date, slug, image, tags }: UpdateCardProps) {
    return (
        <Card className="flex flex-col h-full overflow-hidden hover:shadow-md transition-shadow">
            {image && (
                <div className="relative w-full h-48 bg-gray-100">
                    {/* Placeholder for image - in real app would interact with next/image properly */}
                    <div className="absolute inset-0 flex items-center justify-center text-gray-400">
                        <span className="sr-only">Image for {title}</span>
                        [Image Placeholder]
                    </div>
                </div>
            )}
            <CardHeader>
                <div className="flex items-center gap-2 mb-2">
                    <span className="text-xs font-medium text-sunrise-orange bg-sunrise-orange/10 px-2 py-1 rounded-full">
                        {tags?.[0] || "Update"}
                    </span>
                    <span className="text-xs text-gray-500">
                        {new Date(date).toLocaleDateString()}
                    </span>
                </div>
                <CardTitle className="text-lg text-navy-deep line-clamp-2">
                    <Link href={`/updates/${slug}`} className="hover:text-sunrise-orange transition-colors">
                        {title}
                    </Link>
                </CardTitle>
            </CardHeader>
            <CardContent className="flex-grow">
                <CardDescription className="line-clamp-3">
                    {summary}
                </CardDescription>
            </CardContent>
            <CardFooter>
                <Link href={`/updates/${slug}`}>
                    <Button variant="link" className="px-0 text-sunrise-orange">
                        Read Full Update &rarr;
                    </Button>
                </Link>
            </CardFooter>
        </Card>
    );
}
