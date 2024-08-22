import Layout from '@/app/components/layout';
import Section from '@/app/components/section';
import schema from "@/app/utils/schema";
import RazorpayButton from "@/app/components/razorpay-button";

export const metadata = {
    title: 'Digital Media Partnership Programme',
    description: 'Digital Media Partnership Programme is a collaboration program for Jagadhatri Puja Commitees across Chandannagar Mankundu and Bhadreswar.',
    openGraph: {
        url: '/digital-media-partnership',
    },
    alternates: {
        canonical: '/digital-media-partnership',
    },
}

export default function Page() {
    const jsonLd = schema({
        slug: 'digital-media-partnership',
        title: 'Digital Media Partnership Programme',
    })

    const features = [
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
    ]

    return (
        <Layout title="Digital Media Partnership" jsonLd={jsonLd}>
            <Section title="Know More About" description={ <>Digigtal Media <span className="text-yellow-500">Partnership</span></> }>
                <div className="flex flex-col gap-6 text-justify">
                    <p>Digital Media Partnership Programme is a collaboration program for Jagadhatri Puja Commitees
                        across Chandannagar Mankundu and Bhadreswar. In this partnership program, we promote the
                        registered puja committee according to threir plans. We will also provide high quality content
                        for them. More than 25+ pujo committees had registered with us earlier. Already pujo committees
                        like Helapukurdhar Sarbojanin, Tematha Sarbojanin, Doibokpara Sarbojanin, Madhyanchal Sarbojanin
                        etc got benifited with our digital media partnership program.</p>
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
                        <table className="table text-center">
                            <thead>
                            <tr>
                                <th>Services</th>
                                <th>Basic Package</th>
                                <th>Premium Package</th>
                            </tr>
                            </thead>
                            <tbody>
                            <tr>
                                <th>Online Promotion</th>
                                <td>✅ <br/><small>(High quality content should be provided by the Puja
                                    Committee)</small></td>
                                <td>✅ <br/><small>(We visit the Puja Committee and create our own content)</small></td>
                            </tr>
                            <tr>
                                <th>Reels Videos</th>
                                <td>1 <br/><small>(up to 30 seconds)</small></td>
                                <td>4 <br/><small>(any duration)</small></td>
                            </tr>
                            <tr>
                                <th>Audio & Video Content</th>
                                <td>❌</td>
                                <td>✅</td>
                            </tr>
                            <tr>
                                <th>Live Videos (During Puja)</th>
                                <td>1</td>
                                <td>2</td>
                            </tr>
                            <tr>
                                <th>Drone Shoot</th>
                                <td>❌</td>
                                <td>✅</td>
                            </tr>
                            <tr>
                                <th>360° Virtual Tours</th>
                                <td>❌</td>
                                <td>✅</td>
                            </tr>
                            <tr>
                                <th>Price</th>
                                <td>₹500</td>
                                <td>₹5000</td>
                            </tr>
                            <tr>
                                <th></th>
                                <td>
                                    <RazorpayButton buttonId="pl_Ony68U6SyoZEI6" />
                                </td>
                                <td>
                                    {/*<RazorpayButton buttonId="pl_Ony68U6SyoZEI6" />*/}
                                </td>
                            </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </Section>
        </Layout>
    )
}