import React from "react";
import Link from "next/link";
import { Sparkles, ChevronRight } from "lucide-react";
import { products } from "../../lib/data/products";
import ProductCard from "../../components/product/ProductCard";

export const metadata = {
  title: "New Arrivals | Fresh Jewellery Drops",
  description: "Discover the latest handcrafted arrivals at Sevak Creation. Oxidized jhumkas, chokers, and festive accessories.",
};

export default function NewArrivalsPage() {
  const newProducts = products.filter((p) => p.isNew);

  return (
    <div className="py-8 sm:py-12 bg-[#FCFBF7] min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <nav className="flex items-center gap-2 text-xs text-[#8A8A8A] uppercase tracking-wider mb-6">
          <Link href="/" className="hover:text-[#5C1327]">
            Home
          </Link>
          <ChevronRight className="w-3 h-3" />
          <span className="text-[#1F1F1F] font-semibold">New Arrivals</span>
        </nav>

        <div className="mb-10 text-center max-w-xl mx-auto">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#FAF6F0] text-[#C5A059] text-xs font-bold uppercase tracking-widest mb-2 border border-[#ECE4D8]">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Latest Drops</span>
          </div>
          <h1 className="font-brand-serif text-3xl sm:text-4xl text-[#1F1F1F]">
            Fresh Arrivals
          </h1>
          <div className="w-12 h-0.5 bg-[#5C1327] mx-auto my-3" />
          <p className="text-xs sm:text-sm text-[#666]">
            Just crafted and added to our catalog. Limited-edition pieces designed to bring contemporary festive sparkle.
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
          {newProducts.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      </div>
    </div>
  );
}
