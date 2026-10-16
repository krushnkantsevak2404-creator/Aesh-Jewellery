"use client";

import React, { useEffect, useState, Suspense } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import {
  CheckCircle2,
  Package,
  Truck,
  MessageCircle,
  ArrowRight,
  Sparkles,
} from "lucide-react";
import confetti from "canvas-confetti";
import { formatINR, generateWhatsAppLink } from "../../../lib/utils";
import { defaultSiteConfig } from "../../../lib/config/siteConfig";

function SuccessContent() {
  const searchParams = useSearchParams();
  const orderNumber = searchParams.get("order") || "SC-829104";

  const [orderData, setOrderData] = useState<any>(null);

  useEffect(() => {
    // Trigger festive celebratory confetti
    try {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 },
        colors: ["#5C1327", "#C5A059", "#D4AF37", "#FAF7F2"],
      });
    } catch {}

    // Retrieve order data from localStorage if available
    try {
      const stored = localStorage.getItem("sevak_last_order");
      if (stored) {
        setOrderData(JSON.parse(stored));
      }
    } catch {}
  }, []);

  const whatsappUrl = generateWhatsAppLink(
    defaultSiteConfig.contact.whatsappNumber,
    `Hello Kishan & Aesha! ✨ I just placed order *#${orderNumber}* on Sevak Creation. Excited to receive my jewellery!`
  );

  return (
    <div className="py-12 sm:py-20 bg-[#FCFBF7] min-h-screen">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-3xl p-8 sm:p-12 border border-[#ECE4D8] shadow-lg text-center space-y-6">
          {/* Success Check Icon */}
          <div className="w-20 h-20 rounded-full bg-emerald-50 border-2 border-emerald-500/30 flex items-center justify-center mx-auto text-emerald-600">
            <CheckCircle2 className="w-10 h-10" />
          </div>

          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#FAF6F0] text-[#C5A059] text-xs font-bold uppercase tracking-widest mb-2 border border-[#ECE4D8]">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Order Confirmed</span>
            </div>
            <h1 className="font-brand-serif text-3xl sm:text-4xl font-bold text-[#1F1F1F]">
              Thank You for Your Order!
            </h1>
            <p className="text-xs sm:text-sm text-[#666] mt-2 max-w-md mx-auto">
              Your jewellery order has been confirmed. Kishan & Aesha are carefully preparing your pieces for safe dispatch from Ahmedabad.
            </p>
          </div>

          {/* Order Number Box */}
          <div className="p-4 rounded-2xl bg-[#FAF6F0] border border-[#ECE4D8] inline-block text-left max-w-sm w-full mx-auto">
            <div className="flex justify-between items-center text-xs pb-2 border-b border-[#E8DFD0]">
              <span className="text-[#888]">Order Number:</span>
              <span className="font-bold text-[#5C1327] tracking-wider text-sm">
                #{orderNumber}
              </span>
            </div>
            <div className="flex justify-between items-center text-xs pt-2">
              <span className="text-[#888]">Estimated Delivery:</span>
              <span className="font-semibold text-[#1F1F1F]">
                3–5 Business Days
              </span>
            </div>
          </div>

          {/* Details breakdown if stored */}
          {orderData && (
            <div className="text-left bg-[#FCFBF7] p-5 rounded-2xl border border-[#ECE4D8] space-y-3 text-xs">
              <div className="font-semibold text-[#1F1F1F] border-b border-[#ECE4D8] pb-2">
                Delivering to:
              </div>
              <p className="text-[#4A4A4A] leading-relaxed">
                <strong>{orderData.customer?.fullName}</strong>
                <br />
                {orderData.customer?.apartment && `${orderData.customer?.apartment}, `}
                {orderData.customer?.address}
                <br />
                {orderData.customer?.city}, {orderData.customer?.state} -{" "}
                {orderData.customer?.pincode}
                <br />
                Phone: +91 {orderData.customer?.mobile}
              </p>
              <div className="pt-2 border-t border-[#ECE4D8] flex justify-between font-bold text-sm text-[#4A0E17]">
                <span>Total Amount Paid / Payable:</span>
                <span>{formatINR(orderData.total)}</span>
              </div>
            </div>
          )}

          {/* Actions */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-4">
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-semibold shadow-sm transition"
            >
              <MessageCircle className="w-4 h-4" />
              <span>Get WhatsApp Updates</span>
            </a>

            <Link
              href={`/track-order?id=${orderNumber}`}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-[#5C1327] hover:bg-[#4A0E17] text-white text-xs font-bold uppercase tracking-wider shadow-sm transition"
            >
              <Truck className="w-4 h-4" />
              <span>Track Order Status</span>
            </Link>

            <Link
              href="/shop"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl border border-[#D5CABB] bg-white hover:bg-[#FAF6F0] text-[#1F1F1F] text-xs font-semibold transition"
            >
              <span>Continue Shopping</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function CheckoutSuccessPage() {
  return (
    <Suspense
      fallback={
        <div className="py-24 text-center text-sm text-[#888]">
          Confirming order...
        </div>
      }
    >
      <SuccessContent />
    </Suspense>
  );
}
