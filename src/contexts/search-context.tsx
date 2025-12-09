"use client";

import React, { createContext, useContext, useState, useCallback, useEffect } from 'react';
import { getAllProducts, ShopifyProduct } from '@/lib/shopify';
import { MODELS_DATA, ModelData } from '@/lib/models.utils';

// Search result types
export interface SearchResultItem {
    id: string;
    type: 'product' | 'model';
    title: string;
    description?: string;
    image: string;
    url: string;
    price?: string;
    tags?: string[];
    colors?: string[];
}

export interface SearchFilters {
    type: 'all' | 'products' | 'models';
    priceRange?: {
        min: number;
        max: number;
    };
    colors?: string[];
    sortBy: 'relevance' | 'price-low' | 'price-high' | 'name';
}

interface SearchContextType {
    // Search state
    query: string;
    setQuery: (query: string) => void;
    results: SearchResultItem[];
    isLoading: boolean;
    filters: SearchFilters;
    setFilters: (filters: SearchFilters) => void;

    // Search functions
    search: (searchQuery: string) => void;
    clearSearch: () => void;

    // Suggestions
    suggestions: string[];
    showSuggestions: boolean;
    setShowSuggestions: (show: boolean) => void;
}

const SearchContext = createContext<SearchContextType | undefined>(undefined);

