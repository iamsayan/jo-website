'use client';

import React, { ReactNode } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';
import { useEffectOnce } from '@/hooks/useEffectOnce';

declare global {
    interface Window {
        adsbygoogle: any[];
    }
}

interface GoogleAdUnitClientProps {
    children: ReactNode;
}

const GoogleAdUnitClient: React.FC<GoogleAdUnitClientProps> = ({ children }) => {
    const pathname = usePathname();
    const searchParams = useSearchParams();

    useEffectOnce(() => {
        try {
            (window.adsbygoogle = window.adsbygoogle || []).push({});
        } catch (err) {
            console.error(err);
        }
    }, [pathname, searchParams]);

    return <div className="google-ad">{children}</div>;
};

export default GoogleAdUnitClient;