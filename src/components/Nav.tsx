"use client";

import * as React from "react";
import Link from "next/link";
import Image from "next/image";
import { Menu, Search, User, ShoppingCart, ChevronDown } from "lucide-react";
import { useShopifyCart } from "@/contexts/shopify-cart-context";
import { useCurrency } from "@/contexts/currency-context";
import { shopifyAuth } from "@/lib/shopify-auth";
import SearchComponent from "@/components/SearchComponent";

import { cn } from "@/lib/utils";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

type NavItem = {
  label: string;
  href?: string;
  isSale?: boolean;
  children?: {
    label: string;
    href: string;
    children?: { label: string; href: string }[];
  }[];
};

const navItems: NavItem[] = [
  { label: "Home", href: "/" },
  {
    label: "Shop",
    children: [
      { label: "All Products", href: "/collections/all-products" },
      {
        label: "New Collection",
        href: "/collections/new-collection",
      },
      { label: "Bamboo Yarn Summer Baby Shoes", href: "/collections/bamboo-yarn-summer-baby-shoes" },
      { label: "Aqua-X Yarn Summer Sock Shoes", href: "/collections/aqua-x-yarn-summer-sock-shoes" },
      { label: "Baby Socks Shoes", href: "/collections/baby-socks-shoes" },
      { label: "Toddler's Skin Shoes", href: "/collections/toddler-skin-shoes" },
    ],
  },
  { label: "Sizing", href: "/size-guide" },
  {
    label: "Science",
    children: [
      { label: "Seven Point System", href: "/science/seven-point-system" },
      // {
      //   label: "Podiatrist Recommendations",
      //   href: "/science/podiatrist-recommendations",
      // },
      // {
      //   label: "Why to Avoid Fake Shoe-Socks",
      //   href: "/science/avoid-fake-shoe-socks",
      // },
      // {
      //   label: "Health Expert",
      //   href: "/science/health-expert",
      // },
    ],
  },
  // {
  //   label: "Reviews",
  //   children: [
  //     { label: "Customer Reviews", href: "https://www.attipas.com.au/pages/reviews" },
  //     { label: "Health Expert Reviews", href: "https://www.attipas.com.au/pages/baby-shoes-approved-by-podiatrists" },
  //   ],
  // },
  // { label: "Bestsellers", href: "https://www.attipas.com.au/discount/PREBUY10?redirect=%2Fcollections%2Fpre-order-save-10-coupon-prebuy10" },
  // { label: "Mesh Baby Shoes", href: "/collections/kids-mesh-shoes" },
  // { label: "Baby Gifts", href: "https://www.attipas.com.au/collections/gift-packs" },

  // {
  //   label: "Bundle & Save",
  //   children: [
  //     { label: "Twin Packs (Save 10%)", href: "https://www.attipas.com.au/collections/baby-shoes-x-2-bundle-save-10-off" },
  //     { label: "Buy 4, Save 15%", href: "https://www.attipas.com.au/apps/bundles/bundle/27169" },
  //   ],
  // },
  // { label: "Contact", href: "/contact" },
  { label: "Store Location", href: "/store-location" },
  { label: "FAQ", href: "/faq" },
  // { label: "Sale", href: "/collections/on-sale-items", isSale: true },
];


