import type { Metadata } from "next";
import { Analytics } from '@vercel/analytics/next';
import "./globals.css";
// import VisualEditsMessenger from "../visual-edits/VisualEditsMessenger";
// import ErrorReporter from "@/components/ErrorReporter";
import { ShopifyCartProvider } from "@/contexts/shopify-cart-context";
import { CurrencyProvider } from "@/contexts/currency-context";
import { SearchProvider } from "@/contexts/search-context";


export const metadata: Metadata = {
  title: "Attipas | MU",
  description: "Attipas  is a premium baby footwear brand based in Mauritius",
  keywords: ["Attipas", "Mauritius", "Baby Footwear", "Toddler Shoes", "Kids Mesh Shoes"],
  icons: {
    icon: "/favicon.webp",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        {/* <ErrorReporter /> */}
        {/* <Script
          src="https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/scripts//route-messenger.js"
          strategy="afterInteractive"
          data-target-origin="*"
          data-message-type="ROUTE_CHANGE"
          data-include-search-params="true"
          data-only-in-iframe="true"
          data-debug="true"
          data-custom-data='{"appName": "YourApp", "version": "1.0.0", "greeting": "hi"}'
        /> */}
        <CurrencyProvider>
          <ShopifyCartProvider>
            <SearchProvider>
              {children}
            </SearchProvider>
          </ShopifyCartProvider>
        </CurrencyProvider>
        <Analytics />
        {/* <VisualEditsMessenger /> */}
      </body>
    </html>
  );
}