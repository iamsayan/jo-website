import {
    Hind_Siliguri,
    Outfit,
    Paytone_One,
} from 'next/font/google'

export const outfit= Outfit({
    subsets: ['latin'],
    variable: '--video-font-family',
})

export const paytoneOne= Paytone_One({
    weight: '400',
    subsets: ['latin']
})

export const hind= Hind_Siliguri({
    weight: ['400', '500', '600', '700'],
    subsets: ['latin'],
    variable: '--video-font-family',
})