export function SearchProvider({ children }: { children: React.ReactNode }) {
    const [query, setQuery] = useState('');
    const [results, setResults] = useState<SearchResultItem[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [suggestions, setSuggestions] = useState<string[]>([]);
    const [showSuggestions, setShowSuggestions] = useState(false);
    const [filters, setFilters] = useState<SearchFilters>({
        type: 'all',
        sortBy: 'relevance'
    });

    // Cache for products to avoid repeated API calls
    const [productsCache, setProductsCache] = useState<ShopifyProduct[]>([]);
    const [cacheLoaded, setCacheLoaded] = useState(false);

    // Load products cache on mount
    useEffect(() => {
        const loadProducts = async () => {
            try {
                const products = await getAllProducts(100);
                setProductsCache(products);
                setCacheLoaded(true);
            } catch (error) {
                console.error('Failed to load products for search:', error);
                setCacheLoaded(true);
            }
        };

        if (!cacheLoaded) {
            loadProducts();
        }
    }, [cacheLoaded]);

    // Transform Shopify product to search result
    const transformProductToSearchResult = (product: ShopifyProduct): SearchResultItem => {
        const image = product.images.edges[0]?.node.url || '/images/placeholder.jpg';
        const price = product.priceRange.minVariantPrice.amount;

        return {
            id: product.id,
            type: 'product',
            title: product.title,
            description: product.description,
            image,
            url: `/products/${product.handle}`,
            price: `$${parseFloat(price).toFixed(2)}`,
            tags: product.tags,
            colors: product.variants.edges
                .map(v => v.node.selectedOptions.find(opt => opt.name.toLowerCase() === 'color')?.value)
                .filter(Boolean) as string[]
        };
    };

    // Transform model to search result
    const transformModelToSearchResult = (model: ModelData): SearchResultItem => {
        return {
            id: model.slug,
            type: 'model',
            title: model.name,
            description: `Upper: ${model.specifications.upper}`,
            image: model.image,
            url: `/models/${model.slug}`,
            colors: model.specifications.color.map(c => c.name)
        };
    };

    // Calculate match score for search relevance
    const calculateMatchScore = (query: string, searchableFields: Record<string, string | string[]>): number => {
        let score = 0;
        const queryWords = query.split(' ').filter(word => word.length > 0);

        Object.entries(searchableFields).forEach(([field, value]) => {
            if (!value) return;

            const fieldValue = Array.isArray(value) ? value.join(' ') : String(value);
            const normalizedValue = fieldValue.toLowerCase();

            queryWords.forEach(word => {
                if (normalizedValue.includes(word)) {
                    // Exact match in title gets highest score
                    if (field === 'title' || field === 'name') {
                        score += normalizedValue === query ? 100 : 50;
                    }
                    // Partial matches get lower scores
                    else {
                        score += 10;
                    }
                }
            });
        });

        return score;
    };

    // Apply search filters
    const applyFilters = (results: SearchResultItem[], currentFilters: SearchFilters): SearchResultItem[] => {
        let filtered = [...results];

        // Filter by price range
        if (currentFilters.priceRange) {
            filtered = filtered.filter(item => {
                if (!item.price) return true;
                const price = parseFloat(item.price.replace('$', ''));
                return price >= currentFilters.priceRange!.min && price <= currentFilters.priceRange!.max;
            });
        }

        // Filter by colors
        if (currentFilters.colors && currentFilters.colors.length > 0) {
            filtered = filtered.filter(item => {
                if (!item.colors) return false;
                return currentFilters.colors!.some(color =>
                    item.colors!.some(itemColor =>
                        itemColor.toLowerCase().includes(color.toLowerCase())
                    )
                );
            });
        }

        return filtered;
    };

    // Sort search results
    const sortResults = (results: SearchResultItem[], sortBy: string): SearchResultItem[] => {
        const sorted = [...results];

        switch (sortBy) {
            case 'price-low':
                return sorted.sort((a, b) => {
                    const priceA = a.price ? parseFloat(a.price.replace('$', '')) : 0;
                    const priceB = b.price ? parseFloat(b.price.replace('$', '')) : 0;
                    return priceA - priceB;
                });
            case 'price-high':
                return sorted.sort((a, b) => {
                    const priceA = a.price ? parseFloat(a.price.replace('$', '')) : 0;
                    const priceB = b.price ? parseFloat(b.price.replace('$', '')) : 0;
                    return priceB - priceA;
                });
            case 'name':
                return sorted.sort((a, b) => a.title.localeCompare(b.title));
            case 'relevance':
            default:
                return sorted.sort((a, b) => {
                    const scoreA = parseInt(a.id.split('-').pop() || '0');
                    const scoreB = parseInt(b.id.split('-').pop() || '0');
                    return scoreB - scoreA;
                });
        }
    };

    // Search function
    const search = useCallback(async (searchQuery: string) => {
        if (!searchQuery.trim()) {
            setResults([]);
            return;
        }

        setIsLoading(true);
        const normalizedQuery = searchQuery.toLowerCase().trim();
        const searchResults: SearchResultItem[] = [];

        try {
            // Search in models
            if (filters.type === 'all' || filters.type === 'models') {
                Object.values(MODELS_DATA).forEach(model => {
                    const matchScore = calculateMatchScore(normalizedQuery, {
                        name: model.name,
                        colors: model.specifications.color.map(c => c.name),
                        upper: model.specifications.upper,
                        sole: model.specifications.sole
                    });

                    if (matchScore > 0) {
                        const result = transformModelToSearchResult(model);
                        result.id = `${result.id}-${matchScore}`; // Add score for sorting
                        searchResults.push(result);
                    }
                });
            }

            // Search in products
            if (filters.type === 'all' || filters.type === 'products') {
                productsCache.forEach(product => {
                    const matchScore = calculateMatchScore(normalizedQuery, {
                        title: product.title,
                        description: product.description,
                        tags: product.tags,
                        productType: product.productType,
                        vendor: product.vendor
                    });

                    if (matchScore > 0) {
                        const result = transformProductToSearchResult(product);
                        result.id = `${result.id}-${matchScore}`; // Add score for sorting
                        searchResults.push(result);
                    }
                });
            }

            // Apply filters and sorting
            let filteredResults = applyFilters(searchResults, filters);
            filteredResults = sortResults(filteredResults, filters.sortBy);

            setResults(filteredResults);
        } catch (error) {
            console.error('Search error:', error);
            setResults([]);
        } finally {
            setIsLoading(false);
        }
    }, [filters, productsCache]);

    // Generate search suggestions
    useEffect(() => {
        if (query.length > 0) {
            const allSuggestions = [
                ...Object.values(MODELS_DATA).map(m => m.name),
                ...productsCache.map(p => p.title),
                ...productsCache.flatMap(p => p.tags),
                'baby shoes', 'toddler shoes', 'sock shoes', 'bamboo yarn', 'summer shoes'
            ];

            const filtered = allSuggestions
                .filter(suggestion =>
                    suggestion.toLowerCase().includes(query.toLowerCase()) &&
                    suggestion.toLowerCase() !== query.toLowerCase()
                )
                .slice(0, 5);

            setSuggestions(filtered);
        } else {
            setSuggestions([]);
        }
    }, [query, productsCache]);

    // Clear search
    const clearSearch = useCallback(() => {
        setQuery('');
        setResults([]);
        setSuggestions([]);
        setShowSuggestions(false);
    }, []);

    const value: SearchContextType = {
        query,
        setQuery,
        results,
        isLoading,
        filters,
        setFilters,
        search,
        clearSearch,
        suggestions,
        showSuggestions,
        setShowSuggestions
    };

    return (
        <SearchContext.Provider value={value}>
            {children}
        </SearchContext.Provider>
    );
}

export function useSearch() {
    const context = useContext(SearchContext);
    if (context === undefined) {
        throw new Error('useSearch must be used within a SearchProvider');
    }
    return context;
}
