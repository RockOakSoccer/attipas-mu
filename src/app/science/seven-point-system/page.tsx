"use client";

import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import Link from "next/link";
import Image from "next/image";
import { Microscope, Heart, Shield, Zap, Droplets, Feather, Users } from 'lucide-react';
import FAQ from "@/components/FAQ";

const SevenPointSystemHero = () => {
    return (
        <section className="relative overflow-hidden pb-8 pt-4 bg-gradient-to-br from-blue-20 to-indigo-50">
            <div className="container relative z-10">
                {/* Breadcrumb */}
                <div className="flex items-center gap-2 text-sm text-[#666666] mb-8">
                    <Link href="/" className="hover:text-[#2B2B2B] transition-colors">Home</Link>
                    <span>/</span>
                    <Link href="/science" className="hover:text-[#2B2B2B] transition-colors">Science</Link>
                    <span>/</span>
                    <span className="text-[#2B2B2B]">Seven Point System</span>
                </div>

                {/* Title */}
                <div className="flex flex-col items-center text-center mb-8">
                    <h1 className="text-4xl md:text-6xl font-bold uppercase text-[#2B2B2B] mb-6">
                        Walking Science™
                    </h1>
                    <p className="text-xl text-[#666666] max-w-3xl mx-auto leading-relaxed">
                        7 years of research and development at Seoul University resulted in
                        internationally patented toddler shoes that ergonomically support your baby&apos;s first steps.
                    </p>
                </div>
            </div>

            {/* Background Text */}
            <div
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[rgba(0,0,0,0.03)] font-black text-[clamp(100px,25vw,300px)] leading-none select-none pointer-events-none font-body whitespace-nowrap"
                aria-hidden="true"
            >
                SCIENCE
            </div>
        </section>
    );
};

