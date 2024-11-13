import type { Metadata } from 'next'
import Link from 'next/link';
import MainLayout from '@/components/main-layout';
import Section from '@/components/section';
import { getSingletonData } from "@/utils/fetch";
import schema from "@/utils/schema";

export const metadata: Metadata = {
    title: 'Jagadhatri Puja Jubilee, Pre Jubilee List, Schedule',
    description: 'Jagadhatri Online is your online destination to visit the collection of most popular Jagadhatri Pujas of Chanannagar, Mankundu &amp; Bhadreswar. It is a platform on internet where we display the Location, Photos &amp; Videos of various Jagadhatri Pujas of Chandannagar.',
    openGraph: {
        url: '/jagadhatri-puja',
    },
    alternates: {
        canonical: '/jagadhatri-puja',
    },
};

export default async function Page() {
    const siteData = await getSingletonData('information');
    const data = siteData ?? null;

    const currentYear = new Date().getFullYear();
    const uptoYear = data?.dates[0]?.date ? new Date(data?.dates[0]?.date).getFullYear() : currentYear;
    const yearsArray: number[] = [];

    for (let year = uptoYear - 12; year <= uptoYear - 1; year++) {
        yearsArray.push(year);
    }
    yearsArray.reverse();

    const jsonLd = schema({
        slug: 'jagadhatri-puja',
        title: 'Puja Schedule',
    });

    return (
        <MainLayout title="Puja Schedule" jsonLd={jsonLd}>
            <Section title="Know More About" description={<>Puja <span className="text-yellow-500">Schedule</span></>}>
                <div className="flex flex-col gap-6 text-justify">
                    <p>Jagadhatri Puja, an esteemed festival in certain regions, extends across five joyous days,
                        commencing from Sasthi and culminating on Dashami. The main observance traditionally takes place
                        on the seventh day of the festivities. Much akin to the grandeur of Kolkata's revered Durga Puja
                        and Barasat's revered Kali Puja, Chandannagar stands out for its opulent celebrations and
                        cultural exuberance during the Jagadhatri Puja. The city comes alive with vibrant decorations,
                        illuminations, and fervent devotional activities, attracting both locals and visitors alike,
                        creating an atmosphere of religious significance and communal harmony.</p>
                    <p>In Chandannagar, Jagadhatri puja is celebrated as the annual festival of its own, surpassing the
                        grandeur of Durga Puja. Acclaimed for its show of lights, during the four days of the Puja the
                        entire town decks up beautifully as food stalls dot its streets and people throng to the
                        pandals. On the last day of Dashami, all the effigies are paraded throughout the town in a
                        night-long procession as the town showcases its skillful craftsmanship of lights and boasts its
                        age-old tradition. The entire town celebrates for five days as monotonous every day routine
                        comes to a halt. As birds turn to their nests when darkness kisses the ground, similarly the
                        town beckons to all who have grown up in its nooks and crannies and migrated to different parts
                        of the country or outside. During these four days as people return to their hometown to
                        celebrate with their loved ones, the entire town state lights up in the warmth and glow of
                        shared joy.</p>
                    <div className="flex items-center justify-center">
                        <Link href={`/jagadhatri-puja/${uptoYear}`}
                            className="btn border-2 uppercase py-3.5 px-6 h-auto min-h-full rounded-md bg-transparent border-yellow-500 text-yellow-500 hover:bg-transparent hover:border-yellow-500 hover:text-yellow-500">
                            View Jagadhatri Puja {uptoYear} Details
                        </Link>
                    </div>
                    <div className="text-md font-bold text-center">Old Archives</div>
                    <div className="grid grid-cols-3 md:grid-cols-6 xl:grid-cols-12 gap-4">
                        {yearsArray.map((year, index) => (
                            <Link key={index} href={`/jagadhatri-puja/${year}`}
                                className="bg-gray-50 hover:bg-gray-100 p-3 text-center border rounded-md border-neutral-200">
                                {year}
                            </Link>
                        ))}
                    </div>
                </div>
            </Section>
        </MainLayout>
    );
}
