"use client";

import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { 
  addToCartOrCreate, 
  retrieveCart, 
  getCheckoutUrl,
  removeFromCart,
  updateCartLines
} from '@/lib/shopify';

export interface ShopifyCartItem {
  id: string;
  quantity: number;
  merchandiseId: string;
  title?: string;
  variantTitle?: string;
  price?: {
    amount: string;
    currencyCode: string;
  };
  product?: {
    id: string;
    title: string;
    handle: string;
    featuredImage?: {
      id: string;
      url: string;
      altText?: string;
      width: number;
      height: number;
    };
  };
}

interface ShopifyCartContextType {
  cartId: string | null;
  items: ShopifyCartItem[];
  totalItems: number;
  totalAmount: string;
  isLoading: boolean;
  error: string | null;
  addItem: (variantId: string, quantity?: number) => Promise<void>;
  removeItem: (lineId: string) => Promise<void>;
  updateQuantity: (lineId: string, quantity: number) => Promise<void>;
  clearCart: () => void;
  getCheckoutUrl: () => Promise<string | null>;
  refreshCart: () => Promise<void>;
}

const ShopifyCartContext = createContext<ShopifyCartContextType | undefined>(undefined);

export function ShopifyCartProvider({ children }: { children: React.ReactNode }) {
  const [cartId, setCartId] = useState<string | null>(null);
  const [items, setItems] = useState<ShopifyCartItem[]>([]);
  const [totalAmount, setTotalAmount] = useState<string>('0');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const refreshCart = useCallback(async (currentCartId?: string) => {
    const targetCartId = currentCartId || cartId;
    if (!targetCartId) return;

    setIsLoading(true);
    setError(null);

    try {
      const cart = await retrieveCart(targetCartId);
      if (cart) {
        // Transform cart lines to our format with full product details
        const cartItems: ShopifyCartItem[] = cart.lines.edges.map(edge => ({
          id: edge.node.id,
          quantity: edge.node.quantity,
          merchandiseId: edge.node.merchandise.id,
          title: edge.node.merchandise.title,
          variantTitle: edge.node.merchandise.title,
          price: edge.node.merchandise.price,
          product: edge.node.merchandise.product,
        }));

        console.log('Refreshed cart items with product details:', cartItems);
        setItems(cartItems);
        setTotalAmount(cart.estimatedCost.totalAmount.amount);
      } else {
        // Cart doesn't exist, clear invalid cart ID
        console.warn('Cart not found, clearing invalid cart ID');
        setCartId(null);
        setItems([]);
        setTotalAmount('0');
        localStorage.removeItem('shopify_cart_id');
      }
    } catch (err) {
      console.error('Error refreshing cart:', err);
      // If cart doesn't exist, clear it
      if (err instanceof Error && err.message.includes('does not exist')) {
        console.warn('Cart does not exist, clearing invalid cart ID');
        setCartId(null);
        setItems([]);
        setTotalAmount('0');
        localStorage.removeItem('shopify_cart_id');
      } else {
        setError('Failed to refresh cart');
      }
    } finally {
      setIsLoading(false);
    }
  }, [cartId]);

  // Load cart ID from localStorage on mount
  useEffect(() => {
    const savedCartId = localStorage.getItem('shopify_cart_id');
    if (savedCartId) {
      setCartId(savedCartId);
      refreshCart(savedCartId);
    }
  }, [refreshCart]);

  // Save cart ID to localStorage whenever it changes
  useEffect(() => {
    if (cartId) {
      localStorage.setItem('shopify_cart_id', cartId);
    }
  }, [cartId]);

  const addItem = async (variantId: string, quantity: number = 1) => {
    setIsLoading(true);
    setError(null);

    try {
      const cart = await addToCartOrCreate(variantId, quantity, cartId || undefined);
      
      // If cart ID changed (new cart was created), update it
      if (cart.id !== cartId) {
        setCartId(cart.id);
        localStorage.setItem('shopify_cart_id', cart.id);
      }
      
      // Update local state with the full cart data including product details
      const cartItems: ShopifyCartItem[] = cart.lines.edges.map(edge => ({
        id: edge.node.id,
        quantity: edge.node.quantity,
        merchandiseId: edge.node.merchandise.id,
        title: edge.node.merchandise.title,
        variantTitle: edge.node.merchandise.title,
        price: edge.node.merchandise.price,
        product: edge.node.merchandise.product,
      }));

      console.log('Cart items with product details:', cartItems);
      setItems(cartItems);
      setTotalAmount(cart.cost.totalAmount.amount);
    } catch (err) {
      console.error('Error adding item to cart:', err);
      setError('Failed to add item to cart');
    } finally {
      setIsLoading(false);
    }
  };

  const removeItem = async (lineId: string) => {
    if (!cartId) return;
    
    setIsLoading(true);
    setError(null);

    try {
      const updatedCart = await removeFromCart(cartId, [lineId]);
      
      // Update local state with the updated cart
      const cartItems: ShopifyCartItem[] = updatedCart.lines.edges.map(edge => ({
        id: edge.node.id,
        quantity: edge.node.quantity,
        merchandiseId: edge.node.merchandise.id,
        title: edge.node.merchandise.title,
        variantTitle: edge.node.merchandise.title,
        price: edge.node.merchandise.price,
        product: edge.node.merchandise.product,
      }));

      setItems(cartItems);
      setTotalAmount(updatedCart.cost.totalAmount.amount);
    } catch (err) {
      console.error('Error removing item from cart:', err);
      setError('Failed to remove item from cart');
    } finally {
      setIsLoading(false);
    }
  };

  const updateQuantity = async (lineId: string, quantity: number) => {
    if (!cartId) return;
    
    if (quantity <= 0) {
      // If quantity is 0 or less, remove the item
      await removeItem(lineId);
      return;
    }
    
    setIsLoading(true);
    setError(null);

    try {
      const updatedCart = await updateCartLines(cartId, [{ id: lineId, quantity }]);
      
      // Update local state with the updated cart
      const cartItems: ShopifyCartItem[] = updatedCart.lines.edges.map(edge => ({
        id: edge.node.id,
        quantity: edge.node.quantity,
        merchandiseId: edge.node.merchandise.id,
        title: edge.node.merchandise.title,
        variantTitle: edge.node.merchandise.title,
        price: edge.node.merchandise.price,
        product: edge.node.merchandise.product,
      }));

      setItems(cartItems);
      setTotalAmount(updatedCart.cost.totalAmount.amount);
    } catch (err) {
      console.error('Error updating cart quantity:', err);
      setError('Failed to update item quantity');
    } finally {
      setIsLoading(false);
    }
  };

  const clearCart = () => {
    setCartId(null);
    setItems([]);
    setTotalAmount('0');
    localStorage.removeItem('shopify_cart_id');
  };

  const getCheckoutUrlForCart = async (): Promise<string | null> => {
    if (!cartId) return null;

    try {
      return await getCheckoutUrl(cartId);
    } catch (err) {
      console.error('Error getting checkout URL:', err);
      setError('Failed to get checkout URL');
      return null;
    }
  };

  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <ShopifyCartContext.Provider
      value={{
        cartId,
        items,
        totalItems,
        totalAmount,
        isLoading,
        error,
        addItem,
        removeItem,
        updateQuantity,
        clearCart,
        getCheckoutUrl: getCheckoutUrlForCart,
        refreshCart,
      }}
    >
      {children}
    </ShopifyCartContext.Provider>
  );
}

export function useShopifyCart() {
  const context = useContext(ShopifyCartContext);
  if (context === undefined) {
    throw new Error('useShopifyCart must be used within a ShopifyCartProvider');
  }
  return context;
}
