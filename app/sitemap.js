export default function sitemap() {
    return [
        {
            url: 'https://www.jagadhatrionline.co.in',
            lastModified: new Date(),
            changeFrequency: 'monthly',
            priority: 1,
        },
        {
            url: 'https://www.jagadhatrionline.co.in/puja-history',
            lastModified: new Date(),
            changeFrequency: 'monthly',
            priority: 0.8,
        },
        {
            url: `https://www.jagadhatrionline.co.in/jagadhatri-puja/${new Date().getFullYear()}`,
            lastModified: new Date(),
            changeFrequency: 'monthly',
            priority: 0.8,
        },
        {
            url: 'https://www.jagadhatrionline.co.in/puja-committee-list',
            lastModified: new Date(),
            changeFrequency: 'monthly',
            priority: 0.8,
        },
        {
            url: 'https://www.jagadhatrionline.co.in/terms',
            lastModified: new Date(),
            changeFrequency: 'monthly',
            priority: 0.5,
        },
        {
            url: 'https://www.jagadhatrionline.co.in/privacy-policy',
            lastModified: new Date(),
            changeFrequency: 'monthly',
            priority: 0.5,
        },
        {
            url: 'https://www.jagadhatrionline.co.in/about-us',
            lastModified: new Date(),
            changeFrequency: 'monthly',
            priority: 0.5,
        },
        {
            url: 'https://www.jagadhatrionline.co.in/contact-us',
            lastModified: new Date(),
            changeFrequency: 'monthly',
            priority: 0.5,
        },
        {
            url: 'https://www.jagadhatrionline.co.in/achievements/',
            lastModified: new Date(),
            changeFrequency: 'monthly',
            priority: 0.5,
        },
    ]
}