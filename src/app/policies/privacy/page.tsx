import React from "react";
import { ShieldCheck, Lock } from "lucide-react";

export const metadata = {
  title: "Privacy Policy | Sevak Creation",
  description: "Learn how Sevak Creation safeguards your personal details, mobile numbers, and payment data.",
};

export default function PrivacyPolicyPage() {
  return (
    <div className="py-12 sm:py-20 bg-[#FCFBF7] min-h-screen">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div>
          <span className="text-xs uppercase tracking-widest text-[#C5A059] font-bold">
            Policy & Security
          </span>
          <h1 className="font-brand-serif text-3xl sm:text-4xl text-[#1F1F1F] mt-1 mb-2">
            Privacy Policy
          </h1>
          <p className="text-xs text-[#888]">Last updated: October 2026</p>
        </div>

        <div className="bg-white p-6 sm:p-8 rounded-3xl border border-[#ECE4D8] space-y-6 text-xs text-[#4A4A4A] leading-relaxed shadow-xs">
          <section className="space-y-2">
            <h2 className="font-brand-serif text-lg font-bold text-[#1F1F1F]">
              1. Information We Collect
            </h2>
            <p>
              When you purchase or browse on Sevak Creation, we collect the necessary information required to process and fulfill your order: full name, shipping address, mobile phone number, email address, and order history.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="font-brand-serif text-lg font-bold text-[#1F1F1F]">
              2. How We Use Your Data
            </h2>
            <p>
              Your contact details are strictly used for delivery coordination via logistics partners, sharing tracking status on WhatsApp or SMS, and providing customer care support. We will never sell, rent, or trade your phone number or email address to third-party telemarketers.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="font-brand-serif text-lg font-bold text-[#1F1F1F]">
              3. Secure Online Payments
            </h2>
            <p>
              We do not store your credit/debit card numbers or UPI MPIN on our servers. All financial transactions are processed securely through RBI-compliant Indian payment gateways using end-to-end 256-bit SSL encryption.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="font-brand-serif text-lg font-bold text-[#1F1F1F]">
              4. Contact Regarding Privacy
            </h2>
            <p>
              For any privacy inquiries or to request data removal, please contact our privacy desk at <strong>krushnkantsevak2404@gmail.com</strong>.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
