"use client";

import { Button } from "@/components/ui/button";
import React from "react";
import Link from "next/link";

const RotatingSaleBadge = () => {
    return (
        <div className="relative w-30 h-30 sm:w-36 sm:h-36 md:w-40 md:h-40">
            {/* Outer rotating ring with text */}
            <div className="absolute inset-0 animate-spin" style={{ animationDuration: '10s', animationTimingFunction: 'linear' }}>
                <svg viewBox="0 0 160 160" className="w-full h-full">
                    <defs>
                        <path
                            id="circlePath"
                            d="M 80, 80 m -70, 0 a 70,70 0 1,1 140,0 a 70,70 0 1,1 -140,0"
                        />
                    </defs>
                    <circle
                        cx="80"
                        cy="80"
                        r="70"
                        fill="none"
                        stroke="#1a1a1a"
                        strokeWidth="20"
                    />
                    <text className="text-[11px] sm:text-[12px] font-medium fill-white uppercase tracking-wider">
                        <textPath href="#circlePath" startOffset="0%">
                            {/* • Summer Sale • Summer Sale • Summer Sale • Summer Sale */}
                            • New Collection • New Collection • New Collection •
                        </textPath>
                    </text>
                </svg>
            </div>

            {/* Inner static circle with sale percentage */}
            <div className="absolute inset-0 flex items-center justify-center">
                <Link href="/collections/all-products" className="w-20 h-20 sm:w-24 sm:h-24 md:w-28 md:h-28 rounded-full bg-gradient-to-br from-[#d68972] to-[#d68972] flex flex-col items-center justify-center shadow-lg hover:cursor-pointer decoration-none">
                    <span className="text-2xl sm:text-2xl md:text-3xl font-bold text-white leading-none">Shop</span>
                    <span className="text-xs sm:text-sm font-semibold text-white mt-1 tracking-wide">Now</span>
                </Link>
            </div>
        </div>
    );
};

export default RotatingSaleBadge;