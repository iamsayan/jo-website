'use client';

import React from 'react';
import { useState } from 'react';
import { cn } from '@/utils/functions';
import Gallery from "@/components/gallery";

interface GalleryFilterProps {
    className?: string;
    images: any;
}

export default function GalleryFilter({ className, images }: GalleryFilterProps) {
    const classes = cn('gallery-filter mt-4', className);
    const [selectedYear, setSelectedYear] = useState<string>('all');
    const [currentPage, setCurrentPage] = useState<number>(1);
    const itemsPerPage = 24;

    const imgStyle: React.CSSProperties = {
        width: '100%',
        height: '100%',
        objectFit: 'cover',
        pointerEvents: 'none'
    };

    const years = Array.from(new Set<number>(images.map((item: { year: number }) => item.year))).sort((a, b) => b - a);
    const filterableItems = ['all', ...years];
    const filteredImages = selectedYear === 'all' ? images.toReversed() : images.filter((item: { year: any }) => item.year == selectedYear).toReversed();
    const paginatedImages = filteredImages.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

    const uploadedBy = Array.from(new Set(paginatedImages.map((item: any) =>
        item?.uploaded_by?.trim()?.split(' ')
            .map((word: string) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
            .join(' ')
    ) || [])).filter((name: any) => name.toLowerCase() !== 'admin panel').filter(Boolean);

    return (
        <div className={classes}>
            <div className="flex gap-2 mb-4 justify-center">
                {filterableItems.map((item) => (
                    <button
                        key={item}
                        onClick={() => {
                            setSelectedYear(String(item))
                            setCurrentPage(1)
                        }}
                        className={`text-sm px-4 py-2 rounded-lg cursor-pointer ${selectedYear === String(item)
                            ? 'bg-yellow-500 text-white'
                            : 'bg-gray-200 hover:bg-gray-300'
                            }`}
                    >
                        {String(item).toUpperCase()}
                    </button>
                ))}
            </div>

            <Gallery elementClassNames="grid grid-cols-2 md:grid-cols-4 xl:grid-cols-6 gap-2 mt-2" speed={500} slideShowAutoplay={true} fullScreen={true}>
                {paginatedImages.map((item: any, index: number) => (
                     <a data-disable-progress={true} key={index} className="h-52 md:h-72 relative" href={`https://cgrutsav.jagadhatrionline.co.in/images/${item?.year}/${item?.reference_id}/${item?.image_name}`}>
                        <img
                            src={`https://cgrutsav.jagadhatrionline.co.in/images/${item?.year}/${item?.reference_id}/${item?.image_name}`}
                            width={500}
                            height={300}
                            style={imgStyle}
                            loading="lazy"
                            alt={item?.puja_entry_id?.puja_name}
                        />
                        <div className="absolute bottom-0 left-0 right-0 text-center bg-yellow-500 p-1.5 text-xs">{item?.puja_entry_id?.puja_name}</div>
                    </a>
                ))}
            </Gallery>

            {filteredImages.length > 0 && (
                <div className="join flex justify-center mt-4">
                    <button 
                        className="join-item btn" 
                        onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                        disabled={currentPage === 1}
                    >
                        «
                    </button>
                    {Array.from({length: Math.ceil(filteredImages.length / itemsPerPage)}, (_, i) => i + 1).map(pageNum => (
                        <button 
                            key={pageNum}
                            className={`join-item btn ${currentPage === pageNum ? 'btn-active' : ''}`}
                            onClick={() => setCurrentPage(pageNum)}
                        >
                            {pageNum}
                        </button>
                    ))}
                    <button 
                        className="join-item btn"
                        onClick={() => setCurrentPage(prev => Math.min(Math.ceil(filteredImages.length / itemsPerPage), prev + 1))}
                        disabled={currentPage === Math.ceil(filteredImages.length / itemsPerPage)}
                    >
                        »
                    </button>
                </div>
            )}

            {uploadedBy?.length > 0 && (
                <div className="flex flex-wrap gap-2 mt-4 justify-center text-justify">
                    <div className="text-sm"><span className="font-bold">Image Contributors:</span> {uploadedBy?.join(', ')}. Thanks to them for sharing their photos.</div>
                </div>
            )}
        </div>
    );
}
