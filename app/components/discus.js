'use client'

import { usePathname } from 'next/navigation';
import { DiscussionEmbed } from 'disqus-react';

const Disqus = () => {
    const pathname = usePathname();

    return (
        <div className="mt-6">
            <DiscussionEmbed
                shortname="jagadhatri-online"
                config={
                    {
                        url: `${process.env.SITE_URL}${pathname}`,
                        identifier: pathname.replaceAll('/', '-'),
                    }
                }
            />
        </div>
    );
};

export default Disqus;