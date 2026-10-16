"use client";

import React, { useRef } from "react";
import Link from "next/link";
import { ChevronLeft, ChevronRight, TrendingUp } from "lucide-react";
import { products } from "../../lib/data/products";
import ProductCard from "../product/ProductCard";

export default function TrendingCarousel() {
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: "left" | "right") => {
    if (scrollContainerRef.current) {
      const offset = direction === "left" ? -340 : 340;
      scrollContainerRef.current.scrollBy({ left: offset, behavior: "smooth" });
    }
  };

  const trendingProducts = products.filter(
    (p) => p.isFeatured || p.isBestSeller || p.rating >= 4.8
  );

  return (
    <section className="py-16 sm:py-24 bg-[#FCFBF7]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 sm:mb-12 gap-4">
          <div>
            <div className="flex items-center gap-1.5 text-xs uppercase tracking-[0.2em] text-[#C5A059] font-bold">
              <TrendingUp className="w-3.5 h-3.5" />
              <span>Customer Favorites</span>
            </div>
            <h2 className="font-brand-serif text-3xl sm:text-4xl text-[#1F1F1F] mt-1.5">
              Trending Now
            </h2>
          </div>

          <div className="flex items-center gap-3">
            <Link
              href="/shop"
              className="text-xs font-bold text-[#5C1327] hover:underline uppercase tracking-wider mr-2 hidden sm:inline"
            >
              View All ({products.length})
            </Link>
            <button
              onClick={() => scroll("left")}
              className="w-10 h-10 rounded-full border border-[#D5CABB] bg-white hover:bg-[#F3ECE1] text-[#1F1F1F] flex items-center justify-center transition shadow-2xs"
              aria-label="Scroll left"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={() => scroll("right")}
              className="w-10 h-10 rounded-full border border-[#D5CABB] bg-white hover:bg-[#F3ECE1] text-[#1F1F1F] flex items-center justify-center transition shadow-2xs"
              aria-label="Scroll right"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Carousel Scroll Container */}
        <div
          ref={scrollContainerRef}
          className="flex gap-5 sm:gap-6 overflow-x-auto pb-6 scrollbar-none snap-x snap-mandatory"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        >
          {trendingProducts.map((product) => (
            <div
              key={product.id}
              className="w-[260px] sm:w-[280px] shrink-0 snap-start"
            >
              <ProductCard product={product} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
