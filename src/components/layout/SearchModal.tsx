"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Search, X, Clock, ArrowRight, Sparkles } from "lucide-react";
import { useStore } from "../../context/StoreContext";
import { products } from "../../lib/data/products";
import { categories } from "../../lib/data/categories";
import { formatINR } from "../../lib/utils";
import Image from "next/image";

export default function SearchModal() {
  const router = useRouter();
  const {
    isSearchModalOpen,
    closeSearchModal,
    recentSearches,
    addRecentSearch,
    clearRecentSearches,
  } = useStore();

  const [searchTerm, setSearchTerm] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isSearchModalOpen) {
      setTimeout(() => inputRef.current?.focus(), 80);
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
      setSearchTerm("");
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isSearchModalOpen]);

  // Handle escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isSearchModalOpen) {
        closeSearchModal();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isSearchModalOpen, closeSearchModal]);

  if (!isSearchModalOpen) return null;

  const popularSuggestions = [
    "Oxidized earrings",
    "Navratri necklace",
    "Ked Kandoro",
    "Haathphool",
    "Surya ring",
    "Kundan choker",
  ];

  const trimmed = searchTerm.trim().toLowerCase();

  // Matched products
  const matchedProducts = trimmed
    ? products
        .filter((p) => {
          const combined = `${p.name} ${p.category} ${p.subcategory} ${p.tags.join(" ")} ${p.material} ${p.description}`.toLowerCase();
          return combined.includes(trimmed);
        })
        .slice(0, 5)
    : [];

  // Matched categories
  const matchedCategories = trimmed
    ? categories
        .filter((c) => c.name.toLowerCase().includes(trimmed) || c.description.toLowerCase().includes(trimmed))
        .slice(0, 3)
    : [];

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchTerm.trim()) return;
    addRecentSearch(searchTerm.trim());
    closeSearchModal();
    router.push(`/search?q=${encodeURIComponent(searchTerm.trim())}`);
  };

  const handleSuggestionClick = (term: string) => {
    addRecentSearch(term);
    closeSearchModal();
    router.push(`/search?q=${encodeURIComponent(term)}`);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/60 backdrop-blur-xs transition-opacity"
        onClick={closeSearchModal}
      />

      <div className="relative min-h-screen px-4 flex items-start justify-center pt-16 sm:pt-24 pb-12">
        <div
          className="relative w-full max-w-2xl bg-[#FCFBF7] rounded-2xl shadow-2xl border border-[#E8DFD0] overflow-hidden animate-in fade-in zoom-in-95 duration-200"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Search Header Form */}
          <form
            onSubmit={handleSearchSubmit}
            className="flex items-center px-5 py-4 border-b border-[#E8DFD0] bg-[#FAF6F0]"
          >
            <Search className="w-5 h-5 text-[#8A8A8A] mr-3" />
            <input
              ref={inputRef}
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search earrings, necklaces, ked kandoro, rings..."
              className="w-full bg-transparent border-none text-base text-[#1F1F1F] placeholder-[#8A8A8A] focus:outline-hidden"
            />
            {searchTerm && (
              <button
                type="button"
                onClick={() => setSearchTerm("")}
                className="p-1 text-[#8A8A8A] hover:text-[#1F1F1F] rounded-full mr-2"
              >
                <X className="w-4 h-4" />
              </button>
            )}
            <button
              type="button"
              onClick={closeSearchModal}
              className="p-1.5 text-[#5C1327] hover:bg-[#E8DFD0]/40 rounded-lg text-xs font-semibold uppercase tracking-wider"
            >
              ESC
            </button>
          </form>

          {/* Modal Body */}
          <div className="p-5 max-h-[65vh] overflow-y-auto space-y-6">
            {trimmed ? (
              // Active search results
              <div>
                {matchedCategories.length > 0 && (
                  <div className="mb-5">
                    <h5 className="text-[11px] font-bold text-[#C5A059] uppercase tracking-wider mb-2">
                      Categories
                    </h5>
                    <div className="flex flex-wrap gap-2">
                      {matchedCategories.map((c) => (
                        <Link
                          key={c.id}
                          href={`/categories/${c.slug}`}
                          onClick={closeSearchModal}
                          className="px-3 py-1.5 bg-[#F3ECE1] hover:bg-[#5C1327] hover:text-white rounded-lg text-xs font-medium text-[#2B2B2B] transition"
                        >
                          {c.name}
                        </Link>
                      ))}
                    </div>
                  </div>
                )}

                {matchedProducts.length > 0 ? (
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <h5 className="text-[11px] font-bold text-[#C5A059] uppercase tracking-wider">
                        Matching Jewellery ({matchedProducts.length})
                      </h5>
                      <button
                        type="button"
                        onClick={handleSearchSubmit}
                        className="text-xs text-[#5C1327] font-semibold hover:underline flex items-center gap-1"
                      >
                        View all results <ArrowRight className="w-3 h-3" />
                      </button>
                    </div>

                    <div className="space-y-2.5">
                      {matchedProducts.map((product) => (
                        <Link
                          key={product.id}
                          href={`/product/${product.slug}`}
                          onClick={() => {
                            addRecentSearch(product.name);
                            closeSearchModal();
                          }}
                          className="flex items-center gap-3.5 p-2.5 rounded-xl hover:bg-[#F3ECE1] transition group"
                        >
                          <div className="w-14 h-14 rounded-lg overflow-hidden bg-[#ECE6DC] shrink-0 relative">
                            <Image
                              src={product.thumbnail}
                              alt={product.name}
                              fill
                              sizes="56px"
                              className="object-cover group-hover:scale-105 transition duration-300"
                            />
                          </div>
                          <div className="flex-1 min-w-0">
                            <h4 className="text-sm font-medium text-[#1F1F1F] group-hover:text-[#5C1327] truncate transition">
                              {product.name}
                            </h4>
                            <p className="text-xs text-[#7A7A7A]">
                              {product.category} • {product.colour}
                            </p>
                          </div>
                          <div className="text-right shrink-0">
                            <span className="text-sm font-semibold text-[#4A0E17]">
                              {formatINR(product.price)}
                            </span>
                            {product.compareAtPrice > product.price && (
                              <div className="text-[11px] text-[#8A8A8A] line-through">
                                {formatINR(product.compareAtPrice)}
                              </div>
                            )}
                          </div>
                        </Link>
                      ))}
                    </div>
                  </div>
                ) : (
                  <div className="py-8 text-center">
                    <p className="text-sm text-[#4A4A4A]">
                      No exact matches found for &ldquo;<span className="font-semibold">{searchTerm}</span>&rdquo;.
                    </p>
                    <p className="text-xs text-[#7A7A7A] mt-1">
                      Try searching for &quot;earrings&quot;, &quot;oxidized&quot;, or &quot;festive&quot;.
                    </p>
                  </div>
                )}
              </div>
            ) : (
              // Initial State: Recent searches & popular suggestions
              <div className="space-y-6">
                {recentSearches.length > 0 && (
                  <div>
                    <div className="flex items-center justify-between mb-2.5">
                      <h5 className="text-[11px] font-bold text-[#C5A059] uppercase tracking-wider flex items-center gap-1.5">
                        <Clock className="w-3.5 h-3.5" /> Recent Searches
                      </h5>
                      <button
                        onClick={clearRecentSearches}
                        className="text-[11px] text-[#7A7A7A] hover:text-[#5C1327] transition"
                      >
                        Clear
                      </button>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {recentSearches.map((term, i) => (
                        <button
                          key={i}
                          onClick={() => handleSuggestionClick(term)}
                          className="px-3 py-1.5 bg-[#F3ECE1] hover:bg-[#E8DFD0] rounded-full text-xs text-[#2B2B2B] transition"
                        >
                          {term}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                <div>
                  <h5 className="text-[11px] font-bold text-[#C5A059] uppercase tracking-wider mb-2.5 flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5" /> Popular Searches
                  </h5>
                  <div className="flex flex-wrap gap-2">
                    {popularSuggestions.map((term, i) => (
                      <button
                        key={i}
                        onClick={() => handleSuggestionClick(term)}
                        className="px-3 py-1.5 border border-[#DED4C5] hover:border-[#5C1327] hover:text-[#5C1327] rounded-full text-xs text-[#4A4A4A] transition"
                      >
                        {term}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Popular categories */}
                <div className="pt-2 border-t border-[#E8DFD0]">
                  <h5 className="text-[11px] font-bold text-[#C5A059] uppercase tracking-wider mb-3">
                    Shop by Popular Categories
                  </h5>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                    {categories.slice(0, 6).map((cat) => (
                      <Link
                        key={cat.id}
                        href={`/categories/${cat.slug}`}
                        onClick={closeSearchModal}
                        className="p-2.5 rounded-xl bg-[#FAF6F0] hover:bg-[#F3ECE1] text-xs font-medium text-[#2B2B2B] hover:text-[#5C1327] transition flex items-center justify-between"
                      >
                        <span>{cat.name}</span>
                        <ArrowRight className="w-3 h-3 text-[#A0A0A0]" />
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
