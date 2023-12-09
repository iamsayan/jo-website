/** @type {import('next').NextConfig} */
const nextConfig = {
    env: {
        API_URL: process.env.API_URL,
        API_KEY: process.env.API_KEY,
        SITE_URL: process.env.NODE_ENV === 'development' ? process.env.DEV_URL : process.env.LIVE_URL,
    },
}

module.exports = nextConfig
