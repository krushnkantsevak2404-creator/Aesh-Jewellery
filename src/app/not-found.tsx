import React from "react";
import Link from "next/link";
import { ArrowLeft, Sparkles, Search, MessageCircle, Home, ShoppingBag } from "lucide-react";
import { defaultSiteConfig } from "../lib/config/siteConfig";
import { generateWhatsAppLink } from "../lib/utils";

export default function NotFound() {
  const whatsappUrl = generateWhatsAppLink(
    defaultSiteConfig.contact.whatsappNumber,
    "Hello Kishan & Aesha! I was browsing Sevak Creation and could not find the page I was looking for. Can you assist me?"
  );

  return (
    <div className="py-20 sm:py-32 bg-[#FCFBF7] min-h-[75vh] flex items-center justify-center px-4">
      <div className="max-w-2xl mx-auto text-center space-y-6">
        <div className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-[#FAF6F0] text-[#C5A059] text-xs font-bold uppercase tracking-widest border border-[#ECE4D8]">
          <Sparkles className="w-3.5 h-3.5 text-[#5C1327]" />
          <span>Error 404</span>
        </div>

        <h1 className="font-brand-serif text-4xl sm:text-5xl font-bold text-[#1F1F1F] tracking-tight">
          This Piece Seems to Have Wandered Off
        </h1>

        <p className="text-sm sm:text-base text-[#666] max-w-lg mx-auto leading-relaxed">
          The page or jewellery item you are looking for may have moved, been renamed, or is currently out of stock. Let us help you find the perfect sparkle.
        </p>

        {/* Quick Links */}
        <div className="pt-2 flex flex-wrap items-center justify-center gap-3">
          <Link
            href="/"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[#5C1327] hover:bg-[#4A0E17] text-white text-xs font-bold uppercase tracking-wider transition shadow-sm"
          >
            <Home className="w-4 h-4" />
            <span>Return Home</span>
          </Link>

          <Link
            href="/shop"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl border border-[#D5CABB] bg-white hover:bg-[#FAF6F0] text-[#1F1F1F] text-xs font-semibold transition"
          >
            <ShoppingBag className="w-4 h-4 text-[#5C1327]" />
            <span>Browse All Jewellery</span>
          </Link>

          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-semibold transition shadow-sm"
          >
            <MessageCircle className="w-4 h-4" />
            <span>WhatsApp Support</span>
          </a>
        </div>

        {/* Popular Categories Shortcut */}
        <div className="pt-10 border-t border-[#ECE4D8]">
          <span className="text-xs uppercase tracking-wider text-[#8A8A8A] font-semibold block mb-3">
            Popular Categories
          </span>
          <div className="flex flex-wrap justify-center gap-2">
            {[
              { name: "Oxidized Earrings", href: "/categories/earrings" },
              { name: "Necklaces & Chokers", href: "/categories/necklaces" },
              { name: "Hand Sets & Haathphool", href: "/categories/hand-sets" },
              { name: "Ked Kandoro", href: "/categories/ked-kandoro" },
              { name: "Navratri Edit", href: "/collections/navratri" },
              { name: "Best Sellers", href: "/best-sellers" },
            ].map((cat) => (
              <Link
                key={cat.href}
                href={cat.href}
                className="px-3.5 py-1.5 rounded-full text-xs bg-white border border-[#E8DFD0] text-[#4A4A4A] hover:border-[#5C1327] hover:text-[#5C1327] transition"
              >
                {cat.name}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
