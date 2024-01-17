import { Fragment } from "react";
import Layout from "@/app/components/layout";
import Section from "@/app/components/section";
import { getCollectionData } from "@/app/utils/fetch";
import { jubilees, preJubilees, getYear, getCelebrating, getDateByIndex } from "@/app/utils/functions";
import schema from "@/app/utils/schema";

export function generateMetadata() {
    return {
        title: 'Jagadhatri Puja Committee List',
        description: 'Here is the full list of Chadannagar Jagadhatri Puja Committees registered under Chandannagar Central Jagadhatri Puja Committee.',
        openGraph: {
            url: '/puja-committee-list',
        },
        alternates: {
            canonical: '/puja-committee-list',
        },
    }
}

export default async function Page() {
    const pujaData = await getCollectionData('pujas', {
        sort: { 'puja_name': 1 }
    })

    const data = pujaData ?? []

    const cgr = data?.filter((data) => { return data?.puja_zone === 'cgr' });
    const bhr = data?.filter((data) => { return data?.puja_zone === 'bhr' });

    const filterData = (zone, cel) => {
        return zone.filter((data) => {
            return cel.includes(getYear(data?.estd))
        });
    }

    const zones = [
        {
            name: 'Chandannagar',
            zone: cgr
        },
        {
            name: 'Bhadreswar',
            zone: bhr
        }
    ]

    const jsonLd = schema({
        slug: 'puja-committee-list',
        title: 'Jagadhatri Puja Committee List',
    })

    return (
        <Layout title="Puja Committee List" jsonLd={jsonLd}>
            <Section title="View All Jagadhatri" description={ <>Puja Committee <font color="#F4C040">List</font></> }>
                <div className="flex flex-col gap-6 text-justify">
                    <p>The number of community pujas in Chandannagar, Bhadreswar and Champdany Municipal areas crosses 190 mark. Of these, {data.length} Puja committees in different localities in Chandannagar and Bhadreswar are affiliated to the Chandannagar Central Jagadhatri Puja Committee (CCJPC). The Central committee renders all possible assistance to its constituents in getting permissions and clearances for holding Puja. The immersion procession is really memorable and enjoyable sight to witness which lakh of people throng in Chandannagar from far and near. The beautiful decorated tall images loaded on trucks are taken around the city in a procession.</p>
                </div>
                <div className="overflow-x-auto mt-6">
                    <div role="tablist" className="tabs tabs-lifted">
                        {zones?.map((item, index) => (
                            <Fragment key={index}>
                                <input type="radio" name="puja_zone" role="tab" className="tab h-10 font-bold" aria-label={item?.name} defaultChecked={index === 0} />
                                <div role="tabpanel" className="tab-content text-center bg-base-100 border-base-300 p-2 pt-5 md:p-5">
                                    <p className="text-xl font-bold">List of Jagadhatri Puja Committees</p>
                                    <p className="font-bold">Total {item?.zone.length} Puja Committees</p>
                                    <p className="font-bold">Total Jubilee: {filterData(item?.zone, jubilees)?.length} & Total Pre – Jubilee: {filterData(item?.zone, preJubilees)?.length}</p>
                                    <div className="overflow-x-auto mt-5">
                                        <table className="table text-center table-zebdra">
                                            <thead>
                                            <tr>
                                                <th>Puja Name</th>
                                                <th>Years</th>
                                                <th>Celebrating</th>
                                            </tr>
                                            </thead>
                                            <tbody>
                                            {item?.zone.map((item, index) => {
                                                const y = getYear(item?.estd);
                                                const cel= getCelebrating(y);
                                                return (
                                                    <tr key={index} className={`${ cel != '--' ? cel.replaceAll(' ', '-').toLowerCase() + ' row' : 'row'}`}>
                                                        <td>{item?.puja_name}</td>
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
                        <input type="radio" name="puja_zone" role="tab" className="tab h-10 font-bold" aria-label="Others" />
                        <div role="tabpanel" className="tab-content bg-base-100 border-base-300 p-4">
                            Others puja committees are requested to send their puja info in details to us via this email id cgrjagadhatripuja@gmail.com. We will add your puja to our website within 24 hours.
                        </div>
                    </div>
                </div>
            </Section>
        </Layout>
    )
}