export default function Nav() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);
  const { totalItems } = useShopifyCart();
  const { currency, setCurrency } = useCurrency();

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background shadow-sm">
      <div className="container flex h-24 items-center">
        <div className="flex items-center">
          <Link href="/" className="mr-6">
            <Image
              src="/images/character-logo.jpg"
              alt="Attipas Mauritius"
              width={149}
              height={69}
              priority
            />
          </Link>
        </div>

        {/* Desktop Navigation Items  */}
        <NavigationMenu viewport={false} className="hidden lg:flex flex-1 justify-center">
          <NavigationMenuList>
            {navItems.map((item) => (
              <NavigationMenuItem key={item.label}>
                {item.children ? (
                  <>
                    <NavigationMenuTrigger
                      className={`font-ui text-sm font-normal text-text-primary hover:text-primary uppercase cursor-pointer `}
                    >
                      {item.label}
                    </NavigationMenuTrigger>
                    <NavigationMenuContent>
                      {item.label === "Shop" ? (
                        <div className="p-4 w-[400px]">
                          <div className="grid grid-cols-2 gap-x-2 gap-y-2">
                            {item.children.map((child) => (
                              <div key={child.label}>
                                <Link
                                  href={child.href}
                                  className="text-sm font-medium text-text-primary hover:text-primary hover:underline"
                                >
                                  {child.label}
                                </Link>
                                {child.children && (
                                  <ul className="mt-1 space-y-1 ">
                                    {child.children.map((subChild) => (
                                      <li key={subChild.label}>
                                        <Link
                                          href={subChild.href}
                                          className="text-sm text-muted-foreground hover:text-primary"
                                        >
                                          {subChild.label}
                                        </Link>
                                      </li>
                                    ))}
                                  </ul>
                                )}
                              </div>
                            ))}
                          </div>
                        </div>
                      ) : (
                        <ul className="grid w-[250px] gap-1 p-3 ">
                          {item.children.map((child) => (
                            <li key={child.label}>
                              <NavigationMenuLink asChild>
                                <Link
                                  href={child.href}
                                  className="block select-none rounded-md p-3 text-sm leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                                >
                                  {child.label}
                                </Link>
                              </NavigationMenuLink>
                            </li>
                          ))}
                        </ul>
                      )}
                    </NavigationMenuContent>
                  </>
                ) : (
                  <Link href={item.href || "#"} legacyBehavior passHref>
                    <NavigationMenuLink
                      className={cn(
                        navigationMenuTriggerStyle(),
                        "font-ui text-sm font-normal text-text-primary hover:text-primary uppercase cursor-pointer"
                      )}
                    >
                      {item.isSale ? (
                        <span className="text-red-600">{item.label}</span>
                      ) : (
                        item.label
                      )}
                    </NavigationMenuLink>
                  </Link>
                )}
              </NavigationMenuItem>
            ))}
          </NavigationMenuList>
        </NavigationMenu>

        <div className="flex flex-1 items-center justify-end space-x-2 lg:space-x-4">
          <div className="hidden lg:flex items-center space-x-2">
            {/* Search Component */}
            <div className="mr-4">
              <SearchComponent className="w-80" />
            </div>
            {/* Account Button */}
            <Button
              variant="ghost"
              size="icon"
              aria-label="Account"
              className="cursor-pointer"
              onClick={() => shopifyAuth.account()}
            >
              <User className="h-10 w-10 text-text-primary font-bold" />
            </Button>
            {/* Cart Button */}
            <Link href="/cart" passHref>
              <Button variant="ghost" size="icon" aria-label="Cart" className="relative cursor-pointer">
                <ShoppingCart className="h-10 w-10 text-text-primary" />
                {totalItems > 0 && (
                  <span className="absolute -top-1 -right-1 bg-[#d68972] text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                    {totalItems}
                  </span>
                )}
              </Button>
            </Link>
            {/* Currency Dropdown */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="text-sm font-normal text-text-primary px-2 cursor-pointer">
                  {currency} <ChevronDown className="h-6 w-6 ml-1" strokeWidth={3} />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem onClick={() => setCurrency("MUR")}>MUR</DropdownMenuItem>
                <DropdownMenuItem onClick={() => setCurrency("USD")}>USD</DropdownMenuItem>
                <DropdownMenuItem onClick={() => setCurrency("AUD")}>AUD</DropdownMenuItem>
                <DropdownMenuItem onClick={() => setCurrency("CAD")}>CAD</DropdownMenuItem>
                <DropdownMenuItem onClick={() => setCurrency("EUR")}>EUR</DropdownMenuItem>
                <DropdownMenuItem onClick={() => setCurrency("GBP")}>GBP</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>


          {/* Mobile Navigation  */}
          <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
            <SheetTrigger>

              <Link href="/search" passHref>
                <Button variant="ghost" size="icon" aria-label="Search" className="lg:hidden">
                  <Search className="h-5 w-5 text-text-primary" />
                </Button>
              </Link>
            </SheetTrigger>
            <SheetTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                aria-label="Account"
                className="lg:hidden"
                onClick={() => shopifyAuth.account()}
              >
                <User className="h-5 w-5 text-text-primary" />
              </Button>
            </SheetTrigger>

            <SheetTrigger>
              <Link href="/cart" passHref>
                <Button variant="ghost" size="icon" aria-label="Cart" className="relative lg:hidden">
                  <ShoppingCart className="h-5 w-5 text-text-primary" />
                  {totalItems > 0 && (
                    <span className="absolute -top-1 -right-1 bg-[#d68972] text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                      {totalItems}
                    </span>
                  )}
                </Button>
              </Link>
            </SheetTrigger>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="lg:hidden" aria-label="Open menu">
                <Menu className="h-6 w-6 text-text-primary" />
              </Button>

            </SheetTrigger>

            <SheetContent side="left" className="w-[300px] sm:w-[340px]">
              <SheetHeader>
                <SheetTitle>
                  <Link href="/" onClick={() => setIsMobileMenuOpen(false)}>
                    <Image
                      src="/images/character-logo.jpg"
                      alt="Attipas Mauritiu Logo"
                      width={130}
                      height={60}
                    />
                  </Link>
                </SheetTitle>
              </SheetHeader>

              <div className="mt-6 flex flex-col space-y-2 px-6">
                {navItems.map((item) =>
                  item.children ? (
                    <Accordion key={item.label} type="single" collapsible className="w-full">
                      <AccordionItem value={item.label} className="border-b-0">
                        <AccordionTrigger className="py-3 text-base text-text-primary hover:no-underline uppercase">
                          {item.label}
                        </AccordionTrigger>
                        <AccordionContent>
                          <div className="flex flex-col space-y-2 pl-4">
                            {item.children.map((child) => (
                              <div key={child.label}>
                                <Link
                                  href={child.href}
                                  onClick={() => setIsMobileMenuOpen(false)}
                                  className="block border-2 py-1 text-muted-foreground hover:text-primary "
                                >
                                  {child.label}
                                </Link>
                                {child.children && (
                                  <div className="pl-4">
                                    {child.children.map((subChild) => (
                                      <Link
                                        key={subChild.label}
                                        href={subChild.href}
                                        onClick={() => setIsMobileMenuOpen(false)}
                                        className="block py-1 text-sm text-muted-foreground/80 hover:text-primary"
                                      >
                                        {subChild.label}
                                      </Link>
                                    ))}
                                  </div>
                                )}
                              </div>
                            ))}
                          </div>
                        </AccordionContent>
                      </AccordionItem>
                    </Accordion>
                  ) : (
                    <Link
                      key={item.label}
                      href={item.href || "#"}
                      onClick={() => setIsMobileMenuOpen(false)}
                      className={cn(
                        "block py-3 text-base text-text-primary uppercase",
                        item.isSale && "text-red-600"
                      )}
                    >
                      {item.label}
                    </Link>
                  )
                )}

                {/* Search, Account, Cart in Mobile View */}
                {/* <div className="border-t pt-4 mt-4 flex items-center space-x-2 border-2 border-red-50">
                  <Link href="/search" passHref>
                    <Button variant="ghost" size="icon" aria-label="Search">
                      <Search className="h-5 w-5 text-text-primary" />
                    </Button>
                  </Link>
                  <Link href="/account" passHref>
                    <Button variant="ghost" size="icon" aria-label="Account">
                      <User className="h-5 w-5 text-text-primary" />
                    </Button>
                  </Link>
                  <Link href="/cart" passHref>
                    <Button variant="ghost" size="icon" aria-label="Cart" className="relative">
                      <ShoppingCart className="h-5 w-5 text-text-primary" />
                      {totalItems > 0 && (
                        <span className="absolute -top-1 -right-1 bg-accent-pink text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                          {totalItems}
                        </span>
                      )}
                    </Button>
                  </Link>
                </div> */}
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
