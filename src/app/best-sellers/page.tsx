import React from "react";
import Link from "next/link";
import { Flame, ChevronRight } from "lucide-react";
import { products } from "../../lib/data/products";
import ProductCard from "../../components/product/ProductCard";

export const metadata = {
  title: "Best Sellers | Most Loved Jewellery",
  description: "Shop top customer-rated Indian jewellery favorites at Sevak Creation. Restocked by popular festive demand.",
};

export default function BestSellersPage() {
  const bestSellers = products.filter((p) => p.isBestSeller);

  return (
    <div className="py-8 sm:py-12 bg-[#FCFBF7] min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <nav className="flex items-center gap-2 text-xs text-[#8A8A8A] uppercase tracking-wider mb-6">
          <Link href="/" className="hover:text-[#5C1327]">
            Home
          </Link>
          <ChevronRight className="w-3 h-3" />
          <span className="text-[#1F1F1F] font-semibold">Best Sellers</span>
        </nav>

        <div className="mb-10 text-center max-w-xl mx-auto">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#FAF6F0] text-amber-700 text-xs font-bold uppercase tracking-widest mb-2 border border-[#ECE4D8]">
            <Flame className="w-3.5 h-3.5 text-amber-600" />
            <span>Customer Favorites</span>
          </div>
          <h1 className="font-brand-serif text-3xl sm:text-4xl text-[#1F1F1F]">
            Best Selling Jewellery
          </h1>
          <div className="w-12 h-0.5 bg-[#5C1327] mx-auto my-3" />
          <p className="text-xs sm:text-sm text-[#666]">
            Our most frequently reviewed and loved ornaments, trusted by customers across India for quality and comfort.
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
          {bestSellers.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      </div>
    </div>
  );
}
