'use client'

import Link from 'next/link';
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import logo from '../../public/logov5.png'

export default function Navbar() {
  const pathname = usePathname()

  return (
    <header className="bg-base-100">
      <div className="navbar container mx-auto">
        <div className="navbar-start">
          <div className="dropdown">
            <label tabIndex={0} className="btn btn-ghost lg:hidden">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
            </label>
            <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
              <li><Link href="/">Home</Link></li>
              <li>
                <a>Parentdfsf</a>
                <ul className="p-2">
                  <li><a>Submenu 1</a></li>
                  <li><a>Submenu 2</a></li>
                </ul>
              </li>
              <li><Link href="/participants">Participants</Link></li>
            </ul>
          </div>
          <Image 
            height={50}
            src={logo} 
            priority={true} 
            alt="Picture of the author" 
            //style={{objectFit: "contain", height: "100%"}} 
          />
        </div>
        <div className="navbar-end hidden lg:flex">
          <ul className="menu menu-horizontal px-1 gap-2">
            <li><Link className={`${pathname === '/' ? 'active' : ''}`} href="/">Home</Link></li>
            {/* <li tabIndex={0}>
              <details>
                <summary>Parent</summary>
                <ul className="p-2 w-40 rounded top-10">
                  <li><a>Submenu 1</a></li>
                  <li><a>Submenu 2</a></li>
                </ul>
              </details>
            </li> */}
            <li><Link className={`${pathname === '/participants' ? 'active' : ''}`} href="/participants">Participants</Link></li>
          </ul>
        </div>
        {/* <div className="navbar-end">
          <a className="btn">Button</a>
        </div> */}
      </div>
    </header>
  )
}