"use client"

import React, { useEffect, useState } from "react"
import { LuArrowUp } from "react-icons/lu";

const ScrollToTopButton: React.FC = () => {
    const [isVisible, setIsVisible] = useState(false)

    useEffect(() => {
        const controller = new AbortController();
        const onScroll = () => {
            setIsVisible(document.documentElement.scrollTop >= 20);
        };
        onScroll();
        document.addEventListener("scroll", onScroll, { signal: controller.signal });
        return () => controller.abort();
    }, []);

    const scrollToTop = () => {
        isVisible &&
            window.scrollTo({
                top: 0,
                behavior: "smooth",
            });
    }

    return (
        <button
            className={`cursor-pointer flex items-center justify-center text-black bg-yellow-400 shadow-md fixed bottom-10 right-10 rounded-lg p-3 outline-none transition-opacity duration-200 ${isVisible ? "opacity-100" : "opacity-0"}`}
            onClick={scrollToTop}
        >
            <LuArrowUp />
        </button>
    )
}

export default ScrollToTopButton