import type { MetadataRoute } from 'next'

import { getCollectionData } from "@/utils/fetch";
import { getUrlSlug } from "@/utils/functions";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    const pujaData = await getCollectionData('pujas');
    const data = pujaData ?? null

    const sitemaps: MetadataRoute.Sitemap = [
        {
            url: 'https://www.jagadhatrionline.co.in',
            lastModified: new Date(),
            changeFrequency: 'monthly',
            priority: 1,
        },
        {
            url: 'https://www.jagadhatrionline.co.in/puja-history',
            lastModified: new Date(),
            changeFrequency: 'monthly',
            priority: 0.8,
        },
        {
            url: 'https://www.jagadhatrionline.co.in/gallery',
            lastModified: new Date(),
            changeFrequency: 'monthly',
            priority: 0.8,
        },
        {
            url: 'https://www.jagadhatrionline.co.in/puja-committee-list',
            lastModified: new Date(),
            changeFrequency: 'monthly',
            priority: 0.9,
        },
        {
            url: 'https://www.jagadhatrionline.co.in/terms',
            lastModified: new Date(),
            changeFrequency: 'monthly',
            priority: 0.2,
        },
        {
            url: 'https://www.jagadhatrionline.co.in/privacy-policy',
            lastModified: new Date(),
            changeFrequency: 'monthly',
            priority: 0.2,
        },
        {
            url: 'https://www.jagadhatrionline.co.in/about-us',
            lastModified: new Date(),
            changeFrequency: 'monthly',
            priority: 0.5,
        },
        {
            url: 'https://www.jagadhatrionline.co.in/contact-us',
            lastModified: new Date(),
            changeFrequency: 'monthly',
            priority: 0.5,
        },
        {
            url: 'https://www.jagadhatrionline.co.in/achievements',
            lastModified: new Date(),
            changeFrequency: 'monthly',
            priority: 0.6,
        },
    ]

    for (let year = 2000; year <= new Date().getFullYear() + 2; year++) {
        sitemaps.push({
            url: `https://www.jagadhatrionline.co.in/jagadhatri-puja/${year}`,
            lastModified: new Date(),
            changeFrequency: 'monthly',
            priority: 0.8,
        });
    }

    data.forEach((element: any) => {
        sitemaps.push({
            url: `https://www.jagadhatrionline.co.in/puja/${getUrlSlug(element?.puja_name)}/${element?.reference_id}`,
            lastModified: new Date(),
            changeFrequency: 'monthly',
            priority: 0.7,
        });
    });

    return sitemaps
}