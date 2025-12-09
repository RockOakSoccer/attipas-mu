// Client component for interactive features
'use client'
import { useState } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight, ZoomIn, X } from "lucide-react";
import { ModelData } from "@/lib/models.utils";
import Link from "next/link";

// Type definitions
type ColorData = {
    name: string;
    colorImages: string;
};

export default function ModelContent({ model }: { model: ModelData }) {
    const [selectedImageIndex, setSelectedImageIndex] = useState(0);
    const [loadingImages, setLoadingImages] = useState<Set<string>>(new Set());
    const [isZoomed, setIsZoomed] = useState(false);
    const [zoomedImage, setZoomedImage] = useState<string | null>(null);
    const [zoomedImageIndex, setZoomedImageIndex] = useState<number>(0);

    // Handle previous image navigation
    const handlePrevImage = () => {
        setSelectedImageIndex((prev) => (prev === 0 ? model.galleryImages.length - 1 : prev - 1));
    };

    // Handle next image navigation
    const handleNextImage = () => {
        setSelectedImageIndex((prev) => (prev === model.galleryImages.length - 1 ? 0 : prev + 1));
    };

    // Handle image load start
    const handleImageLoadStart = (src: string) => {
        setLoadingImages(prev => new Set(prev).add(src));
    };

    // Handle image load
    const handleImageLoad = (src: string) => {
        setLoadingImages(prev => {
            const newSet = new Set(prev);
            newSet.delete(src);
            return newSet;
        });
    };

    // Handle zoom image
    const handleZoomImage = (imageSrc: string, imageIndex?: number) => {
        setZoomedImage(imageSrc);
        setZoomedImageIndex(imageIndex ?? selectedImageIndex);
        setIsZoomed(true);
        document.body.style.overflow = 'hidden';
    };

    // Handle zoom navigation
    const handleZoomPrev = () => {
        if (model.galleryImages && model.galleryImages.length > 1) {
            const newIndex = zoomedImageIndex === 0 ? model.galleryImages.length - 1 : zoomedImageIndex - 1;
            setZoomedImageIndex(newIndex);
            setZoomedImage(model.galleryImages[newIndex]);
        }
    };

    const handleZoomNext = () => {
        if (model.galleryImages && model.galleryImages.length > 1) {
            const newIndex = zoomedImageIndex === model.galleryImages.length - 1 ? 0 : zoomedImageIndex + 1;
            setZoomedImageIndex(newIndex);
            setZoomedImage(model.galleryImages[newIndex]);
        }
    };

    // Handle close zoom
    const handleCloseZoom = () => {
        setIsZoomed(false);
        setZoomedImage(null);
        document.body.style.overflow = 'unset';
    };

    return (
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_400px] gap-8 mb-12">
            {/* Product Image Gallery */}
            <div className="space-y-4">
                {model.galleryImages && model.galleryImages.length > 1 ? (
                    <>
                        {/* Main Image with Navigation */}
                        <div className="relative bg-secondary rounded-lg overflow-hidden group max-w-sm mx-auto">
                            <div
                                className="relative cursor-zoom-in group/zoom"
                                onClick={() => handleZoomImage(model.galleryImages[selectedImageIndex], selectedImageIndex)}
                            >
                                <Image
                                    src={model.galleryImages[selectedImageIndex]}
                                    alt={`${model.name} - Attipas Baby Shoes - Image ${selectedImageIndex + 1}`}
                                    width={800}
                                    height={1100}
                                    className={`w-full h-auto object-cover transition-all duration-500 hover:scale-105 ${loadingImages.has(model.galleryImages[selectedImageIndex]) ? 'opacity-0' : 'opacity-100'
                                        }`}
                                    quality={20}
                                    priority
                                    onLoadStart={() => handleImageLoadStart(model.galleryImages[selectedImageIndex])}
                                    onLoad={() => handleImageLoad(model.galleryImages[selectedImageIndex])}
                                />

                                {/* Zoom Icon Overlay */}
                                <div className="absolute top-4 right-4 bg-black/60 text-white p-2 rounded-full opacity-0 group-hover/zoom:opacity-100 transition-opacity duration-300">
                                    <ZoomIn className="w-5 h-5" />
                                </div>
                            </div>

                            {/* Image Navigation Arrows */}
                            <button
                                onClick={handlePrevImage}
                                className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white p-3 rounded-full shadow-lg transition-all opacity-0 group-hover:opacity-100 cursor-pointer"
                                aria-label="Previous image"
                            >
                                <ChevronLeft className="w-5 h-5 text-text-primary" />
                            </button>
                            <button
                                onClick={handleNextImage}
                                className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white p-3 rounded-full shadow-lg transition-all opacity-0 group-hover:opacity-100 cursor-pointer"
                                aria-label="Next image"
                            >
                                <ChevronRight className="w-5 h-5 text-text-primary" />
                            </button>

                            {/* Image Counter */}
                            <div className="absolute bottom-4 right-4 bg-black/60 text-white px-3 py-1 rounded-full text-sm">
                                {selectedImageIndex + 1} / {model.galleryImages.length}
                            </div>
                        </div>

                        {/* Thumbnail Gallery */}
                        <div className="grid grid-cols-4 gap-3 max-w-md mx-auto">
                            {model.galleryImages.map((image: string, index: number) => (
                                <button
                                    key={index}
                                    onClick={() => setSelectedImageIndex(index)}
                                    className={`relative bg-secondary rounded-lg overflow-hidden border-2 transition-all hover:border-accent-orange ${selectedImageIndex === index
                                        ? 'border-accent-orange ring-2 ring-accent-orange/30'
                                        : 'border-transparent'
                                        }`}
                                >
                                    <Image
                                        src={image}
                                        alt={`${model.name} thumbnail ${index + 1}`}
                                        width={200}
                                        height={275}
                                        className="w-full h-auto object-cover max-h-48"
                                    />
                                </button>
                            ))}
                        </div>
                    </>
                ) : (
                    /* Single Image */
                    <div className="bg-secondary rounded-lg overflow-hidden">
                        <div
                            className="relative cursor-zoom-in group/zoom"
                            onClick={() => handleZoomImage(model.image, 0)}
                        >
                            <Image
                                src={model.image}
                                alt={`${model.name} - Attipas Baby Shoes`}
                                width={800}
                                height={1100}
                                className={`w-full h-auto object-cover transition-all duration-500 hover:scale-105 ${loadingImages.has(model.image) ? 'opacity-0' : 'opacity-100'
                                    }`}
                                priority
                                quality={80}
                                onLoadStart={() => handleImageLoadStart(model.image)}
                                onLoad={() => handleImageLoad(model.image)}
                            />

                            {/* Zoom Icon Overlay */}
                            <div className="absolute top-4 right-4 bg-black/60 text-white p-2 rounded-full opacity-0 group-hover/zoom:opacity-100 transition-opacity duration-300">
                                <ZoomIn className="w-5 h-5" />
                            </div>
                        </div>
                    </div>
                )}
            </div>

            {/* Product Specifications */}
            <div className="space-y-6">
                <div className="bg-[#f0f4f8] p-8 rounded-lg">
                    <h2 className="text-2xl font-bold text-text-primary mb-6">{model.name}</h2>

                    <div className="space-y-4">
                        {/* Upper */}
                        <div className="grid grid-cols-[100px_1fr] gap-4 py-3 border-b border-border">
                            <dt className="font-semibold text-text-primary">Upper</dt>
                            <dd className="text-text-secondary">{model.specifications.upper}</dd>
                        </div>

                        {/* Sole */}
                        <div className="grid grid-cols-[100px_1fr] gap-4 py-3 border-b border-border">
                            <dt className="font-semibold text-text-primary">Sole</dt>
                            <dd className="text-text-secondary">{model.specifications.sole}</dd>
                        </div>

                        {/* Weight */}
                        <div className="grid grid-cols-[100px_1fr] gap-4 py-3 border-b border-border">
                            <dt className="font-semibold text-text-primary">Weight</dt>
                            <dd className="text-text-secondary">{model.specifications.weight}</dd>
                        </div>

                        {/* Color */}
                        <div className="grid grid-cols-[100px_1fr] gap-4 py-3">
                            <dt className="font-semibold text-text-primary">Color</dt>
                            <dd className="flex flex-col gap-3">
                                {model.specifications.color.length > 0 && (
                                    <div className="flex flex-wrap gap-3">
                                        {model.specifications.color.map((color: ColorData, index: number) => (
                                            <div key={index} className="flex flex-col items-center gap-1">
                                                <span className="text-text-tertiary text-sm text-center">
                                                    {color.name}
                                                </span>
                                                <div className="w-25 h-25 rounded overflow-hidden border border-border flex-shrink-0">

                                                    {/* Link each image to the product page */}
                                                    <Link href={`/collections/all-products`}>
                                                        <Image
                                                            src={color.colorImages}
                                                            alt={`${model.name} color variant ${index + 1}`}
                                                            width={100}
                                                            height={100}
                                                            className="w-full h-full object-cover border-2"
                                                            quality={100}

                                                        />
                                                    </Link>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </dd>
                        </div>
                    </div>
                </div>
            </div>

            {/* Zoom Modal */}
            {isZoomed && zoomedImage && (
                <div
                    className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center p-4 backdrop-blur-sm"
                    onClick={handleCloseZoom}
                >
                    <div className="relative max-w-[95vw] max-h-[95vh] flex items-center justify-center">
                        {/* Close Button */}
                        <button
                            onClick={handleCloseZoom}
                            className="absolute top-4 right-4 z-10 bg-white/20 hover:bg-white/30 text-white p-3 rounded-full transition-all duration-300 hover:scale-110"
                            aria-label="Close zoom view"
                        >
                            <X className="w-6 h-6" />
                        </button>

                        {/* Navigation Arrows - Only show if multiple images */}
                        {model.galleryImages && model.galleryImages.length > 1 && (
                            <>
                                {/* Previous Button */}
                                <button
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        handleZoomPrev();
                                    }}
                                    className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/30 text-white p-4 rounded-full transition-all duration-300 hover:scale-110 z-10"
                                    aria-label="Previous image"
                                >
                                    <ChevronLeft className="w-8 h-8" />
                                </button>

                                {/* Next Button */}
                                <button
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        handleZoomNext();
                                    }}
                                    className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/30 text-white p-4 rounded-full transition-all duration-300 hover:scale-110 z-10"
                                    aria-label="Next image"
                                >
                                    <ChevronRight className="w-8 h-8" />
                                </button>
                            </>
                        )}

                        {/* Zoomed Image Container */}
                        <div
                            className="relative animate-in zoom-in-95 duration-300"
                            onClick={(e) => e.stopPropagation()}
                        >
                            <Image
                                src={zoomedImage}
                                alt={`${model.name} - Zoomed View`}
                                width={1200}
                                height={1600}
                                className="w-auto h-auto max-w-[85vw] max-h-[85vh] object-contain rounded-lg shadow-2xl transition-opacity duration-300"
                                quality={95}
                                priority
                            />
                        </div>

                        {/* Image Counter - Only show if multiple images */}
                        {model.galleryImages && model.galleryImages.length > 1 && (
                            <div className="absolute top-4 left-1/2 transform -translate-x-1/2 bg-black/70 text-white px-4 py-2 rounded-full text-sm backdrop-blur-sm">
                                {zoomedImageIndex + 1} / {model.galleryImages.length}
                            </div>
                        )}

                        {/* Instructions */}
                        <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 bg-black/70 text-white px-6 py-3 rounded-full text-sm backdrop-blur-sm">
                            <span className="flex items-center gap-2">
                                {model.galleryImages && model.galleryImages.length > 1 ? (
                                    <span>Use arrows to navigate • Click outside to close</span>
                                ) : (
                                    <>
                                        <span>Click outside or press</span>
                                        <kbd className="px-2 py-1 bg-white/20 rounded text-xs">ESC</kbd>
                                        <span>to close</span>
                                    </>
                                )}
                            </span>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
