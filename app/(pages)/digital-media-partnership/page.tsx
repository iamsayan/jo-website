import type { Metadata } from 'next'
import Layout from '@/app/components/layout';
import Section from '@/app/components/section';
import schema from "@/app/utils/schema";

export const metadata: Metadata = {
    title: 'Digital Media Partnership Programme',
    description: 'Digital Media Partnership Programme is a collaboration program for Jagadhatri Puja Commitees across Chandannagar Mankundu and Bhadreswar.',
    openGraph: {
        url: '/digital-media-partnership',
    },
    alternates: {
        canonical: '/digital-media-partnership',
    },
};

interface Feature {
    title: string;
    description: string;
}

export default function Page() {
    const jsonLd = schema({
        slug: 'digital-media-partnership',
        title: 'Digital Media Partnership Programme',
    });

    const features: Feature[] = [
        {
            title: 'Increased Brand Visibility',
            description: 'By collaborating, partners can expanding their reach to new and engaged audiences.',
        },
        {
            title: 'Content Amplification',
            description: 'Partners can get exclusive content, leading to higher engagement rates and more widespread content distribution.',
        },
        {
            title: 'Enhanced Credibility',
            description: 'Associating with reputable brands or organizations can boost credibility and trust among followers.',
        },
        {
            title: 'Access to Exclusive Content',
            description: 'Partners may gain early or exclusive access to content, promotions, or events, enhancing their appeal to followers.',
        },
        {
            title: 'Cost-Effective Marketing',
            description: 'It can reduce costs while maximizing the impact of reaching higher perks.',
        }
    ];

    return (
        <Layout title="Digital Media Partnership" jsonLd={jsonLd}>
            <Section title="Know More About Digital" description={<>Media <span className="text-yellow-500">Partnership</span></>}>
                <div className="flex flex-col gap-6 text-justify">
                    <p>Digital Media Partnership Programme is a collaboration program for Jagadhatri Puja Commitees
                        across Chandannagar Mankundu and Bhadreswar. In this partnership program, we promote the
                        registered puja committee according to their plans. We will also provide high quality content
                        for them. More than 25+ pujo committees had registered with us earlier. Already pujo committees
                        like Helapukurdhar Sarbojanin, Tematha Sarbojanin, Doibokpara Sarbojanin, Madhyanchal Sarbojanin
                        etc got benefitted with our digital media partnership program.</p>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {features.map((feature, index) => (
                            <div className="card bg-base-100 shadow-md" key={index}>
                                <div className="card-body">
                                    <h2 className="card-title">{feature.title}</h2>
                                    <p>{feature.description}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className="overflow-x-auto">
                        <table className="table text-center border">
                            <thead>
                            <tr>
                                <th>Services</th>
                                <th>Basic Package</th>
                                <th className="bg-yellow-100 relative">Premium Package <span className="ml-2 bg-red-500 text-white text-xs px-2 py-1">Best Choice</span></th>
                            </tr>
                            </thead>
                            <tbody>
                            <tr>
                                <th className="bg-gray-100">Online Promotion</th>
                                <td>✅ <br/><small>(High quality content should be provided by the Puja Committee)</small></td>
                                <td className="bg-yellow-50">✅ <br/><small>(We visit the Puja Committee and create our own content)</small></td>
                            </tr>
                            <tr>
                                <th className="bg-gray-100">Reels Videos</th>
                                <td>1 <br/><small>(Up to 30 seconds)</small></td>
                                <td className="bg-yellow-50">4 <br/><small>(Any duration)</small></td>
                            </tr>
                            <tr>
                                <th className="bg-gray-100">Audio & Video Content</th>
                                <td>❌</td>
                                <td className="bg-yellow-50">✅<br/><small>(We will provide edited high quality content)</small></td>
                            </tr>
                            <tr>
                                <th className="bg-gray-100">Live Videos (During Puja)</th>
                                <td>1</td>
                                <td className="bg-yellow-50">2</td>
                            </tr>
                            <tr>
                                <th className="bg-gray-100">Drone Shoot</th>
                                <td>❌</td>
                                <td className="bg-yellow-50">✅</td>
                            </tr>
                            <tr>
                                <th className="bg-gray-100">Package Price</th>
                                <td><del>₹799</del><span className="text-xl ml-2 font-bold">₹499</span></td>
                                <td className="bg-yellow-50"><del>₹10499</del><span className="text-xl ml-2 font-bold">₹5999</span><br/><small>(You save ₹4500)</small></td>
                            </tr>
                            <tr>
                                <th className="bg-gray-100">Click to Register</th>
                                <td>
                                    <a data-disable-nprogress={true} href="https://razorpay.com/payment-button/pl_Ony68U6SyoZEI6/view" className="btn bg-yellow-500 border-2 border-yellow-500 py-2 px-4 h-auto min-h-full rounded-md hover:bg-transparent hover:border-yellow-500 hover:text-yellow-500">Register</a>
                                </td>
                                <td className="bg-yellow-50">
                                    <a data-disable-nprogress={true} href="https://razorpay.com/payment-button/pl_Oo0wht5ntXU1gr/view" className="btn bg-yellow-500 border-2 border-yellow-500 py-2 px-4 h-auto min-h-full rounded-md hover:bg-transparent hover:border-yellow-500 hover:text-yellow-500">Register</a>
                                </td>
                            </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </Section>
        </Layout>
    );
}