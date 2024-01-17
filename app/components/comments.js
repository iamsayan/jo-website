'use client'

import { FacebookProvider, Comments } from 'react-facebook';

export default function CommentsProvider({ url }) {
    return (
        <FacebookProvider appId="906906950683467">
            <Comments href={url} />
        </FacebookProvider>
    )
}