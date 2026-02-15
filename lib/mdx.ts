import fs from "fs";
import path from "path";
import { compileMDX } from "next-mdx-remote/rsc";

const rootDirectory = path.join(process.cwd(), "content");

export const getPostBySlug = async (slug: string, directory: string) => {
    const realSlug = slug.replace(/\.mdx$/, "");
    const filePath = path.join(rootDirectory, directory, `${realSlug}.mdx`);

    const fileContent = fs.readFileSync(filePath, "utf8");

    const { frontmatter, content } = await compileMDX<{
        title: string;
        subtitle?: string;
        date?: string;
        author?: string;
        summary?: string;
        image?: string;
        tags?: string[];
        layout?: string;
        order?: number;
        featured?: boolean;
        icon?: string;
    }>({
        source: fileContent,
        options: { parseFrontmatter: true },
    });

    return { meta: { ...frontmatter, slug: realSlug }, content };
};

export const getAllPosts = async (directory: string) => {
    const files = fs.readdirSync(path.join(rootDirectory, directory));

    let posts = [];

    for (const file of files) {
        const { meta } = await getPostBySlug(file, directory);
        posts.push(meta);
    }

    return posts.sort((a, b) => {
        // Sort by order if available
        if (typeof a.order === 'number' && typeof b.order === 'number') {
            return a.order - b.order;
        }
        // Otherwise sort by date if available
        if (a.date && b.date) {
            return new Date(b.date).getTime() - new Date(a.date).getTime();
        }
        return 0;
    });
};

export const getPageContent = async (page: string) => {
    return getPostBySlug(page, "pages");
}
