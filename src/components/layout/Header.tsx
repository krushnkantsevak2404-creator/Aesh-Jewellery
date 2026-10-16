"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Search,
  Heart,
  ShoppingBag,
  User,
  Menu,
  X,
  ChevronDown,
  Sparkles,
} from "lucide-react";
import { useCart } from "../../context/CartContext";
import { useWishlist } from "../../context/WishlistContext";
import { useStore } from "../../context/StoreContext";
import { categories } from "../../lib/data/categories";
import { seasonalCollections } from "../../lib/data/collections";
import MobileNav from "./MobileNav";

export default function Header() {
  const pathname = usePathname();
  const { totalItemCount, openCartDrawer } = useCart();
  const { wishlistCount } = useWishlist();
  const { openSearchModal, activeCollection } = useStore();

  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false);
  const [isCollectionsHovered, setIsCollectionsHovered] = useState(false);
  const [isShopHovered, setIsShopHovered] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile nav on route change
  useEffect(() => {
    setIsMobileNavOpen(false);
  }, [pathname]);

  return (
    <>
      <header
        className={`sticky top-0 z-40 transition-all duration-300 ${
          isScrolled
            ? "bg-[#FCFBF7]/95 backdrop-blur-md shadow-sm border-b border-[#E8DFD0]"
            : "bg-[#FCFBF7] border-b border-[#F0E8DC]"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-18 sm:h-20 gap-4">
            {/* MOBILE: HAMBURGER BUTTON */}
            <div className="flex items-center lg:hidden">
              <button
                onClick={() => setIsMobileNavOpen(true)}
                className="p-2 -ml-2 text-[#1F1F1F] hover:text-[#5C1327] rounded-lg transition"
                aria-label="Open navigation menu"
              >
                <Menu className="w-6 h-6" />
              </button>
            </div>

            {/* BRAND LOGO / WORDMARK */}
            <div className="flex-1 lg:flex-initial flex items-center justify-center lg:justify-start">
              <Link href="/" className="group flex flex-col items-center lg:items-start select-none">
                <span className="font-brand-serif text-2xl sm:text-2xl lg:text-[26px] tracking-[0.16em] uppercase font-bold text-[#4A0E17] group-hover:text-[#5C1327] transition duration-200">
                  SEVAK CREATION
                </span>
                <span className="text-[9px] tracking-[0.32em] uppercase text-[#C5A059] font-medium -mt-1 hidden sm:block">
                  Modern Indian Jewellery
                </span>
              </Link>
            </div>

            {/* DESKTOP CENTER NAVIGATION */}
            <nav className="hidden lg:flex items-center gap-7 text-[13px] font-medium tracking-wide uppercase text-[#2B2B2B]">
              <Link
                href="/"
                className={`transition hover:text-[#5C1327] py-2 relative ${
                  pathname === "/" ? "text-[#5C1327] font-semibold" : ""
                }`}
              >
                Home
                {pathname === "/" && (
                  <span className="absolute bottom-0 left-0 w-full h-[2px] bg-[#5C1327]" />
                )}
              </Link>

              {/* SHOP WITH MEGA FLYOUT */}
              <div
                className="relative py-2"
                onMouseEnter={() => setIsShopHovered(true)}
                onMouseLeave={() => setIsShopHovered(false)}
              >
                <Link
                  href="/shop"
                  className={`inline-flex items-center gap-1 transition hover:text-[#5C1327] ${
                    pathname.startsWith("/shop") ? "text-[#5C1327] font-semibold" : ""
                  }`}
                >
                  Shop
                  <ChevronDown className="w-3.5 h-3.5 opacity-70" />
                </Link>

                {isShopHovered && (
                  <div className="absolute top-full -left-20 w-[580px] bg-[#FCFBF7] border border-[#E8DFD0] rounded-xl shadow-xl p-6 grid grid-cols-2 gap-6 z-50 animate-in fade-in slide-in-from-top-2 duration-150">
                    <div>
                      <h4 className="text-[11px] font-bold text-[#C5A059] uppercase tracking-widest mb-3 border-b border-[#F0E8DC] pb-1.5">
                        Categories
                      </h4>
                      <ul className="space-y-2 text-xs normal-case">
                        {categories.slice(0, 6).map((cat) => (
                          <li key={cat.id}>
                            <Link
                              href={`/categories/${cat.slug}`}
                              className="text-[#3B3B3B] hover:text-[#5C1327] hover:translate-x-1 inline-block transition"
                            >
                              {cat.name}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <h4 className="text-[11px] font-bold text-[#C5A059] uppercase tracking-widest mb-3 border-b border-[#F0E8DC] pb-1.5">
                        Curated Edits
                      </h4>
                      <ul className="space-y-2 text-xs normal-case">
                        {categories.slice(6).map((cat) => (
                          <li key={cat.id}>
                            <Link
                              href={`/categories/${cat.slug}`}
                              className="text-[#3B3B3B] hover:text-[#5C1327] hover:translate-x-1 inline-block transition"
                            >
                              {cat.name}
                            </Link>
                          </li>
                        ))}
                        <li className="pt-2 border-t border-[#F0E8DC]">
                          <Link
                            href="/shop"
                            className="text-[#5C1327] font-semibold hover:underline inline-flex items-center gap-1"
                          >
                            Browse All 10 Categories →
                          </Link>
                        </li>
                      </ul>
                    </div>
                  </div>
                )}
              </div>

              {/* COLLECTIONS WITH DROPDOWN */}
              <div
                className="relative py-2"
                onMouseEnter={() => setIsCollectionsHovered(true)}
                onMouseLeave={() => setIsCollectionsHovered(false)}
              >
                <Link
                  href="/collections"
                  className={`inline-flex items-center gap-1 transition hover:text-[#5C1327] ${
                    pathname.startsWith("/collections") ? "text-[#5C1327] font-semibold" : ""
                  }`}
                >
                  <span>Collections</span>
                  <ChevronDown className="w-3.5 h-3.5 opacity-70" />
                </Link>

                {isCollectionsHovered && (
                  <div className="absolute top-full left-0 w-72 bg-[#FCFBF7] border border-[#E8DFD0] rounded-xl shadow-xl p-4 z-50 animate-in fade-in slide-in-from-top-2 duration-150">
                    <div className="text-[10px] font-bold text-[#C5A059] uppercase tracking-widest mb-2 px-2">
                      Active Festive Edits
                    </div>
                    <ul className="space-y-1 text-xs normal-case">
                      {seasonalCollections.map((col) => (
                        <li key={col.id}>
                          <Link
                            href={`/collections/${col.slug}`}
                            className={`flex items-center justify-between p-2 rounded-lg hover:bg-[#F3ECE1] transition ${
                              col.slug === activeCollection.slug
                                ? "bg-[#F3ECE1]/70 font-semibold text-[#5C1327]"
                                : "text-[#2B2B2B]"
                            }`}
                          >
                            <span className="flex items-center gap-1.5">
                              {col.slug === activeCollection.slug && (
                                <Sparkles className="w-3 h-3 text-[#C5A059]" />
                              )}
                              <span>{col.name}</span>
                            </span>
                            <span className="text-[10px] text-[#7A7A7A] uppercase">
                              {col.badgeText}
                            </span>
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>

              <Link
                href="/new-arrivals"
                className={`transition hover:text-[#5C1327] py-2 relative ${
                  pathname === "/new-arrivals" ? "text-[#5C1327] font-semibold" : ""
                }`}
              >
                New Arrivals
              </Link>

              <Link
                href="/best-sellers"
                className={`transition hover:text-[#5C1327] py-2 relative ${
                  pathname === "/best-sellers" ? "text-[#5C1327] font-semibold" : ""
                }`}
              >
                Best Sellers
              </Link>

              <Link
                href="/about"
                className={`transition hover:text-[#5C1327] py-2 relative ${
                  pathname === "/about" ? "text-[#5C1327] font-semibold" : ""
                }`}
              >
                About
              </Link>
            </nav>

            {/* RIGHT UTILITIES: SEARCH, WISHLIST, ACCOUNT, CART */}
            <div className="flex items-center gap-1 sm:gap-2">
              {/* Search button */}
              <button
                onClick={openSearchModal}
                className="p-2 text-[#2B2B2B] hover:text-[#5C1327] hover:bg-[#F3ECE1] rounded-full transition"
                aria-label="Search jewellery"
                title="Search jewellery"
              >
                <Search className="w-5 h-5" />
              </button>

              {/* Wishlist button */}
              <Link
                href="/wishlist"
                className="p-2 text-[#2B2B2B] hover:text-[#5C1327] hover:bg-[#F3ECE1] rounded-full transition relative"
                aria-label="View wishlist"
                title="Wishlist"
              >
                <Heart className="w-5 h-5" />
                {wishlistCount > 0 && (
                  <span className="absolute top-1 right-1 w-4 h-4 bg-[#5C1327] text-white text-[10px] font-bold rounded-full flex items-center justify-center leading-none">
                    {wishlistCount}
                  </span>
                )}
              </Link>

              {/* Account button */}
              <Link
                href="/account"
                className="p-2 text-[#2B2B2B] hover:text-[#5C1327] hover:bg-[#F3ECE1] rounded-full transition hidden sm:inline-flex"
                aria-label="Customer account"
                title="Account & Orders"
              >
                <User className="w-5 h-5" />
              </Link>

              {/* Cart button */}
              <button
                onClick={openCartDrawer}
                className="p-2 text-[#2B2B2B] hover:text-[#5C1327] hover:bg-[#F3ECE1] rounded-full transition relative flex items-center"
                aria-label="Open shopping cart"
                title="Shopping Bag"
              >
                <ShoppingBag className="w-5 h-5" />
                {totalItemCount > 0 && (
                  <span className="absolute top-1 right-1 w-4 h-4 bg-[#C5A059] text-[#1F1F1F] text-[10px] font-bold rounded-full flex items-center justify-center leading-none shadow-sm">
                    {totalItemCount}
                  </span>
                )}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* MOBILE NAVIGATION DRAWER */}
      <MobileNav
        isOpen={isMobileNavOpen}
        onClose={() => setIsMobileNavOpen(false)}
      />
    </>
  );
}
