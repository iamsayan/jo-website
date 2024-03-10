'use client';

import { useEffect, useRef } from "react";
import { usePathname, useSearchParams } from 'next/navigation';

const GoogleAdUnitClient = ({ children }) => {
    const initialized = useRef(false)
    const pathname = usePathname();
    const searchParams = useSearchParams();

    useEffect(() => {
        if (!initialized.current) {
            initialized.current = true;
            try {
                (window.adsbygoogle = window.adsbygoogle || []).push({});
            } catch (err) {
                console.error(err);
            }
        }
    }, [pathname, searchParams]);

    return <div className="google-ad">{children}</div>;
};

export default GoogleAdUnitClient;