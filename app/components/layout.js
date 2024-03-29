import Main from '@/app/components/main'
import Breadcrumbs from "@/app/components/breadcrumbs";
import { paytoneOne } from "@/app/fonts";

import bg from '../../public/img.png'

export default function Layout({ children, title, jsonLd = null, breadcrumbTitle = null, end = null }) {
    return (
        <Main jsonLd={jsonLd}>
            <div className="hero h-96" style={{backgroundImage: `url(${bg.src})`}}>
                <div className="hero-overlay bg-slate-900 bg-opacity-70"></div>
                <div className="flex-col hero-content text-center text-white-content text-white p-0 pt-10">
                    <h1 className={`text-3xl ${paytoneOne.className}`}>{title}</h1>
                    <Breadcrumbs breadcrumbTitle={breadcrumbTitle} end={end} />
                </div>
            </div>
            {children}
        </Main>
    )
}
