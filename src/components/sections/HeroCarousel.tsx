"use client";

import React, { useState, useEffect, useCallback, useRef } from "react";
import Image from "next/image";
import { Play, Pause, ChevronLeft, ChevronRight } from "lucide-react";
import RotatingSaleBadge from "@/components/ui/rotating-sale-badge";

interface Product {
    title: string;
    image: string;
}


//SELECT 6 images 
const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || 'https://djunoemhhucuiipi.public.blob.vercel-storage.com';

const products: Product[] = [
    {
        title: "Fox Set Attipas collection",
        image: `${BASE_URL}/branding/01.webp`,
    },
    {
        title: "Attipas 25SS",
        image: `${BASE_URL}/branding/A25ST-Stripe-Olive-12.webp`,
    },
    {
        title: "Attipas Baby Shoe Bear Beige",
        image: `${BASE_URL}/baby-shoe/models/bear/wine_1.webp`,
    },

    {
        title: "Attipas Baby Shoe Gradation Mint",
        image: `${BASE_URL}/baby-shoe/models/gradation/BZ0A4046.webp`,
    },
    {
        title: "Attipas Baby Shoe Cameleon",
        image: `${BASE_URL}/branding/A25CH-Cameleon-20.webp`,
    },
    // {
    //     title: "Attipas Baby Shoe Pom Pom",
    //     image: `${BASE_URL}/branding/PMC_4741.webp`,
    // }
    {
        title: "Attipas Kid's Shoe",
        image: `${BASE_URL}/kids-shoe/attipas-skin-shoes/deep-green/Deep-Green-16.webp`,
    }
];


