import Layout from "@/app/components/layout";
import Section from "@/app/components/section";
import schema from "@/app/utils/schema";
import Gallery from "@/app/components/gallery";
import { getCollectionData } from "@/app/utils/fetch";
import Image from "next/image";

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
    const pujasDataRes= getCollectionData('pujas')
    const imagesDataRes = getCollectionData('appimages')

    const [ pujasData, imagesData ] = await Promise.all([ pujasDataRes, imagesDataRes ]);

    const pujas = pujasData ?? null
    let images = imagesData ?? null
    images = images?.filter(data => [1,9].includes(data?.category));

    const getPujaName = pujaId => {
        return pujas?.filter(data => data?._id === pujaId)?.[0]?.puja_name;
    }

    const imgStyle = {
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
        <Layout title="Photo Gallery" jsonLd={jsonLd}>
            <Section title="View Jagadhatri Puja" description={ <>Photo <font color="#F4C040">Gallery</font></> }>
                <Gallery elementClassNames="grid grid-cols-2 md:grid-cols-4 gap-2 mt-2" speed={500} slideShowAutoplay={true} fullScreen={true}>
                    {images?.slice(0, 80)?.map((item, index) => {
                        return (
                            <a data-disable-nprogress={true} key={index} className="h-52 md:h-72 relative" href={`https://cgrutsav.jagadhatrionline.co.in/images/${item?.year}/${item?.puja_entry_id?._id}/${item?.image_name}`}>
                                <Image
                                    src={`https://cgrutsav.jagadhatrionline.co.in/images/${item?.year}/${item?.puja_entry_id?._id}/${item?.image_name}`}
                                    width={500}
                                    height={300}
                                    style={imgStyle}
                                    priority={false}
                                    loading="lazy"
                                    alt={getPujaName(item?.puja_entry_id?._id)}
                                />
                                <div className="absolute bottom-0 left-0 right-0 text-center bg-yellow-500 p-1.5 text-sm">{getPujaName(item?.puja_entry_id?._id)}</div>
                            </a>
                        )
                    })}
                </Gallery>
            </Section>
        </Layout>
    )
}