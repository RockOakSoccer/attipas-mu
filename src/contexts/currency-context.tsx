"use client";

import * as React from "react";

type Currency = "USD" | "AUD" | "CAD" | "EUR" | "GBP" | "MUR";

type CurrencyContextType = {
  currency: Currency;
  setCurrency: (currency: Currency) => void;
  convertPrice: (priceUSD: number) => string;
  formatPrice: (price: number, targetCurrency?: Currency) => string;
  currencySymbol: string;
  isLoading: boolean;
  lastUpdated: Date | null;
};

const CurrencyContext = React.createContext<CurrencyContextType | undefined>(undefined);

// Exchange rates relative to USD (as of approximate rates)
const currencySymbols: Record<Currency, string> = {
  USD: "$",
  AUD: "A$",
  CAD: "C$",
  EUR: "€",
  GBP: "£",
  MUR: "Rs",
};
const fallbackRates: Record<Currency, number> = {
  MUR: 1,        // Base currency
  USD: 0.0215,   // 1 MUR = ~0.0215 USD
  AUD: 0.0327,   // 1 MUR = ~0.0327 AUD
  CAD: 0.0292,   // 1 MUR = ~0.0292 CAD
  EUR: 0.0198,   // 1 MUR = ~0.0198 EUR
  GBP: 0.0170,   // 1 MUR = ~0.0170 GBP
};

export function CurrencyProvider({ children }: { children: React.ReactNode }) {
  const [currency, setCurrencyState] = React.useState<Currency>("MUR");
  const [exchangeRates, setExchangeRates] = React.useState<Record<Currency, number>>(fallbackRates);
  const [isLoading, setIsLoading] = React.useState(false);
  const [lastUpdated, setLastUpdated] = React.useState<Date | null>(null);

  // Fetch real-time exchange rates from MUR base
  const fetchExchangeRates = React.useCallback(async () => {
    setIsLoading(true);
    try {
      // Using free currency API with MUR as base
      const response = await fetch('https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies/mur.json');
      const data = await response.json();

      if (data && data.mur) {
        const newRates: Record<Currency, number> = {
          MUR: 1, // Base currency
          USD: data.mur.usd || fallbackRates.USD,
          AUD: data.mur.aud || fallbackRates.AUD,
          CAD: data.mur.cad || fallbackRates.CAD,
          EUR: data.mur.eur || fallbackRates.EUR,
          GBP: data.mur.gbp || fallbackRates.GBP,
        };

        setExchangeRates(newRates);
        setLastUpdated(new Date());

        // Cache rates in localStorage with timestamp
        localStorage.setItem('exchangeRates', JSON.stringify({
          rates: newRates,
          timestamp: Date.now()
        }));
      }
    } catch (error) {
      console.warn('Failed to fetch exchange rates, using fallback:', error);
      setExchangeRates(fallbackRates);
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Load currency and cached rates on mount
  React.useEffect(() => {
    const savedCurrency = localStorage.getItem("currency") as Currency;
    if (savedCurrency && fallbackRates[savedCurrency]) {
      setCurrencyState(savedCurrency);
    }

    // Load cached exchange rates
    const cachedData = localStorage.getItem('exchangeRates');
    if (cachedData) {
      try {
        const { rates, timestamp } = JSON.parse(cachedData);
        const isStale = Date.now() - timestamp > 3600000; // 1 hour

        if (!isStale && rates) {
          setExchangeRates(rates);
          setLastUpdated(new Date(timestamp));
          return; // Use cached data if fresh
        }
      } catch (error) {
        console.warn('Failed to parse cached exchange rates:', error);
      }
    }

    // Fetch fresh rates
    fetchExchangeRates();
  }, [fetchExchangeRates]);

  // Refresh rates every hour
  React.useEffect(() => {
    const interval = setInterval(fetchExchangeRates, 3600000); // 1 hour
    return () => clearInterval(interval);
  }, [fetchExchangeRates]);

  const setCurrency = React.useCallback((newCurrency: Currency) => {
    setCurrencyState(newCurrency);
    localStorage.setItem("currency", newCurrency);
  }, []);

  const convertPrice = React.useCallback(
    (priceMUR: number): string => {
      const convertedPrice = priceMUR * exchangeRates[currency];
      return convertedPrice.toFixed(2);
    },
    [currency, exchangeRates]
  );

  const formatPrice = React.useCallback(
    (price: number, targetCurrency?: Currency): string => {
      const curr = targetCurrency || currency;
      const symbol = currencySymbols[curr];
      const convertedPrice = price * exchangeRates[curr];
      return `${symbol}${convertedPrice.toFixed(2)}`;
    },
    [currency, exchangeRates]
  );

  const currencySymbol = currencySymbols[currency];

  return (
    <CurrencyContext.Provider
      value={{
        currency,
        setCurrency,
        convertPrice,
        formatPrice,
        currencySymbol,
        isLoading,
        lastUpdated
      }}
    >
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