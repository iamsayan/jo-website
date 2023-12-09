'use client'

import { useRouter } from 'next/navigation'

export default function Page() {
    const router = useRouter()

    router.push(`/jagadhatri-puja/${new Date().getFullYear()}`, undefined, { shallow: true });
}