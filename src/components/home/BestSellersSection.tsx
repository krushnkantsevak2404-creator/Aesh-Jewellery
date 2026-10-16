import React from "react";
import Link from "next/link";
import { ArrowRight, Flame } from "lucide-react";
import { products } from "../../lib/data/products";
import ProductCard from "../product/ProductCard";

export default function BestSellersSection() {
  const bestSellers = products.filter((p) => p.isBestSeller).slice(0, 4);

  return (
    <section className="py-16 sm:py-24 bg-[#F8F4EC] border-y border-[#ECE4D8]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-10 sm:mb-12 gap-4">
          <div>
            <span className="text-xs uppercase tracking-[0.25em] text-[#C5A059] font-bold flex items-center gap-1.5">
              <Flame className="w-3.5 h-3.5 text-amber-600" />
              Most Loved Pieces
            </span>
            <h2 className="font-brand-serif text-3xl sm:text-4xl text-[#1F1F1F] mt-1.5">
              Best Sellers
            </h2>
            <p className="text-xs sm:text-sm text-[#666] mt-1">
              Top customer-rated ornaments restocked by popular demand.
            </p>
          </div>

          <Link
            href="/best-sellers"
            className="text-xs font-bold text-[#5C1327] hover:underline uppercase tracking-wider flex items-center gap-1 self-start sm:self-auto"
          >
            <span>View All Best Sellers</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
          {bestSellers.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
}
