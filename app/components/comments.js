'use client'

import { FacebookProvider, Comments } from 'react-facebook';

export default function CommentsProvider({ path }) {
    return (
        <FacebookProvider appId="906906950683467">
            <Comments href={`${process.env.SITE_URL}${path}`} width="100%" className="pt-6" />
        </FacebookProvider>
    )
}