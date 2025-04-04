'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { GoHome } from "react-icons/go";
import { FaRegFolder } from "react-icons/fa";
import { cn } from '@/utils/functions';

interface BreadcrumbsProps {
    breadcrumbTitle?: string | null;
    end?: number | null;
    className?: string;
}

const Breadcrumbs: React.FC<BreadcrumbsProps> = ({ breadcrumbTitle = null, end = null, className }) => {
    const pathname = usePathname();
    let pathItems = pathname.split('/').filter(item => item !== '');
    pathItems = end !== null ? pathItems.slice(0, end) : pathItems;

    return (
        <div className={cn("text-xs breadcrumbs text-white/90 capitalize p-0", className)}>
            <ul>
                <li>
                    <Link href="/" className="flex items-center gap-2">
                        <GoHome /> Home
                    </Link>
                </li>
                {pathItems?.map((item, index) => {
                    const title = breadcrumbTitle && index === (pathItems?.length - 1) ? breadcrumbTitle : item.replaceAll('-', ' ');
                    return (
                        <li key={index}>
                            <div className="inline-block text-ellipsis overflow-hidden whitespace-nowrap">
                                {index === pathItems.length - 1
                                    ? title
                                    : <Link href={`/${pathItems.slice(0, index + 1).join('/')}`} className="flex items-center gap-2">
                                        <FaRegFolder /> {title}
                                    </Link>
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
