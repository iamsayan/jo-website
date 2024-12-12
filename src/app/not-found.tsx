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
            <div className="max-w-3xl w-full bg-white rounded-2xl shadow-2xl overflow-hidden">
                <div className="p-8 md:p-12 relative">
                    {/* Decorative background elements */}
                    <div className="absolute inset-0 opacity-5">
                        <div className="absolute -right-10 -top-10 w-44 h-44 rounded-full bg-blue-500"></div>
                        <div className="absolute -left-10 -bottom-10 w-32 h-32 rounded-full bg-purple-500"></div>
                    </div>
                    
                    {/* Content */}
                    <div className="relative space-y-8 text-center">
                        <h1 className="text-8xl md:text-9xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-purple-600">
                            404
                        </h1>
                        <h2 className="text-2xl md:text-3xl font-bold text-gray-800">
                            Page Not Found
                        </h2>
                        <p className="text-gray-600 max-w-md mx-auto">
                            Sorry, the page you are looking for could not be found. It might have been moved or deleted.
                        </p>
                        
                        {/* Store Section */}
                        <div className="border-t border-gray-200 pt-8 mt-8">
                            <h3 className="text-xl font-semibold text-gray-800 mb-4">
                                While you're here, check out our store!
                            </h3>
                            <div className="flex flex-col sm:flex-row gap-4 justify-center">
                                <Link 
                                    href="/" 
                                    className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white px-6 py-3 rounded-full font-medium hover:opacity-90 transition-opacity"
                                >
                                    <FaArrowLeftLong className="text-sm" />
                                    <span>Return Home</span>
                                </Link>
                                <a 
                                    href="https://store.jagadhatrionline.co.in" 
                                    target="_blank" 
                                    rel="noopener noreferrer"
                                    className="inline-flex items-center gap-2 bg-gradient-to-r from-yellow-500 to-orange-600 text-white px-6 py-3 rounded-full font-medium hover:opacity-90 transition-opacity"
                                >
                                    <span>Visit Our Store</span>
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                                    </svg>
                                </a>
                            </div>
                            <p className="text-sm text-gray-500 mt-4">
                                Discover our collection of stationery, t-shirts, hoodies, and more!
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default NotFound;
