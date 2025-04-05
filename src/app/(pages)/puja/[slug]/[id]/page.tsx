import { notFound, permanentRedirect } from 'next/navigation';
import { getModel, getModels } from "@/utils/fetch";
import { cn, getDateByIndex, getDescription, stripHtmlAndLimit } from "@/utils/functions";
import {
    FaArrowLeft,
    FaArrowRight,
    FaCalendarAlt,
    FaMapMarkerAlt,
    FaHistory,
    FaPalette,
    FaChalkboard,
    FaPaintBrush,
    FaBookOpen,
    FaLightbulb,
} from "react-icons/fa";
import {
    FaFacebook,
    FaInstagram,
    FaYoutube,
    FaXTwitter,
} from "react-icons/fa6";
import {
    getYear,
    getCelebrating,
    formatDate,
    getUrlSlug,
} from "@/utils/functions";
import schema from "@/utils/schema";
import Link from "next/link";
import { metadata as metadataSchema } from "@/app/layout";
import type { Metadata } from 'next'
import Main from '@/components/main';
import Breadcrumbs from '@/components/breadcrumbs';
import GallerySlider from '@/components/gallery-slider';

interface PujaData {
    reference_id: string;
    puja_name: string;
    puja_zone: string;
    estd: string;
    location?: {
        address?: string;
        lat?: number;
        lng?: number;
    };
    current_theme?: string;
    idol_artist?: {
        display?: string;
    };
    decoration_artist?: {
        display?: string;
    };
    puja_info?: string;
    tags?: string[];
}

interface PageProps {
    params: Promise<{
        slug: string;
        id: string;
    }>;
}

export const dynamicParams = false

export async function generateStaticParams() {
    const pujasData = await getModel('pujas', {
        sort: { _o: 1 }
    });
    const data = pujasData ?? []

    return data.map((item: any) => {
        return {
            slug: getUrlSlug(item?.puja_name),
            id: item?.reference_id,
        }
    })
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
    const { slug, id } = await params

    const dataRes = await getModels({
        pujas: {
            filter: { reference_id: id },
        },
        images: {
            filter: { reference_id: id },
            limit: 3
        },
        pujadescriptions: {}
    });
    const { pujas, images, pujadescriptions } = dataRes ?? {};

    const currentPuja = pujas?.[0];
    const description = getDescription(currentPuja, pujadescriptions, 'famous')

    return {
        title: `${currentPuja?.puja_name} Sarbajanin, ${currentPuja?.puja_zone === 'bhr' ? 'Bhadreswar' : 'Chandannagar'}`,
        description: stripHtmlAndLimit(description),
        openGraph: {
            ...metadataSchema.openGraph,
            url: `/puja/${slug}/${id}`,
            images: images?.map((item: any) => {
                return {
                    url: `https://cgrutsav.jagadhatrionline.co.in/images/${item?.year}/${item?.reference_id}/${item?.image_name}`,
                    alt: currentPuja?.puja_name
                }
            })
        },
        alternates: {
            canonical: `/puja/${slug}/${id}`
        },
    }
}

