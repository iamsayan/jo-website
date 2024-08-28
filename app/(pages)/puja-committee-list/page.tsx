import { Fragment } from 'react';
import MainLayout from "@/app/components/main-layout";
import Section from "@/app/components/section";
import { getCollectionData } from "@/app/utils/fetch";
import { jubilees, preJubilees, getYear, getCelebrating, getUrlSlug } from "@/app/utils/functions";
import schema from "@/app/utils/schema";
import Link from "next/link";

// Define types for data and features
interface PujaData {
    _id: string;
    puja_name: string;
    puja_zone: string;
    estd: string;
}

interface Zone {
    name: string;
    zone: PujaData[];
}

export const revalidate = 3600;

export function generateMetadata() {
    return {
        title: 'Jagadhatri Puja Committee List',
        description: 'Here is the full list of Chandannagar Jagadhatri Puja Committees registered under Chandannagar Central Jagadhatri Puja Committee.',
        openGraph: {
            url: '/puja-committee-list',
        },
        alternates: {
            canonical: '/puja-committee-list',
        },
    };
}

export default async function Page() {
    const pujaData = await getCollectionData('pujas', {
        sort: { 'puja_name': 1 }
    });

    const data = pujaData ?? [];

    const cgr = data.filter((data: any) => data?.puja_zone === 'cgr');
    const bhr = data.filter((data: any) => data?.puja_zone === 'bhr');

    const filterData = (zone: any, cel: any) => {
        return zone.filter((data: any) => {
            return cel.includes(Number(getYear(data?.estd)));
        });
    }

    const zones: Zone[] = [
        {
            name: 'Chandannagar',
            zone: cgr
        },
        {
            name: 'Bhadreswar',
            zone: bhr
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
                    <p>The number of community pujas in Chandannagar, Bhadreswar and Champdany Municipal areas crosses 190 mark. Of these, {data.length} Puja committees in different localities in Chandannagar and Bhadreswar are affiliated to the Chandannagar Central Jagadhatri Puja Committee (CCJPC). The Central committee renders all possible assistance to its constituents in getting permissions and clearances for holding Puja. The immersion procession is really memorable and enjoyable sight to witness which lakh of people throng in Chandannagar from far and near. The beautiful decorated tall images loaded on trucks are taken around the city in a procession.</p>
                </div>
                <div className="overflow-x-auto mt-6">
                    <div role="tablist" className="tabs tabs-lifted">
                        {zones?.map((item, index) => (
                            <Fragment key={index}>
                                <input type="radio" name="puja_zone" role="tab" className="tab h-10 font-bold whitespace-nowrap checked:!bg-gray-50" aria-label={item?.name} defaultChecked={index === 0} />
                                <div role="tabpanel" className="tab-content text-center bg-gray-50 border-base-300 p-2 pt-5 md:p-5">
                                    <p className="text-xl font-bold">List of Jagadhatri Puja Committees</p>
                                    <p className="font-bold">Total {item?.zone.length} Puja Committees</p>
                                    <p className="font-bold">Total Jubilee: {filterData(item?.zone, jubilees)?.length} & Total Pre – Jubilee: {filterData(item?.zone, preJubilees)?.length}</p>
                                    <div className="overflow-x-auto mt-5">
                                        <table className="table text-center table-zebra">
                                            <thead>
                                            <tr>
                                                <th>Sl. No.</th>
                                                <th>Puja Committee Name</th>
                                                <th>Years</th>
                                                <th>Celebrating (in {new Date().getFullYear()})</th>
                                                <th>Details</th>
                                            </tr>
                                            </thead>
                                            <tbody>
                                            {item?.zone.map((item, index) => {
                                                const y = getYear(item?.estd);
                                                const cel = getCelebrating(y);
                                                return (
                                                    <tr key={index} className={`${ cel !== '--' ? cel.replaceAll(' ', '-').toLowerCase() + ' row' : 'row'}`}>
                                                        <td>{index + 1}</td>
                                                        <td>{item?.puja_name}</td>
                                                        <td>{y}</td>
                                                        <td>{cel}</td>
                                                        <th className="text-blue-800">
                                                            <Link href={`/puja/${getUrlSlug(item?.puja_name)}/${item?._id}`}>
                                                                <button className="btn btn-ghost btn-xs">View</button>
                                                            </Link>
                                                        </th>
                                                    </tr>
                                                );
                                            })}
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </Fragment>
                        ))}
                        <input type="radio" name="puja_zone" role="tab" className="tab h-10 font-bold whitespace-nowrap checked:!bg-gray-50" aria-label="Others" />
                        <div role="tabpanel" className="tab-content bg-gray-50 border-base-300 p-4">
                            Others puja committees are requested to send their puja info in details to us via this email id cgrjagadhatripuja@gmail.com. We will add your puja to our website within 24 hours.
                        </div>
                    </div>
                </div>
            </Section>
        </MainLayout>
    );
}