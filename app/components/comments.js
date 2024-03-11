'use client'

import { usePathname } from 'next/navigation';
import { FacebookProvider, Comments as FBComments } from 'react-facebook';

const Comments = () => {
    const pathname = usePathname();

    return (
        <div className="mt-6">
            <FacebookProvider appId={process.env.NEXT_PUBLIC_FB_APP_ID}>
                <FBComments href={`${process.env.SITE_URL}${pathname}`} width="100%" orderBy="time" lazy={true} />
            </FacebookProvider>
        </div>
    );
};

export default Comments;