"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Sparkles } from "lucide-react";
import { useStore } from "../../context/StoreContext";
import { seasonalCollections } from "../../lib/data/collections";
import { products } from "../../lib/data/products";
import ProductCard from "../product/ProductCard";

export default function SeasonalCollectionSpotlight() {
  const { activeSeasonSlug, setActiveSeasonSlug, activeCollection } = useStore();

  // Curate products matching this active collection
  const collectionProducts = products
    .filter(
      (p) =>
        p.seasons.includes(activeCollection.slug as any) ||
        p.occasions.includes(activeCollection.slug as any) ||
        (activeCollection.curatedCategories &&
          activeCollection.curatedCategories.includes(p.categorySlug))
    )
    .slice(0, 4);

  return (
    <section className="py-16 sm:py-24 bg-[#FCFBF7]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header & Seasonal Switcher Pills */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-6">
          <div>
            <span className="text-xs uppercase tracking-[0.25em] text-[#C5A059] font-bold flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5" />
              Dynamic Seasonal Edits
            </span>
            <h2 className="font-brand-serif text-3xl sm:text-4xl text-[#1F1F1F] mt-1.5">
              Celebrate Every Season
            </h2>
            <p className="text-xs sm:text-sm text-[#666] mt-1">
              Curated ornaments tailored to India&apos;s joyful festival calendar.
            </p>
          </div>

          {/* Interactive Collection Switcher Tabs */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
            {seasonalCollections.map((col) => {
              const isSelected = col.slug === activeSeasonSlug;
              return (
                <button
                  key={col.id}
                  onClick={() => setActiveSeasonSlug(col.slug)}
                  className={`px-4 py-2 rounded-xl text-xs font-semibold uppercase tracking-wider whitespace-nowrap transition-all shadow-2xs ${
                    isSelected
                      ? "bg-[#5C1327] text-white shadow-sm scale-102"
                      : "bg-[#F3ECE1] text-[#333] hover:bg-[#E8DFD0]"
                  }`}
                >
                  {col.name}
                </button>
              );
            })}
          </div>
        </div>

        {/* Dynamic Editorial Feature Banner */}
        <div className="relative rounded-3xl overflow-hidden bg-[#2D0711] text-white p-8 sm:p-12 mb-10 shadow-lg min-h-[320px] flex items-center">
          <div className="absolute inset-0 z-0">
            <Image
              src={activeCollection.bannerImage}
              alt={activeCollection.name}
              fill
              sizes="100vw"
              className="object-cover opacity-30 transition-all duration-700"
            />
            <div className="absolute inset-0 bg-linear-to-r from-[#2D0711]/95 via-[#4A0E17]/80 to-transparent" />
          </div>

          <div className="relative z-10 max-w-xl space-y-3.5">
            <span className="px-3 py-1 rounded-full bg-[#C5A059] text-[#1F1F1F] text-[10px] font-bold uppercase tracking-widest inline-block">
              {activeCollection.badgeText}
            </span>

            <h3 className="font-brand-serif text-3xl sm:text-4xl text-white">
              {activeCollection.tagline}
            </h3>

            <p className="text-xs sm:text-sm text-[#E0D5C7] leading-relaxed">
              {activeCollection.description}
            </p>

            <div className="pt-2">
              <Link
                href={`/collections/${activeCollection.slug}`}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-white hover:bg-[#FAF7F2] text-[#4A0E17] text-xs font-bold uppercase tracking-wider transition shadow-sm"
              >
                <span>Explore {activeCollection.name}</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>

        {/* Dynamic Collection Products Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
          {collectionProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
}
