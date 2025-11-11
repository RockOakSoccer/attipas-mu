"use client";

import { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/auth-context';
import { getOrderDetails, ShopifyOrderDetails } from '@/lib/shopify';
import Nav from '@/components/Nav';
import Footer from '@/components/Footer';
import Link from 'next/link';
import Image from 'next/image';
import { 
  ChevronRight, 
  Package, 
  Truck, 
  CheckCircle, 
  Clock, 
  AlertCircle, 
  MapPin, 
  CreditCard,
  Copy,
  ExternalLink
} from 'lucide-react';

interface OrderDetailsPageProps {
  params: {
    id: string;
  };
}

export default function OrderDetailsPage({ params }: OrderDetailsPageProps) {
  const { accessToken, isAuthenticated, isLoading } = useAuth();
  const [order, setOrder] = useState<ShopifyOrderDetails | null>(null);
  const [orderLoading, setOrderLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [copiedTrackingNumber, setCopiedTrackingNumber] = useState<string | null>(null);
  const [orderId, setOrderId] = useState<string>("");

  // Handle async params
  useEffect(() => {
    const getId = async () => {
      const resolvedParams = await params;
      setOrderId(resolvedParams.id);
    };
    getId();
  }, [params]);

  useEffect(() => {
    const fetchOrderDetails = async () => {
      if (!accessToken || !orderId) return;

      setOrderLoading(true);
      setError(null);

      try {
        const orderDetails = await getOrderDetails(accessToken, orderId);
        setOrder(orderDetails);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load order details');
      } finally {
        setOrderLoading(false);
      }
    };

    if (isAuthenticated && accessToken && orderId) {
      fetchOrderDetails();
    }
  }, [accessToken, orderId, isAuthenticated]);

  const copyTrackingNumber = async (trackingNumber: string) => {
    try {
      await navigator.clipboard.writeText(trackingNumber);
      setCopiedTrackingNumber(trackingNumber);
      setTimeout(() => setCopiedTrackingNumber(null), 2000);
    } catch (err) {
      console.error('Failed to copy tracking number:', err);
    }
  };

  const getStatusIcon = (fulfillmentStatus?: string, financialStatus?: string) => {
    if (fulfillmentStatus === 'FULFILLED') {
      return <CheckCircle className="w-6 h-6 text-green-500" />;
    } else if (fulfillmentStatus === 'PARTIALLY_FULFILLED') {
      return <Truck className="w-6 h-6 text-blue-500" />;
    } else if (financialStatus === 'PENDING') {
      return <Clock className="w-6 h-6 text-yellow-500" />;
    } else if (financialStatus === 'PAID') {
      return <Package className="w-6 h-6 text-blue-500" />;
    } else {
      return <AlertCircle className="w-6 h-6 text-gray-400" />;
    }
  };

  const getStatusText = (fulfillmentStatus?: string, financialStatus?: string) => {
    if (fulfillmentStatus === 'FULFILLED') {
      return { text: 'Delivered', color: 'text-green-600', bgColor: 'bg-green-50' };
    } else if (fulfillmentStatus === 'PARTIALLY_FULFILLED') {
      return { text: 'In Transit', color: 'text-blue-600', bgColor: 'bg-blue-50' };
    } else if (financialStatus === 'PENDING') {
      return { text: 'Processing', color: 'text-yellow-600', bgColor: 'bg-yellow-50' };
    } else if (financialStatus === 'PAID') {
      return { text: 'Confirmed', color: 'text-blue-600', bgColor: 'bg-blue-50' };
    } else {
      return { text: 'Pending', color: 'text-gray-500', bgColor: 'bg-gray-50' };
    }
  };

  if (isLoading || orderLoading) {
    return (
      <div className="min-h-screen bg-white">
        <Nav />
        <div className="py-8 md:py-16">
          <div className="container mx-auto px-4">
            <div className="flex items-center justify-center py-20">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-accent-pink"></div>
              <span className="ml-2">Loading order details...</span>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-white">
        <Nav />
        <div className="py-8 md:py-16">
          <div className="container mx-auto px-4">
            <div className="text-center py-20">
              <h1 className="text-2xl font-bold text-gray-900 mb-4">Please Sign In</h1>
              <p className="text-gray-600 mb-6">You need to be signed in to view order details.</p>
              <Link
                href="/account"
                className="bg-accent-pink text-white px-6 py-3 rounded-lg font-semibold hover:bg-accent-pink-dark transition-colors"
              >
                Sign In
              </Link>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  if (error || !order) {
    return (
      <div className="min-h-screen bg-white">
        <Nav />
        <div className="py-8 md:py-16">
          <div className="container mx-auto px-4">
            <div className="text-center py-20">
              <AlertCircle className="w-16 h-16 text-red-300 mx-auto mb-4" />
              <h1 className="text-2xl font-bold text-gray-900 mb-4">Order Not Found</h1>
              <p className="text-gray-600 mb-6">
                {error || 'The order you\'re looking for doesn\'t exist or you don\'t have permission to view it.'}
              </p>
              <Link
                href="/orders"
                className="bg-accent-pink text-white px-6 py-3 rounded-lg font-semibold hover:bg-accent-pink-dark transition-colors"
              >
                Back to Orders
              </Link>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  const status = getStatusText(order.fulfillmentStatus, order.financialStatus);

  return (
    <div className="min-h-screen bg-white">
      <Nav />
      <div className="py-8 md:py-16">
        <div className="container mx-auto px-4">
          {/* Breadcrumb */}
          <div className="flex items-center gap-2 text-sm text-text-secondary mb-6">
            <Link href="/" className="hover:text-text-primary">Home</Link>
            <ChevronRight size={16} />
            <Link href="/account" className="hover:text-text-primary">Account</Link>
            <ChevronRight size={16} />
            <Link href="/orders" className="hover:text-text-primary">Orders</Link>
            <ChevronRight size={16} />
            <span className="text-text-primary">Order #{order.orderNumber}</span>
          </div>

          <div className="max-w-6xl mx-auto">
            {/* Header */}
            <div className="flex items-start justify-between mb-8">
              <div>
                <div className="flex items-center space-x-3 mb-2">
                  {getStatusIcon(order.fulfillmentStatus, order.financialStatus)}
                  <h1 className="text-3xl font-bold text-gray-900">
                    Order #{order.orderNumber}
                  </h1>
                </div>
                <p className="text-gray-600">
                  Placed on {new Date(order.processedAt).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit'
                  })}
                </p>
              </div>
              <div className="text-right">
                <div className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${status.color} ${status.bgColor}`}>
                  {status.text}
                </div>
                <p className="text-2xl font-bold text-gray-900 mt-2">
                  ${parseFloat(order.totalPrice.amount).toFixed(2)}
                </p>
              </div>
            </div>

            <div className="grid lg:grid-cols-3 gap-8">
              {/* Main Content */}
              <div className="lg:col-span-2 space-y-8">
                {/* Order Items */}
                <div className="bg-white border rounded-lg p-6">
                  <h2 className="text-xl font-semibold text-gray-900 mb-6">Order Items</h2>
                  <div className="space-y-4">
                    {order.lineItems.edges.map((lineItemEdge, index) => {
                      const item = lineItemEdge.node;
                      return (
                        <div key={index} className="flex items-center space-x-4 p-4 border border-gray-100 rounded-lg">
                          {item.variant.product.featuredImage && (
                            <div className="flex-shrink-0">
                              <Image
                                src={item.variant.product.featuredImage.url}
                                alt={item.variant.product.featuredImage.altText || item.title}
                                width={80}
                                height={80}
                                className="rounded-lg object-cover"
                              />
                            </div>
                          )}
                          <div className="flex-grow">
                            <h3 className="font-semibold text-gray-900">{item.title}</h3>
                            <p className="text-sm text-gray-600">{item.variant.title}</p>
                            <p className="text-sm text-gray-600">Quantity: {item.quantity}</p>
                          </div>
                          <div className="text-right">
                            <p className="font-semibold text-gray-900">
                              ${(parseFloat(item.variant.price.amount) * item.quantity).toFixed(2)}
                            </p>
                            <p className="text-sm text-gray-600">
                              ${parseFloat(item.variant.price.amount).toFixed(2)} each
                            </p>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Tracking Information */}
                {order.fulfillments.length > 0 && (
                  <div className="bg-white border rounded-lg p-6">
                    <h2 className="text-xl font-semibold text-gray-900 mb-6">Tracking Information</h2>
                    <div className="space-y-4">
                      {order.fulfillments.map((fulfillment, index) => (
                        <div key={index} className="border border-gray-100 rounded-lg p-4">
                          <div className="flex items-center justify-between mb-3">
                            <div className="flex items-center space-x-2">
                              <Truck className="w-5 h-5 text-blue-500" />
                              <span className="font-medium text-gray-900">
                                {fulfillment.trackingCompany || 'Carrier'}
                              </span>
                            </div>
                            <span className="text-sm text-gray-500 capitalize">
                              {fulfillment.status.toLowerCase()}
                            </span>
                          </div>
                          
                          {fulfillment.trackingInfo && fulfillment.trackingInfo.length > 0 && (
                            <div className="space-y-2">
                              {fulfillment.trackingInfo.map((tracking, trackingIndex) => (
                                <div key={trackingIndex} className="flex items-center justify-between bg-gray-50 rounded p-3">
                                  <div className="flex items-center space-x-3">
                                    <span className="font-mono text-sm text-gray-900">
                                      {tracking.number}
                                    </span>
                                    <button
                                      onClick={() => copyTrackingNumber(tracking.number)}
                                      className="text-gray-500 hover:text-gray-700"
                                      title="Copy tracking number"
                                    >
                                      <Copy className="w-4 h-4" />
                                    </button>
                                    {copiedTrackingNumber === tracking.number && (
                                      <span className="text-sm text-green-600">Copied!</span>
                                    )}
                                  </div>
                                  {tracking.url && (
                                    <a
                                      href={tracking.url}
                                      target="_blank"
                                      rel="noopener noreferrer"
                                      className="flex items-center space-x-1 text-accent-pink hover:text-accent-pink-dark"
                                    >
                                      <span className="text-sm">Track Package</span>
                                      <ExternalLink className="w-4 h-4" />
                                    </a>
                                  )}
                                </div>
                              ))}
                            </div>
                          )}

                          {fulfillment.trackingUrls.length > 0 && (
                            <div className="mt-3 space-y-2">
                              {fulfillment.trackingUrls.map((url, urlIndex) => (
                                <a
                                  key={urlIndex}
                                  href={url}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="flex items-center space-x-2 text-accent-pink hover:text-accent-pink-dark"
                                >
                                  <ExternalLink className="w-4 h-4" />
                                  <span className="text-sm">Track Package {urlIndex + 1}</span>
                                </a>
                              ))}
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Sidebar */}
              <div className="space-y-6">
                {/* Order Summary */}
                <div className="bg-white border rounded-lg p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Order Summary</h3>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Subtotal</span>
                      <span className="text-gray-900">${parseFloat(order.subtotalPrice.amount).toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Shipping</span>
                      <span className="text-gray-900">${parseFloat(order.totalShippingPrice.amount).toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Tax</span>
                      <span className="text-gray-900">${parseFloat(order.totalTax.amount).toFixed(2)}</span>
                    </div>
                    <div className="border-t pt-3">
                      <div className="flex justify-between">
                        <span className="font-semibold text-gray-900">Total</span>
                        <span className="font-semibold text-gray-900">${parseFloat(order.totalPrice.amount).toFixed(2)}</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Payment Information */}
                <div className="bg-white border rounded-lg p-6">
                  <div className="flex items-center space-x-2 mb-4">
                    <CreditCard className="w-5 h-5 text-gray-600" />
                    <h3 className="text-lg font-semibold text-gray-900">Payment</h3>
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Status</span>
                      <span className={`font-medium capitalize ${
                        order.financialStatus === 'PAID' ? 'text-green-600' : 
                        order.financialStatus === 'PENDING' ? 'text-yellow-600' : 
                        'text-gray-600'
                      }`}>
                        {order.financialStatus.toLowerCase()}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Amount</span>
                      <span className="text-gray-900">${parseFloat(order.totalPrice.amount).toFixed(2)}</span>
                    </div>
                  </div>
                </div>

                {/* Shipping Address */}
                {order.shippingAddress && (
                  <div className="bg-white border rounded-lg p-6">
                    <div className="flex items-center space-x-2 mb-4">
                      <MapPin className="w-5 h-5 text-gray-600" />
                      <h3 className="text-lg font-semibold text-gray-900">Shipping Address</h3>
                    </div>
                    <div className="text-sm text-gray-600 space-y-1">
                      <p className="font-medium text-gray-900">
                        {order.shippingAddress.firstName} {order.shippingAddress.lastName}
                      </p>
                      {order.shippingAddress.company && (
                        <p>{order.shippingAddress.company}</p>
                      )}
                      <p>{order.shippingAddress.address1}</p>
                      {order.shippingAddress.address2 && (
                        <p>{order.shippingAddress.address2}</p>
                      )}
                      <p>
                        {order.shippingAddress.city}, {order.shippingAddress.province} {order.shippingAddress.zip}
                      </p>
                      <p>{order.shippingAddress.country}</p>
                      {order.shippingAddress.phone && (
                        <p>{order.shippingAddress.phone}</p>
                      )}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
