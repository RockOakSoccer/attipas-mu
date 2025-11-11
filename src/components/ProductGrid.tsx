"use client";

import { useState, useEffect } from "react";
import { ChevronDown, Eye, Loader2 } from "lucide-react";
import { ProductCard, Product } from "./ProductCard";
import { getAllProducts, getProductsByCollection, ShopifyProduct } from "@/lib/shopify";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || 'https://djunoemhhucuiipi.public.blob.vercel-storage.com';

// Transform Shopify product to local Product interface (website)
const transformShopifyProduct = (shopifyProduct: ShopifyProduct, index: number): Product & { onSale?: boolean; comingSoon?: boolean } => {
  const firstVariant = shopifyProduct.variants.edges[0]?.node;
  const images = shopifyProduct.images.edges.map(edge => edge.node.url);

  // Check if product is on sale
  const originalPrice = firstVariant?.compareAtPrice ? parseFloat(firstVariant.compareAtPrice.amount) : null;
  const salePrice = firstVariant ? parseFloat(firstVariant.price.amount) : 0;
  const onSale = originalPrice ? originalPrice > salePrice : false;

  //calculate discount percentage
  const discountPercentage = originalPrice ? Math.round(((originalPrice - salePrice) / originalPrice) * 100) : 0;
  console.log(discountPercentage)

  // Determine badges based on tags and sale status
  const badges: ("bestseller" | "20-off" | "shoe-socks")[] = [];
  if (shopifyProduct.tags.includes('bestseller') || shopifyProduct.tags.includes('Bestseller')) {
    badges.push('bestseller');
  }
  if (onSale) {
    badges.push('20-off');
  }
  if (shopifyProduct.tags.includes('shoe-socks') || shopifyProduct.tags.includes('Shoe-Socks')) {
    badges.push('shoe-socks');
  }

  return {
    id: index + 1, // Use index as ID since Shopify IDs are strings
    name: shopifyProduct.title,
    slug: shopifyProduct.handle,
    imageSrc: images[0] || `${BASE_URL}/baby-shoe/shoe-details/butterfly/A25BU-Butterfly-1.webp`,
    images: images.length > 0 ? images : [`${BASE_URL}/baby-shoe/shoe-details/butterfly/A25BU-Butterfly-1.webp`],
    originalPrice: originalPrice || undefined,
    salePrice: salePrice,
    badges: badges,
    onSale: onSale,
    isComingSoon: !shopifyProduct.availableForSale
  };
};


// This will be replaced with dynamic Shopify data
const SORT_OPTIONS = [
  { label: "Featured", value: "featured" },
  { label: "Price: Low to High", value: "price-asc" },
  { label: "Price: High to Low", value: "price-desc" },
  { label: "Best Selling", value: "bestselling" },
  { label: "Newest", value: "newest" }
];

interface ShopProductsGridProps {
  collectionType?: string;
}

