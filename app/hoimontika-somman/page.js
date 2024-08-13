import Layout from '@/app/components/layout';
import Section from '@/app/components/section';
import schema from "@/app/utils/schema";

export const metadata = {
    title: 'Amie Srestho Hoimantika Samman',
    description: 'The Amie Srestho Hoimantika Samman is a prestigious award that has been celebrating creativity and craftsmanship during Jagadhatri Puja in Chandannagar since 2016.',
    openGraph: {
        url: '/hoimontika-somman',
    },
    alternates: {
        canonical: '/hoimontika-somman',
    },
}

export default function Page() {
    const jsonLd = schema({
        slug: 'hoimontika-somman',
        title: 'History of Jagadhatri Puja',
    })

    return (
        <Layout title="Hoimantika Samman" jsonLd={jsonLd}>
            <Section title="Know More About Amie Srestho" description={ <>Hoimantika <span className="text-yellow-500">Somman</span></> }>
                <div className="flex flex-col gap-6 text-justify">
                    <p>The Amie Srestho Hoimantika Samman is a prestigious award that has been celebrating creativity
                        and craftsmanship during Jagadhatri Puja in Chandannagar since 2016. It is one of the most
                        significant awards given to the best pandals across the city, recognizing excellence in various
                        aspects such as decoration, theme, and artistry.</p><p>

                    The awards have contributed to a shift in how Jagadhatri Puja is celebrated in Chandannagar,
                    Mankundu and Bhadreswar, emphasizing artistic and cultural innovation in the creation of pandals and
                    idols. The initiative has not only become an integral part of Kolkata’s Jagadhatri Puja traditions
                    but also reflects the evolving cultural landscape of the festival. Each year, the awards are judged
                    by a panel of eminent personalities from various fields such as art, literature, and cinema. Winners
                    receive a unique statuette, which has evolved in design over the years, symbolizing the honor and
                    prestige of the award.</p><p>

                    In this year, the Hoimantika Samman continues to uphold its legacy, with pandals across Kolkata
                    striving to win in categories like Best Puja, Creative Excellence, and Best Artisan, among
                    others</p>
                    <div className="text-md font-bold text-center">Archives</div>
                    <div className="join join-vertical w-full">
                        <div className="collapse collapse-arrow join-item border-base-300 border">
                            <input type="radio" name="my-accordion-4"/>
                            <div className="collapse-title text-xl font-medium">2023</div>
                            <div className="collapse-content">
                                <div className="overflow-x-auto">
                                    <table className="table">
                                        <thead>
                                        <tr>
                                            <th>Prize Category</th>
                                            <th>First</th>
                                            <th>Second</th>
                                            <th>Third</th>
                                            <th>Ononnyo</th>
                                        </tr>
                                        </thead>
                                        <tbody>
                                        <tr>
                                            <th>Srestho Mukhosri</th>
                                            <td>Tematha</td>
                                            <td>Palpara<br/>Gondalpara Satghat</td>
                                            <td>Gondalpara Charmandirtala<br/>Sabinara</td>
                                            <td>--</td>
                                        </tr>
                                        <tr>
                                            <th>Srestho Sajsojja</th>
                                            <td>Kundughat Dalan</td>
                                            <td>Lalbagan Padripara<br/>Urdibazar</td>
                                            <td>Khalisani<br/>Kanailal Pally</td>
                                            <td>--</td>
                                        </tr>
                                        <tr>
                                            <th>Srestho Mondopsojja</th>
                                            <td>Uttaranchal</td>
                                            <td>Kanailal Pally<br/>Gondalpara Mansatala</td>
                                            <td>Bhadreswar Krisnapatty<br/>Doibakpara</td>
                                            <td>--</td>
                                        </tr>
                                        <tr>
                                            <th>Srestho Procession</th>
                                            <td>Boro Champatala, Yuba Sampraday</td>
                                            <td>Khalisani<br/>Gondalpara Charmanadirtala</td>
                                            <td>Boro Panchananatala<br/>Palpara</td>
                                            <td>--</td>
                                        </tr>
                                        <tr>
                                            <th>Srestho Road Light</th>
                                            <td>Barabazar</td>
                                            <td>Bidyalankar</td>
                                            <td>Kalupukur</td>
                                            <td>Madhyanchal</td>
                                        </tr>
                                        <tr>
                                            <th>JO Priyo Pujo</th>
                                            <td>Barasat Chakrabarty Para</td>
                                            <td>--</td>
                                            <td>--</td>
                                            <td>--</td>
                                        </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                        <div className="collapse collapse-arrow join-item border-base-300 border">
                            <input type="radio" name="my-accordion-4"/>
                            <div className="collapse-title text-xl font-medium">2022</div>
                            <div className="collapse-content">
                                <div className="overflow-x-auto">
                                    <table className="table">
                                        <thead>
                                        <tr>
                                            <th>Prize Category</th>
                                            <th>First</th>
                                            <th>Second</th>
                                            <th>Third</th>
                                            <th>Ononnyo</th>
                                        </tr>
                                        </thead>
                                        <tbody>
                                        <tr>
                                            <th>Srestho Mukhosri</th>
                                            <td>Palpara</td>
                                            <td>Circus Math<br/>Suksanatantala</td>
                                            <td>Mankundu<br/>Haridradanga</td>
                                            <td>--</td>
                                        </tr>
                                        <tr>
                                            <th>Srestho Sajsojja</th>
                                            <td>Urdibazar</td>
                                            <td>Kundughat Dalan<br/>Bindubasini Para</td>
                                            <td>Narua Sarkarpara<br/>Narua Boropukurdhar</td>
                                            <td>--</td>
                                        </tr>
                                        <tr>
                                            <th>Srestho Mondopsojja</th>
                                            <td>Doibakpara</td>
                                            <td>Mankundu Notunpara<br/>Rathersarak</td>
                                            <td>Gondalpara Moran Road<br/>Mahadanga Balak Sangha</td>
                                            <td>--</td>
                                        </tr>
                                        <tr>
                                            <th>Srestho Procession</th>
                                            <td>Boro Kalitala Byelane</td>
                                            <td>Rathersorok<br/>Sarishapara</td>
                                            <td>Madhyanchal<br/>Mansatala</td>
                                            <td>Barabazar<br/>Bagbazar Chowmatha<br/>Doibakpara</td>
                                        </tr>
                                        <tr>
                                            <th>JO Priyo Pujo</th>
                                            <td>Rathersarak</td>
                                            <td>--</td>
                                            <td>--</td>
                                            <td>--</td>
                                        </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                        <div className="collapse collapse-arrow join-item border-base-300 border">
                            <input type="radio" name="my-accordion-4"/>
                            <div className="collapse-title text-xl font-medium">2021</div>
                            <div className="collapse-content">
                                <table className="table">
                                    <thead>
                                    <tr>
                                        <th>Prize Category</th>
                                        <th>First</th>
                                        <th>Second</th>
                                        <th>Third</th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    <tr>
                                        <th>Srestho Mukhosri</th>
                                        <td>Bibirhat Uttaranchal</td>
                                        <td>Hatkhola Mansatala</td>
                                        <td>Barasat Banerjee Para</td>
                                    </tr>
                                    <tr>
                                        <th>Srestho Sajsojja</th>
                                        <td>Boro Taldanga</td>
                                        <td>Bagbazar Chowmatha</td>
                                        <td>Circus Math</td>
                                    </tr>
                                    <tr>
                                        <th>Srestho Mondopsojja</th>
                                        <td>Mankundu</td>
                                        <td>Ambika Atheletic Club</td>
                                        <td>Kanailal Pally</td>
                                    </tr>
                                    <tr>
                                        <th>Srestho Road Light</th>
                                        <td>Madhyanchal</td>
                                        <td>Fatakgora</td>
                                        <td>Kalupukur</td>
                                    </tr>
                                    <tr>
                                        <th>JO Priyo Pujo</th>
                                        <td>Barasat Gate</td>
                                        <td>--</td>
                                        <td>--</td>
                                    </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </Section>
        </Layout>
    )
}