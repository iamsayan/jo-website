import { Fragment } from 'react';
import { notFound } from 'next/navigation';
import MainLayout from "@/components/main-layout";
import Section from "@/components/section";
import { getCollectionData, getSingletonData } from "@/utils/fetch";
import {
    jubilees,
    preJubilees,
    getYear,
    getCelebrating,
    formatDate,
    getDay,
    getDateByIndex,
    getUrlSlug,
    generateUrlSearchParams
} from "@/utils/functions";
import schema from "@/utils/schema";
import Link from "next/link";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";

// Exporting runtime for edge function if needed
// export const runtime = 'edge';
export const revalidate = 3600

interface PageProps {
    params: {
        year: string;
    };
}

interface Puja {
    reference_id: string;
    puja_name: string;
    puja_zone: string;
    estd: string;
}

interface DateItem {
    value: {
        date: string;
        event: string;
    };
}

interface SiteData {
    dates: DateItem[];
}

interface SchemaOptions {
    slug: string;
    title: string;
    description?: string;
    start?: Date;
    end?: Date;
}

export async function generateMetadata({ params }: PageProps) {
    const queryYear = parseInt(params?.year);
    const siteDataRes = await getSingletonData('information');
    const siteData = siteDataRes ?? null;
    const displayDate = getDateByIndex(siteData, 0);
    const dateIsCurrent = queryYear === displayDate.getFullYear();

    return {
        title: `Jagadhatri Puja ${queryYear} Jubilee, Pre Jubilee List${dateIsCurrent ? ', Schedule' : ''}`,
        description: `Here are the Jubilee & Pre Jubilee List${dateIsCurrent ? ', Schedule, Puja Updates ' : ''}and Latest Information about Jagadhatri Puja ${queryYear} the great festival of Chandannagar.`,
        openGraph: {
            url: `/jagadhatri-puja/${queryYear}`,
        },
        alternates: {
            canonical: `/jagadhatri-puja/${queryYear}`,
        },
    }
}

