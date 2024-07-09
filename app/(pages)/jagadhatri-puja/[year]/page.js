import { Fragment } from 'react';
import { notFound } from 'next/navigation';
import Layout from "@/app/components/layout";
import Section from "@/app/components/section";
import { getCollectionData, getSingletonData } from "@/app/utils/fetch";
import {
    jubilees,
    preJubilees,
    getYear,
    getCelebrating,
    formatDate,
    getDay,
    getDateByIndex, getUrlSlug
} from "@/app/utils/functions";
import schema from "@/app/utils/schema";
import Link from "next/link";

export const runtime = 'edge';

export async function generateMetadata({ params }) {
    const queryYear = parseInt(params?.year)
    return {
        title: `Jagadhatri Puja ${queryYear} Jubilee, Pre Jubilee List, Schedule`,
        description: `Here are the Jubilee & Pre Jubilee List, Schedule, Puja Updates and Latest Information about Jagadhatri Puja ${queryYear} the great festival of Chandannagar.`,
        openGraph: {
            url: `/jagadhatri-puja/${queryYear}`,
        },
        alternates: {
            canonical: `/jagadhatri-puja/${queryYear}`,
        },
    }
}

export default async function Page({ params }) {
    const queryYear = parseInt(params?.year)
    if ( queryYear < 2000 || queryYear > 2099 ) {
        notFound()
    }

    const siteDataRes = getSingletonData('information');
    const pujasDataRes= getCollectionData('pujas', {
        sort: { estd: 1 }
    })

    const [siteData, pujasData] = await Promise.all([ siteDataRes, pujasDataRes ]);

    const data = siteData ?? null
    const pujas = pujasData ?? null

    const displayDate = getDateByIndex(data, 0)
    const dateIsCurrent = parseInt(queryYear) === displayDate.getFullYear()
    const jubilee = pujas?.filter((data) => jubilees.includes(getYear(data?.estd, queryYear)));
    const prejubilee = pujas?.filter((data) => preJubilees.includes(getYear(data?.estd, queryYear)));

    const tabs = [
        {
            name: 'Jubilee List',
            type: jubilee
        },
        {
            name: 'Pre Jubilee List',
            type: prejubilee
        }
    ]

    let schemaData = {
        slug: `jagadhatri-puja/${queryYear}`,
        title: `Jagadhatri Puja ${queryYear} Jubilee, Pre Jubilee List, Schedule`,
    }

    if ( dateIsCurrent ) {
        schemaData = {
            ...schemaData,
            description: `Here are the Jubilee & Pre Jubilee List, Schedule, Puja Updates and Latest Information about Jagadhatri Puja ${queryYear} the great festival of Chandannagar.`,
            start: getDateByIndex(data, 0),
            end: getDateByIndex(data, 4)
        }
    }
    const jsonLd = schema(schemaData)

    return (
        <Layout title={`Puja Details ${queryYear}`} jsonLd={jsonLd}>
            <Section title="Know More about" description={ <>Puja Details <font color="#F4C040">{queryYear}</font></> }>
                <div className="flex flex-col gap-6 text-justify">
                    <p>
                        Jagadhatri Puja, an esteemed festival spanning five vibrant days from Sasthi to Dashami, holds a special place in the hearts of devotees. The pinnacle of this celebration typically unfolds on the seventh day. Much like the grandeur of Kolkata's revered Durga Puja and Barasat's cherished Kali Puja, Chandannagar shines brightly for its elaborate and culturally rich Jagadhatri Puja festivities. The city comes alive with colorful decorations, radiant illuminations, and a spirit of devoutness that unites both locals and visitors, fostering an atmosphere steeped in religious significance and communal harmony. {dateIsCurrent && <>In {queryYear}, Jagadhatri Puja will be observed on {formatDate(displayDate)}. This year it will start on {formatDate(displayDate, true)} and continue up to {formatDate(getDateByIndex(data, 4), true)}.</>}</p>
                </div>
                <div className="overflow-x-auto mt-6">
                    <div role="tablist" className="tabs tabs-lifted">
                        {tabs.map((item, index) => (
                            <Fragment key={index}>
                                <input type="radio" name="puja_zone" role="tab" className="tab h-10 font-bold whitespace-nowrap checked:!bg-gray-50" aria-label={item?.name} defaultChecked={index === 0} />
                                <div role="tabpanel" className="tab-content text-center bg-gray-50 border-base-300 p-2 pt-5 md:p-5">
                                    <p className="text-xl font-bold">Number of Total Jubilees: {item?.type?.length}</p>
                                    <div className="overflow-x-auto mt-5">
                                        <table className="table text-center table-zebra">
                                            <thead>
                                            <tr>
                                                <th>Sl. No.</th>
                                                <th>Puja Name</th>
                                                <th>Under P. S.</th>
                                                <th>Years</th>
                                                <th>Celebrating</th>
                                                <th>Details</th>
                                            </tr>
                                            </thead>
                                            <tbody>
                                            {item?.type?.map((item, index) => {
                                                const y = getYear(item?.estd, queryYear);
                                                const cel= getCelebrating(y);
                                                return (
                                                    <tr key={index} className='row'>
                                                        <td>{index + 1}</td>
                                                        <td>{item?.puja_name}</td>
                                                        <td>{item?.puja_zone === 'bhr' ? 'Bhadreswar' : 'Chandannagar'}</td>
                                                        <td>{y}</td>
                                                        <td>{cel}</td>
                                                        <th className="text-blue-800"><Link
                                                            href={`/puja/${getUrlSlug(item?.puja_name)}/${item?._id}`}>
                                                            <button className="btn btn-ghost btn-xs">View</button></Link>
                                                        </th>
                                                    </tr>
                                                )
                                            })}
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </Fragment>
                        ))}
                        {dateIsCurrent &&
                            <>
                                <input type="radio" name="puja_zone" role="tab" className="tab h-10 font-bold whitespace-nowrap checked:!bg-gray-50" aria-label="Puja Schedule" />
                                <div role="tabpanel" className="tab-content text-center bg-gray-50 border-base-300 p-2 pt-5 md:p-5">
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
                                            {data?.dates?.map((item, index) => {
                                                return (
                                                    <tr key={index} className='row'>
                                                        <td>{index+1}</td>
                                                        <td>{formatDate(item?.value?.date)}</td>
                                                        <td>{getDay(item?.value?.date)}</td>
                                                        <td>{item?.value?.event}</td>
                                                    </tr>
                                                )
                                            })}
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </>
                        }
                    </div>
                </div>
            </Section>
        </Layout>
    )
}