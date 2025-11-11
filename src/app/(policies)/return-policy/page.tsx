"use client";

import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import Link from "next/link";
import { Package, AlertCircle, MapPin, Clock, FileText, Mail } from 'lucide-react';

const ReturnPolicyHero = () => {
    return (
        <section className="relative overflow-hidden py-10">
            <div className="container relative z-10">
                {/* Breadcrumb */}
                <div className="flex items-center gap-2 text-sm text-[#666666] mb-6">
                    <Link href="/" className="hover:text-[#2B2B2B] transition-colors">Home</Link>
                    <span>/</span>
                    <span className="text-[#2B2B2B]">Return Policy</span>
                </div>

                {/* Title */}
                <div className="flex flex-col items-center text-center mb-4">
                    <h1 className="text-center text-2xl font-bold uppercase text-dark-charcoal-alt mb-4">
                        Return Policy
                    </h1>
                    <p className="text-xs font-medium uppercase tracking-widest mb-5">
                        Please read our return policy carefully before making a return request
                    </p>
                </div>
            </div>

            {/* Background Text */}
            <div
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[rgba(0,0,0,0.03)] font-black text-[clamp(80px,20vw,200px)] leading-none select-none pointer-events-none font-body whitespace-nowrap"
                aria-hidden="true"
            >
                RETURNS
            </div>
        </section>
    );
};

