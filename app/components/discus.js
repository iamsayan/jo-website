'use client'

import { usePathname } from 'next/navigation';

const Disqus = () => {
    const pathname = usePathname();

    return (
        <div className="mt-6">
            <div id="cusdis_thread"
                 data-host="https://cusdis.com"
                 data-app-id="e1ca3c56-6fd1-4a23-8d2a-899b7731272b"
                 data-page-id={`${pathname}`}
                 data-page-url={`${process.env.SITE_URL}${pathname}`}
                 data-page-title={`${pathname.replaceAll('/', '')}`}
            ></div>
        </div>
    );
};

export default Disqus;