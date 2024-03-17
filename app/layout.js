import Script from "next/script"
import { outfit } from "@/app/fonts"
import './globals.sass'

export const metadata = {
    metadataBase: new URL(process.env.SITE_URL),
    alternates: {
        canonical: '/',
    },
    title: {
        template: '%s - Jagadhatri Online | the #1 Popular Jagadhatri Puja Portal',
        default: 'Jagadhatri Online | the #1 Puja Portal for Chandannagar Jagadhatri Puja',
    },
    description: `Jagadhatri or Jagaddhatri is an aspect of the Hindu goddess Durga, who is particularly worshipped in the Chandannagar region of West Bengal, India. Her cult is directly derived from Tantra where she is a symbol of sattva beside Durga and Kali, respectably symbolized with Rajas and Tamas.`,
    keywords: ['jagadhatri puja', 'jagadhatri', 'chandannagar'],
    authors: [{ name: 'Sayan Datta', url: 'https://sayandatta.co.in' }],
    creator: 'Sayan Datta',
    publisher: 'Jagadhatri Online',
    copyright: 'Jagadhatri Online',
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
        authors: ['Sayan Datta', 'Jagadhatri Online Team'],
        url: '/'
    },
    verification: {
        google: 'DlFEkrjmoyJEMTrNA5wonqW45Se03O5RkI_9D8Md7Us',
    },
    other: {
        'p:domain_verify': '17e6e3cc4fa6744677baf74c22411d8d',
        'facebook-domain-verification': 'ym11t0xaxb0v6wd0hctilep9ww4w0o',
        'fb:app_id': process.env.NEXT_PUBLIC_FB_APP_ID,
        'fb:admins': '100009403062755',
        'google-adsense-account': process.env.NEXT_PUBLIC_ADSENSE_PUBLISHER_ID
    },
}

export default function RootLayout({ children }) {
    return (
        <html lang="en" data-theme="light">
            {process.env.NODE_ENV === 'production' &&
                <>
                    <Script src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GA4_ID}`}/>
                    <Script id="google-analytics">
                        {`
                            window.dataLayer = window.dataLayer || [];
                            function gtag(){dataLayer.push(arguments);}
                            gtag('js', new Date());
                            gtag('config', '${process.env.NEXT_PUBLIC_GA4_ID}', {"cookie_prefix":"JoGtag","cookie_domain":"www.jagadhatrionline.co.in","cookie_flags":"samesite=none;secure","allow_google_signals":true});
                        `}
                    </Script>
                    <Script defer src="https://chirpy.dev/bootstrapper.js" data-chirpy-domain="www.jagadhatrionline.co.in" strategy="lazyOnload" />
                    <Script
                        async
                        src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${process.env.NEXT_PUBLIC_ADSENSE_PUBLISHER_ID}`}
                        crossOrigin="anonymous"
                        strategy="lazyOnload"
                    />
                </>
            }
            <body className={`${outfit.className} overflow-x-hidden text-sm md:text-base ${outfit.variable}` }>
                {children}
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