"use client";

import React, { useState, useEffect, Suspense } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import {
  Truck,
  Search,
  CheckCircle2,
  Package,
  Clock,
  MapPin,
  MessageCircle,
  AlertCircle,
} from "lucide-react";
import { OrderStatus } from "../../lib/types";
import { formatINR, generateWhatsAppLink } from "../../lib/utils";
import { defaultSiteConfig } from "../../lib/config/siteConfig";

function TrackOrderContent() {
  const searchParams = useSearchParams();
  const initialId = searchParams.get("id") || "";

  const [orderQuery, setOrderQuery] = useState(initialId);
  const [searchedOrder, setSearchedOrder] = useState<any>(null);
  const [hasSearched, setHasSearched] = useState(false);

  // Status step order
  const steps: OrderStatus[] = [
    "Confirmed",
    "Packed",
    "Shipped",
    "Out for Delivery",
    "Delivered",
  ];

  const handleTrack = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!orderQuery.trim()) return;

    setHasSearched(true);

    // Try finding stored order
    try {
      const stored = localStorage.getItem("sevak_last_order");
      if (stored) {
        const parsed = JSON.parse(stored);
        if (
          parsed.orderNumber?.toLowerCase() === orderQuery.trim().toLowerCase() ||
          orderQuery.includes("SC-")
        ) {
          setSearchedOrder(parsed);
          return;
        }
      }
    } catch {}

    // Simulated active order for demonstration
    setSearchedOrder({
      orderNumber: orderQuery.toUpperCase().startsWith("SC-") ? orderQuery.toUpperCase() : `SC-${orderQuery}`,
      orderStatus: "Shipped",
      createdAt: "Today",
      estimatedDelivery: "In 2 business days",
      courierPartner: "BlueDart Express / Delhivery Air",
      awbNumber: "BD982741029IN",
      customer: {
        fullName: "Customer",
        city: "Mumbai",
        state: "Maharashtra",
      },
      items: [
        {
          product: {
            name: "Mayura Peacock Oxidized Jhumka Earrings",
            price: 499,
          },
          quantity: 1,
        },
      ],
      total: 499,
    });
  };

  useEffect(() => {
    if (initialId) {
      handleTrack();
    }
  }, [initialId]);

  const currentStepIndex = searchedOrder
    ? steps.indexOf(searchedOrder.orderStatus as OrderStatus)
    : 2;

  const whatsappUrl = generateWhatsAppLink(
    defaultSiteConfig.contact.whatsappNumber,
    `Hello Kishan & Aesha! I am inquiring about tracking my order #${orderQuery || "SC-XXXXXX"}.`
  );

  return (
    <div className="py-12 sm:py-20 bg-[#FCFBF7] min-h-screen">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-xl mx-auto mb-10">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#FAF6F0] text-[#C5A059] text-xs font-bold uppercase tracking-widest mb-2 border border-[#ECE4D8]">
            <Truck className="w-3.5 h-3.5" />
            <span>Real-Time Updates</span>
          </div>
          <h1 className="font-brand-serif text-3xl sm:text-4xl text-[#1F1F1F]">
            Track Your Order
          </h1>
          <p className="text-xs sm:text-sm text-[#666] mt-2">
            Enter your 6-digit Order ID (from your confirmation screen or SMS) to check your parcel&apos;s journey.
          </p>
        </div>

        {/* Search Bar Form */}
        <form onSubmit={handleTrack} className="flex gap-2 max-w-md mx-auto mb-10">
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-[#888] absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              required
              value={orderQuery}
              onChange={(e) => setOrderQuery(e.target.value)}
              placeholder="Enter Order ID (e.g. SC-829104)"
              className="w-full pl-10 pr-4 py-3 rounded-xl border border-[#D5CABB] bg-white text-xs uppercase placeholder:normal-case focus:outline-hidden focus:border-[#5C1327]"
            />
          </div>
          <button
            type="submit"
            className="px-6 py-3 rounded-xl bg-[#5C1327] hover:bg-[#4A0E17] text-white text-xs font-bold uppercase tracking-wider transition shadow-sm"
          >
            Track
          </button>
        </form>

        {/* Tracking Details Card */}
        {searchedOrder && (
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#ECE4D8] shadow-md space-y-8 animate-in fade-in duration-300">
            {/* Header info */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 border-b border-[#ECE4D8] gap-4">
              <div>
                <span className="text-[10px] uppercase font-bold tracking-widest text-[#C5A059] block">
                  ORDER STATUS
                </span>
                <h3 className="font-brand-serif text-2xl font-bold text-[#1F1F1F]">
                  Order #{searchedOrder.orderNumber}
                </h3>
                <span className="text-xs text-[#888]">
                  Carrier: {searchedOrder.courierPartner || "Express Air Logistics"} • AWB:{" "}
                  {searchedOrder.awbNumber || "BD9281920IN"}
                </span>
              </div>

              <div className="text-left sm:text-right">
                <span className="inline-block px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold uppercase tracking-wider mb-1">
                  {searchedOrder.orderStatus}
                </span>
                <div className="text-xs text-[#666]">
                  Est. Delivery: <strong>{searchedOrder.estimatedDelivery || "3-5 Days"}</strong>
                </div>
              </div>
            </div>

            {/* Stepper Visual Timeline */}
            <div>
              <div className="flex justify-between items-center relative mb-4">
                <div className="absolute top-1/2 left-0 right-0 h-1 bg-[#ECE4D8] -translate-y-1/2 z-0" />
                <div
                  className="absolute top-1/2 left-0 h-1 bg-[#5C1327] -translate-y-1/2 z-0 transition-all duration-700"
                  style={{
                    width: `${(Math.max(0, currentStepIndex) / (steps.length - 1)) * 100}%`,
                  }}
                />

                {steps.map((st, idx) => {
                  const isDone = idx <= currentStepIndex;
                  const isCurrent = idx === currentStepIndex;

                  return (
                    <div
                      key={st}
                      className="relative z-10 flex flex-col items-center group"
                    >
                      <div
                        className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold transition ${
                          isDone
                            ? "bg-[#5C1327] text-white"
                            : "bg-[#ECE4D8] text-[#888]"
                        } ${isCurrent ? "ring-4 ring-[#C5A059]/40" : ""}`}
                      >
                        {isDone ? <CheckCircle2 className="w-4 h-4" /> : idx + 1}
                      </div>
                      <span
                        className={`text-[10px] font-semibold mt-2 text-center max-w-[70px] ${
                          isCurrent
                            ? "text-[#5C1327] font-bold"
                            : isDone
                            ? "text-[#1F1F1F]"
                            : "text-[#9E9E9E]"
                        }`}
                      >
                        {st}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Package details */}
            <div className="bg-[#FAF6F0] p-4 rounded-2xl border border-[#ECE4D8] text-xs space-y-2">
              <div className="flex items-center gap-2 font-semibold text-[#1F1F1F]">
                <Package className="w-4 h-4 text-[#5C1327]" />
                <span>Parcel Contents:</span>
              </div>
              <ul className="divide-y divide-[#ECE4D8]">
                {searchedOrder.items?.map((it: any, i: number) => (
                  <li key={i} className="py-2 flex justify-between items-center text-[#4A4A4A]">
                    <span>
                      {it.quantity} × {it.product?.name}
                    </span>
                    <span className="font-semibold text-[#1F1F1F]">
                      {formatINR(it.product?.price * it.quantity)}
                    </span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Support Actions */}
            <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#666]">
              <span>Need help with delivery address or rescheduling?</span>
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white font-semibold transition"
              >
                <MessageCircle className="w-4 h-4" />
                <span>Chat with Support</span>
              </a>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default function TrackOrderPage() {
  return (
    <Suspense
      fallback={
        <div className="py-24 text-center text-sm text-[#888]">
          Loading Tracker...
        </div>
      }
    >
      <TrackOrderContent />
    </Suspense>
  );
}
