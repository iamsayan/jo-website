'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import cx from 'classix';
import { usePathname } from 'next/navigation';
import logo from '@/public/logo.png';
import circleLogo from '@/public/circle-logo.png';
import { FaShoppingBag, FaGift } from 'react-icons/fa';

interface MenuItem {
    name: string;
    path: string | object;
    target?: '_blank' | '_self';
    subMenu?: MenuItem[];
}

const Navbar: React.FC = () => {
    const pathname = usePathname();
    const [isScrolled, setIsScrolled] = useState<boolean>(false);
    const [isInitialized, setIsInitialized] = useState<boolean>(false);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 5);
        };

        // Check scroll position immediately
        handleScroll();
        setIsInitialized(true);

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
                { name: `DMP Program ${new Date().getFullYear()}`, path: '/digital-media-partnership' },
                // { name: '360° Virtual Tours', path: 'https://vr.jagadhatrionline.co.in/', target: '_blank' }
            ],
        }
    ];

    return (
        <header className="bg-transparent relative z-10">
            {isInitialized && (
                <div
                    className={`navbar-container fixed w-full top-0 left-0 z-50 transition-all duration-300 ${isScrolled
                        ? 'animate-top-to-bottom bg-white shadow-xs border-b-[1px] border-gray-300'
                        : 'bg-transparent border-b-[1px] border-[#ffffff14]'
                        }`}
                >
                    <div className="navbar container mx-auto px-0">
                        <div className="navbar-start">
                            <div className="dropdown">
                                <label tabIndex={0} className={`btn btn-ghost ${!isScrolled && 'text-white'} lg:hidden`}>
                                    <svg xmlns="http://www.w3.org/2000/svg" className="size-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" />
                                    </svg>
                                </label>
                                <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow-sm bg-base-100 rounded-box w-56">
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
                                    {/* Store */}
                                    <li className="mt-2">
                                        <a
                                            href="https://store.jagadhatrionline.co.in"
                                            target="_blank"
                                            className="flex items-center gap-2 font-bold bg-gradient-to-r from-blue-500 to-purple-600 
                                                     text-white rounded-md relative group"
                                        >
                                            <FaShoppingBag className="text-lg" />
                                            <span>Store</span>
                                            <FaGift className="text-yellow-300 absolute right-2 top-1/2 -translate-y-1/2 
                                                           animate-bounce" />
                                        </a>
                                    </li>
                                </ul>
                            </div>
                            <div className="hidden lg:block">
                                <Link href="/">
                                    <Image
                                        src={isScrolled ? circleLogo : logo}
                                        alt="Jagadhatri Online Logo"
                                        className={isScrolled ? 'h-10 w-10' : 'h-12 w-auto'}
                                        priority={true}
                                    />
                                </Link>
                            </div>
                        </div>
                        <div className="navbar-center">
                            <div className="lg:hidden">
                                <Link href="/">
                                    <Image
                                        src={isScrolled ? circleLogo : logo}
                                        alt="Jagadhatri Online Logo"
                                        className={isScrolled ? 'h-10 w-10' : 'h-12 w-auto'}
                                        priority={true}
                                    />
                                </Link>
                            </div>
                            <ul className="menu menu-horizontal px-1 gap-2 uppercase font-bold hidden lg:flex">
                                {items.map((item, index) => {
                                    const classes = cx(
                                        isScrolled ? 'text-slate-600' : 'text-slate-300 focus:!text-white focus:!bg-transparent focus:!text-yellow-500 active:!bg-transparent',
                                        pathname === item.path && '!text-yellow-500',
                                    );
                                    return (
                                        <li key={index}>
                                            {item.subMenu ? (
                                                <details>
                                                    <summary className={classes}>{item.name}</summary>
                                                    <ul className="p-2 w-56">
                                                        {item.subMenu.map((subItem, subIndex) => {
                                                            const innerClasses = cx(
                                                                !isScrolled && 'text-slate-600',
                                                                pathname === subItem.path && '!text-yellow-500',
                                                            );
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
                        <div className="navbar-end flex gap-3">
                            <div className="hidden lg:block relative group">
                                <a
                                    href="https://store.jagadhatrionline.co.in"
                                    target="_blank"
                                    className="flex items-center gap-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white 
                                             px-5 py-2.5 rounded-lg font-medium transition-all duration-300 
                                             hover:shadow-[0_0_15px_rgba(59,130,246,0.5)] group-hover:scale-105"
                                >
                                    <FaShoppingBag className="text-xl animate-bounce" />
                                    <span>Store</span>

                                    <span className="absolute -top-2 -right-2 bg-yellow-500 text-white text-xs px-2 py-1 rounded-full 
                                                 animate-pulse">
                                        New
                                    </span>
                                </a>

                                <div className="absolute hidden group-hover:block top-full left-1/2 -translate-x-1/2 mt-2 w-48 p-2 
                                              bg-white rounded-lg shadow-lg border border-gray-100">
                                    <div className="text-center">
                                        <p className="text-gray-800 font-semibold mb-1">Visit Our Store!</p>
                                        <p className="text-sm text-gray-600">Stationery • T-Shirts • Hoodies</p>
                                    </div>
                                </div>
                            </div>
                            <a className="hidden lg:flex items-center gap-2 btn bg-yellow-500 border-0 uppercase py-2.5 px-5 h-auto shadow-none rounded-md hover:bg-yellow-400" href="https://vr.jagadhatrionline.co.in/" target="_blank">
                                360° Virtual Tours
                            </a>
                        </div>
                    </div>
                </div>
            )}
        </header>
    );
};

export default Navbar;