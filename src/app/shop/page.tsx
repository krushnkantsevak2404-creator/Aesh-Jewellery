"use client";

import React, { useState, useMemo, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import {
  SlidersHorizontal,
  X,
  Sparkles,
  ChevronDown,
  RotateCcw,
} from "lucide-react";
import { products } from "../../lib/data/products";
import { categories } from "../../lib/data/categories";
import ProductCard from "../../components/product/ProductCard";

function ShopContent() {
  const searchParams = useSearchParams();

  // Read initial query params
  const initialCategory = searchParams.get("category") || "all";
  const initialOccasion = searchParams.get("occasion") || "all";
  const initialSort = searchParams.get("sort") || "featured";

  const [selectedCategory, setSelectedCategory] = useState(initialCategory);
  const [selectedOccasion, setSelectedOccasion] = useState(initialOccasion);
  const [selectedPriceRange, setSelectedPriceRange] = useState("all");
  const [inStockOnly, setInStockOnly] = useState(false);
  const [sortBy, setSortBy] = useState(initialSort);
  const [isMobileFiltersOpen, setIsMobileFiltersOpen] = useState(false);

  // Price ranges options
  const priceOptions = [
    { label: "All Prices", value: "all" },
    { label: "Under ₹500", value: "under-500", min: 0, max: 500 },
    { label: "₹500 to ₹1,000", value: "500-1000", min: 500, max: 1000 },
    { label: "₹1,000 to ₹1,500", value: "1000-1500", min: 1000, max: 1500 },
    { label: "Above ₹1,500", value: "above-1500", min: 1500, max: Infinity },
  ];

  const occasionsList = [
    { label: "All Occasions", value: "all" },
    { label: "Navratri", value: "navratri" },
    { label: "Diwali", value: "diwali" },
    { label: "Wedding & Shaadi", value: "wedding" },
    { label: "Everyday Wear", value: "everyday" },
    { label: "Gifting", value: "gifting" },
    { label: "Festive Soiree", value: "festive" },
  ];

  // Filtering & sorting logic
  const filteredProducts = useMemo(() => {
    return products
      .filter((product) => {
        // Category filter
        if (selectedCategory !== "all" && product.categorySlug !== selectedCategory) {
          return false;
        }

        // Occasion filter
        if (selectedOccasion !== "all" && !product.occasions.includes(selectedOccasion as any)) {
          return false;
        }

        // Stock filter
        if (inStockOnly && product.stock <= 0) {
          return false;
        }

        // Price filter
        if (selectedPriceRange !== "all") {
          const opt = priceOptions.find((p) => p.value === selectedPriceRange);
          if (opt && opt.min !== undefined && opt.max !== undefined) {
            if (product.price < opt.min || product.price > opt.max) {
              return false;
            }
          }
        }

        return true;
      })
      .sort((a, b) => {
        if (sortBy === "price-low") return a.price - b.price;
        if (sortBy === "price-high") return b.price - a.price;
        if (sortBy === "rating") return b.rating - a.rating;
        if (sortBy === "newest") return (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0);
        // Default to featured / bestseller
        return (b.isBestSeller ? 1 : 0) - (a.isBestSeller ? 1 : 0);
      });
  }, [selectedCategory, selectedOccasion, selectedPriceRange, inStockOnly, sortBy]);

  const resetFilters = () => {
    setSelectedCategory("all");
    setSelectedOccasion("all");
    setSelectedPriceRange("all");
    setInStockOnly(false);
    setSortBy("featured");
  };

  const hasActiveFilters =
    selectedCategory !== "all" ||
    selectedOccasion !== "all" ||
    selectedPriceRange !== "all" ||
    inStockOnly;

  return (
    <div className="py-8 sm:py-12 bg-[#FCFBF7] min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb & Header */}
        <div className="mb-8 border-b border-[#ECE4D8] pb-6">
          <div className="text-xs text-[#8A8A8A] uppercase tracking-wider mb-2">
            Home / Shop
          </div>
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div>
              <h1 className="font-brand-serif text-3xl sm:text-4xl text-[#1F1F1F]">
                The Complete Jewellery Collection
              </h1>
              <p className="text-xs sm:text-sm text-[#666] mt-1">
                Explore hand-finished oxidized jhumkas, chokers, haathphool, and modern Indian adornments.
              </p>
            </div>

            <div className="text-xs font-semibold text-[#8A8A8A]">
              Showing <span className="text-[#5C1327] font-bold">{filteredProducts.length}</span> pieces
            </div>
          </div>
        </div>

        {/* Layout: Sidebar Filters + Main Product Grid */}
        <div className="flex flex-col lg:flex-row gap-8 items-start">
          {/* MOBILE FILTER TRIGGER BAR */}
          <div className="w-full lg:hidden flex items-center justify-between p-3.5 bg-[#FAF6F0] rounded-xl border border-[#ECE4D8]">
            <button
              onClick={() => setIsMobileFiltersOpen(true)}
              className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#1F1F1F]"
            >
              <SlidersHorizontal className="w-4 h-4 text-[#5C1327]" />
              <span>Filter Products {hasActiveFilters && "•"}</span>
            </button>

            {/* Sort selector */}
            <div className="relative">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="bg-transparent text-xs font-semibold text-[#1F1F1F] pr-6 focus:outline-hidden"
              >
                <option value="featured">Sort: Featured</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="rating">Highest Rated</option>
                <option value="newest">Newest Arrivals</option>
              </select>
            </div>
          </div>

          {/* DESKTOP SIDEBAR FILTERS */}
          <aside className="hidden lg:block w-64 shrink-0 space-y-6 p-5 bg-[#FAF6F0] rounded-2xl border border-[#ECE4D8] sticky top-24">
            <div className="flex items-center justify-between pb-3 border-b border-[#E8DFD0]">
              <h3 className="font-brand-serif text-base font-bold text-[#1F1F1F] flex items-center gap-2">
                <SlidersHorizontal className="w-4 h-4 text-[#5C1327]" />
                Filters
              </h3>
              {hasActiveFilters && (
                <button
                  onClick={resetFilters}
                  className="text-[11px] text-[#5C1327] hover:underline font-semibold flex items-center gap-1"
                >
                  <RotateCcw className="w-3 h-3" />
                  Reset
                </button>
              )}
            </div>

            {/* Categories */}
            <div>
              <h4 className="text-xs font-bold text-[#C5A059] uppercase tracking-wider mb-2.5">
                Categories
              </h4>
              <div className="space-y-1.5 text-xs">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="radio"
                    name="category"
                    checked={selectedCategory === "all"}
                    onChange={() => setSelectedCategory("all")}
                    className="accent-[#5C1327]"
                  />
                  <span className={selectedCategory === "all" ? "font-bold text-[#5C1327]" : "text-[#4A4A4A]"}>
                    All Categories ({products.length})
                  </span>
                </label>
                {categories.map((cat) => (
                  <label key={cat.id} className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="radio"
                      name="category"
                      checked={selectedCategory === cat.slug}
                      onChange={() => setSelectedCategory(cat.slug)}
                      className="accent-[#5C1327]"
                    />
                    <span className={selectedCategory === cat.slug ? "font-bold text-[#5C1327]" : "text-[#4A4A4A]"}>
                      {cat.name}
                    </span>
                  </label>
                ))}
              </div>
            </div>

            {/* Occasions */}
            <div className="pt-4 border-t border-[#E8DFD0]">
              <h4 className="text-xs font-bold text-[#C5A059] uppercase tracking-wider mb-2.5">
                Occasion / Season
              </h4>
              <div className="space-y-1.5 text-xs">
                {occasionsList.map((occ) => (
                  <label key={occ.value} className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="radio"
                      name="occasion"
                      checked={selectedOccasion === occ.value}
                      onChange={() => setSelectedOccasion(occ.value)}
                      className="accent-[#5C1327]"
                    />
                    <span className={selectedOccasion === occ.value ? "font-bold text-[#5C1327]" : "text-[#4A4A4A]"}>
                      {occ.label}
                    </span>
                  </label>
                ))}
              </div>
            </div>

            {/* Price Ranges */}
            <div className="pt-4 border-t border-[#E8DFD0]">
              <h4 className="text-xs font-bold text-[#C5A059] uppercase tracking-wider mb-2.5">
                Price Filter
              </h4>
              <div className="space-y-1.5 text-xs">
                {priceOptions.map((opt) => (
                  <label key={opt.value} className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="radio"
                      name="priceRange"
                      checked={selectedPriceRange === opt.value}
                      onChange={() => setSelectedPriceRange(opt.value)}
                      className="accent-[#5C1327]"
                    />
                    <span className={selectedPriceRange === opt.value ? "font-bold text-[#5C1327]" : "text-[#4A4A4A]"}>
                      {opt.label}
                    </span>
                  </label>
                ))}
              </div>
            </div>

            {/* In Stock Toggle */}
            <div className="pt-4 border-t border-[#E8DFD0]">
              <label className="flex items-center gap-2 text-xs font-medium cursor-pointer text-[#2B2B2B]">
                <input
                  type="checkbox"
                  checked={inStockOnly}
                  onChange={(e) => setInStockOnly(e.target.checked)}
                  className="accent-[#5C1327] rounded"
                />
                <span>In Stock Items Only</span>
              </label>
            </div>
          </aside>

          {/* MAIN PRODUCT GRID CONTAINER */}
          <main className="flex-1 w-full">
            {/* Desktop Sort Controls */}
            <div className="hidden lg:flex items-center justify-between mb-6 pb-3 border-b border-[#E8DFD0]">
              <div className="flex items-center gap-2 text-xs text-[#666]">
                {hasActiveFilters && (
                  <span className="bg-[#EFE8DC] text-[#4A0E17] px-2.5 py-1 rounded-md font-semibold text-[11px]">
                    Filtered Results
                  </span>
                )}
              </div>

              <div className="flex items-center gap-2">
                <span className="text-xs text-[#8A8A8A]">Sort by:</span>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="bg-white border border-[#D5CABB] text-xs font-semibold text-[#1F1F1F] rounded-lg px-3 py-1.5 focus:outline-hidden focus:border-[#5C1327]"
                >
                  <option value="featured">Featured / Best Sellers</option>
                  <option value="price-low">Price: Low to High</option>
                  <option value="price-high">Price: High to Low</option>
                  <option value="rating">Highest Rated</option>
                  <option value="newest">Newest Arrivals</option>
                </select>
              </div>
            </div>

            {/* PRODUCT GRID: Desktop 4, Tablet 3, Mobile 2 */}
            {filteredProducts.length > 0 ? (
              <div className="grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-4 gap-3.5 sm:gap-6">
                {filteredProducts.map((product, idx) => (
                  <ProductCard
                    key={product.id}
                    product={product}
                    priority={idx < 4}
                  />
                ))}
              </div>
            ) : (
              <div className="py-20 text-center bg-[#FAF6F0] rounded-2xl border border-[#ECE4D8] p-8">
                <Sparkles className="w-10 h-10 text-[#C5A059] mx-auto mb-3" />
                <h3 className="font-brand-serif text-xl font-bold text-[#1F1F1F] mb-1">
                  No matching jewellery found
                </h3>
                <p className="text-xs text-[#666] max-w-sm mx-auto mb-6">
                  We could not find items matching your selected criteria. Try resetting the filters to view our full collection.
                </p>
                <button
                  onClick={resetFilters}
                  className="px-6 py-2.5 rounded-xl bg-[#5C1327] text-white text-xs font-semibold hover:bg-[#4A0E17] transition"
                >
                  Reset All Filters
                </button>
              </div>
            )}
          </main>
        </div>
      </div>

      {/* MOBILE FILTERS MODAL DRAWER */}
      {isMobileFiltersOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div
            className="fixed inset-0 bg-black/60 backdrop-blur-xs"
            onClick={() => setIsMobileFiltersOpen(false)}
          />
          <div className="fixed inset-y-0 right-0 max-w-xs w-full bg-[#FCFBF7] shadow-2xl flex flex-col z-50 p-5 overflow-y-auto">
            <div className="flex items-center justify-between pb-4 border-b border-[#E8DFD0]">
              <h3 className="font-brand-serif text-lg font-bold text-[#1F1F1F]">
                Filter Jewellery
              </h3>
              <button
                onClick={() => setIsMobileFiltersOpen(false)}
                className="p-1.5 text-[#5C1327]"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Filter Content */}
            <div className="py-4 space-y-6 text-xs flex-1">
              <div>
                <h4 className="font-bold text-[#C5A059] uppercase tracking-wider mb-2">
                  Category
                </h4>
                <div className="space-y-1.5">
                  <label className="flex items-center gap-2">
                    <input
                      type="radio"
                      name="m-cat"
                      checked={selectedCategory === "all"}
                      onChange={() => setSelectedCategory("all")}
                      className="accent-[#5C1327]"
                    />
                    <span>All Categories</span>
                  </label>
                  {categories.map((c) => (
                    <label key={c.id} className="flex items-center gap-2">
                      <input
                        type="radio"
                        name="m-cat"
                        checked={selectedCategory === c.slug}
                        onChange={() => setSelectedCategory(c.slug)}
                        className="accent-[#5C1327]"
                      />
                      <span>{c.name}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div>
                <h4 className="font-bold text-[#C5A059] uppercase tracking-wider mb-2">
                  Occasion
                </h4>
                <div className="space-y-1.5">
                  {occasionsList.map((o) => (
                    <label key={o.value} className="flex items-center gap-2">
                      <input
                        type="radio"
                        name="m-occ"
                        checked={selectedOccasion === o.value}
                        onChange={() => setSelectedOccasion(o.value)}
                        className="accent-[#5C1327]"
                      />
                      <span>{o.label}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div>
                <h4 className="font-bold text-[#C5A059] uppercase tracking-wider mb-2">
                  Price
                </h4>
                <div className="space-y-1.5">
                  {priceOptions.map((p) => (
                    <label key={p.value} className="flex items-center gap-2">
                      <input
                        type="radio"
                        name="m-price"
                        checked={selectedPriceRange === p.value}
                        onChange={() => setSelectedPriceRange(p.value)}
                        className="accent-[#5C1327]"
                      />
                      <span>{p.label}</span>
                    </label>
                  ))}
                </div>
              </div>
            </div>

            {/* Modal Bottom Actions */}
            <div className="pt-4 border-t border-[#E8DFD0] space-y-2">
              <button
                onClick={() => setIsMobileFiltersOpen(false)}
                className="w-full py-3 rounded-xl bg-[#5C1327] text-white text-xs font-bold uppercase tracking-wider"
              >
                Apply Filters ({filteredProducts.length})
              </button>
              {hasActiveFilters && (
                <button
                  onClick={resetFilters}
                  className="w-full py-2 text-center text-xs text-[#5C1327] font-semibold"
                >
                  Reset All Filters
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default function ShopPage() {
  return (
    <Suspense
      fallback={
        <div className="py-24 text-center text-sm text-[#888]">
          Loading Sevak Creation Collection...
        </div>
      }
    >
      <ShopContent />
    </Suspense>
  );
}
