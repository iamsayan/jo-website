import MainLayout from "@/components/main-layout";
import Section from "@/components/section";
import { getModel, getModels } from "@/utils/fetch";
import Tabs, { TabProps } from '@/components/tabs';
import Info, { InfoItem } from '@/components/info';
import {
    jubilees,
    preJubilees,
    getYear,
    getCelebrating,
    formatDate,
    getDay,
    getDateByIndex,
    getUrlSlug
} from "@/utils/functions";
import schema from "@/utils/schema";
import Link from "next/link";
import { FaArrowLeft, FaArrowRight, FaChevronRight, FaAngellist, FaList, FaCalendarAlt, FaClock, FaSun, FaPray, FaWater, FaUsers, FaCity, FaBuilding, FaCrown, FaTruck, FaMedal, FaAward } from "react-icons/fa";
import { metadata as metadataSchema } from "@/app/layout";
import type { Metadata } from 'next'
import cx from 'classix';

// Exporting runtime for edge function if needed
// export const runtime = 'edge';

interface PageProps {
    params: Promise<{
        year: string;
    }>;
}

interface Puja {
    reference_id: string;
    puja_name: string;
    puja_zone: string;
    estd: string;
}

interface SchemaOptions {
    slug: string;
    title: string;
    description?: string;
    start?: Date;
    end?: Date;
}

export const dynamicParams = false

