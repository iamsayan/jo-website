import type { MetadataRoute } from 'next'

export default function manifest(): MetadataRoute.Manifest {
    return {
        name: 'Jagadhatri Online',
        short_name: 'Jagadhatri Online',
        description: 'the #1 Puja Portal for Chandannagar Jagadhatri Puja',
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