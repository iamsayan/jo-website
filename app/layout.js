import { SpeedInsights } from '@vercel/speed-insights/next';
import { outfit } from "@/app/fonts";
import './globals.sass'
import GoogleAnalyticsProvider from "@/app/components/ga";

export const metadata = {
    metadataBase: new URL(process.env.SITE_URL),
    title: {
        template: '%s - Jagadhatri Online | the #1 Popular Jagadhatri Puja Portal',
        default: 'Jagadhatri Online | the #1 Puja Portal for Chandannagar Jagadhatri Puja',
    },
    description: `Jagadhatri or Jagaddhatri is an aspect of the Hindu goddess Durga, who is particularly worshipped in the Chandannagar region of West Bengal, India. Her cult is directly derived from Tantra where she is a symbol of sattva beside Durga and Kali, respectably symbolized with Rajas and Tamas.`,
    keywords: ['Next.js', 'React', 'JavaScript'],
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
    },
    other: {
        'google-site-verification': 'DlFEkrjmoyJEMTrNA5wonqW45Se03O5RkI_9D8Md7Us',
        'p:domain_verify': '17e6e3cc4fa6744677baf74c22411d8d',
    },
}

export default function RootLayout({ children }) {
    return (
        <html lang="en" data-theme="light">
            <body className={ `${outfit.className} overflow-x-hidden text-sm md:text-base ${outfit.variable}` }>
                {children}
                {process.env.NODE_ENV === 'production' &&
                    <>
                        <SpeedInsights />
                        <GoogleAnalyticsProvider />
                    </>
                }
            </body>
        </html>
    )
}