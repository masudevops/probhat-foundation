import { MetadataRoute } from 'next';
import { getAllPosts } from '@/lib/mdx';
import { siteUrl } from '@/lib/site';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    const staticRoutes: { path: string; priority: number }[] = [
        { path: '', priority: 1 },
        { path: '/donate', priority: 0.9 },
        { path: '/about', priority: 0.8 },
        { path: '/programs', priority: 0.8 },
        { path: '/pipeline', priority: 0.8 },
        { path: '/get-involved', priority: 0.8 },
        { path: '/updates', priority: 0.7 },
        { path: '/contact', priority: 0.7 },
        { path: '/initiatives', priority: 0.6 },
        { path: '/reports', priority: 0.5 },
    ];

    const routes = staticRoutes.map(({ path, priority }) => ({
        url: `${siteUrl}${path}`,
        lastModified: new Date(),
        changeFrequency: 'monthly' as const,
        priority,
    }));

    const programs = await getAllPosts('programs');
    const programRoutes = programs.map((program) => ({
        url: `${siteUrl}/programs/${program.slug}`,
        lastModified: new Date(),
        changeFrequency: 'monthly' as const,
        priority: 0.7,
    }));

    const updates = await getAllPosts('updates');
    const updateRoutes = updates.map((update) => ({
        url: `${siteUrl}/updates/${update.slug}`,
        lastModified: update.date ? new Date(update.date) : new Date(),
        changeFrequency: 'yearly' as const,
        priority: 0.6,
    }));

    return [...routes, ...programRoutes, ...updateRoutes];
}