export default async function Page({ params }: PageProps) {
    const queryYear = parseInt(params?.year);
    if (queryYear < 2000 || queryYear > 2099) {
        notFound();
    }

    const siteDataRes = getSingletonData('information');
    const pujasDataRes = getCollectionData(generateUrlSearchParams('pujas', {
        sort: { estd: 1 }
    }));
    const processionDataRes = getCollectionData(generateUrlSearchParams('processionlist', {
        populate: 1
    }));

    const [siteData, pujasData, processionData] = await Promise.all([siteDataRes, pujasDataRes, processionDataRes]);

    const data = siteData ?? null;
    const pujas = pujasData ?? null;
    const procession = processionData ?? null;
    const totalVehicles = procession?.reduce((sum: number, item: any) => sum + (parseInt(item?.vehicles) || 0), 0) || 0;

    const displayDate = getDateByIndex(data, 0);
    const dateIsCurrent = queryYear === displayDate.getFullYear();
    const jubilee = pujas?.filter((data: Puja) => jubilees.includes(Number(getYear(data?.estd, queryYear))));
    const prejubilee = pujas?.filter((data: Puja) => preJubilees.includes(Number(getYear(data?.estd, queryYear))));

    const tabs = [
        {
            name: 'Jubilee List',
            text: 'Number of Total Jubilees',
            type: jubilee
        },
        {
            name: 'Pre Jubilee List',
            text: 'Number of Total Pre Jubilees',
            type: prejubilee
        }
    ];

    let schemaData: SchemaOptions = {
        slug: `jagadhatri-puja/${queryYear}`,
        title: `Jagadhatri Puja ${queryYear} Jubilee, Pre Jubilee List${dateIsCurrent ? ', Schedule' : ''}`,
    };

    if (dateIsCurrent) {
        schemaData = {
            ...schemaData,
            description: `Here are the Jubilee & Pre Jubilee List, Schedule, Puja Updates and Latest Information about Jagadhatri Puja ${queryYear} the great festival of Chandannagar.`,
            start: getDateByIndex(data, 0),
            end: getDateByIndex(data, 4)
        };
    }
    const jsonLd = schema(schemaData);

    return (
        <MainLayout title={`Puja Details ${queryYear}`} jsonLd={jsonLd}>
            <Section title="Know More about" description={<>Puja Details <span className="text-yellow-500">{queryYear}</span></>}>
                <div className="flex flex-col gap-6 text-justify">
                    {dateIsCurrent && <p>
                        Bengalis have a popular saying: “Bangalir baro mashe tero parbon,” which translates to "Bengalis
                        celebrate 13 festivals in 12 months." This phrase reflects their boundless enthusiasm for
                        festivals and celebrations. However, the most eagerly awaited festival for the people of
                        Chandannagar, Mankundu and Bhadreswar is undoubtedly Jagadhatri Puja. Typically taking place in
                        November, Jagadhatri Puja is celebrated in Chandannagar, Mankundu and Bhadreswar with
                        unparalleled pomp and grandeur. It stands out as a festival that spans five days, starting with
                        Sashti and continuing through Saptami, Ashtami, Nabami, and culminating on Dashami with the
                        immersion Procession of Goddess Jagadhatri in water, known as "Bisarjan." Also on the day of
                        dashami, the procession of Goddess Jagadhatri is conducted in the city of Chandannagar, which is
                        the 2nd largest after Brazil's city of Rio de Janeiro.</p>}
                    <p>
                        Jagadhatri Puja, an esteemed festival spanning five vibrant days from Sasthi to Dashami, holds a
                        special place in the hearts of devotees. The pinnacle of this celebration typically unfolds on
                        the seventh day. Much like the grandeur of Kolkata's revered Durga Puja and Barasat's cherished
                        Kali Puja, Chandannagar shines brightly for its elaborate and culturally rich Jagadhatri Puja
                        festivities. The city comes alive with colorful decorations, radiant illuminations, and a spirit
                        of devoutness that unites both locals and visitors, fostering an atmosphere steeped in religious
                        significance and communal harmony.</p>
                    {dateIsCurrent && <p>In {queryYear}, Jagadhatri Puja will be
                        observed on {formatDate(displayDate)}. This year it will start
                        on {formatDate(displayDate, true)} and continue up
                        to {formatDate(getDateByIndex(data, 4), true)}.</p>}
                </div>
                <div className="overflow-x-auto mt-6">
                    <div role="tablist" className="tabs tabs-lifted">
                        {tabs.map((item, index) => (
                            <Fragment key={index}>
                                <input type="radio" name="puja_zone" role="tab"
                                    className="tab h-10 font-bold whitespace-nowrap checked:!bg-gray-50"
                                    aria-label={item?.name} defaultChecked={index === 0} />
                                <div role="tabpanel"
                                    className="tab-content text-center bg-gray-50 border-base-300 p-2 pt-5 md:p-5">
                                    <p className="text-xl font-bold">{item?.text}: {item?.type?.length}</p>
                                    <div className="overflow-x-auto mt-5">
                                        <table className="table text-center table-zebra">
                                            <thead>
                                                <tr>
                                                    <th>Sl. No.</th>
                                                    <th>Puja Name</th>
                                                    <th>Under P. S.</th>
                                                    <th>Years</th>
                                                    <th>{dateIsCurrent ? 'Celebrating' : 'Celebrated'}</th>
                                                    {dateIsCurrent && <th>Details</th>}
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {item?.type.map((item: any, index: number) => {
                                                    const y = getYear(item?.estd, queryYear);
                                                    const cel = getCelebrating(y);
                                                    return (
                                                        <tr key={index} className='row'>
                                                            <td>{index + 1}</td>
                                                            <td>{item?.puja_name}</td>
                                                            <td>{item?.puja_zone === 'bhr' ? 'Bhadreswar' : 'Chandannagar'}</td>
                                                            <td>{y}</td>
                                                            <td>{cel}</td>
                                                            {dateIsCurrent && <th className="text-blue-800"><Link
                                                                href={`/puja/${getUrlSlug(item?.puja_name)}/${item?.reference_id}${new Date().getFullYear() !== queryYear ? `?y=${queryYear}` : ''}`}>
                                                                <button className="btn btn-ghost btn-xs">View</button>
                                                            </Link>
                                                            </th>}
                                                        </tr>
                                                    );
                                                })}
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </Fragment>
                        ))}
                        {dateIsCurrent &&
                            <>
                                <input type="radio" name="puja_zone" role="tab"
                                    className="tab h-10 font-bold whitespace-nowrap checked:!bg-gray-50"
                                    aria-label="Puja Schedule" />
                                <div role="tabpanel"
                                    className="tab-content text-center bg-gray-50 border-base-300 p-2 pt-5 md:p-5">
                                    <p className="text-xl font-bold">Puja Schedule {queryYear}</p>
                                    <div className="overflow-x-auto mt-5">
                                        <table className="table text-center table-zebra">
                                            <thead>
                                                <tr>
                                                    <th>Day</th>
                                                    <th>Date (English Calender)</th>
                                                    <th>Weekday</th>
                                                    <th>Tithi</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {data?.dates?.map((item: any, index: number) => {
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
                            </>
                        }
                        {queryYear === 2024 && procession &&
                            <>
                                <input type="radio" name="puja_zone" role="tab"
                                    className="tab h-10 font-bold whitespace-nowrap checked:!bg-gray-50"
                                    aria-label="Procession List" />
                                <div role="tabpanel" className="tab-content text-center bg-gray-50 border-base-300 p-2 pt-5 md:p-5">
                                    <p className="text-xl font-bold">Procession List {queryYear}</p>
                                    <p className="text-gray-500 mt-2">Total Vehicles: {totalVehicles}</p>
                                    <div className="overflow-x-auto mt-5">
                                        <table className="table text-center table-zebra">
                                            <thead>
                                                <tr>
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
                                                {procession?.map((item: any, index: number) => {
                                                    const y = getYear(item?.puja?.estd, queryYear);
                                                    const cel = getCelebrating(y);
                                                    return (
                                                        <tr key={index} className={`${cel !== '--' ? cel.replaceAll(' ', '-').toLowerCase() + ' row' : 'row'}`}>
                                                            <td>{index + 1}</td>
                                                            <td>{item?.puja?.puja_name}</td>
                                                            <td>{item?.vehicles == 1 ? 1 : item?.vehicles - 1 + ' + 1 = ' + item?.vehicles}</td>
                                                            <td>{item?.zone}</td>
                                                            <td>{y}</td>
                                                            <td>{cel}</td>
                                                            <td>{item?.puja?.puja_zone === 'bhr' ? 'Bhadreswar' : 'Chandannagar'}</td>
                                                        </tr>
                                                    );
                                                })}
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </>
                        }
                    </div>
                </div>
                <div className="flex gap-3 text-sm justify-between mt-6">
                    <div className="border rounded-md border-neutral-200">
                        <Link
                            rel="prev"
                            className="bg-gray-50 hover:bg-gray-100 rounded-md px-4 py-3 block overflow-ellipsis overflow-hidden whitespace-nowrap"
                            href={`/jagadhatri-puja/${queryYear - 1}`}>
                            <FaArrowLeft className="inline-block mr-2 -mt-1" />
                            {queryYear - 1}
                        </Link>
                    </div>
                    <div className="border rounded-md border-neutral-200 text-right">
                        <Link
                            rel="next"
                            className="bg-gray-50 hover:bg-gray-100 rounded-md px-4 py-3 block overflow-ellipsis overflow-hidden whitespace-nowrap"
                            href={`/jagadhatri-puja/${queryYear + 1}`}>
                            {queryYear + 1}<FaArrowRight className="inline-block ml-2 -mt-1" />
                        </Link>
                    </div>
                </div>
            </Section>
        </MainLayout>
    );
}