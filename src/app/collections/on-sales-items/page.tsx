import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import ShopProductsGrid from "@/components/ProductGrid";
import Link from "next/link";

export default function OnSalesItemsPage() {
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
            <span className="text-foreground">Sale Items</span>
          </nav>
        </div>

        {/* Collection Header */}
        <div className="container mx-auto px-4 pb-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-3 uppercase tracking-wide text-text-primary">
              Sale Items
            </h1>
            <p className="text-text-secondary text-lg">
              Great deals on baby shoes and accessories
            </p>
          </div>
        </div>

        <ShopProductsGrid collectionType="Sale" />
      </main>

      <Footer />
    </div>
  );
}