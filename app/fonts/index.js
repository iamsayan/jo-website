import {
    Outfit,
    Paytone_One,
} from 'next/font/google'

export const outfit= Outfit({
    subsets: ['latin'],
    variable: '--font-family',
    display: 'swap',
})

export const paytoneOne= Paytone_One({
    weight: '400',
    subsets: ['latin'],
    display: 'swap',
})