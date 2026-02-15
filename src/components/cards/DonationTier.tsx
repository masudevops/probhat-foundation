import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { Check } from "lucide-react";

interface DonationTierProps {
    amount: number;
    description: string;
    selected?: boolean;
    onClick?: () => void;
}

export function DonationTier({ amount, description, selected, onClick }: DonationTierProps) {
    return (
        <Card
            className={cn(
                "cursor-pointer transition-all hover:border-sunrise-orange",
                selected ? "border-sunrise-orange ring-2 ring-sunrise-orange ring-offset-2" : "border-gray-200"
            )}
            onClick={onClick}
        >
            <CardHeader className="pb-2">
                <CardTitle className="flex items-center justify-between text-2xl font-bold text-navy-deep">
                    ${amount}
                    {selected && <Check className="h-5 w-5 text-sunrise-orange" />}
                </CardTitle>
            </CardHeader>
            <CardContent>
                <CardDescription className="text-sm font-medium text-gray-600">
                    {description}
                </CardDescription>
            </CardContent>
        </Card>
    );
}
