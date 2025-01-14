import type { Metadata } from 'next'
import MainLayout from '@/components/main-layout';
import Section from '@/components/section';
import schema from "@/utils/schema";
import AwardsSection from '@/components/awards-section';
import { FaTrophy, FaRegLightbulb, FaUsers } from 'react-icons/fa';
import { getCollectionData } from '@/utils/fetch';
import { generateUrlSearchParams } from '@/utils/functions';

export const metadata: Metadata = {
    title: 'Amie Srestho Hoimantika Somman',
    description: 'The Amie Srestho Hoimantika Somman is a prestigious award that has been celebrating creativity and craftsmanship during Jagadhatri Puja in Chandannagar since 2016.',
    openGraph: {
        url: '/hoimontika-somman',
    },
    alternates: {
        canonical: '/hoimontika-somman',
    },
}

export default async function Page() {
    const awardsData = await getCollectionData(generateUrlSearchParams('awards', {
        sort: { year: -1 },
        populate: -1
    }))
    let awards = awardsData ?? null

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
                        idols. The initiative has not only become an integral part of Chandannagar’s Jagadhatri Puja traditions
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
                        <div className="bg-white/90 backdrop-blur p-4 md:p-6 rounded-xl transition-all duration-300 transform hover:-translate-y-1 border border-gray-200 flex items-start">
                            <FaTrophy className="text-yellow-500 text-3xl flex-shrink-0 mt-1" />
                            <div className="ml-4">
                                <h3 className="text-lg md:text-xl font-bold mb-1 md:mb-2">Prestigious Award</h3>
                                <p className="text-gray-600">Celebrating creativity and craftsmanship since 2016.</p>
                            </div>
                        </div>
                        <div className="bg-white/90 backdrop-blur p-4 md:p-6 rounded-xl transition-all duration-300 transform hover:-translate-y-1 border border-gray-200 flex items-start">
                            <FaUsers className="text-yellow-500 text-3xl flex-shrink-0 mt-1" />
                            <div className="ml-4">
                                <h3 className="text-lg md:text-xl font-bold mb-1 md:mb-2">Expert Panel</h3>
                                <p className="text-gray-600">Judged by eminent personalities from various fields.</p>
                            </div>
                        </div>
                        <div className="bg-white/90 backdrop-blur p-4 md:p-6 rounded-xl transition-all duration-300 transform hover:-translate-y-1 border border-gray-200 flex items-start">
                            <FaRegLightbulb className="text-yellow-500 text-3xl flex-shrink-0 mt-1" />
                            <div className="ml-4">
                                <h3 className="text-lg md:text-xl font-bold mb-1 md:mb-2">Innovation</h3>
                                <p className="text-gray-600">Promoting artistic and cultural excellence.</p>
                            </div>
                        </div>
                    </div>
                    <AwardsSection awardsData={awards} />
                </div>
            </Section>
        </MainLayout>
    )
}