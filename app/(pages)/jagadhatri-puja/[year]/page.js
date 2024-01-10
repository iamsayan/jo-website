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
    getDateByIndex
} from "@/app/utils/functions";
import schema from "@/app/utils/schema";

export const runtime = 'edge';

export async function generateMetadata({ params }) {
    return {
        title: `Jagadhatri Puja ${params?.year} Jubilee, Pre Jubilee List, Schedule`,
        description: `Here are the Jubilee & Pre Jubilee List, Schedule, Puja Updates and Latest Information about Jagadhatri Puja ${params?.year} the great festival of Chandannagar.`,
    }
}

export default async function Page({ params }) {
    if ( params?.year < 2000 || params?.year > 2099 ) {
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
    const dateIsCurrent = parseInt(params?.year) === displayDate.getFullYear()
    const jubilee = pujas?.filter((data) => { return jubilees.includes(getYear(data?.estd, params?.year)) });
    const prejubilee = pujas?.filter((data) => { return preJubilees.includes(getYear(data?.estd, params?.year)) });

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

    const jsonLd = schema({
        slug: `jagadhatri-puja/${params?.year}`,
        title: `Jagadhatri Puja ${params?.year} Jubilee, Pre Jubilee List, Schedule`,
        description: `Here are the Jubilee & Pre Jubilee List, Schedule, Puja Updates and Latest Information about Jagadhatri Puja ${params?.year} the great festival of Chandannagar.`,
        start: getDateByIndex(data, 0),
        end: getDateByIndex(data, 4)
    })

    return (
        <Layout title={`Puja Details ${params?.year}`} jsonLd={jsonLd}>
            <Section title="Know More about" description={ <>Puja Details <font color="#F4C040">{params?.year}</font></> }>
                <div className="flex flex-col gap-6 text-justify">
                    <p>
                        Jagadhatri Puja, an esteemed festival spanning five vibrant days from Sasthi to Dashami, holds a special place in the hearts of devotees. The pinnacle of this celebration typically unfolds on the seventh day. Much like the grandeur of Kolkata's revered Durga Puja and Barasat's cherished Kali Puja, Chandannagar shines brightly for its elaborate and culturally rich Jagadhatri Puja festivities. The city comes alive with colorful decorations, radiant illuminations, and a spirit of devoutness that unites both locals and visitors, fostering an atmosphere steeped in religious significance and communal harmony.
                        {dateIsCurrent && <>In {params?.year}, Jagadhatri Puja will be observed on {formatDate(displayDate)}. This year it will start on {formatDate(displayDate, true)} and continue up to {formatDate(getDateByIndex(data, 4), true)}.</>}</p>
                </div>
                <div className="overflow-x-auto mt-6">
                    <div role="tablist" className="tabs tabs-lifted">
                        {tabs.map((item, index) => (
                            <Fragment key={index}>
                                <input type="radio" name="puja_zone" role="tab" className="tab h-10 font-bold whitespace-nowrap" aria-label={item?.name} defaultChecked={index === 0} />
                                <div role="tabpanel" className="tab-content text-center bg-base-100 border-base-300 p-2 pt-5 md:p-5">
                                    <p className="text-xl font-bold">Number of Total Jubilees: {item?.type?.length}</p>
                                    <div className="overflow-x-auto mt-5">
                                        <table className="table text-center table-zebra">
                                            <thead>
                                            <tr>
                                                <th>Puja Name</th>
                                                <th>Under P. S.</th>
                                                <th>Years</th>
                                                <th>Celebrating</th>
                                            </tr>
                                            </thead>
                                            <tbody>
                                            {item?.type?.map((item, index) => {
                                                const y = getYear(item?.estd, params?.year);
                                                const cel= getCelebrating(y);
                                                return (
                                                    <tr key={index} className='row'>
                                                        <td>{item?.puja_name}</td>
                                                        <td>{item?.puja_zone === 'bhr' ? 'Bhadreswar' : 'Chandannagar'}</td>
                                                        <td>{y}</td>
                                                        <td>{cel}</td>
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
                                <input type="radio" name="puja_zone" role="tab" className="tab h-10 font-bold whitespace-nowrap" aria-label="Puja Schedule" />
                                <div role="tabpanel" className="tab-content text-center bg-base-100 border-base-300 p-2 pt-5 md:p-5">
                                    <p className="text-xl font-bold">Puja Schedule {params?.year}</p>
                                    <div className="overflow-x-auto mt-5">
                                        <table className="table text-center table-zebra">
                                            <thead>
                                            <tr>
                                                <th>Date (English Calender)</th>
                                                <th>Day</th>
                                                <th>Tithi</th>
                                            </tr>
                                            </thead>
                                            <tbody>
                                            {data?.dates?.map((item, index) => {
                                                return (
                                                    <tr key={index} className='row'>
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