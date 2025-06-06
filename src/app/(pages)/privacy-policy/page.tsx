import type { Metadata } from 'next'
import MainLayout from "@/components/main-layout";
import Section from "@/components/section";
import schema from "@/utils/schema";
import { getModel } from "@/utils/fetch";
import { metadata as metadataSchema } from "@/app/layout";

export const metadata: Metadata = {
    title: 'Privacy Policy',
    description: 'See how Jagadhatri Online™ protects your data. Your trust is our top priority during puja season and beyond.',
    openGraph: {
        ...metadataSchema.openGraph,
        url: '/privacy-policy',
    },
    alternates: {
        canonical: '/privacy-policy',
    },
}

export default async function Page() {
    const pageData = await getModel('pages', { type: 'item' });
    const data = pageData ?? null

    const jsonLd = schema({
        path: 'privacy-policy',
        title: 'Privacy Policy',
    })

    return (
        <MainLayout title="Privacy Policy" jsonLd={jsonLd}>
            <Section title="Read Our" description="Privacy Policy">
                <div className="flex flex-col gap-6 text-justify" dangerouslySetInnerHTML={{__html: data?.privacy}}></div>
            </Section>
        </MainLayout>
    )
}