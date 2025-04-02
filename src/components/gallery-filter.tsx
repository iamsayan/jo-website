'use client';

import React, { useCallback, useRef } from 'react';
import { useState } from 'react';
import Image from "next/image";
import { cn } from '@/utils/functions';
import Gallery from "@/components/gallery";
import ReactPaginate from 'react-paginate';

interface GalleryFilterProps {
    className?: string;
    images: any;
}

function GalleryFilter({ className, images }: GalleryFilterProps) {
    const lightGallery = useRef<any>(null);
    
    const classes = cn('gallery-filter mt-4', className);
    const [selectedYear, setSelectedYear] = useState<string>('all');
    const [itemOffset, setItemOffset] = useState<number>(0);
    const itemsPerPage = 48;
    const endOffset = itemOffset + itemsPerPage;
    
    const years = Array.from(new Set<number>(images.map((item: { year: number }) => item.year))).sort((a, b) => b - a);
    const filterableItems = ['all', ...years];
    const filteredImages = selectedYear === 'all' ? images.toReversed() : images.filter((item: { year: any }) => item.year == selectedYear).toReversed();
    const paginatedImages = filteredImages.slice(itemOffset, endOffset);
    const pageCount = Math.ceil(filteredImages.length / itemsPerPage);

    const handlePageClick = (event: any) => {
        const newOffset = (event.selected * itemsPerPage) % filteredImages.length;
        setItemOffset(newOffset);
    };

    const onInit = useCallback((detail: any) => {
        if (detail) {
            lightGallery.current = detail.instance;
        }
    }, []);

    const dynamicEl = paginatedImages.map((item: any, index: number) => {
        return {
            src: `https://cgrutsav.jagadhatrionline.co.in/images/${item?.year}/${item?.reference_id}/${item?.image_name}`,
            thumb: `https://cgrutsav.jagadhatrionline.co.in/images/${item?.year}/${item?.reference_id}/${item?.image_name}`,
            alt: item?.puja_entry_id?.puja_name,
            subHtml: `<h4>${item?.puja_entry_id?.puja_name}</h4><p>By: ${item?.uploaded_by.trim().split(' ').map((word: string) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()).join(' ')}</p>`,
        }
    });

    return (
        <div className={classes}>
            <div className="flex gap-2 mb-4 justify-center">
                {filterableItems.map((item) => (
                    <button
                        key={item}
                        onClick={() => {
                            setSelectedYear((prev: string) => {
                                const newYear = String(item)
                                if (newYear !== prev) {
                                    setItemOffset(0)
                                }
                                return newYear
                            })
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

            <Gallery elementClassNames="grid grid-cols-2 md:grid-cols-4 xl:grid-cols-6 gap-2 md:gap-3 mt-2" speed={500} thumbnail={true} slideShowAutoplay={true} onInit={onInit} fullScreen={true} dynamicEl={dynamicEl} dynamic={true}>
                {paginatedImages.map((item: any, index: number) => (
                    <div key={item?._id + index} className="h-52 md:h-72 relative cursor-pointer group overflow-hidden rounded-xl" onClick={() => lightGallery.current.openGallery(index)}>
                        <Image
                            key={item?._id + index + selectedYear}
                            src={`https://cgrutsav.jagadhatrionline.co.in/images/${item?.year}/${item?.reference_id}/${item?.image_name}`}
                            width={500}
                            height={300}
                            className="object-cover w-full h-full pointer-events-none text-transparent transform transition-all duration-700 group-hover:scale-110"
                            loading="lazy"
                            priority={false}
                            alt={item?.puja_entry_id?.puja_name}
                            placeholder="blur"
                            blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mP8/wcAAt8B9zvLyE8AAAAASUVORK5CYII="
                        />
                        <span className="absolute bottom-0 left-0 right-0 text-center bg-yellow-500 p-1.5 text-xs">{item?.puja_entry_id?.puja_name}</span>
                    </div>
                ))}
            </Gallery>

            <ReactPaginate
                key={selectedYear}
                previousLabel="Previous"
                nextLabel="Next"
                breakLabel="..."
                pageCount={pageCount}
                marginPagesDisplayed={2}
                pageRangeDisplayed={2}
                onPageChange={handlePageClick}
                containerClassName="join flex justify-center mt-5"
                pageClassName="join-item"
                pageLinkClassName="rounded-none btn"
                nextClassName="join-item"
                nextLinkClassName="rounded-none btn"
                previousClassName="join-item"
                previousLinkClassName="rounded-none btn"
                breakClassName="join-item"
                breakLinkClassName="rounded-none btn btn-disabled"
                activeLinkClassName="btn-active"
            />
        </div>
    );
}

export default GalleryFilter;