'use client'

import Link from 'next/link';
import { usePathname, useSearchParams } from 'next/navigation';

const Breadcrumbs = () => {
    const pathname = usePathname()
    const pathitems = pathname.split('/').filter((item) => item !== '');

    return (
        <div className="text-xs breadcrumbs uppercase">
            <ul>
                <li>
                    <Link href="/">Home</Link>
                </li>
                {pathitems.map((item, index) => (
                    <li key={index}>
                        <Link href={`/${pathitems.slice(0, index + 1).join('/')}`}>{item.replaceAll('-', ' ')}</Link>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Breadcrumbs;