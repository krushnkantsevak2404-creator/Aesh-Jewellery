import React from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Sparkles } from "lucide-react";
import { seasonalCollections } from "../../lib/data/collections";

export const metadata = {
  title: "Seasonal Collections | Sevak Creation",
  description: "Explore dynamic seasonal jewellery edits: Navratri Garba, Diwali Radiance, Shaadi Wedding, Raksha Bandhan, and Everyday Sparkle.",
};

export default function CollectionsHubPage() {
  return (
    <div className="py-12 sm:py-16 bg-[#FCFBF7] min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#FAF6F0] text-[#C5A059] text-xs font-bold uppercase tracking-widest mb-3 border border-[#ECE4D8]">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Festive Calendar</span>
          </div>
          <h1 className="font-brand-serif text-3xl sm:text-4xl lg:text-5xl text-[#1F1F1F] mb-3">
            Seasonal Collections
          </h1>
          <div className="w-12 h-0.5 bg-[#5C1327] mx-auto mb-4" />
          <p className="text-xs sm:text-sm text-[#666] leading-relaxed">
            Sevak Creation curates specialized edits for every Indian festival and milestone, allowing you to celebrate in authentic cultural splendor.
          </p>
        </div>

        <div className="space-y-8">
          {seasonalCollections.map((col) => (
            <div
              key={col.id}
              className="group relative rounded-3xl overflow-hidden bg-[#2D0711] border border-[#ECE4D8] shadow-lg flex flex-col md:flex-row items-center justify-between"
            >
              {/* Background image & gradient */}
              <div className="absolute inset-0 z-0">
                <Image
                  src={col.bannerImage}
                  alt={col.name}
                  fill
                  sizes="100vw"
                  className="object-cover opacity-25 group-hover:scale-103 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-linear-to-r from-[#2D0711]/95 via-[#4A0E17]/85 to-transparent" />
              </div>

              {/* Left Content */}
              <div className="relative z-10 p-8 sm:p-12 max-w-2xl space-y-3">
                <span className="px-3 py-1 rounded-full bg-[#C5A059] text-[#1F1F1F] text-[10px] font-bold uppercase tracking-widest inline-block">
                  {col.badgeText}
                </span>

                <h2 className="font-brand-serif text-3xl sm:text-4xl text-white">
                  {col.name}
                </h2>

                <p className="text-sm font-light text-[#E5C46B]">
                  &ldquo;{col.tagline}&rdquo;
                </p>

                <p className="text-xs sm:text-sm text-[#E0D5C7] leading-relaxed">
                  {col.description}
                </p>

                <div className="pt-4">
                  <Link
                    href={`/collections/${col.slug}`}
                    className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-white hover:bg-[#FAF7F2] text-[#4A0E17] text-xs font-bold uppercase tracking-wider transition shadow-sm"
                  >
                    <span>View {col.name}</span>
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>

              {/* Right Curated Categories Badges */}
              <div className="relative z-10 p-8 md:pr-12 hidden md:flex flex-col items-end gap-2 text-xs text-[#E5DCD0]">
                <span className="text-[10px] uppercase tracking-widest text-[#C5A059] font-bold">
                  Curated Categories:
                </span>
                <div className="flex flex-wrap gap-1.5 max-w-xs justify-end">
                  {col.curatedCategories?.map((catSlug) => (
                    <span
                      key={catSlug}
                      className="px-2.5 py-1 rounded-md bg-white/10 text-white text-[11px] backdrop-blur-xs border border-white/15 uppercase font-medium"
                    >
                      {catSlug.replace("-", " ")}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
