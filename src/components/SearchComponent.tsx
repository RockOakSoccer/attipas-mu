"use client";

import React, { useState, useRef, useEffect } from 'react';
import { Search, X, Loader2 } from 'lucide-react';
import { useSearch } from '@/contexts/search-context';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import Link from 'next/link';
import Image from 'next/image';
import { cn } from '@/lib/utils';

interface SearchComponentProps {
    className?: string;
    placeholder?: string;
    showResults?: boolean;
    onResultClick?: () => void;
}

export default function SearchComponent({
    className,
    placeholder = "Search products and models...",
    showResults = true,
    onResultClick
}: SearchComponentProps) {
    const {
        query,
        setQuery,
        results,
        isLoading,
        search,
        clearSearch,
        suggestions,
        showSuggestions,
        setShowSuggestions
    } = useSearch();

    const [isFocused, setIsFocused] = useState(false);
    const searchRef = useRef<HTMLDivElement>(null);
    const inputRef = useRef<HTMLInputElement>(null);

    // Handle search input changes
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setQuery(value);

        if (value.trim()) {
            search(value);
            setShowSuggestions(true);
        } else {
            clearSearch();
        }
    };

    // Handle suggestion click
    const handleSuggestionClick = (suggestion: string) => {
        setQuery(suggestion);
        search(suggestion);
        setShowSuggestions(false);
        inputRef.current?.blur();
    };

    // Handle result click
    const handleResultClick = () => {
        setShowSuggestions(false);
        setIsFocused(false);
        onResultClick?.();
    };

    // Handle clear search
    const handleClearSearch = () => {
        clearSearch();
        inputRef.current?.focus();
    };

    // Handle click outside to close suggestions
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
                setShowSuggestions(false);
                setIsFocused(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, [setShowSuggestions]);

    // Handle keyboard navigation
    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === 'Escape') {
            setShowSuggestions(false);
            inputRef.current?.blur();
        } else if (e.key === 'Enter' && query.trim()) {
            search(query);
            setShowSuggestions(false);
        }
    };

    const shouldShowDropdown = isFocused && (showSuggestions || results.length > 0) && showResults;

    return (
        <div ref={searchRef} className={cn("relative w-full max-w-md", className)}>
            {/* Search Input */}
            <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                    ref={inputRef}
                    type="text"
                    placeholder={placeholder}
                    value={query}
                    onChange={handleInputChange}
                    onFocus={() => {
                        setIsFocused(true);
                        if (query.trim()) {
                            setShowSuggestions(true);
                        }
                    }}
                    onKeyDown={handleKeyDown}
                    className="pl-10 pr-10 h-10 border-gray-300 focus:border-primary focus:ring-primary"
                />

                {/* Clear button */}
                {query && (
                    <Button
                        variant="ghost"
                        size="sm"
                        onClick={handleClearSearch}
                        className="absolute right-1 top-1/2 transform -translate-y-1/2 h-8 w-8 p-0 hover:bg-gray-100"
                    >
                        <X className="h-4 w-4" />
                    </Button>
                )}

                {/* Loading indicator */}
                {isLoading && (
                    <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                        <Loader2 className="h-4 w-4 animate-spin text-muted-foreground" />
                    </div>
                )}
            </div>

            {/* Search Results Dropdown */}
            {shouldShowDropdown && (
                <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-200 rounded-md shadow-lg z-50 max-h-96 overflow-y-auto">
                    {/* Suggestions */}
                    {showSuggestions && suggestions.length > 0 && (
                        <div className="p-2 border-b border-gray-100">
                            <div className="text-xs font-medium text-muted-foreground mb-2 px-2">Suggestions</div>
                            {suggestions.map((suggestion, index) => (
                                <button
                                    key={index}
                                    onClick={() => handleSuggestionClick(suggestion)}
                                    className="w-full text-left px-3 py-2 text-sm hover:bg-gray-50 rounded flex items-center gap-2"
                                >
                                    <Search className="h-3 w-3 text-muted-foreground" />
                                    {suggestion}
                                </button>
                            ))}
                        </div>
                    )}

                    {/* Search Results */}
                    {results.length > 0 && (
                        <div className="p-2">
                            <div className="text-xs font-medium text-muted-foreground mb-2 px-2">
                                Results ({results.length})
                            </div>
                            {results.slice(0, 8).map((result) => (
                                <Link
                                    key={result.id}
                                    href={result.url}
                                    onClick={handleResultClick}
                                    className="block p-3 hover:bg-gray-50 rounded-md transition-colors"
                                >
                                    <div className="flex items-center gap-3">
                                        <div className="relative w-12 h-12 flex-shrink-0">
                                            <Image
                                                src={result.image}
                                                alt={result.title}
                                                fill
                                                className="object-cover rounded"
                                                sizes="48px"
                                            />
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <div className="font-medium text-sm text-gray-900 truncate">
                                                {result.title}
                                            </div>
                                            {result.description && (
                                                <div className="text-xs text-muted-foreground truncate mt-1">
                                                    {result.description}
                                                </div>
                                            )}
                                            <div className="flex items-center gap-2 mt-1">
                                                <span className={cn(
                                                    "text-xs px-2 py-0.5 rounded-full",
                                                    result.type === 'product'
                                                        ? "bg-blue-100 text-blue-700"
                                                        : "bg-green-100 text-green-700"
                                                )}>
                                                    {result.type}
                                                </span>
                                                {result.price && (
                                                    <span className="text-sm font-medium text-gray-900">
                                                        {result.price}
                                                    </span>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                </Link>
                            ))}

                            {results.length > 8 && (
                                <Link
                                    href={`/search?q=${encodeURIComponent(query)}`}
                                    onClick={handleResultClick}
                                    className="block p-3 text-center text-sm text-primary hover:bg-gray-50 rounded-md font-medium"
                                >
                                    View all {results.length} results
                                </Link>
                            )}
                        </div>
                    )}

                    {/* No Results */}
                    {!isLoading && query.trim() && results.length === 0 && suggestions.length === 0 && (
                        <div className="p-4 text-center text-sm text-muted-foreground">
                            No results found for &quot;{query}&quot;
                        </div>
                    )}
                </div>
            )}
        </div>
    );
}
