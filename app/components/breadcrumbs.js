import { FacebookProvider, Comments } from 'react-facebook';

export default function Main({ url }) {
    return (
        <FacebookProvider appId="2673466959356911">
            <Comments href={url} />
        </FacebookProvider>
    )
}