const ReturnPolicyContent = () => {
    const policyHighlights = [
        {
            icon: AlertCircle,
            title: "Store Credit Only",
            description: "We strictly do not refund, we provide store credit only for unworn items in original packaging."
        },
        {
            icon: Package,
            title: "Original Packaging Required",
            description: "Items must be unworn and in original packaging to be eligible for return."
        },
        {
            icon: FileText,
            title: "No Final Sale Returns",
            description: "Items marked FINAL SALE are not eligible for return. Return postage is your responsibility."
        },
        {
            icon: Clock,
            title: "Processing Time",
            description: "Allow up to 2 weeks after we receive your return for processing."
        }
    ];

    return (
        <section className="py-20 md:py-28 bg-white">
            <div className="container">
                <div className="max-w-4xl mx-auto">
                    {/* Policy Highlights */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16">
                        {policyHighlights.map((item, index) => (
                            <div
                                key={index}
                                className="bg-[#f8f8f8] p-6 rounded-2xl border border-[#e0e0e0]"
                            >
                                <div className="flex items-start gap-4">
                                    <div className="flex-shrink-0 w-12 h-12 bg-[#EDE9E3] rounded-full flex items-center justify-center">
                                        <item.icon className="w-6 h-6 text-[#2B2B2B]" />
                                    </div>
                                    <div className="flex-1">
                                        <h3 className="font-semibold text-lg text-[#2B2B2B] mb-2">{item.title}</h3>
                                        <p className="text-sm text-[#666666] leading-relaxed">{item.description}</p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Detailed Policy Content */}
                    <div className="prose prose-lg max-w-none">
                        <div className="bg-white p-8 rounded-2xl shadow-sm border border-[#e0e0e0]">
                            <h2 className="text-2xl font-bold text-[#2B2B2B] mb-6">Return Process</h2>

                            <div className="space-y-6 text-[#2B2B2B] leading-relaxed">
                                <p>
                                    Please complete the below form for all returns. Please note we strictly do not
                                    refund, we provide a store credit only for unworn items in original packaging.
                                </p>

                                <div className="bg-red-50 border border-red-200 p-4 rounded-lg">
                                    <p className="text-red-800 font-medium">
                                        <strong>Important:</strong> Items marked FINAL SALE are not eligible for return.
                                        If you return a FINAL SALE item you are responsible for the item&apos;s return postage
                                        to your address or collection from our Alexandria warehouse.
                                    </p>
                                </div>

                                <p>
                                    For further information please visit our <Link href="/terms-and-conditions" className="text-[#d9a779] hover:underline">terms and conditions</Link>.
                                </p>

                                <h3 className="text-xl font-semibold text-[#2B2B2B] mt-8 mb-4">After Submitting Your Return Request</h3>

                                <p>
                                    Once submitted, you will receive an email confirming your returns request.
                                    Please print out this email and include with returned item(s) and your original
                                    packing slip (where possible).
                                </p>
                            </div>
                        </div>

                        {/* Return Address Section */}
                        <div className="bg-[#f8f8f8] p-8 rounded-2xl border border-[#e0e0e0] mt-8">
                            <div className="flex items-start gap-4 mb-6">
                                <div className="flex-shrink-0 w-12 h-12 bg-[#EDE9E3] rounded-full flex items-center justify-center">
                                    <MapPin className="w-6 h-6 text-[#2B2B2B]" />
                                </div>
                                <div>
                                    <h3 className="text-xl font-semibold text-[#2B2B2B] mb-2">Return Address</h3>
                                    <p className="text-[#666666] mb-4">Please post all returns to:</p>
                                </div>
                            </div>

                            <div className="bg-white p-6 rounded-lg border border-[#e0e0e0] font-mono text-[#2B2B2B]">
                                <div className="space-y-1">
                                    <p className="font-semibold">Little Steps Ltd</p>
                                    <p>10 Raoul Lejeune Street, 32000</p>
                                    <p>Beau Bassin-Rose Hill</p>
                                    <p>Mauritius</p>
                                </div>
                            </div>
                        </div>

                        {/* Important Notes */}
                        <div className="bg-amber-50 border border-amber-200 p-8 rounded-2xl mt-8">
                            <h3 className="text-xl font-semibold text-[#2B2B2B] mb-4 flex items-center gap-2">
                                <AlertCircle className="w-5 h-5 text-amber-600" />
                                Important Return Guidelines
                            </h3>

                            <div className="space-y-4 text-[#2B2B2B]">
                                <div className="flex items-start gap-3">
                                    <div className="w-2 h-2 bg-amber-600 rounded-full mt-2 flex-shrink-0"></div>
                                    <p>
                                        <strong>Use registered post</strong> for returns as we take no responsibility
                                        if returns are lost in transit.
                                    </p>
                                </div>

                                <div className="flex items-start gap-3">
                                    <div className="w-2 h-2 bg-amber-600 rounded-full mt-2 flex-shrink-0"></div>
                                    <p>
                                        <strong>Attach your return postage receipt</strong> to the outer carton.
                                    </p>
                                </div>

                                <div className="flex items-start gap-3">
                                    <div className="w-2 h-2 bg-amber-600 rounded-full mt-2 flex-shrink-0"></div>
                                    <p>
                                        <strong>Processing time:</strong> Allow up to 2 weeks after receiving your
                                        return for our team to process your return.
                                    </p>
                                </div>

                                <div className="flex items-start gap-3">
                                    <div className="w-2 h-2 bg-amber-600 rounded-full mt-2 flex-shrink-0"></div>
                                    <p>
                                        <strong>New size needed?</strong> Someone will be in touch once your return
                                        has been processed. If you need a new size please place a new order via our website.
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Contact Section */}
                        <div className="bg-[#2B2B2B] text-white p-8 rounded-2xl mt-8">
                            <div className="flex items-center gap-3 mb-4">
                                <Mail className="w-6 h-6" />
                                <h3 className="text-xl font-semibold">Need Help?</h3>
                            </div>
                            <p className="mb-4">
                                If you have any questions about our return policy or need assistance with your return,
                                please don&apos;t hesitate to contact us.
                            </p>
                            <Link
                                href="/contact"
                                className="inline-flex items-center gap-2 bg-[#d9a779] hover:bg-[#c8966a] text-white px-6 py-3 rounded-lg font-medium transition-colors"
                            >
                                Contact Support
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default function ReturnPolicyPage() {
    return (
        <div className="min-h-screen bg-white">
            <Nav />

            <main className="w-full">
                <ReturnPolicyHero />
                <ReturnPolicyContent />
            </main>

            <Footer />
        </div>
    );
}