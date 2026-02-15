"use client";

import Link from "next/link";
import { useState } from "react";
import { Menu, X, Sun } from "lucide-react";
import { Button, Container } from "@/components/ui/common";
import { cn } from "@/lib/utils";

const navigation = [
    { name: "Home", href: "/" },
    { name: "About", href: "/about" },
    { name: "Programs", href: "/programs" },
    { name: "Initiatives", href: "/initiatives" },
    { name: "Donate", href: "/donate" },
    { name: "Contact", href: "/contact" },
];

export function Header() {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    return (
        <header className="sticky top-0 z-50 w-full border-b bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60">
            <Container>
                <div className="flex h-16 items-center justify-between">
                    <div className="flex lg:flex-1">
                        <Link href="/" className="-m-1.5 p-1.5 flex items-center gap-2">
                            <span className="sr-only">Probhat Foundation</span>
                            <div className="h-8 w-8 rounded-full bg-gradient-to-tr from-sunrise-orange to-accent-gold flex items-center justify-center text-white">
                                <Sun size={20} />
                            </div>
                            <div className="flex flex-col">
                                <span className="text-lg font-bold text-navy-deep leading-none">Probhat Foundation</span>
                                <span className="text-xs text-navy-deep/80 font-bengali leading-none mt-0.5">প্রভাত</span>
                            </div>
                        </Link>
                    </div>
                    <div className="flex lg:hidden">
                        <button
                            type="button"
                            className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
                            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                        >
                            <span className="sr-only">Open main menu</span>
                            {mobileMenuOpen ? (
                                <X className="h-6 w-6" aria-hidden="true" />
                            ) : (
                                <Menu className="h-6 w-6" aria-hidden="true" />
                            )}
                        </button>
                    </div>
                    <div className="hidden lg:flex lg:gap-x-12">
                        {navigation.map((item) => (
                            <Link
                                key={item.name}
                                href={item.href}
                                className="text-sm font-semibold leading-6 text-gray-900 override-nav:text-sunrise-orange hover:text-sunrise-orange transition-colors"
                            >
                                {item.name}
                            </Link>
                        ))}
                    </div>
                    <div className="hidden lg:flex lg:flex-1 lg:justify-end">
                        <Link href="/donate">
                            <Button>Donate Now</Button>
                        </Link>
                    </div>
                </div>
            </Container>

            {/* Mobile menu */}
            <div
                className={cn(
                    "lg:hidden fixed inset-x-0 top-16 z-50 bg-white border-b shadow-lg transition-all duration-300 ease-in-out",
                    mobileMenuOpen ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-full pointer-events-none"
                )}
            >
                <Container className="py-6">
                    <div className="space-y-4">
                        {navigation.map((item) => (
                            <Link
                                key={item.name}
                                href={item.href}
                                className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                                onClick={() => setMobileMenuOpen(false)}
                            >
                                {item.name}
                            </Link>
                        ))}
                        <div className="py-4">
                            <Link href="/donate" onClick={() => setMobileMenuOpen(false)}>
                                <Button className="w-full">Donate Now</Button>
                            </Link>
                        </div>
                    </div>
                </Container>
            </div>
        </header>
    );
}
