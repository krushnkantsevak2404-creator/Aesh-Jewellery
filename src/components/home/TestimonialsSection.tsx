import React from "react";
import Link from "next/link";
import { Star, CheckCircle, Quote } from "lucide-react";
import { sampleReviews } from "../../lib/data/reviews";

export default function TestimonialsSection() {
  return (
    <section className="py-16 sm:py-24 bg-[#FCFBF7]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12 sm:mb-16">
          <span className="text-xs uppercase tracking-[0.25em] text-[#C5A059] font-bold">
            Real Customer Love
          </span>
          <h2 className="font-brand-serif text-3xl sm:text-4xl text-[#1F1F1F] mt-2 mb-3">
            Words from Our Customers
          </h2>
          <div className="w-12 h-0.5 bg-[#5C1327] mx-auto mb-4" />
          <p className="text-xs sm:text-sm text-[#666]">
            Honest feedback from festive dancers, college students, and brides who made Sevak Creation part of their celebrations.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {sampleReviews.map((rev) => (
            <div
              key={rev.id}
              className="bg-[#FAF6F0] rounded-2xl p-6 border border-[#ECE4D8] flex flex-col justify-between hover:shadow-md transition-shadow relative"
            >
              <div>
                <Quote className="w-6 h-6 text-[#C5A059]/40 mb-3" />
                <div className="flex items-center gap-1 text-[#C5A059] mb-3">
                  {[...Array(rev.rating)].map((_, i) => (
                    <Star key={i} className="w-3.5 h-3.5 fill-[#C5A059]" />
                  ))}
                </div>
                <h4 className="font-brand-serif text-base font-bold text-[#1F1F1F] mb-2 leading-snug">
                  &ldquo;{rev.title}&rdquo;
                </h4>
                <p className="text-xs text-[#555] leading-relaxed italic mb-4">
                  {rev.comment}
                </p>
              </div>

              <div className="pt-4 border-t border-[#E8DFD0]">
                {rev.productName && rev.productSlug && (
                  <Link
                    href={`/product/${rev.productSlug}`}
                    className="text-[11px] font-semibold text-[#5C1327] hover:underline block truncate mb-1"
                  >
                    Purchased: {rev.productName}
                  </Link>
                )}
                <div className="flex items-center justify-between mt-1">
                  <div>
                    <span className="text-xs font-bold text-[#1F1F1F]">
                      {rev.author}
                    </span>
                    <span className="block text-[10px] text-[#888]">
                      {rev.city}
                    </span>
                  </div>
                  {rev.verifiedBuyer && (
                    <span className="inline-flex items-center gap-1 text-[10px] text-emerald-800 font-medium bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                      <CheckCircle className="w-3 h-3 text-emerald-600" />
                      Verified
                    </span>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
