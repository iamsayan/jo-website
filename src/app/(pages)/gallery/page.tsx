import React from "react";
import Image from "next/image";
import MainLayout from "@/components/main-layout";
import Section from "@/components/section";
import schema from "@/utils/schema";
import Gallery from "@/components/gallery";
import { getCollectionData } from "@/utils/fetch";
import { shuffle } from "@/utils/functions";
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
    const imagesData = await getCollectionData('images', {
        filter: { category: { $in: [1, 9] } },
        populate: 1
    })
    let images = imagesData ?? null
    images = images?.toReversed()?.slice(0, 96);

    const uploadedBy = Array.from(new Set(images?.map((item: any) =>
        item?.uploaded_by?.trim()?.split(' ')
            .map((word: string) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
            .join(' ')
    ) || [])).filter((name: any) => name.toLowerCase() !== 'admin panel').filter(Boolean);

    const imgStyle: React.CSSProperties = {
        width: '100%',
        height: '100%',
        objectFit: 'cover',
        pointerEvents: 'none'
    };

    const jsonLd = schema({
        slug: 'gallery',
        title: 'Photo Gallery',
    })

    return (
        <MainLayout title="Photo Gallery" jsonLd={jsonLd}>
            <Section title="View Jagadhatri Puja" description={<>Photo <span className="text-yellow-500">Gallery</span></>}>
                <Gallery elementClassNames="grid grid-cols-2 md:grid-cols-4 xl:grid-cols-6 gap-2 mt-2" speed={500} slideShowAutoplay={true} fullScreen={true}>
                    {shuffle(images as any)?.map((item: any, index: number) => {
                        return (
                            <a data-disable-progress={true} key={index} className="h-52 md:h-72 relative" href={`https://cgrutsav.jagadhatrionline.co.in/images/${item?.year}/${item?.reference_id}/${item?.image_name}`}>
                                <Image
                                    src={`https://cgrutsav.jagadhatrionline.co.in/images/${item?.year}/${item?.reference_id}/${item?.image_name}`}
                                    width={500}
                                    height={300}
                                    style={imgStyle}
                                    priority={false}
                                    loading="lazy"
                                    alt={item?.puja_entry_id?.puja_name}
                                />
                                <div className="absolute bottom-0 left-0 right-0 text-center bg-yellow-500 p-1.5 text-xs">{item?.puja_entry_id?.puja_name}</div>
                            </a>
                        )
                    })}
                </Gallery>
                <div className="flex flex-wrap gap-2 mt-2 justify-center text-justify">
                    <div className="text-sm"><span className="font-bold">Image Contributors:</span> {uploadedBy?.join(', ')}. Thanks to them for sharing their photos.</div>
                </div>
            </Section>
        </MainLayout>
    )
}