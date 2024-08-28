'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

interface BreadcrumbsProps {
    breadcrumbTitle?: string | null;
    end?: number | null;
}

const Breadcrumbs: React.FC<BreadcrumbsProps> = ({ breadcrumbTitle = null, end = null }) => {
    const pathname = usePathname();
    let pathItems = pathname.split('/').filter(item => item !== '');
    pathItems = end !== null ? pathItems.slice(0, end) : pathItems;

    return (
        <div className="text-xs breadcrumbs uppercase">
            <ul>
                <li>
                    <Link href="/">Home</Link>
                </li>
                {pathItems?.map((item, index) => {
                    const title = breadcrumbTitle && index === (pathItems?.length - 1) ? breadcrumbTitle : item.replaceAll('-', ' ');
                    return (
                        <li key={index}>
                            <div className="inline-block overflow-ellipsis overflow-hidden whitespace-nowrap max-w-36">
                                {index === pathItems.length - 1
                                    ? title
                                    : <Link href={`/${pathItems.slice(0, index + 1).join('/')}`}>{title}</Link>
                                }
                            </div>
                        </li>
                    );
                })}
            </ul>
        </div>
    );
};

export default Breadcrumbs;
