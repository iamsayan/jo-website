'use client';

import { useCallback, useRef } from 'react';
import Image from 'next/image';
import Gallery from '@/components/gallery';
import { cn } from '@/utils/functions';

// @ts-ignore
import { Splide, SplideSlide, SplideProps } from '@splidejs/react-splide';
import { Grid } from '@splidejs/splide-extension-grid';
import { Intersection } from '@splidejs/splide-extension-intersection';
import { AutoScroll } from '@splidejs/splide-extension-auto-scroll';
import '@splidejs/splide/css';

interface Slide {
    src: string;
    alt: string;
    thumb?: string;
    subHtml?: string;
}

interface GallerySliderProps {
    slides: Slide[];
    sliderOptions: SplideProps['options'];
    sliderClass?: string;
    sliderItemClass?: string;
    [key: string]: any;
}

export default function GallerySlider({ slides, sliderOptions, ...props }: GallerySliderProps) {
    const lightGallery = useRef<any>(null);
    const defaultOptions: SplideProps['options'] = {
        type: 'loop',
    };

    sliderOptions = {
        ...defaultOptions,
        ...sliderOptions,
    };

    if (slides.length < 1) {
        return null;
    }

    const onInit = useCallback((detail: any) => {
        if (detail) {
            lightGallery.current = detail.instance;
        }
    }, []);

    return (
        <Gallery {...props} onInit={onInit} dynamicEl={slides} dynamic={true}>
            <Splide options={sliderOptions} className={cn('slider-container', props.sliderClass)} extensions={{ Grid, AutoScroll, Intersection }}>
                {slides.map((item: any, index: number) => (
                    <SplideSlide key={index} onClick={() => lightGallery.current.openGallery(index)} className={cn("relative cursor-pointer", props.sliderItemClass)}>
                        <Image src={item.src} alt={item.alt} priority={index === 0} quality={95} className="object-cover w-full h-full pointer-events-none text-transparent transform transition-all duration-700 group-hover:scale-110 pointer-events-none" fill={true} sizes="100vw" />
                        {item?.subHtml && (
                            <>
                                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                                    <div className="absolute inset-0 flex items-end left-0 right-0 text-center bottom-0">
                                    <div className="text-white transform translate-y-full group-hover:translate-y-0 transition-transform duration-300 w-full group-hover:mb-3">
                                        <div className="font-medium mb-2 max-w-50 mx-auto text-xs md:text-sm" dangerouslySetInnerHTML={{ __html: item?.subHtml }} />
                                        {/* <div className="text-sm text-white/80">Click to expand</div> */}
                                    </div>
                                </div>
                            </>
                        )}
                    </SplideSlide>
                ))}
            </Splide>
        </Gallery>
    );
}