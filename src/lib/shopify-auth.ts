/**
 * Shopify Authentication Utilities
 * Simple redirect-based authentication using Shopify's built-in customer accounts
 */

const SHOPIFY_DOMAIN = process.env.NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN || 'your-store.myshopify.com';

export const shopifyAuth = {
  /**
   * Redirect to Shopify login page
   */
  login: (returnUrl?: string) => {
    const currentUrl = returnUrl || window.location.href;
    const loginUrl = `https://${SHOPIFY_DOMAIN}/account/login?return_url=${encodeURIComponent(currentUrl)}`;
    window.location.href = loginUrl;
  },

  /**
   * Redirect to Shopify registration page
   */
  register: (returnUrl?: string) => {
    const currentUrl = returnUrl || window.location.href;
    const registerUrl = `https://${SHOPIFY_DOMAIN}/account/register?return_url=${encodeURIComponent(currentUrl)}`;
    window.location.href = registerUrl;
  },

  /**
   * Redirect to Shopify account dashboard
   */
  account: () => {
    const accountUrl = `https://${SHOPIFY_DOMAIN}/account`;
    window.location.href = accountUrl;
  },

  /**
   * Redirect to Shopify logout (clears session)
   */
  logout: (returnUrl?: string) => {
    const currentUrl = returnUrl || window.location.origin;
    const logoutUrl = `https://${SHOPIFY_DOMAIN}/account/logout?return_url=${encodeURIComponent(currentUrl)}`;
    window.location.href = logoutUrl;
  },

  /**
   * Get Shopify account URLs for links
   */
  getUrls: () => ({
    login: `https://${SHOPIFY_DOMAIN}/account/login`,
    register: `https://${SHOPIFY_DOMAIN}/account/register`,
    account: `https://${SHOPIFY_DOMAIN}/account`,
    logout: `https://${SHOPIFY_DOMAIN}/account/logout`,
  }),
};

/**
 * Check if user is authenticated by looking for Shopify customer cookie
 * Note: This is a basic check - Shopify handles the actual authentication
 */
export const isAuthenticated = (): boolean => {
  if (typeof window === 'undefined') return false;
  
  // Check for Shopify customer session cookie
  return document.cookie.includes('_shopify_customer_session');
};

/**
 * Get customer info from URL parameters (after Shopify redirects back)
 */
export const getCustomerFromUrl = () => {
  if (typeof window === 'undefined') return null;
  
  const params = new URLSearchParams(window.location.search);
  return {
    verified: params.get('verified') === 'true',
    reset: params.get('reset') === 'true',
    customerAccessToken: params.get('customer_access_token'),
  };
};
