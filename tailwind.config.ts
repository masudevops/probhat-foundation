import type { Config } from "tailwindcss";

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
                    gold: "#E9C46A",
                },
                popover: {
                    DEFAULT: "hsl(var(--popover))",
                    foreground: "hsl(var(--popover-foreground))",
                },
                card: {
                    DEFAULT: "hsl(var(--card))",
                    foreground: "hsl(var(--card-foreground))",
                },
                // Custom Brand Colors - Premium Nonprofit Theme
                nonprofit: {
                    blue: "#0B3566", // Deeper navy for headings
                    "blue-light": "#F3F8FC", // Blue-tinted background
                },
                warm: {
                    accent: "#F29B4B", // Softer orange
                },
                // Legacy colors (kept for compatibility)
                sunrise: {
                    orange: "#F29B4B", // Updated to match warm accent
                },
                navy: {
                    deep: "#0B3566", // Updated to match nonprofit blue
                },
                light: {
                    gray: "#F8F9FA",
                    blue: "#F3F8FC", // Blue-tinted background
                },
                text: {
                    dark: "#2B2D42",
                },
            },
            borderRadius: {
                lg: "var(--radius)",
                md: "calc(var(--radius) - 2px)",
                sm: "calc(var(--radius) - 4px)",
            },
            fontFamily: {
                sans: ["var(--font-inter)", "sans-serif"],
                bengali: ["var(--font-bengali)", "sans-serif"],
            },
            backgroundImage: {
                "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
                "gradient-conic":
                    "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
            },
            typography: {
                DEFAULT: {
                    css: {
                        color: '#2B2D42',
                        a: {
                            color: '#F29B4B',
                            '&:hover': {
                                color: '#0B3566',
                            },
                        },
                        h1: {
                            color: '#0B3566',
                        },
                        h2: {
                            color: '#0B3566',
                        },
                        h3: {
                            color: '#0B3566',
                        },
                        strong: {
                            color: '#0B3566',
                        },
                    },
                },
            },
        },
    },
    plugins: [
        require('@tailwindcss/typography'),
    ],
};
export default config;
