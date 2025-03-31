import { notFound, permanentRedirect } from 'next/navigation';
import MainLayout from "@/components/main-layout";
import Section from "@/components/section";
import { getCollectionData, getData } from "@/utils/fetch";
import { getDescription, stripHtmlAndLimit } from "@/utils/functions";
import {
    FaArrowLeft,
    FaArrowRight,
    FaCalendarAlt,
    FaMapMarkerAlt
} from "react-icons/fa";
import {
    getYear,
    getCelebrating,
    formatDate,
    getUrlSlug,
    getDateByIndex
} from "@/utils/functions";
import schema from "@/utils/schema";
import { GoogleMapsEmbed } from "@next/third-parties/google";
import Gallery from "@/components/gallery";
import Link from "next/link";
import Image from 'next/image'
import vrImage from '@/public/vr.jpg'
import { metadata as metadataSchema } from "@/app/layout";

interface PujaData {
    reference_id: string;
    puja_name: string;
    puja_zone: string;
    estd: string;
    location?: {
        address?: string;
        lat?: number;
        lng?: number;
    };
    current_theme?: string;
    idol_artist?: {
        display?: string;
    };
    decoration_artist?: {
        display?: string;
    };
    puja_info?: string;
}

interface PageProps {
    params: Promise<{
        slug: string;
        id: string;
    }>;
    searchParams: Promise<{
        year?: number;
    }>;
}

export const dynamicParams = false

export async function generateStaticParams() {
    const pujasData = await getCollectionData('pujas', {
        sort: { estd: 1 }
    });
    const data = pujasData ?? []

    return data.map((item: any) => {
        return {
            slug: getUrlSlug(item?.puja_name),
            id: item?.reference_id
        }
    })
}

export async function generateMetadata({ params }: PageProps) {
    const { slug, id } = await params
    const dataRes = await getData({
        populate: 1,
        models: {
            pujas: {},
            images: {
                filter: { reference_id: id },
                populate: 1
            },
            pujadescriptions: {}
        }
    });
    const { pujas, images, pujadescriptions } = dataRes ?? {};

    const currentPuja = pujas?.find((data: any) => data?.reference_id === id);
    const description = getDescription(currentPuja, pujadescriptions, pujas?.length)

    return {
        title: `${currentPuja?.puja_name} Sarbajanin, ${currentPuja?.puja_zone === 'bhr' ? 'Bhadreswar' : 'Chandannagar'}`,
        description: stripHtmlAndLimit(description),
        openGraph: {
            ...metadataSchema.openGraph,
            url: `/puja/${slug}/${id}`,
            images: images?.map((item: any) => {
                return {
                    url: `https://cgrutsav.jagadhatrionline.co.in/images/${item?.year}/${item?.reference_id}/${item?.image_name}`,
                    alt: item?.puja_entry_id?.puja_name
                }
            })
        },
        alternates: {
            canonical: `/puja/${slug}/${id}`,
        },
    }
}

