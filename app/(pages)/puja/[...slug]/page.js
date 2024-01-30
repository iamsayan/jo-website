import { Fragment } from 'react';
import { notFound } from 'next/navigation';
import Layout from "@/app/components/layout";
import Section from "@/app/components/section";
import { getCollectionData, getSingletonData } from "@/app/utils/fetch";
import {
    FaArrowLeft,
    FaArrowRight,
    FaCalendarAlt,
    FaCheckCircle,
    FaMapMarkerAlt
} from "react-icons/fa";
import {
    getYear,
    getCelebrating,
    formatDate,
    getUrlSlug,
    shuffle
} from "@/app/utils/functions";
import schema from "@/app/utils/schema";
import { GoogleMapsEmbed } from "@next/third-parties/google";
import Gallery from "@/app/components/gallery";
import Link from "next/link";
import Image from 'next/image'
import vrImage from '../../../../public/vr.jpg'

export const runtime = 'edge';

export async function generateMetadata({ params }) {
    const pujaData = await getCollectionData('pujas', {
        filter: { _id: params?.slug?.[1] }
    })
    const data = pujaData ?? []

    return {
        title: `${data?.[0]?.puja_name} Sarbajanin`,
        description: `Here are the Puja Updates and Latest Information about ${data?.[0]?.puja_name} Sarbajanin.`,
        openGraph: {
            url: `/puja/${params?.slug?.[0]}/${params?.slug?.[1]}`,
        },
        alternates: {
            canonical: `/puja/${params?.slug?.[0]}/${params?.slug?.[1]}`,
        },
    }
}

