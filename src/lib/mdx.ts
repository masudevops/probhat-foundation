import fs from "fs";
import path from "path";
import { cache, type ReactElement } from "react";
import { compileMDX } from "next-mdx-remote/rsc";

const rootDirectory = path.join(process.cwd(), "content");

export interface PostMeta {
    slug: string;
    title: string;
    subtitle?: string;
    date?: string;
    author?: string;
    summary?: string;
    description?: string;
    image?: string;
    coverImage?: string;
    tags?: string[];
    order?: number;
    featured?: boolean;
    icon?: string;
    pillar?: string;
    status?: string;
    location?: string;
}

async function compile<T>(directory: string, slug: string) {
    const realSlug = slug.replace(/\.mdx$/, "");
    const filePath = path.join(rootDirectory, directory, `${realSlug}.mdx`);
    const fileContent = fs.readFileSync(filePath, "utf8");

    const { frontmatter, content } = await compileMDX<T>({
        source: fileContent,
        options: { parseFrontmatter: true },
    });

    return { slug: realSlug, frontmatter, content };
}

export const getPostBySlug = cache(async (slug: string, directory: string): Promise<{ meta: PostMeta; content: ReactElement }> => {
    const { slug: realSlug, frontmatter, content } = await compile<Omit<PostMeta, "slug">>(directory, slug);
    return { meta: { ...frontmatter, slug: realSlug }, content };
});

/** All posts in a content folder, sorted by `order`, then newest `date` first. Drafts are skipped. */
export const getAllPosts = cache(async (directory: string): Promise<PostMeta[]> => {
    const files = fs.readdirSync(path.join(rootDirectory, directory)).filter((f) => f.endsWith(".mdx"));
    const posts = await Promise.all(files.map(async (file) => (await getPostBySlug(file, directory)).meta));

    return posts
        .filter((post) => post.status?.toLowerCase() !== "draft")
        .sort((a, b) => {
            if (typeof a.order === "number" && typeof b.order === "number") return a.order - b.order;
            if (a.date && b.date) return new Date(b.date).getTime() - new Date(a.date).getTime();
            return 0;
        });
});

/** Structured page copy from content/pages/<page>.mdx frontmatter. */
export const getPageContent = cache(async <T extends object>(page: string): Promise<{ meta: T; content: ReactElement }> => {
    const { frontmatter, content } = await compile<T>("pages", page);
    return { meta: frontmatter, content };
}) as <T extends object>(page: string) => Promise<{ meta: T; content: ReactElement }>;

/** True if a file exists under /public (used to skip missing cover images). */
export function publicFileExists(src?: string): src is string {
    if (!src || !src.startsWith("/")) return false;
    return fs.existsSync(path.join(process.cwd(), "public", src));
}
