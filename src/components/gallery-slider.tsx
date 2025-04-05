'use client';

import { useCallback, useRef } from 'react';
import Image from 'next/image';
import Gallery from '@/components/gallery';

// @ts-ignore
import { Splide, SplideSlide, SplideProps } from '@splidejs/react-splide';
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
    [key: string]: any;
}

export default function GallerySlider({ slides, sliderOptions, ...props }: GallerySliderProps) {
    const lightGallery = useRef<any>(null);
    const defaultOptions: SplideProps['options'] = {
        type: 'loop',
        autoplay: true,
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
            <Splide options={sliderOptions}>
                {slides.map((item: any, index: number) => (
                    <SplideSlide key={index} onClick={() => lightGallery.current.openGallery(index)}>
                        <Image src={item.src} alt={item.alt} className="w-full h-full object-cover pointer-events-none" fill={true} sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 60vw" />
                    </SplideSlide>
                ))}
            </Splide>
        </Gallery>
    );
}