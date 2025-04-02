import type { Metadata } from 'next'
import MainLayout from '@/components/main-layout';
import Section from '@/components/section';
import schema from "@/utils/schema";
import { FaTrophy, FaRegLightbulb, FaUsers, FaHistory, FaRibbon, FaStar, FaAward, FaMedal } from 'react-icons/fa';
import { getModel } from '@/utils/fetch';
import { metadata as metadataSchema } from "@/app/layout";
import Tabs, { TabProps } from '@/components/tabs';
import Link from 'next/link';
import { createElement } from 'react';
import { getUrlSlug } from '@/utils/functions';

export const metadata: Metadata = {
    title: 'Amie Srestho Hoimantika Somman',
    description: 'The Amie Srestho Hoimantika Somman is a prestigious award that has been celebrating creativity and craftsmanship during Jagadhatri Puja in Chandannagar since 2016.',
    openGraph: {
        ...metadataSchema.openGraph,
        url: '/hoimontika-somman',
    },
    alternates: {
        canonical: '/hoimontika-somman',
    },
}

const getPositionStyle = (position: string) => {
    switch(position) {
        case 'First':
            return { icon: FaTrophy, color: 'text-yellow-500' };
        case 'Second':
            return { icon: FaMedal, color: 'text-emerald-500' };
        case 'Third':
            return { icon: FaAward, color: 'text-amber-700' };
        case 'Ononnyo':
            return { icon: FaStar, color: 'text-blue-600' };
        default:
            return { icon: FaRibbon, color: 'text-indigo-500' };
    }
};

