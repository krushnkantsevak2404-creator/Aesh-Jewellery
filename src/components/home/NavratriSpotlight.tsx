import React from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Sparkles } from "lucide-react";
import { products } from "../../lib/data/products";
import ProductCard from "../product/ProductCard";

export default function NavratriSpotlight() {
  const navratriProducts = products
    .filter((p) => p.occasions.includes("navratri") || p.tags.includes("navratri"))
    .slice(0, 4);

  return (
    <section className="py-16 sm:py-24 bg-[#FAF7F2] border-y border-[#ECE4D8]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Banner Card */}
        <div className="relative rounded-3xl overflow-hidden bg-[#3D0A14] text-white p-8 sm:p-12 mb-12 shadow-lg">
          <div className="absolute inset-0 z-0">
            <Image
              src="https://images.unsplash.com/photo-1601121141461-9d6647bca1ed?q=80&w=1600&auto=format&fit=crop"
              alt="Navratri Garba Festive Atmosphere"
              fill
              sizes="100vw"
              className="object-cover opacity-25"
            />
            <div className="absolute inset-0 bg-linear-to-r from-[#2D0711] via-[#3D0A14]/90 to-transparent" />
          </div>

          <div className="relative z-10 max-w-xl space-y-4">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#5C1327] border border-[#C5A059]/40 text-[#E5C46B] text-[11px] font-bold tracking-widest uppercase">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Heritage Collection</span>
            </div>

            <h2 className="font-brand-serif text-3xl sm:text-4xl lg:text-5xl font-normal text-white leading-tight">
              Make Every Garba Night Count
            </h2>

            <p className="text-sm text-[#E0D5C7] leading-relaxed">
              Our signature oxidized collection crafted for 9 days of non-stop dance. Lightweight peacock jhumkas, melodic Ked Kandoros, mirror haathphool, and regal hasli chokers built to stay comfortable all night.
            </p>

            <div className="pt-2">
              <Link
                href="/collections/navratri"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[#C5A059] hover:bg-[#D4AF37] text-[#1F1F1F] text-xs font-bold uppercase tracking-wider transition shadow-md"
              >
                <span>SHOP NAVRATRI EDIT</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>

        {/* 4 Featured Products Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
          {navratriProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
}
