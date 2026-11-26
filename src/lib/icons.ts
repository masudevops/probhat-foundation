import {
    BookOpen,
    Briefcase,
    Building2,
    GraduationCap,
    HandHeart,
    HandCoins,
    Heart,
    HeartPulse,
    Home,
    Landmark,
    type LucideIcon,
    Megaphone,
    Moon,
    Sprout,
    Stethoscope,
    Sun,
    Users,
    Wrench,
} from "lucide-react";

// Icons referenced by name from MDX frontmatter (e.g. `icon: "GraduationCap"`).
const icons: Record<string, LucideIcon> = {
    BookOpen,
    Briefcase,
    Building2,
    GraduationCap,
    HandHeart,
    HandCoins,
    Heart,
    HeartPulse,
    Home,
    Landmark,
    Megaphone,
    Moon,
    Sprout,
    Stethoscope,
    Sun,
    Users,
    Wrench,
};

export function getIcon(name?: string): LucideIcon {
    return (name && icons[name]) || Sun;
}