export default async function Page() {
    const awardsData = await getModel('awards', {
        sort: { year: -1 },
        populate: -1
    })
    let awards = awardsData ?? null

    let tabs: TabProps[] = []

    const tabContent = (award: any) => {
        return (
            <div className="p-4">
                {award?.description && <p className="text-center text-gray-500 mb-4">{award?.description}</p>}
                {award?.categories?.length > 0 ? (
                    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                        {award?.categories?.map((category: any, idx: any) => (
                            <div 
                                key={idx}
                                className="group hover:scale-105 transition-all duration-300 delay-300 ease-in-out hover:shadow-lg border rounded-xl border-neutral-200 bg-gradient-to-br from-white to-neutral-50 flex gap-5"
                            >
                                <div className="border-r border-neutral-200 py-6 px-2 flex items-center justify-center w-8 md:w-12">
                                    <h3 className="md:text-lg font-bold text-gray-800 writing-mode-vertical transform -rotate-180">
                                        {category.category}
                                    </h3>
                                </div>
                                
                                <div className="flex flex-col gap-3 py-4 pr-4">
                                    {category?.positions?.map((position: any, posIdx: any) => (
                                        <div key={posIdx}>
                                            <div className={`flex items-center gap-2 ${getPositionStyle(position.position).color} font-semibold mb-1`}>
                                                {createElement(getPositionStyle(position.position).icon, { className: "text-lg" })}
                                                {position.position}
                                            </div>
                                            {position?.pujas?.map((puja: any, pujaIdx: any) => (
                                                <div key={pujaIdx} className="text-gray-700 pl-6">
                                                    &bull; <Link href={`/puja/${getUrlSlug(puja?.puja_name)}/${puja?.reference_id}`}>
                                                        {puja.puja_name}
                                                    </Link>
                                                </div>
                                            ))}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <p className="text-center text-gray-500">No competition was organized this year.</p>
                )}
            </div>
        )
    }

    awards?.forEach((award: any) => {
        const totalAwards = award?.categories?.reduce((total: number, category: any) => {
            return total + category?.positions?.reduce((posTotal: number, position: any) => {
                return posTotal + (position?.pujas?.length || 0);
            }, 0);
        }, 0) || 0;

        tabs.push({
            title: <span className="flex items-center gap-2">{award.year} <span className="px-2.5 py-1 text-xs font-medium rounded-full bg-blue-300/10 text-blue-500">{totalAwards}</span></span>,
            icon: <FaTrophy />,
            content: tabContent(award)
        })
    })

    const jsonLd = schema({
        slug: 'hoimontika-somman',
        title: 'History of Jagadhatri Puja',
    })

    return (
        <MainLayout title="Hoimantika Somman" jsonLd={jsonLd}>
            <Section title="Know More About Amie Srestho" description={<>Hoimantika <span className="text-yellow-500">Somman</span></>}>
                <div className="flex flex-col gap-6 text-justify">
                    <p>The Amie Srestho Hoimantika Somman is a prestigious award that has been celebrating creativity
                        and craftsmanship during Jagadhatri Puja in Chandannagar since 2016. It is one of the most
                        significant awards given to the best pandals across the city, recognizing excellence in various
                        aspects such as decoration, theme, and artistry.</p>
                    <p>
                        The awards have contributed to a shift in how Jagadhatri Puja is celebrated in Chandannagar,
                        Mankundu and Bhadreswar, emphasizing artistic and cultural innovation in the creation of pandals and
                        idols. The initiative has not only become an integral part of Chandannagar's Jagadhatri Puja traditions
                        but also reflects the evolving cultural landscape of the festival. Each year, the awards are judged
                        by a panel of eminent personalities from various fields such as art, literature, and cinema. Winners
                        receive a unique statuette, which has evolved in design over the years, symbolizing the honor and
                        prestige of the award.
                    </p>
                    <p>
                        In this year, the Hoimantika Somman continues to uphold its legacy, with pandals across Chandannagar
                        striving to win in categories like Best Puja, Creative Excellence, and Best Artisan, among
                        others
                    </p>
                    <div className="grid md:grid-cols-3 gap-4 md:gap-6">
                        <div className="bg-white/90 backdrop-blur-sm p-4 md:p-6 rounded-xl transition-all duration-300 transform hover:-translate-y-1 border border-gray-200 flex items-start">
                            <FaTrophy className="text-yellow-500 text-3xl shrink-0 mt-1" />
                            <div className="ml-4">
                                <h3 className="text-lg md:text-xl font-bold mb-1 md:mb-2">Prestigious Award</h3>
                                <p className="text-gray-600">Celebrating creativity and craftsmanship since 2016.</p>
                            </div>
                        </div>
                        <div className="bg-white/90 backdrop-blur-sm p-4 md:p-6 rounded-xl transition-all duration-300 transform hover:-translate-y-1 border border-gray-200 flex items-start">
                            <FaUsers className="text-yellow-500 text-3xl shrink-0 mt-1" />
                            <div className="ml-4">
                                <h3 className="text-lg md:text-xl font-bold mb-1 md:mb-2">Expert Panel</h3>
                                <p className="text-gray-600">Judged by eminent personalities from various fields.</p>
                            </div>
                        </div>
                        <div className="bg-white/90 backdrop-blur-sm p-4 md:p-6 rounded-xl transition-all duration-300 transform hover:-translate-y-1 border border-gray-200 flex items-start">
                            <FaRegLightbulb className="text-yellow-500 text-3xl shrink-0 mt-1" />
                            <div className="ml-4">
                                <h3 className="text-lg md:text-xl font-bold mb-1 md:mb-2">Innovation</h3>
                                <p className="text-gray-600">Promoting artistic and cultural excellence.</p>
                            </div>
                        </div>
                    </div>
                    <div className="flex flex-col gap-4 md:gap-6">
                        <h2 className="text-2xl font-bold text-center flex items-center justify-center gap-2">
                            <FaHistory className="text-yellow-500" />
                            Archives
                        </h2>
                        <Tabs tabs={tabs} 
                            className="border border-base-300" 
                            tabPanelClassName="bg-gray-50" 
                            tabListClassName="bg-gray-30 border-b border-base-300 pattern-dots"
                            tabClassName="py-4 px-6 border-b-2 border-transparent bg-gray-50 w-full"
                            tabSelectedClassName="border-b-2 !border-blue-700 bg-white"
                        />
                    </div>
                </div>
            </Section>
        </MainLayout>
    )
}