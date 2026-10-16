"use client";

import React, { useState } from "react";
import Link from "next/link";
import { X, ChevronRight, ChevronDown, Sparkles, MessageCircle, ShieldCheck, Heart, User } from "lucide-react";
import { categories } from "../../lib/data/categories";
import { seasonalCollections } from "../../lib/data/collections";
import { defaultSiteConfig } from "../../lib/config/siteConfig";
import { generateWhatsAppLink } from "../../lib/utils";

interface MobileNavProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function MobileNav({ isOpen, onClose }: MobileNavProps) {
  const [isShopExpanded, setIsShopExpanded] = useState(false);
  const [isCollectionsExpanded, setIsCollectionsExpanded] = useState(false);

  if (!isOpen) return null;

  const whatsappUrl = generateWhatsAppLink(
    defaultSiteConfig.contact.whatsappNumber,
    "Hello Sevak Creation! ✨ I was browsing your website and had a question about your jewellery."
  );

  return (
    <div className="fixed inset-0 z-50 lg:hidden">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/60 backdrop-blur-xs transition-opacity"
        onClick={onClose}
      />

      {/* Drawer */}
      <div className="fixed inset-y-0 left-0 max-w-xs w-full bg-[#FCFBF7] shadow-2xl flex flex-col z-50 overflow-y-auto">
        {/* Drawer Header */}
        <div className="p-5 border-b border-[#E8DFD0] flex items-center justify-between bg-[#F8F4EC]">
          <div>
            <div className="font-brand-serif font-bold text-xl tracking-wider text-[#4A0E17]">
              SEVAK CREATION
            </div>
            <div className="text-[10px] tracking-widest uppercase text-[#C5A059] font-medium">
              By Kishan & Aesha
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-[#4A0E17] hover:bg-black/5 rounded-full transition"
            aria-label="Close menu"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Navigation Links */}
        <div className="flex-1 py-4 px-5 space-y-1 text-sm font-medium text-[#2B2B2B]">
          <Link
            href="/"
            onClick={onClose}
            className="block py-2.5 px-3 rounded-lg hover:bg-[#F3ECE1] text-[#4A0E17] font-semibold transition"
          >
            Home
          </Link>

          {/* Shop Accordion */}
          <div>
            <button
              onClick={() => setIsShopExpanded(!isShopExpanded)}
              className="w-full flex items-center justify-between py-2.5 px-3 rounded-lg hover:bg-[#F3ECE1] transition text-left"
            >
              <span>Shop Jewellery</span>
              {isShopExpanded ? (
                <ChevronDown className="w-4 h-4 text-[#C5A059]" />
              ) : (
                <ChevronRight className="w-4 h-4 text-[#8A8A8A]" />
              )}
            </button>
            {isShopExpanded && (
              <div className="pl-4 pr-2 py-2 space-y-1 bg-[#FAF6F0] rounded-lg mt-1 text-xs text-[#4A4A4A]">
                <Link
                  href="/shop"
                  onClick={onClose}
                  className="block py-1.5 px-3 font-semibold text-[#5C1327] hover:underline"
                >
                  View All Products →
                </Link>
                {categories.map((cat) => (
                  <Link
                    key={cat.id}
                    href={`/categories/${cat.slug}`}
                    onClick={onClose}
                    className="block py-1.5 px-3 hover:text-[#5C1327] transition"
                  >
                    {cat.name}
                  </Link>
                ))}
              </div>
            )}
          </div>

          {/* Collections Accordion */}
          <div>
            <button
              onClick={() => setIsCollectionsExpanded(!isCollectionsExpanded)}
              className="w-full flex items-center justify-between py-2.5 px-3 rounded-lg hover:bg-[#F3ECE1] transition text-left"
            >
              <span className="flex items-center gap-1.5">
                <Sparkles className="w-4 h-4 text-[#C5A059]" />
                <span>Festive Collections</span>
              </span>
              {isCollectionsExpanded ? (
                <ChevronDown className="w-4 h-4 text-[#C5A059]" />
              ) : (
                <ChevronRight className="w-4 h-4 text-[#8A8A8A]" />
              )}
            </button>
            {isCollectionsExpanded && (
              <div className="pl-4 pr-2 py-2 space-y-1 bg-[#FAF6F0] rounded-lg mt-1 text-xs text-[#4A4A4A]">
                {seasonalCollections.map((col) => (
                  <Link
                    key={col.id}
                    href={`/collections/${col.slug}`}
                    onClick={onClose}
                    className="block py-1.5 px-3 hover:text-[#5C1327] transition"
                  >
                    {col.name}
                  </Link>
                ))}
              </div>
            )}
          </div>

          <Link
            href="/new-arrivals"
            onClick={onClose}
            className="block py-2.5 px-3 rounded-lg hover:bg-[#F3ECE1] transition"
          >
            New Arrivals
          </Link>

          <Link
            href="/best-sellers"
            onClick={onClose}
            className="block py-2.5 px-3 rounded-lg hover:bg-[#F3ECE1] transition"
          >
            Best Sellers
          </Link>

          <Link
            href="/about"
            onClick={onClose}
            className="block py-2.5 px-3 rounded-lg hover:bg-[#F3ECE1] transition"
          >
            Our Story (About Us)
          </Link>

          <Link
            href="/contact"
            onClick={onClose}
            className="block py-2.5 px-3 rounded-lg hover:bg-[#F3ECE1] transition"
          >
            Contact & WhatsApp
          </Link>

          <Link
            href="/faq"
            onClick={onClose}
            className="block py-2.5 px-3 rounded-lg hover:bg-[#F3ECE1] transition"
          >
            FAQ & Care Tips
          </Link>

          <div className="pt-4 mt-2 border-t border-[#E8DFD0] space-y-2">
            <Link
              href="/wishlist"
              onClick={onClose}
              className="flex items-center gap-2.5 py-2 px-3 rounded-lg text-xs hover:bg-[#F3ECE1] transition text-[#4A4A4A]"
            >
              <Heart className="w-4 h-4 text-[#C5A059]" />
              <span>My Wishlist</span>
            </Link>
            <Link
              href="/account"
              onClick={onClose}
              className="flex items-center gap-2.5 py-2 px-3 rounded-lg text-xs hover:bg-[#F3ECE1] transition text-[#4A4A4A]"
            >
              <User className="w-4 h-4 text-[#C5A059]" />
              <span>Customer Account & Orders</span>
            </Link>
            <Link
              href="/admin"
              onClick={onClose}
              className="flex items-center gap-2.5 py-2 px-3 rounded-lg text-xs hover:bg-[#F3ECE1] transition text-[#4A0E17] font-semibold"
            >
              <ShieldCheck className="w-4 h-4 text-[#5C1327]" />
              <span>Admin Dashboard</span>
            </Link>
          </div>
        </div>

        {/* Drawer Footer */}
        <div className="p-5 border-t border-[#E8DFD0] bg-[#FAF6F0]">
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-semibold shadow-xs transition"
          >
            <MessageCircle className="w-4 h-4" />
            <span>Chat on WhatsApp</span>
          </a>
          <p className="text-[11px] text-center text-[#7A7A7A] mt-3">
            Ahmedabad, Gujarat • Ships pan-India 🇮🇳
          </p>
        </div>
      </div>
    </div>
  );
}
