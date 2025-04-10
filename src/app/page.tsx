import React from "react";
import Link from 'next/link';
import Image from 'next/image';
import Main from '@/components/main';
import Section from "@/components/section";
import GallerySlider from "@/components/gallery-slider";
import CountdownTimer from "@/components/countdown-timer";
import Videos from "@/components/videos";
import HeroSlider from "@/components/hero-slider";
import { 
    LuHistory, 
    LuImages, 
    LuVideo, 
    LuMapPin, 
    LuFlag, 
    LuGlobe, 
    LuPencil, 
    LuShirt, 
    LuShoppingBag 
} from "react-icons/lu";
import { 
    FaFacebook, 
    FaYoutube 
} from "react-icons/fa";
import { cn, formatDate, getDateByIndex } from "@/utils/functions";
import { paytoneOne } from "@/fonts";
import { getModel } from "@/utils/fetch";

const imagesPath = [
    '2024/doibokhalf.jpg',
    '2024/banerjeeparamadhyanchal.jpg',
    '2024/circuscover.jpg',
    '2024/coverkhalisani.jpg',
    '2024/fatokgoraroadlight.jpg',
    '2024/temathafull.jpg',
    '2024/strand.jpg',
] as const;

interface StatsItem {
    title: string;
    stat: string;
    icon: React.ReactNode;
    description: string;
    class?: string;
}

interface MenuItem {
    title: string;
    description: string;
    icon: React.ReactNode;
    link: string;
}

interface ShopItem {
    title: string;
    description: string;
    icon: React.ReactNode;
    comingSoon?: boolean;
}

