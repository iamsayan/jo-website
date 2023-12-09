import { Fragment } from 'react';
import { notFound } from 'next/navigation';
import Layout from "@/app/components/layout";
import Section from "@/app/components/section";

export async function generateMetadata({ params }) {
    return {
        title: `Jagadhatri Puja ${params?.year} Jubilee, Pre Jubilee List, Schedule`,
        description: `Here are the Jubilee & Pre Jubilee List, Schedule, Puja Updates and Latest Information about Jagadhatri Puja ${params?.year} the great festival of Chandannagar.`,
    }
}

async function getCollectionData() {
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
    if ( params?.year < 2000 ) {
        notFound()
    }
    return (
        <Layout title="Puja Committee List">
            <Section title="Know More about" description={ <>Puja Schedule <font color="#F4C040">{params?.year}</font></> }>
                <div className="flex flex-col gap-6 text-justify">
                    <p>The number of community pujas in Chandannagar, Bhadreswar and Champdany Municipal areas crosses 190 mark. Of these, 176 Puja committees in different localities in Chandannagar and Bhadreswar are affiliated to the Chandannagar Central Jagadhatri Puja Committee (CCJPC). The Central committee renders all possible assistance to its constituents in getting permissions and clearances for holding Puja. The immersion procession is really memorable and enjoyable sight to witness which lakh of people throng in Chandannagar from far and near. The beautiful decorated tall images loaded on trucks are taken around the city in a procession.</p>
                </div>
            </Section>
        </Layout>
    )
}