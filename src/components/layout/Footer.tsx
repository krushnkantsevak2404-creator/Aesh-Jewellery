import React from "react";
import Link from "next/link";
import {
  MessageCircle,
  Phone,
  Mail,
  MapPin,
  ShieldCheck,
  Truck,
  Sparkles,
} from "lucide-react";
import InstagramIcon from "../ui/InstagramIcon";
import { defaultSiteConfig } from "../../lib/config/siteConfig";
import { generateWhatsAppLink } from "../../lib/utils";

export default function Footer() {
  const whatsappUrl = generateWhatsAppLink(
    defaultSiteConfig.contact.whatsappNumber,
    "Hello Sevak Creation! ✨ I have a query about an order or product."
  );

  return (
    <footer className="bg-[#1C1819] text-[#EDE7DE] pt-16 pb-8 border-t border-[#382E30]">
      {/* Top Value Banner */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12 border-b border-[#382E30]">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center md:text-left">
          <div className="flex flex-col md:flex-row items-center md:items-start gap-3.5">
            <div className="w-10 h-10 rounded-full bg-[#5C1327]/60 border border-[#C5A059]/40 flex items-center justify-center shrink-0 text-[#C5A059]">
              <Truck className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-sm font-semibold text-white tracking-wide">
                Free Express Shipping
              </h4>
              <p className="text-xs text-[#A89E9B] mt-0.5">
                On all orders above ₹999 across 28,000+ Indian pincodes.
              </p>
            </div>
          </div>

          <div className="flex flex-col md:flex-row items-center md:items-start gap-3.5">
            <div className="w-10 h-10 rounded-full bg-[#5C1327]/60 border border-[#C5A059]/40 flex items-center justify-center shrink-0 text-[#C5A059]">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-sm font-semibold text-white tracking-wide">
                Hand-Curated Craftsmanship
              </h4>
              <p className="text-xs text-[#A89E9B] mt-0.5">
                Authentic oxidized patterns & lightweight festive elegance by Kishan & Aesha.
              </p>
            </div>
          </div>

          <div className="flex flex-col md:flex-row items-center md:items-start gap-3.5">
            <div className="w-10 h-10 rounded-full bg-[#5C1327]/60 border border-[#C5A059]/40 flex items-center justify-center shrink-0 text-[#C5A059]">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-sm font-semibold text-white tracking-wide">
                Trusted Small Business
              </h4>
              <p className="text-xs text-[#A89E9B] mt-0.5">
                Direct WhatsApp assistance, unboxing support, and safe Indian checkout.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer Links */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-8 lg:gap-10">
          {/* Brand Info Column */}
          <div className="lg:col-span-2 space-y-4">
            <div>
              <Link href="/" className="inline-block">
                <span className="font-brand-serif text-2xl tracking-[0.16em] uppercase font-bold text-white">
                  SEVAK CREATION
                </span>
                <span className="block text-[10px] tracking-[0.3em] uppercase text-[#C5A059] font-medium mt-0.5">
                  Modern Indian Festive Jewellery
                </span>
              </Link>
            </div>
            <p className="text-xs text-[#B8AEA8] leading-relaxed max-w-sm">
              Founded by Kishan & Aesha in Gujarat, Sevak Creation celebrates the soul of Indian traditions with year-round jewellery, festive edits, and everyday adornments crafted to bring sparkle to your moments.
            </p>
            <div className="pt-2 space-y-2 text-xs text-[#B8AEA8]">
              <div className="flex items-center gap-2">
                <MapPin className="w-3.5 h-3.5 text-[#C5A059] shrink-0" />
                <span>Ahmedabad, Gujarat, India</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 text-[#C5A059] shrink-0" />
                <a href={`mailto:${defaultSiteConfig.contact.email}`} className="hover:text-white transition">
                  {defaultSiteConfig.contact.email}
                </a>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-[#C5A059] shrink-0" />
                <span>{defaultSiteConfig.contact.phone}</span>
              </div>
            </div>
            <div className="flex items-center gap-3 pt-2">
              <a
                href={defaultSiteConfig.contact.instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full bg-[#2B2426] hover:bg-[#5C1327] text-white flex items-center justify-center transition border border-[#44383B]"
                aria-label="Follow us on Instagram"
              >
                <InstagramIcon className="w-4 h-4" />
              </a>
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full bg-[#2B2426] hover:bg-emerald-800 text-white flex items-center justify-center transition border border-[#44383B]"
                aria-label="Chat with us on WhatsApp"
              >
                <MessageCircle className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Shop Column */}
          <div>
            <h4 className="text-xs font-bold text-[#C5A059] uppercase tracking-widest mb-4">
              Shop Categories
            </h4>
            <ul className="space-y-2.5 text-xs text-[#C5BAAF]">
              <li>
                <Link href="/categories/earrings" className="hover:text-white transition">
                  Earrings & Jhumkas
                </Link>
              </li>
              <li>
                <Link href="/categories/necklaces" className="hover:text-white transition">
                  Necklaces & Chokers
                </Link>
              </li>
              <li>
                <Link href="/categories/hand-sets" className="hover:text-white transition">
                  Hand Sets & Haathphool
                </Link>
              </li>
              <li>
                <Link href="/categories/ked-kandoro" className="hover:text-white transition">
                  Ked Kandoro & Waistbands
                </Link>
              </li>
              <li>
                <Link href="/categories/rings" className="hover:text-white transition">
                  Rings & Cocktails
                </Link>
              </li>
              <li>
                <Link href="/categories/bracelets" className="hover:text-white transition">
                  Bracelets & Kadas
                </Link>
              </li>
              <li>
                <Link href="/categories/jewellery-sets" className="hover:text-white transition">
                  Festive Jewellery Sets
                </Link>
              </li>
            </ul>
          </div>

          {/* Collections Column */}
          <div>
            <h4 className="text-xs font-bold text-[#C5A059] uppercase tracking-widest mb-4">
              Collections
            </h4>
            <ul className="space-y-2.5 text-xs text-[#C5BAAF]">
              <li>
                <Link href="/new-arrivals" className="hover:text-white transition">
                  New Arrivals
                </Link>
              </li>
              <li>
                <Link href="/best-sellers" className="hover:text-white transition">
                  Best Sellers
                </Link>
              </li>
              <li>
                <Link href="/collections/navratri" className="hover:text-white transition">
                  Navratri Garba Edit
                </Link>
              </li>
              <li>
                <Link href="/collections/diwali" className="hover:text-white transition">
                  Diwali Radiance Edit
                </Link>
              </li>
              <li>
                <Link href="/collections/wedding-season" className="hover:text-white transition">
                  Shaadi & Wedding Edit
                </Link>
              </li>
              <li>
                <Link href="/collections/everyday" className="hover:text-white transition">
                  Everyday Minimal Sparkle
                </Link>
              </li>
              <li>
                <Link href="/collections/raksha-bandhan" className="hover:text-white transition">
                  Gifting Edit
                </Link>
              </li>
            </ul>
          </div>

          {/* Help & Legal Column */}
          <div>
            <h4 className="text-xs font-bold text-[#C5A059] uppercase tracking-widest mb-4">
              Customer Care
            </h4>
            <ul className="space-y-2.5 text-xs text-[#C5BAAF]">
              <li>
                <Link href="/about" className="hover:text-white transition">
                  About Us (Our Story)
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-white transition">
                  Contact & Support
                </Link>
              </li>
              <li>
                <Link href="/track-order" className="hover:text-white transition">
                  Track Your Order
                </Link>
              </li>
              <li>
                <Link href="/faq" className="hover:text-white transition">
                  FAQs & Care Guide
                </Link>
              </li>
              <li>
                <Link href="/policies/shipping" className="hover:text-white transition">
                  Shipping Policy
                </Link>
              </li>
              <li>
                <Link href="/policies/returns" className="hover:text-white transition">
                  Returns & Refunds
                </Link>
              </li>
              <li>
                <Link href="/policies/privacy" className="hover:text-white transition">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/policies/terms" className="hover:text-white transition">
                  Terms & Conditions
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar: Copyright & Payment Badges */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 border-t border-[#382E30] flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-[#8F8582]">
        <div>
          © 2026 {defaultSiteConfig.brandName}. All rights reserved. Handcrafted with passion in India.
        </div>

        {/* Indian Payment Trust Badges */}
        <div className="flex items-center gap-3">
          <span className="text-[11px] uppercase tracking-wider text-[#A89E9B]">
            Accepted Payments:
          </span>
          <div className="flex items-center gap-1.5 font-semibold text-[10px] tracking-wider text-amber-100/90">
            <span className="px-1.5 py-0.5 rounded bg-[#2E2527] border border-[#44383B]">UPI</span>
            <span className="px-1.5 py-0.5 rounded bg-[#2E2527] border border-[#44383B]">Google Pay</span>
            <span className="px-1.5 py-0.5 rounded bg-[#2E2527] border border-[#44383B]">PhonePe</span>
            <span className="px-1.5 py-0.5 rounded bg-[#2E2527] border border-[#44383B]">Cards</span>
            <span className="px-1.5 py-0.5 rounded bg-[#2E2527] border border-[#44383B]">COD</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
