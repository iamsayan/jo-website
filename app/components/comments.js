'use client'

import { FacebookProvider, Comments } from 'react-facebook';
import NoSsr from "@/app/utils/nossr";

export default function CommentsProvider({ path }) {
    return (
        <div className="mt-6">
            <FacebookProvider appId="906906950683467">
                <Comments href={`${process.env.SITE_URL}${path}`} width="100%" />
            </FacebookProvider>
        </div>
    )
}