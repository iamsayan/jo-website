'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import classNames from 'classnames';
import { usePathname } from 'next/navigation';
import logo from '@/public/logo.png';
import circleLogo from '@/public/circle-logo.png';

interface MenuItem {
    name: string;
    path: string | object;
    target?: '_blank' | '_self';
    subMenu?: MenuItem[];
}

const Navbar: React.FC = () => {
    const pathname = usePathname();
    const [isScrolled, setIsScrolled] = useState<boolean>(false);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 5);
        };

        handleScroll();
        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    const items: MenuItem[] = [
        { name: 'Home', path: '/' },
        { name: 'History', path: '/puja-history' },
        { name: 'Gallery', path: '/gallery' },
        { name: 'Jagadhatri Puja', path: '/jagadhatri-puja' },
        { name: 'Puja List', path: '/puja-committee-list' },
        {
            name: 'Links',
            path: '#',
            subMenu: [
                { name: 'Achievements', path: '/achievements' },
                { name: 'Hoimontika Somman', path: '/hoimontika-somman' },
                { name: 'DMP Programme', path: '/digital-media-partnership' },
                // { name: '360° Virtual Tours', path: 'https://vr.jagadhatrionline.co.in/', target: '_blank' }
            ],
        }
    ];

    return (
        <header className="bg-transparent relative z-10">
            <div
                className={`navbar-container fixed w-full top-0 left-0 z-50 transition-colors ${isScrolled ? 'animate-top-to-bottom bg-white border-b-[1px] border-gray-300' : 'bg-transparent border-b-[1px] border-[#ffffff14]'}`}
            >
                <div className="navbar container mx-auto px-0">
                    <div className="navbar-start">
                        <div className="dropdown">
                            <label tabIndex={0} className={`btn btn-ghost ${!isScrolled && 'text-white'} lg:hidden`}>
                                <svg xmlns="http://www.w3.org/2000/svg" className="size-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" />
                                </svg>
                            </label>
                            <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
                                {items.map((item, index) => (
                                    <li key={index}>
                                        {item.subMenu ? (
                                            <details>
                                                <summary className="font-bold">{item.name}</summary>
                                                <ul className="p-2">
                                                    {item.subMenu.map((subItem, subIndex) => (
                                                        <li key={subIndex}>
                                                            <Link href={subItem.path} target={subItem.target ?? '_self'} className="font-bold">
                                                                {subItem.name}
                                                            </Link>
                                                        </li>
                                                    ))}
                                                </ul>
                                            </details>
                                        ) : (
                                            <Link href={item.path} className="font-bold">
                                                {item.name}
                                            </Link>
                                        )}
                                    </li>
                                ))}
                            </ul>
                        </div>
                        <div className="p-2">
                            <Link href="/">
                                <Image
                                    height={45}
                                    src={isScrolled ? circleLogo : logo}
                                    priority={true}
                                    alt="Jagadhatri Online Logo"
                                />
                            </Link>
                        </div>
                    </div>
                    <div className="navbar-center hidden lg:flex">
                        <ul className="menu menu-horizontal px-1 gap-2 uppercase font-bold">
                            {items.map((item, index) => {
                                const classes = classNames({
                                    'text-slate-300 focus:!text-white focus:!bg-transparent focus:!text-yellow-500 active:!bg-transparent': !isScrolled,
                                    'text-slate-600': isScrolled,
                                    '!text-yellow-500': pathname === item.path,
                                });
                                return (
                                    <li key={index}>
                                        {item.subMenu ? (
                                            <details>
                                                <summary className={classes}>{item.name}</summary>
                                                <ul className="p-2 w-52">
                                                    {item.subMenu.map((subItem, subIndex) => {
                                                        const innerClasses = classNames('text-slate-600', {
                                                            '!text-yellow-500': pathname === subItem.path,
                                                        });
                                                        return (
                                                            <li key={subIndex}>
                                                                <Link href={subItem.path} target={subItem.target ?? '_self'} className={innerClasses}>
                                                                    {subItem.name}
                                                                </Link>
                                                            </li>
                                                        );
                                                    })}
                                                </ul>
                                            </details>
                                        ) : (
                                            <Link href={item.path} target={item.target ?? '_self'} className={classes}>
                                                {item.name}
                                            </Link>
                                        )}
                                    </li>
                                );
                            })}
                        </ul>
                    </div>
                    <div className="navbar-end hidden lg:flex">
                        <a className="btn bg-yellow-500 border-0 uppercase py-3 px-5 h-auto min-h-full rounded-md hover:bg-yellow-400" href="https://vr.jagadhatrionline.co.in/" target="_blank">
                            360° Virtual Tours
                        </a>
                    </div>
                </div>
            </div>
        </header>
    );
};

export default Navbar;