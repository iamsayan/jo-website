import MainLayout from "@/components/main-layout";
import Section from "@/components/section";
import schema from "@/utils/schema";
import GalleryPaginate from "@/components/gallery-paginate";
import { getModel } from "@/utils/fetch";
import { metadata as metadataSchema } from "@/app/layout";
import { notFound } from "next/navigation";
import type { Metadata } from 'next'

interface PageProps {
    params: Promise<{
        year: string;
    }>;
    searchParams: Promise<{
        page: string | number;
    }>;
}

const itemsPerPage = 48;

export async function generateMetadata({ params, searchParams }: PageProps): Promise<Metadata> {
    const { year } = await params
    const { page } = await searchParams

    const imagesData = await getModel('images', {
        filter: {
            category: { $in: [1, 9] },
            year: year
        },
        sort: { _modified: -1 },
        populate: 1,
        limit: itemsPerPage,
        skip: (Number(page ?? 1) - 1) * itemsPerPage
    })
    let images = imagesData ?? []

    if (images?.data?.length < 1) {
        notFound()
    }

    const pageCount = Math.ceil(images.meta.total / itemsPerPage);
    const currentPage = Number(page ?? 1)

    return {
        title: `Photo Gallery of ${year}`,
        description: `Photo Gallery of ${year}`,
        openGraph: {
            ...metadataSchema.openGraph,
            url: `/gallery/${year}?page=${currentPage}`,
            images: images?.data?.slice(0, 3)?.map((item: any) => {
                return {
                    url: `https://cgrutsav.jagadhatrionline.co.in/images/${item?.year}/${item?.reference_id}/${item?.image_name}`,
                    alt: item?.puja_entry_id?.puja_name
                }
            })
        },
        alternates: {
            canonical: `/gallery/${year}?page=${currentPage}`,
        },
        pagination: {
            previous: currentPage > 1 ? `/gallery/${year}?page=${currentPage - 1}` : undefined,
            next: currentPage < pageCount ? `/gallery/${year}?page=${currentPage + 1}` : undefined
        }
    }
}

export default async function Page({ params, searchParams }: PageProps) {
    const { year } = await params
    const { page } = await searchParams
    const imagesData = await getModel('images', {
        filter: {
            category: { $in: [1, 9] },
            year: year
        },
        sort: { _modified: -1 },
        populate: 1,
        limit: itemsPerPage,
        skip: (Number(page ?? 1) - 1) * itemsPerPage
    })
    let images = imagesData ?? []

    const jsonLd = schema({
        path: `gallery/${year}`,
        title: `Photo Gallery of ${year}`,
        parents: [
            {
                title: 'Photo Gallery',
                slug: 'gallery'
            }
        ]
    })

    return (
        <MainLayout title={`Photo Gallery ${year}`} jsonLd={jsonLd}>
            <Section title="View Jagadhatri Puja" description={`Photo Gallery ${year}`}>
                <GalleryPaginate images={images} itemsPerPage={itemsPerPage} />
            </Section>
        </MainLayout>
    )
}