export default async function Page({ params }) {
    const slug = params?.slug ?? null
    if ( slug?.length !== 2 ) {
        notFound()
    }

    const pujaId = slug?.[1]
    const siteDataRes = getSingletonData('information');
    const pujasDataRes= getCollectionData('pujas', {
        sort: { 'puja_name': 1 }
    })
    const imagesDataRes= getCollectionData('appimages', {
        filter: { puja_entry_id: pujaId, year: 2023 }
    })

    const [ siteData, pujasData, imagesData ] = await Promise.all([ siteDataRes, pujasDataRes, imagesDataRes ]);

    const data = siteData ?? null
    const pujas = pujasData ?? null
    const images = imagesData ?? null

    const currentPuja = pujas?.filter(data => data?._id === pujaId)?.[0];
    const otherPujas = pujas?.filter(data => data?._id !== pujaId);

    let array = [];
    pujas?.forEach((item, index) => {
        if( item?._id === pujaId ) {
            array.push(pujas?.[0 < index ? index-1 : pujas?.length-1])
            array.push(pujas?.[pujas?.length-1 > index ? index+1 : 0])
        }
    });

    if ( ! currentPuja || currentPuja?.length < 1 ) {
        notFound()
    }

    const pujaName = currentPuja?.puja_name;
    if ( slug?.[0] !== getUrlSlug(pujaName) ) {
        notFound()
    }

    const getPujaName = pujaId => {
        return pujas?.filter(data => data?._id === pujaId)?.[0]?.puja_name;
    }

    const y = getYear(currentPuja?.estd);
    const cel= getCelebrating(y);

    const jsonLd = schema({
        slug: `/puja/${getUrlSlug(currentPuja?.puja_name)}/${currentPuja?._id}`,
        title: `Details of ${currentPuja?.puja_name} Sarbajanin`,
    })

    const imgStyle = {
        width: '100%',
        height: '100%',
        objectFit: 'cover',
        pointerEvents: 'none'
    };
    return (
        <Layout title={pujaName} jsonLd={jsonLd} breadcrumbTitle={pujaName} end={-1}>
            <Section>
                <div className="grid grid-cols-1 md:grid-cols-6 gap-6 mb-6">
                    <div className="md:col-span-4 text-justify flex flex-col gap-4">
                        <div className="flex flex-col gap-3">
                            <h2 className="text-[28px] font-bold flex items-center gap-2 text-blue-900">{pujaName}<FaCheckCircle
                                className="text-xl text-green-700"/></h2>
                            {currentPuja?.location?.address && <h2 className="text-sm flex items-center gap-2">
                                <FaMapMarkerAlt/>
                                <div className="overflow-ellipsis overflow-hidden whitespace-nowrap">{currentPuja?.location?.address}
                                    </div>
                            </h2>}
                        </div>
                        <hr/>
                        <div className="flex flex-col gap-3">
                            <p>Welcome to the webpage dedicated to the vibrant celebration of Jagadhatri Puja
                                by {pujaName} in Chandannagar! As one of the 177 esteemed puja committees in our beloved
                                city, this platform serves as a window into our annual festivities.</p>

                            <p>At {pujaName} Sarbajanin, the commitment to tradition and community shines through in
                                every aspect of the Jagadhatri Puja celebration. Each year, the focus is on creating a
                                divine ambiance that honors the grace and strength of Goddess Jagadhatri while fostering
                                a sense of unity and joy among our residents and visitors.</p>

                            <p>The pandal, a masterpiece of creativity and devotion, stands as a testament to the
                                unwavering faith and dedication of {pujaName} Sarbajanin. Adorned with intricate
                                decorations and illuminated by the soft glow of lights, it serves as a sacred space
                                where devotees gather to offer their prayers and seek the blessings of the Divine
                                Mother.</p>

                            <p>Moreover, {pujaName} Sarbajanin takes great pride in social initiatives aimed at making a
                                positive impact on the lives of community members. Whether it's through charitable
                                endeavors or eco-friendly initiatives, there is a commitment to serving the greater good
                                and spreading joy and compassion to all.</p>

                            <p>As you navigate through this webpage, immerse yourself in the spirit of Jagadhatri Puja
                                and experience the warmth and hospitality that define our celebration. Explore photo
                                galleries, learn about our history and traditions, and stay updated on the latest news
                                and events happening with {pujaName}.</p>

                            {currentPuja?.puja_info && <p>{puja_info}</p>}
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
                                <div className="border rounded-md border-neutral-200 px-6 py-4">Theme: <span
                                    className="font-bold">{currentPuja?.current_theme}</span></div>}
                            {currentPuja?.idol_artist?.display &&
                                <div className="border rounded-md border-neutral-200 px-6 py-4">Idol Artist: <span
                                    className="font-bold">{currentPuja?.idol_artist?.display}</span></div>}
                            {currentPuja?.decoration_artist?.display &&
                                <div className="border rounded-md border-neutral-200 px-6 py-4">Decoration Artist: <span
                                    className="font-bold">{currentPuja?.decoration_artist?.display}</span></div>}
                        </div>
                        {images?.length > 0 &&
                            <Gallery elementClassNames="grid grid-cols-2 xl:grid-cols-4 gap-2 mt-2" speed={500}
                                     slideShowAutoplay={true} fullScreen={true} getCaptionFromTitleOrAlt={false}>
                                {shuffle(images)?.map((item, index) => {
                                    return (
                                        <a key={index} className="h-52 md:h-72"
                                           href={`https://cgrutsav.jagadhatrionline.co.in/images/${item?.year}/${item?.puja_entry_id?._id}/${item?.image_name}`}>
                                            <img
                                                src={`https://cgrutsav.jagadhatrionline.co.in/images/${item?.year}/${item?.puja_entry_id?._id}/${item?.image_name}`}
                                                style={imgStyle}
                                                className="img-responsive"
                                                alt={getPujaName(item?.puja_entry_id?._id)}
                                            />
                                        </a>
                                    )
                                })}
                            </Gallery>
                        }
                        <hr />
                        <div className="flex flex-col sm:flex-row gap-3 justify-between text-sm">
                            <div className="border rounded-md border-neutral-200">
                                <Link
                                    className="px-4 py-3 block overflow-ellipsis overflow-hidden whitespace-nowrap"
                                    href={`/puja/${getUrlSlug(array?.[0]?.puja_name)}/${array?.[0]?._id}`}>
                                    <FaArrowLeft className="inline-block mr-2 -mt-1"/>
                                    {array?.[0]?.puja_name}
                                </Link>
                            </div>
                            <div className="border rounded-md border-neutral-200 text-right">
                                <Link
                                    className="px-4 py-3 block overflow-ellipsis overflow-hidden whitespace-nowrap"
                                    href={`/puja/${getUrlSlug(array?.[1]?.puja_name)}/${array?.[1]?._id}`}>
                                    {array?.[1]?.puja_name}<FaArrowRight className="inline-block ml-2 -mt-1"/>
                                </Link>
                            </div>
                        </div>
                    </div>
                    <div className="md:col-span-2">
                        <div className="sticky top-6">
                            <div className="p-6 bg-gray-100 flex flex-col gap-7">
                                <div className="flex flex-col gap-2">
                                    <h1 className="text-xl font-bold uppercasse text-blue-700">Puja Schedule</h1>
                                    <hr/>
                                    <div className="flex flex-col gap-1 text-sm">
                                        {data?.dates?.slice(-5)?.map((item, index) => {
                                            return (
                                                <div key={index} className="flex">
                                                    <div className="flex items-center justify-center gap-2">
                                                        <FaCalendarAlt/> {item?.value?.event}: {formatDate(item?.value?.date)}
                                                    </div>
                                                </div>
                                            )
                                        })}
                                    </div>
                                </div>
                                {currentPuja?.location?.address && <div className="flex flex-col gap-2">
                                    <h1 className="text-xl font-bold uppercadse text-blue-700"><a
                                        href={`https://www.google.com/maps/search/?api=1&query=${currentPuja?.location?.lat},${currentPuja?.location?.lng}`}
                                        target="_blank">Locate on Google Map</a></h1>
                                    <hr/>
                                    <GoogleMapsEmbed
                                        apiKey={process.env.GOOGLE_MAP_API_KEY}
                                        height={400}
                                        width="100%"
                                        mode="place"
                                        zoom={16}
                                        q={`${currentPuja?.location?.lat},${currentPuja?.location?.lng}`}
                                    />
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
        </Layout>
    )
}