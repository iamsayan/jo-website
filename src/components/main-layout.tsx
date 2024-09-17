import React from 'react';
import Main from '@/components/main';
import Breadcrumbs from '@/components/breadcrumbs';
import { paytoneOne } from '@/fonts';
import bg from '@/public/img.png';

interface LayoutProps {
    children: React.ReactNode;
    title: string;
    jsonLd?: object;
    breadcrumbTitle?: string;
    end?: number;
    bgImg?: { src: string };
}

export default function MainLayout({ children, title, jsonLd, breadcrumbTitle, end, bgImg }: LayoutProps) {
    return (
        <Main jsonLd={jsonLd}>
            <div className="hero h-96" style={{backgroundImage: `url(${typeof bgImg !== 'undefined' ? bgImg.src : bg.src})`}}>
                <div className="hero-overlay bg-slate-900 bg-opacity-70"></div>
                <div className="flex-col hero-content text-center text-white-content text-white p-0 pt-10">
                    <h1 className={`text-3xl ${paytoneOne.className}`}>{title}</h1>
                    <Breadcrumbs breadcrumbTitle={breadcrumbTitle} end={end} />
                </div>
            </div>
            {children}
        </Main>
    );
};