export default async function Page({ params, searchParams }: PageProps) {
    const { slug, id } = await params
    const { year } = await searchParams
    const queryYear = year ?? new Date().getFullYear()

    const dataRes = await getData({
        populate: 1,
        models: {
            information: {},
            pujas: {
                sort: { puja_name: 1 }
            },
            images: {
                filter: { reference_id: id },
                populate: 1
            },
            pujadescriptions: {}
        }
    });
    const { information, pujas, images, pujadescriptions } = dataRes ?? {};

    const displayDate = getDateByIndex(information, 0);
    const dateIsCurrent = Number(queryYear) === displayDate.getFullYear();
    const currentPuja = pujas?.find((data: any) => data?.reference_id === id);

    let array: PujaData[] = [];
    pujas?.forEach((item: PujaData, index: number) => {
        if (item?.reference_id === id) {
            array.push(pujas?.[0 < index ? index - 1 : pujas?.length - 1])
            array.push(pujas?.[pujas?.length - 1 > index ? index + 1 : 0])
        }
    });

    if (!currentPuja || currentPuja?.length < 1) {
        notFound()
    }

    const pujaName = currentPuja?.puja_name;
    if (slug !== getUrlSlug(pujaName)) {
        permanentRedirect(`/puja/${getUrlSlug(pujaName)}/${currentPuja?.reference_id}`);
    }

    const y = getYear(currentPuja?.estd, queryYear);
    const cel = getCelebrating(y);

    const jsonLd = schema({
        slug: `puja/${getUrlSlug(pujaName)}/${currentPuja?.reference_id}`,
        title: `Details of ${pujaName} Sarbajanin`,
    })

    const imgStyle: React.CSSProperties = {
        width: '100%',
        height: '100%',
        objectFit: 'cover',
        pointerEvents: 'none'
    };
    
    const description = getDescription(currentPuja, pujadescriptions, pujas?.length)

    return (
        <MainLayout title={pujaName} jsonLd={jsonLd} breadcrumbTitle={pujaName} end={-1}>
            <Section>
                <div className="grid grid-cols-1 md:grid-cols-6 gap-6 mb-6">
                    <div className="md:col-span-4 text-justify flex flex-col gap-4">
                        <div className="flex flex-col gap-2 md:gap-3">
                            <h2 className="text-2xl md:text-[28px] font-bold flex items-center gap-2 text-blue-900">{pujaName}</h2>
                            {currentPuja?.location?.address && <h2 className="text-sm flex items-center gap-2">
                                <FaMapMarkerAlt />
                                <div className="text-ellipsis overflow-hidden whitespace-nowrap">{currentPuja?.location?.address}</div>
                            </h2>}
                        </div>
                        <hr className="border-neutral-200" />
                        <div className="flex flex-col gap-3">
                            {description && <div className="text-justify space-y-2" dangerouslySetInnerHTML={{ __html: description }} />}
                            {currentPuja?.puja_info && <p className="text-justify space-y-2" dangerouslySetInnerHTML={{ __html: currentPuja.puja_info }} />}
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-1 xl:grid-cols-3 gap-4 text-sm">
                            <div className="border rounded-md border-neutral-200 px-6 py-4">Year of Establishment: <span
                                className="font-bold">{currentPuja?.estd != 0 ? currentPuja?.estd : 'Not Known'}</span>
                            </div>
                            {cel != 'Adi Puja' &&
                                <div className="border rounded-md border-neutral-200 px-6 py-4">Celebrating: <span
                                    className="font-bold">{y} Years {cel !== '--' && <>({cel})</>}</span></div>}
                            <div className="border rounded-md border-neutral-200 px-6 py-4">Police Station: <span
                                className="font-bold">{currentPuja?.puja_zone === 'bhr' ? 'Bhadreswar' : 'Chandannagar'}</span>
                            </div>
                            {currentPuja?.current_theme &&
                                <div className="border rounded-md border-neutral-200 px-6 py-4">
                                    Theme: <span className="font-bold">{currentPuja.current_theme}</span></div>}
                            {currentPuja?.idol_artist?.artist_name &&
                                <div className="border rounded-md border-neutral-200 px-6 py-4">
                                    Idol Artist:  <span className="font-bold">{currentPuja.idol_artist.artist_name}</span>
                                </div>}
                            {currentPuja?.decoration_artist?.artist_name &&
                                <div className="border rounded-md border-neutral-200 px-6 py-4">
                                    Decoration Artist: <span className="font-bold">{currentPuja.decoration_artist.artist_name}</span>
                                </div>}
                        </div>
                        {images?.length > 0 &&
                            <Gallery elementClassNames={`grid ${images?.length > 4 ? 'grid-cols-3 xl:grid-cols-6' : 'grid-cols-2 xl:grid-cols-4'} gap-2 mt-2`} speed={500} slideShowAutoplay={true} fullScreen={true} getCaptionFromTitleOrAlt={false}>
                                {images?.map((item: any, index: number) => {
                                    return (
                                        <a data-disable-progress={true} key={index} className={`${images?.length > 4 ? 'h-40 md:h-52' : 'h-52 md:h-72'}`}
                                            href={`https://cgrutsav.jagadhatrionline.co.in/images/${item?.year}/${item?.reference_id}/${item?.image_name}`}>
                                            <Image
                                                src={`https://cgrutsav.jagadhatrionline.co.in/images/${item?.year}/${item?.reference_id}/${item?.image_name}`}
                                                width={500}
                                                height={300}
                                                style={imgStyle}
                                                priority={false}
                                                loading="lazy"
                                                alt={item?.puja_entry_id?.puja_name}
                                            />
                                        </a>
                                    )
                                })}
                            </Gallery>
                        }
                        <hr className="border-neutral-200" />
                        <div className="flex flex-col sm:flex-row gap-3 justify-between text-sm">
                            <div className="border rounded-md border-neutral-200">
                                <Link
                                    rel="prev"
                                    className="bg-gray-50 hover:bg-gray-100 rounded-md px-4 py-3 block text-ellipsis overflow-hidden whitespace-nowrap"
                                    href={`/puja/${getUrlSlug(array?.[0]?.puja_name)}/${array?.[0]?.reference_id}`}>
                                    <FaArrowLeft className="inline-block mr-2 -mt-1" />
                                    {array?.[0]?.puja_name}
                                </Link>
                            </div>
                            <div className="border rounded-md border-neutral-200 text-right">
                                <Link
                                    rel="next"
                                    className="bg-gray-50 hover:bg-gray-100 rounded-md px-4 py-3 block text-ellipsis overflow-hidden whitespace-nowrap"
                                    href={`/puja/${getUrlSlug(array?.[1]?.puja_name)}/${array?.[1]?.reference_id}`}>
                                    {array?.[1]?.puja_name}<FaArrowRight className="inline-block ml-2 -mt-1" />
                                </Link>
                            </div>
                        </div>
                    </div>
                    <div className="md:col-span-2">
                        <div className="sticky top-6">
                            <div className="p-4 md:p-6 bg-gray-100 flex flex-col gap-7">
                                {dateIsCurrent && <div className="flex flex-col gap-2">
                                    <h1 className="text-xl font-bold uppercasse text-blue-700">Puja Schedule</h1>
                                    <hr className="border-neutral-200" />
                                    <div className="flex flex-col gap-1 text-sm">
                                        {information?.dates?.slice(-5)?.map((item: any, index: number) => {
                                            return (
                                                <div key={index} className="flex">
                                                    <div className="flex items-center justify-center gap-2">
                                                        <FaCalendarAlt /> {item?.event}: {formatDate(item?.date)}
                                                    </div>
                                                </div>
                                            )
                                        })}
                                    </div>
                                </div>}
                                {currentPuja?.location?.address && <div className="flex flex-col gap-2">
                                    <h1 className="text-xl font-bold uppercadse text-blue-700"><a
                                        href={`https://www.google.com/maps/search/?api=1&query=${currentPuja?.location?.lat},${currentPuja?.location?.lng}`}
                                        target="_blank">Locate on Google Map</a></h1>
                                    <hr className="border-neutral-200" />
                                    <GoogleMapsEmbed
                                        apiKey={process.env.GOOGLE_MAP_API_KEY!}
                                        height={300}
                                        width="100%"
                                        mode="place"
                                        zoom="16"
                                        q={`${currentPuja?.location?.lat},${currentPuja?.location?.lng}`}
                                    />
                                    <div className="text-xs text-gray-600 mt-2">
                                        Notice an error in the location? Please <Link href="/contact-us" className="text-blue-600 hover:text-blue-800 underline">let us know</Link>
                                    </div>
                                </div>}
                            </div>
                            <a href="https://vr.jagadhatrionline.co.in/" target="_blank">
                                <Image
                                    src={vrImage}
                                    alt="Virtual Puja"
                                    className="mt-4"
                                />
                            </a>
                        </div>
                    </div>
                </div>
            </Section>
        </MainLayout>
    )
}