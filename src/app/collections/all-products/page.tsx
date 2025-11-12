import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import ShopProductsGrid from "@/components/ProductGrid";
import Link from "next/link";
import Testimonial from "@/components/sections/Testimonial";

export default function AllProductsPage() {
  return (
    <div className="min-h-screen bg-background-white">
      <Nav />

      <main className="w-full">
        {/* Breadcrumb */}
        <div className="container mx-auto px-4 py-6">
          <nav className="text-sm text-muted-foreground">
            <Link href="/" className="hover:text-foreground">Home</Link>
            <span className="mx-2">/</span>
            <span className="text-foreground">All Products</span>
          </nav>
        </div>

        {/* Collection Header */}
        <div className="container mx-auto px-4 pb-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-3 uppercase tracking-wide text-text-primary">
              All Products
            </h1>
            <p className="text-text-secondary text-lg">
              Discover our complete collection of baby shoes
            </p>
          </div>
        </div>

        <ShopProductsGrid collectionType="All" />
      </main>
      <Testimonial />

      <Footer />
    </div>
  );
}