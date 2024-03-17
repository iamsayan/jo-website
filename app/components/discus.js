'use client'

import { usePathname } from 'next/navigation';

const Disqus = () => {
    const pathname = usePathname();

    return (
        <div className="mt-6">
            <div
                data-chirpy-theme="system"
                data-chirpy-comment="true"
                id="chirpy-comment"
            ></div>
        </div>
    );
};

export default Disqus;