export async function generateStaticParams() {
    return Array.from({ length: 100 }, (_, i) => ({
        year: (i + 2000).toString()
    }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
    const { year } = await params
    const queryYear = parseInt(year);
    const siteDataRes = await getModel('information', { type: 'item' });
    const siteData = siteDataRes ?? null;
    const displayDate = getDateByIndex(siteData, 0);
    const dateIsCurrent = queryYear === displayDate.getFullYear();

    const archives = Array.from({ length: 10 }, (_, i) => ({
        year: queryYear - i - 1
    })).filter(item => item.year >= 2000 && item.year < queryYear);

    return {
        title: `Jagadhatri Puja ${queryYear} Jubilee, Pre Jubilee List${dateIsCurrent ? ', Schedule' : ''}`,
        description: `Here are the Jubilee & Pre Jubilee List${dateIsCurrent ? ', Schedule, Puja Updates ' : ''}and Latest Information about Jagadhatri Puja ${queryYear} the great festival of Chandannagar.`,
        openGraph: {
            ...metadataSchema.openGraph,
            url: `/jagadhatri-puja/${queryYear}`,
        },
        alternates: {
            canonical: `/jagadhatri-puja/${queryYear}`,
        },
        pagination: {
            previous: queryYear > 2000 ? `/jagadhatri-puja/${queryYear - 1}` : null,
            next: `/jagadhatri-puja/${queryYear + 1}`
        },
        archives: archives?.map(item => `${metadataSchema.metadataBase}jagadhatri-puja/${item.year}`) ?? []
    }
}

export default async function Page({ params }: PageProps) {
    const { year } = await params
    const queryYear = Number(year);
    
    const dataRes = await getModels({
        pujas: {
            sort: { estd: 1 }
        },
        processionlist: {},
        information: {}
    })
    const { pujas, processionlist, information } = dataRes ?? {};

    const totalVehicles = processionlist?.reduce((sum: number, item: any) => sum + (parseInt(item?.vehicles) || 0), 0) || 0;
    const displayDate = getDateByIndex(information, 0);
    const dateIsCurrent = queryYear === displayDate.getFullYear();
    const jubilee = pujas?.filter((data: Puja) => jubilees.includes(Number(getYear(data?.estd, queryYear))));
    const prejubilee = pujas?.filter((data: Puja) => preJubilees.includes(Number(getYear(data?.estd, queryYear))));

    const tabContent = (puja: Puja[]) => {
        const stats = {
            total: puja?.length,
            jubilees: puja?.filter((p: Puja) => p.puja_zone === 'cgr')?.length,
            preJubilees: puja?.filter((p: Puja) => p.puja_zone === 'bhr')?.length,
            adiPujas: puja?.filter((p: Puja) => {
                const y = getYear(p?.estd, queryYear);
                if (!y || Number(y) >= 150) {
                    return true;
                }
                return false;
            }).length,
        };

        const items: InfoItem[] = [
            {
                title: "Total Committees",
                description: stats?.total,
                icon: <FaUsers />,
                variant: "from-green-500 to-green-300"
            },
            {       
                title: "Chandannagar",
                description: stats?.jubilees,
                icon: <FaCity />,
                variant: "from-rose-500 to-rose-300"
            },
            {
                title: "Bhadreswar",
                description: stats?.preJubilees,
                icon: <FaBuilding />,
                variant: "from-blue-500 to-blue-300"
            },
            {
                title: "Adi Pujas",
                description: stats?.adiPujas,
                icon: <FaCrown />,
                variant: "from-purple-500 to-purple-300"
            }
        ]

        return (
            <div className="text-center p-2 pt-5 md:p-5 space-y-3 md:space-y-4 lg:space-y-3 md:space-y-4 lg:space-y-5">
                <Info items={items} />
                <div className="overflow-x-auto rounded-box border border-base-content/5 bg-base-100">
                    <table className="table text-center table-zebra">
                        <thead>
                            <tr className="bg-blue-100 text-gray-700">
                                <th>Sl. No.</th>
                                <th>Puja Name</th>
                                <th>Under P. S.</th>
                                <th>Years</th>
                                <th>{dateIsCurrent ? 'Celebrating' : 'Celebrated'}</th>
                                {dateIsCurrent && <th>Details</th>}
                            </tr>
                        </thead>
                        <tbody>
                            {puja?.map((item: Puja, index: number) => {
                                const y = getYear(item?.estd, queryYear);
                                const cel = getCelebrating(y);
                                const formattedCel = cel.replaceAll(' ', '-').toLowerCase();
                                const celClass = cx(
                                    'px-2.5 py-1 text-xs font-medium rounded-full',
                                    formattedCel.includes('adi') && 'bg-purple-300/10 text-purple-800',
                                    !formattedCel.includes('pre') && formattedCel.includes('jubilee') && 'bg-rose-300/10 text-rose-700',
                                    formattedCel.includes('pre') && formattedCel.includes('jubilee') && 'bg-blue-300/10 text-blue-500',
                                );
                                return (
                                    <tr key={index} className="row">
                                        <td>{index + 1}</td>
                                        <td>{item?.puja_name}</td>
                                        <td>{item?.puja_zone === 'bhr' ? 'Bhadreswar' : 'Chandannagar'}</td>
                                        <td>{y}</td>
                                        <td><span className={celClass}>{cel}</span></td>
                                        {dateIsCurrent && <td><Link
                                            className="btn btn-ghost btn-xs text-sky-600"
                                            href={`/puja/${getUrlSlug(item?.puja_name)}/${item?.reference_id}${new Date().getFullYear() !== queryYear ? `?y=${queryYear}` : ''}`}>
                                            View <FaChevronRight />
                                        </Link>
                                        </td>}
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                </div>
            </div>
        )
    }

    const tabPujaSchedule = () => {
        const items: InfoItem[] = [
            {
                title: "Festival Duration",
                description: `${information?.dates?.length} Days`,
                icon: <FaClock />,
                variant: "from-orange-500 to-orange-300",
            },
            {
                title: "Starting With",
                description: "Sasthi",
                icon: <FaSun />,
                variant: "from-blue-500 to-blue-300",
            },
            {
                title: "Main Puja Day",
                description: "Nabami",
                icon: <FaPray />,
                variant: "from-purple-500 to-purple-300",
            },
            {
                title: "Ending With",
                description: "Dashami",
                icon: <FaWater />,
                variant: "from-rose-500 to-rose-300",
            }
        ]
        return (
            <div className="text-center p-2 pt-5 md:p-5 space-y-3 md:space-y-4 lg:space-y-5">
                <Info items={items} />
                <div className="overflow-x-auto rounded-box border border-base-content/5 bg-base-100">
                    <table className="table text-center table-zebra">
                        <thead>
                            <tr className="bg-blue-100 text-gray-700">
                                <th>Day</th>
                                <th>Date (English Calender)</th>
                                <th>Weekday</th>
                                <th>Tithi</th>
                            </tr>
                        </thead>
                        <tbody>
                            {information?.dates?.map((item: any, index: number) => {
                                return (
                                    <tr key={index} className='row'>
                                        <td>{index + 1}</td>
                                        <td>{formatDate(item?.date)}</td>
                                        <td>{getDay(item?.date)}</td>
                                        <td>{item?.event}</td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                </div>
            </div>
        )
    }

    const tabProcessionList = () => {
        const stats = {
            totalProcession: processionlist?.length,
            totalVehicles: totalVehicles,
            totalJubilees: jubilee?.length,
            totalPreJubilees: prejubilee?.length,
        };

        const items: InfoItem[] = [
            {
                title: "Total Procession",
                description: stats?.totalProcession,
                icon: <FaUsers />,
                variant: "from-green-500 to-green-300"
            },
            {
                title: "Total Vehicles",
                description: stats?.totalVehicles,
                icon: <FaTruck />,
                variant: "from-yellow-500 to-yellow-300"
            },
            {
                title: "Jubilee Celebrations",
                description: stats?.totalJubilees,
                icon: <FaMedal />,
                variant: "from-rose-500 to-rose-300"
            },
            {
                title: "Pre Jubilee Celebrations",
                description: stats?.totalPreJubilees,
                icon: <FaAward />,
                variant: "from-blue-500 to-blue-300"
            }
        ]
        return (
            <div className="text-center p-2 pt-5 md:p-5 space-y-3 md:space-y-4 lg:space-y-5">
                <Info items={items} />
                <div className="overflow-x-auto rounded-box border border-base-content/5 bg-base-100">
                    <table className="table text-center table-zebra">
                        <thead>
                            <tr className="bg-blue-100 text-gray-700">
                                <th>Sl. No.</th>
                                <th>Puja Name</th>
                                <th>Vehicle(s)</th>
                                <th>Zone</th>
                                <th>Years</th>
                                <th>Celebrating</th>
                                <th>Under P. S.</th>
                            </tr>
                        </thead>
                        <tbody>
                            {processionlist?.map((item: any, index: number) => {
                                const puja = pujas?.find((data: any) => data?._id === item?.puja?._id);
                                const y = getYear(puja?.estd, queryYear);
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
                                        <td>{puja?.puja_name}</td>
                                        <td>{item?.vehicles == 1 ? 1 : item?.vehicles - 1 + ' + 1 = ' + item?.vehicles}</td>
                                        <td>{item?.zone}</td>
                                        <td>{y}</td>
                                        <td><span className={celClass}>{cel}</span></td>
                                        <td>{puja?.puja_zone === 'bhr' ? 'Bhadreswar' : 'Chandannagar'}</td>
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
            title: <span className="flex items-center gap-2">Jubilee List <span className="px-2.5 py-1 text-xs font-medium rounded-full bg-blue-300/10 text-blue-500">{jubilee?.length}</span></span>,
            icon: <FaList />,
            content: tabContent(jubilee),
        },
        {
            title: <span className="flex items-center gap-2">Pre Jubilee List <span className="px-2.5 py-1 text-xs font-medium rounded-full bg-blue-300/10 text-blue-500">{prejubilee?.length}</span></span>,
            icon: <FaList />,
            content: tabContent(prejubilee),
        }
    ];

    let schemaData: SchemaOptions = {
        slug: `jagadhatri-puja/${queryYear}`,
        title: `Jagadhatri Puja ${queryYear} Jubilee, Pre Jubilee List${dateIsCurrent ? ', Schedule' : ''}`,
    };

    if (dateIsCurrent) {
        tabs.push({
            title: <span className="flex items-center gap-2">Puja Schedule <span className="px-2.5 py-1 text-xs font-medium rounded-full bg-blue-300/10 text-blue-500">{queryYear}</span></span>,
            icon: <FaCalendarAlt />,
            content: tabPujaSchedule(),
        });

        schemaData = {
            ...schemaData,
            description: `Here are the Jubilee & Pre Jubilee List, Schedule, Puja Updates and Latest Information about Jagadhatri Puja ${queryYear} the great festival of Chandannagar.`,
            start: getDateByIndex(information, 0),
            end: getDateByIndex(information, 4)
        };
    }

    if (queryYear === 2024 && processionlist) {
        tabs.push({
            title: <span className="flex items-center gap-2">Procession List <span className="px-2.5 py-1 text-xs font-medium rounded-full bg-blue-300/10 text-blue-500">{processionlist?.length}</span></span>,
            icon: <FaAngellist  />,
            content: tabProcessionList(),
        });
    }

    const jsonLd = schema(schemaData);

    return (
        <MainLayout title={`Puja Details ${queryYear}`} jsonLd={jsonLd}>
            <Section title="Know More about" description={<>Puja Details <span className="text-yellow-500">{queryYear}</span></>}>
                <div className="flex flex-col space-y-6 text-justify mt-2">
                    {dateIsCurrent && (
                        <div className="bg-gradient-to-br from-orange-50 to-yellow-50 rounded-xl p-6 border border-orange-100">
                            <div className="flex items-center gap-3 mb-4">
                                <div className="w-12 h-12 rounded-full bg-orange-100 flex items-center justify-center">
                                    <span className="text-2xl">🎉</span>
                                </div>
                                <h3 className="text-xl font-semibold text-orange-800">Festival Introduction</h3>
                            </div>
                            <p className="text-gray-700 leading-relaxed">
                                Bengalis have a popular saying: "Bangalir baro mashe tero parbon," which translates to "Bengalis
                                celebrate 13 festivals in 12 months." This phrase reflects their boundless enthusiasm for
                                festivals and celebrations. However, the most eagerly awaited festival for the people of
                                Chandannagar, Mankundu and Bhadreswar is undoubtedly Jagadhatri Puja. Typically taking place in
                                November, Jagadhatri Puja is celebrated in Chandannagar, Mankundu and Bhadreswar with
                                unparalleled pomp and grandeur. It stands out as a festival that spans five days, starting with
                                Sashti and continuing through Saptami, Ashtami, Nabami, and culminating on Dashami with the
                                immersion Procession of Goddess Jagadhatri in water, known as "Bisarjan." Also on the day of
                                dashami, the procession of Goddess Jagadhatri is conducted in the city of Chandannagar, which is
                                the 2nd largest after Brazil's city of Rio de Janeiro.
                            </p>
                        </div>
                    )}
                    <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl p-6 border border-purple-100">
                        <div className="flex items-center gap-3 mb-4">
                            <div className="w-12 h-12 rounded-full bg-purple-100 flex items-center justify-center">
                                <span className="text-2xl">✨</span>
                            </div>
                            <h3 className="text-xl font-semibold text-purple-800">Festival Significance</h3>
                        </div>
                        <p className="text-gray-700 leading-relaxed">
                            Jagadhatri Puja, an esteemed festival spanning five vibrant days from Sashti to Dashami, holds a
                            special place in the hearts of devotees. The pinnacle of this celebration typically unfolds on
                            the seventh day. Much like the grandeur of Kolkata's revered Durga Puja and Barasat's cherished
                            Kali Puja, Chandannagar shines brightly for its elaborate and culturally rich Jagadhatri Puja
                            festivities. The city comes alive with colorful decorations, radiant illuminations, and a spirit
                            of devoutness that unites both locals and visitors, fostering an atmosphere steeped in religious
                            significance and communal harmony.
                        </p>
                    </div>
                    {dateIsCurrent && (
                        <div className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-xl p-6 border border-blue-100">
                            <div className="flex items-center gap-3 mb-4">
                                <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center">
                                    <span className="text-2xl">📅</span>
                                </div>
                                <h3 className="text-xl font-semibold text-blue-800">Festival Schedule</h3>
                            </div>
                            <p className="text-gray-700 leading-relaxed">
                                In {queryYear}, Jagadhatri Puja will be observed on {formatDate(displayDate)}. This year it will start
                                on {formatDate(displayDate, true)} and continue up to {formatDate(getDateByIndex(information, 4), true)}.
                            </p>
                        </div>
                    )}
                </div>
                <div className="mt-6">
                    <Tabs
                        tabs={tabs} 
                        className="border border-base-300" 
                        tabPanelClassName="bg-gray-50" 
                        tabListClassName="bg-gray-30 border-b border-base-300 pattern-dots w-full"
                        tabClassName={cx(
                            'py-4 px-6 border-b-2 border-transparent bg-gray-50',
                            Object.keys(tabs).length >= 4 && 'w-full'
                        )}
                        tabSelectedClassName="border-b-2 !border-blue-700 bg-white"
                    />
                </div>
                <div className="flex gap-3 text-sm justify-between mt-6">
                    <div className="border rounded-md border-neutral-200">
                        <Link
                            rel="prev"
                            className="bg-gray-50 hover:bg-gray-100 rounded-md px-4 py-3 block text-ellipsis overflow-hidden whitespace-nowrap"
                            href={`/jagadhatri-puja/${queryYear - 1}`}>
                            <FaArrowLeft className="inline-block mr-2 -mt-1" />
                            {queryYear - 1}
                        </Link>
                    </div>
                    <div className="border rounded-md border-neutral-200 text-right">
                        <Link
                            rel="next"
                            className="bg-gray-50 hover:bg-gray-100 rounded-md px-4 py-3 block text-ellipsis overflow-hidden whitespace-nowrap"
                            href={`/jagadhatri-puja/${queryYear + 1}`}>
                            {queryYear + 1}<FaArrowRight className="inline-block ml-2 -mt-1" />
                        </Link>
                    </div>
                </div>
            </Section>
        </MainLayout>
    );
}