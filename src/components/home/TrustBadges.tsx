import React from "react";
import {
  Wallet,
  Sparkles,
  Layers,
  ShieldCheck,
  ShoppingBag,
  Headphones,
} from "lucide-react";

const trustPoints = [
  {
    icon: Wallet,
    title: "Affordable Jewellery",
    description: "Trendsetting designs starting at just ₹299, designed to be accessible for students and festive shoppers.",
  },
  {
    icon: Sparkles,
    title: "Curated Designs",
    description: "Personally handpicked by founders Kishan & Aesha, prioritizing balance, aesthetic weight, and wearing comfort.",
  },
  {
    icon: Layers,
    title: "Festive & Everyday",
    description: "Versatile styling spanning high-energy Garba nights, family weddings, and minimal everyday office studs.",
  },
  {
    icon: ShieldCheck,
    title: "Thoroughly Quality Checked",
    description: "Every clasp, mirror inset, and ghungroo is inspected by hand before dispatch in protective packaging.",
  },
  {
    icon: ShoppingBag,
    title: "Hassle-Free Shopping",
    description: "Seamless guest checkout, multi-option Indian payments (UPI, Cards, COD), and real-time pincode delivery.",
  },
  {
    icon: Headphones,
    title: "Direct Founder Support",
    description: "Speak directly with our team on WhatsApp for order inquiries, sizing questions, or custom styling advice.",
  },
];

export default function TrustBadges() {
  return (
    <section className="py-16 sm:py-24 bg-[#FCFBF7]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12 sm:mb-16">
          <span className="text-xs uppercase tracking-[0.25em] text-[#C5A059] font-bold">
            The Sevak Promise
          </span>
          <h2 className="font-brand-serif text-3xl sm:text-4xl text-[#1F1F1F] mt-2 mb-3">
            Why Choose Sevak Creation?
          </h2>
          <div className="w-12 h-0.5 bg-[#5C1327] mx-auto mb-4" />
          <p className="text-xs sm:text-sm text-[#666] leading-relaxed">
            We are a dedicated homegrown Indian small business founded on transparent pricing, genuine craft, and authentic customer care.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {trustPoints.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={idx}
                className="p-6 rounded-2xl bg-[#FAF6F0] border border-[#ECE4D8] hover:border-[#C5A059] hover:bg-white hover:shadow-md transition-all duration-300"
              >
                <div className="w-12 h-12 rounded-xl bg-[#5C1327]/10 border border-[#5C1327]/20 flex items-center justify-center text-[#5C1327] mb-4">
                  <Icon className="w-6 h-6" />
                </div>
                <h3 className="font-brand-serif text-lg font-bold text-[#1F1F1F] mb-1.5">
                  {item.title}
                </h3>
                <p className="text-xs text-[#6B6B6B] leading-relaxed">
                  {item.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
