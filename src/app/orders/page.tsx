"use client";

import { useState } from 'react';
import { useAuth } from '@/contexts/auth-context';
import Nav from '@/components/Nav';
import Footer from '@/components/Footer';
import Link from 'next/link';
import { ChevronRight, Package, Truck, CheckCircle, Clock, AlertCircle, Eye } from 'lucide-react';

export default function OrdersPage() {
  const { customer, isAuthenticated, isLoading } = useAuth();
  const [selectedFilter, setSelectedFilter] = useState<string>('all');

  if (isLoading) {
    return (
      <div className="min-h-screen bg-white">
        <Nav />
        <div className="py-8 md:py-16">
          <div className="container mx-auto px-4">
            <div className="flex items-center justify-center py-20">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-accent-pink"></div>
              <span className="ml-2">Loading orders...</span>
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
              <p className="text-gray-600 mb-6">You need to be signed in to view your orders.</p>
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

  const orders = customer?.orders.edges || [];
  
  const getStatusIcon = (fulfillmentStatus?: string, financialStatus?: string) => {
    if (fulfillmentStatus === 'FULFILLED') {
      return <CheckCircle className="w-5 h-5 text-green-500" />;
    } else if (fulfillmentStatus === 'PARTIALLY_FULFILLED') {
      return <Truck className="w-5 h-5 text-blue-500" />;
    } else if (financialStatus === 'PENDING') {
      return <Clock className="w-5 h-5 text-yellow-500" />;
    } else if (financialStatus === 'PAID') {
      return <Package className="w-5 h-5 text-blue-500" />;
    } else {
      return <AlertCircle className="w-5 h-5 text-gray-400" />;
    }
  };

  const getStatusText = (fulfillmentStatus?: string, financialStatus?: string) => {
    if (fulfillmentStatus === 'FULFILLED') {
      return { text: 'Delivered', color: 'text-green-600' };
    } else if (fulfillmentStatus === 'PARTIALLY_FULFILLED') {
      return { text: 'In Transit', color: 'text-blue-600' };
    } else if (financialStatus === 'PENDING') {
      return { text: 'Processing', color: 'text-yellow-600' };
    } else if (financialStatus === 'PAID') {
      return { text: 'Confirmed', color: 'text-blue-600' };
    } else {
      return { text: 'Pending', color: 'text-gray-500' };
    }
  };

  const filteredOrders = orders.filter(orderEdge => {
    if (selectedFilter === 'all') return true;
    const { fulfillmentStatus, financialStatus } = orderEdge.node;
    
    switch (selectedFilter) {
      case 'processing':
        return financialStatus === 'PENDING' || (financialStatus === 'PAID' && !fulfillmentStatus);
      case 'shipped':
        return fulfillmentStatus === 'PARTIALLY_FULFILLED';
      case 'delivered':
        return fulfillmentStatus === 'FULFILLED';
      default:
        return true;
    }
  });

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
            <span className="text-text-primary">Orders</span>
          </div>

          <div className="max-w-6xl mx-auto">
            {/* Header */}
            <div className="flex items-center justify-between mb-8">
              <div>
                <h1 className="text-3xl font-bold text-gray-900 mb-2">My Orders</h1>
                <p className="text-gray-600">Track and manage your orders</p>
              </div>
              <Link
                href="/account"
                className="text-accent-pink hover:text-accent-pink-dark underline"
              >
                Back to Account
              </Link>
            </div>

            {/* Filter Tabs */}
            <div className="flex space-x-1 mb-6 bg-gray-100 rounded-lg p-1">
              {[
                { key: 'all', label: 'All Orders', count: orders.length },
                { key: 'processing', label: 'Processing', count: orders.filter(o => o.node.financialStatus === 'PENDING' || (o.node.financialStatus === 'PAID' && !o.node.fulfillmentStatus)).length },
                { key: 'shipped', label: 'Shipped', count: orders.filter(o => o.node.fulfillmentStatus === 'PARTIALLY_FULFILLED').length },
                { key: 'delivered', label: 'Delivered', count: orders.filter(o => o.node.fulfillmentStatus === 'FULFILLED').length },
              ].map((filter) => (
                <button
                  key={filter.key}
                  onClick={() => setSelectedFilter(filter.key)}
                  className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors ${
                    selectedFilter === filter.key
                      ? 'bg-white text-accent-pink shadow-sm'
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  {filter.label} ({filter.count})
                </button>
              ))}
            </div>

            {/* Orders List */}
            {filteredOrders.length === 0 ? (
              <div className="text-center py-12">
                <Package className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  {selectedFilter === 'all' ? 'No orders yet' : `No ${selectedFilter} orders`}
                </h3>
                <p className="text-gray-600 mb-6">
                  {selectedFilter === 'all' 
                    ? 'Start shopping to see your orders here!'
                    : `You don't have any ${selectedFilter} orders at the moment.`
                  }
                </p>
                {selectedFilter === 'all' && (
                  <Link
                    href="/products"
                    className="bg-accent-pink text-white px-6 py-3 rounded-lg font-semibold hover:bg-accent-pink-dark transition-colors"
                  >
                    Start Shopping
                  </Link>
                )}
              </div>
            ) : (
              <div className="space-y-4">
                {filteredOrders.map((orderEdge) => {
                  const order = orderEdge.node;
                  const status = getStatusText(order.fulfillmentStatus, order.financialStatus);
                  
                  return (
                    <div key={order.id} className="bg-white border rounded-lg p-6 hover:shadow-md transition-shadow">
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex items-center space-x-3">
                          {getStatusIcon(order.fulfillmentStatus, order.financialStatus)}
                          <div>
                            <h3 className="text-lg font-semibold text-gray-900">
                              Order #{order.orderNumber}
                            </h3>
                            <p className="text-sm text-gray-500">
                              Placed on {new Date(order.processedAt).toLocaleDateString('en-US', {
                                year: 'numeric',
                                month: 'long',
                                day: 'numeric'
                              })}
                            </p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="text-lg font-semibold text-gray-900">
                            ${parseFloat(order.totalPrice.amount).toFixed(2)}
                          </p>
                          <p className={`text-sm font-medium ${status.color}`}>
                            {status.text}
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                        <div className="flex items-center space-x-4 text-sm text-gray-600">
                          <span>Payment: {order.financialStatus.toLowerCase().replace('_', ' ')}</span>
                          {order.fulfillmentStatus && (
                            <span>Fulfillment: {order.fulfillmentStatus.toLowerCase().replace('_', ' ')}</span>
                          )}
                        </div>
                        <Link
                          href={`/orders/${order.id.split('/').pop()}`}
                          className="flex items-center space-x-2 text-accent-pink hover:text-accent-pink-dark font-medium"
                        >
                          <Eye className="w-4 h-4" />
                          <span>View Details</span>
                        </Link>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
