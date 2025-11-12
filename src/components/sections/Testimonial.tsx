"use client"

import * as React from "react"
import Image from "next/image"
import Link from "next/link"
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel"
import { Card } from "@/components/ui/card"
import { Star } from "lucide-react"
import { motion, useScroll, useTransform } from "framer-motion"



const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || 'https://djunoemhhucuiipi.public.blob.vercel-storage.com';
type Review = {
    id: number
    rating: number
    date: string
    title: string
    productName: string
    productImage: string | null
    reviewText: string
    reviewerName: string
    country: string
    slug: string
    productHandle?: string
}

const reviewsData: Review[] = [
    {
        id: 1,
        rating: 5,
        date: '10/05/2025',
        title: 'Happy feet',
        productName: 'Attipas Butterfly Purple',
        productImage: `${BASE_URL}/baby-shoe/shoe-details/butterfly/A25BU-Butterfly-1.webp`,
        reviewText: 'So happy with these . My daughter loves them.',
        reviewerName: 'Priscilla',
        country: 'Mauritius',
        slug: 'butterfly-purple',
        productHandle: 'butterfly-purple',
    },
    {
        id: 2,
        rating: 5,
        date: '09/18/2025',
        title: 'These socks are made for walking',
        productName: 'Attipas Bird Yellow',
        productImage: `${BASE_URL}/baby-shoe/shoe-details/bird/A25BI-Bird-1.webp`,
        reviewText: 'My baby absolutely loves these socks. She can still walk around comfortably and easily, whereas other brands hinder her steps.',
        reviewerName: 'Sarah',
        country: 'Mauritius',
        slug: 'bird-yellow',
        productHandle: 'bird-yellow',
    },
    {
        id: 3,
        rating: 5,
        date: '09/10/2025',
        title: 'Perfect for my son',
        productName: 'Attipas Whale Blue',
        productImage: `${BASE_URL}/baby-shoe/shoe-details/whale/A25WH-Whale-1.webp`,
        reviewText: 'Perfect for my son',
        reviewerName: 'Yasmeen',
        country: 'Mauritius',
        slug: 'whale-blue',
        productHandle: 'whale-blue',
    },
    {
        id: 4,
        rating: 5,
        date: '07/21/2025',
        title: 'Soft and safe',
        productName: 'Attipas Bee Blue',
        productImage: `${BASE_URL}/baby-shoe/shoe-details/bee/A25BE-Bee-1.webp`,
        reviewText: "Some early shoes look great but aren't safe. Attipas shoes look great, are very comfy, easy to put on, safe for walking, no trips, and securely strap.",
        reviewerName: 'Stephanie',
        country: 'Mauritius',
        slug: 'bee-blue',
        productHandle: 'bee-blue',
    },
    {
        id: 5,
        rating: 5,
        date: '07/20/2025',
        title: 'The only shoes my 1yo wears!!',
        productName: 'Attipas Chameleon Orange',
        productImage: `${BASE_URL}/baby-shoe/shoe-details/cameleon/Cameleon-1.webp`,
        reviewText: 'Bought this to try out because my toddler refused to wear any shoes (besides regular Attipas). He loves this mesh shoes so much that I have now bought one of each size, up until the largest size available. Very soft and super comfortable.',
        reviewerName: 'Julie',
        country: 'Mauritius',
        slug: 'chameleon',
        productHandle: 'chameleon',
    },
    {
        id: 6,
        rating: 5,
        date: '03/19/2025',
        title: 'Great shoes',
        productName: 'Attipas Tortoise Green',
        productImage: `${BASE_URL}/baby-shoe/shoe-details/tortoise/A25TO-Tortoise-1.webp`,
        reviewText: 'These shoes have been great, our little one loves wearing them and is extremely confident in wearing them.',
        reviewerName: 'Raniyah',
        country: 'Mauritius',
        slug: 'tortoise-green',
        productHandle: 'tortoise-green',
    },
];

const StarRating = ({ rating, className }: { rating: number; className?: string }) => (
    <div className={`flex items-center gap-0.5 ${className}`}>
        {Array.from({ length: 5 }).map((_, i) => (
            <Star
                key={i}
                className={`w-5 h-5 ${i < rating ? 'text-[#f3a051] fill-[#f3a051]' : 'text-gray-300 fill-gray-300'}`}
            />
        ))}
    </div>
);

