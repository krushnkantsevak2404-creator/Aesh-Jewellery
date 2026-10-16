import React from "react";

export const metadata = {
  title: "Terms & Conditions | Sevak Creation",
  description: "Terms and conditions governing orders, pricing, intellectual property, and services at Sevak Creation.",
};

export default function TermsPage() {
  return (
    <div className="py-12 sm:py-20 bg-[#FCFBF7] min-h-screen">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div>
          <span className="text-xs uppercase tracking-widest text-[#C5A059] font-bold">
            Legal Terms
          </span>
          <h1 className="font-brand-serif text-3xl sm:text-4xl text-[#1F1F1F] mt-1 mb-2">
            Terms & Conditions
          </h1>
          <p className="text-xs text-[#888]">Last updated: October 2026</p>
        </div>

        <div className="bg-white p-6 sm:p-8 rounded-3xl border border-[#ECE4D8] space-y-6 text-xs text-[#4A4A4A] leading-relaxed shadow-xs">
          <section className="space-y-2">
            <h2 className="font-brand-serif text-lg font-bold text-[#1F1F1F]">
              1. Brand & Business Identity
            </h2>
            <p>
              This website is owned and operated by Sevak Creation, founded by Kishan and Aesha in Ahmedabad, Gujarat, India. By accessing our website or placing an order, you agree to comply with and be bound by these terms.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="font-brand-serif text-lg font-bold text-[#1F1F1F]">
              2. Product Descriptions & Photography
            </h2>
            <p>
              We strive to display jewellery finishes, mirror work, and patinas as accurately as possible. Because oxidized jewellery involves artisan hand-buffing techniques, minor tonal variations and patina depths may occur, adding unique handcrafted charm to each piece.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="font-brand-serif text-lg font-bold text-[#1F1F1F]">
              3. Pricing & Currency
            </h2>
            <p>
              All prices displayed on Sevak Creation are listed in Indian Rupees (INR ₹) and are inclusive of applicable taxes. We reserve the right to revise product prices and promotional offers at any time without prior notice.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="font-brand-serif text-lg font-bold text-[#1F1F1F]">
              4. Governing Law & Jurisdiction
            </h2>
            <p>
              These Terms and Conditions shall be governed by and construed in accordance with the laws of India. Any disputes arising in connection with orders shall be subject to the exclusive jurisdiction of the courts of Ahmedabad, Gujarat.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
