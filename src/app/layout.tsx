import type { Metadata } from "next";
import { Inter, Noto_Sans_Bengali } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { cn } from "@/lib/utils";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const bengali = Noto_Sans_Bengali({
    subsets: ["bengali"],
    variable: "--font-bengali",
});

export const metadata: Metadata = {
    metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'https://probhatfoundation.org'),
    title: {
        default: 'Probhat Foundation | Hope. Support. Progress.',
        template: '%s | Probhat Foundation'
    },
    description: 'Empowering underserved communities in rural Bangladesh through education, healthcare, and community support.',
    keywords: ['nonprofit', 'Bangladesh', 'education', 'healthcare', 'charity', 'foundation'],
    authors: [{ name: 'Probhat Foundation' }],
    openGraph: {
        type: 'website',
        locale: 'en_US',
        url: '/',
        siteName: 'Probhat Foundation',
        title: 'Probhat Foundation | Hope. Support. Progress.',
        description: 'Empowering underserved communities in rural Bangladesh.',
    },
    twitter: {
        card: 'summary_large_image',
        title: 'Probhat Foundation',
        description: 'Empowering underserved communities in rural Bangladesh.',
    }
}

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en" className="scroll-smooth">
            <body className={cn(inter.variable, bengali.variable, "font-sans antialiased min-h-screen flex flex-col")}>
                <Header />
                <main className="flex-grow">{children}</main>
                <Footer />
            </body>
        </html>
    );
}
