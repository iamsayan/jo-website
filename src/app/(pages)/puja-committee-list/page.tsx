import { Metadata } from 'next';
import MainLayout from "@/components/main-layout";
import Section from "@/components/section";
import { getModel } from "@/utils/fetch";
import { jubilees, preJubilees, getYear, getCelebrating, getUrlSlug } from "@/utils/functions";
import schema from "@/utils/schema";
import Link from "next/link";
import { metadata as metadataSchema } from "@/app/layout";
import { FaChevronRight, FaCity, FaArchway, FaMapMarkerAlt, FaStar, FaTrophy, FaLandmark, FaFlag } from "react-icons/fa";
import cx from 'classix';
import TabsComponent, { TabProps } from '@/components/tabs';

interface PageProps {
    searchParams: Promise<{
        year?: number;
    }>;
}

interface PujaData {
    reference_id: string;
    puja_name: string;
    puja_zone: string;
    estd: string;
}

export const metadata: Metadata = {
    title: 'Jagadhatri Puja Committee List',
    description: 'Here is the full list of Chandannagar Jagadhatri Puja Committees registered under Chandannagar Central Jagadhatri Puja Committee.',
    openGraph: {
        ...metadataSchema.openGraph,
        url: '/puja-committee-list',
    },
    alternates: {
        canonical: '/puja-committee-list',
    },
}

const getZoneDescription = (zone: string) => {
    switch (zone) {
        case 'cgr':
            return {
                title: "Chandannagar - The Heart of Jagadhatri Puja",
                description: "Known as the cultural capital of Jagadhatri Puja, Chandannagar's celebrations date back to the French colonial era. The city is famous for its stunning light decorations (illumination) and artistic excellence in idol making. Each year, thousands of visitors throng the streets to witness the grand celebrations and spectacular immersion procession along the Hooghly riverfront.",
                highlights: [
                    { icon: <FaCity className="text-yellow-500" />, title: "Cultural Heritage", value: "270+ Years" },
                    { icon: <FaLandmark className="text-rose-500" />, title: "Famous For", value: "Light Art & Illumination" },
                    { icon: <FaArchway className="text-blue-500" />, title: "Annual Footfall", value: "1 Million+" }
                ]
            };
        case 'bhr':
            return {
                title: "Bhadreswar - Preserving Ancient Traditions",
                description: "Bhadreswar carries forward the legacy of traditional Jagadhatri Puja with its unique blend of old-world charm and modern celebrations. The area is particularly known for its traditional dhak, cultural programs, and community engagement that brings together people from all walks of life.",
                highlights: [
                    { icon: <FaCity className="text-yellow-500" />, title: "Heritage Status", value: "150+ Years" },
                    { icon: <FaLandmark className="text-rose-500" />, title: "Known For", value: "Traditional Rituals" },
                    { icon: <FaArchway className="text-blue-500" />, title: "Community Spirit", value: "United in Faith" }
                ]
            };
        default:
            return null;
    }
};

