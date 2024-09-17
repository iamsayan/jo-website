import React from "react";
import Image from "next/image";
import MainLayout from "@/components/main-layout";
import Section from "@/components/section";
import schema from "@/utils/schema";
import Gallery from "@/components/gallery";
import { getCollectionData } from "@/utils/fetch";

export const metadata = {
    title: 'Photo Gallery',
    description: 'Jagadhatri Online is your online destination to visit the collection of most popular Jagadhatri Pujas of Chanannagar, Mankundu &amp; Bhadreswar. It is a platform on internet where we display the Location, Photos &amp; Videos of various Jagadhatri Pujas of Chandannagar.',
    openGraph: {
        url: '/gallery',
    },
    alternates: {
        canonical: '/gallery',
    },
}

export default async function Page() {
    const imagesData = await getCollectionData('images?populate=1')
    let images = imagesData ?? null
    images = images?.filter((data: any) => [1,9].includes(parseInt(data?.category)));
    
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
            <Section title="View Jagadhatri Puja" description={ <>Photo <span className="text-yellow-500">Gallery</span></> }>
                <Gallery elementClassNames="grid grid-cols-2 md:grid-cols-4 xl:grid-cols-6 gap-2 mt-2" speed={500} slideShowAutoplay={true} fullScreen={true}>
                    {images?.reverse()?.slice(0, 96)?.map((item: any, index: number) => {
                        return (
                            <a data-disable-nprogress={true} key={index} className="h-52 md:h-72 relative" href={`https://cgrutsav.jagadhatrionline.co.in/images/${item?.year}/${item?.reference_id}/${item?.image_name}`}>
                                <Image
                                    src={`https://cgrutsav.jagadhatrionline.co.in/images/${item?.year}/${item?.reference_id}/${item?.image_name}`}
                                    width={500}
                                    height={300}
                                    style={imgStyle}
                                    priority={false}
                                    loading="lazy"
                                    alt={item?.puja_entry_id?.puja_name}
                                />
                                <div className="absolute bottom-0 left-0 right-0 text-center bg-yellow-500 p-1.5 text-sm">{item?.puja_entry_id?.puja_name}</div>
                            </a>
                        )
                    })}
                </Gallery>
            </Section>
        </MainLayout>
    )
}