export default async function Page({ params }: PageProps) {
    const { slug, id } = await params
    const queryYear = new Date().getFullYear()

    const dataRes = await getModels({
        pujas: {
            sort: { _o: 1 },
            populate: 1
        },
        images: {
            sort: { _modified: -1 },
            filter: { reference_id: id },
            limit: 10
        },
        processionlist: {
            populate: 1
        },
        pujadescriptions: {},
        information: {}
    });
    const { pujas, images, pujadescriptions, information, processionlist } = dataRes ?? {};

    const currentPuja = pujas?.find((data: any) => data?.reference_id === id);
    const pujaImages = images.map((item: any) => {
        return {
            src: `https://cgrutsav.jagadhatrionline.co.in/images/${item?.year}/${item?.reference_id}/${item?.image_name}`,
            thumb: `https://cgrutsav.jagadhatrionline.co.in/images/${item?.year}/${item?.reference_id}/${item?.image_name}`,
            alt: currentPuja?.puja_name,
            subHtml: `<p>By: ${item?.uploaded_by.trim().split(' ').map((word: string) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()).join(' ')}</p>`,
        }
    });

    if (!currentPuja || currentPuja?.length < 1) {
        notFound()
    }

    const pujaName = currentPuja?.puja_name;
    if (slug !== getUrlSlug(pujaName)) {
        permanentRedirect(`/puja/${getUrlSlug(pujaName)}/${currentPuja?.reference_id}`);
    }

    let array: PujaData[] = [];
    pujas?.forEach((item: PujaData, index: number) => {
        if (item?.reference_id === id) {
            array.push(pujas?.[0 < index ? index - 1 : pujas?.length - 1])
            array.push(pujas?.[pujas?.length - 1 > index ? index + 1 : 0])
        }
    });

    const y = getYear(currentPuja?.estd);
    const cel = getCelebrating(y);
    const adi = currentPuja?.tags?.includes('adi') ?? false;
    const popular = currentPuja?.tags?.includes('popular') ?? false;
    const processions = processionlist?.find((item: any) => item?.puja?._id === currentPuja?._id)

    const info = [
        {
            icon: <FaChalkboard className="text-xl text-purple-600" />,
            title: `Theme ${new Date().getFullYear()}`,
            value: currentPuja?.current_theme
        },
        {
            icon: <FaPaintBrush className="text-xl text-purple-600" />,
            title: `Idol Artist`,
            value: currentPuja?.idol_artist?.artist_name
        },
        {
            icon: <FaPalette className="text-xl text-purple-600" />,
            title: `Decoration Artist`,
            value: currentPuja?.decoration_artist?.artist_name
        },
        {
            icon: <FaLightbulb className="text-xl text-purple-600" />,
            title: `Lighting Artist`,
            value: currentPuja?.lighting_artist?.artist_name
        },
        {
            icon: <FaPaintBrush className="text-xl text-purple-600" />,
            title: `Theme Artist`,
            value: currentPuja?.theme_artist?.artist_name
        },
    ].filter((item: any) => item.value);

    const socialLinks = [
        {
            type: "facebook",
            icon: <FaFacebook className="text-xl text-white/80 hover:text-white transition-colors" />
        },
        {
            type: "instagram", 
            link: "#",
            icon: <FaInstagram className="text-xl text-white/80 hover:text-white transition-colors" />
        },
        {
            type: "youtube",
            icon: <FaYoutube className="text-xl text-white/80 hover:text-white transition-colors" />
        },
        {
            type: "x",
            icon: <FaXTwitter className="text-xl text-white/80 hover:text-white transition-colors" />
        }
    ].map((item: any) => {
        return {
            ...item,
            link: currentPuja?.links?.find((link: any) => link.type === item.type)?.link ?? '#'
        }
    });

    const schemaData = {
        path: `puja/${getUrlSlug(pujaName)}/${currentPuja?.reference_id}`,
        title: `Details of ${pujaName} Sarbajanin`,
        parents: [
            {
                title: 'Jagadhatri Puja Committee List',
                slug: 'puja-committee-list'
            }
        ]
    }
    const jsonLd = schema(schemaData);
    jsonLd["@graph"].push({
        "name": `${cel != '--' ? cel : y === 'Not Known' ? 'Jagadhatri Puja' : `${y} Years`} Celebration of ${pujaName} Sarbajanin`,
        "description": `Jagadhatri Puja ${queryYear} celebration by ${pujaName} Sarbajanin, ${currentPuja?.puja_zone === 'bhr' ? 'Bhadreswar' : 'Chandannagar'}`,
        "@type": "Event",
        "eventStatus": "https://schema.org/EventScheduled",
        "eventAttendanceMode": "https://schema.org/OfflineEventAttendanceMode",
        "location": [
            {
                "@type": "Place",
                "name": currentPuja?.puja_zone === 'bhr' ? 'Bhadreswar' : 'Chandannagar',
                "url": `https://en.wikipedia.org/wiki/${currentPuja?.puja_zone === 'bhr' ? 'Bhadreswar,_Hooghly' : 'Chandannagar'}`,
                "address": {
                    "@type": "PostalAddress",
                    "name": `${currentPuja?.puja_name} Puja Premises`,
                    "streetAddress": `${currentPuja?.location?.address || `Somewhere at ${currentPuja?.puja_zone === 'bhr' ? 'Bhadreswar' : 'Chandannagar'}, Hooghly`}`,
                    "addressLocality": currentPuja?.puja_zone === 'bhr' ? 'Bhadreswar' : 'Chandannagar',
                    "addressRegion": "West Bengal",
                    "addressCountry": "IN"
                },
                "geo": {
                    "@type": "GeoCoordinates",
                    "latitude": currentPuja?.location?.lat,
                    "longitude": currentPuja?.location?.lng
                }
            }
        ],
        "organizer": {
            "@type": "Organization",
            "name": currentPuja?.puja_name || 'Jagadhatri Puja',
            "url": `${process.env.NEXT_PUBLIC_SITE_URL}/${schemaData.path}`
        },
        "image": pujaImages.map((item: any) => item.src),
        "startDate": getDateByIndex(information, 0),
        "endDate": getDateByIndex(information, 4),
        "@id": `${process.env.NEXT_PUBLIC_SITE_URL}/${schemaData.path}#schema-${Math.floor(Math.random() * 1000000)}`, // ensure unique ID
        "inLanguage": "en-US",
        "mainEntityOfPage": {
            "@id": `${process.env.NEXT_PUBLIC_SITE_URL}/${schemaData.path}#webpage`
        }
    });
    
    const description = getDescription(currentPuja, pujadescriptions, pujas?.length)

    return (
        <Main jsonLd={jsonLd}>
            {/* Hero Section with Dynamic Background */}
            <div className="relative md:min-h-[90vh] p-32 w-full flex items-center justify-center overflow-hidden">
                {/* Background Layer */}
                <div className="absolute inset-0">
                    {/* Base Gradient */}
                    <div className="absolute inset-0 bg-gradient-to-br from-[#2D1B69] via-[#1E1B4B] to-[#4F1C48]">
                        {/* Decorative Pattern Overlay */}
                        <div className="absolute inset-0 opacity-5">
                            <div className="absolute inset-0" style={{
                                backgroundImage: `
                                    radial-gradient(circle at 0% 0%, rgba(255,215,0,0.15) 1px, transparent 8px),
                                    radial-gradient(circle at 100% 0%, rgba(255,215,0,0.15) 1px, transparent 8px),
                                    radial-gradient(circle at 100% 100%, rgba(255,215,0,0.15) 1px, transparent 8px),
                                    radial-gradient(circle at 0% 100%, rgba(255,215,0,0.15) 1px, transparent 8px)
                                `,
                                backgroundSize: '32px 32px',
                                backgroundPosition: '0 0, 16px 0, 16px 16px, 0 16px'
                            }} />
                        </div>
                        
                        {/* Sacred Geometry Pattern */}
                        <div className="absolute inset-0 opacity-10">
                            <div className="absolute inset-0" style={{
                                backgroundImage: `
                                    repeating-linear-gradient(45deg, rgba(255,223,186,0.1) 0px, rgba(255,223,186,0.1) 1px, transparent 1px, transparent 8px),
                                    repeating-linear-gradient(-45deg, rgba(255,223,186,0.1) 0px, rgba(255,223,186,0.1) 1px, transparent 1px, transparent 8px)
                                `,
                                backgroundSize: '16px 16px'
                            }} />
                        </div>

                        {/* Additional Gradient Overlay */}
                        <div className="absolute inset-0 bg-gradient-to-t from-transparent via-[#FF5E5B]/5 to-transparent" />
                    </div>

                    {/* Animated Shapes with Enhanced Effects */}
                    <div className="absolute inset-0 overflow-hidden">
                        {/* Large Decorative Circle */}
                        <div className="absolute -top-1/4 -right-1/4 w-[800px] h-[800px] rounded-full bg-gradient-to-br from-[#FFD700]/10 to-transparent" />
                        
                        {/* Animated Blobs */}
                        <div className="absolute top-0 left-0 w-[600px] h-[600px]">
                            <div className="absolute inset-0 bg-gradient-to-br from-[#FF9933]/20 to-transparent rounded-full mix-blend-overlay filter blur-3xl animate-blob" />
                        </div>
                        <div className="absolute top-1/4 right-0 w-[500px] h-[500px]">
                            <div className="absolute inset-0 bg-gradient-to-bl from-[#FF5E5B]/15 to-transparent rounded-full mix-blend-overlay filter blur-3xl animate-blob" style={{ animationDelay: '2s' }} />
                        </div>
                        <div className="absolute bottom-0 left-1/4 w-[700px] h-[700px]">
                            <div className="absolute inset-0 bg-gradient-to-tr from-[#FFD700]/10 to-transparent rounded-full mix-blend-overlay filter blur-3xl animate-blob" style={{ animationDelay: '4s' }} />
                        </div>

                        {/* Subtle Light Effects */}
                        <div className="absolute top-1/3 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] bg-[#FFF1E6]/10 rounded-full filter blur-3xl" />
                        <div className="absolute bottom-1/4 right-1/4 w-[200px] h-[200px] bg-[#FFB6C1]/10 rounded-full filter blur-2xl" />
                    </div>

                    {/* Enhanced Vignette Effect */}
                    <div className="absolute inset-0 bg-gradient-to-t from-[#2D1B69]/60 via-transparent to-[#2D1B69]/60" />
                    
                    {/* Subtle Color Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-r from-[#FFD700]/5 via-transparent to-[#FF5E5B]/5" />
                </div>

                {/* Content Layer */}
                <div className="relative mx-auto px-4">
                    <div className="flex flex-col items-center">
                        {/* Badge */}
                        <div className="inline-block mb-10">
                            <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/20">
                                <Breadcrumbs breadcrumbTitle={pujaName} className="text-white/90 capitalize p-0" end={-1} />
                            </div>
                        </div>

                        {/* Main Title */}
                        <div className="relative">
                            <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 tracking-tight text-center">
                                <span className="text-shadow-lg text-shadow-grey-900 flex items-center gap-2">
                                    {pujaName}
                                    {popular && (
                                        <div className="relative inline-flex items-center tracking-normal">
                                            {/* <span className="absolute -inset-2">
                                                <div className="w-full h-full max-w-sm mx-auto rotate-2 blur-sm bg-gradient-to-r from-yellow-400 via-orange-500 to-red-600 opacity-30 animate-pulse" />
                                            </span> */}
                                            <span className="relative flex items-center gap-1 text-sm font-semibold px-3 py-1.5 bg-gradient-to-r from-yellow-400/20 via-orange-500/20 to-red-600/20 rounded-full border border-yellow-400/30 backdrop-blur-sm">
                                                <svg className="w-4 h-4 text-yellow-400 animate-spin-slow" viewBox="0 0 24 24">
                                                    <path fill="currentColor" d="M12 15.4l-3.76 2.27 1-4.28-3.32-2.88 4.38-.38L12 6.1l1.71 4.04 4.38.38-3.32 2.88 1 4.28z"/>
                                                </svg>
                                                Popular
                                            </span>
                                        </div>
                                    )}
                                </span>
                                <div className="absolute -top-6 -right-6 w-12 h-12 bg-purple-400/20 rounded-full blur-xl" />
                                <div className="absolute -bottom-6 -left-6 w-12 h-12 bg-pink-400/20 rounded-full blur-xl" />
                            </h1>
                        </div>

                        {/* Location */}
                        <div className="relative mb-12">
                            <div className="flex items-center justify-center gap-3 px-6 py-3 rounded-xl bg-white/5 backdrop-blur-sm border border-white/10">
                                <FaMapMarkerAlt className="text-purple-400" />
                                <a href={`https://www.google.com/maps/search/?api=1&query=${currentPuja?.location?.lat},${currentPuja?.location?.lng}`} target="_blank" className="text-sm md:text-base text-white/90">
                                    {currentPuja?.location?.address || `Somewhere at ${currentPuja?.puja_zone === 'bhr' ? 'Bhadreswar' : 'Chandannagar'}, Hooghly, West Bengal`}
                                </a>
                            </div>
                            {/* Decorative dots */}
                            <div className="absolute -left-4 -top-4 w-8 h-8" style={{
                                backgroundImage: 'radial-gradient(circle at 2px 2px, rgba(255,255,255,0.3) 1.5px, transparent 0)',
                                backgroundSize: '8px 8px'
                            }} />
                            <div className="absolute -right-4 -bottom-4 w-8 h-8" style={{
                                backgroundImage: 'radial-gradient(circle at 2px 2px, rgba(255,255,255,0.3) 1.5px, transparent 0)',
                                backgroundSize: '8px 8px'
                            }} />
                        </div>

                        {/* Stats Row */}
                        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-8 mb-12">
                            {[
                                {
                                    text: y === 'Not Known' ? '300+' : y,
                                    description: 'Years of ' + (adi || Number(y) >= 50 ? 'Legacy' : 'Tradition'),
                                    after: <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-ping" />
                                },
                                {
                                    text: currentPuja?.estd === '0' ? 'Not Known' : currentPuja?.estd,
                                    description: 'Established Year'
                                },
                                {
                                    text: adi ? 'Adi Puja' : 'Traditional',
                                    description: 'Puja Category'
                                },
                                {
                                    text: String(currentPuja?._o + 1).padStart(2, '0'),
                                    description: 'Serial Number'
                                }
                            ].map((item, index) => (
                                <div key={index} className="px-6 py-4 rounded-xl bg-white/5 backdrop-blur-sm border border-white/10 lg:min-w-[200px] relative overflow-hidden">
                                    {/* <div className="absolute -right-8 -top-8 w-16 h-16 bg-purple-500/20 rounded-full blur-xl animate-pulse" /> */}
                                    <div className="relative text-center">
                                        <div className="text-xl md:text-2xl font-bold text-white mb-1 flex items-center justify-center gap-2">
                                            <span className="bg-clip-text text-transparent bg-gradient-to-r from-amber-200 to-amber-500">{item.text}</span>
                                            {item?.after}
                                        </div>
                                        <div className="text-xs md:text-sm text-white/70">{item.description}</div>
                                    </div>
                                    <div className="absolute -left-2 -bottom-2 w-8 h-8" style={{
                                        backgroundImage: 'radial-gradient(circle at 2px 2px, rgba(255,255,255,0.2) 1px, transparent 0)',
                                        backgroundSize: '6px 6px'
                                    }} />
                                </div>
                            ))}
                            {/* <div className="px-6 py-4 rounded-xl bg-white/5 backdrop-blur-sm border border-white/10">
                                <div className="text-xl md:text-2xl font-bold text-white mb-1">{adi ? 'Adi Puja' : 'Traditional'}</div>
                                <div className="text-xs md:text-sm text-white/70">Puja Category</div>
                            </div> */}
                        </div>

                        <div className="flex items-center justify-center gap-4 mt-4">
                            {socialLinks.map((item, index) => (
                                <a 
                                    key={index}
                                    href={item.link}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className={cn("p-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 hover:bg-white/20 transition-all duration-300", item.link === '#' && 'pointer-events-none')}
                                    aria-label={`Visit our ${item.type} page`}
                                >
                                    {item.icon}
                                </a>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            <div className="w-full bg-gradient-to-br from-purple-50/50 via-white to-purple-50/50">
                <div className="px-4 pattern-dots">
                    <div className="container px-2 lg:px-0 mx-auto relative -mt-10 mb-16">
                        <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-8`}>
                            <div className="bg-white rounded-2xl p-5 shadow-xl shadow-purple-100/50 hover:shadow-2xl hover:shadow-purple-100/50 transition-all duration-300">
                                <div className="flex items-center gap-4">
                                    <div className="p-3 rounded-xl bg-purple-100">
                                        <FaHistory className="text-2xl text-purple-600" />
                                    </div>
                                    <div>
                                        <div className="text-xl md:text-2xl font-bold text-gray-800 mb-1">{cel != '--' ? cel : y === 'Not Known' ? '300+' : y}</div>
                                        <div className="text-xs md:text-sm text-gray-600">{cel != '--' ? `Be the part of ${y === 'Not Known' ? '300+' : y} years' celebration` : 'Years of Celebration'}</div>
                                    </div>
                                </div>
                            </div>
                            <div className="bg-white rounded-2xl p-5 shadow-xl shadow-purple-100/50 hover:shadow-2xl hover:shadow-purple-100/50 transition-all duration-300">
                                <div className="flex items-center gap-4">
                                    <div className="p-3 rounded-xl bg-purple-100">
                                        <FaMapMarkerAlt className="text-2xl text-purple-600" />
                                    </div>
                                    <div>
                                        <div className="text-xl md:text-2xl font-bold text-gray-800 mb-1">{currentPuja?.puja_zone === 'bhr' ? 'Bhadreswar' : 'Chandannagar'}</div>
                                        <div className="text-xs md:text-sm text-gray-600">Police Station Zone</div>
                                    </div>
                                </div>
                            </div>
                            <div className="bg-white rounded-2xl p-5 shadow-xl shadow-purple-100/50 hover:shadow-2xl hover:shadow-purple-100/50 transition-all duration-300">
                                <div className="flex items-center gap-4">
                                    <div className="p-3 rounded-xl bg-purple-100">
                                        <FaPalette className="text-2xl text-purple-600" />
                                    </div>
                                    <div>
                                        <div className="text-xl md:text-2xl font-bold text-gray-800 mb-1">{processions?.vehicles ? 'Participating' : 'Not Participating'}</div>
                                        <div className="text-xs md:text-sm text-gray-600">{processions?.vehicles ? `With ${processions.vehicles} Vehicle${processions.vehicles > 1 ? 's' : ''} in Procession` : `In Procession ${queryYear}`}</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div id="about" className="relative overflow-hidden py-16">
                        <div className="container px-2 lg:px-0 mx-auto">
                            <div className="text-center mb-8">
                                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-purple-100/50 text-purple-700 font-medium mb-4">
                                    <FaBookOpen className="text-sm" />
                                    <span className="text-sm">About Our Puja</span>
                                </div>
                                <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-purple-900 via-purple-700 to-purple-800" style={{lineHeight: 'normal'}}>
                                    Celebrating Culture & Tradition
                                </h2>
                                <p className="text-gray-600 text-base md:text-lg">
                                    {currentPuja?.estd === '0' ? 'A Legacy of Tradition' : `Since the year ${currentPuja?.estd}`}
                                </p>
                            </div>
                            <div className="bg-white rounded-3xl p-8 border border-purple-100 shadow-xl shadow-purple-100/50 relative overflow-hidden">
                                <div className="absolute top-0 right-0 w-32 h-32 bg-purple-100/50 rounded-full blur-3xl -mr-16 -mt-16" />
                                <div className="absolute bottom-0 left-0 w-32 h-32 bg-purple-100/50 rounded-full blur-3xl -ml-16 -mb-16" />
                                <div className="relative">
                                    <div className="prose prose-lg prose-purple max-w-none space-y-2 text-justify">
                                        {description ? (
                                            <div className="space-y-2" 
                                                dangerouslySetInnerHTML={{ __html: description }} 
                                            />
                                        ) : (
                                            <p className="text-gray-600 mb-8">
                                                Experience the grandeur of one of Chandannagar and Bhadreswar's most cherished Jagadhatri Puja celebrations. Our puja embodies the perfect blend of tradition and cultural heritage that has been preserved through generations.
                                            </p>
                                        )}
                                        
                                        {currentPuja?.puja_info && <div className="space-y-2" dangerouslySetInnerHTML={{ __html: currentPuja?.puja_info }} />}
                                        {cel != '--' && (
                                            <div className="my-8 p-6 rounded-2xl bg-gradient-to-r from-purple-50 to-amber-50 border border-amber-100 relative overflow-hidden">
                                                <div className="absolute top-0 right-0 w-40 h-40 bg-yellow-100/70 rounded-full blur-3xl -mr-20 -mt-20 opacity-70" />
                                                <div className="absolute bottom-0 left-0 w-40 h-40 bg-purple-100/70 rounded-full blur-3xl -ml-20 -mb-20 opacity-70" />
                                                
                                                <div className="relative flex flex-col md:flex-row items-center gap-6">
                                                    <div className="flex-shrink-0 w-24 h-24 md:w-28 md:h-28 rounded-full bg-gradient-to-br from-amber-400 to-amber-600 flex items-center justify-center shadow-lg shadow-amber-200/50">
                                                        <div className="text-white font-bold text-2xl md:text-3xl">
                                                            {y}
                                                        </div>
                                                    </div>
                                                    <div className="text-center md:text-left">
                                                        <h3 className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-purple-700 via-amber-600 to-amber-700 bg-clip-text text-transparent mb-2">
                                                            Celebrating Our {cel} Year!
                                                        </h3>
                                                        <p className="text-gray-700">
                                                            {cel == 'Silver Jubilee' && "Silver Jubilee: A quarter century of devotion and community celebration."}
                                                            {cel == 'Golden Jubilee' && "Golden Jubilee: Half a century of preserving our cultural heritage."}
                                                            {cel == 'Diamond Jubilee' && "Diamond Jubilee: Sixty years of unwavering faith and tradition."}
                                                            {cel == 'Platinum Jubilee' && "Platinum Jubilee: A seventy-five years of spiritual journey and community bonding."}
                                                            {cel == 'Centennial Jubilee' && "Centennial Jubilee: A hundred years of spiritual journey and community bonding."}
                                                            {cel == 'Jubilee' && "Jubilee: Celebrating a significant milestone in our spiritual journey and community bonding."}
                                                        </p>
                                                    </div>
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                    {info.length > 0 && <div className="flex flex-wrap justify-center gap-4 md:gap-6 mt-8 border-t border-purple-100 pt-8">
                                        {
                                            info.filter((item: any) => item.value).map((item: any, index: number) => (
                                                <div key={index} className="flex items-start gap-4 basis-64">
                                                    <div className="p-3 rounded-xl bg-purple-100">
                                                        {item.icon}
                                                    </div>
                                                    <div>
                                                        <div className="font-semibold text-gray-800 mb-1">{item.title}</div>
                                                        <div className="text-sm text-gray-600">{item.value}</div>
                                                    </div>
                                                </div>
                                            ))
                                        }
                                    </div>}
                                </div>
                            </div>
                            <div className="mt-8">
                                <div className="px-6 py-4 rounded-xl bg-purple-50 border border-purple-100">
                                    <div className="flex items-start gap-3">
                                        <div className="p-2 rounded-lg bg-purple-100">
                                            <FaLightbulb className="text-purple-600 text-lg" />
                                        </div>
                                        <div>
                                            <h4 className="text-gray-900 font-medium mb-2">Disclaimer</h4>
                                            <p className="text-xs md:text-sm text-gray-600 leading-relaxed">
                                                The information provided here may be incomplete or partially inaccurate. If you are a representative of this puja committee and notice any discrepancies, we encourage you to get in touch with us so we can update and correct the details. This initiative aims to bring all puja committees together on a single unified platform.
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
          
                {images?.length > 0 && (
                    <div id="gallery" className="py-24 bg-gray-50">
                        <div className="">
                            <div className="text-center mb-16">
                                <div className="inline-block px-4 py-2 rounded-lg bg-purple-100 text-purple-700 font-medium mb-4">
                                    Our Gallery
                                </div>
                                <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 px-3" style={{lineHeight: 'normal'}}>Glimpses of Celebration</h2>
                                <p className="text-gray-600 max-w-2xl mx-auto">Explore moments from our recent celebrations that capture the essence of our tradition and community spirit.</p>
                            </div>
                            <GallerySlider 
                                speed={500} 
                                thumbnail={true} 
                                slideShowAutoplay={true} 
                                fullScreen={true} 
                                slides={pujaImages}
                                sliderOptions={{
                                    lazyLoad: 'sequential',
                                    perPage: pujaImages.length >= 4 ? 4 : pujaImages.length,
                                    gap: '0.5rem',
                                    perMove: 1,
                                    drag: 'free',
                                    focus: 'center',
                                    autoScroll: {
                                        speed: 1,
                                    },
                                    height: 600,
                                    pagination: false,
                                    breakpoints: {
                                        640: {
                                            perPage: pujaImages.length >= 2 ? 2 : pujaImages.length,
                                            height: 300,
                                        },
                                        1024: {
                                            perPage: pujaImages.length >= 3 ? 3 : pujaImages.length,
                                            height: 350,
                                        },
                                    },
                                }}
                                sliderItemClass="aspect-[4/5] overflow-hidden rounded-2xl group "
                            />
                        </div>
                    </div>
                )}

                <div className="py-20 bg-gradient-to-br from-white via-purple-50/50 to-purple-100/30">
                    <div className="max-w-7xl mx-auto px-4">
                        <div className="text-center mb-16">
                            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-purple-100 text-purple-700 font-medium mb-4">
                                <FaCalendarAlt className="text-lg" />
                                <span>Event Schedule</span>
                            </div>
                            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 bg-gradient-to-r from-purple-700 to-purple-900 bg-clip-text text-transparent" style={{lineHeight: 'normal'}}>
                                Upcoming Events
                            </h2>
                            <p className="text-gray-600 max-w-2xl mx-auto">Mark your calendar for these auspicious occasions</p>
                        </div>
                        <div className="grid md:grid-cols-3 gap-6">
                            {information?.dates?.map((item: any, index: number) => (
                                <div key={index} 
                                        className="group relative bg-white/90 backdrop-blur-sm p-8 rounded-2xl shadow-lg shadow-purple-100/50 hover:shadow-xl hover:shadow-purple-200/60 transition-all duration-300 overflow-hidden border border-purple-100/30">
                                    {/* Decorative elements */}
                                    <div className="absolute -right-8 -top-8 w-32 h-32 bg-purple-200/30 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                                    <div className="absolute -left-8 -bottom-8 w-32 h-32 bg-purple-300/20 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                                    
                                    {/* Content */}
                                    <div className="relative">
                                        <div className="flex gap-4">
                                            <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-purple-100 to-purple-200 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                                                <FaCalendarAlt className="text-2xl text-purple-600" />
                                            </div>
                                            <div className="flex flex-col gap-1">
                                                <h3 className="text-xl font-semibold text-purple-900">{item?.event}</h3>
                                                <p className="text-gray-600 mb-4 flex items-center gap-1">
                                                    <span className="inline-block w-2 h-2 rounded-full bg-purple-400"></span>
                                                    {formatDate(item?.date)}
                                                </p>
                                            </div>
                                        </div>
                                        
                                        {/* Event details */}
                                        {item?.information && (
                                            <div className="pt-4 border-t border-purple-100">
                                                <p className="text-sm text-gray-600 leading-relaxed">
                                                    {item.information}
                                                </p>
                                            </div>
                                        )}
                                        
                                        {/* Decorative corner accent */}
                                        <div className="absolute -right-1 -bottom-1 w-12 h-12 opacity-0 group-hover:opacity-100 transition-opacity duration-300" 
                                                style={{
                                                    backgroundImage: 'radial-gradient(circle at 2px 2px, rgba(147, 51, 234, 0.2) 1.5px, transparent 0)',
                                                    backgroundSize: '8px 8px'
                                                }} />
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Location Section */}
                {/* {currentPuja?.location?.address && (
                    <div className="py-24">
                        <div className="max-w-7xl mx-auto px-4">
                            <div className="text-center mb-16">
                                <div className="inline-block px-4 py-2 rounded-lg bg-purple-100 text-purple-700 font-medium mb-4">
                                    Location
                                </div>
                                <h2 className="text-4xl font-bold mb-4">Find Us</h2>
                                <p className="text-gray-600 max-w-2xl mx-auto">Visit us to experience the divine atmosphere</p>
                            </div>
                            <div className="grid md:grid-cols-5 gap-8 items-center">
                                <div className="md:col-span-3 h-[500px] rounded-2xl overflow-hidden shadow-lg">
                                    <GoogleMapsEmbed
                                        apiKey={process.env.GOOGLE_MAP_API_KEY!}
                                        height={500}
                                        width="100%"
                                        mode="place"
                                        zoom="16"
                                        q={`${currentPuja?.location?.lat},${currentPuja?.location?.lng}`}
                                    />
                                </div>
                                <div className="md:col-span-2">
                                    <div className="bg-white p-8 rounded-2xl shadow-lg">
                                        <h3 className="text-2xl font-semibold mb-6">Contact Information</h3>
                                        <div className="space-y-6">
                                            <div className="flex items-start gap-4">
                                                <div className="p-3 rounded-xl bg-purple-100">
                                                    <FaMapMarkerAlt className="text-xl text-purple-600" />
                                                </div>
                                                <div>
                                                    <div className="font-medium mb-1">Address</div>
                                                    <p className="text-gray-600">{currentPuja.location.address}</p>
                                                </div>
                                            </div>
                                            <a 
                                                href={`https://www.google.com/maps/search/?api=1&query=${currentPuja?.location?.lat},${currentPuja?.location?.lng}`}
                                                target="_blank"
                                                className="inline-flex items-center gap-2 px-6 py-3 bg-purple-600 text-white rounded-xl hover:bg-purple-700 transition-colors"
                                            >
                                                Get Directions
                                                <FaArrowRight className="text-sm" />
                                            </a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )} */}

                {/* Enhanced Navigation */}
                <div className="py-12">
                    <div className="max-w-7xl mx-auto px-4">
                        <div className="flex flex-col sm:flex-row justify-between gap-6">
                            <Link
                                rel="prev"
                                href={`/puja/${getUrlSlug(array?.[0]?.puja_name)}/${array?.[0]?.reference_id}`}
                                className="flex items-center gap-4 px-6 py-5 bg-gradient-to-r from-white to-purple-50 border border-purple-100 rounded-xl hover:border-purple-200 transition-all group relative overflow-hidden flex-1"
                            >
                                <div className="absolute top-0 left-0 w-1 h-full bg-purple-400"></div>
                                <div className="p-2.5 rounded-lg bg-purple-100 group-hover:-translate-x-1 transition-transform">
                                    <FaArrowLeft className="text-purple-600" />
                                </div>
                                <div className="flex-1">
                                    <div className="text-sm text-gray-600 flex items-center gap-1">
                                        <span className="inline-block w-2 h-2 rounded-full bg-purple-300 animate-pulse"></span>
                                        Previous Puja
                                    </div>
                                    <div className="font-medium truncate">{array?.[0]?.puja_name}</div>
                                    {array?.[0]?.tags?.includes('popular') && (
                                        <span className="inline-block text-xs px-2 py-0.5 bg-amber-100 text-amber-700 rounded-full mt-1">Popular</span>
                                    )}
                                </div>
                            </Link>
                            <Link
                                rel="next"
                                href={`/puja/${getUrlSlug(array?.[1]?.puja_name)}/${array?.[1]?.reference_id}`}
                                className="flex items-center justify-end gap-4 px-6 py-5 bg-gradient-to-l from-white to-purple-50 border border-purple-100 rounded-xl hover:border-purple-200 transition-all group text-right relative overflow-hidden flex-1"
                            >
                                <div className="absolute top-0 right-0 w-1 h-full bg-purple-400"></div>
                                <div className="flex-1">
                                    <div className="text-sm text-gray-600 flex items-center justify-end gap-1">
                                        Next Puja
                                        <span className="inline-block w-2 h-2 rounded-full bg-purple-300 animate-pulse"></span>
                                    </div>
                                    <div className="font-medium truncate">{array?.[1]?.puja_name}</div>
                                    {array?.[1]?.tags?.includes('popular') && (
                                        <span className="inline-block text-xs px-2 py-0.5 bg-amber-100 text-amber-700 rounded-full mt-1">Popular</span>
                                    )}
                                </div>
                                <div className="p-2.5 rounded-lg bg-purple-100 group-hover:translate-x-1 transition-transform">
                                    <FaArrowRight className="text-purple-600" />
                                </div>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </Main>
    )
}