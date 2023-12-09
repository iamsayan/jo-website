import Layout from '@/app/components/layout';
import Section from '@/app/components/section';

export const metadata = {
    title: 'Achievements',
    description: 'Jagadhatri Online is your online destination to visit the collection of most popular Jagadhatri Pujas of Chanannagar, Mankundu &amp; Bhadreswar. It is a platform on internet where we display the Location, Photos &amp; Videos of various Jagadhatri Pujas of Chandannagar.',
}

export default function Page() {
    return (
        <Layout title="Achievements">
            <Section title="Know More About" description={ <>Our <font color="#F4C040">Achievements</font></> } >
                <ul className="timeline timeline-snap-icon max-md:timeline-compact timeline-vertical">
                    <li>
                        <div className="timeline-middle">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="h-5 w-5 text-success"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z" clipRule="evenodd" /></svg>
                        </div>
                        <div className="timeline-start timeline-box md:text-end mb-10">
                            <time className="font-mono italic">2021</time>
                            <div className="text-lg font-black">10M Reach in 1 Year</div>
                            <div className="text-sm">
                                <p><strong>January:</strong> Published Our 2nd Edition Table Calendar and make it available to the local and International Customers.</p><p><strong>May:</strong> Completed 35000+ Followers successfully and gained 30000+ Likes. Also re-designed our website completely.</p><p><strong>July:</strong> Arranged Food for needy people in pandemic situation in our own project "Aharjo". Started blog publication on regular basis.</p><p><strong>August:</strong> Reached the Milestone of 10 million International Audience in last 1 year successfully. Also completed 3000+ Subscribers successfully on Our YouTube Channel "Jagadhatri Online".</p><p><strong>October:</strong> Completed 45000+ Followers successfully and reached to 9 lakhs people.</p><p><strong>November:</strong> Gained 13 lakhs reach in a week and 1 crore 30 lakhs reach in last 30 days.</p>
                            </div>
                        </div>
                        <hr className="bg-success"/>
                    </li>
                    <li>
                        <hr className="bg-success"/>
                        <div className="timeline-middle">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="h-5 w-5 text-success"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z" clipRule="evenodd" /></svg>
                        </div>
                        <div className="timeline-end timeline-box mb-10">
                            <time className="font-mono italic">2020</time>
                            <div className="text-lg font-black">Virtual Puja Introduced</div>
                            <div className="text-sm">
                                <p><strong>January:</strong> Published Our 1st Edition Table Calendar and make it available to the customers.</p><p><strong>March:</strong> Organized Sit and Draw competition for the 1st Time.</p><p><strong>May:</strong> Raised and Made a Donation to the Chief Minister's Relief Fund for Covid Pandemic.</p><p><strong>July:</strong> Completed 25000+ Likes successfully and gained 24950+ Followers.</p><p><strong>September:</strong> Completed 2000+ Subscribers successfully on Our YouTube Channel "Jagadhatri Online".</p><p><strong>November:</strong> Introduced Virtual Puja Programme in our own CGR Utsav App so that people can view puja from their home only to avoid Covid-19 Situation. Also arranged 3rd edition Amie Shrestho Hoimontika Somman via CGR Utsav App.</p>
                            </div></div>
                        <hr className="bg-success"/>
                    </li>
                    <li>
                        <hr className="bg-success"/>
                        <div className="timeline-middle">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="h-5 w-5 text-success"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z" clipRule="evenodd" /></svg>
                        </div>
                        <div className="timeline-start timeline-box md:text-end mb-10">
                            <time className="font-mono italic">2016</time>
                            <div className="text-lg font-black">Started Our Journey</div>
                            <div className="text-sm">
                                <p><strong>May:</strong> Created Jagadhatri Online Facebook Page by our two Co-Founder Sayan Datta and Pritam Mitra. Then we created our Official Website.</p><p><strong>July:</strong> Completed 500+ Likes successfully and gained 490+ Followers.</p><p><strong>September:</strong> Completed 1000+ Likes successfully and gained 980+ Followers. Create Our YouTube Channel "Jagadhatri Online".</p><p><strong>November:</strong> Commenced 1st Edition of Amie Shrestho Hoimontika Somman Successfully. 7 Puja Committees were the winners in Idol, Pandel and Best Puja Category.</p>
                            </div>
                        </div>
                    </li>
                </ul>
            </Section>
        </Layout>
    )
}