export default function ShopProductsGrid({ collectionType = "all" }: ShopProductsGridProps) {
  const [sortBy, setSortBy] = useState("featured");
  const [showSaleOnly, setShowSaleOnly] = useState(false);
  const [hoveredProduct, setHoveredProduct] = useState<number | null>(null);
  const [currentImageIndex, setCurrentImageIndex] = useState<{ [key: number]: number }>({});

  // Shopify integration state
  const [products, setProducts] = useState<(Product & { onSale?: boolean; comingSoon?: boolean })[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch products from Shopify on component mount
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        setError(null);

        let shopifyProducts;

        // Fetch products based on collection type
        if (collectionType === "all" || collectionType === "All") {
          shopifyProducts = await getAllProducts();
          // console.log("all products", shopifyProducts)
        } else {
          // Fetch products by specific collection

          shopifyProducts = await getProductsByCollection(collectionType);

          // console.log('shopifyProducts by Collection', shopifyProducts)
        }

        const transformedProducts = shopifyProducts.map((product, index) => transformShopifyProduct(product, index));
        console.log('Transformed Products for collection:', collectionType, transformedProducts)
        setProducts(transformedProducts);

      } catch (err) {
        console.error('Error fetching products for collection:', collectionType, err);
        setError('Failed to load products. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [collectionType]);


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
  }, [hoveredProduct, products]);

  const handleMouseEnter = (productId: number) => {
    setHoveredProduct(productId);
    setCurrentImageIndex(prev => ({ ...prev, [productId]: 0 }));
  };

  const handleMouseLeave = () => {
    setHoveredProduct(null);
  };

  // Filter products
  let filteredProducts = products.filter(product => {
    // Special handling for sale items
    // if (collectionType === "Sale" && !product.onSale) {
    //   return false;
    // }

    // Filter by sale only checkbox
    if (showSaleOnly && !product.onSale) {
      return false;
    }

    return true;
  });

  // Sort products
  filteredProducts = [...filteredProducts].sort((a, b) => {
    switch (sortBy) {
      case "price-asc":
        return a.salePrice && b.salePrice ? a.salePrice - b.salePrice : 0;
      case "price-desc":
        return a.salePrice && b.salePrice ? b.salePrice - a.salePrice : 0;
      case "bestselling":
        return a.badges.includes("bestseller") ? -1 : 1;
      case "newest":
        return b.id - a.id;
      default:
        return 0;
    }
  });

  // const handleAddToCart = (product: typeof ALL_PRODUCTS[0]) => {
  //   if (product.comingSoon) return;

  //   addItem({
  //     id: `shop-product-${product.id}`,
  //     name: product.name,
  //     price: product.originalPrice ? product.originalPrice.toFixed(2) : product.salePrice.toFixed(2),
  //     salePrice: product.originalPrice ? product.salePrice.toFixed(2) : null,
  //     imageSrc: product.imageSrc,
  //   });
  // };


  // const toggleFavorite = (productId: number) => {
  //   setFavorites(prev =>
  //     prev.includes(productId)
  //       ? prev.filter(id => id !== productId)
  //       : [...prev, productId]
  //   );
  // };

  // const getSavePercentage = (original: number, sale: number) => {
  //   return Math.round(((original - sale) / original) * 100);
  // };

  // Loading state
  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-center py-20">
          <div className="text-center">
            <Loader2 className="w-12 h-12 animate-spin mx-auto mb-4 text-accent-blue-grey" />
            <h3 className="text-xl font-semibold text-text-primary mb-2">Loading Products</h3>
            <p className="text-text-secondary">Fetching the latest products from our store...</p>
          </div>
        </div>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center py-20 bg-background-light-grey-alt rounded-xl">
          <div className="max-w-md mx-auto">
            <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <Eye className="w-10 h-10 text-red-500" />
            </div>
            <h3 className="text-2xl font-bold text-text-primary mb-3">
              Failed to Load Products
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
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">

      {/* Filter and Sort Bar */}
      <div className="bg-background-light-grey-alt rounded-lg mb-8  py-4">
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6">
          {/* Sort and Filter Options */}
          <div className="w-full lg:w-auto flex flex-col sm:flex-row items-start sm:items-end gap-4 ">


            {/* Sort Dropdown */}
            <div className="relative min-w-[200px]">
              <label className="text-xs font-semibold text-text-primary uppercase tracking-wide mb-1.5 block">
                Sort By
              </label>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="appearance-none w-full bg-white border border-gray-200 rounded-lg px-4 py-2.5 pr-10 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-accent-blue-grey focus:border-transparent cursor-pointer hover:border-accent-blue-grey transition-colors"
              >
                {SORT_OPTIONS.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
              <ChevronDown className="absolute right-3 bottom-3 w-4 h-4 pointer-events-none text-muted-foreground" />
            </div>
            {/* Sale Filter */}
            <label className="flex items-center gap-2 cursor-pointer bg-white px-4 py-2.5 rounded-lg border border-gray-200 hover:border-accent-pink transition-colors">
              <input
                type="checkbox"
                checked={showSaleOnly}
                onChange={(e) => setShowSaleOnly(e.target.checked)}
                className="w-4 h-4 rounded border-gray-300 text-accent-pink focus:ring-accent-pink"
              />
              <span className="text-sm font-medium text-text-primary">Sale Only</span>
            </label>
          </div>
        </div>
      </div>

      {/* Product Count */}
      <div className="mb-6 flex items-center justify-between">
        <p className="text-sm text-muted-foreground">
          <span className="font-semibold text-text-primary">{filteredProducts.length}</span> {filteredProducts.length === 1 ? 'product' : 'products'} found
        </p>
      </div>

      {/* Products Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
        {filteredProducts.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
            hoveredProduct={hoveredProduct}
            currentImageIndex={currentImageIndex}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            showSalePrice={product.originalPrice !== product.salePrice}
            idPrefix="shop"
          />
        ))}
      </div>

      {/* Empty State */}
      {filteredProducts.length === 0 && (
        <div className="text-center py-20 bg-background-light-grey-alt rounded-xl">
          <div className="max-w-md mx-auto">
            <div className="w-20 h-20 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-6">
              <Eye className="w-10 h-10 text-gray-400" />
            </div>
            <h3 className="text-2xl font-bold text-text-primary mb-3">
              No Products Found
            </h3>
            <p className="text-text-secondary mb-6">
              We couldn&apos;t find any products matching your filters. Try adjusting your selection.
            </p>
            <button
              onClick={() => {
                setShowSaleOnly(false);
                setSortBy("featured");
              }}
              className="px-8 py-3 bg-accent-blue-grey text-white rounded-lg hover:bg-accent-blue-grey-dark transition-colors font-semibold shadow-sm hover:shadow-md"
            >
              Clear All Filters
            </button>
          </div>
        </div>
      )}
    </div>
  );
}