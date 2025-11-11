"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { ChevronRight, Minus, Plus, Star, ShieldCheck, Truck, RefreshCcw, Share2, Heart, Loader2, Eye } from "lucide-react";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import { useShopifyCart } from "@/contexts/shopify-cart-context";
import { useCurrency } from "@/contexts/currency-context";
import { getProductByHandle, ShopifyProduct } from "@/lib/shopify";
import { notFound } from "next/navigation";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || 'https://djunoemhhucuiipi.public.blob.vercel-storage.com';

type ProductSize = {
    id: string;
    label: string;
    value: string;
    ageRange: string;
    available: boolean;
    quantityAvailable: number;
};

// Transform Shopify product to local product format
const transformShopifyProduct = (shopifyProduct: ShopifyProduct) => {
    const firstVariant = shopifyProduct.variants.edges[0]?.node;
    const images = shopifyProduct.images.edges.map(edge => edge.node.url);

    // Check if product is on sale - handle both price structures
    const originalPrice = firstVariant?.compareAtPrice ? parseFloat(firstVariant.compareAtPrice.amount) : null;
    const salePrice = firstVariant ? parseFloat(firstVariant.price.amount) : 0;
    const onSale = originalPrice ? originalPrice > salePrice : false;

    // Generate sizes from variants
    const sizes: ProductSize[] = shopifyProduct.variants.edges.map((edge) => {
        const variant = edge.node;
        const sizeOption = variant.selectedOptions.find(option => option.name.toLowerCase() === 'size');
        const sizeLabel = sizeOption?.value || variant.title;

        // Extract just the mm measurement for age range mapping
        const mmMatch = sizeLabel.match(/(\d+)㎜/);
        const mmSize = mmMatch ? parseInt(mmMatch[1]) : 0;

        // Map sizes to age ranges based on mm measurement
        let ageRange = '6+ months';
        if (mmSize <= 115) {
            ageRange = '6-12 months';
        } else if (mmSize <= 125) {
            ageRange = '12-18 months';
        } else if (mmSize <= 135) {
            ageRange = '18-24 months';
        } else if (mmSize <= 145) {
            ageRange = '24-30 months';
        } else {
            ageRange = '30+ months';
        }

        return {
            id: variant.id,
            label: sizeLabel,
            value: sizeLabel, // Use size label as value for matching
            ageRange,
            available: variant.availableForSale && variant.quantityAvailable > 0,
            quantityAvailable: variant.quantityAvailable
        };
    });

    // Extract features from description or use default ones
    const features = [
        "Innovative shoe-sock design for natural walking development",
        "Mimics barefoot walking sensation",
        "Allows toes to move freely for better balance",
        "Easy slip-on design like a sock",
        "Machine washable and durable",
        "Ergonomic design supports healthy foot development"
    ];

    // Generate badges from tags
    const badges: string[] = [];
    if (shopifyProduct.tags.includes('bestseller') || shopifyProduct.tags.includes('Bestseller')) {
        badges.push('BESTSELLER');
    }
    if (onSale) {
        badges.push('SALE');
    }
    if (shopifyProduct.tags.includes('new') || shopifyProduct.tags.includes('New')) {
        badges.push('NEW');
    }

    return {
        name: shopifyProduct.title,
        slug: shopifyProduct.handle,
        price: originalPrice || salePrice,
        salePrice: onSale ? salePrice : null,
        rating: 4.8, // Default rating - you can implement a review system later
        reviewCount: 127, // Default review count
        description: shopifyProduct.description || "Premium baby shoes designed for comfort and safety.",
        features,
        details: {
            material: "Premium materials", // You can get this from metafields later
            sole: "Natural Rubber",
            care: "Machine washable at 30°C",
            origin: "Made in Korea"
        },
        sizes,
        images: images.length > 0 ? images : [`${BASE_URL}/baby-shoe/shoe-details/butterfly/A25BU-Butterfly-1.webp`],
        badges,
        shopifyProduct // Keep reference to original Shopify product
    };
};

interface ProductPageProps {
    params: {
        slug: string;
    };
}

