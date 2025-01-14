'use client';

import { getUrlSlug } from '@/utils/functions';
import Link from 'next/link';
import { useState, createElement } from 'react';
import { FaHistory, FaTrophy, FaMedal, FaAward, FaStar } from 'react-icons/fa';

interface AwardsSectionProps {
    awardsData: any;
}

export default function AwardsSection({ awardsData }: AwardsSectionProps) {
    const [activeYear, setActiveYear] = useState(awardsData?.[0]?.year);
    
    const getPositionStyle = (position: string) => {
        switch(position) {
            case 'First':
                return { icon: FaTrophy, color: 'text-yellow-500' };
            case 'Second':
                return { icon: FaMedal, color: 'text-gray-500' };
            case 'Third':
                return { icon: FaAward, color: 'text-amber-700' };
            case 'Ononnyo':
                return { icon: FaStar, color: 'text-blue-600' };
            default:
                return { icon: FaTrophy, color: 'text-gray-500' };
        }
    };

    return (
        <div className="space-y-8">
            <h2 className="text-2xl font-bold text-center flex items-center justify-center gap-2">
                <FaHistory className="text-yellow-500" />
                Archives
            </h2>

            {/* Year Selector */}
            <div className="flex flex-wrap justify-center gap-2 md:gap-4 px-2">
                {awardsData?.map((data: any) => (
                    <button
                        key={data.year}
                        onClick={() => setActiveYear(data.year)}
                        className={`px-4 py-2 md:px-6 md:py-3 rounded-lg font-semibold transition-all duration-300 text-sm md:text-base
                            ${activeYear === data.year 
                                ? 'bg-yellow-500 text-white shadow-lg scale-105' 
                                : 'bg-white/80 text-gray-600 hover:bg-white hover:shadow-md'}`}
                    >
                        {data.year}
                    </button>
                ))}
            </div>

            {/* Awards Display */}
            {awardsData?.map((yearData: any) => (
                <div
                    key={yearData.year}
                    className={`transition-all duration-500 
                        ${activeYear === yearData.year ? 'opacity-100' : 'hidden opacity-0'}`}
                >
                    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                        {yearData?.categories?.map((category: any, idx: any) => (
                            <div 
                                key={idx}
                                className="group hover:scale-105 transition-all duration-300 hover:shadow-lg border rounded-xl border-neutral-200 bg-gradient-to-br from-white to-neutral-50 flex gap-5"
                            >
                                <div className="border-r border-neutral-200 px-2 flex items-center justify-center w-8 md:w-12">
                                    <h3 className="md:text-lg font-bold text-gray-800 writing-mode-vertical transform -rotate-180">
                                        {category.category}
                                    </h3>
                                </div>
                                
                                <div className="flex flex-col gap-3 py-4 pr-4">
                                    {category?.positions?.map((position: any, posIdx: any) => (
                                        <div key={posIdx}>
                                            <div className={`flex items-center gap-2 ${getPositionStyle(position.position).color} font-semibold mb-1`}>
                                                {createElement(getPositionStyle(position.position).icon, { className: "text-lg" })}
                                                {position.position}
                                            </div>
                                            {position?.pujas?.map((puja: any, pujaIdx: any) => (
                                                <div key={pujaIdx} className="text-gray-700 pl-6">
                                                    • <Link href={`/puja/${getUrlSlug(puja?.puja_name)}/${puja?.reference_id}`}>
                                                        {puja.puja_name}
                                                    </Link>
                                                </div>
                                            ))}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            ))}
        </div>
    );
} 