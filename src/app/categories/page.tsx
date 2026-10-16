import React from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Sparkles } from "lucide-react";
import { categories } from "../../lib/data/categories";

export const metadata = {
  title: "All Categories | Handcrafted Indian Jewellery",
  description: "Browse all 10 categories at Sevak Creation: oxidized earrings, chokers, ked kandoro, haathphool, rings, bangles, and bridal sets.",
};

export default function CategoriesHubPage() {
  return (
    <div className="py-12 sm:py-16 bg-[#FCFBF7] min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#FAF6F0] text-[#C5A059] text-xs font-bold uppercase tracking-widest mb-3 border border-[#ECE4D8]">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Discover The Craft</span>
          </div>
          <h1 className="font-brand-serif text-3xl sm:text-4xl lg:text-5xl text-[#1F1F1F] mb-3">
            Jewellery Categories
          </h1>
          <div className="w-12 h-0.5 bg-[#5C1327] mx-auto mb-4" />
          <p className="text-xs sm:text-sm text-[#666] leading-relaxed">
            Every category is curated to celebrate timeless Indian silhouettes, antique silver patinas, and modern lightweight convenience.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {categories.map((cat) => (
            <Link
              key={cat.id}
              href={`/categories/${cat.slug}`}
              className="group bg-[#FAF6F0] rounded-2xl overflow-hidden border border-[#ECE4D8] hover:border-[#C5A059] hover:shadow-xl transition-all duration-300 flex flex-col"
            >
              <div className="relative aspect-4/3 w-full bg-[#EAE1D3] overflow-hidden">
                <Image
                  src={cat.image}
                  alt={cat.name}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  className="object-cover group-hover:scale-108 transition-transform duration-700 ease-out"
                />
                <div className="absolute inset-0 bg-linear-to-t from-black/60 via-transparent to-transparent opacity-50 group-hover:opacity-30 transition-opacity" />

                <div className="absolute top-3.5 right-3.5">
                  <span className="px-3 py-1 rounded-full bg-[#5C1327]/85 text-white text-[11px] font-semibold backdrop-blur-xs">
                    {cat.itemCount} Designs
                  </span>
                </div>
              </div>

              <div className="p-5 flex-1 flex flex-col justify-between bg-white">
                <div>
                  <h2 className="font-brand-serif text-xl font-bold text-[#1F1F1F] group-hover:text-[#5C1327] transition">
                    {cat.name}
                  </h2>
                  <p className="text-xs text-[#666] mt-1.5 leading-relaxed">
                    {cat.description}
                  </p>
                </div>

                <div className="mt-4 pt-3 border-t border-[#F5EFE6] flex items-center justify-between text-xs font-semibold text-[#5C1327] group-hover:text-[#4A0E17]">
                  <span>Explore {cat.name}</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
