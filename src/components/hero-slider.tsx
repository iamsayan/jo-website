'use client'

import React, { useState, useEffect, ReactNode } from 'react';
import Image from 'next/image';

const images = [
    { src: '/assets/2024/IMG_3214.jpg', alt: 'Slide 1' },
    { src: '/assets/2024/IMG_3218.jpg', alt: 'Slide 2' },
    { src: '/assets/2024/IMG_3087.jpg', alt: 'Slide 3' },
    { src: '/assets/2024/IMG_3215.jpg', alt: 'Slide 4' },
    { src: '/assets/2024/IMG_3144.jpg', alt: 'Slide 5' },
] as const;

interface ImageSliderProps {
    children?: ReactNode;
}

const HeroSlider: React.FC<ImageSliderProps> = ({ children }) => {
    const [currentImageIndex, setCurrentImageIndex] = useState<number>(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentImageIndex((prevIndex) =>
                prevIndex === images.length - 1 ? 0 : prevIndex + 1
            );
        }, 5000);

        return () => clearInterval(interval);
    }, [images.length]);

    return (
        <div className="hero relative w-full overflow-hidden min-h-full lg:min-h-screen">
            <div className="slider-container">
                {images.map((image, index) => (
                    <div
                        key={index}
                        className={`absolute inset-0 w-full h-full transition-opacity duration-1000 ease-in-out bg-cover bg-center ${index === currentImageIndex ? 'opacity-100' : 'opacity-0'}`}
                    >
                        <Image
                            src={image.src}
                            alt={image.alt}
                            fill
                            priority={index === 0}
                            quality={90}
                            sizes="100vw"
                            style={{
                                objectFit: 'cover',
                            }}
                        />
                        <div className="absolute inset-0 bg-black opacity-60"></div>
                    </div>
                ))}
            </div>
            {children}
        </div>
    );
};

export default HeroSlider;
