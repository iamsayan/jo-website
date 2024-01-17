'use client'

import { FacebookProvider, Comments } from 'react-facebook';
import NoSsr from "@/app/utils/nossr";

export default function CommentsProvider({ path }) {
    return (
        <NoSsr>
            <FacebookProvider appId="906906950683467">
                <Comments href={`${process.env.SITE_URL}${path}`} lazy={true} width="100%" className="pt-6" />
            </FacebookProvider>
        </NoSsr>
    )
}