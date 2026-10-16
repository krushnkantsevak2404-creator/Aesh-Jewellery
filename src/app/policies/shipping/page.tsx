import React from "react";
import Link from "next/link";
import { Truck, Sparkles, CheckCircle2 } from "lucide-react";
import { defaultSiteConfig } from "../../../lib/config/siteConfig";

export const metadata = {
  title: "Shipping Policy | Sevak Creation",
  description: "Learn about Sevak Creation's shipping timelines, pan-India delivery, and free express shipping above ₹999.",
};

export default function ShippingPolicyPage() {
  return (
    <div className="py-12 sm:py-20 bg-[#FCFBF7] min-h-screen">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div>
          <span className="text-xs uppercase tracking-widest text-[#C5A059] font-bold">
            Policy & Information
          </span>
          <h1 className="font-brand-serif text-3xl sm:text-4xl text-[#1F1F1F] mt-1 mb-2">
            Shipping Policy
          </h1>
          <p className="text-xs text-[#888]">Last updated: October 2026</p>
        </div>

        <div className="bg-white p-6 sm:p-8 rounded-3xl border border-[#ECE4D8] space-y-6 text-xs text-[#4A4A4A] leading-relaxed shadow-xs">
          <section className="space-y-2">
            <h2 className="font-brand-serif text-lg font-bold text-[#1F1F1F]">
              1. Pan-India Delivery Coverage
            </h2>
            <p>
              At Sevak Creation, we proudly deliver handcrafted jewellery across all 28 Indian states and 8 Union Territories covering over 28,000+ PIN codes. All parcels originate from our fulfillment hub in Ahmedabad, Gujarat.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="font-brand-serif text-lg font-bold text-[#1F1F1F]">
              2. Free Shipping Thresholds & Charges
            </h2>
            <div className="p-4 bg-[#FAF6F0] rounded-xl border border-[#ECE4D8] space-y-2">
              <div className="flex items-center gap-2 font-semibold text-[#1F1F1F]">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>Orders ₹999 and Above: FREE Express Shipping</span>
              </div>
              <div className="flex items-center gap-2 font-semibold text-[#1F1F1F]">
                <CheckCircle2 className="w-4 h-4 text-[#5C1327]" />
                <span>Orders Below ₹999: Flat ₹70 Standard Delivery</span>
              </div>
            </div>
          </section>

          <section className="space-y-2">
            <h2 className="font-brand-serif text-lg font-bold text-[#1F1F1F]">
              3. Processing & Delivery Timelines
            </h2>
            <p>
              • <strong>Order Processing:</strong> Verified orders are prepared, quality-checked, and safely packed within 24–48 hours (excluding public holidays and Sundays).
            </p>
            <p>
              • <strong>Metro Deliveries:</strong> 3 to 5 business days (Mumbai, Ahmedabad, Delhi NCR, Pune, Bengaluru, Hyderabad, Kolkata).
            </p>
            <p>
              • <strong>Rest of India:</strong> 4 to 7 business days depending on local courier logistics.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="font-brand-serif text-lg font-bold text-[#1F1F1F]">
              4. Safe & Protective Packaging
            </h2>
            <p>
              Jewellery is fragile. We pack every pair of earrings, necklace, and ked kandoro in sealed bubble wrap inside customized rigid boxes with anti-tarnish zip pouches.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="font-brand-serif text-lg font-bold text-[#1F1F1F]">
              5. Order Tracking & WhatsApp Updates
            </h2>
            <p>
              Upon dispatch, a tracking link is sent directly via SMS and WhatsApp. You can also track your order at any time on our{" "}
              <Link href="/track-order" className="text-[#5C1327] font-semibold underline">
                Track Order Page
              </Link>
              .
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
