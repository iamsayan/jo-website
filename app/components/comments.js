'use client'

import { usePathname } from 'next/navigation';
import { FacebookProvider, Comments as FBComments } from 'react-facebook';

const Comments = () => {
    const pathname = usePathname();

    return (
        <div className="mt-6">
            <FacebookProvider appId={process.env.NEXT_PUBLIC_FB_APP_ID} version="v19.0" autoLogAppEvents={true} xfbml={true} language="en_GB">
                <FBComments href={`${process.env.SITE_URL}${pathname}`} width="100%" orderBy="reverse_time" />
            </FacebookProvider>
        </div>
    );
};

export default Comments;