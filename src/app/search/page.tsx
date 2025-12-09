"use client";

import React, { Suspense } from 'react';
import SearchContent from '@/components/SearchContent';
import { Loader2 } from 'lucide-react';



// Main search page component with Suspense boundary
export default function SearchPage() {
    return (
        <Suspense fallback={
            <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                <div className="flex items-center gap-2">
                    <Loader2 className="h-6 w-6 animate-spin" />
                    <span>Loading search...</span>
                </div>
            </div>
        }>
            <SearchContent />
        </Suspense>
    );
}