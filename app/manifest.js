export default function manifest() {
    return {
        name: 'Jagadhatri Online',
        short_name: 'Jagadhatri Online',
        description: 'Next.js App',
        start_url: '/',
        display: 'standalone',
        background_color: '#eab308',
        theme_color: '#eab308',
        icons: [
            {
                src: '/favicon.ico',
                sizes: 'any',
                type: 'image/x-icon',
            },
        ],
    }
}