export default function ProductPage({ params }: ProductPageProps) {
    const [slug, setSlug] = useState<string>("");

    // Handle async params
    useEffect(() => {
        const getSlug = async () => {
            const resolvedParams = await params;
            setSlug(resolvedParams.slug);
        };
        getSlug();
    }, [params]);
    const [product, setProduct] = useState<ReturnType<typeof transformShopifyProduct> | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    // Product interaction state
    const [selectedImage, setSelectedImage] = useState(0);
    const [selectedSize, setSelectedSize] = useState("");
    const [quantity, setQuantity] = useState(1);
    const [showSizeError, setShowSizeError] = useState(false);
    const [isFavorite, setIsFavorite] = useState(false);
    const [isAddingToCart, setIsAddingToCart] = useState(false);
    const [selectedVariantStock, setSelectedVariantStock] = useState<number | null>(null);
    const [isSelectedVariantAvailable, setIsSelectedVariantAvailable] = useState(true);
    // const [imageZoom, setImageZoom] = useState(false); // Removed unused state

    const { addItem } = useShopifyCart();
    const { convertPrice, currencySymbol } = useCurrency();

    // Fetch product from Shopify
    useEffect(() => {
        if (!slug) return; // Don't fetch until slug is available

        const fetchProduct = async () => {
            try {
                setLoading(true);
                setError(null);
                const shopifyProduct = await getProductByHandle(slug);

                if (!shopifyProduct) {
                    notFound();
                    return;
                }

                const transformedProduct = transformShopifyProduct(shopifyProduct);
                setProduct(transformedProduct);
            } catch (err) {
                console.error('Error fetching product:', err);
                setError('Failed to load product. Please try again later.');
            } finally {
                setLoading(false);
            }
        };

        fetchProduct();
    }, [slug]);

    // Update availability when selected size changes
    useEffect(() => {
        if (!product || !selectedSize) {
            setSelectedVariantStock(null);
            setIsSelectedVariantAvailable(true);
            return;
        }

        // Find the selected variant based on size
        const selectedVariant = product.shopifyProduct.variants.edges.find(edge =>
            edge.node.selectedOptions.some(option =>
                option.name.toLowerCase() === 'size' && option.value === selectedSize
            )
        );

        if (selectedVariant) {
            const variant = selectedVariant.node;
            setSelectedVariantStock(variant.quantityAvailable);
            setIsSelectedVariantAvailable(variant.availableForSale && variant.quantityAvailable > 0);
        } else {
            setSelectedVariantStock(null);
            setIsSelectedVariantAvailable(false);
        }
    }, [product, selectedSize]);

    // Loading state
    if (loading) {
        return (
            <div className="min-h-screen bg-background-white">
                <Nav />
                <div className="flex items-center justify-center py-20">
                    <div className="text-center">
                        <Loader2 className="w-12 h-12 animate-spin mx-auto mb-4 text-accent-blue-grey" />
                        <h3 className="text-xl font-semibold text-text-primary mb-2">Loading Product</h3>
                        <p className="text-text-secondary">Fetching product details...</p>
                    </div>
                </div>
                <Footer />
            </div>
        );
    }

    // Error state
    if (error) {
        return (
            <div className="min-h-screen bg-background-white">
                <Nav />
                <div className="container mx-auto px-4 py-20">
                    <div className="text-center py-20 bg-background-light-grey-alt rounded-xl">
                        <div className="max-w-md mx-auto">
                            <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
                                <Eye className="w-10 h-10 text-red-500" />
                            </div>
                            <h3 className="text-2xl font-bold text-text-primary mb-3">
                                Failed to Load Product
                            </h3>
                            <p className="text-text-secondary mb-6">
                                {error}
                            </p>
                            <button
                                onClick={() => window.location.reload()}
                                className="px-8 py-3 bg-accent-blue-grey text-white rounded-lg hover:bg-accent-blue-grey-dark transition-colors font-semibold shadow-sm hover:shadow-md"
                            >
                                Try Again
                            </button>
                        </div>
                    </div>
                </div>
                <Footer />
            </div>
        );
    }

    if (!product) {
        notFound();
        return null;
    }

    const displayPrice = convertPrice(product.price);
    const displaySalePrice = product.salePrice !== null ? convertPrice(product.salePrice) : null;
    const savingsPercentage = product.salePrice !== null
        ? Math.round(((product.price - product.salePrice) / product.price) * 100)
        : null;
    const finalPrice = displaySalePrice || displayPrice;

    const handleAddToCart = async () => {
        if (!selectedSize) {
            setShowSizeError(true);
            return;
        }

        if (!product?.shopifyProduct) {
            console.error("No Shopify product data available");
            return;
        }

        // Check if selected variant is available
        if (!isSelectedVariantAvailable) {
            console.error("Selected variant is out of stock");
            return;
        }

        // Check if requested quantity is available
        if (selectedVariantStock !== null && quantity > selectedVariantStock) {
            console.error(`Only ${selectedVariantStock} items available in stock`);
            return;
        }

        setIsAddingToCart(true);

        try {
            // Find the selected variant from Shopify product data
            const selectedVariant = product.shopifyProduct.variants.edges.find(
                edge => edge.node.selectedOptions.some(
                    option => option.name === "Size" && option.value === selectedSize
                )
            );

            if (!selectedVariant) {
                throw new Error("Selected variant not found");
            }

            // Use Shopify cart context to add item
            await addItem(selectedVariant.node.id, quantity);

            setShowSizeError(false);
            console.log("Successfully added to Shopify cart");

        } catch (error) {
            console.error("Error adding to cart:", error);
            setShowSizeError(false);
        } finally {
            setIsAddingToCart(false);
        }
    };

    return (
        <div className="min-h-screen bg-background-white">
            <Nav />

            {/* Breadcrumb */}
            <div className="container mx-auto px-4 py-4">
                <nav className="flex items-center space-x-2 text-sm text-muted-foreground">
                    <Link href="/" className="hover:text-text-primary">Home</Link>
                    <ChevronRight className="w-4 h-4" />
                    <Link href="/collections/all-products" className="hover:text-text-primary">Products</Link>
                    <ChevronRight className="w-4 h-4" />
                    <span className="text-text-primary">{product.name}</span>
                </nav>
            </div>

            <div className="container mx-auto px-4 py-8">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                    {/* Product Images */}
                    <div className="space-y-4">
                        {/* Main Image */}
                        <div className="relative aspect-square bg-background-light-grey-alt rounded-xl overflow-hidden">
                            <Image
                                src={product.images[selectedImage]}
                                alt={product.name}
                                fill
                                className="object-cover"
                                priority
                            />
                            {product.badges.length > 0 && (
                                <div className="absolute top-4 left-4 flex flex-wrap gap-2">
                                    {product.badges.map((badge) => (
                                        <span
                                            key={badge}
                                            className={`px-3 py-1 text-xs font-bold rounded-full ${badge === 'BESTSELLER' ? 'bg-accent-pink text-white' :
                                                badge === 'SALE' ? 'bg-red-500 text-white' :
                                                    'bg-accent-blue-grey text-white'
                                                }`}
                                        >
                                            {badge}
                                        </span>
                                    ))}
                                </div>
                            )}
                        </div>

                        {/* Thumbnail Images */}
                        {product.images.length > 1 && (
                            <div className="flex space-x-2 overflow-x-auto">
                                {product.images.map((image, index) => (
                                    <button
                                        key={index}
                                        onClick={() => setSelectedImage(index)}
                                        className={`relative w-20 h-20 rounded-lg overflow-hidden flex-shrink-0 ${selectedImage === index ? 'ring-2 ring-[#d68972]' : ''
                                            }`}
                                    >
                                        <Image
                                            src={image}
                                            alt={`${product.name} ${index + 1}`}
                                            fill
                                            className="object-cover"
                                        />
                                    </button>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* Product Info */}
                    <div className="space-y-6">
                        <div>
                            <h1 className="text-3xl font-bold text-text-primary mb-2">{product.name}</h1>
                            {/* <div className="flex items-center space-x-4 mb-4">
                                <div className="flex items-center">
                                    {[...Array(5)].map((_, i) => (
                                        <Star
                                            key={i}
                                            className={`w-5 h-5 ${i < Math.floor(product.rating) ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'
                                                }`}
                                        />
                                    ))}
                                    <span className="ml-2 text-sm text-muted-foreground">
                                        {product.rating} ({product.reviewCount} reviews)
                                    </span>
                                </div>
                            </div> */}

                            {/* Price */}
                            <div className="flex items-center space-x-3 mb-6">
                                <span className="text-3xl font-bold text-text-primary">
                                    {currencySymbol}{finalPrice}
                                </span>
                                {displaySalePrice && (
                                    <>
                                        <span className="text-xl text-muted-foreground line-through">
                                            {currencySymbol}{displayPrice}
                                        </span>
                                        <span className="bg-red-100 text-red-800 text-sm font-medium px-2.5 py-0.5 rounded">
                                            Save {savingsPercentage}%
                                        </span>
                                    </>
                                )}
                            </div>
                        </div>

                        {/* Description */}
                        <div>
                            <p className="text-muted-foreground leading-relaxed">{product.description}</p>
                        </div>

                        {/* Size Selection */}
                        <div>
                            <div className="flex items-center justify-between mb-3">
                                <label className="text-sm font-medium text-text-primary">Size</label>
                                {showSizeError && (
                                    <span className="text-sm text-red-600">Please select a size</span>
                                )}
                            </div>
                            <div className="grid grid-cols-2 gap-2">
                                {product.sizes.map((size: ProductSize) => (
                                    <button
                                        key={size.id}
                                        onClick={() => {
                                            setSelectedSize(size.value);
                                            setShowSizeError(false);
                                        }}
                                        disabled={!size.available}
                                        className={`p-3 text-sm border rounded-lg transition-colors ${selectedSize === size.value
                                            ? 'border-[#d68972] bg-[#d68972] text-white'
                                            : size.available
                                                ? 'border-gray-300 hover:border-[#d68972]'
                                                : 'border-gray-200 bg-gray-50 text-gray-400 cursor-not-allowed'
                                            }`}
                                    >
                                        <div className="font-medium">{size.label}</div>
                                        <div className="text-xs opacity-75">{size.ageRange}</div>
                                        {!size.available ? (
                                            <div className="text-xs text-red-500">Out of Stock</div>
                                        ) : size.quantityAvailable <= 3 ? (
                                            <div className="text-xs text-orange-500">Only {size.quantityAvailable} left</div>
                                        ) : null}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Quantity */}
                        <div>
                            <label className="text-sm font-medium text-text-primary mb-3 block">Quantity</label>
                            <div className="flex items-center space-x-3">
                                <button
                                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                                    className="w-10 h-10 rounded-lg border border-gray-300 flex items-center justify-center hover:bg-gray-50"
                                >
                                    <Minus className="w-4 h-4" />
                                </button>
                                <span className="w-12 text-center font-medium">{quantity}</span>
                                <button
                                    onClick={() => setQuantity(quantity + 1)}
                                    disabled={selectedVariantStock !== null && quantity >= selectedVariantStock}
                                    className="w-10 h-10 rounded-lg border border-gray-300 flex items-center justify-center hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    <Plus className="w-4 h-4" />
                                </button>
                            </div>
                        </div>

                        {/* Stock Status */}
                        {selectedSize && (
                            <div className="mb-4">
                                {isSelectedVariantAvailable ? (
                                    <div className="flex items-center gap-2 text-sm">
                                        <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                                        <span className="text-green-600 font-medium">

                                            {selectedVariantStock !== null && selectedVariantStock <= 50
                                                ? `Only ${selectedVariantStock} left in stock`
                                                : 'In Stock'
                                            }
                                        </span>
                                    </div>
                                ) : (
                                    <div className="flex items-center gap-2 text-sm">
                                        <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                                        <span className="text-red-600 font-medium">Out of Stock</span>
                                    </div>
                                )}
                            </div>
                        )}

                        {/* Add to Cart */}
                        <div className="space-y-4">
                            <button
                                onClick={handleAddToCart}
                                disabled={isAddingToCart || !isSelectedVariantAvailable || !selectedSize || (selectedVariantStock !== null && quantity > selectedVariantStock)}
                                className={`w-full py-4 px-6 rounded-lg font-semibold transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center ${!isSelectedVariantAvailable || !selectedSize
                                    ? 'bg-gray-400 text-white'
                                    : 'bg-[#d68972] text-white hover:bg-[#d68972]'
                                    }`}
                            >
                                {isAddingToCart ? (
                                    <>
                                        <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                                        Adding to Cart...
                                    </>
                                ) : !selectedSize ? (
                                    'Select Size First'
                                ) : !isSelectedVariantAvailable ? (
                                    'Out of Stock'
                                ) : selectedVariantStock !== null && quantity > selectedVariantStock ? (
                                    `Only ${selectedVariantStock} Available`
                                ) : (
                                    'Add to Cart'
                                )}
                            </button>

                            <div className="flex space-x-3">
                                <button
                                    onClick={() => setIsFavorite(!isFavorite)}
                                    className={`flex-1 border border-gray-300 py-3 px-4 rounded-lg flex items-center justify-center space-x-2 transition-colors ${isFavorite ? 'bg-red-50 border-red-300 text-red-600' : 'hover:bg-gray-50'
                                        }`}
                                >
                                    <Heart className={`w-5 h-5 ${isFavorite ? 'fill-current' : ''}`} />
                                    <span>Wishlist</span>
                                </button>
                                <button className="flex-1 border border-gray-300 py-3 px-4 rounded-lg flex items-center justify-center space-x-2 hover:bg-gray-50">
                                    <Share2 className="w-5 h-5" />
                                    <span>Share</span>
                                </button>
                            </div>
                        </div>

                        {/* Features */}
                        <div>
                            <h3 className="text-lg font-semibold text-text-primary mb-4">Key Features</h3>
                            <ul className="space-y-2">
                                {product.features.map((feature, index) => (
                                    <li key={index} className="flex items-start space-x-3">
                                        <div className="w-2 h-2 bg-[#d68972] rounded-full mt-2 flex-shrink-0" />
                                        <span className="text-muted-foreground">{feature}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* Trust Badges */}
                        <div className="grid grid-cols-3 gap-4 pt-6 border-t">
                            <div className="text-center">
                                <ShieldCheck className="w-8 h-8 text-[#d68972] mx-auto mb-2" />
                                <div className="text-sm font-medium">Safe Materials</div>
                            </div>
                            <div className="text-center">
                                <Truck className="w-8 h-8 text-[#d68972] mx-auto mb-2" />
                                <div className="text-sm font-medium">Free Shipping</div>
                            </div>
                            <div className="text-center">
                                <RefreshCcw className="w-8 h-8 text-[#d68972] mx-auto mb-2" />
                                <div className="text-sm font-medium">Easy Returns</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <Footer />
        </div>
    );
}
