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
        <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 flex items-center justify-center p-4">
            <div className="max-w-2xl w-full bg-white rounded-2xl shadow-2xl overflow-hidden">
                <div className="p-8 md:p-12 relative">
                    <div className="absolute inset-0 opacity-5">
                        <div className="absolute -right-10 -top-10 w-44 h-44 rounded-full bg-blue-500"></div>
                        <div className="absolute -left-10 -bottom-10 w-32 h-32 rounded-full bg-purple-500"></div>
                    </div>
                    <div className="relative space-y-6 text-center">
                        <h1 className="text-8xl md:text-9xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-purple-600">
                            404
                        </h1>
                        <h2 className="text-2xl md:text-3xl font-bold text-gray-800">
                            Page Not Found
                        </h2>
                        <p className="text-gray-600 max-w-md mx-auto">
                            Sorry, the page you are looking for could not be found. It might have been moved or deleted.
                        </p>
                        <Link 
                            href="/" 
                            className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white px-6 py-3 rounded-full font-medium hover:opacity-90 transition-opacity"
                        >
                            <FaArrowLeftLong className="text-sm" />
                            <span>Return Home</span>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default NotFound;
