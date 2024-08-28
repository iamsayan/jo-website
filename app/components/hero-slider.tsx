'use client'

import React, { useState, useEffect, ReactNode } from 'react';
import bg1 from '@/public/assets/1.jpg'
import bg2 from '@/public/assets/2.jpg'
import bg3 from '@/public/assets/3.jpg'

// Define the types for the props
interface ImageSliderProps {
    children?: ReactNode;
}

const HeroSlider: React.FC<ImageSliderProps> = ({ children }) => {
    const [currentImageIndex, setCurrentImageIndex] = useState<number>(0);
    const images: string[] = [
        bg1.src,
        bg2.src,
        bg3.src,
    ];

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentImageIndex((prevIndex) =>
                prevIndex === images.length - 1 ? 0 : prevIndex + 1
            );
        }, 5000);

        return () => clearInterval(interval);
    }, [images.length]);

    return (
        <div className="slider hero min-h-full lg:min-h-screen">
            <div>
                {images.map((image, index) => (
                    <div
                        key={index}
                        className={
                            index === currentImageIndex ? 'slide active' : 'slide inactive'
                        }
                        style={{
                            backgroundImage: `url(${image})`,
                        }}
                    />
                ))}
            </div>
            {children}
        </div>
    );
};

export default HeroSlider;
