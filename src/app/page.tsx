import React from "react";
import Link from 'next/link';
import Image from 'next/image';
import Main from '@/components/main';
import Section from "@/components/section";
import Slider from "@/components/slider";
import CountdownTimer from "@/components/countdown-timer";
import { FaHistory, FaImages, FaYoutube, FaLocationArrow, FaFlag, FaGlobe, FaVideo, FaFacebook } from "react-icons/fa";
import { cn, formatDate, getDateByIndex, shuffle } from "@/utils/functions";
import { paytoneOne } from "@/fonts";
import { getSingletonData } from "@/utils/fetch";
import Videos from "@/components/videos";
import HeroSlider from "@/components/hero-slider";

import slider1 from '@/public/assets/slider1.jpg';
import slider2 from '@/public/assets/slider2.jpg';
import slider3 from '@/public/assets/slider3.jpg';
import slider4 from '@/public/assets/slider4.jpg';
import slider5 from '@/public/assets/slider5.jpg';
import slider6 from '@/public/assets/slider6.jpg';

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

export default async function Home() {
    const siteData = await getSingletonData('information');
    const data = siteData ?? null;
    const year = getDateByIndex(data, 0).getFullYear();
    const curYear = new Date().getFullYear();
    const btnYear = curYear > year ? curYear : year;

    const items: MenuItem[] = [
        {
            title: 'History',
            description: 'When the entire Bengal, nay India, was under the British rule, inspite of being under the French',
            icon: <FaHistory className="size-6 sm:size-8 md:size-10 text-yellow-500" />,
            link: '/puja-history'
        },
        {
            title: 'Gallery',
            description: 'Latest Online Photo Gallery for Chandannagar, Mankundu and Bhadreswar Jagadhatri Puja.',
            icon: <FaImages className="size-6 sm:size-8 md:size-10 text-yellow-500" />,
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
            icon: <FaLocationArrow className="size-6 sm:size-8 md:size-10 text-yellow-500" />,
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
            icon: <FaHistory className="inline-block size-8 stroke-current" />,
            description: '85% more than last month',
            class: 'text-secondary'
        },
        {
            title: 'Post Engagement',
            stat: data?.stats?.engagement ?? '47.8K',
            icon: <FaVideo className="inline-block size-8 stroke-current" />,
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
            icon: <FaGlobe className="inline-block size-8 stroke-current" />,
            description: '14% more than last month',
            class: 'text-pink-500'
        },
    ];

    const jsonLd = {
        "@context": "https://schema.org",
        "@graph": [
            {
                "@type": "Organization",
                "@id": "https://www.jagadhatrionline.co.in/#organization",
                "name": "Jagadhatri Online",
                "sameAs": [
                    "https://www.facebook.com/JagadhatriOnlineOfficial/",
                    "https://twitter.com/JagadhatriLive"
                ]
            },
            {
                "@type": "WebSite",
                "@id": "https://www.jagadhatrionline.co.in/#website",
                "url": "https://www.jagadhatrionline.co.in",
                "name": "Jagadhatri Online",
                "publisher": {
                    "@id": "https://www.jagadhatrionline.co.in/#organization"
                },
                "inLanguage": "en-US"
            },
            {
                "@type": "WebPage",
                "@id": `https://www.jagadhatrionline.co.in#webpage`,
                "url": `https://www.jagadhatrionline.co.in`,
                "name": "Jagadhatri Online | the #1 Puja Portal for Chandannagar Jagadhatri Puja",
                "isPartOf": {
                    "@id": "https://www.jagadhatrionline.co.in/#website"
                },
                "inLanguage": "en-US"
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
                            className="btn bg-yellow-500 border-2 border-yellow-500 uppercase py-3.5 px-6 h-auto min-h-full rounded-md hover:bg-transparent hover:border-yellow-500 hover:text-yellow-500"
                        >
                            Jagadhatri Puja {btnYear}
                        </Link>
                    </div>
                </div>
            </HeroSlider>
            <Section
                className="bg-gray-100"
                title="Welcome to the Online Puja Portal"
                description={<>Jagadhatri <span className="text-yellow-500">Online</span></>}
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
                            className="btn bg-yellow-500 border-0 uppercase py-4 px-6 h-auto min-h-full rounded-md hover:text-white hover:bg-blue-700"
                        >
                            <FaFlag /> Achievements
                        </Link>
                    </div>
                    <div className="stats stats-vertical lg:stats-horizontal text-left shadow container">
                        {stats?.map((item, index) => (
                            <div className="stat" key={index}>
                                <div className={`${cn('stat-figure text-primary', item?.class)}`}>{item?.icon}</div>
                                <div className="stat-title">{item?.title}</div>
                                <div className={`${cn('stat-value text-primary', item?.class)}`}>{item?.stat}</div>
                                <div className="stat-desc">{item?.description}</div>
                            </div>
                        ))}
                    </div>
                    <Slider
                        slides={[
                            { imageUrl: slider1.src },
                            { imageUrl: slider2.src },
                            { imageUrl: slider3.src },
                            { imageUrl: slider4.src },
                            { imageUrl: slider5.src },
                            { imageUrl: slider6.src },
                        ]}
                        options={{
                            height: 800,
                            breakpoints: {
                                640: {
                                    height: 300,
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
                                <span className="p-5 border rounded-full">{item?.icon}</span>
                                <span className="text-xl font-bold uppercase">{item?.title}</span>
                                <span className="">{item?.description}</span>
                            </Link>
                        ))}
                    </div>
                </div>
            </Section>
            <Section
                title="Jagadhatri Puja"
                description={<>Countdown <span className="text-yellow-500">2024</span></>}
            >
                <div className="flex flex-col gap-8 text-center">
                    <CountdownTimer className="mt-3" targetDate={data?.dates[0]?.date} />
                    <div className="grid gap-6 grid-cols-2 md:grid-cols-6">
                        {data?.dates?.slice(-5)?.map((item: any, index: number) => (
                            <div
                                key={index}
                                className={`flex gap-4 col-span-2${index === 3 ? ' md:col-start-2' : ''}`}
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
