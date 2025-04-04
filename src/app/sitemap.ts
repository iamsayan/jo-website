import type { MetadataRoute } from 'next'

import { getModel } from "@/utils/fetch";
import { getUrlSlug } from "@/utils/functions";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    const pujaData = await getModel('pujas', { type: 'tree' });
    const data = pujaData ?? null

    const sitemaps: MetadataRoute.Sitemap = [
        {
            url: process.env.NEXT_PUBLIC_SITE_URL!,
            lastModified: new Date(),
            changeFrequency: 'monthly',
            priority: 1,
        },
        {
            url: `${process.env.NEXT_PUBLIC_SITE_URL}/puja-history`,
            lastModified: new Date(),
            changeFrequency: 'monthly',
            priority: 0.8,
        },
        {
            url: `${process.env.NEXT_PUBLIC_SITE_URL}/gallery`,
            lastModified: new Date(),
            changeFrequency: 'monthly',
            priority: 0.8,
        },
        {
            url: `${process.env.NEXT_PUBLIC_SITE_URL}/puja-committee-list`,
            lastModified: new Date(),
            changeFrequency: 'monthly',
            priority: 0.9,
        },
        {
            url: `${process.env.NEXT_PUBLIC_SITE_URL}/terms`,
            lastModified: new Date(),
            changeFrequency: 'monthly',
            priority: 0.2,
        },
        {
            url: `${process.env.NEXT_PUBLIC_SITE_URL}/privacy-policy`,
            lastModified: new Date(),
            changeFrequency: 'monthly',
            priority: 0.2,
        },
        {
            url: `${process.env.NEXT_PUBLIC_SITE_URL}/about-us`,
            lastModified: new Date(),
            changeFrequency: 'monthly',
            priority: 0.5,
        },
        {
            url: `${process.env.NEXT_PUBLIC_SITE_URL}/contact-us`,
            lastModified: new Date(),
            changeFrequency: 'monthly',
            priority: 0.5,
        },
        {
            url: `${process.env.NEXT_PUBLIC_SITE_URL}/achievements`,
            lastModified: new Date(),
            changeFrequency: 'monthly',
            priority: 0.6,
        },
    ]

    const galleryYears = Array.from({length: 2}, (_, i) => i + 2023);
    galleryYears.forEach((year: number, index: number) => {
        sitemaps.push({
            url: `${process.env.NEXT_PUBLIC_SITE_URL}/gallery/${year}`,
            lastModified: new Date(),
            changeFrequency: 'monthly',
            priority: galleryYears.length - index > 1 ? 0.8 : 0.9,
        });
    });

    const currentYear = new Date().getFullYear();
    const pujaYears = Array.from({length: currentYear - 1998}, (_, i) => i + 2000);
    pujaYears.forEach((year: number) => {
        sitemaps.push({
            url: `${process.env.NEXT_PUBLIC_SITE_URL}/jagadhatri-puja/${year}`,
            lastModified: new Date(),
            changeFrequency: 'monthly',
            priority: year === currentYear ? 0.9 : 0.8,
        });
    });

    data.forEach((element: any) => {
        sitemaps.push({
            url: `${process.env.NEXT_PUBLIC_SITE_URL}/puja/${getUrlSlug(element?.puja_name)}/${element?.reference_id}`,
            lastModified: new Date(),
            changeFrequency: 'monthly',
            priority: 0.7,
        });
    });

    return sitemaps
}