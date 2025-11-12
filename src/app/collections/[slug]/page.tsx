

import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import ShopProductsGrid from "@/components/ProductGrid";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getAllCollections } from "@/lib/shopify";
//fetch products by handle for each product
// Collection configuration
import Testimonial from "@/components/sections/Testimonial";


const allCollections = await getAllCollections();

// console.log('this is all collection', allCollections)

//change the collections into objects with handles as its values
const COLLECTIONS = allCollections.reduce((acc, collection) => {
    acc[collection.handle] = {
        title: collection.title,
        description: collection.description,
        category: collection.handle
    };
    return acc;
}, {} as Record<string, { title: string; description: string; category: string }>)

// console.log('this is formatted collection', formattedCollections)
// const COLLECTIONS = {
//     "all-products": {
//         title: "All Products",
//         description: "Discover our complete collection of baby shoes",
//         category: "All"
//     },
// } as const;

// console.log('this is collection', COLLECTIONS)
// console.log(typeof COLLECTIONS)

type CollectionSlug = keyof typeof COLLECTIONS;

interface CollectionPageProps {
    params: {
        slug: string;
    };
}


const FEATURES = {
    'bamboo-yarn-summer-baby-shoes': {
        title: "Natural premium fiber for sensitive baby skin",
        features: [
            { title: "Natural Antibacterial & Deodorizing Properties", description: "Hygienic wear, no sweat odor or bacteria" },
            { title: "Excellent Absorption & Breathability", description: "Absorbs sweat quickly, keeps skin dry" },
            { title: "Soft Texture", description: "Silky soft, gentle on sensitive skin" },
            { title: "Minimizes Skin Irritation", description: "Eco-friendly yarn, less chemical processing" },
            { title: "Certified Eco-Friendly Material", description: "OEKO-TEX certified, free from harmful substances, skin-safe" }
        ],
        description: "The Attipas Bamboo Line is softer and more absorbent than cotton, making it a functional line that even babies with delicate skin can wear comfortably."
    },
    'aqua-x-yarn-summer-sock-shoes': {
        title: "Cool and comfy even in summer—premium cooling functional fiber",
        features: [
            { title: "Cooling Function", description: "Provides a cool feeling the moment it touches the skin" },
            { title: "Quick Sweat Absorption & Drying", description: "Keeps you fresh all day without stickiness, even with heavy sweating" },
            { title: "UV Protection", description: "Protects the skin during outdoor activities under strong sunlight" },
            { title: "Excellent Breathability", description: "Quickly releases heat and sweat to maintain comfort" },
            { title: "Premium Fiber Developed in Korea", description: "Uses reliable, specially developed Korean functional yarn" }
        ],
        description: "The Attipas Aqua Line applies Aqua-X functional yarn to maximize breathability and cooling effects, making it a summer-exclusive functional line."
    },
    'toddler-skin-shoes': {
        title: "Supporting Natural Development with Innovative Design",
        features: [
            { title: "Thin 5mm Outsole", description: "Lets children feel the ground, supporting natural sensory and motor development" },
            { title: "Flexibility & Comfort", description: "Unlike thick-soled kids' shoes, allows free and natural movement" },
            { title: "Practical Features", description: "Removable insole, anti-slip sole, and machine washable materials" },
            { title: "Healthy Growth Support", description: "Combines practicality with benefits for foot development" }
        ],
        description: "Our toddler skin shoes feature innovative design elements that prioritize natural foot development while providing essential protection and practical functionality for active toddlers."
    },
}

export default async function CollectionPage({ params }: CollectionPageProps) {
    const { slug } = await params;
    // console.log('this is slug', slug)

    // Check if the collection exists
    if (!(slug in COLLECTIONS)) {
        notFound();
    }

    const collection = COLLECTIONS[slug as CollectionSlug];
    console.log('this is collection', collection.description)
    return (
        <div className="min-h-screen bg-background-white">
            <Nav />

            <main className="w-full">
                {/* Breadcrumb */}
                <div className="container mx-auto px-4 py-6">
                    <nav className="text-sm text-muted-foreground">
                        <Link href="/" className="hover:text-foreground">Home</Link>
                        <span className="mx-2">/</span>
                        <Link href="/collections/all-products" className="hover:text-foreground">Collections</Link>
                        <span className="mx-2">/</span>
                        <span className="text-foreground">{collection.title}</span>
                    </nav>
                </div>

                {/* Collection Header */}
                <div className="container mx-auto px-4 pb-8">
                    <div className="text-center">
                        <h1 className="text-4xl md:text-5xl font-bold mb-3 uppercase tracking-wide text-text-primary">
                            {collection.title}
                        </h1>
                        <p className="text-text-secondary text-lg">
                            {collection.description}
                        </p>
                    </div>
                </div>



                <ShopProductsGrid collectionType={collection.category} />
            </main>
            {/* Collection Features */}
            {FEATURES[slug as keyof typeof FEATURES] && (
                <div className="w-full px-4 pb-12 my-12">
                    <div className="container">
                        <div className=" rounded-2xl p-8 border border-blue-100">
                            <h2 className="text-xl md:text-2xl font-bold text-center mb-8 text-gray-800">
                                {FEATURES[slug as keyof typeof FEATURES].title}
                            </h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full">
                                {FEATURES[slug as keyof typeof FEATURES].features.map((feature, index) => (
                                    <div key={index} className="flex items-start space-x-4  bg-white/50 rounded-lg">
                                        <div className="flex-shrink-0 w-2 h-2 bg-black rounded-full mt-2"></div>
                                        <div className="flex-1">
                                            <h3 className="font-semibold text-lg md:text-xl text-gray-800 mb-1">{feature.title}</h3>
                                            <p className="text-gray-600 leading-relaxed text-xs md:text-sm">{feature.description}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                            <div className="mt-8 pt-6 border-t border-blue-200">
                                <p className="text-gray-700 leading-relaxed text-center italic">
                                    {FEATURES[slug as keyof typeof FEATURES].description}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Testimonials Section */}
            <Testimonial />


            <Footer />
        </div>
    );
}

// Generate static params for known collections
export async function generateStaticParams() {
    return Object.keys(COLLECTIONS).map((slug) => ({
        slug,
    }));
}
