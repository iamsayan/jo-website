'use client'

import { Splide, SplideSlide } from '@splidejs/react-splide';
import '@splidejs/splide/css';

export default function Slider({ options, slides = [], ...props }) {
    const defaultOptions = {
        type: 'loop',
        autoplay: true
    }

    options = {
        ...defaultOptions,
        ...options
    };

    const imgStyle = {
        width: '100%',
        height: '100%',
        objectFit: 'cover',
        pointerEvents: 'none'
    };

    if ( slides?.length < 1 ) {
        return null;
    }

    return (
        <Splide options={options} {...props}>
            {slides?.map((slide, index) => (
                <SplideSlide key={index}>
                    <img src={slide?.imageUrl} alt={`Slide ${index + 1}`} style={imgStyle} />
                </SplideSlide>
            ))}
        </Splide>
    )
}