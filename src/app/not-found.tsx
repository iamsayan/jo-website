import React from "react";
import type { Metadata } from 'next'
import Link from 'next/link';
import { FaArrowLeftLong } from 'react-icons/fa6';

export const metadata: Metadata = {
    title: '404: This page could not be found',
    description: 'Oops! The page you are looking for does not exist. Find your way back home.'
};

const NotFound: React.FC = () => {
    return (
        <div className="bg-gray-200 w-full px-16 md:px-0 h-screen flex items-center justify-center">
            <div className="bg-white border border-gray-200 flex flex-col items-center justify-center px-4 md:px-8 lg:px-24 py-8 rounded-lg shadow-2xl">
                <p className="text-6xl md:text-7xl lg:text-9xl font-bold tracking-wider text-gray-300">404</p>
                <p className="text-2xl md:text-3xl lg:text-4xl font-bold tracking-wider text-gray-500 mt-4">Page Not Found</p>
                <p className="text-gray-500 mt-4 pb-4 border-b-2 text-center">Sorry, the page you are looking for could not be found.</p>
                <Link href="/" className="flex items-center space-x-2 bg-blue-600 hover:bg-blue-700 text-gray-100 px-4 py-2 mt-6 rounded transition duration-150" title="Return Home">
                    <FaArrowLeftLong /><span>Return Home</span>
                </Link>
            </div>
        </div>
    );
}

export default NotFound;