const ResearchSection = () => {
    return (
        <section className="py-20 bg-white">
            <div className="container">
                <div className="max-w-4xl mx-auto">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl md:text-4xl font-bold text-[#2B2B2B] mb-6">
                            University Research & Development
                        </h2>
                        <div className="w-24 h-1 bg-[#d9a779] mx-auto mb-8"></div>
                    </div>

                    <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-8 md:p-12 rounded-2xl">
                        <div className="flex items-start gap-6 mb-8">
                            {/* <div className="flex-shrink-0 w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center">
                                <Microscope className="w-8 h-8 text-blue-600" />
                            </div> */}
                            <div>
                                <h3 className="text-2xl font-bold text-[#2B2B2B] mb-4">Scientific Foundation</h3>
                                <p className="text-lg text-[#666666] leading-relaxed mb-6">
                                    Attipas toddler shoes were released in 2011 after <strong>7 years of research and development
                                        at Seoul University</strong>. Based on kinetic and physio-dynamic tests of toddlers walking,
                                    these unique non-slip shoes ergonomically support infants&apos; first steps and thereafter.
                                </p>
                                <p className="text-lg text-[#666666] leading-relaxed">
                                    With university, industry and educational cooperation, we are proud to introduce these
                                    <strong> internationally patented toddler shoes</strong> to the market.
                                    Attipas shoes are <strong>Walking Science™</strong>.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

const SevenPointsSection = () => {
    const sevenPoints = [
        {
            icon: Droplets,
            title: "Breathable",
            description: "Breathable microporous membranes that release baby foot heat",
            color: "bg-blue-100 text-blue-600",
            bgColor: "bg-blue-50"
        },
        {
            icon: Zap,
            title: "Flexible",
            description: "Shoes are made with a flexible outsole for natural foot movement",
            color: "bg-green-100 text-green-600",
            bgColor: "bg-green-50"
        },
        {
            icon: Feather,
            title: "Light Outsole",
            description: "Shoes are made with light soles that don't interfere with balance development",
            color: "bg-purple-100 text-purple-600",
            bgColor: "bg-purple-50"
        },
        {
            icon: Shield,
            title: "Anti-Slip",
            description: "Soles are non-slip for safety and confidence during first steps",
            color: "bg-red-100 text-red-600",
            bgColor: "bg-red-50"
        },
        {
            icon: Heart,
            title: "Convenient",
            description: "Capable of being washed without damage (machine wash to 30°C)",
            color: "bg-pink-100 text-pink-600",
            bgColor: "bg-pink-50"
        },
        {
            icon: Users,
            title: "Comfortable",
            description: "Soft, light and cotton. Quick drying for easy use",
            color: "bg-orange-100 text-orange-600",
            bgColor: "bg-orange-50"
        },
        {
            icon: Microscope,
            title: "Big Toe Box",
            description: "Free toe movement improves cognitive and motor development",
            color: "bg-indigo-100 text-indigo-600",
            bgColor: "bg-indigo-50"
        }
    ];

    return (
        <section className="py-20 bg-gray-50">
            <div className="container">
                <div className="max-w-6xl mx-auto">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl md:text-4xl font-bold text-[#2B2B2B] mb-6">
                            Seven Key Benefits
                        </h2>
                        <p className="text-xl text-[#666666] max-w-3xl mx-auto">
                            Features and benefits of Attipas baby shoes based on scientific research
                        </p>
                        <div className="w-24 h-1 bg-[#d9a779] mx-auto mt-6"></div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {sevenPoints.map((point, index) => (
                            <div
                                key={index}
                                className={` p-8 rounded-2xl border border-gray-200 hover:shadow-lg transition-shadow`}
                            >
                                <div className={`w-16 h-16 ${point.color} rounded-full flex items-center justify-center mb-6`}>
                                    <point.icon className="w-8 h-8" />
                                </div>
                                <h3 className="text-xl font-bold text-[#2B2B2B] mb-4">{point.title}</h3>
                                <p className="text-[#666666] leading-relaxed">{point.description}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

const ImageSection = () => {
    return (
        <section className="pb-10 bg-white">
            <div className="container">
                <div className="max-w-4xl mx-auto">
                    <Image src="/images/seven-points.jpg" alt="7 Point System" width={1000} height={1000} />

                    {/* <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div className="bg-gray-100 rounded-2xl p-8 flex items-center justify-center min-h-[300px]">
                            <div className="text-center">
                                <Microscope className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                                <p className="text-gray-500">Scientific Research Image</p>
                                <p className="text-sm text-gray-400 mt-2">Seoul University Testing</p>
                            </div>
                        </div>
                        <div className="bg-gray-100 rounded-2xl p-8 flex items-center justify-center min-h-[300px]">
                            <div className="text-center">
                                <Heart className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                                <p className="text-gray-500">Product Benefits Image</p>
                                <p className="text-sm text-gray-400 mt-2">Seven Point System</p>
                            </div>
                        </div>
                    </div> */}
                </div>
            </div>
        </section>
    );
};

// const CTASection = () => {
//     return (
//         <section className="py-20 bg-[#82b7a8]/80 text-white">
//             <div className="container">
//                 <div className="max-w-4xl mx-auto text-center">
//                     <h2 className="text-3xl md:text-4xl font-bold mb-6">
//                         Experience Walking Science™
//                     </h2>
//                     <p className="text-xl  mb-8 max-w-2xl mx-auto text-white">
//                         Give your baby the scientifically proven advantage of Attipas shoes.
//                         Developed by experts, trusted by parents worldwide.
//                     </p>
//                     <div className="flex flex-col sm:flex-row gap-4 justify-center">
//                         <Link
//                             href="/collections/all-products"
//                             className="inline-flex items-center gap-2 bg-[#d9a779] hover:bg-[#c8966a] text-white px-8 py-4 rounded-lg font-medium transition-colors"
//                         >
//                             Shop Attipas Shoes
//                         </Link>
//                         <Link
//                             href="/size-guide"
//                             className="inline-flex items-center gap-2 border border-white text-white hover:bg-white hover:text-[#2B2B2B] px-8 py-4 rounded-lg font-medium transition-colors"
//                         >
//                             Size Guide
//                         </Link>
//                     </div>
//                 </div>
//             </div>
//         </section>
//     );
// };

const SevenPointSystemPage = () => {
    return (
        <div className="min-h-screen bg-white">
            <Nav />

            <main className="w-full">
                <SevenPointSystemHero />

                <ResearchSection />
                <ImageSection />
                <SevenPointsSection />
                <FAQ />
            </main>

            <Footer />
        </div>
    );
};

export default SevenPointSystemPage;