export default async function Home() {
    const siteData = await getModel('information', { type: 'item' });
    const data = siteData ?? null;
    const year = getDateByIndex(data, 0).getFullYear();
    const curYear = new Date().getFullYear();
    const btnYear = curYear > year ? curYear : year;

    const sliderImages = imagesPath.map((image) => ({
        src: `/assets/${image}`,
        alt: image,
    }));

    const shopItems: ShopItem[] = [
        {
            title: 'Stationery',
            description: 'High-quality notebooks, pens, and other stationery items for your daily needs',
            icon: <LuPencil className="size-8 text-yellow-500" />,
        },
        {
            title: 'T-Shirts',
            description: 'Comfortable and stylish t-shirts with unique designs',
            icon: <LuShirt className="size-8 text-yellow-500" />,
            comingSoon: true,
        },
        {
            title: 'Hoodies',
            description: 'Stay warm and fashionable with our premium hoodies',
            icon: <LuShoppingBag className="size-8 text-yellow-500" />,
            comingSoon: true,
        },
    ];

    const items: MenuItem[] = [
        {
            title: 'History',
            description: 'When the entire Bengal, nay India, was under the British rule, inspite of being under the French',
            icon: <LuHistory className="size-6 sm:size-8 md:size-10 text-yellow-500" />,
            link: '/puja-history'
        },
        {
            title: 'Gallery',
            description: 'Latest Online Photo Gallery for Chandannagar, Mankundu and Bhadreswar Jagadhatri Puja.',
            icon: <LuImages className="size-6 sm:size-8 md:size-10 text-yellow-500" />,
            link: '/gallery'
        },
        {
            title: 'Videos',
            description: 'Here are the latest Online Video Gallery for Chandannagar Jagadhatri Puja.',
            icon: <FaYoutube className="size-6 sm:size-8 md:size-10 text-yellow-500" />,
            link: 'https://www.youtube.com/c/JagadhatriOnline'
        },
        {
            title: 'Location',
            description: 'Explore the Grand Festival of Chandannagar with CGR Utsav Android App.',
            icon: <LuMapPin className="size-6 sm:size-8 md:size-10 text-yellow-500" />,
            link: 'https://play.google.com/store/apps/details?id=com.cgr.utsav',
        }
    ];

    const stats: StatsItem[] = [
        {
            title: 'Followers',
            stat: data?.stats?.followers ?? '60.5K',
            icon: <FaFacebook className="inline-block size-8 stroke-current" />,
            description: '1K+ new followers in last 30 days'
        },
        {
            title: 'Post Reach',
            stat: data?.stats?.reach ?? '1.6M',
            icon: <LuHistory className="inline-block size-8 stroke-current" />,
            description: '85% more than last month',
            class: 'text-secondary'
        },
        {
            title: 'Post Engagement',
            stat: data?.stats?.engagement ?? '47.8K',
            icon: <LuVideo className="inline-block size-8 stroke-current" />,
            description: '38% more than last month',
            class: 'text-blue-500'
        },
        {
            title: 'Subscribers',
            stat: data?.stats?.subscribers ?? '4.04K',
            icon: <FaYoutube className="inline-block size-8 stroke-current" />,
            description: '500+ new followers in last 1 year',
            class: 'text-green-600'
        },
        {
            title: 'Visitors',
            stat: data?.stats?.visitors ?? '98.5K',
            icon: <LuGlobe className="inline-block size-8 stroke-current" />,
            description: '14% more than last month',
            class: 'text-pink-500'
        },
    ];

    const jsonLd = {
        "@context": "https://schema.org",
        "@graph": [
            {
                "@type": "Organization",
                "@id": `${process.env.NEXT_PUBLIC_SITE_URL}/#organization`,
                "name": "Jagadhatri Online",
                "url": process.env.NEXT_PUBLIC_SITE_URL,
                "email": "info@jagadhatrionline.co.in",
                "sameAs": [
                    "https://www.facebook.com/JagadhatriOnlineOfficial/",
                    "https://twitter.com/Official_JO16"
                ]
            },
            {
                "@type": "WebSite",
                "@id": `${process.env.NEXT_PUBLIC_SITE_URL}/#website`,
                "url": process.env.NEXT_PUBLIC_SITE_URL,
                "name": "Jagadhatri Online",
                "publisher": {
                    "@id": `${process.env.NEXT_PUBLIC_SITE_URL}/#organization`
                },
                "inLanguage": "en-IN",
                "potentialAction": {
                    "@type": "SearchAction",
                    "target": `${process.env.NEXT_PUBLIC_SITE_URL}/?q={search_term_string}`,
                    "query-input": "required name=search_term_string"
                }
            },
            {
                "@type": "WebPage",
                "@id": `${process.env.NEXT_PUBLIC_SITE_URL}#webpage`,
                "url": process.env.NEXT_PUBLIC_SITE_URL,
                "name": "Jagadhatri Online | the #1 Puja Portal for Chandannagar Jagadhatri Puja",
                "datePublished": "2016-05-06T00:00:00+05:30",
                "dateModified": "2024-11-01T11:26:00+05:30",
                "isPartOf": {
                    "@id": `${process.env.NEXT_PUBLIC_SITE_URL}/#website`
                },
                "inLanguage": "en-IN"
            }
        ]
    };

    return (
        <Main jsonLd={jsonLd}>
            <HeroSlider>
                <div className="hero-content text-center text-white-content text-white p-0 z-2">
                    <div className="pt-36 pb-28">
                        <h1 className={`mb-3 text-2xl md:text-4xl lg:text-6xl ${paytoneOne.className}`}>
                            CHANDANNAGAR <br /> JAGADHATRI PUJA
                        </h1>
                        <p className="mb-8">Explore the Grand Festival of Chandannagar.</p>
                        <Link
                            href={`/jagadhatri-puja/${year}`}
                            className="btn bg-yellow-500 border-2 border-yellow-500 uppercase py-3 px-6 h-auto shadow-none rounded-md hover:bg-transparent hover:border-yellow-500 hover:text-yellow-500"
                        >
                            Jagadhatri Puja {btnYear}
                        </Link>
                    </div>
                </div>
            </HeroSlider>
            <Section
                className="bg-gray-100"
                title="Welcome to the Online Puja Portal"
                description="Jagadhatri Online"
            >
                <div className="flex flex-col gap-6 text-center">
                    <p className="md:text-xl text-center m-auto md:leading-relaxed">
                        Jagadhatri Online is your online destination to visit the collection of most popular Jagadhatri
                        Pujas of Chanannagar, Mankundu & Bhadreswar. It is a platform on internet where we display the
                        Location, Photos & Videos of various Jagadhatri Pujas of Chandannagar. It will guide people who
                        want directions to go Pandal Hopping around the city, looking for the best Pujas in town.
                    </p>
                    <div>
                        <Link
                            href="/achievements"
                            className="btn bg-yellow-500 border-0 uppercase py-3 px-6 h-auto shadow-none rounded-md hover:text-white hover:bg-blue-700"
                        >
                            <LuFlag /> Achievements
                        </Link>
                    </div>
                    <div className="stats stats-vertical lg:stats-horizontal text-left shadow-sm container">
                        {stats?.map((item, index) => (
                            <div className="stat bg-white" key={index}>
                                <div className={`${cn('stat-figure text-primary', item?.class)}`}>{item?.icon}</div>
                                <div className="stat-title">{item?.title}</div>
                                <div className={`${cn('stat-value text-primary', item?.class)}`}>{item?.stat}</div>
                                <div className="stat-desc">{item?.description}</div>
                            </div>
                        ))}
                    </div>
                    <GallerySlider
                        slides={sliderImages}
                        sliderOptions={{
                            lazyLoad: 'nearby',
                            autoScroll: {
                                speed: 1,
                            },
                            height: 800,
                            breakpoints: {
                                640: {
                                    height: 300,
                                },
                            },
                            drag: 'free',
                            focus: 'center',
                            pagination: false,
                            // perPage: 2,
                            // perMove: 1,
                            gap: '6px',
                            grid: {
                                dimensions: [ [ 1, 1 ], [ 2, 2 ], [ 1, 2 ] ],
                                // rows: 2,
		                        // cols: 2,
                                gap: {
                                  row: '6px',
                                  col: '6px',
                                },
                            },
                        }}
                    />
                    <div className="grid gap-2 grid-cols-2 xl:grid-cols-4 mt-5">
                        {items?.map((item, index) => (
                            <Link
                                key={index}
                                href={item?.link}
                                target={item?.link?.includes('https') ? '_blank' : '_self'}
                                className="flex flex-col gap-2 items-center"
                            >
                                <span className="p-5 border border-gray-200 rounded-full">{item?.icon}</span>
                                <span className="text-xl font-bold uppercase">{item?.title}</span>
                                <span className="">{item?.description}</span>
                            </Link>
                        ))}
                    </div>
                </div>
            </Section>
            <Section
                title="Our Store"
                description="Discover Our Products"
                className="bg-gray-50"
            >
                <div className="flex flex-col gap-8 items-center">
                    <p className="md:text-xl text-center max-w-5xl mx-auto">
                        Visit our online store to explore a curated collection of high-quality products. 
                        From premium stationery to trendy apparel, we've got something special for everyone.
                    </p>
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-5xl">
                        {shopItems.map((item, index) => (
                            <div 
                                key={index}
                                className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300"
                            >
                                <div className="flex flex-col items-center text-center gap-4">
                                    <div className="p-4 bg-gray-50 rounded-full">
                                        {item.icon}
                                    </div>
                                    <h3 className="text-xl font-bold">
                                        {item.title}
                                        {item.comingSoon && (
                                            <span className="ml-2 text-xs bg-yellow-100 text-yellow-800 px-2 py-1 rounded-full">
                                                Coming Soon
                                            </span>
                                        )}
                                    </h3>
                                    <p className="text-gray-600">{item.description}</p>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="flex flex-col items-center gap-4 mt-4">
                        <a
                            href="https://store.jagadhatrionline.co.in"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="btn bg-yellow-500 border-0 uppercase py-3 px-6 h-auto shadow-none rounded-md hover:text-white hover:bg-blue-700"
                        >
                            Visit Store
                        </a>
                        {/* <p className="text-sm text-gray-500">
                            Free shipping available on orders above ₹499
                        </p> */}
                    </div>
                </div>
            </Section>
            <Section
                title="Jagadhatri Puja"
                description={`Countdown ${year}`}
            >
                <div className="flex flex-col gap-8 text-center">
                    <CountdownTimer className="mt-3" targetDate={data?.dates[0]?.date} />
                    <div className="grid gap-6 grid-cols-2 md:grid-cols-6">
                        {data?.dates?.slice(-5)?.map((item: any, index: number) => (
                            <div
                                key={index}
                                className={`flex gap-4 col-span-2 ${index === 3 ? ' md:col-start-2' : ''}`}
                            >
                                <Image
                                    width={55}
                                    height={55}
                                    src={`/dates/${index}.png`}
                                    alt={item?.event}
                                    quality={100}
                                    className="h-fit"
                                />
                                <div className="flex flex-col gap-2 text-left">
                                    <span className="font-bold">{item?.information}</span>
                                    <span className="">{item?.event}: {formatDate(item?.date)}</span>
                                </div>
                            </div>
                        ))}
                    </div>
                    <div>
                        <p className="font-bold text-base sm:text-xl md:text-2xl xl:text-3xl mb-4">
                            Glimps of <span className="text-yellow-500">Jagadhatri Puja</span>
                        </p>
                        <Videos />
                    </div>
                </div>
            </Section>
        </Main>
    );
}
