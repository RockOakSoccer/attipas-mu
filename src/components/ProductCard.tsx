"use client";
import Image from "next/image";
import React from "react";
// import { useShopifyCart } from '@/contexts/shopify-cart-context'; // Not used in this component
import { useCurrency } from '@/contexts/currency-context';
import { Button } from "./ui/button";
import Link from "next/link";
import { Eye } from "lucide-react";

type BadgeType = "bestseller" | "20-off" | "shoe-socks";

export interface Product {
  id: number;
  name: string;
  imageSrc: string;
  badges: BadgeType[];
  originalPrice?: number;
  salePrice: number;
  isComingSoon?: boolean;
  slug: string;
  images: Array<string>;
}

interface ProductCardProps {
  product: Product;
  hoveredProduct: number | null;
  currentImageIndex: { [key: number]: number };
  onMouseEnter: (productId: number) => void;
  onMouseLeave: () => void;
  showSalePrice?: boolean;
  idPrefix?: string;
}

// Custom Badge Components
const CustomSaleBadge = () => (
  <div className="bg-[#c2707e] text-white px-2 py-1 rounded-md text-xs font-bold uppercase shadow-md">
    20% OFF
  </div>
);

const CustomBestsellerBadge = () => (
  <div className="bg-[#82b8a9] text-white px-2 py-1 rounded-md text-xs font-bold uppercase shadow-md">
    BESTSELLER
  </div>
);

const CustomShoeSocksBadge = () => (
  <div className="bg-[#6b7280] text-white px-2 py-1 rounded-md text-xs font-bold uppercase shadow-md">
    SHOE SOCKS
  </div>
);

const badgeMap: Record<BadgeType, string> = {
  "bestseller": "custom-bestseller-badge",
  "20-off": "custom-sale-badge",
  "shoe-socks": "custom-shoe-socks-badge",
};

export const ProductCard = ({
  product,
  hoveredProduct,
  currentImageIndex,
  onMouseEnter,
  onMouseLeave,
  showSalePrice = false,
  idPrefix = "product"
}: ProductCardProps) => {
  // const { addItem } = useShopifyCart(); // Not used in this component
  const { convertPrice, currencySymbol } = useCurrency();

  const handleAddToCart = (product: Product) => {
    if (product.isComingSoon) return;
    
    // TODO: Implement Shopify cart integration for ProductCard
    // For now, redirect to product page where full Shopify integration is available
    console.log("Add to cart from ProductCard - redirecting to product page");
    window.location.href = `/products/${product.slug || product.id}`;
  };

  const originalPriceConverted = product.originalPrice ? convertPrice(product.originalPrice) : null;
  const salePriceConverted = convertPrice(product.salePrice);
  const imageIndex = hoveredProduct === product.id ? (currentImageIndex[product.id] || 0) : 0;

  // Determine which price to show
  const displayPrice = showSalePrice ? salePriceConverted : salePriceConverted;

  return (
    <li className="flex flex-col bg-background-light-grey-alt rounded-xl shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 border border-gray-200 overflow-hidden">
      <Link
        href={`/products/${product.slug}`}
        className="block"
        onMouseEnter={() => onMouseEnter(product.id)}
        onMouseLeave={onMouseLeave}
      >
        <div className="relative group cursor-pointer">
          <div className="absolute top-2 left-2 flex flex-col items-start gap-1 z-10 w-[70px]">
            {product.badges.map((badgeKey) => {
              if (badgeKey === "20-off") {
                return <CustomSaleBadge key={badgeKey} />;
              }
              if (badgeKey === "bestseller") {
                return <CustomBestsellerBadge key={badgeKey} />;
              }
              if (badgeKey === "shoe-socks") {
                return <CustomShoeSocksBadge key={badgeKey} />;
              }
              return (
                <Image
                  key={badgeKey}
                  src={badgeMap[badgeKey]}
                  alt={`${badgeKey} badge`}
                  width={70}
                  height={19}
                  className="h-auto"
                  quality={100}
                />
              );
            })}
          </div>
          <div className="aspect-square w-full overflow-hidden relative">
            <Image
              src={product.images[imageIndex]}
              alt={product.name}
              width={500}
              height={500}
              className="w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-110"
            />
            {/* Quick View Button */}
            <div className="absolute inset-x-0 bottom-0 p-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-20">
              <div className="bg-white/95 backdrop-blur-sm rounded-lg px-4 py-2 text-center">
                <Eye className="w-4 h-4 inline-block mr-1.5" />
                <span className="text-xs font-semibold">Quick View</span>
              </div>
            </div>

            {/* Image indicators */}
            {hoveredProduct === product.id && product.images.length > 1 && (
              <div className="absolute bottom-16 left-1/2 -translate-x-1/2 flex gap-1 z-10">
                {product.images.map((_, idx) => (
                  <div
                    key={idx}
                    className={`w-1.5 h-1.5 rounded-full transition-all ${idx === imageIndex ? 'bg-white w-4' : 'bg-white/50'
                      }`}
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      </Link>

      {/* Product Info and Add to Cart */}
      <div className="flex flex-col flex-grow text-center p-4">
        <Link href={`/products/${product.slug}`}>
          <h3 className="text-base font-semibold text-text-primary  hover:text-accent-blue-grey transition-colors ">
            {product.name}
          </h3>
        </Link>
        <div className="text-text-secondary">
          {product.isComingSoon ? (
            <span className="font-semibold text-base text-gray-500">Coming Soon</span>
          ) : (
            <>
              {showSalePrice && originalPriceConverted && (
                <span className="line-through text-muted-foreground mr-2">
                  {currencySymbol} {originalPriceConverted}
                </span>
              )}
              <span className="font-bold text-lg text-text-primary hover:text-accent-blue-grey transition-colors pt-2">
                {currencySymbol} {displayPrice}
              </span>
              {showSalePrice && originalPriceConverted && (
                <span className="text-sm text-text-secondary ml-1">Sale</span>
              )}
            </>
          )}
        </div>
        <div className="mt-auto pt-2">
          {product.isComingSoon ? (
            <Button
              disabled
              className="w-full h-[45px] px-6 rounded-md bg-[#d68972] text-white uppercase text-sm font-ui cursor-not-allowed"
            >
              Coming Soon
            </Button>
          ) : (
            <Button
              variant="coral"
              onClick={() => handleAddToCart(product)}
              className="w-full h-[45px] px-6 rounded-md uppercase text-sm font-ui cursor-pointer"
            >
              Add to cart
            </Button>
          )}
        </div>
      </div>
    </li>
  );
};