const HeroCarousel = () => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isPaused, setIsPaused] = useState(false);
    const autoplayRef = useRef<NodeJS.Timeout | null>(null);
    const carouselRef = useRef<HTMLDivElement>(null);
    const touchStartRef = useRef<number | null>(null);
    const touchEndRef = useRef<number | null>(null);
    const swipeThreshold = 50;

    const resetAutoplay = useCallback(() => {
        if (autoplayRef.current) {
            clearInterval(autoplayRef.current);
        }
        const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        if (!isPaused && !prefersReducedMotion) {
            autoplayRef.current = setInterval(() => {
                setCurrentIndex((prevIndex) => (prevIndex + 1) % products.length);
            }, 5000);
        }
    }, [isPaused]);

    useEffect(() => {
        resetAutoplay();
        return () => {
            if (autoplayRef.current) {
                clearInterval(autoplayRef.current);
            }
        };
    }, [currentIndex, isPaused, resetAutoplay]);

    const goToSlide = (index: number) => {
        setCurrentIndex(index);
        resetAutoplay();
    };

    const goToNext = useCallback(() => {
        setCurrentIndex((prev) => (prev + 1) % products.length);
    }, []);

    const goToPrev = () => {
        setCurrentIndex((prev) => (prev - 1 + products.length) % products.length);
    };

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === "ArrowLeft") {
            goToPrev();
        } else if (e.key === "ArrowRight") {
            goToNext();
        }
    };

    const handleTouchStart = (e: React.TouchEvent) => {
        touchEndRef.current = null;
        touchStartRef.current = e.targetTouches[0].clientX;
    };

    const handleTouchMove = (e: React.TouchEvent) => {
        touchEndRef.current = e.targetTouches[0].clientX;
    };

    const handleTouchEnd = () => {
        if (!touchStartRef.current || !touchEndRef.current) return;
        const distance = touchStartRef.current - touchEndRef.current;
        if (distance > swipeThreshold) {
            goToNext();
        } else if (distance < -swipeThreshold) {
            goToPrev();
        }
        touchStartRef.current = null;
        touchEndRef.current = null;
    };

    return (
        <section
            ref={carouselRef}
            className="relative w-full overflow-hidden h-[500px] md:h-[550px] lg:h-[85vh] focus:outline-none focus:ring-2 focus:ring-blue-500"
            aria-roledescription="carousel"
            aria-label="Featured Products"
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
            onKeyDown={handleKeyDown}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
            tabIndex={0}
        >
            {/* Summer Sale Badge - positioned top right */}
            <div className="absolute bottom-4 left-4 sm:bottom-6 sm:left-6 md:bottom-8 md:left-8 z-40">
                <RotatingSaleBadge />
            </div>
            <div
                className="flex transition-transform duration-500 ease-in-out h-full"
                style={{ transform: `translateX(-${currentIndex * 100}%)` }}
            >
                {products.map((product, index) => (
                    <div
                        key={index}
                        className="flex-shrink-0 w-full h-full relative"
                        aria-roledescription="slide"
                        aria-label={`${index + 1} of ${products.length}`}
                        aria-hidden={index !== currentIndex}
                    >
                        {/* Background Image */}
                        <div className="absolute inset-0 z-0">
                            <Image
                                src={product.image}
                                alt={product.title}
                                fill
                                className="object-cover object-center"
                                sizes="100vw"
                                quality={100}
                                priority={index === 0}
                            />
                        </div>

                        {/* Content Overlay */}
                        {/* <div className="relative z-20 w-full h-full flex flex-col justify-center text-white px-6 sm:px-12 md:pl-12 lg:pl-20 py-8 md:py-16 text-center md:text-left items-center md:items-start">
                            <div className="inline-block bg-white/20 backdrop-blur-sm text-white text-[14px] font-medium py-2 px-4 rounded-md mb-6" style={{ textShadow: '0 2px 4px rgba(0,0,0,0.3)' }}>
                                {product.category}
                            </div>
                            <h2 className="font-extrabold text-[32px] sm:text-[44px] lg:text-[56px] leading-[1.2] tracking-[-0.02em] mb-4 max-w-[600px]" style={{ textShadow: '0 2px 8px rgba(0,0,0,0.5)' }}>
                                {product.title}
                            </h2>
                            <p className="text-[16px] md:text-[18px] text-white/90 max-w-[500px] leading-[1.6] mb-8" style={{ textShadow: '0 2px 4px rgba(0,0,0,0.4)' }}>
                                {product.description}
                            </p>
                            <div className="flex flex-col sm:flex-row items-center justify-center md:justify-start gap-x-6 gap-y-4">
                                <p className="text-[32px] lg:text-[40px] font-bold" style={{ textShadow: '0 2px 8px rgba(0,0,0,0.5)' }}>
                                    {product.price}
                                </p>
                                <button className="bg-blue-500 hover:bg-blue-600 text-white font-semibold text-base py-[14px] px-10 rounded-lg flex items-center gap-2 transition-all transform hover:scale-105 active:scale-95 shadow-lg shadow-blue-500/40 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-900 focus:ring-blue-400">
                                    {product.ctaText}
                                    <ArrowRight className="w-5 h-5 ml-1" />
                                </button>
                            </div>
                        </div> */}

                        {/* Button call to Action  */}
                    </div>
                ))}
            </div>

            {/* Navigation Controls */}
            <div className="absolute z-30 bottom-8 right-40 hidden md:flex">
                <button
                    onClick={() => setIsPaused(!isPaused)}
                    className="w-12 h-12 rounded-full bg-white/15 backdrop-blur-lg flex items-center justify-center text-white hover:bg-white/25 transition-colors focus:outline-none focus:ring-2 focus:ring-white"
                    aria-label={isPaused ? "Play carousel" : "Pause carousel"}
                >
                    {isPaused ? <Play className="w-4 h-4" /> : <Pause className="w-4 h-4" />}
                </button>
            </div>

            <div className="absolute z-30 bottom-8 right-8 md:hidden lg:flex items-center gap-4">
                <button onClick={goToPrev} aria-label="Previous slide" className="w-12 h-12 rounded-full bg-white/10 backdrop-blur-lg flex items-center justify-center text-white hover:bg-white/20 transition-colors transform hover:scale-110 focus:outline-none focus:ring-2 focus:ring-white ">
                    <ChevronLeft className="w-6 h-6 cursor-pointer" />
                </button>
                <button onClick={goToNext} aria-label="Next slide" className="w-12 h-12 rounded-full bg-white/10 backdrop-blur-lg flex items-center justify-center text-white hover:bg-white/20 transition-colors transform hover:scale-110 focus:outline-none focus:ring-2 focus:ring-white  ">
                    <ChevronRight className="w-6 h-6 cursor-pointer" />
                </button>
            </div>

            <div className="absolute z-30 bottom-8 left-1/2 -translate-x-1/2 flex items-center gap-2">
                {products.map((_, index) => (
                    <button
                        key={index}
                        onClick={() => goToSlide(index)}
                        className={`h-2.5 rounded-full bg-white/30 transition-all duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-white ${currentIndex === index ? "w-8 bg-white" : "w-2.5"
                            }`}
                        aria-label={`Go to slide ${index + 1}`}
                        aria-current={currentIndex === index}
                    />
                ))}
            </div>
            <div className="sr-only" aria-live="polite" aria-atomic="true">
                {`Item ${currentIndex + 1}: ${products[currentIndex].title}`}
            </div>
        </section>
    );
};

export default HeroCarousel;