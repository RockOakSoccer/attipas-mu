"use client";

import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import Link from "next/link";
import { CreditCard, Package, Truck, RefreshCw, AlertTriangle, Shield, Scale, Mail } from 'lucide-react';

const TermsHero = () => {
    return (
        <section className="relative overflow-hidden py-10">
            <div className="container relative z-10">
                {/* Breadcrumb */}
                <div className="flex items-center gap-2 text-sm text-[#666666] mb-6">
                    <Link href="/" className="hover:text-[#2B2B2B] transition-colors">Home</Link>
                    <span>/</span>
                    <span className="text-[#2B2B2B]">Terms & Conditions</span>
                </div>

                {/* Title */}
                <div className="flex flex-col items-center text-center mb-4">
                    <h1 className="text-center text-2xl font-bold uppercase text-dark-charcoal-alt mb-4">
                        Terms & Conditions
                    </h1>
                    <p className="text-xs font-medium uppercase tracking-widest mb-5">
                        Please read our terms and conditions carefully before making a purchase
                    </p>
                </div>
            </div>

            {/* Background Text */}
            <div
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[rgba(0,0,0,0.03)] font-black text-[clamp(80px,20vw,200px)] leading-none select-none pointer-events-none font-body whitespace-nowrap"
                aria-hidden="true"
            >
                TERMS
            </div>
        </section>
    );
};