const ReviewCard = ({ review }: { review: Review }) => (
    <Card className="flex flex-col h-full p-[15px] bg-white border border-gray-200 rounded-lg transition-shadow hover:shadow-lg">
        <div className="flex justify-between items-center mb-2">
            <StarRating rating={review.rating} />
            <span className="text-xs text-gray-500">{review.date}</span>
        </div>

        <a href="#" className="font-bold text-lg text-text-primary hover:underline mb-2 line-clamp-2">{review.title}</a>

        <div className="flex-grow mb-4">
            <p className="italic text-sm text-[#666]">{review.reviewText}</p>
        </div>

        <div className="mt-auto pt-4 border-t border-gray-100 flex items-start gap-3">
            {review.productImage ? (
                <Link href={`/products/${review.productHandle || review.slug}`} className="flex-shrink-0">
                    <Image
                        src={review.productImage}
                        width={80}
                        height={80}
                        alt={review.productName}
                        className="w-20 h-20 rounded-md object-cover hover:opacity-80 transition-opacity"
                    />
                </Link>
            ) : (
                <div className="w-20 h-20 rounded-md bg-gray-200 flex-shrink-0" />
            )}
            <div className="flex flex-col justify-start h-full text-sm">
                <Link
                    href={`/products/${review.productHandle || review.slug}`}
                    className="font-bold text-text-primary hover:underline text-xs"
                >
                    {review.productName}
                </Link>
                <p className="text-gray-600 mt-1">{review.reviewerName}</p>
                <div className="flex items-center gap-1.5 mt-2">
                    <Image src="https://s3-us-west-2.amazonaws.com/stamped.io/cdn/images/shopify_verified-by-shop-gray.svg" width={90} height={16} alt="Verified by SHOP" className="h-4 w-auto" />
                    <span className="text-xs text-gray-500">{review.country}</span>
                </div>
            </div>
        </div>
    </Card>
);


export default function Testimonial() {

    const sectionRef = React.useRef<HTMLElement>(null);
    const { scrollYProgress } = useScroll({
        target: sectionRef,
        offset: ["start end", "end start"]
    });

    const leftY = useTransform(scrollYProgress, [0, 1], [50, -50]);
    const cardsY = useTransform(scrollYProgress, [0, 1], [-30, 30]);
    return (
        <section ref={sectionRef} className=" bg-[#d9a779]/30 py-12 md:py-20">
            <div className="container">
                <h2 className="text-center text-xl md:text-2xl font-bold uppercase tracking-wider text-[#333] mb-8">
                    Reviews from our Customers
                </h2>

                <Carousel
                    opts={{
                        align: "start",
                        loop: true,
                    }}
                    className="w-full"
                >
                    <div className="flex flex-col sm:flex-row justify-between items-center mb-6 px-1">
                        <p className="text-xs uppercase tracking-[0.2em] text-[#999999] mb-4 font-medium">
                            What our customers are saying
                        </p>
                        <div className="flex items-center gap-3">
                            <StarRating rating={5} />
                            <span className="text-sm text-gray-700 font-medium">789 Reviews</span>
                            <CarouselPrevious className="relative h-9 w-9 translate-y-0 left-0 top-0 rounded-full bg-[#d68972] text-white border-none hover:bg-[#d68972]/80 cursor-pointer" />
                            <CarouselNext className="relative h-9 w-9 translate-y-0 right-0 top-0 rounded-full bg-[#d68972] text-white border-none hover:bg-[#d68972]/80 cursor-pointer" />
                        </div>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-3 lg:gap-x-12">
                        <motion.div
                            style={{ y: leftY }}
                            className="lg:col-span-1 hidden lg:block mb-12 lg:mb-0 text-center lg:text-left md:flex md:align-center"
                        >
                            <h2 className="font-display text-[48px] font-semibold text-[#2B2B2B] leading-tight mb-8 ">
                                Customer care is our priority
                            </h2>
                            {/* <div className="md:flex items-center gap-3 hidden ">

                                <CarouselPrevious className="absolute h-9 w-9 translate-y-0 left-1/3 bottom-0 rounded-full bg-[#d68972] text-white border-none hover:bg-[#d68972]/80 cursor-pointer " />
                                <CarouselNext className="absolute h-9 w-9 translate-y-0 right-2/5 bottom-0 rounded-full bg-[#d68972] text-white border-none hover:bg-[#d68972]/80 cursor-pointer" />
                            </div> */}
                        </motion.div >

                        <motion.div style={{ y: cardsY }} className="lg:col-span-2">

                            <CarouselContent className="-ml-4">
                                {reviewsData.map((review) => (
                                    <CarouselItem key={review.id} className="pl-4 basis-full sm:basis-1/2 lg:basis-1/3">
                                        <ReviewCard review={review} />
                                    </CarouselItem>
                                ))}
                            </CarouselContent>
                        </motion.div>
                    </div>
                </Carousel>
            </div>
        </section>
    )
}
