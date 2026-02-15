import Link from "next/link";
import { Facebook, Instagram, Linkedin, Sun } from "lucide-react";
import { Container } from "@/components/ui/common";

const navigation = {
    main: [
        { name: "About", href: "/about" },
        { name: "Programs", href: "/programs" },
        { name: "Donate", href: "/donate" },
        { name: "Contact", href: "/contact" },
    ],
    social: [
        {
            name: "Facebook",
            href: "https://facebook.com",
            icon: (props: any) => <Facebook {...props} />,
        },
        {
            name: "Instagram",
            href: "https://instagram.com",
            icon: (props: any) => <Instagram {...props} />,
        },
        {
            name: "LinkedIn",
            href: "https://linkedin.com",
            icon: (props: any) => <Linkedin {...props} />,
        },
    ],
};

export function Footer() {
    return (
        <footer className="bg-navy-deep text-white">
            <Container className="py-12 md:py-16">
                <div className="xl:grid xl:grid-cols-3 xl:gap-8">
                    <div className="space-y-8">
                        <Link href="/" className="flex items-center gap-2">
                            <div className="h-8 w-8 rounded-full bg-gradient-to-tr from-sunrise-orange to-accent-gold flex items-center justify-center text-white">
                                <Sun size={20} />
                            </div>
                            <span className="text-xl font-bold text-white">Probhat Foundation</span>
                        </Link>
                        <p className="text-sm leading-6 text-gray-300">
                            Probhat Foundation is a community-focused humanitarian foundation serving underserved areas of Dhaka Division, Bangladesh.
                        </p>
                        <p className="text-xs leading-6 text-gray-400 mt-2 font-medium">
                            Structured. Accountable. Community-Driven.
                        </p>
                        <div className="flex space-x-6">
                            {navigation.social.map((item) => (
                                <a
                                    key={item.name}
                                    href={item.href}
                                    className="text-gray-400 hover:text-white"
                                >
                                    <span className="sr-only">{item.name}</span>
                                    <item.icon className="h-6 w-6" aria-hidden="true" />
                                </a>
                            ))}
                        </div>
                    </div>
                    <div className="mt-16 grid grid-cols-2 gap-8 xl:col-span-2 xl:mt-0">
                        <div className="md:grid md:grid-cols-2 md:gap-8">
                            <div>
                                <h3 className="text-sm font-semibold leading-6 text-white">
                                    Organization
                                </h3>
                                <ul role="list" className="mt-6 space-y-4">
                                    {navigation.main.map((item) => (
                                        <li key={item.name}>
                                            <Link
                                                href={item.href}
                                                className="text-sm leading-6 text-gray-300 hover:text-white"
                                            >
                                                {item.name}
                                            </Link>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                            <div className="mt-10 md:mt-0">
                                <h3 className="text-sm font-semibold leading-6 text-white">
                                    Get Involved
                                </h3>
                                <ul role="list" className="mt-6 space-y-4">
                                    <li>
                                        <Link href="/volunteer" className="text-sm leading-6 text-gray-300 hover:text-white">Volunteer</Link>
                                    </li>
                                    <li>
                                        <Link href="/donate" className="text-sm leading-6 text-gray-300 hover:text-white">Donate</Link>
                                    </li>
                                </ul>
                            </div>
                        </div>
                        <div className="md:grid md:grid-cols-1 md:gap-8">
                            <h3 className="text-sm font-semibold leading-6 text-white">Contact</h3>
                            <ul className="mt-6 space-y-4 text-sm leading-6 text-gray-300">
                                <li>info@probhatfoundation.org</li>
                                <li>+880-1712-345678</li>
                                <li>Dhaka, Bangladesh</li>
                            </ul>
                        </div>
                    </div>
                </div>
                <div className="mt-16 border-t border-white/10 pt-8 sm:mt-20 lg:mt-24">
                    <p className="text-xs leading-5 text-gray-400">
                        &copy; {new Date().getFullYear()} Probhat Foundation. All rights reserved. A community-based humanitarian initiative serving rural Bangladesh.
                    </p>
                </div>
            </Container>
        </footer>
    );
}
