"use client";
import { useState, useEffect } from "react";
import { ProductCard, Product } from "../ProductCard";
import { getProductsByCollection, ShopifyProduct } from "@/lib/shopify";
import { Loader2, Eye } from "lucide-react";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || 'https://djunoemhhucuiipi.public.blob.vercel-storage.com';

// Transform Shopify product to local Product interface
const transformShopifyProduct = (shopifyProduct: ShopifyProduct, index: number): Product & { onSale?: boolean; comingSoon?: boolean } => {
  const firstVariant = shopifyProduct.variants.edges[0]?.node;
  const images = shopifyProduct.images.edges.map(edge => edge.node.url);

  // Check if product is on sale
  const originalPrice = firstVariant?.compareAtPrice ? parseFloat(firstVariant.compareAtPrice.amount) : null;
  const salePrice = firstVariant ? parseFloat(firstVariant.price.amount) : 0;
  const onSale = originalPrice ? originalPrice > salePrice : false;

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



const NewCollection = () => {
  const [hoveredProduct, setHoveredProduct] = useState<number | null>(null);
  const [currentImageIndex, setCurrentImageIndex] = useState<{ [key: number]: number }>({});
  const [products, setProducts] = useState<(Product & { onSale?: boolean; comingSoon?: boolean })[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch products from new-collection
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        setError(null);
        const shopifyProducts = await getProductsByCollection("new-collection");
        const transformedProducts = shopifyProducts.map((product, index) => transformShopifyProduct(product, index));
        setProducts(transformedProducts);
      } catch (err) {
        console.error('Error fetching new collection products:', err);
        setError('Failed to load products. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

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

  // Loading state
  if (loading) {
    return (
      <section className="bg-background-white py-12 md:py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-center text-2xl font-bold uppercase text-dark-charcoal-alt mb-10">
            New Collection
          </h2>
          <div className="flex items-center justify-center py-20">
            <div className="text-center">
              <Loader2 className="w-12 h-12 animate-spin mx-auto mb-4 text-accent-blue-grey" />
              <h3 className="text-xl font-semibold text-text-primary mb-2">Loading Products</h3>
              <p className="text-text-secondary">Fetching the latest products from our new collection...</p>
            </div>
          </div>
        </div>
      </section>
    );
  }

  // Error state
  if (error) {
    return (
      <section className="bg-background-white py-12 md:py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-center text-2xl font-bold uppercase text-dark-charcoal-alt mb-10">
            New Collection
          </h2>
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
      </section>
    );
  }

  // No products state
  if (products.length === 0) {
    return (
      <section className="bg-background-white py-12 md:py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-center text-2xl font-bold uppercase text-dark-charcoal-alt mb-10">
            New Collection
          </h2>
          <div className="text-center py-20">
            <p className="text-text-secondary text-lg">No products found in the new collection.</p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="bg-background-white py-12 md:py-16">
      <div className="container mx-auto px-4">
        <h2 className="text-center text-2xl font-bold uppercase text-dark-charcoal-alt mb-10">
          New Collection
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
              idPrefix="new-collection"
            />
          ))}
        </ul>
      </div>
    </section>
  );
};

export default NewCollection;