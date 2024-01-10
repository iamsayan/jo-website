import Link from 'next/link';
import { FaYoutube, FaFacebookF, FaInstagram, FaXTwitter } from "react-icons/fa6";

export default function Footer() {
    const items = [
        {
            name: 'About',
            path: '/about-us'
        },
        {
            name: 'Contact',
            path: '/contact-us'
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
        <footer className="p-10 bg-neutral text-neutral-content">
            <div className="footer footer-center container mx-auto">
              <nav className="grid grid-flow-row md:grid-flow-col gap-2 md:gap-4">
                  {items?.map((item, index) => (
                      <div key={index} className="text-xs md:text-sm">
                          <Link href={item?.path} className="link link-hover">{item?.name}</Link>
                      </div>
                  ))}
              </nav>
              <nav>
                  <div className="grid grid-flow-col gap-4">
                      <a href="https://www.facebook.com/JagadhatriOnlineOfficial/" target="_blank">
                          <FaFacebookF className="h-6 w-6 sm:h-8 sm:w-8 md:h-6 md:w-6"/>
                      </a>
                      <a href="https://www.youtube.com/c/JagadhatriOnline" target="_blank">
                          <FaYoutube className="h-6 w-6 sm:h-8 sm:w-8 md:h-6 md:w-6"/>
                      </a>
                      <a href="https://www.instagram.com/jagadhatri_online" target="_blank">
                          <FaInstagram className="h-6 w-6 sm:h-8 sm:w-8 md:h-6 md:w-6"/>
                      </a>
                      <a href="https://twitter.com/JagadhatriLive" target="_blank">
                          <FaXTwitter className="h-6 w-6 sm:h-8 sm:w-8 md:h-6 md:w-6"/>
                      </a>
                  </div>
              </nav>
                <aside className="text-slate-400 text-xs">
                    <p>Copyright © 2016 - {new Date().getFullYear()} Jagadhatri Online. All Rights Reserved.</p>
                    <p>Unauthorised copying or representation of any content / photograph / illustration / artwork
                      from this website is strictly prohibited.</p>
              </aside>
            </div>
        </footer>
    )
}