export default async function Page({ searchParams }: PageProps) {
    const { year } = await searchParams
    const queryYear = year ?? undefined
    const pujaData = await getModel('pujas', {
        sort: { puja_name: 1 }
    });

    const data = pujaData ?? [];

    const cgr: PujaData[] = data.filter((data: any) => data?.puja_zone === 'cgr');
    const bhr: PujaData[] = data.filter((data: any) => data?.puja_zone === 'bhr');

    const filterData = (zone: any, cel: any) => {
        return zone.filter((data: any) => {
            return cel.includes(Number(getYear(data?.estd, queryYear)));
        });
    }

    const tabContent = (zone: PujaData[]) => {
        const zoneStats = {
            total: zone.length,
            jubilees: filterData(zone, jubilees)?.length,
            preJubilees: filterData(zone, preJubilees)?.length,
            adiPujas: zone.filter((data: any) => {
                const y = getYear(data?.estd, queryYear);
                const cel = getCelebrating(y);
                return cel === 'Adi Puja';
            }).length,
        };

        const zoneInfo = getZoneDescription(zone[0]?.puja_zone);

        return (
            <div className="text-center p-2 pt-5 md:p-5 space-y-5">
                {zoneInfo && (
                    <div className="relative overflow-hidden rounded-xl bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 p-8 mb-8">
                        <div className="absolute top-0 left-0 w-full h-full pattern-dots opacity-10"></div>
                        <div className="relative z-10 flex flex-col gap-8">
                            <div className="flex-1">
                                <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
                                    {zoneInfo.title}
                                </h2>
                                <p className="text-white/90 text-sm md:text-base">
                                    {zoneInfo.description}
                                </p>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                {zoneInfo.highlights.map((highlight, index) => (
                                    <div key={index} className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
                                        <div className="flex items-center gap-3">
                                            <div className="p-2 rounded-full bg-white/10">
                                                {highlight.icon}
                                            </div>
                                            <div className="text-left">
                                                <div className="text-sm text-white/75">{highlight.title}</div>
                                                <div className="text-lg font-bold text-white">{highlight.value}</div>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                )}

                <div className="flex flex-col md:flex-row items-center justify-center gap-4">
                    <div className="flex items-center gap-2">
                        <div className="w-4 h-4 bg-rose-500 rounded-full"></div>
                        <span className="text-sm">Jubilee Celebration</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <div className="w-4 h-4 bg-blue-500 rounded-full"></div>
                        <span className="text-sm">Pre-Jubilee Celebration</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <div className="w-4 h-4 bg-purple-500 rounded-full"></div>
                        <span className="text-sm">Adi Pujas</span>
                    </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 text-left">
                    <div className="rounded-box p-4 hover-scale bg-white border border-base-content/5">
                        <div className="flex items-center">
                        <div className="p-3 rounded-full bg-gradient-to-br from-yellow-500 to-yellow-300 text-white mr-4">
                            <FaLandmark />
                        </div>
                        <div>
                            <h3 className="text-sm font-medium text-gray-500">Total Committees</h3>
                            <p className="text-3xl font-bold bg-gradient-to-r from-yellow-500 to-yellow-300 gradient-text">{zone.length}</p>
                        </div>
                        </div>
                    </div>
                    <div className="rounded-box p-4 hover-scale bg-white border border-base-content/5">
                        <div className="flex items-center">
                        <div className="p-3 rounded-full bg-gradient-to-br from-rose-500 to-rose-300 text-white mr-4">
                            <FaTrophy />
                        </div>
                        <div>
                            <h3 className="text-sm font-medium text-gray-500">Jubilee Celebrations</h3>
                            <p className="text-3xl font-bold bg-gradient-to-r from-rose-500 to-rose-300 gradient-text">{filterData(zone, jubilees)?.length}</p>
                        </div>
                        </div>
                    </div>
                    <div className="rounded-box p-4 hover-scale bg-white border border-base-content/5">
                        <div className="flex items-center">
                        <div className="p-3 rounded-full bg-gradient-to-br from-blue-500 to-blue-300 text-white mr-4">
                            <FaStar />
                        </div>
                        <div>
                            <h3 className="text-sm font-medium text-gray-500">Pre Jubilee Celebrations</h3>
                            <p className="text-3xl font-bold bg-gradient-to-r from-blue-500 to-blue-300 gradient-text">{filterData(zone, preJubilees)?.length}</p>
                        </div>
                        </div>
                    </div>
                    <div className="rounded-box p-4 hover-scale bg-white border border-base-content/5">
                        <div className="flex items-center">
                        <div className="p-3 rounded-full bg-gradient-to-br from-purple-500 to-purple-300 text-white mr-4">
                            <FaFlag />
                        </div>
                        <div>
                            <h3 className="text-sm font-medium text-gray-500">Adi Pujas</h3>
                            <p className="text-3xl font-bold bg-gradient-to-r from-purple-500 to-purple-300 gradient-text">{zoneStats.adiPujas}</p>
                        </div>
                        </div>
                    </div>
                </div>
                <div className="overflow-x-auto rounded-box border border-base-content/5 bg-base-100">
                    <table className="table text-center table-zebra">
                        <thead>
                            <tr className="bg-blue-100 text-gray-700">
                                <th>Sl. No.</th>
                                <th>Puja Committee Name</th>
                                <th>Years</th>
                                <th>Celebrating (in {queryYear ?? new Date().getFullYear()})</th>
                                <th>Details</th>
                            </tr>
                        </thead>
                        <tbody>
                            {zone.map((item: PujaData, index: number) => {
                                const y = getYear(item?.estd, queryYear);
                                const cel = getCelebrating(y);
                                const formattedCel = cel.replaceAll(' ', '-').toLowerCase();
                                const celClass = cx(
                                    'px-2.5 py-1 text-xs font-medium rounded-full',
                                    formattedCel.includes('adi') && 'bg-purple-300/10 text-purple-800',
                                    !formattedCel.includes('pre') && formattedCel.includes('jubilee') && 'bg-rose-300/10 text-rose-700',
                                    formattedCel.includes('pre') && formattedCel.includes('jubilee') && 'bg-blue-300/10 text-blue-500',
                                );
                                const rowClass = cx(
                                    'row',
                                    formattedCel.includes('adi') && 'text-purple-800 font-medium',
                                    !formattedCel.includes('pre') && formattedCel.includes('jubilee') && 'text-rose-500 font-medium',
                                    formattedCel.includes('pre') && formattedCel.includes('jubilee') && 'text-blue-500 font-medium',
                                );
                                return (
                                    <tr key={index} className={rowClass}>
                                        <td>{index + 1}</td>
                                        <td>{item?.puja_name}</td>
                                        <td>{y}</td>
                                        <td><span className={celClass}>{cel}</span></td>
                                        <td>
                                            <Link className="btn btn-ghost btn-xs text-sky-600" href={`/puja/${getUrlSlug(item?.puja_name)}/${item?.reference_id}${queryYear ? `?y=${queryYear}` : ''}`}>
                                                View <FaChevronRight />
                                            </Link>
                                        </td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                </div>
            </div>
        )
    }

    const tabs: TabProps[] = [
        {
            title: 'Chandannagar',
            icon: <FaCity />,
            content: tabContent(cgr),
        },
        {
            title: 'Bhadreswar',
            icon: <FaArchway />,
            content: tabContent(bhr),
        },
        {
            title: 'Others',
            icon: <FaMapMarkerAlt />,
            content: <div className="text-center py-16 px-5 space-y-3">
                <h3 className="text-2xl font-bold text-gray-800">Enlist Your Puja Committee</h3>
                <p className="text-gray-600 max-w-2xl mx-auto">Others puja committees are requested to send their puja info in details to us via this email id cgrjagadhatripuja@gmail.com. We will add your puja to our website within 24 hours.
                </p>
            </div>,
        }
    ];

    const jsonLd = schema({
        slug: 'puja-committee-list',
        title: 'Jagadhatri Puja Committee List',
    });

    return (
        <MainLayout title="Puja Committee List" jsonLd={jsonLd}>
            <Section title="View All Jagadhatri" description={<>Puja Committee <span className="text-yellow-500">List</span></>}>
                <div className="flex flex-col gap-6 text-justify">
                    <p>The number of community pujas in Chandannagar, Bhadreswar and Champdany Municipal areas crosses 190 mark. Of these, {data?.length} Puja committees in different localities in Chandannagar and Bhadreswar are affiliated to the Chandannagar Central Jagadhatri Puja Committee (CCJPC). The Central committee renders all possible assistance to its constituents in getting permissions and clearances for holding Puja. The immersion procession is really memorable and enjoyable sight to witness which lakh of people throng in Chandannagar from far and near. The beautiful decorated tall images loaded on trucks are taken around the city in a procession.</p>
                </div>
                <div className="mt-6">
                    <TabsComponent
                        tabs={tabs} 
                        className="border border-base-300" 
                        tabPanelClassName="bg-gray-50" 
                        tabListClassName="bg-gray-30 border-b border-base-300 pattern-dots"
                        tabClassName="py-4 px-6 border-b-2 border-transparent bg-gray-50"
                        tabSelectedClassName="border-b-2 !border-blue-700 bg-white"
                    />
                </div>
            </Section>
        </MainLayout>
    );
}