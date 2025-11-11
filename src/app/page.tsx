import type { Metadata } from "next";
import Nav from "@/components/Nav";
// import BestSeller from "@/components/sections/BestSeller";

// import MidSeasonSaleGrid from "@/components/sections/Sale";
import NewCollection from "@/components/sections/NewCollection";

import Footer from "@/components/Footer";
import BrandMarque from "@/components/sections/BrandMarque";
import SocialMediaSection from "@/components/sections/SocialMedia";
import Testimonial from "@/components/sections/Testimonial";


import HeroCarousel from "@/components/sections/HeroCarousel";
import NewArrival from "@/components/sections/NewArrival";
import ModelSection from "@/components/ModelSection";
import TopCollections from "@/components/sections/TopCollection";
import VideoSection from "@/components/sections/VideoSection";

export const metadata: Metadata = {
  title: "Attipas MU - Premium Baby & Toddler Footwear | Science-Backed Design",
  description: "Discover Attipas premium baby and toddler footwear in Mauritius. Science-backed designs for healthy foot development. Shop our collection of breathable, flexible shoes for growing feet.",
  keywords: [
    "Attipas Mauritius",
    "baby shoes",
    "toddler footwear",
    "first walking shoes",
    "breathable baby shoes",
    "flexible toddler shoes",
    "healthy foot development",
    "premium baby footwear",
    "Mauritius baby products"
  ],
  openGraph: {
    title: "Attipas MU - Premium Baby & Toddler Footwear",
    description: "Science-backed baby and toddler shoes designed for healthy foot development. Premium quality footwear in Mauritius.",
    type: "website",
    locale: "en_US",
    siteName: "Attipas MU",
  },
  twitter: {
    card: "summary_large_image",
    title: "Attipas MU - Premium Baby & Toddler Footwear",
    description: "Science-backed baby and toddler shoes designed for healthy foot development.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function Page() {
  return (
    <div className="min-h-screen bg-background-white">
      <Nav />

      <main className="w-full">
        {/* <CarouselSection /> */}
        <HeroCarousel />
        <BrandMarque />


        {/* Marquee 
        science backed 
        Best sellers 
        Testimonials 
        CTA - discount or sales product 
        social media links
        footer  */}
        {/* <HeroBanner /> */}
        {/* <BestSeller /> */}
        <ModelSection />

        {/* <ReviewsCarousel />

        <BreathableMeshShoesGrid />

        <OscarsFeatureVideo />

     

        <MediaFeaturesCollage />

        <SharkTankFeature />

        <AwardsShowcase /> */}

        <NewArrival />
        <VideoSection />
        <Testimonial />

        <NewCollection />
        <TopCollections />



        <SocialMediaSection />

      </main>

      <Footer />
    </div>
  );
}