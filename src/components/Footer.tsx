"use client";

import Image from "next/image";
import Link from "next/link";

import { SocialIcon } from 'react-social-icons'
const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || 'https://djunoemhhucuiipi.public.blob.vercel-storage.com';
const shopLinks = [
  { name: "Shop", href: "/collections/all-products" },
  // { name: 'Best Seller', href: '/bestseller' },
  { name: "Size Guide", href: "/sizing" },
  { name: "Gallery", href: "/models" },
  { name: "Science", href: "/science/seven-point-system" },
  { name: "New Arrival", href: "/new-collection" },
  // { name: "Terms of Service", href: "#" },
  // { name: "Sale", href: "/sale" },
];

const aboutUsLinks = [
  { name: "About Us", href: "/store-location" },
  { name: "Contact", href: "/contact" },
  // { name: "Reviews", href: "#" },
  // { name: "Recommendations", href: "#" },
  // { name: "Shipping & Returns", href: "#" },
  // { name: "Exchanges & Returns", href: "#" },
  { name: "Terms and Conditions", href: "/terms-and-conditions" },
  { name: "Refund Policy", href: "/return-policy" },
  { name: "FAQ", href: "/faq" },
];

// Social Icons - instagram, tiktok, and Facebook
const socialIcons = [
  { alt: 'Facebook', href: 'https://www.facebook.com/AttipasMauritius' },
  { alt: 'Instagram', href: 'https://www.instagram.com/attipasmauritius/' },
  { alt: 'Twitter', href: 'https://www.tiktok.com/AttipasMauritius' },
];

const Footer = () => {

  const year = new Date().getFullYear();
  return (
    <footer className="bg-[#36383c]/95 py-12 lg:py-20  font-ui text-sm">
      <div className="container">
        <div className="grid grid-cols-1 gap-y-10 gap-x-8 sm:grid-cols-2 lg:grid-cols-4">


          <div>
            <Image src={`${BASE_URL}/logo/footer-icon.png`} alt="Attipas Logo" width={100} height={100} />


            <div className="mt-8">
              <div className="space-y-1 mt-2 text-base">
                <p className="text-white">10 Raoul Lejeune Street, 32000</p>
                <p className="text-white">Beau Bassin-Rose Hill, Mauritius</p>
                <p className="">
                  <a href="mailto:sales@attipas.mu" className="text-white">sales@attipas.mu</a>
                </p>
                <p>
                  <a href="tel:+23058165618" className="text-white">(+230) 5816 5618</a>
                </p>
                <p className="text-white">Attipas | Mauritius</p>
              </div>
            </div>

            <div className="flex space-x-4 order-first md:order-none mt-8">
              {socialIcons.map((icon) => (
                <a href={icon.href} key={icon.alt} target="_blank" rel="noopener noreferrer">
                  <SocialIcon target="_blank" url={icon.href} style={{ width: '32px', height: '32px' }} />
                </a>


              ))}
            </div>
          </div>



          <div>
            <h3 className="text-xl font-semibold uppercase tracking-wider text-white mb-4">Shop</h3>
            <ul className="space-y-3">
              {shopLinks.map((link) => (
                <li key={link.name}>
                  <Link href={link.href} className="text-base text-white hover:text-gray-200 transition-colors">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-xl font-semibold uppercase tracking-wider text-white mb-4">About Us</h3>
            <ul className="space-y-3">
              {aboutUsLinks.map((link) => (
                <li key={link.name}>
                  <Link href={link.href} className="text-base text-white hover:text-gray-200 transition-colors">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>



          <div>
            {/* Google Maps embed for store location */}
            <div className="w-full h-56 rounded-md overflow-hidden border border-white/20">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3742.1234567890123!2d57.5034!3d-20.1609!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjDCsDA5JzM5LjIiUyA1N8KwMzAnMTIuNCJF!5e0!3m2!1sen!2smu!4v1234567890123"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Attipas Mauritius Store Location"
              ></iframe>
            </div>
          </div>
        </div>



        <div className="mt-12 pt-12 border-t border-white/50">
          <div className="flex justify-center items-center flex-col text-white/70">
            <p className="text-sm text-white/80 text-center md:text-left">
              &copy; {year} Attipas Mauritius | An official distributor of Attipas in Mauritius.
            </p>
            <p className="text-sm text-white/80 text-center md:text-left">All rights reserved.</p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;