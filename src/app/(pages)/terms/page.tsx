import type { Metadata } from 'next'
import MainLayout from "@/components/main-layout";
import Section from "@/components/section";
import { getModel } from "@/utils/fetch";
import schema from "@/utils/schema";
import { metadata as metadataSchema } from "@/app/layout";
export const metadata: Metadata = {
    title: 'Terms & Conditions',
    description: 'Please read these terms and conditions carefully before applying to become a member of Jagadhatri Online on our Website. You should understand that by applying to become a part of this Community, you agree to be bound by these terms and conditions.',
    openGraph: {
        ...metadataSchema.openGraph,
        url: '/terms',
    },
    alternates: {
        canonical: '/terms',
    },
}

export default async function Page() {
    const pageData = await getModel('pages', { type: 'item' });
    const data = pageData ?? null

    const jsonLd = schema({
        path: 'terms',
        title: 'Terms & Conditions',
    })

    return (
        <MainLayout title="Terms & Conditions" jsonLd={jsonLd}>
            <Section title="Read Our" description="Terms & Conditions">
                <div className="flex flex-col gap-6 text-justify"
                     dangerouslySetInnerHTML={{__html: data?.terms}}></div>
            </Section>
        </MainLayout>
    )
}