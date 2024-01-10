import Link from 'next/link';
import Layout from '@/app/components/layout';
import Section from '@/app/components/section';
import { getSingletonData } from "@/app/utils/fetch";
import schema from "@/app/utils/schema";

export const metadata = {
    title: 'Jagadhatri Puja Jubilee, Pre Jubilee List, Schedule',
    description: 'Jagadhatri Online is your online destination to visit the collection of most popular Jagadhatri Pujas of Chanannagar, Mankundu &amp; Bhadreswar. It is a platform on internet where we display the Location, Photos &amp; Videos of various Jagadhatri Pujas of Chandannagar.',
}

export default async function Page() {
    const siteData = await getSingletonData('home');
    const data = siteData ?? null

    const currentYear = new Date().getFullYear();
    const uptoYear = data?.dates[0]?.value?.date ? new Date(data?.dates[0]?.value?.date).getFullYear() : currentYear;
    const yearsArray = [];

    for (let year = currentYear-10; year <= uptoYear; year++) {
        yearsArray.push(year);
    }
    yearsArray.reverse();

    const jsonLd = schema({
        slug: 'jagadhatri-puja',
        title: 'Puja Schedule',
    })

    return (
        <Layout title="Puja Schedule">
            <Section title="Know More About" description={ <>Puja <font color="#F4C040">Schedule</font></> } >
                <div className="flex flex-col gap-6 text-justify">
                    <p>Jagadhatri Puja, an esteemed festival in certain regions, extends across five joyous days, commencing from Sasthi and culminating on Dashami. The main observance traditionally takes place on the seventh day of the festivities. Much akin to the grandeur of Kolkata's revered Durga Puja and Barasat's revered Kali Puja, Chandannagar stands out for its opulent celebrations and cultural exuberance during the Jagadhatri Puja. The city comes alive with vibrant decorations, illuminations, and fervent devotional activities, attracting both locals and visitors alike, creating an atmosphere of religious significance and communal harmony.</p>
                    <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-6 gap-4">
                        {yearsArray.map((year, index) => (
                            <Link key={index} href={`/jagadhatri-puja/${year}`} className="bg-gray-200 p-2 text-center rounded border">Jagadhatri Puja {year}</Link>
                        ))}
                    </div>
                </div>
            </Section>
        </Layout>
    )
}
