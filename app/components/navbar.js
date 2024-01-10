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
            name: 'Puja History',
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

    return (
        <header className="bg-transparent border border-yellow-500">
            <div className="navbar-container absolute w-full">
                <div className="navbar container mx-auto px-0">
                    <div className="navbar-start">
                        <div className="dropdown">
                            <label tabIndex={0} className="btn btn-ghost text-white lg:hidden">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
                            </label>
                            <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
                                {items.map((item, index) => (
                                    <li key={index}>
                                        <Link href={item?.path} className={`font-bold ${(pathname === item?.path ) ? 'text-whitegh' : 'text-slate-3f00'}`}>{item?.name}</Link>
                                    </li>
                                ))}
                            </ul>
                        </div>
                        <div className="p-2">
                            <Link href="/">
                                <Image
                                    height={45}
                                    src={logo}
                                    priority={true}
                                    alt="Picture of the author"
                                    //style={{objectFit: "contain", height: "100%"}}
                                />
                            </Link>
                        </div>
                    </div>
                    <div className="navbar-center hidden lg:flex">
                        <ul className="menu menu-horizontal px-1 gap-2 uppercase font-bold">
                            {items.map((item, index) => (
                                <li key={index}>
                                    <Link href={item?.path} className={`focus:!text-white focus:!bg-transparent ${(pathname === item?.path ) ? 'text-yellow-500' : 'text-slate-300'} focus:!text-yellow-500 active:!bg-transparent `}>{item?.name}</Link>
                                </li>
                            ))}
                        </ul>
                    </div>
                    <div className="navbar-end hidden lg:flex">
                        <a className="btn bg-yellow-500 border-0 uppercase py-3 px-5 h-auto min-h-full rounded-md hover:bg-yellow-400" href="https://vr.jagadhatrionline.co.in/" target="_blank">360° Virtual Tours</a>
                    </div>
                </div>
            </div>
        </header>
    )
}