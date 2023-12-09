'use client'

import { Fragment, useEffect, useState } from 'react';
import { notFound } from 'next/navigation';
import Layout from "@/app/components/layout";
import Section from "@/app/components/section";
import { useDataContext } from "@/app/context/data";
import { getCollectionData } from "@/app/utils/fetch";
import {jubilees, preJubilees, getYear, getCelebrating, formatDate, getDay } from "@/app/utils/functions";

export default function Page({ params }) {
    if ( params?.year < 2000 || params?.year > 2099 ) {
        notFound()
    }

    const [ fetchedData, setFetchedData ] = useState(null );
    const siteData = useDataContext();
    const data = siteData?.data ?? null

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await getCollectionData('pujas', {
                    sort: { estd: 1 }
                })
                setFetchedData(data);
            } catch (error) {
                console.error(error);
            }
        };

        fetchData();
    }, []);

    const pujas = fetchedData?.data ?? null

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

    // if ( ! data ) {
    //     return <span className="loading loading-bars loading-lg"></span>
    // }

    return (
        <Layout title={`Puja Details ${params?.year}`}>
            <Section title="Know More about" description={ <>Puja Details <font color="#F4C040">{params?.year}</font></> }>
                <div className="flex flex-col gap-6 text-justify">
                    {data ?
                        <p>In {params?.year}, Jagadhatri Puja will be observed on {formatDate(data?.dates[0]?.value?.date)}. Main Jagadhatri puja is celebrated over five days from Sasthi to Dashami. This year it will start on {formatDate(data?.dates[0]?.value?.date, true)} and continue up to {formatDate(data?.dasami, true)}. Chandanagar is famous for Jagadhatri Puja like Kolkata Durga Puja and Barasat famous for Kali Puja.</p>
                        : <></>
                    }
                </div>
                <div className="overflow-x-auto mt-6">
                    <div role="tablist" className="tabs tabs-lifted">
                        {tabs.map((segment, index) => (
                            <Fragment key={index}>
                                <input type="radio" name="puja_zone" role="tab" className="tab h-10 font-bold" aria-label={segment?.name} defaultChecked={index === 0} />
                                <div role="tabpanel" className="tab-content text-center bg-base-100 border-base-300 p-2 pt-5 md:p-5">
                                    <p className="text-xl font-bold">Number of Total Jubilees: {segment?.type?.length}</p>
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
                                            {segment?.type?.map((segment, index) => {
                                                const y = getYear(segment?.estd, params?.year);
                                                const cel= getCelebrating(y);
                                                return (
                                                    <tr key={index} className='row'>
                                                        <td>{segment?.puja_name}</td>
                                                        <td>{segment?.puja_zone === 'bhr' ? 'Bhadreswar' : 'Chandannagar'}</td>
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
                        {data && parseInt(params?.year) === new Date(data?.dates[0]?.value?.date).getFullYear() &&
                            <>
                                <input type="radio" name="puja_zone" role="tab" className="tab h-10 font-bold" aria-label="Puja Schedule" />
                                <div role="tabpanel" className="tab-content bg-base-100 border-base-300 p-4">
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
                                                {data?.dates?.map((segment, index) => {
                                                    return (
                                                        <tr key={index} className='row'>
                                                            <td>{formatDate(segment?.value?.date)}</td>
                                                            <td>{getDay(segment?.value?.date)}</td>
                                                            <td>{segment?.value?.event}</td>
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