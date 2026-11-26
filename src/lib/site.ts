import site from "../../content/site.json";

// Site-wide facts live in content/site.json so they can be edited without touching code.
// Leave a value as "" to hide it (e.g. phone, or a social network the foundation isn't on yet).
export const siteConfig = site;

export const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://probhatfoundation.org";

export const socialLinks = [
    { name: "Facebook", href: site.socials.facebook },
    { name: "Instagram", href: site.socials.instagram },
    { name: "LinkedIn", href: site.socials.linkedin },
].filter((s) => s.href);