const TermsContent = () => {
    const termsHighlights = [
        {
            icon: CreditCard,
            title: "Payment Methods",
            description: "We accept Juice, Mokas, Visa, and Mastercard. All pricing is in MUR and includes VAT."
        },
        {
            icon: Package,
            title: "Order Processing",
            description: "Orders cannot be changed or cancelled once confirmation is sent. Processing begins immediately."
        },
        {
            icon: Truck,
            title: "Free Shipping",
            description: "Standard postage is FREE for orders over MUR 3000, otherwise MUR 100 within Mauritius."
        },
        {
            icon: RefreshCw,
            title: "Store Credit Only",
            description: "We provide store credit only for returns. FINAL SALE items are not returnable."
        }
    ];

    return (
        <section className="py-20 md:py-28 bg-white">
            <div className="container">
                <div className="max-w-4xl mx-auto">
                    {/* Agreement Notice */}
                    <div className="bg-[#2B2B2B] text-white p-8 rounded-2xl mb-16">
                        <h2 className="text-2xl text-white font-bold mb-4">Agreement to Terms</h2>
                        <p className="text-lg leading-relaxed">
                            By purchasing from our website <strong>(www.attipas.mu)</strong>, you are agreeing to the following terms and conditions.
                        </p>
                    </div>

                    {/* Terms Highlights */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16">
                        {termsHighlights.map((item, index) => (
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

                    {/* Detailed Terms Sections */}
                    <div className="space-y-8">
                        {/* Payments */}
                        <div className="bg-white p-8 rounded-2xl shadow-sm border border-[#e0e0e0]">
                            <div className="flex items-center gap-3 mb-6">
                                <CreditCard className="w-6 h-6 text-[#d9a779]" />
                                <h2 className="text-2xl font-bold text-[#2B2B2B]">Payments</h2>
                            </div>
                            <div className="space-y-4 text-[#2B2B2B] leading-relaxed">
                                <p>
                                    Attipas Mauritius accept payments via <strong>Juice, Mokas, Visa or Mastercard</strong>.
                                    Payments must be received in full and cleared before your order will be dispatched.
                                </p>
                                <div className="bg-blue-50 border border-blue-200 p-4 rounded-lg">
                                    <p className="text-blue-800 font-medium">
                                        <strong>Note:</strong> All pricing is in Mauritian rupee (MUR) and includes VAT.
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Processing */}
                        <div className="bg-white p-8 rounded-2xl shadow-sm border border-[#e0e0e0]">
                            <div className="flex items-center gap-3 mb-6">
                                <Package className="w-6 h-6 text-[#d9a779]" />
                                <h2 className="text-2xl font-bold text-[#2B2B2B]">Processing</h2>
                            </div>
                            <div className="space-y-4 text-[#2B2B2B] leading-relaxed">
                                <p>
                                    Order processing begins immediately after your payment has cleared and an order
                                    confirmation email has been generated.
                                </p>
                                <div className="bg-red-50 border border-red-200 p-4 rounded-lg">
                                    <p className="text-red-800 font-medium">
                                        <strong>Important:</strong> Orders cannot be changed, altered or cancelled once
                                        order confirmation has been confirmed. Please do not email us to change or cancel
                                        your order as this is not possible.
                                    </p>
                                </div>
                                <p>
                                    To return your goods, please refer to our <Link href="/return-policy" className="text-[#d9a779] hover:underline">Returns Policy</Link>.
                                </p>
                            </div>
                        </div>

                        {/* Shipping */}
                        <div className="bg-white p-8 rounded-2xl shadow-sm border border-[#e0e0e0]">
                            <div className="flex items-center gap-3 mb-6">
                                <Truck className="w-6 h-6 text-[#d9a779]" />
                                <h2 className="text-2xl font-bold text-[#2B2B2B]">Shipping</h2>
                            </div>
                            <div className="space-y-4 text-[#2B2B2B] leading-relaxed">
                                <p>
                                    We aim to ship your order on the next business day via registered mail or courier
                                    however this is not guaranteed.
                                </p>
                                <div className="bg-green-50 border border-green-200 p-4 rounded-lg">
                                    <p className="text-green-800 font-medium">
                                        <strong>Free Shipping:</strong> Standard postage is FREE for orders over MUR 3000,
                                        otherwise MUR 100 per order within Mauritius and includes tracking.
                                    </p>
                                </div>
                                <div className="space-y-3">
                                    <p>
                                        <strong>Important shipping notes:</strong>
                                    </p>
                                    <ul className="list-disc list-inside space-y-2 ml-4">
                                        <li>Please check your shipping address on the checkout page prior to payment as this address cannot be altered once processing has commenced.</li>
                                        <li>You will receive an email once your order has been despatched, detailing your consignment number and carrier.</li>
                                        <li>Please ensure you track your order for updates.</li>
                                        <li>If your order is returned to sender due to incorrect address, failure to collect or other reasons, a re-delivery fee equivalent to the original shipping cost is payable prior to us re-sending your order.</li>
                                    </ul>
                                </div>
                            </div>
                        </div>

                        {/* Returns/Exchanges */}
                        <div className="bg-white p-8 rounded-2xl shadow-sm border border-[#e0e0e0]">
                            <div className="flex items-center gap-3 mb-6">
                                <RefreshCw className="w-6 h-6 text-[#d9a779]" />
                                <h2 className="text-2xl font-bold text-[#2B2B2B]">Returns/Exchanges</h2>
                            </div>
                            <div className="space-y-4 text-[#2B2B2B] leading-relaxed">
                                <p>
                                    Please choose carefully as we do not refund, we provide a store credit only for items
                                    except for FINAL SALE items which are strictly not returnable.
                                </p>
                                <div className="bg-amber-50 border border-amber-200 p-4 rounded-lg">
                                    <h4 className="font-semibold text-amber-800 mb-2">Return Process:</h4>
                                    <ul className="list-disc list-inside space-y-1 text-amber-800">
                                        <li>Complete the Attipas Returns Form</li>
                                        <li>Print out the email you receive and include with your return</li>
                                        <li>Include your original invoice and packing slip (where possible)</li>
                                        <li>Post all returns to the address specified on the Returns Form</li>
                                    </ul>
                                </div>
                                <div className="space-y-3">
                                    <p><strong>Important return conditions:</strong></p>
                                    <ul className="list-disc list-inside space-y-2 ml-4">
                                        <li>The cost of return shipping is to be paid for by the customer</li>
                                        <li>Returns must be packaged securely in a box and posted using a traceable method (such as Registered Post)</li>
                                        <li>We take no responsibility for returns lost in transit</li>
                                        <li>Returns are only processed once goods have been received, inspected and confirmed as resellable</li>
                                        <li>Allow up to 10 business days for your return to be processed once your item(s) are received</li>
                                        <li>Store credits issued for returned items are valid for a period of 3 years</li>
                                    </ul>
                                </div>
                            </div>
                        </div>

                        {/* Faulty Items */}
                        <div className="bg-white p-8 rounded-2xl shadow-sm border border-[#e0e0e0]">
                            <div className="flex items-center gap-3 mb-6">
                                <AlertTriangle className="w-6 h-6 text-[#d9a779]" />
                                <h2 className="text-2xl font-bold text-[#2B2B2B]">Faulty Items</h2>
                            </div>
                            <div className="space-y-4 text-[#2B2B2B] leading-relaxed">
                                <p>
                                    Attipas Mauritius appreciate your purchase and aim for 100% satisfaction.
                                    Please contact Attipas Mauritius immediately should there be any issues upon receipt of your order.
                                </p>
                                <div className="bg-blue-50 border border-blue-200 p-4 rounded-lg">
                                    <p className="text-blue-800 font-medium">
                                        Attipas Mauritius can assist you with your return of a faulty item by offering you
                                        a number of solutions including <strong>replacement, credit or refund</strong>.
                                    </p>
                                </div>
                                <div className="space-y-3">
                                    <p><strong>Faulty item conditions:</strong></p>
                                    <ul className="list-disc list-inside space-y-2 ml-4">
                                        <li>Goods must be returned within a reasonable time (being 30 days from the date of purchase)</li>
                                        <li>Proof of purchase to our satisfaction must be provided</li>
                                        <li>Upon assessment the item must be considered faulty or hold a manufacturing fault</li>
                                        <li>We will not offer exchange, credit or refund where fault or damage has been caused by wearing or incorrect caring for the item</li>
                                        <li>General wear and tear, including pilling of fabric, is not grounds for a faulty replacement</li>
                                    </ul>
                                </div>
                            </div>
                        </div>

                        {/* Privacy */}
                        <div className="bg-white p-8 rounded-2xl shadow-sm border border-[#e0e0e0]">
                            <div className="flex items-center gap-3 mb-6">
                                <Shield className="w-6 h-6 text-[#d9a779]" />
                                <h2 className="text-2xl font-bold text-[#2B2B2B]">Privacy</h2>
                            </div>
                            <div className="space-y-4 text-[#2B2B2B] leading-relaxed">
                                <p>
                                    Your privacy is important to us. We will not disclose any information submitted by you
                                    to any third parties, nor will we keep any of your payment details on file.
                                </p>
                                <p>
                                    From time to time we may send communications to you via email or SMS including news,
                                    information and upcoming sales. You can unsubscribe from our emails or SMS at any time.
                                </p>
                            </div>
                        </div>

                        {/* Law */}
                        <div className="bg-white p-8 rounded-2xl shadow-sm border border-[#e0e0e0]">
                            <div className="flex items-center gap-3 mb-6">
                                <Scale className="w-6 h-6 text-[#d9a779]" />
                                <h2 className="text-2xl font-bold text-[#2B2B2B]">Law</h2>
                            </div>
                            <div className="space-y-4 text-[#2B2B2B] leading-relaxed">
                                <p>
                                    The above terms and conditions shall be governed by Mauritius and subject to the
                                    exclusive jurisdiction of the courts of Mauritius.
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Contact Section */}
                    <div className="bg-[#2B2B2B] text-white p-8 rounded-2xl mt-12">
                        <div className="flex items-center gap-3 mb-4">
                            <Mail className="w-6 h-6" />
                            <h3 className="text-xl font-semibold">Questions About Our Terms?</h3>
                        </div>
                        <p className="mb-4">
                            If you have any questions about our terms and conditions or need clarification on any policy,
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
        </section>
    );
};

export default function TermsAndConditionsPage() {
    return (
        <div className="min-h-screen bg-white">
            <Nav />

            <main className="w-full">
                <TermsHero />
                <TermsContent />
            </main>

            <Footer />
        </div>
    );
}