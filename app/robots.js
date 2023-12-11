export default async function robots() {
    return {
        rules: {
            userAgent: '*',
            allow: '/',
            disallow: '/private/',
        },
        sitemap: 'https://www.jagadhatrionline.co.in/sitemap.xml',
    }
}