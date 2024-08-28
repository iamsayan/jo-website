import type { Metadata } from 'next'
import Layout from "@/app/components/layout";
import Section from "@/app/components/section";
import schema from "@/app/utils/schema";
import { getSingletonData } from "@/app/utils/fetch";

export const metadata: Metadata = {
    title: 'Privacy Policy',
    description: 'We value your trust in providing us your Personal Information, thus we are striving to use commercially acceptable means of protecting it. But remember that no method of transmission over the internet, or method of electronic storage is 100% secure and reliable, and we cannot guarantee its absolute security.',
    openGraph: {
        url: '/privacy-policy',
    },
    alternates: {
        canonical: '/privacy-policy',
    },
}

export default async function Page() {
    const pageData = await getSingletonData('pages');
    const data = pageData ?? null

    const jsonLd = schema({
        slug: 'privacy-policy',
        title: 'Privacy Policy',
    })

    return (
        <Layout title="Privacy Policy" jsonLd={jsonLd}>
            <Section title="Read Our" description={ <>Privacy <span className="text-yellow-500">Policy</span></> }>
                <div className="flex flex-col gap-6 text-justify" dangerouslySetInnerHTML={{__html: data?.privacy}}></div>
            </Section>
        </Layout>
    )
}