import { cn } from '@/app/utils/functions';
import NavBar from './navbar'
import Footer from './footer'

export default function Main({children, className, jsonLd}) {
    const classes = cn( 'flex flex-col flex-wrap items-center justify-between', className );
  
    return (
        <>
            {jsonLd && <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
            />}
            <NavBar />
            <main className={classes}>{children}</main>
            <Footer />
        </>
    )
}
