'use client';

import { getUrlSlug } from '@/utils/functions';
import Link from 'next/link';
import { useState, createElement } from 'react';
import { FaHistory, FaTrophy, FaMedal, FaAward, FaStar, FaRibbon } from 'react-icons/fa';

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
                return { icon: FaMedal, color: 'text-emerald-500' };
            case 'Third':
                return { icon: FaAward, color: 'text-amber-700' };
            case 'Ononnyo':
                return { icon: FaStar, color: 'text-blue-600' };
            default:
                return { icon: FaRibbon, color: 'text-indigo-500' };
        }
    };

    return (
        <div className="flex flex-col gap-4 md:gap-6">
            <h2 className="text-2xl font-bold text-center flex items-center justify-center gap-2">
                <FaHistory className="text-yellow-500" />
                Archives
            </h2>

            {/* Year Selector */}
            <div className="flex flex-wrap justify-center gap-2 md:gap-4">
                {awardsData?.map((data: any) => (
                    <div
                        key={data.year}
                        onClick={() => setActiveYear(data.year)}
                        className={`relative px-4 py-2 cursor-pointer transition-all duration-300
                            ${activeYear === data.year 
                                ? 'text-yellow-500' 
                                : 'text-gray-500 hover:text-gray-700'}
                        `}
                    >
                        {data.year}
                        {activeYear === data.year && (
                            <div className="absolute bottom-0 left-0 w-full h-0.5 bg-yellow-500 rounded-full" />
                        )}
                    </div>
                ))}
            </div>

            {/* Awards Display */}
            {awardsData?.map((yearData: any) => (
                <div
                    key={yearData.year}
                    className={`transition-all duration-500 
                        ${activeYear === yearData.year ? 'opacity-100' : 'hidden opacity-0'}`}
                >
                    {yearData?.description && <p className="text-center text-gray-500 mb-4">{yearData?.description}</p>}
                    {yearData?.categories?.length > 0 ? (
                        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                            {yearData?.categories?.map((category: any, idx: any) => (
                                <div 
                                    key={idx}
                                    className="group hover:scale-105 transition-all duration-300 delay-300 ease-in-out hover:shadow-lg border rounded-xl border-neutral-200 bg-gradient-to-br from-white to-neutral-50 flex gap-5"
                                >
                                    <div className="border-r border-neutral-200 py-6 px-2 flex items-center justify-center w-8 md:w-12">
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
                                                        &bull; <Link href={`/puja/${getUrlSlug(puja?.puja_name)}/${puja?.reference_id}`}>
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
                    ) : (
                        <p className="text-center text-gray-500">No competition was organized this year.</p>
                    )}
                </div>
            ))}
        </div>
    );
} 