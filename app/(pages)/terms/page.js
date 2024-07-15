import Layout from "@/app/components/layout";
import Section from "@/app/components/section";
import { getSingletonData } from "@/app/utils/fetch";
import schema from "@/app/utils/schema";

export const metadata = {
    title: 'Terms & Conditions',
    description: 'Please read these terms and conditions carefully before applying to become a member of Jagadhatri Online on our Website. You should understand that by applying to become a part of this Community, you agree to be bound by these terms and conditions.',
    openGraph: {
        url: '/terms',
    },
    alternates: {
        canonical: '/terms',
    },
}

export default async function Page() {
    const pageData = await getSingletonData('pages');
    const data = pageData ?? null

    const jsonLd = schema({
        slug: 'terms',
        title: 'Terms & Conditions',
    })

    return (
        <Layout title="Terms & Conditions" jsonLd={jsonLd}>
            <Section title="Read Our" description={<>Terms & <font color="#F4C040">Conditions</font></>}>
                <div className="flex flex-col gap-6 text-justify"
                     dangerouslySetInnerHTML={{__html: data?.terms}}></div>
            </Section>
        </Layout>
    )
}