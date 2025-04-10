import type { Metadata, Viewport } from 'next'
import React from "react";
import Script from "next/script"
import { livvic } from "@/fonts"
import Providers from '@/app/providers';
import OneSignal from '@/components/onesignal';
import '@/app/globals.sass'
import '@bprogress/core/css';

export const revalidate = 604800 // 1 week

export const viewport: Viewport = {
    themeColor: '#eab308',
}

export const metadata: Metadata = {
    metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL!),
    alternates: {
        canonical: '/',
    },
    title: {
        template: '%s - Jagadhatri Online™ | the #1 Popular Jagadhatri Puja Portal',
        default: 'Jagadhatri Online™ | the #1 Puja Portal for Chandannagar Jagadhatri Puja',
    },
    description: `Jagadhatri or Jagaddhatri is an aspect of the Hindu goddess Durga, who is particularly worshipped in the Chandannagar region of West Bengal, India. Her cult is directly derived from Tantra where she is a symbol of sattva beside Durga and Kali, respectably symbolized with Rajas and Tamas.`,
    keywords: ['jagadhatri puja', 'jagadhatri', 'chandannagar'],
    authors: [{ name: 'Sayan Datta', url: 'https://sayandatta.co.in' }],
    creator: 'Sayan Datta',
    publisher: 'Jagadhatri Online',
    robots: {
        index: true,
        follow: true,
        googleBot: {
            index: true,
            follow: true,
            'max-video-preview': -1,
            'max-image-preview': 'large',
            'max-snippet': -1,
        },
    },
    openGraph: {
        siteName: 'Jagadhatri Online',
        locale: 'en_US',
        type: 'website',
        url: '/'
    },
    verification: {
        google: 'DlFEkrjmoyJEMTrNA5wonqW45Se03O5RkI_9D8Md7Us',
        other: {
            me: ['info@jagadhatrionline.co.in'],
        },
    },
    facebook: {
        appId: process.env.NEXT_PUBLIC_FB_APP_ID!,
    },
    other: {
        'p:domain_verify': '17e6e3cc4fa6744677baf74c22411d8d',
        'facebook-domain-verification': 'g7w4rsbdbiffzthsoh176leffkonxf',
        'fb:admins': '100009403062755',
        'google-adsense-account': process.env.NEXT_PUBLIC_ADSENSE_PUBLISHER_ID!
    },
}

interface RootLayoutProps {
    children: React.ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
    return (
        <html lang="en" data-theme="light" suppressHydrationWarning={process.env.NODE_ENV === 'production'}>
            {process.env.NODE_ENV === 'production' &&
                <head>
                    <Script src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GA4_ID}`} />
                    <Script id="google-analytics">
                        {`
                            window.dataLayer = window.dataLayer || [];
                            function gtag(){dataLayer.push(arguments);}
                            gtag('js', new Date());
                            gtag('config', '${process.env.NEXT_PUBLIC_GA4_ID}', {"cookie_prefix":"JoGtag","cookie_domain":"${process.env.NEXT_PUBLIC_SITE_URL}","cookie_flags":"samesite=none;secure","allow_google_signals":true});
                        `}
                    </Script>
                    <Script async src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${process.env.NEXT_PUBLIC_ADSENSE_PUBLISHER_ID}`} crossOrigin="anonymous" strategy="afterInteractive" />
                </head>
            }
            <body className={`${livvic.className} overflow-x-hidden text-sm md:text-base ${livvic.variable}`}>
                <Providers>{children}</Providers>
                <OneSignal />
                {process.env.NODE_ENV === 'production' &&
                    <>
                        <Script id="statcounter">
                            {`
                                var sc_project=11108007; 
                                var sc_invisible=1; 
                                var sc_security="13b4e93a"; 
                            `}
                        </Script>
                        <Script src="https://www.statcounter.com/counter/counter.js" async={true} />
                    </>
                }
            </body>
        </html>
    )
}