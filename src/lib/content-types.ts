// Shapes of the frontmatter in content/pages/*.mdx. Keep in sync with those files.

export interface Cta {
    label: string;
    href: string;
}

export interface Item {
    title: string;
    description: string;
    icon?: string;
    href?: string;
    cta?: Cta;
}

export interface Hero {
    eyebrow?: string;
    title: string;
    description?: string;
}

export interface VisionStep {
    label: string;
    icon: string;
}

export interface HomeContent {
    hero: Hero & { subtitle: string; primaryCta: Cta; secondaryCta: Cta; highlights: string[] };
    difference: {
        eyebrow: string;
        charity: { title: string; items: string[]; note: string };
        system: { title: string; items: string[]; note: string };
        closing: string;
    };
    pillars: { eyebrow: string; title: string; items: Item[] };
    sadaqah: { quote: string; attribution: string; lines: string[]; cta: Cta };
    updates: { eyebrow: string; title: string; cta: Cta };
    vision: { title: string; description: string; steps: VisionStep[]; cta: Cta };
    trust: { items: string[]; closing: string };
}

export interface AboutContent {
    title: string;
    description: string;
    hero: Hero;
    story: { title: string; paragraphs: string[] };
    pillars: { eyebrow: string; items: Item[]; cta: Cta };
    vision: { title: string; steps: VisionStep[] };
    team: { title: string; paragraphs: string[] };
    values: { eyebrow: string; items: Item[] };
}

export interface ProgramsContent {
    title: string;
    description: string;
    hero: Hero;
    pillars: {
        id: string;
        title: string;
        icon: string;
        description: string;
        featured?: Item & { cta?: Cta };
        items?: Item[];
        focusAreas?: string[];
    }[];
    pipeline: { eyebrow: string; title: string; steps: Item[]; cta: Cta };
    selfSufficiency: { title: string; description: string; items: Item[] };
}

export interface PipelineContent {
    title: string;
    description: string;
    hero: Hero;
    stages: { title: string; detail: string; description: string }[];
    pathway: { title: string; steps: Item[] };
    why: { eyebrow: string; title: string; description: string; cta: Cta };
}

export interface GetInvolvedContent {
    title: string;
    description: string;
    hero: Hero;
    foundingDonor: { eyebrow: string; title: string; paragraphs: string[]; cta: Cta };
    ways: Item[];
    donateCta: { title: string; description: string; cta: Cta };
}

export interface ContactContent {
    title: string;
    description: string;
    hero: Hero;
    details: { eyebrow: string; title: string };
    form: { title: string; subjects: string[] };
}

export interface DonateContent {
    title: string;
    description: string;
    givingOpen: boolean;
    comingSoon: { title: string; text: string };
    paymentMethods: { name: string; detail?: string; url?: string }[];
    funds: { general: { title: string; description: string }; zakat: { title: string; description: string } };
    donationTiers: { amount: number; description: string }[];
    designations: { value: string; label: string }[];
    transparencyPromise: { title: string; items: string[] };
    transparencyNote: string;
}

export interface InitiativesContent {
    title: string;
    description: string;
    hero: Hero;
    timeline: {
        title: string;
        description: string;
        items: { year: string; status: string; title: string; description: string; note?: string }[];
        future: { title: string; description: string };
    };
    documentation: { title: string; description: string; items: Item[] };
}
