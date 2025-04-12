'use client'

import React, { useState, useEffect, ReactNode } from 'react';
import Image from 'next/image';

const images = [
    { src: '/images/20241107-042519.jpg', alt: 'Mankundu' },
    { src: '/images/20241107-040207.jpg', alt: 'Boro' },
    { src: '/images/20241107-034735.jpg', alt: 'Kundughat Dalan' },
    { src: '/images/20241107-034843.jpg', alt: 'Lalbagan Padripara' },
    { src: '/images/20241107-035443.jpg', alt: 'Boro Panchanantala' },
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
        }, 4000);

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
                            height={800}
                            width={1000}
                            priority={index === 0}
                            quality={90}
                            className="object-cover h-full w-full"
                        />
                        <div className="absolute inset-0 bg-black/60"></div>
                    </div>
                ))}
            </div>
            {children}
        </div>
    );
};

export default HeroSlider;
