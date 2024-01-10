import Link from 'next/link';
import Image from 'next/image'
import Main from '@/app/components/main'
import Section from "@/app/components/section";
import Slider from "@/app/components/slider";
import CountdownTimer from "@/app/components/countdown-timer";
import { FaHistory, FaImages, FaYoutube, FaLocationArrow, FaFlag, FaGlobe, FaVideo, FaFacebook } from "react-icons/fa";
import { cn, formatDate, getDateByIndex, shuffle } from "@/app/utils/functions";
import { paytoneOne } from "@/app/fonts";
import { getSingletonData } from "@/app/utils/fetch";
import bg from '../public/bg.jpg'
import Videos from "@/app/components/videos";

export default async function Home() {
    const siteData = await getSingletonData('information');
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

    const stats = [
        {
            title: 'Followers',
            stat: '60.5K',
            icon: <FaFacebook className="inline-block w-8 h-8 stroke-current" />,
            description: '1K+ new followers in last 30 days'
        },
        {
            title: 'Post Reach',
            stat: '1.6M',
            icon: <FaHistory className="inline-block w-8 h-8 stroke-current" />,
            description: '85% more than last month',
            class: 'text-secondary'
        },
        {
            title: 'Post Engagement',
            stat: '47.8K',
            icon: <FaVideo className="inline-block w-8 h-8 stroke-current" />,
            description: '38% more than last month',
            class: 'text-blue-500'
        },
        {
            title: 'Subscribers',
            stat: '4.04K',
            icon: <FaYoutube className="inline-block w-8 h-8 stroke-current" />,
            description: '500+ new followers in last 1 year',
            class: 'text-green-600'
        },
        {
            title: 'Visitors',
            stat: '98.5K',
            icon: <FaGlobe className="inline-block w-8 h-8 stroke-current" />,
            description: '14% more than last month',
            class: 'text-pink-500'
        },
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
                <div className="hero-overlay bg-slate-900 bg-opacity-60"></div>
                <div className="hero-content text-center text-white-content text-white p-0 z-2">
                    <div className="pt-36 pb-28">
                        <h1 className={ `mb-3 text-2xl md:text-4xl lg:text-6xl ${paytoneOne.className}` }>CHANDANNAGAR <br /> JAGADHATRI PUJA</h1>
                        <p className="mb-8">Explore the Grand Festival of Chandannagar.</p>
                        <Link href={`/jagadhatri-puja/${year}`} className="btn bg-yellow-500 border-2 border-yellow-500 uppercase py-3.5 px-6 h-auto min-h-full rounded-md hover:bg-transparent hover:border-yellow-500 hover:text-yellow-500">Jagadhatri Puja {btnYear}</Link>
                    </div>
                </div>
            </div>
            <Section className="bg-gray-100" title="Welcome to the Online Puja Portal" description={ <>Jagadhatri <font color="#F4C040">Online</font></> }>
                <div className="flex flex-col gap-6 text-center">
                    <p className="md:text-xl md:w-[1100px] text-center m-auto md:leading-relaxed">
                        Jagadhatri Online is your online destination to visit the collection of most popular Jagadhatri
                        Pujas of Chanannagar, Mankundu & Bhadreswar. It is a platform on internet where we display the
                        Location, Photos & Videos of various Jagadhatri Pujas of Chandannagar. It will guide people who
                        want directions to go Pandal Hopping around the city, looking for the best Pujas in town.
                    </p>
                    <div>
                        <Link href="/achievements"
                              className="btn bg-yellow-500 border-0 uppercase py-4 px-6 h-auto min-h-full rounded-md hover:text-white hover:bg-blue-700"><FaFlag/> Achievements</Link>
                    </div>
                    <div className="stats stats-vertical lg:stats-horizontal text-left shadow container">
                        {stats?.map((item, index) => (
                            <div className="stat" key={index}>
                                <div className={`${cn('stat-figure text-primary', item?.class)}`}>{item?.icon}</div>
                                <div className="stat-title">{item?.title}</div>
                                <div className={`${cn('stat-value text-primary', item?.class)}`}>{item?.stat}</div>
                                <div className="stat-desc">{item?.description}</div>
                            </div>
                        ))}
                    </div>
                    <Slider slides={[
                        {imageUrl: 'bg.jpg'},
                        {imageUrl: 'cgrutsavapp.jpg'},
                    ]} options={{
                        height: 500
                    }}/>
                    <div className="grid gap-2 grid-cols-2 xl:grid-cols-4 mt-5">
                        {items?.map((item, index) => (
                            <Link key={index} href={item?.link}
                                  target={item?.link?.includes('https') ? '_blank' : '_self'}
                                  className="flex flex-col gap-2 items-center">
                                <span className="p-5 border rounded-full">{item?.icon}</span>
                                <span className="text-xl font-bold uppercase">{item?.title}</span>
                                <span className="">{item?.description}</span>
                            </Link>
                        ))}
                    </div>
                </div>
            </Section>
            <Section title="Jagadhatri Puja" description={<>Countdown <font color="#F4C040">2024</font></>}>
                <div className="flex flex-col gap-8 text-center">
                    <CountdownTimer className="mt-3" targetDate={data?.dates[0]?.value?.date}/>
                    <div className="grid gap-6 grid-cols-2 md:grid-cols-6">
                        {data?.dates?.slice(-5)?.map((item, index) => {
                            return (
                                <div key={index}
                                     className={`flex gap-4 col-span-2${index === 3 ? ' md:col-start-2' : ''}`}>
                                    <Image
                                        width={55}
                                        height={55}
                                        src={`/dates/${index}.png`}
                                        alt={item?.value?.event}
                                        quality={100}
                                        className="h-fit"
                                      />
                                      <div className="flex flex-col gap-2 text-left">
                                          <span className="font-bold">{item?.value?.info}</span>
                                          <span className="">{item?.value?.event}: {formatDate(item?.value?.date)}</span>
                                      </div>
                                  </div>
                              )
                        })}
                    </div>
                    <div>
                        <p className="font-bold text-base sm:text-xl md:text-2xl xl:text-3xl mb-4">Glimps of <font color="#F4C040">Jagadhatri Puja</font></p>
                        <Videos />
                    </div>
                </div>
          </Section>
        </Main>
    )
}