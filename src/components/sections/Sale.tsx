"use client";
import { useState, useEffect } from "react";
import { ProductCard, Product } from "../ProductCard";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || 'https://djunoemhhucuiipi.public.blob.vercel-storage.com';
// Multiple images for hover scroll effect
const PRODUCT_IMAGES = [
  `${BASE_URL}/baby-shoe/shoe-details/butterfly/A25BU-Butterfly-1.webp`,
  `${BASE_URL}/baby-shoe/shoe-details/butterfly/A25BU-Butterfly-2.webp`,
  `${BASE_URL}/baby-shoe/shoe-details/butterfly/A25BU-Butterfly-3.webp`,
];


const products: Product[] = [
  {
    id: 1,
    name: "Heart - Pink",
    imageSrc: `${BASE_URL}/baby-shoe/shoe-details/butterfly/A25BU-Butterfly-1.webp`,
    slug: "heart-pink",
    images: PRODUCT_IMAGES,
    badges: ["20-off"],
    originalPrice: 31.0,
    salePrice: 25.0,
  },
  {
    id: 2,
    name: "Attipas Bong Bong - Pink",
    imageSrc: `${BASE_URL}/baby-shoe/shoe-details/butterfly/A25BU-Butterfly-2.webp`,
    slug: "attipas-bong-bong-pink",
    images: PRODUCT_IMAGES,
    badges: [], // No badges in screenshot
    originalPrice: 31.0,
    salePrice: 25.0,
  },
  {
    id: 3,
    name: "Palette - Berry",
    imageSrc: `${BASE_URL}/baby-shoe/shoe-details/butterfly/A25BU-Butterfly-3.webp`,
    slug: "palette-berry",
    images: PRODUCT_IMAGES,
    badges: ["20-off"],
    originalPrice: 31.0,
    salePrice: 25.0,
  },
  {
    id: 4,
    name: "Zootopia Bear - Beige",
    imageSrc: `${BASE_URL}/baby-shoe/shoe-details/butterfly/A25BU-Butterfly-2.webp`,
    slug: "zootopia-bear-beige",
    images: PRODUCT_IMAGES,
    badges: ["20-off"],
    salePrice: 25.0,
    isComingSoon: true,
  },
  {
    id: 5,
    name: "Palette - White Chocolate",
    imageSrc: `${BASE_URL}/baby-shoe/shoe-details/butterfly/A25BU-Butterfly-2.webp`,
    slug: "palette-white-chocolate",
    images: PRODUCT_IMAGES,
    badges: ["20-off"],
    originalPrice: 31.0,
    salePrice: 25.0,
  },
  {
    id: 6,
    name: "Star - Charcoal",
    imageSrc: `${BASE_URL}/baby-shoe/shoe-details/butterfly/A25BU-Butterfly-1.webp`,
    slug: "star-charcoal",
    images: PRODUCT_IMAGES,
    badges: ["bestseller", "20-off"],
    originalPrice: 31.0,
    salePrice: 25.0,
  },
  {
    id: 7,
    name: "Attipas Flower - Gray",
    imageSrc: `${BASE_URL}/baby-shoe/shoe-details/butterfly/A25BU-Butterfly-3.webp`,
    slug: "attipas-flower-gray",
    images: PRODUCT_IMAGES,
    badges: ["bestseller", "20-off"],
    originalPrice: 31.0,
    salePrice: 25.0,
  },
  {
    id: 8,
    name: "Zootopia Penguin - Navy",
    imageSrc: `${BASE_URL}/baby-shoe/shoe-details/butterfly/A25BU-Butterfly-2.webp`,
    slug: "zootopia-penguin-navy",
    images: PRODUCT_IMAGES,
    badges: ["bestseller", "20-off"],
    salePrice: 31.0,
    isComingSoon: true,
  },
  {
    id: 9,
    name: "First Walking Shoes - Breathable Mesh (Solid Grey)",
    imageSrc: `${BASE_URL}/baby-shoe/shoe-details/butterfly/A25BU-Butterfly-2.webp`,
    slug: "first-walking-shoes-breathable-mesh-solid-grey",
    images: PRODUCT_IMAGES,
    badges: ["bestseller", "20-off"],
    originalPrice: 44.0,
    salePrice: 35.0,
  },
  {
    id: 10,
    name: "First Walking Shoes - Breathable Mesh (Solid Pink)",
    imageSrc: `${BASE_URL}/baby-shoe/shoe-details/butterfly/A25BU-Butterfly-2.webp`,
    slug: "first-walking-shoes-breathable-mesh-solid-pink",
    images: PRODUCT_IMAGES,
    badges: ["bestseller", "20-off"],
    originalPrice: 44.0,
    salePrice: 35.0,
  },
];


//get product by collection names 


const MidSeasonSaleGrid = () => {
  const [hoveredProduct, setHoveredProduct] = useState<number | null>(null);
  const [currentImageIndex, setCurrentImageIndex] = useState<{ [key: number]: number }>({});

  // Auto-scroll through images on hover
  useEffect(() => {
    if (hoveredProduct === null) return;

    const interval = setInterval(() => {
      setCurrentImageIndex(prev => {
        const product = products.find(p => p.id === hoveredProduct);
        if (!product) return prev;
        return {
          ...prev,
          [hoveredProduct]: ((prev[hoveredProduct] || 0) + 1) % product.images.length
        };
      });
    }, 800); // Change image every 800ms

    return () => clearInterval(interval);
  }, [hoveredProduct]);

  const handleMouseEnter = (productId: number) => {
    setHoveredProduct(productId);
    setCurrentImageIndex(prev => ({ ...prev, [productId]: 0 }));
  };

  const handleMouseLeave = () => {
    setHoveredProduct(null);
  };

  return (
    <section className="bg-background-white py-12 md:py-16">
      <div className="container mx-auto px-4">
        <h2 className="text-center text-2xl font-bold uppercase text-dark-charcoal-alt mb-10">
          Big Summer Sale - UPTO 20% OFF
        </h2>
        <ul className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-5">
          
          {products.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              hoveredProduct={hoveredProduct}
              currentImageIndex={currentImageIndex}
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
              showSalePrice={true}
              idPrefix="sale"
            />
          ))}
        </ul>
      </div>
    </section>
  );
};
export default MidSeasonSaleGrid;