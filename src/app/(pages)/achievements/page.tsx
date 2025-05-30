import type { Metadata } from 'next'
import MainLayout from '@/components/main-layout';
import Section from '@/components/section';
import schema from "@/utils/schema";
import { getModel } from "@/utils/fetch";
import { metadata as metadataSchema } from "@/app/layout";
export const metadata: Metadata = {
    title: 'Achievements',
    description: 'Celebrating a decade of digital service—view our milestones, media features, and honors as Chandannagar’s official online puja archive.',
    openGraph: {
        ...metadataSchema.openGraph,
        url: '/achievements',
    },
    alternates: {
        canonical: '/achievements',
    },
}

export default async function Page() {
    const siteData = await getModel('achievements', { type: 'item' });
    const data = siteData ?? null

    const jsonLd = schema({
        path: 'achievements',
        title: 'Achievements',
    })

    return (
        <MainLayout title="Achievements" jsonLd={jsonLd}>
            <Section title="Know More About" description="The Journey So Far">
                <div className="flex flex-col gap-4 text-justify mb-4">
                    <p>From humble beginnings in 2016, Jagadhatri Online has blossomed into one of the most trusted and widely recognized digital platforms dedicated to celebrating and promoting Jagadhatri Puja. Over the past decade, our journey has been marked by passion, innovation, and an unwavering commitment to our community. We have consistently evolved to meet the changing needs of devotees, organizers, and cultural enthusiasts alike—bridging tradition with technology, and local celebrations with a global audience.</p>
                    <p>Through tireless efforts and the support of our vibrant community, we’ve achieved remarkable milestones—from pioneering virtual puja experiences and launching mobile apps to organizing prestigious award ceremonies and expanding our digital reach beyond borders. Each accomplishment represents a step toward preserving our rich cultural heritage while embracing the possibilities of the digital age. Here’s a snapshot of some of our proudest and most impactful achievements along this incredible journey:</p>
                </div>
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
                                <time className="font-mono italic">{item?.year}</time>
                                <div className="text-lg font-bold text-green-600">{item?.title}</div>
                                <div className="text-sm leading-6" dangerouslySetInnerHTML={{__html: item?.details}}></div>
                            </div>
                            {index !== data?.data?.length-1 && <hr className="bg-success"/>}
                        </li>
                    ))}
                </ul>
            </Section>
        </MainLayout>
    )
}