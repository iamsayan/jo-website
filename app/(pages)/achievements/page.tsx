import type { Metadata } from 'next'
import Layout from '@/app/components/layout';
import Section from '@/app/components/section';
import schema from "@/app/utils/schema";
import { getSingletonData } from "@/app/utils/fetch";

export const metadata: Metadata = {
    title: 'Achievements',
    description: 'Jagadhatri Online is your online destination to visit the collection of most popular Jagadhatri Pujas of Chanannagar, Mankundu &amp; Bhadreswar. It is a platform on internet where we display the Location, Photos &amp; Videos of various Jagadhatri Pujas of Chandannagar.',
    openGraph: {
        url: '/achievements',
    },
    alternates: {
        canonical: '/achievements',
    },
}

export default async function Page() {
    const siteData = await getSingletonData('achievements');
    const data = siteData ?? null

    const jsonLd = schema({
        slug: 'achievements',
        title: 'Achievements',
    })

    return (
        <Layout title="Achievements" jsonLd={jsonLd}>
            <Section title="Know More About" description={ <>Our <span className="text-yellow-500">Achievements</span></> } >
                <ul className="timeline timeline-snap-icon max-md:timeline-compact timeline-vertical">
                    {data && data?.data?.map((item: any, index: number) => (
                        <li key={index}>
                            <div className="timeline-middle">
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor"
                                     className="size-5 text-success">
                                    <path fillRule="evenodd"
                                          d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z"
                                          clipRule="evenodd"/>
                                </svg>
                            </div>
                            <div className={`flex flex-col gap-2 timeline-box ${index % 2 !== 0 ? 'timeline-start md:text-end' : 'timeline-end md:text-start'}`}>
                                <time className="font-mono italic">{item?.value?.year}</time>
                                <div className="text-lg font-bold text-green-600">{item?.value?.title}</div>
                                <div className="text-sm leading-6" dangerouslySetInnerHTML={{__html: item?.value?.details}}></div>
                            </div>
                            {index !== data?.data?.length-1 && <hr className="bg-success"/>}
                        </li>
                    ))}
                </ul>
            </Section>
        </Layout>
    )
}