"use client";

import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { loginCustomer, logoutCustomer, getCustomer, createCustomer, ShopifyCustomer } from '@/lib/shopify';

interface AuthContextType {
  customer: ShopifyCustomer | null;
  accessToken: string | null;
  isLoading: boolean;
  error: string | null;
  emailVerificationRequired: string | null; // Email that needs verification
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => Promise<void>;
  register: (email: string, password: string, firstName?: string, lastName?: string) => Promise<boolean>;
  refreshCustomer: () => Promise<void>;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [customer, setCustomer] = useState<ShopifyCustomer | null>(null);
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [emailVerificationRequired, setEmailVerificationRequired] = useState<string | null>(null);

  const refreshCustomer = useCallback(async () => {
    if (!accessToken) return;

    setIsLoading(true);
    setError(null);

    try {
      const customerData = await getCustomer(accessToken);
      setCustomer(customerData);
    } catch (err) {
      console.error('Error refreshing customer:', err);
      setError('Failed to refresh customer data');
      // If token is invalid, clear it
      setAccessToken(null);
      setCustomer(null);
      localStorage.removeItem('shopify_access_token');
    } finally {
      setIsLoading(false);
    }
  }, [accessToken]);

  // Check for stored access token on mount
  useEffect(() => {
    const storedToken = localStorage.getItem('shopify_access_token');
    if (storedToken) {
      setAccessToken(storedToken);
      // We'll refresh customer data after accessToken is set
    }
  }, []);

  // Refresh customer data when accessToken changes
  useEffect(() => {
    if (accessToken) {
      refreshCustomer();
    }
  }, [accessToken, refreshCustomer]);

  const login = async (email: string, password: string): Promise<boolean> => {
    setIsLoading(true);
    setError(null);

    try {
      const tokenData = await loginCustomer(email, password);
      
      if (tokenData) {
        setAccessToken(tokenData.accessToken);
        localStorage.setItem('shopify_access_token', tokenData.accessToken);
        
        // Get customer data
        const customerData = await getCustomer(tokenData.accessToken);
        setCustomer(customerData);
        
        return true;
      }
      
      return false;
    } catch (err) {
      console.error('Login error:', err);
      setError(err instanceof Error ? err.message : 'Login failed');
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = async (): Promise<void> => {
    setIsLoading(true);
    setError(null);

    try {
      if (accessToken) {
        await logoutCustomer(accessToken);
      }
    } catch (err) {
      console.error('Logout error:', err);
      setError('Failed to logout properly');
    } finally {
      setAccessToken(null);
      setCustomer(null);
      localStorage.removeItem('shopify_access_token');
      setIsLoading(false);
    }
  };

  const register = async (
    email: string, 
    password: string, 
    firstName?: string, 
    lastName?: string
  ): Promise<boolean> => {
    setIsLoading(true);
    setError(null);
    setEmailVerificationRequired(null);

    try {
      const newCustomer = await createCustomer(email, password, firstName, lastName);
      
      if (newCustomer) {
        // Check if email verification is required
        if (newCustomer.id === 'pending-verification') {
          setEmailVerificationRequired(email);
          return true; // Registration successful, but needs verification
        }
        
        // After successful registration, automatically log in
        return await login(email, password);
      }
      
      return false;
    } catch (err) {
      console.error('Registration error:', err);
      setError(err instanceof Error ? err.message : 'Registration failed');
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const value: AuthContextType = {
    customer,
    accessToken,
    isLoading,
    error,
    emailVerificationRequired,
    login,
    logout,
    register,
    refreshCustomer,
    isAuthenticated: !!customer && !!accessToken,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
