'use client'

import { usePathname, useSearchParams } from 'next/navigation';
import { FacebookProvider, Comments as FBComments } from 'react-facebook';

const Comments = () => {
    const pathname = usePathname();
    const searchParams = useSearchParams();

    return (
        <FacebookProvider appId={process.env.NEXT_PUBLIC_FB_APP_ID}>
            <FBComments href={`${process.env.SITE_URL}${pathname}`} />
        </FacebookProvider>
    );
};

export default Comments;