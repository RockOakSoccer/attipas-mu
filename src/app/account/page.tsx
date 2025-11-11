"use client";

import { useEffect, useState } from 'react';
import { shopifyAuth, getCustomerFromUrl } from '@/lib/shopify-auth';
import Nav from '@/components/Nav';
import Footer from '@/components/Footer';
import { Loader2, CheckCircle, AlertCircle } from 'lucide-react';

export default function AccountPage() {
  const [message, setMessage] = useState<string | null>(null);
  const [messageType, setMessageType] = useState<'success' | 'info' | null>(null);

  useEffect(() => {
    // Check for URL parameters (verification, reset, etc.)
    const customerInfo = getCustomerFromUrl();
    
    if (customerInfo?.verified) {
      setMessage('Your email has been verified! Redirecting to your account...');
      setMessageType('success');
    } else if (customerInfo?.reset) {
      setMessage('Password reset initiated. Redirecting to login...');
      setMessageType('info');
    } else {
      setMessage('Redirecting to your Shopify account...');
      setMessageType('info');
    }

    // Redirect to Shopify account after a brief delay
    const timer = setTimeout(() => {
      shopifyAuth.account();
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  const handleManualRedirect = () => {
    shopifyAuth.account();
  };

  return (
    <div className="min-h-screen bg-white">
      <Nav />
      <div className="py-8 md:py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-md mx-auto text-center">
            <div className="mb-8">
              {messageType === 'success' && (
                <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
              )}
              {messageType === 'info' && (
                <AlertCircle className="w-16 h-16 text-blue-500 mx-auto mb-4" />
              )}
              <Loader2 className="w-8 h-8 animate-spin text-gray-500 mx-auto mb-4" />
            </div>
            
            <h1 className="text-2xl font-bold text-gray-900 mb-4">
              Account Access
            </h1>
            
            <p className="text-gray-600 mb-8">
              {message || 'Redirecting to your account...'}
            </p>
            
            <div className="space-y-4">
              <button
                onClick={handleManualRedirect}
                className="w-full bg-blue-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
              >
                Go to Account Now
              </button>
              
              <div className="text-sm text-gray-500">
                <p>This will redirect you to Shopify&apos;s secure account system where you can:</p>
                <ul className="mt-2 space-y-1">
                  <li>• Login or create an account</li>
                  <li>• View your order history</li>
                  <li>• Manage your addresses</li>
                  <li>• Update account preferences</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
