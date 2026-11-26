import type { Metadata } from "next";
import { Inter, Noto_Sans_Bengali, Playfair_Display } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { cn } from "@/lib/utils";
import { siteUrl } from "@/lib/site";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const bengali = Noto_Sans_Bengali({ subsets: ["bengali"], variable: "--font-bengali" });
const playfair = Playfair_Display({ subsets: ["latin"], variable: "--font-playfair", weight: ["600", "700", "800"] });

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Probhat Foundation | Where Deen and Dunya Grow Together",
    template: "%s | Probhat Foundation",
  },
  description:
    "Probhat Foundation is building a self-sustaining Islamic community model in Bangladesh through education, healthcare and community development.",
  keywords: ["Probhat Foundation", "Bangladesh", "Islamic education", "Hifdh", "Zakat", "community development"],
  authors: [{ name: "Probhat Foundation" }],
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "/",
    siteName: "Probhat Foundation",
    title: "Probhat Foundation | Where Deen and Dunya Grow Together",
    description: "Building a structured, self-sustaining Islamic community model in Bangladesh.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Probhat Foundation",
    description: "Building a structured, self-sustaining Islamic community model in Bangladesh.",
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={cn(inter.variable, bengali.variable, playfair.variable, "font-sans antialiased min-h-screen flex flex-col leading-relaxed")}>
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60] focus:rounded-full focus:bg-brand-amber focus:px-5 focus:py-3 focus:text-sm focus:font-semibold focus:text-brand-forest"
        >
          Skip to content
        </a>
        <Header />
        <main id="main" className="flex-grow">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
