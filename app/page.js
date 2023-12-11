import Link from 'next/link';
import Image from 'next/image'
import Main from '@/app/components/main'
import Section from "@/app/components/section";
import CountdownTimer from "@/app/components/countdown-timer";
import { FaHistory, FaImages, FaYoutube, FaLocationArrow } from "react-icons/fa";
import { formatDate, getDateByIndex, shuffle } from "@/app/utils/functions";
import { paytoneOne, hind } from "@/app/fonts";
import { getSingletonData } from "@/app/utils/fetch";
import YouTube from "@/app/components/youtube";
import bg from '../public/bg.jpg'

export default async function Home() {
    const siteData = await getSingletonData('home');
    const data = siteData ?? null
    const year = getDateByIndex(data, 0).getFullYear()
    const curYear = new Date().getFullYear()
    const btnYear = curYear > year ? curYear : year
    const videos = shuffle(data?.videos ?? [])

    const items = [
        {
            title: 'History',
            description: 'When the entire Bengal, nay India, was under the British rule, inspite of being under the French',
            icon: <FaHistory className="h-6 w-6 sm:h-8 sm:w-8 md:h-10 md:w-10 text-yellow-500" />,
            link: '/puja-history'
        },
        {
            title: 'Gallery',
            description: 'Latest Online Photo Gallery for Chandannagar, Mankundu and Bhadreswar Jagadhatri Puja.',
            icon: <FaImages className="h-6 w-6 sm:h-8 sm:w-8 md:h-10 md:w-10 text-yellow-500" />,
            link: 'https://www.facebook.com/JagadhatriOnlineOfficial/photos/'
        },
        {
            title: 'Videos',
            description: 'Here are the latest Online Video Gallery for Chandannagar Jagadhatri Puja.',
            icon: <FaYoutube className="h-6 w-6 sm:h-8 sm:w-8 md:h-10 md:w-10 text-yellow-500" />,
            link: 'https://www.youtube.com/c/JagadhatriOnline'
        },
        {
            title: 'Location',
            description: 'Explore the Grand Festival of Chandannagar with CGR Utsav Android App.',
            icon: <FaLocationArrow className="h-6 w-6 sm:h-8 sm:w-8 md:h-10 md:w-10 text-yellow-500" />,
            link: 'https://play.google.com/store/apps/details?id=com.cgr.utsav',
        }
    ]

    const jsonLd = {
        "@context": "https://schema.org",
        "@graph": [
            {
                "@type": "Organization",
                "@id": "https://www.jagadhatrionline.co.in/#organization",
                "name": "Jagadhatri Online",
                "sameAs": [
                    "https://www.facebook.com/JagadhatriOnlineOfficial/",
                    "https://twitter.com/JagadhatriLive"
                ]
            },
            {
                "@type": "WebSite",
                "@id": "https://www.jagadhatrionline.co.in/#website",
                "url": "https://www.jagadhatrionline.co.in",
                "name": "Jagadhatri Online",
                "publisher": {
                    "@id": "https://www.jagadhatrionline.co.in/#organization"
                },
                "inLanguage": "en-US"
            },
            {
                "@type": "WebPage",
                "@id": `https://www.jagadhatrionline.co.in#webpage`,
                "url": `https://www.jagadhatrionline.co.in`,
                "name": "Jagadhatri Online | the #1 Puja Portal for Chandannagar Jagadhatri Puja",
                "isPartOf": {
                    "@id": "https://www.jagadhatrionline.co.in/#website"
                },
                "inLanguage": "en-US"
            }
        ]
    }

    return (
        <Main jsonLd={jsonLd}>
            <div className="hero min-h-full lg:min-h-screen" style={{backgroundImage: `url(${bg.src})`}}>
            {/*<div className="relative min-h-full lg:min-h-screen flex items-center justify-center w-full">*/}
            {/*    <div className="absolute inset-0 z-0">*/}
            {/*        <iframe className="w-full h-full" src="https://www.youtube.com/embed/fd-_rr5YWc8?autoplay=1&loop=1&controls=0&mute=1" frameBorder="0" allowFullScreen></iframe>*/}
            {/*        <div className="absolute inset-0 bg-black opacity-50"></div>*/}
            {/*    </div>*/}
                <div className="hero-overlay bg-opacity-60"></div>
                <div className="hero-content text-center text-white-content text-white p-0 z-2">
                    <div className="pt-36 pb-28">
                        <h1 className={ `mb-3 text-2xl md:text-4xl lg:text-6xl ${paytoneOne.className}` }>CHANDANNAGAR <br /> JAGADHATRI PUJA</h1>
                        <p className="mb-8">Explore the Grand Festival of Chandannagar.</p>
                        <Link href={`/jagadhatri-puja/${year}`} className="btn bg-yellow-500 border-0 uppercase py-3.5 px-5 h-auto min-h-full rounded-md">Jagadhatri Puja {btnYear}</Link>
                    </div>
                </div>
            </div>
            <Section className="bg-gray-100" title="Welcome to the Online Puja Portal" description={ <>Jagadhatri <font color="#F4C040">Online</font></> }>
                <div className="flex flex-col gap-6 text-center">
                    <p>
                      Jagadhatri Online is your online destination to visit the collection of most popular Jagadhatri Pujas of Chanannagar, Mankundu & Bhadreswar. It is a platform on internet where we display the Location, Photos & Videos of various Jagadhatri Pujas of Chandannagar. It will guide people who want directions to go Pandal Hopping around the city, looking for the best Pujas in town.
                    </p>
                    <div className="grid gap-2 grid-cols-1 md:grid-cols-2 xl:grid-cols-4">
                        {items?.map((segment, index) => (
                            <Link key={index} href={segment?.link} target={segment?.link?.includes('https') ? '_blank' : '_self'} className="flex flex-col gap-2 items-center">
                                <span className="p-5 border rounded-full">{segment?.icon}</span>
                                <span className="text-xl font-bold uppercase">{segment?.title}</span>
                                <span className="">{segment?.description}</span>
                            </Link>
                        ))}
                    </div>
                    <div className="stats stats-vertical lg:stats-horizontal shadow container my-5">
                        <div className="stat">
                            <div className="stat-figure text-primary">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="inline-block w-8 h-8 stroke-current"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"></path></svg>
                            </div>
                            <div className="stat-title">Total Likes</div>
                            <div className="stat-value text-primary">25.6K</div>
                            <div className="stat-desc">21% more than last month</div>
                        </div>

                        <div className="stat">
                            <div className="stat-figure text-secondary">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="inline-block w-8 h-8 stroke-current"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path></svg>
                            </div>
                            <div className="stat-title">Page Views</div>
                            <div className="stat-value text-secondary">2.6M</div>
                            <div className="stat-desc">21% more than last month</div>
                        </div>
                        <div className="stat">
                            <div className="stat-figure text-secondary">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="inline-block w-8 h-8 stroke-current"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path></svg>
                            </div>
                            <div className="stat-title">Page Views</div>
                            <div className="stat-value text-secondary">2.6M</div>
                            <div className="stat-desc">21% more than last month</div>
                        </div>
                        <div className="stat">
                            <div className="stat-figure text-secondary">
                                <div className="avatar online">
                                    <div className="w-16 rounded-full">
                                        <img src="https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg" />
                                    </div>
                                </div>
                            </div>
                            <div className="stat-value">86%</div>
                            <div className="stat-title">Tasks done</div>
                            <div className="stat-desc text-secondary">31 tasks remaining</div>
                        </div>

                    </div>
                </div>
            </Section>
            <Section title="Jagadhatri Puja" description={ <>Countdown <font color="#F4C040">2024</font></> } >
                <div className="flex flex-col gap-8 text-center">
                    <CountdownTimer className="mt-3" targetDate={data?.dates[0]?.value?.date} />
                    <div className="grid gap-6 grid-cols-2 md:grid-cols-6">
                        {data?.dates?.slice(-5)?.map((segment, index) => {
                              return (
                                  <div key={index} className={`flex gap-4 col-span-2${index === 3 ? ' md:col-start-2': ''}`}>
                                      <Image
                                          width={55}
                                          height={55}
                                          src={ `/dates/${index}.png`}
                                          alt={segment?.value?.event}
                                          quality={100}
                                          className="h-fit"
                                      />
                                      <div className="flex flex-col gap-2 text-left">
                                          <span className="font-bold">{segment?.value?.info}</span>
                                          <span className="">{segment?.value?.event}: {formatDate(segment?.value?.date)}</span>
                                      </div>
                                  </div>
                              )
                        })}
                    </div>
                    <div>
                        <p className="font-bold text-base sm:text-xl md:text-2xl xl:text-3xl mb-4">Glimps of <font color="#F4C040">Jagadhatri Puja</font></p>
                        {videos?.slice(-1)?.map((segment, index) => {
                            return (
                                <YouTube key={index} title={segment?.value?.title} id={segment?.value?.video_id} />
                            )
                        })}
                    </div>
                </div>
          </Section>
        </Main>
    )
}