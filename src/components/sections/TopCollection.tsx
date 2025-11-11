"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { useRef, useState } from "react";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || 'https://djunoemhhucuiipi.public.blob.vercel-storage.com';

interface CollectionCardProps {
    name: string;
    imageUrl: string;
    href: string;
    alt: string;
}

const CollectionCard = ({ name, imageUrl, href, alt }: CollectionCardProps) => {
    const [isHovered, setIsHovered] = useState(false);

    return (
        <div
            className="relative h-full w-full"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            <Link href={href} className="group relative block h-full w-full overflow-hidden rounded-xl">
                <Image
                    src={imageUrl}
                    alt={alt}
                    fill
                    className="object-cover transition-transform duration-300 ease-in-out group-hover:scale-105"
                    sizes="(max-width: 1023px) 100vw, 50vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
                <div className="absolute bottom-0 left-0 w-full p-6 text-white md:p-8">
                    <h4 className="font-display text-2xl  text-white font-semibold drop-shadow-sm md:text-4xl">
                        {name}
                    </h4>
                </div>
            </Link>

            {/* Hover Popup Modal */}
            <AnimatePresence>
                {isHovered && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.8, y: 10 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.8, y: 10 }}
                        transition={{ duration: 0.2, ease: "easeOut" }}
                        className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10 pointer-events-none"
                    >
                        <div className="bg-white/80 backdrop-blur-sm rounded-lg shadow-2xl px-6 py-4 border border-white/20">
                            <div className="flex items-center gap-2 text-gray-800">
                                <span className="font-semibold text-sm uppercase tracking-wider">
                                    View All Products
                                </span>
                                <ArrowRight className="w-4 h-4" />
                            </div>
                            <div className="text-xs text-gray-600 mt-1">
                                Explore {name} Collection
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

const collections = [
    {
        name: "All Products",
        imageUrl: `${BASE_URL}/branding/BZ0A4218.webp`,
        alt: "Collections of popular products",
        href: "/collections/all-products",
        aspectClass: "aspect-[624/651]",
        gridClass: "lg:row-span-2",
    },
    {
        name: "New Collections",
        imageUrl: `${BASE_URL}/branding/blue_4.webp`,
        alt: "New Collections featuring trendy items",
        href: "/collections/new-collection",
        aspectClass: "aspect-[624/310]",
        gridClass: "",
    },
    {
        name: "Essential Styles",
        imageUrl: `${BASE_URL}/branding/PMC_5249.webp`,
        alt: "Essential Styles collection featuring trendy items",
        href: "/collections/bamboo-baby-shoes",
        aspectClass: "aspect-[624/310]",
        gridClass: "",
    },
];
export default function TopCollections() {
    const sectionRef = useRef<HTMLElement>(null);
    const { scrollYProgress } = useScroll({
        target: sectionRef,
        offset: ["start end", "end start"]
    });

    const titleY = useTransform(scrollYProgress, [0, 1], [40, -40]);
    const gridY = useTransform(scrollYProgress, [0, 1], [50, -50]);



    return (
        <section ref={sectionRef} className="bg-background py-[100px] overflow-hidden">
            <div className="container">
                <motion.h2
                    style={{ y: titleY }}
                    className="text-center text-2xl font-bold uppercase text-dark-charcoal-alt mb-10"
                >
                    Top Collections
                </motion.h2>


                <motion.div
                    style={{ y: gridY }}
                    className="grid grid-cols-1 gap-6 lg:grid-cols-2 lg:grid-rows-2"
                >
                    {collections.map((collection, index) => (
                        <div key={index} className={`relative ${collection.aspectClass} ${collection.gridClass}`}>
                            <CollectionCard
                                name={collection.name}
                                imageUrl={collection.imageUrl}
                                href={collection.href}
                                alt={collection.alt}
                            />
                        </div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
}