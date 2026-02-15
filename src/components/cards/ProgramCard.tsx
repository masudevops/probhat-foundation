import Link from "next/link";
import { ArrowRight, BookOpen, Heart, Moon, Users, LucideIcon } from "lucide-react";
import { Button } from "@/components/ui/common";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";

const icons: Record<string, LucideIcon> = {
    GraduationCap: BookOpen,
    Heart: Heart,
    Moon: Moon,
    Users: Users,
};

interface ProgramCardProps {
    title: string;
    description: string;
    slug: string;
    iconName?: string;
}

export function ProgramCard({ title, description, slug, iconName }: ProgramCardProps) {
    const Icon = iconName && icons[iconName] ? icons[iconName] : Users;

    return (
        <Card className="flex flex-col h-full hover:shadow-md transition-shadow">
            <CardHeader>
                <div className="w-12 h-12 rounded-lg bg-sunrise-orange/10 flex items-center justify-center mb-4 text-sunrise-orange">
                    <Icon size={24} />
                </div>
                <CardTitle className="text-xl text-navy-deep">{title}</CardTitle>
            </CardHeader>
            <CardContent className="flex-grow">
                <CardDescription className="text-base text-gray-600 line-clamp-3">
                    {description}
                </CardDescription>
            </CardContent>
            <CardFooter>
                <Link href={`/programs/${slug}`} className="w-full">
                    <Button variant="outline" className="w-full group">
                        Learn More
                        <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </Button>
                </Link>
            </CardFooter>
        </Card>
    );
}
