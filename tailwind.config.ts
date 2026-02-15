import type { Config } from "tailwindcss";

const config: Config = {
    content: [
        "./app/**/*.{js,ts,jsx,tsx,mdx}",
        "./components/**/*.{js,ts,jsx,tsx,mdx}",
        "./content/**/*.{md,mdx}",
    ],
    theme: {
        extend: {
            colors: {
                sunrise: {
                    orange: "#F4A261", // Primary CTA, accents
                },
                navy: {
                    deep: "#1D3557", // Headers, text, footer background
                },
                accent: {
                    gold: "#E9C46A", // Optional highlights
                },
                light: {
                    gray: "#F8F9FA", // Alternate sections
                },
                text: {
                    dark: "#2B2D42", // Body text
                },
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
                            color: '#F4A261',
                            '&:hover': {
                                color: '#1D3557',
                            },
                        },
                        h1: {
                            color: '#1D3557',
                        },
                        h2: {
                            color: '#1D3557',
                        },
                        h3: {
                            color: '#1D3557',
                        },
                        strong: {
                            color: '#1D3557',
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
