import { GoogleMapsEmbed } from '@next/third-parties/google'
import Contact from "@/app/components/contact";
import Layout from "@/app/components/layout";
import Section from "@/app/components/section";
import schema from "@/app/utils/schema";

export const metadata = {
    title: 'Contact Us',
    description: 'Jagadhatri Online is your online destination to visit the collection of most popular Jagadhatri Pujas of Chanannagar, Mankundu &amp; Bhadreswar. It is a platform on internet where we display the Location, Photos &amp; Videos of various Jagadhatri Pujas of Chandannagar.',
}

export default function Page() {
    const jsonLd = schema({
        slug: 'about-us',
        title: 'About Us',
    })

    return (
        <Layout title="Contact Us" jsonLd={jsonLd}>
            <Section title="need any help?" description={ <>Contact <font color="#F4C040">Us</font></> }>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4">
                    <div><Contact /></div>
                    <GoogleMapsEmbed
                        apiKey={process.env.GOOGLE_MAP_API_KEY}
                        height={400}
                        width="100%"
                        mode="place"
                        zoom={18}
                        q="Chandannagar,Hooghly,West+Bengal,712136"
                    />
                </div>
            </Section>
        </Layout>
    )
}