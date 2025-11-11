

import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import ShopProductsGrid from "@/components/ProductGrid";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getAllCollections } from "@/lib/shopify";
//fetch products by handle for each product
// Collection configuration


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
