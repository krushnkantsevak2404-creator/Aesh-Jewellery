import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Sparkles, Heart, ShieldCheck, MessageCircle, ArrowRight } from "lucide-react";
import { defaultSiteConfig } from "../../lib/config/siteConfig";
import { generateWhatsAppLink } from "../../lib/utils";

export const metadata = {
  title: "Our Story | Meet Founders Kishan & Aesha",
  description:
    "Learn how two friends, Kishan and Aesha, founded Sevak Creation in Gujarat to bring authentic Indian festive jewellery and modern affordable elegance to women across India.",
};

export default function AboutPage() {
  const whatsappUrl = generateWhatsAppLink(
    defaultSiteConfig.contact.whatsappNumber,
    "Hello Kishan & Aesha! ✨ I just read your brand story on the website and wanted to connect."
  );

  return (
    <div className="py-12 sm:py-20 bg-[#FCFBF7] min-h-screen">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        {/* Editorial Brand Intro Header */}
        <div className="text-center max-w-2xl mx-auto">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#FAF6F0] text-[#C5A059] text-xs font-bold uppercase tracking-widest mb-3 border border-[#ECE4D8]">
            <Sparkles className="w-3.5 h-3.5" />
            <span>The Sevak Story</span>
          </div>
          <h1 className="font-brand-serif text-3xl sm:text-5xl text-[#1F1F1F] leading-tight mb-4">
            Crafting Sparkle for Every Indian Celebration
          </h1>
          <div className="w-16 h-0.5 bg-[#5C1327] mx-auto mb-6" />
          <p className="text-sm sm:text-base text-[#555] leading-relaxed font-light">
            Founded by two friends, <strong>Kishan and Aesha</strong>, Sevak Creation is a homegrown brand born from a love for traditional Indian aesthetics, festive energy, and contemporary elegance.
          </p>
        </div>

        {/* Founders Story Feature Card */}
        <div className="bg-[#FAF6F0] rounded-3xl p-8 sm:p-12 border border-[#ECE4D8] grid grid-cols-1 md:grid-cols-2 gap-8 items-center shadow-xs">
          <div className="relative aspect-4/5 w-full rounded-2xl overflow-hidden shadow-md">
            <Image
              src="https://images.unsplash.com/photo-1544077960-604201fe74bc?q=80&w=1200&auto=format&fit=crop"
              alt="Sevak Creation Curators Kishan and Aesha"
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-cover"
            />
            <div className="absolute inset-0 bg-linear-to-t from-black/60 via-transparent to-transparent" />
            <div className="absolute bottom-4 left-4 right-4 text-white text-xs">
              <span className="font-bold text-[#E5C46B] uppercase tracking-wider block text-[10px]">
                Founders
              </span>
              <span className="font-brand-serif text-lg">Kishan & Aesha</span>
            </div>
          </div>

          <div className="space-y-4 text-xs sm:text-sm text-[#4A4A4A] leading-relaxed">
            <h2 className="font-brand-serif text-2xl font-bold text-[#1F1F1F]">
              How Sevak Creation Began
            </h2>
            <p>
              Our story started in Ahmedabad, Gujarat, during the electric nights of Navratri. As passionate festive revelers, we noticed how difficult it was for college students and young women to find authentic, artistic oxidized jewellery that was both affordable and comfortable enough to wear through hours of Garba dancing.
            </p>
            <p>
              We curated our first batch of peacock jhumkas, chiming Ked Kandoro waistbands, and mirror-work haathphool directly on Instagram. The overwhelming love from customers across Gujarat and Mumbai showed us that women craved jewellery that honored their roots without breaking their monthly budget.
            </p>
            <p>
              Today, Sevak Creation is not just for Navratri. We are a year-round jewellery haven celebrating every chapter of an Indian woman&apos;s life — from college lectures and office presentations to Diwali celebrations and family shaadis.
            </p>
          </div>
        </div>

        {/* Core Values Grid */}
        <div className="space-y-8">
          <div className="text-center max-w-xl mx-auto">
            <h2 className="font-brand-serif text-2xl sm:text-3xl text-[#1F1F1F]">
              What We Stand For
            </h2>
            <p className="text-xs text-[#666] mt-1">
              Every piece in our catalog reflects four uncompromising commitments:
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="p-6 bg-white rounded-2xl border border-[#ECE4D8] text-center space-y-2">
              <div className="w-10 h-10 rounded-full bg-[#FAF6F0] flex items-center justify-center mx-auto text-[#5C1327] font-bold">
                1
              </div>
              <h3 className="font-brand-serif text-base font-bold text-[#1F1F1F]">
                Modern Indian Spirit
              </h3>
              <p className="text-xs text-[#666] leading-relaxed">
                Timeless heritage patterns redesigned for ease, pairing naturally with both ethnic lehengas and denim jackets.
              </p>
            </div>

            <div className="p-6 bg-white rounded-2xl border border-[#ECE4D8] text-center space-y-2">
              <div className="w-10 h-10 rounded-full bg-[#FAF6F0] flex items-center justify-center mx-auto text-[#5C1327] font-bold">
                2
              </div>
              <h3 className="font-brand-serif text-base font-bold text-[#1F1F1F]">
                Feather-Light Comfort
              </h3>
              <p className="text-xs text-[#666] leading-relaxed">
                Hollow-bell jhumkas and weight-balanced necklaces engineered to never pinch or pull on delicate ears.
              </p>
            </div>

            <div className="p-6 bg-white rounded-2xl border border-[#ECE4D8] text-center space-y-2">
              <div className="w-10 h-10 rounded-full bg-[#FAF6F0] flex items-center justify-center mx-auto text-[#5C1327] font-bold">
                3
              </div>
              <h3 className="font-brand-serif text-base font-bold text-[#1F1F1F]">
                Student-Friendly Pricing
              </h3>
              <p className="text-xs text-[#666] leading-relaxed">
                Curated designs starting at ₹299. No artificial markups, just honest pricing from our small business to you.
              </p>
            </div>

            <div className="p-6 bg-white rounded-2xl border border-[#ECE4D8] text-center space-y-2">
              <div className="w-10 h-10 rounded-full bg-[#FAF6F0] flex items-center justify-center mx-auto text-[#5C1327] font-bold">
                4
              </div>
              <h3 className="font-brand-serif text-base font-bold text-[#1F1F1F]">
                Personal Care
              </h3>
              <p className="text-xs text-[#666] leading-relaxed">
                Each parcel is packed by hand in reusable anti-tarnish zip pouches with care guides and unboxing support.
              </p>
            </div>
          </div>
        </div>

        {/* Personal Note & WhatsApp CTA */}
        <div className="p-8 sm:p-10 rounded-3xl bg-[#4A0E17] text-white text-center space-y-4">
          <Heart className="w-8 h-8 text-[#C5A059] mx-auto fill-[#C5A059]" />
          <h2 className="font-brand-serif text-2xl sm:text-3xl font-bold">
            A Personal Note from Kishan & Aesha
          </h2>
          <p className="text-xs sm:text-sm text-[#E5DCD0] max-w-xl mx-auto leading-relaxed font-light">
            &ldquo;When you wear a piece from Sevak Creation, you are not just wearing jewellery; you are celebrating culture, memories of dancing with your friends, and the warmth of a homegrown dream. Thank you for welcoming us into your festive journeys!&rdquo;
          </p>

          <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-semibold shadow-sm transition"
            >
              <MessageCircle className="w-4 h-4" />
              <span>Say Hello on WhatsApp</span>
            </a>

            <Link
              href="/shop"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[#C5A059] hover:bg-[#D4AF37] text-[#1F1F1F] text-xs font-bold uppercase tracking-wider transition shadow-sm"
            >
              <span>Explore Our Pieces</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
