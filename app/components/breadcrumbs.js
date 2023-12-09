'use client'

import Link from 'next/link';
import { usePathname, useSearchParams } from 'next/navigation';

const Breadcrumbs = () => {
    const pathname = usePathname()
    const pathSegments = pathname.split('/').filter((segment) => segment !== '');

    return (
        <div className="text-xs breadcrumbs uppercase">
            <ul>
                <li>
                    <Link href="/">Home</Link>
                </li>
                {pathSegments.map((segment, index) => (
                    <li key={index}>
                        <Link href={`/${pathSegments.slice(0, index + 1).join('/')}`}>{segment.replaceAll('-', ' ')}</Link>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Breadcrumbs;