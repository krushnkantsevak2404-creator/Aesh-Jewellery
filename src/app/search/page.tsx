"use client";

import React, { useState, useMemo, Suspense } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Search, Sparkles, ArrowRight } from "lucide-react";
import { products } from "../../lib/data/products";
import { categories } from "../../lib/data/categories";
import ProductCard from "../../components/product/ProductCard";

function SearchPageContent() {
  const searchParams = useSearchParams();
  const initialQuery = searchParams.get("q") || "";

  const [searchQuery, setSearchQuery] = useState(initialQuery);

  const trimmed = searchQuery.trim().toLowerCase();

  // Matched products
  const matchedProducts = useMemo(() => {
    if (!trimmed) return [];
    return products.filter((p) => {
      const combined = `${p.name} ${p.category} ${p.subcategory} ${p.tags.join(" ")} ${p.material} ${p.description}`.toLowerCase();
      return combined.includes(trimmed);
    });
  }, [trimmed]);

  // Matched categories
  const matchedCategories = useMemo(() => {
    if (!trimmed) return [];
    return categories.filter((c) =>
      c.name.toLowerCase().includes(trimmed) || c.description.toLowerCase().includes(trimmed)
    );
  }, [trimmed]);

  const popularSearches = [
    "Oxidized earrings",
    "Navratri necklace",
    "Ked Kandoro",
    "Haathphool",
    "Surya ring",
    "Choker set",
  ];

  return (
    <div className="py-10 sm:py-16 bg-[#FCFBF7] min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Search Input Bar */}
        <div className="max-w-2xl mx-auto mb-12">
          <div className="text-center mb-6">
            <span className="text-xs uppercase tracking-widest text-[#C5A059] font-bold">
              Product Finder
            </span>
            <h1 className="font-brand-serif text-3xl sm:text-4xl text-[#1F1F1F] mt-1">
              Search Results
            </h1>
          </div>

          <div className="relative">
            <Search className="w-5 h-5 text-[#888] absolute left-4 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search jhumkas, necklaces, ked kandoro, haathphool..."
              className="w-full pl-12 pr-4 py-3.5 rounded-2xl border border-[#D5CABB] bg-white text-sm text-[#1F1F1F] placeholder-[#888] focus:outline-hidden focus:border-[#5C1327] shadow-xs"
            />
          </div>

          {/* Popular Search Chips */}
          <div className="flex items-center gap-2 flex-wrap mt-3 text-xs text-[#666]">
            <span className="font-medium">Trending:</span>
            {popularSearches.map((term, i) => (
              <button
                key={i}
                onClick={() => setSearchQuery(term)}
                className="px-2.5 py-1 rounded-full bg-[#F3ECE1] hover:bg-[#E8DFD0] text-[#2B2B2B] transition cursor-pointer"
              >
                {term}
              </button>
            ))}
          </div>
        </div>

        {/* Results */}
        {trimmed ? (
          <div>
            <div className="flex items-center justify-between pb-4 border-b border-[#ECE4D8] mb-8">
              <h2 className="text-sm font-semibold text-[#1F1F1F]">
                Results for &ldquo;<span className="text-[#5C1327] font-bold">{searchQuery}</span>&rdquo; (
                {matchedProducts.length})
              </h2>
            </div>

            {/* Matched Categories */}
            {matchedCategories.length > 0 && (
              <div className="mb-8 p-4 bg-[#FAF6F0] rounded-2xl border border-[#ECE4D8]">
                <h3 className="text-xs font-bold uppercase tracking-wider text-[#C5A059] mb-3">
                  Matching Categories
                </h3>
                <div className="flex flex-wrap gap-3">
                  {matchedCategories.map((c) => (
                    <Link
                      key={c.id}
                      href={`/categories/${c.slug}`}
                      className="px-4 py-2 bg-white rounded-xl border border-[#D5CABB] text-xs font-semibold text-[#1F1F1F] hover:text-[#5C1327] hover:border-[#5C1327] transition flex items-center gap-1.5"
                    >
                      <span>{c.name}</span>
                      <ArrowRight className="w-3 h-3 text-[#A0A0A0]" />
                    </Link>
                  ))}
                </div>
              </div>
            )}

            {matchedProducts.length > 0 ? (
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
                {matchedProducts.map((p) => (
                  <ProductCard key={p.id} product={p} />
                ))}
              </div>
            ) : (
              <div className="py-16 text-center bg-[#FAF6F0] rounded-2xl border border-[#ECE4D8] p-8 max-w-md mx-auto">
                <Sparkles className="w-8 h-8 text-[#C5A059] mx-auto mb-3" />
                <h3 className="font-brand-serif text-lg font-bold text-[#1F1F1F] mb-1">
                  No matching jewellery found
                </h3>
                <p className="text-xs text-[#666] mb-6">
                  Try searching for general keywords like &quot;earrings&quot;, &quot;oxidized&quot;, &quot;jhumka&quot;, or browse our best sellers.
                </p>
                <Link
                  href="/shop"
                  className="px-6 py-2.5 rounded-xl bg-[#5C1327] text-white text-xs font-semibold hover:bg-[#4A0E17] transition"
                >
                  View All Products
                </Link>
              </div>
            )}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-sm text-[#888]">
              Type a product name or category above to discover our collection.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

export default function SearchPage() {
  return (
    <Suspense
      fallback={
        <div className="py-24 text-center text-sm text-[#888]">
          Loading Search...
        </div>
      }
    >
      <SearchPageContent />
    </Suspense>
  );
}
