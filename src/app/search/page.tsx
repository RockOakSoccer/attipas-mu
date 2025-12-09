"use client";

import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { useSearch, SearchFilters } from '@/contexts/search-context';
import SearchComponent from '@/components/SearchComponent';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Filter, Grid, List, Loader2 } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { cn } from '@/lib/utils';

export default function SearchPage() {
    const searchParams = useSearchParams();
    const initialQuery = searchParams.get('q') || '';

    const {
        query,
        setQuery,
        results,
        isLoading,
        search,
        filters,
        setFilters
    } = useSearch();

    const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
    const [showFilters, setShowFilters] = useState(false);

    // Initialize search from URL params
    useEffect(() => {
        if (initialQuery && initialQuery !== query) {
            setQuery(initialQuery);
            search(initialQuery);
        }
    }, [initialQuery, query, setQuery, search]);

    // Handle filter changes
    const handleFilterChange = (newFilters: Partial<SearchFilters>) => {
        const updatedFilters = { ...filters, ...newFilters };
        setFilters(updatedFilters);

        // Re-run search with new filters
        if (query.trim()) {
            search(query);
        }
    };

    // Available colors for filtering (from your models data)
    const availableColors = [
        'gray', 'pink', 'sky', 'beige', 'navy', 'blue', 'olive', 'green',
        'purple', 'yellow', 'orange'
    ];

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Header */}
            <div className="bg-white border-b">
                <div className="container mx-auto px-4 py-6">
                    <div className="flex flex-col lg:flex-row lg:items-center gap-4">
                        <div className="flex-1">
                            <h1 className="text-2xl font-bold text-gray-900 mb-4">Search Results</h1>
                            <SearchComponent
                                className="max-w-2xl"
                                showResults={false}
                            />
                        </div>

                        {/* View Mode Toggle */}
                        <div className="flex items-center gap-2">
                            <Button
                                variant={viewMode === 'grid' ? 'default' : 'outline'}
                                size="sm"
                                onClick={() => setViewMode('grid')}
                            >
                                <Grid className="h-4 w-4" />
                            </Button>
                            <Button
                                variant={viewMode === 'list' ? 'default' : 'outline'}
                                size="sm"
                                onClick={() => setViewMode('list')}
                            >
                                <List className="h-4 w-4" />
                            </Button>
                        </div>
                    </div>
                </div>
            </div>

            <div className="container mx-auto px-4 py-6">
                <div className="flex flex-col lg:flex-row gap-6">
                    {/* Filters Sidebar */}
                    <div className="lg:w-64 flex-shrink-0">
                        <div className="bg-white rounded-lg border p-4 sticky top-4">
                            <div className="flex items-center justify-between mb-4">
                                <h3 className="font-semibold text-gray-900">Filters</h3>
                                <Button
                                    variant="ghost"
                                    size="sm"
                                    onClick={() => setShowFilters(!showFilters)}
                                    className="lg:hidden"
                                >
                                    <Filter className="h-4 w-4" />
                                </Button>
                            </div>

                            <div className={cn("space-y-4", !showFilters && "hidden lg:block")}>
                                {/* Type Filter */}
                                <div>
                                    <label className="text-sm font-medium text-gray-700 mb-2 block">
                                        Type
                                    </label>
                                    <Select
                                        value={filters.type}
                                        onValueChange={(value: 'all' | 'products' | 'models') =>
                                            handleFilterChange({ type: value })
                                        }
                                    >
                                        <SelectTrigger>
                                            <SelectValue />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="all">All</SelectItem>
                                            <SelectItem value="products">Products</SelectItem>
                                            <SelectItem value="models">Models</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>

                                {/* Sort By */}
                                <div>
                                    <label className="text-sm font-medium text-gray-700 mb-2 block">
                                        Sort By
                                    </label>
                                    <Select
                                        value={filters.sortBy}
                                        onValueChange={(value: 'relevance' | 'price-low' | 'price-high' | 'name') =>
                                            handleFilterChange({ sortBy: value })
                                        }
                                    >
                                        <SelectTrigger>
                                            <SelectValue />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="relevance">Relevance</SelectItem>
                                            <SelectItem value="name">Name A-Z</SelectItem>
                                            <SelectItem value="price-low">Price: Low to High</SelectItem>
                                            <SelectItem value="price-high">Price: High to Low</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>

                                {/* Colors Filter */}
                                <div>
                                    <label className="text-sm font-medium text-gray-700 mb-2 block">
                                        Colors
                                    </label>
                                    <div className="flex flex-wrap gap-2">
                                        {availableColors.map((color) => {
                                            const isSelected = filters.colors?.includes(color) || false;
                                            return (
                                                <Badge
                                                    key={color}
                                                    variant={isSelected ? "default" : "outline"}
                                                    className="cursor-pointer capitalize"
                                                    onClick={() => {
                                                        const currentColors = filters.colors || [];
                                                        const newColors = isSelected
                                                            ? currentColors.filter(c => c !== color)
                                                            : [...currentColors, color];
                                                        handleFilterChange({ colors: newColors });
                                                    }}
                                                >
                                                    {color}
                                                </Badge>
                                            );
                                        })}
                                    </div>
                                </div>

                                {/* Clear Filters */}
                                <Button
                                    variant="outline"
                                    size="sm"
                                    onClick={() => handleFilterChange({
                                        type: 'all',
                                        sortBy: 'relevance',
                                        colors: [],
                                        priceRange: undefined
                                    })}
                                    className="w-full"
                                >
                                    Clear Filters
                                </Button>
                            </div>
                        </div>
                    </div>

                    {/* Results */}
                    <div className="flex-1">
                        {/* Results Header */}
                        {query && (
                            <div className="mb-6">
                                <h2 className="text-lg font-semibold text-gray-900">
                                    Search results for &quot;{query}&quot;
                                </h2>
                                <p className="text-sm text-gray-600 mt-1">
                                    {isLoading ? 'Searching...' : `${results.length} results found`}
                                </p>
                            </div>
                        )}

                        {/* Loading State */}
                        {isLoading && (
                            <div className="flex items-center justify-center py-12">
                                <Loader2 className="h-8 w-8 animate-spin text-primary" />
                                <span className="ml-2 text-gray-600">Searching...</span>
                            </div>
                        )}

                        {/* Results Grid/List */}
                        {!isLoading && results.length > 0 && (
                            <div className={cn(
                                viewMode === 'grid'
                                    ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
                                    : "space-y-4"
                            )}>
                                {results.map((result) => (
                                    <Link
                                        key={result.id}
                                        href={result.url}
                                        className={cn(
                                            "bg-white rounded-lg border hover:shadow-md transition-shadow",
                                            viewMode === 'grid' ? "p-4" : "p-4 flex items-center gap-4"
                                        )}
                                    >
                                        <div className={cn(
                                            "relative",
                                            viewMode === 'grid'
                                                ? "w-full h-48 mb-4"
                                                : "w-24 h-24 flex-shrink-0"
                                        )}>
                                            <Image
                                                src={result.image}
                                                alt={result.title}
                                                fill
                                                className="object-cover rounded"
                                                sizes={viewMode === 'grid' ? "300px" : "96px"}
                                            />
                                        </div>

                                        <div className="flex-1">
                                            <div className="flex items-start justify-between mb-2">
                                                <h3 className={cn(
                                                    "font-medium text-gray-900",
                                                    viewMode === 'grid' ? "text-lg" : "text-base"
                                                )}>
                                                    {result.title}
                                                </h3>
                                                <Badge
                                                    variant={result.type === 'product' ? 'default' : 'secondary'}
                                                    className="ml-2"
                                                >
                                                    {result.type}
                                                </Badge>
                                            </div>

                                            {result.description && (
                                                <p className={cn(
                                                    "text-gray-600 mb-2",
                                                    viewMode === 'grid' ? "text-sm" : "text-sm line-clamp-2"
                                                )}>
                                                    {result.description}
                                                </p>
                                            )}

                                            <div className="flex items-center justify-between">
                                                {result.price && (
                                                    <span className="text-lg font-semibold text-primary">
                                                        {result.price}
                                                    </span>
                                                )}

                                                {result.colors && result.colors.length > 0 && (
                                                    <div className="flex gap-1">
                                                        {result.colors.slice(0, 3).map((color, index) => (
                                                            <Badge key={index} variant="outline" className="text-xs">
                                                                {color}
                                                            </Badge>
                                                        ))}
                                                        {result.colors.length > 3 && (
                                                            <Badge variant="outline" className="text-xs">
                                                                +{result.colors.length - 3}
                                                            </Badge>
                                                        )}
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    </Link>
                                ))}
                            </div>
                        )}

                        {/* No Results */}
                        {!isLoading && query && results.length === 0 && (
                            <div className="text-center py-12">
                                <div className="text-gray-400 mb-4">
                                    <svg className="mx-auto h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                                    </svg>
                                </div>
                                <h3 className="text-lg font-medium text-gray-900 mb-2">
                                    No results found
                                </h3>
                                <p className="text-gray-600 mb-4">
                                    We couldn&apos;t find anything matching &quot;{query}&quot;. Try adjusting your search or filters.
                                </p>
                                <Button
                                    onClick={() => {
                                        setQuery('');
                                        handleFilterChange({
                                            type: 'all',
                                            sortBy: 'relevance',
                                            colors: [],
                                            priceRange: undefined
                                        });
                                    }}
                                >
                                    Clear Search
                                </Button>
                            </div>
                        )}

                        {/* Empty State */}
                        {!query && (
                            <div className="text-center py-12">
                                <div className="text-gray-400 mb-4">
                                    <svg className="mx-auto h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                                    </svg>
                                </div>
                                <h3 className="text-lg font-medium text-gray-900 mb-2">
                                    Start searching
                                </h3>
                                <p className="text-gray-600">
                                    Search for products, models, or anything else you&apos;re looking for.
                                </p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
