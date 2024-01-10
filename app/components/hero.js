'use client'

import React, { useState, useEffect } from 'react';
import bg1 from '../../public/assets/1.jpg'
import bg2 from '../../public/assets/2.jpg'
import bg3 from '../../public/assets/3.jpg'

const ImageSlider = ({ children }) => {
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const images = [
        bg1.src,
        bg2.src,
        bg3.src,
    ];

    useEffect(() => {
        const interval = setInterval(() => {
            // Increment the image index cyclically
            setCurrentImageIndex((prevIndex) =>
                prevIndex === images.length - 1 ? 0 : prevIndex + 1
            );
        }, 5000); // Change the image every 3 seconds (3000ms)

        return () => clearInterval(interval);
    }, [images.length]);

    const divStyle = {
        backgroundImage: `url(${images[currentImageIndex]})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        height: '300px',
        width: '100%',
    };

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
            { children }
        </div>
    );
};

export default ImageSlider;
