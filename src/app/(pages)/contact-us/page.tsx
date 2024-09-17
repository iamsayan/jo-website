import type { Metadata } from 'next'
import { GoogleMapsEmbed } from '@next/third-parties/google'
import Contact from "@/components/contact";
import MainLayout from "@/components/main-layout";
import Section from "@/components/section";
import schema from "@/utils/schema";

export const metadata: Metadata = {
    title: 'Contact Us',
    description: 'Jagadhatri Online is your online destination to visit the collection of most popular Jagadhatri Pujas of Chanannagar, Mankundu &amp; Bhadreswar. It is a platform on internet where we display the Location, Photos &amp; Videos of various Jagadhatri Pujas of Chandannagar.',
    openGraph: {
        url: '/contact-us',
    },
    alternates: {
        canonical: '/contact-us',
    },
}

export default function Page() {
    const jsonLd = schema({
        slug: 'about-us',
        title: 'About Us',
    })

    return (
        <MainLayout title="Contact Us" jsonLd={jsonLd}>
            <Section title="need any help?" description={ <>Contact <span className="text-yellow-500">Us</span></> }>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4">
                    <div><Contact /></div>
                    <GoogleMapsEmbed
                        apiKey={process.env.GOOGLE_MAP_API_KEY || ''}
                        height={400}
                        width="100%"
                        mode="place"
                        zoom="18"
                        q="Chandannagar,Hooghly,West+Bengal,712136"
                    />
                </div>
            </Section>
        </MainLayout>
    )
}