import React from 'react';
import Main from '@/components/main';
import Breadcrumbs from '@/components/breadcrumbs';
import { paytoneOne } from '@/fonts';
import bg from '@/public/assets/2024/circuscover.jpg';

interface LayoutProps {
    children: React.ReactNode;
    title: string;
    jsonLd?: object;
    breadcrumbTitle?: string;
    end?: number;
    bgImg?: { src: string };
}

export default function MainLayout({ children, title, jsonLd, breadcrumbTitle, end, bgImg }: LayoutProps) {
    const bgImage = typeof bgImg !== 'undefined' ? bgImg.src : bg.src;
    return (
        <Main jsonLd={jsonLd}>
            <div className="hero h-96 relative" style={{backgroundImage: `url(${bgImage})`}}>
                <div className="hero-overlay bg-black/70"></div>
                <div className="flex-col hero-content text-center text-white-content text-white p-0 pt-10">
                    <h1 className={`text-3xl ${paytoneOne.className}`}>{title}</h1>
                    <div className="text-amber-100/90">
                        <Breadcrumbs breadcrumbTitle={breadcrumbTitle} end={end} />
                    </div>
                    <div className="absolute top-4 left-4 w-12 h-12 border-t-2 border-l-2 border-amber-500/30"></div>
                    <div className="absolute top-4 right-4 w-12 h-12 border-t-2 border-r-2 border-amber-500/30"></div>
                    <div className="absolute bottom-4 left-4 w-12 h-12 border-b-2 border-l-2 border-amber-500/30"></div>
                    <div className="absolute bottom-4 right-4 w-12 h-12 border-b-2 border-r-2 border-amber-500/30"></div>
                </div>
            </div>
            {children}
        </Main>
    );
};
