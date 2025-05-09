import React from "react";
import MainLayout from "@/components/main-layout";
import Section from "@/components/section";
import Gallery from "@/components/gallery";
import schema from "@/utils/schema";
import Image from "next/image";
import Link from "next/link";
import { getModel } from "@/utils/fetch";
import { metadata as metadataSchema } from "@/app/layout";

interface ImageData {
    year: string;
    reference_id: string;
    image_name: string;
}

export const metadata = {
    title: 'Photo Gallery',
    description: `Browse Jagadhatri Puja photos from Chandannagar, Mankundu, and Bhadreswar—capturing pandals, lighting, idols, and themes from 2016 to ${new Date().getFullYear()}.`,
    openGraph: {
        ...metadataSchema.openGraph,
        url: '/gallery',
    },
    alternates: {
        canonical: '/gallery',
    },
}

export default async function Page() {
    const allImagesData = await getModel('images', {
        filter: { category: { $in: [1, 9] } },
        sort: { _modified: -1 },
        populate: 1
    });
    const allImages = (allImagesData ?? []) as ImageData[];
    
    const availableYears = [...new Set(allImages.map(img => img.year))]
        .sort((a, b) => Number(b) - Number(a));

    const jsonLd = schema({
        path: 'gallery',
        title: 'Photo Gallery',
        type: {
            collection: true
        }
    });

    return (
        <MainLayout title="Photo Gallery" jsonLd={jsonLd}>
            <Section title="View Jagadhatri Puja" description="Photo Gallery">
                <div className="mb-16 text-center">
                    <Gallery 
                        elementClassNames="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 md:gap-3 lg:gap-4"
                        speed={500}
                        slideShowAutoplay={true}
                        fullScreen={true}
                    >
                        {allImages.slice(0, 12).map((image: any, index: number) => (
                            <a 
                                href={`https://assets.jagadhatrionline.co.in/images/${image.year}/${image.reference_id}/${image.image_name}`}
                                data-disable-progress={true}
                                key={index}
                                className="relative aspect-[3/4] overflow-hidden rounded-lg group cursor-pointer"
                                data-sub-html={`<h4>${image?.puja_entry_id?.puja_name}</h4><p>By: ${image?.uploaded_by.trim().split(' ').map((word: string) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()).join(' ')}</p>`}
                            >
                                <Image
                                    src={`https://assets.jagadhatrionline.co.in/images/${image.year}/${image.reference_id}/${image.image_name}`}
                                    width={500}
                                    height={300}
                                    className="object-cover w-full h-full pointer-events-none text-transparent transition-transform duration-500 group-hover:scale-110"
                                    loading="lazy"
                                    priority={false}
                                    quality={80}
                                    placeholder="blur"
                                    blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mP8/wcAAt8B9zvLyE8AAAAASUVORK5CYII="
                                    alt={image?.puja_entry_id?.puja_name}
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                                <div className="absolute inset-0 flex items-end left-0 right-0 text-center bottom-0">
                                    <div className="text-white transform translate-y-full group-hover:translate-y-0 transition-transform duration-300 w-full group-hover:mb-3">
                                        <div className="font-medium mb-2 max-w-50 mx-auto text-xs md:text-sm">{image?.puja_entry_id?.puja_name}</div>
                                        {/* <div className="text-sm text-white/80">Click to expand</div> */}
                                    </div>
                                </div>
                            </a>
                        ))}
                    </Gallery>
                </div>
                <div>
                    <h2 className="text-2xl font-bold mb-6">Browse by Year</h2>
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 md:gap-3 lg:gap-4">
                        {availableYears.map((year: string) => {
                            const yearImages = allImages.filter(img => img.year === year);
                            const randomImage = yearImages[Math.floor(Math.random() * yearImages.length)];
                            
                            return (
                                <Link
                                    key={year}
                                    href={`/gallery/${year}`}
                                    className="relative aspect-[3/4] md:aspect-square overflow-hidden rounded-lg group cursor-pointer"
                                >
                                    <Image
                                        src={`https://assets.jagadhatrionline.co.in/images/${randomImage.year}/${randomImage.reference_id}/${randomImage.image_name}`}
                                        width={500}
                                        height={300}
                                        className="object-cover w-full h-full pointer-events-none text-transparent transition-transform duration-500 group-hover:scale-110"
                                        loading="lazy"
                                        priority={false}
                                        placeholder="blur"
                                        quality={80}
                                        blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mP8/wcAAt8B9zvLyE8AAAAASUVORK5CYII="
                                        alt={`Gallery ${year}`}
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                                    <div className="absolute inset-0 flex items-center justify-center">
                                        <div className="text-center text-white">
                                            <div className="text-3xl font-bold mb-2">{year}</div>
                                            <div className="text-sm opacity-80">{yearImages.length} Photos</div>
                                        </div>
                                    </div>
                                </Link>
                            );
                        })}
                    </div>
                </div>
            </Section>
        </MainLayout>
    )
}