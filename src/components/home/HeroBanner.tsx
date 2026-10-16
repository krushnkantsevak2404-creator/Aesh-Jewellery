"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Sparkles } from "lucide-react";

export default function HeroBanner() {
  return (
    <section className="relative overflow-hidden bg-[#2D0711] text-[#FCFBF7] min-h-[580px] lg:min-h-[660px] flex items-center">
      {/* Background Lifestyle Image with Luxury Overlay */}
      <div className="absolute inset-0 z-0">
        <Image
          src="https://images.unsplash.com/photo-1544077960-604201fe74bc?q=80&w=2000&auto=format&fit=crop"
          alt="Sevak Creation Indian Festive Jewellery Lifestyle"
          fill
          priority
          sizes="100vw"
          className="object-cover object-center opacity-35 scale-102 transition-transform duration-1000"
        />
        {/* Subtle Burgundy & Charcoal Gradients */}
        <div className="absolute inset-0 bg-linear-to-r from-[#2D0711]/95 via-[#4A0E17]/85 to-transparent" />
        <div className="absolute inset-0 bg-linear-to-t from-[#2D0711] via-transparent to-black/20" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-24 w-full">
        <div className="max-w-2xl space-y-6">
          {/* Subtle Tagline Badge */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#5C1327]/80 border border-[#C5A059]/40 text-[#E8DFD0] text-xs uppercase tracking-[0.2em] font-medium backdrop-blur-xs">
            <Sparkles className="w-3.5 h-3.5 text-[#C5A059]" />
            <span>Handcrafted Indian Jewellery & Festive Edits</span>
          </div>

          {/* Main Headline */}
          <h1 className="font-brand-serif text-4xl sm:text-5xl lg:text-6xl font-normal leading-[1.12] text-white">
            Jewellery That <br />
            <span className="italic font-light text-[#E8DFD0]">Celebrates</span>{" "}
            <span className="text-[#C5A059] font-normal">You</span>
          </h1>

          {/* Subheading */}
          <p className="text-base sm:text-lg text-[#E8DFD0]/90 leading-relaxed font-light max-w-xl">
            Discover elegant Indian jewellery and festive accessories designed to add a little more sparkle to every occasion — from Navratri Garba nights to everyday college & work style.
          </p>

          {/* CTAs */}
          <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
            <Link
              href="/shop"
              className="inline-flex items-center justify-center gap-2.5 px-8 py-3.5 rounded-xl bg-[#C5A059] hover:bg-[#D4AF37] text-[#1F1F1F] text-xs font-bold uppercase tracking-widest transition shadow-lg hover:shadow-xl hover:-translate-y-0.5"
            >
              <span>SHOP NOW</span>
              <ArrowRight className="w-4 h-4" />
            </Link>

            <Link
              href="/collections"
              className="inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-xl bg-transparent hover:bg-white/10 text-white border border-[#E8DFD0]/40 text-xs font-semibold uppercase tracking-widest transition hover:-translate-y-0.5"
            >
              <span>EXPLORE COLLECTIONS</span>
            </Link>
          </div>

          {/* Trust Highlights */}
          <div className="pt-6 border-t border-white/10 flex flex-wrap items-center gap-6 text-xs text-[#E8DFD0]/80">
            <div>
              <span className="font-bold text-white">₹299 onwards</span>
              <span className="block text-[11px] text-[#C5A059]">Affordable Luxury</span>
            </div>
            <div className="w-px h-6 bg-white/20" />
            <div>
              <span className="font-bold text-white">Free Express Shipping</span>
              <span className="block text-[11px] text-[#C5A059]">On orders above ₹999</span>
            </div>
            <div className="w-px h-6 bg-white/20" />
            <div>
              <span className="font-bold text-white">Pan-India Delivery</span>
              <span className="block text-[11px] text-[#C5A059]">3-5 Business Days</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
