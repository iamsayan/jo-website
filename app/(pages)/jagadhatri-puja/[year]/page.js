import { Fragment } from "react";
import Layout from "./../../components/layout";
import Section from "./../../components/section";
import Link from "next/link";

export const metadata = {
    title: 'Jagadhatri Puja Committee List',
    description: 'Here is the full list of Chadannagar Jagadhatri Puja Committees registered under Chandannagar Central Jagadhatri Puja Committee.',
}

async function getData() {
    const res = await fetch('https://services.jagadhatrionline.co.in/api/collections/get/pujas', {
        method: "POST",
        headers: {
            "Content-type": "application/json",
            "Authorization": "Bearer 4fd664b736d2798feb3f965480e31b",
        },
        body: JSON.stringify({
            simple: true,
            hide_info: true,
            cache: false,
            sort: {
                puja_name: 1
            }
        }),
        next: { revalidate: 10 },
    })

    if (!res.ok) {
        throw new Error('Failed to fetch data')
    }

    return res.json()
}

export default function Page({ params }) {
    return (
        <Layout title="Puja Committee List">
            <Section title="View All Jagadhatri" description={ <>Puja Committee <font color="#F4C040">List</font></> }>
                <div className="flex flex-col gap-6 text-justify">
                    <p>The number of community pujas in Chandannagar, Bhadreswar and Champdany Municipal areas crosses 190 mark. Of these, 176 Puja committees in different localities in Chandannagar and Bhadreswar are affiliated to the Chandannagar Central Jagadhatri Puja Committee (CCJPC). The Central committee renders all possible assistance to its constituents in getting permissions and clearances for holding Puja. The immersion procession is really memorable and enjoyable sight to witness which lakh of people throng in Chandannagar from far and near. The beautiful decorated tall images loaded on trucks are taken around the city in a procession.</p>
                </div>
            </Section>
        </Layout>
    )
}