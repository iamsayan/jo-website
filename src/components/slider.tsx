'use client';

// @ts-ignore
import { Splide, SplideSlide, SplideProps } from '@splidejs/react-splide';
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
        autoplay: true,
    };

    options = {
        ...defaultOptions,
        ...options,
    };

    const imgStyle: React.CSSProperties = {
        width: '100%',
        height: '100%',
        objectFit: 'cover',
        pointerEvents: 'none',
    };

    if (slides.length < 1) {
        return null;
    }

    return (
        <Splide options={options} {...props}>
            {slides.map((slide, index) => (
                <SplideSlide key={index}>
                    <img src={slide.imageUrl} alt={`Slide ${index + 1}`} style={imgStyle} />
                </SplideSlide>
            ))}
        </Splide>
    );
}