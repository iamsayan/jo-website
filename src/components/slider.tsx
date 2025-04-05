'use client';
import Image from 'next/image';

// @ts-ignore
import { Splide, SplideSlide, SplideProps } from '@splidejs/react-splide';
import { Grid } from '@splidejs/splide-extension-grid';
import { AutoScroll } from '@splidejs/splide-extension-auto-scroll';
import { Intersection } from '@splidejs/splide-extension-intersection';
import '@splidejs/splide/css';

interface Slide {
    imageUrl: string;
}

interface SliderProps extends SplideProps {
    options?: SplideProps['options'];
    slides?: Slide[];
}

export default function Slider({ options, slides = [], ...props }: SliderProps) {
    const defaultOptions: SplideProps['options'] = {
        type: 'loop',
    };

    options = {
        ...defaultOptions,
        ...options,
    };

    if (slides.length < 1) {
        return null;
    }

    return (
        <Splide options={options} {...props} extensions={{ Grid, AutoScroll, Intersection }}>
            {slides.map((slide, index) => (
                <SplideSlide key={index} className="cursor-pointer">
                    <Image src={slide.imageUrl} alt={`Slide ${index + 1}`} className="w-full h-full object-cover pointer-events-none" fill={true} sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 60vw" />
                </SplideSlide>
            ))}
        </Splide>
    );
}