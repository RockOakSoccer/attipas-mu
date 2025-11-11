"use client";

import * as React from "react";

type Currency = "USD" | "AUD" | "CAD" | "EUR" | "GBP" | "MUR";

type CurrencyContextType = {
  currency: Currency;
  setCurrency: (currency: Currency) => void;
  convertPrice: (priceUSD: number) => string;
  currencySymbol: string;
};

const CurrencyContext = React.createContext<CurrencyContextType | undefined>(undefined);

// Exchange rates relative to USD (as of approximate rates)
const exchangeRates: Record<Currency, number> = {
  USD: 1,
  AUD: 1.52,
  CAD: 1.36,
  EUR: 0.92,
  GBP: 0.79,
  MUR: 1,
};

const currencySymbols: Record<Currency, string> = {
  USD: "$",
  AUD: "A$",
  CAD: "C$",
  EUR: "€",
  GBP: "£",
  MUR: "Rs",
};

export function CurrencyProvider({ children }: { children: React.ReactNode }) {
  const [currency, setCurrencyState] = React.useState<Currency>("MUR");

  // Load currency from localStorage on mount
  React.useEffect(() => {
    const savedCurrency = localStorage.getItem("currency") as Currency;
    if (savedCurrency && exchangeRates[savedCurrency]) {
      setCurrencyState(savedCurrency);
    }
  }, []);

  const setCurrency = React.useCallback((newCurrency: Currency) => {
    setCurrencyState(newCurrency);
    localStorage.setItem("currency", newCurrency);
  }, []);

  const convertPrice = React.useCallback(
    (priceUSD: number): string => {
      const convertedPrice = priceUSD * exchangeRates[currency];
      return convertedPrice.toFixed(2);
    },
    [currency]
  );

  const currencySymbol = currencySymbols[currency];

  return (
    <CurrencyContext.Provider value={{ currency, setCurrency, convertPrice, currencySymbol }}>
      {children}
    </CurrencyContext.Provider>
  );
}

export function useCurrency() {
  const context = React.useContext(CurrencyContext);
  if (context === undefined) {
    throw new Error("useCurrency must be used within a CurrencyProvider");
  }
  return context;
}