/** @type {import('next').NextConfig} */
const nextConfig = {
    env: {
        API_URL: process.env.API_URL,
        API_KEY: process.env.API_KEY,
        SITE_URL: process.env.NODE_ENV === 'development' ? process.env.DEV_URL : process.env.LIVE_URL,
        WEB3_FORM_API_KEY: process.env.WEB3_FORM_ACCESS_KEY,
        GOOGLE_MAP_API_KEY: process.env.GOOGLE_MAP_API_KEY,
        GA4_ID: process.env.GA4_ID,
    },
    async redirects() {
        return [
            {
                source: '/jagadhatri-puja-:year',
                destination: '/jagadhatri-puja/:year', // Matched parameters can be used in the destination
                permanent: true,
            },
        ]
    },
}

module.exports = nextConfig
