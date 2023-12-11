'use client'

import Link from 'next/link';
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import logo from '../../public/logo.png'

export default function Navbar() {
    const pathname = usePathname()

    const items = [
        {
            name: 'Home',
            path: '/'
        },
        {
            name: 'History',
            path: '/puja-history'
        },
        {
            name: 'Jagadhatri Puja',
            path: '/jagadhatri-puja'
        },
        {
            name: 'Puja List',
            path: '/puja-committee-list'
        },
    ]

    const topItems = [
        {
            name: 'About Us',
            path: '/about-us'
        },
        {
            name: 'Terms & Conditions',
            path: '/terms'
        },
        {
            name: 'Privacy Policy',
            path: '/privacy-policy'
        },
    ]

    return (
        <header className="bg-transparent">
            <div className="bg-yellow-500 hidden lg:block">
                <div className="container mx-auto py-2">
                    <div className="flex gap-5 text-neutral-950 uppercase text-xs font-semibold" role="menubar">
                        {topItems.map((segment, index) => (
                            <div key={index}>
                                <Link href={segment?.path} className={`${(pathname === segment?.path ) ? 'text-black' : 'text-slate-800'}`}>{segment?.name}</Link>
                            </div>
                        ))}
                        <div>
                            <a href="https://www.messenger.com/t/JagadhatriOnlineOfficial" target="_blank">Message Us</a>
                        </div>
                    </div>
                </div>
            </div>
            <div className="navbar-container absolute w-full">
                <div className="navbar container mx-auto px-0">
                    <div className="navbar-start">
                        <div className="dropdown">
                            <label tabIndex={0} className="btn btn-ghost text-white lg:hidden">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
                            </label>
                            <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
                                {items.map((segment, index) => (
                                    <li key={index}>
                                        <Link href={segment?.path} className={`${(pathname === segment?.path ) ? 'text-white' : 'text-slate-300'}`}>{segment?.name}</Link>
                                    </li>
                                ))}
                            </ul>
                        </div>
                        <div className="p-2">
                            <Image
                                height={45}
                                src={logo}
                                priority={true}
                                alt="Picture of the author"
                                //style={{objectFit: "contain", height: "100%"}}
                            />
                        </div>
                    </div>
                    <div className="navbar-center hidden lg:flex">
                        <ul className="menu menu-horizontal px-1 gap-2 uppercase font-bold">
                            {items.map((segment, index) => (
                                <li key={index}>
                                    <Link href={segment?.path} className={`focus:!text-white focus:!bg-transparent ${(pathname === segment?.path ) ? 'text-white' : 'text-slate-300'}`}>{segment?.name}</Link>
                                </li>
                            ))}
                        </ul>
                    </div>
                    <div className="navbar-end hidden lg:flex">
                        <a className="btn bg-yellow-500 border-0 uppercase py-3 px-5 h-auto min-h-full rounded-md" href="https://vr.jagadhatrionline.co.in/" target="_blank">360° Virtual Tours</a>
                    </div>
                </div>
            </div>
        </header>
    )
}