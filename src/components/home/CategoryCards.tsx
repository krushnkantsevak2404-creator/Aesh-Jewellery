import React from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { categories } from "../../lib/data/categories";

export default function CategoryCards() {
  return (
    <section className="py-16 sm:py-24 bg-[#FCFBF7]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-12 sm:mb-16">
          <span className="text-xs uppercase tracking-[0.25em] text-[#C5A059] font-bold">
            Curated Catalog
          </span>
          <h2 className="font-brand-serif text-3xl sm:text-4xl text-[#1F1F1F] mt-2 mb-3">
            Shop by Category
          </h2>
          <div className="w-12 h-0.5 bg-[#5C1327] mx-auto mb-4" />
          <p className="text-sm text-[#666] leading-relaxed">
            From intricate oxidized jhumkas to traditional Gujarati ked kandoros, explore adornments handcrafted to elevate your personal style.
          </p>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 sm:gap-6">
          {categories.map((category) => (
            <Link
              key={category.id}
              href={`/categories/${category.slug}`}
              className="group flex flex-col bg-[#FAF6F0] rounded-2xl overflow-hidden border border-[#ECE4D8] hover:border-[#C5A059] hover:shadow-lg transition-all duration-300"
            >
              {/* Category Image */}
              <div className="relative aspect-4/5 w-full bg-[#E8DFD0] overflow-hidden">
                <Image
                  src={category.image}
                  alt={category.name}
                  fill
                  sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 20vw"
                  className="object-cover group-hover:scale-108 transition-transform duration-700 ease-out"
                />
                <div className="absolute inset-0 bg-linear-to-t from-black/60 via-transparent to-transparent opacity-60 group-hover:opacity-40 transition-opacity" />

                <div className="absolute bottom-3 left-3 right-3 text-white">
                  <span className="text-[10px] tracking-widest uppercase font-semibold text-[#E5C46B]">
                    {category.itemCount} Designs
                  </span>
                </div>
              </div>

              {/* Content */}
              <div className="p-3.5 sm:p-4 flex flex-col flex-1 justify-between bg-white">
                <div>
                  <h3 className="font-brand-serif text-base sm:text-lg font-bold text-[#1F1F1F] group-hover:text-[#5C1327] transition line-clamp-1">
                    {category.name}
                  </h3>
                  <p className="text-[11px] text-[#7A7A7A] mt-1 line-clamp-2 leading-relaxed">
                    {category.description}
                  </p>
                </div>

                <div className="mt-3 pt-2 border-t border-[#F5EFE6] flex items-center justify-between text-xs font-semibold text-[#5C1327] group-hover:text-[#4A0E17]">
                  <span>View Collection</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
