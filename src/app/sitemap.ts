import { MetadataRoute } from 'next';
import { getAllPosts } from '@/lib/mdx';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://probhatfoundation.org';

    // Static pages
    const routes = [
        '',
        '/about',
        '/programs',
        '/donate',
        '/contact',
    ].map((route) => ({
        url: `${baseUrl}${route}`,
        lastModified: new Date(),
        changeFrequency: 'monthly' as const,
        priority: route === '' ? 1 : 0.8,
    }));

    // Dynamic pages (Programs)
    const programs = await getAllPosts('programs');
    const programRoutes = programs.map((program: any) => ({
        url: `${baseUrl}/programs/${program.slug}`,
        lastModified: new Date(),
        changeFrequency: 'weekly' as const,
        priority: 0.7,
    }));

    // Dynamic pages (Updates)
    const updates = await getAllPosts('updates');
    const updateRoutes = updates.map((update: any) => ({
        url: `${baseUrl}/updates/${update.slug}`,
        lastModified: new Date(update.date),
        changeFrequency: 'weekly' as const,
        priority: 0.6,
    }));

    return [...routes, ...programRoutes, ...updateRoutes];
}
