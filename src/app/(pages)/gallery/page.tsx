import React from "react";
import MainLayout from "@/components/main-layout";
import Section from "@/components/section";
import schema from "@/utils/schema";
import GalleryFilter from "@/components/gallery-filter";
import { getModel } from "@/utils/fetch";
import arrayShuffle from "array-shuffle";
import { metadata as metadataSchema } from "@/app/layout";

export const metadata = {
    title: 'Photo Gallery',
    description: 'Jagadhatri Online is your online destination to visit the collection of most popular Jagadhatri Pujas of Chanannagar, Mankundu &amp; Bhadreswar. It is a platform on internet where we display the Location, Photos &amp; Videos of various Jagadhatri Pujas of Chandannagar.',
    openGraph: {
        ...metadataSchema.openGraph,
        url: '/gallery',
    },
    alternates: {
        canonical: '/gallery',
    },
}

export default async function Page() {
    const imagesData = await getModel('images', {
        filter: { category: { $in: [1, 9] } },
        populate: 1
    })
    let images = imagesData ?? []

    const jsonLd = schema({
        slug: 'gallery',
        title: 'Photo Gallery',
    })

    return (
        <MainLayout title="Photo Gallery" jsonLd={jsonLd}>
            <Section title="View Jagadhatri Puja" description={<>Photo <span className="text-yellow-500">Gallery</span></>}>
                <GalleryFilter images={arrayShuffle(images as any)} />
            </Section>
        </MainLayout>
    )
}