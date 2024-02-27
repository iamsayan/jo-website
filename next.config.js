/** @type {import('next').NextConfig} */
const nextConfig = {
    env: {
        API_URL: process.env.API_URL,
        API_KEY: process.env.API_KEY,
        SITE_URL: process.env.NODE_ENV === 'development' ? process.env.DEV_URL : process.env.LIVE_URL,
        WEB3_FORM_API_KEY: process.env.WEB3_FORM_ACCESS_KEY,
        GOOGLE_MAP_API_KEY: process.env.GOOGLE_MAP_API_KEY,
    },
    images: {
        formats: [ 'image/webp' ],
        contentDispositionType: 'attachment',
        contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
        remotePatterns: [
            {
                protocol: 'https',
                hostname: '**.jagadhatrionline.co.in',
            },
        ],
    },
    async redirects() {
        return [
            {
                source: '/jagadhatri-puja-:year',
                destination: '/jagadhatri-puja/:year',
                permanent: true,
            },
            {
                source: '/puja',
                destination: '/puja-committee-list',
                permanent: true,
            },
        ]
    },
}

module.exports = nextConfig
