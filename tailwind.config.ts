import type { Config } from "tailwindcss";
import typography from "@tailwindcss/typography";

// Brand palette ("Dawn over the forest"): deep greens, warm cream and gold.
// Use these tokens (e.g. `bg-brand-forest`, `text-brand-amber`) instead of hex values.
const brand = {
    forest: "#0E2318", // darkest green: heroes, header, footer
    pine: "#14532D", // primary green: headings on light, icon tiles
    line: "#1E3D28", // dark green for borders/dividers on dark sections
    ink: "#10220D", // body text on light backgrounds
    sage: "#4A5E50", // secondary text on light backgrounds
    ivory: "#F5F0E8", // text on dark backgrounds, soft panels
    cream: "#FEFAF2", // page background
    sand: "#EDE4D3", // borders on light backgrounds
    gold: "#C9922A", // hover/darker accent
    amber: "#E8A830", // primary accent and CTAs
};

const config: Config = {
    content: [
        "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
        "./content/**/*.{md,mdx}",
    ],
    theme: {
        container: {
            center: true,
            padding: "2rem",
            screens: {
                "2xl": "1400px",
            },
        },
        extend: {
            colors: {
                brand,
                border: "hsl(var(--border))",
                input: "hsl(var(--input))",
                ring: "hsl(var(--ring))",
                background: "hsl(var(--background))",
                foreground: "hsl(var(--foreground))",
                primary: {
                    DEFAULT: "hsl(var(--primary))",
                    foreground: "hsl(var(--primary-foreground))",
                },
                secondary: {
                    DEFAULT: "hsl(var(--secondary))",
                    foreground: "hsl(var(--secondary-foreground))",
                },
                destructive: {
                    DEFAULT: "hsl(var(--destructive))",
                    foreground: "hsl(var(--destructive-foreground))",
                },
                muted: {
                    DEFAULT: "hsl(var(--muted))",
                    foreground: "hsl(var(--muted-foreground))",
                },
                accent: {
                    DEFAULT: "hsl(var(--accent))",
                    foreground: "hsl(var(--accent-foreground))",
                },
                popover: {
                    DEFAULT: "hsl(var(--popover))",
                    foreground: "hsl(var(--popover-foreground))",
                },
                card: {
                    DEFAULT: "hsl(var(--card))",
                    foreground: "hsl(var(--card-foreground))",
                },
            },
            borderRadius: {
                lg: "var(--radius)",
                md: "calc(var(--radius) - 2px)",
                sm: "calc(var(--radius) - 4px)",
            },
            fontFamily: {
                sans: ["var(--font-inter)", "system-ui", "sans-serif"],
                display: ["var(--font-playfair)", "Georgia", "serif"],
                bengali: ["var(--font-bengali)", "sans-serif"],
            },
            typography: {
                DEFAULT: {
                    css: {
                        color: brand.sage,
                        a: {
                            color: brand.pine,
                            textDecorationColor: brand.amber,
                            "&:hover": { color: brand.gold },
                        },
                        "h1, h2, h3, h4": {
                            color: brand.forest,
                            fontFamily: "var(--font-playfair), Georgia, serif",
                            fontWeight: "600",
                        },
                        strong: { color: brand.forest },
                        "ul > li::marker": { color: brand.amber },
                        blockquote: {
                            borderLeftColor: brand.amber,
                            color: brand.forest,
                        },
                    },
                },
            },
        },
    },
    plugins: [typography],
};
export default config;
