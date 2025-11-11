"use client";

import { useShopifyCart } from '@/contexts/shopify-cart-context';
import { useCurrency } from '@/contexts/currency-context';
import Link from 'next/link';
import Image from 'next/image';
import { ChevronRight, ShoppingBag, Loader2, Minus, Plus } from 'lucide-react';
import Nav from '@/components/Nav';
import Footer from '@/components/Footer';

export default function CartPage() {
  const { items, totalAmount, cartId, getCheckoutUrl, removeItem, updateQuantity, isLoading, error } = useShopifyCart();
  const { currencySymbol } = useCurrency();

  const handleCheckout = async () => {
    if (!cartId) return;

    try {
      const checkoutUrl = await getCheckoutUrl();
      if (checkoutUrl) {
        window.location.href = checkoutUrl;
      }
    } catch (err) {
      console.error('Error getting checkout URL:', err);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-white">
        <Nav />
        <div className="py-8 md:py-16">
          <div className="container mx-auto px-4">
            <div className="flex items-center justify-center py-20">
              <Loader2 className="w-8 h-8 animate-spin" />
              <span className="ml-2">Loading cart...</span>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-white">
        <Nav />
        <div className="py-8 md:py-16 border-2 border-red-900">
          <div className="container mx-auto px-4">
            {/* Breadcrumb */}
            <div className="flex items-center gap-2 text-sm text-text-secondary mb-6">
              <Link href="/" className="hover:text-text-primary">Home</Link>
              <ChevronRight size={16} />
              <span className="text-text-primary">Shopping Cart</span>
            </div>

            <h1 className="text-2xl md:text-3xl font-bold text-text-primary mb-8">
              Shopping Cart
            </h1>

            <div className="max-w-2xl mx-auto bg-background-light-grey rounded-lg p-12 text-center">
              <ShoppingBag className="w-16 h-16 mx-auto mb-4 text-gray-400" />
              <p className="text-xl text-text-secondary mb-6">Your cart is empty</p>
              <Link
                href="/collections/all-products"
                className="inline-block bg-accent-pink text-white px-8 py-3 rounded-lg font-semibold hover:bg-accent-pink-dark transition-colors"
              >
                Continue Shopping
              </Link>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <Nav />
      <div className="pb-8 md:pb-16 border-red-900">
        <div className="container mx-auto px-4">
          {/* Breadcrumb */}
          <div className="flex items-center pt-4 gap-2 text-sm text-text-secondary mb-6">
            <Link href="/" className="hover:text-text-primary">Home</Link>
            <ChevronRight size={16} />
            <span className="text-text-primary">Shopping Cart</span>
          </div>

          <div className="text-center mb-12">
            <h1 className="text-3xl font-bold text-gray-900 mb-4">Your cart</h1>
            <Link href="/collections/all-products" className="text-blue-600 hover:text-blue-800 underline text-sm">
              Continue shopping
            </Link>
          </div>

          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded mb-6">
              {error}
            </div>
          )}

          {/* Cart Table */}
          <div className="max-w-6xl mx-auto">
            <div className="bg-white">
              {/* Table Header */}
              <div className="hidden md:grid grid-cols-12 gap-4 py-4 border-b border-gray-200 text-sm font-medium text-gray-600">
                <div className="col-span-6">Product</div>
                <div className="col-span-2 text-center">Price</div>
                <div className="col-span-2 text-center">Quantity</div>
                <div className="col-span-2 text-right">Total</div>
              </div>

              {/* Cart Items */}
              <div className="divide-y divide-gray-200">
                {items.map((item) => {
                  const itemPrice = item.price ? parseFloat(item.price.amount) : 0;
                  const itemTotal = itemPrice * item.quantity;

                  return (
                    <div key={item.id} className="grid grid-cols-1 md:grid-cols-12 gap-4 py-6 items-center">
                      {/* Product Info */}
                      <div className="md:col-span-6 flex items-start gap-4">
                        <div className="w-20 h-20 bg-gray-100 rounded-lg flex items-center justify-center flex-shrink-0 overflow-hidden">
                          {item.product?.featuredImage?.url ? (
                            <Image
                              src={item.product.featuredImage.url}
                              alt={item.product.featuredImage.altText || item.product.title || 'Attipas Baby Shoes'}
                              width={80}
                              height={80}
                              className="w-full h-full object-cover rounded-lg"
                              onError={(e) => {
                                // Fallback to placeholder if image fails to load
                                e.currentTarget.style.display = 'none';
                              }}
                            />
                          ) : (
                            <div className="flex flex-col items-center justify-center text-gray-400">
                              <ShoppingBag className="w-8 h-8 mb-1" />
                              <span className="text-xs">No Image</span>
                            </div>
                          )}
                        </div>
                        <div className="flex-1 min-w-0">
                          <h3 className="font-medium text-gray-900 mb-1">
                            {item.product?.title || 'Attipas Baby Shoes'}
                          </h3>
                          <p className="text-sm text-gray-500 mb-2">
                            Size: {item.variantTitle || 'One Size'}
                          </p>
                          <button
                            onClick={() => removeItem(item.id)}
                            disabled={isLoading}
                            className="text-sm text-gray-500 hover:text-red-600 underline disabled:opacity-50"
                          >
                            Remove
                          </button>
                        </div>
                      </div>

                      {/* Price */}
                      <div className="md:col-span-2 flex md:justify-center justify-between items-center">
                        <span className="md:hidden text-sm font-medium text-gray-600">Price:</span>
                        {item.price && (
                          <div className="text-sm text-gray-900">
                            {currencySymbol} {parseFloat(item.price.amount).toFixed(2)}
                          </div>
                        )}
                      </div>

                      {/* Quantity */}
                      <div className="md:col-span-2 flex md:justify-center justify-between items-center">
                        <span className="md:hidden text-sm font-medium text-gray-600">Quantity:</span>
                        <div className="flex items-center border border-gray-300 rounded">
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            disabled={isLoading}
                            className="p-1 hover:bg-gray-100 disabled:opacity-50"
                          >
                            <Minus className="w-4 h-4" />
                          </button>
                          <input
                            type="number"
                            value={item.quantity}
                            onChange={(e) => {
                              const newQuantity = parseInt(e.target.value) || 1;
                              updateQuantity(item.id, newQuantity);
                            }}
                            className="w-12 text-center border-0 focus:ring-0 text-sm"
                            min="1"
                          />
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            disabled={isLoading}
                            className="p-1 hover:bg-gray-100 disabled:opacity-50"
                          >
                            <Plus className="w-4 h-4" />
                          </button>
                        </div>
                      </div>

                      {/* Total */}
                      <div className="md:col-span-2 flex md:justify-end justify-between items-center">
                        <span className="md:hidden text-sm font-medium text-gray-600">Total:</span>
                        <div className="font-medium text-gray-900">
                          {currencySymbol}{itemTotal.toFixed(2)}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Cart Summary */}
              <div className="border-t border-gray-200 pt-6">
                <div className="flex justify-end">
                  <div className="w-80">
                    <div className="flex justify-between py-2">
                      <span className="text-gray-600">Subtotal</span>
                      <span className="font-medium">{currencySymbol} {parseFloat(totalAmount).toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between py-2 text-sm text-gray-500">
                      <span>Tax included. <Link href="/shipping" className="underline">Shipping</Link> calculated at checkout.</span>
                    </div>

                    <button
                      onClick={handleCheckout}
                      disabled={!cartId || isLoading}
                      className="w-full bg-[#d68972] text-white py-3 px-6 rounded font-medium hover:bg-[#d68972]/80 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center mt-4"
                    >
                      {isLoading ? (
                        <>
                          <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                          Processing...
                        </>
                      ) : (
                        'Checkout'
                      )}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
