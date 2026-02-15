import { cn } from "@/lib/utils";

interface ImpactStatProps {
    value: string;
    label: string;
    className?: string;
}

export function ImpactStat({ value, label, className }: ImpactStatProps) {
    return (
        <div
            className={cn(
                "flex flex-col items-center justify-center p-6 bg-white rounded-xl shadow-sm border border-gray-100 text-center",
                className
            )}
        >
            <span className="text-4xl md:text-5xl font-bold text-sunrise-orange mb-2">
                {value}
            </span>
            <span className="text-sm md:text-base font-medium text-navy-deep uppercase tracking-wide">
                {label}
            </span>
        </div>
    );
}
