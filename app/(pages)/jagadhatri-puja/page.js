'use client'

import { useEffect } from "react";
import { useRouter } from 'next/navigation'

export default function Page() {
    const router= useRouter()

    useEffect(() => {
        router.push(`/jagadhatri-puja/${new Date().getFullYear()}`, undefined, { shallow: true });
    }, []);
}